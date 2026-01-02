'use client';

import React, { useMemo } from 'react';
import type {
  CircleFigureProps,
  LabeledPoint,
  RadiusConfig,
  DiameterConfig,
  SectorConfig,
  ArcConfig,
  CentralAngleConfig,
  InscribedAngleConfig,
  ChordConfig,
  PointOnCircleConfig,
  UnifiedArcConfig,
} from '@/lib/types/circle';
import {
  calculateViewBox,
  pointOnCircle,
  describeArc,
  describeSector,
  describeAngleArc,
  describeAngleArcBetweenPoints,
  calculateCenterLabelPosition,
  calculateRadiusLabelPosition,
  calculateDiameterLabelPosition,
  calculateChordLabelPosition,
  calculateAngleLabelPosition,
  calculateCircumferenceLabelPosition,
  calculateInscribedAngleLabelPosition,
  getStrokeDashArray,
  angleAtPoint,
  angleDifference,
} from '@/lib/geometry/circleUtils';

// Default colors following the design system (matching TriangleFigure)
const DEFAULT_COLORS = {
  fill: 'rgba(59, 130, 246, 0.15)', // blue-500 with opacity
  stroke: 'rgb(59, 130, 246)', // blue-500
  sector: 'rgba(168, 85, 247, 0.3)', // purple-500 with opacity
  arc: 'rgb(245, 158, 11)', // amber-500
  chord: 'rgb(16, 185, 129)', // emerald-500
  angleArc: 'rgb(245, 158, 11)', // amber-500
  center: 'rgb(239, 68, 68)', // red-500
  radius: 'rgb(168, 85, 247)', // purple-500
  diameter: 'rgb(168, 85, 247)', // purple-500
  grid: 'rgb(229, 231, 235)', // gray-200
  point: 'rgb(17, 24, 39)', // gray-900
  label: 'rgb(17, 24, 39)', // gray-900
};

// ============================================
// SUB-COMPONENTS
// ============================================

interface GridProps {
  minX: number;
  minY: number;
  width: number;
  height: number;
  gridSize: number;
  gridColor: string;
}

function Grid({ minX, minY, width, height, gridSize, gridColor }: GridProps) {
  const lines = [];

  // Vertical lines
  const startX = Math.ceil(minX / gridSize) * gridSize;
  for (let x = startX; x <= minX + width; x += gridSize) {
    lines.push(
      <line
        key={`v-${x}`}
        x1={x}
        y1={minY}
        x2={x}
        y2={minY + height}
        stroke={gridColor}
        strokeWidth="0.5"
        className="dark:stroke-gray-700"
      />
    );
  }

  // Horizontal lines
  const startY = Math.ceil(minY / gridSize) * gridSize;
  for (let y = startY; y <= minY + height; y += gridSize) {
    lines.push(
      <line
        key={`h-${y}`}
        x1={minX}
        y1={y}
        x2={minX + width}
        y2={y}
        stroke={gridColor}
        strokeWidth="0.5"
        className="dark:stroke-gray-700"
      />
    );
  }

  return <g className="grid">{lines}</g>;
}

interface CenterMarkerProps {
  center: LabeledPoint;
  color: string;
}

function CenterMarker({ center, color }: CenterMarkerProps) {
  const labelPos = calculateCenterLabelPosition(center, 12);

  return (
    <g className="center-marker">
      <circle
        cx={center.x}
        cy={center.y}
        r={4}
        fill={color}
        className="dark:fill-red-400"
      />
      {center.label && (
        <text
          x={labelPos.x}
          y={labelPos.y}
          fontSize="14"
          fontFamily="sans-serif"
          fill={DEFAULT_COLORS.label}
          textAnchor="start"
          dominantBaseline="middle"
          className="dark:fill-white"
        >
          {center.label}
        </text>
      )}
    </g>
  );
}

interface RadiusLineProps {
  center: LabeledPoint;
  radius: number;
  config: RadiusConfig;
}

