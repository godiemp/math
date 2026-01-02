/**
 * Utility functions for polygon calculations
 * Supports regular and irregular polygons with 5-12 sides
 */

import type { LabeledPoint } from '@/lib/types/triangle';
import { POLYGON_NAMES } from '@/lib/types/polygon';

/**
 * Calculate distance between two points
 */
export function distance(p1: LabeledPoint, p2: LabeledPoint): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate midpoint between two points
 */
export function midpoint(p1: LabeledPoint, p2: LabeledPoint): LabeledPoint {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}

/**
 * Calculate the centroid of a polygon
 * Uses the formula for centroid of a simple polygon
 */
export function polygonCentroid(vertices: LabeledPoint[]): LabeledPoint {
  if (vertices.length === 0) {
    return { x: 0, y: 0 };
  }

  let sumX = 0;
  let sumY = 0;

  for (const vertex of vertices) {
    sumX += vertex.x;
    sumY += vertex.y;
  }

  return {
    x: sumX / vertices.length,
    y: sumY / vertices.length,
  };
}

/**
 * Calculate the signed area of a polygon (using shoelace formula)
 * Returns positive for counterclockwise, negative for clockwise
 */
export function polygonSignedArea(vertices: LabeledPoint[]): number {
  if (vertices.length < 3) return 0;

  let area = 0;
  const n = vertices.length;

  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += vertices[i].x * vertices[j].y;
    area -= vertices[j].x * vertices[i].y;
  }

  return area / 2;
}

/**
 * Calculate the absolute area of a polygon
 */
export function polygonArea(vertices: LabeledPoint[]): number {
  return Math.abs(polygonSignedArea(vertices));
}

/**
 * Calculate the angle at a vertex in degrees
 */
export function angleAtVertex(vertices: LabeledPoint[], vertexIndex: number): number {
  const n = vertices.length;
  if (n < 3) return 0;

  const v = vertices[vertexIndex];
  const p1 = vertices[(vertexIndex - 1 + n) % n]; // Previous vertex
  const p2 = vertices[(vertexIndex + 1) % n]; // Next vertex

  // Vectors from vertex to adjacent points
  const v1 = { x: p1.x - v.x, y: p1.y - v.y };
  const v2 = { x: p2.x - v.x, y: p2.y - v.y };

  // Dot product
  const dot = v1.x * v2.x + v1.y * v2.y;

  // Magnitudes
  const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
  const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

  if (mag1 === 0 || mag2 === 0) return 0;

  // Angle in radians, then convert to degrees
  const cosAngle = dot / (mag1 * mag2);
  const angleRad = Math.acos(Math.max(-1, Math.min(1, cosAngle)));

  return (angleRad * 180) / Math.PI;
}

/**
 * Calculate the interior angle of a regular polygon
 * Formula: (n - 2) * 180 / n
 */
export function regularInteriorAngle(sides: number): number {
  if (sides < 3) return 0;
  return ((sides - 2) * 180) / sides;
}

/**
 * Calculate the exterior angle of a regular polygon
 * Formula: 360 / n
 */
export function regularExteriorAngle(sides: number): number {
  if (sides < 3) return 0;
  return 360 / sides;
}

/**
 * Calculate the apothem of a regular polygon
 * Apothem = radius * cos(PI / n)
 */
export function calculateApothem(sides: number, radius: number): number {
  if (sides < 3) return 0;
  return radius * Math.cos(Math.PI / sides);
}

/**
 * Calculate the side length of a regular polygon
 * Side = 2 * radius * sin(PI / n)
 */
export function calculateSideLength(sides: number, radius: number): number {
  if (sides < 3) return 0;
  return 2 * radius * Math.sin(Math.PI / sides);
}

/**
 * Calculate the number of diagonals in a polygon
 * Formula: n(n-3)/2
 */
export function diagonalCount(sides: number): number {
  if (sides < 4) return 0;
  return (sides * (sides - 3)) / 2;
}

/**
 * Generate all diagonal pairs for a polygon
 * Returns array of [fromIndex, toIndex] pairs
 */
export function calculateAllDiagonals(sides: number): Array<[number, number]> {
  if (sides < 4) return [];

  const diagonals: Array<[number, number]> = [];

  for (let i = 0; i < sides; i++) {
    for (let j = i + 2; j < sides; j++) {
      // Skip adjacent vertices and wrap-around adjacency
      if (!(i === 0 && j === sides - 1)) {
        diagonals.push([i, j]);
      }
    }
  }

  return diagonals;
}

