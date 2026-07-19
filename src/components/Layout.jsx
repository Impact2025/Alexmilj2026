import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Home, Target, Map, Video, Settings, Flame, Zap, Shield, BookOpen } from 'lucide-react';
import AuthButton from './AuthButton';
import SyncIndicator from './SyncIndicator';
import InstallHint from './InstallHint';

// Animated background blobs
const AnimatedBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div className="blob top-0 left-1/4 w-96 h-96 bg-amber-500/10" />
    <div className="blob bottom-0 right-1/4 w-80 h-80 bg-blue-500/10" style={{ animationDelay: '1s' }} />
    <div className="blob top-1/2 left-1/2 w-64 h-64 bg-emerald-500/5" style={{ animationDelay: '2s' }} />
  </div>
);

function Layout() {
  const { user, loading, getGreeting, getDayName } = useApp();
  const { isAdmin } = useAuth();

  // Wacht tot de user-data geladen is voordat we een pagina renderen.
  // Zonder deze guard crasht b.v. /missies bij een refresh (user === null).
  if (loading || !user) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10 text-center">
          <div className="text-6xl mb-4 vehicle-bounce">🧭</div>
          <p className="text-dark-400">Laden...</p>
        </div>
      </div>
    );
  }

  // Navigation items (conditionally add Admin for admins)
  const navItems = [
    { to: '/', label: 'Dashboard', icon: Home },
    { to: '/missies', label: 'Missies', icon: Target },
    { to: '/dagboek', label: 'Dagboek', icon: BookOpen },
    { to: '/reis', label: 'De Reis', icon: Map },
    { to: '/zondag', label: 'Zondag', icon: Video },
    ...(isAdmin() ? [{ to: '/admin', label: 'Admin', icon: Shield }] : []),
  ];

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <AnimatedBackground />
      
      {/* Header */}
      <header className="relative z-10 px-4 md:px-6 py-4 border-b border-dark-800/50 backdrop-blur-xl bg-dark-950/80 sticky top-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo & Greeting */}
          <div>
            <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              🧭 IKIGAI · VIND JE KOMPAS
            </h1>
            <p className="text-dark-400 text-sm hidden md:block">
              {getGreeting()}{user ? `, ${user.name}` : ''}! Het is {getDayName()}.
            </p>
          </div>
          
          {/* Stats & Auth */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Sync Indicator */}
            <div className="hidden md:block">
              <SyncIndicator />
            </div>

            {/* Streak */}
            {user && (
              <div className="flex items-center gap-1.5 bg-dark-800/50 px-3 py-1.5 rounded-full">
                <Flame className="w-5 h-5 text-orange-500 fire-shake" />
                <span className="font-bold text-orange-400">{user.streak}</span>
              </div>
            )}

            {/* XP */}
            {user && (
              <div className="flex items-center gap-1.5 bg-dark-800/50 px-3 py-1.5 rounded-full">
                <Zap className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-amber-400">{user.xp.toLocaleString()}</span>
              </div>
            )}

            {/* Auth Button */}
            <AuthButton />

            {/* Settings */}
            <NavLink
              to="/instellingen"
              className="p-2 rounded-full bg-dark-800/50 hover:bg-dark-700/50 transition-colors"
            >
              <Settings className="w-5 h-5 text-dark-400" />
            </NavLink>
          </div>
        </div>
      </header>
      
      {/* Navigation */}
      <nav className="relative z-10 px-4 md:px-6 py-2 border-b border-dark-800/50 backdrop-blur-xl bg-dark-950/60 sticky top-[73px]">
        <div className="max-w-6xl mx-auto flex gap-1 md:gap-2 overflow-x-auto pb-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                    : 'bg-dark-800/50 text-dark-400 hover:bg-dark-700/50 hover:text-white'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="relative z-10 px-4 md:px-6 py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* 📲 Installatie-hint (iOS/iPad) */}
      <InstallHint />
      
      {/* Floating Goal Footer */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-2xl shadow-2xl shadow-amber-500/30 flex items-center gap-3">
          <span className="text-2xl">🧭</span>
          <div className="text-center">
            <div className="text-xs opacity-80">Jouw kompas</div>
            <div className="font-bold">Vind je Ikigai</div>
          </div>
          <span className="text-2xl">🏎️</span>
        </div>
      </div>
      
      {/* Bottom spacing for footer */}
      <div className="h-24" />
    </div>
  );
}

export default Layout;
