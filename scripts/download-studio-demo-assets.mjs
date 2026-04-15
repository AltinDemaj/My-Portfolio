/**
 * Hero + work card photos for /demo/studio-website (thematic match to titles).
 * Run: node scripts/download-studio-demo-assets.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const base = path.join(root, "public", "images", "studio-demo");

const downloads = [
  [
    "hero-bg.jpg",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=85&fm=jpg",
  ],
  [
    "work-finance.jpg",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85&fm=jpg",
  ],
  [
    "work-editorial.jpg",
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85&fm=jpg",
  ],
  [
    "work-commerce.jpg",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85&fm=jpg",
  ],
  [
    "work-health.jpg",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=85&fm=jpg",
  ],
];

function fetchFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, { headers: { "User-Agent": "portfolio-asset-fetch/1" } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          fs.unlinkSync(dest);
          return fetchFile(res.headers.location, dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlinkSync(dest);
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
      })
      .on("error", (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
}

async function main() {
  fs.mkdirSync(base, { recursive: true });
  for (const [rel, url] of downloads) {
    const dest = path.join(base, rel);
    process.stdout.write(`Fetching ${rel}... `);
    await fetchFile(url, dest);
    console.log(`${fs.statSync(dest).size} bytes`);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
