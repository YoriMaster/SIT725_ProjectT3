const form = document.querySelector('form');
const submitButton = document.querySelector('button[type="submit"]');
const originalButtonText = submitButton.textContent;

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const dob = document.getElementById('dob').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Validate password match
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  // Validate password length
  if (password.length < 6) {
    alert('Password must be at least 6 characters long!');
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address!');
    return;
  }

  // Validate required fields
  if (!name || !dob) {
    alert('Please fill in all required fields!');
    return;
  }

  // Prepare data
  const formData = {
    name,
    email,
    phone: phone || null,
    dob,
    password,
  };

  // Disable button and show loading state
  submitButton.disabled = true;
  submitButton.textContent = 'Creating Account...';

  // Fetch POST request
  fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      } else {
        alert(data.message || 'Sign up failed!');
        // Re-enable button on error
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
      // Re-enable button on error
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    });
});