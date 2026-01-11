/**
 * Polygon figure types for comprehensive geometry visualization
 * Supports regular and irregular polygons with 5-12 sides
 */

import type { LabeledPoint } from './triangle';

// Re-export LabeledPoint for convenience
export type { LabeledPoint };

/**
 * Edge configuration for polygon sides
 */
export interface PolygonEdgeConfig {
  /** Label for the edge (e.g., 'a', 'b', 'c') */
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
 * Angle configuration for polygon vertices (interior angles)
 */
export interface PolygonAngleConfig {
  /** Label for the angle (degrees or Greek letter like 'α', 'β') */
  label?: string;
  /** Whether to show the angle arc */
  showArc?: boolean;
  /** Radius of the angle arc in pixels */
  arcRadius?: number;
  /** Custom color for the angle arc */
  color?: string;
  /** Whether to show degree value (e.g., '108°') */
  showDegrees?: boolean;
}

/**
 * Exterior angle configuration for polygon vertices
 */
export interface ExteriorAngleConfig {
  /** Label for the exterior angle */
  label?: string;
  /** Whether to show the exterior angle arc */
  showArc?: boolean;
  /** Radius of the angle arc in pixels */
  arcRadius?: number;
  /** Custom color for the exterior angle arc (default: red) */
  color?: string;
  /** Whether to show degree value (e.g., '72°') */
  showDegrees?: boolean;
  /** Whether to show the extended edge line (dashed) */
  showExtension?: boolean;
  /** Length of the extension line in pixels */
  extensionLength?: number;
  /** Color for the extension line */
  extensionColor?: string;
  /** Whether to show the angle fill */
  showFill?: boolean;
  /** Fill opacity (0-1) */
  fillOpacity?: number;
}

/**
 * Diagonal line configuration
 */
export interface DiagonalConfig {
  /** Starting vertex index (0-based) */
  from: number;
  /** Ending vertex index (0-based) */
  to: number;
  /** Label for the diagonal */
  label?: string;
  /** Custom color */
  color?: string;
  /** Stroke style */
  strokeStyle?: 'solid' | 'dashed' | 'dotted';
}

/**
 * Apothem configuration for regular polygons
 */
export interface ApothemConfig {
  /** Custom color for the apothem line */
  color?: string;
  /** Stroke style */
  strokeStyle?: 'solid' | 'dashed' | 'dotted';
  /** Label for the apothem (e.g., 'a', 'apotema') */
  label?: string;
  /** Show the length measurement */
  showMeasurement?: boolean;
  /** Which edge to draw the apothem to (0-based index, default: 0) */
  toEdge?: number;
}

/**
 * Configuration to build a regular polygon
 */
export interface FromRegularConfig {
  /** Number of sides (5-12) */
  sides: number;
  /** Circumradius (distance from center to vertices) */
  radius: number;
  /** Rotation in degrees (default: -90 to start from top) */
  rotation?: number;
  /** Center X coordinate */
  centerX?: number;
  /** Center Y coordinate */
  centerY?: number;
}

/**
 * Main PolygonFigure component props
 */
export interface PolygonFigureProps {
  // Construction methods (use ONE)
  /** Direct vertices - use for irregular polygons */
  vertices?: LabeledPoint[];
  /** Build regular polygon from configuration */
  fromRegular?: FromRegularConfig;

  // Element configuration
  /** Configuration for each edge (indexed to vertices) */
  edges?: PolygonEdgeConfig[];
  /** Configuration for interior angle at each vertex */
  angles?: PolygonAngleConfig[];
  /** Configuration for exterior angles - array indexed by vertex, or 'all' to show all */
  exteriorAngles?: ExteriorAngleConfig[] | 'all';
  /** Diagonal lines - array of specific diagonals or 'all' for all diagonals */
  diagonals?: DiagonalConfig[] | 'all';

  // Special features (for regular polygons)
  /** Show apothem line from center to edge midpoint */
  showApothem?: boolean | ApothemConfig;
  /** Show center point */
  showCenter?: boolean;
  /** Label for center point */
  centerLabel?: string;

  // Visual styling
  /** Fill color for the polygon */
  fill?: string;
  /** Fill opacity (0-1) */
  fillOpacity?: number;
  /** Stroke color for the polygon outline */
  stroke?: string;
  /** Stroke width for the polygon outline */
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
  /** Padding around the polygon in pixels */
  padding?: number;

  // Vertex display
  /** Whether to show vertex points */
  showVertices?: boolean;
  /** Vertex point radius */
  vertexRadius?: number;

  // Accessibility
  /** ARIA label for the SVG */
  ariaLabel?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Preset for common polygon configurations
 */
export interface PolygonPreset {
  name: string;
  description: string;
  sides: number;
  radius: number;
  rotation?: number;
  showApothem?: boolean;
  showCenter?: boolean;
  showDiagonals?: boolean;
}

/**
 * Polygon names in Spanish for Chilean PAES curriculum
 */
export const POLYGON_NAMES: Record<number, string> = {
  5: 'pentágono',
  6: 'hexágono',
  7: 'heptágono',
  8: 'octágono',
  9: 'eneágono',
  10: 'decágono',
  11: 'endecágono',
  12: 'dodecágono',
};
