const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./app/middlewares/globalErrorHandler");
const mianRoute = require("./app/routes");

// const globalErrorHandler = require("./app/middlewares/globalErrorHandelat");

const app = express();

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
