const express = require("express");
const { createUser } = require("./auth.controller");

const authRoute = express.Router();

authRoute.route("/signup").post(createUser);

module.exports = authRoute;
