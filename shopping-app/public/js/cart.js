const emptyStateEl = document.getElementById("emptyState");
const cartSectionEl = document.getElementById("cartSection");
const cartListEl = document.getElementById("cartList");

const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");
const msgEl = document.getElementById("msg");

function showMsg(t = "") {
  msgEl.textContent = t;
}

async function apiGetCart() {
  const res = await fetch("/api/cart");
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function apiUpdate(productId, quantity) {
  const res = await fetch("/api/cart/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function apiRemove(productId) {
  const res = await fetch(`/api/cart/remove/${productId}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

function money(v) {
  return `$${Number(v || 0).toFixed(2)}`;
}

function render(cart) {
  const items = Array.isArray(cart.items) ? cart.items : [];

  if (items.length === 0) {
    emptyStateEl.classList.remove("hidden");
    cartSectionEl.classList.add("hidden");
    subtotalEl.textContent = money(0);
    totalEl.textContent = money(0);
    cartListEl.innerHTML = "";
    return;
  }

  emptyStateEl.classList.add("hidden");
  cartSectionEl.classList.remove("hidden");

  cartListEl.innerHTML = "";

  for (const item of items) {
    const card = document.createElement("div");
    card.className = "card";

    const firstLetter = (item.name || "?").trim().slice(0, 1).toUpperCase();

    const imgHtml = item.image
      ? `<img src="${item.image}" alt="${item.name || ""}"/>`
      : firstLetter;

    card.innerHTML = `
      <div class="item">
        <div class="thumb">${imgHtml}</div>

        <div class="meta">
          <div class="top">
            <div>
              <h3 class="name">${item.name || ""}</h3>
              <p class="category">${item.category || ""}</p>
            </div>
            <button class="trash" title="Remove">🗑️</button>
          </div>

          <div class="bottom">
            <span class="price">${money(item.price)}</span>

            <div class="qtybox">
              <button class="qtybtn dec" aria-label="Decrease">−</button>
              <span class="qty">${item.quantity}</span>
              <button class="qtybtn inc" aria-label="Increase">+</button>
            </div>
          </div>
        </div>
      </div>
    `;

    card.querySelector(".trash").addEventListener("click", async () => {
      await handleRemove(item.productId);
    });

    card.querySelector(".dec").addEventListener("click", async () => {
      await handleUpdate(item.productId, item.quantity - 1);
    });

    card.querySelector(".inc").addEventListener("click", async () => {
      await handleUpdate(item.productId, item.quantity + 1);
    });

    cartListEl.appendChild(card);
  }

  subtotalEl.textContent = money(cart.totalPrice);
  totalEl.textContent = money(cart.totalPrice);
}

async function refresh() {
  showMsg("");
  try {
    const cart = await apiGetCart();
    render(cart);
  } catch (e) {
    console.error(e);
    showMsg("Failed to load cart.");
  }
}

async function handleUpdate(productId, quantity) {
  showMsg("");
  try {
    const cart = await apiUpdate(productId, quantity);
    render(cart);
  } catch (e) {
    console.error(e);
    showMsg("Update failed (invalid quantity or out of stock).");
  }
}

async function handleRemove(productId) {
  showMsg("");
  try {
    const cart = await apiRemove(productId);
    render(cart);
  } catch (e) {
    console.error(e);
    showMsg("Remove failed.");
  }
}

document.getElementById("checkoutBtn").addEventListener("click", () => {
  window.location.href = "/checkout.html";
});

async function apiAdd(productId) {
  const res = await fetch("/api/cart/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function handleAdd(productId) {
  showMsg("");
  try {
    const cart = await apiAdd(productId);
    render(cart);
  } catch (e) {
    console.error(e);
    showMsg("Add failed (maybe out of stock).");
  }
}

document.getElementById("add1").addEventListener("click", () => handleAdd(1));
document.getElementById("add2").addEventListener("click", () => handleAdd(2));
document.getElementById("add3").addEventListener("click", () => handleAdd(3));


refresh();
