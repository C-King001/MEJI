# Meji Foods — Website

Premium static ecommerce site for **Meji Foods**, makers of authentic West African Jollof Rice ready in 90 seconds. Stocked in 400+ UK retailers including Sainsbury's.

**Stack:** Plain HTML / CSS / JS — no framework, no build step, no dependencies.

---

## Project Structure

```
Meji/
├── index.html                  # Single-page site
├── css/
│   ├── style.css               # Global tokens, resets, typography, buttons
│   └── components.css          # All section-level component styles
├── js/
│   ├── main.js                 # All interactive behaviour
│   └── cart.js                 # Cart logic (localStorage)
└── assets/
    ├── images/                 # Photography, logos, video poster frames
    ├── product images/         # Transparent-background product PNGs
    └── Videos/                 # Brand video
```

---

## Features

### Hero
- Immersive full-viewport hero with 2-flavour toggle (Classic / Spicy)
- `data-flavor` CSS state machine drives pack positioning, background colour, and atmospheric glow — no JS touching transform values directly
- Transparent product PNGs with `filter: drop-shadow()` hugging the pouch shape
- Giant watermark background word fades/swaps on flavour change
- Cursor-parallax glow, keyboard arrow key support, click inactive pack to switch

### Navigation
- Fixed navbar that gains a dark background on scroll
- Mobile fullscreen hamburger menu
- Smooth anchor scroll with navbar offset

### Products
- Liquid-glass product cards with 3D tilt on hover
- Quick View button → focus-trapped modal with larger image, spice-level meter (🌶), and collapsible ingredients/nutrition block
- Honest trust signals: Gluten-free · Vegan · Stocked in Sainsbury's (no fabricated ratings)

### Bundle Builder
- Mix & match Chicken + Spicy packs
- At 6 packs: 15% discount unlocks automatically with live price update
- Single "Add box to cart" adds all items via existing cart API in one batch

### Cart
- Slide-in cart drawer (localStorage persistence)
- Free-shipping progress bar — £25 threshold, live gradient fill
- Add-to-cart confirmation (button turns green for 1.8s)

### Sticky Add-to-Cart Bar
- Slides up from bottom once the products section scrolls out of view (`IntersectionObserver`)
- Hidden on initial load; reuses same cart class/data attributes

### Gallery — Meji in the Wild
- Unified photo grid replacing three previously duplicated image sections
- Filter pills: All · In Stores · In Hands · At Events
- Desktop: CSS masonry grid (column spans)
- Mobile: horizontally scrollable with gentle JS auto-scroll, pauses on touch
- Click tile → lightbox (prev/next, ESC, click-outside to close, focus-trapped)

### Videos Section
- Full brand video with custom play button
- Scroll-triggered Pack → Heat → Plate animated sequence above the player

### Other Sections
- Partner ticker (Sainsbury's, Amazon, TikTok Shop, independents) — infinite marquee, pauses on hover
- How It Works — 3-step visual (Open → Heat → Eat)
- Why Meji promise cards (outcome-focused)
- Our Story — Stephanie Olubajo's BCG-to-founder journey
- Stockists grid with real retailer logos
- Newsletter signup with success state

---

## Cart API

All add-to-cart controls must use:

```html
<button class="add-to-cart"
  data-id="meji-jollof-chicken"
  data-name="Meji Jollof Rice — Chicken"
  data-price="5.99">
  Add to Cart
</button>
```

The `DOMContentLoaded` listener in `cart.js` binds to every `.add-to-cart` in the DOM at load time. Data attributes are read at click time so dynamically populated buttons (quick-view modal, sticky bar) work without rebinding.

Cart functions available globally: `addToCart(id, name, price)` · `removeFromCart(id)` · `updateQty(id, delta)` · `openCart()` · `closeCart()` · `renderCart()` · `loadCart()` · `saveCart(cart)` · `animateBadge()`

---

## Design Tokens (css/style.css `:root`)

| Token | Value |
|---|---|
| `--color-fire` | `#E8421A` |
| `--color-gold` | `#F5A41F` |
| `--color-dark` | `#1A1208` |
| `--color-cream` | `#FDF6EC` |
| `--color-green` | `#1F4A2C` |
| `--font-display` | Syne 800 |
| `--font-body` | Inter |

---

## Accessibility

- All animations honour `prefers-reduced-motion` (static fallback throughout)
- Modals and lightbox are focus-trapped with ESC to close
- `aria-label`, `aria-pressed`, `aria-live`, `aria-hidden` used throughout
- Keyboard navigation: arrow keys switch hero flavour; Tab cycles modals

---

## Brand Facts

- **Founded:** May 2021 · Company No. 13399877
- **Founder:** Stephanie Olubajo (ex-BCG)
- **Product:** 250g microwaveable Jollof Rice — Original and Spicy
- **Stockists:** 400+ UK locations including Sainsbury's, Amazon, TikTok Shop
- **Pricing:** ~£2.10 in-store (Sainsbury's); direct/bundle pricing on site
- **"Meji"** means "two" in Yoruba

---

## Running Locally

No build step required. Open `index.html` directly in a browser, or serve with any static file server:

```bash
# Python
python -m http.server 8080

# Node
npx serve .

# VS Code
# Install "Live Server" extension → right-click index.html → Open with Live Server
```
