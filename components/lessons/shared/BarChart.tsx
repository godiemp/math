'use client';

import { cn } from '@/lib/utils';

export interface BarChartData {
  category: string;
  value: number;
  color?: string;
}

export interface BarChartProps {
  /** Data for each bar */
  data: BarChartData[];
  /** Show value labels on bars */
  showValues?: boolean;
  /** Show category labels below bars */
  showLabels?: boolean;
  /** Animate bars on mount/change */
  animated?: boolean;
  /** Height variant */
  height?: 'sm' | 'md' | 'lg';
  /** Display absolute values or percentages */
  valueType?: 'absolute' | 'percentage';
  /** Callback when a bar is clicked */
  onBarClick?: (index: number) => void;
  /** Index of bar to highlight */
  highlightIndex?: number;
  /** Custom max value (defaults to max in data) */
  maxValue?: number;
  /** Custom class name */
  className?: string;
}

const DEFAULT_COLORS = [
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // amber
  '#EF4444', // red
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#14B8A6', // teal
  '#F97316', // orange
];

export default function BarChart({
  data,
  showValues = true,
  showLabels = true,
  animated = true,
  height = 'md',
  valueType = 'absolute',
  onBarClick,
  highlightIndex,
  maxValue,
  className,
}: BarChartProps) {
  const heightConfig = {
    sm: 120,
    md: 180,
    lg: 240,
  };

  const chartHeight = heightConfig[height];
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const computedMax = maxValue ?? Math.max(...data.map((d) => d.value));

  const getBarHeight = (value: number) => {
    if (computedMax === 0) return 0;
    return (value / computedMax) * 100;
  };

  const getDisplayValue = (value: number) => {
    if (valueType === 'percentage') {
      return total > 0 ? `${Math.round((value / total) * 100)}%` : '0%';
    }
    return value.toString();
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Chart area */}
      <div
        className="flex items-end justify-center gap-2 px-4"
        style={{ height: chartHeight }}
      >
        {data.map((item, index) => {
          const barHeight = getBarHeight(item.value);
          const color = item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length];
          const isHighlighted = highlightIndex === index;

          return (
            <div
              key={`${item.category}-${index}`}
              className="flex-1 flex flex-col items-center justify-end h-full max-w-16"
            >
              {/* Value label above bar */}
              {showValues && item.value > 0 && (
                <span
                  className={cn(
                    'text-xs font-semibold mb-1 transition-all duration-300',
                    isHighlighted
                      ? 'text-amber-600 dark:text-amber-400 scale-110'
                      : 'text-gray-700 dark:text-gray-300'
                  )}
                >
                  {getDisplayValue(item.value)}
                </span>
              )}

              {/* Bar */}
              <div
                onClick={() => onBarClick?.(index)}
                className={cn(
                  'w-full rounded-t-md relative',
                  animated && 'transition-all duration-500 ease-out',
                  onBarClick && 'cursor-pointer hover:brightness-110',
                  isHighlighted && 'ring-2 ring-amber-400 ring-offset-2'
                )}
                style={{
                  height: `${barHeight}%`,
                  minHeight: item.value > 0 ? '4px' : '0',
                  backgroundColor: color,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* X-axis line */}
      <div className="h-0.5 bg-gray-300 dark:bg-gray-600 mx-4" />

      {/* Category labels */}
      {showLabels && (
        <div className="flex justify-center gap-2 px-4 mt-2">
          {data.map((item, index) => {
            const isHighlighted = highlightIndex === index;
            return (
              <div
                key={`label-${item.category}-${index}`}
                className="flex-1 max-w-16 text-center"
              >
                <span
                  className={cn(
                    'text-xs transition-all duration-300',
                    isHighlighted
                      ? 'text-amber-600 dark:text-amber-400 font-bold'
                      : 'text-gray-600 dark:text-gray-400'
                  )}
                >
                  {item.category}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
