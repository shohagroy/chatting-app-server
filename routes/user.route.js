const express = require("express");
const { register } = require("../controllers/userController");

const router = express.Router();

router.post("/register", register);
// router.post("/login", register);

// router.get("/signup/confirmation/:token", userController.confirmEmail);
// router.post("/login", userController.login);
// router.get("/me", verifyToken, userController.getMe);

module.exports = router;
