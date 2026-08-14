/**
 * Riwatek — Rain Bird Category Scraper
 * -------------------------------------
 * Target: Al Muhaideb National (mnt-sa.com) — Rain Bird irrigation category page
 * This store runs on the Salla e-commerce platform, which renders its product
 * grid client-side via JavaScript. A plain HTTP request (Axios+Cheerio) only
 * returns an empty shell ("enable JavaScript to view this site"), so this
 * script uses Playwright (headless Chromium) to render the page first, then
 * parses the resulting DOM with Cheerio.
 *
 * Usage:
 *   node scrape-rain-bird.js
 *
 * Output:
 *   rain_bird_products.json
 */

const { chromium } = require('playwright');
const cheerio = require('cheerio');
const fs = require('fs');

const TARGET_URL =
  'https://mnt-sa.com/ar/%D8%A3%D9%86%D8%B8%D9%85%D8%A9-%D8%A7%D9%84%D8%B1%D9%8A-%D8%B1%D9%8A%D9%86-%D8%A8%D9%8A%D8%B1%D8%AF-Rain-Bird/c800345116';

const OUTPUT_FILE = 'rain_bird_products.json';

// Salla stores commonly expose their product cards as the custom element
// <salla-product-card> (Web Component), with a fallback to conventional
// class-based selectors used by some Salla themes. We try several
// selector strategies in order and use whichever one actually matches
// something on the rendered page.
const PRODUCT_CARD_SELECTORS = [
  'salla-product-card',
  '.s-product-card-entry',
  '.s-product-card-container',
  '.products-grid .product-item',
  '[data-product-id]'
];

const CATEGORY_LINK_SELECTORS = [
  '.category-sub-menu a',
  '.s-category-sub-menu a',
  'nav[aria-label="breadcrumb"] a',
  '.categories-list a',
  '.sub-categories a'
];

async function autoScroll(page) {
  // Salla grids often lazy-load product cards / images as you scroll.
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 600;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight - window.innerHeight - 200) {
          clearInterval(timer);
          resolve();
        }
      }, 300);
    });
  });
}

function firstMatchingSelector($, selectors) {
  for (const sel of selectors) {
    if ($(sel).length > 0) return sel;
  }
  return null;
}

function cleanText(t) {
  return (t || '').replace(/\s+/g, ' ').trim();
}

function absoluteUrl(href, base) {
  if (!href) return null;
  try {
    return new URL(href, base).href;
  } catch {
    return href;
  }
}

async function scrapeCategory() {
  const envHeadless = process.env.SCRAPER_HEADLESS;
  const headless = envHeadless === undefined ? true : envHeadless !== 'false';
  const navTimeout = parseInt(process.env.SCRAPER_TIMEOUT_MS, 10) || 60000;

  const browser = await chromium.launch({ headless });
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    locale: 'ar-SA',
    extraHTTPHeaders: {
      'Accept-Language': 'ar,ar-SA;q=0.9,en;q=0.8'
    },
    viewport: { width: 390, height: 844 } // mobile viewport (iPhone-ish), matches Riwatek's mobile-first target
  });

  const page = await context.newPage();

  console.log(`Navigating to: ${TARGET_URL}`);
  console.log(`Playwright: headless=${headless} navTimeout=${navTimeout}ms`);
  try {
    await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: navTimeout });
  } catch (err) {
    console.warn('Initial navigation with networkidle failed, retrying with domcontentloaded...');
    try {
      await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: navTimeout });
    } catch (err2) {
      console.error('Navigation retry failed:', err2);
      throw err2;
    }
  }

  // Give Salla's front-end JS a moment to hydrate the product grid.
  await page.waitForTimeout(2500);
  await autoScroll(page);
  await page.waitForTimeout(1500);

  const html = await page.content();
  await browser.close();

  const $ = cheerio.load(html);

  // --- Category title ---
  const categoryTitleAr = cleanText($('h1').first().text());

  // --- Subcategories ---
  const subCatSelector = firstMatchingSelector($, CATEGORY_LINK_SELECTORS);
  const subcategories = [];
  if (subCatSelector) {
    $(subCatSelector).each((_, el) => {
      const name = cleanText($(el).text());
      const href = absoluteUrl($(el).attr('href'), TARGET_URL);
      if (name && href) subcategories.push({ name, url: href });
    });
  }

  // --- Products ---
  const cardSelector = firstMatchingSelector($, PRODUCT_CARD_SELECTORS);
  const products = [];

  if (cardSelector) {
    $(cardSelector).each((_, el) => {
      const card = $(el);

      const titleAr = cleanText(
        card.find('.s-product-card-content-title, .product-title, h2, h3, [slot="title"]').first().text() ||
          card.attr('name') ||
          card.attr('product-name')
      );

      const productUrl = absoluteUrl(
        card.find('a').first().attr('href') || card.attr('url') || card.attr('product-url'),
        TARGET_URL
      );

      const imageUrl =
        card.find('img').first().attr('data-src') ||
        card.find('img').first().attr('src') ||
        card.attr('image') ||
        null;

      const priceText = cleanText(
        card.find('.s-product-card-price, .price, [slot="price"]').first().text() || card.attr('price')
      );

      const skuAttr = card.attr('sku') || card.attr('data-sku') || null;

      const outOfStockFlag =
        card.find('.s-product-card-sold-out, .out-of-stock, .sold-out').length > 0 ||
        card.attr('status') === 'sold_out';

      products.push({
        title_ar: titleAr || null,
        title_en: null, // Not exposed at listing level on this store; would require visiting each product page
        image_url: imageUrl,
        price: priceText || null,
        currency: priceText && priceText.includes('ر.س') ? 'SAR' : null,
        product_url: productUrl,
        sku: skuAttr,
        stock_status: outOfStockFlag ? 'out_of_stock' : 'in_stock_or_unknown'
      });
    });
  }

  const result = {
    source_url: TARGET_URL,
    category: {
      name_ar: categoryTitleAr || null,
      subcategories
    },
    scraped_at: new Date().toISOString(),
    product_count: products.length,
    products
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`\nDone. Wrote ${products.length} products to ${OUTPUT_FILE}`);

  if (products.length === 0) {
    console.log(
      '\n⚠️  No products matched. The Salla theme on mnt-sa.com may use different ' +
        'selectors than the ones tried here. Open the page in a real browser, ' +
        'right-click a product card → Inspect, and update PRODUCT_CARD_SELECTORS ' +
        '(and the inner title/price/image selectors) in this script accordingly.'
    );
  }
}

scrapeCategory().catch((err) => {
  console.error('Scrape failed:', err);
  process.exit(1);
});
