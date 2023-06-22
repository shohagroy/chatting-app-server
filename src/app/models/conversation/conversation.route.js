const express = require("express");
const {
  postAConversation,
  getUserConversation,
} = require("./conversation.controller");

const conversationRoute = express.Router();

conversationRoute.route("/").post(postAConversation).get(getUserConversation);
// userRoute.route("/conversations").get(getUserMessages);

module.exports = conversationRoute;
