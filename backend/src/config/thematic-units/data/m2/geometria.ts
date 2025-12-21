/**
 * M2 Geometría thematic units
 * Units: M2-GEO-001 to M2-GEO-003
 */

import { ThematicUnit } from '../../types';

export const M2_GEOMETRIA_UNITS: ThematicUnit[] = [
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
];
