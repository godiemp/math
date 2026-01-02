/**
 * Circle figure types for comprehensive geometry visualization
 */

/**
 * Point with optional label and label positioning (shared with triangle.ts)
 */
export interface LabeledPoint {
  x: number;
  y: number;
  label?: string;
  labelOffset?: { x: number; y: number };
}

/**
 * Circle display mode
 */
export type CircleMode = 'circunferencia' | 'circulo';

/**
 * Radius line configuration
 */
export interface RadiusConfig {
  /** Angle in degrees (0 = right/3 o'clock, increases clockwise in SVG) */
  toAngle?: number;
  /** Label for the radius line (e.g., 'r', '5 cm') */
  label?: string;
  /** Custom stroke color */
  color?: string;
  /** Stroke style */
  strokeStyle?: 'solid' | 'dashed' | 'dotted';
  /** Show measurement value */
  showMeasurement?: boolean;
}

/**
 * Diameter line configuration
 */
export interface DiameterConfig {
  /** Angle of the diameter in degrees (0 = horizontal) */
  angle?: number;
  /** Label for the diameter (e.g., 'd', '10 cm') */
  label?: string;
  /** Custom stroke color */
  color?: string;
  /** Stroke style */
  strokeStyle?: 'solid' | 'dashed' | 'dotted';
  /** Show endpoint labels */
  endpointLabels?: [string, string];
}

/**
 * Sector (pie slice) configuration
 */
export interface SectorConfig {
  /** Start angle in degrees (0 = right/3 o'clock, increases clockwise in SVG) */
  startAngle: number;
  /** End angle in degrees */
  endAngle: number;
  /** Fill color for the sector */
  fill?: string;
  /** Fill opacity (0-1) */
  fillOpacity?: number;
  /** Stroke color for sector edges */
  stroke?: string;
  /** Show radius lines at sector edges */
  showRadii?: boolean;
}

/**
 * Arc configuration
 */
export interface ArcConfig {
  /** Start angle in degrees */
  startAngle: number;
  /** End angle in degrees */
  endAngle: number;
  /** Stroke width for the arc */
  strokeWidth?: number;
  /** Stroke color */
  color?: string;
  /** Show arc length label */
  showLength?: boolean;
}

/**
 * Central angle configuration
 */
export interface CentralAngleConfig {
  /** Start angle in degrees */
  startAngle: number;
  /** End angle in degrees */
  endAngle: number;
  /** Show degree value */
  showDegrees?: boolean;
  /** Custom label (e.g., 'θ', 'α') */
  label?: string;
  /** Arc radius for angle visualization */
  arcRadius?: number;
  /** Custom color */
  color?: string;
}

/**
 * Unified arc configuration - combines arc, sector, and central angle in one config
 * Preferred API over separate arc/sector/centralAngle props
 */
export interface UnifiedArcConfig {
  /** Start angle in degrees (0 = right/3 o'clock, increases clockwise in SVG) */
  startAngle: number;
  /** End angle in degrees */
  endAngle: number;

  // Arc appearance
  /** Stroke width for the arc on circumference */
  strokeWidth?: number;
  /** Color for the arc and related elements */
  color?: string;

  // Unified options - combine what was previously 3 separate configs
  /** Show central angle arc at center */
  showAngle?: boolean;
  /** Show degree value on the angle */
  showDegrees?: boolean;
  /** Custom label for angle (e.g., 'θ', 'α') - overrides degree display */
  angleLabel?: string;
  /** Arc radius for angle visualization */
  angleArcRadius?: number;
  /** Show filled pie slice (sector) */
  showSector?: boolean;
  /** Sector fill color (defaults to color with opacity) */
  sectorFill?: string;
  /** Sector opacity (0-1) */
  sectorOpacity?: number;
  /** Show radius lines at arc boundaries */
  showRadii?: boolean;
}

/**
 * Inscribed angle configuration
 */
