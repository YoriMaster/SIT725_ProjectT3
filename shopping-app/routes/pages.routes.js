const express = require("express");
const router = express.Router();

// ========= Pages =========

// FAQ page
router.get("/faq", (req, res) => {
  res.render("faq");
});

// Homepage
router.get("/homepage", (req, res) => {
  res.render("homepage", { title: "Home" });
});

// Cart page
router.get("/cart", (req, res) => {
  res.render("cart");
});

// Checkout page
router.get("/checkout", (req, res) => {
  res.render("checkout");
});

// Confirmation page
router.get("/confirmation", (req, res) => {
  res.render("confirmation");
});

module.exports = router;