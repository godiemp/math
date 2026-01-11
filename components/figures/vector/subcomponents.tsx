'use client';

import React from 'react';
import type { LabeledPoint, VectorConfig, VectorComponentConfig } from '@/lib/types/vector';
import {
  vec2Magnitude,
  vec2Angle,
  vec2Subtract,
  describeFilledArrowhead,
  calculateVectorLabelPosition,
  calculatePointLabelPosition,
  getStrokeDashArray,
  mathToSVG,
} from '@/lib/geometry/vectorUtils';
import { DEFAULT_COLORS, DEFAULT_STYLES } from './constants';

// ============================================================
// Grid and Axes
// ============================================================

interface GridProps {
  xRange: [number, number];
  yRange: [number, number];
  originX: number;
  originY: number;
  scale: number;
  spacing?: number;
  color?: string;
}

export function Grid({
  xRange,
  yRange,
  originX,
  originY,
  scale,
  spacing = 1,
  color = DEFAULT_COLORS.grid,
}: GridProps) {
  const lines: React.ReactElement[] = [];

  // Vertical lines
  for (let x = Math.ceil(xRange[0] / spacing) * spacing; x <= xRange[1]; x += spacing) {
    const svgX = originX + x * scale;
    const svgY1 = originY - yRange[1] * scale;
    const svgY2 = originY - yRange[0] * scale;
    const isOrigin = x === 0;

    lines.push(
      <line
        key={`v-${x}`}
        x1={svgX}
        y1={svgY1}
        x2={svgX}
        y2={svgY2}
        stroke={color}
        strokeWidth={isOrigin ? 0 : DEFAULT_STYLES.gridWidth}
        className="dark:stroke-gray-700"
      />
    );
  }

  // Horizontal lines
  for (let y = Math.ceil(yRange[0] / spacing) * spacing; y <= yRange[1]; y += spacing) {
    const svgY = originY - y * scale;
    const svgX1 = originX + xRange[0] * scale;
    const svgX2 = originX + xRange[1] * scale;
    const isOrigin = y === 0;

    lines.push(
      <line
        key={`h-${y}`}
        x1={svgX1}
        y1={svgY}
        x2={svgX2}
        y2={svgY}
        stroke={color}
        strokeWidth={isOrigin ? 0 : DEFAULT_STYLES.gridWidth}
        className="dark:stroke-gray-700"
      />
    );
  }

  return <g>{lines}</g>;
}

interface AxesProps {
  xRange: [number, number];
  yRange: [number, number];
  originX: number;
  originY: number;
  scale: number;
  color?: string;
  showTicks?: boolean;
  showLabels?: boolean;
  tickInterval?: number;
  xLabel?: string;
  yLabel?: string;
}

