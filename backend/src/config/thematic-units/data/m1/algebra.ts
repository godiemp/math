/**
 * M1 Álgebra y Funciones thematic units
 * Units: M1-ALG-001 to M1-ALG-014
 */

import { ThematicUnit } from '../../types';

export const M1_ALGEBRA_UNITS: ThematicUnit[] = [
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
];
