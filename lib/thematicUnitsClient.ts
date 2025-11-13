/**
 * Client-side thematic units utility
 * Simple lookup for unit names (for tooltips, etc.)
 */

export interface ThematicUnitInfo {
  code: string;
  name: string;
}

// Simplified thematic units map for client-side use
export const THEMATIC_UNITS_MAP: Record<string, string> = {
  // M1 - NÚMEROS
  'M1-NUM-001': 'Operaciones y orden en el conjunto de los números enteros',
  'M1-NUM-002': 'Operaciones y comparación entre números racionales',
  'M1-NUM-003': 'Problemas con números enteros y racionales',
  'M1-NUM-004': 'Concepto y cálculo de porcentaje',
  'M1-NUM-005': 'Problemas que involucren porcentajes',
  'M1-NUM-006': 'Propiedades de potencias',
  'M1-NUM-007': 'Descomposición y propiedades de raíces enésimas',
  'M1-NUM-008': 'Problemas con potencias y raíces enésimas',

  // M1 - ÁLGEBRA
  'M1-ALG-001': 'Productos notables, factorizaciones y desarrollo',
  'M1-ALG-002': 'Operatoria con expresiones algebraicas',
  'M1-ALG-003': 'Problemas algebraicos en distintos contextos',
  'M1-ALG-004': 'Proporción directa e inversa y sus representaciones',
  'M1-ALG-005': 'Problemas con proporcionalidad directa e inversa',
  'M1-ALG-006': 'Resolución de ecuaciones e inecuaciones lineales',
  'M1-ALG-007': 'Problemas con ecuaciones e inecuaciones',
  'M1-ALG-008': 'Resolución y aplicación de sistemas de ecuaciones lineales (2x2)',
  'M1-ALG-009': 'Función lineal y afín: concepto, tablas y gráficos',
  'M1-ALG-010': 'Aplicaciones de función lineal y afín',
  'M1-ALG-011': 'Resolución de ecuaciones de segundo grado',
  'M1-ALG-012': 'Función cuadrática: tablas y gráficos',
  'M1-ALG-013': 'Función cuadrática: vértice, ceros e intersecciones',
  'M1-ALG-014': 'Aplicaciones de función cuadrática',

  // M1 - GEOMETRÍA
  'M1-GEO-001': 'Teorema de Pitágoras',
  'M1-GEO-002': 'Perímetros y áreas de figuras planas',
  'M1-GEO-003': 'Área y volumen de prismas rectos y cilindros',
  'M1-GEO-004': 'Puntos y vectores en el plano',
  'M1-GEO-005': 'Rotación, traslación y reflexión',

  // M1 - PROBABILIDAD Y ESTADÍSTICA
  'M1-PROB-001': 'Tablas de frecuencia y gráficos estadísticos',
  'M1-PROB-002': 'Media, mediana, moda y rango',
  'M1-PROB-003': 'Cuartiles, percentiles y diagramas de caja',
  'M1-PROB-004': 'Probabilidad de eventos',
  'M1-PROB-005': 'Reglas aditiva y multiplicativa de probabilidad',

  // M2 - NÚMEROS
  'M2-NUM-001': 'Operaciones en el conjunto de los números reales',
  'M2-NUM-002': 'Problemas con números reales',
  'M2-NUM-003': 'Problemas aplicados a finanzas',
  'M2-NUM-004': 'Relación entre potencias, raíces y logaritmos',
  'M2-NUM-005': 'Propiedades de los logaritmos',
  'M2-NUM-006': 'Problemas con logaritmos',

  // M2 - ÁLGEBRA
  'M2-ALG-001': 'Análisis de sistemas de ecuaciones',
  'M2-ALG-002': 'Función potencia: representación gráfica',
  'M2-ALG-003': 'Problemas con función potencia',

  // M2 - GEOMETRÍA
  'M2-GEO-001': 'Problemas con homotecia',
  'M2-GEO-002': 'Seno, coseno y tangente',
  'M2-GEO-003': 'Aplicaciones de razones trigonométricas',

  // M2 - PROBABILIDAD Y ESTADÍSTICA
  'M2-PROB-001': 'Cálculo y comparación de medidas de dispersión',
  'M2-PROB-002': 'Probabilidad condicional',
  'M2-PROB-003': 'Problemas de conteo (permutación y combinatoria)',
  'M2-PROB-004': 'Modelo binomial y otros modelos probabilísticos',
};

/**
 * Get thematic unit name by code
 */
export function getUnitByCode(code: string): ThematicUnitInfo | undefined {
  const name = THEMATIC_UNITS_MAP[code];
  if (!name) return undefined;

  return {
    code,
    name
  };
}

/**
 * Get multiple units by codes
 */
export function getUnitsByCodes(codes: string[]): ThematicUnitInfo[] {
  return codes
    .map(code => getUnitByCode(code))
    .filter((unit): unit is ThematicUnitInfo => unit !== undefined);
}