/**
 * Build vertices for a regular polygon
 *
 * @param sides - Number of sides (3-12)
 * @param radius - Circumradius (distance from center to vertices)
 * @param centerX - X coordinate of center
 * @param centerY - Y coordinate of center
 * @param rotation - Rotation in degrees (default: -90 to start from top)
 * @returns Array of labeled vertices
 */
export function buildRegularPolygon(
  sides: number,
  radius: number,
  centerX: number = 200,
  centerY: number = 150,
  rotation: number = -90
): LabeledPoint[] {
  if (sides < 3 || sides > 12) {
    console.warn(`Polygon sides must be between 3 and 12, got ${sides}`);
    sides = Math.max(3, Math.min(12, sides));
  }

  const vertices: LabeledPoint[] = [];
  const angleStep = 360 / sides;

  for (let i = 0; i < sides; i++) {
    const angle = rotation + i * angleStep;
    const radians = (angle * Math.PI) / 180;

    vertices.push({
      x: centerX + radius * Math.cos(radians),
      y: centerY + radius * Math.sin(radians),
      label: String.fromCharCode(65 + i), // A, B, C, ...
    });
  }

  return vertices;
}

/**
 * Generate SVG path for a polygon
 */
export function polygonPath(vertices: LabeledPoint[]): string {
  if (vertices.length < 3) return '';

  const [first, ...rest] = vertices;
  const pathParts = [`M ${first.x} ${first.y}`];

  for (const v of rest) {
    pathParts.push(`L ${v.x} ${v.y}`);
  }

  pathParts.push('Z');
  return pathParts.join(' ');
}

/**
 * Calculate bounding box of vertices with padding
 */
export function calculateViewBox(
  vertices: LabeledPoint[],
  padding: number = 40
): { minX: number; minY: number; width: number; height: number } {
  if (vertices.length === 0) {
    return { minX: 0, minY: 0, width: 400, height: 300 };
  }

  const xs = vertices.map((v) => v.x);
  const ys = vertices.map((v) => v.y);

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
 * Calculate label position for a vertex (positioned away from centroid)
 */
export function calculateVertexLabelPosition(
  vertex: LabeledPoint,
  vertices: LabeledPoint[],
  offset: number = 18
): { x: number; y: number } {
  const c = polygonCentroid(vertices);

  // Direction from centroid to vertex
  const dx = vertex.x - c.x;
  const dy = vertex.y - c.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist === 0) return { x: vertex.x, y: vertex.y - offset };

  // Normalize and extend
  return {
    x: vertex.x + (dx / dist) * offset,
    y: vertex.y + (dy / dist) * offset,
  };
}

/**
 * Calculate label position for an edge (midpoint with offset)
 */
export function calculateEdgeLabelPosition(
  p1: LabeledPoint,
  p2: LabeledPoint,
  vertices: LabeledPoint[],
  offset: number = 15
): { x: number; y: number } {
  const mid = midpoint(p1, p2);
  const c = polygonCentroid(vertices);

  // Direction from centroid to midpoint
  const dx = mid.x - c.x;
  const dy = mid.y - c.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist === 0) return { x: mid.x, y: mid.y - offset };

  // Normalize and extend outward
  return {
    x: mid.x + (dx / dist) * offset,
    y: mid.y + (dy / dist) * offset,
  };
}

/**
 * Calculate label position for a diagonal (center of line)
 */
export function calculateDiagonalLabelPosition(
  p1: LabeledPoint,
  p2: LabeledPoint,
  offset: number = 8
): { x: number; y: number } {
  const mid = midpoint(p1, p2);

  // Perpendicular offset
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.sqrt(dx * dx + dy * dy);

  if (len === 0) return { x: mid.x, y: mid.y };

  // Perpendicular direction
  const perpX = -dy / len;
  const perpY = dx / len;

  return {
    x: mid.x + perpX * offset,
    y: mid.y + perpY * offset,
  };
}

/**
 * Convert polar coordinates to Cartesian
 * Convention: 0 = up (12 o'clock), angles increase clockwise
 */
export function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

/**
 * Calculate the angle in degrees for a ray from origin to point
 * Returns angle in SVG convention (0 = up, clockwise positive)
 */
