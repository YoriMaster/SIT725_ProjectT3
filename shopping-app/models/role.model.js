const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    role_id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
  },
  { collection: "roles", timestamps: true, strict: "throw" }
);

module.exports = mongoose.model("Roles", roleSchema);
