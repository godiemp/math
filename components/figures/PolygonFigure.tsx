'use client';

import React, { useMemo } from 'react';
import type {
  PolygonFigureProps,
  LabeledPoint,
  PolygonEdgeConfig,
  PolygonAngleConfig,
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

      {/* Angle arcs */}
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
  const n = vertices.length;
  const vertex = vertices[vertexIndex];
  const p1 = vertices[(vertexIndex - 1 + n) % n];
  const p2 = vertices[(vertexIndex + 1) % n];

  // Calculate the angle bisector direction (midpoint of unit vectors to adjacent vertices)
  const dx1 = p1.x - vertex.x;
  const dy1 = p1.y - vertex.y;
  const len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
  const dx2 = p2.x - vertex.x;
  const dy2 = p2.y - vertex.y;
  const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

  // Unit vectors toward each adjacent vertex
  const ux1 = len1 > 0 ? dx1 / len1 : 0;
  const uy1 = len1 > 0 ? dy1 / len1 : 0;
  const ux2 = len2 > 0 ? dx2 / len2 : 0;
  const uy2 = len2 > 0 ? dy2 / len2 : 0;

  // Bisector direction (sum of unit vectors, then normalize)
  const bx = ux1 + ux2;
  const by = uy1 + uy2;
  const bLen = Math.sqrt(bx * bx + by * by);

  // Position label along the bisector, inside the angle
  const arcRadius = config.arcRadius || 25;
  const labelRadius = arcRadius + 10;
  const labelX = bLen > 0 ? vertex.x + (bx / bLen) * labelRadius : vertex.x;
  const labelY = bLen > 0 ? vertex.y + (by / bLen) * labelRadius : vertex.y;

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
