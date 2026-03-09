import { chromium } from 'playwright';

const designs = [
  '11-cyberpunk',
  '12-brutalist', 
  '13-aurora'
];

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 }
});

for (const design of designs) {
  const page = await context.newPage();
  const url = `https://lifeconnection.vercel.app/designs/${design}`;
  console.log(`Navigating to ${url}`);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const path = `screenshots/${design}.png`;
  console.log(`Capturing screenshot into ${path}`);
  await page.screenshot({ path, fullPage: false });
  await page.close();
}

await browser.close();
console.log('Done!');
