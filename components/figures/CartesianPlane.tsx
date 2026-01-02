'use client';

import React, { useMemo, createContext, useContext } from 'react';
import type {
  CartesianPlaneProps,
  CartesianPlaneContextValue,
  AxisRange,
  CartesianPointConfig,
  CartesianSegmentConfig,
} from '@/lib/types/cartesian';
import type { LabeledPoint } from '@/lib/types/triangle';
import {
  createMathToSvgTransform,
  createSvgToMathTransform,
  calculateDimensions,
  generateTicks,
  arrowHeadPath,
} from '@/lib/geometry/cartesianUtils';
import { TriangleFigure } from './TriangleFigure';

// Default colors following the design system
const DEFAULT_COLORS = {
  axis: 'rgb(55, 65, 81)', // gray-700
  grid: 'rgb(229, 231, 235)', // gray-200
  origin: 'rgb(239, 68, 68)', // red-500
  label: 'rgb(107, 114, 128)', // gray-500
  point: 'rgb(59, 130, 246)', // blue-500
  segment: 'rgb(34, 197, 94)', // green-500
};

// Context for coordinate transformation
const CartesianPlaneContext = createContext<CartesianPlaneContextValue | null>(
  null
);

/**
 * Hook to access CartesianPlane context
 * Useful for custom figure components that need to transform coordinates
 */
export function useCartesianPlane() {
  const context = useContext(CartesianPlaneContext);
  if (!context) {
    throw new Error('useCartesianPlane must be used within a CartesianPlane');
  }
  return context;
}

/**
 * CartesianPlane - A Cartesian coordinate system visualization component
 *
 * Features:
 * - Configurable X and Y axis ranges
 * - Grid background
 * - Axes with arrows and labels
 * - Tick marks with numbers
 * - Origin marker
 * - Transforms child figures from math coordinates to SVG coordinates
 * - Dark mode support
 */
export function CartesianPlane({
  xRange,
  yRange,
  scale = 40,
  width: widthProp,
  height: heightProp,
  showAxes = true,
  showGrid = true,
  showLabels = true,
  showOrigin = true,
  axisColor = DEFAULT_COLORS.axis,
  gridColor = DEFAULT_COLORS.grid,
  arrowSize = 8,
  padding = 20,
  children,
  className = '',
  ariaLabel,
}: CartesianPlaneProps) {
  // Calculate dimensions
  const dimensions = calculateDimensions(xRange, yRange, scale, padding);
  const width = widthProp ?? dimensions.width;
  const height = heightProp ?? dimensions.height;

  // Coordinate transformation functions
  const toSvgCoords = useMemo(
    () => createMathToSvgTransform(xRange, yRange, scale, padding),
    [xRange, yRange, scale, padding]
  );

  const toMathCoords = useMemo(
    () => createSvgToMathTransform(xRange, yRange, scale, padding),
    [xRange, yRange, scale, padding]
  );

  // Context value
  const contextValue: CartesianPlaneContextValue = useMemo(
    () => ({
      toSvgCoords,
      toMathCoords,
      scale,
      xRange,
      yRange,
    }),
    [toSvgCoords, toMathCoords, scale, xRange, yRange]
  );

  // Transform children's coordinates
  const transformedChildren = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      // Handle TriangleFigure
      const childElement = child as React.ReactElement<{
        vertices?: [LabeledPoint, LabeledPoint, LabeledPoint];
        standalone?: boolean;
      }>;

      if (child.type === TriangleFigure && childElement.props.vertices) {
        const transformedVertices = childElement.props.vertices.map(
          (v: LabeledPoint): LabeledPoint => {
            const svgCoords = toSvgCoords(v.x, v.y);
            return {
              ...v,
              x: svgCoords.x,
              y: svgCoords.y,
            };
          }
        ) as [LabeledPoint, LabeledPoint, LabeledPoint];

        return React.cloneElement(childElement, {
          vertices: transformedVertices,
          standalone: false,
        });
      }

      return child;
    });
  }, [children, toSvgCoords]);

  // Calculate axis positions in SVG coords
  const origin = toSvgCoords(0, 0);

  // Clamp axis positions to stay within visible area
  const xAxisY = Math.min(Math.max(origin.y, padding), height - padding);
  const yAxisX = Math.min(Math.max(origin.x, padding), width - padding);

  // Check if origin is visible
  const originVisible =
    xRange[0] <= 0 && xRange[1] >= 0 && yRange[0] <= 0 && yRange[1] >= 0;

  return (
    <CartesianPlaneContext.Provider value={contextValue}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className={className}
        role="img"
        aria-label={ariaLabel || 'Plano cartesiano'}
      >
        <title>{ariaLabel || 'Plano cartesiano'}</title>

        {/* Background grid */}
        {showGrid && (
          <CartesianGrid
            xRange={xRange}
            yRange={yRange}
            scale={scale}
            padding={padding}
            toSvgCoords={toSvgCoords}
            gridColor={gridColor}
          />
        )}

        {/* Axes */}
        {showAxes && (
          <CartesianAxes
            width={width}
            height={height}
            padding={padding}
            xAxisY={xAxisY}
            yAxisX={yAxisX}
            axisColor={axisColor}
            arrowSize={arrowSize}
            showLabels={showLabels}
          />
        )}

        {/* Tick marks and numbers */}
        {showLabels && showAxes && (
          <CartesianTicks
            xRange={xRange}
            yRange={yRange}
            scale={scale}
            padding={padding}
            xAxisY={xAxisY}
            yAxisX={yAxisX}
            toSvgCoords={toSvgCoords}
          />
        )}

        {/* Origin marker */}
        {showOrigin && originVisible && (
          <circle
            cx={origin.x}
            cy={origin.y}
            r={4}
            fill={DEFAULT_COLORS.origin}
            className="dark:fill-red-400"
          />
        )}

        {/* Transformed children */}
        {transformedChildren}
      </svg>
    </CartesianPlaneContext.Provider>
  );
}