export function Axes({
  xRange,
  yRange,
  originX,
  originY,
  scale,
  color = DEFAULT_COLORS.axis,
  showTicks = true,
  showLabels = true,
  tickInterval = 1,
  xLabel = 'x',
  yLabel = 'y',
}: AxesProps) {
  const arrowSize = 8;
  const tickSize = DEFAULT_STYLES.tickSize;

  // SVG coordinates for axis endpoints
  const xAxisStart = originX + xRange[0] * scale;
  const xAxisEnd = originX + xRange[1] * scale;
  const yAxisStart = originY - yRange[0] * scale;
  const yAxisEnd = originY - yRange[1] * scale;

  // Arrows at axis ends
  const xArrowPath = describeFilledArrowhead(xAxisEnd, originY, 0, arrowSize);
  const yArrowPath = describeFilledArrowhead(originX, yAxisEnd, -90, arrowSize);

  const ticks: React.ReactElement[] = [];
  const labels: React.ReactElement[] = [];

  if (showTicks || showLabels) {
    // X-axis ticks and labels
    for (let x = Math.ceil(xRange[0] / tickInterval) * tickInterval; x <= xRange[1]; x += tickInterval) {
      if (x === 0) continue; // Skip origin
      const svgX = originX + x * scale;

      if (showTicks) {
        ticks.push(
          <line
            key={`tick-x-${x}`}
            x1={svgX}
            y1={originY - tickSize / 2}
            x2={svgX}
            y2={originY + tickSize / 2}
            stroke={color}
            strokeWidth={1}
            className="dark:stroke-white"
          />
        );
      }

      if (showLabels) {
        labels.push(
          <text
            key={`label-x-${x}`}
            x={svgX}
            y={originY + tickSize + 12}
            fill={DEFAULT_COLORS.axisLabel}
            fontSize={DEFAULT_STYLES.axisLabelFontSize}
            textAnchor="middle"
            className="dark:fill-gray-400"
          >
            {x}
          </text>
        );
      }
    }

    // Y-axis ticks and labels
    for (let y = Math.ceil(yRange[0] / tickInterval) * tickInterval; y <= yRange[1]; y += tickInterval) {
      if (y === 0) continue; // Skip origin
      const svgY = originY - y * scale;

      if (showTicks) {
        ticks.push(
          <line
            key={`tick-y-${y}`}
            x1={originX - tickSize / 2}
            y1={svgY}
            x2={originX + tickSize / 2}
            y2={svgY}
            stroke={color}
            strokeWidth={1}
            className="dark:stroke-white"
          />
        );
      }

      if (showLabels) {
        labels.push(
          <text
            key={`label-y-${y}`}
            x={originX - tickSize - 8}
            y={svgY + 4}
            fill={DEFAULT_COLORS.axisLabel}
            fontSize={DEFAULT_STYLES.axisLabelFontSize}
            textAnchor="end"
            className="dark:fill-gray-400"
          >
            {y}
          </text>
        );
      }
    }
  }

  return (
    <g>
      {/* X-axis */}
      <line
        x1={xAxisStart}
        y1={originY}
        x2={xAxisEnd - arrowSize}
        y2={originY}
        stroke={color}
        strokeWidth={DEFAULT_STYLES.axisWidth}
        className="dark:stroke-white"
      />
      <path d={xArrowPath} fill={color} className="dark:fill-white" />

      {/* Y-axis */}
      <line
        x1={originX}
        y1={yAxisStart}
        x2={originX}
        y2={yAxisEnd + arrowSize}
        stroke={color}
        strokeWidth={DEFAULT_STYLES.axisWidth}
        className="dark:stroke-white"
      />
      <path d={yArrowPath} fill={color} className="dark:fill-white" />

      {/* Ticks */}
      {ticks}

      {/* Labels */}
      {labels}

      {/* Axis labels */}
      {xLabel && (
        <text
          x={xAxisEnd + 5}
          y={originY + 4}
          fill={color}
          fontSize={DEFAULT_STYLES.labelFontSize}
          fontStyle="italic"
          className="dark:fill-white"
        >
          {xLabel}
        </text>
      )}
      {yLabel && (
        <text
          x={originX + 8}
          y={yAxisEnd - 5}
          fill={color}
          fontSize={DEFAULT_STYLES.labelFontSize}
          fontStyle="italic"
          className="dark:fill-white"
        >
          {yLabel}
        </text>
      )}
    </g>
  );
}

// ============================================================
// Origin Marker
// ============================================================

interface OriginMarkerProps {
  x: number;
  y: number;
  label?: string;
  color?: string;
}

export function OriginMarker({
  x,
  y,
  label = 'O',
  color = DEFAULT_COLORS.label,
}: OriginMarkerProps) {
  return (
    <text
      x={x - 12}
      y={y + 16}
      fill={color}
      fontSize={DEFAULT_STYLES.labelFontSize}
      fontWeight="bold"
      className="dark:fill-white"
    >
      {label}
    </text>
  );
}

// ============================================================
// Point
// ============================================================

interface PointProps {
  point: LabeledPoint;
  originX: number;
  originY: number;
  scale: number;
  color?: string;
  radius?: number;
  draggable?: boolean;
  isDragging?: boolean;
  onPointerDown?: (e: React.PointerEvent) => void;
}

