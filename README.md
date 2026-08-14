# Riwatek — Rain Bird Category Scraper

Scrapes the Rain Bird irrigation category page on `mnt-sa.com` (a Salla-platform
store) and outputs a clean JSON file ready to import into the Riwatek product DB.

## Why Playwright instead of Axios+Cheerio?

The target site is a **Salla** storefront. Its raw HTML response only contains an
"enable JavaScript" shell — the product grid is rendered client-side after page
load. Axios alone would return an empty page, so this script uses **Playwright**
(headless Chromium) to actually render the page — including scrolling to trigger
lazy-loaded cards — then parses the final DOM with Cheerio.

## Setup

```bash
cd riwatek-scraper
npm install
npx playwright install chromium   # downloads the headless browser binary
```

## Run

```bash
npm start
# or: node scrape-rain-bird.js
```

Output is written to `rain_bird_products.json` in the same folder.

## Sample output schema

```json
{
  "source_url": "https://mnt-sa.com/ar/%D8%A3%D9%86%D8%B8%D9%85%D8%A9-%D8%A7%D9%84%D8%B1%D9%8A-%D8%B1%D9%8A%D9%86-%D8%A8%D9%8A%D8%B1%D8%AF-Rain-Bird/c800345116",
  "category": {
    "name_ar": "أنظمة الري",
    "subcategories": [
      { "name": "وحدات التحكم", "url": "https://mnt-sa.com/ar/..." },
      { "name": "الرشاشات", "url": "https://mnt-sa.com/ar/..." }
    ]
  },
  "scraped_at": "2026-08-13T18:00:00.000Z",
  "product_count": 24,
  "products": [
    {
      "title_ar": "رشاش رين بيرد موديل 1800",
      "title_en": null,
      "image_url": "https://cdn.salla.sa/.../product.png",
      "price": "45 ر.س",
      "currency": "SAR",
      "product_url": "https://mnt-sa.com/ar/رشاش-رين-بيرد/p12345",
      "sku": null,
      "stock_status": "in_stock_or_unknown"
    }
  ]
}
```

## Important notes / things to double-check

1. **Selectors may need a tweak.** Salla themes vary by store. If the script
   logs `⚠️ No products matched`, open the category page in Chrome, right-click
   a product card → **Inspect**, and update `PRODUCT_CARD_SELECTORS` (and the
   inner title/price/image selectors inside the `.each()` loop) at the top of
   `scrape-rain-bird.js` to match what you see.
2. **English titles aren't on the listing page.** Salla listing cards on this
   store only expose the Arabic title. Getting `title_en` reliably would
   require visiting each product's detail page (or checking if the store
   exposes an `hreflang="en"` version) — a follow-up step I can add once we
   confirm you need it.
3. **SKU / stock status** are often only shown on the product detail page, not
   the listing card — the script grabs them opportunistically if present, but
   expect a lot of `null` / `"in_stock_or_unknown"` at the listing level.
4. **Be respectful of the target site**: this script makes a single page load
   (no aggressive polling), uses a normal desktop-class user agent, and sets
   `Accept-Language: ar` to match the site's locale. Consider checking
   `mnt-sa.com/robots.txt` and their terms before scraping at scale, and add a
   delay if you loop this over many category pages.
5. **I couldn't execute this against the live site from here** — my sandbox's
   network access is restricted to package registries (npm, GitHub, etc.), not
   arbitrary websites. Run it on your machine as described above, and send me
   the console output (or the resulting JSON) if the selectors need fixing —
   I'll adjust them.
