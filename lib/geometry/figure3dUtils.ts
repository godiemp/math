/**
 * 3D Geometry Utilities for Figure3D component
 * Handles vector math, projections, solid generation, and visibility calculations
 */

import type {
  Point3D,
  ProjectedPoint,
  LabeledPoint,
  SolidGeometry,
  SphereGeometry,
  ProjectionConfig,
  ProjectionType,
  SolidDimensions,
  CubeDimensions,
  PrismaRectangularDimensions,
  PrismaTriangularDimensions,
  PiramideCuadradaDimensions,
  PiramideTriangularDimensions,
  CilindroDimensions,
  ConoDimensions,
  EsferaDimensions,
  ValidationResult,
  PROJECTION_DEFAULTS,
} from '../types/figure3d';

// ============================================
// VECTOR MATH
// ============================================

/**
 * Create a Point3D
 */
export function vec3(x: number, y: number, z: number, label?: string): Point3D {
  return { x, y, z, label };
}

/**
 * Add two 3D vectors
 */
export function vec3Add(a: Point3D, b: Point3D): Point3D {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

/**
 * Subtract two 3D vectors (a - b)
 */
export function vec3Subtract(a: Point3D, b: Point3D): Point3D {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

/**
 * Scale a 3D vector
 */
export function vec3Scale(v: Point3D, s: number): Point3D {
  return { x: v.x * s, y: v.y * s, z: v.z * s };
}

/**
 * Dot product of two 3D vectors
 */
export function vec3Dot(a: Point3D, b: Point3D): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

/**
 * Cross product of two 3D vectors
 */
export function vec3Cross(a: Point3D, b: Point3D): Point3D {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

/**
 * Length of a 3D vector
 */
export function vec3Length(v: Point3D): number {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

/**
 * Normalize a 3D vector (unit length)
 */
export function vec3Normalize(v: Point3D): Point3D {
  const len = vec3Length(v);
  if (len === 0) return { x: 0, y: 0, z: 0 };
  return { x: v.x / len, y: v.y / len, z: v.z / len };
}

/**
 * Calculate centroid of multiple 3D points
 */
export function vec3Centroid(points: Point3D[]): Point3D {
  if (points.length === 0) return { x: 0, y: 0, z: 0 };
  const sum = points.reduce(
    (acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y, z: acc.z + p.z }),
    { x: 0, y: 0, z: 0 }
  );
  return {
    x: sum.x / points.length,
    y: sum.y / points.length,
    z: sum.z / points.length,
  };
}

// ============================================
// ROTATION FUNCTIONS
// ============================================

/**
 * Convert degrees to radians
 */
export function degToRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Rotate a point around the X axis
 */
export function rotateX(point: Point3D, angleDeg: number): Point3D {
  const rad = degToRad(angleDeg);
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x: point.x,
    y: point.y * cos - point.z * sin,
    z: point.y * sin + point.z * cos,
  };
}

/**
 * Rotate a point around the Y axis
 */
export function rotateY(point: Point3D, angleDeg: number): Point3D {
  const rad = degToRad(angleDeg);
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x: point.x * cos + point.z * sin,
    y: point.y,
    z: -point.x * sin + point.z * cos,
  };
}

/**
 * Rotate a point around the Z axis
 */
export function rotateZ(point: Point3D, angleDeg: number): Point3D {
  const rad = degToRad(angleDeg);
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x: point.x * cos - point.y * sin,
    y: point.x * sin + point.y * cos,
    z: point.z,
  };
}

/**
 * Apply combined azimuth (Y-axis) and elevation (X-axis) rotation
 * Order: rotate around Y first (azimuth), then around X (elevation)
 */
export function rotatePoint(point: Point3D, azimuthDeg: number, elevationDeg: number): Point3D {
  // First rotate around Y (azimuth - horizontal rotation)
  const afterY = rotateY(point, azimuthDeg);
  // Then rotate around X (elevation - tilt)
  return rotateX(afterY, elevationDeg);
}

