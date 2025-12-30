'use client';

import { useState, useCallback, useMemo } from 'react';

/**
 * Options for useExampleReveal hook
 * @template TExample - The type of each example
 */
export interface UseExampleRevealOptions<TExample> {
  /** Array of examples to reveal */
  examples: TExample[];
  /** Function to get unique ID from example */
  getExampleId: (example: TExample) => string;
  /** Callback when all examples have been completed */
  onAllCompleted?: () => void;
  /** Initial example index (default: 0) */
  initialIndex?: number;
}

/**
 * Return type for useExampleReveal hook
 * @template TExample - The type of each example
 */
export interface UseExampleRevealReturn<TExample> {
  /** Current example data */
  example: TExample;
  /** Current example index (0-based) */
  currentIndex: number;
  /** Total number of examples */
  totalExamples: number;
  /** Whether current example has been revealed */
  isRevealed: boolean;
  /** Whether this is the last example */
  isLastExample: boolean;
  /** Whether all examples have been revealed/completed */
  allCompleted: boolean;
  /** Set of completed example IDs */
  completedIds: Set<string>;
  /** Number of completed examples */
  completedCount: number;
  /** Reveal the current example */
  reveal: () => void;
  /** Move to next example (also marks current as completed if revealed) */
  nextExample: () => void;
  /** Reset to beginning */
  reset: () => void;
  /** Mark current as completed and call onAllCompleted if last */
  complete: () => void;
}

/**
 * Hook for managing example exploration with reveal animations.
 *
 * This hook is ideal for:
 * - Showing a series of examples one at a time
 * - Each example has a "reveal" or "show animation" step
 * - Tracking which examples have been completed
 *
 * @example
 * ```tsx
 * const EXAMPLES = [
 *   { id: 'ex1', standard: '3,000', scientific: '3 × 10³' },
 *   { id: 'ex2', standard: '45,000,000', scientific: '4.5 × 10⁷' },
 * ];
 *
 * const {
 *   example, isRevealed, isLastExample,
 *   reveal, nextExample, complete, completedIds
 * } = useExampleReveal({
 *   examples: EXAMPLES,
 *   getExampleId: (ex) => ex.id,
 *   onAllCompleted: () => onComplete(),
 * });
 *
 * // In render:
 * {!isRevealed ? (
 *   <button onClick={reveal}>Ver la transformación</button>
 * ) : isLastExample ? (
 *   <button onClick={complete}>Continuar</button>
 * ) : (
 *   <button onClick={nextExample}>Siguiente ejemplo</button>
 * )}
 * ```
 */
export function useExampleReveal<TExample>({
  examples,
  getExampleId,
  onAllCompleted,
  initialIndex = 0,
}: UseExampleRevealOptions<TExample>): UseExampleRevealReturn<TExample> {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isRevealed, setIsRevealed] = useState(false);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const totalExamples = examples.length;
  const example = examples[currentIndex];
  const exampleId = getExampleId(example);
  const isLastExample = currentIndex === totalExamples - 1;
  const completedCount = completedIds.size;
  const allCompleted = completedCount >= totalExamples - 1 && isRevealed;

  const reveal = useCallback(() => {
    setIsRevealed(true);
  }, []);

  const markCurrentCompleted = useCallback(() => {
    setCompletedIds((prev) => {
      if (prev.has(exampleId)) return prev;
      const next = new Set(prev);
      next.add(exampleId);
      return next;
    });
  }, [exampleId]);

  const nextExample = useCallback(() => {
    if (isRevealed) {
      markCurrentCompleted();
    }
    if (!isLastExample) {
      setCurrentIndex((prev) => prev + 1);
      setIsRevealed(false);
    }
  }, [isRevealed, isLastExample, markCurrentCompleted]);

  const complete = useCallback(() => {
    markCurrentCompleted();
    onAllCompleted?.();
  }, [markCurrentCompleted, onAllCompleted]);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setIsRevealed(false);
    setCompletedIds(new Set());
  }, []);

  return useMemo(
    () => ({
      example,
      currentIndex,
      totalExamples,
      isRevealed,
      isLastExample,
      allCompleted,
      completedIds,
      completedCount,
      reveal,
      nextExample,
      reset,
      complete,
    }),
    [
      example,
      currentIndex,
      totalExamples,
      isRevealed,
      isLastExample,
      allCompleted,
      completedIds,
      completedCount,
      reveal,
      nextExample,
      reset,
      complete,
    ]
  );
}
