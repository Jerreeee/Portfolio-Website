/* eslint-disable no-console */
import puppeteer, { Browser } from "puppeteer";
import path from "path";
import fs from "fs";

async function generateResumePDF(): Promise<void> {
  const outputPath = path.join(process.cwd(), "public", "resume.pdf");
  const url = "http://localhost:3000/resume/raw";

  console.log("🟡 Launching browser...");
  const browser: Browser = await puppeteer.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });

    // Wait until the resume element exists
    await page.waitForSelector("#resume-page");

    const resume = await page.$("#resume-page");
    const box = await resume!.boundingBox();

    const pdfBuffer = await page.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    // Ensure /public exists
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

    // Save PDF
    fs.writeFileSync(outputPath, pdfBuffer);
    console.log(`✅ PDF generated → ${outputPath}`);
  } catch (err) {
    console.error("❌ Error while generating PDF:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

generateResumePDF();
