import { useState, useEffect } from 'react';
import type { Question, QuestionAttempt } from '@/lib/types';
import { api } from '@/lib/api-client';
import { isAuthenticated } from '@/lib/auth';

interface UseQuizProgressProps {
  level: 'M1' | 'M2';
}

/**
 * Manages quiz progress tracking with localStorage and backend sync
 */
export const useQuizProgress = ({ level }: UseQuizProgressProps) => {
  const [score, setScore] = useState({ correct: 0, total: 0 });

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(`paes-progress-${level}`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setScore(progress);
    }
  }, [level]);

  /**
   * Submit quiz and save results
   */
  const submitQuiz = async (
    quizQuestions: Question[],
    userAnswers: (number | null)[],
    quizSessionId: string,
    aiConversation: Array<{ role: string; message: string; timestamp: number }>
  ) => {
    let correctCount = 0;
    const attempts: QuestionAttempt[] = [];

    quizQuestions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      const isCorrect = userAnswer !== null && userAnswer === question.correctAnswer;

      if (isCorrect) {
        correctCount++;
      }

      // Save ALL questions, including unanswered ones (use -1 for unanswered)
      const attempt: QuestionAttempt = {
        questionId: question.id,
        quizSessionId: quizSessionId, // Add session ID to track quiz sessions
        question: question.question,
        topic: question.topic,
        level: level,
        userAnswer: userAnswer !== null ? userAnswer : -1,
        correctAnswer: question.correctAnswer,
        isCorrect: isCorrect,
        timestamp: Date.now(),
        options: question.options,
        explanation: question.explanation,
        difficulty: question.difficulty,
        subject: question.subject,
        skills: question.skills,
      };
      attempts.push(attempt);
    });

    const newScore = {
      correct: score.correct + correctCount,
      total: score.total + quizQuestions.length
    };
    setScore(newScore);

    // Save progress to localStorage
    localStorage.setItem(`paes-progress-${level}`, JSON.stringify(newScore));

    // Save detailed question attempt history
    const historyKey = `paes-history-${level}`;
    const existingHistory = localStorage.getItem(historyKey);
    const history: QuestionAttempt[] = existingHistory ? JSON.parse(existingHistory) : [];

    // Add new attempts to the beginning of the array
    attempts.reverse().forEach(attempt => {
      history.unshift(attempt);
    });

    // Save updated history
    localStorage.setItem(historyKey, JSON.stringify(history));

    // Debug logging
    console.log('📝 Quiz Submitted - Debug Info:');
    console.log(`  Questions in quiz: ${quizQuestions.length}`);
    console.log(`  Attempts created: ${attempts.length}`);
    console.log(`  Total history size: ${history.length}`);
    console.log(`  Quiz Session ID: ${quizSessionId}`);
    console.log(`  Level: ${level}`);

    // Save quiz attempts to backend and update streak if user is authenticated
    if (isAuthenticated()) {
      try {
        // Save quiz attempts to backend with session ID and AI conversation
        if (attempts.length > 0) {
          await api.post('/api/quiz/attempts', {
            attempts,
            quizSessionId,
            aiConversation
          });
        }

        // Update streak
        await api.post('/api/streak/update');
      } catch (error) {
        console.error('Failed to save quiz attempts or update streak:', error);
        // Don't block the quiz submission if backend save fails
        // Data is already saved in localStorage as fallback
      }
    }

    return { correctCount, attempts };
  };

  return {
    score,
    submitQuiz,
  };
};
