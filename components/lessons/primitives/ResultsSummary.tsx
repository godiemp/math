'use client';

import { RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { colors } from '@/lib/lessons/styles';
import { ActionButton } from './ActionButton';

export interface ResultsSummaryProps<T> {
  correctCount: number;
  totalCount: number;
  passed: boolean;
  passThreshold: number;
  successMessage?: string;
  failureMessage?: string;
  successSubtext?: string;
  failureSubtext?: string;
  items: T[];
  renderItem: (item: T, index: number, isCorrect: boolean) => React.ReactNode;
  getIsCorrect: (item: T, index: number) => boolean;
  onRetry?: () => void;
  onContinue: () => void;
  continueLabel?: string;
  className?: string;
}

export function ResultsSummary<T>({
  correctCount,
  totalCount,
  passed,
  passThreshold,
  successMessage = '¡Excelente!',
  failureMessage = '¡Buen intento!',
  successSubtext,
  failureSubtext,
  items,
  renderItem,
  getIsCorrect,
  onRetry,
  onContinue,
  continueLabel = 'Continuar',
  className,
}: ResultsSummaryProps<T>) {
  const emoji = correctCount === totalCount ? '🏆' : passed ? '🌟' : '💪';
  const title = passed ? successMessage : failureMessage;
  const subtext = passed
    ? successSubtext ?? 'Dominas este tema'
    : failureSubtext ?? 'Sigue practicando para mejorar';

  return (
    <div className={cn('space-y-6 animate-fadeIn', className)}>
      {/* Score card */}
      <div
        className={cn(
          'rounded-2xl p-8 text-center',
          passed ? colors.result.passed : colors.result.failed
        )}
      >
        <div className="text-6xl mb-4">{emoji}</div>
        <h3
          className={cn(
            'text-2xl font-bold mb-2',
            passed
              ? 'text-green-800 dark:text-green-300'
              : 'text-amber-800 dark:text-amber-300'
          )}
        >
          {title}
        </h3>
        <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
          {correctCount} / {totalCount}
        </div>
        <p
          className={cn(
            passed
              ? 'text-green-700 dark:text-green-300'
              : 'text-amber-700 dark:text-amber-300'
          )}
        >
          {subtext}
        </p>
      </div>

      {/* Summary list */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Resumen:</h4>
        <div className="space-y-2">
          {items.map((item, index) => {
            const isCorrect = getIsCorrect(item, index);
            return (
              <div
                key={index}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-lg',
                  isCorrect
                    ? 'bg-green-50 dark:bg-green-900/30'
                    : 'bg-red-50 dark:bg-red-900/30'
                )}
              >
                {renderItem(item, index, isCorrect)}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center gap-4">
        {!passed && onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            <RotateCcw size={18} />
            <span>Intentar de nuevo</span>
          </button>
        )}
        <ActionButton onClick={onContinue} variant="secondary">
          {continueLabel}
        </ActionButton>
      </div>
    </div>
  );
}
