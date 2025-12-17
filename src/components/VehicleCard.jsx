import React from 'react';
import { useApp } from '../context/AppContext';
import { VEHICLES } from '../data/vehicles';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function VehicleCard() {
  const { user, currentVehicle, nextVehicle, progressToNext } = useApp();

  return (
    <div className="glass-card p-4 border border-amber-500/20">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-dark-400">Huidige Voertuig</h3>
        <Link 
          to="/reis" 
          className="text-amber-400 text-xs hover:text-amber-300 flex items-center gap-1"
        >
          Bekijk reis <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Current Vehicle */}
      <div className="text-center mb-4">
        <div className="text-5xl mb-2 vehicle-bounce">{currentVehicle.emoji}</div>
        <div className="text-white font-bold">{currentVehicle.name}</div>
        <div className="text-dark-500 text-xs">{currentVehicle.description}</div>
      </div>

      {/* Progress to Next */}
      {nextVehicle && (
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-dark-400">
              Volgende: {nextVehicle.emoji} {nextVehicle.name}
            </span>
            <span className="text-amber-400 font-medium">
              {Math.round(progressToNext)}%
            </span>
          </div>
          <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
            <div 
              className="progress-bar"
              style={{ width: `${progressToNext}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-dark-500 mt-1">
            <span>{user.xp.toLocaleString()} XP</span>
            <span>{nextVehicle.xpRequired.toLocaleString()} XP</span>
          </div>
        </div>
      )}

      {/* Vehicle Journey Preview */}
      <div className="flex justify-center gap-1 mt-4 pt-4 border-t border-dark-700">
        {VEHICLES.map((vehicle) => {
          const isUnlocked = user.xp >= vehicle.xpRequired;
          const isCurrent = vehicle.id === currentVehicle.id;
          
          return (
            <div
              key={vehicle.id}
              className={`text-lg transition-all ${
                isCurrent ? 'scale-125' : ''
              } ${!isUnlocked ? 'grayscale opacity-30' : ''}`}
              title={vehicle.name}
            >
              {vehicle.emoji}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VehicleCard;
