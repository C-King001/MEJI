/* ============================================================
   MEJI FOODS — Main JS (animations, nav, misc)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar scroll ----
  const navbar = document.getElementById('navbar');

  function updateNav() {
    if (window.scrollY > 60) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // ---- Mobile hamburger ----
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger?.addEventListener('click', () => {
    const isOpen = navLinks?.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks?.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger?.classList.remove('active');
      hamburger?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // ---- Scroll fade-up animations ----
  const fadeEls = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // Stagger siblings within same parent
        const siblings = Array.from(el.parentElement?.querySelectorAll('.fade-up') || []);
        const idx = siblings.indexOf(el);
        const delay = idx * 80;
        setTimeout(() => el.classList.add('visible'), delay);
        observer.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  fadeEls.forEach(el => observer.observe(el));

  // ---- Hero stagger on load ----
  const heroFades = document.querySelectorAll('.hero .fade-up');
  heroFades.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 140);
  });

  // ---- Smooth anchor scroll with navbar offset ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = (navbar?.offsetHeight || 80) + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ---- Marquee pause on hover ----
  const track = document.querySelector('.seen-in__track');
  track?.parentElement?.addEventListener('mouseenter', () => {
    if (track) track.style.animationPlayState = 'paused';
  });
  track?.parentElement?.addEventListener('mouseleave', () => {
    if (track) track.style.animationPlayState = 'running';
  });

  // ---- Video play button ----
  const videoEl      = document.querySelector('.videos__player');
  const videoOverlay = document.getElementById('video-overlay');
  const videoPlayBtn = document.getElementById('video-play-btn');

  videoPlayBtn?.addEventListener('click', () => {
    videoEl?.play();
    videoOverlay?.classList.add('hidden');
  });
  videoEl?.addEventListener('pause', () => {
    videoOverlay?.classList.remove('hidden');
  });
  videoEl?.addEventListener('ended', () => {
    videoOverlay?.classList.remove('hidden');
  });

  // ---- Floating elements parallax on mouse ----
  const floats = document.querySelectorAll('.hero__float');
  document.querySelector('.hero')?.addEventListener('mousemove', e => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width  - 0.5;
    const y = (clientY - top)  / height - 0.5;
    floats.forEach((el, i) => {
      const depth = (i + 1) * 12;
      el.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });

});
