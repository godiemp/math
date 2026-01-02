/**
 * Utility functions for quadrilateral calculations
 * Following the pattern from triangleUtils.ts
 */

import type {
  LabeledPoint,
  QuadrilateralType,
  QuadrilateralProperties,
  QuadrilateralValidation,
  FromTypeConfig,
  QuadSpecialLineConfig,
} from '@/lib/types/quadrilateral';

// ============================================
// BASIC CALCULATIONS
// ============================================

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
 * Calculate the centroid (center of mass) of a quadrilateral
 */
export function centroid(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint]
): LabeledPoint {
  return {
    x: (vertices[0].x + vertices[1].x + vertices[2].x + vertices[3].x) / 4,
    y: (vertices[0].y + vertices[1].y + vertices[2].y + vertices[3].y) / 4,
  };
}

/**
 * Calculate the interior angle at a vertex in degrees
 */
export function angleAtVertex(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint],
  vertexIndex: 0 | 1 | 2 | 3
): number {
  const v = vertices[vertexIndex];
  const p1 = vertices[(vertexIndex + 3) % 4]; // Previous vertex
  const p2 = vertices[(vertexIndex + 1) % 4]; // Next vertex

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
 * Calculate the perimeter of a quadrilateral
 */
export function perimeter(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint]
): number {
  let sum = 0;
  for (let i = 0; i < 4; i++) {
    sum += distance(vertices[i], vertices[(i + 1) % 4]);
  }
  return sum;
}

/**
 * Calculate the area using the Shoelace formula
 * Works for both convex and concave polygons
 */
export function area(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint]
): number {
  const [p0, p1, p2, p3] = vertices;
  const sum =
    (p0.x * p1.y - p1.x * p0.y) +
    (p1.x * p2.y - p2.x * p1.y) +
    (p2.x * p3.y - p3.x * p2.y) +
    (p3.x * p0.y - p0.x * p3.y);
  return Math.abs(sum) / 2;
}

/**
 * Get the length of a specific side
 */
export function sideLength(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint],
  sideIndex: 0 | 1 | 2 | 3
): number {
  return distance(vertices[sideIndex], vertices[(sideIndex + 1) % 4]);
}

// ============================================
// GEOMETRY DETECTION
// ============================================

/**
 * Check if two sides are parallel
 */
export function areSidesParallel(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint],
  side1: 0 | 1 | 2 | 3,
  side2: 0 | 1 | 2 | 3,
  tolerance: number = 0.02
): boolean {
  const getSideVector = (idx: number) => {
    const p1 = vertices[idx];
    const p2 = vertices[(idx + 1) % 4];
    return { x: p2.x - p1.x, y: p2.y - p1.y };
  };

  const v1 = getSideVector(side1);
  const v2 = getSideVector(side2);

  // Cross product should be ~0 for parallel lines
  const cross = v1.x * v2.y - v1.y * v2.x;
  const mag1 = Math.sqrt(v1.x ** 2 + v1.y ** 2);
  const mag2 = Math.sqrt(v2.x ** 2 + v2.y ** 2);

  if (mag1 === 0 || mag2 === 0) return false;

  return Math.abs(cross) / (mag1 * mag2) < tolerance;
}

/**
 * Check if two sides are equal in length
 */
export function areSidesEqual(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint],
  side1: 0 | 1 | 2 | 3,
  side2: 0 | 1 | 2 | 3,
  tolerance: number = 0.02
): boolean {
  const len1 = sideLength(vertices, side1);
  const len2 = sideLength(vertices, side2);
  const avg = (len1 + len2) / 2;
  if (avg === 0) return true;
  return Math.abs(len1 - len2) / avg < tolerance;
}

/**
 * Check if a vertex has approximately a right angle (90 degrees)
 */
export function isRightAngle(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint],
  vertexIndex: 0 | 1 | 2 | 3,
  tolerance: number = 3
): boolean {
  const angle = angleAtVertex(vertices, vertexIndex);
  return Math.abs(angle - 90) < tolerance;
}

/**
 * Detect all pairs of parallel sides
 * Returns array of [sideIndex1, sideIndex2] pairs
 */
export function detectParallelSides(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint]
): Array<[number, number]> {
  const pairs: Array<[number, number]> = [];

  // Check opposite sides (0-2 and 1-3)
  if (areSidesParallel(vertices, 0, 2)) {
    pairs.push([0, 2]);
  }
  if (areSidesParallel(vertices, 1, 3)) {
    pairs.push([1, 3]);
  }

  return pairs;
}

/**
 * Detect groups of equal sides
 * Returns array of arrays, each containing indices of equal sides
 */
