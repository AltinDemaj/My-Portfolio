/**
 * Captures real UI screenshots for portfolio galleries.
 * Run: npm run build && npm run capture:dashboard-studio
 */
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const PORT = process.env.CAPTURE_PORT || "3333";
const BASE = `http://127.0.0.1:${PORT}`;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForServer() {
  for (let i = 0; i < 90; i++) {
    try {
      const r = await fetch(`${BASE}/demo/admin-dashboard/console`, { redirect: "follow" });
      if (r.ok) return;
    } catch {
      /* retry */
    }
    await sleep(1000);
  }
  throw new Error(`Server did not respond at ${BASE}`);
}

async function main() {
  if (!fs.existsSync(path.join(root, ".next", "BUILD_ID"))) {
    console.error("Run npm run build first.");
    process.exit(1);
  }

  const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
  const child = spawn(process.execPath, [nextBin, "start", "-p", PORT], {
    cwd: root,
    stdio: "ignore",
    env: { ...process.env, PORT },
  });

  const killServer = () => {
    try {
      if (process.platform === "win32" && child.pid) {
        spawn("taskkill", ["/PID", String(child.pid), "/T", "/F"], {
          stdio: "ignore",
          shell: true,
        });
      } else {
        child.kill("SIGTERM");
      }
    } catch {
      /* ignore */
    }
  };

  try {
    await waitForServer();
    const browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    const dashDir = path.join(root, "public", "images", "dashboard-demo", "screenshots");
    const studioDir = path.join(root, "public", "images", "studio-demo", "screenshots");
    fs.mkdirSync(dashDir, { recursive: true });
    fs.mkdirSync(studioDir, { recursive: true });

    await page.goto(`${BASE}/demo/admin-dashboard/console`, { waitUntil: "load" });
    await sleep(1500);
    await page.screenshot({
      path: path.join(dashDir, "01-overview.jpg"),
      type: "jpeg",
      quality: 88,
    });

    await page.evaluate(() => window.scrollTo(0, 380));
    await sleep(600);
    await page.screenshot({
      path: path.join(dashDir, "02-charts.jpg"),
      type: "jpeg",
      quality: 88,
    });

    await page.evaluate(() => window.scrollTo(0, 720));
    await sleep(600);
    await page.screenshot({
      path: path.join(dashDir, "03-table.jpg"),
      type: "jpeg",
      quality: 88,
    });

    await page.getByRole("button", { name: "7 days" }).click();
    await sleep(800);
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(400);
    await page.screenshot({
      path: path.join(dashDir, "04-range-7d.jpg"),
      type: "jpeg",
      quality: 88,
    });

    await page.goto(`${BASE}/demo/studio-website`, { waitUntil: "load" });
    await sleep(1200);
    await page.screenshot({
      path: path.join(studioDir, "01-hero.jpg"),
      type: "jpeg",
      quality: 88,
    });

    await page.evaluate(() => document.getElementById("work")?.scrollIntoView());
    await sleep(800);
    await page.screenshot({
      path: path.join(studioDir, "02-work.jpg"),
      type: "jpeg",
      quality: 88,
    });

    await page.evaluate(() => document.getElementById("services")?.scrollIntoView());
    await sleep(800);
    await page.screenshot({
      path: path.join(studioDir, "03-services.jpg"),
      type: "jpeg",
      quality: 88,
    });

    await page.evaluate(() => document.getElementById("contact")?.scrollIntoView());
    await sleep(800);
    await page.screenshot({
      path: path.join(studioDir, "04-contact.jpg"),
      type: "jpeg",
      quality: 88,
    });

    await browser.close();
    console.log("Wrote dashboard screenshots to", dashDir);
    console.log("Wrote studio screenshots to", studioDir);
  } finally {
    killServer();
    await sleep(500);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
