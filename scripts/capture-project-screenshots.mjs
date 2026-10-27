/**
 * Captures portfolio project screenshots (Marketi POS, Minions vs Bloons).
 * Run: node scripts/capture-project-screenshots.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images", "projects");

const TARGETS = [
  {
    name: "marketi-juaj-pos-landing",
    url: "https://marketi-juaj-hxpvbduvm-altindemajs-projects.vercel.app/",
    viewport: { width: 390, height: 844 },
    waitMs: 4000,
    fullPage: false,
  },
  {
    name: "marketi-juaj-pos-landing-desktop",
    url: "https://marketi-juaj-hxpvbduvm-altindemajs-projects.vercel.app/",
    viewport: { width: 1280, height: 800 },
    waitMs: 3500,
    fullPage: false,
  },
  {
    name: "minions-vs-bloons-game",
    url: "https://idle-resources-managment.vercel.app/",
    viewport: { width: 1280, height: 720 },
    waitMs: 5000,
    fullPage: false,
  },
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  for (const target of TARGETS) {
    const page = await browser.newPage({
      viewport: target.viewport,
      deviceScaleFactor: 2,
    });
    try {
      await page.goto(target.url, { waitUntil: "networkidle", timeout: 90_000 });
      await sleep(target.waitMs);
      const pngPath = path.join(outDir, `${target.name}.png`);
      await page.screenshot({
        path: pngPath,
        fullPage: target.fullPage,
        type: "png",
      });
      console.log("Wrote", pngPath);
    } catch (err) {
      console.error("Failed", target.name, err);
      process.exitCode = 1;
    } finally {
      await page.close();
    }
  }

  await browser.close();
}

main();
