/**
 * 3D Solid Geometry Generators
 */

import type {
  Point3D,
  SolidGeometry,
  SphereGeometry,
  SolidDimensions,
  CubeDimensions,
  PrismaRectangularDimensions,
  PrismaTriangularDimensions,
  PiramideCuadradaDimensions,
  PiramideTriangularDimensions,
  CilindroDimensions,
  ConoDimensions,
  EsferaDimensions,
} from '../../types/figure3d';

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
    { x: -s / 2, y: 0, z: -r / 2 }, // 1: back-left
    { x: s / 2, y: 0, z: -r / 2 }, // 2: back-right
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
    const next = ((i + 1) % segments) + 1;
    faces.push([curr, next, 0]); // Triangle to apex
  }

  // Edges
  // Base circle
  for (let i = 0; i < segments; i++) {
    const curr = i + 1;
    const next = ((i + 1) % segments) + 1;
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
