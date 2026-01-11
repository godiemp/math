'use client';

import React, { useState, useCallback, useMemo, useRef } from 'react';
import { cn } from '@/lib/utils';
import type {
  VectorFigureProps,
  VectorConfig,
  LabeledPoint,
} from '@/lib/types/vector';
import {
  calculateSVGOrigin,
  calculateScale,
  svgToMath,
  validateVector,
} from '@/lib/geometry/vectorUtils';
import {
  Grid,
  Axes,
  OriginMarker,
  Point,
  PointLabel,
  VectorArrow,
  VectorLabel,
  VectorComponents,
  VectorAddition,
  DEFAULT_COLORS,
  DEFAULT_COORDS,
} from './vector';

/**
 * VectorFigure - 2D Vector Visualization Component
 *
 * Renders vectors on a Cartesian coordinate system. Supports:
 * - Single or multiple vectors with customizable colors
 * - Vector components (projections onto x and y axes)
 * - Vector addition visualization (parallelogram and head-to-tail methods)
 * - Points with labels (ordered pairs)
 * - Interactive dragging of vector endpoints
 *
 * Can be used standalone (renders its own SVG with axes) or embedded in
 * a CartesianPlane component (renders as <g> element).
 *
 * @example
 * // Single vector from origin
 * <VectorFigure vectors={[{ to: { x: 3, y: 2 }, label: 'v' }]} />
 *
 * @example
 * // Vector with components
 * <VectorFigure
 *   vectors={[{ to: { x: 4, y: 3 }, label: 'v' }]}
 *   components={[{ vectorIndex: 0, showX: true, showY: true, xLabel: 'vₓ', yLabel: 'vᵧ' }]}
 * />
 *
 * @example
 * // Points in the plane
 * <VectorFigure
 *   points={[
 *     { x: 2, y: 3, label: 'P(2,3)' },
 *     { x: -1, y: 2, label: 'Q(-1,2)' },
 *   ]}
 * />
 */
