document.addEventListener('DOMContentLoaded', () => {
  let slideIndex = 0;
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');

  function showSlide(index) {
    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === slideIndex);
      dots[i].classList.toggle('active', i === slideIndex);
    });
  }

  function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
  }

  function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
  }

  prev.addEventListener('click', prevSlide);
  next.addEventListener('click', nextSlide);

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      slideIndex = i;
      showSlide(slideIndex);
    });
  });

  // Auto slide every 5 seconds
  setInterval(() => {
    slideIndex++;
    showSlide(slideIndex);
  }, 5000);

  // Initialize
  showSlide(slideIndex);
});