// ============================================
// PROJECTION FUNCTIONS
// ============================================

/**
 * Normalize projection config from type shorthand or full config
 */
export function normalizeProjectionConfig(
  projection: ProjectionConfig | ProjectionType | undefined,
  rotationOverride?: { azimuth: number; elevation: number }
): ProjectionConfig {
  const defaults = {
    isometric: { azimuth: 45, elevation: 35.264, depthScale: 1 },
    cavalier: { azimuth: 45, elevation: 0, depthScale: 1 },
    cabinet: { azimuth: 45, elevation: 0, depthScale: 0.5 },
    dimetric: { azimuth: 42, elevation: 20, depthScale: 0.5 },
  };

  if (typeof projection === 'string') {
    const def = defaults[projection];
    return {
      type: projection,
      azimuth: rotationOverride?.azimuth ?? def.azimuth,
      elevation: rotationOverride?.elevation ?? def.elevation,
      scale: def.depthScale,
    };
  }

  if (projection) {
    const def = defaults[projection.type];
    return {
      type: projection.type,
      azimuth: rotationOverride?.azimuth ?? projection.azimuth ?? def.azimuth,
      elevation: rotationOverride?.elevation ?? projection.elevation ?? def.elevation,
      scale: projection.scale ?? def.depthScale,
    };
  }

  // Default to isometric
  const def = defaults.isometric;
  return {
    type: 'isometric',
    azimuth: rotationOverride?.azimuth ?? def.azimuth,
    elevation: rotationOverride?.elevation ?? def.elevation,
    scale: 1,
  };
}

/**
 * Project a 3D point to 2D using isometric projection
 * Standard isometric: 30° angles, equal foreshortening on all axes
 */
export function projectIsometric(point: Point3D): { x: number; y: number } {
  // Isometric projection angles
  const angle = degToRad(30);
  const cos30 = Math.cos(angle);
  const sin30 = Math.sin(angle);

  return {
    x: (point.x - point.z) * cos30,
    y: -point.y + (point.x + point.z) * sin30,
  };
}

/**
 * Project a 3D point to 2D using cavalier projection
 * Cavalier: depth at 45°, full scale
 */
export function projectCavalier(point: Point3D): { x: number; y: number } {
  const angle = degToRad(45);
  const cos45 = Math.cos(angle);
  const sin45 = Math.sin(angle);

  return {
    x: point.x + point.z * cos45,
    y: -point.y + point.z * sin45,
  };
}

/**
 * Project a 3D point to 2D using cabinet projection
 * Cabinet: depth at 45°, half scale
 */
export function projectCabinet(point: Point3D): { x: number; y: number } {
  const angle = degToRad(45);
  const cos45 = Math.cos(angle);
  const sin45 = Math.sin(angle);
  const depthScale = 0.5;

  return {
    x: point.x + point.z * cos45 * depthScale,
    y: -point.y + point.z * sin45 * depthScale,
  };
}

/**
 * Project a 3D point to 2D with arbitrary rotation (dimetric/custom)
 */
export function projectWithRotation(
  point: Point3D,
  azimuthDeg: number,
  elevationDeg: number
): { x: number; y: number; depth: number } {
  // Rotate point based on view angles
  const rotated = rotatePoint(point, azimuthDeg, elevationDeg);

  // Orthographic projection (drop z for x,y, keep z as depth)
  return {
    x: rotated.x,
    y: -rotated.y, // Invert Y for SVG coordinate system
    depth: rotated.z,
  };
}

/**
 * Main projection function - project 3D point to 2D with offset and scale
 */
export function project3Dto2D(
  point: Point3D,
  config: ProjectionConfig,
  centerX: number,
  centerY: number,
  scale: number = 1
): ProjectedPoint {
  const azimuth = config.azimuth ?? 45;
  const elevation = config.elevation ?? 35;

  // Use rotation-based projection for all types (most flexible)
  const projected = projectWithRotation(point, azimuth, elevation);

  return {
    x: centerX + projected.x * scale,
    y: centerY + projected.y * scale,
    visible: true, // Will be updated by visibility calculation
    depth: projected.depth,
  };
}

