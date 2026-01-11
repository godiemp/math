/**
 * Utility functions for triangle calculations
 */

import type { LabeledPoint, SpecialLineConfig } from '@/lib/types/triangle';

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
 * Calculate the centroid (center of mass) of a triangle
 * Intersection of the three medians
 */
export function centroid(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint]
): LabeledPoint {
  return {
    x: (vertices[0].x + vertices[1].x + vertices[2].x) / 3,
    y: (vertices[0].y + vertices[1].y + vertices[2].y) / 3,
  };
}

/**
 * Calculate the incenter (intersection of angle bisectors)
 * Equidistant from all three sides
 * Formula: weighted average by opposite side lengths
 */
export function incenter(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint]
): LabeledPoint {
  const [A, B, C] = vertices;
  const a = distance(B, C); // side opposite to A
  const b = distance(A, C); // side opposite to B
  const c = distance(A, B); // side opposite to C
  const perimeter = a + b + c;

  return {
    x: (a * A.x + b * B.x + c * C.x) / perimeter,
    y: (a * A.y + b * B.y + c * C.y) / perimeter,
  };
}

/**
 * Calculate the area of a triangle using the cross product formula
 */
export function triangleArea(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint]
): number {
  const [A, B, C] = vertices;
  // Area = |((Bx - Ax)(Cy - Ay) - (Cx - Ax)(By - Ay))| / 2
  return Math.abs((B.x - A.x) * (C.y - A.y) - (C.x - A.x) * (B.y - A.y)) / 2;
}

/**
 * Calculate the inradius (radius of inscribed circle)
 * Formula: Area / semiperimeter
 */
export function inradius(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint]
): number {
  const area = triangleArea(vertices);
  const [A, B, C] = vertices;
  const a = distance(B, C);
  const b = distance(A, C);
  const c = distance(A, B);
  const semiperimeter = (a + b + c) / 2;

  return area / semiperimeter;
}

/**
 * Calculate the circumcenter (intersection of perpendicular bisectors)
 * Equidistant from all three vertices
 */
export function circumcenter(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint]
): LabeledPoint {
  const [A, B, C] = vertices;

  // Using the formula based on determinants
  // The circumcenter is the solution to the system of perpendicular bisector equations
  const D = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));

  if (Math.abs(D) < 0.0001) {
    // Degenerate case (collinear points)
    return centroid(vertices);
  }

  const Ax2 = A.x * A.x + A.y * A.y;
  const Bx2 = B.x * B.x + B.y * B.y;
  const Cx2 = C.x * C.x + C.y * C.y;

  const ux = (Ax2 * (B.y - C.y) + Bx2 * (C.y - A.y) + Cx2 * (A.y - B.y)) / D;
  const uy = (Ax2 * (C.x - B.x) + Bx2 * (A.x - C.x) + Cx2 * (B.x - A.x)) / D;

  return { x: ux, y: uy };
}

/**
 * Calculate the circumradius (radius of circumscribed circle)
 * Distance from circumcenter to any vertex
 */
export function circumradius(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint]
): number {
  const cc = circumcenter(vertices);
  return distance(cc, vertices[0]);
}

/**
 * Calculate the orthocenter (intersection of altitudes)
 * Uses the relationship: O = A + B + C - 2 * circumcenter (in position vectors from origin)
 * Or equivalently: O = A + B + C - 2G where G would be... no, use direct formula
 */
export function orthocenter(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint]
): LabeledPoint {
  const [A, B, C] = vertices;

  // Using the formula: H = A + B + C - 2*O where O is circumcenter
  // This is based on the Euler line relationship
  const cc = circumcenter(vertices);

  return {
    x: A.x + B.x + C.x - 2 * cc.x,
    y: A.y + B.y + C.y - 2 * cc.y,
  };
}

/**
 * Calculate the angle at a vertex in degrees
 */
export function angleAtVertex(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint],
  vertexIndex: 0 | 1 | 2
): number {
  const v = vertices[vertexIndex];
  const p1 = vertices[(vertexIndex + 1) % 3];
  const p2 = vertices[(vertexIndex + 2) % 3];

  // Vectors from vertex to adjacent points
  const v1 = { x: p1.x - v.x, y: p1.y - v.y };
  const v2 = { x: p2.x - v.x, y: p2.y - v.y };

  // Dot product
  const dot = v1.x * v2.x + v1.y * v2.y;

  // Magnitudes
  const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
  const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

  // Angle in radians, then convert to degrees
  const cosAngle = dot / (mag1 * mag2);
  const angleRad = Math.acos(Math.max(-1, Math.min(1, cosAngle)));

  return (angleRad * 180) / Math.PI;
}

