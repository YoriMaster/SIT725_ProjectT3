const User = require("../models/user.model");
const Counter = require("../models/counter.model");
const Cart = require("../models/cart.model");

async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ email: email.toLowerCase() }).exec();
    return user; // returns null if not found
  } catch (err) {
    throw new Error("Database error: " + err.message);
  }
}

async function findUserById(id) {
  try {
    const user = await User.findById(id).exec();
    return user; // returns null if not found
  } catch (err) {
    throw new Error("Database error: " + err.message);
  }
}

async function addNewUser(userData) {
  try {
    // Fetch counter from DB - get all and extract seq
    const counter = await Counter.findOne().exec();
    
    if (!counter) {
      throw new Error("Counter not found in database");
    }

    // Extract seq number
    const seq = counter.seq;

    // Step 3: Create user ID with 3-digit sequence number (e.g., user_008)
    const seqNumber = String(seq).padStart(3, "0");
    const userId = `user_${seqNumber}`;
    const cartId = `cart_${seqNumber}`;

    // Step 4: Prepare user data with generated ID
    const preparedUserData = {
      user_id: userId,
      name: userData.name,
      email: userData.email.toLowerCase(),
      phone: userData.phone || null,
      dob: userData.dob,
      password: userData.password,
      cart_id: cartId,
    };

    // Create and save new user
    const newUser = new User(preparedUserData);
    const savedUser = await newUser.save();

    // Update counter - increment seq by 1
    await Counter.updateOne({}, { seq: seq + 1 }).exec();

    // Create new cart with matching user ID
    const newCart = new Cart({
      cart_id: cartId,
      user_id: userId,
      items: [],
    });
    await newCart.save();

    return savedUser;
  } catch (err) {
    throw new Error("Error creating user: " + err.message);
  }
}

module.exports = { findUserByEmail, findUserById, addNewUser };