/**
 * Project all vertices of a solid
 */
export function projectVertices(
  vertices: Point3D[],
  config: ProjectionConfig,
  centerX: number,
  centerY: number,
  scale: number = 1
): ProjectedPoint[] {
  return vertices.map((v) => project3Dto2D(v, config, centerX, centerY, scale));
}

// ============================================
// SOLID GENERATORS
// ============================================

/**
 * Generate cube geometry centered at origin
 */
export function generateCube(dimensions: CubeDimensions): SolidGeometry {
  const s = dimensions.lado / 2;

  // Vertices: bottom face (0-3), top face (4-7)
  // Counter-clockwise when viewed from outside
  const vertices: Point3D[] = [
    // Bottom face (y = -s)
    { x: -s, y: -s, z: -s }, // 0: back-left-bottom
    { x: s, y: -s, z: -s }, // 1: back-right-bottom
    { x: s, y: -s, z: s }, // 2: front-right-bottom
    { x: -s, y: -s, z: s }, // 3: front-left-bottom
    // Top face (y = s)
    { x: -s, y: s, z: -s }, // 4: back-left-top
    { x: s, y: s, z: -s }, // 5: back-right-top
    { x: s, y: s, z: s }, // 6: front-right-top
    { x: -s, y: s, z: s }, // 7: front-left-top
  ];

  // Faces: counter-clockwise when viewed from outside
  const faces: number[][] = [
    [3, 2, 1, 0], // Bottom (y = -s) - viewed from below
    [4, 5, 6, 7], // Top (y = s)
    [0, 1, 5, 4], // Back (z = -s)
    [2, 3, 7, 6], // Front (z = s)
    [0, 4, 7, 3], // Left (x = -s)
    [1, 2, 6, 5], // Right (x = s)
  ];

  // All 12 edges
  const edges: [number, number][] = [
    // Bottom face
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    // Top face
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],
    // Vertical edges
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
  ];

  return { vertices, faces, edges };
}

/**
 * Generate rectangular prism geometry centered at origin
 */
export function generatePrismaRectangular(
  dimensions: PrismaRectangularDimensions
): SolidGeometry {
  const hx = dimensions.largo / 2; // Half length (x)
  const hy = dimensions.altura / 2; // Half height (y)
  const hz = dimensions.ancho / 2; // Half width (z)

  const vertices: Point3D[] = [
    // Bottom face (y = -hy)
    { x: -hx, y: -hy, z: -hz }, // 0
    { x: hx, y: -hy, z: -hz }, // 1
    { x: hx, y: -hy, z: hz }, // 2
    { x: -hx, y: -hy, z: hz }, // 3
    // Top face (y = hy)
    { x: -hx, y: hy, z: -hz }, // 4
    { x: hx, y: hy, z: -hz }, // 5
    { x: hx, y: hy, z: hz }, // 6
    { x: -hx, y: hy, z: hz }, // 7
  ];

  const faces: number[][] = [
    [3, 2, 1, 0], // Bottom
    [4, 5, 6, 7], // Top
    [0, 1, 5, 4], // Back
    [2, 3, 7, 6], // Front
    [0, 4, 7, 3], // Left
    [1, 2, 6, 5], // Right
  ];

  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
  ];

  return { vertices, faces, edges };
}

/**
 * Generate triangular prism geometry centered at origin
 * Base triangle is in the XZ plane with the prism extending along Y
 */
