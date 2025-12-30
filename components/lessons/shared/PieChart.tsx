'use client';

import { cn } from '@/lib/utils';

export interface PieChartData {
  category: string;
  value: number;
  color: string;
}

export interface PieChartProps {
  /** Data for each slice */
  data: PieChartData[];
  /** Show legend below chart */
  showLegend?: boolean;
  /** Show percentage labels in legend */
  showPercentages?: boolean;
  /** Show absolute values in legend */
  showValues?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Enable interactive mode (hover effects) */
  interactive?: boolean;
  /** Index of slice to highlight */
  highlightIndex?: number;
  /** Callback when a slice is clicked */
  onSliceClick?: (index: number) => void;
  /** Render as donut chart */
  donut?: boolean;
  /** Custom class name */
  className?: string;
}

const sizeConfig = {
  sm: { dimension: 120, donutHole: 40 },
  md: { dimension: 180, donutHole: 60 },
  lg: { dimension: 240, donutHole: 80 },
};

export default function PieChart({
  data,
  showLegend = true,
  showPercentages = false,
  showValues = false,
  size = 'md',
  interactive = false,
  highlightIndex,
  onSliceClick,
  donut = false,
  className,
}: PieChartProps) {
  const config = sizeConfig[size];
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Generate conic-gradient string
  const generateGradient = () => {
    if (total === 0) return '#E5E7EB'; // gray fallback

    let currentAngle = 0;
    const stops: string[] = [];

    data.forEach((item) => {
      const percentage = item.value / total;
      const endAngle = currentAngle + percentage * 360;

      stops.push(`${item.color} ${currentAngle}deg ${endAngle}deg`);
      currentAngle = endAngle;
    });

    return `conic-gradient(${stops.join(', ')})`;
  };

  const getPercentage = (value: number) => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };

  return (
    <div className={cn('flex flex-col items-center', className)}>
      {/* Pie chart */}
      <div
        className={cn(
          'relative rounded-full transition-all duration-500',
          interactive && 'cursor-pointer'
        )}
        style={{
          width: config.dimension,
          height: config.dimension,
          background: generateGradient(),
        }}
        onClick={() => {
          if (interactive && onSliceClick && highlightIndex !== undefined) {
            onSliceClick(highlightIndex);
          }
        }}
      >
        {/* Donut hole */}
        {donut && (
          <div
            className="absolute bg-white dark:bg-gray-900 rounded-full"
            style={{
              width: config.donutHole,
              height: config.donutHole,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}

        {/* Center label showing total or highlighted value */}
        {donut && (
          <div
            className="absolute flex flex-col items-center justify-center"
            style={{
              width: config.donutHole,
              height: config.donutHole,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <span className="text-xs text-gray-500 dark:text-gray-400">Total</span>
            <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
              {total}
            </span>
          </div>
        )}

        {/* Highlight ring */}
        {highlightIndex !== undefined && highlightIndex >= 0 && (
          <div
            className="absolute inset-0 rounded-full ring-4 ring-amber-400 ring-offset-2 animate-pulse"
            style={{ pointerEvents: 'none' }}
          />
        )}
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {data.map((item, index) => {
            const isHighlighted = highlightIndex === index;
            const percentage = getPercentage(item.value);

            return (
              <div
                key={`${item.category}-${index}`}
                className={cn(
                  'flex items-center gap-2 px-2 py-1 rounded transition-all',
                  interactive && 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800',
                  isHighlighted && 'bg-amber-50 dark:bg-amber-900/30 ring-1 ring-amber-300'
                )}
                onClick={() => onSliceClick?.(index)}
              >
                <div
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span
                  className={cn(
                    'text-sm',
                    isHighlighted
                      ? 'text-amber-700 dark:text-amber-300 font-semibold'
                      : 'text-gray-700 dark:text-gray-300'
                  )}
                >
                  {item.category}
                  {showValues && ` (${item.value})`}
                  {showPercentages && ` (${percentage}%)`}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
