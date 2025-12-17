import React, { useState } from 'react';
import { Lock, User, Shield } from 'lucide-react';

// Wachtwoorden (in productie deze in environment variables zetten!)
const PASSWORDS = {
  admin: 'papa2024',  // Papa's admin wachtwoord
  user: 'zoon2024'    // Zoon's wachtwoord
};

export default function PasswordGate({ onAuthenticate }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Check wachtwoord
    setTimeout(() => {
      if (password === PASSWORDS.admin) {
        onAuthenticate('admin');
      } else if (password === PASSWORDS.user) {
        onAuthenticate('user');
      } else {
        setError('Onjuist wachtwoord!');
        setPassword('');
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="blob top-0 left-1/4 w-96 h-96 bg-amber-500/10" />
        <div className="blob bottom-0 right-1/4 w-80 h-80 bg-blue-500/10" style={{ animationDelay: '1s' }} />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-card p-8 md:p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 vehicle-bounce">🏎️</div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent mb-2">
              REIS NAAR HET MILJOEN
            </h1>
            <p className="text-dark-400 text-sm">
              Voer je wachtwoord in om verder te gaan
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Wachtwoord
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Voer je wachtwoord in"
                  className="input-field pl-10"
                  autoFocus
                  disabled={loading}
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-400">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!password || loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Controleren...' : 'Inloggen'}
            </button>
          </form>

          {/* Hints */}
          <div className="mt-8 space-y-3">
            <div className="flex items-start gap-3 p-3 bg-dark-800/50 rounded-lg">
              <User className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-300">Zoon</p>
                <p className="text-xs text-dark-400">Reguliere toegang</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-dark-800/50 rounded-lg">
              <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-300">Papa (Admin)</p>
                <p className="text-xs text-dark-400">Volledige toegang + dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
