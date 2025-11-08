/**
 * ============================================================================
 * ÁLGEBRA Y FUNCIONES - SKILL DEFINITIONS
 * ============================================================================
 * Skills related to algebraic expressions, equations, functions,
 * factorization, systems of equations, and quadratic equations.
 */

import type { Skill } from './types';

export const ALGEBRA_SKILLS: Record<string, Skill> = {
  'algebra-expresiones': {
    id: 'algebra-expresiones',
    name: 'Expresiones algebraicas',
    description: 'Simplificar y evaluar expresiones algebraicas',
    topic: 'álgebra'
  },
  'algebra-terminos-semejantes': {
    id: 'algebra-terminos-semejantes',
    name: 'Términos semejantes',
    description: 'Reducir términos semejantes',
    topic: 'álgebra',
    parentSkill: 'algebra-expresiones'
  },
  'algebra-ecuaciones-lineales': {
    id: 'algebra-ecuaciones-lineales',
    name: 'Ecuaciones lineales',
    description: 'Resolver ecuaciones lineales de primer grado',
    topic: 'álgebra'
  },
  'algebra-despeje': {
    id: 'algebra-despeje',
    name: 'Despeje de variables',
    description: 'Despejar variables en ecuaciones',
    topic: 'álgebra',
    parentSkill: 'algebra-ecuaciones-lineales'
  },
  'algebra-funciones': {
    id: 'algebra-funciones',
    name: 'Funciones',
    description: 'Evaluar y trabajar con funciones',
    topic: 'álgebra'
  },
  'algebra-evaluacion-funciones': {
    id: 'algebra-evaluacion-funciones',
    name: 'Evaluación de funciones',
    description: 'Evaluar funciones para valores específicos',
    topic: 'álgebra',
    parentSkill: 'algebra-funciones'
  },
  'algebra-funciones-lineales': {
    id: 'algebra-funciones-lineales',
    name: 'Funciones lineales',
    description: 'Trabajar con funciones de la forma y = mx + b',
    topic: 'álgebra',
    parentSkill: 'algebra-funciones'
  },
  'algebra-pendiente': {
    id: 'algebra-pendiente',
    name: 'Pendiente',
    description: 'Identificar la pendiente de una recta',
    topic: 'álgebra',
    parentSkill: 'algebra-funciones-lineales'
  },
  'algebra-factorizacion': {
    id: 'algebra-factorizacion',
    name: 'Factorización',
    description: 'Factorizar expresiones algebraicas',
    topic: 'álgebra'
  },
  'algebra-diferencia-cuadrados': {
    id: 'algebra-diferencia-cuadrados',
    name: 'Diferencia de cuadrados',
    description: 'Factorizar diferencia de cuadrados a² - b²',
    topic: 'álgebra',
    parentSkill: 'algebra-factorizacion'
  },
  'algebra-expansion': {
    id: 'algebra-expansion',
    name: 'Expansión algebraica',
    description: 'Expandir productos de binomios',
    topic: 'álgebra'
  },
  'algebra-propiedad-distributiva': {
    id: 'algebra-propiedad-distributiva',
    name: 'Propiedad distributiva',
    description: 'Aplicar la propiedad distributiva',
    topic: 'álgebra',
    parentSkill: 'algebra-expansion'
  },
  'algebra-desigualdades': {
    id: 'algebra-desigualdades',
    name: 'Desigualdades',
    description: 'Resolver desigualdades lineales',
    topic: 'álgebra'
  },
  // M2 Advanced Skills
  'algebra-sistemas-ecuaciones': {
    id: 'algebra-sistemas-ecuaciones',
    name: 'Sistemas de ecuaciones',
    description: 'Resolver sistemas de ecuaciones lineales',
    topic: 'álgebra'
  },
  'algebra-metodo-sustitucion': {
    id: 'algebra-metodo-sustitucion',
    name: 'Método de sustitución',
    description: 'Resolver sistemas por sustitución',
    topic: 'álgebra',
    parentSkill: 'algebra-sistemas-ecuaciones'
  },
  'algebra-metodo-eliminacion': {
    id: 'algebra-metodo-eliminacion',
    name: 'Método de eliminación',
    description: 'Resolver sistemas por eliminación/suma',
    topic: 'álgebra',
    parentSkill: 'algebra-sistemas-ecuaciones'
  },
  'algebra-ecuaciones-cuadraticas': {
    id: 'algebra-ecuaciones-cuadraticas',
    name: 'Ecuaciones cuadráticas',
    description: 'Resolver ecuaciones de segundo grado',
    topic: 'álgebra'
  },
  'algebra-factorizacion-cuadratica': {
    id: 'algebra-factorizacion-cuadratica',
    name: 'Factorización cuadrática',
    description: 'Factorizar ecuaciones cuadráticas',
    topic: 'álgebra',
    parentSkill: 'algebra-ecuaciones-cuadraticas'
  },
  'algebra-discriminante': {
    id: 'algebra-discriminante',
    name: 'Discriminante',
    description: 'Calcular y analizar el discriminante',
    topic: 'álgebra',
    parentSkill: 'algebra-ecuaciones-cuadraticas'
  },
  'algebra-formula-cuadratica': {
    id: 'algebra-formula-cuadratica',
    name: 'Fórmula cuadrática',
    description: 'Aplicar la fórmula general cuadrática',
    topic: 'álgebra',
    parentSkill: 'algebra-ecuaciones-cuadraticas'
  },
};
