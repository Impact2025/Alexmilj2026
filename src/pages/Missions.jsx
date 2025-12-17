import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MISSIONS, getCategoryColor } from '../data/missions';
import { Target, Zap, CheckCircle, Lock, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

function MissionCard({ mission, isActive, isCompleted, isLocked, onComplete }) {
  const [expanded, setExpanded] = useState(isActive);
  const colors = getCategoryColor(mission.category);

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

          {/* Steps */}
          <div className="space-y-3 mb-4">
            {mission.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                  isCompleted ? 'bg-emerald-500 text-white' : 'bg-dark-700 text-dark-400'
                }`}>
                  {isCompleted ? '✓' : i + 1}
                </div>
                <span className="text-dark-300 text-sm">{step}</span>
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
