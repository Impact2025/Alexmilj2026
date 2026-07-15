import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, PiggyBank, TrendingUp, Trash2, Save, AlertTriangle } from 'lucide-react';

function Settings() {
  const { user, updateUserName, updateSavedMoney, updateEarnedMoney, resetProgress } = useApp();
  
  const [name, setName] = useState(user.name);
  const [saved, setSaved] = useState(user.savedMoney.toString());
  const [earned, setEarned] = useState(user.earnedMoney.toString());
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const handleSave = () => {
    updateUserName(name);
    updateSavedMoney(parseFloat(saved) || 0);
    updateEarnedMoney(parseFloat(earned) || 0);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 animate-slide-up max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white mb-2">⚙️ Instellingen</h1>
        <p className="text-dark-400">Pas je profiel en voortgang aan</p>
      </div>

      {/* Profile Settings */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-amber-400" />
          Profiel
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-dark-400 mb-2 text-sm">Jouw naam</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="Hoe heet je?"
            />
          </div>
        </div>
      </div>

      {/* Money Tracking */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <PiggyBank className="w-5 h-5 text-emerald-400" />
          Geld Bijhouden
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-dark-400 mb-2 text-sm flex items-center gap-2">
              <PiggyBank className="w-4 h-4" />
              Totaal gespaard (€)
            </label>
            <input
              type="number"
              step="0.01"
              value={saved}
              onChange={(e) => setSaved(e.target.value)}
              className="input-field"
              placeholder="0.00"
            />
          </div>
          
          <div>
            <label className="block text-dark-400 mb-2 text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Totaal verdiend (€)
            </label>
            <input
              type="number"
              step="0.01"
              value={earned}
              onChange={(e) => setEarned(e.target.value)}
              className="input-field"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-white mb-4">📊 Jouw Statistieken</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-dark-800/50 rounded-xl">
            <div className="text-2xl font-bold text-amber-400">{user.xp.toLocaleString()}</div>
            <div className="text-dark-500 text-xs">Totale XP</div>
          </div>
          <div className="text-center p-4 bg-dark-800/50 rounded-xl">
            <div className="text-2xl font-bold text-orange-400">{user.streak}</div>
            <div className="text-dark-500 text-xs">Dagen Streak</div>
          </div>
          <div className="text-center p-4 bg-dark-800/50 rounded-xl">
            <div className="text-2xl font-bold text-blue-400">{user.completedMissions.length}</div>
            <div className="text-dark-500 text-xs">Missies Klaar</div>
          </div>
          <div className="text-center p-4 bg-dark-800/50 rounded-xl">
            <div className="text-2xl font-bold text-purple-400">Week {user.currentWeek}</div>
            <div className="text-dark-500 text-xs">Huidige Week</div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
          showSaveSuccess 
            ? 'bg-emerald-500 text-white' 
            : 'btn-primary'
        }`}
      >
        {showSaveSuccess ? (
          <>
            <span>✓</span>
            Opgeslagen!
          </>
        ) : (
          <>
            <Save className="w-5 h-5" />
            Wijzigingen Opslaan
          </>
        )}
      </button>

      {/* Danger Zone */}
      <div className="glass-card p-6 border border-red-500/20">
        <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Gevarenzone
        </h3>
        
        <p className="text-dark-400 mb-4">
          Let op: Deze actie kan niet ongedaan gemaakt worden!
        </p>
        
        <button
          onClick={resetProgress}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Reset alle voortgang
        </button>
      </div>

      {/* Version Info */}
      <div className="text-center text-dark-600 text-xs">
        <p>Ikigai · Vind je Kompas v1.0</p>
        <p>Gemaakt met ❤️ door Papa & Claude</p>
      </div>
    </div>
  );
}

export default Settings;
