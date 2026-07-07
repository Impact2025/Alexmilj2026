import React, { useState, useEffect, useRef } from 'react';
import { Save, Check, X } from 'lucide-react';
import { useToast } from '../context/ToastContext';

/**
 * EditableAnswer - Reusable component for editing mission step answers
 *
 * @param {number} weekNumber - Mission week number
 * @param {number} stepIndex - Step index within the mission
 * @param {string} stepText - The step question/prompt text
 * @param {string} initialValue - Initial answer value
 * @param {function} onSave - Callback when saving (async function)
 * @param {string} mode - 'autosave' (1sec debounce) or 'manual' (explicit save button)
 * @param {boolean} disabled - Disable editing
 * @param {string} userId - User ID (for admin mode)
 * @param {function} onCancel - Callback when canceling edit
 */
export function EditableAnswer({
  weekNumber,
  stepIndex,
  stepText,
  initialValue = '',
  onSave,
  mode = 'autosave',
  disabled = false,
  userId = null,
  onCancel = null
}) {
  const toast = useToast();
  const [value, setValue] = useState(initialValue);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const saveTimeoutRef = useRef(null);
  const MAX_CHARS = 500;

  // Update value when initialValue changes
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Autosave with debouncing (only in autosave mode)
  useEffect(() => {
    if (mode !== 'autosave') return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Don't save if value hasn't changed
    if (value === initialValue) {
      return;
    }

    // Don't save empty values
    if (!value || value.trim().length === 0) {
      return;
    }

    setSaving(true);
    setSaved(false);

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await onSave(value);
        setSaving(false);
        setSaved(true);

        // Hide "saved" indicator after 2 seconds
        setTimeout(() => setSaved(false), 2000);
      } catch (error) {
        setSaving(false);
        toast.error('Fout bij opslaan: ' + error.message);
      }
    }, 1000); // Debounce: 1 second

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [value, mode, initialValue, onSave]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= MAX_CHARS) {
      setValue(newValue);
    }
  };

  const handleManualSave = async () => {
    if (!value || value.trim().length === 0) {
      toast.error('Antwoord mag niet leeg zijn');
      return;
    }

    setSaving(true);
    try {
      await onSave(value);
      setSaving(false);
      toast.success('Antwoord opgeslagen!');
    } catch (error) {
      setSaving(false);
      toast.error('Fout bij opslaan: ' + error.message);
    }
  };

  const handleCancel = () => {
    setValue(initialValue);
    if (onCancel) {
      onCancel();
    }
  };

  const charCount = value.length;
  const isNearLimit = charCount > MAX_CHARS * 0.8;
  const isAtLimit = charCount >= MAX_CHARS;
  const hasChanges = value !== initialValue;

  return (
    <div className="space-y-2">
      {/* Optional: Show step text */}
      {stepText && (
        <p className="text-sm text-dark-300 mb-2">{stepText}</p>
      )}

      <textarea
        value={value}
        onChange={handleChange}
        disabled={disabled || saving}
        placeholder="Schrijf hier jouw antwoord..."
        className={`w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-200 placeholder-dark-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none ${
          disabled ? 'opacity-60 cursor-not-allowed' : ''
        }`}
        rows={4}
      />

      {/* Status, character count, and buttons */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {/* Autosave mode indicators */}
          {mode === 'autosave' && (
            <>
              {saving && (
                <span className="text-amber-400 flex items-center gap-1">
                  <Save className="w-3 h-3 animate-pulse" />
                  Opslaan...
                </span>
              )}
              {saved && !saving && (
                <span className="text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Opgeslagen ✓
                </span>
              )}
            </>
          )}

          {/* Manual mode buttons */}
          {mode === 'manual' && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleManualSave}
                disabled={!hasChanges || saving || !value || value.trim().length === 0}
                className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-dark-900 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1"
              >
                {saving ? (
                  <>
                    <Save className="w-3 h-3 animate-pulse" />
                    Opslaan...
                  </>
                ) : (
                  <>
                    <Check className="w-3 h-3" />
                    Opslaan
                  </>
                )}
              </button>

              {onCancel && (
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="px-3 py-1 bg-dark-700 hover:bg-dark-600 text-dark-200 rounded-md transition-all flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Annuleren
                </button>
              )}
            </div>
          )}
        </div>

        {/* Character counter */}
        <span className={`${
          isAtLimit ? 'text-red-400 font-bold' :
          isNearLimit ? 'text-amber-400' :
          'text-dark-500'
        }`}>
          {charCount}/{MAX_CHARS}
        </span>
      </div>
    </div>
  );
}
