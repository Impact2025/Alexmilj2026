import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import MorningRitual from '../components/MorningRitual';
import VehicleCard from '../components/VehicleCard';
import StatsCard from '../components/StatsCard';
import MissionPreview from '../components/MissionPreview';
import SummerChallenges from '../components/SummerChallenges';
import { getMissionByWeek } from '../data/missions';
import { Flame, Zap, PiggyBank, TrendingUp, Sparkles, WifiOff } from 'lucide-react';

function Dashboard() {
  const {
    user,
    loading,
    currentVehicle,
    getGreeting,
    isMonday,
    offlineMode,
    syncMode
  } = useApp();

  // Show loading state while user data is being fetched
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="text-6xl mb-4">🏎️</div>
          <p className="text-dark-400">Laden...</p>
        </div>
      </div>
    );
  }

  const currentMission = getMissionByWeek(user.currentWeek);

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-amber-500/20">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="text-7xl md:text-8xl vehicle-bounce">
            {currentVehicle.emoji}
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
              Hey {user.name}! 👋
            </h2>
            <p className="text-dark-300 text-lg">
              {user.morningRitualCompleted 
                ? "Je ochtendritueel is klaar. Tijd om te rocken! 🎸"
                : "Start je dag met je ochtendritueel!"}
            </p>
            {isMonday() && (
              <div className="mt-3 inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" />
                Nieuwe missie beschikbaar!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Morning Ritual */}
          <MorningRitual />

          {/* Current Mission Preview */}
          {currentMission && (
            <MissionPreview mission={currentMission} />
          )}
        </div>

        {/* Right Column - Stats */}
        <div className="space-y-4">
          <StatsCard
            icon={Flame}
            label="Dagen Streak"
            value={user.streak}
            color="orange"
          />
          <StatsCard
            icon={Zap}
            label="Totale XP"
            value={user.xp.toLocaleString()}
            color="amber"
          />
          <StatsCard
            icon={PiggyBank}
            label="Gespaard"
            value={`€${user.savedMoney.toFixed(2)}`}
            color="emerald"
          />
          <StatsCard
            icon={TrendingUp}
            label="Verdiend"
            value={`€${user.earnedMoney.toFixed(2)}`}
            color="blue"
          />
          
          {/* Vehicle Progress Card */}
          <VehicleCard />
        </div>
      </div>

      {/* Offline / lokaal badge (handig in de auto zonder wifi) */}
      {(offlineMode || syncMode === 'local') && (
        <div className="mt-6 flex items-center gap-2 text-xs text-dark-400 bg-dark-800/40 border border-dark-700/60 rounded-xl px-4 py-3">
          <WifiOff className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>
            {offlineMode
              ? '🚗 Offline modus — je speelt lokaal. Alles staat veilig op dit toestel en sync later automatisch.'
              : '💾 Lokaal opgeslagen op dit toestel.'}
          </span>
        </div>
      )}

      {/* 🌞 Zomer-editie */}
      <div id="zomer" className="mt-6 scroll-mt-24">
        <SummerChallenges />
      </div>
    </div>
  );
}

export default Dashboard;
