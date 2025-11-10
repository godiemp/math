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
 * Manages core quiz state: questions, current index, user answers
 */
export const useQuizState = ({
  level,
  subject,
  questionCount,
  replayQuestions
}: UseQuizStateProps) => {
  // Use lazy initialization to load questions immediately on first render
  const [quizQuestions, setQuizQuestions] = useState<Question[]>(() => {
    return replayQuestions && replayQuestions.length > 0
      ? replayQuestions
      : getRandomQuestions(level, questionCount, subject);
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(
    () => new Array(quizQuestions.length).fill(null)
  );
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Update questions if parameters change
  useEffect(() => {
    const questionsToUse = replayQuestions && replayQuestions.length > 0
      ? replayQuestions
      : getRandomQuestions(level, questionCount, subject);

    setQuizQuestions(questionsToUse);
    setUserAnswers(new Array(questionsToUse.length).fill(null));
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
  };
};
