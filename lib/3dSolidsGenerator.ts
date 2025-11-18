/**
 * ============================================================================
 * 3D SOLIDS GENERATOR FOR 3D SOLIDS GAME
 * ============================================================================
 *
 * Generates 3D solid problems for learning about solid geometry.
 * Creates isometric representations of 3D shapes.
 */

import type {
  SolidType,
  SolidTypeInfo,
  SolidsProblem,
  SolidsDifficultyConfig,
  SolidsGameDifficulty,
  SolidsProblemType,
} from '@/lib/types/3d-solids-game';
import { randomInRange, shuffleArray } from '@/lib/utils/gameUtils';

/**
 * 3D solid type definitions with Spanish names and educational content
 */
export const SOLID_TYPE_DEFINITIONS: Record<SolidType, SolidTypeInfo> = {
  sphere: {
    id: 'sphere',
    nameEs: 'Esfera',
    nameEn: 'Sphere',
    faces: 0, // Continuous curved surface
    edges: 0,
    vertices: 0,
    description: 'Superficie curva continua, sin caras planas',
    explanation:
      'Una esfera es un sólido perfectamente redondo. Todos sus puntos están a la misma distancia del centro. No tiene caras planas, aristas ni vértices. La fórmula de Euler (V - E + F = 2) no aplica porque no es un poliedro.',
    realWorldExample:
      'Un balón de fútbol, una pelota de básquetbol, el planeta Tierra, naranjas, burbujas de jabón.',
    colorHint: '#10B981', // emerald-500
  },
  cube: {
    id: 'cube',
    nameEs: 'Cubo',
    nameEn: 'Cube',
    faces: 6,
    edges: 12,
    vertices: 8,
    description: '6 caras cuadradas iguales',
    explanation:
      'Un cubo tiene 6 caras cuadradas idénticas, 12 aristas de igual longitud y 8 vértices donde se encuentran 3 aristas. Cumple la fórmula de Euler: V - E + F = 8 - 12 + 6 = 2.',
    realWorldExample:
      'Un dado, cubo de Rubik, caja de cartón cúbica, cubos de hielo, bloques de construcción.',
    colorHint: '#3B82F6', // blue-500
    eulerFormula: '8 - 12 + 6 = 2',
  },
  rectangular_prism: {
    id: 'rectangular_prism',
    nameEs: 'Prisma Rectangular',
    nameEn: 'Rectangular Prism',
    faces: 6,
    edges: 12,
    vertices: 8,
    description: '6 caras rectangulares (puede tener diferentes dimensiones)',
    explanation:
      'Un prisma rectangular (también llamado ortoedro o paralelepípedo) tiene 6 caras rectangulares, 12 aristas y 8 vértices. Es como un cubo "estirado". Cumple la fórmula de Euler: V - E + F = 8 - 12 + 6 = 2.',
    realWorldExample:
      'Una caja de zapatos, un ladrillo, una caja de cereal, un refrigerador, un libro cerrado.',
    colorHint: '#8B5CF6', // violet-500
    eulerFormula: '8 - 12 + 6 = 2',
  },
  cylinder: {
    id: 'cylinder',
    nameEs: 'Cilindro',
    nameEn: 'Cylinder',
    faces: 3, // 2 bases circulares + 1 superficie lateral curva
    edges: 2, // 2 bordes circulares
    vertices: 0,
    description: '2 bases circulares y 1 superficie lateral curva',
    explanation:
      'Un cilindro tiene 2 caras planas circulares (las bases) y 1 superficie lateral curva. Tiene 2 aristas (los bordes de las bases) y no tiene vértices. La fórmula de Euler no aplica de forma estándar porque tiene superficies curvas.',
    realWorldExample:
      'Una lata de refresco, un rollo de papel, una vela cilíndrica, un tubo, una batería.',
    colorHint: '#F59E0B', // amber-500
  },
  cone: {
    id: 'cone',
    nameEs: 'Cono',
    nameEn: 'Cone',
    faces: 2, // 1 base circular + 1 superficie lateral curva
    edges: 1, // 1 borde circular
    vertices: 1, // El ápice
    description: '1 base circular y 1 superficie lateral curva que llega a un punto',
    explanation:
      'Un cono tiene 1 cara plana circular (la base), 1 superficie lateral curva y 1 vértice (el ápice o punta). Tiene 1 arista (el borde de la base). La fórmula de Euler no aplica de forma estándar.',
    realWorldExample:
      'Un cono de helado, un sombrero de fiesta, un embudo, una zanahoria, un cono de tráfico.',
    colorHint: '#EF4444', // red-500
  },
  pyramid: {
    id: 'pyramid',
    nameEs: 'Pirámide Cuadrada',
    nameEn: 'Square Pyramid',
    faces: 5, // 1 base cuadrada + 4 caras triangulares
    edges: 8, // 4 de la base + 4 laterales
    vertices: 5, // 4 de la base + 1 ápice
    description: '1 base cuadrada y 4 caras triangulares',
    explanation:
      'Una pirámide de base cuadrada tiene 5 caras (1 cuadrada y 4 triangulares), 8 aristas y 5 vértices. Cumple la fórmula de Euler: V - E + F = 5 - 8 + 5 = 2.',
    realWorldExample:
      'Las pirámides de Egipto, pirámides de Chichén Itzá, techo piramidal, tienda de campaña.',
    colorHint: '#D97706', // amber-600
    eulerFormula: '5 - 8 + 5 = 2',
  },
  triangular_prism: {
    id: 'triangular_prism',
    nameEs: 'Prisma Triangular',
    nameEn: 'Triangular Prism',
    faces: 5, // 2 bases triangulares + 3 caras rectangulares
    edges: 9, // 6 de las bases + 3 laterales
    vertices: 6, // 3 en cada base
    description: '2 bases triangulares y 3 caras rectangulares',
    explanation:
      'Un prisma triangular tiene 5 caras (2 triangulares y 3 rectangulares), 9 aristas y 6 vértices. Cumple la fórmula de Euler: V - E + F = 6 - 9 + 5 = 2.',
    realWorldExample:
      'Una barra Toblerone, una tienda de campaña triangular, un prisma óptico, techo de casa.',
    colorHint: '#06B6D4', // cyan-500
    eulerFormula: '6 - 9 + 5 = 2',
  },
};

