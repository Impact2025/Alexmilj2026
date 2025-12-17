/**
 * Validation utilities for input sanitization
 */

// Validate user name
export function validateName(name) {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Name is required' };
  }

  const trimmed = name.trim();

  if (trimmed.length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' };
  }

  if (trimmed.length > 100) {
    return { valid: false, error: 'Name must be less than 100 characters' };
  }

  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  const validNameRegex = /^[a-zA-Z\s\-']+$/;
  if (!validNameRegex.test(trimmed)) {
    return { valid: false, error: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
  }

  return { valid: true, value: trimmed };
}

// Validate XP amount
export function validateXP(xp) {
  if (typeof xp !== 'number') {
    return { valid: false, error: 'XP must be a number' };
  }

  if (xp < 0) {
    return { valid: false, error: 'XP cannot be negative' };
  }

  if (xp > 1000000) {
    return { valid: false, error: 'XP cannot exceed 1,000,000' };
  }

  if (!Number.isInteger(xp)) {
    return { valid: false, error: 'XP must be a whole number' };
  }

  return { valid: true, value: xp };
}

// Validate money amount
export function validateMoney(amount) {
  if (typeof amount !== 'number') {
    return { valid: false, error: 'Amount must be a number' };
  }

  if (amount < 0) {
    return { valid: false, error: 'Amount cannot be negative' };
  }

  if (amount > 10000000) {
    return { valid: false, error: 'Amount cannot exceed €10,000,000' };
  }

  // Allow decimals for money
  if (amount !== Math.floor(amount * 100) / 100) {
    return { valid: false, error: 'Amount can have at most 2 decimal places' };
  }

  return { valid: true, value: amount };
}

// Validate week number
export function validateWeekNumber(week) {
  if (typeof week !== 'number' || !Number.isInteger(week)) {
    return { valid: false, error: 'Week must be an integer' };
  }

  if (week < 1 || week > 52) {
    return { valid: false, error: 'Week must be between 1 and 52' };
  }

  return { valid: true, value: week };
}

// Validate focus text (morning ritual)
export function validateFocus(focus) {
  if (!focus || typeof focus !== 'string') {
    return { valid: false, error: 'Focus is required' };
  }

  const trimmed = focus.trim();

  if (trimmed.length < 3) {
    return { valid: false, error: 'Focus must be at least 3 characters' };
  }

  if (trimmed.length > 500) {
    return { valid: false, error: 'Focus must be less than 500 characters' };
  }

  return { valid: true, value: trimmed };
}

// Validate video URL (YouTube)
export function validateVideoUrl(url) {
  if (!url || typeof url !== 'string') {
    return { valid: false, error: 'URL is required' };
  }

  const trimmed = url.trim();

  // Check if it's a valid URL
  try {
    new URL(trimmed);
  } catch (e) {
    return { valid: false, error: 'Invalid URL format' };
  }

  // Check if it's a YouTube URL
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  if (!youtubeRegex.test(trimmed)) {
    return { valid: false, error: 'Must be a valid YouTube URL' };
  }

  return { valid: true, value: trimmed };
}

// Sanitize HTML to prevent XSS
export function sanitizeHtml(text) {
  if (!text || typeof text !== 'string') {
    return '';
  }

  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
