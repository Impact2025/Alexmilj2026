import React from 'react';
import { useApp } from '../context/AppContext';
import { VEHICLES } from '../data/vehicles';
import { CheckCircle, Lock, Zap } from 'lucide-react';

function Journey() {
  const { user, currentVehicle, nextVehicle, progressToNext } = useApp();
  
  const totalProgress = (user.xp / 100000) * 100;

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
          🛣️ Jouw Reis naar de Lamborghini
        </h1>
        <p className="text-dark-400">
          Van skateboard naar supercar. Elke XP brengt je dichterbij!
        </p>
      </div>

      {/* Current Vehicle Display */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 to-transparent rounded-3xl blur-xl" />
        <div className="relative glass-card p-8 border border-amber-500/20">
          <div className="text-center">
            <div className="text-[120px] mb-4 vehicle-bounce">
              {currentVehicle.emoji}
            </div>
            <h2 className="text-3xl font-black text-amber-400 mb-1">
              {currentVehicle.name}
            </h2>
            <p className="text-dark-400">{currentVehicle.description}</p>
          </div>

          {/* Progress to Next Vehicle */}
          {nextVehicle && (
            <div className="mt-8 max-w-md mx-auto">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-dark-400">
                  Volgende: {nextVehicle.emoji} {nextVehicle.name}
                </span>
                <span className="text-amber-400 font-bold">
                  {user.xp.toLocaleString()} / {nextVehicle.xpRequired.toLocaleString()} XP
                </span>
              </div>
              <div className="h-4 bg-dark-700 rounded-full overflow-hidden">
                <div 
                  className="progress-bar"
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
              <div className="text-center mt-2 text-dark-500 text-sm">
                Nog {(nextVehicle.xpRequired - user.xp).toLocaleString()} XP te gaan
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {VEHICLES.map(vehicle => {
          const isUnlocked = user.xp >= vehicle.xpRequired;
          const isCurrent = vehicle.id === currentVehicle.id;

          return (
            <div
              key={vehicle.id}
              className={`relative p-6 rounded-2xl text-center transition-all ${
                isUnlocked
                  ? 'glass-card border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-orange-500/10'
                  : 'glass-card opacity-50'
              } ${isCurrent ? 'ring-2 ring-amber-500 scale-105' : ''}`}
            >
              {/* Status Badge */}
              {isUnlocked && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
              {!isUnlocked && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-dark-700 rounded-full flex items-center justify-center">
                  <Lock className="w-3 h-3 text-dark-500" />
                </div>
              )}

              {/* Vehicle */}
              <div className={`text-5xl mb-3 ${isUnlocked ? '' : 'grayscale'}`}>
                {vehicle.emoji}
              </div>
              <div className={`font-bold ${isUnlocked ? 'text-white' : 'text-dark-500'}`}>
                {vehicle.name}
              </div>
              <div className="text-xs text-dark-500 mt-1 flex items-center justify-center gap-1">
                <Zap className="w-3 h-3" />
                {vehicle.xpRequired.toLocaleString()} XP
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Progress to Lamborghini */}
      <div className="glass-card p-6 border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🏎️</span>
            <div>
              <h3 className="text-white font-bold">Voortgang naar Lamborghini</h3>
              <p className="text-dark-400 text-sm">Het ultieme doel</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-amber-400">
              {totalProgress.toFixed(2)}%
            </div>
          </div>
        </div>
        
        <div className="h-4 bg-dark-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full transition-all duration-1000"
            style={{ width: `${Math.min(100, totalProgress)}%` }}
          />
        </div>
        
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-dark-500">{user.xp.toLocaleString()} XP</span>
          <span className="text-dark-500">100.000 XP</span>
        </div>
      </div>

      {/* Journey Timeline */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-white mb-6">📍 Je Reis Tot Nu Toe</h3>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-dark-700" />
          
          {/* Timeline Items */}
          <div className="space-y-6">
            {VEHICLES.map((vehicle, index) => {
              const isUnlocked = user.xp >= vehicle.xpRequired;
              const isCurrent = vehicle.id === currentVehicle.id;
              
              return (
                <div key={vehicle.id} className="relative flex items-center gap-4 pl-2">
                  {/* Dot */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-2xl z-10 transition-all ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/30'
                      : 'bg-dark-700'
                  } ${isCurrent ? 'ring-4 ring-amber-500/50 scale-110' : ''}`}>
                    {vehicle.emoji}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className={`font-bold ${isUnlocked ? 'text-white' : 'text-dark-500'}`}>
                      {vehicle.name}
                    </div>
                    <div className="text-xs text-dark-500">
                      {vehicle.xpRequired.toLocaleString()} XP - {vehicle.description}
                    </div>
                  </div>
                  
                  {/* Status */}
                  {isUnlocked ? (
                    <div className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-xs">Unlocked!</span>
                    </div>
                  ) : (
                    <div className="text-dark-500 text-xs">
                      Nog {(vehicle.xpRequired - user.xp).toLocaleString()} XP
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Journey;
