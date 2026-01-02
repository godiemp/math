/**
 * Quadrilateral figure types for comprehensive geometry visualization
 * Following the pattern from triangle.ts and circle.ts
 */

/**
 * Point with optional label and label positioning (shared across figure types)
 */
export interface LabeledPoint {
  x: number;
  y: number;
  label?: string;
  labelOffset?: { x: number; y: number };
}

/**
 * Quadrilateral types (Spanish names for Chilean PAES curriculum)
 */
export type QuadrilateralType =
  | 'cuadrado' // Square: 4 equal sides, 4 right angles
  | 'rectangulo' // Rectangle: opposite sides equal, 4 right angles
  | 'rombo' // Rhombus: 4 equal sides, opposite angles equal
  | 'paralelogramo' // Parallelogram: opposite sides parallel and equal
  | 'trapecio' // Trapezoid: at least one pair of parallel sides
  | 'trapecio-isosceles' // Isosceles trapezoid: equal legs
  | 'trapecio-rectangulo' // Right trapezoid: two right angles
  | 'cometa' // Kite/Deltoid: two pairs of adjacent equal sides
  | 'irregular'; // Irregular: no special properties

/**
 * Side configuration for quadrilateral edges
 * Side indices: 0=v0-v1, 1=v1-v2, 2=v2-v3, 3=v3-v0
 */
export interface QuadSideConfig {
  /** Label for the side (e.g., 'a', 'b', 'lado') */
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
  /** Number of tick marks for equal sides (1, 2, or 3) */
  equalMarks?: 1 | 2 | 3;
  /** Show parallel marks (arrows) */
  parallelMarks?: boolean;
  /** Number of parallel marks (1 or 2 arrows) to distinguish different parallel pairs */
  parallelMarkCount?: 1 | 2;
}

/**
 * Angle configuration for quadrilateral vertices
 * Angle indices match vertex indices (0, 1, 2, 3)
 */
export interface QuadAngleConfig {
  /** Label for the angle (degrees or Greek letter like 'α', 'β') */
  label?: string;
  /** Whether to show the angle arc */
  showArc?: boolean;
  /** Radius of the angle arc in pixels */
  arcRadius?: number;
  /** Custom color for the angle arc */
  color?: string;
  /** Whether to show degree value (e.g., '90°') */
  showDegrees?: boolean;
  /** Whether this is a right angle (shows square marker instead of arc) */
  isRightAngle?: boolean;
}

/**
 * Diagonal configuration for connecting opposite vertices
 */
export interface DiagonalConfig {
  /** From vertex index (0-3) */
  from: 0 | 1 | 2 | 3;
  /** To vertex index (0-3) */
  to: 0 | 1 | 2 | 3;
  /** Label for the diagonal (e.g., 'd₁', 'd₂', 'AC', 'BD') */
  label?: string;
  /** Custom color */
  color?: string;
  /** Stroke style */
  strokeStyle?: 'solid' | 'dashed' | 'dotted';
  /** Show midpoint marker */
  showMidpoint?: boolean;
  /** Label for the midpoint */
  midpointLabel?: string;
  /** Show the length of the diagonal */
  showLength?: boolean;
  /** Show bisection marks (tick marks on each half from intersection) */
  showBisectionMarks?: boolean;
  /** Number of bisection tick marks (1, 2, or 3) */
  bisectionMarkCount?: 1 | 2 | 3;
}

/**
 * Global diagonal options for the quadrilateral
 */
export interface DiagonalOptions {
  /** Show diagonal intersection point */
  showIntersection?: boolean;
  /** Label for intersection point */
  intersectionLabel?: string;
  /** Show marks indicating diagonals are equal length */
  showEqualLengthMarks?: boolean;
  /** Number of equal length marks (1, 2, or 3) */
  equalLengthMarkCount?: 1 | 2 | 3;
  /** Color for equal length marks */
  equalLengthMarkColor?: string;
}

/**
 * Special line types for quadrilaterals (Spanish for Chilean curriculum)
 */
