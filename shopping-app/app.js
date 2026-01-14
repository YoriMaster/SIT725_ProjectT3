require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// database
connectDB();

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static files (css/js/icons/images)
app.use(express.static(path.join(__dirname, "public")));

// page routes (EJS pages)
const pageRoutes = require("./routes/pages.routes");
app.use("/", pageRoutes);

// API routes
const cartRoutes = require("./routes/cart.routes");
app.use("/api/cart", cartRoutes);

const checkoutRoutes = require("./routes/checkout.routes");
app.use("/api/checkout", checkoutRoutes);

app.get("/api/cart-test", (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
