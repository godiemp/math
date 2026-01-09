'use client';

import React, { useMemo } from 'react';
import type {
  PolygonFigureProps,
  LabeledPoint,
  PolygonEdgeConfig,
  PolygonAngleConfig,
  ExteriorAngleConfig,
  DiagonalConfig,
  ApothemConfig,
} from '@/lib/types/polygon';
import {
  polygonPath,
  calculateViewBox,
  calculateVertexLabelPosition,
  calculateEdgeLabelPosition,
  calculateDiagonalLabelPosition,
  describeAngleArc,
  getStrokeDashArray,
  buildRegularPolygon,
  polygonCentroid,
  calculateApothemLine,
  angleAtVertex,
  calculateAllDiagonals,
  getPolygonName,
} from '@/lib/geometry/polygonUtils';

// Default colors following the design system
const DEFAULT_COLORS = {
  fill: 'rgba(59, 130, 246, 0.15)', // blue-500 with opacity
  stroke: 'rgb(59, 130, 246)', // blue-500
  angleArc: 'rgb(245, 158, 11)', // amber-500
  exteriorAngle: 'rgb(239, 68, 68)', // red-500
  extension: 'rgb(156, 163, 175)', // gray-400
  diagonal: 'rgb(168, 85, 247)', // purple-500
  apothem: 'rgb(16, 185, 129)', // emerald-500
  grid: 'rgb(229, 231, 235)', // gray-200
  vertex: 'rgb(17, 24, 39)', // gray-900
  label: 'rgb(17, 24, 39)', // gray-900
  center: 'rgb(239, 68, 68)', // red-500
};

/**
 * PolygonFigure - A comprehensive polygon visualization component
 *
 * Features:
 * - Support for regular polygons (5-12 sides)
 * - Configurable vertices with labels
 * - Edge labels and measurements
 * - Interior angle arcs with labels
 * - Exterior angle arcs with extension lines
 * - Diagonals (all or specific)
 * - Apothem line for regular polygons
 * - Center point display
 * - Optional grid background
 * - Dark mode support
 */
