import { db, schema } from './db.js';
import { eq, and, desc, sql, gte } from 'drizzle-orm';

// Centralised data-access layer. All database writes/reads go through here so
// the only thing touching Neon is server code.

export async function getOrCreateUserByRole(role, name) {
  // Single shared user per role keeps the vader-zoon model simple.
  const email = role === 'admin' ? 'admin@opnaareenmiljoen.app' : 'user@opnaareenmiljoen.app';
  const [existing] = await db.select().from(schema.users).where(eq(schema.users.email, email));
  if (existing) return existing;
  const [created] = await db
    .insert(schema.users)
    .values({ name: name || (role === 'admin' ? 'Papa' : 'Zoon'), email })
    .returning();
  return created;
}

export async function getUserById(userId) {
  const [user] = await db.select().from(schema.users).where(eq(schema.users.id, userId));
  return user || null;
}

export async function addUserXP(userId, amount) {
  const [user] = await db
    .update(schema.users)
    .set({ xp: sql`${schema.users.xp} + ${amount}`, updatedAt: new Date() })
    .where(eq(schema.users.id, userId))
    .returning();
  return user;
}

export async function completeMorningRitual(userId, focus, xpEarned) {
  const [existing] = await db.select().from(schema.users).where(eq(schema.users.id, userId));
  if (existing?.lastMorningRitual) {
    const last = new Date(existing.lastMorningRitual);
    const today = new Date();
    if (last.toDateString() === today.toDateString()) {
      return { alreadyCompleted: true };
    }
  }
  const [user] = await db
    .update(schema.users)
    .set({
      morningRitualCompleted: true,
      lastMorningRitual: new Date(),
      xp: sql`${schema.users.xp} + ${xpEarned}`,
      streak: sql`${schema.users.streak} + 1`,
      updatedAt: new Date(),
    })
    .where(eq(schema.users.id, userId))
    .returning();
  await db.insert(schema.dailyLogs).values({ userId, date: new Date(), morningRitualDone: true, focus, xpEarned });
  return { user };
}

export async function completeMission(userId, weekNumber, xpEarned) {
  const [existing] = await db
    .select()
    .from(schema.completedMissions)
    .where(and(eq(schema.completedMissions.userId, userId), eq(schema.completedMissions.weekNumber, weekNumber)));
  if (existing) return { alreadyCompleted: true };
  await db.insert(schema.completedMissions).values({ userId, weekNumber, xpEarned });
  const [user] = await db
    .update(schema.users)
    .set({
      xp: sql`${schema.users.xp} + ${xpEarned}`,
      currentWeek: sql`GREATEST(${schema.users.currentWeek}, ${weekNumber + 1})`,
      updatedAt: new Date(),
    })
    .where(eq(schema.users.id, userId))
    .returning();
  return { user };
}

export async function submitSundayReview(userId, weekNumber, videoUrl, notes, xpEarned) {
  const [review] = await db
    .insert(schema.sundayReviews)
    .values({ userId, weekNumber, videoUrl, notes, xpEarned })
    .returning();
  const [user] = await db
    .update(schema.users)
    .set({ xp: sql`${schema.users.xp} + ${xpEarned}`, updatedAt: new Date() })
    .where(eq(schema.users.id, userId))
    .returning();
  return { review, user };
}

export async function updateUserMoney(userId, savedMoney, earnedMoney) {
  const [user] = await db
    .update(schema.users)
    .set({ savedMoney, earnedMoney, updatedAt: new Date() })
    .where(eq(schema.users.id, userId))
    .returning();
  return user;
}

export async function updateUserName(userId, name) {
  const [user] = await db
    .update(schema.users)
    .set({ name, updatedAt: new Date() })
    .where(eq(schema.users.id, userId))
    .returning();
  return user;
}

export async function getCompletedMissionWeeks(userId) {
  const rows = await db.select({ weekNumber: schema.completedMissions.weekNumber })
    .from(schema.completedMissions)
    .where(eq(schema.completedMissions.userId, userId));
  return rows.map((r) => r.weekNumber);
}

