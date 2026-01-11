/**
 * Utility functions for circle calculations
 */

import type { LabeledPoint } from '@/lib/types/circle';

// ============================================
// BASIC CALCULATIONS
// ============================================

/**
 * Calculate circumference of a circle (perímetro)
 * C = 2πr
 */
export function circumference(radius: number): number {
  return 2 * Math.PI * radius;
}

/**
 * Calculate area of a circle (área)
 * A = πr²
 */
export function area(radius: number): number {
  return Math.PI * radius * radius;
}

/**
 * Calculate arc length given angle in degrees
 * L = (θ/360) × 2πr
 */
export function arcLength(radius: number, angleDegrees: number): number {
  return (angleDegrees / 360) * circumference(radius);
}

/**
 * Calculate sector area given angle in degrees
 * A = (θ/360) × πr²
 */
export function sectorArea(radius: number, angleDegrees: number): number {
  return (angleDegrees / 360) * area(radius);
}

/**
 * Calculate chord length given radius and central angle
 * Uses: chord = 2r × sin(θ/2)
 */
export function chordLength(radius: number, angleDegrees: number): number {
  const halfAngleRad = (angleDegrees * Math.PI) / 360;
  return 2 * radius * Math.sin(halfAngleRad);
}

/**
 * Calculate central angle from arc length
 * θ = (L / 2πr) × 360
 */
export function centralAngleFromArcLength(
  arcLen: number,
  radius: number
): number {
  return (arcLen / circumference(radius)) * 360;
}

/**
 * Calculate inscribed angle from central angle
 * Inscribed angle = Central angle / 2
 */
export function inscribedAngleFromCentral(centralAngleDegrees: number): number {
  return centralAngleDegrees / 2;
}

// ============================================
// COORDINATE CALCULATIONS
// ============================================

/**
 * Convert polar to Cartesian coordinates (SVG convention)
 * 0° = right (3 o'clock), angles increase clockwise
 */
export function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleDegrees: number
): LabeledPoint {
  const angleRadians = (angleDegrees * Math.PI) / 180;
  return {
    x: centerX + radius * Math.cos(angleRadians),
    y: centerY + radius * Math.sin(angleRadians),
  };
}

/**
 * Convert Cartesian to polar angle (SVG convention)
 * Returns angle in degrees (0-360)
 */
export function cartesianToPolar(
  centerX: number,
  centerY: number,
  pointX: number,
  pointY: number
): number {
  const dx = pointX - centerX;
  const dy = pointY - centerY;
  let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  if (angle < 0) angle += 360;
  return angle;
}

/**
 * Calculate point on circumference at given angle
 */
export function pointOnCircle(
  center: LabeledPoint,
  radius: number,
  angleDegrees: number
): LabeledPoint {
  return polarToCartesian(center.x, center.y, radius, angleDegrees);
}

/**
 * Calculate midpoint of an arc (point at the middle angle)
 */
export function arcMidpoint(
  center: LabeledPoint,
  radius: number,
  startAngle: number,
  endAngle: number
): LabeledPoint {
  // Handle wraparound
  let midAngle: number;
  if (endAngle < startAngle) {
    // Arc crosses 0°
    midAngle = ((startAngle + endAngle + 360) / 2) % 360;
  } else {
    midAngle = (startAngle + endAngle) / 2;
  }
  return pointOnCircle(center, radius, midAngle);
}

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
 * Normalize angle to 0-360 range
 */
export function normalizeAngle(angle: number): number {
  let normalized = angle % 360;
  if (normalized < 0) normalized += 360;
  return normalized;
}

/**
 * Calculate angle difference (always positive, in range 0-360)
 */
export function angleDifference(startAngle: number, endAngle: number): number {
  let diff = normalizeAngle(endAngle) - normalizeAngle(startAngle);
  if (diff < 0) diff += 360;
  return diff;
}

// ============================================
// SVG PATH GENERATION
// ============================================

/**
 * Generate SVG path for a full circle using two arcs
 */
export function circlePath(center: LabeledPoint, radius: number): string {
  const x = center.x;
  const y = center.y;
  return `M ${x - radius} ${y} A ${radius} ${radius} 0 1 0 ${x + radius} ${y} A ${radius} ${radius} 0 1 0 ${x - radius} ${y}`;
}

/**
 * Generate SVG path for an arc
 * startAngle and endAngle in degrees (SVG convention: 0° = right, clockwise positive)
 */
