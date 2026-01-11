/**
 * Vector figure types for 2D vector and Cartesian plane visualization
 * Based on Chilean curriculum MA07-OA-14: "Identificar puntos en el plano
 * cartesiano, usando pares ordenados y vectores de forma concreta y pictórica."
 */

/**
 * Point with optional label and label positioning (reused from triangle.ts)
 */
export interface LabeledPoint {
  x: number;
  y: number;
  label?: string;
  labelOffset?: { x: number; y: number };
}

/**
 * Vector configuration
 */
export interface VectorConfig {
  /** Starting point (defaults to origin if not specified) */
  from?: LabeledPoint;
  /** Ending point (defines the vector direction and magnitude) */
  to: LabeledPoint;
  /** Vector label (e.g., 'v', 'u', 'a') */
  label?: string;
  /** Label position */
  labelPosition?: 'middle' | 'tip';
  /** Custom label offset */
  labelOffset?: { x: number; y: number };
  /** Vector color */
  color?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Show magnitude value label */
  showMagnitude?: boolean;
  /** Show angle with x-axis */
  showAngle?: boolean;
  /** Arrowhead size in pixels */
  arrowSize?: number;
  /** Stroke style */
  strokeStyle?: 'solid' | 'dashed' | 'dotted';
}

/**
 * Vector component (projection) configuration
 */
export interface VectorComponentConfig {
  /** Which vector to show components for (index in vectors array) */
  vectorIndex: number;
  /** Show x component (horizontal projection) */
  showX?: boolean;
  /** Show y component (vertical projection) */
  showY?: boolean;
  /** Color for component lines */
  color?: string;
  /** Label for x component */
  xLabel?: string;
  /** Label for y component */
  yLabel?: string;
}

/**
 * Vector addition visualization
 */
export interface VectorAdditionConfig {
  /** Method: 'parallelogram' or 'head-to-tail' */
  method: 'parallelogram' | 'head-to-tail';
  /** Indices of vectors to add (from vectors array) */
  vectorIndices: [number, number];
  /** Show resultant vector */
  showResultant?: boolean;
  /** Resultant vector label */
  resultantLabel?: string;
  /** Color for resultant */
  resultantColor?: string;
  /** Show construction lines (parallelogram sides or translated vectors) */
  showConstruction?: boolean;
  /** Construction line style */
  constructionStyle?: 'dashed' | 'dotted';
}

/**
 * Main VectorFigure component props
 */
export interface VectorFigureProps {
  // Standalone mode
  /** If true (default), renders as <svg>. If false, renders as <g> for embedding. */
  standalone?: boolean;

  // Vectors
  /** Array of vectors to display */
  vectors?: VectorConfig[];

  // Points (for plotting ordered pairs without arrows)
  /** Additional points to display on the plane */
  points?: LabeledPoint[];

  // Vector features
  /** Vector components to show (projections onto axes) */
  components?: VectorComponentConfig[];
  /** Vector addition visualization */
  addition?: VectorAdditionConfig;

  // Origin
  /** Custom origin point */
  origin?: LabeledPoint;
  /** Show origin marker */
  showOrigin?: boolean;

  // Interactive dragging
  /** Whether vector endpoints can be dragged */
  draggable?: boolean;
  /** Callback when vectors change */
  onVectorsChange?: (vectors: VectorConfig[]) => void;
  /** Callback when points change */
  onPointsChange?: (points: LabeledPoint[]) => void;

  // Visual styling
  /** Default fill color for points */
  fill?: string;
  /** Default stroke color for vectors */
  stroke?: string;
  /** Default stroke width */
  strokeWidth?: number;

  // Coordinate system (for standalone mode)
  /** X-axis range [min, max] - uses mathematical coordinates */
  xRange?: [number, number];
  /** Y-axis range [min, max] - uses mathematical coordinates */
  yRange?: [number, number];
  /** Pixels per unit */
  scale?: number;

  // Grid and axes (for standalone mode)
  /** Whether to show a grid background */
  showGrid?: boolean;
  /** Grid spacing in units */
  gridSpacing?: number;
  /** Grid color */
  gridColor?: string;
  /** Whether to show axes */
  showAxes?: boolean;
  /** Whether to show tick marks on axes */
  showTicks?: boolean;
  /** Whether to show axis labels (numbers) */
  showAxisLabels?: boolean;

  // SVG dimensions
  /** SVG width */
  width?: number;
  /** SVG height */
  height?: number;
  /** Padding around content in pixels */
  padding?: number;

  // Accessibility
  /** ARIA label for the SVG */
  ariaLabel?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * CartesianPlane component props
 */
export interface CartesianPlaneProps {
  /** X-axis range [min, max] */
  xRange: [number, number];
  /** Y-axis range [min, max] */
  yRange: [number, number];

  /** Pixels per unit (default: 30) */
  scale?: number;

  // Axes
  /** Whether to show axes (default: true) */
  showAxes?: boolean;
  /** Axis color */
  axisColor?: string;
  /** Axis stroke width */
  axisWidth?: number;

  // Tick marks
  /** Whether to show tick marks (default: true) */
  showTicks?: boolean;
  /** Tick mark size in pixels */
  tickSize?: number;
  /** Tick interval in units (default: 1) */
  tickInterval?: number;

  // Axis labels
  /** Whether to show axis labels/numbers (default: true) */
  showAxisLabels?: boolean;
  /** X-axis label (e.g., 'x') */
  xAxisLabel?: string;
  /** Y-axis label (e.g., 'y') */
  yAxisLabel?: string;

  // Grid
  /** Whether to show grid (default: true) */
  showGrid?: boolean;
  /** Grid color */
  gridColor?: string;
  /** Major grid line interval */
  majorGridInterval?: number;
  /** Minor grid line interval (optional) */
  minorGridInterval?: number;

  // Origin
  /** Whether to show origin marker */
  showOrigin?: boolean;
  /** Origin label (default: 'O') */
  originLabel?: string;

  // SVG dimensions
  /** SVG width */
  width?: number;
  /** SVG height */
  height?: number;
  /** Padding around the plane in pixels */
  padding?: number;

  // Children (embedded figures with standalone={false})
  /** Child components to render on the plane */
  children?: React.ReactNode;

  // Accessibility
  /** ARIA label for the SVG */
  ariaLabel?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Preset for common vector configurations
 */
export interface VectorPreset {
  name: string;
  description: string;
  vectors?: VectorConfig[];
  points?: LabeledPoint[];
  showComponents?: boolean;
  componentConfig?: VectorComponentConfig;
  addition?: VectorAdditionConfig;
  xRange?: [number, number];
  yRange?: [number, number];
}

/**
 * Preset for Cartesian plane configurations
 */
export interface CartesianPreset {
  name: string;
  description: string;
  xRange: [number, number];
  yRange: [number, number];
  showGrid?: boolean;
  showTicks?: boolean;
  showAxisLabels?: boolean;
}