function RadiusLine({ center, radius, config }: RadiusLineProps) {
  const angle = config.toAngle ?? 0;
  const endPoint = pointOnCircle(center, radius, angle);
  const dashArray = getStrokeDashArray(config.strokeStyle);
  const labelPos = calculateRadiusLabelPosition(center, radius, angle, 12);

  return (
    <g className="radius-line">
      <line
        x1={center.x}
        y1={center.y}
        x2={endPoint.x}
        y2={endPoint.y}
        stroke={config.color || DEFAULT_COLORS.radius}
        strokeWidth="2"
        strokeDasharray={dashArray}
        className="dark:stroke-purple-400"
      />
      {config.label && (
        <text
          x={labelPos.x}
          y={labelPos.y}
          fontSize="12"
          fontFamily="sans-serif"
          fill={DEFAULT_COLORS.label}
          textAnchor="middle"
          dominantBaseline="middle"
          className="dark:fill-white"
        >
          {config.label}
        </text>
      )}
    </g>
  );
}

interface DiameterLineProps {
  center: LabeledPoint;
  radius: number;
  config: DiameterConfig;
}

function DiameterLine({ center, radius, config }: DiameterLineProps) {
  const angle = config.angle ?? 0;
  const startPoint = pointOnCircle(center, radius, angle);
  const endPoint = pointOnCircle(center, radius, angle + 180);
  const dashArray = getStrokeDashArray(config.strokeStyle);
  const labelPos = calculateDiameterLabelPosition(center, angle, 12);

  return (
    <g className="diameter-line">
      <line
        x1={startPoint.x}
        y1={startPoint.y}
        x2={endPoint.x}
        y2={endPoint.y}
        stroke={config.color || DEFAULT_COLORS.diameter}
        strokeWidth="2"
        strokeDasharray={dashArray}
        className="dark:stroke-purple-400"
      />
      {config.endpointLabels && (
        <>
          <text
            x={startPoint.x + 10}
            y={startPoint.y - 10}
            fontSize="12"
            fontFamily="sans-serif"
            fill={DEFAULT_COLORS.label}
            textAnchor="middle"
            dominantBaseline="middle"
            className="dark:fill-white"
          >
            {config.endpointLabels[0]}
          </text>
          <text
            x={endPoint.x - 10}
            y={endPoint.y + 10}
            fontSize="12"
            fontFamily="sans-serif"
            fill={DEFAULT_COLORS.label}
            textAnchor="middle"
            dominantBaseline="middle"
            className="dark:fill-white"
          >
            {config.endpointLabels[1]}
          </text>
        </>
      )}
      {config.label && (
        <text
          x={labelPos.x}
          y={labelPos.y}
          fontSize="12"
          fontFamily="sans-serif"
          fill={DEFAULT_COLORS.label}
          textAnchor="middle"
          dominantBaseline="middle"
          className="dark:fill-white"
        >
          {config.label}
        </text>
      )}
    </g>
  );
}

interface SectorShapeProps {
  center: LabeledPoint;
  radius: number;
  config: SectorConfig;
}

function SectorShape({ center, radius, config }: SectorShapeProps) {
  const path = describeSector(
    center.x,
    center.y,
    radius,
    config.startAngle,
    config.endAngle
  );

  return (
    <g className="sector">
      <path
        d={path}
        fill={config.fill || DEFAULT_COLORS.sector}
        fillOpacity={config.fillOpacity ?? 0.3}
        stroke={config.stroke || 'none'}
        strokeWidth="1"
        className="dark:fill-purple-500/30"
      />
      {config.showRadii && (
        <>
          <line
            x1={center.x}
            y1={center.y}
            x2={pointOnCircle(center, radius, config.startAngle).x}
            y2={pointOnCircle(center, radius, config.startAngle).y}
            stroke={DEFAULT_COLORS.radius}
            strokeWidth="1.5"
            className="dark:stroke-purple-400"
          />
          <line
            x1={center.x}
            y1={center.y}
            x2={pointOnCircle(center, radius, config.endAngle).x}
            y2={pointOnCircle(center, radius, config.endAngle).y}
            stroke={DEFAULT_COLORS.radius}
            strokeWidth="1.5"
            className="dark:stroke-purple-400"
          />
        </>
      )}
    </g>
  );
}

