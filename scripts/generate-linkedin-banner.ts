/* eslint-disable no-console */
import puppeteer, { Browser } from 'puppeteer';
import path from 'path';
import fs from 'fs';

const WIDTH = 1584;
const HEIGHT = 396;

async function generateLinkedInBanner(): Promise<void> {
  const themeArg = process.argv
    .slice(2)
    .find((arg) => arg.startsWith('--theme='));
  const theme = themeArg ? themeArg.slice('--theme='.length) : 'Dark';

  const fileName = `linkedin-banner-${theme.toLowerCase()}.png`;
  const outputPath = path.join(process.cwd(), 'public', 'files', fileName);
  const url = `http://localhost:3000/linkedin-banner/raw/?theme=${encodeURIComponent(theme)}`;

  console.log(`🟡 Launching browser (theme: ${theme})...`);
  const browser: Browser = await puppeteer.launch({ headless: true });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 2 });
    await page.goto(url, { waitUntil: 'networkidle0' });

    await page.waitForSelector('#linkedin-banner');

    // Wait for data-ready attribute
    try {
      await page.waitForFunction(
        () => document.querySelector('#linkedin-banner[data-ready]') !== null,
        { timeout: 5000 },
      );
    } catch {
      // Already ready or no dynamic content — continue
    }

    // Ensure output directory exists
    const filesDir = path.join(process.cwd(), 'public', 'files');
    if (!fs.existsSync(filesDir)) fs.mkdirSync(filesDir, { recursive: true });

    // Screenshot as PNG
    await page.screenshot({
      path: outputPath,
      type: 'png',
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
    });

    console.log(`✅ Banner generated → ${outputPath}`);
  } catch (err) {
    console.error('❌ Error while generating banner:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

generateLinkedInBanner();
