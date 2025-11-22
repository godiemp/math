/**
 * ============================================================================
 * SYMMETRY GENERATOR FOR SYMMETRY & REFLECTIONS GAME
 * ============================================================================
 *
 * Generates symmetry problems for learning about lines of symmetry and reflections.
 * Creates varied visual representations with symmetry lines.
 */

import type { GeometryFigure, Point } from '@/components/math/GeometryCanvas';
import type {
  SymmetryShape,
  SymmetryShapeInfo,
  SymmetryProblem,
  SymmetryDifficultyConfig,
  SymmetryGameDifficulty,
  SymmetryLine,
  SymmetryProblemType,
} from '@/lib/types/symmetry-game';
import { randomInRange, shuffleArray } from '@/lib/utils/gameUtils';

/**
 * Shape definitions with symmetry properties (Spanish names)
 */
export const SYMMETRY_SHAPE_DEFINITIONS: Record<SymmetryShape, SymmetryShapeInfo> = {
  circle: {
    id: 'circle',
    nameEs: 'Círculo',
    nameEn: 'Circle',
    linesOfSymmetry: 'infinite',
    hasLineSymmetry: true,
    description: 'Figura perfectamente redonda',
    explanation:
      'El círculo tiene infinitas líneas de simetría porque puedes trazar una línea a través del centro en cualquier dirección y las dos mitades serán iguales.',
  },
  square: {
    id: 'square',
    nameEs: 'Cuadrado',
    nameEn: 'Square',
    linesOfSymmetry: 4,
    hasLineSymmetry: true,
    description: 'Cuatro lados iguales',
    explanation:
      'El cuadrado tiene 4 líneas de simetría: 2 que pasan por las esquinas opuestas (diagonales) y 2 que pasan por el centro de los lados opuestos (vertical y horizontal).',
  },
  rectangle: {
    id: 'rectangle',
    nameEs: 'Rectángulo',
    nameEn: 'Rectangle',
    linesOfSymmetry: 2,
    hasLineSymmetry: true,
    description: 'Lados opuestos iguales',
    explanation:
      'El rectángulo tiene 2 líneas de simetría: una vertical por el centro y una horizontal por el centro. Las diagonales NO son líneas de simetría.',
  },
  equilateral_triangle: {
    id: 'equilateral_triangle',
    nameEs: 'Triángulo Equilátero',
    nameEn: 'Equilateral Triangle',
    linesOfSymmetry: 3,
    hasLineSymmetry: true,
    description: 'Tres lados iguales',
    explanation:
      'El triángulo equilátero tiene 3 líneas de simetría, cada una va desde un vértice hasta el centro del lado opuesto. Como todos los lados son iguales, hay simetría perfecta.',
    etymology: 'Equilátero = equi (igual) + látero (lado)',
  },
  isosceles_triangle: {
    id: 'isosceles_triangle',
    nameEs: 'Triángulo Isósceles',
    nameEn: 'Isosceles Triangle',
    linesOfSymmetry: 1,
    hasLineSymmetry: true,
    description: 'Dos lados iguales',
    explanation:
      'El triángulo isósceles tiene solo 1 línea de simetría que va desde el vértice superior hasta el centro de la base, dividiendo los dos lados iguales.',
    etymology: 'Isósceles = iso (igual) + skelos (pierna)',
  },
  scalene_triangle: {
    id: 'scalene_triangle',
    nameEs: 'Triángulo Escaleno',
    nameEn: 'Scalene Triangle',
    linesOfSymmetry: 0,
    hasLineSymmetry: false,
    description: 'Todos los lados diferentes',
    explanation:
      'El triángulo escaleno NO tiene líneas de simetría porque todos sus lados y ángulos son diferentes. No hay forma de dividirlo en dos mitades iguales.',
  },
  regular_pentagon: {
    id: 'regular_pentagon',
    nameEs: 'Pentágono Regular',
    nameEn: 'Regular Pentagon',
    linesOfSymmetry: 5,
    hasLineSymmetry: true,
    description: 'Cinco lados iguales',
    explanation:
      'El pentágono regular tiene 5 líneas de simetría, cada una va desde un vértice hasta el centro del lado opuesto.',
    etymology: 'Penta = cinco',
  },
  regular_hexagon: {
    id: 'regular_hexagon',
    nameEs: 'Hexágono Regular',
    nameEn: 'Regular Hexagon',
    linesOfSymmetry: 6,
    hasLineSymmetry: true,
    description: 'Seis lados iguales',
    explanation:
      'El hexágono regular tiene 6 líneas de simetría: 3 que pasan por vértices opuestos y 3 que pasan por centros de lados opuestos.',
    etymology: 'Hexa = seis',
  },
  regular_octagon: {
    id: 'regular_octagon',
    nameEs: 'Octágono Regular',
    nameEn: 'Regular Octagon',
    linesOfSymmetry: 8,
    hasLineSymmetry: true,
    description: 'Ocho lados iguales',
    explanation:
      'El octágono regular tiene 8 líneas de simetría: 4 que pasan por vértices opuestos y 4 que pasan por centros de lados opuestos.',
    etymology: 'Octa = ocho',
  },
  oval: {
    id: 'oval',
    nameEs: 'Óvalo',
    nameEn: 'Oval',
    linesOfSymmetry: 2,
    hasLineSymmetry: true,
    description: 'Forma de huevo',
    explanation:
      'El óvalo tiene 2 líneas de simetría: una vertical (eje mayor) y una horizontal (eje menor) que pasan por el centro.',
  },
  rhombus: {
    id: 'rhombus',
    nameEs: 'Rombo',
    nameEn: 'Rhombus',
    linesOfSymmetry: 2,
    hasLineSymmetry: true,
    description: 'Forma de diamante',
    explanation:
      'El rombo tiene 2 líneas de simetría: sus dos diagonales. Una va de esquina a esquina verticalmente y la otra horizontalmente.',
  },
  trapezoid: {
    id: 'trapezoid',
    nameEs: 'Trapecio',
    nameEn: 'Trapezoid',
    linesOfSymmetry: 0,
    hasLineSymmetry: false,
    description: 'Solo dos lados paralelos',
    explanation:
      'El trapecio común NO tiene líneas de simetría porque sus lados inclinados son diferentes. Solo el trapecio isósceles tendría 1 línea de simetría.',
  },
  parallelogram: {
    id: 'parallelogram',
    nameEs: 'Paralelogramo',
    nameEn: 'Parallelogram',
    linesOfSymmetry: 0,
    hasLineSymmetry: false,
    description: 'Lados opuestos paralelos',
    explanation:
      'El paralelogramo NO tiene líneas de simetría porque está "inclinado". Aunque tiene simetría rotacional, no tiene simetría de espejo.',
  },
  star: {
    id: 'star',
    nameEs: 'Estrella',
    nameEn: 'Star',
    linesOfSymmetry: 5,
    hasLineSymmetry: true,
    description: 'Cinco puntas',
    explanation:
      'La estrella de 5 puntas tiene 5 líneas de simetría, cada una va desde una punta hasta el centro del ángulo opuesto.',
  },
  heart: {
    id: 'heart',
    nameEs: 'Corazón',
    nameEn: 'Heart',
    linesOfSymmetry: 1,
    hasLineSymmetry: true,
    description: 'Forma de corazón',
    explanation:
      'El corazón tiene 1 línea de simetría vertical que lo divide en dos mitades iguales, una izquierda y una derecha.',
  },
  arrow: {
    id: 'arrow',
    nameEs: 'Flecha',
    nameEn: 'Arrow',
    linesOfSymmetry: 1,
    hasLineSymmetry: true,
    description: 'Forma de flecha',
    explanation:
      'La flecha tiene 1 línea de simetría a lo largo de su eje principal, dividiendo la punta y la cola en dos mitades iguales.',
  },
  cross: {
    id: 'cross',
    nameEs: 'Cruz',
    nameEn: 'Cross',
    linesOfSymmetry: 4,
    hasLineSymmetry: true,
    description: 'Forma de cruz',
    explanation:
      'La cruz tiene 4 líneas de simetría: vertical, horizontal, y dos diagonales, todas pasando por el centro.',
  },
};