export function detectEqualSides(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint]
): number[][] {
  const lengths = [
    sideLength(vertices, 0),
    sideLength(vertices, 1),
    sideLength(vertices, 2),
    sideLength(vertices, 3),
  ];

  const tolerance = 0.02;
  const groups: number[][] = [];
  const assigned = new Set<number>();

  for (let i = 0; i < 4; i++) {
    if (assigned.has(i)) continue;

    const group = [i];
    assigned.add(i);

    for (let j = i + 1; j < 4; j++) {
      if (assigned.has(j)) continue;

      const avg = (lengths[i] + lengths[j]) / 2;
      if (avg > 0 && Math.abs(lengths[i] - lengths[j]) / avg < tolerance) {
        group.push(j);
        assigned.add(j);
      }
    }

    if (group.length > 1) {
      groups.push(group);
    }
  }

  return groups;
}

/**
 * Detect all vertices with right angles
 */
export function detectRightAngles(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint]
): number[] {
  const rightAngles: number[] = [];
  for (let i = 0; i < 4; i++) {
    if (isRightAngle(vertices, i as 0 | 1 | 2 | 3)) {
      rightAngles.push(i);
    }
  }
  return rightAngles;
}

// ============================================
// CONVEXITY AND INTERSECTION CHECKS
// ============================================

/**
 * Check if quadrilateral is convex
 * A quadrilateral is convex if all cross products have the same sign
 */
export function isConvex(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint]
): boolean {
  const crossProducts: number[] = [];

  for (let i = 0; i < 4; i++) {
    const p1 = vertices[i];
    const p2 = vertices[(i + 1) % 4];
    const p3 = vertices[(i + 2) % 4];

    const cross =
      (p2.x - p1.x) * (p3.y - p2.y) - (p2.y - p1.y) * (p3.x - p2.x);
    crossProducts.push(cross);
  }

  return (
    crossProducts.every((c) => c >= 0) || crossProducts.every((c) => c <= 0)
  );
}

/**
 * Check if two line segments intersect
 */
function segmentsIntersect(
  p1: LabeledPoint,
  p2: LabeledPoint,
  p3: LabeledPoint,
  p4: LabeledPoint
): boolean {
  const ccw = (A: LabeledPoint, B: LabeledPoint, C: LabeledPoint): boolean => {
    return (C.y - A.y) * (B.x - A.x) > (B.y - A.y) * (C.x - A.x);
  };

  return (
    ccw(p1, p3, p4) !== ccw(p2, p3, p4) && ccw(p1, p2, p3) !== ccw(p1, p2, p4)
  );
}

/**
 * Check if quadrilateral is self-intersecting (bowtie shape)
 */
export function isSelfIntersecting(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint]
): boolean {
  // Check if opposite sides intersect
  // Side 0-1 vs Side 2-3
  const intersect1 = segmentsIntersect(
    vertices[0],
    vertices[1],
    vertices[2],
    vertices[3]
  );

  // Side 1-2 vs Side 3-0
  const intersect2 = segmentsIntersect(
    vertices[1],
    vertices[2],
    vertices[3],
    vertices[0]
  );

  return intersect1 || intersect2;
}

/**
 * Check if 3 or more points are collinear (degenerate quadrilateral)
 */
export function hasCollinearPoints(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint],
  tolerance: number = 0.001
): boolean {
  // Check all combinations of 3 points
  const combinations = [
    [0, 1, 2],
    [0, 1, 3],
    [0, 2, 3],
    [1, 2, 3],
  ];

  for (const [i, j, k] of combinations) {
    const p1 = vertices[i];
    const p2 = vertices[j];
    const p3 = vertices[k];

    // Calculate area of triangle formed by these 3 points
    const triangleArea = Math.abs(
      (p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2
    );

    // If area is very small, points are collinear
    const maxDist = Math.max(
      distance(p1, p2),
      distance(p2, p3),
      distance(p1, p3)
    );

    if (maxDist > 0 && triangleArea / maxDist < tolerance) {
      return true;
    }
  }

  return false;
}

// ============================================
// DIAGONAL CALCULATIONS
// ============================================

/**
 * Calculate the intersection point of the two diagonals
 * Returns null if diagonals don't intersect (e.g., in concave quads)
 */
export function diagonalIntersection(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint]
): LabeledPoint | null {
  const [p0, p1, p2, p3] = vertices;

  // Diagonal 1: p0 to p2
  // Diagonal 2: p1 to p3

  // Line 1: p0 + t*(p2-p0)
  // Line 2: p1 + s*(p3-p1)

  const d1 = { x: p2.x - p0.x, y: p2.y - p0.y };
  const d2 = { x: p3.x - p1.x, y: p3.y - p1.y };

  const denom = d1.x * d2.y - d1.y * d2.x;

  if (Math.abs(denom) < 0.0001) {
    // Parallel diagonals (shouldn't happen in a valid quad)
    return null;
  }

  const t = ((p1.x - p0.x) * d2.y - (p1.y - p0.y) * d2.x) / denom;

  // Check if intersection is within both segments
  const s = ((p1.x - p0.x) * d1.y - (p1.y - p0.y) * d1.x) / denom;

  // For convex quads, t and s should be between 0 and 1
  // For concave quads, intersection might be outside
  const intersection = {
    x: p0.x + t * d1.x,
    y: p0.y + t * d1.y,
  };

  // Return the intersection point (even if outside for concave quads)
  return intersection;
}

