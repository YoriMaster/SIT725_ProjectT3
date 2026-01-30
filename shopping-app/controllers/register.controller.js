const userService = require('../services/user.service');

// Create a new user
async function createUser (req, res) {
  try {
    const userData = req.body;

    // Validate required fields
    if (!userData.name || !userData.email || !userData.password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    // Call service to add new user
    const newUser = await userService.addNewUser(userData);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);

    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
};