export type QuadSpecialLineType =
  | 'diagonal' // Diagonal connecting opposite vertices
  | 'altura' // Height/altitude - perpendicular from base to opposite side
  | 'mediatriz' // Perpendicular bisector of a side
  | 'mediana'; // Line connecting midpoints of opposite sides

/**
 * Configuration for special lines in the quadrilateral
 */
export interface QuadSpecialLineConfig {
  /** Type of special line */
  type: QuadSpecialLineType;
  /** Which vertex the line originates from (for altura) */
  fromVertex?: 0 | 1 | 2 | 3;
  /** Which side the line goes to (for altura, mediatriz) */
  toSide?: 0 | 1 | 2 | 3;
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
 * Configuration to build a quadrilateral from type specification
 */
export interface FromTypeConfig {
  /** Quadrilateral type */
  type: QuadrilateralType;
  /** Primary dimension - side length for square/rhombus, base for rectangle/trapezoid */
  size?: number;
  /** Height dimension (for rectangle, trapezoid, parallelogram) */
  height?: number;
  /** Angle in degrees (for rhombus: acute angle, for parallelogram: base angle) */
  angle?: number;
  /** For trapezoid: ratio of top base to bottom base (0-1) */
  baseRatio?: number;
  /** For kite: ratio for asymmetric diagonal position */
  diagonalRatio?: number;
  /** Rotation in degrees */
  rotation?: number;
  /** Center X position */
  centerX?: number;
  /** Center Y position */
  centerY?: number;
}

/**
 * Shorthand configuration to build a square
 */
export interface FromSquareConfig {
  /** Side length */
  sideLength: number;
  /** Rotation in degrees */
  rotation?: number;
  /** Center X position */
  centerX?: number;
  /** Center Y position */
  centerY?: number;
}

/**
 * Shorthand configuration to build a rectangle
 */
export interface FromRectangleConfig {
  /** Width (horizontal dimension) */
  width: number;
  /** Height (vertical dimension) */
  height: number;
  /** Rotation in degrees */
  rotation?: number;
  /** Center X position */
  centerX?: number;
  /** Center Y position */
  centerY?: number;
}

/**
 * Detected properties of a quadrilateral for analysis
 */
export interface QuadrilateralProperties {
  /** Detected quadrilateral type */
  type: QuadrilateralType;
  /** Perimeter (sum of all sides) */
  perimeter: number;
  /** Area (calculated using Shoelace formula) */
  area: number;
  /** Lengths of both diagonals [d1, d2] */
  diagonalLengths: [number, number];
  /** Whether the diagonals intersect inside the quadrilateral */
  diagonalsIntersect: boolean;
  /** Point where diagonals intersect (if they do) */
  diagonalIntersectionPoint?: LabeledPoint;
  /** Whether diagonals bisect each other (parallelogram property) */
  diagonalsBisectEachOther: boolean;
  /** Whether diagonals are equal length (rectangle property) */
  diagonalsAreEqual: boolean;
  /** Whether diagonals are perpendicular (rhombus property) */
  diagonalsPerpendicular: boolean;
  /** Pairs of parallel sides as [sideIndex1, sideIndex2] */
  parallelSidePairs: Array<[number, number]>;
  /** Groups of equal sides as arrays of side indices */
  equalSideGroups: number[][];
  /** Indices of vertices with right angles */
  rightAngleVertices: number[];
  /** Whether the quadrilateral is convex */
  isConvex: boolean;
  /** Whether the quadrilateral is self-intersecting (bowtie) */
  isSelfIntersecting: boolean;
}

/**
 * Validation result for quadrilateral vertices
 */
export interface QuadrilateralValidation {
  /** Whether the vertices form a valid quadrilateral */
  valid: boolean;
  /** Error message if invalid */
  error?: string;
  /** Warning messages (e.g., for self-intersecting) */
  warnings?: string[];
}

/**
 * Main QuadrilateralFigure component props
 */
export interface QuadrilateralFigureProps {
  // ============================================
  // Construction methods (use ONE)
  // ============================================

