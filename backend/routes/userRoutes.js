
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");
const router = express.Router();

// Register
router.post("/register", userController.register);

// Login
router.post("/login", userController.login);

// Protected route
router.get("/profile", authMiddleware, userController.getProfile);

module.exports = router;
