require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

app.use(express.static('public'));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the folder for EJS templates
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
connectDB();

app.use(express.json());

// Your routes and middlewares here
app.get('/homepage', (req, res) => {
  res.render('homepage', { title: 'Home Page' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
