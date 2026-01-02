'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { Card, Button, Heading, Text, Badge } from '@/components/ui';
import AdminLayout from '@/components/layout/AdminLayout';
import { TriangleFigure } from '@/components/figures/TriangleFigure';
import { CircleFigure } from '@/components/figures/CircleFigure';
import { CartesianPlane, CartesianPoint, CartesianSegment } from '@/components/figures/CartesianPlane';
import {
  buildTriangleFromAngles,
  buildTriangleFromSides,
  validateTriangleAngles,
  validateTriangleSides,
} from '@/lib/geometry/triangleUtils';
import {
  validateCircle,
  validateSector,
  circumference,
  area,
  sectorArea,
  arcLength,
  angleDifference,
} from '@/lib/geometry/circleUtils';
import type {
  LabeledPoint,
  SideConfig,
  AngleConfig,
  SpecialLineConfig,
  TrianglePreset,
} from '@/lib/types/triangle';
import type {
  LabeledPoint as CircleLabeledPoint,
  CircleMode,
  ChordConfig,
  CirclePreset,
  UnifiedArcConfig,
} from '@/lib/types/circle';
import type {
  CartesianPointConfig,
  CartesianSegmentConfig,
  CartesianTriangleConfig,
  CartesianElements,
  CartesianDebuggerPreset,
} from '@/lib/types/cartesian';

// Top-level tab for the debugger (triangle, circle, or cartesian plane)
type DebuggerTab = 'triangulo' | 'circulo' | 'cartesian';
type InputMode = 'vertices' | 'angles' | 'sides';

// Presets for vertices mode
const VERTEX_PRESETS: TrianglePreset[] = [
  {
    name: 'Equilátero',
    description: '3 lados iguales, 3 ángulos de 60°',
    vertices: [
      { x: 200, y: 50, label: 'A' },
      { x: 100, y: 223, label: 'B' },
      { x: 300, y: 223, label: 'C' },
    ],
  },
  {
    name: 'Rectángulo (3-4-5)',
    description: 'Ángulo recto en B',
    vertices: [
      { x: 100, y: 50, label: 'A' },
      { x: 100, y: 200, label: 'B' },
      { x: 260, y: 200, label: 'C' },
    ],
    rightAngleVertex: 1,
  },
  {
    name: 'Isósceles',
    description: '2 lados iguales',
    vertices: [
      { x: 200, y: 50, label: 'A' },
      { x: 100, y: 220, label: 'B' },
      { x: 300, y: 220, label: 'C' },
    ],
  },
  {
    name: 'Escaleno',
    description: '3 lados diferentes',
    vertices: [
      { x: 150, y: 60, label: 'A' },
      { x: 80, y: 200, label: 'B' },
      { x: 300, y: 180, label: 'C' },
    ],
  },
];

// Presets for angles mode
const ANGLE_PRESETS = [
  { name: 'Equilátero', description: '60° - 60° - 60°', angles: [60, 60, 60] as [number, number, number] },
  { name: '30-60-90', description: 'Triángulo notable', angles: [30, 60, 90] as [number, number, number] },
  { name: '45-45-90', description: 'Isósceles recto', angles: [45, 45, 90] as [number, number, number] },
  { name: 'Isósceles 70-70-40', description: '2 ángulos iguales', angles: [70, 70, 40] as [number, number, number] },
];

// Presets for sides mode
const SIDES_PRESETS = [
  { name: '3-4-5', description: 'Triángulo rectángulo', sides: [3, 4, 5] as [number, number, number] },
  { name: '5-12-13', description: 'Triángulo rectángulo', sides: [5, 12, 13] as [number, number, number] },
  { name: 'Equilátero', description: '5-5-5', sides: [5, 5, 5] as [number, number, number] },
  { name: 'Isósceles', description: '5-5-3', sides: [5, 5, 3] as [number, number, number] },
];

// Circle presets
const CIRCLE_PRESETS: CirclePreset[] = [
  {
    name: 'Círculo básico',
    description: 'Centro y radio visible',
    center: { x: 200, y: 150, label: 'O' },
    radius: 80,
    showCenter: true,
    showRadius: true,
  },
  {
    name: 'Circunferencia',
    description: 'Solo el borde',
    center: { x: 200, y: 150, label: 'O' },
    radius: 80,
    mode: 'circunferencia',
    showCenter: true,
  },
  {
    name: 'Sector 90°',
    description: 'Cuarto de círculo',
    center: { x: 200, y: 150, label: 'O' },
    radius: 80,
    showCenter: true,
    sector: { startAngle: 0, endAngle: 90 },
  },
  {
    name: 'Semicírculo',
    description: '180°',
    center: { x: 200, y: 150, label: 'O' },
    radius: 80,
    showCenter: true,
    sector: { startAngle: 0, endAngle: 180 },
  },
];

// Presets for Cartesian debugger (with elements support)
const CARTESIAN_DEBUGGER_PRESETS: CartesianDebuggerPreset[] = [
  {
    name: 'Plano vacío',
    description: 'Solo ejes y cuadrícula',
    config: { xMin: -5, xMax: 5, yMin: -5, yMax: 5 },
    elements: { points: [], segments: [], triangles: [] },
  },
  {
    name: 'Puntos en cuadrantes',
    description: '4 puntos, uno por cuadrante',
    config: { xMin: -5, xMax: 5, yMin: -5, yMax: 5 },
    elements: {
      points: [
        { id: 'P1', x: 2, y: 2, label: 'Q1' },
        { id: 'P2', x: -2, y: 2, label: 'Q2' },
        { id: 'P3', x: -2, y: -2, label: 'Q3' },
        { id: 'P4', x: 2, y: -2, label: 'Q4' },
      ],
      segments: [],
      triangles: [],
    },
  },
  {
    name: 'Segmento diagonal',
    description: 'Línea de (-3,-2) a (3,2)',
    config: { xMin: -5, xMax: 5, yMin: -4, yMax: 4 },
    elements: {
      points: [
        { id: 'P1', x: -3, y: -2, label: 'A' },
        { id: 'P2', x: 3, y: 2, label: 'B' },
      ],
      segments: [
        { id: 'S1', p1: { x: -3, y: -2 }, p2: { x: 3, y: 2 }, label: 'AB' },
      ],
      triangles: [],
    },
  },
  {
    name: 'Triángulo 3-4-5',
    description: 'Rectángulo en origen',
    config: { xMin: -1, xMax: 6, yMin: -1, yMax: 5 },
    elements: {
      points: [],
      segments: [],
      triangles: [{
        id: 'T1',
        vertices: [
          { x: 0, y: 0, label: 'B' },
          { x: 4, y: 0, label: 'C' },
          { x: 0, y: 3, label: 'A' },
        ],
        showRightAngleMarker: true,
      }],
    },
  },
  {
    name: 'Homotecia',
    description: 'Rayos con flechas',
    config: { xMin: -1, xMax: 7, yMin: -1, yMax: 5 },
    elements: {
      points: [
        { id: 'O', x: 0, y: 0, label: 'O', color: 'rgb(239, 68, 68)' },
      ],
      segments: [
        { id: 'r1', p1: { x: 0, y: 0 }, p2: { x: 6, y: 3 }, strokeStyle: 'dashed', arrow: 'end', color: 'rgb(156, 163, 175)' },
        { id: 'r2', p1: { x: 0, y: 0 }, p2: { x: 6, y: 0 }, strokeStyle: 'dashed', arrow: 'end', color: 'rgb(156, 163, 175)' },
        { id: 'r3', p1: { x: 0, y: 0 }, p2: { x: 3, y: 4 }, strokeStyle: 'dashed', arrow: 'end', color: 'rgb(156, 163, 175)' },
      ],
      triangles: [
        {
          id: 'T1',
          vertices: [
            { x: 2, y: 1, label: 'A' },
            { x: 2, y: 0, label: 'B' },
            { x: 1, y: 4/3, label: 'C' },
          ],
        },
        {
          id: 'T2',
          vertices: [
            { x: 4, y: 2, label: "A'" },
            { x: 4, y: 0, label: "B'" },
            { x: 2, y: 8/3, label: "C'" },
          ],
        },
      ],
    },
  },
  {
    name: 'Equilátero movible',
    description: '60-60-60 posicionable',
    config: { xMin: -4, xMax: 6, yMin: -2, yMax: 6 },
    elements: {
      points: [],
      segments: [],
      triangles: [{
        id: 'T1',
        constructionMode: 'angles',
        angles: [60, 60, 60],
        scale: 2,
        position: { x: 1, y: 2 },
        rotation: 0,
        vertices: [
          { x: 0, y: 0, label: 'A' },
          { x: 0, y: 0, label: 'B' },
          { x: 0, y: 0, label: 'C' },
        ],
      }],
    },
  },
];

