'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { Card, Button, Heading, Text, Badge } from '@/components/ui';
import AdminLayout from '@/components/layout/AdminLayout';
import { TriangleFigure } from '@/components/figures/TriangleFigure';
import { CircleFigure } from '@/components/figures/CircleFigure';
import { QuadrilateralFigure } from '@/components/figures/QuadrilateralFigure';
import { Figure3D } from '@/components/figures/Figure3D';
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
import {
  volumeCubo,
  volumePrismaRectangular,
  volumePrismaTriangular,
  volumePiramideCuadrada,
  volumePiramideTriangular,
  volumeCilindro,
  volumeCono,
  volumeEsfera,
  areaSuperficieCubo,
  areaSuperficiePrismaRectangular,
  areaSuperficieCilindro,
  areaSuperficieCono,
  areaSuperficieEsfera,
  getSolidTypeName,
} from '@/lib/geometry/figure3d';
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
  LabeledPoint as QuadLabeledPoint,
  QuadrilateralType,
  QuadSideConfig,
  QuadAngleConfig,
  DiagonalConfig,
  QuadAngleConstraint,
} from '@/lib/types/quadrilateral';
import type {
  SolidType,
  ProjectionType,
  Figure3DPreset,
  SolidDimensions,
} from '@/lib/types/figure3d';
import {
  buildQuadrilateralFromType,
  buildQuadrilateralFromAngles,
  validateQuadrilateralAngles,
  detectQuadrilateralType,
  perimeter as quadPerimeter,
  area as quadArea,
  detectParallelSides,
  detectEqualSides,
  detectRightAngles,
  isConvex,
  isSelfIntersecting,
  validateQuadrilateral,
} from '@/lib/geometry/quadrilateralUtils';

type FigureType = 'triangle' | 'circle' | 'quadrilateral' | 'figure3d';
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

// Quadrilateral presets
type QuadPreset = {
  name: string;
  description: string;
  type: QuadrilateralType;
  size?: number;
  height?: number;
  angle?: number;
  baseRatio?: number;
};

const QUADRILATERAL_PRESETS: QuadPreset[] = [
  { name: 'Cuadrado', description: '4 lados iguales, 4 ángulos rectos', type: 'cuadrado', size: 100 },
  { name: 'Rectángulo áureo', description: 'Proporción 1:1.618', type: 'rectangulo', size: 100, height: 62 },
  { name: 'Rectángulo', description: 'Opuestos iguales, ángulos rectos', type: 'rectangulo', size: 120, height: 80 },
  { name: 'Rombo 60°', description: '4 lados iguales, ángulos 60°-120°', type: 'rombo', size: 80, angle: 60 },
  { name: 'Paralelogramo', description: 'Opuestos paralelos', type: 'paralelogramo', size: 100, height: 70, angle: 70 },
  { name: 'Trapecio isósceles', description: 'Piernas iguales', type: 'trapecio-isosceles', size: 120, height: 80, baseRatio: 0.5 },
  { name: 'Trapecio rectángulo', description: '2 ángulos rectos', type: 'trapecio-rectangulo', size: 120, height: 80, baseRatio: 0.6 },
  { name: 'Cometa', description: '2 pares de lados adyacentes iguales', type: 'cometa', size: 100, height: 120 },
];

