import React, { useState } from 'react';
import { SUMMER_CHALLENGES, getSummerStepCount } from '../data/summerChallenges';
import { IKIGAI } from '../data/missions';
import { useApp } from '../context/AppContext';
import { Sun, Compass, Rocket, ChevronDown, ChevronUp, Check, PartyPopper, RotateCcw } from 'lucide-react';

// ☀️ Zomer-editie: bonus-avonturen die los staan van de 52 weekmissies.
// Nu VOLLEDIG INTERACTIEF: kinderen vinken stappen aan, schrijven notities,
// zien hun voortgang en claimen XP (ook zonder wifi — alles lokaal).
function SummerCard({ challenge }) {
  const [open, setOpen] = useState(true);
  const [justClaimed, setJustClaimed] = useState(false);
  const {
    getSummerChallenge,
    toggleSummerStep,
    setSummerNotes,
    countSummerSteps,
    claimSummerXP,
    resetSummerChallenge,
  } = useApp();

  const progress = getSummerChallenge(challenge.id);
  const total = getSummerStepCount(challenge);
  const { done, pct } = countSummerSteps(challenge.id, total);
  const allDone = done >= total;
  const claimed = progress.xpClaimed;

  const handleClaim = async () => {
    const res = await claimSummerXP(challenge.id, challenge.xpReward, total);
    if (res?.success) {
      setJustClaimed(true);
      setTimeout(() => setJustClaimed(false), 1800);
    }
  };

  return (
    <div
      className={`glass-card overflow-hidden border transition-all ${
        allDone ? 'border-emerald-500/40' : 'border-amber-500/25'
      }`}
    >
      {/* Header */}
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
          <div className="flex items-center gap-2 flex-shrink-0">
            {claimed && (
              <span className="text-[10px] uppercase tracking-wide text-emerald-300 border border-emerald-400/30 rounded px-1.5 py-0.5">
                +{challenge.xpReward} XP 🏆
              </span>
            )}
            {open ? (
              <ChevronUp className="w-4 h-4 text-dark-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-dark-400" />
            )}
          </div>
        </div>

        {/* Voortgangsbar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-dark-400 mb-1">
            <span>{allDone ? 'Klaar! 🎉' : `${done}/${total} stappen`}</span>
            <span>{pct}%</span>
          </div>
          <div className="h-2 rounded-full bg-dark-800 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${pct}%`,
                background: 'linear-gradient(90deg,#f59e0b,#f97316,#34d399)',
              }}
            />
          </div>
        </div>
      </div>

      {open && (
        <div className="px-4 pb-4 border-t border-dark-700/50 pt-4 space-y-4">
          <p className="text-dark-300 text-sm">{challenge.intro}</p>

          {/* Checkbare stappen */}
          <div className="space-y-2">
            {challenge.steps.map((step, i) => {
              const checked = !!progress.steps?.[i];
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggleSummerStep(challenge.id, i)}
                  className={`w-full flex items-start gap-3 text-left p-3 rounded-xl border transition-colors ${
                    checked
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-dark-800/40 border-dark-700 hover:border-amber-500/30'
                  }`}
                >
                  <span
                    className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
                      checked ? 'bg-emerald-500 text-white' : 'bg-dark-700 text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span className={`text-sm ${checked ? 'text-emerald-200 line-through/70' : 'text-dark-200'}`}>
                    {step}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Notities */}
          <div>
            <label className="block text-xs font-bold text-dark-400 mb-1.5">
              ✍️ Mijn notities / ideeën
            </label>
            <textarea
              value={progress.notes || ''}
              onChange={(e) => setSummerNotes(challenge.id, e.target.value)}
              placeholder="Schrijf hier je idee, wat je leerde, of je plan..."
              rows={3}
              maxLength={500}
              className="input-field resize-none text-sm"
            />
          </div>

          {/* Meester-uitdaging */}
          <div className="rounded-xl p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30">
            <div className="flex items-center gap-2 mb-1.5">
              <Compass className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="text-sm font-bold text-amber-300">Meester-uitdaging</span>
              <span className="text-[10px] uppercase tracking-wide text-amber-400/70 border border-amber-400/30 rounded px-1.5 py-0.5">
                extra pittig
              </span>
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

          {/* Acties */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleClaim}
              disabled={!allDone || claimed}
              className={`btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed ${
                justClaimed ? 'xp-pop' : ''
              }`}
            >
              {claimed ? (
                <>
                  <PartyPopper className="w-4 h-4 inline mr-1" /> Geclaimd!
                </>
              ) : allDone ? (
                `🏆 Claim +${challenge.xpReward} XP`
              ) : (
                `Nog ${total - done} stap${total - done === 1 ? '' : 'pen'} te gaan`
              )}
            </button>
            <button
              type="button"
              onClick={() => resetSummerChallenge(challenge.id)}
              title="Opnieuw beginnen"
              className="p-3 rounded-xl bg-dark-800/60 border border-dark-700 hover:bg-dark-700/60 transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-dark-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SummerChallenges() {
  const { countSummerSteps } = useApp();
  const totalChallenges = SUMMER_CHALLENGES.length;
  const totalStepsAll = SUMMER_CHALLENGES.reduce(
    (acc, c) => acc + getSummerStepCount(c),
    0
  );
  const doneAll = SUMMER_CHALLENGES.reduce(
    (acc, c) => acc + countSummerSteps(c.id, getSummerStepCount(c)).done,
    0
  );

  return (
    <div className="glass-card p-4 md:p-5 border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent">
      <div className="flex items-center gap-2 mb-1">
        <Sun className="w-5 h-5 text-amber-400" />
        <h2 className="text-lg md:text-xl font-black text-white">Zomer-editie</h2>
        <span className="text-[10px] uppercase tracking-wide text-amber-300 border border-amber-400/30 rounded px-1.5 py-0.5">
          bonus
        </span>
      </div>
      <p className="text-dark-400 text-sm mb-3">
        {doneAll}/{totalStepsAll} stappen gedaan over {totalChallenges} zomeravonturen. Vink aan wat
        je hebt gedaan en claim je XP — ook zónder wifi! 🚗
      </p>
      <div className="space-y-3">
        {SUMMER_CHALLENGES.map((c) => (
          <SummerCard key={c.id} challenge={c} />
        ))}
      </div>
    </div>
  );
}