// ============================================================================
// Sub-components
// ============================================================================

interface CartesianGridProps {
  xRange: AxisRange;
  yRange: AxisRange;
  scale: number;
  padding: number;
  toSvgCoords: (x: number, y: number) => { x: number; y: number };
  gridColor: string;
}

function CartesianGrid({
  xRange,
  yRange,
  toSvgCoords,
  gridColor,
}: CartesianGridProps) {
  const xTicks = generateTicks(xRange);
  const yTicks = generateTicks(yRange);

  // Get SVG bounds for grid lines
  const topLeft = toSvgCoords(xRange[0], yRange[1]);
  const bottomRight = toSvgCoords(xRange[1], yRange[0]);

  return (
    <g className="grid">
      {/* Vertical lines */}
      {xTicks.map((x) => {
        const svgCoords = toSvgCoords(x, 0);
        return (
          <line
            key={`v-${x}`}
            x1={svgCoords.x}
            y1={topLeft.y}
            x2={svgCoords.x}
            y2={bottomRight.y}
            stroke={gridColor}
            strokeWidth="0.5"
            className="dark:stroke-gray-700"
          />
        );
      })}
      {/* Horizontal lines */}
      {yTicks.map((y) => {
        const svgCoords = toSvgCoords(0, y);
        return (
          <line
            key={`h-${y}`}
            x1={topLeft.x}
            y1={svgCoords.y}
            x2={bottomRight.x}
            y2={svgCoords.y}
            stroke={gridColor}
            strokeWidth="0.5"
            className="dark:stroke-gray-700"
          />
        );
      })}
    </g>
  );
}

interface CartesianAxesProps {
  width: number;
  height: number;
  padding: number;
  xAxisY: number;
  yAxisX: number;
  axisColor: string;
  arrowSize: number;
  showLabels: boolean;
}

function CartesianAxes({
  width,
  height,
  padding,
  xAxisY,
  yAxisX,
  axisColor,
  arrowSize,
  showLabels,
}: CartesianAxesProps) {
  return (
    <g className="axes">
      {/* X-axis line */}
      <line
        x1={padding}
        y1={xAxisY}
        x2={width - padding}
        y2={xAxisY}
        stroke={axisColor}
        strokeWidth="1.5"
        className="dark:stroke-gray-400"
      />
      {/* X-axis arrow */}
      <path
        d={arrowHeadPath(width - padding, xAxisY, arrowSize, 'right')}
        fill={axisColor}
        className="dark:fill-gray-400"
      />

      {/* Y-axis line */}
      <line
        x1={yAxisX}
        y1={height - padding}
        x2={yAxisX}
        y2={padding}
        stroke={axisColor}
        strokeWidth="1.5"
        className="dark:stroke-gray-400"
      />
      {/* Y-axis arrow */}
      <path
        d={arrowHeadPath(yAxisX, padding, arrowSize, 'up')}
        fill={axisColor}
        className="dark:fill-gray-400"
      />

      {/* Axis labels */}
      {showLabels && (
        <>
          <text
            x={width - padding + 12}
            y={xAxisY + 4}
            fill={DEFAULT_COLORS.label}
            fontSize="14"
            fontStyle="italic"
            className="dark:fill-gray-400"
          >
            x
          </text>
          <text
            x={yAxisX + 8}
            y={padding - 8}
            fill={DEFAULT_COLORS.label}
            fontSize="14"
            fontStyle="italic"
            className="dark:fill-gray-400"
          >
            y
          </text>
        </>
      )}
    </g>
  );
}

interface CartesianTicksProps {
  xRange: AxisRange;
  yRange: AxisRange;
  scale: number;
  padding: number;
  xAxisY: number;
  yAxisX: number;
  toSvgCoords: (x: number, y: number) => { x: number; y: number };
}

