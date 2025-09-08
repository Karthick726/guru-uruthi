import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load index.html template (with error handling)
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

export default async function handler(req, res) {
  try {
    const url = req.url;
    
    console.log("Processing URL:", url);
    console.log("Current directory:", __dirname);
    console.log("Looking for entry-server at:", path.resolve(__dirname, "../dist/server/entry-server.js"));
    
    // Check if entry-server.js exists
    const entryServerPath = path.resolve(__dirname, "../dist/server/entry-server.js");
    if (!fs.existsSync(entryServerPath)) {
      console.error("entry-server.js not found at:", entryServerPath);
      return res.status(500).setHeader('Content-Type', 'text/html').send(`
        <h1>Server Error</h1>
        <p>entry-server.js not found at: ${entryServerPath}</p>
        <p>Available files in dist/server:</p>
        <pre>${fs.readdirSync(path.resolve(__dirname, "../dist/server"), { withFileTypes: true }).map(f => f.name).join('\n')}</pre>
      `);
    }

    // Dynamic import with error handling
    let render;
    try {
      const module = await import("../dist/server/entry-server.js");
      render = module.render || module.default?.render || module.default;
      
      if (!render || typeof render !== 'function') {
        throw new Error(`render function not found. Available exports: ${Object.keys(module).join(', ')}`);
      }
    } catch (importErr) {
      console.error("Failed to import entry-server:", importErr);
      return res.status(500).setHeader('Content-Type', 'text/html').send(`
        <h1>Import Error</h1>
        <p>Failed to import entry-server.js: ${importErr.message}</p>
      `);
    }

    // Render React app
    const renderResult = await render(url);
    
    // Handle different return formats
    let html, helmet;
    if (typeof renderResult === 'string') {
      html = renderResult;
      helmet = { title: { toString: () => '' }, meta: { toString: () => '' }, link: { toString: () => '' } };
    } else if (renderResult && typeof renderResult === 'object') {
      html = renderResult.html || '';
      helmet = renderResult.helmet || { 
        title: { toString: () => '' }, 
        meta: { toString: () => '' }, 
        link: { toString: () => '' } 
      };
    } else {
      throw new Error('Invalid render result format');
    }

    const responseHtml = templateHtml
      .replace('<!--ssr-outlet-->', html || '')
      .replace('<!--helmet-outlet-->', `
        ${helmet.title?.toString() || ''}
        ${helmet.meta?.toString() || ''}
        ${helmet.link?.toString() || ''}
        
<link rel="stylesheet" href="/dist/client/style.css">
        `);
    
    // Use correct Vercel response methods
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(responseHtml);
    
  } catch (err) {
    console.error("SSR Error:", err);
    console.error("Error stack:", err.stack);
    
    // Send proper error response
    res.setHeader('Content-Type', 'text/html');
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
        <head><title>Server Error</title></head>
        <body>
          <h1>Server Side Rendering Error</h1>
          <p>${err.message}</p>
          <pre>${err.stack}</pre>
        </body>
      </html>
    `);
  }
}