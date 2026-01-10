'use client';

import type {
  LabeledPoint,
  SideConfig,
  AngleConfig,
  SpecialLineConfig,
  NotablePointConfig,
  TriangleCircleConfig,
} from '@/lib/types/triangle';
import {
  calculateVertexLabelPosition,
  calculateSideLabelPosition,
  describeAngleArc,
  describeRightAngleMarker,
  calculateSpecialLineEndpoints,
  angleAtVertex,
  midpoint,
  getStrokeDashArray,
} from '@/lib/geometry/triangleUtils';
import { DEFAULT_COLORS } from './constants';

// ============================================================
// Label Components
// ============================================================

interface VertexLabelProps {
  vertex: LabeledPoint;
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint];
  draggable?: boolean;
}

export function VertexLabel({ vertex, vertices, draggable }: VertexLabelProps) {
  const pos = calculateVertexLabelPosition(vertex, vertices, draggable ? 22 : 18);

  return (
    <text
      x={pos.x}
      y={pos.y}
      fill={DEFAULT_COLORS.label}
      fontSize="14"
      fontWeight="bold"
      textAnchor="middle"
      dominantBaseline="middle"
      className="dark:fill-white"
    >
      {vertex.label}
    </text>
  );
}

interface SideLabelProps {
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint];
  sideIndex: 0 | 1 | 2;
  config: SideConfig;
}

export function SideLabel({ vertices, sideIndex, config }: SideLabelProps) {
  const p1 = vertices[sideIndex];
  const p2 = vertices[(sideIndex + 1) % 3];
  const pos = calculateSideLabelPosition(p1, p2, vertices, 15);
  const labelText = config.showMeasurement ? config.measurement : config.label;

  if (!labelText) return null;

  return (
    <text
      x={pos.x}
      y={pos.y}
      fill={config.color || DEFAULT_COLORS.stroke}
      fontSize="13"
      fontWeight="600"
      textAnchor="middle"
      dominantBaseline="middle"
      className="dark:fill-blue-300"
    >
      {labelText}
    </text>
  );
}

// ============================================================
// Angle Components
// ============================================================

interface AngleArcProps {
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint];
  vertexIndex: 0 | 1 | 2;
  config: AngleConfig;
}

export function AngleArc({ vertices, vertexIndex, config }: AngleArcProps) {
  const vertex = vertices[vertexIndex];
  const p1 = vertices[(vertexIndex + 1) % 3];
  const p2 = vertices[(vertexIndex + 2) % 3];
  const arcPath = describeAngleArc(vertex, p1, p2, config.arcRadius || 25);

  return (
    <path
      d={arcPath}
      fill="none"
      stroke={config.color || DEFAULT_COLORS.angleArc}
      strokeWidth="2"
      strokeLinecap="round"
      className="dark:stroke-amber-400"
    />
  );
}

interface AngleLabelProps {
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint];
  vertexIndex: 0 | 1 | 2;
  config: AngleConfig;
}

export function AngleLabel({ vertices, vertexIndex, config }: AngleLabelProps) {
  const vertex = vertices[vertexIndex];
  const p1 = vertices[(vertexIndex + 1) % 3];
  const p2 = vertices[(vertexIndex + 2) % 3];

  // Calculate midpoint direction for label placement
  const mid = midpoint(p1, p2);
  const dx = vertex.x - mid.x;
  const dy = vertex.y - mid.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Position label inside the angle, closer to vertex
  const labelRadius = (config.arcRadius || 25) + 12;
  const labelX = vertex.x - (dx / dist) * labelRadius;
  const labelY = vertex.y - (dy / dist) * labelRadius;

  // Determine label text
  let labelText = config.label;
  if (config.showDegrees && !labelText) {
    const angleDegrees = Math.round(angleAtVertex(vertices, vertexIndex));
    labelText = `${angleDegrees}°`;
  }

  if (!labelText) return null;

  return (
    <text
      x={labelX}
      y={labelY}
      fill={config.color || DEFAULT_COLORS.angleArc}
      fontSize="12"
      fontWeight="bold"
      textAnchor="middle"
      dominantBaseline="middle"
      className="dark:fill-amber-400"
    >
      {labelText}
    </text>
  );
}

// ============================================================
// Right Angle Markers
// ============================================================

interface RightAngleMarkerProps {
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint];
  vertexIndex: 0 | 1 | 2;
  size: number;
}

