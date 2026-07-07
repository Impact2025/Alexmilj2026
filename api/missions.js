import { ok, fail, readBody } from './_lib/http.js';
import { authenticate } from './_lib/auth.js';
import { completeMission, submitSundayReview } from './_lib/queries.js';

function requireSession(req, res) {
  const session = authenticate(req);
  if (!session) {
    fail(res, 401, 'Niet ingelogd');
    return null;
  }
  return session;
}

// POST /api/missions  body: { action: 'complete', weekNumber, xpEarned }
// POST /api/missions  body: { action: 'sundayReview', weekNumber, videoUrl, notes, xpEarned }
export default async function handler(req, res) {
  const session = requireSession(req, res);
  if (!session) return;
  if (req.method !== 'POST') return fail(res, 405, 'Method not allowed');

  const user = await (await import('./_lib/queries.js')).getOrCreateUserByRole(session.role);
  const body = await readBody(req);
  const { action } = body;

  if (action === 'complete') {
    const { weekNumber, xpEarned } = body;
    const r = await completeMission(user.id, weekNumber, xpEarned);
    if (r.alreadyCompleted) return ok(res, { success: false, error: 'Al voltooid', alreadyCompleted: true });
    return ok(res, { success: true, data: r.user });
  }

  if (action === 'sundayReview') {
    const { weekNumber, videoUrl, notes, xpEarned = 75 } = body;
    const r = await submitSundayReview(user.id, weekNumber, videoUrl, notes, xpEarned);
    return ok(res, { success: true, data: r.user });
  }

  return fail(res, 400, 'Unknown action');
}
