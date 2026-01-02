'use client';

import React, { useMemo, useState, useCallback, useRef, useEffect, useId } from 'react';
import type {
  Figure3DProps,
  Point3D,
  ProjectedPoint,
  SolidGeometry,
  SphereGeometry,
  ProjectionConfig,
  EdgeConfig,
  FaceConfig,
  DimensionLabelConfig,
  HeightLineConfig,
  VertexLabelConfig,
} from '@/lib/types/figure3d';
import {
  normalizeProjectionConfig,
  project3Dto2D,
  projectVertices,
  generateSolid,
  isSphereGeometry,
  sortFacesByDepth,
  getAllEdgeVisibilities,
  getViewDirection,
  isFaceFrontFacing,
  calculateViewBox3D,
  calculateSphereViewBox,
  describeFacePath,
  describeEdgeLine,
  getStrokeDashArray,
  calculateHeightLabelPosition,
  calculateBaseLabelPosition,
  calculateEdgeLabelPosition,
  isBaseFace,
  rotatePoint,
} from '@/lib/geometry/figure3dUtils';

// ============================================
// DEFAULT COLORS (matching existing components)
// ============================================

const DEFAULT_COLORS = {
  fill: 'rgba(59, 130, 246, 0.15)', // blue-500 with opacity
  stroke: 'rgb(59, 130, 246)', // blue-500
  hiddenEdge: 'rgb(156, 163, 175)', // gray-400
  baseFace: 'rgba(168, 85, 247, 0.3)', // purple-500
  lateralFace: 'rgba(59, 130, 246, 0.2)', // blue-500
  heightLine: 'rgb(239, 68, 68)', // red-500
  grid: 'rgb(229, 231, 235)', // gray-200
  label: 'rgb(17, 24, 39)', // gray-900
};

// ============================================
// SUB-COMPONENTS
// ============================================

interface GridProps {
  viewBox: { minX: number; minY: number; width: number; height: number };
  gridSize: number;
  gridColor: string;
}

function Grid({ viewBox, gridSize, gridColor }: GridProps) {
  const { minX, minY, width, height } = viewBox;
  const lines: React.ReactNode[] = [];

  // Vertical lines
  const startX = Math.floor(minX / gridSize) * gridSize;
  for (let x = startX; x <= minX + width; x += gridSize) {
    lines.push(
      <line
        key={`v-${x}`}
        x1={x}
        y1={minY}
        x2={x}
        y2={minY + height}
        stroke={gridColor}
        strokeWidth={0.5}
        className="dark:stroke-gray-700"
      />
    );
  }

  // Horizontal lines
  const startY = Math.floor(minY / gridSize) * gridSize;
  for (let y = startY; y <= minY + height; y += gridSize) {
    lines.push(
      <line
        key={`h-${y}`}
        x1={minX}
        y1={y}
        x2={minX + width}
        y2={y}
        stroke={gridColor}
        strokeWidth={0.5}
        className="dark:stroke-gray-700"
      />
    );
  }

  return <g className="grid">{lines}</g>;
}

interface FaceProps {
  projectedVertices: ProjectedPoint[];
  faceIndices: number[];
  isBase: boolean;
  config?: FaceConfig;
  defaultFill: string;
  defaultOpacity: number;
}

function Face({
  projectedVertices,
  faceIndices,
  isBase,
  config,
  defaultFill,
  defaultOpacity,
}: FaceProps) {
  const path = describeFacePath(projectedVertices, faceIndices);

  let fill = defaultFill;
  let opacity = defaultOpacity;

  if (isBase && config?.highlightBase) {
    fill = config.baseColor || DEFAULT_COLORS.baseFace;
    opacity = config.baseOpacity ?? 0.4;
  } else if (!isBase && config?.highlightLateral) {
    fill = config.lateralColor || DEFAULT_COLORS.lateralFace;
    opacity = config.lateralOpacity ?? 0.2;
  } else if (config?.fill) {
    fill = config.fill;
    opacity = config.fillOpacity ?? defaultOpacity;
  }

  return (
    <path
      d={path}
      fill={fill}
      fillOpacity={opacity}
      stroke="none"
      className="dark:opacity-60"
    />
  );
}