/**
 * Difficulty level configurations
 */
export const SYMMETRY_DIFFICULTY_CONFIGS: Record<SymmetryGameDifficulty, SymmetryDifficultyConfig> =
  {
    basic: {
      level: 'basic',
      title: 'Simetría Básica',
      description: 'Formas simples con líneas de simetría claras',
      shapes: [
        'circle',
        'square',
        'rectangle',
        'equilateral_triangle',
        'heart',
        'isosceles_triangle',
      ],
      problemTypes: ['count_lines', 'has_symmetry'],
      problemsToComplete: 10,
      showSymmetryLines: true,
    },
    intermediate: {
      level: 'intermediate',
      title: 'Simetría Intermedia',
      description: 'Más formas y tipos de problemas',
      shapes: [
        'square',
        'rectangle',
        'equilateral_triangle',
        'isosceles_triangle',
        'scalene_triangle',
        'regular_pentagon',
        'regular_hexagon',
        'oval',
        'rhombus',
        'heart',
        'arrow',
      ],
      problemTypes: ['count_lines', 'has_symmetry', 'identify_line'],
      problemsToComplete: 12,
      showSymmetryLines: true,
    },
    advanced: {
      level: 'advanced',
      title: 'Simetría Avanzada',
      description: 'Todas las formas incluyendo sin simetría',
      shapes: [
        'square',
        'rectangle',
        'equilateral_triangle',
        'isosceles_triangle',
        'scalene_triangle',
        'regular_pentagon',
        'regular_hexagon',
        'regular_octagon',
        'oval',
        'rhombus',
        'trapezoid',
        'parallelogram',
        'star',
        'heart',
        'arrow',
        'cross',
      ],
      problemTypes: ['count_lines', 'has_symmetry', 'identify_line'],
      problemsToComplete: 15,
      showSymmetryLines: false,
    },
  };

