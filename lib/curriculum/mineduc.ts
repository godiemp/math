/**
 * MINEDUC Curriculum Data
 *
 * Objetivos de Aprendizaje (OA) organized by grade level
 * Based on Chilean Ministry of Education curriculum standards
 *
 * MVP: 1° Medio (15 OA)
 * Future: 1° Básico to 4° Medio (12 levels)
 */

// ============================================================================
// TYPES
// ============================================================================

/**
 * Grade levels in Chilean education system
 * B = Básica (1st-8th grade elementary)
 * M = Media (1st-4th year high school)
 */
export type GradeLevel =
  | '1B' | '2B' | '3B' | '4B' | '5B' | '6B' | '7B' | '8B'
  | '1M' | '2M' | '3M' | '4M';

/**
 * Subject areas (Ejes temáticos)
 */
export type Eje = 'números' | 'álgebra' | 'geometría' | 'probabilidad';

/**
 * Grade level metadata
 */
export interface GradeLevelInfo {
  code: GradeLevel;
  name: string;           // Display name: "1° Medio"
  slug: string;           // URL slug: "1-medio"
  order: number;          // Sort order (1-12)
  isAvailable: boolean;   // Has content available
}

/**
 * MINEDUC Learning Objective (Objetivo de Aprendizaje)
 */
export interface MinEducOA {
  code: string;           // 'MA1M-OA-01'
  number: number;         // 1
  grade: GradeLevel;      // '1M'
  eje: Eje;
  name: string;           // Short name
  description: string;    // Full OA description
  isBasal: boolean;       // Is a "basal" (essential) objective
  lessonIds: string[];    // Lesson IDs that cover this OA
}

// ============================================================================
// GRADE LEVELS
// ============================================================================

export const GRADE_LEVELS: GradeLevelInfo[] = [
  // Básica
  { code: '1B', name: '1° Básico', slug: '1-basico', order: 1, isAvailable: false },
  { code: '2B', name: '2° Básico', slug: '2-basico', order: 2, isAvailable: false },
  { code: '3B', name: '3° Básico', slug: '3-basico', order: 3, isAvailable: false },
  { code: '4B', name: '4° Básico', slug: '4-basico', order: 4, isAvailable: false },
  { code: '5B', name: '5° Básico', slug: '5-basico', order: 5, isAvailable: false },
  { code: '6B', name: '6° Básico', slug: '6-basico', order: 6, isAvailable: false },
  { code: '7B', name: '7° Básico', slug: '7-basico', order: 7, isAvailable: false },
  { code: '8B', name: '8° Básico', slug: '8-basico', order: 8, isAvailable: false },
  // Media
  { code: '1M', name: '1° Medio', slug: '1-medio', order: 9, isAvailable: true },  // MVP
  { code: '2M', name: '2° Medio', slug: '2-medio', order: 10, isAvailable: false },
  { code: '3M', name: '3° Medio', slug: '3-medio', order: 11, isAvailable: false },
  { code: '4M', name: '4° Medio', slug: '4-medio', order: 12, isAvailable: false },
];

// ============================================================================
// 1° MEDIO - OBJETIVOS DE APRENDIZAJE (15 OA)
// ============================================================================

