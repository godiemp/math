'use client';

import type { Question } from '@/lib/types';
import ZenQuiz from './ZenQuiz';
import RapidFireQuiz from './RapidFireQuiz';

interface QuizProps {
  questions: Question[];
  level: 'M1' | 'M2';
  subject?: 'números' | 'álgebra' | 'geometría' | 'probabilidad';
  quizMode?: 'zen' | 'rapidfire' | 'standard';
  difficulty?: 'easy' | 'medium' | 'hard' | 'extreme';
  replayQuestions?: Question[];
  questionCount?: number;
}

/**
 * Main Quiz component - routes to mode-specific quiz components
 */
export default function Quiz({
  questions,
  level,
  subject,
  quizMode = 'zen',
  difficulty = 'medium',
  replayQuestions,
  questionCount,
}: QuizProps) {
  // Route to appropriate quiz mode component
  if (quizMode === 'rapidfire') {
    return (
      <RapidFireQuiz
        questions={questions}
        level={level}
        subject={subject}
        difficulty={difficulty}
        replayQuestions={replayQuestions}
      />
    );
  }

  // Default to Zen mode (includes 'zen' and 'standard' modes)
  return (
    <ZenQuiz
      questions={questions}
      level={level}
      subject={subject}
      replayQuestions={replayQuestions}
      questionCount={questionCount}
    />
  );
}
