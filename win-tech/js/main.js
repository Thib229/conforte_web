/* =============================================
   1. ACTIVE NAV LINK
   ============================================= */
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.drawer-nav a, .desktop-nav .nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });
}

/* =============================================
   2. NAVBAR SCROLL — compacte + opaque
   ============================================= */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  }, { passive: true });
}

/* =============================================
   3. DRAWER MOBILE
   ============================================= */
function initDrawer() {
  const burgerBtn = document.getElementById('burgerBtn');
  const drawer    = document.getElementById('mobileDrawer');
  const overlay   = document.getElementById('drawerOverlay');
  const closeBtn  = document.getElementById('drawerClose');
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

  burgerBtn.addEventListener('click', () =>
    drawer.classList.contains('open') ? closeDrawer() : openDrawer()
  );
  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach(l => l.addEventListener('click', closeDrawer));
}

/* =============================================
   4. SCROLL ANIMATIONS — fade + slide directionnel
   ============================================= */
function initScrollAnimation() {
  const elements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .slide-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  elements.forEach(el => observer.observe(el));
}

/* =============================================
   5. COMPTEURS ANIMÉS
   ============================================= */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString('fr-FR') + (el.dataset.suffix || '');
  }, 16);
}

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

/* =============================================
   6. VALIDATION FORMULAIRES EN TEMPS RÉEL
   ============================================= */
function initFormValidation() {
  document.querySelectorAll('form').forEach(form => {
    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) validateField(input);
      });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      inputs.forEach(input => { if (!validateField(input)) valid = false; });
      if (valid) showFormSuccess(form);
    });
  });
}

function validateField(input) {
  const value = input.value.trim();
  let error = '';

  if (input.required && !value) {
    error = 'Ce champ est obligatoire.';
  } else if (input.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    error = 'Adresse email invalide.';
  } else if (input.type === 'tel' && value && !/^[\d\s\+\-]{8,}$/.test(value)) {
    error = 'Numéro de téléphone invalide.';
  }

  const feedback = input.nextElementSibling?.classList.contains('invalid-feedback')
    ? input.nextElementSibling
    : (() => {
        const d = document.createElement('div');
        d.className = 'invalid-feedback';
        input.after(d);
        return d;
      })();

  if (error) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    feedback.textContent = error;
    return false;
  } else if (value) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    feedback.textContent = '';
    return true;
  }
  return true;
}

function showFormSuccess(form) {
  form.innerHTML = `
    <div class="text-center py-4">
      <div class="success-icon mb-3">
        <i class="bi bi-check-circle-fill text-success" style="font-size:3rem;"></i>
      </div>
      <h5 class="fw-bold text-success">Demande envoyée !</h5>
      <p class="text-muted">Nous vous contacterons dans les plus brefs délais.</p>
    </div>`;
}

/* =============================================
   7. RIPPLE EFFECT sur les boutons
   ============================================= */
function initRipple() {
  document.querySelectorAll('.btn-accent, .btn-outline-primary').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
      `;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/* =============================================
   8. PAGE TRANSITION (fade)
   ============================================= */
function initPageTransition() {
  document.body.classList.add('page-ready');

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (
      !href.startsWith('#') &&
      !href.startsWith('http') &&
      !href.startsWith('mailto') &&
      href.endsWith('.html')
    ) {
      link.addEventListener('click', e => {
        e.preventDefault();
        document.body.classList.remove('page-ready');
        setTimeout(() => { window.location.href = href; }, 280);
      });
    }
  });
}

/* =============================================
   9. SCROLL TO TOP
   ============================================= */
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* =============================================
   INIT
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initNavbarScroll();
  initDrawer();
  initScrollAnimation();
  initCounters();
  initFormValidation();
  initRipple();
  initPageTransition();
  initScrollTop();
});
