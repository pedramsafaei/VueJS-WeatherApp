/**
 * Date Formatting Utilities
 */

/**
 * Format date to readable string
 * @param {Date|number|string} date - Date to format
 * @param {string} locale - Locale string
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, locale = 'en-US') => {
  const dateObj = new Date(date);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return dateObj.toLocaleDateString(locale, options);
};

/**
 * Format date to short string
 * @param {Date|number|string} date - Date to format
 * @param {string} locale - Locale string
 * @returns {string} - Formatted date string
 */
export const formatShortDate = (date, locale = 'en-US') => {
  const dateObj = new Date(date);
  const options = {
    month: 'short',
    day: 'numeric',
  };
  return dateObj.toLocaleDateString(locale, options);
};

/**
 * Format time
 * @param {Date|number|string} date - Date to format
 * @param {string} locale - Locale string
 * @returns {string} - Formatted time string
 */
export const formatTime = (date, locale = 'en-US') => {
  const dateObj = new Date(date);
  const options = {
    hour: '2-digit',
    minute: '2-digit',
  };
  return dateObj.toLocaleTimeString(locale, options);
};

/**
 * Format timestamp to time
 * @param {number} timestamp - Unix timestamp
 * @param {string} locale - Locale string
 * @returns {string} - Formatted time string
 */
export const formatTimestamp = (timestamp, locale = 'en-US') => {
  return formatTime(timestamp * 1000, locale);
};

/**
 * Get day name from date
 * @param {Date|number|string} date - Date
 * @param {string} locale - Locale string
 * @returns {string} - Day name
 */
export const getDayName = (date, locale = 'en-US') => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString(locale, { weekday: 'long' });
};

/**
 * Get short day name from date
 * @param {Date|number|string} date - Date
 * @param {string} locale - Locale string
 * @returns {string} - Short day name
 */
export const getShortDayName = (date, locale = 'en-US') => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString(locale, { weekday: 'short' });
};

/**
 * Check if date is today
 * @param {Date|number|string} date - Date to check
 * @returns {boolean} - True if date is today
 */
export const isToday = date => {
  const today = new Date();
  const checkDate = new Date(date);
  return (
    today.getDate() === checkDate.getDate() &&
    today.getMonth() === checkDate.getMonth() &&
    today.getFullYear() === checkDate.getFullYear()
  );
};

/**
 * Get relative time string
 * @param {Date|number|string} date - Date
 * @returns {string} - Relative time string
 */
export const getRelativeTime = date => {
  const now = new Date();
  const dateObj = new Date(date);
  const diffMs = now - dateObj;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return formatDate(date);
};

export default {
  formatDate,
  formatShortDate,
  formatTime,
  formatTimestamp,
  getDayName,
  getShortDayName,
  isToday,
  getRelativeTime,
};
