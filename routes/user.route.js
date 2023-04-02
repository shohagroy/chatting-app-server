const express = require("express");
const passport = require("passport");
const { register, login } = require("../controllers/userController");
require("../utils/passport.config");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// router.get("/signup/confirmation/:token", userController.confirmEmail);
// router.post("/login", userController.login);
// router.get("/me", verifyToken, userController.getMe);

module.exports = router;
