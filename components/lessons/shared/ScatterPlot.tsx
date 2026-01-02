'use client';

import { cn } from '@/lib/utils';

export interface ScatterPlotPoint {
  /** X coordinate value */
  x: number;
  /** Y coordinate value */
  y: number;
  /** Optional label for this point */
  label?: string;
}

export interface ScatterPlotSeries {
  /** Name/label for this series (shown in legend) */
  name: string;
  /** Data points for this series */
  points: ScatterPlotPoint[];
  /** Color for this series */
  color?: string;
}

export interface ScatterPlotProps {
  /** Data - either a single array of points or multiple series */
  data: ScatterPlotPoint[] | ScatterPlotSeries[];
  /** X-axis label */
  xLabel?: string;
  /** Y-axis label */
  yLabel?: string;
  /** Show grid lines */
  showGrid?: boolean;
  /** Show X-axis scale */
  showXAxis?: boolean;
  /** Show Y-axis scale */
  showYAxis?: boolean;
  /** Show legend (only for multi-series data) */
  showLegend?: boolean;
  /** Show a trend line */
  showTrendLine?: boolean;
  /** Correlation type hint for visual styling (doesn't calculate actual correlation) */
  correlationType?: 'positive' | 'negative' | 'none';
  /** Height variant */
  height?: 'sm' | 'md' | 'lg';
  /** Custom max X value */
  maxX?: number;
  /** Custom min X value */
  minX?: number;
  /** Custom max Y value */
  maxY?: number;
  /** Custom min Y value */
  minY?: number;
  /** Custom class name */
  className?: string;
}

const DEFAULT_COLORS = [
  '#3B82F6', // blue
  '#EF4444', // red
  '#10B981', // green
  '#F59E0B', // amber
  '#8B5CF6', // purple
];

function isMultiSeries(data: ScatterPlotPoint[] | ScatterPlotSeries[]): data is ScatterPlotSeries[] {
  return data.length > 0 && 'name' in data[0] && 'points' in data[0];
}

