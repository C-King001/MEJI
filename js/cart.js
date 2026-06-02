/* ============================================================
   MEJI FOODS — Cart (localStorage)
   ============================================================ */

const CART_KEY = 'meji_cart';

const PRODUCT_ICONS = {
  'meji-jollof-chicken': '🍚',
  'meji-jollof-veg':     '🌿',
};

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(id, name, price) {
  const cart = loadCart();
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price: parseFloat(price), qty: 1 });
  }
  saveCart(cart);
  renderCart();
  openCart();
  animateBadge();
}

function removeFromCart(id) {
  const cart = loadCart().filter(i => i.id !== id);
  saveCart(cart);
  renderCart();
}

function updateQty(id, delta) {
  const cart = loadCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(0, item.qty + delta);
  if (item.qty === 0) {
    const idx = cart.indexOf(item);
    cart.splice(idx, 1);
  }
  saveCart(cart);
  renderCart();
}

function getTotal(cart) {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function getCount(cart) {
  return cart.reduce((sum, i) => sum + i.qty, 0);
}

const FREE_SHIPPING_THRESHOLD = 10;

function updateShippingBar() {
  const cart     = loadCart();
  const total    = getTotal(cart);
  const textEl   = document.getElementById('shipping-bar-text');
  const fillEl   = document.getElementById('shipping-bar-fill');
  const trackEl  = document.getElementById('shipping-progress');
  if (!textEl || !fillEl) return;

  if (total >= FREE_SHIPPING_THRESHOLD) {
    textEl.textContent = '🎉 You\'ve unlocked FREE delivery!';
    fillEl.style.width = '100%';
    if (trackEl) trackEl.setAttribute('aria-valuenow', '100');
  } else {
    const remaining = (FREE_SHIPPING_THRESHOLD - total).toFixed(2);
    textEl.textContent = `Add £${remaining} more for FREE delivery`;
    const pct = Math.round((total / FREE_SHIPPING_THRESHOLD) * 100);
    fillEl.style.width = `${pct}%`;
    if (trackEl) trackEl.setAttribute('aria-valuenow', String(pct));
  }
}

function renderCart() {
  const cart = loadCart();
  const itemsEl   = document.getElementById('cart-items');
  const emptyEl   = document.getElementById('cart-empty');
  const footerEl  = document.getElementById('cart-footer');
  const totalEl   = document.getElementById('cart-total');
  const badgeEl   = document.getElementById('cart-badge');

  const count = getCount(cart);

  // Badge
  if (badgeEl) {
    if (count > 0) {
      badgeEl.textContent = count;
      badgeEl.style.display = 'flex';
    } else {
      badgeEl.style.display = 'none';
    }
  }

  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.style.display = 'none';
    if (emptyEl)  emptyEl.style.display  = 'flex';
    if (footerEl) footerEl.style.display = 'none';
    return;
  }

  itemsEl.style.display  = 'flex';
  if (emptyEl)  emptyEl.style.display  = 'none';
  if (footerEl) footerEl.style.display = 'flex';

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item__icon">${PRODUCT_ICONS[item.id] || '🛒'}</div>
      <div class="cart-item__info">
        <div class="cart-item__name">${item.name}</div>
        <div class="cart-item__price">£${(item.price * item.qty).toFixed(2)}</div>
      </div>
      <div class="cart-item__controls">
        <button class="cart-item__qty-btn" onclick="updateQty('${item.id}', -1)" aria-label="Decrease quantity">−</button>
        <span class="cart-item__qty">${item.qty}</span>
        <button class="cart-item__qty-btn" onclick="updateQty('${item.id}', 1)" aria-label="Increase quantity">+</button>
      </div>
    </div>
  `).join('');

  if (totalEl) {
    totalEl.textContent = `£${getTotal(cart).toFixed(2)}`;
  }

  updateShippingBar();
}

function openCart() {
  document.getElementById('cart-drawer')?.classList.add('open');
  document.getElementById('cart-overlay')?.classList.add('open');
  document.getElementById('cart-drawer')?.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-drawer')?.classList.remove('open');
  document.getElementById('cart-overlay')?.classList.remove('open');
  document.getElementById('cart-drawer')?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function animateBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  badge.style.animation = 'none';
  void badge.offsetWidth;
  badge.style.animation = '';
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  renderCart();

  document.getElementById('cart-toggle')?.addEventListener('click', openCart);
  document.getElementById('cart-close')?.addEventListener('click', closeCart);
  document.getElementById('cart-overlay')?.addEventListener('click', closeCart);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeCart();
  });

  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const { id, name, price } = btn.dataset;
      addToCart(id, name, price);

      btn.textContent = 'Added ✓';
      btn.style.background = 'var(--color-green)';
      setTimeout(() => {
        btn.textContent = 'Add to Cart';
        btn.style.background = '';
      }, 1800);
    });
  });

  document.getElementById('newsletter-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    if (!email) return;
    document.getElementById('newsletter-form').querySelector('.newsletter__fields').style.display = 'none';
    document.getElementById('newsletter-success').style.display = 'block';
  });
});
