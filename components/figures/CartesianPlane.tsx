'use client';

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { CartesianPlaneProps } from '@/lib/types/vector';
import {
  calculateSVGOrigin,
  calculateScale,
  validateRanges,
} from '@/lib/geometry/vectorUtils';
import {
  Grid,
  Axes,
  OriginMarker,
  DEFAULT_COLORS,
  DEFAULT_COORDS,
} from './vector';

/**
 * CartesianPlane - A reusable coordinate system component
 *
 * Renders a Cartesian coordinate plane with configurable axes, grid, and tick marks.
 * Can host child components (like VectorFigure with standalone={false}) for embedding
 * geometric figures on the plane.
 *
 * @example
 * // Basic usage
 * <CartesianPlane xRange={[-5, 5]} yRange={[-5, 5]} />
 *
 * @example
 * // With embedded VectorFigure
 * <CartesianPlane xRange={[-5, 5]} yRange={[-5, 5]}>
 *   <VectorFigure standalone={false} vectors={[{ to: { x: 3, y: 2 } }]} />
 * </CartesianPlane>
 */
export function CartesianPlane({
  xRange,
  yRange,
  scale: scaleProp,
  showAxes = true,
  axisColor = DEFAULT_COLORS.axis,
  axisWidth,
  showTicks = true,
  tickSize,
  tickInterval = 1,
  showAxisLabels = true,
  xAxisLabel = 'x',
  yAxisLabel = 'y',
  showGrid = true,
  gridColor = DEFAULT_COLORS.grid,
  majorGridInterval = 1,
  minorGridInterval,
  showOrigin = true,
  originLabel = 'O',
  width = DEFAULT_COORDS.width,
  height = DEFAULT_COORDS.height,
  padding = DEFAULT_COORDS.padding,
  children,
  ariaLabel = 'Plano cartesiano',
  className,
}: CartesianPlaneProps) {
  // Validate ranges
  const validation = validateRanges(xRange, yRange);
  if (!validation.valid) {
    console.warn('CartesianPlane:', validation.error);
  }

  // Calculate scale and origin
  const calculatedScale = useMemo(() => {
    if (scaleProp) return scaleProp;
    return calculateScale(xRange, yRange, width, height, padding);
  }, [scaleProp, xRange, yRange, width, height, padding]);

  const svgOrigin = useMemo(() => {
    return calculateSVGOrigin(xRange, yRange, width, height, padding);
  }, [xRange, yRange, width, height, padding]);

  // Calculate viewBox based on ranges and scale
  const viewBox = useMemo(() => {
    const xSpan = xRange[1] - xRange[0];
    const ySpan = yRange[1] - yRange[0];
    const svgWidth = xSpan * calculatedScale + 2 * padding;
    const svgHeight = ySpan * calculatedScale + 2 * padding;
    return `0 0 ${svgWidth} ${svgHeight}`;
  }, [xRange, yRange, calculatedScale, padding]);

  // Provide coordinate system context to children
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // Pass coordinate system props to children
      return React.cloneElement(child as React.ReactElement<{
        _originX?: number;
        _originY?: number;
        _scale?: number;
        _xRange?: [number, number];
        _yRange?: [number, number];
      }>, {
        _originX: svgOrigin.x,
        _originY: svgOrigin.y,
        _scale: calculatedScale,
        _xRange: xRange,
        _yRange: yRange,
      });
    }
    return child;
  });

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      className={cn('max-w-full', className)}
      role="img"
      aria-label={ariaLabel}
    >
      <title>{ariaLabel}</title>

      {/* Grid */}
      {showGrid && (
        <>
          {/* Minor grid (if specified) */}
          {minorGridInterval && minorGridInterval < majorGridInterval && (
            <Grid
              xRange={xRange}
              yRange={yRange}
              originX={svgOrigin.x}
              originY={svgOrigin.y}
              scale={calculatedScale}
              spacing={minorGridInterval}
              color={gridColor}
            />
          )}
          {/* Major grid */}
          <Grid
            xRange={xRange}
            yRange={yRange}
            originX={svgOrigin.x}
            originY={svgOrigin.y}
            scale={calculatedScale}
            spacing={majorGridInterval}
            color={DEFAULT_COLORS.gridMajor}
          />
        </>
      )}

      {/* Axes */}
      {showAxes && (
        <Axes
          xRange={xRange}
          yRange={yRange}
          originX={svgOrigin.x}
          originY={svgOrigin.y}
          scale={calculatedScale}
          color={axisColor}
          showTicks={showTicks}
          showLabels={showAxisLabels}
          tickInterval={tickInterval}
          xLabel={xAxisLabel}
          yLabel={yAxisLabel}
        />
      )}

      {/* Origin label */}
      {showOrigin && (
        <OriginMarker
          x={svgOrigin.x}
          y={svgOrigin.y}
          label={originLabel}
        />
      )}

      {/* Children (embedded figures) */}
      {childrenWithProps}
    </svg>
  );
}
