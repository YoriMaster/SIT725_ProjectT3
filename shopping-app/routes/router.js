const express = require("express");
const path = require("path");

const router = express.Router();

// ========= Controllers =========
const faqController = require("../controllers/faq.controller");
const faqFeedbackController = require("../controllers/faqFeedback.controller");
const cartController = require("../controllers/cart.controller");
const checkoutController = require("../controllers/checkout.controller");

// ========= Pages =========

// FAQ page
router.get("/faq", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "faq.html"));
});

// Homepage
router.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "homepage.html"));
});

// Cart page
router.get("/cart", (_req, res) => {
  res.render("cart");
});

// Checkout page
router.get("/checkout", (_req, res) => {
  res.render("checkout");
});

// Confirmation page
router.get("/confirmation", (_req, res) => {
  res.render("confirmation");
});

// ========= APIs =========

// FAQs list
router.get("/api/faqs", faqController.getFaqs);

// FAQ feedback (MongoDB)
router.post("/api/faq-feedback", faqFeedbackController.createFaqFeedback);
router.get("/api/faq-feedback", faqFeedbackController.getFaqFeedback);

// ===== Cart APIs =====
router.get("/api/cart", cartController.getCart);
router.post("/api/cart/add", cartController.addItem);
router.put("/api/cart/update", cartController.updateQuantity);
router.delete("/api/cart/remove/:productId", cartController.removeItem);

router.post("/api/checkout", checkoutController.checkout);

module.exports = router;
