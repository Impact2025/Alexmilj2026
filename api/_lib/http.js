// Tiny HTTP helpers for Vercel serverless functions (Node runtime).
// Each handler receives (req, res) and returns JSON.

export function json(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

export function ok(res, body) {
  return json(res, 200, body);
}

export function fail(res, status, error) {
  return json(res, status, { success: false, error });
}

export async function readBody(req) {
  if (!req.body) return {};
  // Vercel already parses JSON bodies for us in most cases; fall back to manual parse.
  if (typeof req.body === 'object') return req.body;
  try {
    return JSON.parse(req.body);
  } catch {
    return {};
  }
}

export function getBearer(req) {
  const header = req.headers['authorization'] || req.headers['Authorization'] || '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : null;
}
