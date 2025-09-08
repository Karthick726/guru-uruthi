// api/ssr.js
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let vite;

export default async function handler(req, res) {
  if (!vite) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom"
    });
  }

  try {
    const url = req.url;
    let template = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf-8");
    template = await vite.transformIndexHtml(url, template);

    const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");
    const { html, helmet } = await render(url);

    const responseHtml = template
      .replace("<!--ssr-outlet-->", html)
      .replace("<!--helmet-outlet-->", `
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      `);

    res.status(200).setHeader("Content-Type", "text/html").end(responseHtml);
  } catch (e) {
    vite.ssrFixStacktrace(e);
    res.status(500).end(e.message);
  }
}
