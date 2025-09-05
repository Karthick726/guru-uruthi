import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load index.html template
const templateHtml = fs.readFileSync(
  path.resolve(__dirname, "../index.html"),
  "utf-8"
);

// Import SSR renderer
import { render } from "../dist/server/entry-server.js";

export default async function handler(req, res) {
  try {
    const url = req.url;

    // Render React app
    const {html, helmet} = await render(url);

  const responseHtml = templateHtml
        .replace('<!--ssr-outlet-->', html)
        .replace('<!--helmet-outlet-->', `
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
        `);
      
      res.status(200).set({ 'Content-Type': 'text/html' }).end(responseHtml);
    res.status(200).send(html);
  } catch (err) {
    console.error("SSR Error:", err);
    res.status(500).send("Internal Server Error");
  }
}
