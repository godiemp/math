/**
 * ============================================================================
 * ANGLES GENERATOR FOR TYPES OF ANGLES GAME
 * ============================================================================
 *
 * Generates angle problems for learning about types of angles.
 * Creates visual representations with protractor-style arcs.
 */

import type {
  AngleType,
  AngleTypeInfo,
  AngleProblem,
  AnglesDifficultyConfig,
  AnglesGameDifficulty,
  AngleRay,
  AngleProblemType,
} from '@/lib/types/angles-game';

/**
 * Angle type definitions with Spanish names and educational content
 */
export const ANGLE_TYPE_DEFINITIONS: Record<AngleType, AngleTypeInfo> = {
  acute: {
    id: 'acute',
    nameEs: 'Ángulo Agudo',
    nameEn: 'Acute Angle',
    symbol: '<90°',
    rangeMin: 0,
    rangeMax: 90,
    description: 'Menor que 90 grados',
    explanation:
      'Un ángulo agudo mide menos de 90 grados. Es más "cerrado" que una esquina. Piensa en la punta de un triángulo equilátero (60°) o en la apertura de unas tijeras parcialmente cerradas.',
    realWorldExample:
      'La punta de una pizza, las manecillas del reloj a las 2:00, la forma de una letra "A".',
    colorHint: '#10B981', // green-500
  },
  right: {
    id: 'right',
    nameEs: 'Ángulo Recto',
    nameEn: 'Right Angle',
    symbol: '=90°',
    rangeMin: 90,
    rangeMax: 90,
    exactValue: 90,
    description: 'Exactamente 90 grados',
    explanation:
      'Un ángulo recto mide exactamente 90 grados. Forma una "L" perfecta. Es el ángulo más común en construcción y diseño porque crea esquinas estables.',
    realWorldExample:
      'La esquina de un libro, las esquinas de una puerta, la letra "L", donde el piso se encuentra con la pared.',
    colorHint: '#3B82F6', // blue-500
  },
  obtuse: {
    id: 'obtuse',
    nameEs: 'Ángulo Obtuso',
    nameEn: 'Obtuse Angle',
    symbol: '>90°',
    rangeMin: 90,
    rangeMax: 180,
    description: 'Mayor que 90 grados pero menor que 180',
    explanation:
      'Un ángulo obtuso mide más de 90 grados pero menos de 180 grados. Es más "abierto" que una esquina recta. Piensa en un libro parcialmente abierto.',
    realWorldExample:
      'Un libro abierto sobre una mesa, las manecillas del reloj a las 10:10, un abanico parcialmente abierto.',
    colorHint: '#F59E0B', // amber-500
  },
  straight: {
    id: 'straight',
    nameEs: 'Ángulo Llano',
    nameEn: 'Straight Angle',
    symbol: '=180°',
    rangeMin: 180,
    rangeMax: 180,
    exactValue: 180,
    description: 'Exactamente 180 grados',
    explanation:
      'Un ángulo llano (o plano) mide exactamente 180 grados. Forma una línea recta. Es el doble de un ángulo recto.',
    realWorldExample:
      'Una regla recta, el horizonte, las manecillas del reloj a las 6:00, una puerta completamente abierta contra la pared.',
    colorHint: '#8B5CF6', // violet-500
  },
  reflex: {
    id: 'reflex',
    nameEs: 'Ángulo Reflejo',
    nameEn: 'Reflex Angle',
    symbol: '>180°',
    rangeMin: 180,
    rangeMax: 360,
    description: 'Mayor que 180 grados pero menor que 360',
    explanation:
      'Un ángulo reflejo (o cóncavo) mide más de 180 grados pero menos de 360 grados. Es el ángulo "exterior" cuando miras el lado opuesto de un ángulo menor.',
    realWorldExample:
      'El ángulo exterior de una esquina de mesa, la parte exterior de un ángulo en una estrella, más de media vuelta.',
    colorHint: '#EF4444', // red-500
  },
};

/**
 * Difficulty level configurations
 */
export const ANGLES_DIFFICULTY_CONFIGS: Record<AnglesGameDifficulty, AnglesDifficultyConfig> = {
  basic: {
    level: 'basic',
    title: 'Ángulos Básicos',
    description: 'Ángulos rectos, agudos y obtusos con medición visible',
    angleTypes: ['acute', 'right', 'obtuse'],
    problemTypes: ['classify_angle'],
    problemsToComplete: 10,
    showDegrees: true,
    showProtractor: true,
    angleVariation: 10,
  },
  intermediate: {
    level: 'intermediate',
    title: 'Ángulos Intermedios',
    description: 'Todos los tipos de ángulos con estimación',
    angleTypes: ['acute', 'right', 'obtuse', 'straight'],
    problemTypes: ['classify_angle', 'measure_angle'],
    problemsToComplete: 12,
    showDegrees: false,
    showProtractor: true,
    angleVariation: 15,
  },
  advanced: {
    level: 'advanced',
    title: 'Ángulos Avanzados',
    description: 'Incluye ángulos reflejos y comparaciones',
    angleTypes: ['acute', 'right', 'obtuse', 'straight', 'reflex'],
    problemTypes: ['classify_angle', 'measure_angle', 'compare_angles'],
    problemsToComplete: 15,
    showDegrees: false,
    showProtractor: false,
    angleVariation: 20,
  },
};

