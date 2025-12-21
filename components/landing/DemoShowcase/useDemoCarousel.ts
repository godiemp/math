'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const DEMO_DURATION = 8000; // 8 seconds per demo
const IDLE_TIMEOUT = 15000; // Resume after 15s of no interaction
const PROGRESS_INTERVAL = 50; // Update progress every 50ms

export type DemoIndex = 0 | 1 | 2 | 3;

export interface UseDemoCarouselReturn {
  activeDemo: DemoIndex;
  setActiveDemo: (index: DemoIndex) => void;
  isPaused: boolean;
  pause: () => void;
  resume: () => void;
  progress: number; // 0-100 for progress bar
}

export function useDemoCarousel(): UseDemoCarouselReturn {
  const [activeDemo, setActiveDemoState] = useState<DemoIndex>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear idle timeout
  const clearIdleTimeout = useCallback(() => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = null;
    }
  }, []);

  // Start idle timeout to resume auto-play
  const startIdleTimeout = useCallback(() => {
    clearIdleTimeout();
    idleTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, IDLE_TIMEOUT);
  }, [clearIdleTimeout]);

  // Pause auto-play
  const pause = useCallback(() => {
    setIsPaused(true);
    startIdleTimeout();
  }, [startIdleTimeout]);

  // Resume auto-play
  const resume = useCallback(() => {
    setIsPaused(false);
    clearIdleTimeout();
  }, [clearIdleTimeout]);

  // Set active demo (also pauses auto-play)
  const setActiveDemo = useCallback((index: DemoIndex) => {
    setActiveDemoState(index);
    setProgress(0);
    pause();
  }, [pause]);

  // Auto-advance timer
  useEffect(() => {
    if (isPaused) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const increment = 100 / (DEMO_DURATION / PROGRESS_INTERVAL);
        const next = prev + increment;

        if (next >= 100) {
          // Move to next demo
          setActiveDemoState((d) => ((d + 1) % 4) as DemoIndex);
          return 0;
        }
        return next;
      });
    }, PROGRESS_INTERVAL);

    return () => clearInterval(progressInterval);
  }, [isPaused]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearIdleTimeout();
  }, [clearIdleTimeout]);

  return {
    activeDemo,
    setActiveDemo,
    isPaused,
    pause,
    resume,
    progress,
  };
}
