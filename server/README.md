# Riwatek API (Node.js + Express)

Minimal JSON API backing the Riwatek storefront's product/category data.
Currently file-backed (`data/*.json`) so the frontend has something real to
call from day one — swap `readJSON()` in `index.js` for a real database
(Postgres, MongoDB, etc.) once you're ready without changing the routes.

## Setup

```bash
cd server
npm install
npm run dev      # auto-restarts on change (Node's built-in --watch)
# or: npm start
```

Runs on **http://localhost:4000** by default (override with `PORT`).

## Endpoints

| Method | Path | Notes |
|---|---|---|
| GET | `/api/health` | Liveness check. |
| GET | `/api/categories` | Returns the 5 category seed rows in `data/categories.json`. |
| GET | `/api/products` | Returns all products. `?category=<slug>` filters. |

## Current data — real, but read this before trusting it blindly

`data/products.json` holds the **15 products actually returned by the
scraper** (`../scrape-rain-bird.js` + its API fallback) against the Rain Bird
category page on mnt-sa.com. Real Arabic titles, real `cdn.salla.sa` image
URLs, real prices, real source links — nothing invented.

Two things I filled in myself and you should sanity-check:

1. **`category` per product is my classification**, not scraped — the
   scraper only returned one flat "أكثر من 15 منتج" bucket, so I assigned
   `sprinklers` / `controllers` / `valves` by keyword-matching the Arabic
   titles (نوزل/فوهة → sprinklers, صمام → valves, تايمر/مؤقت/توسعة →
   controllers). No `pipes` or `accessories` items came back from this
   particular scrape.
2. **`currency: "SAR"` is inferred**, not scraped — the scraper's `currency`
   field came back `null` for every item (the price text on the page
   apparently doesn't include a currency symbol the scraper recognized). I
   assumed Saudi Riyal since that's the site's market; worth confirming.

`sku` and `stock_status` are `null`/`"unknown"` for all 15 because the
listing page doesn't expose them — only `description_ar` is null for the
same reason (would need each product's detail page).

## Adding more products

Re-run `../scrape-rain-bird.js` against other mnt-sa.com category URLs, or
hand me a supplier catalog/spreadsheet directly, and I'll fold it into this
same file in the same shape.
