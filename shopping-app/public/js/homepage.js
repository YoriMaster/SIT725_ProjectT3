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
    
    const response = await fetch(`/api/product/${categoryId}`);
    
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
      <div class="product-card">
        <div class="product-image">
          <img src="${product.image || '/images/placeholder.png'}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.shortDescription || 'No description'}</p>
          <div class="product-footer">
            <span class="product-price">$${product.price}</span>
            <button class="btn-add-cart" data-product-id="${product._id}">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
    
    container.innerHTML += productHTML;
  });

  // Attach event listeners to "Add to Cart" buttons
  attachAddToCartHandlers();
}

// Handle "Add to Cart" button clicks
function attachAddToCartHandlers() {
  const buttons = document.querySelectorAll('.btn-add-cart');
  
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.getAttribute('data-product-id');
      console.log('Added to cart:', productId);
      // Add your cart logic here
    });
  });
}
