const express = require("express");
const verifyUserToken = require("../../middlewares/verifyUserToken");
const { createUser, loginUser, getLoginUser } = require("./auth.controller");

const authRoute = express.Router();

authRoute.route("/signup").post(createUser);
authRoute.route("/login").post(loginUser);
authRoute.route("/login-user").get(verifyUserToken, getLoginUser);

module.exports = authRoute;
