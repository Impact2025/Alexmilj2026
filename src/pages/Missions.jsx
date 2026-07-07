import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { MISSIONS, getCategoryColor } from '../data/missions';
import { Target, Zap, CheckCircle, Lock, Lightbulb, ChevronDown, ChevronUp, Save, Check } from 'lucide-react';

// StepInput Component with autosave and character limit
function StepInput({ weekNumber, stepIndex, stepText, isCompleted }) {
  const { getStepAnswer, saveStepAnswer } = useApp();
  const [value, setValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const saveTimeoutRef = useRef(null);
  const MAX_CHARS = 500;

  // Load initial value
  useEffect(() => {
    const initialValue = getStepAnswer(weekNumber, stepIndex);
    setValue(initialValue);
  }, [weekNumber, stepIndex]);

  // Autosave with debouncing
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Don't save empty values on initial load
    if (value === getStepAnswer(weekNumber, stepIndex)) {
      return;
    }

    setSaving(true);
    setSaved(false);

    saveTimeoutRef.current = setTimeout(async () => {
      await saveStepAnswer(weekNumber, stepIndex, value);
      setSaving(false);
      setSaved(true);

      // Hide "saved" indicator after 2 seconds
      setTimeout(() => setSaved(false), 2000);
    }, 1000); // Debounce: 1 second

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= MAX_CHARS) {
      setValue(newValue);
    }
  };

  const charCount = value.length;
  const isNearLimit = charCount > MAX_CHARS * 0.8;
  const isAtLimit = charCount >= MAX_CHARS;

  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={handleChange}
        placeholder="Schrijf hier jouw antwoord..."
        className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-200 placeholder-dark-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none"
        rows={3}
      />

      {/* Status and character count */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {saving && (
            <span className="text-amber-400 flex items-center gap-1">
              <Save className="w-3 h-3 animate-pulse" />
              Opslaan...
            </span>
          )}
          {saved && !saving && (
            <span className="text-emerald-400 flex items-center gap-1">
              <Check className="w-3 h-3" />
              Opgeslagen ✓
            </span>
          )}
        </div>

        <span className={`${
          isAtLimit ? 'text-red-400 font-bold' :
          isNearLimit ? 'text-amber-400' :
          'text-dark-500'
        }`}>
          {charCount}/{MAX_CHARS}
        </span>
      </div>
    </div>
  );
}