export function VectorFigure({
  standalone = true,
  vectors: vectorsProp = [],
  points: pointsProp = [],
  components,
  addition,
  origin,
  showOrigin = true,
  draggable = false,
  onVectorsChange,
  onPointsChange,
  fill,
  stroke,
  strokeWidth,
  xRange: xRangeProp,
  yRange: yRangeProp,
  scale: scaleProp,
  showGrid = true,
  gridSpacing = 1,
  gridColor,
  showAxes = true,
  showTicks = true,
  showAxisLabels = true,
  width = DEFAULT_COORDS.width,
  height = DEFAULT_COORDS.height,
  padding = DEFAULT_COORDS.padding,
  ariaLabel = 'Figura de vectores',
  className,
  // Internal props passed by CartesianPlane
  _originX,
  _originY,
  _scale,
  _xRange,
  _yRange,
}: VectorFigureProps & {
  _originX?: number;
  _originY?: number;
  _scale?: number;
  _xRange?: [number, number];
  _yRange?: [number, number];
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Use internal state for dragging if no callback provided
  const [internalVectors, setInternalVectors] = useState<VectorConfig[] | null>(null);
  const [internalPoints, setInternalPoints] = useState<LabeledPoint[] | null>(null);
  const [draggingVector, setDraggingVector] = useState<number | null>(null);
  const [draggingPoint, setDraggingPoint] = useState<number | null>(null);

  // Active vectors (either controlled or internal)
  const vectors = internalVectors || vectorsProp;
  const points = internalPoints || pointsProp;

  // Determine coordinate system (from parent CartesianPlane or own)
  const xRange = _xRange || xRangeProp || DEFAULT_COORDS.xRange;
  const yRange = _yRange || yRangeProp || DEFAULT_COORDS.yRange;

  const calculatedScale = useMemo(() => {
    if (_scale) return _scale;
    if (scaleProp) return scaleProp;
    return calculateScale(xRange, yRange, width, height, padding);
  }, [_scale, scaleProp, xRange, yRange, width, height, padding]);

  const svgOrigin = useMemo(() => {
    if (_originX !== undefined && _originY !== undefined) {
      return { x: _originX, y: _originY };
    }
    return calculateSVGOrigin(xRange, yRange, width, height, padding);
  }, [_originX, _originY, xRange, yRange, width, height, padding]);

  // Calculate viewBox
  const viewBox = useMemo(() => {
    const xSpan = xRange[1] - xRange[0];
    const ySpan = yRange[1] - yRange[0];
    const svgWidth = xSpan * calculatedScale + 2 * padding;
    const svgHeight = ySpan * calculatedScale + 2 * padding;
    return `0 0 ${svgWidth} ${svgHeight}`;
  }, [xRange, yRange, calculatedScale, padding]);

  // Validate vectors
  const validVectors = useMemo(() => {
    return vectors.map((v, i) => ({
      ...v,
      valid: validateVector(v).valid,
      index: i,
    }));
  }, [vectors]);

  // Convert SVG coordinates to math coordinates
  const getSVGPoint = useCallback(
    (clientX: number, clientY: number) => {
      if (!svgRef.current) return null;
      const svg = svgRef.current;
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const ctm = svg.getScreenCTM();
      if (!ctm) return null;
      const svgP = pt.matrixTransform(ctm.inverse());
      return svgToMath(
        { x: svgP.x, y: svgP.y },
        svgOrigin.x,
        svgOrigin.y,
        calculatedScale
      );
    },
    [svgOrigin, calculatedScale]
  );

  // Dragging handlers for vectors
  const handleVectorPointerDown = useCallback(
    (index: number, e: React.PointerEvent) => {
      if (!draggable) return;
      e.stopPropagation();
      setDraggingVector(index);
      (e.target as Element).setPointerCapture(e.pointerId);

      // Initialize internal state if needed
      if (!internalVectors) {
        setInternalVectors([...vectorsProp]);
      }
    },
    [draggable, internalVectors, vectorsProp]
  );

  const handlePointPointerDown = useCallback(
    (index: number, e: React.PointerEvent) => {
      if (!draggable) return;
      e.stopPropagation();
      setDraggingPoint(index);
      (e.target as Element).setPointerCapture(e.pointerId);

      if (!internalPoints) {
        setInternalPoints([...pointsProp]);
      }
    },
    [draggable, internalPoints, pointsProp]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (draggingVector === null && draggingPoint === null) return;

      const point = getSVGPoint(e.clientX, e.clientY);
      if (!point) return;

      // Snap to integers for cleaner values
      const snappedX = Math.round(point.x * 2) / 2;
      const snappedY = Math.round(point.y * 2) / 2;

      // Clamp to range
      const clampedX = Math.max(xRange[0], Math.min(xRange[1], snappedX));
      const clampedY = Math.max(yRange[0], Math.min(yRange[1], snappedY));

      if (draggingVector !== null) {
        const newVectors = [...(internalVectors || vectorsProp)];
        newVectors[draggingVector] = {
          ...newVectors[draggingVector],
          to: {
            ...newVectors[draggingVector].to,
            x: clampedX,
            y: clampedY,
          },
        };
        setInternalVectors(newVectors);
        onVectorsChange?.(newVectors);
      }

      if (draggingPoint !== null) {
        const newPoints = [...(internalPoints || pointsProp)];
        newPoints[draggingPoint] = {
          ...newPoints[draggingPoint],
          x: clampedX,
          y: clampedY,
        };
        setInternalPoints(newPoints);
        onPointsChange?.(newPoints);
      }
    },
    [
      draggingVector,
      draggingPoint,
      getSVGPoint,
      xRange,
      yRange,
      internalVectors,
      internalPoints,
      vectorsProp,
      pointsProp,
      onVectorsChange,
      onPointsChange,
    ]
  );

  const handlePointerUp = useCallback(() => {
    setDraggingVector(null);
    setDraggingPoint(null);
  }, []);

  // Content to render
  const content = (
    <>
      {/* Grid (only in standalone mode) */}
      {standalone && showGrid && (
        <Grid
          xRange={xRange}
          yRange={yRange}
          originX={svgOrigin.x}
          originY={svgOrigin.y}
          scale={calculatedScale}
          spacing={gridSpacing}
          color={gridColor || DEFAULT_COLORS.grid}
        />
      )}

      {/* Axes (only in standalone mode) */}
      {standalone && showAxes && (
        <Axes
          xRange={xRange}
          yRange={yRange}
          originX={svgOrigin.x}
          originY={svgOrigin.y}
          scale={calculatedScale}
          showTicks={showTicks}
          showLabels={showAxisLabels}
        />
      )}

      {/* Origin label (only in standalone mode) */}
      {standalone && showOrigin && (
        <OriginMarker
          x={svgOrigin.x}
          y={svgOrigin.y}
          label={origin?.label || 'O'}
        />
      )}

      {/* Points */}
      {points.map((point, i) => (
        <g key={`point-${i}`}>
          <Point
            point={point}
            originX={svgOrigin.x}
            originY={svgOrigin.y}
            scale={calculatedScale}
            color={fill || DEFAULT_COLORS.point}
            draggable={draggable}
            isDragging={draggingPoint === i}
            onPointerDown={(e) => handlePointPointerDown(i, e)}
          />
          <PointLabel
            point={point}
            originX={svgOrigin.x}
            originY={svgOrigin.y}
            scale={calculatedScale}
          />
        </g>
      ))}

      {/* Vector components (projections) - rendered before vectors */}
      {components?.map((comp, i) => {
        const vector = vectors[comp.vectorIndex];
        if (!vector) return null;
        return (
          <VectorComponents
            key={`comp-${i}`}
            vector={vector}
            config={comp}
            originX={svgOrigin.x}
            originY={svgOrigin.y}
            scale={calculatedScale}
          />
        );
      })}

      {/* Vector addition visualization */}
      {addition && (
        <VectorAddition
          vectors={vectors}
          indices={addition.vectorIndices}
          method={addition.method}
          showResultant={addition.showResultant}
          resultantLabel={addition.resultantLabel}
          resultantColor={addition.resultantColor}
          showConstruction={addition.showConstruction}
          constructionStyle={addition.constructionStyle}
          originX={svgOrigin.x}
          originY={svgOrigin.y}
          scale={calculatedScale}
        />
      )}

      {/* Vectors */}
      {validVectors.map((v, i) => {
        if (!v.valid) return null;
        return (
          <g key={`vector-${i}`}>
            <VectorArrow
              config={{
                ...v,
                color: v.color || stroke || DEFAULT_COLORS.vector,
                strokeWidth: v.strokeWidth || strokeWidth,
              }}
              originX={svgOrigin.x}
              originY={svgOrigin.y}
              scale={calculatedScale}
              draggable={draggable}
              isDragging={draggingVector === i}
              onPointerDown={(e) => handleVectorPointerDown(i, e)}
            />
            <VectorLabel
              config={v}
              originX={svgOrigin.x}
              originY={svgOrigin.y}
              scale={calculatedScale}
            />
          </g>
        );
      })}
    </>
  );

  // Standalone mode: render full SVG
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
        aria-label={ariaLabel}
      >
        <title>{ariaLabel}</title>
        {content}
      </svg>
    );
  }

  // Embedded mode: render as group
  return <g className={className}>{content}</g>;
}
