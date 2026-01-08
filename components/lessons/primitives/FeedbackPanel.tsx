'use client';

import { ReactNode } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { colors } from '@/lib/lessons/styles';

export interface FeedbackPanelProps {
  isCorrect: boolean;
  title?: string;
  explanation: ReactNode;
  className?: string;
}

export function FeedbackPanel({
  isCorrect,
  title,
  explanation,
  className,
}: FeedbackPanelProps) {
  const defaultTitle = isCorrect ? '¡Correcto!' : 'Incorrecto';
  const displayTitle = title ?? defaultTitle;

  return (
    <div
      className={cn(
        'p-4 rounded-xl animate-fadeIn',
        isCorrect ? colors.feedback.correct : colors.feedback.incorrect,
        className
      )}
    >
      <div className="flex items-start gap-3">
        {isCorrect ? (
          <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
        ) : (
          <X className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
        )}
        <div>
          <h4
            className={cn(
              'font-bold mb-1',
              isCorrect
                ? 'text-green-800 dark:text-green-300'
                : 'text-amber-800 dark:text-amber-300'
            )}
          >
            {displayTitle}
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">{explanation}</p>
        </div>
      </div>
    </div>
  );
}
