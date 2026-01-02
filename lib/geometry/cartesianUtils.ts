/**
 * Utility functions for Cartesian plane calculations
 */

import type { AxisRange, CoordinateTransform } from '@/lib/types/cartesian';

/**
 * Create a coordinate transformation function from math to SVG coordinates
 * Math coordinates: Y increases upward
 * SVG coordinates: Y increases downward
 */
export function createMathToSvgTransform(
  xRange: AxisRange,
  yRange: AxisRange,
  scale: number,
  padding: number
): CoordinateTransform {
  return (x: number, y: number) => ({
    x: padding + (x - xRange[0]) * scale,
    y: padding + (yRange[1] - y) * scale,
  });
}

/**
 * Create a coordinate transformation function from SVG to math coordinates
 */
export function createSvgToMathTransform(
  xRange: AxisRange,
  yRange: AxisRange,
  scale: number,
  padding: number
): CoordinateTransform {
  return (svgX: number, svgY: number) => ({
    x: (svgX - padding) / scale + xRange[0],
    y: yRange[1] - (svgY - padding) / scale,
  });
}

/**
 * Calculate SVG dimensions from axis ranges
 */
export function calculateDimensions(
  xRange: AxisRange,
  yRange: AxisRange,
  scale: number,
  padding: number
): { width: number; height: number } {
  return {
    width: (xRange[1] - xRange[0]) * scale + padding * 2,
    height: (yRange[1] - yRange[0]) * scale + padding * 2,
  };
}

/**
 * Generate tick mark positions for an axis
 * Returns integer positions within the range
 */
export function generateTicks(range: AxisRange, step: number = 1): number[] {
  const ticks: number[] = [];
  const start = Math.ceil(range[0] / step) * step;
  for (let i = start; i <= range[1]; i += step) {
    ticks.push(i);
  }
  return ticks;
}

/**
 * Generate SVG path for an arrow head
 * @param tipX - X coordinate of arrow tip
 * @param tipY - Y coordinate of arrow tip
 * @param size - Size of the arrow head
 * @param direction - Direction the arrow points
 */
export function arrowHeadPath(
  tipX: number,
  tipY: number,
  size: number,
  direction: 'up' | 'down' | 'left' | 'right'
): string {
  const halfWidth = size * 0.5;

  switch (direction) {
    case 'right':
      return `M ${tipX} ${tipY} L ${tipX - size} ${tipY - halfWidth} L ${tipX - size} ${tipY + halfWidth} Z`;
    case 'left':
      return `M ${tipX} ${tipY} L ${tipX + size} ${tipY - halfWidth} L ${tipX + size} ${tipY + halfWidth} Z`;
    case 'up':
      return `M ${tipX} ${tipY} L ${tipX - halfWidth} ${tipY + size} L ${tipX + halfWidth} ${tipY + size} Z`;
    case 'down':
      return `M ${tipX} ${tipY} L ${tipX - halfWidth} ${tipY - size} L ${tipX + halfWidth} ${tipY - size} Z`;
  }
}

/**
 * Check if a value is within a range (inclusive)
 */
export function isInRange(value: number, range: AxisRange): boolean {
  return value >= range[0] && value <= range[1];
}

/**
 * Clamp a position to stay within bounds with padding
 */
export function clampToRange(
  value: number,
  range: AxisRange,
  padding: number,
  scale: number
): number {
  const minSvg = padding;
  const maxSvg = padding + (range[1] - range[0]) * scale;
  return Math.min(Math.max(value, minSvg), maxSvg);
}
