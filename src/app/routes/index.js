const express = require("express");
const authRoute = require("../models/auth/auth.route");
const userRoute = require("../models/user/user.route");

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
