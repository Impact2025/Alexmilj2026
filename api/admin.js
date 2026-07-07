import { ok, fail, readBody } from './_lib/http.js';
import { authenticate } from './_lib/auth.js';
import {
  getOrCreateUserByRole,
  getUserActivityLog,
  getUserSundayReviews,
  addReviewFeedback,
  getXPHistory,
  getStreakHistory,
  getCompletionStats,
  upsertAnswer,
} from './_lib/queries.js';

// Every admin route requires the admin role. Server-enforced.
function requireAdmin(req, res) {
  const session = authenticate(req);
  if (!session || session.role !== 'admin') {
    fail(res, 403, 'Alleen toegankelijk voor admin');
    return null;
  }
  return session;
}

// The admin views/edits the USER (zoon) account, never their own admin profile.
async function targetUser() {
  return getOrCreateUserByRole('user');
}

export default async function handler(req, res) {
  const session = requireAdmin(req, res);
  if (!session) return;
  const url = new URL(req.url, 'http://localhost');
  const segment = url.searchParams.get('q') || 'overview';

  if (req.method === 'GET') {
    const user = await targetUser();
    if (segment === 'activity') return ok(res, { success: true, data: await getUserActivityLog(user.id) });
    if (segment === 'reviews') return ok(res, { success: true, data: await getUserSundayReviews(user.id) });
    if (segment === 'xphistory') return ok(res, { success: true, data: await getXPHistory(user.id) });
    if (segment === 'streak') return ok(res, { success: true, data: await getStreakHistory(user.id) });
    if (segment === 'stats') return ok(res, { success: true, data: await getCompletionStats(user.id) });
    // overview
    return ok(res, {
      success: true,
      data: {
        user,
        stats: await getCompletionStats(user.id),
      },
    });
  }

  if (req.method === 'POST') {
    const body = await readBody(req);
    if (body.action === 'reviewFeedback') {
      const review = await addReviewFeedback(body.reviewId, body.feedback, body.rating);
      return ok(res, { success: true, data: review });
    }
    if (body.action === 'editAnswer') {
      const user = await targetUser();
      if (!body.answer || !body.answer.trim()) return fail(res, 400, 'Antwoord mag niet leeg zijn');
      if (body.answer.length > 500) return fail(res, 400, 'Antwoord te lang (max 500)');
      const saved = await upsertAnswer(user.id, body.weekNumber, body.stepIndex, body.answer);
      return ok(res, { success: true, data: saved });
    }
    return fail(res, 400, 'Unknown action');
  }

  return fail(res, 405, 'Method not allowed');
}
