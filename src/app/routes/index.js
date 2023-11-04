const express = require("express");
const conversationRoute = require("../models/conversation/conversation.route");
const userRoute = require("../models/user/user.route");

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/conversations",
    route: conversationRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
