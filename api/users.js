import { ok, fail, readBody } from './_lib/http.js';
import { authenticate } from './_lib/auth.js';
import { getOrCreateUserByRole, getUserById, addUserXP, completeMorningRitual, updateUserMoney, updateUserName, getCompletedMissionWeeks } from './_lib/queries.js';

// All /api/users routes require a valid session token (Cookie: token=...).
function requireSession(req, res) {
  const session = authenticate(req);
  if (!session) {
    fail(res, 401, 'Niet ingelogd');
    return null;
  }
  return session;
}

// GET /api/users/me -> current user profile + completed mission weeks
export default async function handler(req, res) {
  const session = requireSession(req, res);
  if (!session) return;

  if (req.method === 'GET') {
    const user = await getOrCreateUserByRole(session.role);
    const weeks = await getCompletedMissionWeeks(user.id);
    return ok(res, { success: true, data: { ...user, completedMissions: weeks }, role: session.role });
  }

  if (req.method === 'POST') {
    const { action, focus, savedMoney, earnedMoney, name } = await readBody(req);
    const user = await getOrCreateUserByRole(session.role);
    let result = user;
    if (action === 'morningRitual') {
      const xp = 25 + (user.streak + 1 === 7 ? 100 : 0) + (user.streak + 1 === 30 ? 500 : 0);
      const r = await completeMorningRitual(user.id, focus, xp);
      if (r.alreadyCompleted) return ok(res, { success: false, error: 'Al gedaan vandaag', alreadyCompleted: true });
      result = r.user;
    } else if (action === 'addXP') {
      const { amount } = await readBody(req);
      result = await addUserXP(user.id, amount);
    } else if (action === 'updateMoney') {
      result = await updateUserMoney(user.id, savedMoney ?? user.savedMoney, earnedMoney ?? user.earnedMoney);
    } else if (action === 'updateName') {
      result = await updateUserName(user.id, name);
    } else {
      return fail(res, 400, 'Unknown action');
    }
    const weeks = await getCompletedMissionWeeks(user.id);
    return ok(res, { success: true, data: { ...result, completedMissions: weeks } });
  }

  return fail(res, 405, 'Method not allowed');
}
