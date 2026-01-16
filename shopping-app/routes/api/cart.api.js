const express = require("express");
const router = express.Router();

// ========= Controllers =========
const cartController = require("../../controllers/cart.controller");

// ========= Cart APIs =========
router.get("/", cartController.getCart);
router.post("/add", cartController.addItem);
router.put("/update", cartController.updateQuantity);
router.delete("/remove/:productId", cartController.removeItem);

module.exports = router;