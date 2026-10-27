/**
 * Smoke test: open/close project modal repeatedly (mobile viewport).
 * Run: node scripts/test-project-modal-history.mjs
 */
import { chromium } from "playwright";

const BASE = process.env.PORTFOLIO_URL ?? "http://127.0.0.1:3000";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
  });

  await page.goto(`${BASE}/#projects`, { waitUntil: "networkidle", timeout: 60_000 });
  await page.waitForSelector("#projects [data-carousel-card]", { timeout: 15_000 });

  for (let i = 0; i < 6; i++) {
    const card = page.locator("#projects [data-carousel-card]").first();
    const liveDemo = card.getByRole("button", { name: /live demo|view project/i });
    await liveDemo.scrollIntoViewIfNeeded();
    await liveDemo.click({ timeout: 10_000 });
    await page.waitForSelector(".fixed.inset-0.z-\\[100\\]", { timeout: 10_000 });
    await page.getByRole("button", { name: /back to projects/i }).click();
    await page.waitForSelector(".fixed.inset-0.z-\\[100\\]", {
      state: "detached",
      timeout: 10_000,
    });
    const overflow = await page.evaluate(() => document.body.style.overflow);
    if (overflow === "hidden") {
      throw new Error(`Body scroll still locked after close (iteration ${i + 1})`);
    }
    const clickable = await card.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const top = document.elementFromPoint(x, y);
      return top?.closest("[data-carousel-card]") === el;
    });
    if (!clickable) {
      throw new Error(`Card not receiving pointer events after iteration ${i + 1}`);
    }
  }

  console.log("OK: 6 open/close cycles, cards remain clickable");
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