export function Point({
  point,
  originX,
  originY,
  scale,
  color = DEFAULT_COLORS.point,
  radius = DEFAULT_STYLES.pointRadius,
  draggable = false,
  isDragging = false,
  onPointerDown,
}: PointProps) {
  const svgPoint = mathToSVG(point, originX, originY, scale);
  const effectiveRadius = draggable
    ? isDragging
      ? DEFAULT_STYLES.pointRadiusDraggable + 2
      : DEFAULT_STYLES.pointRadiusDraggable
    : radius;
  const effectiveColor = isDragging ? DEFAULT_COLORS.dragging : color;

  return (
    <g>
      <circle
        cx={svgPoint.x}
        cy={svgPoint.y}
        r={effectiveRadius}
        fill={effectiveColor}
        stroke="white"
        strokeWidth={2}
        style={{
          cursor: draggable ? (isDragging ? 'grabbing' : 'grab') : 'default',
          transition: 'fill 0.15s, r 0.15s',
        }}
        onPointerDown={onPointerDown}
        className="dark:stroke-gray-900"
      />
    </g>
  );
}

interface PointLabelProps {
  point: LabeledPoint;
  originX: number;
  originY: number;
  scale: number;
  color?: string;
}

export function PointLabel({
  point,
  originX,
  originY,
  scale,
  color = DEFAULT_COLORS.label,
}: PointLabelProps) {
  if (!point.label) return null;

  const svgPoint = mathToSVG(point, originX, originY, scale);
  const labelPos = calculatePointLabelPosition(svgPoint, 15);

  return (
    <text
      x={labelPos.x}
      y={labelPos.y}
      fill={color}
      fontSize={DEFAULT_STYLES.labelFontSize}
      fontWeight="bold"
      textAnchor="middle"
      dominantBaseline="middle"
      className="dark:fill-white"
    >
      {point.label}
    </text>
  );
}

// ============================================================
// Vector Arrow
// ============================================================

interface VectorArrowProps {
  config: VectorConfig;
  originX: number;
  originY: number;
  scale: number;
  draggable?: boolean;
  isDragging?: boolean;
  onPointerDown?: (e: React.PointerEvent) => void;
}

export function VectorArrow({
  config,
  originX,
  originY,
  scale,
  draggable = false,
  isDragging = false,
  onPointerDown,
}: VectorArrowProps) {
  const from = config.from || { x: 0, y: 0 };
  const svgFrom = mathToSVG(from, originX, originY, scale);
  const svgTo = mathToSVG(config.to, originX, originY, scale);

  const dx = svgTo.x - svgFrom.x;
  const dy = svgTo.y - svgFrom.y;
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  const arrowSize = config.arrowSize || DEFAULT_STYLES.arrowSize;
  const strokeWidth = config.strokeWidth || DEFAULT_STYLES.strokeWidth;
  const color = isDragging ? DEFAULT_COLORS.dragging : (config.color || DEFAULT_COLORS.vector);
  const dashArray = getStrokeDashArray(config.strokeStyle);

  const arrowPath = describeFilledArrowhead(svgTo.x, svgTo.y, angle, arrowSize);

  return (
    <g>
      {/* Vector line */}
      <line
        x1={svgFrom.x}
        y1={svgFrom.y}
        x2={svgTo.x}
        y2={svgTo.y}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        strokeLinecap="round"
        className="dark:stroke-blue-400"
      />
      {/* Arrowhead */}
      <path
        d={arrowPath}
        fill={color}
        className="dark:fill-blue-400"
      />
      {/* Draggable endpoint */}
      {draggable && (
        <circle
          cx={svgTo.x}
          cy={svgTo.y}
          r={isDragging ? DEFAULT_STYLES.pointRadiusDraggable + 2 : DEFAULT_STYLES.pointRadiusDraggable}
          fill={isDragging ? DEFAULT_COLORS.dragging : color}
          stroke="white"
          strokeWidth={2}
          style={{
            cursor: isDragging ? 'grabbing' : 'grab',
            transition: 'fill 0.15s, r 0.15s',
          }}
          onPointerDown={onPointerDown}
          className="dark:stroke-gray-900"
        />
      )}
    </g>
  );
}

