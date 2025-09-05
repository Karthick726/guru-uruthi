// api/index.js (This replaces your server.js for Vercel)
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let vite;

// Initialize Vite in development or use built files in production
async function getViteServer() {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  
  if (!vite) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
      logLevel: 'info'
    });
  }
  return vite;
}

export default async function handler(req, res) {
  const url = req.url;
  
  try {
    if (process.env.NODE_ENV === 'production') {
      // Production: Use pre-built files
      let template = fs.readFileSync(
        path.resolve(__dirname, '../dist/client/index.html'),
        'utf-8'
      );
      
      // Import the server entry
      const { render } = await import('../dist/server/entry-server.js');
      const renderResult = await render(url);
      const { html, helmet } = renderResult;
      
      // Replace the placeholders
      const responseHtml = template
        .replace('<!--ssr-outlet-->', html)
        .replace('<!--helmet-outlet-->', helmet ? `
          ${helmet.title ? helmet.title.toString() : ''}
          ${helmet.meta ? helmet.meta.toString() : ''}
          ${helmet.link ? helmet.link.toString() : ''}
        ` : '');
      
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(responseHtml);
      
    } else {
      // Development: Use Vite dev server
      const viteServer = await getViteServer();
      
      // Get the index.html template
      let template = fs.readFileSync(
        path.resolve(__dirname, '../index.html'),
        'utf-8'
      );
      
      // Apply Vite HTML transforms
      template = await viteServer.transformIndexHtml(url, template);
      
      // Load the server entry
      const { render } = await viteServer.ssrLoadModule('/src/entry-server.jsx');
      
      // Render the app HTML with meta data
      const renderResult = await render(url);
      const { html, helmet } = renderResult;
      
      // Replace the placeholder with the rendered HTML and meta tags
      const responseHtml = template
        .replace('<!--ssr-outlet-->', html)
        .replace('<!--helmet-outlet-->', helmet ? `
          ${helmet.title ? helmet.title.toString() : ''}
          ${helmet.meta ? helmet.meta.toString() : ''}
          ${helmet.link ? helmet.link.toString() : ''}
        ` : '');
      
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(responseHtml);
    }
    
  } catch (e) {
    console.error('SSR Error:', e);
    
    // Fallback to basic HTML
    const fallbackHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Guru Uruthi</title>
          <meta name="description" content="Guru Uruthi - Premium Ayurvedic Products">
        </head>
        <body>
          <div id="root"></div>
          <script>
            console.error('SSR failed, loading client-side');
            window.location.reload();
          </script>
        </body>
      </html>
    `;
    
    res.status(500).send(fallbackHtml);
  }
}