interface EdgeLineProps {
  p1: ProjectedPoint;
  p2: ProjectedPoint;
  visible: boolean;
  config?: EdgeConfig;
  defaultStroke: string;
  defaultWidth: number;
}

function EdgeLine({
  p1,
  p2,
  visible,
  config,
  defaultStroke,
  defaultWidth,
}: EdgeLineProps) {
  const { x1, y1, x2, y2 } = describeEdgeLine(p1, p2);

  if (!visible) {
    // Hidden edge
    const hiddenStyle = config?.hiddenEdgeStyle ?? 'dashed';
    if (hiddenStyle === 'none') return null;

    return (
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={config?.hiddenEdgeColor || DEFAULT_COLORS.hiddenEdge}
        strokeWidth={1}
        strokeDasharray={getStrokeDashArray(hiddenStyle)}
        className="dark:stroke-gray-500"
      />
    );
  }

  // Visible edge
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={config?.edgeColor || defaultStroke}
      strokeWidth={config?.edgeWidth || defaultWidth}
      className="dark:stroke-blue-400"
    />
  );
}

interface HeightLineComponentProps {
  projectedVertices: ProjectedPoint[];
  solidType: string | undefined;
  config: HeightLineConfig;
  geometry: SolidGeometry;
  projectionConfig: ProjectionConfig;
  centerX: number;
  centerY: number;
  scale: number;
}

function HeightLineComponent({
  projectedVertices,
  solidType,
  config,
  geometry,
  projectionConfig,
  centerX,
  centerY,
  scale,
}: HeightLineComponentProps) {
  if (!config.show) return null;

  // Find height line endpoints based on solid type
  let startPoint: ProjectedPoint | null = null;
  let endPoint: ProjectedPoint | null = null;

  // For pyramids and cones, draw from apex to base center
  if (
    solidType === 'piramide_cuadrada' ||
    solidType === 'piramide_triangular' ||
    solidType === 'cono'
  ) {
    // Apex is typically vertex 0 for cone, last vertex for pyramids
    const apexIndex = solidType === 'cono' ? 0 : geometry.vertices.length - 1;
    const apex3D = geometry.vertices[apexIndex];

    // Base center at y=0 for pyramids, y=0 for cone
    const baseCenter3D: Point3D = { x: 0, y: 0, z: 0 };

    startPoint = project3Dto2D(apex3D, projectionConfig, centerX, centerY, scale);
    endPoint = project3Dto2D(baseCenter3D, projectionConfig, centerX, centerY, scale);
  }
  // For prisms and cubes, draw vertical line at center
  else if (
    solidType === 'cubo' ||
    solidType === 'prisma_rectangular' ||
    solidType === 'prisma_triangular' ||
    solidType === 'cilindro'
  ) {
    // Find top and bottom Y extents at center X,Z
    const topCenter3D: Point3D = {
      x: 0,
      y: Math.max(...geometry.vertices.map((v) => v.y)),
      z: 0,
    };
    const bottomCenter3D: Point3D = {
      x: 0,
      y: Math.min(...geometry.vertices.map((v) => v.y)),
      z: 0,
    };

    startPoint = project3Dto2D(topCenter3D, projectionConfig, centerX, centerY, scale);
    endPoint = project3Dto2D(bottomCenter3D, projectionConfig, centerX, centerY, scale);
  }

  if (!startPoint || !endPoint) return null;

  const dashArray = getStrokeDashArray(config.style);
  const strokeColor = config.color || DEFAULT_COLORS.heightLine;
  const strokeWidth = config.strokeWidth || 1.5;

  return (
    <g className="height-line">
      <line
        x1={startPoint.x}
        y1={startPoint.y}
        x2={endPoint.x}
        y2={endPoint.y}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        className="dark:stroke-red-400"
      />
      {config.showRightAngleMarker && (
        <RightAngleMarker
          point={endPoint}
          size={config.rightAngleSize || 8}
          color={strokeColor}
        />
      )}
    </g>
  );
}

interface RightAngleMarkerProps {
  point: ProjectedPoint;
  size: number;
  color: string;
}

