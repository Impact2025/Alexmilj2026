import { pgTable, serial, varchar, integer, boolean, timestamp, jsonb, text, unique, index } from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().default('Champion'),
  email: varchar('email', { length: 255 }).unique(),
  authId: varchar('auth_id', { length: 255 }).unique(), // For Clerk/Auth0
  xp: integer('xp').notNull().default(0),
  streak: integer('streak').notNull().default(0),
  currentWeek: integer('current_week').notNull().default(1),
  savedMoney: integer('saved_money').notNull().default(0),
  earnedMoney: integer('earned_money').notNull().default(0),
  morningRitualCompleted: boolean('morning_ritual_completed').notNull().default(false),
  lastMorningRitual: timestamp('last_morning_ritual'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Completed missions tracking
export const completedMissions = pgTable('completed_missions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  weekNumber: integer('week_number').notNull(),
  xpEarned: integer('xp_earned').notNull(),
  completedAt: timestamp('completed_at').defaultNow().notNull(),
}, (table) => ({
  // Unique constraint: user can only complete each mission once
  uniqueUserMission: unique('unique_user_mission').on(table.userId, table.weekNumber),
}));

// Badges
export const badges = pgTable('badges', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  badgeType: varchar('badge_type', { length: 50 }).notNull(),
  badgeName: varchar('badge_name', { length: 100 }).notNull(),
  earnedAt: timestamp('earned_at').defaultNow().notNull(),
});

// Daily logs for tracking
export const dailyLogs = pgTable('daily_logs', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  date: timestamp('date').defaultNow().notNull(),
  morningRitualDone: boolean('morning_ritual_done').notNull().default(false),
  focus: text('focus'),
  xpEarned: integer('xp_earned').notNull().default(0),
  notes: text('notes'),
});

// Sunday reviews/videos
export const sundayReviews = pgTable('sunday_reviews', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  weekNumber: integer('week_number').notNull(),
  videoUrl: varchar('video_url', { length: 500 }),
  notes: text('notes'),
  xpEarned: integer('xp_earned').notNull().default(75),
  submittedAt: timestamp('submitted_at').defaultNow().notNull(),
  // Admin feedback
  adminFeedback: text('admin_feedback'),
  adminRating: integer('admin_rating'), // 1-5 stars
  reviewedAt: timestamp('reviewed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Weekly focus/goals
export const weeklyGoals = pgTable('weekly_goals', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  weekNumber: integer('week_number').notNull(),
  goals: jsonb('goals'), // Array of goal objects
  reflection: text('reflection'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Mission answers - children's answers to mission step questions
export const missionAnswers = pgTable('mission_answers', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  weekNumber: integer('week_number').notNull(),
  stepIndex: integer('step_index').notNull(), // 0-based index
  answer: text('answer').notNull(), // Max 500 characters (validated in app)
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  // Unique constraint: one answer per user per step
  uniqueUserWeekStep: unique('unique_user_week_step').on(table.userId, table.weekNumber, table.stepIndex),
  // Index for fast queries by user and week
  userWeekIdx: index('user_week_idx').on(table.userId, table.weekNumber),
}));