/**
 * Utility functions
 */
function generateRegularPolygon(
  centerX: number,
  centerY: number,
  radius: number,
  sides: number,
  rotation: number = 0
): Point[] {
  const points: Point[] = [];
  const angleStep = (2 * Math.PI) / sides;

  for (let i = 0; i < sides; i++) {
    const angle = i * angleStep + rotation - Math.PI / 2;
    points.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    });
  }

  return points;
}

function generateStar(
  centerX: number,
  centerY: number,
  outerRadius: number,
  innerRadius: number
): Point[] {
  const points: Point[] = [];
  const angleStep = Math.PI / 5;

  for (let i = 0; i < 10; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = i * angleStep - Math.PI / 2;
    points.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    });
  }

  return points;
}

/**
 * Generate shape figure with center position for symmetry line calculations
 */
interface ShapeWithCenter {
  figure: GeometryFigure;
  centerX: number;
  centerY: number;
  width: number;
  height: number;
}

function generateCircleShape(): ShapeWithCenter {
  const centerX = 200;
  const centerY = 150;
  const radius = 80;

  return {
    figure: {
      type: 'circle',
      center: { x: centerX, y: centerY },
      radius,
    },
    centerX,
    centerY,
    width: radius * 2,
    height: radius * 2,
  };
}

function generateSquareShape(): ShapeWithCenter {
  const size = 120;
  const centerX = 200;
  const centerY = 150;
  const x = centerX - size / 2;
  const y = centerY - size / 2;

  return {
    figure: {
      type: 'rectangle',
      points: [
        { x, y },
        { x: x + size, y: y + size },
      ],
    },
    centerX,
    centerY,
    width: size,
    height: size,
  };
}

function generateRectangleShape(): ShapeWithCenter {
  const width = 160;
  const height = 100;
  const centerX = 200;
  const centerY = 150;
  const x = centerX - width / 2;
  const y = centerY - height / 2;

  return {
    figure: {
      type: 'rectangle',
      points: [
        { x, y },
        { x: x + width, y: y + height },
      ],
    },
    centerX,
    centerY,
    width,
    height,
  };
}

function generateEquilateralTriangleShape(): ShapeWithCenter {
  const centerX = 200;
  const centerY = 150;
  const radius = 80;
  const points = generateRegularPolygon(centerX, centerY, radius, 3);

  return {
    figure: { type: 'triangle', points },
    centerX,
    centerY,
    width: radius * 2,
    height: radius * 2,
  };
}

