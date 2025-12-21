/**
 * M1 Geometría thematic units
 * Units: M1-GEO-001 to M1-GEO-005
 */

import { ThematicUnit } from '../../types';

export const M1_GEOMETRIA_UNITS: ThematicUnit[] = [
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
];
