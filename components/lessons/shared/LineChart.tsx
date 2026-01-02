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
  /** Show Y-axis scale */
  showYAxis?: boolean;
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
const DEFAULT_POINT_COLOR = '#3B82F6'; // same blue for cohesion

export default function LineChart({
  data,
  showValues = false,
  showLabels = true,
  showGrid = true,
  showYAxis = true,
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
    sm: 160,
    md: 220,
    lg: 280,
  };

  const chartHeight = heightConfig[height];

  // Chart area dimensions (in SVG units)
  const svgWidth = 400;
  const svgHeight = 200;
  const padding = { top: 20, right: 20, bottom: 10, left: showYAxis ? 45 : 20 };
  const chartAreaWidth = svgWidth - padding.left - padding.right;
  const chartAreaHeight = svgHeight - padding.top - padding.bottom;

  // Calculate value range with some padding
  const values = data.map((d) => d.value);
  const dataMin = Math.min(...values);
  const dataMax = Math.max(...values);

  // Add 10% padding to the range for better visualization
  const range = dataMax - (minValue ?? (dataMin < 0 ? dataMin : 0));
  const paddedMin = minValue ?? (dataMin < 0 ? dataMin - range * 0.1 : 0);
  const paddedMax = maxValue ?? dataMax + range * 0.1;
  const valueRange = paddedMax - paddedMin || 1;

  // Calculate point positions
  const getX = (index: number) => {
    if (data.length === 1) return padding.left + chartAreaWidth / 2;
    return padding.left + (index / (data.length - 1)) * chartAreaWidth;
  };

  const getY = (value: number) => {
    return padding.top + chartAreaHeight - ((value - paddedMin) / valueRange) * chartAreaHeight;
  };

  // Generate SVG path
  const pathData = data
    .map((point, index) => {
      const x = getX(index);
      const y = getY(point.value);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  // Generate Y-axis ticks (5 ticks)
  const yTicks = [];
  const tickCount = 5;
  for (let i = 0; i <= tickCount; i++) {
    const value = paddedMin + (valueRange * i) / tickCount;
    yTicks.push({
      value: Math.round(value),
      y: getY(value),
    });
  }

  return (
    <div className={cn('w-full', className)}>
      {/* Chart container */}
      <div style={{ height: chartHeight }}>
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full"
        >
          {/* Y-axis line */}
          {showYAxis && (
            <line
              x1={padding.left}
              y1={padding.top}
              x2={padding.left}
              y2={padding.top + chartAreaHeight}
              stroke="currentColor"
              className="text-gray-300 dark:text-gray-600"
              strokeWidth="1"
            />
          )}

          {/* Grid lines and Y-axis labels */}
          {showGrid && yTicks.map((tick, i) => (
            <g key={`tick-${i}`}>
              <line
                x1={padding.left}
                y1={tick.y}
                x2={padding.left + chartAreaWidth}
                y2={tick.y}
                stroke="currentColor"
                className="text-gray-200 dark:text-gray-700"
                strokeWidth="1"
                strokeDasharray={i === 0 ? "0" : "4,4"}
              />
              {showYAxis && (
                <text
                  x={padding.left - 8}
                  y={tick.y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="fill-gray-500 dark:fill-gray-400"
                  fontSize="11"
                >
                  {tick.value}
                </text>
              )}
            </g>
          ))}

          {/* X-axis line */}
          <line
            x1={padding.left}
            y1={padding.top + chartAreaHeight}
            x2={padding.left + chartAreaWidth}
            y2={padding.top + chartAreaHeight}
            stroke="currentColor"
            className="text-gray-300 dark:text-gray-600"
            strokeWidth="1"
          />

          {/* Area fill under line (subtle) */}
          <path
            d={`${pathData} L ${getX(data.length - 1)} ${padding.top + chartAreaHeight} L ${getX(0)} ${padding.top + chartAreaHeight} Z`}
            fill={lineColor}
            fillOpacity="0.1"
          />

          {/* Line path */}
          <path
            d={pathData}
            fill="none"
            stroke={lineColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {data.map((point, index) => {
            const x = getX(index);
            const y = getY(point.value);
            const isHighlighted = highlightIndex === index;

            return (
              <g key={`point-${index}`}>
                {/* Outer circle (white background) */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHighlighted ? 7 : 5}
                  fill="white"
                  className="dark:fill-gray-800"
                />
                {/* Inner circle (colored) */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHighlighted ? 5 : 3.5}
                  fill={isHighlighted ? '#F59E0B' : pointColor}
                  className={cn(
                    onPointClick && 'cursor-pointer',
                    'transition-all duration-200'
                  )}
                  onClick={() => onPointClick?.(index)}
                />
                {/* Value label */}
                {showValues && (
                  <text
                    x={x}
                    y={y - 12}
                    textAnchor="middle"
                    className={cn(
                      'font-semibold',
                      isHighlighted
                        ? 'fill-amber-600 dark:fill-amber-400'
                        : 'fill-gray-700 dark:fill-gray-300'
                    )}
                    fontSize="11"
                  >
                    {point.value}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* X-axis Labels - positioned to match data points */}
      {showLabels && (
        <div className="relative" style={{ height: 20 }}>
          {data.map((point, index) => {
            const isHighlighted = highlightIndex === index;
            // Calculate position as percentage matching SVG coordinates
            const xPercent = ((padding.left + (index / (data.length - 1 || 1)) * chartAreaWidth) / svgWidth) * 100;
            return (
              <span
                key={`label-${index}`}
                className={cn(
                  'absolute text-xs transition-all duration-200 transform -translate-x-1/2',
                  isHighlighted
                    ? 'text-amber-600 dark:text-amber-400 font-bold'
                    : 'text-gray-600 dark:text-gray-400'
                )}
                style={{ left: `${xPercent}%` }}
              >
                {point.label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
