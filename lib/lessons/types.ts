/**
 * ============================================================================
 * LESSON TYPES
 * ============================================================================
 *
 * Types for the interactive lesson system.
 * Each lesson is a bespoke, step-by-step learning experience.
 */

import { Level, Subject } from '@/lib/types/core';

/**
 * Step types in a lesson
 * - hook: Opening engagement (puzzle, question, real-world scenario)
 * - explore: Interactive discovery
 * - explain: Theory/concept explanation
 * - practice: Guided exercises
 * - verify: Checkpoint quiz to confirm learning
 */
export type LessonStepType = 'hook' | 'explore' | 'explain' | 'practice' | 'verify';

/**
 * Lesson step definition
 */
export interface LessonStep {
  id: string;
  type: LessonStepType;
  title: string;
  description?: string;
}

/**
 * Lesson definition
 */
export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: Level;
  subject: Subject;
  thematicUnit: string;
  skills: string[];
  estimatedMinutes: number;
  steps: LessonStep[];
}

/**
 * Lesson progress tracking
 */
export interface LessonProgress {
  lessonId: string;
  currentStep: number;
  completedSteps: string[];
  startedAt: number;
  completedAt?: number;
  verifyAttempts: number;
  verifyCorrect: number;
}

/**
 * Props for individual step components
 */
export interface LessonStepProps {
  onComplete: () => void;
  onBack?: () => void;
  isActive: boolean;
}

/**
 * Verify step question
 */
export interface VerifyQuestion {
  id: string;
  question: string;
  questionLatex?: string;
  type: 'multiple-choice' | 'ordering' | 'fill-blank' | 'two-values';
  options?: string[];
  correctAnswer: number | number[] | string | string[];
  explanation: string;
}

/**
 * All M1 lessons registry
 */
