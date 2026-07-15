import React, { useState } from 'react';
import { SUMMER_CHALLENGES } from '../data/summerChallenges';
import { IKIGAI } from '../data/missions';
import { Sun, Compass, Rocket, ChevronDown, ChevronUp } from 'lucide-react';

// ☀️ Zomer-editie: bonus-avonturen die los staan van de 52 weekmissies.
// Puur display + open/dicht; geen DB-persistentie (het is een extra track).
function SummerCard({ challenge, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="glass-card overflow-hidden border border-amber-500/25">
      <div
        className="p-4 cursor-pointer bg-gradient-to-br from-amber-500/10 to-orange-500/10"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-500/20 text-xl">
              {challenge.emoji}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-200">
                  {challenge.week}
                </span>
                <span className="text-xs text-dark-400">{challenge.dateRange}</span>
                {challenge.ikigai.map((k) => {
                  const p = IKIGAI[k];
                  if (!p) return null;
                  return (
                    <span key={k} className={`text-xs px-2 py-0.5 rounded-full ${p.badge}`} title={p.label}>
                      {p.emoji} {p.label}
                    </span>
                  );
                })}
              </div>
              <h3 className="font-bold mt-1 text-white">{challenge.title}</h3>
            </div>
          </div>
          {open ? <ChevronUp className="w-4 h-4 text-dark-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-dark-400 flex-shrink-0" />}
        </div>
      </div>

      {open && (
        <div className="px-4 pb-4 border-t border-dark-700/50 pt-4 space-y-4">
          <p className="text-dark-300 text-sm">{challenge.intro}</p>

          {/* Basis */}
          <div className="flex items-start gap-2">
            <span className="text-xs font-bold text-emerald-300 whitespace-nowrap mt-0.5">Basis</span>
            <p className="text-dark-200 text-sm">{challenge.basis}</p>
          </div>

          {/* Meester-uitdaging */}
          <div className="rounded-xl p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30">
            <div className="flex items-center gap-2 mb-1.5">
              <Compass className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="text-sm font-bold text-amber-300">Meester-uitdaging</span>
              <span className="text-[10px] uppercase tracking-wide text-amber-400/70 border border-amber-400/30 rounded px-1.5 py-0.5">extra pittig</span>
            </div>
            <p className="text-dark-200 text-sm">{challenge.masterChallenge}</p>
          </div>

          {/* Boost */}
          <div className="rounded-xl p-4 bg-dark-800/50 border border-dark-700">
            <div className="flex items-center gap-2 mb-1.5">
              <Rocket className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span className="text-sm font-bold text-orange-300">Boost</span>
              <span className="text-xs font-bold text-amber-400">+{challenge.boostXp} XP</span>
            </div>
            <p className="text-dark-200 text-sm">{challenge.boost}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SummerChallenges() {
  return (
    <div className="glass-card p-4 md:p-5 border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent">
      <div className="flex items-center gap-2 mb-1">
        <Sun className="w-5 h-5 text-amber-400" />
        <h2 className="text-lg md:text-xl font-black text-white">Zomer-editie</h2>
        <span className="text-[10px] uppercase tracking-wide text-amber-300 border border-amber-400/30 rounded px-1.5 py-0.5">bonus</span>
      </div>
      <p className="text-dark-400 text-sm mb-4">
        4 extra zomeravonturen naast je weekmissies — groter, zelfsturend en over een hele week. Tellen niet mee in je 0/52, maar geven wél XP-boosts.
      </p>
      <div className="space-y-3">
        {SUMMER_CHALLENGES.map((c, i) => (
          <SummerCard key={c.id} challenge={c} defaultOpen={i === 0} />
        ))}
      </div>
    </div>
  );
}
