'use client';

import { useState, useCallback, useMemo } from 'react';

/**
 * Options for useDeductionSteps hook
 */
export interface UseDeductionStepsOptions {
  /** Maximum number of steps (0 to maxSteps) */
  maxSteps: number;
  /** Initial step (default: 0) */
  initialStep?: number;
  /** Callback when reaching the final step */
  onComplete?: () => void;
}

/**
 * Return type for useDeductionSteps hook
 */
export interface UseDeductionStepsReturn {
  /** Current step number (0 to maxSteps) */
  step: number;
  /** Whether on the first step (0) */
  isFirstStep: boolean;
  /** Whether on the final step */
  isFinalStep: boolean;
  /** Steps that have been revealed (useful for conditional rendering) */
  revealedSteps: number[];
  /** Advance to next step */
  nextStep: () => void;
  /** Go back one step */
  prevStep: () => void;
  /** Reset to step 0 */
  resetSteps: () => void;
  /** Jump to a specific step */
  goToStep: (step: number) => void;
  /** Check if a specific step has been revealed */
  isStepRevealed: (stepNum: number) => boolean;
}

/**
 * Hook for managing step-by-step deduction/reveal within a single topic or phase.
 *
 * This hook is ideal for:
 * - Step-by-step mathematical deductions (show step 1, then 2, then 3...)
 * - Progressive reveal of content within a single concept
 * - Animated explanations where each step builds on the previous
 *
 * @example
 * ```tsx
 * const { step, nextStep, isFinalStep, isStepRevealed } = useDeductionSteps({
 *   maxSteps: 3,
 *   onComplete: () => setPhase('nextPhase'),
 * });
 *
 * // In render:
 * {isStepRevealed(1) && <div>Step 1: Expand the equation</div>}
 * {isStepRevealed(2) && <div>Step 2: Simplify</div>}
 * {isStepRevealed(3) && <div>Step 3: The pattern!</div>}
 *
 * <button onClick={nextStep}>
 *   {isFinalStep ? 'Next Topic' : 'Next Step'}
 * </button>
 * ```
 */
export function useDeductionSteps({
  maxSteps,
  initialStep = 0,
  onComplete,
}: UseDeductionStepsOptions): UseDeductionStepsReturn {
  const [step, setStep] = useState(initialStep);

  const isFirstStep = step === 0;
  const isFinalStep = step >= maxSteps;

  // Array of revealed steps for conditional rendering
  const revealedSteps = useMemo(() => {
    return Array.from({ length: step + 1 }, (_, i) => i);
  }, [step]);

  const isStepRevealed = useCallback(
    (stepNum: number) => stepNum <= step,
    [step]
  );

  const nextStep = useCallback(() => {
    if (step < maxSteps) {
      setStep((prev) => prev + 1);
    } else {
      onComplete?.();
    }
  }, [step, maxSteps, onComplete]);

  const prevStep = useCallback(() => {
    setStep((prev) => Math.max(0, prev - 1));
  }, []);

  const resetSteps = useCallback(() => {
    setStep(0);
  }, []);

  const goToStep = useCallback(
    (targetStep: number) => {
      if (targetStep >= 0 && targetStep <= maxSteps) {
        setStep(targetStep);
      }
    },
    [maxSteps]
  );

  return useMemo(
    () => ({
      step,
      isFirstStep,
      isFinalStep,
      revealedSteps,
      nextStep,
      prevStep,
      resetSteps,
      goToStep,
      isStepRevealed,
    }),
    [step, isFirstStep, isFinalStep, revealedSteps, nextStep, prevStep, resetSteps, goToStep, isStepRevealed]
  );
}
