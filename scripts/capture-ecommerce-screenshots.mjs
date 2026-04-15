/**
 * Captures real UI screenshots of the e-commerce demo for the portfolio gallery.
 * Requires a production build. Starts Next on a free port, then saves JPEGs to
 * public/images/ecommerce-demo/screenshots/
 *
 * Run: npm run build && npm run capture:ecommerce-screenshots
 * Optional: CAPTURE_PORT=3333 npm run capture:ecommerce-screenshots
 */
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "images", "ecommerce-demo", "screenshots");
const PORT = process.env.CAPTURE_PORT || "3333";
const BASE = `http://127.0.0.1:${PORT}`;

const STOCK = {
  p1: 24,
  p2: 12,
  p3: 40,
  p4: 60,
  p5: 18,
  p6: 15,
  p7: 22,
  p8: 9,
};

function cartForCheckout() {
  return [
    {
      key: "p1",
      productId: "p1",
      name: "Wireless headphones",
      unitPrice: 149.99,
      qty: 1,
      imageSrc: "/images/ecommerce-demo/products/p1.jpg",
    },
  ];
}

function mockOrders() {
  return [
    {
      id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      createdAt: "2026-04-10T14:30:00.000Z",
      lines: [
        { name: "Wireless headphones", qty: 1, unitPrice: 149.99 },
        { name: "Ceramic mug set", qty: 2, unitPrice: 42.5 },
      ],
      subtotal: 234.99,
      shipping: 0,
      tax: 18.8,
      total: 253.79,
      email: "you@example.com",
      shipSummary: "Alex Demo — Rr. Example 10, 10000 Prishtinë",
      status: "processing",
    },
  ];
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForServer() {
  for (let i = 0; i < 90; i++) {
    try {
      const r = await fetch(`${BASE}/demo/ecommerce-platform`, { redirect: "follow" });
      if (r.ok) return;
    } catch {
      /* retry */
    }
    await sleep(1000);
  }
  throw new Error(`Server did not respond at ${BASE} (run npm run build first)`);
}

async function main() {
  const buildId = path.join(root, ".next", "BUILD_ID");
  if (!fs.existsSync(buildId)) {
    console.error("Missing .next/BUILD_ID — run: npm run build");
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });

  const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
  if (!fs.existsSync(nextBin)) {
    console.error("Next.js not found in node_modules.");
    process.exit(1);
  }

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

  process.on("SIGINT", () => {
    killServer();
    process.exit(1);
  });

  try {
    await waitForServer();
    const browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    await page.goto(`${BASE}/demo/ecommerce-platform`, { waitUntil: "load" });
    await sleep(1200);
    await page.screenshot({
      path: path.join(outDir, "storefront.jpg"),
      type: "jpeg",
      quality: 88,
    });

    await page.goto(`${BASE}/demo/ecommerce-platform/product/wireless-headphones`, {
      waitUntil: "load",
    });
    await sleep(1000);
    await page.screenshot({
      path: path.join(outDir, "product-detail.jpg"),
      type: "jpeg",
      quality: 88,
    });

    await page.goto(`${BASE}/demo/ecommerce-platform`, { waitUntil: "load" });
    await page.evaluate(
      ({ cart, stock }) => {
        localStorage.setItem("ec_demo_cart_v1", JSON.stringify(cart));
        localStorage.setItem("ec_demo_stock_v1", JSON.stringify(stock));
      },
      { cart: cartForCheckout(), stock: STOCK },
    );
    await page.goto(`${BASE}/demo/ecommerce-platform/checkout`, { waitUntil: "load" });
    await sleep(1000);
    await page.screenshot({
      path: path.join(outDir, "checkout.jpg"),
      type: "jpeg",
      quality: 88,
    });

    await page.evaluate(({ orders }) => {
      localStorage.setItem("ec_demo_orders_v1", JSON.stringify(orders));
    }, { orders: mockOrders() });
    await page.goto(`${BASE}/demo/ecommerce-platform/orders`, { waitUntil: "load" });
    await sleep(800);
    await page.screenshot({
      path: path.join(outDir, "orders.jpg"),
      type: "jpeg",
      quality: 88,
    });

    await browser.close();
    console.log("Wrote screenshots to", outDir);
  } finally {
    killServer();
    await sleep(500);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
