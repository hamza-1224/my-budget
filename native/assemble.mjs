// Bundles the web app (repo root) for the iPhone and Mac apps.
// Usage: node assemble.mjs [outDir]  (default: native/www; the Mac app passes its own www)
// www/index.html is a small loader; the real app is bundled as www/app.html.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
const root = new URL("../", import.meta.url).pathname;
const www = (process.argv[2] ? resolve(process.cwd(), process.argv[2]) : new URL("./www", import.meta.url).pathname) + "/";
rmSync(www, { recursive: true, force: true });
mkdirSync(www + "vendor", { recursive: true });
const app = readFileSync(root + "index.html", "utf8");
const v = (/APP_VERSION="([^"]+)"/.exec(app) || [])[1];
if (!v) throw new Error("APP_VERSION not found in index.html");
writeFileSync(www + "app.html", app);
for (const f of ["config.js", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "vendor/supabase.js"]) cpSync(root + f, www + f);
writeFileSync(www + "index.html", readFileSync(new URL("./loader.html", import.meta.url), "utf8"));
console.log("assembled www with app", v);