export async function upsertAnswer(userId, weekNumber, stepIndex, answer) {
  const [existing] = await db
    .select()
    .from(schema.missionAnswers)
    .where(
      and(
        eq(schema.missionAnswers.userId, userId),
        eq(schema.missionAnswers.weekNumber, weekNumber),
        eq(schema.missionAnswers.stepIndex, stepIndex)
      )
    );
  if (existing) {
    const [updated] = await db
      .update(schema.missionAnswers)
      .set({ answer: answer.trim(), updatedAt: new Date() })
      .where(eq(schema.missionAnswers.id, existing.id))
      .returning();
    return updated;
  }
  const [inserted] = await db
    .insert(schema.missionAnswers)
    .values({ userId, weekNumber, stepIndex, answer: answer.trim() })
    .returning();
  return inserted;
}

export async function getAnswersByWeekForUser(userId, weekNumber) {
  return db
    .select()
    .from(schema.missionAnswers)
    .where(and(eq(schema.missionAnswers.userId, userId), eq(schema.missionAnswers.weekNumber, weekNumber)))
    .orderBy(schema.missionAnswers.stepIndex);
}

export async function getAllAnswersForUser(userId) {
  const rows = await db
    .select()
    .from(schema.missionAnswers)
    .where(eq(schema.missionAnswers.userId, userId))
    .orderBy(schema.missionAnswers.weekNumber, schema.missionAnswers.stepIndex);
  const grouped = {};
  for (const row of rows) {
    if (!grouped[row.weekNumber]) grouped[row.weekNumber] = [];
    grouped[row.weekNumber].push(row);
  }
  return grouped;
}

// ---- Admin queries (operate on the user with the given id) ----

export async function getUserActivityLog(userId, limit = 50) {
  const dailyLogs = await db
    .select()
    .from(schema.dailyLogs)
    .where(eq(schema.dailyLogs.userId, userId))
    .orderBy(desc(schema.dailyLogs.date))
    .limit(limit);
  const missions = await db
    .select()
    .from(schema.completedMissions)
    .where(eq(schema.completedMissions.userId, userId))
    .orderBy(desc(schema.completedMissions.completedAt))
    .limit(limit);
  return [
    ...dailyLogs.map((l) => ({ type: 'ritual', date: l.date, xp: l.xpEarned, details: { focus: l.focus, notes: l.notes } })),
    ...missions.map((m) => ({ type: 'mission', date: m.completedAt, xp: m.xpEarned, details: { weekNumber: m.weekNumber } })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
}

export async function getUserSundayReviews(userId) {
  return db
    .select()
    .from(schema.sundayReviews)
    .where(eq(schema.sundayReviews.userId, userId))
    .orderBy(desc(schema.sundayReviews.weekNumber));
}

export async function addReviewFeedback(reviewId, feedback, rating) {
  const [review] = await db
    .update(schema.sundayReviews)
    .set({ adminFeedback: feedback, adminRating: rating, reviewedAt: new Date() })
    .where(eq(schema.sundayReviews.id, reviewId))
    .returning();
  return review;
}

export async function getXPHistory(userId, days = 30) {
  const start = new Date();
  start.setDate(start.getDate() - days);
  const logs = await db.select().from(schema.dailyLogs).where(eq(schema.dailyLogs.userId, userId)).orderBy(schema.dailyLogs.date);
  const missions = await db.select().from(schema.completedMissions).where(eq(schema.completedMissions.userId, userId)).orderBy(schema.completedMissions.completedAt);
  const xpByDate = {};
  for (const l of logs) {
    const d = new Date(l.date).toLocaleDateString('nl-NL');
    xpByDate[d] = (xpByDate[d] || 0) + l.xpEarned;
  }
  for (const m of missions) {
    const d = new Date(m.completedAt).toLocaleDateString('nl-NL');
    xpByDate[d] = (xpByDate[d] || 0) + m.xpEarned;
  }
  return Object.entries(xpByDate).map(([date, xp]) => ({ date, xp }));
}

export async function getStreakHistory(userId) {
  const logs = await db.select().from(schema.dailyLogs).where(eq(schema.dailyLogs.userId, userId)).orderBy(schema.dailyLogs.date);
  return logs
    .filter((l) => l.morningRitualDone)
    .map((l) => ({ date: new Date(l.date).toLocaleDateString('nl-NL'), completed: true }));
}

export async function getCompletionStats(userId) {
  const completed = await db.select().from(schema.completedMissions).where(eq(schema.completedMissions.userId, userId));
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const monthAgo = new Date();
  monthAgo.setMonth(monthAgo.getMonth() - 1);
  return {
    total: completed.length,
    lastWeek: completed.filter((m) => new Date(m.completedAt) > weekAgo).length,
    lastMonth: completed.filter((m) => new Date(m.completedAt) > monthAgo).length,
  };
}
