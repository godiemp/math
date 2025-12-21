/**
 * M2 Números thematic units
 * Units: M2-NUM-001 to M2-NUM-006
 */

import { ThematicUnit } from '../../types';

export const M2_NUMEROS_UNITS: ThematicUnit[] = [
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
];