function CartesianTicks({
  xRange,
  yRange,
  xAxisY,
  yAxisX,
  toSvgCoords,
}: CartesianTicksProps) {
  const xTicks = generateTicks(xRange);
  const yTicks = generateTicks(yRange);
  const tickSize = 4;

  return (
    <g className="ticks">
      {/* X-axis ticks and numbers */}
      {xTicks.map((x) => {
        if (x === 0) return null; // Skip origin tick
        const svgCoords = toSvgCoords(x, 0);
        return (
          <g key={`x-tick-${x}`}>
            <line
              x1={svgCoords.x}
              y1={xAxisY - tickSize}
              x2={svgCoords.x}
              y2={xAxisY + tickSize}
              stroke={DEFAULT_COLORS.axis}
              strokeWidth="1"
              className="dark:stroke-gray-400"
            />
            <text
              x={svgCoords.x}
              y={xAxisY + 16}
              fill={DEFAULT_COLORS.label}
              fontSize="11"
              textAnchor="middle"
              className="dark:fill-gray-400"
            >
              {x}
            </text>
          </g>
        );
      })}

      {/* Y-axis ticks and numbers */}
      {yTicks.map((y) => {
        if (y === 0) return null; // Skip origin tick
        const svgCoords = toSvgCoords(0, y);
        return (
          <g key={`y-tick-${y}`}>
            <line
              x1={yAxisX - tickSize}
              y1={svgCoords.y}
              x2={yAxisX + tickSize}
              y2={svgCoords.y}
              stroke={DEFAULT_COLORS.axis}
              strokeWidth="1"
              className="dark:stroke-gray-400"
            />
            <text
              x={yAxisX - 10}
              y={svgCoords.y + 4}
              fill={DEFAULT_COLORS.label}
              fontSize="11"
              textAnchor="end"
              className="dark:fill-gray-400"
            >
              {y}
            </text>
          </g>
        );
      })}
    </g>
  );
}

// ============================================================================
// Cartesian Element Components (use within CartesianPlane)
// ============================================================================

interface CartesianPointProps extends Omit<CartesianPointConfig, 'id'> {
  id?: string;
}

/**
 * CartesianPoint - Renders a point in the Cartesian plane
 * Must be used within a CartesianPlane component
 */
export function CartesianPoint({
  x,
  y,
  label,
  color = DEFAULT_COLORS.point,
  radius = 5,
}: CartesianPointProps) {
  const { toSvgCoords } = useCartesianPlane();
  const svg = toSvgCoords(x, y);

  return (
    <g className="cartesian-point">
      <circle
        cx={svg.x}
        cy={svg.y}
        r={radius}
        fill={color}
        className="dark:fill-blue-400"
      />
      {label && (
        <text
          x={svg.x + radius + 4}
          y={svg.y - radius - 2}
          fill={color}
          fontSize="12"
          fontWeight="bold"
          className="dark:fill-blue-400"
        >
          {label}
        </text>
      )}
    </g>
  );
}

interface CartesianSegmentProps extends Omit<CartesianSegmentConfig, 'id'> {
  id?: string;
}

/**
 * CartesianSegment - Renders a line segment in the Cartesian plane
 * Must be used within a CartesianPlane component
 */
export function CartesianSegment({
  p1,
  p2,
  label,
  color = DEFAULT_COLORS.segment,
  strokeWidth = 2,
  strokeStyle = 'solid',
  arrow = 'none',
}: CartesianSegmentProps) {
  const { toSvgCoords } = useCartesianPlane();
  const svg1 = toSvgCoords(p1.x, p1.y);
  const svg2 = toSvgCoords(p2.x, p2.y);

  const dashArray =
    strokeStyle === 'dashed' ? '8,4' : strokeStyle === 'dotted' ? '2,2' : 'none';

  // Calculate midpoint for label
  const midX = (svg1.x + svg2.x) / 2;
  const midY = (svg1.y + svg2.y) / 2;

  // Calculate arrow angle and helper function
  const angle = Math.atan2(svg2.y - svg1.y, svg2.x - svg1.x);
  const arrowSize = 8;

  const arrowHeadPoints = (tipX: number, tipY: number, arrowAngle: number) => {
    const x1 = tipX - arrowSize * Math.cos(arrowAngle - Math.PI / 6);
    const y1 = tipY - arrowSize * Math.sin(arrowAngle - Math.PI / 6);
    const x2 = tipX - arrowSize * Math.cos(arrowAngle + Math.PI / 6);
    const y2 = tipY - arrowSize * Math.sin(arrowAngle + Math.PI / 6);
    return `${tipX},${tipY} ${x1},${y1} ${x2},${y2}`;
  };

  return (
    <g className="cartesian-segment">
      <line
        x1={svg1.x}
        y1={svg1.y}
        x2={svg2.x}
        y2={svg2.y}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        className="dark:stroke-green-400"
      />
      {(arrow === 'end' || arrow === 'both') && (
        <polygon
          points={arrowHeadPoints(svg2.x, svg2.y, angle)}
          fill={color}
          className="dark:fill-green-400"
        />
      )}
      {(arrow === 'start' || arrow === 'both') && (
        <polygon
          points={arrowHeadPoints(svg1.x, svg1.y, angle + Math.PI)}
          fill={color}
          className="dark:fill-green-400"
        />
      )}
      {label && (
        <text
          x={midX + 8}
          y={midY - 8}
          fill={color}
          fontSize="11"
          fontWeight="600"
          className="dark:fill-green-400"
        >
          {label}
        </text>
      )}
    </g>
  );
}

export default CartesianPlane;
