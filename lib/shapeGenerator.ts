/**
 * ============================================================================
 * SHAPE GENERATOR FOR 2D SHAPE IDENTIFICATION GAME
 * ============================================================================
 *
 * Generates random 2D shapes for identification practice.
 * Creates varied visual representations to ensure students learn to recognize
 * shapes regardless of size, position, or orientation.
 */

import type { GeometryFigure, Point } from '@/components/GeometryCanvas';
import type {
  Shape2D,
  ShapeInfo,
  ShapeProblem,
  DifficultyConfig,
  ShapeGameDifficulty,
} from '@/lib/types/shape-game';
import { randomInRange, shuffleArray } from '@/lib/utils/gameUtils';

/**
 * Shape definitions with Spanish names and properties
 */
export const SHAPE_DEFINITIONS: Record<Shape2D, ShapeInfo> = {
  circle: {
    id: 'circle',
    nameEs: 'Círculo',
    nameEn: 'Circle',
    sides: 0,
    description: 'Figura redonda sin esquinas',
    hint: 'Es perfectamente redondo',
    explanation: 'Este es un Círculo porque es perfectamente redondo, sin lados rectos ni esquinas. Todos los puntos están a la misma distancia del centro.',
    keyFeature: 'Sin lados rectos, completamente curvo',
  },
  square: {
    id: 'square',
    nameEs: 'Cuadrado',
    nameEn: 'Square',
    sides: 4,
    description: 'Cuatro lados iguales y cuatro ángulos rectos',
    hint: 'Todos sus lados son iguales',
    explanation: 'Este es un Cuadrado porque tiene 4 lados de igual longitud y 4 ángulos rectos (90°). Es como un rectángulo perfecto donde todos los lados miden lo mismo.',
    keyFeature: '4 lados iguales + 4 ángulos de 90°',
  },
  rectangle: {
    id: 'rectangle',
    nameEs: 'Rectángulo',
    nameEn: 'Rectangle',
    sides: 4,
    description: 'Cuatro ángulos rectos, lados opuestos iguales',
    hint: 'Tiene forma alargada con esquinas rectas',
    explanation: 'Este es un Rectángulo porque tiene 4 ángulos rectos (90°) y los lados opuestos son iguales, pero NO todos los lados son iguales (es más largo que ancho).',
    keyFeature: '4 ángulos de 90° + forma alargada',
  },
  triangle: {
    id: 'triangle',
    nameEs: 'Triángulo',
    nameEn: 'Triangle',
    sides: 3,
    description: 'Tres lados y tres ángulos',
    hint: 'Tiene exactamente 3 lados',
    explanation: 'Este es un Triángulo porque tiene exactamente 3 lados y 3 vértices (esquinas). "Tri" significa tres.',
    keyFeature: 'Exactamente 3 lados',
  },
  pentagon: {
    id: 'pentagon',
    nameEs: 'Pentágono',
    nameEn: 'Pentagon',
    sides: 5,
    description: 'Cinco lados y cinco ángulos',
    hint: 'Penta = cinco',
    explanation: 'Este es un Pentágono porque tiene 5 lados y 5 vértices. "Penta" significa cinco en griego. Cuenta los lados: 1, 2, 3, 4, 5.',
    keyFeature: '5 lados (penta = cinco)',
  },
  hexagon: {
    id: 'hexagon',
    nameEs: 'Hexágono',
    nameEn: 'Hexagon',
    sides: 6,
    description: 'Seis lados y seis ángulos',
    hint: 'Hexa = seis',
    explanation: 'Este es un Hexágono porque tiene 6 lados y 6 vértices. "Hexa" significa seis en griego. Los panales de abejas tienen forma hexagonal.',
    keyFeature: '6 lados (hexa = seis)',
  },
  octagon: {
    id: 'octagon',
    nameEs: 'Octágono',
    nameEn: 'Octagon',
    sides: 8,
    description: 'Ocho lados y ocho ángulos',
    hint: 'Octa = ocho (como las señales de ALTO)',
    explanation: 'Este es un Octágono porque tiene 8 lados y 8 vértices. "Octa" significa ocho. Las señales de ALTO tienen esta forma.',
    keyFeature: '8 lados (octa = ocho)',
  },
  oval: {
    id: 'oval',
    nameEs: 'Óvalo',
    nameEn: 'Oval',
    sides: 0,
    description: 'Forma ovalada, como un huevo',
    hint: 'Es como un círculo estirado',
    explanation: 'Este es un Óvalo porque es una forma curva alargada, como un huevo o un círculo estirado. No tiene lados rectos pero NO es perfectamente redondo.',
    keyFeature: 'Curvo pero estirado (no es redondo perfecto)',
  },
  rhombus: {
    id: 'rhombus',
    nameEs: 'Rombo',
    nameEn: 'Rhombus',
    sides: 4,
    description: 'Cuatro lados iguales, forma de diamante',
    hint: 'Parece un cuadrado inclinado',
    explanation: 'Este es un Rombo porque tiene 4 lados iguales pero sus ángulos NO son de 90°. Parece un diamante o un cuadrado inclinado.',
    keyFeature: '4 lados iguales + ángulos NO son 90°',
  },
  trapezoid: {
    id: 'trapezoid',
    nameEs: 'Trapecio',
    nameEn: 'Trapezoid',
    sides: 4,
    description: 'Cuatro lados con dos lados paralelos',
    hint: 'Tiene un lado más corto arriba',
    explanation: 'Este es un Trapecio porque tiene 4 lados donde solo DOS lados son paralelos (generalmente arriba y abajo). Los otros dos lados están inclinados.',
    keyFeature: 'Solo 2 lados paralelos',
  },
  parallelogram: {
    id: 'parallelogram',
    nameEs: 'Paralelogramo',
    nameEn: 'Parallelogram',
    sides: 4,
    description: 'Cuatro lados con lados opuestos paralelos',
    hint: 'Como un rectángulo inclinado',
    explanation: 'Este es un Paralelogramo porque tiene 4 lados donde los lados opuestos son paralelos e iguales. Es como un rectángulo "empujado" de lado.',
    keyFeature: 'Lados opuestos paralelos + inclinado',
  },
  star: {
    id: 'star',
    nameEs: 'Estrella',
    nameEn: 'Star',
    sides: 10,
    description: 'Forma de estrella con 5 puntas',
    hint: 'Tiene 5 puntas',
    explanation: 'Esta es una Estrella de 5 puntas. Tiene 10 vértices en total: 5 puntas externas y 5 ángulos internos donde se unen las puntas.',
    keyFeature: '5 puntas hacia afuera',
  },
};

