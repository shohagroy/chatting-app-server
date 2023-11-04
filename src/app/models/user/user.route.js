const express = require("express");
const { createOrUpdateUser, getAllUser } = require("./user.controller");

const userRoute = express.Router();

userRoute.route("/:id").get(getAllUser);
userRoute.route("/create-update").put(createOrUpdateUser);

module.exports = userRoute;
