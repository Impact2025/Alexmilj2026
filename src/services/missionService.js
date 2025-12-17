import { db, schema } from '../db';
import { eq, and } from 'drizzle-orm';

/**
 * Mission Service - Handles all mission-related database operations
 */

// Complete a mission
export async function completeMission(userId, weekNumber, xpEarned) {
  try {
    // Check if mission already completed
    const [existing] = await db
      .select()
      .from(schema.completedMissions)
      .where(
        and(
          eq(schema.completedMissions.userId, userId),
          eq(schema.completedMissions.weekNumber, weekNumber)
        )
      );

    if (existing) {
      return {
        success: false,
        error: 'Mission already completed',
        alreadyCompleted: true
      };
    }

    // Add completed mission
    const [mission] = await db
      .insert(schema.completedMissions)
      .values({
        userId,
        weekNumber,
        xpEarned,
      })
      .returning();

    // Update user XP and current week
    await db
      .update(schema.users)
      .set({
        xp: db.raw(`xp + ${xpEarned}`),
        currentWeek: db.raw(`GREATEST(current_week, ${weekNumber + 1})`),
        updatedAt: new Date()
      })
      .where(eq(schema.users.id, userId));

    return { success: true, data: mission };
  } catch (error) {
    console.error('Error completing mission:', error);
    return { success: false, error: error.message };
  }
}

// Get all completed missions for a user
export async function getUserCompletedMissions(userId) {
  try {
    const missions = await db
      .select()
      .from(schema.completedMissions)
      .where(eq(schema.completedMissions.userId, userId));

    return { success: true, data: missions };
  } catch (error) {
    console.error('Error fetching completed missions:', error);
    return { success: false, error: error.message };
  }
}

// Check if a mission is completed
export async function isMissionCompleted(userId, weekNumber) {
  try {
    const [mission] = await db
      .select()
      .from(schema.completedMissions)
      .where(
        and(
          eq(schema.completedMissions.userId, userId),
          eq(schema.completedMissions.weekNumber, weekNumber)
        )
      );

    return { success: true, data: !!mission };
  } catch (error) {
    console.error('Error checking mission completion:', error);
    return { success: false, error: error.message };
  }
}

// Get mission completion stats
export async function getMissionStats(userId) {
  try {
    const missions = await db
      .select()
      .from(schema.completedMissions)
      .where(eq(schema.completedMissions.userId, userId));

    // Calculate stats by category (if we add category tracking)
    const totalCompleted = missions.length;
    const totalXPFromMissions = missions.reduce((sum, m) => sum + m.xpEarned, 0);

    return {
      success: true,
      data: {
        totalCompleted,
        totalXPFromMissions,
        missions
      }
    };
  } catch (error) {
    console.error('Error fetching mission stats:', error);
    return { success: false, error: error.message };
  }
}

// Add a badge
export async function addBadge(userId, badgeType, badgeName) {
  try {
    const [badge] = await db
      .insert(schema.badges)
      .values({
        userId,
        badgeType,
        badgeName,
      })
      .returning();

    return { success: true, data: badge };
  } catch (error) {
    console.error('Error adding badge:', error);
    return { success: false, error: error.message };
  }
}

// Get all badges for a user
export async function getUserBadges(userId) {
  try {
    const badges = await db
      .select()
      .from(schema.badges)
      .where(eq(schema.badges.userId, userId));

    return { success: true, data: badges };
  } catch (error) {
    console.error('Error fetching badges:', error);
    return { success: false, error: error.message };
  }
}

// Submit Sunday review/video
export async function submitSundayReview(userId, weekNumber, videoUrl, notes, xpEarned = 75) {
  try {
    const [review] = await db
      .insert(schema.sundayReviews)
      .values({
        userId,
        weekNumber,
        videoUrl,
        notes,
        xpEarned,
      })
      .returning();

    // Update user XP
    await db
      .update(schema.users)
      .set({
        xp: db.raw(`xp + ${xpEarned}`),
        updatedAt: new Date()
      })
      .where(eq(schema.users.id, userId));

    return { success: true, data: review };
  } catch (error) {
    console.error('Error submitting Sunday review:', error);
    return { success: false, error: error.message };
  }
}

// Get all Sunday reviews for a user
export async function getUserSundayReviews(userId) {
  try {
    const reviews = await db
      .select()
      .from(schema.sundayReviews)
      .where(eq(schema.sundayReviews.userId, userId));

    return { success: true, data: reviews };
  } catch (error) {
    console.error('Error fetching Sunday reviews:', error);
    return { success: false, error: error.message };
  }
}
