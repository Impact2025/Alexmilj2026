import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCurrentVehicle, getNextVehicle, getProgressToNext } from '../data/vehicles';
import { getQuoteOfTheDay } from '../data/quotes';
import * as userService from '../services/userService';
import * as missionService from '../services/missionService';
import * as answerService from '../services/answerService';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';
import { validateName, validateXP, validateMoney } from '../utils/validation';

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
  const toast = useToast();
  const { isAuthenticated, role, offlineMode } = useAuth();

  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncMode, setSyncMode] = useState('local'); // 'cloud' | 'local'
  const [missionAnswers, setMissionAnswers] = useState({}); // { [weekNumber]: { [stepIndex]: answer } }

  // 🚗 Zomer-challenge voortgang (los van 52-week teller). Altijd lokaal beschikbaar,
  // zodat de challenge ook zonder wifi speelbaar is.
  // vorm: { [challengeId]: { steps: { [stepId]: bool }, notes: string, xpClaimed: bool } }
  const [summerProgress, setSummerProgress] = useState({});

  // Load user data: cloud (server API, when authenticated) or local (guest/offline).
  useEffect(() => {
    const loadUserData = async () => {
      try {
        if (isAuthenticated && role && !offlineMode) {
          // Authenticated: load the user profile from the server (token already validated).
          const result = await userService.getUserByAuthId();
          if (result.success && result.data) {
            setDbUser(result.data);
            setUser({ ...result.data, completedMissions: result.data.completedMissions || [] });
            setSyncMode('cloud');
          } else {
            loadFromLocalStorage();
            setSyncMode('local');
          }
        } else {
          // Not signed in OR offline play: use localStorage as a guest.
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
  }, [isAuthenticated, role, offlineMode]);

  // Laad zomer-challenge voortgang uit localStorage (werkt altijd, ook offline).
  useEffect(() => {
    try {
      const saved = localStorage.getItem('summer-progress');
      if (saved) setSummerProgress(JSON.parse(saved));
    } catch (error) {
      console.error('Error loading summer progress:', error);
    }
  }, []);

  // Sla zomer-challenge voortgang op (lokaal, debounced).
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem('summer-progress', JSON.stringify(summerProgress));
      } catch (error) {
        console.error('Failed to save summer progress:', error);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [summerProgress]);

  // Load completed missions (already part of the /users/me payload; kept for clarity).
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

  // Debounced localStorage save to improve performance
  useEffect(() => {
    if (!user || syncMode !== 'local') return;

    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem('reis-user-data', JSON.stringify(user));
      } catch (error) {
        console.error('Failed to save to localStorage:', error);
        toast.error('Kon voortgang niet opslaan');
      }
    }, 500); // Debounce by 500ms

    return () => clearTimeout(timeoutId);
  }, [user, syncMode, toast]);

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
    // Check if already completed today
    if (user.lastMorningRitual) {
      const lastRitual = new Date(user.lastMorningRitual);
      const today = new Date();
      const isSameDay = lastRitual.toDateString() === today.toDateString();

      if (isSameDay) {
        toast.warning('Je hebt je ochtendritueel al voltooid vandaag!');
        return { success: false, error: 'Already completed today' };
      }
    }

    // Calculate new streak
    const newStreak = user.streak + 1;
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
        toast.success(`🔥 Ochtendritueel voltooid! +${totalXP} XP!`);
      } else {
        toast.error(result.error || 'Er ging iets mis');
      }
    } else {
      setUser(prev => ({
        ...prev,
        xp: prev.xp + totalXP,
        streak: newStreak,
        morningRitualCompleted: true,
        lastMorningRitual: new Date().toISOString(),
      }));
      toast.success(`🔥 Ochtendritueel voltooid! +${totalXP} XP!`);
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
        toast.success(`🎯 Week ${weekNumber} voltooid! +${xpReward} XP!`);
      } else if (result.alreadyCompleted) {
        toast.warning('Deze missie heb je al voltooid!');
      } else {
        toast.error(result.error || 'Er ging iets mis bij het voltooien van de missie');
      }
    } else {
      setUser(prev => ({
        ...prev,
        xp: prev.xp + xpReward,
        completedMissions: [...prev.completedMissions, weekNumber],
        currentWeek: Math.max(prev.currentWeek, weekNumber + 1),
      }));
      toast.success(`🎯 Week ${weekNumber} voltooid! +${xpReward} XP!`);
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
    // Validate money amount
    const validation = validateMoney(amount);
    if (!validation.valid) {
      toast.error(validation.error);
      return { success: false, error: validation.error };
    }

    if (syncMode === 'cloud' && dbUser) {
      const result = await userService.updateUserMoney(dbUser.id, validation.value, user.earnedMoney);
      if (result.success) {
        setUser(prev => ({ ...prev, savedMoney: validation.value }));
        toast.success('Gespaard geld bijgewerkt!');
        return result;
      } else {
        toast.error(result.error || 'Kon geld niet bijwerken');
        return result;
      }
    } else {
      setUser(prev => ({ ...prev, savedMoney: validation.value }));
      toast.success('Gespaard geld bijgewerkt!');
      return { success: true };
    }
  };

  const updateEarnedMoney = async (amount) => {
    // Validate money amount
    const validation = validateMoney(amount);
    if (!validation.valid) {
      toast.error(validation.error);
      return { success: false, error: validation.error };
    }

    if (syncMode === 'cloud' && dbUser) {
      const result = await userService.updateUserMoney(dbUser.id, user.savedMoney, validation.value);
      if (result.success) {
        setUser(prev => ({ ...prev, earnedMoney: validation.value }));
        toast.success('Verdiend geld bijgewerkt!');
        return result;
      } else {
        toast.error(result.error || 'Kon geld niet bijwerken');
        return result;
      }
    } else {
      setUser(prev => ({ ...prev, earnedMoney: validation.value }));
      toast.success('Verdiend geld bijgewerkt!');
      return { success: true };
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
    // Validate name
    const validation = validateName(name);
    if (!validation.valid) {
      toast.error(validation.error);
      return { success: false, error: validation.error };
    }

    if (syncMode === 'cloud' && dbUser) {
      const result = await userService.updateUserName(dbUser.id, validation.value);
      if (result.success) {
        setUser(prev => ({ ...prev, name: validation.value }));
        toast.success('Naam bijgewerkt!');
        return result;
      } else {
        toast.error(result.error || 'Kon naam niet bijwerken');
        return result;
      }
    } else {
      setUser(prev => ({ ...prev, name: validation.value }));
      toast.success('Naam bijgewerkt!');
      return { success: true };
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

  // Mission Answers Functions

  // Load mission answers for a specific week
  const loadMissionAnswers = async (weekNumber) => {
    if (syncMode === 'cloud' && dbUser) {
      // Load from database
      const result = await answerService.getMissionAnswers(dbUser.id, weekNumber);
      if (result.success) {
        // Convert array to object: { [stepIndex]: answer }
        const answersObj = {};
        result.data.forEach(item => {
          answersObj[item.stepIndex] = item.answer;
        });
        setMissionAnswers(prev => ({
          ...prev,
          [weekNumber]: answersObj
        }));
        return { success: true, data: answersObj };
      }
      return result;
    } else {
      // Load from localStorage
      try {
        const stored = localStorage.getItem(`mission-answers-${weekNumber}`);
        if (stored) {
          const answersObj = JSON.parse(stored);
          setMissionAnswers(prev => ({
            ...prev,
            [weekNumber]: answersObj
          }));
          return { success: true, data: answersObj };
        }
        return { success: true, data: {} };
      } catch (error) {
        console.error('Error loading answers from localStorage:', error);
        return { success: false, error: error.message };
      }
    }
  };

  // Save a step answer
  const saveStepAnswer = async (weekNumber, stepIndex, answer) => {
    // Validate answer length
    if (answer && answer.length > 500) {
      toast.error('Antwoord mag maximaal 500 karakters zijn');
      return { success: false, error: 'Answer too long' };
    }

    if (syncMode === 'cloud' && dbUser) {
      // Save to database
      const result = await answerService.saveStepAnswer(dbUser.id, weekNumber, stepIndex, answer);
      if (result.success) {
        // Update local state
        setMissionAnswers(prev => ({
          ...prev,
          [weekNumber]: {
            ...(prev[weekNumber] || {}),
            [stepIndex]: answer
          }
        }));
      }
      return result;
    } else {
      // Save to localStorage
      try {
        const updatedAnswers = {
          ...(missionAnswers[weekNumber] || {}),
          [stepIndex]: answer
        };
        localStorage.setItem(`mission-answers-${weekNumber}`, JSON.stringify(updatedAnswers));
        setMissionAnswers(prev => ({
          ...prev,
          [weekNumber]: updatedAnswers
        }));
        return { success: true };
      } catch (error) {
        console.error('Error saving answer to localStorage:', error);
        toast.error('Kon antwoord niet opslaan');
        return { success: false, error: error.message };
      }
    }
  };

  // Admin save step answer (for editing other users' answers)
  const adminSaveStepAnswer = async (targetUserId, weekNumber, stepIndex, answer) => {
    // Validate answer length
    if (answer && answer.length > 500) {
      toast.error('Antwoord mag maximaal 500 karakters zijn');
      return { success: false, error: 'Answer too long' };
    }

    if (syncMode === 'cloud' && dbUser) {
      // Only allow in cloud mode
      const result = await answerService.adminSaveStepAnswer(targetUserId, weekNumber, stepIndex, answer);
      if (result.success) {
        toast.success('Antwoord succesvol opgeslagen');
      } else {
        toast.error(result.error || 'Kon antwoord niet opslaan');
      }
      return result;
    } else {
      toast.error('Admin editing alleen beschikbaar in cloud mode');
      return { success: false, error: 'Cloud mode required' };
    }
  };

  // Get a specific step answer
  const getStepAnswer = (weekNumber, stepIndex) => {
    return missionAnswers[weekNumber]?.[stepIndex] || '';
  };

  // Get mission progress (percentage of steps with answers)
  const getMissionProgress = (weekNumber, totalSteps) => {
    const answers = missionAnswers[weekNumber] || {};
    const answeredSteps = Object.keys(answers).filter(key => answers[key]?.trim().length > 0).length;
    const percentage = totalSteps > 0 ? Math.round((answeredSteps / totalSteps) * 100) : 0;
    return {
      answeredSteps,
      totalSteps,
      percentage
    };
  };

  // Load all answers for diary page
  const loadAllAnswers = async () => {
    if (syncMode === 'cloud' && dbUser) {
      const result = await answerService.getAnswersByWeek(dbUser.id);
      if (result.success) {
        // Convert to the format we use in state
        const formattedAnswers = {};
        Object.keys(result.data).forEach(weekNumber => {
          formattedAnswers[weekNumber] = {};
          result.data[weekNumber].forEach(item => {
            formattedAnswers[weekNumber][item.stepIndex] = item.answer;
          });
        });
        setMissionAnswers(formattedAnswers);
        return { success: true, data: formattedAnswers };
      }
      return result;
    } else {
      // Load all from localStorage
      try {
        const allAnswers = {};
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('mission-answers-')) {
            const weekNumber = parseInt(key.replace('mission-answers-', ''));
            const stored = localStorage.getItem(key);
            if (stored) {
              allAnswers[weekNumber] = JSON.parse(stored);
            }
          }
        }
        setMissionAnswers(allAnswers);
        return { success: true, data: allAnswers };
      } catch (error) {
        console.error('Error loading all answers from localStorage:', error);
        return { success: false, error: error.message };
      }
    }
  };

  // 🌞 ZOMER-CHALLENGE ACTIES (altijd lokaal, werkt zonder wifi)
  // ----------------------------------------------------------------------
  const toggleSummerStep = useCallback((challengeId, stepId) => {
    setSummerProgress((prev) => {
      const cur = prev[challengeId] || { steps: {}, notes: '', xpClaimed: false };
      const steps = { ...cur.steps, [stepId]: !cur.steps[stepId] };
      return { ...prev, [challengeId]: { ...cur, steps } };
    });
  }, []);

  const setSummerNotes = useCallback((challengeId, notes) => {
    setSummerProgress((prev) => {
      const cur = prev[challengeId] || { steps: {}, notes: '', xpClaimed: false };
      return { ...prev, [challengeId]: { ...cur, notes } };
    });
  }, []);

  const getSummerChallenge = useCallback(
    (challengeId) =>
      summerProgress[challengeId] || { steps: {}, notes: '', xpClaimed: false },
    [summerProgress]
  );

  // Tel het aantal afgevinkte stappen van een challenge.
  const countSummerSteps = useCallback(
    (challengeId, totalSteps) => {
      const steps = summerProgress[challengeId]?.steps || {};
      const done = Object.values(steps).filter(Boolean).length;
      return { done, total: totalSteps, pct: totalSteps ? Math.round((done / totalSteps) * 100) : 0 };
    },
    [summerProgress]
  );

  // Claim de XP voor een challenge (éénmalig). Alleen als alle verplichte
  // stappen gecheckt zijn. Werkt ook offline (XP gaat naar local user).
  const claimSummerXP = useCallback(
    async (challengeId, xp, totalSteps) => {
      const { done } = countSummerSteps(challengeId, totalSteps);
      if (done < totalSteps) {
        toast.warning(`Check eerst alle ${totalSteps} stappen aan!`);
        return { success: false, error: 'not-all-done' };
      }
      const already = summerProgress[challengeId]?.xpClaimed;
      if (already) {
        toast.warning('Die XP heb je al geclaimd! 🏆');
        return { success: false, error: 'already' };
      }
      setSummerProgress((prev) => ({
        ...prev,
        [challengeId]: { ...(prev[challengeId] || { steps: {}, notes: '' }), xpClaimed: true },
      }));
      await addXP(xp);
      toast.success(`🌞 Zomer-avontuur voltooid! +${xp} XP!`);
      return { success: true, xp };
    },
    [addXP, countSummerSteps, summerProgress, toast]
  );

  const resetSummerChallenge = useCallback((challengeId) => {
    setSummerProgress((prev) => {
      const next = { ...prev };
      delete next[challengeId];
      return next;
    });
  }, []);

  const value = {
    // User state
    user,
    dbUser,
    loading,
    isSignedIn: isAuthenticated,
    role,
    syncMode,
    offlineMode,

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

    // Mission Answers
    missionAnswers,
    loadMissionAnswers,
    saveStepAnswer,
    adminSaveStepAnswer,
    getStepAnswer,
    getMissionProgress,
    loadAllAnswers,

    // 🌞 Zomer-challenge
    summerProgress,
    toggleSummerStep,
    setSummerNotes,
    getSummerChallenge,
    countSummerSteps,
    claimSummerXP,
    resetSummerChallenge,
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