/**
 * Difficulty level configurations
 */
export const SOLIDS_DIFFICULTY_CONFIGS: Record<SolidsGameDifficulty, SolidsDifficultyConfig> = {
  basic: {
    level: 'basic',
    title: 'Sólidos Básicos',
    description: 'Identificar cubos, esferas y cilindros',
    solidTypes: ['cube', 'sphere', 'cylinder'],
    problemTypes: ['identify_solid'],
    problemsToComplete: 10,
    showLabels: true,
    showWireframe: false,
  },
  intermediate: {
    level: 'intermediate',
    title: 'Sólidos Intermedios',
    description: 'Contar caras y vértices de diferentes sólidos',
    solidTypes: ['cube', 'sphere', 'cylinder', 'cone', 'pyramid'],
    problemTypes: ['identify_solid', 'count_faces', 'count_vertices'],
    problemsToComplete: 12,
    showLabels: true,
    showWireframe: true,
  },
  advanced: {
    level: 'advanced',
    title: 'Sólidos Avanzados',
    description: 'Todas las propiedades incluyendo aristas y prismas',
    solidTypes: ['cube', 'sphere', 'cylinder', 'cone', 'pyramid', 'rectangular_prism', 'triangular_prism'],
    problemTypes: ['identify_solid', 'count_faces', 'count_edges', 'count_vertices'],
    problemsToComplete: 15,
    showLabels: false,
    showWireframe: true,
  },
};

/**
 * Generate question text based on problem type
 */