  /** Direct 4-vertex specification (clockwise or counter-clockwise order) */
  vertices?: [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint];

  /** Build from type with dimensions (recommended for standard shapes) */
  fromType?: FromTypeConfig;

  /** Shorthand for square - can be just a number (side length) or config object */
  fromSquare?: number | FromSquareConfig;

  /** Shorthand for rectangle */
  fromRectangle?: FromRectangleConfig | { width: number; height: number };

  // ============================================
  // Element configuration
  // ============================================

  /** Configuration for each side (indices: 0=v0-v1, 1=v1-v2, 2=v2-v3, 3=v3-v0) */
  sides?: [QuadSideConfig?, QuadSideConfig?, QuadSideConfig?, QuadSideConfig?];

  /** Configuration for angle at each vertex (indices match vertex indices) */
  angles?: [
    QuadAngleConfig?,
    QuadAngleConfig?,
    QuadAngleConfig?,
    QuadAngleConfig?,
  ];

  /** Diagonal configurations */
  diagonals?: DiagonalConfig[];

  /** Show both diagonals with default styling (shorthand) */
  showDiagonals?: boolean;

  /** Global diagonal options (intersection, equal length marks) */
  diagonalOptions?: DiagonalOptions;

  /** Special lines to draw (altura, mediatriz, mediana) */
  specialLines?: QuadSpecialLineConfig[];

  // ============================================
  // Auto-detection options
  // ============================================

  /** Auto-detect and show parallel marks on parallel sides */
  autoParallelMarks?: boolean;

  /** Auto-detect and show equal marks on equal sides */
  autoEqualMarks?: boolean;

  /** Auto-detect and show right angle markers */
  autoRightAngleMarkers?: boolean;

  /** Auto-detect and show bisection marks when diagonals bisect each other */
  autoDiagonalBisectionMarks?: boolean;

  /** Auto-detect and show marks when diagonals are equal length */
  autoDiagonalEqualMarks?: boolean;

  /** Auto-detect and show right angle marker when diagonals are perpendicular */
  autoDiagonalRightAngle?: boolean;

  /** Auto-show angle arcs at all vertices with degrees */
  autoAngleArcs?: boolean;

  // ============================================
  // Visual styling
  // ============================================

  /** Fill color for the quadrilateral */
  fill?: string;

  /** Fill opacity (0-1) */
  fillOpacity?: number;

  /** Stroke color for the quadrilateral outline */
  stroke?: string;

  /** Stroke width for the quadrilateral outline */
  strokeWidth?: number;

  // ============================================
  // Grid and background
  // ============================================

  /** Whether to show a grid background */
  showGrid?: boolean;

  /** Grid cell size in pixels */
  gridSize?: number;

  /** Grid color */
  gridColor?: string;

  // ============================================
  // SVG dimensions
  // ============================================

  /** SVG width */
  width?: number;

  /** SVG height */
  height?: number;

  /** Custom viewBox (default: auto-calculated from vertices + padding) */
  viewBox?: string;

  /** Padding around the quadrilateral in pixels */
  padding?: number;

  // ============================================
  // Additional display options
  // ============================================

  /** Whether to show vertex points */
  showVertices?: boolean;

  /** Vertex point radius */
  vertexRadius?: number;

  // ============================================
  // Accessibility
  // ============================================

  /** ARIA label for the SVG */
  ariaLabel?: string;

  /** Additional CSS classes */
  className?: string;

  // ============================================
  // Render mode
  // ============================================

  /** If true, renders as standalone <svg>. If false, renders as <g> for embedding. */
  standalone?: boolean;
}

/**
 * Preset for common quadrilateral configurations
 */
export interface QuadrilateralPreset {
  /** Display name */
  name: string;
  /** Description of the quadrilateral */
  description: string;
  /** Configuration to build this quadrilateral */
  config: FromTypeConfig;
}
