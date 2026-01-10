'use client';

import React, { useMemo, useState, useRef, useCallback, useEffect } from 'react';
import type {
  TriangleFigureProps,
  LabeledPoint,
  FromAnglesConfigObject,
  FromSidesConfigObject,
} from '@/lib/types/triangle';
import {
  trianglePath,
  calculateViewBox,
  findRightAngleVertex,
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
import {
  DEFAULT_COLORS,
  VertexLabel,
  SideLabel,
  AngleArc,
  AngleLabel,
  RightAngleMarker,
  SpecialLine,
  NotablePoint,
  TriangleCircle,
} from './triangle';

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

export default TriangleFigure;
