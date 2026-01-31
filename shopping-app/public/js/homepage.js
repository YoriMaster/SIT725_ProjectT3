// public/js/homepage.js

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('category-container');

  try {
    // Fetch categories from API
    const response = await fetch('/api/resource/product-category');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const data = result.data;

    // Create cards for each category
    data.forEach(category => {
      const cardHTML = `
        <div class="category-card" data-category-id="${category.category_id}">
          <div class="card-icon">
            <img src="${category.icon}" alt="${category.name}" class="icon-image">
          </div>
          <div class="card-name">${category.name}</div>
          <div class="card-description">${category.description}</div>
        </div>
      `;

      // Append card to container
      container.innerHTML += cardHTML;
    });

    // Add click event listeners to all cards
    attachCardClickHandlers();

  } catch (error) {
    console.error('Error fetching categories:', error);
    container.innerHTML = '<p>Error loading categories. Please try again later.</p>';
  }
});

// Function to handle card clicks
function attachCardClickHandlers() {
  const cards = document.querySelectorAll('.category-card');
  
  cards.forEach(card => {
    card.addEventListener('click', handleCardClick);
  });
}

// Handle card click event
function handleCardClick(event) {
  const categoryId = this.getAttribute('data-category-id');
  const categoryName = this.querySelector('.card-name').textContent;
  
  console.log('Clicked category:', categoryId, categoryName);
  
  // Fetch and display products
  fetchProductsByCategory(categoryId, categoryName);
}

// Fetch products by category
async function fetchProductsByCategory(categoryId, categoryName) {
  const productContainer = document.getElementById('product-container');
  try {
    // Show loading state
    productContainer.innerHTML = '<p>Loading products...</p>';
    
    const response = await fetch(`/api/product/byCategory/${categoryId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const products = result.data;

    // Display products
    displayProducts(products, categoryName, productContainer);

  } catch (error) {
    console.error('Error fetching products:', error);
    productContainer.innerHTML = '<p>Error loading products. Please try again later.</p>';
  }
}

// Display products in product-container
function displayProducts(products, categoryName, container) {
  // Clear container
  container.innerHTML = '';
  
  // Add category title
  const titleHTML = `<h2>${categoryName} Products</h2>`;
  container.innerHTML += titleHTML;

  if (products.length === 0) {
    container.innerHTML += '<p>No products found in this category.</p>';
    return;
  }

  // Create product cards
  products.forEach(product => {
    const productHTML = `
      <div class="product-card" data-product-id="${product.product_id}">
        <div class="product-image">
          <img src="${product.image || '/images/placeholder.png'}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.shortDescription || 'No description'}</p>
          <div class="product-footer">
            <span class="product-price">$${product.price}</span>
            <button class="btn-add-cart" data-product-id="${product.product_id}">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
    
    container.innerHTML += productHTML;
  });

  // Attach event listeners to product cards and "Add to Cart" buttons
  attachProductCardClickHandlers();
  attachAddToCartHandlers();
}


// Handle product card clicks to redirect to product detail page
function attachProductCardClickHandlers() {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    card.addEventListener('click', function(event) {
      // Don't redirect if clicking the "Add to Cart" button
      if (event.target.classList.contains('btn-add-cart')) {
        event.stopPropagation();
        return;
      }
      
      const productId = this.getAttribute('data-product-id');
      console.log('Navigating to product:', productId);
      window.location.href = `/product/${productId}`;
    });
  });
}

// Handle "Add to Cart" button clicks
function attachAddToCartHandlers() {
  const buttons = document.querySelectorAll('.btn-add-cart');

  buttons.forEach(button => {
    button.addEventListener('click', async function (event) {
      event.stopPropagation(); // Prevent card click from triggering

      const productId = this.getAttribute('data-product-id');

      try {
        const res = await fetch("/api/cart/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, quantity: 1 }),
        });

        if (!res.ok) {
          alert(await res.text());
          return;
        }

        const cart = await res.json();
        updateCartBadgeFromCart(cart);
        showCartModal();
      } catch (err) {
        console.error(err);
        alert("Network error");
      }
    });
  });
}

function updateCartBadgeFromCart(cart) {
  const badge = document.getElementById("cartBadge");
  if (!badge) return;

  const items = Array.isArray(cart.items) ? cart.items : [];
  const count = items.reduce((sum, it) => sum + Number(it.quantity || 0), 0);

  if (count > 0) {
    badge.textContent = String(count);
    badge.style.display = "flex";
  } else {
    badge.style.display = "none";
  }
}