export const M1_LESSONS: Lesson[] = [
  {
    id: 'm1-num-001-a',
    slug: 'numeros-enteros-orden',
    title: 'Orden y Valor Absoluto',
    description: 'Aprende a ordenar números enteros y entender el valor absoluto como distancia.',
    level: 'M1',
    subject: 'números',
    thematicUnit: 'M1-NUM-001',
    skills: ['numeros-enteros-orden', 'numeros-enteros-valor-absoluto'],
    estimatedMinutes: 10,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Termómetro Loco' },
      { id: 'number-line', type: 'explore', title: 'La Recta Numérica' },
      { id: 'explain', type: 'explain', title: '¿Qué son los Enteros?' },
      { id: 'comparison', type: 'explore', title: 'El Juego de Comparación' },
      { id: 'absolute-value', type: 'explore', title: 'Valor Absoluto: La Distancia' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-num-001-b',
    slug: 'suma-resta-enteros',
    title: 'Suma y Resta de Enteros',
    description: 'Descubre cómo funcionan la suma y resta con números negativos.',
    level: 'M1',
    subject: 'números',
    thematicUnit: 'M1-NUM-001',
    skills: ['numeros-enteros-sumar-restar', 'numeros-enteros-opuesto'],
    estimatedMinutes: 10,
    steps: [
      { id: 'hook', type: 'hook', title: 'La Alcancía' },
      { id: 'number-line-addition', type: 'explore', title: 'Suma en la Recta' },
      { id: 'explain', type: 'explain', title: 'Las Reglas de Signos' },
      { id: 'subtraction', type: 'explore', title: 'Resta = Sumar el Opuesto' },
      { id: 'practice', type: 'explore', title: 'Práctica Guiada' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-num-001-c',
    slug: 'multiplicacion-division-enteros',
    title: 'Multiplicación y División de Enteros',
    description: 'Domina las reglas de signos en multiplicación y división.',
    level: 'M1',
    subject: 'números',
    thematicUnit: 'M1-NUM-001',
    skills: ['multiplicacion-enteros', 'division-enteros', 'reglas-signos'],
    estimatedMinutes: 15,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Ascensor Mágico' },
      { id: 'sign-rules', type: 'explore', title: 'Descubre las Reglas' },
      { id: 'explain', type: 'explain', title: '¿Por qué funcionan las reglas?' },
      { id: 'practice', type: 'practice', title: 'Práctica de Multiplicación' },
      { id: 'division', type: 'explore', title: 'División con Signos' },
      { id: 'verify', type: 'verify', title: 'Checkpoint Final' },
    ],
  },
  {
    id: 'm1-num-002-a',
    slug: 'fracciones-concepto-comparacion',
    title: 'Fracciones: Concepto y Comparación',
    description: 'Comprende qué son las fracciones y aprende a compararlas usando modelos visuales.',
    level: 'M1',
    subject: 'números',
    thematicUnit: 'M1-NUM-002',
    skills: ['fracciones-concepto', 'fracciones-comparacion', 'fracciones-equivalentes'],
    estimatedMinutes: 15,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Chocolate Perfecto' },
      { id: 'fraction-bars', type: 'explore', title: 'La Barra de Fracciones' },
      { id: 'explain', type: 'explain', title: 'Una Fracción = Un Número' },
      { id: 'practice', type: 'practice', title: '¿Cuál es Mayor?' },
      { id: 'number-line', type: 'explore', title: 'La Recta Numérica' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-num-002-b',
    slug: 'fracciones-mayores-que-1',
    title: 'Fracciones Mayores que 1',
    description: 'Descubre las fracciones impropias y los números mixtos, y aprende a convertir entre ellos.',
    level: 'M1',
    subject: 'números',
    thematicUnit: 'M1-NUM-002',
    skills: ['fracciones-impropias', 'numeros-mixtos', 'conversion-fracciones'],
    estimatedMinutes: 15,
    steps: [
      { id: 'hook', type: 'hook', title: 'La Fiesta de Pizza' },
      { id: 'improper-fractions', type: 'explore', title: 'Fracciones Impropias' },
      { id: 'explain', type: 'explain', title: 'Dos Formas, Un Número' },
      { id: 'practice', type: 'practice', title: 'Conversiones' },
      { id: 'number-line', type: 'explore', title: 'Más Allá del 1' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-num-002-c',
    slug: 'maximo-comun-divisor',
    title: 'Máximo Común Divisor (M.C.D.)',
    description: 'Aprende a encontrar el máximo común divisor y úsalo para simplificar fracciones.',
    level: 'M1',
    subject: 'números',
    thematicUnit: 'M1-NUM-002',
    skills: ['mcd-concepto', 'factores-comunes', 'simplificacion-fracciones'],
    estimatedMinutes: 15,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Problema del Reparto' },
      { id: 'explore-factors', type: 'explore', title: 'El Detective de Divisores' },
      { id: 'explain', type: 'explain', title: 'El Método de los Factores' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'explore-tiles', type: 'explore', title: 'El Constructor de Baldosas' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-num-002-d',
    slug: 'suma-resta-fracciones-igual-denominador',
    title: 'Suma y Resta de Fracciones con Igual Denominador',
    description: 'Aprende a sumar y restar fracciones cuando tienen el mismo denominador y simplifica los resultados.',
    level: 'M1',
    subject: 'números',
    thematicUnit: 'M1-NUM-002',
    skills: ['fracciones-suma-igual-denominador', 'fracciones-resta-igual-denominador', 'simplificacion-fracciones'],
    estimatedMinutes: 15,
    steps: [
      { id: 'hook', type: 'hook', title: 'Combinando Rebanadas' },
      { id: 'explore-addition', type: 'explore', title: 'Sumando Pedazos' },
      { id: 'explain', type: 'explain', title: 'La Regla de Oro' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'explore-subtraction', type: 'explore', title: 'Restando Pedazos' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-num-002-e',
    slug: 'minimo-comun-multiplo',
    title: 'Mínimo Común Múltiplo (M.C.M.)',
    description: 'Aprende a encontrar el mínimo común múltiplo y úsalo para sumar fracciones con distinto denominador.',
    level: 'M1',
    subject: 'números',
    thematicUnit: 'M1-NUM-002',
    skills: ['mcm-concepto', 'multiplos-comunes', 'fracciones-denominador-comun'],
    estimatedMinutes: 15,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Problema de los Encuentros' },
      { id: 'explore-multiples', type: 'explore', title: 'El Cazador de Múltiplos' },
      { id: 'explain', type: 'explain', title: 'Los Métodos del M.C.M.' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'explore-sync', type: 'explore', title: 'Sincronizando Eventos' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-num-002-f',
    slug: 'suma-resta-fracciones-distinto-denominador',
    title: 'Suma y Resta de Fracciones con Distinto Denominador',
    description: 'Aprende a sumar y restar fracciones cuando tienen diferente denominador usando el mínimo común múltiplo.',
    level: 'M1',
    subject: 'números',
    thematicUnit: 'M1-NUM-002',
    skills: [
      'fracciones-suma-distinto-denominador',
      'fracciones-resta-distinto-denominador',
      'fracciones-denominador-comun',
      'simplificacion-fracciones',
    ],
    estimatedMinutes: 15,
    steps: [
      { id: 'hook', type: 'hook', title: 'Pizzas Diferentes' },
      { id: 'explore-lcd', type: 'explore', title: 'Buscando el Denominador Común' },
      { id: 'explain', type: 'explain', title: 'La Regla de la Conversión' },
      { id: 'practice', type: 'practice', title: 'Práctica: Suma' },
      { id: 'explore-subtraction', type: 'explore', title: 'Restando con Distinto Denominador' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-num-002-g',
    slug: 'multiplicacion-division-fracciones',
    title: 'Multiplicación y División de Fracciones',
    description: 'Domina la multiplicación y división de fracciones usando el modelo de área y el recíproco.',
    level: 'M1',
    subject: 'números',
    thematicUnit: 'M1-NUM-002',
    skills: [
      'fracciones-multiplicacion',
      'fracciones-division',
      'fracciones-reciproco',
      'simplificacion-fracciones',
    ],
    estimatedMinutes: 15,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Chocolate Compartido' },
      { id: 'explore-multiply', type: 'explore', title: 'Descubre la Multiplicación' },
      { id: 'explain', type: 'explain', title: 'Las Reglas de Oro' },
      { id: 'practice', type: 'practice', title: 'Práctica: Multiplicación' },
      { id: 'explore-division', type: 'explore', title: 'El Secreto de la División' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-num-003-a',
    slug: 'potencias-exponente-positivo',
    title: 'Potencias con Exponente Positivo',
    description: 'Aprende qué son las potencias, cómo calcularlas y sus casos especiales.',
    level: 'M1',
    subject: 'números',
    thematicUnit: 'M1-NUM-003',
    skills: ['potencias-concepto', 'potencias-calcular', 'potencias-casos-especiales'],
    estimatedMinutes: 14,
    steps: [
      { id: 'hook', type: 'hook', title: 'La Leyenda del Tablero de Ajedrez' },
      { id: 'explore', type: 'explore', title: 'Descubre el Patrón' },
      { id: 'explain', type: 'explain', title: 'Conceptos de Potencias' },
      { id: 'classify', type: 'explore', title: 'Identifica el Valor' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-num-003-b',
    slug: 'potencias-exponente-cero-negativo',
    title: 'Potencias con Exponente Cero y Negativo',
    description: 'Descubre qué pasa cuando el exponente es cero o negativo y aprende a calcular estas potencias.',
    level: 'M1',
    subject: 'números',
    thematicUnit: 'M1-NUM-003',
    skills: ['potencias-exponente-cero', 'potencias-exponente-negativo', 'potencias-calcular'],
    estimatedMinutes: 14,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Misterio del Exponente Cero' },
      { id: 'explore', type: 'explore', title: 'Descubre el Patrón' },
      { id: 'explain', type: 'explain', title: 'Reglas de Exponentes' },
      { id: 'classify', type: 'explore', title: 'Clasifica el Resultado' },
      { id: 'practice', type: 'practice', title: 'Practica Calculando' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-num-003-c',
    slug: 'propiedades-potencias',
    title: 'Propiedades de las Potencias',
    description: 'Domina las propiedades de las potencias: producto, cociente y potencia de potencia.',
    level: 'M1',
    subject: 'números',
    thematicUnit: 'M1-NUM-003',
    skills: ['potencias-producto', 'potencias-cociente', 'potencias-potencia-de-potencia'],
    estimatedMinutes: 15,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Secreto del Científico' },
      { id: 'explore', type: 'explore', title: 'Descubre las Propiedades' },
      { id: 'explain', type: 'explain', title: 'Propiedades de las Potencias' },
      { id: 'classify', type: 'explore', title: 'Identifica la Propiedad' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-num-003-d',
    slug: 'notacion-cientifica',
    title: 'Notación Científica',
    description: 'Aprende a expresar números muy grandes y muy pequeños usando potencias de 10.',
    level: 'M1',
    subject: 'números',
    thematicUnit: 'M1-NUM-003',
    skills: ['notacion-cientifica-convertir', 'notacion-cientifica-identificar', 'potencias-base-10'],
    estimatedMinutes: 15,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Problema de los Científicos' },
      { id: 'explore', type: 'explore', title: 'Descubre el Patrón' },
      { id: 'explain', type: 'explain', title: 'Notación Científica' },
      { id: 'classify', type: 'explore', title: 'Identifica la Notación' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-num-004-a',
    slug: 'porcentaje-concepto',
    title: 'Concepto y Cálculo de Porcentaje',
    description: 'Aprende qué son los porcentajes y cómo calcularlos en situaciones cotidianas.',
    level: 'M1',
    subject: 'números',
    thematicUnit: 'M1-NUM-004',
    skills: ['porcentaje-concepto', 'porcentaje-calcular', 'porcentaje-conversiones'],
    estimatedMinutes: 15,
    steps: [
      { id: 'hook', type: 'hook', title: 'Las Ofertas del Centro Comercial' },
      { id: 'explore', type: 'explore', title: 'Descubre el Patrón' },
      { id: 'explain', type: 'explain', title: 'Conceptos de Porcentajes' },
      { id: 'classify', type: 'explore', title: 'Identifica el Valor' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-num-005-a',
    slug: 'problemas-porcentajes',
    title: 'Problemas con Porcentajes',
    description: 'Resuelve problemas de porcentajes en diversos contextos: descuentos, aumentos, comparaciones y más.',
    level: 'M1',
    subject: 'números',
    thematicUnit: 'M1-NUM-005',
    skills: ['porcentaje-problemas', 'porcentaje-sucesivos', 'porcentaje-inverso', 'porcentaje-comparacion'],
    estimatedMinutes: 16,
    steps: [
      { id: 'hook', type: 'hook', title: 'La Tienda de Electrónica' },
      { id: 'explore', type: 'explore', title: 'Tipos de Problemas' },
      { id: 'explain', type: 'explain', title: 'Estrategias Avanzadas' },
      { id: 'classify', type: 'explore', title: 'Clasifica el Problema' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  // ========================================
  // ÁLGEBRA Y FUNCIONES
  // ========================================
  {
    id: 'm1-alg-001-a',
    slug: 'terminos-semejantes',
    title: 'Términos Semejantes',
    description: 'Aprende a identificar y combinar términos algebraicos con la misma parte literal.',
    level: 'M1',
    subject: 'álgebra',
    thematicUnit: 'M1-ALG-001',
    skills: ['algebra-terminos-semejantes', 'algebra-expresiones', 'algebra-simplificacion'],
    estimatedMinutes: 12,
    steps: [
      { id: 'hook', type: 'hook', title: 'La Frutería Matemática' },
      { id: 'anatomy', type: 'explore', title: 'Anatomía de un Término' },
      { id: 'explain', type: 'explain', title: 'La Regla de Oro' },
      { id: 'classify', type: 'explore', title: 'El Clasificador' },
      { id: 'practice', type: 'practice', title: 'Desafío Express' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-alg-001-b',
    slug: 'propiedad-distributiva',
    title: 'Propiedad Distributiva',
    description: 'Aprende a expandir expresiones usando la propiedad distributiva.',
    level: 'M1',
    subject: 'álgebra',
    thematicUnit: 'M1-ALG-001',
    skills: ['algebra-propiedad-distributiva', 'algebra-terminos-semejantes', 'algebra-expresiones'],
    estimatedMinutes: 15,
    steps: [
      { id: 'hook', type: 'hook', title: 'La Tienda de Juguetes' },
      { id: 'explore', type: 'explore', title: 'El Constructor de Áreas' },
      { id: 'explain', type: 'explain', title: 'La Ley de Distribución' },
      { id: 'classify', type: 'explore', title: 'El Distribuidor' },
      { id: 'practice', type: 'practice', title: 'Desafío Distributivo' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-alg-001-c',
    slug: 'productos-notables',
    title: 'Productos Notables',
    description: 'Domina los tres productos notables: cuadrado de binomio, suma por diferencia, y binomios con término común.',
    level: 'M1',
    subject: 'álgebra',
    thematicUnit: 'M1-ALG-001',
    skills: ['algebra-productos-notables', 'algebra-propiedad-distributiva', 'algebra-terminos-semejantes'],
    estimatedMinutes: 17,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Arquitecto de Jardines' },
      { id: 'explore', type: 'explore', title: 'Descubre los Patrones' },
      { id: 'explain', type: 'explain', title: 'Los Tres Productos Notables' },
      { id: 'classify', type: 'explore', title: 'Identifica el Patrón' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-alg-001-d',
    slug: 'productos-notables-cubos',
    title: 'Productos Notables: Cubos',
    description: 'Domina el cubo de un binomio y la suma/diferencia de cubos.',
    level: 'M1',
    subject: 'álgebra',
    thematicUnit: 'M1-ALG-001',
    skills: ['algebra-productos-notables', 'algebra-cubos', 'algebra-factorizacion'],
    estimatedMinutes: 15,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Cubo Mágico' },
      { id: 'explore', type: 'explore', title: 'Descubre el Patrón' },
      { id: 'explain', type: 'explain', title: 'Las Fórmulas de los Cubos' },
      { id: 'classify', type: 'explore', title: 'Identifica el Tipo' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-alg-001-e',
    slug: 'factor-comun',
    title: 'Factorización por Factor Común',
    description: 'Aprende a identificar y extraer el factor común de expresiones algebraicas.',
    level: 'M1',
    subject: 'álgebra',
    thematicUnit: 'M1-ALG-001',
    skills: ['algebra-factorizacion', 'algebra-factorizacion-factor-comun', 'algebra-expresiones'],
    estimatedMinutes: 14,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Organizador de Cajas' },
      { id: 'explore', type: 'explore', title: 'Descubre el Patrón' },
      { id: 'explain', type: 'explain', title: 'Tipos de Factor Común' },
      { id: 'classify', type: 'explore', title: 'Identifica el Tipo de Factor' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-alg-001-f',
    slug: 'factorizacion-trinomios',
    title: 'Factorización de Trinomios',
    description: 'Aprende a factorizar trinomios de la forma x² + bx + c encontrando dos números que sumen b y multipliquen c.',
    level: 'M1',
    subject: 'álgebra',
    thematicUnit: 'M1-ALG-001',
    skills: ['algebra-factorizacion', 'algebra-factorizacion-trinomios', 'algebra-expresiones'],
    estimatedMinutes: 15,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Jardín Rectangular' },
      { id: 'explore', type: 'explore', title: 'Descubre el Patrón' },
      { id: 'explain', type: 'explain', title: 'Los Casos Según los Signos' },
      { id: 'classify', type: 'explore', title: 'Identifica el Caso de Signos' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-alg-001-g',
    slug: 'diferencia-cuadrados',
    title: 'Factorización por Diferencia de Cuadrados',
    description: 'Domina la factorización de expresiones de la forma a² - b² usando la fórmula (a + b)(a - b).',
    level: 'M1',
    subject: 'álgebra',
    thematicUnit: 'M1-ALG-001',
    skills: ['algebra-factorizacion', 'algebra-diferencia-cuadrados', 'algebra-expresiones'],
    estimatedMinutes: 14,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Truco del Calculista' },
      { id: 'explore', type: 'explore', title: 'Descubre el Patrón' },
      { id: 'explain', type: 'explain', title: 'Diferencia de Cuadrados' },
      { id: 'classify', type: 'explore', title: 'Identifica el Tipo de Expresión' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-alg-001-h',
    slug: 'trinomios-cuadraticos-perfectos',
    title: 'Factorización de Trinomios Cuadráticos Perfectos',
    description: 'Aprende a factorizar trinomios de la forma a² ± 2ab + b² reconociéndolos como cuadrados perfectos (a ± b)².',
    level: 'M1',
    subject: 'álgebra',
    thematicUnit: 'M1-ALG-001',
    skills: ['algebra-factorizacion', 'algebra-trinomios-cuadraticos-perfectos', 'algebra-expresiones'],
    estimatedMinutes: 15,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Inverso de los Productos Notables' },
      { id: 'explore', type: 'explore', title: 'Descubre el Patrón' },
      { id: 'explain', type: 'explain', title: 'Trinomios Cuadráticos Perfectos' },
      { id: 'classify', type: 'explore', title: 'Identifica el Tipo' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-alg-001-i',
    slug: 'factorizacion-trinomios-ax2',
    title: 'Factorización de Trinomios ax² + bx + c',
    description: 'Domina la factorización de trinomios cuando el coeficiente de x² no es 1, usando el Método AC.',
    level: 'M1',
    subject: 'álgebra',
    thematicUnit: 'M1-ALG-001',
    skills: ['algebra-factorizacion', 'algebra-factorizacion-trinomios-ax2', 'algebra-metodo-ac'],
    estimatedMinutes: 16,
    steps: [
      { id: 'hook', type: 'hook', title: 'La Bodega de Muebles' },
      { id: 'explore', type: 'explore', title: 'Descubre el Método AC' },
      { id: 'explain', type: 'explain', title: 'Métodos de Factorización' },
      { id: 'classify', type: 'explore', title: 'Identifica los Valores m y n' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-alg-002-a',
    slug: 'suma-resta-polinomios',
    title: 'Suma y Resta de Polinomios',
    description: 'Aprende a sumar y restar polinomios agrupando términos semejantes y operando sus coeficientes.',
    level: 'M1',
    subject: 'álgebra',
    thematicUnit: 'M1-ALG-002',
    skills: ['algebra-polinomios', 'algebra-terminos-semejantes', 'algebra-operaciones-basicas'],
    estimatedMinutes: 15,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Gerente de la Empresa' },
      { id: 'explore', type: 'explore', title: 'Descubre el Patrón' },
      { id: 'explain', type: 'explain', title: 'Las Reglas de la Operatoria' },
      { id: 'classify', type: 'explore', title: 'Identifica el Resultado' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-alg-003-a',
    slug: 'ecuaciones-problemas',
    title: 'Problemas con Ecuaciones Lineales',
    description: 'Aprende a traducir problemas de la vida real a ecuaciones lineales y resolverlas paso a paso.',
    level: 'M1',
    subject: 'álgebra',
    thematicUnit: 'M1-ALG-003',
    skills: ['algebra-ecuaciones-lineales', 'algebra-despeje', 'algebra-traduccion-problemas'],
    estimatedMinutes: 15,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Misterio del Precio' },
      { id: 'explore', type: 'explore', title: 'Descubre el Patrón' },
      { id: 'explain', type: 'explain', title: 'Método para Resolver Problemas' },
      { id: 'classify', type: 'explore', title: 'Identifica la Ecuación' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-alg-004-a',
    slug: 'proporcion-directa-inversa',
    title: 'Proporción Directa e Inversa',
    description: 'Aprende a identificar y calcular proporciones directas e inversas en problemas de la vida real.',
    level: 'M1',
    subject: 'álgebra',
    thematicUnit: 'M1-ALG-004',
    skills: ['algebra-proporcion-directa', 'algebra-proporcion-inversa', 'algebra-constante-proporcionalidad'],
    estimatedMinutes: 15,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Viaje en Auto' },
      { id: 'explore', type: 'explore', title: 'Descubre el Patrón' },
      { id: 'explain', type: 'explain', title: 'Proporciones: Directa e Inversa' },
      { id: 'classify', type: 'explore', title: 'Clasifica la Proporción' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-alg-011-a',
    slug: 'completar-cuadrado',
    title: 'Completar el Cuadrado',
    description: 'Aprende la técnica de completar el cuadrado para resolver ecuaciones cuadráticas y encontrar vértices de parábolas.',
    level: 'M1',
    subject: 'álgebra',
    thematicUnit: 'M1-ALG-011',
    skills: ['algebra-completar-cuadrado', 'algebra-ecuaciones-cuadraticas', 'algebra-vertice-parabola'],
    estimatedMinutes: 15,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Arquitecto y el Jardín' },
      { id: 'explore', type: 'explore', title: 'Descubre el Patrón' },
      { id: 'explain', type: 'explain', title: 'Completar el Cuadrado' },
      { id: 'classify', type: 'explore', title: 'Identifica el Cuadrado Completo' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-alg-001-j',
    slug: 'factorizacion-agrupacion',
    title: 'Factorización por Agrupación',
    description: 'Aprende a factorizar expresiones de 4 términos agrupándolos de a pares y extrayendo factores comunes.',
    level: 'M1',
    subject: 'álgebra',
    thematicUnit: 'M1-ALG-001',
    skills: ['algebra-factorizacion', 'algebra-factorizacion-agrupacion', 'algebra-expresiones'],
    estimatedMinutes: 15,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Terreno del Arquitecto' },
      { id: 'explore', type: 'explore', title: 'Descubre el Patrón' },
      { id: 'explain', type: 'explain', title: 'Casos de Agrupación' },
      { id: 'classify', type: 'explore', title: '¿Se Puede Agrupar?' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  // ========================================
  // GEOMETRÍA
  // ========================================
  {
    id: 'm1-geo-001-a',
    slug: 'teorema-pitagoras',
    title: 'El Teorema de Pitágoras',
    description: 'Descubre la relación entre los lados de un triángulo rectángulo.',
    level: 'M1',
    subject: 'geometría',
    thematicUnit: 'M1-GEO-001',
    skills: ['teorema-pitagoras-aplicar', 'teorema-pitagoras-identificar'],
    estimatedMinutes: 12,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Problema de la Escalera' },
      { id: 'discover', type: 'explore', title: 'Descubre el Patrón' },
      { id: 'proof', type: 'explore', title: 'La Prueba Visual' },
      { id: 'explain', type: 'explain', title: 'El Teorema de Pitágoras' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-geo-001-b',
    slug: 'area-rectangulos-triangulos',
    title: 'Área de Rectángulos y Triángulos',
    description: 'Aprende a calcular el área de rectángulos, cuadrados y triángulos.',
    level: 'M1',
    subject: 'geometría',
    thematicUnit: 'M1-GEO-001',
    skills: ['area-rectangulo', 'area-triangulo'],
    estimatedMinutes: 12,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Proyecto de Pintura' },
      { id: 'explore', type: 'explore', title: 'Descubriendo Fórmulas' },
      { id: 'explain', type: 'explain', title: 'Fórmulas de Área' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-geo-001-c',
    slug: 'area-paralelogramos-trapecios',
    title: 'Área de Paralelogramos y Trapecios',
    description: 'Aprende a calcular el área de paralelogramos y trapecios usando descomposición.',
    level: 'M1',
    subject: 'geometría',
    thematicUnit: 'M1-GEO-001',
    skills: ['area-paralelogramo', 'area-trapecio', 'descomponer-figuras'],
    estimatedMinutes: 12,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Jardín Irregular' },
      { id: 'explore', type: 'explore', title: 'Transformando Figuras' },
      { id: 'explain', type: 'explain', title: 'Las Fórmulas' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-geo-002-a',
    slug: 'circulo-perimetro-area',
    title: 'Circunferencia y Área del Círculo',
    description: 'Descubre Pi (π) y aprende a calcular la circunferencia y el área de círculos.',
    level: 'M1',
    subject: 'geometría',
    thematicUnit: 'M1-GEO-002',
    skills: ['circunferencia-circulo', 'area-circulo', 'pi-concepto'],
    estimatedMinutes: 12,
    steps: [
      { id: 'hook', type: 'hook', title: 'La Rueda de la Fortuna' },
      { id: 'explore', type: 'explore', title: 'Descubriendo Pi (π)' },
      { id: 'explain', type: 'explain', title: 'Fórmulas del Círculo' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  // ========================================
  // PROBABILIDAD Y ESTADÍSTICA
  // ========================================
  {
    id: 'm1-prob-001-a',
    slug: 'tablas-frecuencia-graficos',
    title: 'Tablas de Frecuencia y Gráficos',
    description: 'Construye tablas de frecuencia y descubre cómo se transforman en gráficos de barras y circulares.',
    level: 'M1',
    subject: 'probabilidad',
    thematicUnit: 'M1-PROB-001',
    skills: ['tablas-frecuencia', 'frecuencia-relativa', 'grafico-barras', 'grafico-circular'],
    estimatedMinutes: 12,
    steps: [
      { id: 'hook', type: 'hook', title: 'La Encuesta Misteriosa' },
      { id: 'explore-build', type: 'explore', title: 'Construye tu Gráfico' },
      { id: 'explain', type: 'explain', title: 'Frecuencias y Gráficos' },
      { id: 'practice', type: 'practice', title: 'Interpreta los Datos' },
      { id: 'advanced', type: 'explore', title: 'Del Gráfico de Barras al Circular' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-prob-001-b',
    slug: 'histogramas-datos-agrupados',
    title: 'Histogramas y Datos Agrupados',
    description: 'Aprende a organizar datos numéricos en intervalos y representarlos con histogramas.',
    level: 'M1',
    subject: 'probabilidad',
    thematicUnit: 'M1-PROB-001',
    skills: ['histograma', 'datos-agrupados', 'intervalos', 'marca-clase'],
    estimatedMinutes: 15,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Entrenador Confundido' },
      { id: 'explore', type: 'explore', title: 'Agrupa los Datos' },
      { id: 'explain', type: 'explain', title: 'Histogramas y Datos Agrupados' },
      { id: 'classify', type: 'explore', title: 'Clasifica los Datos' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-prob-002-a',
    slug: 'tendencia-central',
    title: 'Tendencia Central: Media, Mediana y Moda',
    description: 'Descubre las formas de describir el valor "típico" de un conjunto de datos.',
    level: 'M1',
    subject: 'probabilidad',
    thematicUnit: 'M1-PROB-002',
    skills: ['estadistica-media', 'estadistica-mediana', 'estadistica-moda', 'estadistica-rango'],
    estimatedMinutes: 15,
    steps: [
      { id: 'hook', type: 'hook', title: 'La Batalla del Top 10' },
      { id: 'explore', type: 'explore', title: 'El Laboratorio de Datos' },
      { id: 'explain', type: 'explain', title: 'Las Cuatro Medidas' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'advanced', type: 'explore', title: 'El Efecto del Outlier' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm2-prob-001-a',
    slug: 'medidas-dispersion',
    title: 'Medidas de Dispersión: Rango, Varianza y Desviación Estándar',
    description: 'Aprende a medir qué tan dispersos están los datos usando rango, varianza y desviación estándar.',
    level: 'M2',
    subject: 'probabilidad',
    thematicUnit: 'M2-PROB-001',
    skills: ['estadistica-rango', 'estadistica-varianza', 'estadistica-desviacion-estandar'],
    estimatedMinutes: 15,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Torneo de Tiro con Arco' },
      { id: 'explore', type: 'explore', title: 'El Laboratorio de Dispersión' },
      { id: 'explain', type: 'explain', title: 'Las Medidas de Dispersión' },
      { id: 'classify', type: 'explore', title: 'Compara la Dispersión' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-prob-003-a',
    slug: 'cuartiles-percentiles',
    title: 'Cuartiles, Percentiles y Diagramas de Caja',
    description: 'Aprende a dividir datos en partes iguales y visualizarlos con diagramas de caja.',
    level: 'M1',
    subject: 'probabilidad',
    thematicUnit: 'M1-PROB-003',
    skills: ['estadistica-cuartiles', 'estadistica-percentiles', 'estadistica-boxplot', 'interpretar-posicion'],
    estimatedMinutes: 15,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Ranking de la Clase' },
      { id: 'explore', type: 'explore', title: 'El Divisor de Datos' },
      { id: 'explain', type: 'explain', title: 'Cuartiles, IQR y Percentiles' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'advanced', type: 'explore', title: 'El Constructor de Boxplot' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-prob-004-a',
    slug: 'probabilidad-eventos',
    title: 'Probabilidad de Eventos',
    description: 'Descubre cómo calcular la probabilidad de que ocurra un evento.',
    level: 'M1',
    subject: 'probabilidad',
    thematicUnit: 'M1-PROB-004',
    skills: ['probabilidad-basica', 'espacio-muestral', 'eventos-favorables'],
    estimatedMinutes: 12,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Juego de Dados' },
      { id: 'explore-dice', type: 'explore', title: 'Explorando Posibilidades' },
      { id: 'explain', type: 'explain', title: 'La Fórmula de Probabilidad' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'advanced', type: 'explore', title: 'Más Allá del Dado' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-prob-004-b',
    slug: 'reglas-probabilidad',
    title: 'Reglas de Probabilidad',
    description: 'Domina el complemento y la regla aditiva para calcular probabilidades compuestas.',
    level: 'M1',
    subject: 'probabilidad',
    thematicUnit: 'M1-PROB-004',
    skills: ['probabilidad-complemento', 'regla-aditiva', 'eventos-mutuamente-excluyentes'],
    estimatedMinutes: 12,
    steps: [
      { id: 'hook', type: 'hook', title: 'Regalos para Sofía' },
      { id: 'explore-venn', type: 'explore', title: 'El Diagrama de Venn' },
      { id: 'explain', type: 'explain', title: 'Las Reglas de Probabilidad' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'advanced', type: 'explore', title: 'Casos Avanzados' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
  {
    id: 'm1-prob-004-c',
    slug: 'probabilidad-condicional',
    title: 'Probabilidad Condicional e Independencia',
    description: 'Aprende a calcular probabilidades cuando tienes información adicional y a identificar eventos independientes.',
    level: 'M1',
    subject: 'probabilidad',
    thematicUnit: 'M1-PROB-004',
    skills: ['probabilidad-condicional', 'eventos-independientes', 'regla-multiplicacion'],
    estimatedMinutes: 15,
    steps: [
      { id: 'hook', type: 'hook', title: 'El Pronóstico del Tiempo' },
      { id: 'explore', type: 'explore', title: 'Descubre el Patrón' },
      { id: 'explain', type: 'explain', title: 'Probabilidad Condicional' },
      { id: 'classify', type: 'explore', title: 'Clasifica los Eventos' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada' },
      { id: 'verify', type: 'verify', title: 'Checkpoint' },
    ],
  },
];

/**
 * Get lesson by slug
 */
export function getLessonBySlug(slug: string): Lesson | undefined {
  return M1_LESSONS.find(lesson => lesson.slug === slug);
}

/**
 * Get lessons by thematic unit
 */
export function getLessonsByUnit(unitCode: string): Lesson[] {
  return M1_LESSONS.filter(lesson => lesson.thematicUnit === unitCode);
}