function generateIsoscelesTriangleShape(): ShapeWithCenter {
  const centerX = 200;
  const centerY = 150;
  const baseWidth = 140;
  const height = 120;

  const points: Point[] = [
    { x: centerX, y: centerY - height / 2 }, // Top vertex
    { x: centerX - baseWidth / 2, y: centerY + height / 2 }, // Bottom left
    { x: centerX + baseWidth / 2, y: centerY + height / 2 }, // Bottom right
  ];

  return {
    figure: { type: 'triangle', points },
    centerX,
    centerY,
    width: baseWidth,
    height,
  };
}

function generateScaleneTriangleShape(): ShapeWithCenter {
  const centerX = 200;
  const centerY = 150;

  const points: Point[] = [
    { x: centerX - 20, y: centerY - 60 }, // Top (off-center)
    { x: centerX - 70, y: centerY + 50 }, // Bottom left
    { x: centerX + 80, y: centerY + 40 }, // Bottom right (asymmetric)
  ];

  return {
    figure: { type: 'triangle', points },
    centerX,
    centerY,
    width: 150,
    height: 110,
  };
}

function generateRegularPentagonShape(): ShapeWithCenter {
  const centerX = 200;
  const centerY = 150;
  const radius = 75;
  const points = generateRegularPolygon(centerX, centerY, radius, 5);

  return {
    figure: { type: 'polygon', points },
    centerX,
    centerY,
    width: radius * 2,
    height: radius * 2,
  };
}

function generateRegularHexagonShape(): ShapeWithCenter {
  const centerX = 200;
  const centerY = 150;
  const radius = 75;
  const points = generateRegularPolygon(centerX, centerY, radius, 6);

  return {
    figure: { type: 'polygon', points },
    centerX,
    centerY,
    width: radius * 2,
    height: radius * 2,
  };
}

function generateRegularOctagonShape(): ShapeWithCenter {
  const centerX = 200;
  const centerY = 150;
  const radius = 75;
  const points = generateRegularPolygon(centerX, centerY, radius, 8);

  return {
    figure: { type: 'polygon', points },
    centerX,
    centerY,
    width: radius * 2,
    height: radius * 2,
  };
}

function generateOvalShape(): ShapeWithCenter & { isOval: boolean; scaleX: number; scaleY: number } {
  const centerX = 200;
  const centerY = 150;
  const baseRadius = 60;

  return {
    figure: {
      type: 'circle',
      center: { x: centerX, y: centerY },
      radius: baseRadius,
    },
    centerX,
    centerY,
    width: baseRadius * 2.8,
    height: baseRadius * 1.4,
    isOval: true,
    scaleX: 1.4,
    scaleY: 0.7,
  };
}

function generateRhombusShape(): ShapeWithCenter {
  const centerX = 200;
  const centerY = 150;
  const halfWidth = 80;
  const halfHeight = 60;

  const points: Point[] = [
    { x: centerX, y: centerY - halfHeight },
    { x: centerX + halfWidth, y: centerY },
    { x: centerX, y: centerY + halfHeight },
    { x: centerX - halfWidth, y: centerY },
  ];

  return {
    figure: { type: 'polygon', points },
    centerX,
    centerY,
    width: halfWidth * 2,
    height: halfHeight * 2,
  };
}

function generateTrapezoidShape(): ShapeWithCenter {
  const centerX = 200;
  const centerY = 150;
  const topWidth = 80;
  const bottomWidth = 140;
  const height = 100;

  // Asymmetric trapezoid (no symmetry)
  const points: Point[] = [
    { x: centerX - topWidth / 2 - 10, y: centerY - height / 2 },
    { x: centerX + topWidth / 2, y: centerY - height / 2 },
    { x: centerX + bottomWidth / 2, y: centerY + height / 2 },
    { x: centerX - bottomWidth / 2, y: centerY + height / 2 },
  ];

  return {
    figure: { type: 'polygon', points },
    centerX,
    centerY,
    width: bottomWidth,
    height,
  };
}

function generateParallelogramShape(): ShapeWithCenter {
  const centerX = 200;
  const centerY = 150;
  const width = 140;
  const height = 80;
  const skew = 40;

  const points: Point[] = [
    { x: centerX - width / 2 + skew, y: centerY - height / 2 },
    { x: centerX + width / 2 + skew, y: centerY - height / 2 },
    { x: centerX + width / 2 - skew, y: centerY + height / 2 },
    { x: centerX - width / 2 - skew, y: centerY + height / 2 },
  ];

  return {
    figure: { type: 'polygon', points },
    centerX,
    centerY,
    width: width + skew,
    height,
  };
}

