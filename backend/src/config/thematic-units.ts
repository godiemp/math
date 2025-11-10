/**
 * Complete PAES M1 and M2 thematic units taxonomy
 * Based on official PAES Competencia Matemática 1 and 2 curriculum
 */

import { Level, Subject, CognitiveLevel, DifficultyLevel } from '../types/abstractProblems';

export interface ThematicUnit {
  code: string;
  name: string;
  level: Level;
  subject: Subject;
  description?: string;
}

export interface SkillDefinition {
  code: string;
  name: string;
  unit_code: string;
  cognitive_levels: CognitiveLevel[];
  difficulties: DifficultyLevel[];
}

/**
 * All thematic units from PAES M1 and M2
 */
export const THEMATIC_UNITS: ThematicUnit[] = [
  // ========================================
  // M1 - NÚMEROS
  // ========================================
  {
    code: 'M1-NUM-001',
    name: 'Operaciones y orden en el conjunto de los números enteros',
    level: 'M1',
    subject: 'números',
  },
  {
    code: 'M1-NUM-002',
    name: 'Operaciones y comparación entre números racionales',
    level: 'M1',
    subject: 'números',
  },
  {
    code: 'M1-NUM-003',
    name: 'Problemas con números enteros y racionales en distintos contextos',
    level: 'M1',
    subject: 'números',
  },
  {
    code: 'M1-NUM-004',
    name: 'Concepto y cálculo de porcentaje',
    level: 'M1',
    subject: 'números',
  },
  {
    code: 'M1-NUM-005',
    name: 'Problemas que involucren porcentajes en diversos contextos',
    level: 'M1',
    subject: 'números',
  },
  {
    code: 'M1-NUM-006',
    name: 'Propiedades de potencias de base y exponente racional',
    level: 'M1',
    subject: 'números',
  },
  {
    code: 'M1-NUM-007',
    name: 'Descomposición y propiedades de raíces enésimas',
    level: 'M1',
    subject: 'números',
  },
  {
    code: 'M1-NUM-008',
    name: 'Problemas con potencias y raíces enésimas en números reales',
    level: 'M1',
    subject: 'números',
  },

  // ========================================
  // M1 - ÁLGEBRA Y FUNCIONES
  // ========================================
  {
    code: 'M1-ALG-001',
    name: 'Productos notables, factorizaciones y desarrollo',
    level: 'M1',
    subject: 'álgebra',
  },
  {
    code: 'M1-ALG-002',
    name: 'Operatoria con expresiones algebraicas',
    level: 'M1',
    subject: 'álgebra',
  },
  {
    code: 'M1-ALG-003',
    name: 'Problemas algebraicos en distintos contextos',
    level: 'M1',
    subject: 'álgebra',
  },
  {
    code: 'M1-ALG-004',
    name: 'Proporción directa e inversa y sus representaciones',
    level: 'M1',
    subject: 'álgebra',
  },
  {
    code: 'M1-ALG-005',
    name: 'Problemas con proporcionalidad directa e inversa',
    level: 'M1',
    subject: 'álgebra',
  },
  {
    code: 'M1-ALG-006',
    name: 'Resolución de ecuaciones e inecuaciones lineales',
    level: 'M1',
    subject: 'álgebra',
  },
  {
    code: 'M1-ALG-007',
    name: 'Problemas con ecuaciones e inecuaciones en distintos contextos',
    level: 'M1',
    subject: 'álgebra',
  },
  {
    code: 'M1-ALG-008',
    name: 'Resolución y aplicación de sistemas de ecuaciones lineales (2x2)',
    level: 'M1',
    subject: 'álgebra',
  },
  {
    code: 'M1-ALG-009',
    name: 'Función lineal y afín: concepto, tablas y gráficos',
    level: 'M1',
    subject: 'álgebra',
  },
  {
    code: 'M1-ALG-010',
    name: 'Aplicaciones de función lineal y afín en problemas reales',
    level: 'M1',
    subject: 'álgebra',
  },
  {
    code: 'M1-ALG-011',
    name: 'Resolución de ecuaciones de segundo grado',
    level: 'M1',
    subject: 'álgebra',
  },
  {
    code: 'M1-ALG-012',
    name: 'Función cuadrática: tablas y gráficos según parámetros',
    level: 'M1',
    subject: 'álgebra',
  },
  {
    code: 'M1-ALG-013',
    name: 'Función cuadrática: vértice, ceros e intersecciones',
    level: 'M1',
    subject: 'álgebra',
  },
  {
    code: 'M1-ALG-014',
    name: 'Aplicaciones de función cuadrática en distintos contextos',
    level: 'M1',
    subject: 'álgebra',
  },

  // ========================================
  // M1 - GEOMETRÍA
  // ========================================
  {
    code: 'M1-GEO-001',
    name: 'Teorema de Pitágoras',
    level: 'M1',
    subject: 'geometría',
  },
  {
    code: 'M1-GEO-002',
    name: 'Perímetros y áreas de triángulos, paralelogramos, trapecios y círculos',
    level: 'M1',
    subject: 'geometría',
  },
  {
    code: 'M1-GEO-003',
    name: 'Área y volumen de prismas rectos y cilindros',
    level: 'M1',
    subject: 'geometría',
  },
  {
    code: 'M1-GEO-004',
    name: 'Puntos y vectores en el plano',
    level: 'M1',
    subject: 'geometría',
  },
  {
    code: 'M1-GEO-005',
    name: 'Rotación, traslación y reflexión de figuras geométricas',
    level: 'M1',
    subject: 'geometría',
  },

  // ========================================
  // M1 - PROBABILIDAD Y ESTADÍSTICA
  // ========================================
  {
    code: 'M1-PROB-001',
    name: 'Tablas de frecuencia y gráficos estadísticos',
    level: 'M1',
    subject: 'probabilidad',
  },
  {
    code: 'M1-PROB-002',
    name: 'Media, mediana, moda y rango de uno o más grupos de datos',
    level: 'M1',
    subject: 'probabilidad',
  },
  {
    code: 'M1-PROB-003',
    name: 'Cuartiles, percentiles y diagramas de caja',
    level: 'M1',
    subject: 'probabilidad',
  },
  {
    code: 'M1-PROB-004',
    name: 'Probabilidad de eventos',
    level: 'M1',
    subject: 'probabilidad',
  },
  {
    code: 'M1-PROB-005',
    name: 'Reglas aditiva y multiplicativa de probabilidad',
    level: 'M1',
    subject: 'probabilidad',
  },

  // ========================================
  // M2 - NÚMEROS (additional to M1)
  // ========================================
  {
    code: 'M2-NUM-001',
    name: 'Operaciones en el conjunto de los números reales',
    level: 'M2',
    subject: 'números',
  },
  {
    code: 'M2-NUM-002',
    name: 'Problemas que involucren números reales en diversos contextos',
    level: 'M2',
    subject: 'números',
  },
  {
    code: 'M2-NUM-003',
    name: 'Problemas aplicados a finanzas: AFP, jubilación, créditos',
    level: 'M2',
    subject: 'números',
  },
  {
    code: 'M2-NUM-004',
    name: 'Relación entre potencias, raíces y logaritmos',
    level: 'M2',
    subject: 'números',
  },
  {
    code: 'M2-NUM-005',
    name: 'Propiedades de los logaritmos',
    level: 'M2',
    subject: 'números',
  },
  {
    code: 'M2-NUM-006',
    name: 'Problemas con logaritmos en distintos contextos',
    level: 'M2',
    subject: 'números',
  },

  // ========================================
  // M2 - ÁLGEBRA Y FUNCIONES (additional to M1)
  // ========================================
  {
    code: 'M2-ALG-001',
    name: 'Análisis de sistemas con única solución, infinitas soluciones o sin solución',
    level: 'M2',
    subject: 'álgebra',
  },
  {
    code: 'M2-ALG-002',
    name: 'Función potencia: representación gráfica',
    level: 'M2',
    subject: 'álgebra',
  },
  {
    code: 'M2-ALG-003',
    name: 'Problemas que involucren la función potencia en distintos contextos',
    level: 'M2',
    subject: 'álgebra',
  },

  // ========================================
  // M2 - GEOMETRÍA (additional to M1)
  // ========================================
  {
    code: 'M2-GEO-001',
    name: 'Problemas con homotecia en diversos contextos',
    level: 'M2',
    subject: 'geometría',
  },
  {
    code: 'M2-GEO-002',
    name: 'Seno, coseno y tangente en triángulos rectángulos',
    level: 'M2',
    subject: 'geometría',
  },
  {
    code: 'M2-GEO-003',
    name: 'Aplicaciones de razones trigonométricas en problemas cotidianos',
    level: 'M2',
    subject: 'geometría',
  },

  // ========================================
  // M2 - PROBABILIDAD Y ESTADÍSTICA (additional to M1)
  // ========================================
  {
    code: 'M2-PROB-001',
    name: 'Cálculo y comparación de medidas de dispersión',
    level: 'M2',
    subject: 'probabilidad',
  },
  {
    code: 'M2-PROB-002',
    name: 'Aplicaciones y propiedades de la probabilidad condicional',
    level: 'M2',
    subject: 'probabilidad',
  },
  {
    code: 'M2-PROB-003',
    name: 'Conceptos y resolución de problemas de conteo (permutación y combinatoria)',
    level: 'M2',
    subject: 'probabilidad',
  },
  {
    code: 'M2-PROB-004',
    name: 'Problemas que involucren el modelo binomial y otros modelos probabilísticos',
    level: 'M2',
    subject: 'probabilidad',
  },
];

