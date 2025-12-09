'use client';

import { cn } from '@/lib/utils';

export interface VennDiagramProps {
  /** Display mode: exclusive (circles apart), overlapping (circles overlap), interactive (clickable) */
  mode: 'exclusive' | 'overlapping' | 'interactive';
  /** Show labels for circles */
  showLabels?: boolean;
  /** Label for circle A */
  labelA?: string;
  /** Label for circle B */
  labelB?: string;
  /** Count of items only in A (not in B) */
  countA?: number;
  /** Count of items only in B (not in A) */
  countB?: number;
  /** Count of items in both A and B (intersection) */
  countBoth?: number;
  /** Which region to highlight */
  highlightRegion?: 'A' | 'B' | 'intersection' | 'union' | 'none';
  /** Callback when a region is clicked (interactive mode only) */
  onRegionClick?: (region: 'A' | 'B' | 'intersection') => void;
  /** Enable smooth transitions between states */
  animated?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show count numbers inside regions */
  showCounts?: boolean;
  /** Custom class name */
  className?: string;
}

export default function VennDiagram({
  mode,
  showLabels = true,
  labelA = 'A',
  labelB = 'B',
  countA,
  countB,
  countBoth,
  highlightRegion = 'none',
  onRegionClick,
  animated = true,
  size = 'md',
  showCounts = false,
  className,
}: VennDiagramProps) {
  // Size configurations
  const sizeConfig = {
    sm: { width: 200, height: 140, radius: 50, overlap: 30 },
    md: { width: 280, height: 180, radius: 70, overlap: 40 },
    lg: { width: 360, height: 240, radius: 90, overlap: 50 },
  };

  const config = sizeConfig[size];
  const centerY = config.height / 2;

  // Calculate circle positions based on mode
  const separation = mode === 'exclusive' ? config.radius * 2 + 20 : config.overlap;
  const centerAx = config.width / 2 - separation / 2;
  const centerBx = config.width / 2 + separation / 2;

  // Check if regions should be highlighted
  const isAHighlighted = highlightRegion === 'A' || highlightRegion === 'union';
  const isBHighlighted = highlightRegion === 'B' || highlightRegion === 'union';
  const isIntersectionHighlighted = highlightRegion === 'intersection' || highlightRegion === 'union';

  // Generate unique IDs for clip paths
  const clipIdA = `clip-a-${Math.random().toString(36).substr(2, 9)}`;
  const clipIdB = `clip-b-${Math.random().toString(36).substr(2, 9)}`;
  const clipIdIntersection = `clip-intersection-${Math.random().toString(36).substr(2, 9)}`;

  const handleRegionClick = (region: 'A' | 'B' | 'intersection') => {
    if (mode === 'interactive' && onRegionClick) {
      onRegionClick(region);
    }
  };

  // Calculate text positions for counts
  // For overlapping mode, position counts in the exclusive regions (away from center)
  const countAx = mode === 'exclusive' ? centerAx : centerAx - config.radius * 0.5;
  const countBx = mode === 'exclusive' ? centerBx : centerBx + config.radius * 0.5;
  const countBothX = config.width / 2;

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <svg
        width={config.width}
        height={config.height}
        viewBox={`0 0 ${config.width} ${config.height}`}
        className={cn(animated && 'transition-all duration-500')}
      >
        <defs>
          {/* Gradients for circles */}
          <linearGradient id="gradientA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="gradientB" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="gradientIntersection" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.85" />
          </linearGradient>

          {/* Clip paths for intersection */}
          <clipPath id={clipIdA}>
            <circle cx={centerAx} cy={centerY} r={config.radius} />
          </clipPath>
          <clipPath id={clipIdB}>
            <circle cx={centerBx} cy={centerY} r={config.radius} />
          </clipPath>
        </defs>

        {/* Circle A (only part not in B) */}
        <circle
          cx={centerAx}
          cy={centerY}
          r={config.radius}
          fill="url(#gradientA)"
          stroke={isAHighlighted ? '#FBBF24' : '#3B82F6'}
          strokeWidth={isAHighlighted ? 3 : 2}
          className={cn(
            animated && 'transition-all duration-500',
            mode === 'interactive' && 'cursor-pointer hover:brightness-110'
          )}
          style={{
            transform: `translateX(${mode === 'exclusive' ? '-10px' : '0'})`,
          }}
          onClick={() => handleRegionClick('A')}
        />

        {/* Circle B (only part not in A) */}
        <circle
          cx={centerBx}
          cy={centerY}
          r={config.radius}
          fill="url(#gradientB)"
          stroke={isBHighlighted ? '#FBBF24' : '#8B5CF6'}
          strokeWidth={isBHighlighted ? 3 : 2}
          className={cn(
            animated && 'transition-all duration-500',
            mode === 'interactive' && 'cursor-pointer hover:brightness-110'
          )}
          style={{
            transform: `translateX(${mode === 'exclusive' ? '10px' : '0'})`,
          }}
          onClick={() => handleRegionClick('B')}
        />

        {/* Intersection (only in overlapping mode) */}
        {mode !== 'exclusive' && (
          <g clipPath={`url(#${clipIdA})`}>
            <circle
              cx={centerBx}
              cy={centerY}
              r={config.radius}
              fill="url(#gradientIntersection)"
              stroke={isIntersectionHighlighted ? '#FBBF24' : '#6366F1'}
              strokeWidth={isIntersectionHighlighted ? 3 : 2}
              className={cn(
                animated && 'transition-all duration-300',
                mode === 'interactive' && 'cursor-pointer hover:brightness-110'
              )}
              onClick={() => handleRegionClick('intersection')}
            />
          </g>
        )}

        {/* Highlight glow effect for union */}
        {highlightRegion === 'union' && (
          <>
            <circle
              cx={centerAx}
              cy={centerY}
              r={config.radius + 4}
              fill="none"
              stroke="#FBBF24"
              strokeWidth={2}
              className="animate-pulse"
              opacity={0.6}
            />
            <circle
              cx={centerBx}
              cy={centerY}
              r={config.radius + 4}
              fill="none"
              stroke="#FBBF24"
              strokeWidth={2}
              className="animate-pulse"
              opacity={0.6}
            />
          </>
        )}

        {/* Count labels */}
        {showCounts && (
          <>
            {countA !== undefined && (
              <text
                x={countAx}
                y={centerY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-white font-bold text-lg"
              >
                {countA}
              </text>
            )}
            {countB !== undefined && (
              <text
                x={countBx}
                y={centerY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-white font-bold text-lg"
              >
                {countB}
              </text>
            )}
            {countBoth !== undefined && mode !== 'exclusive' && (
              <text
                x={countBothX}
                y={centerY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-white font-bold text-lg"
              >
                {countBoth}
              </text>
            )}
          </>
        )}

        {/* Labels */}
        {showLabels && (
          <>
            <text
              x={centerAx - config.radius + 10}
              y={centerY - config.radius - 8}
              textAnchor="start"
              className="fill-blue-600 dark:fill-blue-400 font-semibold text-sm"
            >
              {labelA}
            </text>
            <text
              x={centerBx + config.radius - 10}
              y={centerY - config.radius - 8}
              textAnchor="end"
              className="fill-purple-600 dark:fill-purple-400 font-semibold text-sm"
            >
              {labelB}
            </text>
          </>
        )}
      </svg>

      {/* Legend for regions */}
      {mode !== 'exclusive' && highlightRegion !== 'none' && (
        <div className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">
          {highlightRegion === 'A' && `Solo ${labelA}`}
          {highlightRegion === 'B' && `Solo ${labelB}`}
          {highlightRegion === 'intersection' && `${labelA} ∩ ${labelB} (ambos)`}
          {highlightRegion === 'union' && `${labelA} ∪ ${labelB} (al menos uno)`}
        </div>
      )}
    </div>
  );
}