function FigureDebugContent() {
  // Top-level debugger tab (triangle, circle, or cartesian plane)
  const [debuggerTab, setDebuggerTab] = useState<DebuggerTab>('triangulo');

  // Input mode (for triangle)
  const [inputMode, setInputMode] = useState<InputMode>('vertices');

  // ============================================
  // CIRCLE STATE
  // ============================================
  const [circleCenter, setCircleCenter] = useState<CircleLabeledPoint>({ x: 200, y: 150, label: 'O' });
  const [circleRadius, setCircleRadius] = useState(80);
  const [circleMode, setCircleMode] = useState<CircleMode>('circulo');
  const [showCircleCenter, setShowCircleCenter] = useState(true);
  const [showCircleRadius, setShowCircleRadius] = useState(false);
  const [circleRadiusAngle, setCircleRadiusAngle] = useState(45);
  const [showCircleDiameter, setShowCircleDiameter] = useState(false);
  const [circleDiameterAngle, setCircleDiameterAngle] = useState(0);
  const [showCircleGrid, setShowCircleGrid] = useState(true);

  // Unified arcs state (preferred API)
  const [circleArcs, setCircleArcs] = useState<UnifiedArcConfig[]>([]);

  // Sector state (legacy - kept for presets)
  const [showSector, setShowSector] = useState(false);
  const [sectorStartAngle, setSectorStartAngle] = useState(0);
  const [sectorEndAngle, setSectorEndAngle] = useState(90);

  // Arc state (legacy)
  const [showArc, setShowArc] = useState(false);
  const [arcStartAngle, setArcStartAngle] = useState(0);
  const [arcEndAngle, setArcEndAngle] = useState(90);

  // Central angle state (legacy)
  const [showCentralAngle, setShowCentralAngle] = useState(false);
  const [centralAngleStart, setCentralAngleStart] = useState(0);
  const [centralAngleEnd, setCentralAngleEnd] = useState(60);
  const [showCentralAngleDegrees, setShowCentralAngleDegrees] = useState(true);

  // Chords state
  const [circleChords, setCircleChords] = useState<ChordConfig[]>([]);

  // Circle validation
  const circleValidation = useMemo(() => {
    return validateCircle(circleCenter, circleRadius);
  }, [circleCenter, circleRadius]);


  // Apply circle preset
  const applyCirclePreset = useCallback((preset: CirclePreset) => {
    setCircleCenter(preset.center);
    setCircleRadius(preset.radius);
    setCircleMode(preset.mode || 'circulo');
    setShowCircleCenter(preset.showCenter ?? false);
    setShowCircleRadius(!!preset.showRadius);
    if (preset.sector) {
      setShowSector(true);
      setSectorStartAngle(preset.sector.startAngle);
      setSectorEndAngle(preset.sector.endAngle);
    } else {
      setShowSector(false);
    }
  }, []);

  // Add chord
  const addChord = useCallback(() => {
    setCircleChords(prev => [...prev, { fromAngle: 30, toAngle: 150, showEndpoints: true }]);
  }, []);

  // Remove chord
  const removeChord = useCallback((index: number) => {
    setCircleChords(prev => prev.filter((_, i) => i !== index));
  }, []);

  // Update chord
  const updateChord = useCallback((index: number, field: 'fromAngle' | 'toAngle', value: number) => {
    setCircleChords(prev => prev.map((chord, i) =>
      i === index ? { ...chord, [field]: value } : chord
    ));
  }, []);

  // Add unified arc
  const addArc = useCallback(() => {
    setCircleArcs(prev => [...prev, {
      startAngle: 0,
      endAngle: 90,
      showAngle: true,
      showDegrees: true,
    }]);
  }, []);

  // Remove unified arc
  const removeArc = useCallback((index: number) => {
    setCircleArcs(prev => prev.filter((_, i) => i !== index));
  }, []);

  // Update unified arc
  const updateArc = useCallback((index: number, updates: Partial<UnifiedArcConfig>) => {
    setCircleArcs(prev => prev.map((arc, i) =>
      i === index ? { ...arc, ...updates } : arc
    ));
  }, []);

  // ============================================
  // TRIANGLE STATE
  // ============================================

  // Vertex state (for vertices mode)
  const [vertices, setVertices] = useState<[LabeledPoint, LabeledPoint, LabeledPoint]>([
    { x: 200, y: 50, label: 'A' },
    { x: 100, y: 220, label: 'B' },
    { x: 300, y: 220, label: 'C' },
  ]);

  // Angle state (for angles mode)
  const [angleInputs, setAngleInputs] = useState({
    angle1: 60,
    angle2: 60,
    baseLength: 150,
  });

  // Computed third angle
  const angle3 = useMemo(() => {
    return 180 - angleInputs.angle1 - angleInputs.angle2;
  }, [angleInputs.angle1, angleInputs.angle2]);

  // Validation for angles
  const angleValidation = useMemo(() => {
    return validateTriangleAngles([angleInputs.angle1, angleInputs.angle2, angle3]);
  }, [angleInputs.angle1, angleInputs.angle2, angle3]);

  // Computed vertices from angles
  const anglesVertices = useMemo<[LabeledPoint, LabeledPoint, LabeledPoint]>(() => {
    if (!angleValidation.valid) {
      return vertices; // fallback to current vertices if invalid
    }
    return buildTriangleFromAngles(
      [angleInputs.angle1, angleInputs.angle2, angle3],
      angleInputs.baseLength,
      200,
      140,
      0
    );
  }, [angleInputs, angle3, angleValidation.valid, vertices]);

  // Sides state (for sides mode)
  const [sideInputs, setSideInputs] = useState({
    side1: 3,
    side2: 4,
    side3: 5,
    size: 150,
  });

  // Validation for sides
  const sidesValidation = useMemo(() => {
    return validateTriangleSides([sideInputs.side1, sideInputs.side2, sideInputs.side3]);
  }, [sideInputs.side1, sideInputs.side2, sideInputs.side3]);

  // Computed vertices from sides
  const sidesVertices = useMemo<[LabeledPoint, LabeledPoint, LabeledPoint]>(() => {
    if (!sidesValidation.valid) {
      return vertices; // fallback to current vertices if invalid
    }
    return buildTriangleFromSides(
      [sideInputs.side1, sideInputs.side2, sideInputs.side3],
      sideInputs.size,
      200,
      140,
      0
    );
  }, [sideInputs, sidesValidation.valid, vertices]);

  // Cartesian plane state
  const [cartesianConfig, setCartesianConfig] = useState({
    xMin: -5,
    xMax: 5,
    yMin: -5,
    yMax: 5,
    scale: 40,
    showAxes: true,
    showGrid: true,
    showLabels: true,
    showOrigin: true,
  });

  // Cartesian elements state
  const [cartesianElements, setCartesianElements] = useState<CartesianElements>({
    points: [],
    segments: [],
    triangles: [],
  });

  // State for new triangle mode (when adding triangles in Cartesian debugger)
  const [newTriangleMode, setNewTriangleMode] = useState<'vertices' | 'angles'>('vertices');
  const [newTriangleAngles, setNewTriangleAngles] = useState<[number, number, number]>([60, 60, 60]);

  // Helper function to compute triangle vertices from angles mode
  const computeTriangleVertices = useCallback((triangle: CartesianTriangleConfig) => {
    if (triangle.constructionMode !== 'angles' || !triangle.angles) {
      return triangle.vertices;
    }

    // Build base triangle from angles
    const baseVertices = buildTriangleFromAngles(
      triangle.angles,
      (triangle.scale || 2) * 50, // Convert scale to pixels for computation
      0, 0, 0
    );

    // Calculate centroid of base triangle
    const centroid = {
      x: (baseVertices[0].x + baseVertices[1].x + baseVertices[2].x) / 3,
      y: (baseVertices[0].y + baseVertices[1].y + baseVertices[2].y) / 3,
    };

    // Apply rotation and translation
    const rad = ((triangle.rotation || 0) * Math.PI) / 180;
    const pos = triangle.position || { x: 0, y: 0 };

    return baseVertices.map((v, i) => {
      // Translate to centroid
      const dx = (v.x - centroid.x) / 50; // Convert back to math units
      const dy = (v.y - centroid.y) / 50;
      // Rotate
      const rx = dx * Math.cos(rad) - dy * Math.sin(rad);
      const ry = dx * Math.sin(rad) + dy * Math.cos(rad);
      // Translate to position
      return {
        x: rx + pos.x,
        y: ry + pos.y,
        label: triangle.vertices[i]?.label || ['A', 'B', 'C'][i],
      };
    }) as [{ x: number; y: number; label?: string }, { x: number; y: number; label?: string }, { x: number; y: number; label?: string }];
  }, []);

  // Update Cartesian config
  const updateCartesianConfig = useCallback(
    (field: keyof typeof cartesianConfig, value: number | boolean) => {
      setCartesianConfig((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  // Add a point
  const addPoint = useCallback(() => {
    const newId = `P${cartesianElements.points.length + 1}`;
    setCartesianElements((prev) => ({
      ...prev,
      points: [
        ...prev.points,
        { id: newId, x: 0, y: 0, label: newId, color: 'rgb(59, 130, 246)' },
      ],
    }));
  }, [cartesianElements.points.length]);

  // Add a segment
  const addSegment = useCallback(() => {
    const newId = `S${cartesianElements.segments.length + 1}`;
    setCartesianElements((prev) => ({
      ...prev,
      segments: [
        ...prev.segments,
        { id: newId, p1: { x: 0, y: 0 }, p2: { x: 1, y: 1 }, color: 'rgb(34, 197, 94)' },
      ],
    }));
  }, [cartesianElements.segments.length]);

  // Add a triangle (supports both vertices and angles modes)
  const addTriangle = useCallback(() => {
    const newId = `T${cartesianElements.triangles.length + 1}`;

    if (newTriangleMode === 'angles') {
      // Validate angles sum to 180
      const sum = newTriangleAngles[0] + newTriangleAngles[1] + newTriangleAngles[2];
      if (Math.abs(sum - 180) > 0.1) {
        alert(`Los ángulos deben sumar 180° (actualmente suman ${sum}°)`);
        return;
      }

      setCartesianElements((prev) => ({
        ...prev,
        triangles: [
          ...prev.triangles,
          {
            id: newId,
            constructionMode: 'angles',
            angles: [...newTriangleAngles] as [number, number, number],
            scale: 2,
            position: { x: 0, y: 0 },
            rotation: 0,
            vertices: [
              { x: 0, y: 0, label: 'A' },
              { x: 0, y: 0, label: 'B' },
              { x: 0, y: 0, label: 'C' },
            ],
          },
        ],
      }));
    } else {
      setCartesianElements((prev) => ({
        ...prev,
        triangles: [
          ...prev.triangles,
          {
            id: newId,
            vertices: [
              { x: 0, y: 0, label: 'A' },
              { x: 2, y: 0, label: 'B' },
              { x: 1, y: 2, label: 'C' },
            ],
          },
        ],
      }));
    }
  }, [cartesianElements.triangles.length, newTriangleMode, newTriangleAngles]);

  // Remove an element
  const removeElement = useCallback(
    (type: 'points' | 'segments' | 'triangles', id: string) => {
      setCartesianElements((prev) => ({
        ...prev,
        [type]: prev[type].filter((el) => el.id !== id),
      }));
    },
    []
  );

  // Update a point
  const updatePoint = useCallback(
    (id: string, field: 'x' | 'y' | 'label', value: number | string) => {
      setCartesianElements((prev) => ({
        ...prev,
        points: prev.points.map((p) =>
          p.id === id ? { ...p, [field]: value } : p
        ),
      }));
    },
    []
  );

  // Update a segment
  const updateSegment = useCallback(
    (id: string, endpoint: 'p1' | 'p2', field: 'x' | 'y', value: number) => {
      setCartesianElements((prev) => ({
        ...prev,
        segments: prev.segments.map((s) =>
          s.id === id ? { ...s, [endpoint]: { ...s[endpoint], [field]: value } } : s
        ),
      }));
    },
    []
  );

  // Update segment style properties (strokeStyle, arrow)
  const updateSegmentStyle = useCallback(
    (id: string, field: 'strokeStyle' | 'arrow', value: string) => {
      setCartesianElements((prev) => ({
        ...prev,
        segments: prev.segments.map((s) =>
          s.id === id ? { ...s, [field]: value } : s
        ),
      }));
    },
    []
  );

  // Update a triangle vertex
  const updateTriangleVertex = useCallback(
    (triangleId: string, vertexIndex: number, field: 'x' | 'y' | 'label', value: number | string) => {
      setCartesianElements((prev) => ({
        ...prev,
        triangles: prev.triangles.map((t) => {
          if (t.id !== triangleId) return t;
          const newVertices = [...t.vertices] as typeof t.vertices;
          newVertices[vertexIndex] = { ...newVertices[vertexIndex], [field]: value };
          return { ...t, vertices: newVertices };
        }),
      }));
    },
    []
  );

  // Update triangle field (for angles mode: position, rotation, scale)
  const updateTriangleField = useCallback(
    (triangleId: string, field: 'position' | 'rotation' | 'scale', value: { x: number; y: number } | number) => {
      setCartesianElements((prev) => ({
        ...prev,
        triangles: prev.triangles.map((t) =>
          t.id === triangleId ? { ...t, [field]: value } : t
        ),
      }));
    },
    []
  );

  // Apply Cartesian preset
  const applyCartesianPreset = useCallback((preset: CartesianDebuggerPreset) => {
    setCartesianConfig({
      xMin: preset.config.xMin,
      xMax: preset.config.xMax,
      yMin: preset.config.yMin,
      yMax: preset.config.yMax,
      scale: preset.config.scale ?? 40,
      showAxes: preset.config.showAxes ?? true,
      showGrid: preset.config.showGrid ?? true,
      showLabels: preset.config.showLabels ?? true,
      showOrigin: preset.config.showOrigin ?? true,
    });
    setCartesianElements(preset.elements);
  }, []);

  // Active vertices (depends on mode)
  const activeVertices = useMemo(() => {
    if (inputMode === 'angles') return anglesVertices;
    if (inputMode === 'sides') return sidesVertices;
    return vertices;
  }, [inputMode, anglesVertices, sidesVertices, vertices]);

  // Sync vertices when switching modes
  useEffect(() => {
    if (inputMode === 'vertices') {
      // When switching to vertices mode, keep the generated vertices
      if (angleValidation.valid) {
        setVertices(anglesVertices);
      } else if (sidesValidation.valid) {
        setVertices(sidesVertices);
      }
    }
  }, [inputMode]);

  // Side configuration
  const [sides, setSides] = useState<[SideConfig?, SideConfig?, SideConfig?]>([
    { label: 'c', showMeasurement: false },
    { label: 'a', showMeasurement: false },
    { label: 'b', showMeasurement: false },
  ]);

  // Angle configuration
  const [angles, setAngles] = useState<[AngleConfig?, AngleConfig?, AngleConfig?]>([
    { showArc: false, showDegrees: false },
    { showArc: false, showDegrees: false },
    { showArc: false, showDegrees: false },
  ]);

  // Special lines
  const [specialLines, setSpecialLines] = useState<SpecialLineConfig[]>([]);

  // Visual options
  const [showGrid, setShowGrid] = useState(true);
  const [showRightAngleMarker, setShowRightAngleMarker] = useState(false);
  const [showVertices, setShowVertices] = useState(true);
  const [showSideLabels, setShowSideLabels] = useState(true);
  const [showAngleArcs, setShowAngleArcs] = useState(false);
  const [showAngleDegrees, setShowAngleDegrees] = useState(false);

  // Apply vertex preset
  const applyVertexPreset = useCallback((preset: TrianglePreset) => {
    setVertices(preset.vertices);
    setShowRightAngleMarker(preset.rightAngleVertex !== undefined);
  }, []);

  // Apply angle preset
  const applyAnglePreset = useCallback((preset: { angles: [number, number, number] }) => {
    setAngleInputs({
      angle1: preset.angles[0],
      angle2: preset.angles[1],
      baseLength: angleInputs.baseLength,
    });
  }, [angleInputs.baseLength]);

  // Apply sides preset
  const applySidesPreset = useCallback((preset: { sides: [number, number, number] }) => {
    setSideInputs({
      side1: preset.sides[0],
      side2: preset.sides[1],
      side3: preset.sides[2],
      size: sideInputs.size,
    });
  }, [sideInputs.size]);

  // Toggle special line
  const toggleSpecialLine = useCallback(
    (type: 'altura' | 'mediana' | 'bisectriz', fromVertex: 0 | 1 | 2) => {
      setSpecialLines((prev) => {
        const existing = prev.find(
          (l) => l.type === type && l.fromVertex === fromVertex
        );
        if (existing) {
          return prev.filter((l) => l !== existing);
        }
        return [
          ...prev,
          {
            type,
            fromVertex,
            strokeStyle: 'dashed' as const,
            showLabel: true,
            showRightAngleMarker: type === 'altura',
          },
        ];
      });
    },
    []
  );

  // Check if special line is active
  const isSpecialLineActive = useCallback(
    (type: string, fromVertex: number) => {
      return specialLines.some(
        (l) => l.type === type && l.fromVertex === fromVertex
      );
    },
    [specialLines]
  );

  // Update vertex position
  const updateVertex = useCallback(
    (index: number, field: 'x' | 'y' | 'label', value: number | string) => {
      setVertices((prev) => {
        const newVertices = [...prev] as [LabeledPoint, LabeledPoint, LabeledPoint];
        newVertices[index] = { ...newVertices[index], [field]: value };
        return newVertices;
      });
    },
    []
  );

  // Update angle input
  const updateAngleInput = useCallback(
    (field: 'angle1' | 'angle2' | 'baseLength', value: number) => {
      setAngleInputs((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  // Update side input
  const updateSideInput = useCallback(
    (field: 'side1' | 'side2' | 'side3' | 'size', value: number) => {
      setSideInputs((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  // Toggle angle arc for all vertices
  const toggleAllAngleArcs = useCallback((show: boolean) => {
    setShowAngleArcs(show);
    setAngles([
      { showArc: show, showDegrees: showAngleDegrees },
      { showArc: show, showDegrees: showAngleDegrees },
      { showArc: show, showDegrees: showAngleDegrees },
    ]);
  }, [showAngleDegrees]);

  // Toggle angle degrees for all vertices
  const toggleAllAngleDegrees = useCallback((show: boolean) => {
    setShowAngleDegrees(show);
    setAngles([
      { showArc: showAngleArcs, showDegrees: show },
      { showArc: showAngleArcs, showDegrees: show },
      { showArc: showAngleArcs, showDegrees: show },
    ]);
  }, [showAngleArcs]);

  // Generate code snippet for triangle
  const generateTriangleCode = useCallback(() => {
    const propsLines = [];

    // Use fromAngles, fromSides, or vertices depending on mode
    if (inputMode === 'angles') {
      // Simple array format when no extra options
      if (angleInputs.baseLength === 150) {
        propsLines.push(`fromAngles={[${angleInputs.angle1}, ${angleInputs.angle2}, ${angle3}]}`);
      } else {
        // Object format with size option
        propsLines.push(`fromAngles={{ angles: [${angleInputs.angle1}, ${angleInputs.angle2}, ${angle3}], size: ${angleInputs.baseLength} }}`);
      }
    } else if (inputMode === 'sides') {
      // Simple array format when using default size
      if (sideInputs.size === 150) {
        propsLines.push(`fromSides={[${sideInputs.side1}, ${sideInputs.side2}, ${sideInputs.side3}]}`);
      } else {
        // Object format with size option
        propsLines.push(`fromSides={{ sides: [${sideInputs.side1}, ${sideInputs.side2}, ${sideInputs.side3}], size: ${sideInputs.size} }}`);
      }
    } else {
      propsLines.push(`vertices={[`);
      activeVertices.forEach((v, i) => {
        propsLines.push(`  { x: ${Math.round(v.x)}, y: ${Math.round(v.y)}, label: '${v.label}' }${i < 2 ? ',' : ''}`);
      });
      propsLines.push(`]}`);
    }

    if (showSideLabels) {
      propsLines.push(`sides={[`);
      propsLines.push(`  { label: 'c' },`);
      propsLines.push(`  { label: 'a' },`);
      propsLines.push(`  { label: 'b' },`);
      propsLines.push(`]}`);
    }

    if (showAngleArcs || showAngleDegrees) {
      propsLines.push(`angles={[`);
      for (let i = 0; i < 3; i++) {
        propsLines.push(`  { showArc: ${showAngleArcs}, showDegrees: ${showAngleDegrees} },`);
      }
      propsLines.push(`]}`);
    }

    if (specialLines.length > 0) {
      propsLines.push(`specialLines={[`);
      specialLines.forEach((l, i) => {
        propsLines.push(
          `  { type: '${l.type}', fromVertex: ${l.fromVertex}, strokeStyle: 'dashed', showLabel: true }${i < specialLines.length - 1 ? ',' : ''}`
        );
      });
      propsLines.push(`]}`);
    }

    if (showGrid) propsLines.push(`showGrid`);
    if (showRightAngleMarker) propsLines.push(`showRightAngleMarker`);
    if (!showVertices) propsLines.push(`showVertices={false}`);

    return `<TriangleFigure\n  ${propsLines.join('\n  ')}\n/>`;
  }, [inputMode, angleInputs, angle3, sideInputs, activeVertices, showSideLabels, showAngleArcs, showAngleDegrees, specialLines, showGrid, showRightAngleMarker, showVertices]);

  // Generate code snippet for circle
  const generateCircleCode = useCallback(() => {
    const propsLines = [];

    // Center
    propsLines.push(`center={{ x: ${circleCenter.x}, y: ${circleCenter.y}, label: '${circleCenter.label || 'O'}' }}`);
    propsLines.push(`radius={${circleRadius}}`);

    // Mode (only if circunferencia)
    if (circleMode === 'circunferencia') {
      propsLines.push(`mode="circunferencia"`);
    }

    // Visual options
    if (showCircleCenter) propsLines.push(`showCenter`);
    if (showCircleRadius) {
      propsLines.push(`showRadius={{ toAngle: ${circleRadiusAngle}, label: 'r' }}`);
    }
    if (showCircleDiameter) {
      propsLines.push(`showDiameter={{ angle: ${circleDiameterAngle}, label: 'd' }}`);
    }

    // Unified arcs (preferred API)
    if (circleArcs.length > 0) {
      propsLines.push(`arcs={[`);
      circleArcs.forEach((arc, i) => {
        const arcProps = [`startAngle: ${arc.startAngle}`, `endAngle: ${arc.endAngle}`];
        if (arc.showAngle) arcProps.push(`showAngle: true`);
        if (arc.showDegrees) arcProps.push(`showDegrees: true`);
        if (arc.angleLabel) arcProps.push(`angleLabel: '${arc.angleLabel}'`);
        if (arc.showSector) arcProps.push(`showSector: true`);
        if (arc.showRadii) arcProps.push(`showRadii: true`);
        if (arc.sectorOpacity !== undefined && arc.sectorOpacity !== 0.3) {
          arcProps.push(`sectorOpacity: ${arc.sectorOpacity}`);
        }
        propsLines.push(`  { ${arcProps.join(', ')} }${i < circleArcs.length - 1 ? ',' : ''}`);
      });
      propsLines.push(`]}`);
    }

    // Legacy: Sector (only if no unified arcs)
    if (circleArcs.length === 0 && showSector) {
      propsLines.push(`sector={{ startAngle: ${sectorStartAngle}, endAngle: ${sectorEndAngle}, showRadii: true }}`);
    }

    // Legacy: Arc (only if no unified arcs)
    if (circleArcs.length === 0 && showArc) {
      propsLines.push(`arc={{ startAngle: ${arcStartAngle}, endAngle: ${arcEndAngle}, strokeWidth: 4 }}`);
    }

    // Legacy: Central angle (only if no unified arcs)
    if (circleArcs.length === 0 && showCentralAngle) {
      propsLines.push(`centralAngle={{ startAngle: ${centralAngleStart}, endAngle: ${centralAngleEnd}, showDegrees: ${showCentralAngleDegrees} }}`);
    }

    // Chords
    if (circleChords.length > 0) {
      propsLines.push(`chords={[`);
      circleChords.forEach((chord, i) => {
        propsLines.push(`  { fromAngle: ${chord.fromAngle}, toAngle: ${chord.toAngle}, showEndpoints: true }${i < circleChords.length - 1 ? ',' : ''}`);
      });
      propsLines.push(`]}`);
    }

    if (showCircleGrid) propsLines.push(`showGrid`);

    return `<CircleFigure\n  ${propsLines.join('\n  ')}\n/>`;
  }, [circleCenter, circleRadius, circleMode, showCircleCenter, showCircleRadius, circleRadiusAngle, showCircleDiameter, circleDiameterAngle, circleArcs, showSector, sectorStartAngle, sectorEndAngle, showArc, arcStartAngle, arcEndAngle, showCentralAngle, centralAngleStart, centralAngleEnd, showCentralAngleDegrees, circleChords, showCircleGrid]);

  // Generate code for Cartesian debugger
  const generateCartesianCode = useCallback(() => {
    const lines: string[] = [];
    lines.push('<CartesianPlane');
    lines.push(`  xRange={[${cartesianConfig.xMin}, ${cartesianConfig.xMax}]}`);
    lines.push(`  yRange={[${cartesianConfig.yMin}, ${cartesianConfig.yMax}]}`);
    if (cartesianConfig.scale !== 40) lines.push(`  scale={${cartesianConfig.scale}}`);
    if (!cartesianConfig.showAxes) lines.push('  showAxes={false}');
    if (!cartesianConfig.showGrid) lines.push('  showGrid={false}');
    if (!cartesianConfig.showLabels) lines.push('  showLabels={false}');
    if (!cartesianConfig.showOrigin) lines.push('  showOrigin={false}');
    lines.push('>');

    // Points
    cartesianElements.points.forEach((p) => {
      lines.push(`  <CartesianPoint x={${p.x}} y={${p.y}}${p.label ? ` label="${p.label}"` : ''} />`);
    });

    // Segments (with style and arrow)
    cartesianElements.segments.forEach((s) => {
      const props: string[] = [
        `p1={{x: ${s.p1.x}, y: ${s.p1.y}}}`,
        `p2={{x: ${s.p2.x}, y: ${s.p2.y}}}`,
      ];
      if (s.label) props.push(`label="${s.label}"`);
      if (s.strokeStyle && s.strokeStyle !== 'solid') props.push(`strokeStyle="${s.strokeStyle}"`);
      if (s.arrow && s.arrow !== 'none') props.push(`arrow="${s.arrow}"`);
      lines.push(`  <CartesianSegment ${props.join(' ')} />`);
    });

    // Triangles (compute vertices for angles mode)
    cartesianElements.triangles.forEach((t) => {
      const vertices = computeTriangleVertices(t);
      lines.push('  <TriangleFigure');
      lines.push('    vertices={[');
      vertices.forEach((v, i) => {
        lines.push(`      { x: ${v.x.toFixed(2)}, y: ${v.y.toFixed(2)}, label: '${v.label || ''}' }${i < 2 ? ',' : ''}`);
      });
      lines.push('    ]}');
      if (t.showRightAngleMarker) lines.push('    showRightAngleMarker');
      lines.push('  />');
    });

    lines.push('</CartesianPlane>');
    return lines.join('\n');
  }, [cartesianConfig, cartesianElements, computeTriangleVertices]);

  // Generate code based on figure type
  const generateCode = useCallback(() => {
    return debuggerTab === 'triangulo' ? generateTriangleCode() : generateCircleCode();
  }, [debuggerTab, generateTriangleCode, generateCircleCode]);

  // Copy code to clipboard
  const copyCode = useCallback(() => {
    const code = debuggerTab === 'cartesian' ? generateCartesianCode() : generateCode();
    navigator.clipboard.writeText(code);
  }, [debuggerTab, generateCode, generateCartesianCode]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Heading level={1} size="md" className="mb-2">
            Figure Debugger
          </Heading>
          <Text variant="secondary">
            Herramienta interactiva para configurar y probar componentes de figuras geométricas
          </Text>
        </div>

        {/* Figure Type Selector */}
        <Card padding="md">
          <div className="flex items-center gap-4">
            <Text className="font-medium">Tipo de figura:</Text>
            <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
              <button
                onClick={() => setDebuggerTab('triangulo')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  debuggerTab === 'triangulo'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Triángulo
              </button>
              <button
                onClick={() => setDebuggerTab('circulo')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  debuggerTab === 'circulo'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Circunferencia
              </button>
              <button
                onClick={() => setDebuggerTab('cartesian')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  debuggerTab === 'cartesian'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Plano Cartesiano
              </button>
            </div>
          </div>
        </Card>

        {/* Triangle Input Mode Toggle */}
        {debuggerTab === 'triangulo' && (
          <Card padding="md">
            <div className="flex items-center gap-4">
              <Text className="font-medium">Modo de construcción:</Text>
              <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                <button
                  onClick={() => setInputMode('vertices')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    inputMode === 'vertices'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Por Vértices
                </button>
                <button
                  onClick={() => setInputMode('angles')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    inputMode === 'angles'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Por Ángulos
                </button>
                <button
                  onClick={() => setInputMode('sides')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    inputMode === 'sides'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Por Lados
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Circle Mode Toggle */}
        {debuggerTab === 'circulo' && (
          <Card padding="md">
            <div className="flex items-center gap-4">
              <Text className="font-medium">Modo:</Text>
              <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                <button
                  onClick={() => setCircleMode('circulo')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    circleMode === 'circulo'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Círculo (relleno)
                </button>
                <button
                  onClick={() => setCircleMode('circunferencia')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    circleMode === 'circunferencia'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Circunferencia (borde)
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Presets */}
        <div>
          <Heading level={2} size="sm" className="mb-4">
            Presets
          </Heading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Triangle presets */}
            {debuggerTab === 'triangulo' && inputMode === 'vertices' && VERTEX_PRESETS.map((preset) => (
              <Card
                key={preset.name}
                hover
                className="cursor-pointer transition-all hover:ring-2 hover:ring-blue-500"
                padding="md"
                onClick={() => applyVertexPreset(preset)}
              >
                <div className="text-center">
                  <Heading level={3} size="xs" className="mb-1">
                    {preset.name}
                  </Heading>
                  <Text size="xs" variant="secondary">
                    {preset.description}
                  </Text>
                </div>
              </Card>
            ))}
            {debuggerTab === 'triangulo' && inputMode === 'angles' && ANGLE_PRESETS.map((preset) => (
              <Card
                key={preset.name}
                hover
                className="cursor-pointer transition-all hover:ring-2 hover:ring-blue-500"
                padding="md"
                onClick={() => applyAnglePreset(preset)}
              >
                <div className="text-center">
                  <Heading level={3} size="xs" className="mb-1">
                    {preset.name}
                  </Heading>
                  <Text size="xs" variant="secondary">
                    {preset.description}
                  </Text>
                </div>
              </Card>
            ))}
            {debuggerTab === 'triangulo' && inputMode === 'sides' && SIDES_PRESETS.map((preset) => (
              <Card
                key={preset.name}
                hover
                className="cursor-pointer transition-all hover:ring-2 hover:ring-blue-500"
                padding="md"
                onClick={() => applySidesPreset(preset)}
              >
                <div className="text-center">
                  <Heading level={3} size="xs" className="mb-1">
                    {preset.name}
                  </Heading>
                  <Text size="xs" variant="secondary">
                    {preset.description}
                  </Text>
                </div>
              </Card>
            ))}
            {/* Circle presets */}
            {debuggerTab === 'circulo' && CIRCLE_PRESETS.map((preset) => (
              <Card
                key={preset.name}
                hover
                className="cursor-pointer transition-all hover:ring-2 hover:ring-blue-500"
                padding="md"
                onClick={() => applyCirclePreset(preset)}
              >
                <div className="text-center">
                  <Heading level={3} size="xs" className="mb-1">
                    {preset.name}
                  </Heading>
                  <Text size="xs" variant="secondary">
                    {preset.description}
                  </Text>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Controls Panel */}
          <div className="space-y-4">
            {/* ============================================ */}
            {/* CIRCLE CONTROLS */}
            {/* ============================================ */}
            {debuggerTab === 'circulo' && (
              <>
                {/* Circle Basic Controls */}
                <Card padding="lg">
                  <Heading level={3} size="xs" className="mb-4">
                    Centro y Radio
                  </Heading>
                  <div className="space-y-4">
                    {/* Center X */}
                    <div className="flex items-center gap-4">
                      <Text className="text-sm w-20">Centro X:</Text>
                      <input
                        type="range"
                        min="50"
                        max="350"
                        value={circleCenter.x}
                        onChange={(e) => setCircleCenter(prev => ({ ...prev, x: Number(e.target.value) }))}
                        className="flex-1"
                      />
                      <span className="text-sm w-12">{circleCenter.x}</span>
                    </div>
                    {/* Center Y */}
                    <div className="flex items-center gap-4">
                      <Text className="text-sm w-20">Centro Y:</Text>
                      <input
                        type="range"
                        min="50"
                        max="250"
                        value={circleCenter.y}
                        onChange={(e) => setCircleCenter(prev => ({ ...prev, y: Number(e.target.value) }))}
                        className="flex-1"
                      />
                      <span className="text-sm w-12">{circleCenter.y}</span>
                    </div>
                    {/* Radius */}
                    <div className="flex items-center gap-4">
                      <Text className="text-sm w-20">Radio:</Text>
                      <input
                        type="range"
                        min="20"
                        max="120"
                        value={circleRadius}
                        onChange={(e) => setCircleRadius(Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-sm w-12">{circleRadius}px</span>
                    </div>
                  </div>
                </Card>

                {/* Circle Visual Options */}
                <Card padding="lg">
                  <Heading level={3} size="xs" className="mb-4">
                    Opciones Visuales
                  </Heading>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showCircleGrid}
                        onChange={(e) => setShowCircleGrid(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Mostrar grid</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showCircleCenter}
                        onChange={(e) => setShowCircleCenter(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Mostrar centro</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showCircleRadius}
                        onChange={(e) => setShowCircleRadius(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Mostrar radio</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showCircleDiameter}
                        onChange={(e) => setShowCircleDiameter(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Mostrar diámetro</span>
                    </label>
                  </div>
                  {/* Radius angle */}
                  {showCircleRadius && (
                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-4">
                        <Text className="text-sm w-28">Ángulo radio:</Text>
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={circleRadiusAngle}
                          onChange={(e) => setCircleRadiusAngle(Number(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-sm w-12">{circleRadiusAngle}°</span>
                      </div>
                    </div>
                  )}
                  {/* Diameter angle */}
                  {showCircleDiameter && (
                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-4">
                        <Text className="text-sm w-28">Ángulo diámetro:</Text>
                        <input
                          type="range"
                          min="0"
                          max="180"
                          value={circleDiameterAngle}
                          onChange={(e) => setCircleDiameterAngle(Number(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-sm w-12">{circleDiameterAngle}°</span>
                      </div>
                    </div>
                  )}
                </Card>

                {/* Unified Arcs Controls (Preferred API) */}
                <Card padding="lg">
                  <div className="flex items-center justify-between mb-4">
                    <Heading level={3} size="xs">
                      Arcos
                    </Heading>
                    <Button variant="secondary" size="sm" onClick={addArc}>
                      + Agregar arco
                    </Button>
                  </div>
                  {circleArcs.length === 0 ? (
                    <Text size="sm" variant="secondary">
                      No hay arcos. Usa el botón para agregar un arco con ángulo y sector.
                    </Text>
                  ) : (
                    <div className="space-y-4">
                      {circleArcs.map((arc, i) => (
                        <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="info">Arco {i + 1}</Badge>
                            <button
                              onClick={() => removeArc(i)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Eliminar
                            </button>
                          </div>
                          <div className="space-y-3">
                            {/* Angle sliders */}
                            <div className="flex items-center gap-2">
                              <Text size="xs" className="w-16">Inicio:</Text>
                              <input
                                type="range"
                                min="0"
                                max="360"
                                value={arc.startAngle}
                                onChange={(e) => updateArc(i, { startAngle: Number(e.target.value) })}
                                className="flex-1"
                              />
                              <span className="text-xs w-10">{arc.startAngle}°</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Text size="xs" className="w-16">Fin:</Text>
                              <input
                                type="range"
                                min="0"
                                max="360"
                                value={arc.endAngle}
                                onChange={(e) => updateArc(i, { endAngle: Number(e.target.value) })}
                                className="flex-1"
                              />
                              <span className="text-xs w-10">{arc.endAngle}°</span>
                            </div>
                            {/* Options grid */}
                            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={arc.showAngle ?? false}
                                  onChange={(e) => updateArc(i, { showAngle: e.target.checked })}
                                  className="rounded"
                                />
                                <span className="text-xs">Mostrar ángulo</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={arc.showDegrees ?? false}
                                  onChange={(e) => updateArc(i, { showDegrees: e.target.checked })}
                                  className="rounded"
                                />
                                <span className="text-xs">Mostrar grados</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={arc.showSector ?? false}
                                  onChange={(e) => updateArc(i, { showSector: e.target.checked })}
                                  className="rounded"
                                />
                                <span className="text-xs">Mostrar sector</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={arc.showRadii ?? false}
                                  onChange={(e) => updateArc(i, { showRadii: e.target.checked })}
                                  className="rounded"
                                />
                                <span className="text-xs">Mostrar radios</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>

                {/* Chords */}
                <Card padding="lg">
                  <div className="flex items-center justify-between mb-4">
                    <Heading level={3} size="xs">
                      Cuerdas
                    </Heading>
                    <Button variant="secondary" size="sm" onClick={addChord}>
                      + Agregar
                    </Button>
                  </div>
                  {circleChords.length === 0 ? (
                    <Text size="sm" variant="secondary">
                      No hay cuerdas. Usa el botón para agregar.
                    </Text>
                  ) : (
                    <div className="space-y-3">
                      {circleChords.map((chord, i) => (
                        <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="info">Cuerda {i + 1}</Badge>
                            <button
                              onClick={() => removeChord(i)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Eliminar
                            </button>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Text size="xs" className="w-16">Desde:</Text>
                              <input
                                type="range"
                                min="0"
                                max="360"
                                value={chord.fromAngle}
                                onChange={(e) => updateChord(i, 'fromAngle', Number(e.target.value))}
                                className="flex-1"
                              />
                              <span className="text-xs w-10">{chord.fromAngle}°</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Text size="xs" className="w-16">Hasta:</Text>
                              <input
                                type="range"
                                min="0"
                                max="360"
                                value={chord.toAngle}
                                onChange={(e) => updateChord(i, 'toAngle', Number(e.target.value))}
                                className="flex-1"
                              />
                              <span className="text-xs w-10">{chord.toAngle}°</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </>
            )}

            {/* ============================================ */}
            {/* TRIANGLE CONTROLS */}
            {/* ============================================ */}
            {/* Vertex Controls (vertices mode) */}
            {debuggerTab === 'triangulo' && inputMode === 'vertices' && (
              <Card padding="lg">
                <Heading level={3} size="xs" className="mb-4">
                  Vértices
                </Heading>
                <div className="space-y-4">
                  {vertices.map((vertex, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Badge variant="info" className="w-8">
                        {vertex.label}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600 dark:text-gray-400">X:</label>
                        <input
                          type="range"
                          min="50"
                          max="350"
                          value={vertex.x}
                          onChange={(e) => updateVertex(i, 'x', Number(e.target.value))}
                          className="w-24"
                        />
                        <span className="text-sm w-8">{vertex.x}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600 dark:text-gray-400">Y:</label>
                        <input
                          type="range"
                          min="30"
                          max="250"
                          value={vertex.y}
                          onChange={(e) => updateVertex(i, 'y', Number(e.target.value))}
                          className="w-24"
                        />
                        <span className="text-sm w-8">{vertex.y}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Angle Controls (angles mode) */}
            {debuggerTab === 'triangulo' && inputMode === 'angles' && (
              <Card padding="lg">
                <Heading level={3} size="xs" className="mb-4">
                  Ángulos Interiores
                </Heading>
                <div className="space-y-4">
                  {/* Angle A */}
                  <div className="flex items-center gap-4">
                    <Badge variant="info" className="w-8">α</Badge>
                    <div className="flex items-center gap-2 flex-1">
                      <label className="text-sm text-gray-600 dark:text-gray-400 w-20">Ángulo A:</label>
                      <input
                        type="range"
                        min="10"
                        max="150"
                        value={angleInputs.angle1}
                        onChange={(e) => updateAngleInput('angle1', Number(e.target.value))}
                        className="flex-1"
                      />
                      <input
                        type="number"
                        min="10"
                        max="150"
                        value={angleInputs.angle1}
                        onChange={(e) => updateAngleInput('angle1', Number(e.target.value))}
                        className="w-16 px-2 py-1 text-sm border rounded dark:bg-gray-800 dark:border-gray-600"
                      />
                      <span className="text-sm">°</span>
                    </div>
                  </div>

                  {/* Angle B */}
                  <div className="flex items-center gap-4">
                    <Badge variant="info" className="w-8">β</Badge>
                    <div className="flex items-center gap-2 flex-1">
                      <label className="text-sm text-gray-600 dark:text-gray-400 w-20">Ángulo B:</label>
                      <input
                        type="range"
                        min="10"
                        max="150"
                        value={angleInputs.angle2}
                        onChange={(e) => updateAngleInput('angle2', Number(e.target.value))}
                        className="flex-1"
                      />
                      <input
                        type="number"
                        min="10"
                        max="150"
                        value={angleInputs.angle2}
                        onChange={(e) => updateAngleInput('angle2', Number(e.target.value))}
                        className="w-16 px-2 py-1 text-sm border rounded dark:bg-gray-800 dark:border-gray-600"
                      />
                      <span className="text-sm">°</span>
                    </div>
                  </div>

                  {/* Angle C (calculated) */}
                  <div className="flex items-center gap-4">
                    <Badge variant={angleValidation.valid ? 'success' : 'danger'} className="w-8">γ</Badge>
                    <div className="flex items-center gap-2 flex-1">
                      <label className="text-sm text-gray-600 dark:text-gray-400 w-20">Ángulo C:</label>
                      <div className="flex-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                        {angle3}° <span className="text-gray-500">(calculado)</span>
                      </div>
                    </div>
                  </div>

                  {/* Validation message */}
                  {!angleValidation.valid && (
                    <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <Text size="sm" className="text-red-600 dark:text-red-400">
                        {angleValidation.error}
                      </Text>
                    </div>
                  )}

                  {/* Base length */}
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                      <Text className="text-sm font-medium w-28">Tamaño base:</Text>
                      <input
                        type="range"
                        min="80"
                        max="250"
                        value={angleInputs.baseLength}
                        onChange={(e) => updateAngleInput('baseLength', Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-sm w-12">{angleInputs.baseLength}px</span>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Sides Controls (sides mode) */}
            {debuggerTab === 'triangulo' && inputMode === 'sides' && (
              <Card padding="lg">
                <Heading level={3} size="xs" className="mb-4">
                  Longitud de Lados
                </Heading>
                <div className="space-y-4">
                  {/* Side a (opposite to vertex A) */}
                  <div className="flex items-center gap-4">
                    <Badge variant="info" className="w-8">a</Badge>
                    <div className="flex items-center gap-2 flex-1">
                      <label className="text-sm text-gray-600 dark:text-gray-400 w-20">Lado a:</label>
                      <input
                        type="range"
                        min="1"
                        max="20"
                        step="0.5"
                        value={sideInputs.side1}
                        onChange={(e) => updateSideInput('side1', Number(e.target.value))}
                        className="flex-1"
                      />
                      <input
                        type="number"
                        min="1"
                        max="20"
                        step="0.5"
                        value={sideInputs.side1}
                        onChange={(e) => updateSideInput('side1', Number(e.target.value))}
                        className="w-16 px-2 py-1 text-sm border rounded dark:bg-gray-800 dark:border-gray-600"
                      />
                    </div>
                  </div>

                  {/* Side b */}
                  <div className="flex items-center gap-4">
                    <Badge variant="info" className="w-8">b</Badge>
                    <div className="flex items-center gap-2 flex-1">
                      <label className="text-sm text-gray-600 dark:text-gray-400 w-20">Lado b:</label>
                      <input
                        type="range"
                        min="1"
                        max="20"
                        step="0.5"
                        value={sideInputs.side2}
                        onChange={(e) => updateSideInput('side2', Number(e.target.value))}
                        className="flex-1"
                      />
                      <input
                        type="number"
                        min="1"
                        max="20"
                        step="0.5"
                        value={sideInputs.side2}
                        onChange={(e) => updateSideInput('side2', Number(e.target.value))}
                        className="w-16 px-2 py-1 text-sm border rounded dark:bg-gray-800 dark:border-gray-600"
                      />
                    </div>
                  </div>

                  {/* Side c */}
                  <div className="flex items-center gap-4">
                    <Badge variant={sidesValidation.valid ? 'info' : 'danger'} className="w-8">c</Badge>
                    <div className="flex items-center gap-2 flex-1">
                      <label className="text-sm text-gray-600 dark:text-gray-400 w-20">Lado c:</label>
                      <input
                        type="range"
                        min="1"
                        max="20"
                        step="0.5"
                        value={sideInputs.side3}
                        onChange={(e) => updateSideInput('side3', Number(e.target.value))}
                        className="flex-1"
                      />
                      <input
                        type="number"
                        min="1"
                        max="20"
                        step="0.5"
                        value={sideInputs.side3}
                        onChange={(e) => updateSideInput('side3', Number(e.target.value))}
                        className="w-16 px-2 py-1 text-sm border rounded dark:bg-gray-800 dark:border-gray-600"
                      />
                    </div>
                  </div>

                  {/* Validation message */}
                  {!sidesValidation.valid && (
                    <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <Text size="sm" className="text-red-600 dark:text-red-400">
                        {sidesValidation.error}
                      </Text>
                    </div>
                  )}

                  {/* Size */}
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                      <Text className="text-sm font-medium w-28">Tamaño:</Text>
                      <input
                        type="range"
                        min="80"
                        max="250"
                        value={sideInputs.size}
                        onChange={(e) => updateSideInput('size', Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-sm w-12">{sideInputs.size}px</span>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Visual Options (Triangle) */}
            {debuggerTab === 'triangulo' && (
              <Card padding="lg">
                <Heading level={3} size="xs" className="mb-4">
                  Opciones Visuales
                </Heading>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showGrid}
                      onChange={(e) => setShowGrid(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Mostrar grid</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showVertices}
                      onChange={(e) => setShowVertices(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Mostrar vértices</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showSideLabels}
                      onChange={(e) => setShowSideLabels(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Labels de lados</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showRightAngleMarker}
                      onChange={(e) => setShowRightAngleMarker(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Marcador ángulo recto</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showAngleArcs}
                      onChange={(e) => toggleAllAngleArcs(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Arcos de ángulos</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showAngleDegrees}
                      onChange={(e) => toggleAllAngleDegrees(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Mostrar grados</span>
                  </label>
                </div>
              </Card>
            )}

            {/* Special Lines (Triangle) */}
            {debuggerTab === 'triangulo' && (
              <Card padding="lg">
                <Heading level={3} size="xs" className="mb-4">
                  Líneas Especiales
                </Heading>
                <div className="space-y-3">
                  {(['altura', 'mediana', 'bisectriz'] as const).map((type) => (
                    <div key={type} className="flex items-center gap-4">
                      <span className="text-sm font-medium w-20 capitalize">{type}:</span>
                      <div className="flex gap-2">
                        {([0, 1, 2] as const).map((v) => (
                          <button
                            key={v}
                            onClick={() => toggleSpecialLine(type, v)}
                            className={`px-3 py-1 text-sm rounded transition-colors ${
                              isSpecialLineActive(type, v)
                                ? 'bg-purple-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                          >
                            {activeVertices[v].label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Code Export */}
            <Card padding="lg">
              <div className="flex items-center justify-between mb-3">
                <Heading level={3} size="xs">
                  Código Generado
                </Heading>
                <Button variant="secondary" size="sm" onClick={copyCode}>
                  Copiar
                </Button>
              </div>
              <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-xs overflow-x-auto">
                {generateCode()}
              </pre>
            </Card>
          </div>

          {/* Preview */}
          <div>
            <Card padding="lg" className="sticky top-4">
              <Heading level={3} size="xs" className="mb-4">
                Vista Previa
              </Heading>
              <div className="flex justify-center bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                {debuggerTab === 'triangulo' ? (
                  <TriangleFigure
                    vertices={activeVertices}
                    sides={showSideLabels ? sides : undefined}
                    angles={showAngleArcs || showAngleDegrees ? angles : undefined}
                    specialLines={specialLines.length > 0 ? specialLines : undefined}
                    showGrid={showGrid}
                    showRightAngleMarker={showRightAngleMarker}
                    showVertices={showVertices}
                    width={400}
                    height={300}
                  />
                ) : (
                  <CircleFigure
                    center={circleCenter}
                    radius={circleRadius}
                    mode={circleMode}
                    showCenter={showCircleCenter}
                    showRadius={showCircleRadius ? { toAngle: circleRadiusAngle, label: 'r' } : false}
                    showDiameter={showCircleDiameter ? { angle: circleDiameterAngle, label: 'd' } : false}
                    arcs={circleArcs.length > 0 ? circleArcs : undefined}
                    chords={circleChords.length > 0 ? circleChords : undefined}
                    showGrid={showCircleGrid}
                    width={400}
                    height={300}
                  />
                )}
              </div>

              {/* Current angles info (in angles mode - triangle) */}
              {debuggerTab === 'triangulo' && inputMode === 'angles' && angleValidation.valid && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Text size="sm" className="font-medium mb-1">
                    Ángulos del triángulo:
                  </Text>
                  <Text size="sm" variant="secondary">
                    α = {angleInputs.angle1}°, β = {angleInputs.angle2}°, γ = {angle3}°
                  </Text>
                  <Text size="xs" variant="secondary" className="mt-1">
                    Suma: {angleInputs.angle1 + angleInputs.angle2 + angle3}°
                  </Text>
                </div>
              )}

              {/* Current sides info (in sides mode - triangle) */}
              {debuggerTab === 'triangulo' && inputMode === 'sides' && sidesValidation.valid && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Text size="sm" className="font-medium mb-1">
                    Lados del triángulo:
                  </Text>
                  <Text size="sm" variant="secondary">
                    a = {sideInputs.side1}, b = {sideInputs.side2}, c = {sideInputs.side3}
                  </Text>
                  <Text size="xs" variant="secondary" className="mt-1">
                    Perímetro: {(sideInputs.side1 + sideInputs.side2 + sideInputs.side3).toFixed(1)}
                  </Text>
                </div>
              )}

              {/* Circle info display */}
              {debuggerTab === 'circulo' && circleValidation.valid && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Text size="sm" className="font-medium mb-1">
                    Propiedades del círculo:
                  </Text>
                  <div className="space-y-1">
                    <Text size="sm" variant="secondary">
                      Radio: {circleRadius}px | Diámetro: {circleRadius * 2}px
                    </Text>
                    <Text size="sm" variant="secondary">
                      Circunferencia: {circumference(circleRadius).toFixed(2)}px
                    </Text>
                    <Text size="sm" variant="secondary">
                      Área: {area(circleRadius).toFixed(2)}px²
                    </Text>
                    {circleArcs.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-blue-200 dark:border-blue-800">
                        <Text size="xs" className="font-medium mb-1">Arcos:</Text>
                        {circleArcs.map((arc, i) => (
                          <Text key={i} size="xs" variant="secondary">
                            Arco {i + 1}: {angleDifference(arc.startAngle, arc.endAngle).toFixed(0)}° |
                            Longitud: {arcLength(circleRadius, angleDifference(arc.startAngle, arc.endAngle)).toFixed(2)}px
                            {arc.showSector && ` | Área: ${sectorArea(circleRadius, angleDifference(arc.startAngle, arc.endAngle)).toFixed(2)}px²`}
                          </Text>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Legend */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Text size="sm" className="font-medium mb-2">
                  Leyenda de colores:
                </Text>
                {debuggerTab === 'triangulo' ? (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-1 bg-blue-500 rounded"></div>
                      <span>Triángulo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-1 bg-amber-500 rounded"></div>
                      <span>Arcos de ángulo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-1 bg-purple-500 rounded"></div>
                      <span>Líneas especiales</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-1 bg-red-500 rounded"></div>
                      <span>Ángulo recto</span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-1 bg-blue-500 rounded"></div>
                      <span>Círculo/Circunferencia</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-1 bg-purple-500 rounded"></div>
                      <span>Sector/Radio/Diámetro</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-1 bg-amber-500 rounded"></div>
                      <span>Arco/Ángulo central</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-1 bg-emerald-500 rounded"></div>
                      <span>Cuerdas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <span>Centro</span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Cartesian Plane Debugger */}
        {debuggerTab === 'cartesian' && (
          <>
            {/* Presets */}
            <div>
              <Heading level={2} size="sm" className="mb-4">
                Presets
              </Heading>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {CARTESIAN_DEBUGGER_PRESETS.map((preset) => (
                  <Card
                    key={preset.name}
                    hover
                    className="cursor-pointer transition-all hover:ring-2 hover:ring-blue-500"
                    padding="md"
                    onClick={() => applyCartesianPreset(preset)}
                  >
                    <div className="text-center">
                      <Heading level={3} size="xs" className="mb-1">
                        {preset.name}
                      </Heading>
                      <Text size="xs" variant="secondary">
                        {preset.description}
                      </Text>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Controls Panel */}
              <div className="space-y-4">
                {/* Plane Configuration */}
                <Card padding="lg">
                  <Heading level={3} size="xs" className="mb-4">
                    Configuración del Plano
                  </Heading>
                  <div className="space-y-4">
                    {/* X Range */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">X mínimo:</label>
                        <input
                          type="number"
                          value={cartesianConfig.xMin}
                          onChange={(e) => updateCartesianConfig('xMin', Number(e.target.value))}
                          className="w-full px-3 py-2 text-sm border rounded dark:bg-gray-800 dark:border-gray-600"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">X máximo:</label>
                        <input
                          type="number"
                          value={cartesianConfig.xMax}
                          onChange={(e) => updateCartesianConfig('xMax', Number(e.target.value))}
                          className="w-full px-3 py-2 text-sm border rounded dark:bg-gray-800 dark:border-gray-600"
                        />
                      </div>
                    </div>

                    {/* Y Range */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">Y mínimo:</label>
                        <input
                          type="number"
                          value={cartesianConfig.yMin}
                          onChange={(e) => updateCartesianConfig('yMin', Number(e.target.value))}
                          className="w-full px-3 py-2 text-sm border rounded dark:bg-gray-800 dark:border-gray-600"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">Y máximo:</label>
                        <input
                          type="number"
                          value={cartesianConfig.yMax}
                          onChange={(e) => updateCartesianConfig('yMax', Number(e.target.value))}
                          className="w-full px-3 py-2 text-sm border rounded dark:bg-gray-800 dark:border-gray-600"
                        />
                      </div>
                    </div>

                    {/* Scale slider */}
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                        Escala (px/unidad): {cartesianConfig.scale}
                      </label>
                      <input
                        type="range"
                        min="20"
                        max="60"
                        value={cartesianConfig.scale}
                        onChange={(e) => updateCartesianConfig('scale', Number(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    {/* Toggle checkboxes */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cartesianConfig.showAxes}
                          onChange={(e) => updateCartesianConfig('showAxes', e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm">Ejes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cartesianConfig.showGrid}
                          onChange={(e) => updateCartesianConfig('showGrid', e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm">Cuadrícula</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cartesianConfig.showLabels}
                          onChange={(e) => updateCartesianConfig('showLabels', e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm">Etiquetas</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cartesianConfig.showOrigin}
                          onChange={(e) => updateCartesianConfig('showOrigin', e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm">Origen</span>
                      </label>
                    </div>
                  </div>
                </Card>

                {/* Elements Management */}
                <Card padding="lg">
                  <div className="flex items-center justify-between mb-4">
                    <Heading level={3} size="xs">
                      Elementos
                    </Heading>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" onClick={addPoint}>
                        + Punto
                      </Button>
                      <Button variant="secondary" size="sm" onClick={addSegment}>
                        + Segmento
                      </Button>
                      <div className="relative group">
                        <Button variant="secondary" size="sm" onClick={addTriangle}>
                          + Triángulo
                        </Button>
                        {/* Triangle mode dropdown */}
                        <div className="absolute right-0 top-full mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 p-3">
                          <Text size="xs" className="font-medium mb-2">Modo de construcción:</Text>
                          <div className="space-y-2 mb-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="triangleMode"
                                value="vertices"
                                checked={newTriangleMode === 'vertices'}
                                onChange={() => setNewTriangleMode('vertices')}
                                className="rounded"
                              />
                              <span className="text-xs">Por vértices</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="triangleMode"
                                value="angles"
                                checked={newTriangleMode === 'angles'}
                                onChange={() => setNewTriangleMode('angles')}
                                className="rounded"
                              />
                              <span className="text-xs">Por ángulos</span>
                            </label>
                          </div>

                          {newTriangleMode === 'angles' && (
                            <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                              <Text size="xs" className="text-gray-500">Ángulos (deben sumar 180°):</Text>
                              <div className="grid grid-cols-3 gap-1">
                                <input
                                  type="number"
                                  min="1"
                                  max="178"
                                  value={newTriangleAngles[0]}
                                  onChange={(e) => setNewTriangleAngles([Number(e.target.value), newTriangleAngles[1], newTriangleAngles[2]])}
                                  className="w-full px-2 py-1 text-xs border rounded dark:bg-gray-700 dark:border-gray-600"
                                  placeholder="α"
                                />
                                <input
                                  type="number"
                                  min="1"
                                  max="178"
                                  value={newTriangleAngles[1]}
                                  onChange={(e) => setNewTriangleAngles([newTriangleAngles[0], Number(e.target.value), newTriangleAngles[2]])}
                                  className="w-full px-2 py-1 text-xs border rounded dark:bg-gray-700 dark:border-gray-600"
                                  placeholder="β"
                                />
                                <input
                                  type="number"
                                  min="1"
                                  max="178"
                                  value={newTriangleAngles[2]}
                                  onChange={(e) => setNewTriangleAngles([newTriangleAngles[0], newTriangleAngles[1], Number(e.target.value)])}
                                  className="w-full px-2 py-1 text-xs border rounded dark:bg-gray-700 dark:border-gray-600"
                                  placeholder="γ"
                                />
                              </div>
                              <Text size="xs" className={`${newTriangleAngles[0] + newTriangleAngles[1] + newTriangleAngles[2] === 180 ? 'text-green-600' : 'text-red-500'}`}>
                                Suma: {newTriangleAngles[0] + newTriangleAngles[1] + newTriangleAngles[2]}°
                              </Text>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Points List */}
                  {cartesianElements.points.length > 0 && (
                    <div className="mb-4">
                      <Text size="sm" className="font-medium mb-2 text-blue-600 dark:text-blue-400">
                        Puntos
                      </Text>
                      <div className="space-y-2">
                        {cartesianElements.points.map((point) => (
                          <div key={point.id} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                            <Badge variant="info" size="sm">{point.id}</Badge>
                            <input
                              type="text"
                              maxLength={3}
                              value={point.label || ''}
                              onChange={(e) => updatePoint(point.id, 'label', e.target.value)}
                              className="w-12 px-2 py-1 text-xs border rounded dark:bg-gray-700 dark:border-gray-600 text-center"
                              placeholder="label"
                            />
                            <span className="text-xs text-gray-500">x:</span>
                            <input
                              type="number"
                              step="0.5"
                              value={point.x}
                              onChange={(e) => updatePoint(point.id, 'x', Number(e.target.value))}
                              className="w-16 px-2 py-1 text-xs border rounded dark:bg-gray-700 dark:border-gray-600"
                            />
                            <span className="text-xs text-gray-500">y:</span>
                            <input
                              type="number"
                              step="0.5"
                              value={point.y}
                              onChange={(e) => updatePoint(point.id, 'y', Number(e.target.value))}
                              className="w-16 px-2 py-1 text-xs border rounded dark:bg-gray-700 dark:border-gray-600"
                            />
                            <button
                              onClick={() => removeElement('points', point.id)}
                              className="ml-auto text-red-500 hover:text-red-700 text-sm px-2"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Segments List */}
                  {cartesianElements.segments.length > 0 && (
                    <div className="mb-4">
                      <Text size="sm" className="font-medium mb-2 text-green-600 dark:text-green-400">
                        Segmentos
                      </Text>
                      <div className="space-y-2">
                        {cartesianElements.segments.map((segment) => (
                          <div key={segment.id} className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="success" size="sm">{segment.id}</Badge>
                              <button
                                onClick={() => removeElement('segments', segment.id)}
                                className="ml-auto text-red-500 hover:text-red-700 text-sm px-2"
                              >
                                ×
                              </button>
                            </div>
                            <div className="flex items-center gap-2 text-xs mb-2">
                              <span className="text-gray-500">P1:</span>
                              <input
                                type="number"
                                step="0.5"
                                value={segment.p1.x}
                                onChange={(e) => updateSegment(segment.id, 'p1', 'x', Number(e.target.value))}
                                className="w-14 px-1 py-0.5 border rounded dark:bg-gray-700 dark:border-gray-600"
                              />
                              <input
                                type="number"
                                step="0.5"
                                value={segment.p1.y}
                                onChange={(e) => updateSegment(segment.id, 'p1', 'y', Number(e.target.value))}
                                className="w-14 px-1 py-0.5 border rounded dark:bg-gray-700 dark:border-gray-600"
                              />
                              <span className="text-gray-500 ml-2">P2:</span>
                              <input
                                type="number"
                                step="0.5"
                                value={segment.p2.x}
                                onChange={(e) => updateSegment(segment.id, 'p2', 'x', Number(e.target.value))}
                                className="w-14 px-1 py-0.5 border rounded dark:bg-gray-700 dark:border-gray-600"
                              />
                              <input
                                type="number"
                                step="0.5"
                                value={segment.p2.y}
                                onChange={(e) => updateSegment(segment.id, 'p2', 'y', Number(e.target.value))}
                                className="w-14 px-1 py-0.5 border rounded dark:bg-gray-700 dark:border-gray-600"
                              />
                            </div>
                            {/* Style and Arrow controls */}
                            <div className="flex items-center gap-3 text-xs pt-2 border-t border-gray-200 dark:border-gray-700">
                              <div className="flex items-center gap-1">
                                <span className="text-gray-500">Estilo:</span>
                                <select
                                  value={segment.strokeStyle || 'solid'}
                                  onChange={(e) => updateSegmentStyle(segment.id, 'strokeStyle', e.target.value)}
                                  className="px-1 py-0.5 border rounded text-xs dark:bg-gray-700 dark:border-gray-600"
                                >
                                  <option value="solid">───</option>
                                  <option value="dashed">- - -</option>
                                  <option value="dotted">···</option>
                                </select>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-gray-500">Flecha:</span>
                                <select
                                  value={segment.arrow || 'none'}
                                  onChange={(e) => updateSegmentStyle(segment.id, 'arrow', e.target.value)}
                                  className="px-1 py-0.5 border rounded text-xs dark:bg-gray-700 dark:border-gray-600"
                                >
                                  <option value="none">Sin</option>
                                  <option value="end">→</option>
                                  <option value="start">←</option>
                                  <option value="both">↔</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Triangles List */}
                  {cartesianElements.triangles.length > 0 && (
                    <div>
                      <Text size="sm" className="font-medium mb-2 text-purple-600 dark:text-purple-400">
                        Triángulos
                      </Text>
                      <div className="space-y-2">
                        {cartesianElements.triangles.map((triangle) => (
                          <div key={triangle.id} className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="warning" size="sm">{triangle.id}</Badge>
                              {triangle.constructionMode === 'angles' && (
                                <span className="text-xs text-gray-500">
                                  ({triangle.angles?.join('° - ')}°)
                                </span>
                              )}
                              <button
                                onClick={() => removeElement('triangles', triangle.id)}
                                className="ml-auto text-red-500 hover:text-red-700 text-sm px-2"
                              >
                                ×
                              </button>
                            </div>

                            {/* Vertices mode: direct vertex editing */}
                            {triangle.constructionMode !== 'angles' && (
                              <div className="space-y-1">
                                {triangle.vertices.map((v, i) => (
                                  <div key={i} className="flex items-center gap-2 text-xs">
                                    <input
                                      type="text"
                                      maxLength={2}
                                      value={v.label || ''}
                                      onChange={(e) => updateTriangleVertex(triangle.id, i, 'label', e.target.value)}
                                      className="w-8 px-1 py-0.5 border rounded dark:bg-gray-700 dark:border-gray-600 text-center"
                                    />
                                    <span className="text-gray-500">x:</span>
                                    <input
                                      type="number"
                                      step="0.5"
                                      value={v.x}
                                      onChange={(e) => updateTriangleVertex(triangle.id, i, 'x', Number(e.target.value))}
                                      className="w-14 px-1 py-0.5 border rounded dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <span className="text-gray-500">y:</span>
                                    <input
                                      type="number"
                                      step="0.5"
                                      value={v.y}
                                      onChange={(e) => updateTriangleVertex(triangle.id, i, 'y', Number(e.target.value))}
                                      className="w-14 px-1 py-0.5 border rounded dark:bg-gray-700 dark:border-gray-600"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Angles mode: position, rotation, scale controls */}
                            {triangle.constructionMode === 'angles' && (
                              <div className="space-y-2">
                                {/* Position */}
                                <div className="flex items-center gap-2 text-xs">
                                  <span className="text-gray-500 w-12">Posición:</span>
                                  <span className="text-gray-500">x:</span>
                                  <input
                                    type="number"
                                    step="0.5"
                                    value={triangle.position?.x ?? 0}
                                    onChange={(e) => updateTriangleField(triangle.id, 'position', {
                                      x: Number(e.target.value),
                                      y: triangle.position?.y ?? 0,
                                    })}
                                    className="w-14 px-1 py-0.5 border rounded dark:bg-gray-700 dark:border-gray-600"
                                  />
                                  <span className="text-gray-500">y:</span>
                                  <input
                                    type="number"
                                    step="0.5"
                                    value={triangle.position?.y ?? 0}
                                    onChange={(e) => updateTriangleField(triangle.id, 'position', {
                                      x: triangle.position?.x ?? 0,
                                      y: Number(e.target.value),
                                    })}
                                    className="w-14 px-1 py-0.5 border rounded dark:bg-gray-700 dark:border-gray-600"
                                  />
                                </div>

                                {/* Rotation */}
                                <div className="flex items-center gap-2 text-xs">
                                  <span className="text-gray-500 w-12">Rotación:</span>
                                  <input
                                    type="range"
                                    min="0"
                                    max="360"
                                    step="5"
                                    value={triangle.rotation ?? 0}
                                    onChange={(e) => updateTriangleField(triangle.id, 'rotation', Number(e.target.value))}
                                    className="flex-1"
                                  />
                                  <span className="w-10 text-right">{triangle.rotation ?? 0}°</span>
                                </div>

                                {/* Scale */}
                                <div className="flex items-center gap-2 text-xs">
                                  <span className="text-gray-500 w-12">Escala:</span>
                                  <input
                                    type="number"
                                    step="0.5"
                                    min="0.5"
                                    max="10"
                                    value={triangle.scale ?? 2}
                                    onChange={(e) => updateTriangleField(triangle.id, 'scale', Number(e.target.value))}
                                    className="w-16 px-1 py-0.5 border rounded dark:bg-gray-700 dark:border-gray-600"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Empty state */}
                  {cartesianElements.points.length === 0 &&
                    cartesianElements.segments.length === 0 &&
                    cartesianElements.triangles.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Text size="sm">
                          No hay elementos. Usa los botones de arriba para agregar puntos, segmentos o triángulos.
                        </Text>
                      </div>
                    )}
                </Card>

                {/* Code Export */}
                <Card padding="lg">
                  <div className="flex items-center justify-between mb-3">
                    <Heading level={3} size="xs">
                      Código Generado
                    </Heading>
                    <Button variant="secondary" size="sm" onClick={copyCode}>
                      Copiar
                    </Button>
                  </div>
                  <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-xs overflow-x-auto">
                    {generateCartesianCode()}
                  </pre>
                </Card>
              </div>

              {/* Preview */}
              <div>
                <Card padding="lg" className="sticky top-4">
                  <Heading level={3} size="xs" className="mb-4">
                    Vista Previa
                  </Heading>
                  <div className="flex justify-center bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700 overflow-auto">
                    <CartesianPlane
                      xRange={[cartesianConfig.xMin, cartesianConfig.xMax]}
                      yRange={[cartesianConfig.yMin, cartesianConfig.yMax]}
                      scale={cartesianConfig.scale}
                      showAxes={cartesianConfig.showAxes}
                      showGrid={cartesianConfig.showGrid}
                      showLabels={cartesianConfig.showLabels}
                      showOrigin={cartesianConfig.showOrigin}
                    >
                      {/* Render Points */}
                      {cartesianElements.points.map((point) => (
                        <CartesianPoint
                          key={point.id}
                          x={point.x}
                          y={point.y}
                          label={point.label}
                          color={point.color}
                        />
                      ))}
                      {/* Render Segments */}
                      {cartesianElements.segments.map((segment) => (
                        <CartesianSegment
                          key={segment.id}
                          p1={segment.p1}
                          p2={segment.p2}
                          label={segment.label}
                          color={segment.color}
                          strokeStyle={segment.strokeStyle}
                          arrow={segment.arrow}
                        />
                      ))}
                      {/* Render Triangles */}
                      {cartesianElements.triangles.map((triangle) => {
                        const vertices = computeTriangleVertices(triangle);
                        return (
                          <TriangleFigure
                            key={triangle.id}
                            vertices={vertices as [LabeledPoint, LabeledPoint, LabeledPoint]}
                            showRightAngleMarker={triangle.showRightAngleMarker}
                            showVertices
                          />
                        );
                      })}
                    </CartesianPlane>
                  </div>

                  {/* Info */}
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Text size="sm" className="font-medium mb-1">
                      Elementos en el plano:
                    </Text>
                    <Text size="sm" variant="secondary">
                      {cartesianElements.points.length} punto(s), {cartesianElements.segments.length} segmento(s), {cartesianElements.triangles.length} triángulo(s)
                    </Text>
                    <Text size="xs" variant="secondary" className="mt-1">
                      Plano: x ∈ [{cartesianConfig.xMin}, {cartesianConfig.xMax}], y ∈ [{cartesianConfig.yMin}, {cartesianConfig.yMax}]
                    </Text>
                  </div>

                  {/* Legend */}
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Text size="sm" className="font-medium mb-2">
                      Leyenda de colores:
                    </Text>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>Puntos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-1 bg-green-500 rounded"></div>
                        <span>Segmentos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-1 bg-blue-500 rounded"></div>
                        <span>Triángulos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>Origen</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

export default function FigureDebugPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <FigureDebugContent />
    </ProtectedRoute>
  );
}
