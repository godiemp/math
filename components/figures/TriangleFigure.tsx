'use client';

import React, { useMemo } from 'react';
import type {
  TriangleFigureProps,
  LabeledPoint,
  SideConfig,
  AngleConfig,
  SpecialLineConfig,
  FromAnglesConfigObject,
  FromSidesConfigObject,
} from '@/lib/types/triangle';
import {
  trianglePath,
  calculateViewBox,
  calculateVertexLabelPosition,
  calculateSideLabelPosition,
  describeAngleArc,
  describeRightAngleMarker,
  calculateSpecialLineEndpoints,
  findRightAngleVertex,
  angleAtVertex,
  midpoint,
  getStrokeDashArray,
  buildTriangleFromAngles,
  buildTriangleFromSides,
} from '@/lib/geometry/triangleUtils';

// Default colors following the design system
const DEFAULT_COLORS = {
  fill: 'rgba(59, 130, 246, 0.15)', // blue-500 with opacity
  stroke: 'rgb(59, 130, 246)', // blue-500
  angleArc: 'rgb(245, 158, 11)', // amber-500
  specialLine: 'rgb(168, 85, 247)', // purple-500
  rightAngle: 'rgb(239, 68, 68)', // red-500
  grid: 'rgb(229, 231, 235)', // gray-200
  vertex: 'rgb(17, 24, 39)', // gray-900
  label: 'rgb(17, 24, 39)', // gray-900
};

/**
 * TriangleFigure - A comprehensive triangle visualization component
 *
 * Features:
 * - Configurable vertices with labels
 * - Side labels and measurements
 * - Interior/exterior angle arcs with labels
 * - Special lines: altura, mediana, bisectriz, mediatriz
 * - Right angle markers
 * - Optional grid background
 * - Dark mode support
 */
export function TriangleFigure({
  vertices: verticesProp,
  fromAngles,
  fromSides,
  sides,
  angles,
  specialLines,
  showRightAngleMarker,
  rightAngleVertex,
  rightAngleSize = 12,
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
  asSvgGroup = false,
  transform,
}: TriangleFigureProps) {
  // Calculate vertices from fromAngles, fromSides, or use provided vertices
  const vertices = useMemo<[LabeledPoint, LabeledPoint, LabeledPoint]>(() => {
    // Option 1: Build from angles
    if (fromAngles) {
      if (Array.isArray(fromAngles) && typeof fromAngles[0] === 'number') {
        const anglesArray = fromAngles as [number, number, number];
        return buildTriangleFromAngles(anglesArray, 150, 200, 150, 0);
      }
      const config = fromAngles as FromAnglesConfigObject;
      return buildTriangleFromAngles(
        config.angles,
        config.size ?? 150,
        200,
        150,
        config.rotation ?? 0
      );
    }
    // Option 2: Build from side lengths
    if (fromSides) {
      if (Array.isArray(fromSides) && typeof fromSides[0] === 'number') {
        const sidesArray = fromSides as [number, number, number];
        return buildTriangleFromSides(sidesArray, 150, 200, 150, 0);
      }
      const config = fromSides as FromSidesConfigObject;
      return buildTriangleFromSides(
        config.sides,
        config.size ?? 150,
        200,
        150,
        config.rotation ?? 0
      );
    }
    // Option 3: Use provided vertices
    if (verticesProp) {
      return verticesProp;
    }
    // Fallback to default equilateral triangle
    return [
      { x: 200, y: 50, label: 'A' },
      { x: 100, y: 223, label: 'B' },
      { x: 300, y: 223, label: 'C' },
    ];
  }, [fromAngles, fromSides, verticesProp]);

  // Calculate viewBox from vertices if not provided
  const calculatedBox = calculateViewBox(vertices, padding);
  const viewBox =
    customViewBox ||
    `${calculatedBox.minX} ${calculatedBox.minY} ${calculatedBox.width} ${calculatedBox.height}`;

  // Auto-detect right angle vertex if not specified
  const detectedRightAngle =
    showRightAngleMarker && rightAngleVertex === undefined
      ? findRightAngleVertex(vertices)
      : rightAngleVertex;

  // Parse viewBox for grid calculations
  const [vbMinX, vbMinY, vbWidth, vbHeight] = viewBox.split(' ').map(Number);

  // Inner content shared between svg and g modes
  const triangleContent = (
    <>
      {/* Grid background (only when not asSvgGroup) */}
      {showGrid && !asSvgGroup && (
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

      {/* Special lines (rendered before triangle so they appear behind) */}
      {specialLines?.map((config, i) => (
        <SpecialLine key={`special-${i}`} vertices={vertices} config={config} />
      ))}

      {/* Main triangle */}
      <path
        d={trianglePath(vertices)}
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
            vertexIndex={i as 0 | 1 | 2}
            config={angleConfig}
          />
        );
      })}

      {/* Right angle marker */}
      {showRightAngleMarker && detectedRightAngle !== null && detectedRightAngle !== undefined && (
        <RightAngleMarker
          vertices={vertices}
          vertexIndex={detectedRightAngle as 0 | 1 | 2}
          size={rightAngleSize}
        />
      )}

      {/* Side labels */}
      {sides?.map((sideConfig, i) => {
        if (!sideConfig) return null;
        return (
          <SideLabel
            key={`side-${i}`}
            vertices={vertices}
            sideIndex={i as 0 | 1 | 2}
            config={sideConfig}
          />
        );
      })}

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
            vertexIndex={i as 0 | 1 | 2}
            config={angleConfig}
          />
        );
      })}
    </>
  );

  // Render as SVG group for embedding in larger SVGs
  if (asSvgGroup) {
    return (
      <g transform={transform} className={className}>
        {triangleContent}
      </g>
    );
  }

  // Render as standalone SVG
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      className={`${className}`}
      role="img"
      aria-label={ariaLabel || 'Triangle figure'}
    >
      <title>{ariaLabel || 'Triangle figure'}</title>
      {triangleContent}
    </svg>
  );
}

