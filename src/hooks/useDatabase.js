import { useState, useEffect, useCallback } from 'react';
import * as userService from '../services/userService';
import * as missionService from '../services/missionService';

/**
 * Custom hook for database operations
 * Provides a clean API for React components
 */
export function useDatabase(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user data
  const loadUser = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const result = await userService.getUserById(userId);

      if (result.success) {
        setUser(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error loading user:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Add XP
  const addXP = useCallback(async (amount) => {
    if (!userId) return;

    try {
      const result = await userService.addUserXP(userId, amount);
      if (result.success) {
        setUser(result.data);
      }
      return result;
    } catch (err) {
      console.error('Error adding XP:', err);
      return { success: false, error: err.message };
    }
  }, [userId]);

  // Complete morning ritual
  const completeMorningRitual = useCallback(async (focus, xpEarned = 25) => {
    if (!userId) return;

    try {
      const result = await userService.completeMorningRitual(userId, focus, xpEarned);
      if (result.success) {
        setUser(result.data);
      }
      return result;
    } catch (err) {
      console.error('Error completing morning ritual:', err);
      return { success: false, error: err.message };
    }
  }, [userId]);

  // Complete mission
  const completeMission = useCallback(async (weekNumber, xpReward) => {
    if (!userId) return;

    try {
      const result = await missionService.completeMission(userId, weekNumber, xpReward);
      if (result.success) {
        // Reload user to get updated XP and currentWeek
        await loadUser();
      }
      return result;
    } catch (err) {
      console.error('Error completing mission:', err);
      return { success: false, error: err.message };
    }
  }, [userId, loadUser]);

  // Complete weekly video
  const completeWeeklyVideo = useCallback(async (weekNumber, videoUrl, notes, xpEarned = 75) => {
    if (!userId) return;

    try {
      const result = await missionService.submitSundayReview(
        userId,
        weekNumber,
        videoUrl,
        notes,
        xpEarned
      );
      if (result.success) {
        await loadUser();
      }
      return result;
    } catch (err) {
      console.error('Error submitting video:', err);
      return { success: false, error: err.message };
    }
  }, [userId, loadUser]);

  // Update saved money
  const updateSavedMoney = useCallback(async (amount) => {
    if (!userId || !user) return;

    try {
      const result = await userService.updateUserMoney(userId, amount, user.earnedMoney);
      if (result.success) {
        setUser(result.data);
      }
      return result;
    } catch (err) {
      console.error('Error updating saved money:', err);
      return { success: false, error: err.message };
    }
  }, [userId, user]);

  // Update earned money
  const updateEarnedMoney = useCallback(async (amount) => {
    if (!userId || !user) return;

    try {
      const result = await userService.updateUserMoney(userId, user.savedMoney, amount);
      if (result.success) {
        setUser(result.data);
      }
      return result;
    } catch (err) {
      console.error('Error updating earned money:', err);
      return { success: false, error: err.message };
    }
  }, [userId, user]);

  // Update user name
  const updateUserName = useCallback(async (name) => {
    if (!userId) return;

    try {
      const result = await userService.updateUserName(userId, name);
      if (result.success) {
        setUser(result.data);
      }
      return result;
    } catch (err) {
      console.error('Error updating name:', err);
      return { success: false, error: err.message };
    }
  }, [userId]);

  // Add badge
  const addBadge = useCallback(async (badgeType, badgeName) => {
    if (!userId) return;

    try {
      const result = await missionService.addBadge(userId, badgeType, badgeName);
      return result;
    } catch (err) {
      console.error('Error adding badge:', err);
      return { success: false, error: err.message };
    }
  }, [userId]);

  // Check if mission is completed
  const isMissionCompleted = useCallback(async (weekNumber) => {
    if (!userId) return false;

    try {
      const result = await missionService.isMissionCompleted(userId, weekNumber);
      return result.success ? result.data : false;
    } catch (err) {
      console.error('Error checking mission:', err);
      return false;
    }
  }, [userId]);

  // Get completed missions
  const getCompletedMissions = useCallback(async () => {
    if (!userId) return [];

    try {
      const result = await missionService.getUserCompletedMissions(userId);
      return result.success ? result.data : [];
    } catch (err) {
      console.error('Error fetching completed missions:', err);
      return [];
    }
  }, [userId]);

  return {
    user,
    loading,
    error,
    loadUser,
    addXP,
    completeMorningRitual,
    completeMission,
    completeWeeklyVideo,
    updateSavedMoney,
    updateEarnedMoney,
    updateUserName,
    addBadge,
    isMissionCompleted,
    getCompletedMissions,
  };
}
