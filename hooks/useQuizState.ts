import { useState, useEffect } from 'react';
import type { Question } from '@/lib/types';
import { getRandomQuestions } from '@/lib/questions';

interface UseQuizStateProps {
  level: 'M1' | 'M2';
  subject?: 'números' | 'álgebra' | 'geometría' | 'probabilidad';
  questionCount: number;
  replayQuestions?: Question[];
  initialAnswers?: (number | null)[];
  initialIndex?: number;
}

/**
 * Manages core quiz state: questions, current index, user answers
 */
export const useQuizState = ({
  level,
  subject,
  questionCount,
  replayQuestions,
  initialAnswers,
  initialIndex
}: UseQuizStateProps) => {
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialIndex || 0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Initialize quiz questions
  useEffect(() => {
    const questionsToUse = replayQuestions && replayQuestions.length > 0
      ? replayQuestions
      : getRandomQuestions(level, questionCount, subject);

    setQuizQuestions(questionsToUse);
    setUserAnswers(initialAnswers || new Array(questionsToUse.length).fill(null));
    setCurrentQuestionIndex(initialIndex || 0);
  }, [level, subject, questionCount, replayQuestions, initialAnswers, initialIndex]);

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
  };
};
