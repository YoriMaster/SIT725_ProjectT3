const emptyStateEl = document.getElementById("emptyState");
const cartSectionEl = document.getElementById("cartSection");
const cartListEl = document.getElementById("cartList");

const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");
const msgEl = document.getElementById("msg");

const selectAllEl = document.getElementById("selectAll");
const deleteSelectedBtnEl = document.getElementById("deleteSelectedBtn");
const selectedCountEl = document.getElementById("selectedCount");
const bulkbarEl = document.getElementById("bulkbar");

// keep selected productIds across re-renders
const selectedIds = new Set();

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

function updateSelectedCountUI() {
  const n = selectedIds.size;

  if (selectedCountEl) {
    selectedCountEl.textContent = n > 0 ? `${n} selected` : "";
  }

  if (deleteSelectedBtnEl) {
    deleteSelectedBtnEl.disabled = n === 0;
  }
}

function syncSelectAllUI(cartItems) {
  if (!selectAllEl) return;

  if (!cartItems || cartItems.length === 0) {
    selectAllEl.checked = false;
    selectAllEl.disabled = true;
    return;
  }

  selectAllEl.disabled = false;
  selectAllEl.checked = cartItems.every((it) => selectedIds.has(String(it.productId)));
}

function pruneSelectedIds(cartItems) {
  const existing = new Set(cartItems.map((it) => String(it.productId)));
  for (const id of Array.from(selectedIds)) {
    if (!existing.has(id)) selectedIds.delete(id);
  }
}

function render(cart) {
  const items = Array.isArray(cart.items) ? cart.items : [];



  pruneSelectedIds(items);
  syncSelectAllUI(items);
  updateSelectedCountUI();

  if (items.length === 0) {
    emptyStateEl.classList.remove("hidden");
    cartSectionEl.classList.add("hidden");
    subtotalEl.textContent = money(0);
    totalEl.textContent = money(0);
    cartListEl.innerHTML = "";

    selectedIds.clear();
    selectAllEl && (selectAllEl.checked = false);
    deleteSelectedBtnEl && (deleteSelectedBtnEl.disabled = true);
    updateSelectedCountUI();
    bulkbarEl?.classList.add("hidden");
    return;
  }

  emptyStateEl.classList.add("hidden");
  bulkbarEl?.classList.remove("hidden");
  cartSectionEl.classList.remove("hidden");

  cartListEl.innerHTML = "";

  for (const item of items) {
    const card = document.createElement("div");
    card.className = "card";

    card.dataset.productId = String(item.productId);

    const firstLetter = (item.name || "?").trim().slice(0, 1).toUpperCase();

    const imgHtml = item.image
      ? `<img src="${item.image}" alt="${item.name || ""}"/>`
      : firstLetter;

    card.innerHTML = `
      <div class="item">
        <div class="thumb">${imgHtml}</div>

        <div class="meta">
          <div class="top">
            <div class="leftTop">
              <input class="pick" type="checkbox" title="Select item" />
                <div>
                  <h3 class="name">${item.name || ""}</h3>
                  <p class="category">${item.category || ""}</p>
                </div>
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

    const pickEl = card.querySelector(".pick");
    const pid = String(item.productId);
    pickEl.checked = selectedIds.has(pid);

    pickEl.addEventListener("change", () => {
      if (pickEl.checked) selectedIds.add(pid);
      else selectedIds.delete(pid);

      syncSelectAllUI(items);
      updateSelectedCountUI();
    });

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
  syncSelectAllUI(items);
  updateSelectedCountUI();
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
  window.location.href = "/checkout";
});

// Select All toggle
selectAllEl?.addEventListener("change", () => {
  const checked = selectAllEl.checked;

  document.querySelectorAll("#cartList .card").forEach((card) => {
    const pid = card.dataset.productId;
    if (!pid) return;

    const pick = card.querySelector(".pick");
    if (pick) pick.checked = checked;

    if (checked) selectedIds.add(pid);
    else selectedIds.delete(pid);
  });

  updateSelectedCountUI();
});

deleteSelectedBtnEl?.addEventListener("click", async () => {
  const ids = Array.from(selectedIds);
  if (ids.length === 0) {
    showMsg("Please select at least one item.");
    return;
  }

  const ok = confirm(`Delete ${ids.length} selected item(s)?`);
  if (!ok) return;

  showMsg("");

  // sequential delete (simple + stable)
  const failed = [];
  for (const id of ids) {
    try {
      await apiRemove(id);
      selectedIds.delete(id);
    } catch (e) {
      console.error(e);
      failed.push(id);
    }
  }

  if (failed.length > 0) {
    showMsg(`Some items could not be deleted: ${failed.join(", ")}`);
  } else {
    showMsg("Selected items deleted.");
  }

  await refresh(); // re-fetch and re-render
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

refresh();