/**
 * Check if diagonals bisect each other (parallelogram property)
 */
export function diagonalsBisectEachOther(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint],
  tolerance: number = 0.02
): boolean {
  const mid1 = midpoint(vertices[0], vertices[2]);
  const mid2 = midpoint(vertices[1], vertices[3]);

  const dist = distance(mid1, mid2);
  const diag1Len = distance(vertices[0], vertices[2]);
  const diag2Len = distance(vertices[1], vertices[3]);
  const avgDiag = (diag1Len + diag2Len) / 2;

  if (avgDiag === 0) return true;

  return dist / avgDiag < tolerance;
}

/**
 * Check if diagonals are perpendicular (rhombus/kite property)
 */
export function diagonalsArePerpendicular(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint],
  tolerance: number = 3
): boolean {
  const d1 = { x: vertices[2].x - vertices[0].x, y: vertices[2].y - vertices[0].y };
  const d2 = { x: vertices[3].x - vertices[1].x, y: vertices[3].y - vertices[1].y };

  const dot = d1.x * d2.x + d1.y * d2.y;
  const mag1 = Math.sqrt(d1.x ** 2 + d1.y ** 2);
  const mag2 = Math.sqrt(d2.x ** 2 + d2.y ** 2);

  if (mag1 === 0 || mag2 === 0) return false;

  const cosAngle = dot / (mag1 * mag2);
  const angle = Math.acos(Math.max(-1, Math.min(1, cosAngle))) * (180 / Math.PI);

  return Math.abs(angle - 90) < tolerance;
}

/**
 * Check if diagonals are equal in length (rectangle property)
 */
export function diagonalsAreEqual(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint],
  tolerance: number = 0.02
): boolean {
  const d1 = distance(vertices[0], vertices[2]);
  const d2 = distance(vertices[1], vertices[3]);
  const avg = (d1 + d2) / 2;

  if (avg === 0) return true;

  return Math.abs(d1 - d2) / avg < tolerance;
}

// ============================================
// QUADRILATERAL TYPE DETECTION
// ============================================

/**
 * Check if quadrilateral is a kite (cometa)
 * Two pairs of adjacent sides are equal
 */
function isKiteShape(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint]
): boolean {
  const sides = [
    sideLength(vertices, 0),
    sideLength(vertices, 1),
    sideLength(vertices, 2),
    sideLength(vertices, 3),
  ];

  const tolerance = 0.02;
  const isEqual = (a: number, b: number) => {
    const avg = (a + b) / 2;
    return avg === 0 || Math.abs(a - b) / avg < tolerance;
  };

  // Check for two pairs of adjacent equal sides
  // Pattern 1: sides 0,1 equal and sides 2,3 equal
  // Pattern 2: sides 1,2 equal and sides 3,0 equal
  return (
    (isEqual(sides[0], sides[1]) && isEqual(sides[2], sides[3])) ||
    (isEqual(sides[1], sides[2]) && isEqual(sides[3], sides[0]))
  );
}

/**
 * Check if trapezoid is isosceles
 */
function isIsoscelesTrapezoid(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint],
  parallelPairs: Array<[number, number]>
): boolean {
  if (parallelPairs.length !== 1) return false;

  const [parallel1, parallel2] = parallelPairs[0];

  // Get the non-parallel sides (legs)
  const legs = [0, 1, 2, 3].filter((i) => i !== parallel1 && i !== parallel2);

  if (legs.length !== 2) return false;

  return areSidesEqual(vertices, legs[0] as 0 | 1 | 2 | 3, legs[1] as 0 | 1 | 2 | 3);
}

/**
 * Detect the quadrilateral type from vertices
 */
