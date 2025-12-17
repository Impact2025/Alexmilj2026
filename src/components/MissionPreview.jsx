import React from 'react';
import { Link } from 'react-router-dom';
import { getCategoryColor } from '../data/missions';
import { Target, ChevronRight, Zap } from 'lucide-react';

function MissionPreview({ mission }) {
  const colors = getCategoryColor(mission.category);

  return (
    <div className={`glass-card p-6 bg-gradient-to-br ${colors.bg} border ${colors.border}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-dark-800/50 rounded-xl flex items-center justify-center">
            <Target className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Huidige Missie</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${colors.badge}`}>
              Week {mission.week}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-amber-400">
          <Zap className="w-4 h-4" />
          <span className="font-bold">+{mission.xpReward} XP</span>
        </div>
      </div>

      <h4 className="text-xl font-bold text-white mb-2">{mission.title}</h4>
      <p className="text-dark-400 mb-4">{mission.description}</p>

      {/* Steps Preview */}
      <div className="space-y-2 mb-4">
        {mission.steps.slice(0, 2).map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-dark-700 flex items-center justify-center text-xs text-dark-400 flex-shrink-0">
              {i + 1}
            </div>
            <span className="text-dark-300 text-sm">{step}</span>
          </div>
        ))}
        {mission.steps.length > 2 && (
          <div className="text-dark-500 text-sm pl-9">
            +{mission.steps.length - 2} meer stappen...
          </div>
        )}
      </div>

      <Link
        to="/missies"
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold bg-dark-800/50 text-white hover:bg-dark-700/50 transition-colors"
      >
        Bekijk alle details
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default MissionPreview;
