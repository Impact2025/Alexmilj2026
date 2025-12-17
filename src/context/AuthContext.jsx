import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // 'admin' or 'user'
  const [loading, setLoading] = useState(true);

  // Check session storage on mount
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('auth-role');
    if (savedAuth) {
      setRole(savedAuth);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const authenticate = (userRole) => {
    setRole(userRole);
    setIsAuthenticated(true);
    sessionStorage.setItem('auth-role', userRole);
  };

  const logout = () => {
    setRole(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem('auth-role');
  };

  const isAdmin = () => role === 'admin';
  const isUser = () => role === 'user';

  const value = {
    isAuthenticated,
    role,
    loading,
    authenticate,
    logout,
    isAdmin,
    isUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
