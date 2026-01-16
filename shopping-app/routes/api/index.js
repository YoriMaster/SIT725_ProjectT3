const express = require("express");

const router = express.Router();

// ========= API Route Imports =========
const faqApi = require("./faq.api");
const cartApi = require("./cart.api");
const checkoutApi = require("./checkout.api");

// ========= API Route Mounting =========

// FAQ APIs
router.use("/faq", faqApi);

// Cart APIs
router.use("/cart", cartApi);

// Checkout APIs
router.use("/checkout", checkoutApi);


module.exports = router;