const OA_1M: MinEducOA[] = [
  // NÚMEROS (2 OA)
  {
    code: 'MA1M-OA-01',
    number: 1,
    grade: '1M',
    eje: 'números',
    name: 'Operaciones con racionales',
    description: 'Calcular operaciones con números racionales en forma simbólica.',
    isBasal: true,
    lessonIds: [
      'm1-num-002-a', // Fracciones: Concepto y Comparación
      'm1-num-002-b', // Fracciones Mayores que 1
      'm1-num-002-c', // Máximo Común Divisor
      'm1-num-002-d', // Suma y Resta - Igual Denominador
      'm1-num-002-e', // Mínimo Común Múltiplo
      'm1-num-002-f', // Suma y Resta - Distinto Denominador
      'm1-num-002-g', // Multiplicación y División de Fracciones
    ],
  },
  {
    code: 'MA1M-OA-02',
    number: 2,
    grade: '1M',
    eje: 'números',
    name: 'Potencias de base racional',
    description: 'Mostrar comprensión de potencias de base racional y exponente entero mediante transferencia de propiedades, relación con crecimiento/decrecimiento de cantidades y resolución de problemas cotidianos.',
    isBasal: true,
    lessonIds: [
      'm1-num-003-a', // Potencias con Exponente Positivo
      'm1-num-003-b', // Potencias con Exponente Cero y Negativo
      'm1-num-003-c', // Propiedades de las Potencias
      'm1-num-003-d', // Notación Científica
    ],
  },

  // ÁLGEBRA Y FUNCIONES (3 OA)
  {
    code: 'MA1M-OA-03',
    number: 3,
    grade: '1M',
    eje: 'álgebra',
    name: 'Productos notables',
    description: 'Desarrollar productos notables transformando productos en sumas, aplicándolos a situaciones concretas, completando binomios y reduciéndolos en expresiones algebraicas.',
    isBasal: true,
    lessonIds: [
      'm1-alg-001-a', // Términos Semejantes
      'm1-alg-001-b', // Propiedad Distributiva
      'm1-alg-001-c', // Productos Notables
      'm1-alg-001-d', // Productos Notables: Cubos
      'm1-alg-001-e', // Factor Común
      'm1-alg-001-f', // Factorización de Trinomios
      'm1-alg-001-g', // Diferencia de Cuadrados
      'm1-alg-001-h', // Trinomios Cuadráticos Perfectos
      'm1-alg-001-i', // Factorización ax² + bx + c
      'm1-alg-001-j', // Factorización por Agrupación
    ],
  },
  {
    code: 'MA1M-OA-04',
    number: 4,
    grade: '1M',
    eje: 'álgebra',
    name: 'Sistemas de ecuaciones 2x2',
    description: 'Resolver sistemas de ecuaciones lineales (2x2) relacionados con problemas mediante representaciones gráficas y simbólicas, manualmente o con software.',
    isBasal: true,
    lessonIds: [], // Pendiente
  },
  {
    code: 'MA1M-OA-05',
    number: 5,
    grade: '1M',
    eje: 'álgebra',
    name: 'Relaciones lineales',
    description: 'Graficar relaciones lineales en dos variables de la forma f(x, y) = ax + by mediante tablas de valores, representaciones gráficas y escritura de relaciones entre variables.',
    isBasal: false,
    lessonIds: [], // Pendiente
  },

  // GEOMETRÍA (6 OA)
  {
    code: 'MA1M-OA-06',
    number: 6,
    grade: '1M',
    eje: 'geometría',
    name: 'Sectores circulares',
    description: 'Desarrollar fórmulas para área y perímetro de sectores y segmentos circulares a partir de ángulos centrales específicos.',
    isBasal: false,
    lessonIds: [
      'm1-geo-002-a', // Circunferencia y Área del Círculo (parcial)
    ],
  },
  {
    code: 'MA1M-OA-07',
    number: 7,
    grade: '1M',
    eje: 'geometría',
    name: 'Volumen del cono',
    description: 'Desarrollar fórmulas de área superficial y volumen del cono mediante redes y experimentación comparativa con cilindros.',
    isBasal: false,
    lessonIds: [], // Pendiente
  },
  {
    code: 'MA1M-OA-08',
    number: 8,
    grade: '1M',
    eje: 'geometría',
    name: 'Homotecia',
    description: 'Comprender homotecia relacionándola con perspectiva, instrumentos ópticos, midiendo segmentos y aplicando propiedades en construcciones.',
    isBasal: true,
    lessonIds: [], // Pendiente
  },
  {
    code: 'MA1M-OA-09',
    number: 9,
    grade: '1M',
    eje: 'geometría',
    name: 'Teorema de Tales',
    description: 'Desarrollar el teorema de Tales mediante propiedades de homotecia para resolver problemas.',
    isBasal: false,
    lessonIds: [], // Pendiente
  },
  {
    code: 'MA1M-OA-10',
    number: 10,
    grade: '1M',
    eje: 'geometría',
    name: 'Semejanza y proporcionalidad',
    description: 'Aplicar propiedades de semejanza y proporcionalidad a modelos a escala y otras situaciones de la vida diaria.',
    isBasal: true,
    lessonIds: [
      'm1-alg-004-a', // Proporción Directa e Inversa (relacionado)
    ],
  },
  {
    code: 'MA1M-OA-11',
    number: 11,
    grade: '1M',
    eje: 'geometría',
    name: 'Homotecia vectorial',
    description: 'Representar el concepto de homotecia de forma vectorial, relacionándolo con el producto de un vector por un escalar, de manera manual y/o con software educativo.',
    isBasal: false,
    lessonIds: [], // Pendiente
  },

  // PROBABILIDAD Y ESTADÍSTICA (4 OA)
  {
    code: 'MA1M-OA-12',
    number: 12,
    grade: '1M',
    eje: 'probabilidad',
    name: 'Tablas de doble entrada',
    description: 'Registrar distribuciones de dos características distintas, de una misma población, en una tabla de doble entrada y en una nube de puntos.',
    isBasal: true,
    lessonIds: [
      'm1-prob-001-a', // Tablas de Frecuencia y Gráficos (parcial)
      'm1-prob-001-b', // Histogramas y Datos Agrupados (parcial)
    ],
  },
  {
    code: 'MA1M-OA-13',
    number: 13,
    grade: '1M',
    eje: 'probabilidad',
    name: 'Comparar poblaciones',
    description: 'Comparar poblaciones mediante la confección de gráficos "xy" para dos atributos de muestras utilizando nubes de puntos en dos colores.',
    isBasal: false,
    lessonIds: [], // Pendiente
  },
  {
    code: 'MA1M-OA-14',
    number: 14,
    grade: '1M',
    eje: 'probabilidad',
    name: 'Reglas de probabilidad',
    description: 'Desarrollar reglas de probabilidades (aditiva y multiplicativa) de manera concreta, pictórica y simbólica.',
    isBasal: true,
    lessonIds: [
      'm1-prob-004-a', // Probabilidad de Eventos
      'm1-prob-004-b', // Reglas de Probabilidad
      'm1-prob-004-c', // Probabilidad Condicional e Independencia
    ],
  },
  {
    code: 'MA1M-OA-15',
    number: 15,
    grade: '1M',
    eje: 'probabilidad',
    name: 'Comprender el azar',
    description: 'Comprender azar experimentando con la tabla de Galton, analizando frecuencias relativas y resolviendo problemas cotidianos.',
    isBasal: false,
    lessonIds: [], // Pendiente
  },
];

