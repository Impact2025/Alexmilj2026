import React from 'react';
import { Cloud, CloudOff, HardDrive } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SyncIndicator() {
  const { syncMode, isSignedIn } = useApp();

  if (!syncMode) return null;

  const config = {
    cloud: {
      icon: Cloud,
      text: 'Cloud Sync',
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    local: {
      icon: HardDrive,
      text: 'Lokaal',
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
    },
    offline: {
      icon: CloudOff,
      text: 'Offline',
      color: 'text-red-500',
      bg: 'bg-red-500/10',
    },
  };

  const mode = syncMode === 'cloud' && isSignedIn ? 'cloud' : 'local';
  const { icon: Icon, text, color, bg } = config[mode];

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${bg} border border-dark-700`}>
      <Icon size={14} className={color} />
      <span className={`text-xs font-medium ${color}`}>{text}</span>
    </div>
  );
}
