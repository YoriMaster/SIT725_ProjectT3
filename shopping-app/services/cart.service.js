
const Product = require("../models/product.model");

// use in-memory cart（mock）
const cartState = {
  items: [], // { productId, name, price, image, category, quantity }
  totalPrice: 0,
};

function moneyRound(n) {
  return Math.round(Number(n || 0) * 100) / 100;
}

function recalcTotal() {
  cartState.totalPrice = moneyRound(
    cartState.items.reduce((sum, it) => sum + it.price * it.quantity, 0)
  );
}

async function findProduct(productId) {
  const id = Number(productId);
  if (!Number.isFinite(id)) return null;

  return Product.findOne({ product_id: id }).lean();
}

function getStock(product) {
  if (!product) return 0;
  if (typeof product.stock === "number") return product.stock;
  return Infinity;
}

function getCart() {
  recalcTotal();
  return cartState;
}

function clearCart() {
  cartState.items = [];
  cartState.totalPrice = 0;
  return cartState;
}

async function addItem(productId, qty = 1) {
  const product = await findProduct(productId);
  if (!product) {
    const err = new Error("Product not found");
    err.status = 404;
    throw err;
  }

  const addQty = Number(qty);
  if (!Number.isFinite(addQty) || addQty <= 0) {
    const err = new Error("Invalid quantity");
    err.status = 400;
    throw err;
  }

  const existing = cartState.items.find(
    (it) => Number(it.productId) === Number(product.product_id)
  );

  const currentQty = existing ? existing.quantity : 0;
  const desiredQty = currentQty + addQty;

  const stock = typeof product.stock === "number" ? product.stock : Infinity;
  if (desiredQty > stock) {
    const err = new Error(`Not enough stock. Available: ${stock}`);
    err.status = 400;
    throw err;
  }
  const priceNumber = Number(product.price?.toString?.() ?? product.price);

  if (existing) {
    existing.quantity = desiredQty;
  } else {
    cartState.items.push({
      productId: Number(product.product_id),
      name: product.name,
      price: priceNumber,
      image: product.image,
      categoryId: product.categoryId,
      quantity: addQty,
    });
  }

  recalcTotal();
  return cartState;
}

async function updateQuantity(productId, qty) {
  const product = await findProduct(productId);
  if (!product) {
    const err = new Error("Product not found");
    err.status = 404;
    throw err;
  }

  const newQty = Number(qty);
  if (!Number.isFinite(newQty)) {
    const err = new Error("Invalid quantity");
    err.status = 400;
    throw err;
  }

  if (newQty <= 0) return removeItem(productId);

  const stock = typeof product.stock === "number" ? product.stock : Infinity;
  if (newQty > stock) {
    const err = new Error(`Not enough stock. Available: ${stock}`);
    err.status = 400;
    throw err;
  }

  const existing = cartState.items.find(
    (it) => Number(it.productId) === Number(product.product_id)
  );
  if (!existing) {
    const err = new Error("Item not in cart");
    err.status = 404;
    throw err;
  }

  existing.quantity = newQty;
  recalcTotal();
  return cartState;
}

function removeItem(productId) {
  const before = cartState.items.length;
  cartState.items = cartState.items.filter((it) => Number(it.productId) !== Number(productId));

  if (cartState.items.length === before) {
    const err = new Error("Item not in cart");
    err.status = 404;
    throw err;
  }

  recalcTotal();
  return cartState;
}

module.exports = {
  getCart,
  addItem,
  updateQuantity,
  removeItem,
  clearCart,
};
