import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load index.html template
const templateHtml = fs.readFileSync(
  path.resolve(__dirname, "../dist/client/index.html"),
  "utf-8"
);

// Import SSR renderer
// import { render } from "../dist/server/entry-server.js";

export default async function handler(req, res) {
  try {
    const url = req.url;
     
    const { render } = await import("../dist/server/entry-server.js");
    // Render React app
    const {html, helmet} = await render(url);

  const responseHtml = templateHtml
        .replace('<!--ssr-outlet-->', html)
        .replace('<!--helmet-outlet-->', `
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
        `);
      
      res.status(200).set({ 'Content-Type': 'text/html' }).send(responseHtml);
  } catch (err) {
    console.error("SSR Error:", err);
   const errorHtml = `<!DOCTYPE html>
<html>
  <head><title>Error</title></head>
  <body>
    <h1>Something went wrong</h1>
    <p>Error: ${err.message}</p>
  </body>
</html>`;
    
    res.status(500).set({ 'Content-Type': 'text/html' }).send(errorHtml);
}

}