import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentVehicle, getNextVehicle, getProgressToNext } from '../data/vehicles';
import { getQuoteOfTheDay } from '../data/quotes';

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
  // Load state from localStorage or use initial state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('reis-user-data');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Reset morning ritual if it's a new day
      const lastRitual = parsed.lastMorningRitual ? new Date(parsed.lastMorningRitual) : null;
      const today = new Date();
      if (lastRitual && lastRitual.toDateString() !== today.toDateString()) {
        parsed.morningRitualCompleted = false;
      }
      return parsed;
    }
    return initialUserState;
  });

  // Save to localStorage whenever user state changes
  useEffect(() => {
    localStorage.setItem('reis-user-data', JSON.stringify(user));
  }, [user]);

  // Computed values
  const currentVehicle = getCurrentVehicle(user.xp);
  const nextVehicle = getNextVehicle(user.xp);
  const progressToNext = getProgressToNext(user.xp);
  const todayQuote = getQuoteOfTheDay();

  // Actions
  const addXP = (amount) => {
    setUser(prev => ({
      ...prev,
      xp: prev.xp + amount
    }));
  };

  const completeMorningRitual = (focus) => {
    setUser(prev => {
      const newStreak = prev.morningRitualCompleted ? prev.streak : prev.streak + 1;
      let bonusXP = 0;
      
      // Check for streak bonuses
      if (newStreak === 7) bonusXP = XP_REWARDS.STREAK_BONUS_7;
      if (newStreak === 30) bonusXP = XP_REWARDS.STREAK_BONUS_30;
      
      return {
        ...prev,
        xp: prev.xp + XP_REWARDS.MORNING_RITUAL + bonusXP,
        streak: newStreak,
        morningRitualCompleted: true,
        lastMorningRitual: new Date().toISOString(),
      };
    });
  };

  const completeMission = (weekNumber, xpReward) => {
    setUser(prev => ({
      ...prev,
      xp: prev.xp + xpReward,
      completedMissions: [...prev.completedMissions, weekNumber],
      currentWeek: Math.max(prev.currentWeek, weekNumber + 1),
    }));
  };

  const completeWeeklyVideo = () => {
    addXP(XP_REWARDS.WEEKLY_VIDEO);
  };

  const updateSavedMoney = (amount) => {
    setUser(prev => ({
      ...prev,
      savedMoney: amount
    }));
  };

  const updateEarnedMoney = (amount) => {
    setUser(prev => ({
      ...prev,
      earnedMoney: amount
    }));
  };

  const addBadge = (badge) => {
    setUser(prev => ({
      ...prev,
      badges: [...prev.badges, badge]
    }));
  };

  const updateUserName = (name) => {
    setUser(prev => ({
      ...prev,
      name
    }));
  };

  const resetProgress = () => {
    if (window.confirm('Weet je zeker dat je al je voortgang wilt resetten?')) {
      localStorage.removeItem('reis-user-data');
      setUser(initialUserState);
    }
  };

  // Helper functions
  const isMissionCompleted = (weekNumber) => {
    return user.completedMissions.includes(weekNumber);
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
