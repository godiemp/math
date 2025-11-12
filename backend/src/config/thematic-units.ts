/**
 * Complete PAES M1 and M2 thematic units taxonomy
 * Based on official PAES Competencia Matemática 1 and 2 curriculum
 */

import { Level, Subject, CognitiveLevel, DifficultyLevel } from '../types/abstractProblems';

export interface UnitSubsection {
  code: string; // e.g., "A", "B", "C"
  name: string; // e.g., "Orden y valor absoluto"
  description?: string;
  primary_skills: string[];
}

export interface ThematicUnit {
  code: string;
  name: string;
  level: Level;
  subject: Subject;
  description?: string;
  subsections?: UnitSubsection[];
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
    subsections: [
      {
        code: 'A',
        name: 'Orden y valor absoluto',
        primary_skills: ['numeros-enteros-orden', 'numeros-enteros-valor-absoluto'],
      },
      {
        code: 'B',
        name: 'Suma y resta',
        primary_skills: ['numeros-enteros-sumar-restar'],
      },
      {
        code: 'C',
        name: 'Multiplicación y división',
        primary_skills: ['numeros-enteros-multiplicar-dividir'],
      },
      {
        code: 'D',
        name: 'Propiedades y jerarquía de operaciones',
        primary_skills: ['numeros-enteros-multiplicar-dividir', 'numeros-enteros-sumar-restar'],
      },
      {
        code: 'E',
        name: 'Problemas combinados y de razonamiento',
        primary_skills: ['numeros-enteros-orden', 'numeros-enteros-valor-absoluto', 'numeros-enteros-multiplicar-dividir'],
      },
      {
        code: 'F',
        name: 'Comparaciones encadenadas y desigualdades',
        primary_skills: ['numeros-enteros-orden', 'numeros-enteros-valor-absoluto'],
      },
    ],
  },
  {
    code: 'M1-NUM-002',
    name: 'Operaciones y comparación entre números racionales',
    level: 'M1',
    subject: 'números',
    subsections: [
      {
        code: 'A',
        name: 'Representación y conversión entre fracciones y decimales',
        primary_skills: ['numeros-racionales-representacion', 'numeros-racionales-conversion'],
      },
      {
        code: 'B',
        name: 'Suma y resta de números racionales',
        primary_skills: ['numeros-racionales-sumar-restar'],
      },
      {
        code: 'C',
        name: 'Multiplicación y división de números racionales',
        primary_skills: ['numeros-racionales-multiplicar-dividir'],
      },
      {
        code: 'D',
        name: 'Comparación y orden de números racionales',
        primary_skills: ['numeros-racionales-orden', 'numeros-racionales-comparacion'],
      },
      {
        code: 'E',
        name: 'Operaciones combinadas',
        primary_skills: ['numeros-racionales-operaciones-combinadas'],
      },
    ],
  },
  {
    code: 'M1-NUM-003',
    name: 'Problemas con números enteros y racionales en distintos contextos',
    level: 'M1',
    subject: 'números',
    subsections: [
      {
        code: 'A',
        name: 'Problemas de la vida cotidiana',
        primary_skills: ['numeros-problemas-vida-cotidiana'],
      },
      {
        code: 'B',
        name: 'Problemas financieros básicos',
        primary_skills: ['numeros-problemas-financieros'],
      },
      {
        code: 'C',
        name: 'Problemas de medición y proporciones',
        primary_skills: ['numeros-problemas-medicion'],
      },
      {
        code: 'D',
        name: 'Problemas de razonamiento lógico',
        primary_skills: ['numeros-problemas-razonamiento'],
      },
    ],
  },
  {
    code: 'M1-NUM-004',
    name: 'Concepto y cálculo de porcentaje',
    level: 'M1',
    subject: 'números',
    subsections: [
      {
        code: 'A',
        name: 'Concepto de porcentaje y representación',
        primary_skills: ['porcentaje-concepto', 'porcentaje-representacion'],
      },
      {
        code: 'B',
        name: 'Cálculo de porcentajes',
        primary_skills: ['porcentaje-calculo'],
      },
      {
        code: 'C',
        name: 'Porcentaje de una cantidad',
        primary_skills: ['porcentaje-cantidad'],
      },
      {
        code: 'D',
        name: 'Aumentos y descuentos porcentuales',
        primary_skills: ['porcentaje-aumentos-descuentos'],
      },
    ],
  },
  {
    code: 'M1-NUM-005',
    name: 'Problemas que involucren porcentajes en diversos contextos',
    level: 'M1',
    subject: 'números',
    subsections: [
      {
        code: 'A',
        name: 'Problemas comerciales y descuentos',
        primary_skills: ['porcentaje-problemas-comerciales'],
      },
      {
        code: 'B',
        name: 'Problemas de interés simple',
        primary_skills: ['porcentaje-interes-simple'],
      },
      {
        code: 'C',
        name: 'Problemas de impuestos y propinas',
        primary_skills: ['porcentaje-impuestos'],
      },
      {
        code: 'D',
        name: 'Problemas de variación porcentual',
        primary_skills: ['porcentaje-variacion'],
      },
    ],
  },
  {
    code: 'M1-NUM-006',
    name: 'Propiedades de potencias de base y exponente racional',
    level: 'M1',
    subject: 'números',
    subsections: [
      {
        code: 'A',
        name: 'Concepto de potencia con exponente racional',
        primary_skills: ['potencias-concepto'],
      },
      {
        code: 'B',
        name: 'Propiedades de multiplicación y división de potencias',
        primary_skills: ['potencias-multiplicacion-division'],
      },
      {
        code: 'C',
        name: 'Potencia de una potencia',
        primary_skills: ['potencias-potencia-de-potencia'],
      },
      {
        code: 'D',
        name: 'Potencias con exponentes negativos',
        primary_skills: ['potencias-exponentes-negativos'],
      },
      {
        code: 'E',
        name: 'Simplificación de expresiones con potencias',
        primary_skills: ['potencias-simplificacion'],
      },
    ],
  },
  {
    code: 'M1-NUM-007',
    name: 'Descomposición y propiedades de raíces enésimas',
    level: 'M1',
    subject: 'números',
    subsections: [
      {
        code: 'A',
        name: 'Concepto de raíz enésima',
        primary_skills: ['raices-concepto'],
      },
      {
        code: 'B',
        name: 'Simplificación de raíces',
        primary_skills: ['raices-simplificacion'],
      },
      {
        code: 'C',
        name: 'Propiedades de multiplicación y división de raíces',
        primary_skills: ['raices-multiplicacion-division'],
      },
      {
        code: 'D',
        name: 'Racionalización de denominadores',
        primary_skills: ['raices-racionalizacion'],
      },
      {
        code: 'E',
        name: 'Operaciones combinadas con raíces',
        primary_skills: ['raices-operaciones-combinadas'],
      },
    ],
  },
  {
    code: 'M1-NUM-008',
    name: 'Problemas con potencias y raíces enésimas en números reales',
    level: 'M1',
    subject: 'números',
    subsections: [
      {
        code: 'A',
        name: 'Problemas de crecimiento exponencial',
        primary_skills: ['potencias-raices-problemas-crecimiento'],
      },
      {
        code: 'B',
        name: 'Problemas geométricos con radicales',
        primary_skills: ['potencias-raices-problemas-geometricos'],
      },
      {
        code: 'C',
        name: 'Problemas de simplificación y cálculo',
        primary_skills: ['potencias-raices-problemas-calculo'],
      },
      {
        code: 'D',
        name: 'Problemas de aplicación en contextos reales',
        primary_skills: ['potencias-raices-problemas-contextos'],
      },
    ],
  },

  // ========================================
  // M1 - ÁLGEBRA Y FUNCIONES
  // ========================================
  {
    code: 'M1-ALG-001',
    name: 'Productos notables, factorizaciones y desarrollo',
    level: 'M1',
    subject: 'álgebra',
    subsections: [
      {
        code: 'A',
        name: 'Cuadrado de binomio',
        primary_skills: ['algebra-cuadrado-binomio'],
      },
      {
        code: 'B',
        name: 'Suma por diferencia',
        primary_skills: ['algebra-suma-por-diferencia'],
      },
      {
        code: 'C',
        name: 'Cubo de binomio',
        primary_skills: ['algebra-cubo-binomio'],
      },
      {
        code: 'D',
        name: 'Factorización por factor común',
        primary_skills: ['algebra-factorizacion-factor-comun'],
      },
      {
        code: 'E',
        name: 'Factorización de trinomios',
        primary_skills: ['algebra-factorizacion-trinomios'],
      },
    ],
  },
  {
    code: 'M1-ALG-002',
    name: 'Operatoria con expresiones algebraicas',
    level: 'M1',
    subject: 'álgebra',
    subsections: [
      {
        code: 'A',
        name: 'Reducción de términos semejantes',
        primary_skills: ['algebra-terminos-semejantes'],
      },
      {
        code: 'B',
        name: 'Suma y resta de expresiones algebraicas',
        primary_skills: ['algebra-expresiones-suma-resta'],
      },
      {
        code: 'C',
        name: 'Multiplicación de expresiones algebraicas',
        primary_skills: ['algebra-expresiones-multiplicacion'],
      },
      {
        code: 'D',
        name: 'División de expresiones algebraicas',
        primary_skills: ['algebra-expresiones-division'],
      },
    ],
  },
  {
    code: 'M1-ALG-003',
    name: 'Problemas algebraicos en distintos contextos',
    level: 'M1',
    subject: 'álgebra',
    subsections: [
      {
        code: 'A',
        name: 'Traducción de lenguaje natural a algebraico',
        primary_skills: ['algebra-problemas-traduccion'],
      },
      {
        code: 'B',
        name: 'Problemas de edades',
        primary_skills: ['algebra-problemas-edades'],
      },
      {
        code: 'C',
        name: 'Problemas de números',
        primary_skills: ['algebra-problemas-numeros'],
      },
      {
        code: 'D',
        name: 'Problemas de mezclas y trabajo',
        primary_skills: ['algebra-problemas-mezclas'],
      },
    ],
  },
  {
    code: 'M1-ALG-004',
    name: 'Proporción directa e inversa y sus representaciones',
    level: 'M1',
    subject: 'álgebra',
    subsections: [
      {
        code: 'A',
        name: 'Concepto de proporcionalidad directa',
        primary_skills: ['proporcionalidad-directa-concepto'],
      },
      {
        code: 'B',
        name: 'Concepto de proporcionalidad inversa',
        primary_skills: ['proporcionalidad-inversa-concepto'],
      },
      {
        code: 'C',
        name: 'Representación gráfica de proporciones',
        primary_skills: ['proporcionalidad-grafica'],
      },
      {
        code: 'D',
        name: 'Tablas de proporcionalidad',
        primary_skills: ['proporcionalidad-tablas'],
      },
    ],
  },
  {
    code: 'M1-ALG-005',
    name: 'Problemas con proporcionalidad directa e inversa',
    level: 'M1',
    subject: 'álgebra',
    subsections: [
      {
        code: 'A',
        name: 'Problemas de proporcionalidad directa',
        primary_skills: ['proporcionalidad-directa-problemas'],
      },
      {
        code: 'B',
        name: 'Problemas de proporcionalidad inversa',
        primary_skills: ['proporcionalidad-inversa-problemas'],
      },
      {
        code: 'C',
        name: 'Regla de tres simple',
        primary_skills: ['regla-tres-simple'],
      },
      {
        code: 'D',
        name: 'Regla de tres compuesta',
        primary_skills: ['regla-tres-compuesta'],
      },
    ],
  },
  {
    code: 'M1-ALG-006',
    name: 'Resolución de ecuaciones e inecuaciones lineales',
    level: 'M1',
    subject: 'álgebra',
    subsections: [
      {
        code: 'A',
        name: 'Ecuaciones lineales simples',
        primary_skills: ['ecuaciones-lineales-simples'],
      },
      {
        code: 'B',
        name: 'Ecuaciones con paréntesis y fracciones',
        primary_skills: ['ecuaciones-lineales-complejas'],
      },
      {
        code: 'C',
        name: 'Inecuaciones lineales',
        primary_skills: ['inecuaciones-lineales'],
      },
      {
        code: 'D',
        name: 'Representación gráfica de soluciones',
        primary_skills: ['ecuaciones-inecuaciones-grafica'],
      },
    ],
  },
  {
    code: 'M1-ALG-007',
    name: 'Problemas con ecuaciones e inecuaciones en distintos contextos',
    level: 'M1',
    subject: 'álgebra',
    subsections: [
      {
        code: 'A',
        name: 'Problemas de movimiento y velocidad',
        primary_skills: ['ecuaciones-problemas-movimiento'],
      },
      {
        code: 'B',
        name: 'Problemas de costos y ganancias',
        primary_skills: ['ecuaciones-problemas-costos'],
      },
      {
        code: 'C',
        name: 'Problemas con inecuaciones',
        primary_skills: ['inecuaciones-problemas'],
      },
      {
        code: 'D',
        name: 'Problemas de optimización',
        primary_skills: ['ecuaciones-problemas-optimizacion'],
      },
    ],
  },
  {
    code: 'M1-ALG-008',
    name: 'Resolución y aplicación de sistemas de ecuaciones lineales (2x2)',
    level: 'M1',
    subject: 'álgebra',
    subsections: [
      {
        code: 'A',
        name: 'Método de sustitución',
        primary_skills: ['sistemas-ecuaciones-sustitucion'],
      },
      {
        code: 'B',
        name: 'Método de igualación',
        primary_skills: ['sistemas-ecuaciones-igualacion'],
      },
      {
        code: 'C',
        name: 'Método de reducción',
        primary_skills: ['sistemas-ecuaciones-reduccion'],
      },
      {
        code: 'D',
        name: 'Aplicaciones de sistemas de ecuaciones',
        primary_skills: ['sistemas-ecuaciones-problemas'],
      },
    ],
  },
  {
    code: 'M1-ALG-009',
    name: 'Función lineal y afín: concepto, tablas y gráficos',
    level: 'M1',
    subject: 'álgebra',
    subsections: [
      {
        code: 'A',
        name: 'Concepto de función',
        primary_skills: ['funcion-concepto'],
      },
      {
        code: 'B',
        name: 'Función lineal y sus características',
        primary_skills: ['funcion-lineal-concepto'],
      },
      {
        code: 'C',
        name: 'Función afín y pendiente',
        primary_skills: ['funcion-afin-pendiente'],
      },
      {
        code: 'D',
        name: 'Gráficos de funciones lineales',
        primary_skills: ['funcion-lineal-grafica'],
      },
      {
        code: 'E',
        name: 'Tablas de valores',
        primary_skills: ['funcion-lineal-tablas'],
      },
    ],
  },
  {
    code: 'M1-ALG-010',
    name: 'Aplicaciones de función lineal y afín en problemas reales',
    level: 'M1',
    subject: 'álgebra',
    subsections: [
      {
        code: 'A',
        name: 'Problemas de tarificación',
        primary_skills: ['funcion-lineal-problemas-tarificacion'],
      },
      {
        code: 'B',
        name: 'Problemas de movimiento uniforme',
        primary_skills: ['funcion-lineal-problemas-movimiento'],
      },
      {
        code: 'C',
        name: 'Problemas de conversión de unidades',
        primary_skills: ['funcion-lineal-problemas-conversion'],
      },
      {
        code: 'D',
        name: 'Interpretación de gráficos',
        primary_skills: ['funcion-lineal-problemas-interpretacion'],
      },
    ],
  },
  {
    code: 'M1-ALG-011',
    name: 'Resolución de ecuaciones de segundo grado',
    level: 'M1',
    subject: 'álgebra',
    subsections: [
      {
        code: 'A',
        name: 'Ecuaciones cuadráticas por factorización',
        primary_skills: ['ecuaciones-cuadraticas-factorizacion'],
      },
      {
        code: 'B',
        name: 'Fórmula general para ecuaciones cuadráticas',
        primary_skills: ['ecuaciones-cuadraticas-formula'],
      },
      {
        code: 'C',
        name: 'Completación de cuadrados',
        primary_skills: ['ecuaciones-cuadraticas-completacion'],
      },
      {
        code: 'D',
        name: 'Discriminante y naturaleza de las raíces',
        primary_skills: ['ecuaciones-cuadraticas-discriminante'],
      },
    ],
  },
  {
    code: 'M1-ALG-012',
    name: 'Función cuadrática: tablas y gráficos según parámetros',
    level: 'M1',
    subject: 'álgebra',
    subsections: [
      {
        code: 'A',
        name: 'Forma general y estándar de función cuadrática',
        primary_skills: ['funcion-cuadratica-forma'],
      },
      {
        code: 'B',
        name: 'Efecto del parámetro a en la parábola',
        primary_skills: ['funcion-cuadratica-parametro-a'],
      },
      {
        code: 'C',
        name: 'Efecto de los parámetros b y c',
        primary_skills: ['funcion-cuadratica-parametros-bc'],
      },
      {
        code: 'D',
        name: 'Construcción de gráficos',
        primary_skills: ['funcion-cuadratica-grafica'],
      },
    ],
  },
  {
    code: 'M1-ALG-013',
    name: 'Función cuadrática: vértice, ceros e intersecciones',
    level: 'M1',
    subject: 'álgebra',
    subsections: [
      {
        code: 'A',
        name: 'Cálculo del vértice',
        primary_skills: ['funcion-cuadratica-vertice'],
      },
      {
        code: 'B',
        name: 'Determinación de ceros o raíces',
        primary_skills: ['funcion-cuadratica-ceros'],
      },
      {
        code: 'C',
        name: 'Intersección con el eje y',
        primary_skills: ['funcion-cuadratica-interseccion-y'],
      },
      {
        code: 'D',
        name: 'Eje de simetría',
        primary_skills: ['funcion-cuadratica-simetria'],
      },
      {
        code: 'E',
        name: 'Análisis completo de la parábola',
        primary_skills: ['funcion-cuadratica-analisis'],
      },
    ],
  },
  {
    code: 'M1-ALG-014',
    name: 'Aplicaciones de función cuadrática en distintos contextos',
    level: 'M1',
    subject: 'álgebra',
    subsections: [
      {
        code: 'A',
        name: 'Problemas de optimización',
        primary_skills: ['funcion-cuadratica-problemas-optimizacion'],
      },
      {
        code: 'B',
        name: 'Problemas de movimiento parabólico',
        primary_skills: ['funcion-cuadratica-problemas-movimiento'],
      },
      {
        code: 'C',
        name: 'Problemas de áreas y perímetros',
        primary_skills: ['funcion-cuadratica-problemas-areas'],
      },
      {
        code: 'D',
        name: 'Problemas de economía y negocios',
        primary_skills: ['funcion-cuadratica-problemas-economia'],
      },
    ],
  },

  // ========================================
  // M1 - GEOMETRÍA
  // ========================================
  {
    code: 'M1-GEO-001',
    name: 'Teorema de Pitágoras',
    level: 'M1',
    subject: 'geometría',
    subsections: [
      {
        code: 'A',
        name: 'Enunciado y demostración del teorema',
        primary_skills: ['pitagoras-enunciado'],
      },
      {
        code: 'B',
        name: 'Cálculo de la hipotenusa',
        primary_skills: ['pitagoras-hipotenusa'],
      },
      {
        code: 'C',
        name: 'Cálculo de los catetos',
        primary_skills: ['pitagoras-catetos'],
      },
      {
        code: 'D',
        name: 'Aplicaciones del teorema',
        primary_skills: ['pitagoras-aplicaciones'],
      },
    ],
  },
  {
    code: 'M1-GEO-002',
    name: 'Perímetros y áreas de triángulos, paralelogramos, trapecios y círculos',
    level: 'M1',
    subject: 'geometría',
    subsections: [
      {
        code: 'A',
        name: 'Perímetro y área de triángulos',
        primary_skills: ['geometria-area-triangulo'],
      },
      {
        code: 'B',
        name: 'Perímetro y área de paralelogramos',
        primary_skills: ['geometria-area-paralelogramo'],
      },
      {
        code: 'C',
        name: 'Perímetro y área de trapecios',
        primary_skills: ['geometria-area-trapecio'],
      },
      {
        code: 'D',
        name: 'Perímetro y área de círculos',
        primary_skills: ['geometria-area-circulo'],
      },
      {
        code: 'E',
        name: 'Problemas combinados de áreas',
        primary_skills: ['geometria-areas-combinadas'],
      },
    ],
  },
  {
    code: 'M1-GEO-003',
    name: 'Área y volumen de prismas rectos y cilindros',
    level: 'M1',
    subject: 'geometría',
    subsections: [
      {
        code: 'A',
        name: 'Área superficial de prismas rectos',
        primary_skills: ['geometria-area-prisma'],
      },
      {
        code: 'B',
        name: 'Volumen de prismas rectos',
        primary_skills: ['geometria-volumen-prisma'],
      },
      {
        code: 'C',
        name: 'Área superficial de cilindros',
        primary_skills: ['geometria-area-cilindro'],
      },
      {
        code: 'D',
        name: 'Volumen de cilindros',
        primary_skills: ['geometria-volumen-cilindro'],
      },
    ],
  },
  {
    code: 'M1-GEO-004',
    name: 'Puntos y vectores en el plano',
    level: 'M1',
    subject: 'geometría',
    subsections: [
      {
        code: 'A',
        name: 'Sistema de coordenadas cartesianas',
        primary_skills: ['geometria-coordenadas'],
      },
      {
        code: 'B',
        name: 'Distancia entre dos puntos',
        primary_skills: ['geometria-distancia-puntos'],
      },
      {
        code: 'C',
        name: 'Punto medio de un segmento',
        primary_skills: ['geometria-punto-medio'],
      },
      {
        code: 'D',
        name: 'Vectores en el plano',
        primary_skills: ['geometria-vectores'],
      },
      {
        code: 'E',
        name: 'Operaciones con vectores',
        primary_skills: ['geometria-vectores-operaciones'],
      },
    ],
  },
  {
    code: 'M1-GEO-005',
    name: 'Rotación, traslación y reflexión de figuras geométricas',
    level: 'M1',
    subject: 'geometría',
    subsections: [
      {
        code: 'A',
        name: 'Traslación de figuras',
        primary_skills: ['geometria-traslacion'],
      },
      {
        code: 'B',
        name: 'Rotación de figuras',
        primary_skills: ['geometria-rotacion'],
      },
      {
        code: 'C',
        name: 'Reflexión de figuras',
        primary_skills: ['geometria-reflexion'],
      },
      {
        code: 'D',
        name: 'Composición de transformaciones',
        primary_skills: ['geometria-transformaciones-compuestas'],
      },
    ],
  },

  // ========================================
  // M1 - PROBABILIDAD Y ESTADÍSTICA
  // ========================================
  {
    code: 'M1-PROB-001',
    name: 'Tablas de frecuencia y gráficos estadísticos',
    level: 'M1',
    subject: 'probabilidad',
    subsections: [
      {
        code: 'A',
        name: 'Tablas de frecuencia absoluta y relativa',
        primary_skills: ['estadistica-tablas-frecuencia'],
      },
      {
        code: 'B',
        name: 'Gráficos de barras y pictogramas',
        primary_skills: ['estadistica-graficos-barras'],
      },
      {
        code: 'C',
        name: 'Gráficos circulares',
        primary_skills: ['estadistica-graficos-circulares'],
      },
      {
        code: 'D',
        name: 'Histogramas',
        primary_skills: ['estadistica-histogramas'],
      },
      {
        code: 'E',
        name: 'Interpretación de gráficos estadísticos',
        primary_skills: ['estadistica-interpretacion-graficos'],
      },
    ],
  },
  {
    code: 'M1-PROB-002',
    name: 'Media, mediana, moda y rango de uno o más grupos de datos',
    level: 'M1',
    subject: 'probabilidad',
    subsections: [
      {
        code: 'A',
        name: 'Cálculo de la media aritmética',
        primary_skills: ['estadistica-media'],
      },
      {
        code: 'B',
        name: 'Cálculo de la mediana',
        primary_skills: ['estadistica-mediana'],
      },
      {
        code: 'C',
        name: 'Cálculo de la moda',
        primary_skills: ['estadistica-moda'],
      },
      {
        code: 'D',
        name: 'Cálculo del rango',
        primary_skills: ['estadistica-rango'],
      },
      {
        code: 'E',
        name: 'Comparación de grupos de datos',
        primary_skills: ['estadistica-comparacion-grupos'],
      },
    ],
  },
  {
    code: 'M1-PROB-003',
    name: 'Cuartiles, percentiles y diagramas de caja',
    level: 'M1',
    subject: 'probabilidad',
    subsections: [
      {
        code: 'A',
        name: 'Cálculo de cuartiles',
        primary_skills: ['estadistica-cuartiles'],
      },
      {
        code: 'B',
        name: 'Cálculo de percentiles',
        primary_skills: ['estadistica-percentiles'],
      },
      {
        code: 'C',
        name: 'Construcción de diagramas de caja',
        primary_skills: ['estadistica-diagrama-caja'],
      },
      {
        code: 'D',
        name: 'Interpretación de diagramas de caja',
        primary_skills: ['estadistica-interpretacion-caja'],
      },
    ],
  },
  {
    code: 'M1-PROB-004',
    name: 'Probabilidad de eventos',
    level: 'M1',
    subject: 'probabilidad',
    subsections: [
      {
        code: 'A',
        name: 'Concepto de probabilidad',
        primary_skills: ['probabilidad-concepto'],
      },
      {
        code: 'B',
        name: 'Espacio muestral y eventos',
        primary_skills: ['probabilidad-espacio-muestral'],
      },
      {
        code: 'C',
        name: 'Probabilidad clásica',
        primary_skills: ['probabilidad-clasica'],
      },
      {
        code: 'D',
        name: 'Probabilidad experimental',
        primary_skills: ['probabilidad-experimental'],
      },
    ],
  },
  {
    code: 'M1-PROB-005',
    name: 'Reglas aditiva y multiplicativa de probabilidad',
    level: 'M1',
    subject: 'probabilidad',
    subsections: [
      {
        code: 'A',
        name: 'Regla aditiva para eventos mutuamente excluyentes',
        primary_skills: ['probabilidad-regla-aditiva'],
      },
      {
        code: 'B',
        name: 'Regla aditiva general',
        primary_skills: ['probabilidad-regla-aditiva-general'],
      },
      {
        code: 'C',
        name: 'Regla multiplicativa para eventos independientes',
        primary_skills: ['probabilidad-regla-multiplicativa'],
      },
      {
        code: 'D',
        name: 'Eventos complementarios',
        primary_skills: ['probabilidad-eventos-complementarios'],
      },
    ],
  },

  // ========================================
  // M2 - NÚMEROS (additional to M1)
  // ========================================
  {
    code: 'M2-NUM-001',
    name: 'Operaciones en el conjunto de los números reales',
    level: 'M2',
    subject: 'números',
    subsections: [
      {
        code: 'A',
        name: 'Números irracionales y su representación',
        primary_skills: ['numeros-reales-irracionales'],
      },
      {
        code: 'B',
        name: 'Operaciones con números reales',
        primary_skills: ['numeros-reales-operaciones'],
      },
      {
        code: 'C',
        name: 'Aproximaciones y redondeo',
        primary_skills: ['numeros-reales-aproximaciones'],
      },
      {
        code: 'D',
        name: 'Intervalos y conjuntos en la recta real',
        primary_skills: ['numeros-reales-intervalos'],
      },
    ],
  },
  {
    code: 'M2-NUM-002',
    name: 'Problemas que involucren números reales en diversos contextos',
    level: 'M2',
    subject: 'números',
    subsections: [
      {
        code: 'A',
        name: 'Problemas con raíces y radicales',
        primary_skills: ['numeros-reales-problemas-raices'],
      },
      {
        code: 'B',
        name: 'Problemas de medición con irracionales',
        primary_skills: ['numeros-reales-problemas-medicion'],
      },
      {
        code: 'C',
        name: 'Problemas de aproximación y error',
        primary_skills: ['numeros-reales-problemas-aproximacion'],
      },
      {
        code: 'D',
        name: 'Aplicaciones en ciencias y tecnología',
        primary_skills: ['numeros-reales-problemas-ciencias'],
      },
    ],
  },
  {
    code: 'M2-NUM-003',
    name: 'Problemas aplicados a finanzas: AFP, jubilación, créditos',
    level: 'M2',
    subject: 'números',
    subsections: [
      {
        code: 'A',
        name: 'Sistemas de AFP y ahorro previsional',
        primary_skills: ['finanzas-afp'],
      },
      {
        code: 'B',
        name: 'Cálculo de jubilación y pensiones',
        primary_skills: ['finanzas-jubilacion'],
      },
      {
        code: 'C',
        name: 'Créditos y sistemas de amortización',
        primary_skills: ['finanzas-creditos'],
      },
      {
        code: 'D',
        name: 'Interés compuesto',
        primary_skills: ['finanzas-interes-compuesto'],
      },
    ],
  },
  {
    code: 'M2-NUM-004',
    name: 'Relación entre potencias, raíces y logaritmos',
    level: 'M2',
    subject: 'números',
    subsections: [
      {
        code: 'A',
        name: 'Definición de logaritmo',
        primary_skills: ['logaritmos-definicion'],
      },
      {
        code: 'B',
        name: 'Relación entre exponenciación y logaritmo',
        primary_skills: ['logaritmos-relacion-potencias'],
      },
      {
        code: 'C',
        name: 'Logaritmos decimales y naturales',
        primary_skills: ['logaritmos-tipos'],
      },
      {
        code: 'D',
        name: 'Cambio de base',
        primary_skills: ['logaritmos-cambio-base'],
      },
    ],
  },
  {
    code: 'M2-NUM-005',
    name: 'Propiedades de los logaritmos',
    level: 'M2',
    subject: 'números',
    subsections: [
      {
        code: 'A',
        name: 'Propiedad del producto',
        primary_skills: ['logaritmos-propiedad-producto'],
      },
      {
        code: 'B',
        name: 'Propiedad del cociente',
        primary_skills: ['logaritmos-propiedad-cociente'],
      },
      {
        code: 'C',
        name: 'Propiedad de la potencia',
        primary_skills: ['logaritmos-propiedad-potencia'],
      },
      {
        code: 'D',
        name: 'Simplificación de expresiones logarítmicas',
        primary_skills: ['logaritmos-simplificacion'],
      },
    ],
  },
  {
    code: 'M2-NUM-006',
    name: 'Problemas con logaritmos en distintos contextos',
    level: 'M2',
    subject: 'números',
    subsections: [
      {
        code: 'A',
        name: 'Ecuaciones logarítmicas',
        primary_skills: ['logaritmos-ecuaciones'],
      },
      {
        code: 'B',
        name: 'Ecuaciones exponenciales',
        primary_skills: ['logaritmos-ecuaciones-exponenciales'],
      },
      {
        code: 'C',
        name: 'Aplicaciones en ciencias naturales',
        primary_skills: ['logaritmos-problemas-ciencias'],
      },
      {
        code: 'D',
        name: 'Escalas logarítmicas (pH, Richter, decibeles)',
        primary_skills: ['logaritmos-problemas-escalas'],
      },
    ],
  },

  // ========================================
  // M2 - ÁLGEBRA Y FUNCIONES (additional to M1)
  // ========================================
  {
    code: 'M2-ALG-001',
    name: 'Análisis de sistemas con única solución, infinitas soluciones o sin solución',
    level: 'M2',
    subject: 'álgebra',
    subsections: [
      {
        code: 'A',
        name: 'Sistemas con solución única',
        primary_skills: ['sistemas-solucion-unica'],
      },
      {
        code: 'B',
        name: 'Sistemas con infinitas soluciones',
        primary_skills: ['sistemas-infinitas-soluciones'],
      },
      {
        code: 'C',
        name: 'Sistemas sin solución',
        primary_skills: ['sistemas-sin-solucion'],
      },
      {
        code: 'D',
        name: 'Interpretación geométrica de sistemas',
        primary_skills: ['sistemas-interpretacion-geometrica'],
      },
    ],
  },
  {
    code: 'M2-ALG-002',
    name: 'Función potencia: representación gráfica',
    level: 'M2',
    subject: 'álgebra',
    subsections: [
      {
        code: 'A',
        name: 'Funciones potencia con exponente entero',
        primary_skills: ['funcion-potencia-entero'],
      },
      {
        code: 'B',
        name: 'Funciones potencia con exponente fraccionario',
        primary_skills: ['funcion-potencia-fraccionario'],
      },
      {
        code: 'C',
        name: 'Gráficos de funciones potencia',
        primary_skills: ['funcion-potencia-grafica'],
      },
      {
        code: 'D',
        name: 'Análisis de dominio y recorrido',
        primary_skills: ['funcion-potencia-dominio-recorrido'],
      },
    ],
  },
  {
    code: 'M2-ALG-003',
    name: 'Problemas que involucren la función potencia en distintos contextos',
    level: 'M2',
    subject: 'álgebra',
    subsections: [
      {
        code: 'A',
        name: 'Modelamiento con funciones potencia',
        primary_skills: ['funcion-potencia-modelamiento'],
      },
      {
        code: 'B',
        name: 'Problemas de variación',
        primary_skills: ['funcion-potencia-problemas-variacion'],
      },
      {
        code: 'C',
        name: 'Aplicaciones en física y geometría',
        primary_skills: ['funcion-potencia-problemas-fisica'],
      },
      {
        code: 'D',
        name: 'Interpretación de gráficos',
        primary_skills: ['funcion-potencia-problemas-interpretacion'],
      },
    ],
  },

  // ========================================
  // M2 - GEOMETRÍA (additional to M1)
  // ========================================
  {
    code: 'M2-GEO-001',
    name: 'Problemas con homotecia en diversos contextos',
    level: 'M2',
    subject: 'geometría',
    subsections: [
      {
        code: 'A',
        name: 'Concepto de homotecia',
        primary_skills: ['geometria-homotecia-concepto'],
      },
      {
        code: 'B',
        name: 'Razón de homotecia',
        primary_skills: ['geometria-homotecia-razon'],
      },
      {
        code: 'C',
        name: 'Homotecia y semejanza',
        primary_skills: ['geometria-homotecia-semejanza'],
      },
      {
        code: 'D',
        name: 'Aplicaciones de homotecia',
        primary_skills: ['geometria-homotecia-aplicaciones'],
      },
    ],
  },
  {
    code: 'M2-GEO-002',
    name: 'Seno, coseno y tangente en triángulos rectángulos',
    level: 'M2',
    subject: 'geometría',
    subsections: [
      {
        code: 'A',
        name: 'Razones trigonométricas básicas',
        primary_skills: ['trigonometria-razones-basicas'],
      },
      {
        code: 'B',
        name: 'Cálculo de seno, coseno y tangente',
        primary_skills: ['trigonometria-calculo'],
      },
      {
        code: 'C',
        name: 'Ángulos notables (30°, 45°, 60°)',
        primary_skills: ['trigonometria-angulos-notables'],
      },
      {
        code: 'D',
        name: 'Resolución de triángulos rectángulos',
        primary_skills: ['trigonometria-resolucion-triangulos'],
      },
    ],
  },
  {
    code: 'M2-GEO-003',
    name: 'Aplicaciones de razones trigonométricas en problemas cotidianos',
    level: 'M2',
    subject: 'geometría',
    subsections: [
      {
        code: 'A',
        name: 'Problemas de altura y distancia',
        primary_skills: ['trigonometria-problemas-altura'],
      },
      {
        code: 'B',
        name: 'Ángulos de elevación y depresión',
        primary_skills: ['trigonometria-problemas-angulos'],
      },
      {
        code: 'C',
        name: 'Aplicaciones en navegación',
        primary_skills: ['trigonometria-problemas-navegacion'],
      },
      {
        code: 'D',
        name: 'Aplicaciones en arquitectura e ingeniería',
        primary_skills: ['trigonometria-problemas-arquitectura'],
      },
    ],
  },

  // ========================================
  // M2 - PROBABILIDAD Y ESTADÍSTICA (additional to M1)
  // ========================================
  {
    code: 'M2-PROB-001',
    name: 'Cálculo y comparación de medidas de dispersión',
    level: 'M2',
    subject: 'probabilidad',
    subsections: [
      {
        code: 'A',
        name: 'Varianza y desviación estándar',
        primary_skills: ['estadistica-varianza-desviacion'],
      },
      {
        code: 'B',
        name: 'Coeficiente de variación',
        primary_skills: ['estadistica-coeficiente-variacion'],
      },
      {
        code: 'C',
        name: 'Comparación de dispersión entre grupos',
        primary_skills: ['estadistica-comparacion-dispersion'],
      },
      {
        code: 'D',
        name: 'Interpretación de medidas de dispersión',
        primary_skills: ['estadistica-interpretacion-dispersion'],
      },
    ],
  },
  {
    code: 'M2-PROB-002',
    name: 'Aplicaciones y propiedades de la probabilidad condicional',
    level: 'M2',
    subject: 'probabilidad',
    subsections: [
      {
        code: 'A',
        name: 'Concepto de probabilidad condicional',
        primary_skills: ['probabilidad-condicional-concepto'],
      },
      {
        code: 'B',
        name: 'Teorema de Bayes',
        primary_skills: ['probabilidad-teorema-bayes'],
      },
      {
        code: 'C',
        name: 'Eventos independientes y dependientes',
        primary_skills: ['probabilidad-eventos-independientes'],
      },
      {
        code: 'D',
        name: 'Aplicaciones de probabilidad condicional',
        primary_skills: ['probabilidad-condicional-aplicaciones'],
      },
    ],
  },
  {
    code: 'M2-PROB-003',
    name: 'Conceptos y resolución de problemas de conteo (permutación y combinatoria)',
    level: 'M2',
    subject: 'probabilidad',
    subsections: [
      {
        code: 'A',
        name: 'Principio multiplicativo',
        primary_skills: ['conteo-principio-multiplicativo'],
      },
      {
        code: 'B',
        name: 'Permutaciones',
        primary_skills: ['conteo-permutaciones'],
      },
      {
        code: 'C',
        name: 'Combinaciones',
        primary_skills: ['conteo-combinaciones'],
      },
      {
        code: 'D',
        name: 'Problemas de conteo en probabilidad',
        primary_skills: ['conteo-problemas-probabilidad'],
      },
    ],
  },
  {
    code: 'M2-PROB-004',
    name: 'Problemas que involucren el modelo binomial y otros modelos probabilísticos',
    level: 'M2',
    subject: 'probabilidad',
    subsections: [
      {
        code: 'A',
        name: 'Distribución binomial',
        primary_skills: ['probabilidad-distribucion-binomial'],
      },
      {
        code: 'B',
        name: 'Cálculo de probabilidades binomiales',
        primary_skills: ['probabilidad-calculo-binomial'],
      },
      {
        code: 'C',
        name: 'Otros modelos probabilísticos',
        primary_skills: ['probabilidad-otros-modelos'],
      },
      {
        code: 'D',
        name: 'Aplicaciones de modelos probabilísticos',
        primary_skills: ['probabilidad-modelos-aplicaciones'],
      },
    ],
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
 * Get subsections for a specific unit
 */
export function getSubsectionsByUnit(unitCode: string): UnitSubsection[] {
  const unit = THEMATIC_UNITS.find(u => u.code === unitCode);
  return unit?.subsections || [];
}

/**
 * Get a specific subsection by unit code and subsection code
 */
export function getSubsection(unitCode: string, subsectionCode: string): UnitSubsection | undefined {
  const unit = THEMATIC_UNITS.find(u => u.code === unitCode);
  return unit?.subsections?.find(s => s.code === subsectionCode);
}

/**
 * Format subsection for display (e.g., "A. Orden y valor absoluto")
 */
export function formatSubsectionName(subsection: UnitSubsection): string {
  return `${subsection.code}. ${subsection.name}`;
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