export interface InscribedAngleConfig {
  /** Vertex point on the circumference (angle in degrees, or explicit coordinates) */
  vertex: LabeledPoint | number;
  /** Start point of the subtended arc (angle in degrees) */
  arcStart: number;
  /** End point of the subtended arc (angle in degrees) */
  arcEnd: number;
  /** Show degree value */
  showDegrees?: boolean;
  /** Custom label */
  label?: string;
  /** Custom color */
  color?: string;
  /** Arc radius for angle visualization */
  arcRadius?: number;
}

/**
 * Chord configuration
 */
export interface ChordConfig {
  /** Start point angle on circumference (degrees) */
  fromAngle: number;
  /** End point angle on circumference (degrees) */
  toAngle: number;
  /** Label for the chord */
  label?: string;
  /** Custom stroke color */
  color?: string;
  /** Stroke style */
  strokeStyle?: 'solid' | 'dashed' | 'dotted';
  /** Show endpoint markers */
  showEndpoints?: boolean;
}

/**
 * Point on circle configuration (for marking specific points)
 */
export interface PointOnCircleConfig {
  /** Angle in degrees (0 = right/3 o'clock) */
  angle: number;
  /** Label for the point */
  label?: string;
  /** Point radius in pixels */
  radius?: number;
  /** Point color */
  color?: string;
}

/**
 * Main CircleFigure component props
 */
export interface CircleFigureProps {
  // Required
  /** Center point of the circle */
  center: LabeledPoint;
  /** Radius in SVG units */
  radius: number;

  // Display mode
  /** Whether to render as standalone SVG (true) or <g> element (false) */
  standalone?: boolean;
  /** Circle mode: 'circunferencia' (outline only) or 'circulo' (filled) */
  mode?: CircleMode;

  // Center and radius display
  /** Show center point marker */
  showCenter?: boolean;
  /** Show radius line - boolean or config object */
  showRadius?: boolean | RadiusConfig;
  /** Show diameter line - boolean or config object */
  showDiameter?: boolean | DiameterConfig;

  // Sectors and arcs (unified API - preferred)
  /** Array of unified arc configurations - preferred API */
  arcs?: UnifiedArcConfig[];

  // Sectors and arcs (legacy API - kept for backward compatibility)
  /** Sector (pie slice) configuration */
  sector?: SectorConfig;
  /** Arc configuration (highlighted portion of circumference) */
  arc?: ArcConfig;

  // Angles
  /** Central angle configuration */
  centralAngle?: CentralAngleConfig;
  /** Inscribed angle configuration */
  inscribedAngle?: InscribedAngleConfig;

  // Chords
  /** Array of chord configurations */
  chords?: ChordConfig[];

  // Points on circle
  /** Points to mark on the circumference */
  points?: PointOnCircleConfig[];

  // Visual styling
  /** Fill color (for circulo mode) */
  fill?: string;
  /** Fill opacity (0-1) */
  fillOpacity?: number;
  /** Stroke color for circumference */
  stroke?: string;
  /** Stroke width for circumference */
  strokeWidth?: number;

  // Grid and background
  /** Show grid background */
  showGrid?: boolean;
  /** Grid cell size in pixels */
  gridSize?: number;
  /** Grid color */
  gridColor?: string;

  // SVG dimensions (for standalone mode)
  /** SVG width */
  width?: number;
  /** SVG height */
  height?: number;
  /** Custom viewBox */
  viewBox?: string;
  /** Padding around the circle */
  padding?: number;

  // Accessibility
  /** ARIA label */
  ariaLabel?: string;

  // Custom styling
  /** Additional CSS classes */
  className?: string;
}

/**
 * Presets for common circle configurations
 */
export interface CirclePreset {
  name: string;
  description: string;
  center: LabeledPoint;
  radius: number;
  mode?: CircleMode;
  showCenter?: boolean;
  showRadius?: boolean | RadiusConfig;
  sector?: SectorConfig;
}
