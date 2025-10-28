// Auto-hide header on scroll down, show on scroll up
let lastScrollY = window.scrollY;
let ticking = false;

function updateHeader() {
  const header = document.querySelector('.site-header');
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 100) { // Start hiding after 100px scroll
    if (currentScrollY > lastScrollY) {
      // Scrolling down - hide header
      header.classList.add('hidden');
    } else {
      // Scrolling up - show header
      header.classList.remove('hidden');
    }
  } else {
    // Near top - always show header
    header.classList.remove('hidden');
  }
  
  lastScrollY = currentScrollY;
  ticking = false;
}

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(updateHeader);
    ticking = true;
  }
}

window.addEventListener('scroll', onScroll);