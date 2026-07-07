import { api } from '../lib/api';

// Admin service — client wrapper over the serverless admin API.
// All routes are server-enforced to admin role only.

export async function getUserActivityLog() {
  return api.admin('activity');
}

export async function getUserSundayReviews() {
  return api.admin('reviews');
}

export async function addReviewFeedback(reviewId, feedback, rating) {
  return api.adminAction('reviewFeedback', { reviewId, feedback, rating });
}

export async function getXPHistory() {
  return api.admin('xphistory');
}

export async function getStreakHistory() {
  return api.admin('streak');
}

export async function getCompletionStats() {
  return api.admin('stats');
}