function generateStarShape(): ShapeWithCenter {
  const centerX = 200;
  const centerY = 150;
  const outerRadius = 85;
  const innerRadius = outerRadius * 0.4;
  const points = generateStar(centerX, centerY, outerRadius, innerRadius);

  return {
    figure: { type: 'polygon', points },
    centerX,
    centerY,
    width: outerRadius * 2,
    height: outerRadius * 2,
  };
}

function generateHeartShape(): ShapeWithCenter {
  const centerX = 200;
  const centerY = 150;

  // Heart shape using polygon approximation
  const points: Point[] = [
    { x: centerX, y: centerY + 60 }, // Bottom point
    { x: centerX - 60, y: centerY + 10 },
    { x: centerX - 70, y: centerY - 20 },
    { x: centerX - 50, y: centerY - 50 },
    { x: centerX - 25, y: centerY - 55 },
    { x: centerX, y: centerY - 40 },
    { x: centerX + 25, y: centerY - 55 },
    { x: centerX + 50, y: centerY - 50 },
    { x: centerX + 70, y: centerY - 20 },
    { x: centerX + 60, y: centerY + 10 },
  ];

  return {
    figure: { type: 'polygon', points },
    centerX,
    centerY,
    width: 140,
    height: 115,
  };
}

function generateArrowShape(): ShapeWithCenter {
  const centerX = 200;
  const centerY = 150;

  const points: Point[] = [
    { x: centerX, y: centerY - 70 }, // Top point
    { x: centerX + 50, y: centerY - 20 },
    { x: centerX + 25, y: centerY - 20 },
    { x: centerX + 25, y: centerY + 70 },
    { x: centerX - 25, y: centerY + 70 },
    { x: centerX - 25, y: centerY - 20 },
    { x: centerX - 50, y: centerY - 20 },
  ];

  return {
    figure: { type: 'polygon', points },
    centerX,
    centerY,
    width: 100,
    height: 140,
  };
}

function generateCrossShape(): ShapeWithCenter {
  const centerX = 200;
  const centerY = 150;
  const armWidth = 40;
  const armLength = 70;

  const points: Point[] = [
    // Top arm
    { x: centerX - armWidth / 2, y: centerY - armLength },
    { x: centerX + armWidth / 2, y: centerY - armLength },
    // Right arm
    { x: centerX + armWidth / 2, y: centerY - armWidth / 2 },
    { x: centerX + armLength, y: centerY - armWidth / 2 },
    { x: centerX + armLength, y: centerY + armWidth / 2 },
    { x: centerX + armWidth / 2, y: centerY + armWidth / 2 },
    // Bottom arm
    { x: centerX + armWidth / 2, y: centerY + armLength },
    { x: centerX - armWidth / 2, y: centerY + armLength },
    // Left arm
    { x: centerX - armWidth / 2, y: centerY + armWidth / 2 },
    { x: centerX - armLength, y: centerY + armWidth / 2 },
    { x: centerX - armLength, y: centerY - armWidth / 2 },
    { x: centerX - armWidth / 2, y: centerY - armWidth / 2 },
  ];

  return {
    figure: { type: 'polygon', points },
    centerX,
    centerY,
    width: armLength * 2,
    height: armLength * 2,
  };
}

/**
 * Generate shape with center information
 */
export function generateSymmetryShapeFigure(shape: SymmetryShape): ShapeWithCenter {
  switch (shape) {
    case 'circle':
      return generateCircleShape();
    case 'square':
      return generateSquareShape();
    case 'rectangle':
      return generateRectangleShape();
    case 'equilateral_triangle':
      return generateEquilateralTriangleShape();
    case 'isosceles_triangle':
      return generateIsoscelesTriangleShape();
    case 'scalene_triangle':
      return generateScaleneTriangleShape();
    case 'regular_pentagon':
      return generateRegularPentagonShape();
    case 'regular_hexagon':
      return generateRegularHexagonShape();
    case 'regular_octagon':
      return generateRegularOctagonShape();
    case 'oval':
      return generateOvalShape();
    case 'rhombus':
      return generateRhombusShape();
    case 'trapezoid':
      return generateTrapezoidShape();
    case 'parallelogram':
      return generateParallelogramShape();
    case 'star':
      return generateStarShape();
    case 'heart':
      return generateHeartShape();
    case 'arrow':
      return generateArrowShape();
    case 'cross':
      return generateCrossShape();
    default:
      return generateSquareShape();
  }
}

