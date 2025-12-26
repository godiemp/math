'use client';

import { useState, useCallback, useMemo } from 'react';

export type Step2Phase = 'intro' | 'discover' | 'pattern';

export interface UseStep2ExplorationOptions<T> {
  /** Array of examples to iterate through */
  examples: T[];
  /** Function to get unique ID from each example */
  getExampleId: (example: T) => string;
  /** Callback when phase changes */
  onPhaseChange?: (phase: Step2Phase) => void;
}

export interface UseStep2ExplorationReturn<T> {
  // Phase management
  phase: Step2Phase;
  setPhase: (phase: Step2Phase) => void;
  startDiscovery: () => void;
  showPattern: () => void;

  // Example iteration
  currentIndex: number;
  currentExample: T;
  discoveredIds: string[];
  allDiscovered: boolean;
  isLastExample: boolean;

  // Discovery flow state
  showResult: boolean;

  // Actions
  discoverCurrent: () => void;
  nextExample: () => void;
  reset: () => void;
}

export function useStep2Exploration<T>({
  examples,
  getExampleId,
  onPhaseChange,
}: UseStep2ExplorationOptions<T>): UseStep2ExplorationReturn<T> {
  const [phase, setPhaseState] = useState<Step2Phase>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [discoveredIds, setDiscoveredIds] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const currentExample = examples[currentIndex];
  const allDiscovered = discoveredIds.length === examples.length;
  const isLastExample = currentIndex === examples.length - 1;

  const setPhase = useCallback(
    (newPhase: Step2Phase) => {
      setPhaseState(newPhase);
      onPhaseChange?.(newPhase);
    },
    [onPhaseChange]
  );

  const startDiscovery = useCallback(() => {
    setPhase('discover');
  }, [setPhase]);

  const showPattern = useCallback(() => {
    setPhase('pattern');
  }, [setPhase]);

  const discoverCurrent = useCallback(() => {
    const id = getExampleId(currentExample);
    if (!discoveredIds.includes(id)) {
      setDiscoveredIds((prev) => [...prev, id]);
    }
    setShowResult(true);
  }, [currentExample, discoveredIds, getExampleId]);

  const nextExample = useCallback(() => {
    if (currentIndex < examples.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowResult(false);
    } else {
      setPhase('pattern');
    }
  }, [currentIndex, examples.length, setPhase]);

  const reset = useCallback(() => {
    setPhaseState('intro');
    setCurrentIndex(0);
    setDiscoveredIds([]);
    setShowResult(false);
  }, []);

  return useMemo(
    () => ({
      phase,
      setPhase,
      startDiscovery,
      showPattern,
      currentIndex,
      currentExample,
      discoveredIds,
      allDiscovered,
      isLastExample,
      showResult,
      discoverCurrent,
      nextExample,
      reset,
    }),
    [
      phase,
      setPhase,
      startDiscovery,
      showPattern,
      currentIndex,
      currentExample,
      discoveredIds,
      allDiscovered,
      isLastExample,
      showResult,
      discoverCurrent,
      nextExample,
      reset,
    ]
  );
}