/**
 * Utility functions
 */
function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Convert polar coordinates to cartesian
 */
function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } {
  const angleInRadians = (angleInDegrees * Math.PI) / 180;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY - radius * Math.sin(angleInRadians), // Negative because SVG Y is inverted
  };
}

/**
 * Generate random angle in degrees for a specific angle type
 */
function generateAngleDegrees(angleType: AngleType, variation: number): number {
  const info = ANGLE_TYPE_DEFINITIONS[angleType];

  switch (angleType) {
    case 'acute':
      // Generate angle between 20 and 80 degrees (avoiding extremes)
      return randomInRange(20, 80);

    case 'right':
      return 90;

    case 'obtuse':
      // Generate angle between 100 and 170 degrees
      return randomInRange(100, 170);

    case 'straight':
      return 180;

    case 'reflex':
      // Generate angle between 200 and 340 degrees
      return randomInRange(200, 340);

    default:
      return 90;
  }
}

/**
 * Generate rays for an angle
 */
function generateAngleRays(
  vertexX: number,
  vertexY: number,
  angleDegrees: number,
  rayLength: number = 120
): { ray1: AngleRay; ray2: AngleRay } {
  // First ray always points to the right (0 degrees)
  const ray1Angle = 0;
  const ray1End = polarToCartesian(vertexX, vertexY, rayLength, ray1Angle);

  const ray1: AngleRay = {
    id: 'ray1',
    startX: vertexX,
    startY: vertexY,
    endX: ray1End.x,
    endY: ray1End.y,
    angle: ray1Angle,
  };

  // Second ray forms the angle
  const ray2End = polarToCartesian(vertexX, vertexY, rayLength, angleDegrees);

  const ray2: AngleRay = {
    id: 'ray2',
    startX: vertexX,
    startY: vertexY,
    endX: ray2End.x,
    endY: ray2End.y,
    angle: angleDegrees,
  };

  return { ray1, ray2 };
}

/**
 * Classify angle type based on degrees
 */
function classifyAngle(degrees: number): AngleType {
  if (degrees < 90) return 'acute';
  if (degrees === 90) return 'right';
  if (degrees < 180) return 'obtuse';
  if (degrees === 180) return 'straight';
  return 'reflex';
}

/**
 * Generate question text based on problem type
 */
function generateQuestion(
  type: AngleProblemType,
  angleDegrees?: number,
  showDegrees?: boolean
): string {
  switch (type) {
    case 'classify_angle':
      if (showDegrees && angleDegrees !== undefined) {
        return `Este ángulo mide ${angleDegrees}°. ¿Qué tipo de ángulo es?`;
      }
      return '¿Qué tipo de ángulo es este?';
    case 'measure_angle':
      return '¿Cuál es la medida aproximada de este ángulo?';
    case 'compare_angles':
      return '¿Cuál ángulo es mayor?';
    default:
      return '¿Qué tipo de ángulo es este?';
  }
}

/**
 * Generate options for a problem
 */
function generateOptions(
  type: AngleProblemType,
  correctAnswer: string | number,
  angleType: AngleType,
  availableTypes: AngleType[]
): (string | number)[] {
  switch (type) {
    case 'classify_angle':
      const angleInfo = ANGLE_TYPE_DEFINITIONS[angleType];
      const correctName = angleInfo.nameEs;

      // Get other angle type names as distractors
      const otherTypes = availableTypes.filter((t) => t !== angleType);
      const distractorNames = shuffleArray(otherTypes)
        .slice(0, 3)
        .map((t) => ANGLE_TYPE_DEFINITIONS[t].nameEs);

      return shuffleArray([correctName, ...distractorNames]);

    case 'measure_angle':
      const correctDegrees = correctAnswer as number;
      // Generate nearby measurements as distractors
      const distractors: number[] = [];
      const possibleOffsets = [-30, -20, -15, 15, 20, 30];

      for (const offset of shuffleArray(possibleOffsets)) {
        const distractor = correctDegrees + offset;
        if (distractor > 0 && distractor < 360 && !distractors.includes(distractor)) {
          distractors.push(distractor);
          if (distractors.length >= 3) break;
        }
      }

      return shuffleArray([correctDegrees, ...distractors]).map((d) => `${d}°`);

    case 'compare_angles':
      return ['Ángulo A', 'Ángulo B', 'Son iguales'];

    default:
      return [];
  }
}

/**
 * Generate hint based on problem type and angle
 */