export function RightAngleMarker({ vertices, vertexIndex, size }: RightAngleMarkerProps) {
  const vertex = vertices[vertexIndex];
  const p1 = vertices[(vertexIndex + 1) % 3];
  const p2 = vertices[(vertexIndex + 2) % 3];
  const path = describeRightAngleMarker(vertex, p1, p2, size);

  return (
    <path
      d={path}
      fill="none"
      stroke={DEFAULT_COLORS.rightAngle}
      strokeWidth="2"
      strokeLinejoin="miter"
      className="dark:stroke-red-400"
    />
  );
}

interface RightAngleMarkerAtPointProps {
  point: LabeledPoint;
  direction1: LabeledPoint;
  direction2: LabeledPoint;
  size: number;
}

export function RightAngleMarkerAtPoint({
  point,
  direction1,
  direction2,
  size,
}: RightAngleMarkerAtPointProps) {
  const path = describeRightAngleMarker(point, direction1, direction2, size);

  return (
    <path
      d={path}
      fill="none"
      stroke={DEFAULT_COLORS.specialLine}
      strokeWidth="1.5"
      className="dark:stroke-purple-400"
    />
  );
}

// ============================================================
// Equality Markers
// ============================================================

interface EqualDivisionMarksProps {
  point1: LabeledPoint;
  point2: LabeledPoint;
  midPoint: LabeledPoint;
  color: string;
  tickSize?: number;
}

/**
 * Generate tick marks to indicate equal segments (division marks)
 * Places two small perpendicular lines on either side of the midpoint
 */
export function EqualDivisionMarks({
  point1,
  point2,
  midPoint,
  color,
  tickSize = 6,
}: EqualDivisionMarksProps) {
  // Calculate perpendicular direction to the segment
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return null;

  // Perpendicular unit vector
  const perpX = -dy / len;
  const perpY = dx / len;

  // Direction along the segment
  const dirX = dx / len;
  const dirY = dy / len;

  // Position tick marks at 1/4 and 3/4 of each half segment
  const offset = len * 0.25;

  // Tick mark 1 (between midpoint and point1)
  const tick1Center = {
    x: midPoint.x - dirX * offset,
    y: midPoint.y - dirY * offset,
  };

  // Tick mark 2 (between midpoint and point2)
  const tick2Center = {
    x: midPoint.x + dirX * offset,
    y: midPoint.y + dirY * offset,
  };

  return (
    <g className="dark:stroke-purple-400">
      <line
        x1={tick1Center.x - perpX * tickSize}
        y1={tick1Center.y - perpY * tickSize}
        x2={tick1Center.x + perpX * tickSize}
        y2={tick1Center.y + perpY * tickSize}
        stroke={color}
        strokeWidth="2"
      />
      <line
        x1={tick2Center.x - perpX * tickSize}
        y1={tick2Center.y - perpY * tickSize}
        x2={tick2Center.x + perpX * tickSize}
        y2={tick2Center.y + perpY * tickSize}
        stroke={color}
        strokeWidth="2"
      />
    </g>
  );
}

interface EqualAngleMarksProps {
  vertex: LabeledPoint;
  p1: LabeledPoint;
  p2: LabeledPoint;
  bisectorEnd: LabeledPoint;
  color: string;
  arcRadius?: number;
}

/**
 * Generate equal angle marks for bisectrices
 * Shows two small arcs with tick marks to indicate the angle is divided equally
 */