/**
 * Get units by level and subject
 */
export function getUnitsByLevelAndSubject(level: Level, subject: Subject): ThematicUnit[] {
  return THEMATIC_UNITS.filter(u => u.level === level && u.subject === subject);
}

/**
 * Get all units for a specific level
 */
export function getUnitsByLevel(level: Level): ThematicUnit[] {
  return THEMATIC_UNITS.filter(u => u.level === level);
}

/**
 * Get unit by code
 */
export function getUnitByCode(code: string): ThematicUnit | undefined {
  return THEMATIC_UNITS.find(u => u.code === code);
}

/**
 * Get summary statistics
 */
export function getUnitStats() {
  const m1Units = THEMATIC_UNITS.filter(u => u.level === 'M1');
  const m2Units = THEMATIC_UNITS.filter(u => u.level === 'M2');

  const bySubject = {
    números: THEMATIC_UNITS.filter(u => u.subject === 'números'),
    álgebra: THEMATIC_UNITS.filter(u => u.subject === 'álgebra'),
    geometría: THEMATIC_UNITS.filter(u => u.subject === 'geometría'),
    probabilidad: THEMATIC_UNITS.filter(u => u.subject === 'probabilidad'),
  };

  return {
    total: THEMATIC_UNITS.length,
    m1: m1Units.length,
    m2: m2Units.length,
    bySubject: {
      números: bySubject.números.length,
      álgebra: bySubject.álgebra.length,
      geometría: bySubject.geometría.length,
      probabilidad: bySubject.probabilidad.length,
    },
  };
}
