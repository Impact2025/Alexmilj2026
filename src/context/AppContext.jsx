import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { getCurrentVehicle, getNextVehicle, getProgressToNext } from '../data/vehicles';
import { getQuoteOfTheDay } from '../data/quotes';
import * as userService from '../services/userService';
import * as missionService from '../services/missionService';

const AppContext = createContext();

// Initial user state
const initialUserState = {
  name: 'Champion',
  xp: 0,
  streak: 0,
  currentWeek: 1,
  completedMissions: [],
  morningRitualCompleted: false,
  lastMorningRitual: null,
  savedMoney: 0,
  earnedMoney: 0,
  badges: [],
  createdAt: new Date().toISOString(),
};

// XP rewards
export const XP_REWARDS = {
  MORNING_RITUAL: 25,
  WEEKLY_VIDEO: 75,
  STREAK_BONUS_7: 100,
  STREAK_BONUS_30: 500,
};

export function AppProvider({ children }) {
  const { isSignedIn, user: clerkUser, isLoaded } = useUser();
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncMode, setSyncMode] = useState('auto'); // 'auto', 'local', 'cloud'

  // Load user data from localStorage or database
  useEffect(() => {
    const loadUserData = async () => {
      if (!isLoaded) return;

      try {
        if (isSignedIn && clerkUser) {
          // User is signed in - try to load from database
          const result = await userService.getUserByAuthId(clerkUser.id);

          if (result.success && result.data) {
            // User exists in database
            setDbUser(result.data);
            setUser({
              ...result.data,
              completedMissions: [], // Will be loaded separately
            });
            setSyncMode('cloud');
          } else {
            // New user - create in database
            const createResult = await userService.createUser({
              name: clerkUser.firstName || 'Champion',
              email: clerkUser.primaryEmailAddress?.emailAddress,
              authId: clerkUser.id,
            });

            if (createResult.success) {
              setDbUser(createResult.data);
              setUser({
                ...createResult.data,
                completedMissions: [],
              });
              setSyncMode('cloud');
            } else {
              // Fallback to localStorage
              loadFromLocalStorage();
              setSyncMode('local');
            }
          }
        } else {
          // Not signed in - use localStorage
          loadFromLocalStorage();
          setSyncMode('local');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        loadFromLocalStorage();
        setSyncMode('local');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [isSignedIn, clerkUser, isLoaded]);

  // Load completed missions from database
  useEffect(() => {
    const loadCompletedMissions = async () => {
      if (dbUser && syncMode === 'cloud') {
        const result = await missionService.getUserCompletedMissions(dbUser.id);
        if (result.success) {
          setUser(prev => ({
            ...prev,
            completedMissions: result.data.map(m => m.weekNumber),
          }));
        }
      }
    };

    loadCompletedMissions();
  }, [dbUser, syncMode]);

  // Helper to load from localStorage
  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('reis-user-data');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Reset morning ritual if it's a new day
      const lastRitual = parsed.lastMorningRitual ? new Date(parsed.lastMorningRitual) : null;
      const today = new Date();
      if (lastRitual && lastRitual.toDateString() !== today.toDateString()) {
        parsed.morningRitualCompleted = false;
      }
      setUser(parsed);
    } else {
      setUser(initialUserState);
    }
  };

  // Save to localStorage whenever user state changes (for offline support)
  useEffect(() => {
    if (user && syncMode === 'local') {
      localStorage.setItem('reis-user-data', JSON.stringify(user));
    }
  }, [user, syncMode]);

  // Computed values
  const currentVehicle = user ? getCurrentVehicle(user.xp) : null;
  const nextVehicle = user ? getNextVehicle(user.xp) : null;
  const progressToNext = user ? getProgressToNext(user.xp) : 0;
  const todayQuote = getQuoteOfTheDay();

  // Actions with cloud sync
  const addXP = async (amount) => {
    if (syncMode === 'cloud' && dbUser) {
      const result = await userService.addUserXP(dbUser.id, amount);
      if (result.success) {
        setUser(prev => ({ ...prev, xp: result.data.xp }));
      }
    } else {
      setUser(prev => ({ ...prev, xp: prev.xp + amount }));
    }
  };

  const completeMorningRitual = async (focus) => {
    const newStreak = user.morningRitualCompleted ? user.streak : user.streak + 1;
    let bonusXP = 0;

    if (newStreak === 7) bonusXP = XP_REWARDS.STREAK_BONUS_7;
    if (newStreak === 30) bonusXP = XP_REWARDS.STREAK_BONUS_30;

    const totalXP = XP_REWARDS.MORNING_RITUAL + bonusXP;

    if (syncMode === 'cloud' && dbUser) {
      const result = await userService.completeMorningRitual(dbUser.id, focus, totalXP);
      if (result.success) {
        setUser(prev => ({
          ...prev,
          xp: result.data.xp,
          streak: result.data.streak,
          morningRitualCompleted: true,
          lastMorningRitual: result.data.lastMorningRitual,
        }));
      }
    } else {
      setUser(prev => ({
        ...prev,
        xp: prev.xp + totalXP,
        streak: newStreak,
        morningRitualCompleted: true,
        lastMorningRitual: new Date().toISOString(),
      }));
    }
  };

  const completeMission = async (weekNumber, xpReward) => {
    if (syncMode === 'cloud' && dbUser) {
      const result = await missionService.completeMission(dbUser.id, weekNumber, xpReward);
      if (result.success && !result.alreadyCompleted) {
        setUser(prev => ({
          ...prev,
          xp: prev.xp + xpReward,
          completedMissions: [...prev.completedMissions, weekNumber],
          currentWeek: Math.max(prev.currentWeek, weekNumber + 1),
        }));
      }
    } else {
      setUser(prev => ({
        ...prev,
        xp: prev.xp + xpReward,
        completedMissions: [...prev.completedMissions, weekNumber],
        currentWeek: Math.max(prev.currentWeek, weekNumber + 1),
      }));
    }
  };

  const completeWeeklyVideo = async (videoUrl, notes) => {
    const weekNumber = user.currentWeek;

    if (syncMode === 'cloud' && dbUser) {
      const result = await missionService.submitSundayReview(
        dbUser.id,
        weekNumber,
        videoUrl,
        notes,
        XP_REWARDS.WEEKLY_VIDEO
      );
      if (result.success) {
        setUser(prev => ({ ...prev, xp: prev.xp + XP_REWARDS.WEEKLY_VIDEO }));
      }
    } else {
      setUser(prev => ({ ...prev, xp: prev.xp + XP_REWARDS.WEEKLY_VIDEO }));
    }
  };

  const updateSavedMoney = async (amount) => {
    if (syncMode === 'cloud' && dbUser) {
      const result = await userService.updateUserMoney(dbUser.id, amount, user.earnedMoney);
      if (result.success) {
        setUser(prev => ({ ...prev, savedMoney: amount }));
      }
    } else {
      setUser(prev => ({ ...prev, savedMoney: amount }));
    }
  };

  const updateEarnedMoney = async (amount) => {
    if (syncMode === 'cloud' && dbUser) {
      const result = await userService.updateUserMoney(dbUser.id, user.savedMoney, amount);
      if (result.success) {
        setUser(prev => ({ ...prev, earnedMoney: amount }));
      }
    } else {
      setUser(prev => ({ ...prev, earnedMoney: amount }));
    }
  };

  const addBadge = async (badge) => {
    if (syncMode === 'cloud' && dbUser) {
      await missionService.addBadge(dbUser.id, badge.type, badge.name);
    }
    setUser(prev => ({
      ...prev,
      badges: [...prev.badges, badge]
    }));
  };

  const updateUserName = async (name) => {
    if (syncMode === 'cloud' && dbUser) {
      const result = await userService.updateUserName(dbUser.id, name);
      if (result.success) {
        setUser(prev => ({ ...prev, name }));
      }
    } else {
      setUser(prev => ({ ...prev, name }));
    }
  };

  const resetProgress = () => {
    if (window.confirm('Weet je zeker dat je al je voortgang wilt resetten?')) {
      localStorage.removeItem('reis-user-data');
      setUser(initialUserState);
    }
  };

  // Helper functions
  const isMissionCompleted = (weekNumber) => {
    return user?.completedMissions?.includes(weekNumber) || false;
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Goedemorgen';
    if (hour < 18) return 'Goedemiddag';
    return 'Goedenavond';
  };

  const getDayName = () => {
    const days = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
    return days[new Date().getDay()];
  };

  const isSunday = () => new Date().getDay() === 0;
  const isMonday = () => new Date().getDay() === 1;

  const value = {
    // User state
    user,
    loading,
    isSignedIn,
    clerkUser,
    syncMode,

    // Computed
    currentVehicle,
    nextVehicle,
    progressToNext,
    todayQuote,

    // Actions
    addXP,
    completeMorningRitual,
    completeMission,
    completeWeeklyVideo,
    updateSavedMoney,
    updateEarnedMoney,
    addBadge,
    updateUserName,
    resetProgress,

    // Helpers
    isMissionCompleted,
    getGreeting,
    getDayName,
    isSunday,
    isMonday,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
