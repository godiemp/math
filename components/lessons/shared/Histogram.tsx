'use client';

import { cn } from '@/lib/utils';

export interface HistogramData {
  /** Interval label, e.g., "[1-3)", "[3-5)" */
  interval: string;
  /** Frequency count for this interval */
  frequency: number;
  /** Optional custom color */
  color?: string;
}

export interface HistogramProps {
  /** Data for each bar/bin */
  data: HistogramData[];
  /** Show frequency labels on bars */
  showFrequencies?: boolean;
  /** Show interval labels below bars */
  showIntervals?: boolean;
  /** Animate bars on mount/change */
  animated?: boolean;
  /** Height variant */
  height?: 'sm' | 'md' | 'lg';
  /** Index of bar to highlight */
  highlightIndex?: number;
  /** Callback when a bar is clicked */
  onBarClick?: (index: number) => void;
  /** Custom max value (defaults to max in data) */
  maxFrequency?: number;
  /** Custom class name */
  className?: string;
}

const DEFAULT_COLOR = '#3B82F6'; // blue

export default function Histogram({
  data,
  showFrequencies = true,
  showIntervals = true,
  animated = true,
  height = 'md',
  highlightIndex,
  onBarClick,
  maxFrequency,
  className,
}: HistogramProps) {
  const heightConfig = {
    sm: 120,
    md: 180,
    lg: 240,
  };

  const chartHeight = heightConfig[height];
  const computedMax = maxFrequency ?? Math.max(...data.map((d) => d.frequency));

  const getBarHeight = (frequency: number) => {
    if (computedMax === 0) return 0;
    return (frequency / computedMax) * 100;
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Frequency labels row */}
      {showFrequencies && (
        <div className="flex justify-center px-4 mb-1">
          {data.map((item, index) => {
            const isHighlighted = highlightIndex === index;
            return (
              <div
                key={`freq-${item.interval}-${index}`}
                className="flex-1 max-w-20 text-center"
              >
                {item.frequency > 0 && (
                  <span
                    className={cn(
                      'text-xs font-semibold transition-all duration-300',
                      isHighlighted
                        ? 'text-amber-600 dark:text-amber-400 scale-110'
                        : 'text-gray-700 dark:text-gray-300'
                    )}
                  >
                    {item.frequency}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Chart area - bars only (contiguous for histogram) */}
      <div
        className="flex items-end justify-center px-4"
        style={{ height: chartHeight }}
      >
        {data.map((item, index) => {
          const barHeight = getBarHeight(item.frequency);
          const color = item.color || DEFAULT_COLOR;
          const isHighlighted = highlightIndex === index;

          return (
            <div
              key={`${item.interval}-${index}`}
              className="flex-1 max-w-20 h-full flex items-end"
            >
              {/* Bar */}
              <div
                onClick={() => onBarClick?.(index)}
                className={cn(
                  'w-full rounded-t-sm',
                  animated && 'transition-all duration-500 ease-out',
                  onBarClick && 'cursor-pointer hover:brightness-110',
                  isHighlighted && 'ring-2 ring-amber-400 ring-offset-2'
                )}
                style={{
                  height: `${barHeight}%`,
                  minHeight: item.frequency > 0 ? '4px' : '0',
                  backgroundColor: color,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* X-axis line */}
      <div className="h-0.5 bg-gray-300 dark:bg-gray-600 mx-4" />

      {/* Interval labels */}
      {showIntervals && (
        <div className="flex justify-center px-4 mt-2">
          {data.map((item, index) => {
            const isHighlighted = highlightIndex === index;
            return (
              <div
                key={`label-${item.interval}-${index}`}
                className="flex-1 max-w-20 text-center"
              >
                <span
                  className={cn(
                    'text-xs transition-all duration-300',
                    isHighlighted
                      ? 'text-amber-600 dark:text-amber-400 font-bold'
                      : 'text-gray-600 dark:text-gray-400'
                  )}
                >
                  {item.interval}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
