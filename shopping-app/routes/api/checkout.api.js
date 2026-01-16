const express = require("express");
const router = express.Router();

// ========= Controllers =========
const checkoutController = require("../../controllers/checkout.controller");

// ========= Chechout APIs =========
router.post("/", checkoutController.checkout);

module.exports = router;