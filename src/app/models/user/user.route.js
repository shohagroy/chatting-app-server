const express = require("express");
const { findAllUser, createOrUpdateUser } = require("./user.controller");

const userRoute = express.Router();

userRoute.route("/:id").get(findAllUser);
userRoute.route("/create-update").put(createOrUpdateUser);

module.exports = userRoute;
