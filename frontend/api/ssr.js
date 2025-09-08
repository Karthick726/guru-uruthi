import fs from "fs";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Production constants
const isProduction = true;
const base = "/";

// Cached production index.html
const templateHtml = fs.readFileSync(
  path.resolve(__dirname, "../dist/client/index.html"),
  "utf-8"
);

// Create Express app
const app = express();

// Serve static assets (CSS/JS from dist/client)
app.use(base, express.static(path.resolve(__dirname, "../dist/client"), {
  extensions: []
}));

// SSR handler
app.use("*", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "");

    // Import prebuilt server bundle
    const { render } = await import(
      path.resolve(__dirname, "../dist/server/entry-server.js")
    );

    // Render app
    const rendered = await render(url);

    // Normalize output
    let html = "";
    let helmet = { title: { toString: () => "" }, meta: { toString: () => "" }, link: { toString: () => "" } };

    if (typeof rendered === "string") {
      html = rendered;
    } else if (rendered && typeof rendered === "object") {
      html = rendered.html ?? "";
      helmet = rendered.helmet ?? helmet;
    }

    // Inject SSR + Helmet into template
    const finalHtml = templateHtml
      .replace("<!--helmet-outlet-->", `
        ${helmet.title?.toString() || ""}
        ${helmet.meta?.toString() || ""}
        ${helmet.link?.toString() || ""}
      `)
      .replace("<!--ssr-outlet-->", html);

    res.status(200).setHeader("Content-Type", "text/html").end(finalHtml);

  } catch (e) {
    console.error("SSR Error:", e);
    res.status(500).setHeader("Content-Type", "text/html").end(`
      <!DOCTYPE html>
      <html>
        <head><title>Server Error</title></head>
        <body>
          <h1>SSR Error</h1>
          <p>${e.message}</p>
          <pre>${e.stack}</pre>
        </body>
      </html>
    `);
  }
});

// Export for Vercel
export default app;
