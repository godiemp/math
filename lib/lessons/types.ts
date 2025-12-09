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
  requiredToAdvance?: boolean;
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
      { id: 'hook', type: 'hook', title: 'El Termómetro Loco', requiredToAdvance: true },
      { id: 'number-line', type: 'explore', title: 'La Recta Numérica', requiredToAdvance: true },
      { id: 'explain', type: 'explain', title: '¿Qué son los Enteros?' },
      { id: 'comparison', type: 'explore', title: 'El Juego de Comparación', requiredToAdvance: true },
      { id: 'absolute-value', type: 'explore', title: 'Valor Absoluto: La Distancia', requiredToAdvance: true },
      { id: 'verify', type: 'verify', title: 'Checkpoint', requiredToAdvance: true },
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
      { id: 'hook', type: 'hook', title: 'La Alcancía', requiredToAdvance: true },
      { id: 'number-line-addition', type: 'explore', title: 'Suma en la Recta', requiredToAdvance: true },
      { id: 'explain', type: 'explain', title: 'Las Reglas de Signos' },
      { id: 'subtraction', type: 'explore', title: 'Resta = Sumar el Opuesto', requiredToAdvance: true },
      { id: 'practice', type: 'explore', title: 'Práctica Guiada', requiredToAdvance: true },
      { id: 'verify', type: 'verify', title: 'Checkpoint', requiredToAdvance: true },
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
      { id: 'hook', type: 'hook', title: 'El Ascensor Mágico', requiredToAdvance: true },
      { id: 'sign-rules', type: 'explore', title: 'Descubre las Reglas', requiredToAdvance: true },
      { id: 'explain', type: 'explain', title: '¿Por qué funcionan las reglas?' },
      { id: 'practice', type: 'practice', title: 'Práctica de Multiplicación', requiredToAdvance: true },
      { id: 'division', type: 'explore', title: 'División con Signos', requiredToAdvance: true },
      { id: 'verify', type: 'verify', title: 'Checkpoint Final', requiredToAdvance: true },
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
      { id: 'hook', type: 'hook', title: 'El Chocolate Perfecto', requiredToAdvance: true },
      { id: 'fraction-bars', type: 'explore', title: 'La Barra de Fracciones', requiredToAdvance: true },
      { id: 'explain', type: 'explain', title: 'Una Fracción = Un Número', requiredToAdvance: true },
      { id: 'practice', type: 'practice', title: '¿Cuál es Mayor?', requiredToAdvance: true },
      { id: 'number-line', type: 'explore', title: 'La Recta Numérica', requiredToAdvance: true },
      { id: 'verify', type: 'verify', title: 'Checkpoint', requiredToAdvance: true },
    ],
  },
  // ========================================
  // PROBABILIDAD Y ESTADÍSTICA
  // ========================================
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
      { id: 'hook', type: 'hook', title: 'El Juego de Dados', requiredToAdvance: true },
      { id: 'explore-dice', type: 'explore', title: 'Explorando Posibilidades', requiredToAdvance: true },
      { id: 'explain', type: 'explain', title: 'La Fórmula de Probabilidad' },
      { id: 'practice', type: 'practice', title: 'Práctica Guiada', requiredToAdvance: true },
      { id: 'advanced', type: 'explore', title: 'Más Allá del Dado', requiredToAdvance: true },
      { id: 'verify', type: 'verify', title: 'Checkpoint', requiredToAdvance: true },
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