interface ArcPathProps {
  center: LabeledPoint;
  radius: number;
  config: ArcConfig;
}

function ArcPath({ center, radius, config }: ArcPathProps) {
  const path = describeArc(
    center.x,
    center.y,
    radius,
    config.startAngle,
    config.endAngle
  );

  return (
    <path
      d={path}
      fill="none"
      stroke={config.color || DEFAULT_COLORS.arc}
      strokeWidth={config.strokeWidth || 4}
      strokeLinecap="round"
      className="dark:stroke-amber-400"
    />
  );
}

interface CentralAngleArcProps {
  center: LabeledPoint;
  config: CentralAngleConfig;
}

function CentralAngleArc({ center, config }: CentralAngleArcProps) {
  const arcRadius = config.arcRadius || 25;
  const path = describeAngleArc(
    center.x,
    center.y,
    arcRadius,
    config.startAngle,
    config.endAngle
  );
  const labelPos = calculateAngleLabelPosition(
    center,
    arcRadius,
    config.startAngle,
    config.endAngle
  );

  const angleDiff = angleDifference(config.startAngle, config.endAngle);
  const labelText = config.showDegrees
    ? `${Math.round(angleDiff)}°`
    : config.label || '';

  return (
    <g className="central-angle">
      <path
        d={path}
        fill="none"
        stroke={config.color || DEFAULT_COLORS.angleArc}
        strokeWidth="2"
        strokeLinecap="round"
        className="dark:stroke-amber-400"
      />
      {labelText && (
        <text
          x={labelPos.x}
          y={labelPos.y}
          fontSize="12"
          fontFamily="sans-serif"
          fill={DEFAULT_COLORS.label}
          textAnchor="middle"
          dominantBaseline="middle"
          className="dark:fill-white"
        >
          {labelText}
        </text>
      )}
    </g>
  );
}

interface UnifiedArcProps {
  center: LabeledPoint;
  radius: number;
  config: UnifiedArcConfig;
}

/**
 * UnifiedArc - Renders an arc with optional sector, central angle, and radii
 * This is the preferred API that combines sector, arc, and centralAngle in one config
 */