/**
 * Generate symmetry lines for a shape
 */
export function generateSymmetryLines(
  shape: SymmetryShape,
  centerX: number,
  centerY: number,
  width: number,
  height: number
): SymmetryLine[] {
  const lines: SymmetryLine[] = [];
  const shapeInfo = SYMMETRY_SHAPE_DEFINITIONS[shape];
  const lineCount = shapeInfo.linesOfSymmetry;

  if (lineCount === 'infinite' || lineCount === 0) {
    // For circle, show 4 representative lines
    if (lineCount === 'infinite') {
      lines.push({
        id: 'vertical',
        startX: centerX,
        startY: centerY - height / 2 - 20,
        endX: centerX,
        endY: centerY + height / 2 + 20,
        type: 'vertical',
        isCorrect: true,
      });
      lines.push({
        id: 'horizontal',
        startX: centerX - width / 2 - 20,
        startY: centerY,
        endX: centerX + width / 2 + 20,
        endY: centerY,
        type: 'horizontal',
        isCorrect: true,
      });
    }
    return lines;
  }

  // Generate lines based on shape
  switch (shape) {
    case 'square':
    case 'cross':
      // 4 lines: vertical, horizontal, 2 diagonals
      lines.push({
        id: 'vertical',
        startX: centerX,
        startY: centerY - height / 2 - 20,
        endX: centerX,
        endY: centerY + height / 2 + 20,
        type: 'vertical',
        isCorrect: true,
      });
      lines.push({
        id: 'horizontal',
        startX: centerX - width / 2 - 20,
        startY: centerY,
        endX: centerX + width / 2 + 20,
        endY: centerY,
        type: 'horizontal',
        isCorrect: true,
      });
      lines.push({
        id: 'diagonal1',
        startX: centerX - width / 2 - 10,
        startY: centerY - height / 2 - 10,
        endX: centerX + width / 2 + 10,
        endY: centerY + height / 2 + 10,
        type: 'diagonal',
        isCorrect: true,
      });
      lines.push({
        id: 'diagonal2',
        startX: centerX + width / 2 + 10,
        startY: centerY - height / 2 - 10,
        endX: centerX - width / 2 - 10,
        endY: centerY + height / 2 + 10,
        type: 'diagonal',
        isCorrect: true,
      });
      break;

    case 'rectangle':
    case 'oval':
      // 2 lines: vertical and horizontal
      lines.push({
        id: 'vertical',
        startX: centerX,
        startY: centerY - height / 2 - 20,
        endX: centerX,
        endY: centerY + height / 2 + 20,
        type: 'vertical',
        isCorrect: true,
      });
      lines.push({
        id: 'horizontal',
        startX: centerX - width / 2 - 20,
        startY: centerY,
        endX: centerX + width / 2 + 20,
        endY: centerY,
        type: 'horizontal',
        isCorrect: true,
      });
      break;

    case 'rhombus':
      // 2 diagonal lines
      lines.push({
        id: 'vertical',
        startX: centerX,
        startY: centerY - height / 2 - 20,
        endX: centerX,
        endY: centerY + height / 2 + 20,
        type: 'vertical',
        isCorrect: true,
      });
      lines.push({
        id: 'horizontal',
        startX: centerX - width / 2 - 20,
        startY: centerY,
        endX: centerX + width / 2 + 20,
        endY: centerY,
        type: 'horizontal',
        isCorrect: true,
      });
      break;

    case 'equilateral_triangle':
      // 3 lines from vertices to opposite sides
      const triRadius = width / 2;
      for (let i = 0; i < 3; i++) {
        const angle = (i * (2 * Math.PI)) / 3 - Math.PI / 2;
        const oppositeAngle = angle + Math.PI;
        lines.push({
          id: `line${i}`,
          startX: centerX + triRadius * 1.2 * Math.cos(angle),
          startY: centerY + triRadius * 1.2 * Math.sin(angle),
          endX: centerX + triRadius * 1.2 * Math.cos(oppositeAngle),
          endY: centerY + triRadius * 1.2 * Math.sin(oppositeAngle),
          type: 'diagonal',
          isCorrect: true,
        });
      }
      break;

    case 'isosceles_triangle':
    case 'heart':
    case 'arrow':
      // 1 vertical line
      lines.push({
        id: 'vertical',
        startX: centerX,
        startY: centerY - height / 2 - 20,
        endX: centerX,
        endY: centerY + height / 2 + 20,
        type: 'vertical',
        isCorrect: true,
      });
      break;

    case 'regular_pentagon':
    case 'star':
      // 5 lines
      for (let i = 0; i < 5; i++) {
        const angle = (i * (2 * Math.PI)) / 5 - Math.PI / 2;
        const oppositeAngle = angle + Math.PI;
        lines.push({
          id: `line${i}`,
          startX: centerX + (width / 2 + 20) * Math.cos(angle),
          startY: centerY + (height / 2 + 20) * Math.sin(angle),
          endX: centerX + (width / 2 + 20) * Math.cos(oppositeAngle),
          endY: centerY + (height / 2 + 20) * Math.sin(oppositeAngle),
          type: 'diagonal',
          isCorrect: true,
        });
      }
      break;

    case 'regular_hexagon':
      // 6 lines
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 6 - Math.PI / 2;
        const oppositeAngle = angle + Math.PI;
        lines.push({
          id: `line${i}`,
          startX: centerX + (width / 2 + 20) * Math.cos(angle),
          startY: centerY + (height / 2 + 20) * Math.sin(angle),
          endX: centerX + (width / 2 + 20) * Math.cos(oppositeAngle),
          endY: centerY + (height / 2 + 20) * Math.sin(oppositeAngle),
          type: 'diagonal',
          isCorrect: true,
        });
      }
      break;

    case 'regular_octagon':
      // 8 lines
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 8;
        const oppositeAngle = angle + Math.PI;
        lines.push({
          id: `line${i}`,
          startX: centerX + (width / 2 + 20) * Math.cos(angle),
          startY: centerY + (height / 2 + 20) * Math.sin(angle),
          endX: centerX + (width / 2 + 20) * Math.cos(oppositeAngle),
          endY: centerY + (height / 2 + 20) * Math.sin(oppositeAngle),
          type: 'diagonal',
          isCorrect: true,
        });
      }
      break;
  }

  return lines;
}

