const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./app/middlewares/globalErrorHandler");
const mianRoute = require("./app/routes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const env = require("./config");
const generateToken = require("./utils/generateToken");

const app = express();

app.use(cookieParser());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));

app.use(
  cors({
    // origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

app.use(express.json());

app.use(passport.initialize());
require("./app/configs/passport.config")(passport);

app.use("/api/v1", mianRoute);
//global error handler
app.use(globalErrorHandler);

app.get("/", (req, res) => {
  res.send("Free Chat Application server is running...");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

// app.get("/auth/callback", async (req, res, next) => {
//   passport.authenticate("google", async (error, user) => {
//     const token = await generateToken(user);

//     const redirectUrl =
//       env.node_env !== "development"
//         ? env.client_redirect
//         : "http://localhost:3000";

//     const cookieOptions = {
//       httpOnly: true,
//       path: "/",
//     };

//     if (env.node_env === "production") {
//       cookieOptions.secure = true;
//       cookieOptions.sameSite = "none";
//     }

//     const serializedOptions = Object.entries(cookieOptions)
//       .map(([key, value]) => `${key}=${value}`)
//       .join("; ");

//     const cookieValue = `free_chat=${token}; ${serializedOptions}`;

//     res.setHeader("Set-Cookie", cookieValue);
//     res.redirect(redirectUrl);
//   })(req, res, next);
// });

app.get("/auth/callback", async (req, res, next) => {
  passport.authenticate("google", async (error, user) => {
    try {
      if (error) {
        // Handle authentication error
        return res.status(401).json({ error: "Authentication failed" });
      }

      if (!user) {
        // Handle user not found
        return res.status(404).json({ error: "User not found" });
      }

      // Generate token
      const token = await generateToken(user);

      // Determine the redirect URL based on the environment
      const redirectUrl =
        env.node_env !== "development"
          ? env.client_redirect
          : "http://localhost:3000";

      const cookieOptions = {
        path: "/",
      };

      if (env.node_env !== "development") {
        cookieOptions.secure = true;
        cookieOptions.httpOnly = true;
        cookieOptions.sameSite = "none";
      }

      const serializedOptions = Object.entries(cookieOptions)
        .map(([key, value]) => `${key}=${value}`)
        .join("; ");

      res.setHeader("Set-Cookie", `free_chat=${token}; ${serializedOptions}`);
      res.redirect(redirectUrl);
    } catch (error) {
      // Handle other errors
      next(error);
    }
  })(req, res, next);
});

app.all("*", (req, res) => {
  res.status(500).send("No Route Found");
});

module.exports = app;
