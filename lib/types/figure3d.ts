/**
 * 3D Figure types for geometric solid visualization
 * Following patterns from triangle.ts and circle.ts
 * Spanish terminology for Chilean PAES curriculum
 */

import type { LabeledPoint } from './triangle';

// Re-export LabeledPoint for convenience
export type { LabeledPoint };

// ============================================
// CORE 3D TYPES
// ============================================

/**
 * 3D point with optional label
 */
export interface Point3D {
  x: number;
  y: number;
  z: number;
  label?: string;
}

/**
 * Projected 2D point with visibility and depth info
 */
export interface ProjectedPoint extends LabeledPoint {
  visible: boolean;
  depth: number;
}

/**
 * 3D solid geometry definition
 */
export interface SolidGeometry {
  vertices: Point3D[];
  faces: number[][]; // Each face is array of vertex indices (counter-clockwise when viewed from outside)
  edges: [number, number][]; // Each edge is pair of vertex indices
}

// ============================================
// SOLID TYPES
// ============================================

/**
 * Supported 3D solid types (Spanish for PAES curriculum)
 */
export type SolidType =
  | 'cubo' // Cube
  | 'prisma_rectangular' // Rectangular prism/cuboid
  | 'prisma_triangular' // Triangular prism
  | 'piramide_cuadrada' // Square pyramid
  | 'piramide_triangular' // Triangular pyramid/tetrahedron
  | 'cilindro' // Cylinder
  | 'cono' // Cone
  | 'esfera'; // Sphere

// ============================================
// PROJECTION TYPES
// ============================================

/**
 * Supported projection types
 */
export type ProjectionType = 'isometric' | 'cavalier' | 'cabinet' | 'dimetric';

/**
 * Projection configuration
 */
export interface ProjectionConfig {
  type: ProjectionType;
  azimuth?: number; // Horizontal rotation (0-360 degrees)
  elevation?: number; // Vertical angle (-90 to 90 degrees)
  scale?: number; // Overall scale factor
}

/**
 * Default projection angles for each type
 */
export const PROJECTION_DEFAULTS: Record<
  ProjectionType,
  { azimuth: number; elevation: number; depthScale: number }
> = {
  isometric: { azimuth: 45, elevation: 35.264, depthScale: 1 }, // arctan(1/sqrt(2)) ≈ 35.264°
  cavalier: { azimuth: 45, elevation: 0, depthScale: 1 }, // Full-scale depth
  cabinet: { azimuth: 45, elevation: 0, depthScale: 0.5 }, // Half-scale depth
  dimetric: { azimuth: 42, elevation: 20, depthScale: 0.5 },
};

// ============================================
// DIMENSION CONFIGURATIONS
// ============================================

/**
 * Cube dimensions
 */
export interface CubeDimensions {
  lado: number; // Side length
}

/**
 * Rectangular prism dimensions
 */
export interface PrismaRectangularDimensions {
  largo: number; // Length (x-axis)
  ancho: number; // Width (z-axis)
  altura: number; // Height (y-axis)
}

/**
 * Triangular prism dimensions
 */
export interface PrismaTriangularDimensions {
  baseWidth: number; // Base triangle width
  baseHeight: number; // Base triangle height (perpendicular from base to apex)
  profundidad: number; // Prism depth/length
}

/**
 * Square pyramid dimensions
 */
export interface PiramideCuadradaDimensions {
  base: number; // Base side length
  altura: number; // Pyramid height
}

/**
 * Triangular pyramid (tetrahedron) dimensions
 */
export interface PiramideTriangularDimensions {
  base: number; // Base triangle side length (equilateral)
  altura: number; // Pyramid height
}

/**
 * Cylinder dimensions
 */
export interface CilindroDimensions {
  radio: number; // Radius
  altura: number; // Height
}

/**
 * Cone dimensions
 */
export interface ConoDimensions {
  radio: number; // Base radius
  altura: number; // Height
}

/**
 * Sphere dimensions
 */
export interface EsferaDimensions {
  radio: number; // Radius
}

/**
 * Union type for solid dimensions with discriminator
 */
export type SolidDimensions =
  | { type: 'cubo'; dimensions: CubeDimensions }
  | { type: 'prisma_rectangular'; dimensions: PrismaRectangularDimensions }
  | { type: 'prisma_triangular'; dimensions: PrismaTriangularDimensions }
  | { type: 'piramide_cuadrada'; dimensions: PiramideCuadradaDimensions }
  | { type: 'piramide_triangular'; dimensions: PiramideTriangularDimensions }
  | { type: 'cilindro'; dimensions: CilindroDimensions }
  | { type: 'cono'; dimensions: ConoDimensions }
  | { type: 'esfera'; dimensions: EsferaDimensions };

// ============================================
// VISUAL CONFIGURATION
// ============================================

/**
 * Edge rendering configuration
 */
export interface EdgeConfig {
  hiddenEdgeStyle?: 'dashed' | 'dotted' | 'none'; // How to render back-facing edges
  edgeColor?: string;
  edgeWidth?: number;
  hiddenEdgeColor?: string;
}

