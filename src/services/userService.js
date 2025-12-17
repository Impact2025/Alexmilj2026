import { db, schema } from '../db';
import { eq, desc, sql } from 'drizzle-orm';

/**
 * User Service - Handles all user-related database operations
 */

// Check if database is available
function checkDb() {
  if (!db) {
    return { success: false, error: 'Database not configured' };
  }
  return { success: true };
}

// Create a new user
export async function createUser(userData) {
  const dbCheck = checkDb();
  if (!dbCheck.success) return dbCheck;

  try {
    const [user] = await db.insert(schema.users).values({
      name: userData.name || 'Champion',
      email: userData.email,
      authId: userData.authId,
    }).returning();

    return { success: true, data: user };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, error: error.message };
  }
}

// Get user by ID
export async function getUserById(userId) {
  const dbCheck = checkDb();
  if (!dbCheck.success) return dbCheck;

  try {
    const [user] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, userId));

    return { success: true, data: user };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { success: false, error: error.message };
  }
}

// Get user by auth ID (for authentication)
export async function getUserByAuthId(authId) {
  const dbCheck = checkDb();
  if (!dbCheck.success) return dbCheck;

  try {
    const [user] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.authId, authId));

    return { success: true, data: user };
  } catch (error) {
    console.error('Error fetching user by authId:', error);
    return { success: false, error: error.message };
  }
}

// Update user XP
export async function addUserXP(userId, xpAmount) {
  const dbCheck = checkDb();
  if (!dbCheck.success) return dbCheck;

  try {
    const [user] = await db
      .update(schema.users)
      .set({
        xp: sql`${schema.users.xp} + ${xpAmount}`,
        updatedAt: new Date()
      })
      .where(eq(schema.users.id, userId))
      .returning();

    return { success: true, data: user };
  } catch (error) {
    console.error('Error adding XP:', error);
    return { success: false, error: error.message };
  }
}

// Update user streak
export async function updateUserStreak(userId, newStreak) {
  try {
    const [user] = await db
      .update(schema.users)
      .set({
        streak: newStreak,
        updatedAt: new Date()
      })
      .where(eq(schema.users.id, userId))
      .returning();

    return { success: true, data: user };
  } catch (error) {
    console.error('Error updating streak:', error);
    return { success: false, error: error.message };
  }
}

// Complete morning ritual
export async function completeMorningRitual(userId, focus, xpEarned) {
  const dbCheck = checkDb();
  if (!dbCheck.success) return dbCheck;

  try {
    // First, check if already completed today
    const [existingUser] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, userId));

    if (existingUser && existingUser.lastMorningRitual) {
      const lastRitual = new Date(existingUser.lastMorningRitual);
      const today = new Date();
      const isSameDay = lastRitual.toDateString() === today.toDateString();

      if (isSameDay) {
        return {
          success: false,
          error: 'Morning ritual already completed today',
          alreadyCompleted: true
        };
      }
    }

    // Update user
    const [user] = await db
      .update(schema.users)
      .set({
        morningRitualCompleted: true,
        lastMorningRitual: new Date(),
        xp: sql`${schema.users.xp} + ${xpEarned}`,
        streak: sql`${schema.users.streak} + 1`,
        updatedAt: new Date()
      })
      .where(eq(schema.users.id, userId))
      .returning();

    // Log the activity
    await db.insert(schema.dailyLogs).values({
      userId,
      date: new Date(),
      morningRitualDone: true,
      focus,
      xpEarned
    });

    return { success: true, data: user };
  } catch (error) {
    console.error('Error completing morning ritual:', error);
    return { success: false, error: error.message };
  }
}

// Reset morning ritual (called at midnight)
export async function resetMorningRitual(userId) {
  try {
    const [user] = await db
      .update(schema.users)
      .set({
        morningRitualCompleted: false,
        updatedAt: new Date()
      })
      .where(eq(schema.users.id, userId))
      .returning();

    return { success: true, data: user };
  } catch (error) {
    console.error('Error resetting morning ritual:', error);
    return { success: false, error: error.message };
  }
}

// Update user money
export async function updateUserMoney(userId, savedMoney, earnedMoney) {
  try {
    const [user] = await db
      .update(schema.users)
      .set({
        savedMoney,
        earnedMoney,
        updatedAt: new Date()
      })
      .where(eq(schema.users.id, userId))
      .returning();

    return { success: true, data: user };
  } catch (error) {
    console.error('Error updating money:', error);
    return { success: false, error: error.message };
  }
}

// Update user name
export async function updateUserName(userId, name) {
  try {
    const [user] = await db
      .update(schema.users)
      .set({
        name,
        updatedAt: new Date()
      })
      .where(eq(schema.users.id, userId))
      .returning();

    return { success: true, data: user };
  } catch (error) {
    console.error('Error updating name:', error);
    return { success: false, error: error.message };
  }
}

// Get user stats
export async function getUserStats(userId) {
  try {
    const [user] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, userId));

    const completedMissionsCount = await db
      .select()
      .from(schema.completedMissions)
      .where(eq(schema.completedMissions.userId, userId));

    const badgesCount = await db
      .select()
      .from(schema.badges)
      .where(eq(schema.badges.userId, userId));

    return {
      success: true,
      data: {
        user,
        totalMissionsCompleted: completedMissionsCount.length,
        totalBadges: badgesCount.length,
      }
    };
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return { success: false, error: error.message };
  }
}
