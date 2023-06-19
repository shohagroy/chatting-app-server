const express = require("express");
const { createUser, loginUser } = require("./auth.controller");

const authRoute = express.Router();

authRoute.route("/signup").post(createUser);
authRoute.route("/login").post(loginUser);

module.exports = authRoute;
