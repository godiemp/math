/**
 * Default colors for vector figure components
 */
export const DEFAULT_COLORS = {
  // Primary vector color
  vector: 'rgb(59, 130, 246)', // blue-500
  vectorFill: 'rgb(59, 130, 246)', // blue-500

  // Secondary vector (for addition)
  vectorSecondary: 'rgb(16, 185, 129)', // emerald-500

  // Resultant vector
  resultant: 'rgb(168, 85, 247)', // purple-500

  // Component lines (projections)
  component: 'rgb(156, 163, 175)', // gray-400
  componentX: 'rgb(239, 68, 68)', // red-500
  componentY: 'rgb(16, 185, 129)', // emerald-500

  // Construction lines
  construction: 'rgb(245, 158, 11)', // amber-500

  // Axes
  axis: 'rgb(17, 24, 39)', // gray-900

  // Grid
  grid: 'rgb(229, 231, 235)', // gray-200
  gridMajor: 'rgb(209, 213, 219)', // gray-300

  // Origin
  origin: 'rgb(239, 68, 68)', // red-500

  // Points
  point: 'rgb(59, 130, 246)', // blue-500
  pointFill: 'rgb(59, 130, 246)', // blue-500

  // Labels
  label: 'rgb(17, 24, 39)', // gray-900
  axisLabel: 'rgb(107, 114, 128)', // gray-500

  // Dragging state
  dragging: 'rgb(99, 102, 241)', // indigo-500

  // Angle arc
  angleArc: 'rgb(245, 158, 11)', // amber-500
} as const;

/**
 * Default styling values
 */
export const DEFAULT_STYLES = {
  strokeWidth: 2,
  arrowSize: 10,
  pointRadius: 5,
  pointRadiusDraggable: 8,
  axisWidth: 1.5,
  gridWidth: 0.5,
  tickSize: 6,
  labelFontSize: 12,
  axisLabelFontSize: 10,
} as const;

/**
 * Default coordinate system values
 */
export const DEFAULT_COORDS = {
  xRange: [-5, 5] as [number, number],
  yRange: [-5, 5] as [number, number],
  scale: 30, // pixels per unit
  gridSpacing: 1,
  tickInterval: 1,
  padding: 40,
  width: 400,
  height: 300,
} as const;
