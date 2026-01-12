// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('dynamic-container');

  // Create new div element
  const newDiv = document.createElement('div');
  newDiv.textContent = 'This div was added dynamically by script.js!';
  newDiv.style.padding = '10px';
  newDiv.style.backgroundColor = '#e0f7fa';
  newDiv.style.border = '1px solid #00796b';

  // Append new div to container
  container.appendChild(newDiv);
});