function generateHint(type: AngleProblemType, angleType: AngleType): string {
  const info = ANGLE_TYPE_DEFINITIONS[angleType];

  switch (type) {
    case 'classify_angle':
      if (angleType === 'acute') {
        return 'Compara este ángulo con la esquina de un libro (90°). ¿Es más pequeño o más grande?';
      } else if (angleType === 'right') {
        return 'Busca si forma una "L" perfecta, como la esquina de una hoja de papel.';
      } else if (angleType === 'obtuse') {
        return 'Este ángulo es más abierto que una esquina recta (90°) pero no forma una línea recta.';
      } else if (angleType === 'straight') {
        return 'Observa si los dos rayos forman una línea completamente recta.';
      } else {
        return 'Un ángulo reflejo es mayor que 180°, más de media vuelta completa.';
      }

    case 'measure_angle':
      return `Recuerda: ${info.nameEs} ${info.description.toLowerCase()}. Estima cuántos grados tiene comparando con ángulos conocidos.`;

    case 'compare_angles':
      return 'Observa la apertura de cada ángulo. El ángulo más grande tiene mayor separación entre sus rayos.';

    default:
      return 'Observa cuidadosamente la apertura del ángulo.';
  }
}

/**
 * Track recently shown angle types for variety
 */
const recentAngleTypes: AngleType[] = [];
const MAX_RECENT = 2;

/**
 * Generate an angle problem
 */
export function generateAngleProblem(difficulty: AnglesGameDifficulty): AngleProblem {
  const config = ANGLES_DIFFICULTY_CONFIGS[difficulty];

  // Select angle type avoiding recent ones
  const availableTypes = config.angleTypes.filter((t) => !recentAngleTypes.includes(t));
  const typesToChooseFrom = availableTypes.length > 0 ? availableTypes : config.angleTypes;
  const angleType = typesToChooseFrom[randomInRange(0, typesToChooseFrom.length - 1)];

  // Track this type
  recentAngleTypes.push(angleType);
  if (recentAngleTypes.length > MAX_RECENT) {
    recentAngleTypes.shift();
  }

  // Select problem type
  const problemType = config.problemTypes[randomInRange(0, config.problemTypes.length - 1)];

  // Generate angle measurement
  const angleDegrees = generateAngleDegrees(angleType, config.angleVariation);

  // Position vertex in the canvas
  const vertexX = 200;
  const vertexY = 180;

  // Generate rays
  const { ray1, ray2 } = generateAngleRays(vertexX, vertexY, angleDegrees);

  // Determine correct answer
  let correctAnswer: string | number;
  let comparisonAngle: AngleProblem['comparisonAngle'] | undefined;

  const angleInfo = ANGLE_TYPE_DEFINITIONS[angleType];

  switch (problemType) {
    case 'classify_angle':
      correctAnswer = angleInfo.nameEs;
      break;

    case 'measure_angle':
      // Round to nearest 5 for easier estimation
      correctAnswer = `${Math.round(angleDegrees / 5) * 5}°`;
      break;

    case 'compare_angles':
      // Generate a second angle for comparison
      const secondAngleType = config.angleTypes[randomInRange(0, config.angleTypes.length - 1)];
      const secondAngleDegrees = generateAngleDegrees(secondAngleType, config.angleVariation);

      // Ensure they're different enough to compare
      let finalSecondAngle = secondAngleDegrees;
      if (Math.abs(secondAngleDegrees - angleDegrees) < 15) {
        finalSecondAngle = angleDegrees + (Math.random() > 0.5 ? 25 : -25);
        if (finalSecondAngle < 10) finalSecondAngle = 10;
        if (finalSecondAngle > 350) finalSecondAngle = 350;
      }

      const { ray1: comp1, ray2: comp2 } = generateAngleRays(vertexX + 200, vertexY, finalSecondAngle);

      comparisonAngle = {
        angleDegrees: finalSecondAngle,
        ray1: comp1,
        ray2: comp2,
      };

      if (angleDegrees > finalSecondAngle) {
        correctAnswer = 'Ángulo A';
      } else if (finalSecondAngle > angleDegrees) {
        correctAnswer = 'Ángulo B';
      } else {
        correctAnswer = 'Son iguales';
      }
      break;

    default:
      correctAnswer = angleInfo.nameEs;
  }

  const options = generateOptions(
    problemType,
    correctAnswer,
    angleType,
    config.angleTypes
  );
  const question = generateQuestion(problemType, angleDegrees, config.showDegrees);
  const hint = generateHint(problemType, angleType);

  return {
    id: `angle-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: problemType,
    angleType,
    angleDegrees,
    vertexX,
    vertexY,
    ray1,
    ray2,
    correctAnswer,
    options,
    difficulty,
    question,
    hint,
    explanation: angleInfo.explanation,
    comparisonAngle,
  };
}

/**
 * Clear recent angle types history
 */
export function clearRecentAngleTypes(): void {
  recentAngleTypes.length = 0;
}

/**
 * Get angle type info for displaying explanations
 */
export function getAngleTypeInfo(angleType: AngleType): AngleTypeInfo {
  return ANGLE_TYPE_DEFINITIONS[angleType];
}

/**
 * SVG Arc path generation for protractor-style angle visualization
 */
export function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

/**
 * Get color for angle type
 */
export function getAngleColor(angleType: AngleType): string {
  return ANGLE_TYPE_DEFINITIONS[angleType].colorHint;
}