function UnifiedArc({ center, radius, config }: UnifiedArcProps) {
  const {
    startAngle,
    endAngle,
    strokeWidth = 4,
    color = DEFAULT_COLORS.arc,
    showAngle = false,
    showDegrees = false,
    angleLabel,
    angleArcRadius = 25,
    showSector = false,
    sectorFill,
    sectorOpacity = 0.3,
    showRadii = false,
  } = config;

  // Calculate points on the circumference for radii
  const startPoint = pointOnCircle(center, radius, startAngle);
  const endPoint = pointOnCircle(center, radius, endAngle);

  // Arc path on circumference
  const arcPath = describeArc(center.x, center.y, radius, startAngle, endAngle);

  // Sector path (pie slice)
  const sectorPath = showSector
    ? describeSector(center.x, center.y, radius, startAngle, endAngle)
    : null;

  // Central angle arc at center
  const angleArcPath = showAngle
    ? describeAngleArc(center.x, center.y, angleArcRadius, startAngle, endAngle)
    : null;

  // Calculate angle label position
  const labelPos = showAngle
    ? calculateAngleLabelPosition(center, angleArcRadius, startAngle, endAngle)
    : null;

  const angleDiff = angleDifference(startAngle, endAngle);
  const labelText = angleLabel || (showDegrees ? `${Math.round(angleDiff)}°` : '');

  // Determine sector fill color
  const actualSectorFill = sectorFill || color;

  return (
    <g className="unified-arc">
      {/* Sector (behind everything else in this group) */}
      {showSector && sectorPath && (
        <path
          d={sectorPath}
          fill={actualSectorFill}
          fillOpacity={sectorOpacity}
          stroke="none"
          className="dark:opacity-40"
        />
      )}

      {/* Radii lines */}
      {showRadii && (
        <>
          <line
            x1={center.x}
            y1={center.y}
            x2={startPoint.x}
            y2={startPoint.y}
            stroke={color}
            strokeWidth="1.5"
            className="dark:stroke-amber-400"
          />
          <line
            x1={center.x}
            y1={center.y}
            x2={endPoint.x}
            y2={endPoint.y}
            stroke={color}
            strokeWidth="1.5"
            className="dark:stroke-amber-400"
          />
        </>
      )}

      {/* Arc on circumference */}
      <path
        d={arcPath}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className="dark:stroke-amber-400"
      />

      {/* Central angle arc */}
      {showAngle && angleArcPath && (
        <path
          d={angleArcPath}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          className="dark:stroke-amber-400"
        />
      )}

      {/* Angle label */}
      {showAngle && labelPos && labelText && (
        <text
          x={labelPos.x}
          y={labelPos.y}
          fontSize="12"
          fontFamily="sans-serif"
          fill={DEFAULT_COLORS.label}
          textAnchor="middle"
          dominantBaseline="middle"
          className="dark:fill-white"
        >
          {labelText}
        </text>
      )}
    </g>
  );
}

interface InscribedAngleMarkerProps {
  center: LabeledPoint;
  radius: number;
  config: InscribedAngleConfig;
}

function InscribedAngleMarker({
  center,
  radius,
  config,
}: InscribedAngleMarkerProps) {
  // Get vertex position
  const vertex: LabeledPoint =
    typeof config.vertex === 'number'
      ? pointOnCircle(center, radius, config.vertex)
      : config.vertex;

  // Get the two points on the arc that form the inscribed angle
  const arcStartPoint = pointOnCircle(center, radius, config.arcStart);
  const arcEndPoint = pointOnCircle(center, radius, config.arcEnd);

  // Calculate the actual inscribed angle
  const inscribedAngleDegrees = angleAtPoint(vertex, arcStartPoint, arcEndPoint);

  // Draw the angle arc at the vertex
  const arcRadius = config.arcRadius || 20;
  const anglePath = describeAngleArcBetweenPoints(
    vertex,
    arcStartPoint,
    arcEndPoint,
    arcRadius
  );

  const labelPos = calculateInscribedAngleLabelPosition(vertex, center, arcRadius);
  const labelText = config.showDegrees
    ? `${Math.round(inscribedAngleDegrees)}°`
    : config.label || '';

  return (
    <g className="inscribed-angle">
      {/* Lines from vertex to arc endpoints */}
      <line
        x1={vertex.x}
        y1={vertex.y}
        x2={arcStartPoint.x}
        y2={arcStartPoint.y}
        stroke={config.color || DEFAULT_COLORS.angleArc}
        strokeWidth="1.5"
        strokeDasharray="4,3"
        className="dark:stroke-amber-400"
      />
      <line
        x1={vertex.x}
        y1={vertex.y}
        x2={arcEndPoint.x}
        y2={arcEndPoint.y}
        stroke={config.color || DEFAULT_COLORS.angleArc}
        strokeWidth="1.5"
        strokeDasharray="4,3"
        className="dark:stroke-amber-400"
      />
      {/* Angle arc at vertex */}
      <path
        d={anglePath}
        fill="none"
        stroke={config.color || DEFAULT_COLORS.angleArc}
        strokeWidth="2"
        strokeLinecap="round"
        className="dark:stroke-amber-400"
      />
      {/* Vertex point */}
      <circle
        cx={vertex.x}
        cy={vertex.y}
        r={3}
        fill={config.color || DEFAULT_COLORS.angleArc}
        className="dark:fill-amber-400"
      />
      {/* Label */}
      {labelText && (
        <text
          x={labelPos.x}
          y={labelPos.y}
          fontSize="12"
          fontFamily="sans-serif"
          fill={DEFAULT_COLORS.label}
          textAnchor="middle"
          dominantBaseline="middle"
          className="dark:fill-white"
        >
          {labelText}
        </text>
      )}
    </g>
  );
}

