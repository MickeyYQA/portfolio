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

// Smooth, fast scroll for same-page anchors (e.g., #gallery), accounting for fixed header height
(function() {
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 1, 3) / 2;
  }

  function smoothScrollTo(targetY, duration = 400) {
    const startY = window.scrollY;
    const diff = targetY - startY;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = easeInOutCubic(t);
      window.scrollTo(0, startY + diff * eased);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function handleAnchorClick(e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute('href');
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (!target) return; // let browser handle if target not found

    // Same-page only
    if (link.pathname && link.pathname !== location.pathname) return;

    // Respect reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const header = document.querySelector('.site-header');
    const headerOffset = header ? header.offsetHeight : 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    const scrollToY = Math.max(0, targetTop - headerOffset - 8); // slight extra spacing

    e.preventDefault();
    if (prefersReduced) {
      window.scrollTo({ top: scrollToY });
    } else {
      smoothScrollTo(scrollToY, 400); // fast and smooth
    }
  }

  document.addEventListener('click', handleAnchorClick, { passive: false });
})();