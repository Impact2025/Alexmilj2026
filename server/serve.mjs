import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { config } from 'dotenv';

// Production-style local server: serves the built SPA (dist/) AND the real
// /api handlers — no Vite, no Turbopack (works around the Vite/Node24 crash).
config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '.env.local') });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PORT = Number(process.env.PORT) || 3001;

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff',
};

async function handleApi(req, res) {
  try {
    const name = req.url.split('?')[0].replace(/^\/api\//, '').split('/')[0];
    if (!name || name.startsWith('_')) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ success: false, error: 'Unknown API route' }));
    }
    const mod = await import(pathToFileURL(path.join(ROOT, 'api', `${name}.js`)).href);
    const wrapped = {
      status(c) { res.statusCode = c; return wrapped; },
      setHeader(k, v) { res.setHeader(k, v); return wrapped; },
      json(o) { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(o)); return wrapped; },
      end(b) { return res.end(b); },
      on() { return res; },
    };
    await mod.default(req, wrapped);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, error: err.message }));
  }
}

function serveStatic(req, res) {
  let urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.join(DIST, urlPath);
  // prevent path traversal
  if (!filePath.startsWith(DIST)) { res.statusCode = 403; return res.end('forbidden'); }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // SPA fallback
      fs.readFile(path.join(DIST, 'index.html'), (e2, html) => {
        if (e2) { res.statusCode = 404; return res.end('Not found'); }
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
      });
      return;
    }
    res.setHeader('Content-Type', MIME[path.extname(filePath)] || 'application/octet-stream');
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  if (url.pathname.startsWith('/api/')) {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => { req.body = body; handleApi(req, res); });
    req.on('error', () => { res.statusCode = 400; res.end('bad request'); });
    return;
  }
  serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log(`\n  🏎️  App + API running at http://localhost:${PORT}`);
  console.log(`      (serves dist/ + /api — no Vite needed)\n`);
});
