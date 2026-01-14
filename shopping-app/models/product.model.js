const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_id: {
      type: Number,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    price: {
      type: mongoose.Decimal128,
      required: true,
      min: 0,
      validate: [
        {
          validator: function (v) {
            return v !== null && v !== undefined;
          },
          message: "Price is required",
        },
        {
          validator: function (v) {
            if (v === null || v === undefined) return true;
            return parseFloat(v.toString()) >= 0;
          },
          message: "Price must be greater than or equal to 0",
        },
      ],
      get: (v) => v?.toString(),
    },

    image: {
      type: String,
      required: true,
    },

    categoryId: {
      type: String,
      ref: "ProductCategory",
      required: true,
      validate: {
        validator: async function (value) {
          const Category = mongoose.model("ProductCategory");
          const category = await Category.findOne({ category_id: value });
          return category !== null;
        },
        message: "Invalid category ID",
      },
    },

    fullDescription: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 500,
    },

    specifications: [String],

    stock: {
      type: Number,
      min: 0,
      default: 0,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    reviews: {
      type: Number,
      default: 0,
    },

    sales: {
      type: Number,
      require: true
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "products",
    timestamps: true,
    strict: "throw",
  }
);

module.exports = mongoose.model("Product", productSchema);
