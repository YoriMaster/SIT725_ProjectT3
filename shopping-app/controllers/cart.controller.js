const cart = require("../models/cart.model");

/**
 * GET /api/cart
 * Return current cart
 */

const mockProducts = require("../models/mockProducts.model");

function recalculateCartTotal() {
  cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

exports.getCart = (req, res) => {
  res.status(200).json(cart);
};

exports.addItem = (req, res) => {
  console.log("POST /api/cart/add body:", req.body);
  const { productId } = req.body;

  // 1) find product (mock)
  const product = mockProducts.find(p => p.id === Number(productId));
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  // 2) check if already in cart
  const existing = cart.items.find(i => i.productId === product.id);

  const currentQty = existing ? existing.quantity : 0;

  // 3) inventory check
  if (currentQty + 1 > product.stock) {
    return res.status(400).json({ error: "Not enough stock available" });
  }

  // 4) add or increment
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.items.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      category: product.category || "",
      image: product.image || "",
    });
  }

  // 5) recalc total
  recalculateCartTotal();

  return res.status(200).json(cart);
};

/**
 * PUT /api/cart/update
 * body: { productId, quantity }
 */
exports.updateQuantity = (req, res) => {
  const { productId, quantity } = req.body;
  const pid = Number(productId);
  const qty = Number(quantity);

  if (!Number.isFinite(pid) || !Number.isFinite(qty)) {
    return res.status(400).json({ error: "Invalid productId or quantity" });
  }

  const item = cart.items.find(i => i.productId === pid);
  if (!item) {
    return res.status(404).json({ error: "Item not found in cart" });
  }

  // quantity <= 0 → remove item
  if (qty <= 0) {
    cart.items = cart.items.filter(i => i.productId !== pid);
    recalculateCartTotal();
    return res.status(200).json(cart);
  }

  // inventory check
  const product = mockProducts.find(p => p.id === pid);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  if (qty > product.stock) {
    return res.status(400).json({ error: "Not enough stock available" });
  }

  // update quantity
  item.quantity = qty;

  recalculateCartTotal();
  return res.status(200).json(cart);
};

exports.removeItem = (req, res) => {
  const pid = Number(req.params.productId);

  if (!Number.isFinite(pid)) {
    return res.status(400).json({ error: "Invalid productId" });
  }

  const exists = cart.items.some(i => i.productId === pid);
  if (!exists) {
    return res.status(404).json({ error: "Item not found in cart" });
  }

  cart.items = cart.items.filter(i => i.productId !== pid);
  recalculateCartTotal();

  return res.status(200).json(cart);
};