export function detectQuadrilateralType(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint]
): QuadrilateralType {
  const rightAngles = detectRightAngles(vertices);
  const parallelPairs = detectParallelSides(vertices);
  const equalGroups = detectEqualSides(vertices);

  const allRightAngles = rightAngles.length === 4;
  const twoParallelPairs = parallelPairs.length === 2;
  const oneParallelPair = parallelPairs.length === 1;

  // Check if all 4 sides are equal
  const allSidesEqual = equalGroups.some((g) => g.length === 4);

  // Check if opposite sides are equal (pairs: 0-2 and 1-3)
  const oppositeSidesEqual =
    areSidesEqual(vertices, 0, 2) && areSidesEqual(vertices, 1, 3);

  // Square: 4 right angles + 4 equal sides
  if (allRightAngles && allSidesEqual) {
    return 'cuadrado';
  }

  // Rectangle: 4 right angles + opposite sides equal (but not all equal)
  if (allRightAngles && oppositeSidesEqual && !allSidesEqual) {
    return 'rectangulo';
  }

  // Rhombus: 4 equal sides + 2 parallel pairs + NOT all right angles
  if (allSidesEqual && twoParallelPairs && !allRightAngles) {
    return 'rombo';
  }

  // Parallelogram: 2 parallel pairs + opposite sides equal (but not all equal, not all right)
  if (twoParallelPairs && oppositeSidesEqual && !allRightAngles && !allSidesEqual) {
    return 'paralelogramo';
  }

  // Kite: 2 pairs of adjacent equal sides (check before trapezoid)
  if (isKiteShape(vertices) && !twoParallelPairs) {
    return 'cometa';
  }

  // Trapezoids: exactly 1 parallel pair
  if (oneParallelPair) {
    // Right trapezoid: 2 right angles
    if (rightAngles.length === 2) {
      return 'trapecio-rectangulo';
    }

    // Isosceles trapezoid: equal legs
    if (isIsoscelesTrapezoid(vertices, parallelPairs)) {
      return 'trapecio-isosceles';
    }

    return 'trapecio';
  }

  return 'irregular';
}

/**
 * Get complete analysis of quadrilateral properties
 */
export function analyzeQuadrilateral(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint]
): QuadrilateralProperties {
  const type = detectQuadrilateralType(vertices);
  const parallelPairs = detectParallelSides(vertices);
  const equalGroups = detectEqualSides(vertices);
  const rightAngles = detectRightAngles(vertices);

  const d1Length = distance(vertices[0], vertices[2]);
  const d2Length = distance(vertices[1], vertices[3]);

  const intersection = diagonalIntersection(vertices);
  const convex = isConvex(vertices);

  return {
    type,
    perimeter: perimeter(vertices),
    area: area(vertices),
    diagonalLengths: [d1Length, d2Length],
    diagonalsIntersect: intersection !== null && convex,
    diagonalIntersectionPoint: intersection || undefined,
    diagonalsBisectEachOther: diagonalsBisectEachOther(vertices),
    diagonalsAreEqual: diagonalsAreEqual(vertices),
    diagonalsPerpendicular: diagonalsArePerpendicular(vertices),
    parallelSidePairs: parallelPairs,
    equalSideGroups: equalGroups,
    rightAngleVertices: rightAngles,
    isConvex: convex,
    isSelfIntersecting: isSelfIntersecting(vertices),
  };
}

// ============================================
// QUADRILATERAL BUILDERS
// ============================================

/**
 * Rotate a point around a center
 */
function rotatePoint(
  point: { x: number; y: number },
  center: { x: number; y: number },
  angleDegrees: number
): { x: number; y: number } {
  const angleRad = (angleDegrees * Math.PI) / 180;
  const cos = Math.cos(angleRad);
  const sin = Math.sin(angleRad);

  const dx = point.x - center.x;
  const dy = point.y - center.y;

  return {
    x: center.x + dx * cos - dy * sin,
    y: center.y + dx * sin + dy * cos,
  };
}

/**
 * Build a square from side length
 */
export function buildSquare(
  sideLength: number,
  centerX: number = 200,
  centerY: number = 150,
  rotation: number = 0
): [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint] {
  const half = sideLength / 2;

  // Build with center at origin, then translate
  const rawVertices = [
    { x: -half, y: -half },
    { x: half, y: -half },
    { x: half, y: half },
    { x: -half, y: half },
  ];

  const center = { x: 0, y: 0 };

  const rotated = rawVertices.map((v) => rotatePoint(v, center, rotation));

  return [
    { x: Math.round(rotated[0].x + centerX), y: Math.round(rotated[0].y + centerY), label: 'A' },
    { x: Math.round(rotated[1].x + centerX), y: Math.round(rotated[1].y + centerY), label: 'B' },
    { x: Math.round(rotated[2].x + centerX), y: Math.round(rotated[2].y + centerY), label: 'C' },
    { x: Math.round(rotated[3].x + centerX), y: Math.round(rotated[3].y + centerY), label: 'D' },
  ];
}

/**
 * Build a rectangle from dimensions
 */
export function buildRectangle(
  width: number,
  height: number,
  centerX: number = 200,
  centerY: number = 150,
  rotation: number = 0
): [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint] {
  const halfW = width / 2;
  const halfH = height / 2;

  const rawVertices = [
    { x: -halfW, y: -halfH },
    { x: halfW, y: -halfH },
    { x: halfW, y: halfH },
    { x: -halfW, y: halfH },
  ];

  const center = { x: 0, y: 0 };
  const rotated = rawVertices.map((v) => rotatePoint(v, center, rotation));

  return [
    { x: Math.round(rotated[0].x + centerX), y: Math.round(rotated[0].y + centerY), label: 'A' },
    { x: Math.round(rotated[1].x + centerX), y: Math.round(rotated[1].y + centerY), label: 'B' },
    { x: Math.round(rotated[2].x + centerX), y: Math.round(rotated[2].y + centerY), label: 'C' },
    { x: Math.round(rotated[3].x + centerX), y: Math.round(rotated[3].y + centerY), label: 'D' },
  ];
}

