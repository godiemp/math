'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { Card, Button, Heading, Text, Badge } from '@/components/ui';
import AdminLayout from '@/components/layout/AdminLayout';
import { TriangleFigure } from '@/components/figures/TriangleFigure';
import { CircleFigure } from '@/components/figures/CircleFigure';
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
  SectorConfig,
  ArcConfig,
  ChordConfig,
  CentralAngleConfig,
  CirclePreset,
} from '@/lib/types/circle';

type FigureType = 'triangle' | 'circle';
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

function FigureDebugContent() {
  // Figure type (triangle or circle)
  const [figureType, setFigureType] = useState<FigureType>('triangle');

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

  // Sector state
  const [showSector, setShowSector] = useState(false);
  const [sectorStartAngle, setSectorStartAngle] = useState(0);
  const [sectorEndAngle, setSectorEndAngle] = useState(90);

  // Arc state
  const [showArc, setShowArc] = useState(false);
  const [arcStartAngle, setArcStartAngle] = useState(0);
  const [arcEndAngle, setArcEndAngle] = useState(90);

  // Central angle state
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

  // Sector config
  const sectorConfig = useMemo<SectorConfig | undefined>(() => {
    if (!showSector) return undefined;
    return {
      startAngle: sectorStartAngle,
      endAngle: sectorEndAngle,
      showRadii: true,
    };
  }, [showSector, sectorStartAngle, sectorEndAngle]);

  // Arc config
  const arcConfig = useMemo<ArcConfig | undefined>(() => {
    if (!showArc) return undefined;
    return {
      startAngle: arcStartAngle,
      endAngle: arcEndAngle,
      strokeWidth: 4,
    };
  }, [showArc, arcStartAngle, arcEndAngle]);

  // Central angle config
  const centralAngleConfig = useMemo<CentralAngleConfig | undefined>(() => {
    if (!showCentralAngle) return undefined;
    return {
      startAngle: centralAngleStart,
      endAngle: centralAngleEnd,
      showDegrees: showCentralAngleDegrees,
    };
  }, [showCentralAngle, centralAngleStart, centralAngleEnd, showCentralAngleDegrees]);

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

    // Sector
    if (showSector) {
      propsLines.push(`sector={{ startAngle: ${sectorStartAngle}, endAngle: ${sectorEndAngle}, showRadii: true }}`);
    }

    // Arc
    if (showArc) {
      propsLines.push(`arc={{ startAngle: ${arcStartAngle}, endAngle: ${arcEndAngle}, strokeWidth: 4 }}`);
    }

    // Central angle
    if (showCentralAngle) {
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
  }, [circleCenter, circleRadius, circleMode, showCircleCenter, showCircleRadius, circleRadiusAngle, showCircleDiameter, circleDiameterAngle, showSector, sectorStartAngle, sectorEndAngle, showArc, arcStartAngle, arcEndAngle, showCentralAngle, centralAngleStart, centralAngleEnd, showCentralAngleDegrees, circleChords, showCircleGrid]);

  // Generate code based on figure type
  const generateCode = useCallback(() => {
    return figureType === 'triangle' ? generateTriangleCode() : generateCircleCode();
  }, [figureType, generateTriangleCode, generateCircleCode]);

  // Copy code to clipboard
  const copyCode = useCallback(() => {
    const code = generateCode();
    navigator.clipboard.writeText(code);
  }, [generateCode]);

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
                onClick={() => setFigureType('triangle')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  figureType === 'triangle'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Triángulo
              </button>
              <button
                onClick={() => setFigureType('circle')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  figureType === 'circle'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Circunferencia
              </button>
            </div>
          </div>
        </Card>

        {/* Triangle Input Mode Toggle */}
        {figureType === 'triangle' && (
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
        {figureType === 'circle' && (
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
            {figureType === 'triangle' && inputMode === 'vertices' && VERTEX_PRESETS.map((preset) => (
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
            {figureType === 'triangle' && inputMode === 'angles' && ANGLE_PRESETS.map((preset) => (
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
            {figureType === 'triangle' && inputMode === 'sides' && SIDES_PRESETS.map((preset) => (
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
            {figureType === 'circle' && CIRCLE_PRESETS.map((preset) => (
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
            {figureType === 'circle' && (
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

                {/* Sector Controls */}
                <Card padding="lg">
                  <div className="flex items-center justify-between mb-4">
                    <Heading level={3} size="xs">
                      Sector Circular
                    </Heading>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showSector}
                        onChange={(e) => setShowSector(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Activar</span>
                    </label>
                  </div>
                  {showSector && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <Text className="text-sm w-28">Ángulo inicio:</Text>
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={sectorStartAngle}
                          onChange={(e) => setSectorStartAngle(Number(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-sm w-12">{sectorStartAngle}°</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Text className="text-sm w-28">Ángulo fin:</Text>
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={sectorEndAngle}
                          onChange={(e) => setSectorEndAngle(Number(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-sm w-12">{sectorEndAngle}°</span>
                      </div>
                    </div>
                  )}
                </Card>

                {/* Arc Controls */}
                <Card padding="lg">
                  <div className="flex items-center justify-between mb-4">
                    <Heading level={3} size="xs">
                      Arco Resaltado
                    </Heading>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showArc}
                        onChange={(e) => setShowArc(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Activar</span>
                    </label>
                  </div>
                  {showArc && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <Text className="text-sm w-28">Ángulo inicio:</Text>
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={arcStartAngle}
                          onChange={(e) => setArcStartAngle(Number(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-sm w-12">{arcStartAngle}°</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Text className="text-sm w-28">Ángulo fin:</Text>
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={arcEndAngle}
                          onChange={(e) => setArcEndAngle(Number(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-sm w-12">{arcEndAngle}°</span>
                      </div>
                    </div>
                  )}
                </Card>

                {/* Central Angle Controls */}
                <Card padding="lg">
                  <div className="flex items-center justify-between mb-4">
                    <Heading level={3} size="xs">
                      Ángulo Central
                    </Heading>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showCentralAngle}
                        onChange={(e) => setShowCentralAngle(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Activar</span>
                    </label>
                  </div>
                  {showCentralAngle && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <Text className="text-sm w-28">Ángulo inicio:</Text>
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={centralAngleStart}
                          onChange={(e) => setCentralAngleStart(Number(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-sm w-12">{centralAngleStart}°</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Text className="text-sm w-28">Ángulo fin:</Text>
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={centralAngleEnd}
                          onChange={(e) => setCentralAngleEnd(Number(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-sm w-12">{centralAngleEnd}°</span>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showCentralAngleDegrees}
                          onChange={(e) => setShowCentralAngleDegrees(e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm">Mostrar grados</span>
                      </label>
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
            {figureType === 'triangle' && inputMode === 'vertices' && (
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
            {figureType === 'triangle' && inputMode === 'angles' && (
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
            {figureType === 'triangle' && inputMode === 'sides' && (
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
            {figureType === 'triangle' && (
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
            {figureType === 'triangle' && (
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
                {figureType === 'triangle' ? (
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
                    sector={sectorConfig}
                    arc={arcConfig}
                    centralAngle={centralAngleConfig}
                    chords={circleChords.length > 0 ? circleChords : undefined}
                    showGrid={showCircleGrid}
                    width={400}
                    height={300}
                  />
                )}
              </div>

              {/* Current angles info (in angles mode - triangle) */}
              {figureType === 'triangle' && inputMode === 'angles' && angleValidation.valid && (
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
              {figureType === 'triangle' && inputMode === 'sides' && sidesValidation.valid && (
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
              {figureType === 'circle' && circleValidation.valid && (
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
                    {showSector && (
                      <Text size="xs" variant="secondary" className="mt-2 pt-2 border-t border-blue-200 dark:border-blue-800">
                        Sector: {angleDifference(sectorStartAngle, sectorEndAngle).toFixed(0)}° |
                        Área sector: {sectorArea(circleRadius, angleDifference(sectorStartAngle, sectorEndAngle)).toFixed(2)}px²
                      </Text>
                    )}
                    {showArc && (
                      <Text size="xs" variant="secondary">
                        Arco: {angleDifference(arcStartAngle, arcEndAngle).toFixed(0)}° |
                        Longitud: {arcLength(circleRadius, angleDifference(arcStartAngle, arcEndAngle)).toFixed(2)}px
                      </Text>
                    )}
                    {showCentralAngle && (
                      <Text size="xs" variant="secondary">
                        Ángulo central: {angleDifference(centralAngleStart, centralAngleEnd).toFixed(0)}°
                      </Text>
                    )}
                  </div>
                </div>
              )}

              {/* Legend */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Text size="sm" className="font-medium mb-2">
                  Leyenda de colores:
                </Text>
                {figureType === 'triangle' ? (
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
