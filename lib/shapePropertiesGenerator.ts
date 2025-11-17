/**
 * ============================================================================
 * SHAPE PROPERTIES GENERATOR
 * ============================================================================
 *
 * Generates problems for learning sides, vertices, and edges of shapes.
 * Includes both 2D and 3D shapes for comprehensive geometry learning.
 */

import type { GeometryFigure } from '@/components/GeometryCanvas';
import type { Shape2D } from '@/lib/types/shape-game';
import type {
  Shape3D,
  ShapePropertyInfo,
  PropertiesGameDifficulty,
  PropertiesDifficultyConfig,
  PropertiesProblem,
  PropertyQuestionType,
  ShapeProperty,
} from '@/lib/types/shape-properties-game';
import { generateShapeFigure, SHAPE_DEFINITIONS } from './shapeGenerator';

/**
 * Extended shape definitions including properties
 */
export const SHAPE_PROPERTIES: Record<Shape2D | Shape3D, ShapePropertyInfo> = {
  // 2D Shapes
  circle: {
    id: 'circle',
    nameEs: 'Círculo',
    nameEn: 'Circle',
    sides: 0,
    vertices: 0,
    is3D: false,
    description: 'Sin lados ni vértices (curvo)',
  },
  oval: {
    id: 'oval',
    nameEs: 'Óvalo',
    nameEn: 'Oval',
    sides: 0,
    vertices: 0,
    is3D: false,
    description: 'Sin lados ni vértices (curvo)',
  },
  triangle: {
    id: 'triangle',
    nameEs: 'Triángulo',
    nameEn: 'Triangle',
    sides: 3,
    vertices: 3,
    is3D: false,
    description: '3 lados y 3 vértices',
  },
  square: {
    id: 'square',
    nameEs: 'Cuadrado',
    nameEn: 'Square',
    sides: 4,
    vertices: 4,
    is3D: false,
    description: '4 lados iguales y 4 vértices',
  },
  rectangle: {
    id: 'rectangle',
    nameEs: 'Rectángulo',
    nameEn: 'Rectangle',
    sides: 4,
    vertices: 4,
    is3D: false,
    description: '4 lados y 4 vértices',
  },
  rhombus: {
    id: 'rhombus',
    nameEs: 'Rombo',
    nameEn: 'Rhombus',
    sides: 4,
    vertices: 4,
    is3D: false,
    description: '4 lados iguales y 4 vértices',
  },
  trapezoid: {
    id: 'trapezoid',
    nameEs: 'Trapecio',
    nameEn: 'Trapezoid',
    sides: 4,
    vertices: 4,
    is3D: false,
    description: '4 lados y 4 vértices',
  },
  parallelogram: {
    id: 'parallelogram',
    nameEs: 'Paralelogramo',
    nameEn: 'Parallelogram',
    sides: 4,
    vertices: 4,
    is3D: false,
    description: '4 lados y 4 vértices',
  },
  pentagon: {
    id: 'pentagon',
    nameEs: 'Pentágono',
    nameEn: 'Pentagon',
    sides: 5,
    vertices: 5,
    is3D: false,
    description: '5 lados y 5 vértices',
  },
  hexagon: {
    id: 'hexagon',
    nameEs: 'Hexágono',
    nameEn: 'Hexagon',
    sides: 6,
    vertices: 6,
    is3D: false,
    description: '6 lados y 6 vértices',
  },
  octagon: {
    id: 'octagon',
    nameEs: 'Octágono',
    nameEn: 'Octagon',
    sides: 8,
    vertices: 8,
    is3D: false,
    description: '8 lados y 8 vértices',
  },
  star: {
    id: 'star',
    nameEs: 'Estrella',
    nameEn: 'Star',
    sides: 10,
    vertices: 10,
    is3D: false,
    description: '10 puntas y 10 vértices',
  },
  // 3D Shapes
  cube: {
    id: 'cube',
    nameEs: 'Cubo',
    nameEn: 'Cube',
    sides: 0,
    vertices: 8,
    edges: 12,
    faces: 6,
    is3D: true,
    description: '8 vértices, 12 aristas, 6 caras',
  },
  rectangular_prism: {
    id: 'rectangular_prism',
    nameEs: 'Prisma Rectangular',
    nameEn: 'Rectangular Prism',
    sides: 0,
    vertices: 8,
    edges: 12,
    faces: 6,
    is3D: true,
    description: '8 vértices, 12 aristas, 6 caras',
  },
  sphere: {
    id: 'sphere',
    nameEs: 'Esfera',
    nameEn: 'Sphere',
    sides: 0,
    vertices: 0,
    edges: 0,
    faces: 1,
    is3D: true,
    description: '0 vértices, 0 aristas, 1 cara curva',
  },
  cylinder: {
    id: 'cylinder',
    nameEs: 'Cilindro',
    nameEn: 'Cylinder',
    sides: 0,
    vertices: 0,
    edges: 2,
    faces: 3,
    is3D: true,
    description: '0 vértices, 2 aristas, 3 caras',
  },
  cone: {
    id: 'cone',
    nameEs: 'Cono',
    nameEn: 'Cone',
    sides: 0,
    vertices: 1,
    edges: 1,
    faces: 2,
    is3D: true,
    description: '1 vértice, 1 arista, 2 caras',
  },
  pyramid: {
    id: 'pyramid',
    nameEs: 'Pirámide',
    nameEn: 'Pyramid',
    sides: 0,
    vertices: 5,
    edges: 8,
    faces: 5,
    is3D: true,
    description: '5 vértices, 8 aristas, 5 caras',
  },
  triangular_prism: {
    id: 'triangular_prism',
    nameEs: 'Prisma Triangular',
    nameEn: 'Triangular Prism',
    sides: 0,
    vertices: 6,
    edges: 9,
    faces: 5,
    is3D: true,
    description: '6 vértices, 9 aristas, 5 caras',
  },
};

