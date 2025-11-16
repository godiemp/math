'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { QuestionFeedbackModal } from './QuestionFeedbackModal';
import { analytics } from '@/lib/analytics';
import type { Question } from '@/lib/types';

interface ReportQuestionButtonProps {
  question: Question;
  userAnswer?: number;
  className?: string;
  size?: 'sm' | 'md';
}

export const ReportQuestionButton: React.FC<ReportQuestionButtonProps> = ({
  question,
  userAnswer,
  className,
  size = 'sm',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    analytics.track('question_feedback_opened', {
      questionId: question.id,
      questionLevel: question.level,
      questionSubject: question.subject,
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className={cn(
          'inline-flex items-center gap-1.5 text-black/50 dark:text-white/50',
          'hover:text-[#FF453A] dark:hover:text-[#FF453A]',
          'transition-colors duration-[180ms]',
          size === 'sm' && 'text-[13px]',
          size === 'md' && 'text-[15px]',
          className
        )}
        title="Reportar problema con esta pregunta"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={cn(
            size === 'sm' && 'w-4 h-4',
            size === 'md' && 'w-5 h-5'
          )}
        >
          <path
            fillRule="evenodd"
            d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z"
            clipRule="evenodd"
          />
        </svg>
        Reportar problema
      </button>

      <QuestionFeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        question={question}
        userAnswer={userAnswer}
      />
    </>
  );
};

ReportQuestionButton.displayName = 'ReportQuestionButton';
