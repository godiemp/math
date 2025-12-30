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
  /** Measurement with units (e.g., '5 cm', '3 m') */
  measurement?: string;
  /** Custom stroke color */
  color?: string;
  /** Stroke style */
  strokeStyle?: 'solid' | 'dashed' | 'dotted';
  /** Stroke width override */
  strokeWidth?: number;
  /** Whether to show the measurement label */
  showMeasurement?: boolean;
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
 * Main TriangleFigure component props
 */
export interface TriangleFigureProps {
  // Required: Three vertices
  /** The three vertices of the triangle */
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint];

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
