'use client';

import { cn } from '@/lib/utils';
import { colors, ProgressDotStatus } from '@/lib/lessons/styles';

export interface ProgressDotsProps<T> {
  items: T[];
  currentIndex: number;
  getStatus: (item: T, index: number) => ProgressDotStatus;
  renderLabel?: (item: T, index: number, status: ProgressDotStatus) => React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-10 h-10 text-base',
};

export function ProgressDots<T>({
  items,
  currentIndex,
  getStatus,
  renderLabel,
  size = 'md',
  className,
}: ProgressDotsProps<T>) {
  return (
    <div className={cn('flex items-center justify-between px-2', className)}>
      <div className="text-sm text-gray-600 dark:text-gray-300">
        {currentIndex + 1} de {items.length}
      </div>
      <div className="flex gap-1">
        {items.map((item, index) => {
          const status = getStatus(item, index);
          const label = renderLabel
            ? renderLabel(item, index, status)
            : status === 'correct'
              ? '✓'
              : status === 'incorrect'
                ? '✗'
                : index + 1;

          return (
            <div
              key={index}
              className={cn(
                'rounded-full flex items-center justify-center font-bold transition-all',
                sizeClasses[size],
                colors.progressDot[status]
              )}
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
