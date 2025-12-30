'use client';

import { cn } from '@/lib/utils';

export interface LineChartData {
  /** X-axis label (e.g., "Día 1", "Lunes") */
  label: string;
  /** Y-axis value */
  value: number;
}

export interface LineChartProps {
  /** Data points for the line chart */
  data: LineChartData[];
  /** Show value labels at each point */
  showValues?: boolean;
  /** Show labels on X-axis */
  showLabels?: boolean;
  /** Show grid lines */
  showGrid?: boolean;
  /** Animate line drawing */
  animated?: boolean;
  /** Height variant */
  height?: 'sm' | 'md' | 'lg';
  /** Color of the line */
  lineColor?: string;
  /** Color of the data points */
  pointColor?: string;
  /** Index of point to highlight */
  highlightIndex?: number;
  /** Callback when a point is clicked */
  onPointClick?: (index: number) => void;
  /** Custom max value (defaults to max in data) */
  maxValue?: number;
  /** Custom min value (defaults to 0 or min in data if negative) */
  minValue?: number;
  /** Custom class name */
  className?: string;
}

const DEFAULT_LINE_COLOR = '#3B82F6'; // blue
const DEFAULT_POINT_COLOR = '#1D4ED8'; // darker blue

export default function LineChart({
  data,
  showValues = true,
  showLabels = true,
  showGrid = true,
  animated = true,
  height = 'md',
  lineColor = DEFAULT_LINE_COLOR,
  pointColor = DEFAULT_POINT_COLOR,
  highlightIndex,
  onPointClick,
  maxValue,
  minValue,
  className,
}: LineChartProps) {
  const heightConfig = {
    sm: 120,
    md: 180,
    lg: 240,
  };

  const chartHeight = heightConfig[height];
  const padding = { top: 30, right: 20, bottom: 40, left: 20 };
  const chartWidth = 100; // percentage-based

  // Calculate value range
  const values = data.map((d) => d.value);
  const dataMin = Math.min(...values);
  const dataMax = Math.max(...values);
  const computedMin = minValue ?? (dataMin < 0 ? dataMin : 0);
  const computedMax = maxValue ?? dataMax;
  const valueRange = computedMax - computedMin || 1;

  // Calculate point positions as percentages
  const getX = (index: number) => {
    if (data.length === 1) return 50;
    return (index / (data.length - 1)) * 100;
  };

  const getY = (value: number) => {
    return 100 - ((value - computedMin) / valueRange) * 100;
  };

  // Generate SVG path
  const pathData = data
    .map((point, index) => {
      const x = getX(index);
      const y = getY(point.value);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  return (
    <div className={cn('w-full', className)}>
      {/* Chart container */}
      <div className="relative px-4" style={{ height: chartHeight }}>
        {/* SVG Chart */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full"
          style={{ overflow: 'visible' }}
        >
          {/* Grid lines */}
          {showGrid && (
            <g className="text-gray-200 dark:text-gray-700">
              {[0, 25, 50, 75, 100].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="100"
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="0.3"
                  strokeDasharray="2,2"
                />
              ))}
            </g>
          )}

          {/* Line path */}
          <path
            d={pathData}
            fill="none"
            stroke={lineColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            className={cn(animated && 'animate-draw-line')}
          />

          {/* Data points */}
          {data.map((point, index) => {
            const x = getX(index);
            const y = getY(point.value);
            const isHighlighted = highlightIndex === index;

            return (
              <g key={`point-${index}`}>
                <circle
                  cx={x}
                  cy={y}
                  r={isHighlighted ? 3 : 2}
                  fill={isHighlighted ? '#F59E0B' : pointColor}
                  stroke="white"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  className={cn(
                    onPointClick && 'cursor-pointer hover:r-3',
                    animated && 'transition-all duration-300'
                  )}
                  onClick={() => onPointClick?.(index)}
                />
              </g>
            );
          })}
        </svg>

        {/* Value labels (positioned absolutely) */}
        {showValues && (
          <div className="absolute inset-0 pointer-events-none">
            {data.map((point, index) => {
              const xPercent = getX(index);
              const yPercent = getY(point.value);
              const isHighlighted = highlightIndex === index;

              return (
                <div
                  key={`value-${index}`}
                  className={cn(
                    'absolute text-xs font-semibold transform -translate-x-1/2 -translate-y-full pb-1',
                    isHighlighted
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-gray-700 dark:text-gray-300'
                  )}
                  style={{
                    left: `${xPercent}%`,
                    top: `${yPercent}%`,
                  }}
                >
                  {point.value}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* X-axis line */}
      <div className="h-0.5 bg-gray-300 dark:bg-gray-600 mx-4" />

      {/* Labels */}
      {showLabels && (
        <div className="flex justify-between px-4 mt-2">
          {data.map((point, index) => {
            const isHighlighted = highlightIndex === index;
            return (
              <div
                key={`label-${index}`}
                className="text-center flex-1"
                style={{
                  maxWidth: `${100 / data.length}%`,
                }}
              >
                <span
                  className={cn(
                    'text-xs transition-all duration-300',
                    isHighlighted
                      ? 'text-amber-600 dark:text-amber-400 font-bold'
                      : 'text-gray-600 dark:text-gray-400'
                  )}
                >
                  {point.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
