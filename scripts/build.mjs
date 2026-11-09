import { mkdir, copyFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
const require = createRequire(import.meta.url);
const out = new URL("../dist/", import.meta.url);
await mkdir(out, { recursive:true });
for (const name of ["index.html","style.css","app.js"])
  await copyFile(new URL(`../src/${name}`,import.meta.url),new URL(name,out));
require("@waystone-workshop/design-system").copyAssets(fileURLToPath(new URL("design-system",out)));
let download = process.env.WINDOWS_DOWNLOAD_URL || null;
if (download && new URL(download).protocol !== "https:") throw new Error("WINDOWS_DOWNLOAD_URL must use HTTPS.");
await writeFile(new URL("config.json",out),JSON.stringify({ windowsDownloadUrl:download }));
console.log("Built static website in dist/");
