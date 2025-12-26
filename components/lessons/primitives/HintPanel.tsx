'use client';

import { Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { colors } from '@/lib/lessons/styles';

export interface HintPanelProps {
  hint: string;
  isVisible: boolean;
  onToggle: () => void;
  hideToggle?: boolean;
  className?: string;
}

export function HintPanel({
  hint,
  isVisible,
  onToggle,
  hideToggle = false,
  className,
}: HintPanelProps) {
  return (
    <div className={className}>
      {!hideToggle && (
        <button
          onClick={onToggle}
          className={cn(
            'flex items-center gap-1 text-sm mb-2',
            colors.hint.icon,
            'hover:text-amber-700 dark:hover:text-amber-300'
          )}
        >
          <Lightbulb size={16} />
          <span>{isVisible ? 'Ocultar pista' : 'Ver pista'}</span>
        </button>
      )}

      {isVisible && (
        <div
          className={cn(
            'rounded-lg p-4 animate-fadeIn',
            colors.hint.container
          )}
        >
          <div className="flex items-start gap-2">
            <Lightbulb className={cn('w-5 h-5 flex-shrink-0 mt-0.5', colors.hint.icon)} />
            <p className={cn('text-sm', colors.hint.text)}>{hint}</p>
          </div>
        </div>
      )}
    </div>
  );
}