function MissionCard({ mission, isActive, isCompleted, isLocked, onComplete }) {
  const { loadMissionAnswers, getMissionProgress } = useApp();
  const [expanded, setExpanded] = useState(isActive);
  const [progress, setProgress] = useState(null);
  const colors = getCategoryColor(mission.category);

  // Load answers when card is expanded
  useEffect(() => {
    if (expanded && !isLocked) {
      loadMissionAnswers(mission.week).then(() => {
        const progressData = getMissionProgress(mission.week, mission.steps.length);
        setProgress(progressData);
      });
    }
  }, [expanded, mission.week, isLocked]);

  // Update progress when answers change
  useEffect(() => {
    if (expanded && !isLocked) {
      const progressData = getMissionProgress(mission.week, mission.steps.length);
      setProgress(progressData);
    }
  }, [expanded, mission.week, isLocked]);

  return (
    <div 
      className={`glass-card overflow-hidden transition-all ${
        isLocked ? 'opacity-50' : ''
      } ${isCompleted ? 'border-l-4 border-l-emerald-500' : `border ${colors.border}`} ${
        isActive ? `bg-gradient-to-br ${colors.bg}` : ''
      }`}
    >
      {/* Header */}
      <div 
        className="p-4 cursor-pointer"
        onClick={() => !isLocked && setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {isCompleted ? (
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            ) : isLocked ? (
              <div className="w-10 h-10 bg-dark-700 rounded-xl flex items-center justify-center">
                <Lock className="w-5 h-5 text-dark-500" />
              </div>
            ) : (
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isActive ? 'bg-amber-500/20' : 'bg-dark-700'
              }`}>
                <Target className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-dark-400'}`} />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${colors.badge}`}>
                  Week {mission.week}
                </span>
                {isActive && (
                  <span className="text-xs bg-amber-500/30 text-amber-300 px-2 py-0.5 rounded-full">
                    Actief
                  </span>
                )}
              </div>
              <h3 className={`font-bold mt-1 ${isLocked ? 'text-dark-500' : 'text-white'}`}>
                {mission.title}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 ${isLocked ? 'text-dark-500' : 'text-amber-400'}`}>
              <Zap className="w-4 h-4" />
              <span className="font-bold text-sm">+{mission.xpReward}</span>
            </div>
            {!isLocked && (
              expanded ? <ChevronUp className="w-4 h-4 text-dark-400" /> : <ChevronDown className="w-4 h-4 text-dark-400" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && !isLocked && (
        <div className="px-4 pb-4 border-t border-dark-700/50 pt-4">
          <p className="text-dark-400 mb-4">{mission.description}</p>

          {/* Progress indicator */}
          {progress && progress.answeredSteps > 0 && (
            <div className="mb-4 p-3 bg-dark-800/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-dark-400">Voortgang antwoorden</span>
                <span className="text-xs font-bold text-amber-400">{progress.percentage}% ingevuld</span>
              </div>
              <div className="w-full h-1.5 bg-dark-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Completed mission editable notice */}
          {isCompleted && (
            <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Missie voltooid - je kunt je antwoorden nog steeds aanpassen</span>
              </div>
            </div>
          )}

          {/* Steps with Answer Inputs */}
          <div className="space-y-4 mb-4">
            {mission.steps.map((step, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                    isCompleted ? 'bg-emerald-500 text-white' : 'bg-dark-700 text-dark-400'
                  }`}>
                    {isCompleted ? '✓' : i + 1}
                  </div>
                  <span className="text-dark-300 text-sm">{step}</span>
                </div>
                <div className="ml-9">
                  <StepInput
                    weekNumber={mission.week}
                    stepIndex={i}
                    stepText={step}
                    isCompleted={isCompleted}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tips */}
          {mission.tips && (
            <div className="flex items-start gap-2 bg-dark-800/50 rounded-xl p-3 mb-4">
              <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-dark-400 text-sm">{mission.tips}</p>
            </div>
          )}

          {/* Skill Badge */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-dark-500">
              Skill: <span className="text-dark-300">{mission.skill}</span>
            </span>
            
            {isActive && !isCompleted && (
              <button
                onClick={() => onComplete(mission.week, mission.xpReward)}
                className="btn-primary text-sm py-2"
              >
                ✓ Missie Voltooid
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Missions() {
  const { user, completeMission, isMissionCompleted } = useApp();
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'Alles' },
    { id: 'mindset', label: '🧠 Mindset' },
    { id: 'geld', label: '💰 Geld' },
    { id: 'skills', label: '🛠 Skills' },
    { id: 'actie', label: '🚀 Actie' },
  ];

  const filteredMissions = filter === 'all' 
    ? MISSIONS 
    : MISSIONS.filter(m => m.category === filter);

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white mb-2">🎯 Wekelijkse Missies</h1>
        <p className="text-dark-400">52 weken, 52 uitdagingen. Elke week dichter bij je doel!</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
              filter === cat.id
                ? 'bg-amber-500 text-white'
                : 'bg-dark-800 text-dark-400 hover:bg-dark-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Progress Overview */}
      <div className="glass-card p-4 flex items-center justify-between">
        <div>
          <div className="text-dark-400 text-sm">Missies Voltooid</div>
          <div className="text-2xl font-bold text-white">
            {user.completedMissions.length} / {MISSIONS.length}
          </div>
        </div>
        <div className="w-32 h-2 bg-dark-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
            style={{ width: `${(user.completedMissions.length / MISSIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Mission List */}
      <div className="space-y-4">
        {filteredMissions.map(mission => (
          <MissionCard
            key={mission.week}
            mission={mission}
            isActive={mission.week === user.currentWeek}
            isCompleted={isMissionCompleted(mission.week)}
            isLocked={mission.week > user.currentWeek}
            onComplete={completeMission}
          />
        ))}
      </div>
    </div>
  );
}

export default Missions;
