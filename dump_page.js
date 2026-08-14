const { chromium } = require('playwright');
const fs = require('fs');

const TARGET_URL =
  'https://mnt-sa.com/ar/%D8%A3%D9%86%D8%B8%D9%85%D8%A9-%D8%A7%D9%84%D8%B1%D9%8A-%D8%B1%D9%8A%D9%86-%D8%A8%D9%8A%D8%B1%D8%AF-Rain-Bird/c800345116';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    locale: 'ar-SA'
  });
  const page = await context.newPage();
  console.log('Navigating to', TARGET_URL);
  try {
    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 120000 });
    // give site a moment to hydrate
    await page.waitForTimeout(2500);
    // simple auto-scroll
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let total = 0;
        const dist = 800;
        const t = setInterval(() => {
          window.scrollBy(0, dist);
          total += dist;
          if (total > document.body.scrollHeight) {
            clearInterval(t);
            resolve();
          }
        }, 300);
      });
    });
    await page.waitForTimeout(1500);
    const html = await page.content();
    fs.writeFileSync('rendered_page.html', html, 'utf-8');
    console.log('Wrote rendered_page.html');
  } catch (err) {
    console.error('Failed to render page:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
