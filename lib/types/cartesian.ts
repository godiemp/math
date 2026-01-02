/**
 * Cartesian Plane types for coordinate system visualization
 */

/**
 * Range for an axis [min, max]
 */
export type AxisRange = [number, number];

/**
 * Coordinate transformation function signature
 */
export type CoordinateTransform = (x: number, y: number) => { x: number; y: number };

/**
 * Props for CartesianPlane component
 */
export interface CartesianPlaneProps {
  /** X-axis range [min, max] in mathematical coordinates */
  xRange: AxisRange;
  /** Y-axis range [min, max] in mathematical coordinates */
  yRange: AxisRange;
  /** Pixels per unit (default: 40) */
  scale?: number;
  /** SVG width in pixels (auto-calculated from range and scale if not provided) */
  width?: number;
  /** SVG height in pixels (auto-calculated from range and scale if not provided) */
  height?: number;
  /** Show X and Y axes with arrows (default: true) */
  showAxes?: boolean;
  /** Show background grid (default: true) */
  showGrid?: boolean;
  /** Show axis labels and tick numbers (default: true) */
  showLabels?: boolean;
  /** Show origin marker (default: true) */
  showOrigin?: boolean;
  /** Axis color (default: gray-700) */
  axisColor?: string;
  /** Grid color (default: gray-200) */
  gridColor?: string;
  /** Arrow size for axis arrows (default: 8) */
  arrowSize?: number;
  /** Padding around the plane in pixels (default: 20) */
  padding?: number;
  /** Children figures to render (e.g., TriangleFigure) */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
}

/**
 * Context value provided to children
 */
export interface CartesianPlaneContextValue {
  /** Transform math coordinates to SVG coordinates */
  toSvgCoords: CoordinateTransform;
  /** Transform SVG coordinates to math coordinates */
  toMathCoords: CoordinateTransform;
  /** Scale (pixels per unit) */
  scale: number;
  /** X-axis range */
  xRange: AxisRange;
  /** Y-axis range */
  yRange: AxisRange;
}

/**
 * Preset configuration for Cartesian plane
 */
export interface CartesianPlanePreset {
  name: string;
  description: string;
  xRange: AxisRange;
  yRange: AxisRange;
  scale?: number;
}

// ============================================================================
// CARTESIAN ELEMENT TYPES (for debugger)
// ============================================================================

/**
 * Configuration for a point in the Cartesian plane
 */
export interface CartesianPointConfig {
  id: string;
  x: number;
  y: number;
  label?: string;
  color?: string;
  radius?: number;
}

/**
 * Configuration for a line segment in the Cartesian plane
 */
export interface CartesianSegmentConfig {
  id: string;
  p1: { x: number; y: number };
  p2: { x: number; y: number };
  label?: string;
  color?: string;
  strokeWidth?: number;
  strokeStyle?: 'solid' | 'dashed' | 'dotted';
  /** Arrow configuration: where to place arrowheads */
  arrow?: 'none' | 'end' | 'start' | 'both';
}

/**
 * Configuration for a triangle in the Cartesian plane
 */
export interface CartesianTriangleConfig {
  id: string;
  /** Direct vertices (used when constructionMode is 'vertices' or undefined) */
  vertices: [
    { x: number; y: number; label?: string },
    { x: number; y: number; label?: string },
    { x: number; y: number; label?: string }
  ];
  /** Construction mode: 'vertices' (default) or 'angles' */
  constructionMode?: 'vertices' | 'angles';
  /** Angles in degrees (for 'angles' mode) - must sum to 180 */
  angles?: [number, number, number];
  /** Scale factor for angle-constructed triangle (default: 2) */
  scale?: number;
  /** Position of triangle centroid (for 'angles' mode) */
  position?: { x: number; y: number };
  /** Rotation in degrees (for 'angles' mode) */
  rotation?: number;
  fill?: string;
  stroke?: string;
  showRightAngleMarker?: boolean;
}

/**
 * All elements in a Cartesian plane debugger
 */
export interface CartesianElements {
  points: CartesianPointConfig[];
  segments: CartesianSegmentConfig[];
  triangles: CartesianTriangleConfig[];
}

/**
 * Preset for Cartesian debugger including elements
 */
export interface CartesianDebuggerPreset {
  name: string;
  description: string;
  config: {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
    scale?: number;
    showAxes?: boolean;
    showGrid?: boolean;
    showLabels?: boolean;
    showOrigin?: boolean;
  };
  elements: CartesianElements;
}
