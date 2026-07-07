import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

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
    } else {
      setLoading(false);
    }
  }, []);

  const authenticate = useCallback((userRole) => {
    setRole(userRole);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-role');
    setRole(null);
    setIsAuthenticated(false);
  }, []);

  const isAdmin = useCallback(() => role === 'admin', [role]);
  const isUser = useCallback(() => role === 'user', [role]);

  const value = { isAuthenticated, role, loading, authenticate, logout, isAdmin, isUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