export function EqualAngleMarks({
  vertex,
  p1,
  p2,
  bisectorEnd,
  color,
  arcRadius = 20,
}: EqualAngleMarksProps) {
  // Calculate angles to each point from vertex
  const angleToP1 = Math.atan2(p1.y - vertex.y, p1.x - vertex.x);
  const angleToBisector = Math.atan2(bisectorEnd.y - vertex.y, bisectorEnd.x - vertex.x);
  const angleToP2 = Math.atan2(p2.y - vertex.y, p2.x - vertex.x);

  // Calculate arc endpoints for first half-angle (p1 to bisector)
  const arc1Start = {
    x: vertex.x + Math.cos(angleToP1) * arcRadius,
    y: vertex.y + Math.sin(angleToP1) * arcRadius,
  };
  const arc1End = {
    x: vertex.x + Math.cos(angleToBisector) * arcRadius,
    y: vertex.y + Math.sin(angleToBisector) * arcRadius,
  };

  // Calculate arc endpoints for second half-angle (bisector to p2)
  const arc2Start = {
    x: vertex.x + Math.cos(angleToBisector) * arcRadius,
    y: vertex.y + Math.sin(angleToBisector) * arcRadius,
  };
  const arc2End = {
    x: vertex.x + Math.cos(angleToP2) * arcRadius,
    y: vertex.y + Math.sin(angleToP2) * arcRadius,
  };

  // Handle angle wrapping for midpoint calculations
  let diff1 = angleToBisector - angleToP1;
  if (Math.abs(diff1) > Math.PI) {
    diff1 = diff1 > 0 ? diff1 - 2 * Math.PI : diff1 + 2 * Math.PI;
  }
  const correctedMidAngle1 = angleToP1 + diff1 / 2;

  let diff2 = angleToP2 - angleToBisector;
  if (Math.abs(diff2) > Math.PI) {
    diff2 = diff2 > 0 ? diff2 - 2 * Math.PI : diff2 + 2 * Math.PI;
  }
  const correctedMidAngle2 = angleToBisector + diff2 / 2;

  const tick1Pos = {
    x: vertex.x + Math.cos(correctedMidAngle1) * arcRadius,
    y: vertex.y + Math.sin(correctedMidAngle1) * arcRadius,
  };
  const tick2Pos = {
    x: vertex.x + Math.cos(correctedMidAngle2) * arcRadius,
    y: vertex.y + Math.sin(correctedMidAngle2) * arcRadius,
  };

  const tickSize = 4;
  const largeArcFlag = 0;

  // Check sweep direction
  const crossProduct1 = (arc1End.x - vertex.x) * (arc1Start.y - vertex.y) -
                        (arc1End.y - vertex.y) * (arc1Start.x - vertex.x);
  const sweepFlag1 = crossProduct1 > 0 ? 1 : 0;

  const crossProduct2 = (arc2End.x - vertex.x) * (arc2Start.y - vertex.y) -
                        (arc2End.y - vertex.y) * (arc2Start.x - vertex.x);
  const sweepFlag2 = crossProduct2 > 0 ? 1 : 0;

  return (
    <g className="dark:stroke-purple-400">
      <path
        d={`M ${arc1Start.x} ${arc1Start.y} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} ${sweepFlag1} ${arc1End.x} ${arc1End.y}`}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d={`M ${arc2Start.x} ${arc2Start.y} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} ${sweepFlag2} ${arc2End.x} ${arc2End.y}`}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
      <line
        x1={tick1Pos.x - (tick1Pos.x - vertex.x) / arcRadius * tickSize}
        y1={tick1Pos.y - (tick1Pos.y - vertex.y) / arcRadius * tickSize}
        x2={tick1Pos.x + (tick1Pos.x - vertex.x) / arcRadius * tickSize}
        y2={tick1Pos.y + (tick1Pos.y - vertex.y) / arcRadius * tickSize}
        stroke={color}
        strokeWidth="2"
      />
      <line
        x1={tick2Pos.x - (tick2Pos.x - vertex.x) / arcRadius * tickSize}
        y1={tick2Pos.y - (tick2Pos.y - vertex.y) / arcRadius * tickSize}
        x2={tick2Pos.x + (tick2Pos.x - vertex.x) / arcRadius * tickSize}
        y2={tick2Pos.y + (tick2Pos.y - vertex.y) / arcRadius * tickSize}
        stroke={color}
        strokeWidth="2"
      />
    </g>
  );
}

// ============================================================
// Special Lines
// ============================================================

interface SpecialLineProps {
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint];
  config: SpecialLineConfig;
}