function RightAngleMarker({ point, size, color }: RightAngleMarkerProps) {
  // Draw small square at right angle
  return (
    <path
      d={`M ${point.x} ${point.y - size} L ${point.x + size} ${point.y - size} L ${point.x + size} ${point.y}`}
      fill="none"
      stroke={color}
      strokeWidth={1}
      className="dark:stroke-red-400"
    />
  );
}

interface DimensionLabelsProps {
  projectedVertices: ProjectedPoint[];
  solidType: string | undefined;
  config: DimensionLabelConfig;
  geometry: SolidGeometry;
}

function DimensionLabels({
  projectedVertices,
  solidType,
  config,
  geometry,
}: DimensionLabelsProps) {
  const labels: React.ReactNode[] = [];
  const fontSize = config.fontSize || 12;
  const color = config.color || DEFAULT_COLORS.label;

  // Height label
  if (config.showHeight) {
    const pos = calculateHeightLabelPosition(projectedVertices, solidType || '', 20);
    labels.push(
      <text
        key="height-label"
        x={pos.x}
        y={pos.y}
        fontSize={fontSize}
        fill={color}
        textAnchor="middle"
        dominantBaseline="middle"
        className="dark:fill-gray-200 font-medium"
      >
        {config.heightLabel || 'h'}
      </text>
    );
  }

  // Base label
  if (config.showBase) {
    const pos = calculateBaseLabelPosition(projectedVertices, solidType || '', 20);
    labels.push(
      <text
        key="base-label"
        x={pos.x}
        y={pos.y}
        fontSize={fontSize}
        fill={color}
        textAnchor="middle"
        dominantBaseline="middle"
        className="dark:fill-gray-200 font-medium"
      >
        {config.baseLabel || 'b'}
      </text>
    );
  }

  // Radius label (for cylinder, cone, sphere)
  if (config.showRadius && solidType && ['cilindro', 'cono', 'esfera'].includes(solidType)) {
    // Position at midpoint of radius line
    const center = {
      x: projectedVertices.reduce((sum, p) => sum + p.x, 0) / projectedVertices.length,
      y: Math.max(...projectedVertices.map((p) => p.y)) - 10,
    };
    labels.push(
      <text
        key="radius-label"
        x={center.x + 30}
        y={center.y}
        fontSize={fontSize}
        fill={color}
        textAnchor="middle"
        dominantBaseline="middle"
        className="dark:fill-gray-200 font-medium"
      >
        {config.radiusLabel || 'r'}
      </text>
    );
  }

  // Edge label (for cube)
  if (config.showEdge && solidType === 'cubo' && geometry.edges.length > 0) {
    const edge = geometry.edges[0];
    const p1 = projectedVertices[edge[0]];
    const p2 = projectedVertices[edge[1]];
    const pos = calculateEdgeLabelPosition(p1, p2, 15);
    labels.push(
      <text
        key="edge-label"
        x={pos.x}
        y={pos.y}
        fontSize={fontSize}
        fill={color}
        textAnchor="middle"
        dominantBaseline="middle"
        className="dark:fill-gray-200 font-medium"
      >
        {config.edgeLabel || 'a'}
      </text>
    );
  }

  return <g className="dimension-labels">{labels}</g>;
}

interface VertexLabelsComponentProps {
  projectedVertices: ProjectedPoint[];
  vertices: Point3D[];
  config?: VertexLabelConfig;
}

function VertexLabelsComponent({
  projectedVertices,
  vertices,
  config,
}: VertexLabelsComponentProps) {
  if (!config?.show) return null;

  const fontSize = config.fontSize || 12;
  const color = config.color || DEFAULT_COLORS.label;
  const offset = config.offset || 10;

  return (
    <g className="vertex-labels">
      {projectedVertices.map((p, i) => {
        const label = config.labels?.[i] || vertices[i].label;
        if (!label) return null;

        return (
          <text
            key={`vertex-${i}`}
            x={p.x}
            y={p.y - offset}
            fontSize={fontSize}
            fill={color}
            textAnchor="middle"
            dominantBaseline="middle"
            className="dark:fill-gray-200 font-medium"
          >
            {label}
          </text>
        );
      })}
    </g>
  );
}

