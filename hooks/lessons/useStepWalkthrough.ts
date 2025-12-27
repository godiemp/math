'use client';

import { useState, useCallback, useMemo } from 'react';

/**
 * Options for useStepWalkthrough hook
 * @template TStep - The type of each step in the walkthrough
 */
export interface UseStepWalkthroughOptions<TStep> {
  /** Array of steps to walk through */
  steps: TStep[];
  /** Callback when completing the final step */
  onComplete?: () => void;
  /** Initial step index (default: 0) */
  initialStep?: number;
}

/**
 * Return type for useStepWalkthrough hook
 * @template TStep - The type of each step in the walkthrough
 */
export interface UseStepWalkthroughReturn<TStep> {
  /** Current step data */
  step: TStep;
  /** Current step index (0-based) */
  currentIndex: number;
  /** Human-readable step number (1-based) */
  stepNumber: number;
  /** Total number of steps */
  totalSteps: number;
  /** Whether this is the last step */
  isLastStep: boolean;
  /** Whether this is the first step */
  isFirstStep: boolean;
  /** Progress percentage (0-100) */
  progress: number;
  /** Advance to next step, calls onComplete if on last step */
  next: () => void;
  /** Go to previous step */
  previous: () => void;
  /** Reset to first step */
  reset: () => void;
  /** Go to a specific step by index */
  goToStep: (index: number) => void;
}

/**
 * Hook for managing step-by-step walkthroughs in Step2 exploration components.
 *
 * This hook is ideal for linear step-through explanations where:
 * - User progresses through a fixed sequence of steps
 * - Each step shows different content (equations, instructions, etc.)
 * - User can reset to the beginning
 *
 * @example
 * ```tsx
 * const STEPS = [
 *   { id: 1, instruction: 'Step 1...', equation1: '...', equation2: '...' },
 *   { id: 2, instruction: 'Step 2...', equation1: '...', equation2: '...' },
 * ];
 *
 * const { step, currentIndex, isLastStep, next, reset } = useStepWalkthrough({
 *   steps: STEPS,
 *   onComplete: () => onComplete(),
 * });
 *
 * // In render:
 * <button onClick={isLastStep ? onComplete : next}>
 *   {isLastStep ? 'Continuar' : 'Siguiente'}
 * </button>
 * ```
 */
export function useStepWalkthrough<TStep>({
  steps,
  onComplete,
  initialStep = 0,
}: UseStepWalkthroughOptions<TStep>): UseStepWalkthroughReturn<TStep> {
  const [currentIndex, setCurrentIndex] = useState(initialStep);

  const totalSteps = steps.length;
  const isLastStep = currentIndex === totalSteps - 1;
  const isFirstStep = currentIndex === 0;
  const step = steps[currentIndex];
  const stepNumber = currentIndex + 1;
  const progress = totalSteps > 1 ? (currentIndex / (totalSteps - 1)) * 100 : 100;

  const next = useCallback(() => {
    if (isLastStep) {
      onComplete?.();
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, totalSteps - 1));
    }
  }, [isLastStep, onComplete, totalSteps]);

  const previous = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  const goToStep = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalSteps) {
        setCurrentIndex(index);
      }
    },
    [totalSteps]
  );

  return useMemo(
    () => ({
      step,
      currentIndex,
      stepNumber,
      totalSteps,
      isLastStep,
      isFirstStep,
      progress,
      next,
      previous,
      reset,
      goToStep,
    }),
    [step, currentIndex, stepNumber, totalSteps, isLastStep, isFirstStep, progress, next, previous, reset, goToStep]
  );
}
