'use client';

import { useState, useCallback, useMemo } from 'react';

export type Step1Phase = 'scenario' | 'question' | 'reveal' | 'result';

export interface UseStep1PhaseOptions {
  /** Valid phases in order, e.g. ['scenario', 'question', 'result'] */
  phases: Step1Phase[];
  /** Index of the correct answer (0-based) */
  correctAnswer: number;
  /** Auto-advance delay in ms after check() (default: 1500, 0 to disable) */
  autoAdvanceDelay?: number;
  /** Callback when phase changes */
  onPhaseChange?: (phase: Step1Phase) => void;
}

export interface UseStep1PhaseReturn {
  /** Current phase */
  phase: Step1Phase;
  /** Manually set the phase */
  setPhase: (phase: Step1Phase) => void;
  /** Advance to the next phase in sequence */
  nextPhase: () => void;
  /** Currently selected answer index (null if none) */
  selectedAnswer: number | null;
  /** Whether feedback is currently showing */
  showFeedback: boolean;
  /** Whether the selected answer is correct */
  isCorrect: boolean;
  /** Select an answer by index */
  select: (index: number) => void;
  /** Check the answer, show feedback, and optionally auto-advance */
  check: () => void;
  /** Reset to initial state */
  reset: () => void;
}

export function useStep1Phase({
  phases,
  correctAnswer,
  autoAdvanceDelay = 1500,
  onPhaseChange,
}: UseStep1PhaseOptions): UseStep1PhaseReturn {
  const [phase, setPhaseState] = useState<Step1Phase>(phases[0]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const isCorrect = selectedAnswer === correctAnswer;

  const setPhase = useCallback(
    (newPhase: Step1Phase) => {
      setPhaseState(newPhase);
      onPhaseChange?.(newPhase);
    },
    [onPhaseChange]
  );

  const nextPhase = useCallback(() => {
    const currentIndex = phases.indexOf(phase);
    if (currentIndex < phases.length - 1) {
      const newPhase = phases[currentIndex + 1];
      setPhase(newPhase);
    }
  }, [phase, phases, setPhase]);

  const select = useCallback(
    (index: number) => {
      if (showFeedback) return;
      setSelectedAnswer(index);
    },
    [showFeedback]
  );

  const check = useCallback(() => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);

    if (autoAdvanceDelay > 0) {
      setTimeout(() => {
        nextPhase();
      }, autoAdvanceDelay);
    }
  }, [selectedAnswer, autoAdvanceDelay, nextPhase]);

  const reset = useCallback(() => {
    setPhaseState(phases[0]);
    setSelectedAnswer(null);
    setShowFeedback(false);
  }, [phases]);

  return useMemo(
    () => ({
      phase,
      setPhase,
      nextPhase,
      selectedAnswer,
      showFeedback,
      isCorrect,
      select,
      check,
      reset,
    }),
    [phase, setPhase, nextPhase, selectedAnswer, showFeedback, isCorrect, select, check, reset]
  );
}
