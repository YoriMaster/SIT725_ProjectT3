async function refreshCartBadge() {
  const cartBadge = document.getElementById("cartBadge");
  if (!cartBadge) return;

  try {
    const res = await fetch("/api/cart", { cache: "no-store" });
    if (!res.ok) {
      cartBadge.style.display = "none";
      return;
    }

    const cart = await res.json();
    const items = Array.isArray(cart.items) ? cart.items : [];

    const count = items.reduce(
      (sum, it) => sum + Number(it.quantity || 0),
      0
    );

    if (count > 0) {
      cartBadge.textContent = String(count);
      cartBadge.style.display = "flex";
    } else {
      cartBadge.style.display = "none";
    }
  } catch (err) {
    console.error("Failed to refresh cart badge:", err);
    cartBadge.style.display = "none";
  }
}

// Initial load
document.addEventListener("DOMContentLoaded", () => {
  refreshCartBadge();
});

// Listen for add to cart button clicks
document.addEventListener("click", (e) => {
  // ① homepage button
  const homeBtn = e.target.closest(".btn-add-cart");

  // ② product page button
  const productBtn = e.target.closest(".btn");

  const isProductAddBtn =
    productBtn &&
    productBtn.type === "button" &&
    productBtn.textContent.trim().toLowerCase() === "add to cart";

  if (!homeBtn && !isProductAddBtn) return;

  setTimeout(refreshCartBadge, 300);
});