/**
 * Check if a vertex has approximately a right angle (90 degrees)
 */
export function isRightAngle(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint],
  vertexIndex: 0 | 1 | 2,
  tolerance: number = 2
): boolean {
  const angle = angleAtVertex(vertices, vertexIndex);
  return Math.abs(angle - 90) < tolerance;
}

/**
 * Find the vertex with a right angle, if any
 */
export function findRightAngleVertex(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint],
  tolerance: number = 2
): 0 | 1 | 2 | null {
  for (let i = 0; i < 3; i++) {
    if (isRightAngle(vertices, i as 0 | 1 | 2, tolerance)) {
      return i as 0 | 1 | 2;
    }
  }
  return null;
}

/**
 * Calculate the foot of the altitude from a vertex to the opposite side
 */
export function altitudeFootPoint(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint],
  fromVertex: 0 | 1 | 2
): LabeledPoint {
  const A = vertices[fromVertex];
  const B = vertices[(fromVertex + 1) % 3];
  const C = vertices[(fromVertex + 2) % 3];

  // Vector from B to C
  const BC = { x: C.x - B.x, y: C.y - B.y };
  // Vector from B to A
  const BA = { x: A.x - B.x, y: A.y - B.y };

  // Project BA onto BC to find the parameter t
  const t = (BA.x * BC.x + BA.y * BC.y) / (BC.x * BC.x + BC.y * BC.y);

  return {
    x: B.x + t * BC.x,
    y: B.y + t * BC.y,
  };
}

/**
 * Calculate the endpoint of a median (midpoint of opposite side)
 */
export function medianEndpoint(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint],
  fromVertex: 0 | 1 | 2
): LabeledPoint {
  const B = vertices[(fromVertex + 1) % 3];
  const C = vertices[(fromVertex + 2) % 3];
  return midpoint(B, C);
}

/**
 * Calculate label position for a vertex (positioned away from centroid)
 */
export function calculateVertexLabelPosition(
  vertex: LabeledPoint,
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint],
  offset: number = 15
): { x: number; y: number } {
  const c = centroid(vertices);

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
 * Calculate label position for a side (midpoint with offset perpendicular to side)
 */
export function calculateSideLabelPosition(
  p1: LabeledPoint,
  p2: LabeledPoint,
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint],
  offset: number = 12
): { x: number; y: number } {
  const mid = midpoint(p1, p2);
  const c = centroid(vertices);

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
 * Convert polar coordinates to Cartesian
 * Convention: 0° = 12 o'clock (top), angles increase clockwise
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

  return ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(
    ' '
  );
}

/**
 * Calculate the angle in degrees for a ray from origin to point
 * Returns angle in SVG convention (0° = up, clockwise positive)
 */
export function angleToPoint(origin: LabeledPoint, point: LabeledPoint): number {
  const dx = point.x - origin.x;
  const dy = point.y - origin.y;
  // atan2 gives angle from positive x-axis, counterclockwise
  // We convert to: 0° = up (negative y), clockwise positive
  const radians = Math.atan2(dy, dx);
  const degrees = (radians * 180) / Math.PI;
  // Convert: 0° was right, we want 0° to be up
  // So we add 90° and ensure it's in [0, 360)
  return ((degrees + 90 + 360) % 360);
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
  // Unit vectors along each side
  const v1 = normalize({ x: p1.x - vertex.x, y: p1.y - vertex.y });
  const v2 = normalize({ x: p2.x - vertex.x, y: p2.y - vertex.y });

  // Create square corners
  const corner1 = { x: vertex.x + v1.x * size, y: vertex.y + v1.y * size };
  const corner2 = {
    x: vertex.x + v1.x * size + v2.x * size,
    y: vertex.y + v1.y * size + v2.y * size,
  };
  const corner3 = { x: vertex.x + v2.x * size, y: vertex.y + v2.y * size };

  return `M ${corner1.x} ${corner1.y} L ${corner2.x} ${corner2.y} L ${corner3.x} ${corner3.y}`;
}

/**
 * Calculate the endpoints for a special line
 */