export function angleToPoint(origin: LabeledPoint, point: LabeledPoint): number {
  const dx = point.x - origin.x;
  const dy = point.y - origin.y;
  const radians = Math.atan2(dy, dx);
  const degrees = (radians * 180) / Math.PI;
  return (degrees + 90 + 360) % 360;
}

/**
 * Generate SVG arc path for angle visualization
 */
export function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');
}

/**
 * Generate SVG path for angle arc at a vertex
 */
export function describeAngleArc(
  vertex: LabeledPoint,
  p1: LabeledPoint,
  p2: LabeledPoint,
  radius: number = 25
): string {
  // Calculate angles to each adjacent point
  const angle1 = angleToPoint(vertex, p1);
  const angle2 = angleToPoint(vertex, p2);

  // Ensure we take the interior angle (smaller arc)
  let startAngle = angle1;
  let endAngle = angle2;

  // Normalize the arc direction
  let diff = endAngle - startAngle;
  if (diff < 0) diff += 360;

  if (diff > 180) {
    // Swap to get the smaller arc
    [startAngle, endAngle] = [endAngle, startAngle];
  }

  return describeArc(vertex.x, vertex.y, radius, startAngle, endAngle);
}

/**
 * Get stroke dash array based on style
 */
export function getStrokeDashArray(
  style?: 'solid' | 'dashed' | 'dotted'
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
 * Get the Spanish name for a polygon
 */
export function getPolygonName(sides: number): string {
  return POLYGON_NAMES[sides] || `polígono de ${sides} lados`;
}

/**
 * Validate that a polygon configuration is valid
 */
export function validatePolygon(
  sides: number,
  radius?: number
): { valid: boolean; error?: string } {
  if (sides < 5) {
    return { valid: false, error: 'El polígono debe tener al menos 5 lados' };
  }

  if (sides > 12) {
    return { valid: false, error: 'El polígono debe tener como máximo 12 lados' };
  }

  if (radius !== undefined && radius <= 0) {
    return { valid: false, error: 'El radio debe ser mayor a 0' };
  }

  return { valid: true };
}

/**
 * Validate vertices form a valid polygon
 */
export function validateVertices(
  vertices: LabeledPoint[]
): { valid: boolean; error?: string } {
  if (vertices.length < 5) {
    return { valid: false, error: 'El polígono debe tener al menos 5 vértices' };
  }

  if (vertices.length > 12) {
    return { valid: false, error: 'El polígono debe tener como máximo 12 vértices' };
  }

  // Check for degenerate polygon (area too small)
  const area = polygonArea(vertices);
  if (area < 1) {
    return { valid: false, error: 'Los vértices forman un polígono degenerado' };
  }

  return { valid: true };
}

/**
 * Check if a polygon is approximately regular
 * (equal sides and equal angles within tolerance)
 */
export function isRegular(
  vertices: LabeledPoint[],
  tolerance: number = 2
): boolean {
  if (vertices.length < 3) return false;

  const n = vertices.length;

  // Calculate all side lengths
  const sideLengths: number[] = [];
  for (let i = 0; i < n; i++) {
    sideLengths.push(distance(vertices[i], vertices[(i + 1) % n]));
  }

  // Calculate all angles
  const angles: number[] = [];
  for (let i = 0; i < n; i++) {
    angles.push(angleAtVertex(vertices, i));
  }

  // Check if all sides are approximately equal
  const avgSide = sideLengths.reduce((a, b) => a + b, 0) / n;
  const sidesEqual = sideLengths.every((s) => Math.abs(s - avgSide) / avgSide < 0.05);

  // Check if all angles are approximately equal
  const expectedAngle = regularInteriorAngle(n);
  const anglesEqual = angles.every((a) => Math.abs(a - expectedAngle) < tolerance);

  return sidesEqual && anglesEqual;
}

/**
 * Calculate the apothem line endpoints (from center to edge midpoint)
 */
export function calculateApothemLine(
  vertices: LabeledPoint[],
  edgeIndex: number = 0
): { start: LabeledPoint; end: LabeledPoint } {
  const center = polygonCentroid(vertices);
  const n = vertices.length;

  const p1 = vertices[edgeIndex];
  const p2 = vertices[(edgeIndex + 1) % n];
  const edgeMidpoint = midpoint(p1, p2);

  return {
    start: center,
    end: edgeMidpoint,
  };
}
