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

app.get("/auth/callback", async (req, res, next) => {
  passport.authenticate("google", async (error, user) => {
    const token = await generateToken(user);

    const redirectUrl =
      env.node_env !== "development"
        ? env.client_redirect
        : "http://localhost:3000";

    if (env.node_env !== "development") {
      res.cookie("free_chat", token, { httpOnly: true, path: "/" });
    } else {
      res.setHeader("Set-Cookie", `free_chat=${token}; Path=/;`);
    }
    res.redirect(redirectUrl);
  })(req, res, next);
});

app.all("*", (req, res) => {
  res.status(500).send("No Route Found");
});

module.exports = app;