export function calculateSpecialLineEndpoints(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint],
  config: SpecialLineConfig
): { start: LabeledPoint; end: LabeledPoint } {
  const fromVertex = config.fromVertex;

  switch (config.type) {
    case 'altura': {
      // For altitudes, we extend the line beyond the foot point to show the orthocenter
      // This is especially important for obtuse triangles where the orthocenter is outside
      const foot = altitudeFootPoint(vertices, fromVertex);
      const vertex = vertices[fromVertex];

      // Direction from vertex to foot (perpendicular to opposite side)
      const dx = foot.x - vertex.x;
      const dy = foot.y - vertex.y;
      const len = Math.sqrt(dx * dx + dy * dy);

      if (len < 0.0001) {
        // Degenerate case
        return { start: vertex, end: foot };
      }

      // Calculate dynamic extension based on triangle size
      const side0 = distance(vertices[0], vertices[1]);
      const side1 = distance(vertices[1], vertices[2]);
      const side2 = distance(vertices[2], vertices[0]);
      const maxSide = Math.max(side0, side1, side2);
      // Extend well beyond to ensure orthocenter is visible (1.5x max side from foot)
      const extension = Math.max(maxSide * 1.5, 150);

      // Normalize direction
      const dirX = dx / len;
      const dirY = dy / len;

      // Extend in both directions from the vertex
      return {
        start: { x: vertex.x - dirX * extension, y: vertex.y - dirY * extension },
        end: { x: vertex.x + dirX * extension, y: vertex.y + dirY * extension },
      };
    }

    case 'transversal':
    case 'mediana':
      // Transversal de gravedad (Chilean term) / Median
      return {
        start: vertices[fromVertex],
        end: medianEndpoint(vertices, fromVertex),
      };

    case 'bisectriz': {
      // Angle bisector: extends to opposite side
      const v = vertices[fromVertex];
      const p1 = vertices[(fromVertex + 1) % 3];
      const p2 = vertices[(fromVertex + 2) % 3];

      // Unit vectors to adjacent vertices
      const u1 = normalize({ x: p1.x - v.x, y: p1.y - v.y });
      const u2 = normalize({ x: p2.x - v.x, y: p2.y - v.y });

      // Bisector direction (sum of unit vectors)
      const bisector = normalize({ x: u1.x + u2.x, y: u1.y + u2.y });

      // Find intersection with opposite side (line from p1 to p2)
      // Parametric form: v + t * bisector = p1 + s * (p2 - p1)
      const d = { x: p2.x - p1.x, y: p2.y - p1.y };
      const denom = bisector.x * d.y - bisector.y * d.x;

      if (Math.abs(denom) < 0.0001) {
        // Parallel, shouldn't happen in a valid triangle
        return { start: v, end: midpoint(p1, p2) };
      }

      const t =
        ((p1.x - v.x) * d.y - (p1.y - v.y) * d.x) / denom;

      return {
        start: v,
        end: { x: v.x + t * bisector.x, y: v.y + t * bisector.y },
      };
    }

    case 'mediatriz':
    case 'simetral': {
      // Perpendicular bisector (simetral) of a side
      // fromVertex determines which side: 0 = side BC (opposite to A), 1 = side AC (opposite to B), 2 = side AB (opposite to C)
      const sideIndex = config.toSide ?? fromVertex;
      // Get the two vertices that form this side (opposite to the fromVertex)
      const sideP1 = vertices[(sideIndex + 1) % 3];
      const sideP2 = vertices[(sideIndex + 2) % 3];

      const mid = midpoint(sideP1, sideP2);

      // Perpendicular direction
      const dx = sideP2.x - sideP1.x;
      const dy = sideP2.y - sideP1.y;
      const perp = normalize({ x: -dy, y: dx });

      // Calculate dynamic length based on triangle size
      // Use the maximum side length as reference, multiplied by a factor to ensure lines extend well beyond the triangle
      const side0 = distance(vertices[0], vertices[1]);
      const side1 = distance(vertices[1], vertices[2]);
      const side2 = distance(vertices[2], vertices[0]);
      const maxSide = Math.max(side0, side1, side2);
      // Extend 1.5x the max side length in each direction (total 3x), with a minimum of 150
      const length = Math.max(maxSide * 1.5, 150);

      return {
        start: { x: mid.x - perp.x * length, y: mid.y - perp.y * length },
        end: { x: mid.x + perp.x * length, y: mid.y + perp.y * length },
      };
    }

    default:
      return { start: vertices[0], end: vertices[1] };
  }
}

/**
 * Calculate bounding box of vertices with padding
 */
