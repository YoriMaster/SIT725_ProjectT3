require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./db");

connectDB();

const {
  PRODUCTS,
  BANNERS,
  PRODUCT_CATEGORIES,
  FAQ_CATEGORIES,
  FAQS,
  REVIEWS,
  USERS,
  ROLES,
  CARTS,
  COUNTERS,
} = require("./mockData");

const bannerModel = require("../models/banner.model");
const {
  productCategoryModel,
  faqsCategoryModel,
} = require("../models/category.model");
const faqModel = require("../models/faq.model");
const productModel = require("../models/product.model");
const reviewModel = require("../models/review.model");
const roleModel = require("../models/role.model");
const userModel = require("../models/user.model");
const cartModel = require("../models/cart.model");
const counterModel = require("../models/counter.model");

const dataList = [
  PRODUCT_CATEGORIES,
  PRODUCTS,
  BANNERS,
  FAQ_CATEGORIES,
  FAQS,
  ROLES,
  USERS,
  REVIEWS,
  CARTS,
  COUNTERS,
];

const modelList = [
  productCategoryModel,
  productModel,
  bannerModel,
  faqsCategoryModel,
  faqModel,
  roleModel,
  userModel,
  reviewModel,
  cartModel,
  counterModel,
];

async function seedAll() {
  try {
    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i];
      const model = modelList[i];

      // Clear existing data
      await model.deleteMany({});

      // Insert new data
      if (Array.isArray(data) && data.length > 0) {
        await model.insertMany(data);
        console.log(
          `Inserted ${data.length} documents into ${model.modelName}`,
        );
      } else {
        console.log(`No data to insert for model ${model.modelName}`);
      }
    }

    await mongoose.connection.close();
    console.log("Database seeding completed and connection closed");
  } catch (error) {
    console.error("Error during database seeding:", error);
  }
}

seedAll();
