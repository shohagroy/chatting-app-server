const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./app/middlewares/globalErrorHandler");
const mianRoute = require("./app/routes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const env = require("./config");
const generateToken = require("./utils/generateToken");
const session = require("express-session");

const app = express();

app.use(cookieParser());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://free-chat-application.vercel.app",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(express.json());

app.use(passport.session());
app.use(passport.initialize());
require("./app/configs/passport.config")(passport);

app.use("/api/v1", mianRoute);
//global error handler
app.use(globalErrorHandler);

app.get("/", (req, res) => {
  res.send("Chat-app  server is running...");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/callback",
  passport.authenticate("google"),
  async (req, res, next) => {
    try {
      const user = req.user; // Access the user object from the request

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
      }

      const serializedOptions = Object.entries(cookieOptions)
        .map(([key, value]) => `${key}=${value}`)
        .join("; ");

      if (token) {
        res.setHeader("Set-Cookie", `free_chat=${token}; ${serializedOptions}`);
      }
      res.redirect(redirectUrl);
    } catch (error) {
      // Handle other errors
      next(error);
    }
  }
);

app.all("*", (req, res) => {
  res.status(500).send("No Route Found");
});

module.exports = app;