/**
 * Face rendering configuration
 */
export interface FaceConfig {
  fill?: string;
  fillOpacity?: number;
  highlightBase?: boolean; // Highlight base face(s)
  highlightLateral?: boolean; // Highlight lateral faces
  baseColor?: string;
  lateralColor?: string;
  baseOpacity?: number;
  lateralOpacity?: number;
}

/**
 * Dimension label configuration
 */
export interface DimensionLabelConfig {
  showHeight?: boolean; // Show altura label
  showBase?: boolean; // Show base dimension
  showRadius?: boolean; // For cylinders, cones, spheres
  showEdge?: boolean; // Show edge length (for cubes, etc.)
  showWidth?: boolean; // Show ancho dimension
  showDepth?: boolean; // Show profundidad dimension
  heightLabel?: string; // Custom label (default: 'h')
  baseLabel?: string; // Custom label (default: depends on shape)
  radiusLabel?: string; // Custom label (default: 'r')
  edgeLabel?: string; // Custom label
  fontSize?: number;
  color?: string;
}

/**
 * Height line (altura) configuration
 */
export interface HeightLineConfig {
  show: boolean;
  style?: 'solid' | 'dashed' | 'dotted';
  color?: string;
  strokeWidth?: number;
  showRightAngleMarker?: boolean;
  rightAngleSize?: number;
}

/**
 * Vertex label configuration
 */
export interface VertexLabelConfig {
  show?: boolean;
  labels?: string[]; // Custom labels for vertices
  fontSize?: number;
  color?: string;
  offset?: number;
}

// ============================================
// COMPONENT PROPS
// ============================================

/**
 * Main Figure3D component props
 */
export interface Figure3DProps {
  // ---- Construction methods ----

  /**
   * Build from solid type with dimensions (preferred method)
   */
  fromType?: SolidDimensions;

  /**
   * Custom vertices for advanced use
   */
  vertices?: Point3D[];

  /**
   * Custom faces (array of vertex indices per face)
   */
  faces?: number[][];

  /**
   * Custom edges (pairs of vertex indices)
   */
  customEdges?: [number, number][];

  // ---- Projection settings ----

  /**
   * Projection configuration or type shorthand
   */
  projection?: ProjectionConfig | ProjectionType;

  // ---- Interactive rotation ----

  /**
   * Enable mouse/touch drag rotation
   */
  interactive?: boolean;

  /**
   * Callback when rotation changes (for controlled component)
   */
  onRotationChange?: (azimuth: number, elevation: number) => void;

  /**
   * Initial or controlled azimuth angle (horizontal rotation)
   */
  azimuth?: number;

  /**
   * Initial or controlled elevation angle (vertical rotation)
   */
  elevation?: number;

  // ---- Visual configuration ----

  /**
   * Edge rendering options
   */
  edges?: EdgeConfig;

  /**
   * Face rendering options
   */
  faceConfig?: FaceConfig;

  /**
   * Dimension label options
   */
  dimensionLabels?: DimensionLabelConfig;

  /**
   * Height line (altura) options
   */
  heightLine?: HeightLineConfig;

  /**
   * Vertex label options
   */
  vertexLabels?: VertexLabelConfig;

  // ---- Common visual options (matching existing components) ----

  /**
   * Default fill color for faces
   */
  fill?: string;

  /**
   * Fill opacity (0-1)
   */
  fillOpacity?: number;

  /**
   * Default stroke color for edges
   */
  stroke?: string;

  /**
   * Stroke width for edges
   */
  strokeWidth?: number;

  // ---- Grid options ----

  /**
   * Show background grid
   */
  showGrid?: boolean;

  /**
   * Grid cell size in pixels
   */
  gridSize?: number;

  /**
   * Grid line color
   */
  gridColor?: string;

  // ---- SVG options ----

  /**
   * SVG width
   */
  width?: number;

  /**
   * SVG height
   */
  height?: number;

  /**
   * Custom viewBox (auto-calculated if not provided)
   */
  viewBox?: string;

  /**
   * Padding around the figure
   */
  padding?: number;

  /**
   * CSS class name
   */
  className?: string;

  /**
   * Aria label for accessibility
   */
  ariaLabel?: string;

  /**
   * Standalone mode (renders <svg>) vs embedded (<g>)
   */
  standalone?: boolean;
}

// ============================================
// PRESET TYPE
// ============================================

/**
 * Preset configuration for common 3D figures
 */
export interface Figure3DPreset {
  name: string;
  description: string;
  fromType: SolidDimensions;
  projection?: ProjectionType;
  azimuth?: number;
  elevation?: number;
}

// ============================================
// SPHERE SPECIAL TYPE
// ============================================

/**
 * Sphere geometry (special case - not a polyhedron)
 */
export interface SphereGeometry {
  center: Point3D;
  radius: number;
}

// ============================================
// VALIDATION RESULT
// ============================================

/**
 * Validation result for dimension checks
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
}
