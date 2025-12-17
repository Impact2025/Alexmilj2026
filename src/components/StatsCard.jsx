import React from 'react';

const colorClasses = {
  orange: {
    bg: 'from-orange-500/20 to-red-500/20',
    border: 'border-orange-500/20',
    icon: 'bg-orange-500/20 text-orange-400',
    value: 'text-orange-400',
  },
  amber: {
    bg: 'from-amber-500/20 to-yellow-500/20',
    border: 'border-amber-500/20',
    icon: 'bg-amber-500/20 text-amber-400',
    value: 'text-amber-400',
  },
  emerald: {
    bg: 'from-emerald-500/20 to-green-500/20',
    border: 'border-emerald-500/20',
    icon: 'bg-emerald-500/20 text-emerald-400',
    value: 'text-emerald-400',
  },
  blue: {
    bg: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-blue-500/20',
    icon: 'bg-blue-500/20 text-blue-400',
    value: 'text-blue-400',
  },
  purple: {
    bg: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-500/20',
    icon: 'bg-purple-500/20 text-purple-400',
    value: 'text-purple-400',
  },
};

function StatsCard({ icon: Icon, label, value, color = 'amber' }) {
  const colors = colorClasses[color] || colorClasses.amber;

  return (
    <div className={`glass-card p-4 bg-gradient-to-br ${colors.bg} border ${colors.border}`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.icon}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className={`text-2xl font-black ${colors.value}`}>{value}</div>
          <div className="text-dark-400 text-xs">{label}</div>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