export default function ScatterPlot({
  data,
  xLabel,
  yLabel,
  showGrid = true,
  showXAxis = true,
  showYAxis = true,
  showLegend = true,
  showTrendLine = false,
  correlationType,
  height = 'md',
  maxX,
  minX,
  maxY,
  minY,
  className,
}: ScatterPlotProps) {
  const heightConfig = {
    sm: 180,
    md: 240,
    lg: 300,
  };

  const chartHeight = heightConfig[height];

  // Normalize data to multi-series format
  const series: ScatterPlotSeries[] = isMultiSeries(data)
    ? data
    : [{ name: 'Data', points: data, color: DEFAULT_COLORS[0] }];

  // Calculate bounds from all points
  const allPoints = series.flatMap(s => s.points);
  const xValues = allPoints.map(p => p.x);
  const yValues = allPoints.map(p => p.y);

  const dataMinX = Math.min(...xValues);
  const dataMaxX = Math.max(...xValues);
  const dataMinY = Math.min(...yValues);
  const dataMaxY = Math.max(...yValues);

  // Add padding to ranges
  const xRange = dataMaxX - dataMinX || 1;
  const yRange = dataMaxY - dataMinY || 1;

  const paddedMinX = minX ?? dataMinX - xRange * 0.1;
  const paddedMaxX = maxX ?? dataMaxX + xRange * 0.1;
  const paddedMinY = minY ?? (dataMinY < 0 ? dataMinY - yRange * 0.1 : Math.max(0, dataMinY - yRange * 0.1));
  const paddedMaxY = maxY ?? dataMaxY + yRange * 0.1;

  const xValueRange = paddedMaxX - paddedMinX || 1;
  const yValueRange = paddedMaxY - paddedMinY || 1;

  // Chart dimensions
  const svgWidth = 400;
  const svgHeight = showLegend && series.length > 1 ? 250 : 220;
  const padding = {
    top: 20,
    right: 20,
    bottom: xLabel ? 45 : 35,
    left: yLabel ? 55 : 45
  };
  const chartAreaWidth = svgWidth - padding.left - padding.right;
  const chartAreaHeight = svgHeight - padding.top - padding.bottom - (showLegend && series.length > 1 ? 25 : 0);

  // Coordinate transformation functions
  const getX = (value: number) => {
    return padding.left + ((value - paddedMinX) / xValueRange) * chartAreaWidth;
  };

  const getY = (value: number) => {
    return padding.top + chartAreaHeight - ((value - paddedMinY) / yValueRange) * chartAreaHeight;
  };

  // Generate axis ticks
  const xTicks: { value: number; x: number }[] = [];
  const yTicks: { value: number; y: number }[] = [];
  const tickCount = 5;

  for (let i = 0; i <= tickCount; i++) {
    const xValue = paddedMinX + (xValueRange * i) / tickCount;
    xTicks.push({
      value: Math.round(xValue * 10) / 10,
      x: getX(xValue),
    });

    const yValue = paddedMinY + (yValueRange * i) / tickCount;
    yTicks.push({
      value: Math.round(yValue * 10) / 10,
      y: getY(yValue),
    });
  }

  // Calculate trend line using linear regression (only for single series)
  const getTrendLine = () => {
    if (series.length !== 1 || allPoints.length < 2) return null;

    const n = allPoints.length;
    const sumX = allPoints.reduce((sum, p) => sum + p.x, 0);
    const sumY = allPoints.reduce((sum, p) => sum + p.y, 0);
    const sumXY = allPoints.reduce((sum, p) => sum + p.x * p.y, 0);
    const sumXX = allPoints.reduce((sum, p) => sum + p.x * p.x, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // Calculate line endpoints within the chart bounds
    const x1 = paddedMinX;
    const y1 = slope * x1 + intercept;
    const x2 = paddedMaxX;
    const y2 = slope * x2 + intercept;

    return { x1, y1, x2, y2, slope };
  };

  const trendLine = showTrendLine ? getTrendLine() : null;

  return (
    <div className={cn('w-full', className)}>
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

          {/* Grid lines and Y-axis labels */}
          {showGrid && yTicks.map((tick, i) => (
            <g key={`y-tick-${i}`}>
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
                  fontSize="10"
                >
                  {tick.value}
                </text>
              )}
            </g>
          ))}

          {/* X-axis labels */}
          {showXAxis && xTicks.map((tick, i) => (
            <g key={`x-tick-${i}`}>
              {showGrid && i > 0 && (
                <line
                  x1={tick.x}
                  y1={padding.top}
                  x2={tick.x}
                  y2={padding.top + chartAreaHeight}
                  stroke="currentColor"
                  className="text-gray-200 dark:text-gray-700"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
              )}
              <text
                x={tick.x}
                y={padding.top + chartAreaHeight + 15}
                textAnchor="middle"
                className="fill-gray-500 dark:fill-gray-400"
                fontSize="10"
              >
                {tick.value}
              </text>
            </g>
          ))}

          {/* Axis labels */}
          {xLabel && (
            <text
              x={padding.left + chartAreaWidth / 2}
              y={padding.top + chartAreaHeight + 35}
              textAnchor="middle"
              className="fill-gray-600 dark:fill-gray-400"
              fontSize="11"
              fontWeight="500"
            >
              {xLabel}
            </text>
          )}
          {yLabel && (
            <text
              x={15}
              y={padding.top + chartAreaHeight / 2}
              textAnchor="middle"
              transform={`rotate(-90, 15, ${padding.top + chartAreaHeight / 2})`}
              className="fill-gray-600 dark:fill-gray-400"
              fontSize="11"
              fontWeight="500"
            >
              {yLabel}
            </text>
          )}

          {/* Trend line */}
          {trendLine && (
            <line
              x1={getX(trendLine.x1)}
              y1={getY(trendLine.y1)}
              x2={getX(trendLine.x2)}
              y2={getY(trendLine.y2)}
              stroke={trendLine.slope > 0 ? '#10B981' : trendLine.slope < 0 ? '#EF4444' : '#6B7280'}
              strokeWidth="2"
              strokeDasharray="6,4"
              opacity="0.7"
            />
          )}

          {/* Data points */}
          {series.map((s, seriesIndex) => {
            const color = s.color || DEFAULT_COLORS[seriesIndex % DEFAULT_COLORS.length];
            return (
              <g key={`series-${seriesIndex}`}>
                {s.points.map((point, pointIndex) => {
                  const x = getX(point.x);
                  const y = getY(point.y);

                  return (
                    <g key={`point-${seriesIndex}-${pointIndex}`}>
                      {/* Outer circle (white background for visibility) */}
                      <circle
                        cx={x}
                        cy={y}
                        r={5}
                        fill="white"
                        className="dark:fill-gray-800"
                      />
                      {/* Inner circle (colored) */}
                      <circle
                        cx={x}
                        cy={y}
                        r={4}
                        fill={color}
                        className="transition-all duration-200"
                      />
                      {/* Optional label */}
                      {point.label && (
                        <text
                          x={x}
                          y={y - 10}
                          textAnchor="middle"
                          className="fill-gray-700 dark:fill-gray-300"
                          fontSize="9"
                        >
                          {point.label}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Legend for multi-series */}
          {showLegend && series.length > 1 && (
            <g transform={`translate(${padding.left}, ${svgHeight - 20})`}>
              {series.map((s, i) => {
                const color = s.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length];
                const xOffset = i * 100;
                return (
                  <g key={`legend-${i}`} transform={`translate(${xOffset}, 0)`}>
                    <circle cx={6} cy={6} r={4} fill={color} />
                    <text
                      x={14}
                      y={10}
                      className="fill-gray-600 dark:fill-gray-400"
                      fontSize="10"
                    >
                      {s.name}
                    </text>
                  </g>
                );
              })}
            </g>
          )}

          {/* Correlation indicator */}
          {correlationType && (
            <g transform={`translate(${svgWidth - 90}, 10)`}>
              <rect
                x={0}
                y={0}
                width={80}
                height={20}
                rx={4}
                className={cn(
                  correlationType === 'positive' && 'fill-green-100 dark:fill-green-900/50',
                  correlationType === 'negative' && 'fill-red-100 dark:fill-red-900/50',
                  correlationType === 'none' && 'fill-gray-100 dark:fill-gray-800'
                )}
              />
              <text
                x={40}
                y={14}
                textAnchor="middle"
                className={cn(
                  'text-xs font-medium',
                  correlationType === 'positive' && 'fill-green-700 dark:fill-green-400',
                  correlationType === 'negative' && 'fill-red-700 dark:fill-red-400',
                  correlationType === 'none' && 'fill-gray-600 dark:fill-gray-400'
                )}
                fontSize="9"
              >
                {correlationType === 'positive' && 'Corr. Positiva'}
                {correlationType === 'negative' && 'Corr. Negativa'}
                {correlationType === 'none' && 'Sin correlación'}
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