/**
 * Generate a wrong symmetry line (for identify_line problems)
 */
function generateIncorrectLine(
  centerX: number,
  centerY: number,
  width: number,
  height: number
): SymmetryLine {
  // Generate a line that is NOT a line of symmetry (off-center or wrong angle)
  const offset = randomInRange(20, 40);

  return {
    id: 'incorrect',
    startX: centerX + offset,
    startY: centerY - height / 2 - 20,
    endX: centerX - offset,
    endY: centerY + height / 2 + 20,
    type: 'diagonal',
    isCorrect: false,
  };
}

/**
 * Generate question text based on problem type
 */
function generateQuestion(type: SymmetryProblemType, shapeName: string): string {
  switch (type) {
    case 'count_lines':
      return `¿Cuántas líneas de simetría tiene este ${shapeName}?`;
    case 'has_symmetry':
      return `¿Tiene este ${shapeName} líneas de simetría?`;
    case 'identify_line':
      return `¿Es esta línea una línea de simetría del ${shapeName}?`;
    default:
      return '¿Cuántas líneas de simetría tiene esta figura?';
  }
}

/**
 * Generate options for a problem
 */
function generateOptions(
  type: SymmetryProblemType,
  correctAnswer: string | number | boolean
): (string | number)[] {
  switch (type) {
    case 'count_lines':
      const count = correctAnswer as number | string;
      if (count === 'infinite') {
        return shuffleArray(['Infinitas', '0', '1', '2']);
      }
      const numCount = count as number;
      const options = [numCount];
      // Add nearby numbers as distractors
      const possibleDistractors = [0, 1, 2, 3, 4, 5, 6, 8].filter((n) => n !== numCount);
      const distractors = shuffleArray(possibleDistractors).slice(0, 3);
      return shuffleArray([...options, ...distractors]);

    case 'has_symmetry':
      return ['Sí', 'No'];

    case 'identify_line':
      return ['Sí', 'No'];

    default:
      return [];
  }
}

