const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./app/middlewares/globalErrorHandler");
const mianRoute = require("./app/routes");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const env = require("./config");

const app = express();

app.use(cookieParser());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));
// app.use(
//   session({
//     secret: "your-secret-key", // Replace with your own secret key
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false, // Set it to true if using HTTPS
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000, // Session expiration time (in milliseconds)
//     },
//   })
// );

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

require("./app/configs/passport.config")(passport);

app.use("/api/v1", mianRoute);
//global error handler
app.use(globalErrorHandler);

app.get("/", (req, res) => {
  res.send("Free Chat Application server is running...");
});

app.all("*", (req, res) => {
  res.status(500).send("No Route Found");
});

module.exports = app;