export function generatePrismaTriangular(
  dimensions: PrismaTriangularDimensions
): SolidGeometry {
  const hw = dimensions.baseWidth / 2;
  const hh = dimensions.profundidad / 2; // Half height along Y
  const th = dimensions.baseHeight; // Triangle height (in XZ plane)

  // Isosceles triangle base centered at origin
  const vertices: Point3D[] = [
    // Bottom triangle (y = -hh)
    { x: -hw, y: -hh, z: 0 }, // 0: back-left
    { x: hw, y: -hh, z: 0 }, // 1: back-right
    { x: 0, y: -hh, z: th }, // 2: front apex
    // Top triangle (y = hh)
    { x: -hw, y: hh, z: 0 }, // 3: back-left
    { x: hw, y: hh, z: 0 }, // 4: back-right
    { x: 0, y: hh, z: th }, // 5: front apex
  ];

  const faces: number[][] = [
    [2, 1, 0], // Bottom triangle
    [3, 4, 5], // Top triangle
    [0, 1, 4, 3], // Back rectangle
    [1, 2, 5, 4], // Right rectangle
    [2, 0, 3, 5], // Left rectangle
  ];

  const edges: [number, number][] = [
    // Bottom triangle
    [0, 1],
    [1, 2],
    [2, 0],
    // Top triangle
    [3, 4],
    [4, 5],
    [5, 3],
    // Vertical edges
    [0, 3],
    [1, 4],
    [2, 5],
  ];

  return { vertices, faces, edges };
}

/**
 * Generate square pyramid geometry with base centered at origin
 */
export function generatePiramideCuadrada(
  dimensions: PiramideCuadradaDimensions
): SolidGeometry {
  const hb = dimensions.base / 2; // Half base
  const h = dimensions.altura; // Full height

  const vertices: Point3D[] = [
    // Base (y = 0)
    { x: -hb, y: 0, z: -hb }, // 0: back-left
    { x: hb, y: 0, z: -hb }, // 1: back-right
    { x: hb, y: 0, z: hb }, // 2: front-right
    { x: -hb, y: 0, z: hb }, // 3: front-left
    // Apex
    { x: 0, y: h, z: 0 }, // 4: apex
  ];

  const faces: number[][] = [
    [3, 2, 1, 0], // Base (viewed from below)
    [0, 1, 4], // Back face
    [1, 2, 4], // Right face
    [2, 3, 4], // Front face
    [3, 0, 4], // Left face
  ];

  const edges: [number, number][] = [
    // Base
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    // Edges to apex
    [0, 4],
    [1, 4],
    [2, 4],
    [3, 4],
  ];

  return { vertices, faces, edges };
}

/**
 * Generate triangular pyramid (tetrahedron) with equilateral base
 */
export function generatePiramideTriangular(
  dimensions: PiramideTriangularDimensions
): SolidGeometry {
  const s = dimensions.base; // Side length
  const h = dimensions.altura; // Height

  // Equilateral triangle base centered at origin
  const r = s / Math.sqrt(3); // Circumradius of equilateral triangle

  const vertices: Point3D[] = [
    // Base triangle (y = 0)
    { x: 0, y: 0, z: r }, // 0: front
    { x: (-s / 2), y: 0, z: -r / 2 }, // 1: back-left
    { x: (s / 2), y: 0, z: -r / 2 }, // 2: back-right
    // Apex
    { x: 0, y: h, z: 0 }, // 3: apex
  ];

  const faces: number[][] = [
    [0, 2, 1], // Base (viewed from below, CCW)
    [0, 1, 3], // Left face
    [1, 2, 3], // Back face
    [2, 0, 3], // Right face
  ];

  const edges: [number, number][] = [
    // Base
    [0, 1],
    [1, 2],
    [2, 0],
    // Edges to apex
    [0, 3],
    [1, 3],
    [2, 3],
  ];

  return { vertices, faces, edges };
}

/**
 * Generate cylinder geometry (approximated with polygon)
 */
