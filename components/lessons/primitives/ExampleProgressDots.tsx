'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { colors, ExploreDotStatus } from '@/lib/lessons/styles';

export interface ExampleProgressDotsProps {
  /** Total number of examples */
  total: number;
  /** Current example index (0-based) */
  currentIndex: number;
  /** Set of discovered example IDs */
  discoveredIds: Set<string>;
  /** Function to get example ID from index */
  getExampleId: (index: number) => string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show "X de Y" counter */
  showCounter?: boolean;
  /** Additional class name */
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-10 h-10 text-base',
};

const checkSizes = {
  sm: 12,
  md: 14,
  lg: 18,
};

export function ExampleProgressDots({
  total,
  currentIndex,
  discoveredIds,
  getExampleId,
  size = 'md',
  showCounter = true,
  className,
}: ExampleProgressDotsProps) {
  const getStatus = (index: number): ExploreDotStatus => {
    const id = getExampleId(index);
    if (discoveredIds.has(id)) return 'discovered';
    if (index === currentIndex) return 'current';
    return 'pending';
  };

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      {showCounter && (
        <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">
          {currentIndex + 1} de {total}
        </span>
      )}
      <div className="flex gap-1.5">
        {Array.from({ length: total }, (_, index) => {
          const status = getStatus(index);

          return (
            <div
              key={index}
              className={cn(
                'rounded-full flex items-center justify-center font-bold transition-all',
                sizeClasses[size],
                colors.exploreDot[status]
              )}
            >
              {status === 'discovered' ? (
                <Check size={checkSizes[size]} />
              ) : (
                index + 1
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
