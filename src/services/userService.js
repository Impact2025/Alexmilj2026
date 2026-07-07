import { api } from '../lib/api';

// User service — now a thin client over the serverless API.
// All database writes happen server-side; the client only sends intentions.

export async function createUser(userData) {
  return api.userAction('updateName', { name: userData.name });
}

export async function getUserByAuthId() {
  return api.getMe();
}

export async function getUserById() {
  return api.getMe();
}

export async function addUserXP(amount) {
  return api.userAction('addXP', { amount });
}

export async function updateUserStreak() {
  return { success: true };
}

export async function completeMorningRitual(userId, focus, xpEarned) {
  return api.userAction('morningRitual', { focus, xpEarned });
}

export async function resetMorningRitual() {
  return { success: true };
}

export async function updateUserMoney(savedMoney, earnedMoney) {
  return api.userAction('updateMoney', { savedMoney, earnedMoney });
}

export async function updateUserName(name) {
  return api.userAction('updateName', { name });
}

export async function getUserStats() {
  return api.getMe();
}