/**
 * Difficulty level configurations
 */
export const DIFFICULTY_CONFIGS: Record<ShapeGameDifficulty, DifficultyConfig> = {
  basic: {
    level: 'basic',
    title: 'Formas Básicas',
    description: 'Círculo, cuadrado, rectángulo y triángulo',
    shapes: ['circle', 'square', 'rectangle', 'triangle'],
    distractorCount: 3,
    problemsToComplete: 10,
  },
  intermediate: {
    level: 'intermediate',
    title: 'Formas Intermedias',
    description: 'Incluye pentágono, hexágono y óvalo',
    shapes: ['circle', 'square', 'rectangle', 'triangle', 'pentagon', 'hexagon', 'oval'],
    distractorCount: 3,
    problemsToComplete: 12,
  },
  advanced: {
    level: 'advanced',
    title: 'Formas Avanzadas',
    description: 'Todas las formas incluyendo rombo, trapecio y más',
    shapes: [
      'circle',
      'square',
      'rectangle',
      'triangle',
      'pentagon',
      'hexagon',
      'octagon',
      'oval',
      'rhombus',
      'trapezoid',
      'parallelogram',
      'star',
    ],
    distractorCount: 3,
    problemsToComplete: 15,
  },
};

/**
 * Generate a regular polygon with n sides
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
    const angle = i * angleStep + rotation - Math.PI / 2; // Start from top
    points.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    });
  }

  return points;
}

/**
 * Generate a 5-pointed star
 */
function generateStar(
  centerX: number,
  centerY: number,
  outerRadius: number,
  innerRadius: number,
  rotation: number = 0
): Point[] {
  const points: Point[] = [];
  const angleStep = Math.PI / 5; // 36 degrees

  for (let i = 0; i < 10; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = i * angleStep + rotation - Math.PI / 2;
    points.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    });
  }

  return points;
}

/**
 * Generate a circle figure
 */
function generateCircle(): GeometryFigure {
  const centerX = randomInRange(150, 250);
  const centerY = randomInRange(120, 180);
  const radius = randomInRange(50, 90);

  return {
    type: 'circle',
    center: { x: centerX, y: centerY },
    radius,
  };
}

/**
 * Generate a square figure
 */
function generateSquare(): GeometryFigure {
  const size = randomInRange(80, 140);
  const x = randomInRange(130, 230);
  const y = randomInRange(80, 160);

  return {
    type: 'rectangle',
    points: [
      { x, y },
      { x: x + size, y: y + size },
    ],
  };
}

/**
 * Generate a rectangle figure (not square)
 */