// ============================================================================
// OA BY GRADE (expandable for future grades)
// ============================================================================

export const MINEDUC_OA: Partial<Record<GradeLevel, MinEducOA[]>> = {
  '1M': OA_1M,
  // Future: Add OA for other grades
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get grade level info by slug
 */
export function getGradeBySlug(slug: string): GradeLevelInfo | undefined {
  return GRADE_LEVELS.find(g => g.slug === slug);
}

/**
 * Get grade level info by code
 */
export function getGradeByCode(code: GradeLevel): GradeLevelInfo | undefined {
  return GRADE_LEVELS.find(g => g.code === code);
}

/**
 * Get OA list for a grade level
 */
export function getOAByGrade(grade: GradeLevel): MinEducOA[] {
  return MINEDUC_OA[grade] || [];
}

/**
 * Get OA grouped by eje for a grade
 */
export function getOAByGradeGroupedByEje(grade: GradeLevel): Record<Eje, MinEducOA[]> {
  const oaList = getOAByGrade(grade);
  return {
    'números': oaList.filter(oa => oa.eje === 'números'),
    'álgebra': oaList.filter(oa => oa.eje === 'álgebra'),
    'geometría': oaList.filter(oa => oa.eje === 'geometría'),
    'probabilidad': oaList.filter(oa => oa.eje === 'probabilidad'),
  };
}

/**
 * Get single OA by code
 */
export function getOAByCode(code: string): MinEducOA | undefined {
  for (const grade of Object.keys(MINEDUC_OA) as GradeLevel[]) {
    const oa = MINEDUC_OA[grade]?.find(o => o.code === code);
    if (oa) return oa;
  }
  return undefined;
}

/**
 * Get count of available lessons for a grade
 */
export function getLessonCountByGrade(grade: GradeLevel): number {
  const oaList = getOAByGrade(grade);
  const uniqueLessons = new Set<string>();
  oaList.forEach(oa => oa.lessonIds.forEach(id => uniqueLessons.add(id)));
  return uniqueLessons.size;
}

/**
 * Get count of OA with at least one lesson
 */
export function getCoveredOACount(grade: GradeLevel): number {
  return getOAByGrade(grade).filter(oa => oa.lessonIds.length > 0).length;
}

/**
 * Eje labels for display
 */
export const EJE_LABELS: Record<Eje, string> = {
  'números': 'Números',
  'álgebra': 'Álgebra y Funciones',
  'geometría': 'Geometría',
  'probabilidad': 'Probabilidad y Estadística',
};

/**
 * Eje order for sorting
 */
export const EJE_ORDER: Eje[] = ['números', 'álgebra', 'geometría', 'probabilidad'];
