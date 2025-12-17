/**
 * Shared formatting utilities
 */

/**
 * Format a timestamp as relative time (e.g., "hace 5 min")
 */
export function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 60) return 'hace un momento';

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `hace ${minutes} min`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `hace ${hours}h`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `hace ${days}d`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `hace ${weeks} sem`;

  const months = Math.floor(days / 30);
  if (months < 12) return `hace ${months} mes${months > 1 ? 'es' : ''}`;

  const years = Math.floor(days / 365);
  return `hace ${years} año${years > 1 ? 's' : ''}`;
}

/**
 * Format a timestamp as a date string
 */
export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Format a timestamp as a full date with time
 */
export function formatDateTime(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format a number as a percentage
 */
export function formatPercent(value: number, decimals: number = 0): string {
  return `${Math.round(value * 100 * Math.pow(10, decimals)) / Math.pow(10, decimals)}%`;
}

/**
 * Get CSS classes for accuracy display
 */
export function getAccuracyColor(accuracy: number): {
  text: string;
  bg: string;
  border: string;
} {
  if (accuracy >= 0.8) {
    return {
      text: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-100 dark:bg-green-900/30',
      border: 'border-green-200 dark:border-green-800',
    };
  }
  if (accuracy >= 0.6) {
    return {
      text: 'text-yellow-600 dark:text-yellow-400',
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      border: 'border-yellow-200 dark:border-yellow-800',
    };
  }
  return {
    text: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-900/30',
    border: 'border-red-200 dark:border-red-800',
  };
}

/**
 * Get badge variant for accuracy
 */
export function getAccuracyBadgeVariant(accuracy: number): 'success' | 'warning' | 'danger' {
  if (accuracy >= 0.8) return 'success';
  if (accuracy >= 0.6) return 'warning';
  return 'danger';
}

/**
 * Get trend indicator
 */
export function getTrendIndicator(
  current: number,
  previous: number
): { icon: string; text: string; color: string } | null {
  if (previous === 0) return null;

  const change = ((current - previous) / previous) * 100;

  if (Math.abs(change) < 5) {
    return { icon: '→', text: 'Estable', color: 'text-gray-500' };
  }

  if (change > 0) {
    return {
      icon: '↑',
      text: `+${Math.round(change)}%`,
      color: 'text-green-600 dark:text-green-400',
    };
  }

  return {
    icon: '↓',
    text: `${Math.round(change)}%`,
    color: 'text-red-600 dark:text-red-400',
  };
}

/**
 * Generate a random invite code
 */
export function generateInviteCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
