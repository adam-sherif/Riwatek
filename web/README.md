# Riwatek — Frontend (React + Vite)

Arabic (RTL), mobile-first storefront for Riwatek's wholesale irrigation &
water systems catalog.

## Setup

```bash
cd web
npm install
npm run dev
```

Opens on **http://localhost:5173**. Pair it with the API in `../server`
(`npm run dev` there too, on port 4000) once you're ready to wire up real
product data — nothing here calls it yet; `Categories.jsx` still uses a
static array.

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
      Header.jsx/.css     ← sticky nav, wrapped in GlassSurface
      Hero.jsx/.css        ← MaskedHeading signature moment
      Categories.jsx/.css  ← AccordionGallery product category browser
      ValueProps.jsx/.css  ← plain benefit cards, no component needed
      CTASection.jsx/.css  ← SpecularButton, single highest-intent action
      Footer.jsx/.css
    App.jsx
    index.css              ← design tokens (colors, type, layout)
  public/media/            ← ⚠️ empty — see public/media/README.md
```

## Design decisions worth knowing

- **Where each component landed, and why:**
  - `GlassSurface` → **header only**. It's the one frosted moment on the
    page; using it more than once would dilute it and add avoidable
    `backdrop-filter` cost. It sits over the hero's dark gradient so the
    displacement effect actually has something busy behind it to distort.
  - `MaskedHeading` → **hero headline**. This is the site's signature
    element — "water solutions," made literal, with irrigation footage
    showing through the Arabic wordmark instead of being described in text.
  - `AccordionGallery` → **product categories**. Its built-in 520px
    breakpoint collapses horizontal panels into a vertical stack on phones,
    which lines up with the "mobile-first" requirement with zero extra work.
  - `SpecularButton` → **one CTA**, the "talk to sales" button. It's a
    WebGL-driven effect (via `ogl`); using it for every button on the page
    would mean multiple simultaneous WebGL contexts on a mobile-first
    site, which is the opposite of cheap. Header/hero/footer links are
    plain styled anchors instead.
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
   which 6 images/photos to drop in (hero background + 5 category shots).
   Nothing will look right until those exist.
2. **`Categories.jsx` uses placeholder image paths and no live data.** Once
   `../server` has real products (see its README), wire this up with a
   `fetch('/api/categories')` call instead of the static array.
3. **The CTA button's `mailto:` link is a placeholder** — swap for a real
   contact form, WhatsApp link, or route once you decide the flow.

## Still to do (send me these when ready)

- Real hero/category photography
- Copy review — all placeholder Arabic copy is mine, written for tone, not
  final marketing copy
- Product detail page / routing (this is currently a single scrolling page)
- Hooking `Categories.jsx` up to the `/api/products` and `/api/categories`
  endpoints in `../server`
