/**
 * M2 Álgebra y Funciones thematic units
 * Units: M2-ALG-001 to M2-ALG-003
 */

import { ThematicUnit } from '../../types';

export const M2_ALGEBRA_UNITS: ThematicUnit[] = [
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
];
