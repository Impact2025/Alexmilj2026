import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppProvider } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import PasswordGate from './components/PasswordGate';
import { useAuth } from './context/AuthContext';
import './styles/index.css';

// PWA: registreer de service worker (offline werken in de auto zonder wifi).
// Bij een nieuwe versie melden we dat en herladen we zodra de gebruiker akkoord gaat.
import { registerSW } from 'virtual:pwa-register';

registerSW({
  onNeedRefresh() {
    // Nieuwe versie klaar — herlaad stilletjes zodra de gebruiker de app opent.
    if (confirm('Er is een nieuwe versie van de app. Herladen?')) {
      registerSW.updateServiceWorker(true);
    }
  },
  onOfflineReady() {
    console.log('✅ App is klaar om offline te werken.');
  },
});

// Content component that checks authentication (token-based, server-validated).
function AppContent() {
  const { isAuthenticated, loading, authenticate } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏎️</div>
          <p className="text-dark-400">Laden...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <PasswordGate onAuthenticate={authenticate} />;
  }

  return (
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);