/**
 * Format correct answer for display
 */
function formatCorrectAnswer(
  type: SymmetryProblemType,
  value: string | number | boolean
): string | number {
  switch (type) {
    case 'count_lines':
      return value === 'infinite' ? 'Infinitas' : (value as number);
    case 'has_symmetry':
    case 'identify_line':
      return value ? 'Sí' : 'No';
    default:
      return value as string | number;
  }
}

/**
 * Track recently shown shapes for variety
 */
const recentShapes: SymmetryShape[] = [];
const MAX_RECENT = 3;

/**
 * Generate a symmetry problem
 */
export function generateSymmetryProblem(difficulty: SymmetryGameDifficulty): SymmetryProblem {
  const config = SYMMETRY_DIFFICULTY_CONFIGS[difficulty];

  // Select shape avoiding recent ones
  const availableShapes = config.shapes.filter((s) => !recentShapes.includes(s));
  const shapesToChooseFrom = availableShapes.length > 0 ? availableShapes : config.shapes;
  const shape = shapesToChooseFrom[randomInRange(0, shapesToChooseFrom.length - 1)];

  // Track this shape
  recentShapes.push(shape);
  if (recentShapes.length > MAX_RECENT) {
    recentShapes.shift();
  }

  // Select problem type
  const problemType = config.problemTypes[randomInRange(0, config.problemTypes.length - 1)];

  // Generate shape figure
  const shapeData = generateSymmetryShapeFigure(shape);
  const shapeInfo = SYMMETRY_SHAPE_DEFINITIONS[shape];

  // Generate symmetry lines
  const symmetryLines = generateSymmetryLines(
    shape,
    shapeData.centerX,
    shapeData.centerY,
    shapeData.width,
    shapeData.height
  );

  // Determine correct answer based on problem type
  let correctAnswer: string | number | boolean;
  let displayedLine: SymmetryLine | undefined;

  switch (problemType) {
    case 'count_lines':
      correctAnswer = shapeInfo.linesOfSymmetry;
      break;
    case 'has_symmetry':
      correctAnswer = shapeInfo.hasLineSymmetry;
      break;
    case 'identify_line':
      // 50% chance of showing a correct line, 50% incorrect
      if (symmetryLines.length > 0 && Math.random() > 0.5) {
        displayedLine = symmetryLines[randomInRange(0, symmetryLines.length - 1)];
        correctAnswer = true;
      } else {
        displayedLine = generateIncorrectLine(
          shapeData.centerX,
          shapeData.centerY,
          shapeData.width,
          shapeData.height
        );
        correctAnswer = false;
      }
      break;
    default:
      correctAnswer = shapeInfo.linesOfSymmetry;
  }

  const formattedAnswer = formatCorrectAnswer(problemType, correctAnswer);
  const options = generateOptions(problemType, correctAnswer);
  const question = generateQuestion(problemType, shapeInfo.nameEs);

  // Generate hint based on problem type
  let hint = '';
  if (problemType === 'count_lines') {
    hint = `Piensa en cuántas formas puedes doblar esta figura por la mitad de manera que ambos lados coincidan perfectamente.`;
  } else if (problemType === 'has_symmetry') {
    hint = `Una figura tiene simetría si puedes doblarla por una línea y ambas mitades son exactamente iguales.`;
  } else if (problemType === 'identify_line') {
    hint = `Una línea de simetría divide la figura en dos partes que son reflejos exactos una de la otra.`;
  }

  return {
    id: `symmetry-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: problemType,
    figure: shapeData.figure,
    shape,
    symmetryLines,
    displayedLine,
    correctAnswer: formattedAnswer,
    options,
    difficulty,
    question,
    hint,
    explanation: shapeInfo.explanation,
  };
}

/**
 * Clear recent shapes history
 */
export function clearRecentSymmetryShapes(): void {
  recentShapes.length = 0;
}

/**
 * Get shape info for displaying explanations
 */
export function getSymmetryShapeInfo(shape: SymmetryShape): SymmetryShapeInfo {
  return SYMMETRY_SHAPE_DEFINITIONS[shape];
}
