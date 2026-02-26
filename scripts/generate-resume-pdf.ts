/* eslint-disable no-console */
import puppeteer, { Browser } from "puppeteer";
import path from "path";
import fs from "fs";

async function generateResumePDF(): Promise<void> {
  const companyArg = process.argv
    .slice(2)
    .find((arg) => arg.startsWith("--company="));
  const company = companyArg ? companyArg.slice("--company=".length) : null;

  const fileName = company ? `resume-${company}.pdf` : "resume.pdf";
  const outputPath = path.join(process.cwd(), "public", "files", fileName);
  const baseUrl = "http://localhost:3000/resume/raw";
  const url = company ? `${baseUrl}?company=${encodeURIComponent(company)}` : baseUrl;

  console.log("🟡 Launching browser...");
  const browser: Browser = await puppeteer.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });

    // Wait until the resume element exists
    await page.waitForSelector("#resume-page");

    // Wait for the layout pass to complete (data-ready signals any adjustment).
    // If no adjustment was needed data-ready is never set, timeout is swallowed.
    try {
      await page.waitForFunction(
        () => document.querySelector("#resume-page [data-ready]") !== null,
        { timeout: 5000 },
      );
    } catch {
      // Timeout: content already filled the page exactly — continue.
    }

    // Warn if content overflowed and had to be auto-compressed.
    const didOverflow = await page.evaluate(
      () => document.querySelector("#resume-page [data-overflow]") !== null,
    );
    if (didOverflow) {
      console.warn(
        "⚠️  Resume content overflowed A4 — spacing and font sizes were auto-compressed to fit. Consider reducing content.",
      );
    }

    const pdfBuffer = await page.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    // Ensure /public/files exists
    const filesDir = path.join(process.cwd(), "public", "files");
    if (!fs.existsSync(filesDir)) fs.mkdirSync(filesDir, { recursive: true });

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
