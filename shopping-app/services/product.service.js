// services/product.service.js
const Product = require("../models/product.model");
const HttpError = require("../utils/httpError");

async function listProducts({ onlyActive = true } = {}) {
  const filter = {};
  if (onlyActive) filter.isActive = true;

  // lean(): return plain objects, faster for read-only APIs
  return Product.find(filter).lean();
}

async function getProductByProductId(productId, { onlyActive = true } = {}) {
  if (!Number.isFinite(productId) || productId <= 0) {
    throw new HttpError(400, "Invalid product id");
  }

  const filter = { product_id: productId };
  if (onlyActive) filter.isActive = true;

  const product = await Product.findOne(filter).lean();
  if (!product) throw new HttpError(404, "Product not found");

  return {
    ...product,
    inStock: Number(product.stock ?? 0) > 0,
  };
}

module.exports = {
  listProducts,
  getProductByProductId,
};