/**
 * Build a rhombus from side length and acute angle
 */
export function buildRhombus(
  sideLength: number,
  acuteAngle: number,
  centerX: number = 200,
  centerY: number = 150,
  rotation: number = 0
): [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint] {
  // Calculate diagonals from side and angle
  const angleRad = (acuteAngle * Math.PI) / 180;
  const d1 = 2 * sideLength * Math.sin(angleRad / 2); // Short diagonal
  const d2 = 2 * sideLength * Math.cos(angleRad / 2); // Long diagonal

  const halfD1 = d1 / 2;
  const halfD2 = d2 / 2;

  // Rhombus with diagonals along axes
  const rawVertices = [
    { x: 0, y: -halfD2 },     // Top
    { x: halfD1, y: 0 },      // Right
    { x: 0, y: halfD2 },      // Bottom
    { x: -halfD1, y: 0 },     // Left
  ];

  const center = { x: 0, y: 0 };
  const rotated = rawVertices.map((v) => rotatePoint(v, center, rotation));

  return [
    { x: Math.round(rotated[0].x + centerX), y: Math.round(rotated[0].y + centerY), label: 'A' },
    { x: Math.round(rotated[1].x + centerX), y: Math.round(rotated[1].y + centerY), label: 'B' },
    { x: Math.round(rotated[2].x + centerX), y: Math.round(rotated[2].y + centerY), label: 'C' },
    { x: Math.round(rotated[3].x + centerX), y: Math.round(rotated[3].y + centerY), label: 'D' },
  ];
}

/**
 * Build a parallelogram from base, height, and angle
 */
export function buildParallelogram(
  base: number,
  height: number,
  angle: number,
  centerX: number = 200,
  centerY: number = 150,
  rotation: number = 0
): [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint] {
  const angleRad = (angle * Math.PI) / 180;
  const offset = height / Math.tan(angleRad);

  const halfBase = base / 2;
  const halfHeight = height / 2;
  const halfOffset = offset / 2;

  // Build parallelogram
  const rawVertices = [
    { x: -halfBase + halfOffset, y: -halfHeight },
    { x: halfBase + halfOffset, y: -halfHeight },
    { x: halfBase - halfOffset, y: halfHeight },
    { x: -halfBase - halfOffset, y: halfHeight },
  ];

  const center = { x: 0, y: 0 };
  const rotated = rawVertices.map((v) => rotatePoint(v, center, rotation));

  return [
    { x: Math.round(rotated[0].x + centerX), y: Math.round(rotated[0].y + centerY), label: 'A' },
    { x: Math.round(rotated[1].x + centerX), y: Math.round(rotated[1].y + centerY), label: 'B' },
    { x: Math.round(rotated[2].x + centerX), y: Math.round(rotated[2].y + centerY), label: 'C' },
    { x: Math.round(rotated[3].x + centerX), y: Math.round(rotated[3].y + centerY), label: 'D' },
  ];
}

/**
 * Build a trapezoid (trapecio)
 */
export function buildTrapezoid(
  bottomBase: number,
  topBase: number,
  height: number,
  variant: 'regular' | 'isosceles' | 'right' = 'isosceles',
  centerX: number = 200,
  centerY: number = 150,
  rotation: number = 0
): [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint] {
  const halfBottom = bottomBase / 2;
  const halfTop = topBase / 2;
  const halfHeight = height / 2;

  let rawVertices: { x: number; y: number }[];

  if (variant === 'right') {
    // Right trapezoid - one side is vertical
    rawVertices = [
      { x: -halfBottom, y: halfHeight },
      { x: halfBottom, y: halfHeight },
      { x: halfBottom, y: -halfHeight },
      { x: -halfBottom + (bottomBase - topBase), y: -halfHeight },
    ];
  } else {
    // Isosceles or regular - symmetric
    rawVertices = [
      { x: -halfBottom, y: halfHeight },
      { x: halfBottom, y: halfHeight },
      { x: halfTop, y: -halfHeight },
      { x: -halfTop, y: -halfHeight },
    ];
  }

  const center = { x: 0, y: 0 };
  const rotated = rawVertices.map((v) => rotatePoint(v, center, rotation));

  return [
    { x: Math.round(rotated[0].x + centerX), y: Math.round(rotated[0].y + centerY), label: 'A' },
    { x: Math.round(rotated[1].x + centerX), y: Math.round(rotated[1].y + centerY), label: 'B' },
    { x: Math.round(rotated[2].x + centerX), y: Math.round(rotated[2].y + centerY), label: 'C' },
    { x: Math.round(rotated[3].x + centerX), y: Math.round(rotated[3].y + centerY), label: 'D' },
  ];
}

/**
 * Build a kite (cometa/deltoide)
 */
