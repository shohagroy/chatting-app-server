const express = require("express");
const verifyUserToken = require("../../middlewares/verifyUserToken");
const {
  createUser,
  loginUser,
  getLoginUser,
  userLoginWithGoogle,
} = require("./auth.controller");

const authRoute = express.Router();

authRoute.route("/signup").post(createUser);
authRoute.route("/login").post(loginUser);
authRoute.route("/login-user").get(verifyUserToken, getLoginUser);
authRoute.route("/google-callback").get(userLoginWithGoogle);

module.exports = authRoute;