interface VectorLabelProps {
  config: VectorConfig;
  originX: number;
  originY: number;
  scale: number;
}

export function VectorLabel({
  config,
  originX,
  originY,
  scale,
}: VectorLabelProps) {
  if (!config.label && !config.showMagnitude && !config.showAngle) return null;

  const from = config.from || { x: 0, y: 0 };
  const svgFrom = mathToSVG(from, originX, originY, scale);
  const svgTo = mathToSVG(config.to, originX, originY, scale);

  const position = config.labelPosition || 'middle';
  const labelOffset = config.labelOffset || { x: 0, y: 0 };
  const labelPos = calculateVectorLabelPosition(svgFrom, svgTo, position, 18);

  const color = config.color || DEFAULT_COLORS.vector;

  // Build label text
  let labelText = config.label || '';

  if (config.showMagnitude) {
    const vector = vec2Subtract(config.to, from);
    const mag = vec2Magnitude(vector);
    if (labelText) labelText += ' ';
    labelText += `|${config.label || 'v'}| = ${mag.toFixed(2)}`;
  }

  if (config.showAngle) {
    const vector = vec2Subtract(config.to, from);
    const angleDeg = vec2Angle(vector);
    if (labelText) labelText += ', ';
    labelText += `θ = ${angleDeg.toFixed(1)}°`;
  }

  if (!labelText) return null;

  return (
    <text
      x={labelPos.x + labelOffset.x}
      y={labelPos.y + labelOffset.y}
      fill={color}
      fontSize={DEFAULT_STYLES.labelFontSize}
      fontWeight="bold"
      fontStyle="italic"
      textAnchor="middle"
      dominantBaseline="middle"
      className="dark:fill-blue-300"
    >
      {labelText}
    </text>
  );
}

// ============================================================
// Vector Components (Projections)
// ============================================================

interface VectorComponentsProps {
  vector: VectorConfig;
  config: VectorComponentConfig;
  originX: number;
  originY: number;
  scale: number;
}

export function VectorComponents({
  vector,
  config,
  originX,
  originY,
  scale,
}: VectorComponentsProps) {
  const from = vector.from || { x: 0, y: 0 };
  const to = vector.to;

  const svgFrom = mathToSVG(from, originX, originY, scale);
  const svgTo = mathToSVG(to, originX, originY, scale);

  // Component endpoints in SVG coords
  const svgXEnd = mathToSVG({ x: to.x, y: from.y }, originX, originY, scale);
  const svgYEnd = mathToSVG({ x: from.x, y: to.y }, originX, originY, scale);

  const componentColor = config.color || DEFAULT_COLORS.component;

  return (
    <g>
      {/* X component (horizontal) */}
      {config.showX !== false && (
        <g>
          <line
            x1={svgFrom.x}
            y1={svgFrom.y}
            x2={svgXEnd.x}
            y2={svgXEnd.y}
            stroke={DEFAULT_COLORS.componentX}
            strokeWidth={1.5}
            strokeDasharray="4,3"
            className="dark:stroke-red-400"
          />
          {/* Vertical line from x-component end to vector tip */}
          <line
            x1={svgXEnd.x}
            y1={svgXEnd.y}
            x2={svgTo.x}
            y2={svgTo.y}
            stroke={componentColor}
            strokeWidth={1}
            strokeDasharray="2,2"
            className="dark:stroke-gray-500"
          />
          {config.xLabel && (
            <text
              x={(svgFrom.x + svgXEnd.x) / 2}
              y={svgFrom.y + 16}
              fill={DEFAULT_COLORS.componentX}
              fontSize={DEFAULT_STYLES.axisLabelFontSize}
              textAnchor="middle"
              className="dark:fill-red-400"
            >
              {config.xLabel}
            </text>
          )}
        </g>
      )}

      {/* Y component (vertical) */}
      {config.showY !== false && (
        <g>
          <line
            x1={svgFrom.x}
            y1={svgFrom.y}
            x2={svgYEnd.x}
            y2={svgYEnd.y}
            stroke={DEFAULT_COLORS.componentY}
            strokeWidth={1.5}
            strokeDasharray="4,3"
            className="dark:stroke-emerald-400"
          />
          {/* Horizontal line from y-component end to vector tip */}
          <line
            x1={svgYEnd.x}
            y1={svgYEnd.y}
            x2={svgTo.x}
            y2={svgTo.y}
            stroke={componentColor}
            strokeWidth={1}
            strokeDasharray="2,2"
            className="dark:stroke-gray-500"
          />
          {config.yLabel && (
            <text
              x={svgFrom.x - 16}
              y={(svgFrom.y + svgYEnd.y) / 2}
              fill={DEFAULT_COLORS.componentY}
              fontSize={DEFAULT_STYLES.axisLabelFontSize}
              textAnchor="end"
              className="dark:fill-emerald-400"
            >
              {config.yLabel}
            </text>
          )}
        </g>
      )}
    </g>
  );
}