export function PolygonFigure({
  vertices: verticesProp,
  fromRegular,
  edges,
  angles,
  exteriorAngles,
  diagonals,
  showApothem,
  showCenter = false,
  centerLabel = 'O',
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
  showVertices = true,
  vertexRadius = 4,
  ariaLabel,
  className = '',
}: PolygonFigureProps) {
  // Calculate vertices from fromRegular or use provided vertices
  const vertices = useMemo<LabeledPoint[]>(() => {
    // Option 1: Build from regular polygon config
    if (fromRegular) {
      return buildRegularPolygon(
        fromRegular.sides,
        fromRegular.radius,
        fromRegular.centerX ?? 200,
        fromRegular.centerY ?? 150,
        fromRegular.rotation ?? -90
      );
    }

    // Option 2: Use provided vertices
    if (verticesProp && verticesProp.length >= 5) {
      return verticesProp;
    }

    // Fallback to default hexagon
    return buildRegularPolygon(6, 80, 200, 150, -90);
  }, [fromRegular, verticesProp]);

  const n = vertices.length;
  const polygonName = getPolygonName(n);

  // Calculate center
  const center = useMemo(() => polygonCentroid(vertices), [vertices]);

  // Calculate viewBox from vertices if not provided
  const calculatedBox = calculateViewBox(vertices, padding);
  const viewBox =
    customViewBox ||
    `${calculatedBox.minX} ${calculatedBox.minY} ${calculatedBox.width} ${calculatedBox.height}`;

  // Parse viewBox for grid calculations
  const [vbMinX, vbMinY, vbWidth, vbHeight] = viewBox.split(' ').map(Number);

  // Calculate diagonals to render
  const diagonalsToRender = useMemo<DiagonalConfig[]>(() => {
    if (!diagonals) return [];

    if (diagonals === 'all') {
      return calculateAllDiagonals(n).map(([from, to]) => ({ from, to }));
    }

    return diagonals;
  }, [diagonals, n]);

  // Normalize apothem config
  const apothemConfig: ApothemConfig | null = useMemo(() => {
    if (!showApothem) return null;
    if (showApothem === true) return { toEdge: 0 };
    return showApothem;
  }, [showApothem]);

  // Normalize exterior angles config
  const exteriorAnglesToRender = useMemo<ExteriorAngleConfig[]>(() => {
    if (!exteriorAngles) return [];

    if (exteriorAngles === 'all') {
      // Show all exterior angles with default config
      return Array.from({ length: n }, () => ({
        showArc: true,
        showExtension: true,
        showFill: true,
        fillOpacity: 0.15,
      }));
    }

    return exteriorAngles;
  }, [exteriorAngles, n]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      className={className}
      role="img"
      aria-label={ariaLabel || `${polygonName} figure`}
    >
      <title>{ariaLabel || `${polygonName} figure`}</title>

      {/* Grid background */}
      {showGrid && (
        <g className="grid">
          {/* Vertical lines */}
          {Array.from({
            length: Math.ceil(vbWidth / gridSize) + 1,
          }).map((_, i) => {
            const x = Math.floor(vbMinX / gridSize) * gridSize + i * gridSize;
            return (
              <line
                key={`v-${i}`}
                x1={x}
                y1={vbMinY}
                x2={x}
                y2={vbMinY + vbHeight}
                stroke={gridColor}
                strokeWidth="0.5"
                className="dark:stroke-gray-700"
              />
            );
          })}
          {/* Horizontal lines */}
          {Array.from({
            length: Math.ceil(vbHeight / gridSize) + 1,
          }).map((_, i) => {
            const y = Math.floor(vbMinY / gridSize) * gridSize + i * gridSize;
            return (
              <line
                key={`h-${i}`}
                x1={vbMinX}
                y1={y}
                x2={vbMinX + vbWidth}
                y2={y}
                stroke={gridColor}
                strokeWidth="0.5"
                className="dark:stroke-gray-700"
              />
            );
          })}
        </g>
      )}

      {/* Diagonals (rendered before polygon so they appear behind) */}
      {diagonalsToRender.map((config, i) => (
        <DiagonalLine
          key={`diagonal-${i}`}
          vertices={vertices}
          config={config}
        />
      ))}

      {/* Apothem line */}
      {apothemConfig && (
        <ApothemLine vertices={vertices} config={apothemConfig} />
      )}

      {/* Main polygon */}
      <path
        d={polygonPath(vertices)}
        fill={fill}
        fillOpacity={fillOpacity}
        stroke={stroke}
        strokeWidth={strokeWidth}
        className="dark:stroke-blue-400"
      />

      {/* Interior angle arcs */}
      {angles?.map((angleConfig, i) => {
        if (!angleConfig?.showArc) return null;
        return (
          <AngleArc
            key={`angle-${i}`}
            vertices={vertices}
            vertexIndex={i}
            config={angleConfig}
          />
        );
      })}

      {/* Exterior angle arcs */}
      {exteriorAnglesToRender.map((config, i) => {
        if (!config) return null;
        return (
          <ExteriorAngleArc
            key={`ext-angle-${i}`}
            vertices={vertices}
            vertexIndex={i}
            config={config}
          />
        );
      })}

      {/* Edge labels */}
      {edges?.map((edgeConfig, i) => {
        if (!edgeConfig) return null;
        return (
          <EdgeLabel
            key={`edge-${i}`}
            vertices={vertices}
            edgeIndex={i}
            config={edgeConfig}
          />
        );
      })}

      {/* Center point */}
      {showCenter && (
        <CenterMarker center={center} label={centerLabel} />
      )}

      {/* Vertex points and labels */}
      {vertices.map((vertex, i) => (
        <g key={`vertex-${i}`}>
          {showVertices && (
            <circle
              cx={vertex.x}
              cy={vertex.y}
              r={vertexRadius}
              fill={DEFAULT_COLORS.vertex}
              className="dark:fill-white"
            />
          )}
          {vertex.label && (
            <VertexLabel vertex={vertex} vertices={vertices} />
          )}
        </g>
      ))}

      {/* Angle labels */}
      {angles?.map((angleConfig, i) => {
        if (!angleConfig?.label && !angleConfig?.showDegrees) return null;
        return (
          <AngleLabel
            key={`angle-label-${i}`}
            vertices={vertices}
            vertexIndex={i}
            config={angleConfig}
          />
        );
      })}
    </svg>
  );
}

// Sub-components

interface VertexLabelProps {
  vertex: LabeledPoint;
  vertices: LabeledPoint[];
}

