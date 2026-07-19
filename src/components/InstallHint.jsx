import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Download, Info } from 'lucide-react';

// 📲 Installatie-hint voor iOS/iPad.
// Toont alleen als:
//   - we NIET al in standalone (geïnstalleerde) modus draaien, én
//   - de gebruiker de hint niet al eerder heeft weggeklikt (localStorage).
// Begeleidt een kind stap-voor-stap om de app op het beginscherm te zetten.
const INSTALL_DISMISS_KEY = 'install-hint-dismissed';

function isIos() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  // iPad (incl. iPadOS die zich voordoet als Mac), iPhone, iPod.
  const isIpad = /iPad/.test(ua) || (/Macintosh/.test(ua) && 'ontouchend' in document);
  return /iPhone|iPod/.test(ua) || isIpad;
}

export default function InstallHint() {
  const { offlineMode, syncMode } = useApp();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Al geïnstalleerd (standalone) => nooit tonen.
    const standalone =
      window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
    const isInstalled = standalone || window.navigator.standalone === true;
    const alreadyDismissed = localStorage.getItem(INSTALL_DISMISS_KEY) === 'true';
    setDismissed(alreadyDismissed);
    if (!isInstalled && !alreadyDismissed && isIos()) {
      // Kleine vertraging zodat de hint niet meteen over de login valt.
      const t = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(t);
    }
    setShow(false);
  }, []);

  const close = () => {
    localStorage.setItem(INSTALL_DISMISS_KEY, 'true');
    setDismissed(true);
    setShow(false);
  };

  if (!show || dismissed) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md">
      <div className="glass-card p-4 border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/10 shadow-2xl shadow-amber-500/20 relative">
        <button
          type="button"
          onClick={close}
          className="absolute top-2 right-2 p-1.5 rounded-lg text-dark-400 hover:text-white hover:bg-dark-700/60 transition-colors"
          aria-label="Sluiten"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-500/20 flex-shrink-0">
            <Download className="w-5 h-5 text-amber-300" />
          </div>
          <div className="pr-6">
            <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-300" /> Zet de app op je iPad
            </h3>
            <p className="text-dark-300 text-xs mt-1 leading-relaxed">
              Tik onderin op het <span className="text-amber-200 font-semibold">deel-icoontje</span>{' '}
              (vierkant met pijl omhoog) → kies{' '}
              <span className="text-amber-200 font-semibold">"Zet op beginscherm"</span>. Dan speel je
              'm altijd volledig scherm en ook zonder wifi 🚗.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-2.5 text-xs font-semibold text-amber-300 hover:text-amber-200"
            >
              Begrepen, niet meer vragen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