export function buildKite(
  shortDiagonal: number,
  longDiagonal: number,
  ratio: number = 0.3,
  centerX: number = 200,
  centerY: number = 150,
  rotation: number = 0
): [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint] {
  const halfShort = shortDiagonal / 2;
  const topPart = longDiagonal * ratio;
  const bottomPart = longDiagonal * (1 - ratio);

  // Kite with vertical long diagonal
  const rawVertices = [
    { x: 0, y: -topPart },        // Top
    { x: halfShort, y: 0 },       // Right
    { x: 0, y: bottomPart },      // Bottom
    { x: -halfShort, y: 0 },      // Left
  ];

  const center = { x: 0, y: 0 };
  const rotated = rawVertices.map((v) => rotatePoint(v, center, rotation));

  return [
    { x: Math.round(rotated[0].x + centerX), y: Math.round(rotated[0].y + centerY), label: 'A' },
    { x: Math.round(rotated[1].x + centerX), y: Math.round(rotated[1].y + centerY), label: 'B' },
    { x: Math.round(rotated[2].x + centerX), y: Math.round(rotated[2].y + centerY), label: 'C' },
    { x: Math.round(rotated[3].x + centerX), y: Math.round(rotated[3].y + centerY), label: 'D' },
  ];
}

/**
 * Build quadrilateral from type configuration
 */
export function buildQuadrilateralFromType(
  config: FromTypeConfig
): [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint] {
  const {
    type,
    size = 100,
    height = size,
    angle = 60,
    baseRatio = 0.6,
    diagonalRatio = 0.3,
    rotation = 0,
    centerX = 200,
    centerY = 150,
  } = config;

  switch (type) {
    case 'cuadrado':
      return buildSquare(size, centerX, centerY, rotation);

    case 'rectangulo':
      return buildRectangle(size, height, centerX, centerY, rotation);

    case 'rombo':
      return buildRhombus(size, angle, centerX, centerY, rotation);

    case 'paralelogramo':
      return buildParallelogram(size, height, angle, centerX, centerY, rotation);

    case 'trapecio':
      return buildTrapezoid(size, size * baseRatio, height, 'regular', centerX, centerY, rotation);

    case 'trapecio-isosceles':
      return buildTrapezoid(size, size * baseRatio, height, 'isosceles', centerX, centerY, rotation);

    case 'trapecio-rectangulo':
      return buildTrapezoid(size, size * baseRatio, height, 'right', centerX, centerY, rotation);

    case 'cometa':
      return buildKite(size * 0.8, size * 1.2, diagonalRatio, centerX, centerY, rotation);

    case 'irregular':
    default:
      // Default irregular quadrilateral
      return [
        { x: Math.round(centerX - size / 2), y: Math.round(centerY - size / 3), label: 'A' },
        { x: Math.round(centerX + size / 2), y: Math.round(centerY - size / 4), label: 'B' },
        { x: Math.round(centerX + size / 3), y: Math.round(centerY + size / 2), label: 'C' },
        { x: Math.round(centerX - size / 4), y: Math.round(centerY + size / 3), label: 'D' },
      ];
  }
}

// ============================================
// SVG PATH GENERATION
// ============================================

/**
 * Generate SVG path for the quadrilateral
 */
