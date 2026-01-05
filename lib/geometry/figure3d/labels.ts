/**
 * Label Positioning Utilities for 3D Figures
 */

import type { ProjectedPoint, LabeledPoint } from '../../types/figure3d';

/**
 * Calculate position for height label
 */
export function calculateHeightLabelPosition(
  projectedVertices: ProjectedPoint[],
  solidType: string,
  offset: number = 15
): LabeledPoint {
  // For most shapes, height runs along Y axis
  // Find the midpoint of a vertical edge and offset it
  if (projectedVertices.length < 2) {
    return { x: 0, y: 0 };
  }

  // Use centroid as fallback
  const avgX =
    projectedVertices.reduce((sum, p) => sum + p.x, 0) / projectedVertices.length;
  const minY = Math.min(...projectedVertices.map((p) => p.y));
  const maxY = Math.max(...projectedVertices.map((p) => p.y));
  const midY = (minY + maxY) / 2;

  return { x: avgX + offset, y: midY };
}

/**
 * Calculate position for base label
 */
export function calculateBaseLabelPosition(
  projectedVertices: ProjectedPoint[],
  solidType: string,
  offset: number = 15
): LabeledPoint {
  if (projectedVertices.length < 2) {
    return { x: 0, y: 0 };
  }

  const avgX =
    projectedVertices.reduce((sum, p) => sum + p.x, 0) / projectedVertices.length;
  const maxY = Math.max(...projectedVertices.map((p) => p.y));

  return { x: avgX, y: maxY + offset };
}

/**
 * Calculate position for edge label (midpoint with offset)
 */
export function calculateEdgeLabelPosition(
  p1: ProjectedPoint,
  p2: ProjectedPoint,
  offset: number = 10
): LabeledPoint {
  const midX = (p1.x + p2.x) / 2;
  const midY = (p1.y + p2.y) / 2;

  // Perpendicular offset
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.sqrt(dx * dx + dy * dy);

  if (len === 0) return { x: midX, y: midY };

  // Perpendicular direction (rotate 90 degrees)
  const perpX = -dy / len;
  const perpY = dx / len;

  return {
    x: midX + perpX * offset,
    y: midY + perpY * offset,
  };
}
