import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sunrise, CheckCircle, Rocket, Quote } from 'lucide-react';

function MorningRitual() {
  const { user, todayQuote, completeMorningRitual } = useApp();
  const [focus, setFocus] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleComplete = () => {
    if (focus.trim()) {
      setShowSuccess(true);
      setTimeout(() => {
        completeMorningRitual(focus);
      }, 1500);
    }
  };

  // Already completed state
  if (user.morningRitualCompleted && !showSuccess) {
    return (
      <div className="glass-card p-6 border-l-4 border-l-emerald-500">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-emerald-400 font-bold text-lg">Ochtendritueel voltooid!</div>
            <div className="text-dark-400">Je bent klaar voor vandaag 💪</div>
          </div>
        </div>
      </div>
    );
  }

  // Success animation state
  if (showSuccess) {
    return (
      <div className="glass-card p-8 text-center border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-green-500/20">
        <div className="text-6xl mb-4 animate-bounce">🚀</div>
        <div className="text-2xl font-bold text-emerald-400">Top! Je dag kan beginnen!</div>
        <div className="text-dark-400 mt-2">+25 XP verdiend</div>
      </div>
    );
  }

  // Default ritual state
  return (
    <div className="glass-card p-6 border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
          <Sunrise className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Ochtendritueel</h3>
          <span className="text-xs bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded-full">
            2-3 min
          </span>
        </div>
      </div>

      {/* Quote Card */}
      <div className="bg-dark-800/50 rounded-xl p-4 mb-6 border-l-4 border-amber-500">
        <div className="flex gap-3">
          <Quote className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
          <div>
            <p className="text-dark-200 italic mb-2">"{todayQuote.quote}"</p>
            <p className="text-amber-400 text-sm font-medium">— {todayQuote.author}</p>
          </div>
        </div>
      </div>

      {/* Focus Input */}
      <div className="mb-6">
        <label className="block text-dark-300 mb-2 font-medium">
          Waar werk ik vandaag aan? 🎯
        </label>
        <input
          type="text"
          value={focus}
          onChange={(e) => setFocus(e.target.value)}
          placeholder="Bijv: Mijn vision board afmaken..."
          className="input-field"
          onKeyPress={(e) => e.key === 'Enter' && handleComplete()}
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleComplete}
        disabled={!focus.trim()}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform flex items-center justify-center gap-2 ${
          focus.trim()
            ? 'btn-primary'
            : 'bg-dark-700 text-dark-500 cursor-not-allowed'
        }`}
      >
        {focus.trim() ? (
          <>
            <Rocket className="w-5 h-5" />
            Let's Go!
          </>
        ) : (
          'Vul eerst je focus in...'
        )}
      </button>
    </div>
  );
}

export default MorningRitual;
