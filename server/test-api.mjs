import http from 'http';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { config } from 'dotenv';

// Test-only API server: serves the real /api handlers over HTTP, WITHOUT Vite.
// Proves the login + data flow works end-to-end, independent of the frontend.
config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '.env.local') });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PORT = 4111;

async function handleApi(req, res) {
  try {
    const name = req.url.split('?')[0].replace(/^\/api\//, '').replace(/\/$/, '');
    if (!name || name.startsWith('_')) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ success: false, error: 'Unknown API route' }));
    }
    const mod = await import(pathToFileURL(path.join(ROOT, 'api', `${name}.js`)).href);
    // Wrap the raw Node response to mimic Express / @vercel/node API
    // (res.status().json()) so the handlers run unmodified.
    const wrapped = new Proxy(res, {
      get(target, prop) {
        if (prop === 'status') return (code) => { target.statusCode = code; return wrapped; };
        if (prop === 'json') return (obj) => { target.setHeader('Content-Type', 'application/json'); target.end(JSON.stringify(obj)); return wrapped; };
        return target[prop];
      },
    });
    await mod.default(req, wrapped);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, error: err.message }));
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  if (!url.pathname.startsWith('/api/')) {
    res.statusCode = 404;
    return res.end('API-only test server. Use /api/*');
  }
  // Pre-read the body so handlers can use readBody(req) reliably (req.body).
  let body = '';
  req.on('data', (c) => { body += c; });
  req.on('end', () => {
    req.body = body;
    handleApi(req, res);
  });
  req.on('error', () => { res.statusCode = 400; res.end('bad request'); });
});

server.listen(PORT, () => {
  console.log(`API-only test server on http://localhost:${PORT}  (reads .env.local)`);
});