/**
 * Difficulty level configurations
 */
export const PROPERTIES_DIFFICULTY_CONFIGS: Record<
  PropertiesGameDifficulty,
  PropertiesDifficultyConfig
> = {
  counting: {
    level: 'counting',
    title: 'Contando Lados y Vértices',
    description: 'Cuenta los lados y vértices de formas 2D básicas',
    shapes: ['triangle', 'square', 'rectangle', 'pentagon', 'hexagon'],
    questionTypes: ['count_sides', 'count_vertices'],
    include3D: false,
    problemsToComplete: 10,
  },
  identifying: {
    level: 'identifying',
    title: 'Identificando por Propiedades',
    description: 'Identifica formas por su número de lados y vértices',
    shapes: ['triangle', 'square', 'rectangle', 'pentagon', 'hexagon', 'octagon', 'rhombus'],
    questionTypes: ['count_sides', 'count_vertices', 'identify_by_property'],
    include3D: false,
    problemsToComplete: 12,
  },
  comparing: {
    level: 'comparing',
    title: 'Comparando Propiedades',
    description: 'Compara propiedades entre diferentes formas',
    shapes: [
      'triangle',
      'square',
      'rectangle',
      'pentagon',
      'hexagon',
      'octagon',
      'cube',
      'pyramid',
      'triangular_prism',
    ],
    questionTypes: ['count_sides', 'count_vertices', 'count_edges', 'count_faces', 'compare_properties'],
    include3D: true,
    problemsToComplete: 15,
  },
};

/**
 * Shuffle array utility
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate distractors for numeric answers
 */
function generateNumericDistractors(correctAnswer: number, count: number): number[] {
  const distractors: Set<number> = new Set();

  // Add nearby numbers
  const nearby = [correctAnswer - 2, correctAnswer - 1, correctAnswer + 1, correctAnswer + 2];
  nearby.forEach((n) => {
    if (n >= 0 && n !== correctAnswer) {
      distractors.add(n);
    }
  });

  // Add common shape property numbers
  const commonNumbers = [0, 3, 4, 5, 6, 8, 10, 12];
  commonNumbers.forEach((n) => {
    if (n !== correctAnswer) {
      distractors.add(n);
    }
  });

  const distractorArray = Array.from(distractors);
  return shuffleArray(distractorArray).slice(0, count);
}

/**
 * Generate a "count sides" problem
 */
function generateCountSidesProblem(
  shapes: (Shape2D | Shape3D)[],
  difficulty: PropertiesGameDifficulty
): PropertiesProblem {
  // Filter to 2D shapes only
  const shapes2D = shapes.filter((s) => !SHAPE_PROPERTIES[s].is3D) as Shape2D[];
  const randomShape = shapes2D[Math.floor(Math.random() * shapes2D.length)];
  const shapeInfo = SHAPE_PROPERTIES[randomShape];

  const figure = generateShapeFigure(randomShape);
  const correctAnswer = shapeInfo.sides;
  const distractors = generateNumericDistractors(correctAnswer, 3);
  const options = shuffleArray([correctAnswer, ...distractors]);

  return {
    id: `prop-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    questionType: 'count_sides',
    figure,
    shapeName: shapeInfo.nameEs,
    shapeId: randomShape,
    property: 'sides',
    questionText: `¿Cuántos lados tiene este ${shapeInfo.nameEs.toLowerCase()}?`,
    correctAnswer,
    options,
    difficulty,
    hint: shapeInfo.sides === 0 ? 'Las formas curvas no tienen lados rectos' : `Cuenta cada línea recta`,
  };
}

/**
 * Generate a "count vertices" problem
 */
function generateCountVerticesProblem(
  shapes: (Shape2D | Shape3D)[],
  difficulty: PropertiesGameDifficulty
): PropertiesProblem {
  const shapes2D = shapes.filter((s) => !SHAPE_PROPERTIES[s].is3D) as Shape2D[];
  const randomShape = shapes2D[Math.floor(Math.random() * shapes2D.length)];
  const shapeInfo = SHAPE_PROPERTIES[randomShape];

  const figure = generateShapeFigure(randomShape);
  const correctAnswer = shapeInfo.vertices;
  const distractors = generateNumericDistractors(correctAnswer, 3);
  const options = shuffleArray([correctAnswer, ...distractors]);

  return {
    id: `prop-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    questionType: 'count_vertices',
    figure,
    shapeName: shapeInfo.nameEs,
    shapeId: randomShape,
    property: 'vertices',
    questionText: `¿Cuántos vértices (esquinas) tiene este ${shapeInfo.nameEs.toLowerCase()}?`,
    correctAnswer,
    options,
    difficulty,
    hint:
      shapeInfo.vertices === 0
        ? 'Las formas curvas no tienen esquinas'
        : `Los vértices son donde se unen los lados`,
  };
}

