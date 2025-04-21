/**
 * Format a date string to a more readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return dateString;
    }
    
    // Format to DD/MM/YYYY HH:MM
    return new Intl.DateTimeFormat('es', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Get relative time (e.g., "2 days ago", "just now")
 * @param {string} dateString - The date string in ISO format
 * @param {string} locale - The locale to use
 * @returns {string} - Relative time string
 */
export const getRelativeTime = (dateString, locale = 'es-DO') => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return dateString;
    }
    
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    
    const diffInSeconds = Math.floor((date - now) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInSeconds > -60) {
      return locale.startsWith('es') ? 'Ahora mismo' : 'Just now';
    } else if (diffInMinutes > -60) {
      return rtf.format(diffInMinutes, 'minute');
    } else if (diffInHours > -24) {
      return rtf.format(diffInHours, 'hour');
    } else if (diffInDays > -30) {
      return rtf.format(diffInDays, 'day');
    } else {
      return formatDate(dateString);
    }
  } catch (error) {
    console.error('Error getting relative time:', error);
    return dateString;
  }
};