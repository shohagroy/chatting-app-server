const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./app/middlewares/globalErrorHandler");
const mianRoute = require("./app/routes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

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

app.use(express.json());

app.use("/api/v1", mianRoute);
//global error handler
app.use(globalErrorHandler);

app.get("/", (req, res) => {
  res.send("Chat-app  server is running...");
});

app.all("*", (req, res) => {
  res.status(500).send("No Route Found");
});

module.exports = app;
