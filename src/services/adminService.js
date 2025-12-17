import { db, schema } from '../db';
import { eq, desc, sql } from 'drizzle-orm';

/**
 * Admin Service - Handles admin-specific database operations
 */

// Check if database is available
function checkDb() {
  if (!db) {
    return { success: false, error: 'Database not configured' };
  }
  return { success: true };
}

/**
 * Get all activity logs for a user
 * Combines daily logs and completed missions
 */
export async function getUserActivityLog(userId, limit = 50) {
  const dbCheck = checkDb();
  if (!dbCheck.success) return dbCheck;

  try {
    // Get daily logs (morning rituals)
    const dailyLogs = await db
      .select()
      .from(schema.dailyLogs)
      .where(eq(schema.dailyLogs.userId, userId))
      .orderBy(desc(schema.dailyLogs.date))
      .limit(limit);

    // Get completed missions
    const missions = await db
      .select()
      .from(schema.completedMissions)
      .where(eq(schema.completedMissions.userId, userId))
      .orderBy(desc(schema.completedMissions.completedAt))
      .limit(limit);

    // Combine and sort by date
    const activities = [
      ...dailyLogs.map(log => ({
        type: 'ritual',
        date: log.date,
        xp: log.xpEarned,
        details: {
          focus: log.focus,
          notes: log.notes
        }
      })),
      ...missions.map(mission => ({
        type: 'mission',
        date: mission.completedAt,
        xp: mission.xpEarned,
        details: {
          weekNumber: mission.weekNumber
        }
      }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit);

    return { success: true, data: activities };
  } catch (error) {
    console.error('Error fetching activity log:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get all Sunday reviews for a user
 */
export async function getUserSundayReviews(userId) {
  const dbCheck = checkDb();
  if (!dbCheck.success) return dbCheck;

  try {
    const reviews = await db
      .select()
      .from(schema.sundayReviews)
      .where(eq(schema.sundayReviews.userId, userId))
      .orderBy(desc(schema.sundayReviews.weekNumber));

    return { success: true, data: reviews };
  } catch (error) {
    console.error('Error fetching Sunday reviews:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Update Sunday review with admin feedback
 */
export async function addReviewFeedback(reviewId, feedback, rating) {
  const dbCheck = checkDb();
  if (!dbCheck.success) return dbCheck;

  try {
    const [review] = await db
      .update(schema.sundayReviews)
      .set({
        adminFeedback: feedback,
        adminRating: rating,
        reviewedAt: new Date()
      })
      .where(eq(schema.sundayReviews.id, reviewId))
      .returning();

    return { success: true, data: review };
  } catch (error) {
    console.error('Error adding feedback:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get XP history for charts
 */
export async function getXPHistory(userId, days = 30) {
  const dbCheck = checkDb();
  if (!dbCheck.success) return dbCheck;

  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const logs = await db
      .select()
      .from(schema.dailyLogs)
      .where(eq(schema.dailyLogs.userId, userId))
      .orderBy(schema.dailyLogs.date);

    const missions = await db
      .select()
      .from(schema.completedMissions)
      .where(eq(schema.completedMissions.userId, userId))
      .orderBy(schema.completedMissions.completedAt);

    // Group by date
    const xpByDate = {};

    logs.forEach(log => {
      const date = new Date(log.date).toLocaleDateString('nl-NL');
      xpByDate[date] = (xpByDate[date] || 0) + log.xpEarned;
    });

    missions.forEach(mission => {
      const date = new Date(mission.completedAt).toLocaleDateString('nl-NL');
      xpByDate[date] = (xpByDate[date] || 0) + mission.xpEarned;
    });

    // Convert to array
    const history = Object.entries(xpByDate).map(([date, xp]) => ({
      date,
      xp
    }));

    return { success: true, data: history };
  } catch (error) {
    console.error('Error fetching XP history:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get streak history
 */
export async function getStreakHistory(userId) {
  const dbCheck = checkDb();
  if (!dbCheck.success) return dbCheck;

  try {
    const logs = await db
      .select()
      .from(schema.dailyLogs)
      .where(eq(schema.dailyLogs.userId, userId))
      .orderBy(schema.dailyLogs.date);

    const streakData = logs
      .filter(log => log.morningRitualDone)
      .map(log => ({
        date: new Date(log.date).toLocaleDateString('nl-NL'),
        completed: true
      }));

    return { success: true, data: streakData };
  } catch (error) {
    console.error('Error fetching streak history:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get completion rate by category
 */
export async function getCompletionStats(userId) {
  const dbCheck = checkDb();
  if (!dbCheck.success) return dbCheck;

  try {
    const completed = await db
      .select()
      .from(schema.completedMissions)
      .where(eq(schema.completedMissions.userId, userId));

    // This would need mission metadata to categorize
    // For now, return basic stats
    const stats = {
      total: completed.length,
      lastWeek: completed.filter(m => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return new Date(m.completedAt) > weekAgo;
      }).length,
      lastMonth: completed.filter(m => {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return new Date(m.completedAt) > monthAgo;
      }).length
    };

    return { success: true, data: stats };
  } catch (error) {
    console.error('Error fetching completion stats:', error);
    return { success: false, error: error.message };
  }
}
