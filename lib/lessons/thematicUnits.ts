/**
 * Frontend-safe thematic units data for mini-lessons navigation
 * Based on backend/src/config/thematic-units.ts
 */

export type Level = 'M1' | 'M2';
export type Subject = 'números' | 'álgebra' | 'geometría' | 'probabilidad';

export interface ThematicUnitSummary {
  code: string;
  name: string;
  level: Level;
  subject: Subject;
}

export const SUBJECT_LABELS: Record<Subject, string> = {
  'números': 'Números',
  'álgebra': 'Álgebra y Funciones',
  'geometría': 'Geometría',
  'probabilidad': 'Probabilidades y Estadística',
};

export const SUBJECTS: Subject[] = ['números', 'álgebra', 'geometría', 'probabilidad'];

/**
 * All thematic units from PAES M1 and M2 curriculum
 */
export const THEMATIC_UNITS: ThematicUnitSummary[] = [
  // ========================================
  // M1 - NÚMEROS (8 units)
  // ========================================
  { code: 'M1-NUM-001', name: 'Operaciones y orden en el conjunto de los números enteros', level: 'M1', subject: 'números' },
  { code: 'M1-NUM-002', name: 'Operaciones y comparación entre números racionales', level: 'M1', subject: 'números' },
  { code: 'M1-NUM-003', name: 'Problemas con números enteros y racionales en distintos contextos', level: 'M1', subject: 'números' },
  { code: 'M1-NUM-004', name: 'Concepto y cálculo de porcentaje', level: 'M1', subject: 'números' },
  { code: 'M1-NUM-005', name: 'Problemas que involucren porcentajes en diversos contextos', level: 'M1', subject: 'números' },
  { code: 'M1-NUM-006', name: 'Propiedades de potencias de base y exponente racional', level: 'M1', subject: 'números' },
  { code: 'M1-NUM-007', name: 'Descomposición y propiedades de raíces enésimas', level: 'M1', subject: 'números' },
  { code: 'M1-NUM-008', name: 'Problemas con potencias y raíces enésimas en números reales', level: 'M1', subject: 'números' },

  // ========================================
  // M1 - ÁLGEBRA Y FUNCIONES (14 units)
  // ========================================
  { code: 'M1-ALG-001', name: 'Productos notables, factorizaciones y desarrollo', level: 'M1', subject: 'álgebra' },
  { code: 'M1-ALG-002', name: 'Operatoria con expresiones algebraicas', level: 'M1', subject: 'álgebra' },
  { code: 'M1-ALG-003', name: 'Problemas algebraicos en distintos contextos', level: 'M1', subject: 'álgebra' },
  { code: 'M1-ALG-004', name: 'Proporción directa e inversa y sus representaciones', level: 'M1', subject: 'álgebra' },
  { code: 'M1-ALG-005', name: 'Problemas con proporcionalidad directa e inversa', level: 'M1', subject: 'álgebra' },
  { code: 'M1-ALG-006', name: 'Resolución de ecuaciones e inecuaciones lineales', level: 'M1', subject: 'álgebra' },
  { code: 'M1-ALG-007', name: 'Problemas con ecuaciones e inecuaciones en distintos contextos', level: 'M1', subject: 'álgebra' },
  { code: 'M1-ALG-008', name: 'Resolución y aplicación de sistemas de ecuaciones lineales (2x2)', level: 'M1', subject: 'álgebra' },
  { code: 'M1-ALG-009', name: 'Función lineal y afín: concepto, tablas y gráficos', level: 'M1', subject: 'álgebra' },
  { code: 'M1-ALG-010', name: 'Aplicaciones de función lineal y afín en problemas reales', level: 'M1', subject: 'álgebra' },
  { code: 'M1-ALG-011', name: 'Resolución de ecuaciones de segundo grado', level: 'M1', subject: 'álgebra' },
  { code: 'M1-ALG-012', name: 'Función cuadrática: tablas y gráficos según parámetros', level: 'M1', subject: 'álgebra' },
  { code: 'M1-ALG-013', name: 'Función cuadrática: vértice, ceros e intersecciones', level: 'M1', subject: 'álgebra' },
  { code: 'M1-ALG-014', name: 'Aplicaciones de función cuadrática en distintos contextos', level: 'M1', subject: 'álgebra' },

  // ========================================
  // M1 - GEOMETRÍA (5 units)
  // ========================================
  { code: 'M1-GEO-001', name: 'Teorema de Pitágoras', level: 'M1', subject: 'geometría' },
  { code: 'M1-GEO-002', name: 'Perímetros y áreas de triángulos, paralelogramos, trapecios y círculos', level: 'M1', subject: 'geometría' },
  { code: 'M1-GEO-003', name: 'Área y volumen de prismas rectos y cilindros', level: 'M1', subject: 'geometría' },
  { code: 'M1-GEO-004', name: 'Puntos y vectores en el plano', level: 'M1', subject: 'geometría' },
  { code: 'M1-GEO-005', name: 'Rotación, traslación y reflexión de figuras geométricas', level: 'M1', subject: 'geometría' },

  // ========================================
  // M1 - PROBABILIDAD Y ESTADÍSTICA (5 units)
  // ========================================
  { code: 'M1-PROB-001', name: 'Tablas de frecuencia y gráficos estadísticos', level: 'M1', subject: 'probabilidad' },
  { code: 'M1-PROB-002', name: 'Media, mediana, moda y rango de uno o más grupos de datos', level: 'M1', subject: 'probabilidad' },
  { code: 'M1-PROB-003', name: 'Cuartiles, percentiles y diagramas de caja', level: 'M1', subject: 'probabilidad' },
  { code: 'M1-PROB-004', name: 'Probabilidad de eventos', level: 'M1', subject: 'probabilidad' },
  { code: 'M1-PROB-005', name: 'Reglas aditiva y multiplicativa de probabilidad', level: 'M1', subject: 'probabilidad' },

  // ========================================
  // M2 - NÚMEROS (6 units)
  // ========================================
  { code: 'M2-NUM-001', name: 'Operaciones en el conjunto de los números reales', level: 'M2', subject: 'números' },
  { code: 'M2-NUM-002', name: 'Problemas que involucren números reales en diversos contextos', level: 'M2', subject: 'números' },
  { code: 'M2-NUM-003', name: 'Problemas aplicados a finanzas: AFP, jubilación, créditos', level: 'M2', subject: 'números' },
  { code: 'M2-NUM-004', name: 'Relación entre potencias, raíces y logaritmos', level: 'M2', subject: 'números' },
  { code: 'M2-NUM-005', name: 'Propiedades de los logaritmos', level: 'M2', subject: 'números' },
  { code: 'M2-NUM-006', name: 'Problemas con logaritmos en distintos contextos', level: 'M2', subject: 'números' },

  // ========================================
  // M2 - ÁLGEBRA Y FUNCIONES (3 units)
  // ========================================
  { code: 'M2-ALG-001', name: 'Análisis de sistemas con única solución, infinitas soluciones o sin solución', level: 'M2', subject: 'álgebra' },
  { code: 'M2-ALG-002', name: 'Función potencia: representación gráfica', level: 'M2', subject: 'álgebra' },
  { code: 'M2-ALG-003', name: 'Problemas que involucren la función potencia en distintos contextos', level: 'M2', subject: 'álgebra' },

  // ========================================
  // M2 - GEOMETRÍA (3 units)
  // ========================================
  { code: 'M2-GEO-001', name: 'Problemas con homotecia en diversos contextos', level: 'M2', subject: 'geometría' },
  { code: 'M2-GEO-002', name: 'Seno, coseno y tangente en triángulos rectángulos', level: 'M2', subject: 'geometría' },
  { code: 'M2-GEO-003', name: 'Aplicaciones de razones trigonométricas en problemas cotidianos', level: 'M2', subject: 'geometría' },

  // ========================================
  // M2 - PROBABILIDAD Y ESTADÍSTICA (4 units)
  // ========================================
  { code: 'M2-PROB-001', name: 'Cálculo y comparación de medidas de dispersión', level: 'M2', subject: 'probabilidad' },
  { code: 'M2-PROB-002', name: 'Aplicaciones y propiedades de la probabilidad condicional', level: 'M2', subject: 'probabilidad' },
  { code: 'M2-PROB-003', name: 'Conceptos y resolución de problemas de conteo (permutación y combinatoria)', level: 'M2', subject: 'probabilidad' },
  { code: 'M2-PROB-004', name: 'Problemas que involucren el modelo binomial y otros modelos probabilísticos', level: 'M2', subject: 'probabilidad' },
];

/**
 * Get units filtered by level and subject
 */
export function getUnitsByLevelAndSubject(level: Level, subject: Subject): ThematicUnitSummary[] {
  return THEMATIC_UNITS.filter(u => u.level === level && u.subject === subject);
}

/**
 * Get units by level only
 */
export function getUnitsByLevel(level: Level): ThematicUnitSummary[] {
  return THEMATIC_UNITS.filter(u => u.level === level);
}

/**
 * Get count of units for a level and subject
 */
export function getUnitCount(level: Level, subject: Subject): number {
  return getUnitsByLevelAndSubject(level, subject).length;
}

/**
 * Convert subject slug to Subject type
 */
export function subjectFromSlug(slug: string): Subject | null {
  const mapping: Record<string, Subject> = {
    'numeros': 'números',
    'algebra': 'álgebra',
    'geometria': 'geometría',
    'probabilidad': 'probabilidad',
  };
  return mapping[slug] || null;
}

/**
 * Convert Subject type to URL slug
 */
export function subjectToSlug(subject: Subject): string {
  const mapping: Record<Subject, string> = {
    'números': 'numeros',
    'álgebra': 'algebra',
    'geometría': 'geometria',
    'probabilidad': 'probabilidad',
  };
  return mapping[subject];
}
