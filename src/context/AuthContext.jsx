import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  // Offline mode: speel lokaal zonder server (bijv. in de auto zonder wifi).
  // In offline mode is er geen server-token; alle data gaat naar localStorage.
  const [offlineMode, setOfflineMode] = useState(false);

  // Restore session from stored token on mount (token is server-signed + validated).
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    const storedRole = localStorage.getItem('auth-role');
    if (token && storedRole) {
      // Verify the token is still valid server-side.
      api.getMe().then((res) => {
        if (res.success) {
          setRole(storedRole);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('auth-token');
          localStorage.removeItem('auth-role');
        }
        setLoading(false);
      }).catch(() => setLoading(false));
    } else if (localStorage.getItem('offline-mode') === 'true') {
      // Herstel offline sessie (geen netwerk nodig).
      setOfflineMode(true);
      setRole('user');
      setIsAuthenticated(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const authenticate = useCallback((userRole) => {
    setRole(userRole);
    setIsAuthenticated(true);
  }, []);

  // 🚗 Offline spelen: geen server nodig, alles lokaal. Werkt zonder wifi.
  const startOffline = useCallback(() => {
    localStorage.setItem('offline-mode', 'true');
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-role');
    setOfflineMode(true);
    setRole('user');
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-role');
    localStorage.removeItem('offline-mode');
    setOfflineMode(false);
    setRole(null);
    setIsAuthenticated(false);
  }, []);

  const isAdmin = useCallback(() => role === 'admin', [role]);
  const isUser = useCallback(() => role === 'user', [role]);

  const value = {
    isAuthenticated,
    role,
    loading,
    offlineMode,
    authenticate,
    startOffline,
    logout,
    isAdmin,
    isUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
