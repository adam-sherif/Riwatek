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

## Populating real products

`data/products.json` starts empty. The Rain Bird scraper at the project root
(`../scrape-rain-bird.js`) writes `rain_bird_products.json` in the same shape
the frontend expects (`title_ar`, `image_url`, `price`, `product_url`, etc.) —
run it, then copy/transform its `products` array into `data/products.json`
(add a `category` field per item matching a slug from `categories.json`).