export function generateCilindro(
  dimensions: CilindroDimensions,
  segments: number = 24
): SolidGeometry {
  const r = dimensions.radio;
  const h = dimensions.altura;
  const halfH = h / 2;

  const vertices: Point3D[] = [];
  const faces: number[][] = [];
  const edges: [number, number][] = [];

  // Generate vertices for top and bottom circles
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;

    // Bottom vertex
    vertices.push({ x, y: -halfH, z });
    // Top vertex
    vertices.push({ x, y: halfH, z });
  }

  // Bottom face (indices 0, 2, 4, ... for bottom vertices)
  const bottomFace: number[] = [];
  for (let i = segments - 1; i >= 0; i--) {
    bottomFace.push(i * 2);
  }
  faces.push(bottomFace);

  // Top face (indices 1, 3, 5, ... for top vertices)
  const topFace: number[] = [];
  for (let i = 0; i < segments; i++) {
    topFace.push(i * 2 + 1);
  }
  faces.push(topFace);

  // Lateral faces (quads connecting top and bottom)
  for (let i = 0; i < segments; i++) {
    const next = (i + 1) % segments;
    const b1 = i * 2; // Bottom current
    const t1 = i * 2 + 1; // Top current
    const b2 = next * 2; // Bottom next
    const t2 = next * 2 + 1; // Top next

    faces.push([b1, b2, t2, t1]); // Lateral quad
  }

  // Edges
  for (let i = 0; i < segments; i++) {
    const next = (i + 1) % segments;
    // Bottom circle edge
    edges.push([i * 2, next * 2]);
    // Top circle edge
    edges.push([i * 2 + 1, next * 2 + 1]);
    // Vertical edge
    edges.push([i * 2, i * 2 + 1]);
  }

  return { vertices, faces, edges };
}

/**
 * Generate cone geometry (approximated with polygon)
 */
export function generateCono(
  dimensions: ConoDimensions,
  segments: number = 24
): SolidGeometry {
  const r = dimensions.radio;
  const h = dimensions.altura;

  const vertices: Point3D[] = [];
  const faces: number[][] = [];
  const edges: [number, number][] = [];

  // Apex at top
  vertices.push({ x: 0, y: h, z: 0 }); // Index 0

  // Base circle vertices
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    vertices.push({ x, y: 0, z }); // Indices 1 to segments
  }

  // Base face (indices 1 to segments, reversed for CCW from below)
  const baseFace: number[] = [];
  for (let i = segments; i >= 1; i--) {
    baseFace.push(i);
  }
  faces.push(baseFace);

  // Lateral faces (triangles from apex to base edge)
  for (let i = 0; i < segments; i++) {
    const curr = i + 1;
    const next = (i + 1) % segments + 1;
    faces.push([curr, next, 0]); // Triangle to apex
  }

  // Edges
  // Base circle
  for (let i = 0; i < segments; i++) {
    const curr = i + 1;
    const next = (i + 1) % segments + 1;
    edges.push([curr, next]);
    // Edge to apex
    edges.push([curr, 0]);
  }

  return { vertices, faces, edges };
}

/**
 * Generate sphere "geometry" - returns center and radius for special rendering
 */
export function generateEsfera(dimensions: EsferaDimensions): SphereGeometry {
  return {
    center: { x: 0, y: 0, z: 0 },
    radius: dimensions.radio,
  };
}

/**
 * Generate solid geometry from SolidDimensions union type
 */
export function generateSolid(
  solidDimensions: SolidDimensions
): SolidGeometry | SphereGeometry {
  switch (solidDimensions.type) {
    case 'cubo':
      return generateCube(solidDimensions.dimensions);
    case 'prisma_rectangular':
      return generatePrismaRectangular(solidDimensions.dimensions);
    case 'prisma_triangular':
      return generatePrismaTriangular(solidDimensions.dimensions);
    case 'piramide_cuadrada':
      return generatePiramideCuadrada(solidDimensions.dimensions);
    case 'piramide_triangular':
      return generatePiramideTriangular(solidDimensions.dimensions);
    case 'cilindro':
      return generateCilindro(solidDimensions.dimensions);
    case 'cono':
      return generateCono(solidDimensions.dimensions);
    case 'esfera':
      return generateEsfera(solidDimensions.dimensions);
    default:
      // Default to cube
      return generateCube({ lado: 100 });
  }
}

