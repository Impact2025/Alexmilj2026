import http from 'http';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

// Load .env.local (server secrets) so the API layer can read them in dev.
config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const VITE_PORT = 5174; // avoid the likely-busy 5173
const PORT = 4111;      // dev entry point (serves both SPA + /api)

// Start Vite as a child process (pure frontend, hot reload).
const vite = spawn('npx', ['vite', '--port', String(VITE_PORT), '--strictPort'], {
  cwd: ROOT,
  stdio: 'inherit',
  shell: true,
});

async function handleApi(req, res) {
  try {
    const name = req.url.split('?')[0].replace(/^\/api\//, '').replace(/\/$/, '');
    if (!name || name.includes('/') || name.startsWith('_')) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ success: false, error: 'Unknown API route' }));
    }
    const mod = await import(path.join(ROOT, 'api', `${name}.js`));
    await mod.default(req, res);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, error: err.message }));
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  if (url.pathname.startsWith('/api/')) {
    return handleApi(req, res);
  }
  // Proxy everything else to Vite (SPA + HMR + assets).
  const proxyReq = http.request(
    {
      host: 'localhost',
      port: VITE_PORT,
      path: req.url,
      method: req.method,
      headers: req.headers,
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    }
  );
  req.pipe(proxyReq);
  proxyReq.on('error', () => {
    res.statusCode = 502;
    res.end('Vite dev server not ready yet — try again in a moment.');
  });
});

server.listen(PORT, () => {
  console.log(`\n  🏎️  Dev server ready:  http://localhost:${PORT}`);
  console.log(`      • Frontend + API served together (no Vercel CLI needed)`);
  console.log(`      • .env.local secrets loaded for /api\n`);
});

function shutdown() {
  try { vite.kill(); } catch {}
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 1000);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
