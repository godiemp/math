'use client';

import React, { useMemo } from 'react';
import type {
  QuadrilateralFigureProps,
  LabeledPoint,
  QuadSideConfig,
  QuadAngleConfig,
  DiagonalConfig,
  DiagonalOptions,
  QuadSpecialLineConfig,
  FromSquareConfig,
  FromRectangleConfig,
} from '@/lib/types/quadrilateral';
import {
  quadrilateralPath,
  calculateViewBox,
  calculateVertexLabelPosition,
  calculateSideLabelPosition,
  calculateDiagonalLabelPosition,
  describeAngleArc,
  describeRightAngleMarker,
  describeParallelMarks,
  describeEqualMarks,
  calculateSpecialLineEndpoints,
  detectRightAngles,
  detectParallelSides,
  detectEqualSides,
  analyzeQuadrilateral,
  angleAtVertex,
  midpoint,
  distance,
  getStrokeDashArray,
  buildSquare,
  buildRectangle,
  buildQuadrilateralFromType,
  diagonalPath,
  isSelfIntersecting,
  diagonalIntersection,
  diagonalsBisectEachOther,
  diagonalsAreEqual,
  diagonalsArePerpendicular,
} from '@/lib/geometry/quadrilateralUtils';

// Default colors following the design system
const DEFAULT_COLORS = {
  fill: 'rgba(59, 130, 246, 0.15)', // blue-500 with opacity
  stroke: 'rgb(59, 130, 246)', // blue-500
  angleArc: 'rgb(245, 158, 11)', // amber-500
  diagonal: 'rgb(168, 85, 247)', // purple-500
  specialLine: 'rgb(168, 85, 247)', // purple-500
  rightAngle: 'rgb(239, 68, 68)', // red-500
  parallelMark: 'rgb(16, 185, 129)', // emerald-500
  equalMark: 'rgb(168, 85, 247)', // purple-500
  grid: 'rgb(229, 231, 235)', // gray-200
  vertex: 'rgb(17, 24, 39)', // gray-900
  label: 'rgb(17, 24, 39)', // gray-900
  selfIntersecting: 'rgb(239, 68, 68)', // red-500
  selfIntersectingFill: 'rgba(239, 68, 68, 0.15)', // red-500 with opacity
};

type QuadVertices = [LabeledPoint, LabeledPoint, LabeledPoint, LabeledPoint];

/**
 * QuadrilateralFigure - A comprehensive quadrilateral visualization component
 *
 * Features:
 * - 9 quadrilateral types: cuadrado, rectangulo, rombo, paralelogramo, trapecio, etc.
 * - Configurable vertices with labels
 * - Side labels and measurements
 * - Parallel and equal side markers
 * - Angle arcs and right angle markers
 * - Diagonal visualization with intersection point
 * - Special lines: altura, mediatriz, mediana
 * - Optional grid background
 * - Dark mode support
 * - Support for concave and self-intersecting quadrilaterals
 */
