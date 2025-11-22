'use client';

import React from 'react';

export interface Point {
  x: number;
  y: number;
  label?: string;
}

export interface GeometryFigure {
  type: 'triangle' | 'rectangle' | 'circle' | 'angle' | 'line' | 'polygon';
  points?: Point[];
  center?: Point;
  radius?: number;
  width?: number;
  height?: number;
  labels?: {
    sides?: string[];
    angles?: string[];
  };
  dimensions?: {
    showSides?: boolean;
    showAngles?: boolean;
  };
}

export interface GeometryCanvasProps {
  figures: GeometryFigure[];
  width?: number;
  height?: number;
  viewBox?: string;
  className?: string;
}

export function GeometryCanvas({
  figures,
  width = 400,
  height = 300,
  viewBox,
  className = ''
}: GeometryCanvasProps) {
  const defaultViewBox = viewBox || `0 0 ${width} ${height}`;

  return (
    <div className={`flex justify-center my-4 ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox={defaultViewBox}
        className="border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
      >
        {figures.map((figure, figIndex) => renderFigure(figure, figIndex))}
      </svg>
    </div>
  );
}

function renderFigure(figure: GeometryFigure, index: number): React.ReactNode {
  switch (figure.type) {
    case 'triangle':
      return renderTriangle(figure, index);
    case 'rectangle':
      return renderRectangle(figure, index);
    case 'circle':
      return renderCircle(figure, index);
    case 'angle':
      return renderAngle(figure, index);
    case 'line':
      return renderLine(figure, index);
    case 'polygon':
      return renderPolygon(figure, index);
    default:
      return null;
  }
}

function renderTriangle(figure: GeometryFigure, index: number): React.ReactNode {
  if (!figure.points || figure.points.length < 3) return null;

  const [p1, p2, p3] = figure.points;
  const pathData = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} Z`;

  return (
    <g key={`triangle-${index}`}>
      <path
        d={pathData}
        fill="rgba(59, 130, 246, 0.1)"
        stroke="rgb(59, 130, 246)"
        strokeWidth="2"
      />
      {figure.points.map((point, i) => renderPoint(point, `${index}-${i}`))}
      {figure.dimensions?.showSides && renderSideLabels(figure.points, figure.labels?.sides)}
    </g>
  );
}

function renderRectangle(figure: GeometryFigure, index: number): React.ReactNode {
  if (!figure.points || figure.points.length < 2) return null;

  const [p1, p2] = figure.points;
  const width = Math.abs(p2.x - p1.x);
  const height = Math.abs(p2.y - p1.y);

  return (
    <g key={`rectangle-${index}`}>
      <rect
        x={Math.min(p1.x, p2.x)}
        y={Math.min(p1.y, p2.y)}
        width={width}
        height={height}
        fill="rgba(34, 197, 94, 0.1)"
        stroke="rgb(34, 197, 94)"
        strokeWidth="2"
      />
      {figure.points.map((point, i) => renderPoint(point, `${index}-${i}`))}
      {figure.dimensions?.showSides && renderRectangleLabels(p1, p2, figure.labels?.sides)}
    </g>
  );
}

function renderCircle(figure: GeometryFigure, index: number): React.ReactNode {
  if (!figure.center || !figure.radius) return null;

  return (
    <g key={`circle-${index}`}>
      <circle
        cx={figure.center.x}
        cy={figure.center.y}
        r={figure.radius}
        fill="rgba(168, 85, 247, 0.1)"
        stroke="rgb(168, 85, 247)"
        strokeWidth="2"
      />
      {renderPoint(figure.center, `${index}-center`)}
      {figure.dimensions?.showSides && (
        <line
          x1={figure.center.x}
          y1={figure.center.y}
          x2={figure.center.x + figure.radius}
          y2={figure.center.y}
          stroke="rgb(168, 85, 247)"
          strokeWidth="1"
          strokeDasharray="5,5"
        />
      )}
      {figure.labels?.sides && figure.labels.sides[0] && (
        <text
          x={figure.center.x + figure.radius / 2}
          y={figure.center.y - 5}
          fill="rgb(168, 85, 247)"
          fontSize="14"
          fontWeight="bold"
        >
          {figure.labels.sides[0]}
        </text>
      )}
    </g>
  );
}

function renderAngle(figure: GeometryFigure, index: number): React.ReactNode {
  if (!figure.points || figure.points.length < 3) return null;

  const [vertex, p1, p2] = figure.points;

  // Calculate angle arc
  const angle1 = Math.atan2(p1.y - vertex.y, p1.x - vertex.x);
  const angle2 = Math.atan2(p2.y - vertex.y, p2.x - vertex.x);
  const arcRadius = 30;

  return (
    <g key={`angle-${index}`}>
      <line
        x1={vertex.x}
        y1={vertex.y}
        x2={p1.x}
        y2={p1.y}
        stroke="rgb(239, 68, 68)"
        strokeWidth="2"
      />
      <line
        x1={vertex.x}
        y1={vertex.y}
        x2={p2.x}
        y2={p2.y}
        stroke="rgb(239, 68, 68)"
        strokeWidth="2"
      />
      <path
        d={describeArc(vertex.x, vertex.y, arcRadius, angle1 * 180 / Math.PI, angle2 * 180 / Math.PI)}
        fill="none"
        stroke="rgb(239, 68, 68)"
        strokeWidth="1.5"
      />
      {renderPoint(vertex, `${index}-vertex`)}
      {figure.labels?.angles && figure.labels.angles[0] && (
        <text
          x={vertex.x + arcRadius * 1.5 * Math.cos((angle1 + angle2) / 2)}
          y={vertex.y + arcRadius * 1.5 * Math.sin((angle1 + angle2) / 2)}
          fill="rgb(239, 68, 68)"
          fontSize="14"
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {figure.labels.angles[0]}
        </text>
      )}
    </g>
  );
}

function renderLine(figure: GeometryFigure, index: number): React.ReactNode {
  if (!figure.points || figure.points.length < 2) return null;

  const [p1, p2] = figure.points;

  return (
    <g key={`line-${index}`}>
      <line
        x1={p1.x}
        y1={p1.y}
        x2={p2.x}
        y2={p2.y}
        stroke="rgb(59, 130, 246)"
        strokeWidth="2"
      />
      {figure.points.map((point, i) => renderPoint(point, `${index}-${i}`))}
      {figure.labels?.sides && figure.labels.sides[0] && (
        <text
          x={(p1.x + p2.x) / 2}
          y={(p1.y + p2.y) / 2 - 10}
          fill="rgb(59, 130, 246)"
          fontSize="14"
          fontWeight="bold"
          textAnchor="middle"
        >
          {figure.labels.sides[0]}
        </text>
      )}
    </g>
  );
}

function renderPolygon(figure: GeometryFigure, index: number): React.ReactNode {
  if (!figure.points || figure.points.length < 3) return null;

  const pathData = `M ${figure.points.map(p => `${p.x} ${p.y}`).join(' L ')} Z`;

  return (
    <g key={`polygon-${index}`}>
      <path
        d={pathData}
        fill="rgba(245, 158, 11, 0.1)"
        stroke="rgb(245, 158, 11)"
        strokeWidth="2"
      />
      {figure.points.map((point, i) => renderPoint(point, `${index}-${i}`))}
    </g>
  );
}

function renderPoint(point: Point, key: string): React.ReactNode {
  return (
    <g key={`point-${key}`}>
      <circle
        cx={point.x}
        cy={point.y}
        r="3"
        fill="rgb(17, 24, 39)"
        className="dark:fill-white"
      />
      {point.label && (
        <text
          x={point.x}
          y={point.y - 10}
          fill="rgb(17, 24, 39)"
          className="dark:fill-white"
          fontSize="14"
          fontWeight="bold"
          textAnchor="middle"
        >
          {point.label}
        </text>
      )}
    </g>
  );
}

function renderSideLabels(points: Point[], labels?: string[]): React.ReactNode {
  if (!labels || labels.length === 0) return null;

  return points.map((point, i) => {
    const nextPoint = points[(i + 1) % points.length];
    const midX = (point.x + nextPoint.x) / 2;
    const midY = (point.y + nextPoint.y) / 2;
    const label = labels[i];

    if (!label) return null;

    return (
      <text
        key={`label-${i}`}
        x={midX}
        y={midY - 10}
        fill="rgb(59, 130, 246)"
        fontSize="14"
        fontWeight="bold"
        textAnchor="middle"
      >
        {label}
      </text>
    );
  });
}

function renderRectangleLabels(p1: Point, p2: Point, labels?: string[]): React.ReactNode {
  if (!labels || labels.length < 2) return null;

  const width = Math.abs(p2.x - p1.x);
  const height = Math.abs(p2.y - p1.y);
  const minX = Math.min(p1.x, p2.x);
  const minY = Math.min(p1.y, p2.y);

  return (
    <>
      <text
        x={minX + width / 2}
        y={minY - 10}
        fill="rgb(34, 197, 94)"
        fontSize="14"
        fontWeight="bold"
        textAnchor="middle"
      >
        {labels[0]}
      </text>
      <text
        x={minX - 15}
        y={minY + height / 2}
        fill="rgb(34, 197, 94)"
        fontSize="14"
        fontWeight="bold"
        textAnchor="middle"
      >
        {labels[1]}
      </text>
    </>
  );
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ');
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}
