const express = require("express");
const passport = require("passport");
const session = require("express-session");

const cors = require("cors");
const userRoute = require("./routes/user.route");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Lets talk server is running! YaY!");
});

app.use("/api/v1/users", userRoute);
// app.use("/api/v1/jobs", jobRoute);

app.all("*", (req, res) => {
  res.status(403).json("no route found!");
});

module.exports = app;
