import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load index.html template
let templateHtml;
try {
  templateHtml = fs.readFileSync(
    path.resolve(__dirname, "../dist/client/index.html"),
    "utf-8"
  );
} catch (err) {
  console.error("Failed to load template HTML:", err);
  templateHtml = `<!DOCTYPE html><html><head><title>Error</title></head><body><h1>Template not found</h1></body></html>`;
}

// Load manifest.json to get CSS files
let manifest = {};
try {
  manifest = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../dist/server/.vite/ssr-manifest.json"), "utf-8")
  );
} catch (err) {
  console.error("Manifest not found:", err);
}

export default async function handler(req, res) {
  try {
    const url = req.url;

    // Import entry-server
    const module = await import("../dist/server/entry-server.js");
    const render = module.render || module.default?.render || module.default;
    if (!render || typeof render !== "function") {
      throw new Error("No valid render function exported from entry-server.js");
    }

    // Render React app
    const renderResult = await render(url);

    let html, helmet;
    if (typeof renderResult === "string") {
      html = renderResult;
      helmet = { title: { toString: () => "" }, meta: { toString: () => "" }, link: { toString: () => "" } };
    } else if (renderResult && typeof renderResult === "object") {
      html = renderResult.html || "";
      helmet = renderResult.helmet || { title: { toString: () => "" }, meta: { toString: () => "" }, link: { toString: () => "" } };
    }

    // Collect CSS from manifest
    let cssLinks = "";
    const entry = manifest["index.html"] || manifest["src/main.jsx"];
    if (entry?.css) {
      cssLinks = entry.css.map((file) => `<link rel="stylesheet" href="/${file}">`).join("\n");
    }

    const responseHtml = templateHtml
      .replace("<!--ssr-outlet-->", html || "")
      .replace(
        "<!--helmet-outlet-->",
        `
        ${helmet.title?.toString() || ""}
        ${helmet.meta?.toString() || ""}
        ${helmet.link?.toString() || ""}
        ${cssLinks}
      `
      );

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(responseHtml);
  } catch (err) {
    console.error("SSR Error:", err);
    res.setHeader("Content-Type", "text/html");
    res.status(500).send(`<h1>Server Error</h1><pre>${err.stack}</pre>`);
  }
}
