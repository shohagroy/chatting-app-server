const express = require("express");
const { findAllUser, getUserMessages } = require("./user.controller");

const userRoute = express.Router();

userRoute.route("/").get(findAllUser);
userRoute.route("/conversations").get(getUserMessages);

module.exports = userRoute;
