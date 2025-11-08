/**
 * SWR Configuration with localStorage persistence
 *
 * This ensures cached data persists across page reloads,
 * providing instant data display while revalidating in the background.
 */

'use client';

import { SWRConfig } from 'swr';
import { ReactNode } from 'react';

// localStorage-based cache provider for SWR
const localStorageProvider = () => {
  // When initializing, restore the data from localStorage
  const map = new Map<string, any>();

  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('swr-cache');
      if (stored) {
        const cache = JSON.parse(stored);
        Object.entries(cache).forEach(([key, value]) => {
          map.set(key, value);
        });
      }
    } catch (error) {
      console.error('Error loading SWR cache from localStorage:', error);
    }
  }

  // Subscribe to changes and save to localStorage
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      try {
        const appCache: Record<string, any> = {};
        map.forEach((value, key) => {
          appCache[key] = value;
        });
        localStorage.setItem('swr-cache', JSON.stringify(appCache));
      } catch (error) {
        console.error('Error saving SWR cache to localStorage:', error);
      }
    });
  }

  return map;
};

export function SWRProvider({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        provider: localStorageProvider,
        // Revalidate on mount to ensure fresh data
        revalidateOnMount: true,
        // Don't show error retry UI immediately
        errorRetryCount: 3,
        errorRetryInterval: 5000,
      }}
    >
      {children}
    </SWRConfig>
  );
}