export function calculateViewBox(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint],
  padding: number = 30
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
 * Generate SVG path for the triangle
 */
export function trianglePath(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint]
): string {
  const [p1, p2, p3] = vertices;
  return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} Z`;
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
 * Build triangle vertices from 3 interior angles + constraints
 * Uses the Sine Rule: a/sin(A) = b/sin(B) = c/sin(C)
 *
 * The triangle is scaled to fit within a target bounding box, maintaining
 * the correct angle proportions regardless of how extreme the angles are.
 *
 * @param angles - 3 interior angles in degrees (must sum to 180)
 * @param maxSize - Maximum width or height of the bounding box
 * @param centerX - X coordinate of the triangle center
 * @param centerY - Y coordinate of the triangle center
 * @param rotation - Rotation angle in degrees (0 = base horizontal)
 * @returns Tuple of 3 vertices [A, B, C]
 */
export function buildTriangleFromAngles(
  angles: [number, number, number],
  maxSize: number = 150,
  centerX: number = 200,
  centerY: number = 150,
  rotation: number = 0
): [LabeledPoint, LabeledPoint, LabeledPoint] {
  const [angleA, angleB, angleC] = angles;

  // Validate angles sum to 180
  const sum = angleA + angleB + angleC;
  if (Math.abs(sum - 180) > 0.01) {
    console.warn(`Angles must sum to 180°, got ${sum}°. Adjusting angleC.`);
  }

  // Convert angles to radians
  const A = (angleA * Math.PI) / 180;
  const B = (angleB * Math.PI) / 180;
  const C = (angleC * Math.PI) / 180;

  // Using sine rule to calculate relative side lengths
  // a/sin(A) = b/sin(B) = c/sin(C) = k
  // Start with unit scale (k=1), then normalize later
  const sideC = Math.sin(C); // Base side (A to B)
  const sideB = Math.sin(B); // Side A to C

  // Build triangle with vertex A at origin, AB along positive x-axis
  // Vertex positions (unit scale)
  const ax = 0;
  const ay = 0;
  const bx = sideC;
  const by = 0;

  // C is positioned using angle at A
  const cx = sideB * Math.cos(A);
  const cy = -sideB * Math.sin(A); // Negative because SVG y-axis is inverted

  // Calculate bounding box of the unit triangle
  const minX = Math.min(ax, bx, cx);
  const maxX = Math.max(ax, bx, cx);
  const minY = Math.min(ay, by, cy);
  const maxY = Math.max(ay, by, cy);

  const width = maxX - minX;
  const height = maxY - minY;

  // Scale to fit within maxSize, maintaining aspect ratio
  const scale = maxSize / Math.max(width, height);

  // Scale and center the vertices
  const scaledAx = (ax - minX) * scale;
  const scaledAy = (ay - minY) * scale;
  const scaledBx = (bx - minX) * scale;
  const scaledBy = (by - minY) * scale;
  const scaledCx = (cx - minX) * scale;
  const scaledCy = (cy - minY) * scale;

  // Calculate centroid of scaled triangle
  const centroidX = (scaledAx + scaledBx + scaledCx) / 3;
  const centroidY = (scaledAy + scaledBy + scaledCy) / 3;

  // Apply rotation around centroid and translate to target center
  const rotRad = (rotation * Math.PI) / 180;
  const cosR = Math.cos(rotRad);
  const sinR = Math.sin(rotRad);

  function transformPoint(x: number, y: number): { x: number; y: number } {
    const dx = x - centroidX;
    const dy = y - centroidY;
    return {
      x: dx * cosR - dy * sinR + centerX,
      y: dx * sinR + dy * cosR + centerY,
    };
  }

  const vertexA = transformPoint(scaledAx, scaledAy);
  const vertexB = transformPoint(scaledBx, scaledBy);
  const vertexC = transformPoint(scaledCx, scaledCy);

  return [
    { x: Math.round(vertexA.x), y: Math.round(vertexA.y), label: 'A' },
    { x: Math.round(vertexB.x), y: Math.round(vertexB.y), label: 'B' },
    { x: Math.round(vertexC.x), y: Math.round(vertexC.y), label: 'C' },
  ];
}

/**
 * Validate that angles can form a valid triangle
 */
export function validateTriangleAngles(
  angles: [number, number, number]
): { valid: boolean; error?: string } {
  const [a, b, c] = angles;

  if (a <= 0 || b <= 0 || c <= 0) {
    return { valid: false, error: 'Todos los ángulos deben ser mayores a 0°' };
  }

  if (a >= 180 || b >= 180 || c >= 180) {
    return { valid: false, error: 'Ningún ángulo puede ser mayor o igual a 180°' };
  }

  const sum = a + b + c;
  if (Math.abs(sum - 180) > 0.01) {
    return { valid: false, error: `Los ángulos deben sumar 180° (actual: ${sum.toFixed(1)}°)` };
  }

  return { valid: true };
}

/**
 * Validate that side lengths can form a valid triangle (triangle inequality)
 */
export function validateTriangleSides(
  sides: [number, number, number]
): { valid: boolean; error?: string } {
  const [a, b, c] = sides;

  if (a <= 0 || b <= 0 || c <= 0) {
    return { valid: false, error: 'Todos los lados deben ser mayores a 0' };
  }

  // Triangle inequality: sum of any two sides must be greater than the third
  if (a + b <= c || b + c <= a || a + c <= b) {
    return { valid: false, error: 'Los lados no satisfacen la desigualdad triangular (a+b > c)' };
  }

  return { valid: true };
}

/**
 * Build triangle vertices from 3 side lengths using law of cosines
 *
 * @param sides - 3 side lengths [a, b, c] where a is opposite to vertex A
 * @param maxSize - Maximum width or height of the bounding box
 * @param centerX - X coordinate of the triangle center
 * @param centerY - Y coordinate of the triangle center
 * @param rotation - Rotation angle in degrees (0 = base horizontal)
 * @returns Tuple of 3 vertices [A, B, C]
 */
export function buildTriangleFromSides(
  sides: [number, number, number],
  maxSize: number = 150,
  centerX: number = 200,
  centerY: number = 150,
  rotation: number = 0
): [LabeledPoint, LabeledPoint, LabeledPoint] {
  const [a, b, c] = sides;

  // Use law of cosines to calculate angles
  // cos(A) = (b² + c² - a²) / (2bc)
  const cosA = (b * b + c * c - a * a) / (2 * b * c);
  const A = Math.acos(Math.max(-1, Math.min(1, cosA))); // Clamp to avoid NaN

  // Build triangle with:
  // - Vertex B at origin
  // - Vertex C along positive x-axis at distance 'a' (side BC = a)
  // - Vertex A at angle A from BC
  const bx = 0;
  const by = 0;
  const cx = a; // Side BC = a (opposite to vertex A)
  const cy = 0;

  // A is at distance 'c' from B (side AB = c) at angle A above the x-axis
  const ax = c * Math.cos(A);
  const ay = -c * Math.sin(A); // Negative for SVG coordinate system

  // Calculate bounding box
  const minX = Math.min(ax, bx, cx);
  const maxX = Math.max(ax, bx, cx);
  const minY = Math.min(ay, by, cy);
  const maxY = Math.max(ay, by, cy);

  const width = maxX - minX;
  const height = maxY - minY;

  // Scale to fit within maxSize
  const scale = maxSize / Math.max(width, height);

  // Scale and normalize vertices
  const scaledAx = (ax - minX) * scale;
  const scaledAy = (ay - minY) * scale;
  const scaledBx = (bx - minX) * scale;
  const scaledBy = (by - minY) * scale;
  const scaledCx = (cx - minX) * scale;
  const scaledCy = (cy - minY) * scale;

  // Calculate centroid
  const centroidX = (scaledAx + scaledBx + scaledCx) / 3;
  const centroidY = (scaledAy + scaledBy + scaledCy) / 3;

  // Apply rotation and translation
  const rotRad = (rotation * Math.PI) / 180;
  const cosR = Math.cos(rotRad);
  const sinR = Math.sin(rotRad);

  function transformPoint(x: number, y: number): { x: number; y: number } {
    const dx = x - centroidX;
    const dy = y - centroidY;
    return {
      x: dx * cosR - dy * sinR + centerX,
      y: dx * sinR + dy * cosR + centerY,
    };
  }

  const vertexA = transformPoint(scaledAx, scaledAy);
  const vertexB = transformPoint(scaledBx, scaledBy);
  const vertexC = transformPoint(scaledCx, scaledCy);

  return [
    { x: Math.round(vertexA.x), y: Math.round(vertexA.y), label: 'A' },
    { x: Math.round(vertexB.x), y: Math.round(vertexB.y), label: 'B' },
    { x: Math.round(vertexC.x), y: Math.round(vertexC.y), label: 'C' },
  ];
}
