// Client-side API client. Talks to the serverless functions under /api.
// The Neon database URL is NEVER present here — all DB access is server-side.

const BASE = '/api';

function getToken() {
  // Token is stored in localStorage (signed + server-validated). It contains no
  // secrets. For stronger protection you could move it to an httpOnly cookie set
  // by the server, but localStorage is sufficient for this private app.
  return localStorage.getItem('auth-token');
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: 'same-origin',
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    return { success: false, error: data?.error || `HTTP ${res.status}`, status: res.status };
  }
  return data || { success: true };
}

export const api = {
  login: (role, password) => request('/auth', { method: 'POST', body: { role, password } }),

  getMe: () => request('/users/me'),

  userAction: (action, payload = {}) => request('/users/me', { method: 'POST', body: { action, ...payload } }),

  completeMission: (weekNumber, xpEarned) =>
    request('/missions', { method: 'POST', body: { action: 'complete', weekNumber, xpEarned } }),

  sundayReview: (weekNumber, videoUrl, notes, xpEarned = 75) =>
    request('/missions', { method: 'POST', body: { action: 'sundayReview', weekNumber, videoUrl, notes, xpEarned } }),

  getAnswers: (week) => request(`/answers${week ? `?week=${week}` : ''}`),

  saveAnswer: (weekNumber, stepIndex, answer) =>
    request('/answers', { method: 'POST', body: { weekNumber, stepIndex, answer } }),

  admin: (q) => request(`/admin?q=${q}`),

  adminAction: (action, payload = {}) => request('/admin', { method: 'POST', body: { action, ...payload } }),
};
