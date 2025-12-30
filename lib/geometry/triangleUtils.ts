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
    case 'altura':
      return {
        start: vertices[fromVertex],
        end: altitudeFootPoint(vertices, fromVertex),
      };

    case 'mediana':
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

    case 'mediatriz': {
      // Perpendicular bisector of a side
      const sideIndex = config.toSide ?? fromVertex;
      const sideP1 = vertices[sideIndex];
      const sideP2 = vertices[(sideIndex + 1) % 3];

      const mid = midpoint(sideP1, sideP2);

      // Perpendicular direction
      const dx = sideP2.x - sideP1.x;
      const dy = sideP2.y - sideP1.y;
      const perp = normalize({ x: -dy, y: dx });

      // Extend in both directions
      const length = distance(sideP1, sideP2) * 0.3;

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
