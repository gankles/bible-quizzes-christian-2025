const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:3000/lexicon/H559');
  await page.goto('http://localhost:3000/lexicon/H559', { waitUntil: 'networkidle' });

  // Take screenshot of top of page
  await page.screenshot({ path: '/tmp/lexicon-h559-top.png', fullPage: false });
  console.log('Screenshot 1 saved: /tmp/lexicon-h559-top.png');

  // Get page height
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = 900;

  // Scroll and take screenshots
  let scrollPosition = viewportHeight;
  let screenshotCount = 2;

  while (scrollPosition < pageHeight) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollPosition);
    await page.waitForTimeout(500); // Wait for content to render
    await page.screenshot({ path: `/tmp/lexicon-h559-${screenshotCount}.png`, fullPage: false });
    console.log(`Screenshot ${screenshotCount} saved: /tmp/lexicon-h559-${screenshotCount}.png`);
    scrollPosition += viewportHeight;
    screenshotCount++;
  }

  // Also take a full page screenshot
  await page.screenshot({ path: '/tmp/lexicon-h559-full.png', fullPage: true });
  console.log('Full page screenshot saved: /tmp/lexicon-h559-full.png');

  await browser.close();
})();
