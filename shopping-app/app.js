require("dotenv").config();
const express = require("express");
const session = require('express-session');
const connectDB = require("./config/db");
const path = require("path");
const app = express();
// static files (css/js/icons/images)
app.use(express.static(path.join(__dirname, "public")));

// database
connectDB();

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// express-session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.use((req, res, next) => {
  res.locals.user = req.session?.user || null;
  next();
});
// routes
const router = require("./routes");
app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  console.log(`Link to homepage: http://localhost:${PORT}`);
});
