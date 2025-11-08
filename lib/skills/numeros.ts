/**
 * ============================================================================
 * NÚMEROS Y OPERACIONES - SKILL DEFINITIONS
 * ============================================================================
 * Skills related to numbers, operations, fractions, decimals, percentages,
 * proportions, powers, roots, and rational number operations.
 */

import type { Skill } from './types';

export const NUMEROS_SKILLS: Record<string, Skill> = {
  'numeros-operaciones-basicas': {
    id: 'numeros-operaciones-basicas',
    name: 'Operaciones básicas',
    description: 'Suma, resta, multiplicación y división con números enteros',
    topic: 'números'
  },
  'numeros-fracciones': {
    id: 'numeros-fracciones',
    name: 'Fracciones',
    description: 'Operaciones con fracciones',
    topic: 'números'
  },
  'numeros-fracciones-suma': {
    id: 'numeros-fracciones-suma',
    name: 'Suma de fracciones',
    description: 'Sumar fracciones con común denominador',
    topic: 'números',
    parentSkill: 'numeros-fracciones'
  },
  'numeros-fracciones-comun-denominador': {
    id: 'numeros-fracciones-comun-denominador',
    name: 'Común denominador',
    description: 'Encontrar el común denominador para sumar/restar fracciones',
    topic: 'números',
    parentSkill: 'numeros-fracciones'
  },
  'numeros-decimales': {
    id: 'numeros-decimales',
    name: 'Números decimales',
    description: 'Operaciones con números decimales',
    topic: 'números'
  },
  'numeros-porcentajes': {
    id: 'numeros-porcentajes',
    name: 'Porcentajes',
    description: 'Calcular porcentajes y aplicarlos',
    topic: 'números'
  },
  'numeros-porcentajes-descuentos': {
    id: 'numeros-porcentajes-descuentos',
    name: 'Descuentos',
    description: 'Aplicar descuentos porcentuales',
    topic: 'números',
    parentSkill: 'numeros-porcentajes'
  },
  'numeros-proporcionalidad': {
    id: 'numeros-proporcionalidad',
    name: 'Proporcionalidad',
    description: 'Proporciones directas e inversas',
    topic: 'números'
  },
  'numeros-proporcionalidad-directa': {
    id: 'numeros-proporcionalidad-directa',
    name: 'Proporcionalidad directa',
    description: 'Resolver problemas de proporcionalidad directa',
    topic: 'números',
    parentSkill: 'numeros-proporcionalidad'
  },
  'numeros-proporcionalidad-inversa': {
    id: 'numeros-proporcionalidad-inversa',
    name: 'Proporcionalidad inversa',
    description: 'Resolver problemas de proporcionalidad inversa',
    topic: 'números',
    parentSkill: 'numeros-proporcionalidad'
  },
  'numeros-potencias': {
    id: 'numeros-potencias',
    name: 'Potencias',
    description: 'Calcular y operar con potencias',
    topic: 'números'
  },
  'numeros-potencias-propiedades': {
    id: 'numeros-potencias-propiedades',
    name: 'Propiedades de potencias',
    description: 'Aplicar propiedades de multiplicación y división de potencias',
    topic: 'números',
    parentSkill: 'numeros-potencias'
  },
  'numeros-raices': {
    id: 'numeros-raices',
    name: 'Raíces',
    description: 'Calcular raíces cuadradas',
    topic: 'números'
  },
  'numeros-mcd-mcm': {
    id: 'numeros-mcd-mcm',
    name: 'MCD y MCM',
    description: 'Máximo común divisor y mínimo común múltiplo',
    topic: 'números'
  },
  'numeros-enteros': {
    id: 'numeros-enteros',
    name: 'Números enteros',
    description: 'Operaciones con números positivos y negativos',
    topic: 'números'
  },
  'numeros-orden-operaciones': {
    id: 'numeros-orden-operaciones',
    name: 'Orden de operaciones',
    description: 'Aplicar el orden correcto de operaciones',
    topic: 'números'
  },
  // M2 Advanced Skills
  'numeros-racionalizacion': {
    id: 'numeros-racionalizacion',
    name: 'Racionalización',
    description: 'Racionalizar denominadores con raíces',
    topic: 'números'
  },
  'numeros-factorizacion-prima': {
    id: 'numeros-factorizacion-prima',
    name: 'Factorización prima',
    description: 'Descomponer números en factores primos',
    topic: 'números'
  },
};
