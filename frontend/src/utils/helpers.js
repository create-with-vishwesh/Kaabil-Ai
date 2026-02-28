/**
 * Utility helpers – token management, formatters, validators.
 */

// ── Token ──
export const getToken = () => localStorage.getItem('token');
export const setToken = (t) => localStorage.setItem('token', t);
export const removeToken = () => localStorage.removeItem('token');

// ── Formatters ──
export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

export const truncate = (str, len = 100) =>
  str.length > len ? str.slice(0, len) + '…' : str;

// ── Validators ──
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const passwordStrength = (pw) => {
  if (pw.length < 6) return 'weak';
  if (pw.length < 10) return 'medium';
  return 'strong';
};