export function SpecialLine({ vertices, config }: SpecialLineProps) {
  const { start, end } = calculateSpecialLineEndpoints(vertices, config);
  const dashArray = getStrokeDashArray(config.strokeStyle || 'dashed');

  const isSimetral = config.type === 'simetral' || config.type === 'mediatriz';
  const isTransversal = config.type === 'transversal' || config.type === 'mediana';
  const isBisectriz = config.type === 'bisectriz';

  const sideIndex = config.toSide ?? config.fromVertex;
  const sideP1 = vertices[(sideIndex + 1) % 3];
  const sideP2 = vertices[(sideIndex + 2) % 3];
  const sideMidPoint = midpoint(sideP1, sideP2);

  const transversalMidPoint = isTransversal ? end : null;

  const bisectrizVertex = vertices[config.fromVertex];
  const bisectrizP1 = vertices[(config.fromVertex + 1) % 3];
  const bisectrizP2 = vertices[(config.fromVertex + 2) % 3];

  return (
    <g>
      <line
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke={config.color || DEFAULT_COLORS.specialLine}
        strokeWidth="1.5"
        strokeDasharray={dashArray}
        className="dark:stroke-purple-400"
      />
      {config.showRightAngleMarker && config.type === 'altura' && (
        <RightAngleMarkerAtPoint
          point={end}
          direction1={start}
          direction2={vertices[(config.fromVertex + 2) % 3]}
          size={8}
        />
      )}
      {config.showRightAngleMarker && isSimetral && (
        <RightAngleMarkerAtPoint
          point={sideMidPoint}
          direction1={sideP1}
          direction2={{ x: sideMidPoint.x + (end.x - start.x), y: sideMidPoint.y + (end.y - start.y) }}
          size={8}
        />
      )}
      {config.showEqualMarks && isSimetral && (
        <EqualDivisionMarks
          point1={sideP1}
          point2={sideP2}
          midPoint={sideMidPoint}
          color={config.color || DEFAULT_COLORS.specialLine}
        />
      )}
      {config.showEqualMarks && isTransversal && transversalMidPoint && (
        <EqualDivisionMarks
          point1={vertices[(config.fromVertex + 1) % 3]}
          point2={vertices[(config.fromVertex + 2) % 3]}
          midPoint={transversalMidPoint}
          color={config.color || DEFAULT_COLORS.specialLine}
        />
      )}
      {config.showEqualAngleMarks && isBisectriz && (
        <EqualAngleMarks
          vertex={bisectrizVertex}
          p1={bisectrizP1}
          p2={bisectrizP2}
          bisectorEnd={end}
          color={config.color || DEFAULT_COLORS.specialLine}
        />
      )}
      {config.showLabel && (
        <text
          x={(start.x + end.x) / 2 - 15}
          y={(start.y + end.y) / 2}
          fill={config.color || DEFAULT_COLORS.specialLine}
          fontSize="11"
          fontStyle="italic"
          className="dark:fill-purple-400"
        >
          {config.type}
        </text>
      )}
    </g>
  );
}

// ============================================================
// Notable Points and Circles
// ============================================================

interface NotablePointProps {
  config: NotablePointConfig;
  position: LabeledPoint;
}

export function NotablePoint({ config, position }: NotablePointProps) {
  const color = config.color || DEFAULT_COLORS.notablePoints[config.type];
  const radius = config.radius || 8;

  return (
    <g>
      <circle
        cx={position.x}
        cy={position.y}
        r={radius}
        fill={color}
        stroke="white"
        strokeWidth={2}
        className="dark:stroke-gray-800"
      />
      {config.showLabel && (
        <text
          x={position.x + radius + 8}
          y={position.y + 4}
          fill={color}
          fontSize="12"
          fontWeight="bold"
          className="dark:fill-current"
        >
          {config.label || config.type.charAt(0).toUpperCase() + config.type.slice(1)}
        </text>
      )}
    </g>
  );
}

interface TriangleCircleProps {
  config: TriangleCircleConfig;
  notablePointsPositions: {
    circuncentro: LabeledPoint;
    incentro: LabeledPoint;
    baricentro: LabeledPoint;
    ortocentro: LabeledPoint;
  };
  circleRadii: {
    circumscribed: number;
    inscribed: number;
  };
}

export function TriangleCircle({ config, notablePointsPositions, circleRadii }: TriangleCircleProps) {
  const isCircumscribed = config.type === 'circumscribed';
  const center = isCircumscribed
    ? notablePointsPositions.circuncentro
    : notablePointsPositions.incentro;
  const radius = isCircumscribed
    ? circleRadii.circumscribed
    : circleRadii.inscribed;
  const strokeColor = config.stroke || DEFAULT_COLORS.circles[config.type];

  return (
    <g>
      <circle
        cx={center.x}
        cy={center.y}
        r={radius}
        fill="none"
        stroke={strokeColor}
        strokeWidth={config.strokeWidth || 2}
        strokeDasharray="6,4"
        className={isCircumscribed ? 'dark:stroke-purple-400' : 'dark:stroke-amber-400'}
      />
      {config.showCenter && (
        <circle
          cx={center.x}
          cy={center.y}
          r={4}
          fill={strokeColor}
          className={isCircumscribed ? 'dark:fill-purple-400' : 'dark:fill-amber-400'}
        />
      )}
    </g>
  );
}
