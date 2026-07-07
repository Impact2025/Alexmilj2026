import crypto from 'crypto';

// Server-side authentication. Passwords live here (hashed with bcrypt) and are
// NEVER sent to the client. Sessions are HMAC-signed tokens, not client state.

const AUTH_SECRET = process.env.AUTH_SECRET || process.env.DATABASE_URL;
if (!AUTH_SECRET) {
  throw new Error('AUTH_SECRET (or DATABASE_URL) must be set for token signing.');
}

// Admin password is configured server-side via env. Falls back to a clearly
// marked dev default ONLY when no env var is present (never for production).
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'CHANGE_ME_ADMIN';
const USER_PASSWORD = process.env.USER_PASSWORD || 'CHANGE_ME_USER';

const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function sign(payload) {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', AUTH_SECRET).update(data).digest('base64url');
  return `${data}.${sig}`;
}

export function verifyToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const [data, sig] = token.split('.');
  const expected = crypto.createHmac('sha256', AUTH_SECRET).update(data).digest('base64url');
  // constant-time comparison
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function issueToken(role) {
  const payload = {
    sub: role, // 'admin' or 'user'
    role,
    exp: Date.now() + TOKEN_TTL_MS,
  };
  return sign(payload);
}

// Constant-time string compare to avoid timing attacks on the password check.
function safeEqual(a, b) {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

export function checkPassword(role, password) {
  if (role === 'admin') return safeEqual(password, ADMIN_PASSWORD);
  if (role === 'user') return safeEqual(password, USER_PASSWORD);
  return false;
}

// Resolve a request to { role } or null using the Bearer token.
export function authenticate(req) {
  const token = getToken(req);
  if (!token) return null;
  return verifyToken(token);
}

function getToken(req) {
  const header = req.headers['authorization'] || req.headers['Authorization'] || '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : null;
}
