import { ok, fail, readBody } from './_lib/http.js';
import { authenticate } from './_lib/auth.js';
import { upsertAnswer, getAnswersByWeekForUser, getAllAnswersForUser } from './_lib/queries.js';

const MAX = 500;

function requireSession(req, res) {
  const session = authenticate(req);
  if (!session) {
    fail(res, 401, 'Niet ingelogd');
    return null;
  }
  return session;
}

// GET  /api/answers?week=12            -> answers for one week
// GET  /api/answers                    -> all answers grouped by week
// POST /api/answers                    -> upsert { weekNumber, stepIndex, answer }
export default async function handler(req, res) {
  const session = requireSession(req, res);
  if (!session) return;
  const user = await (await import('./_lib/queries.js')).getOrCreateUserByRole(session.role);

  if (req.method === 'GET') {
    const url = new URL(req.url, 'http://localhost');
    const week = url.searchParams.get('week');
    if (week) {
      const rows = await getAnswersByWeekForUser(user.id, Number(week));
      return ok(res, { success: true, data: rows });
    }
    const grouped = await getAllAnswersForUser(user.id);
    return ok(res, { success: true, data: grouped });
  }

  if (req.method === 'POST') {
    const { weekNumber, stepIndex, answer } = await readBody(req);
    if (!answer || !answer.trim()) return fail(res, 400, 'Antwoord mag niet leeg zijn');
    if (answer.length > MAX) return fail(res, 400, 'Antwoord te lang (max 500)');
    const saved = await upsertAnswer(user.id, weekNumber, stepIndex, answer);
    return ok(res, { success: true, data: saved });
  }

  return fail(res, 405, 'Method not allowed');
}
