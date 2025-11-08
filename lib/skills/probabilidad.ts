/**
 * ============================================================================
 * PROBABILIDAD Y ESTADÍSTICA - SKILL DEFINITIONS
 * ============================================================================
 * Skills related to probability, statistics, measures of central tendency,
 * quartiles, combinatorics, and data analysis.
 */

import type { Skill } from './types';

export const PROBABILIDAD_SKILLS: Record<string, Skill> = {
  'probabilidad-basica': {
    id: 'probabilidad-basica',
    name: 'Probabilidad básica',
    description: 'Calcular probabilidades simples',
    topic: 'probabilidad'
  },
  'probabilidad-casos-favorables': {
    id: 'probabilidad-casos-favorables',
    name: 'Casos favorables y posibles',
    description: 'Identificar casos favorables y posibles',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-basica'
  },
  'probabilidad-eventos-compuestos': {
    id: 'probabilidad-eventos-compuestos',
    name: 'Eventos compuestos',
    description: 'Probabilidad de eventos múltiples',
    topic: 'probabilidad'
  },
  'estadistica-media': {
    id: 'estadistica-media',
    name: 'Media aritmética',
    description: 'Calcular la media o promedio',
    topic: 'probabilidad'
  },
  'estadistica-mediana': {
    id: 'estadistica-mediana',
    name: 'Mediana',
    description: 'Encontrar la mediana de un conjunto de datos',
    topic: 'probabilidad'
  },
  'estadistica-moda': {
    id: 'estadistica-moda',
    name: 'Moda',
    description: 'Identificar la moda (valor más frecuente)',
    topic: 'probabilidad'
  },
  'estadistica-rango': {
    id: 'estadistica-rango',
    name: 'Rango',
    description: 'Calcular el rango de un conjunto de datos',
    topic: 'probabilidad'
  },
  'estadistica-porcentajes': {
    id: 'estadistica-porcentajes',
    name: 'Porcentajes en datos',
    description: 'Calcular porcentajes a partir de datos',
    topic: 'probabilidad'
  },
  // M2 Advanced Skills
  'estadistica-cuartiles': {
    id: 'estadistica-cuartiles',
    name: 'Cuartiles',
    description: 'Calcular cuartiles Q1, Q2, Q3',
    topic: 'probabilidad'
  },
  'estadistica-rango-intercuartilico': {
    id: 'estadistica-rango-intercuartilico',
    name: 'Rango intercuartílico (IQR)',
    description: 'Calcular el rango intercuartílico',
    topic: 'probabilidad',
    parentSkill: 'estadistica-cuartiles'
  },
  'probabilidad-combinatoria': {
    id: 'probabilidad-combinatoria',
    name: 'Combinatoria',
    description: 'Combinaciones y permutaciones',
    topic: 'probabilidad'
  },
  'probabilidad-combinaciones': {
    id: 'probabilidad-combinaciones',
    name: 'Combinaciones',
    description: 'Calcular combinaciones C(n,r)',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-combinatoria'
  },
  'probabilidad-factorial': {
    id: 'probabilidad-factorial',
    name: 'Factorial',
    description: 'Calcular y aplicar factoriales',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-combinatoria'
  },
};
