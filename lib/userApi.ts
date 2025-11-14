/**
 * User API functions
 */

import { api } from './api-client';

interface MarkWelcomeSeenResponse {
  success: boolean;
  message: string;
  hasSeenWelcome: boolean;
}

/**
 * Mark the welcome message as seen for the current user
 */
export async function markWelcomeSeen(): Promise<boolean> {
  try {
    const response = await api.post<MarkWelcomeSeenResponse>('/api/user/welcome-seen', {});
    return response.data?.success || false;
  } catch (error) {
    console.error('Failed to mark welcome as seen:', error);
    return false;
  }
}
