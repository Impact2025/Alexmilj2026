import React from 'react';
import { User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AuthButton() {
  const { isSignedIn } = useApp();

  // Show local mode indicator (Clerk not configured)
  if (!isSignedIn) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-800/50 border border-dark-700">
          <User size={16} className="text-amber-500" />
          <span className="text-xs font-medium text-dark-300">Local Mode</span>
        </div>
      </div>
    );
  }

  // If signed in (when Clerk is configured), show user info
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30">
        <User size={16} className="text-amber-500" />
        <span className="text-xs font-medium text-amber-400">Signed In</span>
      </div>
    </div>
  );
}
