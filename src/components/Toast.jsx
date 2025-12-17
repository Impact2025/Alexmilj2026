import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const TOAST_TYPES = {
  success: {
    icon: CheckCircle,
    color: 'bg-green-500',
    textColor: 'text-green-900',
    borderColor: 'border-green-600',
  },
  error: {
    icon: AlertCircle,
    color: 'bg-red-500',
    textColor: 'text-red-900',
    borderColor: 'border-red-600',
  },
  warning: {
    icon: AlertTriangle,
    color: 'bg-amber-500',
    textColor: 'text-amber-900',
    borderColor: 'border-amber-600',
  },
  info: {
    icon: Info,
    color: 'bg-blue-500',
    textColor: 'text-blue-900',
    borderColor: 'border-blue-600',
  },
};

export default function Toast({ id, type = 'info', message, duration = 5000, onClose }) {
  const config = TOAST_TYPES[type] || TOAST_TYPES.info;
  const Icon = config.icon;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  return (
    <div
      className={`
        ${config.color} ${config.borderColor}
        border-2 rounded-xl p-4 shadow-2xl
        flex items-start gap-3 min-w-[320px] max-w-md
        animate-slide-in-right
      `}
    >
      <Icon className={`${config.textColor} flex-shrink-0 mt-0.5`} size={20} />
      <p className={`${config.textColor} font-medium text-sm flex-1`}>{message}</p>
      <button
        onClick={() => onClose(id)}
        className={`${config.textColor} hover:opacity-70 transition-opacity flex-shrink-0`}
      >
        <X size={18} />
      </button>
    </div>
  );
}
