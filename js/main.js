/* ============================================================
   MEJI FOODS — Premium Interactive JS
   ============================================================ */

const PRODUCTS_DATA = {
  'meji-jollof-chicken': {
    id:        'meji-jollof-chicken',
    name:      'Jollof Rice — Chicken',
    price:     '2.10',
    img:       'assets/product images/Jollof package.jpeg',
    desc:      'Smoky tomato richness with tender chicken and the unmistakable depth of authentic West African jollof. Crafted from a generations-old recipe. Ready in 90 seconds.',
    spice:     2,
    spiceName: 'Mild',
    nutrition: '<p><strong>Ingredients (indicative):</strong> Parboiled rice, tomato purée, onion, chicken, vegetable oil, scotch bonnet pepper, spices.</p><p><strong>Per 250g serving (approx.):</strong> 312 kcal · Protein 9g · Carbohydrate 58g · Fat 5g. Check pack label for full nutritional information.</p>'
  },
  'meji-jollof-veg': {
    id:        'meji-jollof-veg',
    name:      'Jollof Rice — Vegetarian',
    price:     '2.10',
    img:       'assets/product images/Spicy package.jpeg',
    desc:      'All the boldness of classic Jollof — smoky, rich, and deeply aromatic. 100% plant-based with zero compromise on that famous West African depth.',
    spice:     3,
    spiceName: 'Medium',
    nutrition: '<p><strong>Ingredients (indicative):</strong> Parboiled rice, tomato purée, onion, vegetable oil, scotch bonnet pepper, mixed peppers, spices. Suitable for vegans.</p><p><strong>Per 250g serving (approx.):</strong> 298 kcal · Protein 6g · Carbohydrate 57g · Fat 4g. Check pack label for full nutritional information.</p>'
  }
};

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {

  // ---- Scroll progress bar ----
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    const updateProgress = () => {
      const total   = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      progressBar.style.width = total > 0 ? `${(current / total) * 100}%` : '0%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // ---- Cursor spotlight ----
  document.addEventListener('mousemove', e => {
    document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
  }, { passive: true });

  // ---- Navbar scroll ----
  const navbar = document.getElementById('navbar');
  function updateNav() {
    navbar?.classList.toggle('scrolled', window.scrollY > 60);
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
  const scrollObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = Array.from(el.parentElement?.querySelectorAll('.fade-up') || []);
        const delay = siblings.indexOf(el) * 90;
        setTimeout(() => el.classList.add('visible'), delay);
        scrollObserver.unobserve(el);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  fadeEls.forEach(el => scrollObserver.observe(el));

  // ---- HERO — IMMERSIVE 2-FLAVOR SYSTEM ----
  const HERO_FLAVORS = {
    classic: {
      name:    'CLASSIC CHICKEN JOLLOF',
      price:   '£2.10',
      bgColor: '#6B1C0A',
      bgWord:  'JOLLOF',
      desc:    'Rich, deeply smoky, and packed with traditional West African aromatics. Crafted with authentic seasonings — ready in 90 seconds flat.',
    },
    spicy: {
      name:    'FIERY HOT SPICY JOLLOF',
      price:   '£2.10',
      bgColor: '#8B1212',
      bgWord:  'SPICY',
      desc:    'Turn up the heat. Infused with genuine Scotch bonnet peppers and sharp native spices for an uncompromised, layered kick.',
    },
  };

  const heroCx      = document.querySelector('.hero-cx');
  const heroName    = document.getElementById('hero-name');
  const heroPrice   = document.getElementById('hero-price');
  const heroDesc    = document.getElementById('hero-desc');
  const heroBgWord  = document.getElementById('hero-bg-word');
  const heroMetaPrice = document.getElementById('hero-meta-price');
  const tabClassic  = document.getElementById('tab-classic');
  const tabSpicy    = document.getElementById('tab-spicy');
  const packClassic = document.getElementById('pack-classic');
  const packSpicy   = document.getElementById('pack-spicy');
  const heroGlow    = document.getElementById('hero-glow');
  const heroStage   = document.getElementById('hero-stage');

  let currentFlavor = 'classic';
  let heroAnimating = false;

  function setFlavor(flavor) {
    if (flavor === currentFlavor || heroAnimating) return;
    heroAnimating = true;
    currentFlavor = flavor;
    const f = HERO_FLAVORS[flavor];
    if (heroCx) heroCx.style.backgroundColor = f.bgColor;
    heroCx?.setAttribute('data-flavor', flavor);
    if (heroName)  heroName.style.opacity  = '0';
    if (heroDesc)  heroDesc.style.opacity  = '0';
    if (heroPrice) heroPrice.style.opacity = '0';
    setTimeout(() => {
      if (heroName)      heroName.textContent      = f.name;
      if (heroPrice)     heroPrice.textContent     = f.price;
      if (heroDesc)      heroDesc.textContent      = f.desc;
      if (heroBgWord)    heroBgWord.textContent    = f.bgWord;
      if (heroMetaPrice) heroMetaPrice.textContent = `${f.price} / PACK`;
      if (heroName)  heroName.style.opacity  = '1';
      if (heroDesc)  heroDesc.style.opacity  = '1';
      if (heroPrice) heroPrice.style.opacity = '1';
    }, 220);
    tabClassic?.classList.toggle('hero-cx__tab--active', flavor === 'classic');
    tabSpicy?.classList.toggle('hero-cx__tab--active',   flavor === 'spicy');
    setTimeout(() => { heroAnimating = false; }, 750);
  }

  tabClassic?.addEventListener('click', () => setFlavor('classic'));
  tabSpicy?.addEventListener('click',   () => setFlavor('spicy'));
  packClassic?.addEventListener('click', () => setFlavor('classic'));
  packSpicy?.addEventListener('click',   () => setFlavor('spicy'));
  document.addEventListener('keydown', e => {
    if (document.activeElement?.tagName === 'INPUT') return;
    if (e.key === 'ArrowLeft')  setFlavor('classic');
    if (e.key === 'ArrowRight') setFlavor('spicy');
  });

  (() => {
    const f = HERO_FLAVORS.classic;
    if (heroName)      heroName.textContent      = f.name;
    if (heroPrice)     heroPrice.textContent     = f.price;
    if (heroDesc)      heroDesc.textContent      = f.desc;
    if (heroBgWord)    heroBgWord.textContent    = f.bgWord;
    if (heroMetaPrice) heroMetaPrice.textContent = `${f.price} / PACK`;
  })();

  if (heroStage && heroGlow) {
    let rafPending = false;
    heroStage.addEventListener('mousemove', e => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        const rect = heroCx.getBoundingClientRect();
        heroGlow.style.left = `${((e.clientX - rect.left) / rect.width) * 100}%`;
        rafPending = false;
      });
    }, { passive: true });
    heroStage.addEventListener('mouseleave', () => { heroGlow.style.left = '50%'; });
  }

  // ---- Product cards 3D tilt ----
  document.querySelectorAll('.product-card:not(.product-card--coming)').forEach(card => {
    let tiltRaf = null;
    card.addEventListener('mousemove', e => {
      if (tiltRaf) cancelAnimationFrame(tiltRaf);
      tiltRaf = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${-y * 9}deg) rotateY(${x * 9}deg) translateY(-8px) scale(1.01)`;
      });
    });
    card.addEventListener('mouseleave', () => {
      if (tiltRaf) cancelAnimationFrame(tiltRaf);
      card.style.transition = 'transform 0.5s cubic-bezier(0.25,1,0.5,1)';
      card.style.transform = '';
    });
  });

  // ---- Smooth anchor scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = (navbar?.offsetHeight || 80) + 16;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });

  // ---- Ticker pause on hover ----
  const tickerTrack = document.getElementById('ticker-track');
  if (tickerTrack) {
    const marquee = tickerTrack.closest('.seen-in__marquee');
    marquee?.addEventListener('mouseenter', () => { tickerTrack.style.animationPlayState = 'paused'; });
    marquee?.addEventListener('mouseleave', () => { tickerTrack.style.animationPlayState = 'running'; });
  }

  // ---- Video play button ----
  const videoEl      = document.querySelector('.videos__player');
  const videoOverlay = document.getElementById('video-overlay');
  const videoPlayBtn = document.getElementById('video-play-btn');
  videoPlayBtn?.addEventListener('click', () => { videoEl?.play(); videoOverlay?.classList.add('hidden'); });
  videoEl?.addEventListener('pause', () => { videoOverlay?.classList.remove('hidden'); });
  videoEl?.addEventListener('ended', () => { videoOverlay?.classList.remove('hidden'); });

  // ---- Magnetic CTA buttons ----
  document.querySelectorAll('.hero-cx__cta-btn, .navbar__cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.22}px, ${(e.clientY - rect.top - rect.height / 2) * 0.22}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.4s cubic-bezier(0.25,1,0.5,1)';
      btn.style.transform = '';
      setTimeout(() => { btn.style.transition = ''; }, 400);
    });
  });

  // ============================================================
  // GALLERY — MEJI IN THE WILD
  // ============================================================
  const galleryGrid    = document.getElementById('gallery-grid');
  const galleryFilters = document.querySelectorAll('.gallery__filter');
  const galleryTiles   = document.querySelectorAll('.gallery__tile');
  const lbOverlay      = document.getElementById('lb-overlay');
  const lbDialog       = document.getElementById('gallery-lightbox');
  const lbImg          = document.getElementById('lb-img');
  const lbCaption      = document.getElementById('lb-caption');
  const lbClose        = document.getElementById('lb-close');
  const lbPrev         = document.getElementById('lb-prev');
  const lbNext         = document.getElementById('lb-next');

  let lbVisible = [];
  let lbIndex   = 0;

  function applyGalleryFilter(filter) {
    galleryFilters.forEach(btn => {
      const active = btn.dataset.filter === filter;
      btn.classList.toggle('gallery__filter--active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    lbVisible = [];
    galleryTiles.forEach(tile => {
      const show = filter === 'all' || tile.dataset.bucket === filter;
      tile.classList.toggle('gallery__tile--hidden', !show);
      if (show) lbVisible.push(tile);
    });
  }

  galleryFilters.forEach(btn => {
    btn.addEventListener('click', () => applyGalleryFilter(btn.dataset.filter));
  });

  applyGalleryFilter('all');

  // Lightbox
  function openLightbox(index) {
    lbIndex = index;
    const tile = lbVisible[lbIndex];
    if (!tile) return;
    const img     = tile.querySelector('.gallery__tile-img');
    const caption = tile.querySelector('.gallery__tile-caption');
    lbImg.src = img?.src || '';
    lbImg.alt = img?.alt || '';
    lbCaption.textContent = caption?.textContent || '';
    lbOverlay.classList.add('open');
    lbOverlay.removeAttribute('aria-hidden');
    lbDialog.removeAttribute('hidden');
    lbDialog.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    lbOverlay.classList.remove('open');
    lbDialog.classList.remove('open');
    lbOverlay.setAttribute('aria-hidden', 'true');
    setTimeout(() => { lbDialog.setAttribute('hidden', ''); }, 300);
    document.body.style.overflow = '';
  }

  function lbNavigate(dir) {
    lbIndex = (lbIndex + dir + lbVisible.length) % lbVisible.length;
    openLightbox(lbIndex);
  }

  galleryTiles.forEach((tile, i) => {
    tile.addEventListener('click', () => {
      const visIdx = lbVisible.indexOf(tile);
      if (visIdx >= 0) openLightbox(visIdx);
    });
  });

  lbClose?.addEventListener('click', closeLightbox);
  lbOverlay?.addEventListener('click', closeLightbox);
  lbPrev?.addEventListener('click', () => lbNavigate(-1));
  lbNext?.addEventListener('click', () => lbNavigate(1));

  document.addEventListener('keydown', e => {
    if (!lbDialog || lbDialog.hasAttribute('hidden')) return;
    if (e.key === 'Escape')     { closeLightbox(); }
    if (e.key === 'ArrowLeft')  { lbNavigate(-1); }
    if (e.key === 'ArrowRight') { lbNavigate(1); }
  });

  // Mobile gallery gentle auto-scroll
  if (galleryGrid && window.innerWidth <= 768) {
    let autoScrolling = true;
    let scrollInterval = null;

    function startAutoScroll() {
      if (reducedMotion) return;
      scrollInterval = setInterval(() => {
        if (!autoScrolling) return;
        galleryGrid.scrollLeft += 1;
        if (galleryGrid.scrollLeft + galleryGrid.clientWidth >= galleryGrid.scrollWidth - 2) {
          galleryGrid.scrollLeft = 0;
        }
      }, 20);
    }

    galleryGrid.addEventListener('touchstart', () => { autoScrolling = false; }, { passive: true });
    galleryGrid.addEventListener('touchend',   () => { setTimeout(() => { autoScrolling = true; }, 2000); });
    galleryGrid.addEventListener('mouseenter', () => { autoScrolling = false; });
    galleryGrid.addEventListener('mouseleave', () => { autoScrolling = true; });

    startAutoScroll();
  }

  // ============================================================
  // STICKY ADD-TO-CART BAR
  // ============================================================
  const stickyBar     = document.getElementById('sticky-bar');
  const productsSection = document.getElementById('products');
  const stickyBarBtn  = stickyBar?.querySelector('.sticky-bar__btn');

  if (stickyBar && productsSection) {
    const stickyObserver = new IntersectionObserver(
      ([entry]) => {
        const show = !entry.isIntersecting;
        stickyBar.classList.toggle('visible', show);
        stickyBar.setAttribute('aria-hidden', String(!show));
        if (stickyBarBtn) stickyBarBtn.tabIndex = show ? 0 : -1;
      },
      { threshold: 0, rootMargin: '0px 0px 0px 0px' }
    );
    stickyObserver.observe(productsSection);
  }

  // ============================================================
  // BUNDLE BUILDER
  // ============================================================
  const bundleChickenEl  = document.getElementById('bundle-chicken');
  const bundleSpicyEl    = document.getElementById('bundle-spicy');
  const bundleTotalEl    = document.getElementById('bundle-total-packs');
  const bundlePriceOrig  = document.getElementById('bundle-price-original');
  const bundlePriceFinal = document.getElementById('bundle-price-final');
  const bundleSaving     = document.getElementById('bundle-saving');
  const bundleProgress   = document.getElementById('bundle-progress-fill');
  const bundleProgressBar= document.getElementById('bundle-progress-bar');
  const bundleAddBtn     = document.getElementById('bundle-add-btn');

  let bundleQtys = { 'bundle-chicken': 0, 'bundle-spicy': 0 };
  const BUNDLE_TARGET = 6;
  const BUNDLE_PRICES = { 'bundle-chicken': 2.10, 'bundle-spicy': 2.10 };
  const BUNDLE_DISCOUNT = 0.15;

  function updateBundleUI() {
    const chickenQty = bundleQtys['bundle-chicken'];
    const spicyQty   = bundleQtys['bundle-spicy'];
    const total      = chickenQty + spicyQty;
    const rawPrice   = (chickenQty * BUNDLE_PRICES['bundle-chicken']) + (spicyQty * BUNDLE_PRICES['bundle-spicy']);
    const isUnlocked = total >= BUNDLE_TARGET;
    const finalPrice = isUnlocked ? rawPrice * (1 - BUNDLE_DISCOUNT) : rawPrice;

    if (bundleChickenEl) bundleChickenEl.textContent = chickenQty;
    if (bundleSpicyEl)   bundleSpicyEl.textContent   = spicyQty;
    if (bundleTotalEl)   bundleTotalEl.textContent   = total;

    const pct = Math.min((total / BUNDLE_TARGET) * 100, 100);
    if (bundleProgress)    bundleProgress.style.width = `${pct}%`;
    if (bundleProgressBar) {
      bundleProgressBar.setAttribute('aria-valuenow', total);
      bundleProgressBar.setAttribute('aria-valuemax', BUNDLE_TARGET);
    }

    if (bundlePriceFinal) bundlePriceFinal.textContent = `£${finalPrice.toFixed(2)}`;

    if (isUnlocked && rawPrice > 0) {
      if (bundlePriceOrig) { bundlePriceOrig.textContent = `£${rawPrice.toFixed(2)}`; bundlePriceOrig.removeAttribute('hidden'); }
      if (bundleSaving)    bundleSaving.removeAttribute('hidden');
    } else {
      if (bundlePriceOrig) bundlePriceOrig.setAttribute('hidden', '');
      if (bundleSaving)    bundleSaving.setAttribute('hidden', '');
    }

    const canAdd = total > 0 && isUnlocked;
    if (bundleAddBtn) {
      bundleAddBtn.disabled = !canAdd;
      bundleAddBtn.setAttribute('aria-disabled', String(!canAdd));
      bundleAddBtn.textContent = isUnlocked
        ? `Add ${total} packs to cart — £${finalPrice.toFixed(2)}`
        : `Add ${BUNDLE_TARGET - total} more pack${BUNDLE_TARGET - total !== 1 ? 's' : ''} to unlock`;
    }
  }

  document.querySelectorAll('.bundle__step').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      const dir    = parseInt(btn.dataset.dir, 10);
      const current = bundleQtys[target] || 0;
      const total   = Object.values(bundleQtys).reduce((a, b) => a + b, 0);

      if (dir === 1 && total >= 9) return;
      bundleQtys[target] = Math.max(0, current + dir);
      updateBundleUI();
    });
  });

  bundleAddBtn?.addEventListener('click', () => {
    const chickenQty = bundleQtys['bundle-chicken'];
    const spicyQty   = bundleQtys['bundle-spicy'];
    if (!chickenQty && !spicyQty) return;

    const cart = loadCart();
    if (chickenQty > 0) {
      const existing = cart.find(i => i.id === 'meji-jollof-chicken');
      if (existing) existing.qty += chickenQty;
      else cart.push({ id: 'meji-jollof-chicken', name: 'Meji Jollof Rice — Chicken', price: 2.10, qty: chickenQty });
    }
    if (spicyQty > 0) {
      const existing = cart.find(i => i.id === 'meji-jollof-spicy');
      if (existing) existing.qty += spicyQty;
      else cart.push({ id: 'meji-jollof-spicy', name: 'Meji Jollof Rice — Spicy', price: 2.10, qty: spicyQty });
    }
    saveCart(cart);
    renderCart();
    openCart();
    animateBadge();

    bundleQtys = { 'bundle-chicken': 0, 'bundle-spicy': 0 };
    updateBundleUI();
  });

  updateBundleUI();

  // ============================================================
  // QUICK-VIEW MODAL
  // ============================================================
  const qvOverlay = document.getElementById('qv-overlay');
  const qvModal   = document.getElementById('qv-modal');
  const qvClose   = document.getElementById('qv-close');
  const qvImg     = document.getElementById('qv-img');
  const qvName    = document.getElementById('qv-name');
  const qvDesc    = document.getElementById('qv-desc');
  const qvSpiceMeter = document.getElementById('qv-spice-meter');
  const qvSpiceName  = document.getElementById('qv-spice-name');
  const qvNutrition  = document.getElementById('qv-nutrition');
  const qvPrice   = document.getElementById('qv-price');
  const qvAdd     = document.getElementById('qv-add');

  function openQV(productId) {
    const p = PRODUCTS_DATA[productId];
    if (!p || !qvModal) return;

    qvImg.src = p.img;
    qvImg.alt = p.name;
    qvName.textContent = p.name;
    qvDesc.textContent = p.desc;
    qvPrice.textContent = `£${p.price}`;
    qvNutrition.innerHTML = p.nutrition;

    qvAdd.dataset.id    = p.id;
    qvAdd.dataset.name  = p.name;
    qvAdd.dataset.price = p.price;

    qvSpiceMeter?.querySelectorAll('.qv-chili').forEach(chili => {
      chili.classList.toggle('active', parseInt(chili.dataset.n) <= p.spice);
    });
    if (qvSpiceName) qvSpiceName.textContent = p.spiceName;

    qvOverlay.classList.add('open');
    qvOverlay.removeAttribute('aria-hidden');
    qvModal.removeAttribute('hidden');
    qvModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    qvClose.focus();
  }

  function closeQV() {
    qvOverlay.classList.remove('open');
    qvModal.classList.remove('open');
    qvOverlay.setAttribute('aria-hidden', 'true');
    setTimeout(() => { qvModal.setAttribute('hidden', ''); }, 300);
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.product-card__qv-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openQV(btn.dataset.qv);
    });
  });

  qvClose?.addEventListener('click', closeQV);
  qvOverlay?.addEventListener('click', closeQV);
  document.addEventListener('keydown', e => {
    if (qvModal && !qvModal.hasAttribute('hidden') && e.key === 'Escape') closeQV();
  });

  // Focus trap for QV modal
  qvModal?.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const focusable = Array.from(qvModal.querySelectorAll('button, a, input, select, textarea, details, [tabindex]:not([tabindex="-1"])'));
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  // ============================================================
  // PACK → HEAT → PLATE SEQUENCE (videos section)
  // ============================================================
  const seqSection = document.querySelector('.videos__sequence');
  const seqSteps   = document.querySelectorAll('.videos__seq-step');

  if (seqSection) {
    if (reducedMotion) {
      seqSteps.forEach(s => s.classList.add('seq-visible'));
      seqSection.classList.add('seq-active');
    } else {
      const seqObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          seqSteps.forEach(step => step.classList.add('seq-visible'));
          seqSection.classList.add('seq-active');
          seqObserver.unobserve(entry.target);
        },
        { threshold: 0.3 }
      );
      seqObserver.observe(seqSection);
    }
  }

});