function generateQuestion(type: SolidsProblemType, solidNameEs: string): string {
  switch (type) {
    case 'identify_solid':
      return '¿Qué sólido geométrico es este?';
    case 'count_faces':
      return `¿Cuántas caras tiene este ${solidNameEs.toLowerCase()}?`;
    case 'count_edges':
      return `¿Cuántas aristas tiene este ${solidNameEs.toLowerCase()}?`;
    case 'count_vertices':
      return `¿Cuántos vértices tiene este ${solidNameEs.toLowerCase()}?`;
    default:
      return '¿Qué sólido geométrico es este?';
  }
}

/**
 * Generate options for a problem
 */
function generateOptions(
  type: SolidsProblemType,
  correctAnswer: string | number,
  solidType: SolidType,
  availableTypes: SolidType[]
): (string | number)[] {
  switch (type) {
    case 'identify_solid': {
      const solidInfo = SOLID_TYPE_DEFINITIONS[solidType];
      const correctName = solidInfo.nameEs;

      // Get other solid type names as distractors
      const otherTypes = availableTypes.filter((t) => t !== solidType);
      const distractorNames = shuffleArray(otherTypes)
        .slice(0, 3)
        .map((t) => SOLID_TYPE_DEFINITIONS[t].nameEs);

      return shuffleArray([correctName, ...distractorNames]);
    }

    case 'count_faces': {
      const correctFaces = correctAnswer as number;
      const distractors: number[] = [];
      const possibleOffsets = [-2, -1, 1, 2, 3];

      for (const offset of shuffleArray(possibleOffsets)) {
        const distractor = correctFaces + offset;
        if (distractor >= 0 && !distractors.includes(distractor) && distractor !== correctFaces) {
          distractors.push(distractor);
          if (distractors.length >= 3) break;
        }
      }

      return shuffleArray([correctFaces, ...distractors]);
    }

    case 'count_edges': {
      const correctEdges = correctAnswer as number;
      const distractors: number[] = [];
      const possibleOffsets = [-3, -2, -1, 1, 2, 3];

      for (const offset of shuffleArray(possibleOffsets)) {
        const distractor = correctEdges + offset;
        if (distractor >= 0 && !distractors.includes(distractor) && distractor !== correctEdges) {
          distractors.push(distractor);
          if (distractors.length >= 3) break;
        }
      }

      return shuffleArray([correctEdges, ...distractors]);
    }

    case 'count_vertices': {
      const correctVertices = correctAnswer as number;
      const distractors: number[] = [];
      const possibleOffsets = [-2, -1, 1, 2, 3];

      for (const offset of shuffleArray(possibleOffsets)) {
        const distractor = correctVertices + offset;
        if (distractor >= 0 && !distractors.includes(distractor) && distractor !== correctVertices) {
          distractors.push(distractor);
          if (distractors.length >= 3) break;
        }
      }

      return shuffleArray([correctVertices, ...distractors]);
    }

    default:
      return [];
  }
}

/**
 * Generate hint based on problem type and solid
 */
