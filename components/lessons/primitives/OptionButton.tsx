'use client';

import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { colors } from '@/lib/lessons/styles';
import { MathText } from '@/components/math/MathDisplay';

export interface OptionButtonProps {
  label: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  showFeedback: boolean;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'list' | 'grid';
  isMono?: boolean;
  className?: string;
}

export function OptionButton({
  label,
  index,
  isSelected,
  isCorrect,
  showFeedback,
  onClick,
  disabled = false,
  variant = 'list',
  isMono = false,
  className,
}: OptionButtonProps) {
  const letter = String.fromCharCode(65 + index);

  const getContainerClasses = () => {
    if (isSelected) {
      if (showFeedback) {
        return isCorrect ? colors.option.selectedCorrect : colors.option.selectedIncorrect;
      }
      return colors.option.selected;
    }
    if (showFeedback && isCorrect) {
      return colors.option.revealed;
    }
    return colors.option.default;
  };

  const getBadgeClasses = () => {
    if (isSelected) {
      if (showFeedback) {
        return isCorrect ? colors.badge.correct : colors.badge.incorrect;
      }
      return 'bg-amber-500 text-white';
    }
    return 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300';
  };

  const renderBadgeContent = () => {
    if (showFeedback && isCorrect) {
      return <Check size={16} />;
    }
    if (showFeedback && isSelected && !isCorrect) {
      return <X size={16} />;
    }
    return letter;
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || showFeedback}
      className={cn(
        'p-4 rounded-xl border-2 transition-all font-medium text-left',
        variant === 'list' ? 'w-full' : '',
        getContainerClasses(),
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0',
            getBadgeClasses()
          )}
        >
          {renderBadgeContent()}
        </span>
        <span
          className={cn(
            'text-gray-800 dark:text-gray-200',
            isMono && 'font-mono'
          )}
        >
          {label.includes('$') ? <MathText content={label} /> : label}
        </span>
      </div>
    </button>
  );
}
