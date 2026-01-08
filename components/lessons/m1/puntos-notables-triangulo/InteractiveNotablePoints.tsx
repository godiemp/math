'use client';

import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CircleFigure } from '@/components/figures/CircleFigure';
import type { LabeledPoint } from '@/lib/types/triangle';
import {
  centroid,
  incenter,
  inradius,
  circumcenter,
  circumradius,
  orthocenter,
  midpoint,
  altitudeFootPoint,
  distance,
} from '@/lib/geometry/triangleUtils';

// Types for special lines
type SpecialLineType = 'mediana' | 'altura' | 'bisectriz' | 'mediatriz';
type NotablePointType = 'centroide' | 'ortocentro' | 'incentro' | 'circuncentro';

interface InteractiveNotablePointsProps {
  // Which special lines to show (all 3 of each type)
  showMedianas?: boolean;
  showAlturas?: boolean;
  showBisectrices?: boolean;
  showMediatrices?: boolean;
  // Which notable point to highlight
  highlightPoint?: NotablePointType | null;
  // Show circles
  showCircumscribedCircle?: boolean;
  showInscribedCircle?: boolean;
  // Allow dragging vertices
  draggable?: boolean;
  // Callback when vertices change
  onVerticesChange?: (vertices: [LabeledPoint, LabeledPoint, LabeledPoint]) => void;
  // Initial vertices (optional)
  initialVertices?: [LabeledPoint, LabeledPoint, LabeledPoint];
  // Show grid
  showGrid?: boolean;
  // Size
  width?: number;
  height?: number;
  // Additional class
  className?: string;
}

// Default triangle vertices
const DEFAULT_VERTICES: [LabeledPoint, LabeledPoint, LabeledPoint] = [
  { x: 200, y: 60, label: 'A' },
  { x: 80, y: 280, label: 'B' },
  { x: 320, y: 280, label: 'C' },
];

// Colors following design system
const COLORS = {
  triangle: {
    fill: 'rgba(59, 130, 246, 0.15)',
    stroke: 'rgb(59, 130, 246)',
  },
  mediana: 'rgb(16, 185, 129)', // emerald-500
  altura: 'rgb(239, 68, 68)', // red-500
  bisectriz: 'rgb(245, 158, 11)', // amber-500
  mediatriz: 'rgb(168, 85, 247)', // purple-500
  circumscribed: 'rgb(16, 185, 129)', // emerald-500
  inscribed: 'rgb(245, 158, 11)', // amber-500
  points: {
    centroide: 'rgb(16, 185, 129)', // emerald-500
    ortocentro: 'rgb(239, 68, 68)', // red-500
    incentro: 'rgb(245, 158, 11)', // amber-500
    circuncentro: 'rgb(168, 85, 247)', // purple-500
  },
  vertex: 'rgb(59, 130, 246)', // blue-500
  vertexDragging: 'rgb(99, 102, 241)', // indigo-500
};

// Helper to normalize vector
function normalize(v: { x: number; y: number }): { x: number; y: number } {
  const mag = Math.sqrt(v.x * v.x + v.y * v.y);
  if (mag === 0) return { x: 0, y: 0 };
  return { x: v.x / mag, y: v.y / mag };
}

// Calculate angle bisector endpoint (where it meets opposite side)
function bisectorEndpoint(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint],
  fromVertex: 0 | 1 | 2
): LabeledPoint {
  const v = vertices[fromVertex];
  const p1 = vertices[(fromVertex + 1) % 3];
  const p2 = vertices[(fromVertex + 2) % 3];

  // Unit vectors to adjacent vertices
  const u1 = normalize({ x: p1.x - v.x, y: p1.y - v.y });
  const u2 = normalize({ x: p2.x - v.x, y: p2.y - v.y });

  // Bisector direction (sum of unit vectors)
  const bisector = normalize({ x: u1.x + u2.x, y: u1.y + u2.y });

  // Find intersection with opposite side
  const d = { x: p2.x - p1.x, y: p2.y - p1.y };
  const denom = bisector.x * d.y - bisector.y * d.x;

  if (Math.abs(denom) < 0.0001) {
    return midpoint(p1, p2);
  }

  const t = ((p1.x - v.x) * d.y - (p1.y - v.y) * d.x) / denom;

  return { x: v.x + t * bisector.x, y: v.y + t * bisector.y };
}

// Calculate perpendicular bisector endpoints (extended beyond the side)
function mediatrizEndpoints(
  vertices: [LabeledPoint, LabeledPoint, LabeledPoint],
  sideIndex: 0 | 1 | 2
): { start: LabeledPoint; end: LabeledPoint } {
  const p1 = vertices[sideIndex];
  const p2 = vertices[(sideIndex + 1) % 3];

  const mid = midpoint(p1, p2);

  // Perpendicular direction
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const perp = normalize({ x: -dy, y: dx });

  // Extend in both directions
  const length = distance(p1, p2) * 0.6;

  return {
    start: { x: mid.x - perp.x * length, y: mid.y - perp.y * length },
    end: { x: mid.x + perp.x * length, y: mid.y + perp.y * length },
  };
}