interface ChordLineProps {
  center: LabeledPoint;
  radius: number;
  config: ChordConfig;
}

function ChordLine({ center, radius, config }: ChordLineProps) {
  const startPoint = pointOnCircle(center, radius, config.fromAngle);
  const endPoint = pointOnCircle(center, radius, config.toAngle);
  const dashArray = getStrokeDashArray(config.strokeStyle);
  const labelPos = calculateChordLabelPosition(
    center,
    radius,
    config.fromAngle,
    config.toAngle,
    15
  );

  return (
    <g className="chord">
      <line
        x1={startPoint.x}
        y1={startPoint.y}
        x2={endPoint.x}
        y2={endPoint.y}
        stroke={config.color || DEFAULT_COLORS.chord}
        strokeWidth="2"
        strokeDasharray={dashArray}
        className="dark:stroke-emerald-400"
      />
      {config.showEndpoints && (
        <>
          <circle
            cx={startPoint.x}
            cy={startPoint.y}
            r={3}
            fill={config.color || DEFAULT_COLORS.chord}
            className="dark:fill-emerald-400"
          />
          <circle
            cx={endPoint.x}
            cy={endPoint.y}
            r={3}
            fill={config.color || DEFAULT_COLORS.chord}
            className="dark:fill-emerald-400"
          />
        </>
      )}
      {config.label && (
        <text
          x={labelPos.x}
          y={labelPos.y}
          fontSize="12"
          fontFamily="sans-serif"
          fill={DEFAULT_COLORS.label}
          textAnchor="middle"
          dominantBaseline="middle"
          className="dark:fill-white"
        >
          {config.label}
        </text>
      )}
    </g>
  );
}

interface PointMarkerProps {
  center: LabeledPoint;
  radius: number;
  config: PointOnCircleConfig;
}