interface SphereRendererProps {
  center: ProjectedPoint;
  radius: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  id: string;
}

function SphereRenderer({
  center,
  radius,
  fill,
  stroke,
  strokeWidth,
  id,
}: SphereRendererProps) {
  const gradientId = `sphere-gradient-${id}`;

  return (
    <g className="sphere">
      <defs>
        <radialGradient id={gradientId} cx="30%" cy="30%">
          <stop offset="0%" stopColor="white" stopOpacity="0.8" />
          <stop offset="40%" stopColor={fill} stopOpacity="0.5" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0.4" />
        </radialGradient>
      </defs>
      <circle
        cx={center.x}
        cy={center.y}
        r={radius}
        fill={`url(#${gradientId})`}
        stroke={stroke}
        strokeWidth={strokeWidth}
        className="dark:stroke-blue-400"
      />
      {/* Highlight arc for 3D effect */}
      <ellipse
        cx={center.x - radius * 0.2}
        cy={center.y - radius * 0.2}
        rx={radius * 0.15}
        ry={radius * 0.08}
        fill="white"
        fillOpacity="0.4"
        transform={`rotate(-30 ${center.x - radius * 0.2} ${center.y - radius * 0.2})`}
      />
    </g>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function Figure3D({
  // Construction
  fromType,
  vertices: customVertices,
  faces: customFaces,
  customEdges,

  // Projection
  projection = 'isometric',

  // Interactive
  interactive = false,
  onRotationChange,
  azimuth: controlledAzimuth,
  elevation: controlledElevation,

  // Visual configuration
  edges: edgeConfig,
  faceConfig,
  dimensionLabels,
  heightLine,
  vertexLabels,

  // Common visual
  fill = DEFAULT_COLORS.fill,
  fillOpacity = 0.3,
  stroke = DEFAULT_COLORS.stroke,
  strokeWidth = 2,

  // Grid
  showGrid = false,
  gridSize = 20,
  gridColor = DEFAULT_COLORS.grid,

  // SVG
  width = 400,
  height = 300,
  viewBox: customViewBox,
  padding = 40,
  className,
  ariaLabel,
  standalone = true,
}: Figure3DProps) {
  // ============================================
  // UNIQUE ID
  // ============================================
  const uniqueId = useId();

  // ============================================
  // ROTATION STATE (for interactive mode)
  // ============================================

  const [internalRotation, setInternalRotation] = useState({
    azimuth: controlledAzimuth ?? 45,
    elevation: controlledElevation ?? 35,
  });

  // Use controlled or internal rotation
  const rotation = {
    azimuth: controlledAzimuth ?? internalRotation.azimuth,
    elevation: controlledElevation ?? internalRotation.elevation,
  };

  // Drag state (ref for logic, state for cursor)
  const isDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  // Update internal state when controlled props change
  useEffect(() => {
    if (controlledAzimuth !== undefined) {
      setInternalRotation((prev) => ({ ...prev, azimuth: controlledAzimuth }));
    }
    if (controlledElevation !== undefined) {
      setInternalRotation((prev) => ({ ...prev, elevation: controlledElevation }));
    }
  }, [controlledAzimuth, controlledElevation]);

  // ============================================
  // GEOMETRY GENERATION
  // ============================================

  const geometry = useMemo(() => {
    if (customVertices && customFaces) {
      return {
        vertices: customVertices,
        faces: customFaces,
        edges: customEdges || [],
      } as SolidGeometry;
    }

    if (fromType) {
      return generateSolid(fromType);
    }

    // Default to cube
    return generateSolid({ type: 'cubo', dimensions: { lado: 100 } });
  }, [fromType, customVertices, customFaces, customEdges]);

  const isSphere = isSphereGeometry(geometry);
  const solidGeometry = isSphere ? null : (geometry as SolidGeometry);
  const sphereGeometry = isSphere ? (geometry as SphereGeometry) : null;

  // ============================================
  // PROJECTION
  // ============================================

  const projectionConfig = useMemo(
    () => normalizeProjectionConfig(projection, rotation),
    [projection, rotation]
  );

  // Calculate scale and center
  const scale = useMemo(() => {
    // Scale to fit within viewport
    const maxDimension = Math.min(width, height) * 0.6;

    if (isSphere && sphereGeometry) {
      return maxDimension / (sphereGeometry.radius * 2);
    }

    if (solidGeometry) {
      // Find max extent of projected vertices
      const testProjected = projectVertices(
        solidGeometry.vertices,
        projectionConfig,
        0,
        0,
        1
      );
      const xs = testProjected.map((p) => Math.abs(p.x));
      const ys = testProjected.map((p) => Math.abs(p.y));
      const maxExtent = Math.max(...xs, ...ys) * 2;
      return maxDimension / maxExtent;
    }

    return 1;
  }, [width, height, isSphere, sphereGeometry, solidGeometry, projectionConfig]);

  const centerX = width / 2;
  const centerY = height / 2;

  // Project vertices
  const projectedVertices = useMemo(() => {
    if (isSphere) return [];
    if (!solidGeometry) return [];
    return projectVertices(solidGeometry.vertices, projectionConfig, centerX, centerY, scale);
  }, [solidGeometry, projectionConfig, centerX, centerY, scale, isSphere]);

  // Project sphere center
  const projectedSphereCenter = useMemo(() => {
    if (!isSphere || !sphereGeometry) return null;
    return project3Dto2D(sphereGeometry.center, projectionConfig, centerX, centerY, scale);
  }, [isSphere, sphereGeometry, projectionConfig, centerX, centerY, scale]);

  const projectedSphereRadius = isSphere && sphereGeometry ? sphereGeometry.radius * scale : 0;

  // ============================================
  // FACE SORTING AND EDGE VISIBILITY
  // ============================================

  const sortedFaceIndices = useMemo(() => {
    if (isSphere || !solidGeometry) return [];
    return sortFacesByDepth(solidGeometry.vertices, solidGeometry.faces, projectionConfig);
  }, [isSphere, solidGeometry, projectionConfig]);

  const edgeVisibilities = useMemo(() => {
    if (isSphere || !solidGeometry) return [];
    return getAllEdgeVisibilities(
      solidGeometry.vertices,
      solidGeometry.edges,
      solidGeometry.faces,
      projectionConfig
    );
  }, [isSphere, solidGeometry, projectionConfig]);

  // ============================================
  // VIEW BOX CALCULATION
  // ============================================

  const calculatedViewBox = useMemo(() => {
    if (customViewBox) return customViewBox;

    if (isSphere && projectedSphereCenter) {
      const vb = calculateSphereViewBox(projectedSphereCenter, projectedSphereRadius, padding);
      return `${vb.minX} ${vb.minY} ${vb.width} ${vb.height}`;
    }

    if (projectedVertices.length > 0) {
      const vb = calculateViewBox3D(projectedVertices, padding);
      return `${vb.minX} ${vb.minY} ${vb.width} ${vb.height}`;
    }

    return `0 0 ${width} ${height}`;
  }, [
    customViewBox,
    isSphere,
    projectedSphereCenter,
    projectedSphereRadius,
    projectedVertices,
    padding,
    width,
    height,
  ]);

  const viewBoxObj = useMemo(() => {
    const [minX, minY, w, h] = calculatedViewBox.split(' ').map(Number);
    return { minX, minY, width: w, height: h };
  }, [calculatedViewBox]);

  // ============================================
  // INTERACTIVE ROTATION HANDLERS
  // ============================================

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!interactive) return;
      isDraggingRef.current = true;
      setIsDragging(true);
      lastPosition.current = { x: e.clientX, y: e.clientY };
    },
    [interactive]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDraggingRef.current || !interactive) return;

      const dx = e.clientX - lastPosition.current.x;
      const dy = e.clientY - lastPosition.current.y;

      const newAzimuth = (rotation.azimuth + dx * 0.5 + 360) % 360;
      const newElevation = Math.max(-89, Math.min(89, rotation.elevation - dy * 0.5));

      setInternalRotation({ azimuth: newAzimuth, elevation: newElevation });
      onRotationChange?.(newAzimuth, newElevation);

      lastPosition.current = { x: e.clientX, y: e.clientY };
    },
    [interactive, rotation.azimuth, rotation.elevation, onRotationChange]
  );

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!interactive || e.touches.length !== 1) return;
      isDraggingRef.current = true;
      setIsDragging(true);
      lastPosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    },
    [interactive]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDraggingRef.current || !interactive || e.touches.length !== 1) return;

      const dx = e.touches[0].clientX - lastPosition.current.x;
      const dy = e.touches[0].clientY - lastPosition.current.y;

      const newAzimuth = (rotation.azimuth + dx * 0.5 + 360) % 360;
      const newElevation = Math.max(-89, Math.min(89, rotation.elevation - dy * 0.5));

      setInternalRotation({ azimuth: newAzimuth, elevation: newElevation });
      onRotationChange?.(newAzimuth, newElevation);

      lastPosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    },
    [interactive, rotation.azimuth, rotation.elevation, onRotationChange]
  );

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  // ============================================
  // RENDER CONTENT
  // ============================================

  const solidType = fromType?.type;

  const renderContent = () => (
    <>
      {/* Layer 1: Grid */}
      {showGrid && <Grid viewBox={viewBoxObj} gridSize={gridSize} gridColor={gridColor} />}

      {/* Sphere special rendering */}
      {isSphere && projectedSphereCenter && (
        <SphereRenderer
          center={projectedSphereCenter}
          radius={projectedSphereRadius}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          id={uniqueId}
        />
      )}

      {/* Regular solid rendering */}
      {!isSphere && solidGeometry && (
        <>
          {/* Layer 2: Faces (sorted back to front) */}
          {sortedFaceIndices.map((faceIndex) => (
            <Face
              key={`face-${faceIndex}`}
              projectedVertices={projectedVertices}
              faceIndices={solidGeometry.faces[faceIndex]}
              isBase={isBaseFace(faceIndex, solidType)}
              config={faceConfig}
              defaultFill={fill}
              defaultOpacity={fillOpacity}
            />
          ))}

          {/* Layer 3: Hidden edges (render first, under visible) */}
          {solidGeometry.edges.map((edge, i) =>
            edgeVisibilities[i] === 'hidden' ? (
              <EdgeLine
                key={`edge-hidden-${i}`}
                p1={projectedVertices[edge[0]]}
                p2={projectedVertices[edge[1]]}
                visible={false}
                config={edgeConfig}
                defaultStroke={stroke}
                defaultWidth={strokeWidth}
              />
            ) : null
          )}

          {/* Layer 4: Visible edges */}
          {solidGeometry.edges.map((edge, i) =>
            edgeVisibilities[i] === 'visible' ? (
              <EdgeLine
                key={`edge-visible-${i}`}
                p1={projectedVertices[edge[0]]}
                p2={projectedVertices[edge[1]]}
                visible={true}
                config={edgeConfig}
                defaultStroke={stroke}
                defaultWidth={strokeWidth}
              />
            ) : null
          )}

          {/* Layer 5: Height line */}
          {heightLine && (
            <HeightLineComponent
              projectedVertices={projectedVertices}
              solidType={solidType}
              config={heightLine}
              geometry={solidGeometry}
              projectionConfig={projectionConfig}
              centerX={centerX}
              centerY={centerY}
              scale={scale}
            />
          )}

          {/* Layer 6: Dimension labels */}
          {dimensionLabels && (
            <DimensionLabels
              projectedVertices={projectedVertices}
              solidType={solidType}
              config={dimensionLabels}
              geometry={solidGeometry}
            />
          )}

          {/* Layer 7: Vertex labels */}
          {vertexLabels && (
            <VertexLabelsComponent
              projectedVertices={projectedVertices}
              vertices={solidGeometry.vertices}
              config={vertexLabels}
            />
          )}
        </>
      )}
    </>
  );

  // ============================================
  // RETURN
  // ============================================

  if (!standalone) {
    return <g className={className}>{renderContent()}</g>;
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={calculatedViewBox}
      className={className}
      role="img"
      aria-label={ariaLabel || 'Figura 3D'}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: interactive ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
    >
      <title>{ariaLabel || 'Figura 3D'}</title>
      {renderContent()}
    </svg>
  );
}

export default Figure3D;