// Sub-components

interface VertexLabelProps {
  vertex: LabeledPoint;
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint];
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

interface SideLabelProps {
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint];
  sideIndex: 0 | 1 | 2;
  config: SideConfig;
}

function SideLabel({ vertices, sideIndex, config }: SideLabelProps) {
  const p1 = vertices[sideIndex];
  const p2 = vertices[(sideIndex + 1) % 3];
  const pos = calculateSideLabelPosition(p1, p2, vertices, 15);

  // Build label text: prefix + value, or just label/measurement
  let labelText: string | undefined;
  if (config.labelPrefix && config.measurement) {
    // Trigonometry format: "Op: 3" or "Ady: 5.2"
    labelText = `${config.labelPrefix} ${config.measurement}`;
  } else if (config.showMeasurement && config.measurement) {
    labelText = config.measurement;
  } else {
    labelText = config.label;
  }

  if (!labelText) return null;

  // Use labelColor if specified, otherwise fall back to color or default
  const textColor = config.labelColor || config.color || DEFAULT_COLORS.stroke;

  return (
    <text
      x={pos.x}
      y={pos.y}
      fill={textColor}
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
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint];
  vertexIndex: 0 | 1 | 2;
  config: AngleConfig;
}

function AngleArc({ vertices, vertexIndex, config }: AngleArcProps) {
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

function AngleLabel({ vertices, vertexIndex, config }: AngleLabelProps) {
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

interface RightAngleMarkerProps {
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint];
  vertexIndex: 0 | 1 | 2;
  size: number;
}

function RightAngleMarker({ vertices, vertexIndex, size }: RightAngleMarkerProps) {
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

interface SpecialLineProps {
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint];
  config: SpecialLineConfig;
}

function SpecialLine({ vertices, config }: SpecialLineProps) {
  const { start, end } = calculateSpecialLineEndpoints(vertices, config);
  const dashArray = getStrokeDashArray(config.strokeStyle || 'dashed');

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
      {/* Right angle marker at intersection for altura */}
      {config.showRightAngleMarker && config.type === 'altura' && (
        <RightAngleMarkerAtPoint
          point={end}
          direction1={start}
          direction2={vertices[(config.fromVertex + 2) % 3]}
          size={8}
        />
      )}
      {/* Label for the special line */}
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

interface RightAngleMarkerAtPointProps {
  point: LabeledPoint;
  direction1: LabeledPoint;
  direction2: LabeledPoint;
  size: number;
}

function RightAngleMarkerAtPoint({
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

export default TriangleFigure;
