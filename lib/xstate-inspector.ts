/**
 * XState Inspector Setup
 *
 * This file initializes the XState Inspector for development debugging.
 * The inspector provides a visual interface to debug state machines in real-time.
 *
 * Features:
 * - Visual state diagram
 * - Event timeline
 * - Context inspection
 * - State history playback
 *
 * Usage:
 * Import this file once in your app (e.g., in app/providers.tsx or layout.tsx)
 */

'use client';

import { createBrowserInspector } from '@statelyai/inspect';

let inspector: ReturnType<typeof createBrowserInspector> | null = null;

/**
 * Initialize the XState Inspector for development
 *
 * Call this function once when your app starts (only in development mode)
 */
export function initializeInspector() {
  // Only run in development and in the browser
  if (
    process.env.NODE_ENV !== 'development' ||
    typeof window === 'undefined'
  ) {
    return;
  }

  // Only initialize once
  if (inspector) {
    return inspector;
  }

  try {
    inspector = createBrowserInspector({
      // Auto-open inspector window
      autoStart: true,

      // Inspector window configuration
      url: 'https://stately.ai/registry/editor/embed?inspect',
    });

    console.log('✅ XState Inspector initialized');
    console.log('🔍 Inspector available at: https://stately.ai/viz');

    return inspector;
  } catch (error) {
    console.warn('⚠️ Failed to initialize XState Inspector:', error);
    console.warn('Make sure @statelyai/inspect is installed: npm install @statelyai/inspect');
  }
}

/**
 * Get the current inspector instance
 */
export function getInspector() {
  return inspector;
}

/**
 * Check if inspector is available
 */
export function isInspectorAvailable(): boolean {
  return inspector !== null && process.env.NODE_ENV === 'development';
}

/**
 * Hook to conditionally enable inspection based on environment
 */
export function useInspectorConfig() {
  return {
    inspect: isInspectorAvailable(),
  };
}

// Auto-initialize if in development
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // Small delay to ensure DOM is ready
  setTimeout(() => {
    initializeInspector();
  }, 100);
}
