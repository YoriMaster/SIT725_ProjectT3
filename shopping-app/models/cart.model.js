const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    cart_id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    user_id: {
      type: String,
      ref: "User",
      required: [true, "User ID is required"],
    },
    items: [
      {
        product_id: {
          type: String,
          ref: "Product",
          required: [true, "Product ID is required"],
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number,
          required: [true, "Price is required"],
          min: [0, "Price cannot be negative"],
        },
        subtotal: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      default: 0,
      min: [0, "Total cannot be negative"],
    },
    status: {
      type: String,
      enum: ["active", "abandoned", "checked_out"],
      default: "active",
    },
  },
  {
    collection: "carts",
    timestamps: true,
    strict: "throw",
  },
);

module.exports = mongoose.model("Cart", cartSchema);