export function InteractiveNotablePoints({
  showMedianas = false,
  showAlturas = false,
  showBisectrices = false,
  showMediatrices = false,
  highlightPoint = null,
  showCircumscribedCircle = false,
  showInscribedCircle = false,
  draggable = false,
  onVerticesChange,
  initialVertices,
  showGrid = false,
  width,
  height,
  className = '',
}: InteractiveNotablePointsProps) {
  const [vertices, setVertices] = useState<[LabeledPoint, LabeledPoint, LabeledPoint]>(
    initialVertices || DEFAULT_VERTICES
  );
  const [draggingVertex, setDraggingVertex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Calculate viewBox based on vertices and potential circles
  const viewBox = useMemo(() => {
    const xs = vertices.map(v => v.x);
    const ys = vertices.map(v => v.y);

    let minX = Math.min(...xs);
    let maxX = Math.max(...xs);
    let minY = Math.min(...ys);
    let maxY = Math.max(...ys);

    // If showing circumscribed circle, extend bounds
    if (showCircumscribedCircle) {
      const cc = circumcenter(vertices);
      const cr = circumradius(vertices);
      minX = Math.min(minX, cc.x - cr);
      maxX = Math.max(maxX, cc.x + cr);
      minY = Math.min(minY, cc.y - cr);
      maxY = Math.max(maxY, cc.y + cr);
    }

    const padding = 40;
    return `${minX - padding} ${minY - padding} ${maxX - minX + padding * 2} ${maxY - minY + padding * 2}`;
  }, [vertices, showCircumscribedCircle]);

  // Calculate notable points
  const notablePoints = useMemo(() => ({
    centroide: centroid(vertices),
    ortocentro: orthocenter(vertices),
    incentro: incenter(vertices),
    circuncentro: circumcenter(vertices),
  }), [vertices]);

  // Calculate radii for circles
  const circleRadii = useMemo(() => ({
    circumscribed: circumradius(vertices),
    inscribed: inradius(vertices),
  }), [vertices]);

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

  // Handle pointer move
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (draggingVertex === null) return;
    const point = getSVGPoint(e.clientX, e.clientY);
    if (!point) return;

    setVertices(prev => {
      const newVertices = [...prev] as [LabeledPoint, LabeledPoint, LabeledPoint];
      newVertices[draggingVertex] = {
        ...newVertices[draggingVertex],
        x: point.x,
        y: point.y,
      };
      return newVertices;
    });
  }, [draggingVertex, getSVGPoint]);

  // Handle pointer up
  const handlePointerUp = useCallback(() => {
    setDraggingVertex(null);
  }, []);

  // Notify parent of vertex changes
  useEffect(() => {
    if (onVerticesChange) {
      onVerticesChange(vertices);
    }
  }, [vertices, onVerticesChange]);

  // Parse viewBox for grid
  const [vbMinX, vbMinY, vbWidth, vbHeight] = viewBox.split(' ').map(Number);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox={viewBox}
      className={cn('max-w-full', className)}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      role="img"
      aria-label="Triángulo interactivo con puntos notables"
    >
      <title>Triángulo interactivo con puntos notables</title>

      {/* Grid */}
      {showGrid && (
        <g className="grid">
          {Array.from({ length: Math.ceil(vbWidth / 20) + 1 }).map((_, i) => {
            const x = Math.floor(vbMinX / 20) * 20 + i * 20;
            return (
              <line
                key={`v-${i}`}
                x1={x}
                y1={vbMinY}
                x2={x}
                y2={vbMinY + vbHeight}
                stroke="rgb(229, 231, 235)"
                strokeWidth="0.5"
                className="dark:stroke-gray-700"
              />
            );
          })}
          {Array.from({ length: Math.ceil(vbHeight / 20) + 1 }).map((_, i) => {
            const y = Math.floor(vbMinY / 20) * 20 + i * 20;
            return (
              <line
                key={`h-${i}`}
                x1={vbMinX}
                y1={y}
                x2={vbMinX + vbWidth}
                y2={y}
                stroke="rgb(229, 231, 235)"
                strokeWidth="0.5"
                className="dark:stroke-gray-700"
              />
            );
          })}
        </g>
      )}

      {/* Circumscribed circle (behind everything) */}
      {showCircumscribedCircle && (
        <CircleFigure
          standalone={false}
          center={notablePoints.circuncentro}
          radius={circleRadii.circumscribed}
          mode="circunferencia"
          stroke={COLORS.circumscribed}
          strokeWidth={2}
          showCenter={false}
        />
      )}

      {/* Inscribed circle */}
      {showInscribedCircle && (
        <CircleFigure
          standalone={false}
          center={notablePoints.incentro}
          radius={circleRadii.inscribed}
          mode="circunferencia"
          stroke={COLORS.inscribed}
          strokeWidth={2}
          showCenter={false}
        />
      )}

      {/* Mediatrices (perpendicular bisectors) */}
      {showMediatrices && [0, 1, 2].map((i) => {
        const { start, end } = mediatrizEndpoints(vertices, i as 0 | 1 | 2);
        return (
          <line
            key={`mediatriz-${i}`}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke={COLORS.mediatriz}
            strokeWidth={1.5}
            strokeDasharray="6,4"
            className="dark:stroke-purple-400"
          />
        );
      })}

      {/* Medianas */}
      {showMedianas && [0, 1, 2].map((i) => {
        const vertex = vertices[i];
        const opposite1 = vertices[(i + 1) % 3];
        const opposite2 = vertices[(i + 2) % 3];
        const mid = midpoint(opposite1, opposite2);
        return (
          <line
            key={`mediana-${i}`}
            x1={vertex.x}
            y1={vertex.y}
            x2={mid.x}
            y2={mid.y}
            stroke={COLORS.mediana}
            strokeWidth={1.5}
            strokeDasharray="6,4"
            className="dark:stroke-emerald-400"
          />
        );
      })}

      {/* Alturas */}
      {showAlturas && [0, 1, 2].map((i) => {
        const vertex = vertices[i];
        const foot = altitudeFootPoint(vertices, i as 0 | 1 | 2);
        return (
          <g key={`altura-${i}`}>
            <line
              x1={vertex.x}
              y1={vertex.y}
              x2={foot.x}
              y2={foot.y}
              stroke={COLORS.altura}
              strokeWidth={1.5}
              strokeDasharray="6,4"
              className="dark:stroke-red-400"
            />
            {/* Right angle marker at foot */}
            <rect
              x={foot.x - 6}
              y={foot.y - 6}
              width={8}
              height={8}
              fill="none"
              stroke={COLORS.altura}
              strokeWidth={1}
              className="dark:stroke-red-400"
              transform={`rotate(${Math.atan2(
                vertices[(i + 2) % 3].y - vertices[(i + 1) % 3].y,
                vertices[(i + 2) % 3].x - vertices[(i + 1) % 3].x
              ) * 180 / Math.PI}, ${foot.x}, ${foot.y})`}
            />
          </g>
        );
      })}

      {/* Bisectrices */}
      {showBisectrices && [0, 1, 2].map((i) => {
        const vertex = vertices[i];
        const endpoint = bisectorEndpoint(vertices, i as 0 | 1 | 2);
        return (
          <line
            key={`bisectriz-${i}`}
            x1={vertex.x}
            y1={vertex.y}
            x2={endpoint.x}
            y2={endpoint.y}
            stroke={COLORS.bisectriz}
            strokeWidth={1.5}
            strokeDasharray="6,4"
            className="dark:stroke-amber-400"
          />
        );
      })}

      {/* Main triangle */}
      <polygon
        points={vertices.map(v => `${v.x},${v.y}`).join(' ')}
        fill={COLORS.triangle.fill}
        stroke={COLORS.triangle.stroke}
        strokeWidth={2}
        className="dark:stroke-blue-400"
      />

      {/* Highlighted notable point */}
      {highlightPoint && (
        <g>
          <circle
            cx={notablePoints[highlightPoint].x}
            cy={notablePoints[highlightPoint].y}
            r={8}
            fill={COLORS.points[highlightPoint]}
            stroke="white"
            strokeWidth={2}
            className="dark:stroke-gray-800"
          />
          <circle
            cx={notablePoints[highlightPoint].x}
            cy={notablePoints[highlightPoint].y}
            r={12}
            fill="none"
            stroke={COLORS.points[highlightPoint]}
            strokeWidth={2}
            strokeOpacity={0.4}
            className="animate-ping"
          />
        </g>
      )}

      {/* Vertex points (draggable) */}
      {vertices.map((vertex, i) => (
        <g key={`vertex-${i}`}>
          <circle
            cx={vertex.x}
            cy={vertex.y}
            r={draggable ? 12 : 6}
            fill={draggingVertex === i ? COLORS.vertexDragging : COLORS.vertex}
            stroke="white"
            strokeWidth={2}
            style={{ cursor: draggable ? 'grab' : 'default' }}
            onPointerDown={(e) => handlePointerDown(i, e)}
            className={cn(
              'dark:stroke-gray-800',
              draggable && 'hover:fill-indigo-500 transition-colors'
            )}
          />
          {/* Vertex label */}
          <text
            x={vertex.x}
            y={vertex.y - (draggable ? 20 : 15)}
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill="rgb(17, 24, 39)"
            className="dark:fill-white"
          >
            {vertex.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default InteractiveNotablePoints;
