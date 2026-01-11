/**
 * Utility functions for 2D vector calculations and SVG path generation
 */

import type { LabeledPoint, VectorConfig } from '@/lib/types/vector';

// ============================================
// BASIC VECTOR OPERATIONS
// ============================================

/**
 * Create a 2D vector from components
 */
export function vec2(x: number, y: number, label?: string): LabeledPoint {
  return { x, y, label };
}

/**
 * Add two 2D vectors
 */
export function vec2Add(a: LabeledPoint, b: LabeledPoint): LabeledPoint {
  return { x: a.x + b.x, y: a.y + b.y };
}

/**
 * Subtract two 2D vectors (a - b)
 */
export function vec2Subtract(a: LabeledPoint, b: LabeledPoint): LabeledPoint {
  return { x: a.x - b.x, y: a.y - b.y };
}

/**
 * Scale a 2D vector by a scalar
 */
export function vec2Scale(v: LabeledPoint, s: number): LabeledPoint {
  return { x: v.x * s, y: v.y * s };
}

/**
 * Dot product of two 2D vectors
 */
export function vec2Dot(a: LabeledPoint, b: LabeledPoint): number {
  return a.x * b.x + a.y * b.y;
}

/**
 * Magnitude (length) of a 2D vector
 */
export function vec2Magnitude(v: LabeledPoint): number {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

/**
 * Distance between two points
 */
export function distance(a: LabeledPoint, b: LabeledPoint): number {
  return vec2Magnitude(vec2Subtract(b, a));
}

/**
 * Normalize a 2D vector to unit length
 */
export function vec2Normalize(v: LabeledPoint): LabeledPoint {
  const mag = vec2Magnitude(v);
  if (mag === 0) return { x: 0, y: 0 };
  return { x: v.x / mag, y: v.y / mag };
}

/**
 * Angle of vector with positive x-axis (in degrees)
 * Returns angle in range [0, 360)
 */
export function vec2Angle(v: LabeledPoint): number {
  const radians = Math.atan2(v.y, v.x);
  let degrees = (radians * 180) / Math.PI;
  if (degrees < 0) degrees += 360;
  return degrees;
}

/**
 * Angle of vector with positive x-axis (in radians)
 */
export function vec2AngleRadians(v: LabeledPoint): number {
  return Math.atan2(v.y, v.x);
}

/**
 * Create vector from magnitude and angle (polar coordinates)
 */
export function vec2FromPolar(magnitude: number, angleDegrees: number): LabeledPoint {
  const radians = (angleDegrees * Math.PI) / 180;
  return {
    x: magnitude * Math.cos(radians),
    y: magnitude * Math.sin(radians),
  };
}

/**
 * Get the vector displacement from a VectorConfig
 */
export function getVectorFromConfig(config: VectorConfig): LabeledPoint {
  const from = config.from || { x: 0, y: 0 };
  return vec2Subtract(config.to, from);
}

/**
 * Angle between two vectors (in degrees)
 */
export function vec2AngleBetween(a: LabeledPoint, b: LabeledPoint): number {
  const dot = vec2Dot(a, b);
  const magA = vec2Magnitude(a);
  const magB = vec2Magnitude(b);
  if (magA === 0 || magB === 0) return 0;
  const cosAngle = Math.max(-1, Math.min(1, dot / (magA * magB)));
  return (Math.acos(cosAngle) * 180) / Math.PI;
}

/**
 * Project vector a onto vector b
 */
export function vec2Project(a: LabeledPoint, b: LabeledPoint): LabeledPoint {
  const bMagSq = b.x * b.x + b.y * b.y;
  if (bMagSq === 0) return { x: 0, y: 0 };
  const scalar = vec2Dot(a, b) / bMagSq;
  return vec2Scale(b, scalar);
}

/**
 * Perpendicular vector (rotated 90 degrees counterclockwise)
 */
export function vec2Perpendicular(v: LabeledPoint): LabeledPoint {
  return { x: -v.y, y: v.x };
}

/**
 * Midpoint between two points
 */
export function midpoint(a: LabeledPoint, b: LabeledPoint): LabeledPoint {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

// ============================================
// COORDINATE TRANSFORMATIONS
// ============================================

/**
 * Transform mathematical coordinates to SVG coordinates
 * Mathematical: Y increases upward
 * SVG: Y increases downward
 */
export function mathToSVG(
  point: LabeledPoint,
  originX: number,
  originY: number,
  scale: number
): LabeledPoint {
  return {
    x: originX + point.x * scale,
    y: originY - point.y * scale, // Y is inverted
    label: point.label,
    labelOffset: point.labelOffset,
  };
}

/**
 * Transform SVG coordinates to mathematical coordinates
 */
export function svgToMath(
  point: LabeledPoint,
  originX: number,
  originY: number,
  scale: number
): LabeledPoint {
  return {
    x: (point.x - originX) / scale,
    y: (originY - point.y) / scale, // Y is inverted
    label: point.label,
    labelOffset: point.labelOffset,
  };
}

/**
 * Calculate SVG origin position based on ranges and dimensions
 */
export function calculateSVGOrigin(
  xRange: [number, number],
  yRange: [number, number],
  width: number,
  height: number,
  padding: number
): { x: number; y: number } {
  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;

  const innerWidth = width - 2 * padding;
  const innerHeight = height - 2 * padding;

  const xScale = innerWidth / (xMax - xMin);
  const yScale = innerHeight / (yMax - yMin);

  // Origin position in SVG coords
  const originX = padding + (-xMin) * xScale;
  const originY = padding + yMax * yScale;

  return { x: originX, y: originY };
}

/**
 * Calculate scale (pixels per unit) from ranges and dimensions
 */
export function calculateScale(
  xRange: [number, number],
  yRange: [number, number],
  width: number,
  height: number,
  padding: number
): number {
  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;

  const innerWidth = width - 2 * padding;
  const innerHeight = height - 2 * padding;

  const xScale = innerWidth / (xMax - xMin);
  const yScale = innerHeight / (yMax - yMin);

  // Use the smaller scale to ensure everything fits
  return Math.min(xScale, yScale);
}

// ============================================
// SVG PATH GENERATION
// ============================================

/**
 * Generate SVG path for an arrowhead
 * @param tipX - X coordinate of arrow tip
 * @param tipY - Y coordinate of arrow tip
 * @param angle - Angle the arrow is pointing (in degrees, 0 = right)
 * @param size - Size of arrowhead
 */
export function describeArrowhead(
  tipX: number,
  tipY: number,
  angle: number,
  size: number = 10
): string {
  const wingAngle = 25; // degrees from shaft
  const radians = (angle * Math.PI) / 180;

  // Left wing
  const leftAngle = radians + Math.PI - (wingAngle * Math.PI) / 180;
  const leftX = tipX + size * Math.cos(leftAngle);
  const leftY = tipY + size * Math.sin(leftAngle);

  // Right wing
  const rightAngle = radians + Math.PI + (wingAngle * Math.PI) / 180;
  const rightX = tipX + size * Math.cos(rightAngle);
  const rightY = tipY + size * Math.sin(rightAngle);

  return `M ${tipX} ${tipY} L ${leftX} ${leftY} M ${tipX} ${tipY} L ${rightX} ${rightY}`;
}

/**
 * Generate SVG path for a filled arrowhead (triangle)
 */
export function describeFilledArrowhead(
  tipX: number,
  tipY: number,
  angle: number,
  size: number = 10
): string {
  const wingAngle = 25;
  const radians = (angle * Math.PI) / 180;

  const leftAngle = radians + Math.PI - (wingAngle * Math.PI) / 180;
  const leftX = tipX + size * Math.cos(leftAngle);
  const leftY = tipY + size * Math.sin(leftAngle);

  const rightAngle = radians + Math.PI + (wingAngle * Math.PI) / 180;
  const rightX = tipX + size * Math.cos(rightAngle);
  const rightY = tipY + size * Math.sin(rightAngle);

  return `M ${tipX} ${tipY} L ${leftX} ${leftY} L ${rightX} ${rightY} Z`;
}

/**
 * Generate SVG paths for a complete vector with arrow
 */
export function describeVector(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  arrowSize: number = 10
): { linePath: string; arrowPath: string } {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return {
    linePath: `M ${fromX} ${fromY} L ${toX} ${toY}`,
    arrowPath: describeArrowhead(toX, toY, angle, arrowSize),
  };
}

/**
 * Generate SVG path for angle arc at a point
 * Note: In SVG, angles go clockwise because Y is inverted
 */
export function describeAngleArc(
  originX: number,
  originY: number,
  startAngle: number,
  endAngle: number,
  radius: number = 20
): string {
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;

  const startX = originX + radius * Math.cos(startRad);
  const startY = originY - radius * Math.sin(startRad); // SVG Y inverted
  const endX = originX + radius * Math.cos(endRad);
  const endY = originY - radius * Math.sin(endRad);

  const angleDiff = Math.abs(endAngle - startAngle);
  const largeArc = angleDiff > 180 ? 1 : 0;
  const sweep = endAngle > startAngle ? 0 : 1; // Counterclockwise in math = clockwise in SVG

  return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} ${sweep} ${endX} ${endY}`;
}

// ============================================
// LABEL POSITIONING
// ============================================

/**
 * Calculate label position for a vector
 */
export function calculateVectorLabelPosition(
  from: LabeledPoint,
  to: LabeledPoint,
  position: 'middle' | 'tip' = 'middle',
  offset: number = 15
): LabeledPoint {
  const mid = midpoint(from, to);

  // Perpendicular direction for offset
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.sqrt(dx * dx + dy * dy);

  if (len === 0) return { x: mid.x, y: mid.y - offset };

  // Perpendicular unit vector
  const perpX = -dy / len;
  const perpY = dx / len;

  if (position === 'middle') {
    return {
      x: mid.x + perpX * offset,
      y: mid.y + perpY * offset,
    };
  } else {
    // Near tip
    return {
      x: to.x + perpX * offset,
      y: to.y + perpY * offset,
    };
  }
}

/**
 * Calculate label position for a point
 */
export function calculatePointLabelPosition(
  point: LabeledPoint,
  offset: number = 15
): LabeledPoint {
  // Default: label above and to the right
  const defaultOffset = point.labelOffset || { x: offset * 0.7, y: -offset };
  return {
    x: point.x + defaultOffset.x,
    y: point.y + defaultOffset.y,
  };
}

// ============================================
// VIEWBOX CALCULATIONS
// ============================================

/**
 * Calculate viewBox for vectors and points
 */
export function calculateViewBox(
  vectors: VectorConfig[],
  points: LabeledPoint[],
  padding: number = 40
): { minX: number; minY: number; width: number; height: number } {
  const allPoints: LabeledPoint[] = [...points];

  vectors.forEach((v) => {
    allPoints.push(v.from || { x: 0, y: 0 });
    allPoints.push(v.to);
  });

  // Always include origin
  allPoints.push({ x: 0, y: 0 });

  if (allPoints.length === 0) {
    return { minX: -100, minY: -100, width: 200, height: 200 };
  }

  const xs = allPoints.map((p) => p.x);
  const ys = allPoints.map((p) => p.y);

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

// ============================================
// VALIDATION
// ============================================

/**
 * Validate vector configuration
 */
export function validateVector(config: VectorConfig): { valid: boolean; error?: string } {
  if (!config.to) {
    return { valid: false, error: 'El vector debe tener un punto destino (to)' };
  }

  const from = config.from || { x: 0, y: 0 };
  if (from.x === config.to.x && from.y === config.to.y) {
    return { valid: false, error: 'El vector no puede tener magnitud cero' };
  }

  return { valid: true };
}

/**
 * Validate Cartesian plane ranges
 */
export function validateRanges(
  xRange: [number, number],
  yRange: [number, number]
): { valid: boolean; error?: string } {
  if (xRange[0] >= xRange[1]) {
    return { valid: false, error: 'xRange[0] debe ser menor que xRange[1]' };
  }
  if (yRange[0] >= yRange[1]) {
    return { valid: false, error: 'yRange[0] debe ser menor que yRange[1]' };
  }
  return { valid: true };
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

// ============================================
// GRID GENERATION
// ============================================

/**
 * Generate grid lines for a coordinate plane
 */
export function generateGridLines(
  xRange: [number, number],
  yRange: [number, number],
  interval: number = 1
): { vertical: number[]; horizontal: number[] } {
  const vertical: number[] = [];
  const horizontal: number[] = [];

  // Vertical lines (along x-axis)
  for (let x = Math.ceil(xRange[0] / interval) * interval; x <= xRange[1]; x += interval) {
    vertical.push(x);
  }

  // Horizontal lines (along y-axis)
  for (let y = Math.ceil(yRange[0] / interval) * interval; y <= yRange[1]; y += interval) {
    horizontal.push(y);
  }

  return { vertical, horizontal };
}

/**
 * Generate tick positions for axes
 */
export function generateTickPositions(
  range: [number, number],
  interval: number = 1
): number[] {
  const ticks: number[] = [];
  for (let v = Math.ceil(range[0] / interval) * interval; v <= range[1]; v += interval) {
    ticks.push(v);
  }
  return ticks;
}
