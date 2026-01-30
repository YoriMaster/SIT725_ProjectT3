const express = require("express");
const router = express.Router();
const { requireUser, requireAdmin } = require('../middleware/auth');
// ========= Pages =========

//Default base route will be redirected to homepage
router.get("/", (req,res) => {
  res.redirect("/homepage");
})

// FAQ page
router.get("/faq", (req, res) => {
  res.render("faq", { title: "FAQs", user: req.session?.user || null  });
});

// FAQ page
router.get("/login", (req, res) => {
  res.render("login");
});

// Homepage
router.get("/homepage", async (req, res) => {
  res.render("homepage", { title: "Home", user: req.session?.user || null });
});

//Account
router.get("/account", (req, res) => {
  res.render("account", {
    title: "My Account",
    activePage: "profile",
    user: { firstName: "John", lastName: "Doe", email: "john.doe@email.com", address: "123 Collins Street, Melbourne" }
  });
});

router.get("/account/address", (req, res) => {
  res.render("account-address", {
    title: "Address Book",
    activePage: "address",
    user: { firstName: "John", lastName: "Doe" },
    address: { line1: "123 Collins Street", city: "Melbourne", state: "VIC", postcode: "3000", country: "Australia" }
  });
});

router.get("/account/payment", (req, res) => {
  res.render("account-payment", {
    title: "My Payment Options",
    activePage: "payment",
    user: { firstName: "John", lastName: "Doe" },
    payment: { type: "Card", last4: "1234", name: "John Doe", expiry: "12/34" }
  });
});

// Cart page
router.get("/cart", requireUser, (req, res) => {
  res.render("cart", {user: req.session?.user || null });
});

// Checkout page
router.get("/checkout", (req, res) => {
  res.render("checkout");
});

// Confirmation page
router.get("/confirmation", (req, res) => {
  res.render("confirmation");
});

// product detail page
router.get("/product/:id", (req, res) => res.render("product", {user: req.session?.user || null  }));

// admin page
router.get("/admin",requireAdmin, (req, res) => {
  res.render("admin");
});

// sign up page
router.get("/sign-up", (req, res) => {
  res.render("sign-up");
});
module.exports = router;