function generateHint(type: SolidsProblemType, solidType: SolidType): string {
  const info = SOLID_TYPE_DEFINITIONS[solidType];

  switch (type) {
    case 'identify_solid':
      return info.description;

    case 'count_faces':
      if (solidType === 'sphere') {
        return 'Una esfera no tiene caras planas, solo una superficie curva continua.';
      } else if (solidType === 'cylinder') {
        return 'Cuenta las 2 bases circulares más la superficie lateral curva.';
      } else if (solidType === 'cone') {
        return 'Un cono tiene 1 base circular y 1 superficie lateral curva.';
      } else if (solidType === 'cube' || solidType === 'rectangular_prism') {
        return 'Piensa en una caja: tiene tapa, fondo, frente, atrás, y dos lados.';
      } else if (solidType === 'pyramid') {
        return 'Cuenta la base cuadrada más las 4 caras triangulares laterales.';
      } else {
        return 'Cuenta todas las superficies planas del sólido.';
      }

    case 'count_edges':
      if (solidType === 'sphere') {
        return 'Una esfera no tiene aristas, es completamente lisa.';
      } else if (solidType === 'cylinder') {
        return 'Cuenta los bordes circulares donde las bases se unen con la superficie lateral.';
      } else if (solidType === 'cone') {
        return 'Un cono solo tiene 1 arista: el borde circular de su base.';
      } else if (solidType === 'cube') {
        return 'Un cubo tiene 4 aristas en la parte superior, 4 en la inferior, y 4 verticales.';
      } else {
        return 'Una arista es donde se encuentran dos caras planas.';
      }

    case 'count_vertices':
      if (solidType === 'sphere' || solidType === 'cylinder') {
        return 'Los sólidos con superficies completamente curvas no tienen vértices.';
      } else if (solidType === 'cone') {
        return 'Un cono solo tiene 1 vértice: la punta o ápice.';
      } else if (solidType === 'cube' || solidType === 'rectangular_prism') {
        return 'Un vértice es donde se encuentran 3 o más aristas. Piensa en las esquinas.';
      } else {
        return 'Cuenta todas las "puntas" o "esquinas" del sólido.';
      }

    default:
      return 'Observa cuidadosamente las características del sólido.';
  }
}

/**
 * Track recently shown solid types for variety
 */
const recentSolidTypes: SolidType[] = [];
const MAX_RECENT = 2;

/**
 * Generate a 3D solids problem
 */
export function generateSolidsProblem(difficulty: SolidsGameDifficulty): SolidsProblem {
  const config = SOLIDS_DIFFICULTY_CONFIGS[difficulty];

  // Select solid type avoiding recent ones
  const availableTypes = config.solidTypes.filter((t) => !recentSolidTypes.includes(t));
  const typesToChooseFrom = availableTypes.length > 0 ? availableTypes : config.solidTypes;
  const solidType = typesToChooseFrom[randomInRange(0, typesToChooseFrom.length - 1)];

  // Track this type
  recentSolidTypes.push(solidType);
  if (recentSolidTypes.length > MAX_RECENT) {
    recentSolidTypes.shift();
  }

  // Select problem type
  const problemType = config.problemTypes[randomInRange(0, config.problemTypes.length - 1)];

  // Get solid info
  const solidInfo = SOLID_TYPE_DEFINITIONS[solidType];

  // Determine correct answer
  let correctAnswer: string | number;

  switch (problemType) {
    case 'identify_solid':
      correctAnswer = solidInfo.nameEs;
      break;
    case 'count_faces':
      correctAnswer = solidInfo.faces;
      break;
    case 'count_edges':
      correctAnswer = solidInfo.edges;
      break;
    case 'count_vertices':
      correctAnswer = solidInfo.vertices;
      break;
    default:
      correctAnswer = solidInfo.nameEs;
  }

  const options = generateOptions(problemType, correctAnswer, solidType, config.solidTypes);
  const question = generateQuestion(problemType, solidInfo.nameEs);
  const hint = generateHint(problemType, solidType);

  return {
    id: `solid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: problemType,
    solidType,
    correctAnswer,
    options,
    difficulty,
    question,
    hint,
    explanation: solidInfo.explanation,
  };
}

/**
 * Clear recent solid types history
 */
export function clearRecentSolidTypes(): void {
  recentSolidTypes.length = 0;
}

/**
 * Get solid type info for displaying explanations
 */
export function getSolidTypeInfo(solidType: SolidType): SolidTypeInfo {
  return SOLID_TYPE_DEFINITIONS[solidType];
}

/**
 * Get color for solid type
 */
export function getSolidColor(solidType: SolidType): string {
  return SOLID_TYPE_DEFINITIONS[solidType].colorHint;
}

/**
 * Isometric projection helper
 * Converts 3D coordinates to 2D isometric view
 */
export function toIsometric(x: number, y: number, z: number): { x: number; y: number } {
  // Standard isometric angles
  const angle = Math.PI / 6; // 30 degrees
  return {
    x: (x - z) * Math.cos(angle),
    y: (x + z) * Math.sin(angle) - y,
  };
}
