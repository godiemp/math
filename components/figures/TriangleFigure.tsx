'use client';

import React, { useMemo, useState, useRef, useCallback, useEffect } from 'react';
import type {
  TriangleFigureProps,
  LabeledPoint,
  SideConfig,
  AngleConfig,
  SpecialLineConfig,
  NotablePointConfig,
  TriangleCircleConfig,
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
  centroid,
  incenter,
  circumcenter,
  orthocenter,
  inradius,
  circumradius,
} from '@/lib/geometry/triangleUtils';
import { cn } from '@/lib/utils';

// Default colors following the design system
const DEFAULT_COLORS = {
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
};

/**
 * TriangleFigure - A comprehensive triangle visualization component
 *
 * Features:
 * - Configurable vertices with labels
 * - Side labels and measurements
 * - Interior/exterior angle arcs with labels
 * - Special lines: altura, mediana, bisectriz, mediatriz
 * - Notable points: circuncentro, incentro, baricentro, ortocentro
 * - Circumscribed and inscribed circles
 * - Draggable vertices for interactive exploration
 * - Right angle markers
 * - Optional grid background
 * - Dark mode support
 * - Standalone or embedded mode (like CircleFigure)
 */
export function TriangleFigure({
  standalone = true,
  vertices: verticesProp,
  fromAngles,
  fromSides,
  draggable = false,
  onVerticesChange,
  sides,
  angles,
  specialLines,
  notablePoints,
  circles,
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
}: TriangleFigureProps) {
  // Internal state for draggable vertices
  const [internalVertices, setInternalVertices] = useState<[LabeledPoint, LabeledPoint, LabeledPoint] | null>(null);
  const [draggingVertex, setDraggingVertex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Calculate initial vertices from fromAngles, fromSides, or use provided vertices
  const initialVertices = useMemo<[LabeledPoint, LabeledPoint, LabeledPoint]>(() => {
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

  // Use internal state for draggable, otherwise use computed vertices
  const vertices = draggable
    ? (internalVertices || initialVertices)
    : initialVertices;

  // Initialize internal vertices when draggable is enabled
  useEffect(() => {
    if (draggable && !internalVertices) {
      setInternalVertices(initialVertices);
    }
  }, [draggable, initialVertices, internalVertices]);

  // Notify parent of vertex changes
  useEffect(() => {
    if (draggable && internalVertices && onVerticesChange) {
      onVerticesChange(internalVertices);
    }
  }, [draggable, internalVertices, onVerticesChange]);

  // Calculate notable points positions
  const notablePointsPositions = useMemo(() => ({
    circuncentro: circumcenter(vertices),
    incentro: incenter(vertices),
    baricentro: centroid(vertices),
    ortocentro: orthocenter(vertices),
  }), [vertices]);

  // Calculate circle radii
  const circleRadii = useMemo(() => ({
    circumscribed: circumradius(vertices),
    inscribed: inradius(vertices),
  }), [vertices]);

  // Calculate viewBox from vertices (and circles if present)
  const calculatedBox = useMemo(() => {
    let box = calculateViewBox(vertices, padding);

    // Extend viewBox for circumscribed circle if present
    const hasCircumscribed = circles?.some(c => c.type === 'circumscribed');
    if (hasCircumscribed) {
      const cc = notablePointsPositions.circuncentro;
      const cr = circleRadii.circumscribed;
      const circleMinX = cc.x - cr - padding;
      const circleMaxX = cc.x + cr + padding;
      const circleMinY = cc.y - cr - padding;
      const circleMaxY = cc.y + cr + padding;

      box = {
        minX: Math.min(box.minX, circleMinX),
        minY: Math.min(box.minY, circleMinY),
        width: Math.max(box.minX + box.width, circleMaxX) - Math.min(box.minX, circleMinX),
        height: Math.max(box.minY + box.height, circleMaxY) - Math.min(box.minY, circleMinY),
      };
    }

    return box;
  }, [vertices, circles, notablePointsPositions, circleRadii, padding]);

  const viewBox = customViewBox ||
    `${calculatedBox.minX} ${calculatedBox.minY} ${calculatedBox.width} ${calculatedBox.height}`;

  // Auto-detect right angle vertex if not specified
  const detectedRightAngle =
    showRightAngleMarker && rightAngleVertex === undefined
      ? findRightAngleVertex(vertices)
      : rightAngleVertex;

  // Parse viewBox for grid calculations
  const [vbMinX, vbMinY, vbWidth, vbHeight] = viewBox.split(' ').map(Number);

  // Get SVG point from mouse/touch event
  const getSVGPoint = useCallback((clientX: number, clientY: number) => {
    if (!svgRef.current) return null;
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    return { x: svgP.x, y: svgP.y };
  }, []);

  // Handle pointer down on vertex
  const handlePointerDown = useCallback((index: number, e: React.PointerEvent) => {
    if (!draggable) return;
    e.preventDefault();
    e.stopPropagation();
    setDraggingVertex(index);
    (e.target as Element).setPointerCapture(e.pointerId);
  }, [draggable]);

  // Handle pointer move - direct movement without damping
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (draggingVertex === null || !draggable) return;
    const point = getSVGPoint(e.clientX, e.clientY);
    if (!point) return;

    setInternalVertices(prev => {
      if (!prev) return prev;

      // Clamp to reasonable bounds to prevent extreme triangles
      const minCoord = -200;
      const maxCoord = 600;
      const clampedX = Math.max(minCoord, Math.min(maxCoord, point.x));
      const clampedY = Math.max(minCoord, Math.min(maxCoord, point.y));

      const newVertices = [...prev] as [LabeledPoint, LabeledPoint, LabeledPoint];
      newVertices[draggingVertex] = {
        ...newVertices[draggingVertex],
        x: clampedX,
        y: clampedY,
      };
      return newVertices;
    });
  }, [draggable, draggingVertex, getSVGPoint]);

  // Handle pointer up
  const handlePointerUp = useCallback(() => {
    setDraggingVertex(null);
  }, []);

  // Content to render (can be in <svg> or <g>)
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

      {/* Circles (rendered behind everything) */}
      {circles?.map((circleConfig, i) => (
        <TriangleCircle
          key={`circle-${i}`}
          config={circleConfig}
          notablePointsPositions={notablePointsPositions}
          circleRadii={circleRadii}
        />
      ))}

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

      {/* Notable points */}
      {notablePoints?.map((pointConfig, i) => (
        <NotablePoint
          key={`notable-${i}`}
          config={pointConfig}
          position={notablePointsPositions[pointConfig.type]}
        />
      ))}

      {/* Vertex points and labels */}
      {vertices.map((vertex, i) => (
        <g key={`vertex-${i}`}>
          {showVertices && (
            <circle
              cx={vertex.x}
              cy={vertex.y}
              r={draggable ? Math.max(vertexRadius, 10) : vertexRadius}
              fill={draggingVertex === i ? DEFAULT_COLORS.vertexDragging : DEFAULT_COLORS.vertex}
              stroke="white"
              strokeWidth={draggable ? 2 : 0}
              style={{ cursor: draggable ? 'grab' : 'default' }}
              onPointerDown={(e) => handlePointerDown(i, e)}
              className={cn(
                'dark:fill-white',
                draggable && 'hover:fill-indigo-500 transition-colors'
              )}
            />
          )}
          {vertex.label && (
            <VertexLabel vertex={vertex} vertices={vertices} draggable={draggable} />
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

  // Standalone mode: wrap in SVG
  if (standalone) {
    return (
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={viewBox}
        className={cn('max-w-full', className)}
        onPointerMove={draggable ? handlePointerMove : undefined}
        onPointerUp={draggable ? handlePointerUp : undefined}
        onPointerLeave={draggable ? handlePointerUp : undefined}
        role="img"
        aria-label={ariaLabel || 'Triangle figure'}
      >
        <title>{ariaLabel || 'Triangle figure'}</title>
        {content}
      </svg>
    );
  }

  // Embedded mode: return <g> element for use in another SVG
  return <g className={className}>{content}</g>;
}

// Sub-components

interface VertexLabelProps {
  vertex: LabeledPoint;
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint];
  draggable?: boolean;
}

function VertexLabel({ vertex, vertices, draggable }: VertexLabelProps) {
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

function SideLabel({ vertices, sideIndex, config }: SideLabelProps) {
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

/**
 * Generate tick marks to indicate equal segments (division marks)
 * Places two small perpendicular lines on either side of the midpoint
 */
function EqualDivisionMarks({
  point1,
  point2,
  midPoint,
  color,
  tickSize = 6,
}: {
  point1: LabeledPoint;
  point2: LabeledPoint;
  midPoint: LabeledPoint;
  color: string;
  tickSize?: number;
}) {
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
  // This places them between midpoint and each endpoint
  const offset = len * 0.25; // Distance from midpoint to tick

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
      {/* First tick mark */}
      <line
        x1={tick1Center.x - perpX * tickSize}
        y1={tick1Center.y - perpY * tickSize}
        x2={tick1Center.x + perpX * tickSize}
        y2={tick1Center.y + perpY * tickSize}
        stroke={color}
        strokeWidth="2"
      />
      {/* Second tick mark */}
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

function SpecialLine({ vertices, config }: SpecialLineProps) {
  const { start, end } = calculateSpecialLineEndpoints(vertices, config);
  const dashArray = getStrokeDashArray(config.strokeStyle || 'dashed');

  // For simetral/mediatriz: calculate the midpoint where it intersects the side
  const isSimetral = config.type === 'simetral' || config.type === 'mediatriz';
  const isTransversal = config.type === 'transversal' || config.type === 'mediana';

  // Get the side vertices for simetral/transversal
  const sideIndex = config.toSide ?? config.fromVertex;
  const sideP1 = vertices[(sideIndex + 1) % 3];
  const sideP2 = vertices[(sideIndex + 2) % 3];
  const sideMidPoint = midpoint(sideP1, sideP2);

  // For transversal: endpoint is the midpoint of the opposite side
  const transversalMidPoint = isTransversal ? end : null;

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
      {/* Right angle marker for simetral (perpendicular to side at midpoint) */}
      {config.showRightAngleMarker && isSimetral && (
        <RightAngleMarkerAtPoint
          point={sideMidPoint}
          direction1={sideP1}
          direction2={{ x: sideMidPoint.x + (end.x - start.x), y: sideMidPoint.y + (end.y - start.y) }}
          size={8}
        />
      )}
      {/* Equal division marks for simetral (at the side midpoint) */}
      {config.showEqualMarks && isSimetral && (
        <EqualDivisionMarks
          point1={sideP1}
          point2={sideP2}
          midPoint={sideMidPoint}
          color={config.color || DEFAULT_COLORS.specialLine}
        />
      )}
      {/* Equal division marks for transversal (at the opposite side midpoint) */}
      {config.showEqualMarks && isTransversal && transversalMidPoint && (
        <EqualDivisionMarks
          point1={vertices[(config.fromVertex + 1) % 3]}
          point2={vertices[(config.fromVertex + 2) % 3]}
          midPoint={transversalMidPoint}
          color={config.color || DEFAULT_COLORS.specialLine}
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

interface NotablePointProps {
  config: NotablePointConfig;
  position: LabeledPoint;
}

function NotablePoint({ config, position }: NotablePointProps) {
  const color = config.color || DEFAULT_COLORS.notablePoints[config.type];
  const radius = config.radius || 8;

  return (
    <g>
      {/* Main point */}
      <circle
        cx={position.x}
        cy={position.y}
        r={radius}
        fill={color}
        stroke="white"
        strokeWidth={2}
        className="dark:stroke-gray-800"
      />
      {/* Animation ring */}
      {config.animate && (
        <circle
          cx={position.x}
          cy={position.y}
          r={radius + 4}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeOpacity={0.4}
          className="animate-ping"
        />
      )}
      {/* Label */}
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

function TriangleCircle({ config, notablePointsPositions, circleRadii }: TriangleCircleProps) {
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

export default TriangleFigure;
