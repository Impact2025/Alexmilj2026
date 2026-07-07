import { api } from '../lib/api';

// Answer service — client wrapper over the serverless API.

export async function saveStepAnswer(userId, weekNumber, stepIndex, answer) {
  return api.saveAnswer(weekNumber, stepIndex, answer);
}

export async function adminSaveStepAnswer(targetUserId, weekNumber, stepIndex, answer) {
  return api.adminAction('editAnswer', { weekNumber, stepIndex, answer });
}

export async function getMissionAnswers(userId, weekNumber) {
  return api.getAnswers(weekNumber);
}

export async function getStepAnswer() {
  return { success: true, data: null };
}

export async function deleteStepAnswer() {
  return { success: true };
}

export async function getMissionCompletionPercentage(userId, weekNumber, totalSteps) {
  const res = await api.getAnswers(weekNumber);
  if (!res.success) return res;
  const answered = res.data.length;
  const percentage = totalSteps > 0 ? Math.round((answered / totalSteps) * 100) : 0;
  return { success: true, data: { answeredSteps: answered, totalSteps, percentage } };
}

export async function getAllUserAnswers() {
  return api.getAnswers();
}

export async function getAnswersByWeek(userId) {
  const res = await api.getAnswers();
  if (res.success) return { success: true, data: res.data };
  return res;
}
