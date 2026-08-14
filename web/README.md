# Riwatek — Frontend (React + Vite)

Arabic (RTL), mobile-first storefront for Riwatek's wholesale irrigation &
water systems catalog.

## Setup

```bash
cd web
npm install
npm run dev
```

Opens on **http://localhost:5173**. `/products` (المنتجات) fetches live from
the API — start `../server` too (`npm install && npm run dev`, port 4000) or
the products page will show a "تعذّر تحميل المنتجات" error state.

## What's here

```
web/
  src/
    components/
      react-bits/        ← the 4 components you sent, vendored unmodified
        GlassSurface.jsx/.css
        MaskedHeading.jsx/.css
        AccordionGallery.jsx/.css
        SpecularButton.jsx/.css
      Header.jsx/.css      ← sticky nav, wrapped in GlassSurface, routes via react-router
      Hero.jsx/.css        ← MaskedHeading signature moment
      Categories.jsx/.css  ← homepage AccordionGallery teaser, links into /products?category=…
      ValueProps.jsx/.css  ← plain benefit cards, no component needed
      CTASection.jsx/.css  ← SpecularButton, single highest-intent action
      ProductCard.jsx/.css ← reused on the products grid
      Footer.jsx/.css
    pages/
      HomePage.jsx          ← Hero + Categories + ValueProps + CTA
      ProductsPage.jsx/.css ← المنتجات — live grid, fetches /api/products
    lib/api.js               ← fetch helpers, reads VITE_API_URL (see .env.example)
    App.jsx                  ← react-router routes: "/" and "/products"
    index.css                ← design tokens (colors, type, layout)
  public/media/              ← ⚠️ still empty — see public/media/README.md
```

## Real data status

`/products` is wired to the real API, and `../server/data/products.json` now
holds **15 real Rain Bird products** scraped from mnt-sa.com (real titles,
real `cdn.salla.sa` images, real prices) — see `../server/README.md` for the
important caveats on that data (currency and category were inferred, not
scraped).

## Design decisions worth knowing

- **Where each component landed, and why:**
  - `GlassSurface` → **header only**. It's the one frosted moment on the
    page; using it more than once would dilute it and add avoidable
    `backdrop-filter` cost. It sits over the hero's dark gradient so the
    displacement effect actually has something busy behind it to distort.
  - `MaskedHeading` → **hero headline**. This is the site's signature
    element — "water solutions," made literal, with irrigation footage
    showing through the Arabic wordmark instead of being described in text.
  - `AccordionGallery` → **product categories teaser on the homepage**. Its
    built-in 520px breakpoint collapses horizontal panels into a vertical
    stack on phones, matching the mobile-first requirement for free.
  - `SpecularButton` → **one CTA**, the "talk to sales" button. It's a
    WebGL-driven effect (via `ogl`); using it for every button on the page
    would mean multiple simultaneous WebGL contexts on a mobile-first
    site, which is the opposite of cheap. Header/hero/footer/product-card
    links are plain styled anchors instead.
- **Palette** (see `src/index.css`): pulled from the brand mark plus the
  site's own subject matter — deep water-teal ink, warm limestone
  background, the logo's sky blue, a light aqua highlight, and a brass
  accent (irrigation fittings) — not a generic cream/dark-mode default.
- **Type**: Tajawal (display, 800–900 weight) for headlines, IBM Plex Sans
  Arabic for body copy, JetBrains Mono for prices/SKUs so numerals stay
  legible and LTR inside RTL paragraphs.
- **RTL**: `<html lang="ar" dir="rtl">` in `index.html` — the whole layout
  flows right-to-left natively rather than being flipped with CSS tricks.

## ⚠️ Before this looks real

1. **Media is missing on purpose.** `public/media/README.md` lists exactly
   which images to drop in for the hero and homepage category tiles —
   product photos themselves now come from the real `cdn.salla.sa` URLs in
   the scraped data, so this is just the hero background + 5 category cover
   shots.
2. **The CTA/product "اطلب الآن" buttons are `mailto:` placeholders** — swap
   for a real contact form, WhatsApp link, or cart/checkout flow once you
   decide it.
3. **Category assignment on the 15 real products is my guess**, based on
   keywords in the Arabic titles (نوزل/فوهة → sprinklers, صمام → valves,
   تايمر/مؤقت/توسعة → controllers) — the scraper didn't capture a real
   category field. Worth a quick manual check against `../server/data/products.json`.

## Still to do (send me these when ready)

- Real hero/category cover photography
- Copy review — all placeholder Arabic copy is mine, written for tone, not
  final marketing copy
- Product detail pages (currently the grid links nowhere per-product)
- A real order/contact flow to replace the `mailto:` links
- More products — this is only the 15 that came back from the single
  category page scrape