export function QuadrilateralFigure({
  vertices: verticesProp,
  fromType,
  fromSquare,
  fromRectangle,
  sides,
  angles,
  diagonals,
  showDiagonals,
  diagonalOptions,
  specialLines,
  autoParallelMarks = false,
  autoEqualMarks = false,
  autoRightAngleMarkers = false,
  autoDiagonalBisectionMarks = false,
  autoDiagonalEqualMarks = false,
  autoDiagonalRightAngle = false,
  autoAngleArcs = false,
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
  standalone = true,
}: QuadrilateralFigureProps) {
  // Calculate vertices from construction method
  const vertices = useMemo<QuadVertices>(() => {
    // Option 1: Build from square
    if (fromSquare !== undefined) {
      if (typeof fromSquare === 'number') {
        return buildSquare(fromSquare, 200, 150, 0);
      }
      const config = fromSquare as FromSquareConfig;
      return buildSquare(
        config.sideLength,
        config.centerX ?? 200,
        config.centerY ?? 150,
        config.rotation ?? 0
      );
    }

    // Option 2: Build from rectangle
    if (fromRectangle) {
      const config = fromRectangle as FromRectangleConfig;
      return buildRectangle(
        config.width,
        config.height,
        config.centerX ?? 200,
        config.centerY ?? 150,
        config.rotation ?? 0
      );
    }

    // Option 3: Build from type
    if (fromType) {
      return buildQuadrilateralFromType(fromType);
    }

    // Option 4: Use provided vertices
    if (verticesProp) {
      return verticesProp;
    }

    // Fallback to default square
    return buildSquare(100, 200, 150, 0);
  }, [fromSquare, fromRectangle, fromType, verticesProp]);

  // Analyze quadrilateral properties
  const properties = useMemo(() => analyzeQuadrilateral(vertices), [vertices]);

  // Calculate viewBox from vertices if not provided
  const calculatedBox = calculateViewBox(vertices, padding);
  const viewBox =
    customViewBox ||
    `${calculatedBox.minX} ${calculatedBox.minY} ${calculatedBox.width} ${calculatedBox.height}`;

  // Parse viewBox for grid calculations
  const [vbMinX, vbMinY, vbWidth, vbHeight] = viewBox.split(' ').map(Number);

  // Auto-detect features
  const parallelPairs = autoParallelMarks ? detectParallelSides(vertices) : [];
  const equalGroups = autoEqualMarks ? detectEqualSides(vertices) : [];
  const rightAngles = autoRightAngleMarkers ? detectRightAngles(vertices) : [];

  // Diagonal detection
  const diagonalIntersect = useMemo(() => diagonalIntersection(vertices), [vertices]);
  const diagonalsBisect = useMemo(() => diagonalsBisectEachOther(vertices), [vertices]);
  const diagonalsEqual = useMemo(() => diagonalsAreEqual(vertices), [vertices]);
  const diagonalsPerpendicular = useMemo(
    () => diagonalsArePerpendicular(vertices),
    [vertices]
  );

  // Determine if we should show diagonal marks
  const showBisectionMarks = autoDiagonalBisectionMarks && diagonalsBisect;
  const showDiagonalEqualMarks = autoDiagonalEqualMarks && diagonalsEqual;
  const showDiagonalRightAngle = autoDiagonalRightAngle && diagonalsPerpendicular;

  // Effective angles (auto-generate when autoAngleArcs is enabled)
  const effectiveAngles = useMemo<
    [QuadAngleConfig?, QuadAngleConfig?, QuadAngleConfig?, QuadAngleConfig?] | undefined
  >(() => {
    if (autoAngleArcs) {
      return [
        { showArc: true, showDegrees: true },
        { showArc: true, showDegrees: true },
        { showArc: true, showDegrees: true },
        { showArc: true, showDegrees: true },
      ];
    }
    return angles;
  }, [autoAngleArcs, angles]);

  // Check for self-intersecting quadrilateral
  const isSelfIntersect = isSelfIntersecting(vertices);

  // Determine styling
  const actualFill = isSelfIntersect ? DEFAULT_COLORS.selfIntersectingFill : fill;
  const actualStroke = isSelfIntersect ? DEFAULT_COLORS.selfIntersecting : stroke;

  // Build diagonals array
  const diagonalConfigs = useMemo<DiagonalConfig[]>(() => {
    if (diagonals) return diagonals;
    if (showDiagonals) {
      return [
        { from: 0, to: 2 } as DiagonalConfig,
        { from: 1, to: 3 } as DiagonalConfig,
      ];
    }
    return [];
  }, [diagonals, showDiagonals]);

  // Render content
  const content = (
    <>
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

      {/* Special lines (rendered before quadrilateral so they appear behind) */}
      {specialLines?.map((config, i) => (
        <SpecialLine key={`special-${i}`} vertices={vertices} config={config} />
      ))}

      {/* Main quadrilateral */}
      <path
        d={quadrilateralPath(vertices)}
        fill={actualFill}
        fillOpacity={fillOpacity}
        stroke={actualStroke}
        strokeWidth={strokeWidth}
        strokeDasharray={isSelfIntersect ? '6,4' : undefined}
        className={isSelfIntersect ? 'dark:stroke-red-400' : 'dark:stroke-blue-400'}
      />

      {/* Diagonals */}
      {diagonalConfigs.map((config, i) => (
        <DiagonalLine key={`diagonal-${i}`} vertices={vertices} config={config} />
      ))}

      {/* Diagonal intersection point */}
      {diagonalIntersect &&
        diagonalConfigs.length >= 2 &&
        (diagonalOptions?.showIntersection ||
          showBisectionMarks ||
          showDiagonalEqualMarks ||
          showDiagonalRightAngle) && (
          <DiagonalIntersectionPoint
            intersection={diagonalIntersect}
            label={diagonalOptions?.intersectionLabel}
            color={diagonalOptions?.equalLengthMarkColor}
          />
        )}

      {/* Right angle marker at diagonal intersection (when diagonals are perpendicular) */}
      {diagonalIntersect && showDiagonalRightAngle && diagonalConfigs.length >= 2 && (
        <DiagonalRightAngleMarker intersection={diagonalIntersect} vertices={vertices} />
      )}

      {/* Diagonal bisection marks (when diagonals bisect each other) */}
      {diagonalIntersect && showBisectionMarks && (
        <>
          <DiagonalBisectionMarks
            vertices={vertices}
            intersection={diagonalIntersect}
            diagonalIndex={0}
            count={1}
          />
          <DiagonalBisectionMarks
            vertices={vertices}
            intersection={diagonalIntersect}
            diagonalIndex={1}
            count={2}
          />
        </>
      )}

      {/* Diagonal equal length marks */}
      {showDiagonalEqualMarks && diagonalConfigs.length >= 2 && (
        <DiagonalEqualLengthMarks
          vertices={vertices}
          count={diagonalOptions?.equalLengthMarkCount || 1}
          color={diagonalOptions?.equalLengthMarkColor}
        />
      )}

      {/* Manual diagonal bisection marks from individual diagonal configs */}
      {diagonalIntersect &&
        diagonalConfigs.map((config, i) => {
          if (!config.showBisectionMarks) return null;
          return (
            <DiagonalBisectionMarks
              key={`bisection-${i}`}
              vertices={vertices}
              intersection={diagonalIntersect}
              diagonalIndex={
                config.from === 0 && config.to === 2
                  ? 0
                  : config.from === 1 && config.to === 3
                    ? 1
                    : (i as 0 | 1)
              }
              count={config.bisectionMarkCount || 1}
              color={config.color}
            />
          );
        })}

      {/* Auto-detected parallel marks */}
      {parallelPairs.map(([side1, side2], pairIndex) => (
        <React.Fragment key={`parallel-pair-${pairIndex}`}>
          <ParallelMarks
            vertices={vertices}
            sideIndex={side1 as 0 | 1 | 2 | 3}
            count={(pairIndex + 1) as 1 | 2}
          />
          <ParallelMarks
            vertices={vertices}
            sideIndex={side2 as 0 | 1 | 2 | 3}
            count={(pairIndex + 1) as 1 | 2}
          />
        </React.Fragment>
      ))}

      {/* Manual parallel marks from sides config */}
      {sides?.map((sideConfig, i) => {
        if (!sideConfig?.parallelMarks) return null;
        return (
          <ParallelMarks
            key={`parallel-${i}`}
            vertices={vertices}
            sideIndex={i as 0 | 1 | 2 | 3}
            count={sideConfig.parallelMarkCount || 1}
            color={sideConfig.color}
          />
        );
      })}

      {/* Auto-detected equal marks */}
      {equalGroups.map((group, groupIndex) =>
        group.map((sideIndex) => (
          <EqualMarks
            key={`equal-${groupIndex}-${sideIndex}`}
            vertices={vertices}
            sideIndex={sideIndex as 0 | 1 | 2 | 3}
            count={((groupIndex % 3) + 1) as 1 | 2 | 3}
          />
        ))
      )}

      {/* Manual equal marks from sides config */}
      {sides?.map((sideConfig, i) => {
        if (!sideConfig?.equalMarks) return null;
        return (
          <EqualMarks
            key={`equal-manual-${i}`}
            vertices={vertices}
            sideIndex={i as 0 | 1 | 2 | 3}
            count={sideConfig.equalMarks}
            color={sideConfig.color}
          />
        );
      })}

      {/* Angle arcs */}
      {effectiveAngles?.map((angleConfig, i) => {
        if (!angleConfig?.showArc) return null;
        return (
          <AngleArc
            key={`angle-${i}`}
            vertices={vertices}
            vertexIndex={i as 0 | 1 | 2 | 3}
            config={angleConfig}
          />
        );
      })}

      {/* Auto-detected right angle markers */}
      {rightAngles.map((vi) => (
        <RightAngleMarker
          key={`right-auto-${vi}`}
          vertices={vertices}
          vertexIndex={vi as 0 | 1 | 2 | 3}
          size={12}
        />
      ))}

      {/* Manual right angle markers from angles config */}
      {effectiveAngles?.map((angleConfig, i) => {
        if (!angleConfig?.isRightAngle) return null;
        if (rightAngles.includes(i)) return null; // Already rendered by auto-detection
        return (
          <RightAngleMarker
            key={`right-manual-${i}`}
            vertices={vertices}
            vertexIndex={i as 0 | 1 | 2 | 3}
            size={12}
            color={angleConfig.color}
          />
        );
      })}

      {/* Side labels */}
      {sides?.map((sideConfig, i) => {
        if (!sideConfig) return null;
        return (
          <SideLabel
            key={`side-${i}`}
            vertices={vertices}
            sideIndex={i as 0 | 1 | 2 | 3}
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
          {vertex.label && <VertexLabel vertex={vertex} vertices={vertices} />}
        </g>
      ))}

      {/* Angle labels */}
      {effectiveAngles?.map((angleConfig, i) => {
        if (!angleConfig?.label && !angleConfig?.showDegrees) return null;
        return (
          <AngleLabel
            key={`angle-label-${i}`}
            vertices={vertices}
            vertexIndex={i as 0 | 1 | 2 | 3}
            config={angleConfig}
          />
        );
      })}
    </>
  );

  // Return standalone SVG or embedded <g>
  if (standalone) {
    return (
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        className={className}
        role="img"
        aria-label={ariaLabel || 'Quadrilateral figure'}
      >
        <title>{ariaLabel || 'Quadrilateral figure'}</title>
        {content}
      </svg>
    );
  }

  return <g className={className}>{content}</g>;
}

// ============================================
// SUB-COMPONENTS
// ============================================

interface VertexLabelProps {
  vertex: LabeledPoint;
  vertices: QuadVertices;
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
  vertices: QuadVertices;
  sideIndex: 0 | 1 | 2 | 3;
  config: QuadSideConfig;
}

function SideLabel({ vertices, sideIndex, config }: SideLabelProps) {
  const p1 = vertices[sideIndex];
  const p2 = vertices[(sideIndex + 1) % 4];
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

interface AngleArcProps {
  vertices: QuadVertices;
  vertexIndex: 0 | 1 | 2 | 3;
  config: QuadAngleConfig;
}

function AngleArc({ vertices, vertexIndex, config }: AngleArcProps) {
  const vertex = vertices[vertexIndex];
  const p1 = vertices[(vertexIndex + 3) % 4]; // Previous vertex
  const p2 = vertices[(vertexIndex + 1) % 4]; // Next vertex
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
  vertices: QuadVertices;
  vertexIndex: 0 | 1 | 2 | 3;
  config: QuadAngleConfig;
}

function AngleLabel({ vertices, vertexIndex, config }: AngleLabelProps) {
  const vertex = vertices[vertexIndex];
  const p1 = vertices[(vertexIndex + 3) % 4];
  const p2 = vertices[(vertexIndex + 1) % 4];

  // Calculate midpoint direction for label placement
  const mid = midpoint(p1, p2);
  const dx = vertex.x - mid.x;
  const dy = vertex.y - mid.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist === 0) return null;

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
  vertices: QuadVertices;
  vertexIndex: 0 | 1 | 2 | 3;
  size: number;
  color?: string;
}

function RightAngleMarker({ vertices, vertexIndex, size, color }: RightAngleMarkerProps) {
  const vertex = vertices[vertexIndex];
  const p1 = vertices[(vertexIndex + 3) % 4];
  const p2 = vertices[(vertexIndex + 1) % 4];
  const path = describeRightAngleMarker(vertex, p1, p2, size);

  return (
    <path
      d={path}
      fill="none"
      stroke={color || DEFAULT_COLORS.rightAngle}
      strokeWidth="2"
      strokeLinejoin="miter"
      className="dark:stroke-red-400"
    />
  );
}

interface DiagonalLineProps {
  vertices: QuadVertices;
  config: DiagonalConfig;
}

function DiagonalLine({ vertices, config }: DiagonalLineProps) {
  const path = diagonalPath(vertices, config.from, config.to);
  const dashArray = getStrokeDashArray(config.strokeStyle || 'dashed');

  const p1 = vertices[config.from];
  const p2 = vertices[config.to];

  return (
    <g>
      <path
        d={path}
        fill="none"
        stroke={config.color || DEFAULT_COLORS.diagonal}
        strokeWidth="1.5"
        strokeDasharray={dashArray}
        className="dark:stroke-purple-400"
      />
      {/* Midpoint marker */}
      {config.showMidpoint && (
        <circle
          cx={(p1.x + p2.x) / 2}
          cy={(p1.y + p2.y) / 2}
          r={3}
          fill={config.color || DEFAULT_COLORS.diagonal}
          className="dark:fill-purple-400"
        />
      )}
      {/* Diagonal label */}
      {config.label && (
        <text
          x={calculateDiagonalLabelPosition(p1, p2, 12).x}
          y={calculateDiagonalLabelPosition(p1, p2, 12).y}
          fill={config.color || DEFAULT_COLORS.diagonal}
          fontSize="12"
          fontWeight="600"
          textAnchor="middle"
          dominantBaseline="middle"
          className="dark:fill-purple-400"
        >
          {config.label}
        </text>
      )}
      {/* Midpoint label */}
      {config.midpointLabel && (
        <text
          x={(p1.x + p2.x) / 2 + 10}
          y={(p1.y + p2.y) / 2 - 10}
          fill={config.color || DEFAULT_COLORS.diagonal}
          fontSize="11"
          textAnchor="start"
          dominantBaseline="middle"
          className="dark:fill-purple-400"
        >
          {config.midpointLabel}
        </text>
      )}
    </g>
  );
}

interface ParallelMarksProps {
  vertices: QuadVertices;
  sideIndex: 0 | 1 | 2 | 3;
  count: 1 | 2;
  color?: string;
}

function ParallelMarks({ vertices, sideIndex, count, color }: ParallelMarksProps) {
  const p1 = vertices[sideIndex];
  const p2 = vertices[(sideIndex + 1) % 4];
  const path = describeParallelMarks(p1, p2, count, 8);

  return (
    <path
      d={path}
      fill="none"
      stroke={color || DEFAULT_COLORS.parallelMark}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="dark:stroke-emerald-400"
    />
  );
}

interface EqualMarksProps {
  vertices: QuadVertices;
  sideIndex: 0 | 1 | 2 | 3;
  count: 1 | 2 | 3;
  color?: string;
}

function EqualMarks({ vertices, sideIndex, count, color }: EqualMarksProps) {
  const p1 = vertices[sideIndex];
  const p2 = vertices[(sideIndex + 1) % 4];
  const path = describeEqualMarks(p1, p2, count, 8);

  return (
    <path
      d={path}
      fill="none"
      stroke={color || DEFAULT_COLORS.equalMark}
      strokeWidth="2"
      strokeLinecap="round"
      className="dark:stroke-purple-400"
    />
  );
}

interface SpecialLineProps {
  vertices: QuadVertices;
  config: QuadSpecialLineConfig;
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
          direction2={vertices[(config.toSide ?? 0 + 1) % 4]}
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

interface DiagonalIntersectionPointProps {
  intersection: LabeledPoint;
  label?: string;
  color?: string;
}

function DiagonalIntersectionPoint({
  intersection,
  label,
  color,
}: DiagonalIntersectionPointProps) {
  return (
    <g>
      <circle
        cx={intersection.x}
        cy={intersection.y}
        r={4}
        fill={color || DEFAULT_COLORS.diagonal}
        className="dark:fill-purple-400"
      />
      {label && (
        <text
          x={intersection.x + 10}
          y={intersection.y - 10}
          fill={color || DEFAULT_COLORS.diagonal}
          fontSize="12"
          fontWeight="600"
          textAnchor="start"
          dominantBaseline="middle"
          className="dark:fill-purple-400"
        >
          {label}
        </text>
      )}
    </g>
  );
}

interface DiagonalRightAngleMarkerProps {
  intersection: LabeledPoint;
  vertices: QuadVertices;
  size?: number;
  color?: string;
}

/**
 * Renders a right angle marker (small square) at the diagonal intersection
 * when diagonals are perpendicular (rhombus, square, kite).
 */
function DiagonalRightAngleMarker({
  intersection,
  vertices,
  size = 10,
  color,
}: DiagonalRightAngleMarkerProps) {
  // Get diagonal direction vectors
  const d1 = {
    x: vertices[2].x - vertices[0].x,
    y: vertices[2].y - vertices[0].y,
  };
  const d2 = {
    x: vertices[3].x - vertices[1].x,
    y: vertices[3].y - vertices[1].y,
  };

  // Normalize vectors
  const len1 = Math.sqrt(d1.x * d1.x + d1.y * d1.y);
  const len2 = Math.sqrt(d2.x * d2.x + d2.y * d2.y);

  if (len1 === 0 || len2 === 0) return null;

  const u1 = { x: d1.x / len1, y: d1.y / len1 };
  const u2 = { x: d2.x / len2, y: d2.y / len2 };

  // Create right angle marker path (small square)
  const corner1 = {
    x: intersection.x + u1.x * size,
    y: intersection.y + u1.y * size,
  };
  const corner2 = {
    x: intersection.x + u1.x * size + u2.x * size,
    y: intersection.y + u1.y * size + u2.y * size,
  };
  const corner3 = {
    x: intersection.x + u2.x * size,
    y: intersection.y + u2.y * size,
  };

  const path = `M ${corner1.x} ${corner1.y} L ${corner2.x} ${corner2.y} L ${corner3.x} ${corner3.y}`;

  return (
    <path
      d={path}
      fill="none"
      stroke={color || DEFAULT_COLORS.rightAngle}
      strokeWidth="2"
      strokeLinejoin="miter"
      className="dark:stroke-red-400"
    />
  );
}

interface DiagonalBisectionMarksProps {
  vertices: QuadVertices;
  intersection: LabeledPoint;
  diagonalIndex: 0 | 1;
  count: 1 | 2 | 3;
  color?: string;
}

/**
 * Renders tick marks on a diagonal showing it's bisected at the intersection point.
 * Marks are placed on both halves of the diagonal.
 */
function DiagonalBisectionMarks({
  vertices,
  intersection,
  diagonalIndex,
  count,
  color,
}: DiagonalBisectionMarksProps) {
  // Diagonal 0: v0 to v2, Diagonal 1: v1 to v3
  const [fromIdx, toIdx] = diagonalIndex === 0 ? [0, 2] : [1, 3];
  const p1 = vertices[fromIdx];
  const p2 = vertices[toIdx];

  // Calculate midpoints of each half
  const mid1 = midpoint(p1, intersection);
  const mid2 = midpoint(intersection, p2);

  // Generate tick marks perpendicular to the diagonal
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.sqrt(dx * dx + dy * dy);

  if (len === 0) return null;

  // Perpendicular direction
  const perpX = -dy / len;
  const perpY = dx / len;

  const tickSize = 6;
  const spacing = 4;

  // Generate path for tick marks at both midpoints
  const paths: string[] = [];

  [mid1, mid2].forEach((midPt) => {
    for (let i = 0; i < count; i++) {
      const offset = (i - (count - 1) / 2) * spacing;
      const cx = midPt.x + (dx / len) * offset;
      const cy = midPt.y + (dy / len) * offset;

      const x1 = cx + perpX * tickSize;
      const y1 = cy + perpY * tickSize;
      const x2 = cx - perpX * tickSize;
      const y2 = cy - perpY * tickSize;

      paths.push(`M ${x1} ${y1} L ${x2} ${y2}`);
    }
  });

  return (
    <path
      d={paths.join(' ')}
      fill="none"
      stroke={color || DEFAULT_COLORS.equalMark}
      strokeWidth="2"
      strokeLinecap="round"
      className="dark:stroke-purple-400"
    />
  );
}

interface DiagonalEqualLengthMarksProps {
  vertices: QuadVertices;
  count: 1 | 2 | 3;
  color?: string;
}

/**
 * Renders marks on both diagonals indicating they are equal in length.
 * Places tick marks near the middle of each diagonal.
 */
function DiagonalEqualLengthMarks({
  vertices,
  count,
  color,
}: DiagonalEqualLengthMarksProps) {
  const diagonals: Array<{ from: number; to: number }> = [
    { from: 0, to: 2 },
    { from: 1, to: 3 },
  ];

  const paths: string[] = [];
  const tickSize = 6;
  const spacing = 4;

  diagonals.forEach(({ from, to }) => {
    const p1 = vertices[from];
    const p2 = vertices[to];
    const mid = midpoint(p1, p2);

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len = Math.sqrt(dx * dx + dy * dy);

    if (len === 0) return;

    // Perpendicular direction
    const perpX = -dy / len;
    const perpY = dx / len;

    for (let i = 0; i < count; i++) {
      const offset = (i - (count - 1) / 2) * spacing;
      const cx = mid.x + (dx / len) * offset;
      const cy = mid.y + (dy / len) * offset;

      const x1 = cx + perpX * tickSize;
      const y1 = cy + perpY * tickSize;
      const x2 = cx - perpX * tickSize;
      const y2 = cy - perpY * tickSize;

      paths.push(`M ${x1} ${y1} L ${x2} ${y2}`);
    }
  });

  return (
    <path
      d={paths.join(' ')}
      fill="none"
      stroke={color || DEFAULT_COLORS.equalMark}
      strokeWidth="2"
      strokeLinecap="round"
      className="dark:stroke-purple-400"
    />
  );
}

export default QuadrilateralFigure;