/**
 * Check if geometry is a sphere (special case)
 */
export function isSphereGeometry(
  geometry: SolidGeometry | SphereGeometry
): geometry is SphereGeometry {
  return 'radius' in geometry && 'center' in geometry;
}

// ============================================
// VISIBILITY AND SORTING
// ============================================

/**
 * Calculate face normal vector (assumes CCW vertex order)
 */
export function calculateFaceNormal(vertices: Point3D[], face: number[]): Point3D {
  if (face.length < 3) return { x: 0, y: 0, z: 1 };

  const v0 = vertices[face[0]];
  const v1 = vertices[face[1]];
  const v2 = vertices[face[2]];

  const edge1 = vec3Subtract(v1, v0);
  const edge2 = vec3Subtract(v2, v0);

  return vec3Normalize(vec3Cross(edge1, edge2));
}

/**
 * Determine if a face is front-facing based on view direction
 */
export function isFaceFrontFacing(
  vertices: Point3D[],
  face: number[],
  viewDirection: Point3D
): boolean {
  const normal = calculateFaceNormal(vertices, face);
  // Face is front-facing if normal points toward viewer (dot product > 0)
  // View direction points INTO the screen, so we want normal pointing OUT
  return vec3Dot(normal, viewDirection) < 0;
}

/**
 * Get view direction based on projection config
 */
export function getViewDirection(config: ProjectionConfig): Point3D {
  // View direction is opposite to camera position
  // For our coordinate system, camera looks from positive Z toward origin
  const azimuth = config.azimuth ?? 45;
  const elevation = config.elevation ?? 35;

  // Create unit vector pointing from camera toward origin
  const rad_az = degToRad(azimuth);
  const rad_el = degToRad(elevation);

  return {
    x: -Math.sin(rad_az) * Math.cos(rad_el),
    y: -Math.sin(rad_el),
    z: -Math.cos(rad_az) * Math.cos(rad_el),
  };
}

/**
 * Calculate face centroid depth for sorting
 */
export function getFaceDepth(
  vertices: Point3D[],
  face: number[],
  config: ProjectionConfig
): number {
  // Calculate centroid of face
  const faceVertices = face.map((i) => vertices[i]);
  const centroid = vec3Centroid(faceVertices);

  // Rotate centroid same as projection
  const azimuth = config.azimuth ?? 45;
  const elevation = config.elevation ?? 35;
  const rotated = rotatePoint(centroid, azimuth, elevation);

  return rotated.z;
}

/**
 * Sort faces by depth (painter's algorithm) - back to front
 */
export function sortFacesByDepth(
  vertices: Point3D[],
  faces: number[][],
  config: ProjectionConfig
): number[] {
  const faceDepths = faces.map((face, index) => ({
    index,
    depth: getFaceDepth(vertices, face, config),
  }));

  // Sort by depth (most negative = furthest = draw first)
  faceDepths.sort((a, b) => a.depth - b.depth);

  return faceDepths.map((f) => f.index);
}

/**
 * Determine edge visibility based on adjacent faces
 */
export function getEdgeVisibility(
  vertices: Point3D[],
  edge: [number, number],
  faces: number[][],
  config: ProjectionConfig
): 'visible' | 'hidden' {
  const viewDirection = getViewDirection(config);

  // Find faces that contain this edge
  const adjacentFaces = faces.filter((face) => {
    const hasV0 = face.includes(edge[0]);
    const hasV1 = face.includes(edge[1]);
    return hasV0 && hasV1;
  });

  // If any adjacent face is front-facing, edge is visible
  for (const face of adjacentFaces) {
    if (isFaceFrontFacing(vertices, face, viewDirection)) {
      return 'visible';
    }
  }

  return 'hidden';
}

