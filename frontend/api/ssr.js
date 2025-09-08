import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, p);

async function createServer() {
  const app = express();

  // serve static client build
  app.use(express.static(resolve('dist/client')));

  // load SSR entry (already built)
  const { render } = await import(`./dist/server/entry-server.js`);

  app.use('*', async (req, res) => {
    try {
      let template = fs.readFileSync(
        resolve('dist/client/index.html'),
        'utf-8'
      );

      const { html, helmet } = await render(req.originalUrl);

      const responseHtml = template
        .replace('<!--ssr-outlet-->', html)
        .replace('<!--helmet-outlet-->', `
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
        `);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(responseHtml);
    } catch (e) {
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  return app;
}

export default createServer;
