/**
 * M2 Probabilidad y Estadística thematic units
 * Units: M2-PROB-001 to M2-PROB-004
 */

import { ThematicUnit } from '../../types';

export const M2_PROBABILIDAD_UNITS: ThematicUnit[] = [
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
