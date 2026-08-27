/* Ajise Praise — site interactions */
document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile hamburger menu ---- */
  const hamburger = document.querySelector('.hamburger');
  const mainNav = document.querySelector('.main-nav');
  if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Active nav link ---- */
  const current = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---- Header shadow on scroll ---- */
  const header = document.querySelector('.site-header');
  const backToTop = document.querySelector('.back-to-top');
  const onScroll = () => {
    if (header) {
      header.style.borderBottomColor = window.scrollY > 40 ? 'rgba(198,161,91,0.4)' : 'rgba(198,161,91,0.22)';
    }
    if (backToTop) backToTop.classList.toggle('show', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---- Animated statistics (numeric ones only) ---- */
  const statNums = document.querySelectorAll('.stat-num[data-count]');
  if ('IntersectionObserver' in window && statNums.length) {
    const counted = new WeakSet();
    const statIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counted.has(entry.target)) {
          counted.add(entry.target);
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 1400;
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => statIO.observe(el));
  }

  /* ---- Contact form (front-end only, no backend configured) ---- */
  const consultForm = document.getElementById('consult-form');
  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const successBox = document.getElementById('form-success');
      if (successBox) {
        successBox.classList.add('show');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      consultForm.reset();
    });
  }

});
