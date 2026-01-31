const cartService = require("../services/cart.service");

// order ID（mock）
function generateOrderId() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `ORD-${y}${m}${d}-${rand}`;
}

function getSessionUserId(req) {
  const id = req.session?.user?.id;
  if (!id) {
    const err = new Error("Unauthorized");
    err.status = 401;
    throw err;
  }
  return id;
}

exports.checkout = async (req, res) => {
  try {
    const userId = getSessionUserId(req);

    // ✅ DB cart (per user)
    const cart = await cartService.getCart(userId);

    if (!cart.items || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const { shipping, payment } = req.body || {};

    if (!shipping || !shipping.address1 || !shipping.city || !shipping.postcode) {
      return res.status(400).json({ error: "Missing shipping fields" });
    }

    if (!payment || !payment.method) {
      return res.status(400).json({ error: "Missing payment method" });
    }

    const orderId = generateOrderId();

    // mock response
    const confirmation = {
      orderId,
      createdAt: new Date().toISOString(),
      items: cart.items,
      totalPrice: cart.totalPrice,
      shipping,
      payment: {
        method: payment.method,
        last4: payment.last4 || null,
      },
      status: "CONFIRMED (MOCK)",
    };

    // clear user's cart
    await cartService.clearCart(userId);

    return res.status(200).json(confirmation);
  } catch (e) {
    console.error(e);
    return res.status(e.status || 500).json({ error: e.message || "Server error" });
  }
};