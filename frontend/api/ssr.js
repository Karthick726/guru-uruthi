// api/index.js
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Serve static files
app.use(express.static(path.resolve(__dirname, '../dist/client')));

// SSR handler
app.use('*', async (req, res) => {
  const url = req.originalUrl;
  
  try {
    // Load pre-built template
    const template = fs.readFileSync(
      path.resolve(__dirname, '../dist/client/index.html'),
      'utf-8'
    );
    
    // Load pre-built render function
    const { render } = await import('../dist/server/entry-server.js');
    
    // Render the app
    const { html, helmet } = await render(url);
    
    // Replace placeholders
    const responseHtml = template
      .replace('<!--ssr-outlet-->', html)
      .replace('<!--helmet-outlet-->', `
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      `);
    
    res.status(200).set({ 'Content-Type': 'text/html' }).end(responseHtml);
  } catch (e) {
    console.error('SSR Error:', e);
    res.status(500).end(e.message);
  }
});

export default app;