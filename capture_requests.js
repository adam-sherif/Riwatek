const { chromium } = require('playwright');
const fs = require('fs');

const TARGET_URL =
  'https://mnt-sa.com/ar/%D8%A3%D9%86%D8%B8%D9%85%D8%A9-%D8%A7%D9%84%D8%B1%D9%8A-%D8%B1%D9%8A%D9%86-%D8%A8%D9%8A%D8%B1%D8%AF-Rain-Bird/c800345116';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const seen = new Set();
  const hits = [];
  page.on('request', (req) => {
    const url = req.url();
    if (/product|product|products|api|catalog|search|items/i.test(url)) {
      if (!seen.has(url)) {
        seen.add(url);
        hits.push({ url, method: req.method(), resourceType: req.resourceType() });
      }
    }
  });

  console.log('Navigating and capturing requests...');
  try {
    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await page.waitForTimeout(5000);
    // scroll to trigger lazy loads
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
    await page.waitForTimeout(2000);
    fs.writeFileSync('captured_requests.json', JSON.stringify(hits, null, 2));
    console.log('Wrote captured_requests.json');
  } catch (err) {
    console.error('Error capturing requests:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
