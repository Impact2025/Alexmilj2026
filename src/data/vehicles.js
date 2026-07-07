// Vehicle progression system — tuned so the Lamborghini is reachable in ~1 year
// of weekly play (52 missions avg ~150 XP + 52 rituals * 25 XP + 52 videos * 75 XP
// ≈ 13k XP). Curve peaks at 8000 XP, not 100000.
export const VEHICLES = [
  { 
    id: 1, 
    name: 'Skateboard', 
    emoji: '🛹', 
    xpRequired: 0,
    description: 'Iedereen begint ergens!',
    color: 'from-gray-500 to-gray-600'
  },
  { 
    id: 2, 
    name: 'BMX', 
    emoji: '🚲', 
    xpRequired: 300,
    description: 'Je komt vooruit!',
    color: 'from-blue-500 to-blue-600'
  },
  { 
    id: 3, 
    name: 'Scooter', 
    emoji: '🛵', 
    xpRequired: 800,
    description: 'Je gaat harder!',
    color: 'from-green-500 to-green-600'
  },
  { 
    id: 4, 
    name: 'E-step', 
    emoji: '🛴', 
    xpRequired: 1600,
    description: 'Slim en snel onderweg',
    color: 'from-cyan-500 to-cyan-600'
  },
  { 
    id: 5, 
    name: 'Tesla', 
    emoji: '🚗', 
    xpRequired: 3000,
    description: 'Slim en elektrisch',
    color: 'from-red-500 to-red-600'
  },
  { 
    id: 6, 
    name: 'Porsche', 
    emoji: '🏎️', 
    xpRequired: 5000,
    description: 'Bijna daar...',
    color: 'from-yellow-500 to-yellow-600'
  },
  { 
    id: 7, 
    name: 'Lamborghini', 
    emoji: '🏎️', 
    xpRequired: 8000,
    description: 'JE HEBT HET GEHAALD!',
    color: 'from-amber-500 to-orange-500'
  },
];

// Get current vehicle based on XP
export const getCurrentVehicle = (xp) => {
  return [...VEHICLES].reverse().find(v => xp >= v.xpRequired) || VEHICLES[0];
};

// Get next vehicle
export const getNextVehicle = (xp) => {
  return VEHICLES.find(v => xp < v.xpRequired);
};

// Calculate progress to next vehicle
export const getProgressToNext = (xp) => {
  const current = getCurrentVehicle(xp);
  const next = getNextVehicle(xp);
  
  if (!next) return 100; // Already at max
  
  const progressInLevel = xp - current.xpRequired;
  const levelSize = next.xpRequired - current.xpRequired;
  
  return Math.min(100, (progressInLevel / levelSize) * 100);
};
