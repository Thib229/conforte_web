// Active nav link
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.drawer-nav a, .desktop-nav .nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

// Drawer mobile
function initDrawer() {
  const burgerBtn = document.getElementById('burgerBtn');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const closeBtn = document.getElementById('drawerClose');
  if (!burgerBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('active');
    burgerBtn.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    burgerBtn.classList.remove('open');
    document.body.style.overflow = '';
  }

  burgerBtn.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });

  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  // Fermer au clic sur un lien
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

// Scroll fade-in animation
function initScrollAnimation() {
  const elements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  elements.forEach(el => observer.observe(el));
}

// Scroll to top button
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initDrawer();
  initScrollAnimation();
  initScrollTop();
});