export function describeArc(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(centerX, centerY, radius, startAngle);
  const end = polarToCartesian(centerX, centerY, radius, endAngle);

  // Determine if arc should sweep more than 180 degrees
  const diff = angleDifference(startAngle, endAngle);
  const largeArcFlag = diff > 180 ? 1 : 0;

  // SVG arc: sweep-flag 1 = clockwise
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

/**
 * Generate SVG path for a sector (pie slice)
 */
export function describeSector(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(centerX, centerY, radius, startAngle);
  const end = polarToCartesian(centerX, centerY, radius, endAngle);

  const diff = angleDifference(startAngle, endAngle);
  const largeArcFlag = diff > 180 ? 1 : 0;

  return `M ${centerX} ${centerY} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
}

/**
 * Generate SVG path for angle arc (small arc for angle visualization)
 * Same as describeArc but with a smaller radius for angle markers
 */
export function describeAngleArc(
  centerX: number,
  centerY: number,
  arcRadius: number,
  startAngle: number,
  endAngle: number
): string {
  return describeArc(centerX, centerY, arcRadius, startAngle, endAngle);
}

// ============================================
// LABEL POSITIONING
// ============================================

/**
 * Calculate optimal label position for center point
 * Positions label to the upper-right by default
 */
export function calculateCenterLabelPosition(
  center: LabeledPoint,
  offset: number = 15
): LabeledPoint {
  return {
    x: center.x + offset,
    y: center.y - offset,
  };
}

/**
 * Calculate label position for a point on the circumference
 * Places label outside the circle, along the radius direction
 */
export function calculateCircumferenceLabelPosition(
  center: LabeledPoint,
  radius: number,
  angleDegrees: number,
  offset: number = 15
): LabeledPoint {
  return pointOnCircle(center, radius + offset, angleDegrees);
}

/**
 * Calculate label position for a radius line (midpoint with perpendicular offset)
 */
export function calculateRadiusLabelPosition(
  center: LabeledPoint,
  radius: number,
  angleDegrees: number,
  offset: number = 12
): LabeledPoint {
  const midRadius = radius / 2;
  const point = pointOnCircle(center, midRadius, angleDegrees);

  // Offset perpendicular to the radius (90° counterclockwise in SVG = -90°)
  const perpAngle = angleDegrees - 90;
  const offsetX = offset * Math.cos((perpAngle * Math.PI) / 180);
  const offsetY = offset * Math.sin((perpAngle * Math.PI) / 180);

  return {
    x: point.x + offsetX,
    y: point.y + offsetY,
  };
}

/**
 * Calculate label position for a diameter line (center with perpendicular offset)
 */
export function calculateDiameterLabelPosition(
  center: LabeledPoint,
  angle: number,
  offset: number = 12
): LabeledPoint {
  // Offset perpendicular to the diameter
  const perpAngle = angle - 90;
  const offsetX = offset * Math.cos((perpAngle * Math.PI) / 180);
  const offsetY = offset * Math.sin((perpAngle * Math.PI) / 180);

  return {
    x: center.x + offsetX,
    y: center.y + offsetY,
  };
}

/**
 * Calculate label position for a chord (midpoint with offset away from center)
 */
export function calculateChordLabelPosition(
  center: LabeledPoint,
  radius: number,
  fromAngle: number,
  toAngle: number,
  offset: number = 12
): LabeledPoint {
  const p1 = pointOnCircle(center, radius, fromAngle);
  const p2 = pointOnCircle(center, radius, toAngle);

  const midX = (p1.x + p2.x) / 2;
  const midY = (p1.y + p2.y) / 2;

  // Direction from center to midpoint of chord
  const dx = midX - center.x;
  const dy = midY - center.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist === 0) return { x: midX, y: midY - offset };

  // Offset away from center
  return {
    x: midX + (dx / dist) * offset,
    y: midY + (dy / dist) * offset,
  };
}

/**
 * Calculate label position for central angle (inside the angle arc)
 */
export function calculateAngleLabelPosition(
  center: LabeledPoint,
  arcRadius: number,
  startAngle: number,
  endAngle: number
): LabeledPoint {
  const midAngle = (startAngle + endAngle) / 2;
  return pointOnCircle(center, arcRadius + 10, midAngle);
}

/**
 * Calculate label position for inscribed angle
 */
export function calculateInscribedAngleLabelPosition(
  vertex: LabeledPoint,
  center: LabeledPoint,
  arcRadius: number = 20
): LabeledPoint {
  // Direction from center to vertex (outward)
  const dx = vertex.x - center.x;
  const dy = vertex.y - center.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist === 0) return { x: vertex.x, y: vertex.y - arcRadius };

  // Position label outside the vertex, away from center
  return {
    x: vertex.x + (dx / dist) * (arcRadius + 5),
    y: vertex.y + (dy / dist) * (arcRadius + 5),
  };
}

// ============================================
// VIEWBOX CALCULATIONS
// ============================================

/**
 * Calculate bounding box for circle with padding
 */
export function calculateViewBox(
  center: LabeledPoint,
  radius: number,
  padding: number = 40
): { minX: number; minY: number; width: number; height: number } {
  const minX = center.x - radius - padding;
  const minY = center.y - radius - padding;
  const size = (radius + padding) * 2;

  return {
    minX,
    minY,
    width: size,
    height: size,
  };
}

// ============================================
// VALIDATION
// ============================================

/**
 * Validate circle parameters
 */
export function validateCircle(
  center: LabeledPoint,
  radius: number
): { valid: boolean; error?: string } {
  if (radius <= 0) {
    return { valid: false, error: 'El radio debe ser mayor a 0' };
  }

  if (!Number.isFinite(center.x) || !Number.isFinite(center.y)) {
    return {
      valid: false,
      error: 'Las coordenadas del centro deben ser números válidos',
    };
  }

  if (!Number.isFinite(radius)) {
    return { valid: false, error: 'El radio debe ser un número válido' };
  }

  return { valid: true };
}

/**
 * Validate sector angles
 */
export function validateSector(
  startAngle: number,
  endAngle: number
): { valid: boolean; error?: string } {
  if (!Number.isFinite(startAngle) || !Number.isFinite(endAngle)) {
    return { valid: false, error: 'Los ángulos deben ser números válidos' };
  }

  const diff = angleDifference(startAngle, endAngle);
  if (diff === 0) {
    return {
      valid: false,
      error: 'Los ángulos de inicio y fin no pueden ser iguales',
    };
  }

  return { valid: true };
}

/**
 * Validate chord angles
 */
export function validateChord(
  fromAngle: number,
  toAngle: number
): { valid: boolean; error?: string } {
  if (!Number.isFinite(fromAngle) || !Number.isFinite(toAngle)) {
    return { valid: false, error: 'Los ángulos deben ser números válidos' };
  }

  const diff = angleDifference(fromAngle, toAngle);
  if (diff === 0 || diff === 360) {
    return {
      valid: false,
      error: 'Los puntos de la cuerda no pueden ser el mismo',
    };
  }

  return { valid: true };
}

// ============================================
// STROKE DASH ARRAY
// ============================================

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
// ANGLE CALCULATIONS FOR INSCRIBED ANGLES
// ============================================

/**
 * Calculate the angle at a point (vertex) given two other points
 * Returns angle in degrees
 */
export function angleAtPoint(
  vertex: LabeledPoint,
  p1: LabeledPoint,
  p2: LabeledPoint
): number {
  // Vectors from vertex to each point
  const v1 = { x: p1.x - vertex.x, y: p1.y - vertex.y };
  const v2 = { x: p2.x - vertex.x, y: p2.y - vertex.y };

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
 * Get the angle from a point to another point (direction angle)
 * Returns angle in degrees (0-360, SVG convention)
 */
export function angleToPoint(from: LabeledPoint, to: LabeledPoint): number {
  return cartesianToPolar(from.x, from.y, to.x, to.y);
}

/**
 * Describe an angle arc between two rays from a common vertex
 * Used for inscribed angle visualization
 */
export function describeAngleArcBetweenPoints(
  vertex: LabeledPoint,
  p1: LabeledPoint,
  p2: LabeledPoint,
  arcRadius: number = 20
): string {
  const angle1 = angleToPoint(vertex, p1);
  const angle2 = angleToPoint(vertex, p2);

  // Determine the smaller arc
  let startAngle = angle1;
  let endAngle = angle2;

  let diff = endAngle - startAngle;
  if (diff < 0) diff += 360;

  // If the arc is more than 180°, swap to get the smaller arc
  if (diff > 180) {
    [startAngle, endAngle] = [endAngle, startAngle];
  }

  return describeArc(vertex.x, vertex.y, arcRadius, startAngle, endAngle);
}
