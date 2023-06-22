const express = require("express");
const {
  postAConversation,
  getUserConversation,
  getUserLastConversations,
} = require("./conversation.controller");

const conversationRoute = express.Router();

conversationRoute.route("/").post(postAConversation).get(getUserConversation);
conversationRoute.route("/:email").get(getUserLastConversations);

module.exports = conversationRoute;
