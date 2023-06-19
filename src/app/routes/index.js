const express = require("express");
const authRoute = require("../models/auth/auth.route");

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