// ============================================================
// Vector Addition
// ============================================================

interface VectorAdditionProps {
  vectors: VectorConfig[];
  indices: [number, number];
  method: 'parallelogram' | 'head-to-tail';
  showResultant?: boolean;
  resultantLabel?: string;
  resultantColor?: string;
  showConstruction?: boolean;
  constructionStyle?: 'dashed' | 'dotted';
  originX: number;
  originY: number;
  scale: number;
}

export function VectorAddition({
  vectors,
  indices,
  method,
  showResultant = true,
  resultantLabel = 'v + u',
  resultantColor = DEFAULT_COLORS.resultant,
  showConstruction = true,
  constructionStyle = 'dashed',
  originX,
  originY,
  scale,
}: VectorAdditionProps) {
  const v1 = vectors[indices[0]];
  const v2 = vectors[indices[1]];

  if (!v1 || !v2) return null;

  const v1From = v1.from || { x: 0, y: 0 };
  const v2From = v2.from || { x: 0, y: 0 };

  // Calculate resultant
  const v1Vector = vec2Subtract(v1.to, v1From);
  const v2Vector = vec2Subtract(v2.to, v2From);
  const resultantEnd = {
    x: v1From.x + v1Vector.x + v2Vector.x,
    y: v1From.y + v1Vector.y + v2Vector.y,
  };

  const dashArray = getStrokeDashArray(constructionStyle);

  // Convert to SVG coordinates
  const svgV1From = mathToSVG(v1From, originX, originY, scale);
  const svgV1To = mathToSVG(v1.to, originX, originY, scale);
  const svgV2To = mathToSVG(v2.to, originX, originY, scale);
  const svgResultantEnd = mathToSVG(resultantEnd, originX, originY, scale);

  if (method === 'head-to-tail') {
    // Head-to-tail: v2 starts at the end of v1
    const svgV2TranslatedStart = svgV1To;
    const svgV2TranslatedEnd = mathToSVG(
      { x: v1.to.x + v2Vector.x, y: v1.to.y + v2Vector.y },
      originX,
      originY,
      scale
    );

    return (
      <g>
        {/* Construction: translated v2 */}
        {showConstruction && (
          <g>
            <line
              x1={svgV2TranslatedStart.x}
              y1={svgV2TranslatedStart.y}
              x2={svgV2TranslatedEnd.x}
              y2={svgV2TranslatedEnd.y}
              stroke={v2.color || DEFAULT_COLORS.vectorSecondary}
              strokeWidth={1.5}
              strokeDasharray={dashArray}
              opacity={0.7}
              className="dark:stroke-emerald-400"
            />
            {/* Small arrowhead for translated vector */}
            <path
              d={describeFilledArrowhead(
                svgV2TranslatedEnd.x,
                svgV2TranslatedEnd.y,
                (Math.atan2(
                  svgV2TranslatedEnd.y - svgV2TranslatedStart.y,
                  svgV2TranslatedEnd.x - svgV2TranslatedStart.x
                ) * 180) / Math.PI,
                7
              )}
              fill={v2.color || DEFAULT_COLORS.vectorSecondary}
              opacity={0.7}
              className="dark:fill-emerald-400"
            />
          </g>
        )}

        {/* Resultant vector */}
        {showResultant && (
          <g>
            <line
              x1={svgV1From.x}
              y1={svgV1From.y}
              x2={svgResultantEnd.x}
              y2={svgResultantEnd.y}
              stroke={resultantColor}
              strokeWidth={2.5}
              className="dark:stroke-purple-400"
            />
            <path
              d={describeFilledArrowhead(
                svgResultantEnd.x,
                svgResultantEnd.y,
                (Math.atan2(
                  svgResultantEnd.y - svgV1From.y,
                  svgResultantEnd.x - svgV1From.x
                ) * 180) / Math.PI,
                12
              )}
              fill={resultantColor}
              className="dark:fill-purple-400"
            />
            {resultantLabel && (
              <text
                x={(svgV1From.x + svgResultantEnd.x) / 2 + 15}
                y={(svgV1From.y + svgResultantEnd.y) / 2}
                fill={resultantColor}
                fontSize={DEFAULT_STYLES.labelFontSize}
                fontWeight="bold"
                fontStyle="italic"
                className="dark:fill-purple-300"
              >
                {resultantLabel}
              </text>
            )}
          </g>
        )}
      </g>
    );
  }

  // Parallelogram method
  // Need to draw the parallelogram formed by v1 and v2
  const svgParallelV1End = mathToSVG(
    { x: v2.to.x + v1Vector.x, y: v2.to.y + v1Vector.y },
    originX,
    originY,
    scale
  );
  const svgParallelV2End = mathToSVG(
    { x: v1.to.x + v2Vector.x, y: v1.to.y + v2Vector.y },
    originX,
    originY,
    scale
  );

  return (
    <g>
      {/* Construction: parallelogram sides */}
      {showConstruction && (
        <g>
          {/* v1 parallel (from v2 tip) */}
          <line
            x1={svgV2To.x}
            y1={svgV2To.y}
            x2={svgParallelV1End.x}
            y2={svgParallelV1End.y}
            stroke={v1.color || DEFAULT_COLORS.vector}
            strokeWidth={1.5}
            strokeDasharray={dashArray}
            opacity={0.5}
            className="dark:stroke-blue-400"
          />
          {/* v2 parallel (from v1 tip) */}
          <line
            x1={svgV1To.x}
            y1={svgV1To.y}
            x2={svgParallelV2End.x}
            y2={svgParallelV2End.y}
            stroke={v2.color || DEFAULT_COLORS.vectorSecondary}
            strokeWidth={1.5}
            strokeDasharray={dashArray}
            opacity={0.5}
            className="dark:stroke-emerald-400"
          />
        </g>
      )}

      {/* Resultant (diagonal) */}
      {showResultant && (
        <g>
          <line
            x1={svgV1From.x}
            y1={svgV1From.y}
            x2={svgResultantEnd.x}
            y2={svgResultantEnd.y}
            stroke={resultantColor}
            strokeWidth={2.5}
            className="dark:stroke-purple-400"
          />
          <path
            d={describeFilledArrowhead(
              svgResultantEnd.x,
              svgResultantEnd.y,
              (Math.atan2(
                svgResultantEnd.y - svgV1From.y,
                svgResultantEnd.x - svgV1From.x
              ) * 180) / Math.PI,
              12
            )}
            fill={resultantColor}
            className="dark:fill-purple-400"
          />
          {resultantLabel && (
            <text
              x={(svgV1From.x + svgResultantEnd.x) / 2 + 15}
              y={(svgV1From.y + svgResultantEnd.y) / 2}
              fill={resultantColor}
              fontSize={DEFAULT_STYLES.labelFontSize}
              fontWeight="bold"
              fontStyle="italic"
              className="dark:fill-purple-300"
            >
              {resultantLabel}
            </text>
          )}
        </g>
      )}
    </g>
  );
}
