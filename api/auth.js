import { ok, fail, readBody } from './_lib/http.js';
import { checkPassword, issueToken } from './_lib/auth.js';

// POST /api/auth  body: { role: 'admin'|'user', password }
// Returns a signed token (stored in httpOnly cookie by the client fetch).
export default async function handler(req, res) {
  if (req.method !== 'POST') return fail(res, 405, 'Method not allowed');
  const { role, password } = await readBody(req);
  if (role !== 'admin' && role !== 'user') return fail(res, 400, 'Invalid role');
  if (!checkPassword(role, password)) return fail(res, 401, 'Onjuist wachtwoord');
  const token = issueToken(role);
  return ok(res, { token, role });
}
