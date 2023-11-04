const express = require("express");
const {
  postAConversation,
  getUserConversation,
} = require("./conversation.controller");

const conversationRoute = express.Router();

conversationRoute.route("/").post(postAConversation);
conversationRoute.route("/:id").get(getUserConversation);

module.exports = conversationRoute;