/**
 * Get all edge visibilities for a solid
 */
export function getAllEdgeVisibilities(
  vertices: Point3D[],
  edges: [number, number][],
  faces: number[][],
  config: ProjectionConfig
): ('visible' | 'hidden')[] {
  return edges.map((edge) => getEdgeVisibility(vertices, edge, faces, config));
}

// ============================================
// SVG PATH GENERATION
// ============================================

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

// ============================================
// VIEW BOX CALCULATION
// ============================================

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

// ============================================
// LABEL POSITIONING
// ============================================

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

// ============================================
// VOLUME AND SURFACE AREA CALCULATIONS
// ============================================

/**
 * Calculate cube volume
 */
export function volumeCubo(lado: number): number {
  return lado * lado * lado;
}

/**
 * Calculate rectangular prism volume
 */
export function volumePrismaRectangular(
  largo: number,
  ancho: number,
  altura: number
): number {
  return largo * ancho * altura;
}

/**
 * Calculate triangular prism volume
 */
export function volumePrismaTriangular(
  baseWidth: number,
  baseHeight: number,
  profundidad: number
): number {
  const baseArea = (baseWidth * baseHeight) / 2;
  return baseArea * profundidad;
}

/**
 * Calculate pyramid volume (general)
 */
export function volumePiramide(baseArea: number, altura: number): number {
  return (baseArea * altura) / 3;
}

/**
 * Calculate square pyramid volume
 */
export function volumePiramideCuadrada(base: number, altura: number): number {
  return volumePiramide(base * base, altura);
}

/**
 * Calculate triangular pyramid volume
 */
export function volumePiramideTriangular(base: number, altura: number): number {
  // Equilateral triangle base area
  const baseArea = (Math.sqrt(3) / 4) * base * base;
  return volumePiramide(baseArea, altura);
}

/**
 * Calculate cylinder volume
 */
export function volumeCilindro(radio: number, altura: number): number {
  return Math.PI * radio * radio * altura;
}

/**
 * Calculate cone volume
 */
export function volumeCono(radio: number, altura: number): number {
  return (Math.PI * radio * radio * altura) / 3;
}

/**
 * Calculate sphere volume
 */
export function volumeEsfera(radio: number): number {
  return (4 / 3) * Math.PI * radio * radio * radio;
}

/**
 * Calculate cube surface area
 */
export function areaSuperficieCubo(lado: number): number {
  return 6 * lado * lado;
}

/**
 * Calculate rectangular prism surface area
 */
export function areaSuperficiePrismaRectangular(
  largo: number,
  ancho: number,
  altura: number
): number {
  return 2 * (largo * ancho + largo * altura + ancho * altura);
}

/**
 * Calculate cylinder surface area
 */
export function areaSuperficieCilindro(radio: number, altura: number): number {
  const lateral = 2 * Math.PI * radio * altura;
  const bases = 2 * Math.PI * radio * radio;
  return lateral + bases;
}

/**
 * Calculate cone surface area
 */
export function areaSuperficieCono(radio: number, altura: number): number {
  const slantHeight = Math.sqrt(radio * radio + altura * altura);
  const lateral = Math.PI * radio * slantHeight;
  const base = Math.PI * radio * radio;
  return lateral + base;
}

/**
 * Calculate sphere surface area
 */
export function areaSuperficieEsfera(radio: number): number {
  return 4 * Math.PI * radio * radio;
}

// ============================================
// VALIDATION
// ============================================

/**
 * Validate cube dimensions
 */
export function validateCubeDimensions(d: CubeDimensions): ValidationResult {
  if (d.lado <= 0) {
    return { valid: false, error: 'El lado debe ser positivo' };
  }
  return { valid: true };
}

/**
 * Validate rectangular prism dimensions
 */
export function validatePrismaRectangularDimensions(
  d: PrismaRectangularDimensions
): ValidationResult {
  if (d.largo <= 0 || d.ancho <= 0 || d.altura <= 0) {
    return { valid: false, error: 'Todas las dimensiones deben ser positivas' };
  }
  return { valid: true };
}