function PointMarker({ center, radius, config }: PointMarkerProps) {
  const point = pointOnCircle(center, radius, config.angle);
  const labelPos = calculateCircumferenceLabelPosition(
    center,
    radius,
    config.angle,
    15
  );

  return (
    <g className="point-marker">
      <circle
        cx={point.x}
        cy={point.y}
        r={config.radius || 4}
        fill={config.color || DEFAULT_COLORS.point}
        className="dark:fill-white"
      />
      {config.label && (
        <text
          x={labelPos.x}
          y={labelPos.y}
          fontSize="12"
          fontFamily="sans-serif"
          fill={DEFAULT_COLORS.label}
          textAnchor="middle"
          dominantBaseline="middle"
          className="dark:fill-white"
        >
          {config.label}
        </text>
      )}
    </g>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * CircleFigure - A comprehensive circle visualization component
 *
 * Features:
 * - Circunferencia (outline) and círculo (filled) modes
 * - Center point with label
 * - Radius and diameter lines with labels
 * - Unified arcs API: combine arc, sector, and angle in one config (preferred)
 * - Multiple arcs support via `arcs` array
 * - Sectors (pie slices)
 * - Arcs with highlighting
 * - Central and inscribed angles
 * - Chords between points
 * - Points on circumference
 * - Optional grid background
 * - Dark mode support
 */
export function CircleFigure({
  center,
  radius,
  standalone = true,
  mode = 'circulo',
  showCenter = false,
  showRadius = false,
  showDiameter = false,
  arcs,
  sector,
  arc,
  centralAngle,
  inscribedAngle,
  chords,
  points,
  fill = DEFAULT_COLORS.fill,
  fillOpacity,
  stroke = DEFAULT_COLORS.stroke,
  strokeWidth = 2,
  showGrid = false,
  gridSize = 20,
  gridColor = DEFAULT_COLORS.grid,
  width,
  height,
  viewBox: customViewBox,
  padding = 40,
  ariaLabel,
  className = '',
}: CircleFigureProps) {
  // Calculate viewBox
  const calculatedBox = calculateViewBox(center, radius, padding);
  const viewBox =
    customViewBox ||
    `${calculatedBox.minX} ${calculatedBox.minY} ${calculatedBox.width} ${calculatedBox.height}`;

  // Parse viewBox for grid calculations
  const [vbMinX, vbMinY, vbWidth, vbHeight] = viewBox.split(' ').map(Number);

  // Determine fill based on mode
  const circleFill = mode === 'circunferencia' ? 'none' : fill;

  // Normalize radius config
  const radiusConfig: RadiusConfig | null = useMemo(() => {
    if (!showRadius) return null;
    if (showRadius === true) return { toAngle: 0 };
    return showRadius;
  }, [showRadius]);

  // Normalize diameter config
  const diameterConfig: DiameterConfig | null = useMemo(() => {
    if (!showDiameter) return null;
    if (showDiameter === true) return { angle: 0 };
    return showDiameter;
  }, [showDiameter]);

  const content = (
    <>
      {/* Layer 1: Grid background */}
      {showGrid && (
        <Grid
          minX={vbMinX}
          minY={vbMinY}
          width={vbWidth}
          height={vbHeight}
          gridSize={gridSize}
          gridColor={gridColor}
        />
      )}

      {/* Layer 2: Sector (behind main circle) - legacy API */}
      {sector && <SectorShape center={center} radius={radius} config={sector} />}

      {/* Layer 3: Main circle/circumference */}
      <circle
        cx={center.x}
        cy={center.y}
        r={radius}
        fill={circleFill}
        fillOpacity={fillOpacity}
        stroke={stroke}
        strokeWidth={strokeWidth}
        className="dark:stroke-blue-400"
      />

      {/* Layer 4: Chords */}
      {chords?.map((chord, i) => (
        <ChordLine key={i} center={center} radius={radius} config={chord} />
      ))}

      {/* Layer 5: Diameter line */}
      {diameterConfig && (
        <DiameterLine center={center} radius={radius} config={diameterConfig} />
      )}

      {/* Layer 6: Radius line */}
      {radiusConfig && (
        <RadiusLine center={center} radius={radius} config={radiusConfig} />
      )}

      {/* Layer 6.5: Unified arcs (preferred API) */}
      {arcs?.map((arcConfig, i) => (
        <UnifiedArc key={i} center={center} radius={radius} config={arcConfig} />
      ))}

      {/* Layer 7: Arc overlay - legacy API */}
      {arc && <ArcPath center={center} radius={radius} config={arc} />}

      {/* Layer 8: Central angle arc */}
      {centralAngle && <CentralAngleArc center={center} config={centralAngle} />}

      {/* Layer 9: Inscribed angle */}
      {inscribedAngle && (
        <InscribedAngleMarker
          center={center}
          radius={radius}
          config={inscribedAngle}
        />
      )}

      {/* Layer 10: Center marker */}
      {showCenter && <CenterMarker center={center} color={DEFAULT_COLORS.center} />}

      {/* Layer 11: Points on circumference */}
      {points?.map((point, i) => (
        <PointMarker key={i} center={center} radius={radius} config={point} />
      ))}
    </>
  );

  // Standalone mode: wrap in SVG
  if (standalone) {
    return (
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        className={className}
        role="img"
        aria-label={ariaLabel || 'Figura de círculo'}
      >
        <title>{ariaLabel || 'Figura de círculo'}</title>
        {content}
      </svg>
    );
  }

  // Embedded mode: return <g> element for use in CartesianPlane
  return <g className={className}>{content}</g>;
}

export default CircleFigure;