function generateRectangle(): GeometryFigure {
  const width = randomInRange(100, 180);
  const height = randomInRange(60, 100);
  // Ensure it's not too square-like
  const adjustedHeight = width === height ? height + 30 : height;

  const x = randomInRange(110, 200);
  const y = randomInRange(100, 150);

  return {
    type: 'rectangle',
    points: [
      { x, y },
      { x: x + width, y: y + adjustedHeight },
    ],
  };
}

/**
 * Generate a triangle figure
 */
function generateTriangle(): GeometryFigure {
  const centerX = randomInRange(150, 250);
  const centerY = randomInRange(120, 180);
  const radius = randomInRange(60, 100);
  const rotation = (Math.random() * Math.PI) / 4; // Random rotation

  const points = generateRegularPolygon(centerX, centerY, radius, 3, rotation);

  return {
    type: 'triangle',
    points,
  };
}

/**
 * Generate a pentagon figure
 */
function generatePentagon(): GeometryFigure {
  const centerX = randomInRange(150, 250);
  const centerY = randomInRange(120, 180);
  const radius = randomInRange(60, 90);
  const rotation = (Math.random() * Math.PI) / 3;

  const points = generateRegularPolygon(centerX, centerY, radius, 5, rotation);

  return {
    type: 'polygon',
    points,
  };
}

/**
 * Generate a hexagon figure
 */
function generateHexagon(): GeometryFigure {
  const centerX = randomInRange(150, 250);
  const centerY = randomInRange(120, 180);
  const radius = randomInRange(60, 90);
  const rotation = (Math.random() * Math.PI) / 3;

  const points = generateRegularPolygon(centerX, centerY, radius, 6, rotation);

  return {
    type: 'polygon',
    points,
  };
}

/**
 * Generate an octagon figure
 */
function generateOctagon(): GeometryFigure {
  const centerX = randomInRange(150, 250);
  const centerY = randomInRange(120, 180);
  const radius = randomInRange(60, 90);
  const rotation = (Math.random() * Math.PI) / 4;

  const points = generateRegularPolygon(centerX, centerY, radius, 8, rotation);

  return {
    type: 'polygon',
    points,
  };
}

/**
 * Generate an oval figure (ellipse)
 * Note: We'll use a circle but indicate it's an oval in the rendering
 */
function generateOval(): GeometryFigure & { isOval: boolean; scaleX: number; scaleY: number } {
  const centerX = randomInRange(150, 250);
  const centerY = randomInRange(120, 180);
  const baseRadius = randomInRange(50, 70);

  return {
    type: 'circle',
    center: { x: centerX, y: centerY },
    radius: baseRadius,
    isOval: true,
    scaleX: 1.4 + Math.random() * 0.4, // Horizontal stretch
    scaleY: 0.7 + Math.random() * 0.2, // Vertical compression
  };
}

/**
 * Generate a rhombus figure
 */
function generateRhombus(): GeometryFigure {
  const centerX = randomInRange(150, 250);
  const centerY = randomInRange(120, 180);
  const halfWidth = randomInRange(60, 90);
  const halfHeight = randomInRange(40, 70);

  const points: Point[] = [
    { x: centerX, y: centerY - halfHeight }, // Top
    { x: centerX + halfWidth, y: centerY }, // Right
    { x: centerX, y: centerY + halfHeight }, // Bottom
    { x: centerX - halfWidth, y: centerY }, // Left
  ];

  return {
    type: 'polygon',
    points,
  };
}

/**
 * Generate a trapezoid figure
 */
function generateTrapezoid(): GeometryFigure {
  const centerX = randomInRange(150, 250);
  const centerY = randomInRange(120, 180);
  const topWidth = randomInRange(60, 100);
  const bottomWidth = randomInRange(120, 160);
  const height = randomInRange(60, 100);

  const points: Point[] = [
    { x: centerX - topWidth / 2, y: centerY - height / 2 }, // Top left
    { x: centerX + topWidth / 2, y: centerY - height / 2 }, // Top right
    { x: centerX + bottomWidth / 2, y: centerY + height / 2 }, // Bottom right
    { x: centerX - bottomWidth / 2, y: centerY + height / 2 }, // Bottom left
  ];

  return {
    type: 'polygon',
    points,
  };
}

/**
 * Generate a parallelogram figure
 */
function generateParallelogram(): GeometryFigure {
  const centerX = randomInRange(150, 250);
  const centerY = randomInRange(120, 180);
  const width = randomInRange(100, 140);
  const height = randomInRange(60, 90);
  const skew = randomInRange(30, 50);

  const points: Point[] = [
    { x: centerX - width / 2 + skew, y: centerY - height / 2 }, // Top left
    { x: centerX + width / 2 + skew, y: centerY - height / 2 }, // Top right
    { x: centerX + width / 2 - skew, y: centerY + height / 2 }, // Bottom right
    { x: centerX - width / 2 - skew, y: centerY + height / 2 }, // Bottom left
  ];

  return {
    type: 'polygon',
    points,
  };
}

