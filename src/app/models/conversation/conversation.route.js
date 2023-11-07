const express = require("express");
const {
  postAConversation,
  getUserConversation,
  getLastConversations,
  getParticipantsConversations,
} = require("./conversation.controller");

const conversationRoute = express.Router();

conversationRoute.route("/").post(postAConversation);
conversationRoute.route("/").get(getParticipantsConversations);
conversationRoute.route("/last/:id").get(getLastConversations);

module.exports = conversationRoute;