export function quadrilateralPath(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint]
): string {
  const [p1, p2, p3, p4] = vertices;
  return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} L ${p4.x} ${p4.y} Z`;
}

/**
 * Generate SVG path for a diagonal
 */
export function diagonalPath(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint],
  from: 0 | 1 | 2 | 3,
  to: 0 | 1 | 2 | 3
): string {
  const p1 = vertices[from];
  const p2 = vertices[to];
  return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
}

/**
 * Calculate the angle in degrees for a ray from origin to point
 */
export function angleToPoint(origin: LabeledPoint, point: LabeledPoint): number {
  const dx = point.x - origin.x;
  const dy = point.y - origin.y;
  const radians = Math.atan2(dy, dx);
  const degrees = (radians * 180) / Math.PI;
  return ((degrees + 90 + 360) % 360);
}

/**
 * Convert polar to Cartesian (0° = up, clockwise)
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
 * Generate SVG arc path
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
  const angle1 = angleToPoint(vertex, p1);
  const angle2 = angleToPoint(vertex, p2);

  let startAngle = angle1;
  let endAngle = angle2;

  let diff = endAngle - startAngle;
  if (diff < 0) diff += 360;

  if (diff > 180) {
    [startAngle, endAngle] = [endAngle, startAngle];
  }

  return describeArc(vertex.x, vertex.y, radius, startAngle, endAngle);
}

/**
 * Normalize a vector
 */
function normalize(v: { x: number; y: number }): { x: number; y: number } {
  const mag = Math.sqrt(v.x * v.x + v.y * v.y);
  if (mag === 0) return { x: 0, y: 0 };
  return { x: v.x / mag, y: v.y / mag };
}

/**
 * Generate SVG path for right angle marker (small square)
 */
export function describeRightAngleMarker(
  vertex: LabeledPoint,
  p1: LabeledPoint,
  p2: LabeledPoint,
  size: number = 12
): string {
  const v1 = normalize({ x: p1.x - vertex.x, y: p1.y - vertex.y });
  const v2 = normalize({ x: p2.x - vertex.x, y: p2.y - vertex.y });

  const corner1 = { x: vertex.x + v1.x * size, y: vertex.y + v1.y * size };
  const corner2 = {
    x: vertex.x + v1.x * size + v2.x * size,
    y: vertex.y + v1.y * size + v2.y * size,
  };
  const corner3 = { x: vertex.x + v2.x * size, y: vertex.y + v2.y * size };

  return `M ${corner1.x} ${corner1.y} L ${corner2.x} ${corner2.y} L ${corner3.x} ${corner3.y}`;
}

/**
 * Generate SVG path for parallel marks (arrows on a side)
 */
export function describeParallelMarks(
  p1: LabeledPoint,
  p2: LabeledPoint,
  count: 1 | 2 = 1,
  size: number = 8
): string {
  const mid = midpoint(p1, p2);
  const dir = normalize({ x: p2.x - p1.x, y: p2.y - p1.y });
  const perp = { x: -dir.y, y: dir.x };

  const paths: string[] = [];
  const spacing = count === 2 ? size * 0.6 : 0;

  for (let i = 0; i < count; i++) {
    const offset = count === 2 ? (i === 0 ? -spacing : spacing) : 0;
    const baseX = mid.x + dir.x * offset;
    const baseY = mid.y + dir.y * offset;

    // Arrow pointing along the side
    const tip = { x: baseX + dir.x * size * 0.5, y: baseY + dir.y * size * 0.5 };
    const left = {
      x: baseX - dir.x * size * 0.5 + perp.x * size * 0.4,
      y: baseY - dir.y * size * 0.5 + perp.y * size * 0.4,
    };
    const right = {
      x: baseX - dir.x * size * 0.5 - perp.x * size * 0.4,
      y: baseY - dir.y * size * 0.5 - perp.y * size * 0.4,
    };

    paths.push(`M ${left.x} ${left.y} L ${tip.x} ${tip.y} L ${right.x} ${right.y}`);
  }

  return paths.join(' ');
}

/**
 * Generate SVG path for equal marks (tick marks on a side)
 */
export function describeEqualMarks(
  p1: LabeledPoint,
  p2: LabeledPoint,
  count: 1 | 2 | 3 = 1,
  size: number = 8
): string {
  const mid = midpoint(p1, p2);
  const dir = normalize({ x: p2.x - p1.x, y: p2.y - p1.y });
  const perp = { x: -dir.y, y: dir.x };

  const paths: string[] = [];
  const spacing = size * 0.5;

  for (let i = 0; i < count; i++) {
    const offset = (i - (count - 1) / 2) * spacing;
    const baseX = mid.x + dir.x * offset;
    const baseY = mid.y + dir.y * offset;

    const start = {
      x: baseX + perp.x * size * 0.5,
      y: baseY + perp.y * size * 0.5,
    };
    const end = {
      x: baseX - perp.x * size * 0.5,
      y: baseY - perp.y * size * 0.5,
    };

    paths.push(`M ${start.x} ${start.y} L ${end.x} ${end.y}`);
  }

  return paths.join(' ');
}

// ============================================
// LABEL POSITIONING
// ============================================

/**
 * Calculate vertex label position (away from centroid)
 */
export function calculateVertexLabelPosition(
  vertex: LabeledPoint,
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint],
  offset: number = 15
): { x: number; y: number } {
  const c = centroid(vertices);

  const dx = vertex.x - c.x;
  const dy = vertex.y - c.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist === 0) return { x: vertex.x, y: vertex.y - offset };

  return {
    x: vertex.x + (dx / dist) * offset,
    y: vertex.y + (dy / dist) * offset,
  };
}

/**
 * Calculate side label position (midpoint with offset away from center)
 */
export function calculateSideLabelPosition(
  p1: LabeledPoint,
  p2: LabeledPoint,
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint],
  offset: number = 12
): { x: number; y: number } {
  const mid = midpoint(p1, p2);
  const c = centroid(vertices);

  const dx = mid.x - c.x;
  const dy = mid.y - c.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist === 0) return { x: mid.x, y: mid.y - offset };

  return {
    x: mid.x + (dx / dist) * offset,
    y: mid.y + (dy / dist) * offset,
  };
}

/**
 * Calculate diagonal label position (near midpoint, offset from center)
 */
export function calculateDiagonalLabelPosition(
  p1: LabeledPoint,
  p2: LabeledPoint,
  offset: number = 10
): { x: number; y: number } {
  const mid = midpoint(p1, p2);

  // Offset perpendicular to the diagonal
  const dir = normalize({ x: p2.x - p1.x, y: p2.y - p1.y });
  const perp = { x: -dir.y, y: dir.x };

  return {
    x: mid.x + perp.x * offset,
    y: mid.y + perp.y * offset,
  };
}

// ============================================
// VIEWBOX AND SCALING
// ============================================

/**
 * Calculate bounding box of vertices with padding
 */
export function calculateViewBox(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint],
  padding: number = 40
): { minX: number; minY: number; width: number; height: number } {
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
 * Scale vertices to fit within a target size
 */
export function scaleToFit(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint],
  maxSize: number,
  centerX: number = 200,
  centerY: number = 150
): [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint] {
  const xs = vertices.map((v) => v.x);
  const ys = vertices.map((v) => v.y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const width = maxX - minX;
  const height = maxY - minY;

  if (width === 0 && height === 0) return vertices;

  const scale = maxSize / Math.max(width, height);

  const currentCenterX = (minX + maxX) / 2;
  const currentCenterY = (minY + maxY) / 2;

  return vertices.map((v, i) => ({
    x: Math.round((v.x - currentCenterX) * scale + centerX),
    y: Math.round((v.y - currentCenterY) * scale + centerY),
    label: v.label || ['A', 'B', 'C', 'D'][i],
  })) as [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint];
}

// ============================================
// VALIDATION
// ============================================

/**
 * Validate that vertices form a valid quadrilateral
 */
export function validateQuadrilateral(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint]
): QuadrilateralValidation {
  const warnings: string[] = [];

  // Check for degenerate case (3+ collinear points)
  if (hasCollinearPoints(vertices)) {
    return {
      valid: false,
      error: 'Tres o más puntos son colineales. El cuadrilátero es degenerado.',
    };
  }

  // Check for zero area
  const quadArea = area(vertices);
  if (quadArea < 0.001) {
    return {
      valid: false,
      error: 'El cuadrilátero tiene área cero o muy pequeña.',
    };
  }

  // Check for self-intersection (warning, not error)
  if (isSelfIntersecting(vertices)) {
    warnings.push('El cuadrilátero es auto-intersectante (forma de moño).');
  }

  return {
    valid: true,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
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
// SPECIAL LINE CALCULATIONS
// ============================================

/**
 * Calculate the foot of the altitude from a vertex to a side
 */
export function altitudeFootPoint(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint],
  fromVertex: 0 | 1 | 2 | 3,
  toSide: 0 | 1 | 2 | 3
): LabeledPoint {
  const A = vertices[fromVertex];
  const B = vertices[toSide];
  const C = vertices[(toSide + 1) % 4];

  // Vector from B to C
  const BC = { x: C.x - B.x, y: C.y - B.y };
  // Vector from B to A
  const BA = { x: A.x - B.x, y: A.y - B.y };

  const lenBC = BC.x * BC.x + BC.y * BC.y;
  if (lenBC === 0) return B;

  // Project BA onto BC
  const t = (BA.x * BC.x + BA.y * BC.y) / lenBC;

  return {
    x: B.x + t * BC.x,
    y: B.y + t * BC.y,
  };
}

/**
 * Calculate endpoints for a special line
 */
export function calculateSpecialLineEndpoints(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint],
  config: QuadSpecialLineConfig
): { start: LabeledPoint; end: LabeledPoint } {
  const fromVertex = config.fromVertex ?? 0;

  switch (config.type) {
    case 'diagonal': {
      const toVertex = (fromVertex + 2) % 4;
      return {
        start: vertices[fromVertex],
        end: vertices[toVertex],
      };
    }

    case 'altura': {
      const toSide = config.toSide ?? ((fromVertex + 2) % 4);
      return {
        start: vertices[fromVertex],
        end: altitudeFootPoint(vertices, fromVertex, toSide as 0 | 1 | 2 | 3),
      };
    }

    case 'mediatriz': {
      const sideIndex = config.toSide ?? 0;
      const sideP1 = vertices[sideIndex];
      const sideP2 = vertices[(sideIndex + 1) % 4];

      const mid = midpoint(sideP1, sideP2);
      const dx = sideP2.x - sideP1.x;
      const dy = sideP2.y - sideP1.y;
      const perp = normalize({ x: -dy, y: dx });

      const length = distance(sideP1, sideP2) * 0.4;

      return {
        start: { x: mid.x - perp.x * length, y: mid.y - perp.y * length },
        end: { x: mid.x + perp.x * length, y: mid.y + perp.y * length },
      };
    }

    case 'mediana': {
      // Line connecting midpoints of opposite sides
      const side1 = fromVertex;
      const side2 = (fromVertex + 2) % 4;

      const mid1 = midpoint(vertices[side1], vertices[(side1 + 1) % 4]);
      const mid2 = midpoint(vertices[side2], vertices[(side2 + 1) % 4]);

      return { start: mid1, end: mid2 };
    }

    default:
      return { start: vertices[0], end: vertices[2] };
  }
}
