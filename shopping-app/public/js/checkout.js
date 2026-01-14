const summaryItemsEl = document.getElementById("summaryItems");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");
const orderNoEl = document.getElementById("orderNo");

const formEl = document.getElementById("checkoutForm");
const msgEl = document.getElementById("msg");

const cardFieldsEl = document.getElementById("cardFields");

function showMsg(t=""){ msgEl.textContent = t; }

function money(v){ return `¥${Number(v||0).toFixed(2)}`; }

async function apiGetCart(){
  const res = await fetch("/api/cart");
  if(!res.ok) throw new Error(await res.text());
  return res.json();
}

async function apiCheckout(payload){
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if(!res.ok) throw new Error(await res.text());
  return res.json();
}

function renderSummary(cart){
  const items = cart.items || [];
  summaryItemsEl.innerHTML = "";

  if(items.length === 0){
    summaryItemsEl.innerHTML = `<p style="color:#6b7280;margin:0;">Cart is empty. Go back and add items.</p>`;
    subtotalEl.textContent = money(0);
    totalEl.textContent = money(0);
    return;
  }

  for(const it of items){
    const row = document.createElement("div");
    row.className = "sitem";
    row.innerHTML = `
      <div class="left">
        <div class="name">${it.name}</div>
        <div class="meta">Qty: ${it.quantity}</div>
      </div>
      <div class="right">${money(it.price * it.quantity)}</div>
    `;
    summaryItemsEl.appendChild(row);
  }

  subtotalEl.textContent = money(cart.totalPrice);
  totalEl.textContent = money(cart.totalPrice);
}

function updatePaymentVisibility(){
  const method = formEl.payMethod.value;
  // only show card fields if "card" is selected
  cardFieldsEl.style.display = method === "card" ? "block" : "none";
}

formEl.payMethod.forEach(r => r.addEventListener("change", updatePaymentVisibility));

(async function init(){
  updatePaymentVisibility();
  try{
    const cart = await apiGetCart();
    renderSummary(cart);
  }catch(e){
    console.error(e);
    showMsg("Failed to load cart for checkout.");
  }
})();

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  showMsg("");

  // 1) get cart, avoid empty order
  let cart;
  try{
    cart = await apiGetCart();
  }catch(err){
    showMsg("Could not load cart.");
    return;
  }
  if(!cart.items || cart.items.length === 0){
    showMsg("Your cart is empty.");
    return;
  }

  // 2) collect shipping & payment info
  const shipping = {
    firstName: formEl.firstName.value.trim(),
    lastName: formEl.lastName.value.trim(),
    address1: formEl.address1.value.trim(),
    address2: formEl.address2.value.trim(),
    city: formEl.city.value.trim(),
    state: formEl.state.value.trim(),
    postcode: formEl.postcode.value.trim(),
    country: formEl.country.value.trim(),
  };

  const payMethod = formEl.payMethod.value;

  // last 4 digits for card payment
  let payment = { method: payMethod };
  if(payMethod === "card"){
    const raw = (formEl.cardNumber.value || "").replace(/\s+/g, "");
    const last4 = raw.slice(-4);
    payment = { method: "card", last4 };
  }

  try{
    const result = await apiCheckout({ shipping, payment });
    orderNoEl.textContent = `# ${result.orderId}`;

    // store order info for confirmation page
    sessionStorage.setItem("lastOrder", JSON.stringify(result));

    window.location.href = "/confirmation.html";
  }catch(err){
    console.error(err);
    showMsg("Checkout failed (mock). Please check your inputs.");
  }
});