/**
 * Validate triangular prism dimensions
 */
export function validatePrismaTriangularDimensions(
  d: PrismaTriangularDimensions
): ValidationResult {
  if (d.baseWidth <= 0 || d.baseHeight <= 0 || d.profundidad <= 0) {
    return { valid: false, error: 'Todas las dimensiones deben ser positivas' };
  }
  return { valid: true };
}

/**
 * Validate pyramid dimensions
 */
export function validatePiramideDimensions(
  d: PiramideCuadradaDimensions | PiramideTriangularDimensions
): ValidationResult {
  if (d.base <= 0 || d.altura <= 0) {
    return { valid: false, error: 'Base y altura deben ser positivas' };
  }
  return { valid: true };
}

/**
 * Validate cylinder dimensions
 */
export function validateCilindroDimensions(d: CilindroDimensions): ValidationResult {
  if (d.radio <= 0 || d.altura <= 0) {
    return { valid: false, error: 'Radio y altura deben ser positivos' };
  }
  return { valid: true };
}

/**
 * Validate cone dimensions
 */
export function validateConoDimensions(d: ConoDimensions): ValidationResult {
  if (d.radio <= 0 || d.altura <= 0) {
    return { valid: false, error: 'Radio y altura deben ser positivos' };
  }
  return { valid: true };
}

/**
 * Validate sphere dimensions
 */
export function validateEsferaDimensions(d: EsferaDimensions): ValidationResult {
  if (d.radio <= 0) {
    return { valid: false, error: 'El radio debe ser positivo' };
  }
  return { valid: true };
}

/**
 * Validate any solid dimensions
 */
export function validateSolidDimensions(solid: SolidDimensions): ValidationResult {
  switch (solid.type) {
    case 'cubo':
      return validateCubeDimensions(solid.dimensions);
    case 'prisma_rectangular':
      return validatePrismaRectangularDimensions(solid.dimensions);
    case 'prisma_triangular':
      return validatePrismaTriangularDimensions(solid.dimensions);
    case 'piramide_cuadrada':
    case 'piramide_triangular':
      return validatePiramideDimensions(solid.dimensions);
    case 'cilindro':
      return validateCilindroDimensions(solid.dimensions);
    case 'cono':
      return validateConoDimensions(solid.dimensions);
    case 'esfera':
      return validateEsferaDimensions(solid.dimensions);
    default:
      return { valid: false, error: 'Tipo de sólido no reconocido' };
  }
}

// ============================================
// HELPERS FOR BASE FACE DETECTION
// ============================================

/**
 * Determine if a face index represents a base face for given solid type
 */
export function isBaseFace(faceIndex: number, solidType: string | undefined): boolean {
  if (!solidType) return false;

  // Base faces are typically index 0 (bottom) for most solids
  switch (solidType) {
    case 'cubo':
    case 'prisma_rectangular':
      return faceIndex === 0; // Bottom face
    case 'prisma_triangular':
      return faceIndex === 0; // Bottom triangle
    case 'piramide_cuadrada':
    case 'piramide_triangular':
      return faceIndex === 0; // Base face
    case 'cilindro':
      return faceIndex === 0; // Bottom circle
    case 'cono':
      return faceIndex === 0; // Base circle
    default:
      return false;
  }
}

/**
 * Get solid type display name in Spanish
 */
export function getSolidTypeName(solidType: string): string {
  const names: Record<string, string> = {
    cubo: 'Cubo',
    prisma_rectangular: 'Prisma Rectangular',
    prisma_triangular: 'Prisma Triangular',
    piramide_cuadrada: 'Pirámide Cuadrada',
    piramide_triangular: 'Pirámide Triangular',
    cilindro: 'Cilindro',
    cono: 'Cono',
    esfera: 'Esfera',
  };
  return names[solidType] || solidType;
}
