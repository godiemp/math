'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { Card, Button, Heading, Text, Badge } from '@/components/ui';
import AdminLayout from '@/components/layout/AdminLayout';
import { TriangleFigure } from '@/components/figures/TriangleFigure';
import {
  buildTriangleFromAngles,
  validateTriangleAngles,
} from '@/lib/geometry/triangleUtils';
import type {
  LabeledPoint,
  SideConfig,
  AngleConfig,
  SpecialLineConfig,
  TrianglePreset,
} from '@/lib/types/triangle';

type InputMode = 'vertices' | 'angles';

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

function FigureDebugContent() {
  // Input mode
  const [inputMode, setInputMode] = useState<InputMode>('vertices');

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

  // Active vertices (depends on mode)
  const activeVertices = inputMode === 'angles' ? anglesVertices : vertices;

  // Sync vertices when switching modes
  useEffect(() => {
    if (inputMode === 'vertices' && angleValidation.valid) {
      // When switching to vertices mode, keep the angle-generated vertices
      setVertices(anglesVertices);
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

  // Generate code snippet
  const generateCode = useCallback(() => {
    const propsLines = [];

    // Use fromAngles when in angles mode, vertices otherwise
    if (inputMode === 'angles') {
      // Simple array format when no extra options
      if (angleInputs.baseLength === 150) {
        propsLines.push(`fromAngles={[${angleInputs.angle1}, ${angleInputs.angle2}, ${angle3}]}`);
      } else {
        // Object format with size option
        propsLines.push(`fromAngles={{ angles: [${angleInputs.angle1}, ${angleInputs.angle2}, ${angle3}], size: ${angleInputs.baseLength} }}`);
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
  }, [inputMode, angleInputs, angle3, activeVertices, showSideLabels, showAngleArcs, showAngleDegrees, specialLines, showGrid, showRightAngleMarker, showVertices]);

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
            <Badge variant="info" size="md">Triángulo</Badge>
            <Text variant="secondary" size="sm">(más figuras próximamente)</Text>
          </div>
        </Card>

        {/* Input Mode Toggle */}
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
            </div>
          </div>
        </Card>

        {/* Presets */}
        <div>
          <Heading level={2} size="sm" className="mb-4">
            Presets
          </Heading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {inputMode === 'vertices' ? (
              VERTEX_PRESETS.map((preset) => (
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
              ))
            ) : (
              ANGLE_PRESETS.map((preset) => (
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
              ))
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Controls Panel */}
          <div className="space-y-4">
            {/* Vertex Controls (vertices mode) */}
            {inputMode === 'vertices' && (
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
            {inputMode === 'angles' && (
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

            {/* Visual Options */}
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

            {/* Special Lines */}
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
              </div>

              {/* Current angles info (in angles mode) */}
              {inputMode === 'angles' && angleValidation.valid && (
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

              {/* Legend */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Text size="sm" className="font-medium mb-2">
                  Leyenda de colores:
                </Text>
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
