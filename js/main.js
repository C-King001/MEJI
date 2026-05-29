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

  // ---- Hero carousel ----
  const HERO_FLAVORS = [
    {
      name: 'CLASSIC CHICKEN JOLLOF', price: '£5.99', bg: '#D4553D',
      desc: 'Rich, deeply smoky, and packed with traditional West African aromatics. Crafted with authentic seasonings—ready in 90 seconds flat.',
    },
    {
      name: 'FIERY HOT SPICY JOLLOF', price: '£6.49', bg: '#991B1B',
      desc: 'Turn up the heat. Infused with genuine Scotch bonnet peppers and sharp native spices for an intense, uncompromised kick.',
    },
    {
      name: 'AUTHENTIC VEGAN JOLLOF', price: '£5.49', bg: '#166534',
      desc: '100% plant-based, 100% real flavour. Rich tomato purée, sweet bell peppers, and traditional steamed grains without shortcuts.',
    },
    {
      name: 'SMOKED SUYA JOLLOF', price: '£6.29', bg: '#451A03',
      desc: 'The ultimate crossover. Signature Jollof grains layered with bold, nutty, grilled spice blend for a layered backend crunch.',
    },
  ];

  const heroCx    = document.querySelector('.hero-cx');
  const heroPacks = document.querySelectorAll('.hero-cx__pack');
  const heroName  = document.querySelector('.hero-cx__name');
  const heroPrice = document.querySelector('.hero-cx__price');
  const heroDesc  = document.querySelector('.hero-cx__desc');

  let heroIndex     = 0;
  let heroAnimating = false;

  function heroRole(i) {
    if (i === heroIndex)            return 'center';
    if (i === (heroIndex + 3) % 4) return 'left';
    if (i === (heroIndex + 1) % 4) return 'right';
    return 'back';
  }

  function heroUpdate() {
    const f = HERO_FLAVORS[heroIndex];
    if (heroCx)    heroCx.style.backgroundColor = f.bg;
    if (heroName)  heroName.textContent  = f.name;
    if (heroPrice) heroPrice.textContent = f.price;
    if (heroDesc)  heroDesc.textContent  = f.desc;
    heroPacks.forEach((p, i) => {
      p.className = `hero-cx__pack hero-cx__pack--${heroRole(i)}`;
    });
  }

  function heroNavigate(dir) {
    if (heroAnimating) return;
    heroAnimating = true;
    heroIndex = dir === 'next' ? (heroIndex + 1) % 4 : (heroIndex + 3) % 4;
    heroUpdate();
    setTimeout(() => heroAnimating = false, 650);
  }

  if (heroCx) {
    document.getElementById('hero-prev')?.addEventListener('click', () => heroNavigate('prev'));
    document.getElementById('hero-next')?.addEventListener('click', () => heroNavigate('next'));
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  heroNavigate('prev');
      if (e.key === 'ArrowRight') heroNavigate('next');
    });
    heroUpdate();
  }

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


});
