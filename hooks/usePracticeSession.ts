import { useState, useCallback } from 'react';
import { api } from '@/lib/api-client';
import { getQuestionsBySubject, questions as allQuestions } from '@/lib/questions';
import type { Question } from '@/lib/types/core';

type AppState = 'selecting' | 'practicing' | 'loading';
type Subject = 'números' | 'álgebra' | 'geometría' | 'probabilidad';

interface Feedback {
  correct: boolean;
  message: string;
  explanation?: string;
}

function getRandomQuestion(focus: string, excludeIds: Set<string> = new Set()): Question | null {
  let pool: Question[];

  if (focus === 'surprise') {
    pool = allQuestions;
  } else {
    pool = getQuestionsBySubject(focus as Subject);
  }

  // Filter out already-seen problems
  const availablePool = pool.filter(q => !excludeIds.has(q.id));

  // If all problems seen, reset and use full pool
  const finalPool = availablePool.length > 0 ? availablePool : pool;

  if (finalPool.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * finalPool.length);
  return finalPool[randomIndex];
}

/**
 * Manages adaptive practice session state: problem selection, answers, feedback
 */
export function usePracticeSession() {
  const [state, setState] = useState<AppState>('selecting');
  const [selectedFocus, setSelectedFocus] = useState<string>('');
  const [currentProblem, setCurrentProblem] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [seenProblemIds, setSeenProblemIds] = useState<Set<string>>(new Set());

  const startPractice = useCallback((focus: string) => {
    setState('loading');
    setSelectedFocus(focus);
    setError(null);

    // Reset seen problems when starting a new session
    const newSeenIds = new Set<string>();
    const problem = getRandomQuestion(focus, newSeenIds);

    if (problem) {
      newSeenIds.add(problem.id);
      setSeenProblemIds(newSeenIds);
      setCurrentProblem(problem);
      setSelectedAnswer(null);
      setFeedback(null);
      setState('practicing');
    } else {
      setError('No hay problemas disponibles para este tema');
      setState('selecting');
    }
  }, []);

  const submitAnswer = useCallback(async (hintUsed: boolean) => {
    if (!currentProblem || selectedAnswer === null) return;

    const correct = selectedAnswer === currentProblem.correctAnswer;

    setFeedback({
      correct,
      message: correct ? '¡Muy bien!' : 'Revisa la explicación e intenta el siguiente.',
      explanation: correct ? undefined : currentProblem.explanation,
    });

    // Save attempt to backend (fire-and-forget)
    try {
      await api.post('/api/adaptive/attempt', {
        questionId: currentProblem.id,
        subject: currentProblem.subject,
        topic: currentProblem.topic || currentProblem.subject,
        difficulty: currentProblem.difficulty,
        userAnswer: selectedAnswer,
        correctAnswer: currentProblem.correctAnswer,
        isCorrect: correct,
        skills: currentProblem.skills || [],
        hintUsed,
        question: currentProblem.questionLatex,
        options: currentProblem.options,
        explanation: currentProblem.explanation,
      });
    } catch (err) {
      console.error('Failed to save attempt:', err);
      // Silently fail - don't block UX
    }
  }, [currentProblem, selectedAnswer]);

  const nextProblem = useCallback(() => {
    const problem = getRandomQuestion(selectedFocus, seenProblemIds);
    if (problem) {
      setSeenProblemIds(prev => new Set(prev).add(problem.id));
      setCurrentProblem(problem);
      setSelectedAnswer(null);
      setFeedback(null);
    }
  }, [selectedFocus, seenProblemIds]);

  const changeTopic = useCallback(() => {
    setState('selecting');
    setCurrentProblem(null);
    setSelectedAnswer(null);
    setFeedback(null);
    setError(null);
    setSeenProblemIds(new Set());
  }, []);

  return {
    // State
    state,
    selectedFocus,
    currentProblem,
    selectedAnswer,
    feedback,
    error,
    // Actions
    startPractice,
    setSelectedAnswer,
    submitAnswer,
    nextProblem,
    changeTopic,
  };
}
