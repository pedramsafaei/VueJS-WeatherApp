/**
 * Date Formatting Utilities
 */

type DateInput = Date | number | string;

/**
 * Format date to readable string
 */
export const formatDate = (date: DateInput, locale: string = 'en-US'): string => {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return dateObj.toLocaleDateString(locale, options);
};

/**
 * Format date to short string
 */
export const formatShortDate = (date: DateInput, locale: string = 'en-US'): string => {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  };
  return dateObj.toLocaleDateString(locale, options);
};

/**
 * Format time
 */
export const formatTime = (date: DateInput, locale: string = 'en-US'): string => {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };
  return dateObj.toLocaleTimeString(locale, options);
};

/**
 * Format timestamp to time
 */
export const formatTimestamp = (timestamp: number, locale: string = 'en-US'): string => {
  return formatTime(timestamp * 1000, locale);
};

/**
 * Get day name from date
 */
export const getDayName = (date: DateInput, locale: string = 'en-US'): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString(locale, { weekday: 'long' });
};

/**
 * Get short day name from date
 */
export const getShortDayName = (date: DateInput, locale: string = 'en-US'): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString(locale, { weekday: 'short' });
};

/**
 * Check if date is today
 */
export const isToday = (date: DateInput): boolean => {
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
 */
export const getRelativeTime = (date: DateInput): string => {
  const now = new Date();
  const dateObj = new Date(date);
  const diffMs = now.getTime() - dateObj.getTime();
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
