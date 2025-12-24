/**
 * M1 Números thematic units
 * Units: M1-NUM-001 to M1-NUM-008
 */

import { ThematicUnit } from '../../types';

export const M1_NUMEROS_UNITS: ThematicUnit[] = [
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
];
