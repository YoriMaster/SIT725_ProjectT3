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

// routes
const router = require('./routes');
app.use('/', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