/**
 * Generate a "count edges" problem (3D shapes)
 */
function generateCountEdgesProblem(
  shapes: (Shape2D | Shape3D)[],
  difficulty: PropertiesGameDifficulty
): PropertiesProblem {
  const shapes3D = shapes.filter((s) => SHAPE_PROPERTIES[s].is3D);
  if (shapes3D.length === 0) {
    // Fallback to count sides if no 3D shapes
    return generateCountSidesProblem(shapes, difficulty);
  }

  const randomShape = shapes3D[Math.floor(Math.random() * shapes3D.length)];
  const shapeInfo = SHAPE_PROPERTIES[randomShape];

  const correctAnswer = shapeInfo.edges || 0;
  const distractors = generateNumericDistractors(correctAnswer, 3);
  const options = shuffleArray([correctAnswer, ...distractors]);

  return {
    id: `prop-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    questionType: 'count_edges',
    figure: undefined, // No 2D figure for 3D shapes
    shapeName: shapeInfo.nameEs,
    shapeId: randomShape,
    property: 'edges',
    questionText: `¿Cuántas aristas tiene un ${shapeInfo.nameEs.toLowerCase()}?`,
    correctAnswer,
    options,
    difficulty,
    hint: `Las aristas son las líneas donde se unen las caras`,
  };
}

/**
 * Generate a "count faces" problem (3D shapes)
 */
function generateCountFacesProblem(
  shapes: (Shape2D | Shape3D)[],
  difficulty: PropertiesGameDifficulty
): PropertiesProblem {
  const shapes3D = shapes.filter((s) => SHAPE_PROPERTIES[s].is3D);
  if (shapes3D.length === 0) {
    return generateCountVerticesProblem(shapes, difficulty);
  }

  const randomShape = shapes3D[Math.floor(Math.random() * shapes3D.length)];
  const shapeInfo = SHAPE_PROPERTIES[randomShape];

  const correctAnswer = shapeInfo.faces || 0;
  const distractors = generateNumericDistractors(correctAnswer, 3);
  const options = shuffleArray([correctAnswer, ...distractors]);

  return {
    id: `prop-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    questionType: 'count_faces',
    figure: undefined,
    shapeName: shapeInfo.nameEs,
    shapeId: randomShape,
    property: 'faces',
    questionText: `¿Cuántas caras tiene un ${shapeInfo.nameEs.toLowerCase()}?`,
    correctAnswer,
    options,
    difficulty,
    hint: `Las caras son las superficies planas o curvas del sólido`,
  };
}

/**
 * Generate an "identify by property" problem
 */
