'use client';

import { useState, useCallback, useMemo } from 'react';

export interface UseMultipleChoiceOptions<T> {
  items: T[];
  getCorrectAnswer: (item: T) => string | number;
  passThreshold?: number;
}

export interface UseMultipleChoiceReturn<T> {
  // State
  currentIndex: number;
  currentItem: T;
  selectedAnswer: string | number | null;
  showFeedback: boolean;
  correctCount: number;
  answers: (string | number | null)[];
  isCorrect: boolean;
  isComplete: boolean;
  passed: boolean;

  // Actions
  select: (answer: string | number) => void;
  check: () => void;
  next: () => void;
  reset: () => void;
}

export function useMultipleChoice<T>({
  items,
  getCorrectAnswer,
  passThreshold,
}: UseMultipleChoiceOptions<T>): UseMultipleChoiceReturn<T> {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState<(string | number | null)[]>(Array(items.length).fill(null));

  const isComplete = currentIndex >= items.length;
  const currentItem = isComplete ? items[0] : items[currentIndex];
  const correctAnswer = getCorrectAnswer(currentItem);
  const isCorrect = selectedAnswer === correctAnswer;

  const requiredCorrect = passThreshold ?? Math.ceil(items.length * 0.7);
  const passed = correctCount >= requiredCorrect;

  const select = useCallback(
    (answer: string | number) => {
      if (showFeedback) return;
      setSelectedAnswer(answer);
    },
    [showFeedback]
  );

  const check = useCallback(() => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);

    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedAnswer;
    setAnswers(newAnswers);

    if (selectedAnswer === correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    }
  }, [selectedAnswer, answers, currentIndex, correctAnswer]);

  const next = useCallback(() => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCorrectCount(0);
    setAnswers(Array(items.length).fill(null));
  }, [items.length]);

  return useMemo(
    () => ({
      currentIndex,
      currentItem,
      selectedAnswer,
      showFeedback,
      correctCount,
      answers,
      isCorrect,
      isComplete,
      passed,
      select,
      check,
      next,
      reset,
    }),
    [
      currentIndex,
      currentItem,
      selectedAnswer,
      showFeedback,
      correctCount,
      answers,
      isCorrect,
      isComplete,
      passed,
      select,
      check,
      next,
      reset,
    ]
  );
}
