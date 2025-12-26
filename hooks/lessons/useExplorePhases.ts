'use client';

import { useState, useCallback, useMemo } from 'react';

export interface UseExplorePhasesOptions<TPhase extends string, TExample> {
  /** Ordered list of phases, e.g. ['intro', 'discover', 'pattern'] */
  phases: TPhase[];
  /** Examples to iterate through during discovery (optional) */
  examples?: TExample[];
  /** Function to get unique ID from an example */
  getExampleId?: (example: TExample, index: number) => string;
  /** Callback when all examples are discovered */
  onAllDiscovered?: () => void;
  /** Callback when phase changes */
  onPhaseChange?: (phase: TPhase) => void;
}

export interface UseExplorePhasesReturn<TPhase extends string, TExample> {
  // Phase state
  /** Current phase */
  phase: TPhase;
  /** Manually set the phase */
  setPhase: (phase: TPhase) => void;
  /** Advance to the next phase in sequence */
  nextPhase: () => void;
  /** Whether currently on the last phase */
  isLastPhase: boolean;
  /** Index of current phase in phases array */
  phaseIndex: number;

  // Example iteration state
  /** Current example index */
  currentExampleIndex: number;
  /** Current example object (undefined if no examples) */
  currentExample: TExample | undefined;
  /** Set of discovered example IDs */
  discoveredIds: Set<string>;
  /** Number of discovered examples */
  discoveredCount: number;
  /** Whether all examples have been discovered */
  allDiscovered: boolean;
  /** Whether currently on the last example */
  isLastExample: boolean;
  /** Total number of examples */
  totalExamples: number;

  // Example actions
  /** Mark the current example as discovered */
  discoverCurrent: () => void;
  /** Mark a specific example as discovered by ID */
  discoverById: (id: string) => void;
  /** Move to the next example (auto-advances to next phase if on last example) */
  nextExample: () => void;
  /** Move to a specific example by index */
  goToExample: (index: number) => void;
  /** Reset example state (index and discovered IDs) */
  resetExamples: () => void;

  // Hint state (commonly needed in explore phases)
  /** Whether hint is visible */
  showHint: boolean;
  /** Toggle hint visibility */
  toggleHint: () => void;
  /** Hide the hint */
  hideHint: () => void;

  // Full reset
  /** Reset everything to initial state */
  reset: () => void;
}

export function useExplorePhases<TPhase extends string, TExample>({
  phases,
  examples = [],
  getExampleId = (_, index) => String(index),
  onAllDiscovered,
  onPhaseChange,
}: UseExplorePhasesOptions<TPhase, TExample>): UseExplorePhasesReturn<TPhase, TExample> {
  const [phase, setPhaseState] = useState<TPhase>(phases[0]);
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [discoveredIds, setDiscoveredIds] = useState<Set<string>>(new Set());
  const [showHint, setShowHint] = useState(false);

  // Derived values
  const currentExample = examples[currentExampleIndex];
  const totalExamples = examples.length;
  const discoveredCount = discoveredIds.size;
  const allDiscovered = totalExamples > 0 && discoveredCount >= totalExamples;
  const isLastExample = currentExampleIndex >= totalExamples - 1;
  const phaseIndex = phases.indexOf(phase);
  const isLastPhase = phaseIndex >= phases.length - 1;

  // Phase actions
  const setPhase = useCallback(
    (newPhase: TPhase) => {
      setPhaseState(newPhase);
      onPhaseChange?.(newPhase);
    },
    [onPhaseChange]
  );

  const nextPhase = useCallback(() => {
    if (!isLastPhase) {
      setPhase(phases[phaseIndex + 1]);
    }
  }, [isLastPhase, phases, phaseIndex, setPhase]);

  // Example actions
  const discoverById = useCallback(
    (id: string) => {
      setDiscoveredIds((prev) => {
        if (prev.has(id)) return prev;
        const next = new Set(prev);
        next.add(id);
        // Check if all discovered after adding
        if (next.size >= totalExamples && totalExamples > 0) {
          // Use setTimeout to avoid state update during render
          setTimeout(() => onAllDiscovered?.(), 0);
        }
        return next;
      });
    },
    [totalExamples, onAllDiscovered]
  );

  const discoverCurrent = useCallback(() => {
    if (currentExample !== undefined) {
      const id = getExampleId(currentExample, currentExampleIndex);
      discoverById(id);
    }
  }, [currentExample, currentExampleIndex, getExampleId, discoverById]);

  const nextExample = useCallback(() => {
    setShowHint(false);
    if (!isLastExample) {
      setCurrentExampleIndex((prev) => prev + 1);
    } else {
      // Auto-advance to next phase when examples complete
      nextPhase();
    }
  }, [isLastExample, nextPhase]);

  const goToExample = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalExamples) {
        setCurrentExampleIndex(index);
        setShowHint(false);
      }
    },
    [totalExamples]
  );

  const resetExamples = useCallback(() => {
    setCurrentExampleIndex(0);
    setDiscoveredIds(new Set());
    setShowHint(false);
  }, []);

  // Hint actions
  const toggleHint = useCallback(() => {
    setShowHint((prev) => !prev);
  }, []);

  const hideHint = useCallback(() => {
    setShowHint(false);
  }, []);

  // Full reset
  const reset = useCallback(() => {
    setPhaseState(phases[0]);
    resetExamples();
  }, [phases, resetExamples]);

  return useMemo(
    () => ({
      // Phase state
      phase,
      setPhase,
      nextPhase,
      isLastPhase,
      phaseIndex,
      // Example state
      currentExampleIndex,
      currentExample,
      discoveredIds,
      discoveredCount,
      allDiscovered,
      isLastExample,
      totalExamples,
      // Example actions
      discoverCurrent,
      discoverById,
      nextExample,
      goToExample,
      resetExamples,
      // Hint state
      showHint,
      toggleHint,
      hideHint,
      // Full reset
      reset,
    }),
    [
      phase,
      setPhase,
      nextPhase,
      isLastPhase,
      phaseIndex,
      currentExampleIndex,
      currentExample,
      discoveredIds,
      discoveredCount,
      allDiscovered,
      isLastExample,
      totalExamples,
      discoverCurrent,
      discoverById,
      nextExample,
      goToExample,
      resetExamples,
      showHint,
      toggleHint,
      hideHint,
      reset,
    ]
  );
}