function generateIdentifyByPropertyProblem(
  shapes: (Shape2D | Shape3D)[],
  difficulty: PropertiesGameDifficulty
): PropertiesProblem {
  const shapes2D = shapes.filter((s) => !SHAPE_PROPERTIES[s].is3D) as Shape2D[];

  // Pick a random shape and property
  const targetShape = shapes2D[Math.floor(Math.random() * shapes2D.length)];
  const targetInfo = SHAPE_PROPERTIES[targetShape];

  // Decide on sides or vertices
  const property: ShapeProperty = Math.random() > 0.5 ? 'sides' : 'vertices';
  const propertyValue = property === 'sides' ? targetInfo.sides : targetInfo.vertices;
  const propertyName = property === 'sides' ? 'lados' : 'vértices';

  // Get other shapes as distractors (with different property values)
  const distractorShapes = shapes2D
    .filter((s) => {
      const info = SHAPE_PROPERTIES[s];
      const value = property === 'sides' ? info.sides : info.vertices;
      return value !== propertyValue && s !== targetShape;
    })
    .slice(0, 3);

  const options = shuffleArray([
    targetInfo.nameEs,
    ...distractorShapes.map((s) => SHAPE_PROPERTIES[s].nameEs),
  ]);

  return {
    id: `prop-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    questionType: 'identify_by_property',
    figure: undefined,
    shapeName: targetInfo.nameEs,
    shapeId: targetShape,
    property,
    questionText: `¿Qué forma tiene exactamente ${propertyValue} ${propertyName}?`,
    correctAnswer: targetInfo.nameEs,
    options,
    difficulty,
    hint: `Piensa en cuántos ${propertyName} tiene cada forma`,
  };
}

/**
 * Generate a "compare properties" problem
 */
function generateComparePropertiesProblem(
  shapes: (Shape2D | Shape3D)[],
  difficulty: PropertiesGameDifficulty
): PropertiesProblem {
  const shapes2D = shapes.filter((s) => !SHAPE_PROPERTIES[s].is3D) as Shape2D[];

  // Pick two shapes with different side counts
  const shuffledShapes = shuffleArray(shapes2D);
  const shape1 = shuffledShapes[0];
  const shape2 = shuffledShapes[1];

  const info1 = SHAPE_PROPERTIES[shape1];
  const info2 = SHAPE_PROPERTIES[shape2];

  // Compare sides or vertices
  const property: ShapeProperty = Math.random() > 0.5 ? 'sides' : 'vertices';
  const propertyName = property === 'sides' ? 'lados' : 'vértices';

  const value1 = property === 'sides' ? info1.sides : info1.vertices;
  const value2 = property === 'sides' ? info2.sides : info2.vertices;

  const correctAnswer = value1 > value2 ? info1.nameEs : info2.nameEs;

  // Add some other shapes as distractors
  const otherShapes = shuffledShapes.slice(2, 4);
  const options = shuffleArray([
    info1.nameEs,
    info2.nameEs,
    ...otherShapes.map((s) => SHAPE_PROPERTIES[s].nameEs),
  ]).slice(0, 4);

  // Make sure correct answer is in options
  if (!options.includes(correctAnswer)) {
    options[0] = correctAnswer;
  }

  return {
    id: `prop-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    questionType: 'compare_properties',
    figure: undefined,
    shapeName: correctAnswer,
    shapeId: value1 > value2 ? shape1 : shape2,
    property,
    questionText: `¿Qué forma tiene MÁS ${propertyName}: ${info1.nameEs} o ${info2.nameEs}?`,
    correctAnswer,
    options: shuffleArray(options),
    difficulty,
    hint: `${info1.nameEs}: ${value1} ${propertyName}, ${info2.nameEs}: ${value2} ${propertyName}`,
  };
}

/**
 * Generate a properties problem based on difficulty
 */
export function generatePropertiesProblem(
  difficulty: PropertiesGameDifficulty
): PropertiesProblem {
  const config = PROPERTIES_DIFFICULTY_CONFIGS[difficulty];
  const questionType = config.questionTypes[Math.floor(Math.random() * config.questionTypes.length)];

  switch (questionType) {
    case 'count_sides':
      return generateCountSidesProblem(config.shapes, difficulty);
    case 'count_vertices':
      return generateCountVerticesProblem(config.shapes, difficulty);
    case 'count_edges':
      return generateCountEdgesProblem(config.shapes, difficulty);
    case 'count_faces':
      return generateCountFacesProblem(config.shapes, difficulty);
    case 'identify_by_property':
      return generateIdentifyByPropertyProblem(config.shapes, difficulty);
    case 'compare_properties':
      return generateComparePropertiesProblem(config.shapes, difficulty);
    default:
      return generateCountSidesProblem(config.shapes, difficulty);
  }
}

/**
 * Track recently asked questions to ensure variety
 */
const recentQuestions: string[] = [];
const MAX_RECENT_QUESTIONS = 5;

/**
 * Generate a varied properties problem
 */
export function generateVariedPropertiesProblem(
  difficulty: PropertiesGameDifficulty
): PropertiesProblem {
  let problem = generatePropertiesProblem(difficulty);
  let attempts = 0;

  // Try to avoid repeating the same question type + shape combo
  const questionKey = `${problem.questionType}-${problem.shapeId}`;
  while (recentQuestions.includes(questionKey) && attempts < 10) {
    problem = generatePropertiesProblem(difficulty);
    attempts++;
  }

  // Track this question
  recentQuestions.push(`${problem.questionType}-${problem.shapeId}`);
  if (recentQuestions.length > MAX_RECENT_QUESTIONS) {
    recentQuestions.shift();
  }

  return problem;
}

/**
 * Clear recent questions history
 */
export function clearRecentPropertiesQuestions(): void {
  recentQuestions.length = 0;
}
