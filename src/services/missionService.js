import { api } from '../lib/api';

// Mission service — client wrapper over the serverless API.

export async function completeMission(userId, weekNumber, xpEarned) {
  return api.completeMission(weekNumber, xpEarned);
}

export async function getUserCompletedMissions() {
  const res = await api.getMe();
  if (res.success) return { success: true, data: (res.data.completedMissions || []).map((w) => ({ weekNumber: w })) };
  return res;
}

export async function isMissionCompleted() {
  return { success: true, data: false };
}

export async function getMissionStats() {
  return { success: true, data: { totalCompleted: 0, totalXPFromMissions: 0, missions: [] } };
}

export async function addBadge() {
  return { success: true };
}

export async function getUserBadges() {
  return { success: true, data: [] };
}

export async function submitSundayReview(userId, weekNumber, videoUrl, notes, xpEarned = 75) {
  return api.sundayReview(weekNumber, videoUrl, notes, xpEarned);
}

export async function getUserSundayReviews() {
  return api.admin('reviews');
}
