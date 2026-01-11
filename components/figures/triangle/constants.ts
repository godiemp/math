/**
 * Default colors for triangle figure components
 */
export const DEFAULT_COLORS = {
  fill: 'rgba(59, 130, 246, 0.15)', // blue-500 with opacity
  stroke: 'rgb(59, 130, 246)', // blue-500
  angleArc: 'rgb(245, 158, 11)', // amber-500
  specialLine: 'rgb(168, 85, 247)', // purple-500
  rightAngle: 'rgb(239, 68, 68)', // red-500
  grid: 'rgb(229, 231, 235)', // gray-200
  vertex: 'rgb(17, 24, 39)', // gray-900
  vertexDragging: 'rgb(99, 102, 241)', // indigo-500
  label: 'rgb(17, 24, 39)', // gray-900
  notablePoints: {
    circuncentro: 'rgb(168, 85, 247)', // purple-500
    incentro: 'rgb(245, 158, 11)', // amber-500
    baricentro: 'rgb(16, 185, 129)', // emerald-500
    ortocentro: 'rgb(239, 68, 68)', // red-500
  },
  circles: {
    circumscribed: 'rgb(168, 85, 247)', // purple-500
    inscribed: 'rgb(245, 158, 11)', // amber-500
  },
} as const;
