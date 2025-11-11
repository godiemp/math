import { useState, useEffect } from 'react';
import type { Question } from '@/lib/types';
import { getRandomQuestions } from '@/lib/questions';

interface UseQuizStateProps {
  level: 'M1' | 'M2';
  subject?: 'números' | 'álgebra' | 'geometría' | 'probabilidad';
  questionCount: number;
  replayQuestions?: Question[];
}

/**
 * Fetch adaptive questions from the backend
 */
async function fetchAdaptiveQuestions(
  level: 'M1' | 'M2',
  count: number,
  subject?: 'números' | 'álgebra' | 'geometría' | 'probabilidad'
): Promise<Question[]> {
  const params = new URLSearchParams({
    level,
    count: count.toString(),
  });

  if (subject) {
    params.append('subject', subject);
  }

  const response = await fetch(`/api/quiz/adaptive-questions?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies for authentication
  });

  if (!response.ok) {
    throw new Error('Failed to fetch adaptive questions');
  }

  const data = await response.json();
  return data.questions;
}

/**
 * Manages core quiz state: questions, current index, user answers
 */
export const useQuizState = ({
  level,
  subject,
  questionCount,
  replayQuestions
}: UseQuizStateProps) => {
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);

  // Initialize quiz questions
  useEffect(() => {
    async function loadQuestions() {
      setIsLoadingQuestions(true);

      try {
        // If replay questions provided, use those
        if (replayQuestions && replayQuestions.length > 0) {
          setQuizQuestions(replayQuestions);
          setUserAnswers(new Array(replayQuestions.length).fill(null));
          setIsLoadingQuestions(false);
          return;
        }

        // Try to fetch adaptive questions from backend
        try {
          const adaptiveQuestions = await fetchAdaptiveQuestions(level, questionCount, subject);
          setQuizQuestions(adaptiveQuestions);
          setUserAnswers(new Array(adaptiveQuestions.length).fill(null));
        } catch (error) {
          // If adaptive fetch fails, fall back to local random selection
          console.warn('Adaptive questions failed, using random selection:', error);
          const randomQuestions = getRandomQuestions(level, questionCount, subject);
          setQuizQuestions(randomQuestions);
          setUserAnswers(new Array(randomQuestions.length).fill(null));
        }
      } finally {
        setIsLoadingQuestions(false);
      }
    }

    loadQuestions();
  }, [level, subject, questionCount, replayQuestions]);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (!quizSubmitted) {
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestionIndex] = answerIndex;
      setUserAnswers(newAnswers);
    }
  };

  const resetQuiz = (newQuestions: Question[]) => {
    setQuizQuestions(newQuestions);
    setUserAnswers(new Array(newQuestions.length).fill(null));
    setCurrentQuestionIndex(0);
    setQuizSubmitted(false);
  };

  return {
    quizQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    userAnswers,
    quizSubmitted,
    setQuizSubmitted,
    currentQuestion,
    handleAnswerSelect,
    resetQuiz,
    isLoadingQuestions,
  };
};
