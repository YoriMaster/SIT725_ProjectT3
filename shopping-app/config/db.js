const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    //console.error('MongoDB connection error:', err.message);
    //process.exit(1); // Exit process with failure
    console.warn('MongoDB connection failed. Running in MOCK mode.');
    console.warn(err.message);
  }
};

module.exports = connectDB;