/**
 * Generate a star figure
 */
function generateStarShape(): GeometryFigure {
  const centerX = randomInRange(150, 250);
  const centerY = randomInRange(120, 180);
  const outerRadius = randomInRange(70, 100);
  const innerRadius = outerRadius * 0.4;
  const rotation = (Math.random() * Math.PI) / 5;

  const points = generateStar(centerX, centerY, outerRadius, innerRadius, rotation);

  return {
    type: 'polygon',
    points,
  };
}

/**
 * Generate a geometry figure for a given shape type
 */
export function generateShapeFigure(shape: Shape2D): GeometryFigure {
  switch (shape) {
    case 'circle':
      return generateCircle();
    case 'square':
      return generateSquare();
    case 'rectangle':
      return generateRectangle();
    case 'triangle':
      return generateTriangle();
    case 'pentagon':
      return generatePentagon();
    case 'hexagon':
      return generateHexagon();
    case 'octagon':
      return generateOctagon();
    case 'oval':
      return generateOval();
    case 'rhombus':
      return generateRhombus();
    case 'trapezoid':
      return generateTrapezoid();
    case 'parallelogram':
      return generateParallelogram();
    case 'star':
      return generateStarShape();
    default:
      return generateCircle();
  }
}

/**
 * Generate distractor options (wrong answers)
 */
function generateDistractors(
  correctShape: Shape2D,
  availableShapes: Shape2D[],
  count: number
): string[] {
  const distractors: string[] = [];
  const otherShapes = availableShapes.filter((s) => s !== correctShape);

  const shuffledOthers = shuffleArray(otherShapes);

  for (let i = 0; i < count && i < shuffledOthers.length; i++) {
    distractors.push(SHAPE_DEFINITIONS[shuffledOthers[i]].nameEs);
  }

  return distractors;
}

/**
 * Generate a shape identification problem
 */
export function generateShapeProblem(difficulty: ShapeGameDifficulty): ShapeProblem {
  const config = DIFFICULTY_CONFIGS[difficulty];
  const randomIndex = Math.floor(Math.random() * config.shapes.length);
  const correctShape = config.shapes[randomIndex];
  const shapeInfo = SHAPE_DEFINITIONS[correctShape];

  const figure = generateShapeFigure(correctShape);
  const correctAnswer = shapeInfo.nameEs;
  const distractors = generateDistractors(correctShape, config.shapes, config.distractorCount);
  const options = shuffleArray([correctAnswer, ...distractors]);

  return {
    id: `shape-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    figure,
    correctShape,
    correctAnswer,
    options,
    difficulty,
    hint: shapeInfo.hint,
  };
}

/**
 * Track previously shown shapes to ensure variety
 */
const recentShapes: Shape2D[] = [];
const MAX_RECENT = 3;

/**
 * Generate a problem avoiding recently shown shapes
 */
export function generateVariedShapeProblem(difficulty: ShapeGameDifficulty): ShapeProblem {
  const config = DIFFICULTY_CONFIGS[difficulty];

  // Filter out recently shown shapes if possible
  const availableShapes = config.shapes.filter((s) => !recentShapes.includes(s));
  const shapesToChooseFrom = availableShapes.length > 0 ? availableShapes : config.shapes;

  const randomIndex = Math.floor(Math.random() * shapesToChooseFrom.length);
  const correctShape = shapesToChooseFrom[randomIndex];

  // Track this shape
  recentShapes.push(correctShape);
  if (recentShapes.length > MAX_RECENT) {
    recentShapes.shift();
  }

  const shapeInfo = SHAPE_DEFINITIONS[correctShape];
  const figure = generateShapeFigure(correctShape);
  const correctAnswer = shapeInfo.nameEs;
  const distractors = generateDistractors(correctShape, config.shapes, config.distractorCount);
  const options = shuffleArray([correctAnswer, ...distractors]);

  return {
    id: `shape-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    figure,
    correctShape,
    correctAnswer,
    options,
    difficulty,
    hint: shapeInfo.hint,
  };
}

/**
 * Clear recent shape history (useful when starting a new game)
 */
export function clearRecentShapes(): void {
  recentShapes.length = 0;
}

/**
 * Get all shape names for a difficulty level
 */
export function getShapeNamesForDifficulty(difficulty: ShapeGameDifficulty): string[] {
  const config = DIFFICULTY_CONFIGS[difficulty];
  return config.shapes.map((s) => SHAPE_DEFINITIONS[s].nameEs);
}
