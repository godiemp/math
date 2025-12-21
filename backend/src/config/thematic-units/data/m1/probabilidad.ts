/**
 * M1 Probabilidad y Estadística thematic units
 * Units: M1-PROB-001 to M1-PROB-005
 */

import { ThematicUnit } from '../../types';

export const M1_PROBABILIDAD_UNITS: ThematicUnit[] = [
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
];