// Figure3D presets
const FIGURE3D_PRESETS: Figure3DPreset[] = [
  {
    name: 'Cubo',
    description: 'Lado 100',
    fromType: { type: 'cubo', dimensions: { lado: 100 } },
    projection: 'isometric',
  },
  {
    name: 'Prisma Rectangular',
    description: '120 × 80 × 100',
    fromType: { type: 'prisma_rectangular', dimensions: { largo: 120, ancho: 80, altura: 100 } },
    projection: 'isometric',
  },
  {
    name: 'Pirámide Cuadrada',
    description: 'Base 100, h=120',
    fromType: { type: 'piramide_cuadrada', dimensions: { base: 100, altura: 120 } },
    projection: 'isometric',
  },
  {
    name: 'Cilindro',
    description: 'r=50, h=100',
    fromType: { type: 'cilindro', dimensions: { radio: 50, altura: 100 } },
    projection: 'isometric',
  },
  {
    name: 'Cono',
    description: 'r=60, h=100',
    fromType: { type: 'cono', dimensions: { radio: 60, altura: 100 } },
    projection: 'isometric',
  },
  {
    name: 'Esfera',
    description: 'r=80',
    fromType: { type: 'esfera', dimensions: { radio: 80 } },
    projection: 'isometric',
  },
  {
    name: 'Tetraedro',
    description: 'Pirámide triangular',
    fromType: { type: 'piramide_triangular', dimensions: { base: 100, altura: 90 } },
    projection: 'isometric',
  },
  {
    name: 'Prisma Triangular',
    description: 'Base triangular',
    fromType: { type: 'prisma_triangular', dimensions: { baseWidth: 100, baseHeight: 86, profundidad: 120 } },
    projection: 'isometric',
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

  // ============================================
  // QUADRILATERAL STATE
  // ============================================
  type QuadInputMode = 'fromType' | 'fromAngles' | 'vertices';
  const [quadInputMode, setQuadInputMode] = useState<QuadInputMode>('fromType');
  const [quadType, setQuadType] = useState<QuadrilateralType>('cuadrado');
  const [quadSize, setQuadSize] = useState(100);
  const [quadHeight, setQuadHeight] = useState(80);
  const [quadAngle, setQuadAngle] = useState(60);
  const [quadBaseRatio, setQuadBaseRatio] = useState(0.5);
  const [quadVertices, setQuadVertices] = useState<[QuadLabeledPoint, QuadLabeledPoint, QuadLabeledPoint, QuadLabeledPoint]>([
    { x: 100, y: 50, label: 'A' },
    { x: 300, y: 50, label: 'B' },
    { x: 300, y: 200, label: 'C' },
    { x: 100, y: 200, label: 'D' },
  ]);
  // Angles mode state
  const [quadAngleInputs, setQuadAngleInputs] = useState({
    angle1: 90,
    angle2: 90,
    angle3: 90,
    constraint: 'generic' as QuadAngleConstraint,
    size: 150,
  });
  const quadAngle4 = useMemo(() => {
    return 360 - quadAngleInputs.angle1 - quadAngleInputs.angle2 - quadAngleInputs.angle3;
  }, [quadAngleInputs.angle1, quadAngleInputs.angle2, quadAngleInputs.angle3]);
  const quadAnglesValidation = useMemo(() => {
    return validateQuadrilateralAngles([
      quadAngleInputs.angle1,
      quadAngleInputs.angle2,
      quadAngleInputs.angle3,
      quadAngle4,
    ]);
  }, [quadAngleInputs, quadAngle4]);
  const [showQuadDiagonals, setShowQuadDiagonals] = useState(false);
  const [autoQuadParallelMarks, setAutoQuadParallelMarks] = useState(true);
  const [autoQuadEqualMarks, setAutoQuadEqualMarks] = useState(true);
  const [autoQuadRightAngles, setAutoQuadRightAngles] = useState(true);
  const [autoQuadDiagonalBisection, setAutoQuadDiagonalBisection] = useState(false);
  const [autoQuadDiagonalEqual, setAutoQuadDiagonalEqual] = useState(false);
  const [autoQuadDiagonalRightAngle, setAutoQuadDiagonalRightAngle] = useState(false);
  const [autoQuadAngleArcs, setAutoQuadAngleArcs] = useState(false);
  const [showQuadGrid, setShowQuadGrid] = useState(true);
  const [showQuadVertices, setShowQuadVertices] = useState(true);

  // Computed quadrilateral vertices from type
  const quadFromTypeVertices = useMemo<[QuadLabeledPoint, QuadLabeledPoint, QuadLabeledPoint, QuadLabeledPoint]>(() => {
    const built = buildQuadrilateralFromType({
      type: quadType,
      size: quadSize,
      height: quadHeight,
      angle: quadAngle,
      baseRatio: quadBaseRatio,
      centerX: 200,
      centerY: 140,
    });
    return [
      { ...built[0], label: 'A' },
      { ...built[1], label: 'B' },
      { ...built[2], label: 'C' },
      { ...built[3], label: 'D' },
    ];
  }, [quadType, quadSize, quadHeight, quadAngle, quadBaseRatio]);

  // Computed quadrilateral vertices from angles
  const quadFromAnglesVertices = useMemo<[QuadLabeledPoint, QuadLabeledPoint, QuadLabeledPoint, QuadLabeledPoint]>(() => {
    if (!quadAnglesValidation.valid) {
      // Fallback to square if angles are invalid
      return quadFromTypeVertices;
    }
    const built = buildQuadrilateralFromAngles(
      [quadAngleInputs.angle1, quadAngleInputs.angle2, quadAngleInputs.angle3, quadAngle4],
      quadAngleInputs.constraint,
      quadAngleInputs.size,
      200,
      140,
      0
    );
    return [
      { ...built[0], label: 'A' },
      { ...built[1], label: 'B' },
      { ...built[2], label: 'C' },
      { ...built[3], label: 'D' },
    ];
  }, [quadAngleInputs, quadAngle4, quadAnglesValidation.valid, quadFromTypeVertices]);

  // Active quadrilateral vertices
  const activeQuadVertices = useMemo(() => {
    if (quadInputMode === 'fromType') return quadFromTypeVertices;
    if (quadInputMode === 'fromAngles') return quadFromAnglesVertices;
    return quadVertices;
  }, [quadInputMode, quadFromTypeVertices, quadFromAnglesVertices, quadVertices]);

  // Quadrilateral validation and analysis
  const quadAnalysis = useMemo(() => {
    const validation = validateQuadrilateral(activeQuadVertices);
    if (!validation.valid) {
      return { valid: false, error: validation.error };
    }
    return {
      valid: true,
      detectedType: detectQuadrilateralType(activeQuadVertices),
      perimeter: quadPerimeter(activeQuadVertices),
      area: quadArea(activeQuadVertices),
      parallelPairs: detectParallelSides(activeQuadVertices),
      equalGroups: detectEqualSides(activeQuadVertices),
      rightAngleVertices: detectRightAngles(activeQuadVertices),
      isConvex: isConvex(activeQuadVertices),
      isSelfIntersecting: isSelfIntersecting(activeQuadVertices),
    };
  }, [activeQuadVertices]);

  // Apply quadrilateral preset
  const applyQuadPreset = useCallback((preset: QuadPreset) => {
    setQuadInputMode('fromType');
    setQuadType(preset.type);
    if (preset.size) setQuadSize(preset.size);
    if (preset.height) setQuadHeight(preset.height);
    if (preset.angle) setQuadAngle(preset.angle);
    if (preset.baseRatio) setQuadBaseRatio(preset.baseRatio);
  }, []);

  // Update quadrilateral vertex
  const updateQuadVertex = useCallback(
    (index: number, field: 'x' | 'y' | 'label', value: number | string) => {
      setQuadVertices((prev) => {
        const newVertices = [...prev] as [QuadLabeledPoint, QuadLabeledPoint, QuadLabeledPoint, QuadLabeledPoint];
        newVertices[index] = { ...newVertices[index], [field]: value };
        return newVertices;
      });
    },
    []
  );

  // ============================================
  // FIGURE3D STATE
  // ============================================
  const [solidType, setSolidType] = useState<SolidType>('cubo');
  const [projectionType, setProjectionType] = useState<ProjectionType>('isometric');
  const [figure3dAzimuth, setFigure3dAzimuth] = useState(45);
  const [figure3dElevation, setFigure3dElevation] = useState(35);
  const [figure3dInteractive, setFigure3dInteractive] = useState(false);
  const [show3dGrid, setShow3dGrid] = useState(true);
  const [hiddenEdgeStyle, setHiddenEdgeStyle] = useState<'dashed' | 'dotted' | 'none' | 'solid'>('dashed');
  const [highlight3dBase, setHighlight3dBase] = useState(false);
  const [show3dHeightLine, setShow3dHeightLine] = useState(false);
  const [show3dDimensionLabels, setShow3dDimensionLabels] = useState(false);

  // Dimensions for each solid type
  const [cubeLado, setCubeLado] = useState(100);
  const [prismaLargo, setPrismaLargo] = useState(120);
  const [prismaAncho, setPrismaAncho] = useState(80);
  const [prismaAltura, setPrismaAltura] = useState(100);
  const [prismaTriBaseWidth, setPrismaTriBaseWidth] = useState(100);
  const [prismaTriBaseHeight, setPrismaTriBaseHeight] = useState(86);
  const [prismaTriProfundidad, setPrismaTriProfundidad] = useState(120);
  const [piramideBase, setPiramideBase] = useState(100);
  const [piramideAltura, setPiramideAltura] = useState(120);
  const [cilindroRadio, setCilindroRadio] = useState(50);
  const [cilindroAltura, setCilindroAltura] = useState(100);
  const [conoRadio, setConoRadio] = useState(60);
  const [conoAltura, setConoAltura] = useState(100);
  const [esferaRadio, setEsferaRadio] = useState(80);

  // Get current solid dimensions based on type
  const currentSolidDimensions = useMemo((): SolidDimensions => {
    switch (solidType) {
      case 'cubo':
        return { type: 'cubo', dimensions: { lado: cubeLado } };
      case 'prisma_rectangular':
        return { type: 'prisma_rectangular', dimensions: { largo: prismaLargo, ancho: prismaAncho, altura: prismaAltura } };
      case 'prisma_triangular':
        return { type: 'prisma_triangular', dimensions: { baseWidth: prismaTriBaseWidth, baseHeight: prismaTriBaseHeight, profundidad: prismaTriProfundidad } };
      case 'piramide_cuadrada':
        return { type: 'piramide_cuadrada', dimensions: { base: piramideBase, altura: piramideAltura } };
      case 'piramide_triangular':
        return { type: 'piramide_triangular', dimensions: { base: piramideBase, altura: piramideAltura } };
      case 'cilindro':
        return { type: 'cilindro', dimensions: { radio: cilindroRadio, altura: cilindroAltura } };
      case 'cono':
        return { type: 'cono', dimensions: { radio: conoRadio, altura: conoAltura } };
      case 'esfera':
        return { type: 'esfera', dimensions: { radio: esferaRadio } };
      default:
        return { type: 'cubo', dimensions: { lado: 100 } };
    }
  }, [solidType, cubeLado, prismaLargo, prismaAncho, prismaAltura, prismaTriBaseWidth, prismaTriBaseHeight, prismaTriProfundidad, piramideBase, piramideAltura, cilindroRadio, cilindroAltura, conoRadio, conoAltura, esferaRadio]);

  // Calculate volume and surface area
  const figure3dCalculations = useMemo(() => {
    let volume = 0;
    let surfaceArea = 0;

    switch (solidType) {
      case 'cubo':
        volume = volumeCubo(cubeLado);
        surfaceArea = areaSuperficieCubo(cubeLado);
        break;
      case 'prisma_rectangular':
        volume = volumePrismaRectangular(prismaLargo, prismaAncho, prismaAltura);
        surfaceArea = areaSuperficiePrismaRectangular(prismaLargo, prismaAncho, prismaAltura);
        break;
      case 'prisma_triangular':
        volume = volumePrismaTriangular(prismaTriBaseWidth, prismaTriBaseHeight, prismaTriProfundidad);
        break;
      case 'piramide_cuadrada':
        volume = volumePiramideCuadrada(piramideBase, piramideAltura);
        break;
      case 'piramide_triangular':
        volume = volumePiramideTriangular(piramideBase, piramideAltura);
        break;
      case 'cilindro':
        volume = volumeCilindro(cilindroRadio, cilindroAltura);
        surfaceArea = areaSuperficieCilindro(cilindroRadio, cilindroAltura);
        break;
      case 'cono':
        volume = volumeCono(conoRadio, conoAltura);
        surfaceArea = areaSuperficieCono(conoRadio, conoAltura);
        break;
      case 'esfera':
        volume = volumeEsfera(esferaRadio);
        surfaceArea = areaSuperficieEsfera(esferaRadio);
        break;
    }

    return { volume, surfaceArea };
  }, [solidType, cubeLado, prismaLargo, prismaAncho, prismaAltura, prismaTriBaseWidth, prismaTriBaseHeight, prismaTriProfundidad, piramideBase, piramideAltura, cilindroRadio, cilindroAltura, conoRadio, conoAltura, esferaRadio]);

  // Apply Figure3D preset
  const applyFigure3DPreset = useCallback((preset: Figure3DPreset) => {
    const { fromType } = preset;
    setSolidType(fromType.type);
    if (preset.projection) setProjectionType(preset.projection);
    if (preset.azimuth !== undefined) setFigure3dAzimuth(preset.azimuth);
    if (preset.elevation !== undefined) setFigure3dElevation(preset.elevation);

    // Set dimensions based on type
    switch (fromType.type) {
      case 'cubo':
        setCubeLado(fromType.dimensions.lado);
        break;
      case 'prisma_rectangular':
        setPrismaLargo(fromType.dimensions.largo);
        setPrismaAncho(fromType.dimensions.ancho);
        setPrismaAltura(fromType.dimensions.altura);
        break;
      case 'prisma_triangular':
        setPrismaTriBaseWidth(fromType.dimensions.baseWidth);
        setPrismaTriBaseHeight(fromType.dimensions.baseHeight);
        setPrismaTriProfundidad(fromType.dimensions.profundidad);
        break;
      case 'piramide_cuadrada':
      case 'piramide_triangular':
        setPiramideBase(fromType.dimensions.base);
        setPiramideAltura(fromType.dimensions.altura);
        break;
      case 'cilindro':
        setCilindroRadio(fromType.dimensions.radio);
        setCilindroAltura(fromType.dimensions.altura);
        break;
      case 'cono':
        setConoRadio(fromType.dimensions.radio);
        setConoAltura(fromType.dimensions.altura);
        break;
      case 'esfera':
        setEsferaRadio(fromType.dimensions.radio);
        break;
    }
  }, []);

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

  // Generate code snippet for quadrilateral
  const generateQuadrilateralCode = useCallback(() => {
    const propsLines = [];

    if (quadInputMode === 'fromType') {
      // Use fromType
      const typeProps = [`type: '${quadType}'`];
      typeProps.push(`size: ${quadSize}`);
      if (['rectangulo', 'paralelogramo', 'trapecio', 'trapecio-isosceles', 'trapecio-rectangulo', 'cometa'].includes(quadType)) {
        typeProps.push(`height: ${quadHeight}`);
      }
      if (['rombo', 'paralelogramo'].includes(quadType)) {
        typeProps.push(`angle: ${quadAngle}`);
      }
      if (['trapecio', 'trapecio-isosceles', 'trapecio-rectangulo'].includes(quadType)) {
        typeProps.push(`baseRatio: ${quadBaseRatio}`);
      }
      propsLines.push(`fromType={{ ${typeProps.join(', ')} }}`);
    } else if (quadInputMode === 'fromAngles') {
      // Use fromAngles
      const anglesProps = [`angles: [${quadAngleInputs.angle1}, ${quadAngleInputs.angle2}, ${quadAngleInputs.angle3}, ${quadAngle4}]`];
      if (quadAngleInputs.constraint !== 'generic') {
        anglesProps.push(`constraint: '${quadAngleInputs.constraint}'`);
      }
      if (quadAngleInputs.size !== 150) {
        anglesProps.push(`size: ${quadAngleInputs.size}`);
      }
      propsLines.push(`fromAngles={{ ${anglesProps.join(', ')} }}`);
    } else {
      // Use vertices
      propsLines.push(`vertices={[`);
      activeQuadVertices.forEach((v, i) => {
        propsLines.push(`  { x: ${Math.round(v.x)}, y: ${Math.round(v.y)}, label: '${v.label}' }${i < 3 ? ',' : ''}`);
      });
      propsLines.push(`]}`);
    }

    // Options
    if (showQuadDiagonals) propsLines.push(`showDiagonals`);
    if (autoQuadParallelMarks) propsLines.push(`autoParallelMarks`);
    if (autoQuadEqualMarks) propsLines.push(`autoEqualMarks`);
    if (autoQuadRightAngles) propsLines.push(`autoRightAngleMarkers`);
    if (autoQuadDiagonalBisection) propsLines.push(`autoDiagonalBisectionMarks`);
    if (autoQuadDiagonalEqual) propsLines.push(`autoDiagonalEqualMarks`);
    if (autoQuadDiagonalRightAngle) propsLines.push(`autoDiagonalRightAngle`);
    if (autoQuadAngleArcs) propsLines.push(`autoAngleArcs`);
    if (showQuadGrid) propsLines.push(`showGrid`);
    if (!showQuadVertices) propsLines.push(`showVertices={false}`);

    return `<QuadrilateralFigure\n  ${propsLines.join('\n  ')}\n/>`;
  }, [quadInputMode, quadType, quadSize, quadHeight, quadAngle, quadBaseRatio, quadAngleInputs, quadAngle4, activeQuadVertices, showQuadDiagonals, autoQuadParallelMarks, autoQuadEqualMarks, autoQuadRightAngles, autoQuadDiagonalBisection, autoQuadDiagonalEqual, autoQuadDiagonalRightAngle, autoQuadAngleArcs, showQuadGrid, showQuadVertices]);

  // Generate code snippet for Figure3D
  const generateFigure3DCode = useCallback(() => {
    const propsLines = [];

    // fromType with dimensions
    const dims = currentSolidDimensions;
    let dimsStr = '';
    switch (dims.type) {
      case 'cubo':
        dimsStr = `lado: ${dims.dimensions.lado}`;
        break;
      case 'prisma_rectangular':
        dimsStr = `largo: ${dims.dimensions.largo}, ancho: ${dims.dimensions.ancho}, altura: ${dims.dimensions.altura}`;
        break;
      case 'prisma_triangular':
        dimsStr = `baseWidth: ${dims.dimensions.baseWidth}, baseHeight: ${dims.dimensions.baseHeight}, profundidad: ${dims.dimensions.profundidad}`;
        break;
      case 'piramide_cuadrada':
      case 'piramide_triangular':
        dimsStr = `base: ${dims.dimensions.base}, altura: ${dims.dimensions.altura}`;
        break;
      case 'cilindro':
        dimsStr = `radio: ${dims.dimensions.radio}, altura: ${dims.dimensions.altura}`;
        break;
      case 'cono':
        dimsStr = `radio: ${dims.dimensions.radio}, altura: ${dims.dimensions.altura}`;
        break;
      case 'esfera':
        dimsStr = `radio: ${dims.dimensions.radio}`;
        break;
    }
    propsLines.push(`fromType={{ type: '${dims.type}', dimensions: { ${dimsStr} } }}`);

    // Projection
    if (projectionType !== 'isometric' || figure3dAzimuth !== 45 || figure3dElevation !== 35) {
      propsLines.push(`projection={{ type: '${projectionType}', azimuth: ${figure3dAzimuth}, elevation: ${figure3dElevation} }}`);
    }

    // Interactive
    if (figure3dInteractive) {
      propsLines.push(`interactive`);
    }

    // Visual options
    if (hiddenEdgeStyle !== 'dashed') {
      propsLines.push(`edges={{ hiddenEdgeStyle: '${hiddenEdgeStyle}' }}`);
    }
    if (highlight3dBase) {
      propsLines.push(`faceConfig={{ highlightBase: true }}`);
    }
    if (show3dHeightLine) {
      propsLines.push(`heightLine={{ show: true, style: 'dashed', showRightAngleMarker: true }}`);
    }
    if (show3dDimensionLabels) {
      propsLines.push(`dimensionLabels={{ showHeight: true, showBase: true }}`);
    }
    if (show3dGrid) {
      propsLines.push(`showGrid`);
    }

    return `<Figure3D\n  ${propsLines.join('\n  ')}\n/>`;
  }, [currentSolidDimensions, projectionType, figure3dAzimuth, figure3dElevation, figure3dInteractive, hiddenEdgeStyle, highlight3dBase, show3dHeightLine, show3dDimensionLabels, show3dGrid]);

  // Generate code based on figure type
  const generateCode = useCallback(() => {
    if (figureType === 'triangle') return generateTriangleCode();
    if (figureType === 'circle') return generateCircleCode();
    if (figureType === 'quadrilateral') return generateQuadrilateralCode();
    return generateFigure3DCode();
  }, [figureType, generateTriangleCode, generateCircleCode, generateQuadrilateralCode, generateFigure3DCode]);

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
              <button
                onClick={() => setFigureType('quadrilateral')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  figureType === 'quadrilateral'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Cuadrilátero
              </button>
              <button
                onClick={() => setFigureType('figure3d')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  figureType === 'figure3d'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Figura 3D
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

        {/* Quadrilateral Input Mode Toggle */}
        {figureType === 'quadrilateral' && (
          <Card padding="md">
            <div className="flex items-center gap-4">
              <Text className="font-medium">Modo de construcción:</Text>
              <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                <button
                  onClick={() => setQuadInputMode('fromType')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    quadInputMode === 'fromType'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Por Tipo
                </button>
                <button
                  onClick={() => setQuadInputMode('fromAngles')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    quadInputMode === 'fromAngles'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Por Ángulos
                </button>
                <button
                  onClick={() => setQuadInputMode('vertices')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    quadInputMode === 'vertices'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Por Vértices
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
            {/* Quadrilateral presets */}
            {figureType === 'quadrilateral' && QUADRILATERAL_PRESETS.map((preset) => (
              <Card
                key={preset.name}
                hover
                className="cursor-pointer transition-all hover:ring-2 hover:ring-blue-500"
                padding="md"
                onClick={() => applyQuadPreset(preset)}
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
            {/* Figure3D presets */}
            {figureType === 'figure3d' && FIGURE3D_PRESETS.map((preset) => (
              <Card
                key={preset.name}
                hover
                className="cursor-pointer transition-all hover:ring-2 hover:ring-blue-500"
                padding="md"
                onClick={() => applyFigure3DPreset(preset)}
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
            {/* FIGURE3D CONTROLS */}
            {/* ============================================ */}
            {figureType === 'figure3d' && (
              <>
                {/* Solid Type Selector */}
                <Card padding="lg">
                  <Heading level={3} size="xs" className="mb-4">
                    Tipo de Sólido
                  </Heading>
                  <select
                    value={solidType}
                    onChange={(e) => setSolidType(e.target.value as SolidType)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                  >
                    <option value="cubo">Cubo</option>
                    <option value="prisma_rectangular">Prisma Rectangular</option>
                    <option value="prisma_triangular">Prisma Triangular</option>
                    <option value="piramide_cuadrada">Pirámide Cuadrada</option>
                    <option value="piramide_triangular">Pirámide Triangular</option>
                    <option value="cilindro">Cilindro</option>
                    <option value="cono">Cono</option>
                    <option value="esfera">Esfera</option>
                  </select>
                </Card>

                {/* Dimension Controls */}
                <Card padding="lg">
                  <Heading level={3} size="xs" className="mb-4">
                    Dimensiones
                  </Heading>
                  <div className="space-y-4">
                    {/* Cube */}
                    {solidType === 'cubo' && (
                      <div className="flex items-center gap-4">
                        <Text className="text-sm w-20">Lado:</Text>
                        <input
                          type="range"
                          min="20"
                          max="200"
                          value={cubeLado}
                          onChange={(e) => setCubeLado(Number(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-sm w-12">{cubeLado}</span>
                      </div>
                    )}

                    {/* Rectangular Prism */}
                    {solidType === 'prisma_rectangular' && (
                      <>
                        <div className="flex items-center gap-4">
                          <Text className="text-sm w-20">Largo:</Text>
                          <input
                            type="range"
                            min="20"
                            max="200"
                            value={prismaLargo}
                            onChange={(e) => setPrismaLargo(Number(e.target.value))}
                            className="flex-1"
                          />
                          <span className="text-sm w-12">{prismaLargo}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Text className="text-sm w-20">Ancho:</Text>
                          <input
                            type="range"
                            min="20"
                            max="200"
                            value={prismaAncho}
                            onChange={(e) => setPrismaAncho(Number(e.target.value))}
                            className="flex-1"
                          />
                          <span className="text-sm w-12">{prismaAncho}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Text className="text-sm w-20">Altura:</Text>
                          <input
                            type="range"
                            min="20"
                            max="200"
                            value={prismaAltura}
                            onChange={(e) => setPrismaAltura(Number(e.target.value))}
                            className="flex-1"
                          />
                          <span className="text-sm w-12">{prismaAltura}</span>
                        </div>
                      </>
                    )}

                    {/* Triangular Prism */}
                    {solidType === 'prisma_triangular' && (
                      <>
                        <div className="flex items-center gap-4">
                          <Text className="text-sm w-20">Base:</Text>
                          <input
                            type="range"
                            min="20"
                            max="200"
                            value={prismaTriBaseWidth}
                            onChange={(e) => setPrismaTriBaseWidth(Number(e.target.value))}
                            className="flex-1"
                          />
                          <span className="text-sm w-12">{prismaTriBaseWidth}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Text className="text-sm w-20">Altura base:</Text>
                          <input
                            type="range"
                            min="20"
                            max="200"
                            value={prismaTriBaseHeight}
                            onChange={(e) => setPrismaTriBaseHeight(Number(e.target.value))}
                            className="flex-1"
                          />
                          <span className="text-sm w-12">{prismaTriBaseHeight}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Text className="text-sm w-20">Profundidad:</Text>
                          <input
                            type="range"
                            min="20"
                            max="200"
                            value={prismaTriProfundidad}
                            onChange={(e) => setPrismaTriProfundidad(Number(e.target.value))}
                            className="flex-1"
                          />
                          <span className="text-sm w-12">{prismaTriProfundidad}</span>
                        </div>
                      </>
                    )}

                    {/* Square/Triangular Pyramid */}
                    {(solidType === 'piramide_cuadrada' || solidType === 'piramide_triangular') && (
                      <>
                        <div className="flex items-center gap-4">
                          <Text className="text-sm w-20">Base:</Text>
                          <input
                            type="range"
                            min="20"
                            max="200"
                            value={piramideBase}
                            onChange={(e) => setPiramideBase(Number(e.target.value))}
                            className="flex-1"
                          />
                          <span className="text-sm w-12">{piramideBase}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Text className="text-sm w-20">Altura:</Text>
                          <input
                            type="range"
                            min="20"
                            max="200"
                            value={piramideAltura}
                            onChange={(e) => setPiramideAltura(Number(e.target.value))}
                            className="flex-1"
                          />
                          <span className="text-sm w-12">{piramideAltura}</span>
                        </div>
                      </>
                    )}

                    {/* Cylinder */}
                    {solidType === 'cilindro' && (
                      <>
                        <div className="flex items-center gap-4">
                          <Text className="text-sm w-20">Radio:</Text>
                          <input
                            type="range"
                            min="10"
                            max="100"
                            value={cilindroRadio}
                            onChange={(e) => setCilindroRadio(Number(e.target.value))}
                            className="flex-1"
                          />
                          <span className="text-sm w-12">{cilindroRadio}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Text className="text-sm w-20">Altura:</Text>
                          <input
                            type="range"
                            min="20"
                            max="200"
                            value={cilindroAltura}
                            onChange={(e) => setCilindroAltura(Number(e.target.value))}
                            className="flex-1"
                          />
                          <span className="text-sm w-12">{cilindroAltura}</span>
                        </div>
                      </>
                    )}

                    {/* Cone */}
                    {solidType === 'cono' && (
                      <>
                        <div className="flex items-center gap-4">
                          <Text className="text-sm w-20">Radio:</Text>
                          <input
                            type="range"
                            min="10"
                            max="100"
                            value={conoRadio}
                            onChange={(e) => setConoRadio(Number(e.target.value))}
                            className="flex-1"
                          />
                          <span className="text-sm w-12">{conoRadio}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Text className="text-sm w-20">Altura:</Text>
                          <input
                            type="range"
                            min="20"
                            max="200"
                            value={conoAltura}
                            onChange={(e) => setConoAltura(Number(e.target.value))}
                            className="flex-1"
                          />
                          <span className="text-sm w-12">{conoAltura}</span>
                        </div>
                      </>
                    )}

                    {/* Sphere */}
                    {solidType === 'esfera' && (
                      <div className="flex items-center gap-4">
                        <Text className="text-sm w-20">Radio:</Text>
                        <input
                          type="range"
                          min="20"
                          max="120"
                          value={esferaRadio}
                          onChange={(e) => setEsferaRadio(Number(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-sm w-12">{esferaRadio}</span>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Projection Controls */}
                <Card padding="lg">
                  <Heading level={3} size="xs" className="mb-4">
                    Proyección
                  </Heading>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Text className="text-sm w-20">Tipo:</Text>
                      <select
                        value={projectionType}
                        onChange={(e) => setProjectionType(e.target.value as ProjectionType)}
                        className="flex-1 px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                      >
                        <option value="isometric">Isométrica</option>
                        <option value="cavalier">Cavalier</option>
                        <option value="cabinet">Cabinet</option>
                        <option value="dimetric">Dimétrica</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-4">
                      <Text className="text-sm w-20">Azimut:</Text>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={figure3dAzimuth}
                        onChange={(e) => setFigure3dAzimuth(Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-sm w-12">{figure3dAzimuth}°</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Text className="text-sm w-20">Elevación:</Text>
                      <input
                        type="range"
                        min="-89"
                        max="89"
                        value={figure3dElevation}
                        onChange={(e) => setFigure3dElevation(Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-sm w-12">{figure3dElevation}°</span>
                    </div>
                  </div>
                </Card>

                {/* Visual Options */}
                <Card padding="lg">
                  <Heading level={3} size="xs" className="mb-4">
                    Opciones Visuales
                  </Heading>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={show3dGrid}
                        onChange={(e) => setShow3dGrid(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Mostrar grid</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Aristas ocultas:</span>
                      <select
                        value={hiddenEdgeStyle}
                        onChange={(e) => setHiddenEdgeStyle(e.target.value as 'dashed' | 'dotted' | 'none' | 'solid')}
                        className="text-sm border rounded px-2 py-1"
                      >
                        <option value="dashed">Segmentadas</option>
                        <option value="dotted">Punteadas</option>
                        <option value="none">Ocultar</option>
                        <option value="solid">Mostrar todas</option>
                      </select>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={highlight3dBase}
                        onChange={(e) => setHighlight3dBase(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Resaltar base</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={show3dHeightLine}
                        onChange={(e) => setShow3dHeightLine(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Línea de altura</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={show3dDimensionLabels}
                        onChange={(e) => setShow3dDimensionLabels(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Etiquetas</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={figure3dInteractive}
                        onChange={(e) => setFigure3dInteractive(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Rotación interactiva</span>
                    </label>
                  </div>
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

            {/* ============================================ */}
            {/* QUADRILATERAL CONTROLS */}
            {/* ============================================ */}
            {/* Quadrilateral Type Controls (fromType mode) */}
            {figureType === 'quadrilateral' && quadInputMode === 'fromType' && (
              <Card padding="lg">
                <Heading level={3} size="xs" className="mb-4">
                  Tipo y Dimensiones
                </Heading>
                <div className="space-y-4">
                  {/* Type selector */}
                  <div className="flex items-center gap-4">
                    <Text className="text-sm w-24">Tipo:</Text>
                    <select
                      value={quadType}
                      onChange={(e) => setQuadType(e.target.value as QuadrilateralType)}
                      className="flex-1 px-3 py-2 text-sm border rounded dark:bg-gray-800 dark:border-gray-600"
                    >
                      <option value="cuadrado">Cuadrado</option>
                      <option value="rectangulo">Rectángulo</option>
                      <option value="rombo">Rombo</option>
                      <option value="paralelogramo">Paralelogramo</option>
                      <option value="trapecio">Trapecio</option>
                      <option value="trapecio-isosceles">Trapecio Isósceles</option>
                      <option value="trapecio-rectangulo">Trapecio Rectángulo</option>
                      <option value="cometa">Cometa</option>
                    </select>
                  </div>

                  {/* Size slider */}
                  <div className="flex items-center gap-4">
                    <Text className="text-sm w-24">Tamaño:</Text>
                    <input
                      type="range"
                      min="40"
                      max="180"
                      value={quadSize}
                      onChange={(e) => setQuadSize(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm w-12">{quadSize}px</span>
                  </div>

                  {/* Height slider (for types that need it) */}
                  {['rectangulo', 'paralelogramo', 'trapecio', 'trapecio-isosceles', 'trapecio-rectangulo', 'cometa'].includes(quadType) && (
                    <div className="flex items-center gap-4">
                      <Text className="text-sm w-24">Alto:</Text>
                      <input
                        type="range"
                        min="30"
                        max="160"
                        value={quadHeight}
                        onChange={(e) => setQuadHeight(Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-sm w-12">{quadHeight}px</span>
                    </div>
                  )}

                  {/* Angle slider (for rhombus and parallelogram) */}
                  {['rombo', 'paralelogramo'].includes(quadType) && (
                    <div className="flex items-center gap-4">
                      <Text className="text-sm w-24">Ángulo:</Text>
                      <input
                        type="range"
                        min="20"
                        max="80"
                        value={quadAngle}
                        onChange={(e) => setQuadAngle(Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-sm w-12">{quadAngle}°</span>
                    </div>
                  )}

                  {/* Base ratio slider (for trapezoids) */}
                  {['trapecio', 'trapecio-isosceles', 'trapecio-rectangulo'].includes(quadType) && (
                    <div className="flex items-center gap-4">
                      <Text className="text-sm w-24">Ratio bases:</Text>
                      <input
                        type="range"
                        min="0.2"
                        max="0.9"
                        step="0.05"
                        value={quadBaseRatio}
                        onChange={(e) => setQuadBaseRatio(Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-sm w-12">{quadBaseRatio.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Quadrilateral Angles Controls (fromAngles mode) */}
            {figureType === 'quadrilateral' && quadInputMode === 'fromAngles' && (
              <Card padding="lg">
                <Heading level={3} size="xs" className="mb-4">
                  Ángulos Interiores
                </Heading>
                <div className="space-y-4">
                  {/* Angle 1 slider */}
                  <div className="flex items-center gap-4">
                    <Text className="text-sm w-20">Ángulo A:</Text>
                    <input
                      type="range"
                      min="10"
                      max="170"
                      value={quadAngleInputs.angle1}
                      onChange={(e) =>
                        setQuadAngleInputs((prev) => ({
                          ...prev,
                          angle1: Number(e.target.value),
                        }))
                      }
                      className="flex-1"
                    />
                    <span className="text-sm w-12">{quadAngleInputs.angle1}°</span>
                  </div>

                  {/* Angle 2 slider */}
                  <div className="flex items-center gap-4">
                    <Text className="text-sm w-20">Ángulo B:</Text>
                    <input
                      type="range"
                      min="10"
                      max="170"
                      value={quadAngleInputs.angle2}
                      onChange={(e) =>
                        setQuadAngleInputs((prev) => ({
                          ...prev,
                          angle2: Number(e.target.value),
                        }))
                      }
                      className="flex-1"
                    />
                    <span className="text-sm w-12">{quadAngleInputs.angle2}°</span>
                  </div>

                  {/* Angle 3 slider */}
                  <div className="flex items-center gap-4">
                    <Text className="text-sm w-20">Ángulo C:</Text>
                    <input
                      type="range"
                      min="10"
                      max="170"
                      value={quadAngleInputs.angle3}
                      onChange={(e) =>
                        setQuadAngleInputs((prev) => ({
                          ...prev,
                          angle3: Number(e.target.value),
                        }))
                      }
                      className="flex-1"
                    />
                    <span className="text-sm w-12">{quadAngleInputs.angle3}°</span>
                  </div>

                  {/* Angle 4 (computed) */}
                  <div className="flex items-center gap-4">
                    <Text className="text-sm w-20">Ángulo D:</Text>
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <span
                      className={`text-sm w-12 ${
                        quadAngle4 <= 0 || quadAngle4 >= 180
                          ? 'text-red-500'
                          : 'text-gray-900 dark:text-gray-100'
                      }`}
                    >
                      {quadAngle4}°
                    </span>
                  </div>

                  {/* Validation message */}
                  {!quadAnglesValidation.valid && (
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded text-red-700 dark:text-red-300 text-sm">
                      {quadAnglesValidation.error}
                    </div>
                  )}

                  {/* Sum indicator */}
                  <div className="flex items-center gap-4 pt-2 border-t dark:border-gray-700">
                    <Text className="text-sm text-gray-600 dark:text-gray-400">
                      Suma: {quadAngleInputs.angle1 + quadAngleInputs.angle2 + quadAngleInputs.angle3 + quadAngle4}° (debe ser 360°)
                    </Text>
                  </div>

                  {/* Constraint selector */}
                  <div className="flex items-center gap-4 pt-4 border-t dark:border-gray-700">
                    <Text className="text-sm w-20">Restricción:</Text>
                    <select
                      value={quadAngleInputs.constraint}
                      onChange={(e) =>
                        setQuadAngleInputs((prev) => ({
                          ...prev,
                          constraint: e.target.value as QuadAngleConstraint,
                        }))
                      }
                      className="flex-1 px-3 py-2 text-sm border rounded dark:bg-gray-800 dark:border-gray-600"
                    >
                      <option value="generic">Genérico (lados iguales)</option>
                      <option value="equalSides">Lados Iguales (rombo)</option>
                      <option value="equalOppositeSides">Lados Opuestos Iguales</option>
                      <option value="cyclic">Cíclico (inscrito)</option>
                    </select>
                  </div>

                  {/* Size slider */}
                  <div className="flex items-center gap-4">
                    <Text className="text-sm w-20">Tamaño:</Text>
                    <input
                      type="range"
                      min="80"
                      max="200"
                      value={quadAngleInputs.size}
                      onChange={(e) =>
                        setQuadAngleInputs((prev) => ({
                          ...prev,
                          size: Number(e.target.value),
                        }))
                      }
                      className="flex-1"
                    />
                    <span className="text-sm w-12">{quadAngleInputs.size}px</span>
                  </div>

                  {/* Angle presets */}
                  <div className="pt-4 border-t dark:border-gray-700">
                    <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2">Presets:</Text>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          setQuadAngleInputs((prev) => ({
                            ...prev,
                            angle1: 90,
                            angle2: 90,
                            angle3: 90,
                          }))
                        }
                        className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        Rectángulo (90-90-90-90)
                      </button>
                      <button
                        onClick={() =>
                          setQuadAngleInputs((prev) => ({
                            ...prev,
                            angle1: 60,
                            angle2: 120,
                            angle3: 60,
                          }))
                        }
                        className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        Rombo (60-120-60-120)
                      </button>
                      <button
                        onClick={() =>
                          setQuadAngleInputs((prev) => ({
                            ...prev,
                            angle1: 70,
                            angle2: 110,
                            angle3: 70,
                          }))
                        }
                        className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        Paralelogramo (70-110-70-110)
                      </button>
                      <button
                        onClick={() =>
                          setQuadAngleInputs((prev) => ({
                            ...prev,
                            angle1: 80,
                            angle2: 100,
                            angle3: 80,
                          }))
                        }
                        className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        Cíclico (80-100-80-100)
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Quadrilateral Vertex Controls (vertices mode) */}
            {figureType === 'quadrilateral' && quadInputMode === 'vertices' && (
              <Card padding="lg">
                <Heading level={3} size="xs" className="mb-4">
                  Vértices
                </Heading>
                <div className="space-y-4">
                  {quadVertices.map((vertex, i) => (
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
                          onChange={(e) => updateQuadVertex(i, 'x', Number(e.target.value))}
                          className="w-24"
                        />
                        <span className="text-sm w-8">{Math.round(vertex.x)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600 dark:text-gray-400">Y:</label>
                        <input
                          type="range"
                          min="30"
                          max="250"
                          value={vertex.y}
                          onChange={(e) => updateQuadVertex(i, 'y', Number(e.target.value))}
                          className="w-24"
                        />
                        <span className="text-sm w-8">{Math.round(vertex.y)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Quadrilateral Visual Options */}
            {figureType === 'quadrilateral' && (
              <Card padding="lg">
                <Heading level={3} size="xs" className="mb-4">
                  Opciones Visuales
                </Heading>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showQuadGrid}
                      onChange={(e) => setShowQuadGrid(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Mostrar grid</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showQuadVertices}
                      onChange={(e) => setShowQuadVertices(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Mostrar vértices</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showQuadDiagonals}
                      onChange={(e) => setShowQuadDiagonals(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Mostrar diagonales</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoQuadParallelMarks}
                      onChange={(e) => setAutoQuadParallelMarks(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Marcas paralelas</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoQuadEqualMarks}
                      onChange={(e) => setAutoQuadEqualMarks(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Marcas de igualdad</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoQuadRightAngles}
                      onChange={(e) => setAutoQuadRightAngles(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Ángulos rectos</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoQuadDiagonalBisection}
                      onChange={(e) => setAutoQuadDiagonalBisection(e.target.checked)}
                      className="rounded"
                      disabled={!showQuadDiagonals}
                    />
                    <span className={`text-sm ${!showQuadDiagonals ? 'text-gray-400' : ''}`}>
                      Diagonales bisectadas
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoQuadDiagonalEqual}
                      onChange={(e) => setAutoQuadDiagonalEqual(e.target.checked)}
                      className="rounded"
                      disabled={!showQuadDiagonals}
                    />
                    <span className={`text-sm ${!showQuadDiagonals ? 'text-gray-400' : ''}`}>
                      Diagonales iguales
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoQuadDiagonalRightAngle}
                      onChange={(e) => setAutoQuadDiagonalRightAngle(e.target.checked)}
                      className="rounded"
                      disabled={!showQuadDiagonals}
                    />
                    <span className={`text-sm ${!showQuadDiagonals ? 'text-gray-400' : ''}`}>
                      Diagonales perpendiculares
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoQuadAngleArcs}
                      onChange={(e) => setAutoQuadAngleArcs(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Mostrar ángulos</span>
                  </label>
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
                {figureType === 'triangle' && (
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
                )}
                {figureType === 'circle' && (
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
                {figureType === 'quadrilateral' && (
                  <QuadrilateralFigure
                    vertices={activeQuadVertices}
                    showDiagonals={showQuadDiagonals}
                    autoParallelMarks={autoQuadParallelMarks}
                    autoEqualMarks={autoQuadEqualMarks}
                    autoRightAngleMarkers={autoQuadRightAngles}
                    autoDiagonalBisectionMarks={autoQuadDiagonalBisection}
                    autoDiagonalEqualMarks={autoQuadDiagonalEqual}
                    autoDiagonalRightAngle={autoQuadDiagonalRightAngle}
                    autoAngleArcs={autoQuadAngleArcs}
                    showGrid={showQuadGrid}
                    showVertices={showQuadVertices}
                    width={400}
                    height={300}
                  />
                )}
                {figureType === 'figure3d' && (
                  <Figure3D
                    fromType={currentSolidDimensions}
                    projection={projectionType}
                    azimuth={figure3dAzimuth}
                    elevation={figure3dElevation}
                    interactive={figure3dInteractive}
                    showGrid={show3dGrid}
                    edges={{
                      hiddenEdgeStyle: hiddenEdgeStyle,
                    }}
                    faceConfig={{
                      highlightBase: highlight3dBase,
                    }}
                    heightLine={{
                      show: show3dHeightLine,
                      showRightAngleMarker: true,
                    }}
                    dimensionLabels={{
                      showHeight: show3dDimensionLabels,
                      showBase: show3dDimensionLabels,
                      showRadius: show3dDimensionLabels,
                    }}
                    width={400}
                    height={350}
                    onRotationChange={(azimuth, elevation) => {
                      setFigure3dAzimuth(azimuth);
                      setFigure3dElevation(elevation);
                    }}
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

              {/* Quadrilateral info display */}
              {figureType === 'quadrilateral' && quadAnalysis.valid && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Text size="sm" className="font-medium mb-1">
                    Propiedades del cuadrilátero:
                  </Text>
                  <div className="space-y-1">
                    <Text size="sm" variant="secondary">
                      Tipo detectado: <span className="font-medium capitalize">{quadAnalysis.detectedType}</span>
                    </Text>
                    <Text size="sm" variant="secondary">
                      Perímetro: {quadAnalysis.perimeter?.toFixed(2)}px | Área: {quadAnalysis.area?.toFixed(2)}px²
                    </Text>
                    <Text size="sm" variant="secondary">
                      {quadAnalysis.isConvex ? 'Convexo' : 'Cóncavo'} | {quadAnalysis.parallelPairs?.length || 0} pares paralelos
                    </Text>
                    {quadAnalysis.rightAngleVertices && quadAnalysis.rightAngleVertices.length > 0 && (
                      <Text size="sm" variant="secondary">
                        Ángulos rectos en: {quadAnalysis.rightAngleVertices.map(i => activeQuadVertices[i].label).join(', ')}
                      </Text>
                    )}
                  </div>
                </div>
              )}
              {figureType === 'quadrilateral' && !quadAnalysis.valid && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <Text size="sm" className="text-red-600 dark:text-red-400">
                    {quadAnalysis.error}
                  </Text>
                </div>
              )}

              {/* Figure3D info display */}
              {figureType === 'figure3d' && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Text size="sm" className="font-medium mb-1">
                    Propiedades del {getSolidTypeName(solidType)}:
                  </Text>
                  <div className="space-y-1">
                    <Text size="sm" variant="secondary">
                      Proyección: {projectionType.charAt(0).toUpperCase() + projectionType.slice(1)}
                    </Text>
                    <Text size="sm" variant="secondary">
                      Azimut: {figure3dAzimuth.toFixed(0)}° | Elevación: {figure3dElevation.toFixed(0)}°
                    </Text>
                    {figure3dCalculations.volume > 0 && (
                      <Text size="sm" variant="secondary">
                        Volumen: {figure3dCalculations.volume.toFixed(2)} u³
                      </Text>
                    )}
                    {figure3dCalculations.surfaceArea > 0 && (
                      <Text size="sm" variant="secondary">
                        Área superficial: {figure3dCalculations.surfaceArea.toFixed(2)} u²
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
                {figureType === 'triangle' && (
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
                )}
                {figureType === 'circle' && (
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
                {figureType === 'quadrilateral' && (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-1 bg-blue-500 rounded"></div>
                      <span>Cuadrilátero</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-1 bg-purple-500 rounded"></div>
                      <span>Diagonales</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-1 bg-emerald-500 rounded"></div>
                      <span>Marcas paralelas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-1 bg-amber-500 rounded"></div>
                      <span>Marcas igualdad</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-1 bg-red-500 rounded"></div>
                      <span>Ángulo recto</span>
                    </div>
                  </div>
                )}
                {figureType === 'figure3d' && (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-1 bg-blue-500 rounded"></div>
                      <span>Aristas visibles</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-1 bg-gray-400 rounded border-dashed border border-gray-400"></div>
                      <span>Aristas ocultas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500/15 border border-blue-500 rounded"></div>
                      <span>Caras laterales</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-purple-500/30 border border-purple-500 rounded"></div>
                      <span>Base (resaltada)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-1 bg-red-500 rounded"></div>
                      <span>Línea de altura</span>
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