function VertexLabel({ vertex, vertices }: VertexLabelProps) {
  const pos = calculateVertexLabelPosition(vertex, vertices, 18);

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

interface EdgeLabelProps {
  vertices: LabeledPoint[];
  edgeIndex: number;
  config: PolygonEdgeConfig;
}

function EdgeLabel({ vertices, edgeIndex, config }: EdgeLabelProps) {
  const n = vertices.length;
  const p1 = vertices[edgeIndex];
  const p2 = vertices[(edgeIndex + 1) % n];
  const pos = calculateEdgeLabelPosition(p1, p2, vertices, 15);
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

interface AngleArcProps {
  vertices: LabeledPoint[];
  vertexIndex: number;
  config: PolygonAngleConfig;
}

function AngleArc({ vertices, vertexIndex, config }: AngleArcProps) {
  const n = vertices.length;
  const vertex = vertices[vertexIndex];
  const p1 = vertices[(vertexIndex - 1 + n) % n]; // Previous vertex
  const p2 = vertices[(vertexIndex + 1) % n]; // Next vertex
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
  vertices: LabeledPoint[];
  vertexIndex: number;
  config: PolygonAngleConfig;
}

function AngleLabel({ vertices, vertexIndex, config }: AngleLabelProps) {
  const vertex = vertices[vertexIndex];
  const center = polygonCentroid(vertices);

  // Direction from vertex toward centroid (always points into polygon interior)
  const dx = center.x - vertex.x;
  const dy = center.y - vertex.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Position label toward the center, slightly beyond the arc
  const arcRadius = config.arcRadius || 25;
  const labelRadius = arcRadius + 12;
  const labelX = dist > 0 ? vertex.x + (dx / dist) * labelRadius : vertex.x;
  const labelY = dist > 0 ? vertex.y + (dy / dist) * labelRadius : vertex.y;

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

interface ExteriorAngleArcProps {
  vertices: LabeledPoint[];
  vertexIndex: number;
  config: ExteriorAngleConfig;
}

function ExteriorAngleArc({ vertices, vertexIndex, config }: ExteriorAngleArcProps) {
  const n = vertices.length;
  const vertex = vertices[vertexIndex];
  const prev = vertices[(vertexIndex - 1 + n) % n];
  const next = vertices[(vertexIndex + 1) % n];

  // Direction from prev to current vertex (this is the incoming edge direction)
  const dx1 = vertex.x - prev.x;
  const dy1 = vertex.y - prev.y;
  const len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

  // Normalized direction
  const normX1 = dx1 / len1;
  const normY1 = dy1 / len1;

  // Extension point (beyond the vertex in the same direction)
  const extLength = config.extensionLength ?? 30;
  const extX = vertex.x + normX1 * extLength;
  const extY = vertex.y + normY1 * extLength;

  // Direction to next vertex
  const dx2 = next.x - vertex.x;
  const dy2 = next.y - vertex.y;
  const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
  const normX2 = dx2 / len2;
  const normY2 = dy2 / len2;

  // Arc configuration
  const arcRadius = config.arcRadius ?? 20;
  const showExtension = config.showExtension !== false;
  const showArc = config.showArc !== false;
  const showFill = config.showFill ?? false;

  // Calculate arc endpoints
  // Arc start: on the extension line
  const arcStartX = vertex.x + normX1 * arcRadius;
  const arcStartY = vertex.y + normY1 * arcRadius;
  // Arc end: on the next edge line
  const arcEndX = vertex.x + normX2 * arcRadius;
  const arcEndY = vertex.y + normY2 * arcRadius;

  // Calculate angle for arc sweep direction
  const angle1 = Math.atan2(normY1, normX1);
  const angle2 = Math.atan2(normY2, normX2);

  // Determine sweep direction (exterior angle is the smaller one between extension and next edge)
  let angleDiff = angle2 - angle1;
  if (angleDiff < 0) angleDiff += 2 * Math.PI;

  // For exterior angles, we want the arc on the outside (smaller angle)
  const largeArcFlag = angleDiff > Math.PI ? 1 : 0;
  const sweepFlag = 1;

  // Arc path
  const arcPath = `M ${arcStartX} ${arcStartY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} ${sweepFlag} ${arcEndX} ${arcEndY}`;

  // Fill path (pie slice)
  const fillPath = `M ${vertex.x} ${vertex.y} L ${arcStartX} ${arcStartY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} ${sweepFlag} ${arcEndX} ${arcEndY} Z`;

  // Calculate exterior angle in degrees for label
  const interiorAngle = angleAtVertex(vertices, vertexIndex);
  const exteriorAngle = 180 - interiorAngle;

  // Label position (midpoint of arc, slightly outward)
  const midAngle = (angle1 + angle2) / 2;
  // Adjust for the exterior side
  let labelAngle = midAngle;
  if (angleDiff <= Math.PI) {
    labelAngle = midAngle;
  } else {
    labelAngle = midAngle + Math.PI;
  }
  const labelRadius = arcRadius + 12;
  const labelX = vertex.x + Math.cos(labelAngle) * labelRadius;
  const labelY = vertex.y + Math.sin(labelAngle) * labelRadius;

  const color = config.color || DEFAULT_COLORS.exteriorAngle;
  const extensionColor = config.extensionColor || DEFAULT_COLORS.extension;

  // Determine label text
  let labelText = config.label;
  if (config.showDegrees && !labelText) {
    labelText = `${Math.round(exteriorAngle)}°`;
  }

  return (
    <g>
      {/* Extension line (dashed) */}
      {showExtension && (
        <line
          x1={vertex.x}
          y1={vertex.y}
          x2={extX}
          y2={extY}
          stroke={extensionColor}
          strokeWidth="1.5"
          strokeDasharray="4,3"
          className="dark:stroke-gray-500"
        />
      )}

      {/* Angle fill */}
      {showFill && (
        <path
          d={fillPath}
          fill={color}
          fillOpacity={config.fillOpacity ?? 0.15}
          className="dark:fill-red-500/20"
        />
      )}

      {/* Angle arc */}
      {showArc && (
        <path
          d={arcPath}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          className="dark:stroke-red-400"
        />
      )}

      {/* Label */}
      {labelText && (
        <text
          x={labelX}
          y={labelY}
          fill={color}
          fontSize="11"
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
          className="dark:fill-red-400"
        >
          {labelText}
        </text>
      )}
    </g>
  );
}

interface DiagonalLineProps {
  vertices: LabeledPoint[];
  config: DiagonalConfig;
}

function DiagonalLine({ vertices, config }: DiagonalLineProps) {
  const p1 = vertices[config.from];
  const p2 = vertices[config.to];

  if (!p1 || !p2) return null;

  const dashArray = getStrokeDashArray(config.strokeStyle);
  const labelPos = config.label
    ? calculateDiagonalLabelPosition(p1, p2, 10)
    : null;

  return (
    <g>
      <line
        x1={p1.x}
        y1={p1.y}
        x2={p2.x}
        y2={p2.y}
        stroke={config.color || DEFAULT_COLORS.diagonal}
        strokeWidth="1.5"
        strokeDasharray={dashArray}
        className="dark:stroke-purple-400"
      />
      {labelPos && config.label && (
        <text
          x={labelPos.x}
          y={labelPos.y}
          fill={config.color || DEFAULT_COLORS.diagonal}
          fontSize="11"
          fontWeight="500"
          textAnchor="middle"
          dominantBaseline="middle"
          className="dark:fill-purple-400"
        >
          {config.label}
        </text>
      )}
    </g>
  );
}

interface ApothemLineProps {
  vertices: LabeledPoint[];
  config: ApothemConfig;
}

function ApothemLine({ vertices, config }: ApothemLineProps) {
  const { start, end } = calculateApothemLine(vertices, config.toEdge ?? 0);
  const dashArray = getStrokeDashArray(config.strokeStyle || 'dashed');

  // Calculate label position (midpoint)
  const labelX = (start.x + end.x) / 2;
  const labelY = (start.y + end.y) / 2;

  // Perpendicular offset for label
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const perpX = len > 0 ? (-dy / len) * 10 : 0;
  const perpY = len > 0 ? (dx / len) * 10 : 0;

  return (
    <g>
      <line
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke={config.color || DEFAULT_COLORS.apothem}
        strokeWidth="1.5"
        strokeDasharray={dashArray}
        className="dark:stroke-emerald-400"
      />
      {config.label && (
        <text
          x={labelX + perpX}
          y={labelY + perpY}
          fill={config.color || DEFAULT_COLORS.apothem}
          fontSize="11"
          fontStyle="italic"
          textAnchor="middle"
          dominantBaseline="middle"
          className="dark:fill-emerald-400"
        >
          {config.label}
        </text>
      )}
    </g>
  );
}

interface CenterMarkerProps {
  center: LabeledPoint;
  label?: string;
}

function CenterMarker({ center, label }: CenterMarkerProps) {
  return (
    <g>
      <circle
        cx={center.x}
        cy={center.y}
        r={4}
        fill={DEFAULT_COLORS.center}
        className="dark:fill-red-400"
      />
      {label && (
        <text
          x={center.x}
          y={center.y - 12}
          fill={DEFAULT_COLORS.center}
          fontSize="13"
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
          className="dark:fill-red-400"
        >
          {label}
        </text>
      )}
    </g>
  );
}

export default PolygonFigure;
