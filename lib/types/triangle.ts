/**
 * Triangle figure types for comprehensive geometry visualization
 */

/**
 * Point with optional label and label positioning
 */
export interface LabeledPoint {
  x: number;
  y: number;
  label?: string;
  labelOffset?: { x: number; y: number };
}

/**
 * Side configuration for triangle edges
 */
export interface SideConfig {
  /** Label for the side (e.g., 'a', 'b', 'c') */
  label?: string;
  /** Prefix shown before the value (e.g., 'Op:', 'Ady:', 'Hip:') for trigonometry */
  labelPrefix?: string;
  /** Measurement with units (e.g., '5 cm', '3 m') or numeric value */
  measurement?: string;
  /** Custom stroke color for the side line */
  color?: string;
  /** Custom label/text color (defaults to stroke color if not set) */
  labelColor?: string;
  /** Stroke style */
  strokeStyle?: 'solid' | 'dashed' | 'dotted';
  /** Stroke width override */
  strokeWidth?: number;
  /** Whether to show the measurement label */
  showMeasurement?: boolean;
  /** Distance offset from side for label positioning (default: 18) */
  labelOffset?: number;
}

/**
 * Angle configuration for triangle vertices
 */
export interface AngleConfig {
  /** Label for the angle (degrees or Greek letter like 'α', 'β', 'γ') */
  label?: string;
  /** Whether to show the angle arc */
  showArc?: boolean;
  /** Radius of the angle arc in pixels */
  arcRadius?: number;
  /** Custom color for the angle arc */
  color?: string;
  /** Whether this is an exterior angle */
  isExterior?: boolean;
  /** Whether to show degree value (e.g., '60°') */
  showDegrees?: boolean;
}

/**
 * Special line types (using Spanish terms for Chilean curriculum)
 */
export type SpecialLineType =
  | 'altura' // Height/altitude - perpendicular from vertex to opposite side
  | 'mediana' // Median - from vertex to midpoint of opposite side
  | 'bisectriz' // Angle bisector - divides angle in two equal parts
  | 'mediatriz'; // Perpendicular bisector - perpendicular to side at midpoint

/**
 * Configuration for special lines in the triangle
 */
export interface SpecialLineConfig {
  /** Type of special line */
  type: SpecialLineType;
  /** Which vertex the line originates from (0, 1, or 2) */
  fromVertex: 0 | 1 | 2;
  /** Which side the line goes to (for mediatriz) */
  toSide?: 0 | 1 | 2;
  /** Custom color for the line */
  color?: string;
  /** Stroke style */
  strokeStyle?: 'solid' | 'dashed' | 'dotted';
  /** Whether to show label for this line */
  showLabel?: boolean;
  /** Whether to show right angle marker at intersection */
  showRightAngleMarker?: boolean;
}

/**
 * Configuration to build a triangle from angles (object form)
 */
export interface FromAnglesConfigObject {
  /** The three interior angles in degrees (must sum to 180) */
  angles: [number, number, number];
  /** Maximum size (width or height) of the triangle bounding box */
  size?: number;
  /** Rotation in degrees (0 = base horizontal) */
  rotation?: number;
}

/**
 * Build triangle from angles - accepts array shorthand or config object
 * @example fromAngles={[60, 60, 60]}
 * @example fromAngles={{ angles: [30, 60, 90], size: 200 }}
 */
export type FromAnglesConfig = [number, number, number] | FromAnglesConfigObject;

/**
 * Configuration to build a triangle from side lengths (object form)
 */
export interface FromSidesConfigObject {
  /** The three side lengths [a, b, c] where a is opposite to A, etc. */
  sides: [number, number, number];
  /** Maximum size (width or height) of the triangle bounding box */
  size?: number;
  /** Rotation in degrees (0 = base horizontal) */
  rotation?: number;
}

/**
 * Build triangle from side lengths - accepts array shorthand or config object
 * @example fromSides={[3, 4, 5]}
 * @example fromSides={{ sides: [5, 5, 5], size: 200 }}
 */
export type FromSidesConfig = [number, number, number] | FromSidesConfigObject;

/**
 * Main TriangleFigure component props
 */
export interface TriangleFigureProps {
  // Option 1: Three vertices directly
  /** The three vertices of the triangle (use this OR fromAngles OR fromSides) */
  vertices?: [LabeledPoint, LabeledPoint, LabeledPoint];

  // Option 2: Build from angles
  /** Build triangle from angles */
  fromAngles?: FromAnglesConfig;

  // Option 3: Build from side lengths
  /** Build triangle from side lengths (e.g., [3, 4, 5]) */
  fromSides?: FromSidesConfig;

  // Sides configuration (indices: 0=v0-v1, 1=v1-v2, 2=v2-v0)
  /** Configuration for each side */
  sides?: [SideConfig?, SideConfig?, SideConfig?];

  // Angles configuration (indices match vertex indices)
  /** Configuration for angle at each vertex */
  angles?: [AngleConfig?, AngleConfig?, AngleConfig?];

  // Special lines
  /** Special lines to draw (altura, mediana, bisectriz, mediatriz) */
  specialLines?: SpecialLineConfig[];

  // Right angle marker
  /** Whether to show right angle marker (auto-detected for ~90 degree angles) */
  showRightAngleMarker?: boolean;
  /** Which vertex has the right angle (0, 1, or 2) */
  rightAngleVertex?: 0 | 1 | 2;
  /** Size of the right angle marker in pixels */
  rightAngleSize?: number;

  // Visual styling
  /** Fill color for the triangle */
  fill?: string;
  /** Fill opacity (0-1) */
  fillOpacity?: number;
  /** Stroke color for the triangle outline */
  stroke?: string;
  /** Stroke width for the triangle outline */
  strokeWidth?: number;

  // Grid and background
  /** Whether to show a grid background */
  showGrid?: boolean;
  /** Grid cell size in pixels */
  gridSize?: number;
  /** Grid color */
  gridColor?: string;

  // SVG dimensions
  /** SVG width */
  width?: number;
  /** SVG height */
  height?: number;
  /** Custom viewBox (default: auto-calculated from vertices + padding) */
  viewBox?: string;
  /** Padding around the triangle in pixels */
  padding?: number;

  // Additional options
  /** Whether to show vertex points */
  showVertices?: boolean;
  /** Vertex point radius */
  vertexRadius?: number;

  // Accessibility
  /** ARIA label for the SVG */
  ariaLabel?: string;

  // Custom className
  /** Additional CSS classes */
  className?: string;

  // Composability for complex scenes
  /** Render as SVG <g> group instead of full <svg> element (for embedding in larger SVGs) */
  asSvgGroup?: boolean;
  /** SVG transform attribute when rendering as group (e.g., "translate(100, 50)") */
  transform?: string;
}

/**
 * Presets for common triangle types
 */
export interface TrianglePreset {
  name: string;
  description: string;
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint];
  rightAngleVertex?: 0 | 1 | 2;
}
