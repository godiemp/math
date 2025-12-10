'use client';

import { cn } from '@/lib/utils';

interface FactorGridProps {
  number: number;
  maxDisplay?: number;
  highlightedFactors?: number[];
  commonFactors?: number[];
  interactive?: boolean;
  onFactorClick?: (factor: number, isDivisor: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'blue' | 'green' | 'purple' | 'orange';
  showLabel?: boolean;
  label?: string;
  showFactorList?: boolean;
}

function getDivisors(n: number): number[] {
  const divisors: number[] = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) divisors.push(i);
  }
  return divisors;
}

const colorSchemes = {
  blue: {
    divisor: 'bg-blue-500 text-white',
    divisorHover: 'hover:bg-blue-600',
    common: 'ring-2 ring-yellow-400 ring-offset-2',
    badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    commonBadge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  },
  green: {
    divisor: 'bg-green-500 text-white',
    divisorHover: 'hover:bg-green-600',
    common: 'ring-2 ring-yellow-400 ring-offset-2',
    badge: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    commonBadge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  },
  purple: {
    divisor: 'bg-purple-500 text-white',
    divisorHover: 'hover:bg-purple-600',
    common: 'ring-2 ring-yellow-400 ring-offset-2',
    badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    commonBadge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  },
  orange: {
    divisor: 'bg-orange-500 text-white',
    divisorHover: 'hover:bg-orange-600',
    common: 'ring-2 ring-yellow-400 ring-offset-2',
    badge: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    commonBadge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  },
};

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

export default function FactorGrid({
  number,
  maxDisplay,
  highlightedFactors = [],
  commonFactors = [],
  interactive = false,
  onFactorClick,
  size = 'md',
  colorScheme = 'blue',
  showLabel = true,
  label,
  showFactorList = true,
}: FactorGridProps) {
  const divisors = getDivisors(number);
  const displayMax = maxDisplay || number;
  const colors = colorSchemes[colorScheme];
  const cellSize = sizeClasses[size];

  // Calculate grid columns based on displayMax
  const cols = displayMax <= 10 ? displayMax : displayMax <= 20 ? 10 : 12;

  return (
    <div className="space-y-3">
      {showLabel && (
        <p className="text-center font-medium text-gray-700 dark:text-gray-300">
          {label || `Divisores de ${number}`}
        </p>
      )}

      <div
        className="grid gap-1 justify-center"
        style={{ gridTemplateColumns: `repeat(${Math.min(cols, displayMax)}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: displayMax }, (_, i) => i + 1).map((n) => {
          const isDivisor = divisors.includes(n);
          const isHighlighted = highlightedFactors.includes(n);
          const isCommon = commonFactors.includes(n);

          return (
            <button
              key={n}
              onClick={() => interactive && onFactorClick?.(n, isDivisor)}
              disabled={!interactive}
              className={cn(
                'rounded-lg flex items-center justify-center font-bold transition-all',
                cellSize,
                isDivisor
                  ? cn(colors.divisor, interactive && colors.divisorHover)
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500',
                isCommon && colors.common,
                isHighlighted && 'scale-110 shadow-lg',
                interactive && 'cursor-pointer hover:scale-105',
                !interactive && 'cursor-default',
              )}
            >
              {n}
            </button>
          );
        })}
      </div>

      {showFactorList && (
        <div className="flex flex-wrap gap-1.5 justify-center">
          {divisors.map((d) => (
            <span
              key={d}
              className={cn(
                'px-2.5 py-1 rounded-full text-xs font-medium transition-all',
                commonFactors.includes(d) ? colors.commonBadge : colors.badge,
                highlightedFactors.includes(d) && 'scale-110 shadow-md',
              )}
            >
              {d}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
