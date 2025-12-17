import React, { useState } from 'react';
import { User, LogOut, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export default function AuthButton() {
  const { isSignedIn } = useApp();
  const { role, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Weet je zeker dat je wilt uitloggen?')) {
      logout();
      window.location.reload();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
          role === 'admin'
            ? 'bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20'
            : 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20'
        }`}
      >
        {role === 'admin' ? (
          <Shield size={16} className="text-amber-500" />
        ) : (
          <User size={16} className="text-blue-500" />
        )}
        <span className={`text-xs font-medium ${role === 'admin' ? 'text-amber-400' : 'text-blue-400'}`}>
          {role === 'admin' ? 'Admin' : 'User'}
        </span>
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 mt-2 w-48 glass-card p-2 z-20">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={16} />
              <span className="text-sm">Uitloggen</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
