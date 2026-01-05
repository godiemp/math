/**
 * SVG Path Generation and ViewBox Utilities
 */

import type { ProjectedPoint } from '../../types/figure3d';

/**
 * Generate SVG path for a face (polygon)
 */
export function describeFacePath(
  projectedVertices: ProjectedPoint[],
  faceIndices: number[]
): string {
  if (faceIndices.length < 3) return '';

  const points = faceIndices.map((i) => projectedVertices[i]);
  const pathParts = points.map((p, i) => {
    const cmd = i === 0 ? 'M' : 'L';
    return `${cmd} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
  });

  return pathParts.join(' ') + ' Z';
}

/**
 * Generate SVG line for an edge
 */
export function describeEdgeLine(
  p1: ProjectedPoint,
  p2: ProjectedPoint
): { x1: number; y1: number; x2: number; y2: number } {
  return {
    x1: p1.x,
    y1: p1.y,
    x2: p2.x,
    y2: p2.y,
  };
}

/**
 * Get stroke dash array for edge style
 */
export function getStrokeDashArray(
  style: 'solid' | 'dashed' | 'dotted' | undefined
): string | undefined {
  switch (style) {
    case 'dashed':
      return '6,4';
    case 'dotted':
      return '2,3';
    default:
      return undefined;
  }
}

/**
 * Calculate optimal viewBox for projected vertices
 */
export function calculateViewBox3D(
  projectedVertices: ProjectedPoint[],
  padding: number = 40
): { minX: number; minY: number; width: number; height: number } {
  if (projectedVertices.length === 0) {
    return { minX: 0, minY: 0, width: 400, height: 300 };
  }

  const xs = projectedVertices.map((p) => p.x);
  const ys = projectedVertices.map((p) => p.y);

  const minX = Math.min(...xs) - padding;
  const maxX = Math.max(...xs) + padding;
  const minY = Math.min(...ys) - padding;
  const maxY = Math.max(...ys) + padding;

  return {
    minX,
    minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

/**
 * Calculate viewBox for sphere
 */
export function calculateSphereViewBox(
  projectedCenter: ProjectedPoint,
  projectedRadius: number,
  padding: number = 40
): { minX: number; minY: number; width: number; height: number } {
  return {
    minX: projectedCenter.x - projectedRadius - padding,
    minY: projectedCenter.y - projectedRadius - padding,
    width: (projectedRadius + padding) * 2,
    height: (projectedRadius + padding) * 2,
  };
}
