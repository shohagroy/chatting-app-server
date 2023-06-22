const express = require("express");
const { findAllUser } = require("./user.controller");

const userRoute = express.Router();

userRoute.route("/").get(findAllUser);

module.exports = userRoute;
