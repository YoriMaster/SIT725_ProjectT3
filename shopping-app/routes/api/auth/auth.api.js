const express = require("express");
const router = express.Router();

// ========= Controllers =========
const authController = require("../../../controllers/auth.controller");
const registerController = require("../../../controllers/register.controller");

// ========= Authentication APIs =========
router.post("/login", authController.verifyLogin);
router.post("/register", registerController.createUser);

module.exports = router;