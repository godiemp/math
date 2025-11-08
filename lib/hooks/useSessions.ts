/**
 * Custom hooks for session data fetching with SWR caching
 *
 * Benefits:
 * - Instant data on page reload (from cache)
 * - Automatic revalidation in background
 * - Deduplicates simultaneous requests
 * - Revalidates on window focus
 * - Smart polling based on session states
 */

import useSWR from 'swr';
import { LiveSession } from '../types';
import { getAllSessions, getAllAvailableSessions, getSession, updateSessionStatuses } from '../sessionApi';

/**
 * Hook to fetch all sessions with smart caching
 *
 * Revalidation strategy:
 * - Cache for 30 seconds (dedupingInterval)
 * - Revalidate on window focus
 * - Smart polling: Poll more frequently when there are active/lobby sessions
 */
export function useAllSessions(filters?: { status?: string; level?: 'M1' | 'M2' }) {
  const cacheKey = filters
    ? `/api/sessions?${new URLSearchParams(filters as Record<string, string>).toString()}`
    : '/api/sessions';

  const { data, error, isLoading, mutate } = useSWR<LiveSession[]>(
    cacheKey,
    async () => {
      // Update statuses before fetching
      await updateSessionStatuses();
      return getAllSessions(filters);
    },
    {
      // Deduplicate requests within 30 seconds
      dedupingInterval: 30000,

      // Revalidate on window focus (when user comes back to tab)
      revalidateOnFocus: true,

      // Keep previous data while fetching new data
      keepPreviousData: true,

      // Smart polling: only poll if there are sessions that might change status
      refreshInterval: (latestData) => {
        if (!latestData || latestData.length === 0) {
          // No sessions, check every 30 seconds
          return 30000;
        }

        // Check if there are any sessions that are about to change status
        const now = Date.now();
        const hasActiveSessions = latestData.some(
          s => s.status === 'active' || s.status === 'lobby'
        );
        const hasUpcomingSessions = latestData.some(
          s => s.status === 'scheduled' && s.lobbyOpenTime && s.lobbyOpenTime - now < 5 * 60 * 1000 // Within 5 minutes
        );

        if (hasActiveSessions) {
          // Active sessions: poll every 10 seconds (less frequent than before)
          return 10000;
        } else if (hasUpcomingSessions) {
          // Upcoming sessions: poll every 15 seconds
          return 15000;
        } else {
          // Only scheduled sessions far in future: poll every 30 seconds
          return 30000;
        }
      },
    }
  );

  return {
    sessions: data || [],
    isLoading,
    error,
    refresh: mutate,
  };
}

/**
 * Hook to fetch available sessions (scheduled, lobby, or active)
 * with smart caching and polling
 */
export function useAvailableSessions() {
  const { data, error, isLoading, mutate } = useSWR<LiveSession[]>(
    '/api/sessions/available',
    async () => {
      console.log('🔄 SWR: Fetching available sessions...');
      await updateSessionStatuses();
      const sessions = await getAllAvailableSessions();
      console.log('✅ SWR: Fetched sessions:', sessions.length);
      return sessions;
    },
    {
      dedupingInterval: 30000,
      revalidateOnFocus: true,
      keepPreviousData: true,
      onError: (err) => {
        console.error('❌ SWR Error fetching sessions:', err);
      },
      onSuccess: (data) => {
        console.log('✅ SWR Success:', data?.length, 'sessions');
      },

      // Smart polling based on session states
      refreshInterval: (latestData) => {
        if (!latestData || latestData.length === 0) {
          return 30000;
        }

        const now = Date.now();
        const hasActiveSessions = latestData.some(s => s.status === 'active' || s.status === 'lobby');
        const hasUpcomingSessions = latestData.some(
          s => s.status === 'scheduled' && s.lobbyOpenTime && s.lobbyOpenTime - now < 5 * 60 * 1000
        );

        if (hasActiveSessions) {
          return 10000; // 10 seconds for active sessions
        } else if (hasUpcomingSessions) {
          return 15000; // 15 seconds for upcoming sessions
        } else {
          return 30000; // 30 seconds otherwise
        }
      },
    }
  );

  if (error) {
    console.error('❌ useAvailableSessions error:', error);
  }

  return {
    sessions: data || [],
    isLoading,
    error,
    refresh: mutate,
  };
}

/**
 * Hook to fetch a single session by ID
 */
export function useSession(sessionId: string | null) {
  const { data, error, isLoading, mutate } = useSWR<LiveSession | null>(
    sessionId ? `/api/sessions/${sessionId}` : null,
    async () => {
      if (!sessionId) return null;
      await updateSessionStatuses();
      return getSession(sessionId);
    },
    {
      dedupingInterval: 20000,
      revalidateOnFocus: true,
      keepPreviousData: true,

      // Poll more frequently for active sessions
      refreshInterval: (latestData) => {
        if (!latestData) return 30000;

        if (latestData.status === 'active') {
          return 5000; // 5 seconds for active session
        } else if (latestData.status === 'lobby') {
          return 10000; // 10 seconds for lobby
        } else if (latestData.status === 'scheduled') {
          const now = Date.now();
          if (latestData.lobbyOpenTime && latestData.lobbyOpenTime - now < 5 * 60 * 1000) {
            return 15000; // 15 seconds if lobby opens soon
          }
        }

        return 30000; // 30 seconds otherwise
      },
    }
  );

  return {
    session: data,
    isLoading,
    error,
    refresh: mutate,
  };
}
