import { Question } from '../../../types';

/**
 * M1-ALG-011: Resolución de ecuaciones de segundo grado
 * Chilean PAES Curriculum - Algebra Subsection 011
 *
 * This subsection covers:
 * - A: Ecuaciones cuadráticas por factorización
 * - B: Fórmula general para ecuaciones cuadráticas
 * - C: Completación de cuadrados
 * - D: Discriminante y naturaleza de las raíces
 *
 * Total: 20 questions
 */
export const m1Alg011Questions: Question[] = [
  // ========================================
  // ECUACIONES CUADRÁTICAS POR FACTORIZACIÓN
  // ========================================
  {
    id: 'm1-alg011-1',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'factorización',
    questionLatex: '\\text{Resuelve } x^2 - 5x + 6 = 0 \\text{ por factorización.}',
    options: ['x = 1 \\text{ y } x = 6', 'x = 2 \\text{ y } x = 3', 'x = -2 \\text{ y } x = -3', 'x = -1 \\text{ y } x = -6'],
    correctAnswer: 1,
    explanation: 'x^2 - 5x + 6 = (x - 2)(x - 3) = 0 \\Rightarrow x = 2 \\text{ o } x = 3',
    difficulty: 'easy',
    skills: ['ecuaciones-cuadraticas-factorizacion', 'algebra-factorizacion-trinomios']
  },
  {
    id: 'm1-alg011-2',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'factorización',
    questionLatex: '\\text{Resuelve } x^2 + 7x + 12 = 0.',
    options: ['x = 3 \\text{ y } x = 4', 'x = -3 \\text{ y } x = -4', 'x = 2 \\text{ y } x = 6', 'x = -2 \\text{ y } x = -6'],
    correctAnswer: 1,
    explanation: 'x^2 + 7x + 12 = (x + 3)(x + 4) = 0 \\Rightarrow x = -3 \\text{ o } x = -4',
    difficulty: 'easy',
    skills: ['ecuaciones-cuadraticas-factorizacion', 'algebra-factorizacion-trinomios']
  },
  {
    id: 'm1-alg011-3',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'factorización',
    questionLatex: '\\text{Resuelve } x^2 - 9 = 0.',
    options: ['x = 9', 'x = \\pm 3', 'x = \\pm 9', 'x = 3'],
    correctAnswer: 1,
    explanation: 'x^2 - 9 = (x + 3)(x - 3) = 0 \\Rightarrow x = 3 \\text{ o } x = -3',
    difficulty: 'easy',
    skills: ['ecuaciones-cuadraticas-factorizacion', 'algebra-suma-por-diferencia']
  },
  {
    id: 'm1-alg011-4',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'factorización',
    questionLatex: '\\text{Resuelve } 2x^2 - 8x = 0.',
    options: ['x = 0 \\text{ y } x = 2', 'x = 0 \\text{ y } x = 4', 'x = 2 \\text{ y } x = 4', 'x = -4 \\text{ y } x = 0'],
    correctAnswer: 1,
    explanation: '2x^2 - 8x = 2x(x - 4) = 0 \\Rightarrow x = 0 \\text{ o } x = 4',
    difficulty: 'medium',
    skills: ['ecuaciones-cuadraticas-factorizacion', 'algebra-factorizacion-factor-comun']
  },
  {
    id: 'm1-alg011-5',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'factorización',
    questionLatex: '\\text{Resuelve } x^2 - x - 20 = 0.',
    options: ['x = 4 \\text{ y } x = -5', 'x = -4 \\text{ y } x = 5', 'x = 4 \\text{ y } x = 5', 'x = -4 \\text{ y } x = -5'],
    correctAnswer: 1,
    explanation: 'x^2 - x - 20 = (x + 4)(x - 5) = 0 \\Rightarrow x = -4 \\text{ o } x = 5',
    difficulty: 'medium',
    skills: ['ecuaciones-cuadraticas-factorizacion', 'algebra-factorizacion-trinomios']
  },
  // ========================================
  // FÓRMULA GENERAL
  // ========================================
  {
    id: 'm1-alg011-6',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'fórmula-general',
    questionLatex: '\\text{Usando la fórmula general, resuelve } x^2 - 4x + 3 = 0.',
    options: ['x = 1 \\text{ y } x = 3', 'x = -1 \\text{ y } x = -3', 'x = 2 \\text{ y } x = 6', 'x = -2 \\text{ y } x = -6'],
    correctAnswer: 0,
    explanation: 'x = \\frac{4 \\pm \\sqrt{16 - 12}}{2} = \\frac{4 \\pm 2}{2} \\Rightarrow x = 3 \\text{ o } x = 1',
    difficulty: 'medium',
    skills: ['ecuaciones-cuadraticas-formula', 'numeros-raices']
  },
  {
    id: 'm1-alg011-7',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'fórmula-general',
    questionLatex: '\\text{Resuelve } x^2 + 2x - 15 = 0 \\text{ usando la fórmula general.}',
    options: ['x = 3 \\text{ y } x = -5', 'x = -3 \\text{ y } x = 5', 'x = 3 \\text{ y } x = 5', 'x = -3 \\text{ y } x = -5'],
    correctAnswer: 0,
    explanation: 'x = \\frac{-2 \\pm \\sqrt{4 + 60}}{2} = \\frac{-2 \\pm 8}{2} \\Rightarrow x = 3 \\text{ o } x = -5',
    difficulty: 'medium',
    skills: ['ecuaciones-cuadraticas-formula', 'numeros-raices']
  },
  {
    id: 'm1-alg011-8',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'fórmula-general',
    questionLatex: '\\text{Resuelve } 2x^2 - 7x + 3 = 0.',
    options: ['x = \\frac{1}{2} \\text{ y } x = 3', 'x = 1 \\text{ y } x = \\frac{3}{2}', 'x = \\frac{1}{2} \\text{ y } x = -3', 'x = -\\frac{1}{2} \\text{ y } x = 3'],
    correctAnswer: 0,
    explanation: 'x = \\frac{7 \\pm \\sqrt{49 - 24}}{4} = \\frac{7 \\pm 5}{4} \\Rightarrow x = 3 \\text{ o } x = \\frac{1}{2}',
    difficulty: 'hard',
    skills: ['ecuaciones-cuadraticas-formula', 'numeros-racionales-operaciones']
  },
  {
    id: 'm1-alg011-9',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'fórmula-general',
    questionLatex: '\\text{La fórmula general para } ax^2 + bx + c = 0 \\text{ es:}',
    options: [
      'x = \\frac{b \\pm \\sqrt{b^2 - 4ac}}{2a}',
      'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
      'x = \\frac{-b \\pm \\sqrt{b^2 + 4ac}}{2a}',
      'x = \\frac{b \\pm \\sqrt{b^2 + 4ac}}{2a}'
    ],
    correctAnswer: 1,
    explanation: '\\text{La fórmula general es } x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    difficulty: 'easy',
    skills: ['ecuaciones-cuadraticas-formula']
  },
  {
    id: 'm1-alg011-10',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'fórmula-general',
    questionLatex: '\\text{Para } x^2 - 6x + 5 = 0, \\text{ ¿cuál es la suma de las soluciones?}',
    options: ['5', '6', '-6', '-5'],
    correctAnswer: 1,
    explanation: '\\text{Por Vieta: la suma de las raíces es } -\\frac{b}{a} = -\\frac{-6}{1} = 6',
    difficulty: 'medium',
    skills: ['ecuaciones-cuadraticas-formula', 'algebra-propiedades']
  },
  // ========================================
  // COMPLETACIÓN DE CUADRADOS
  // ========================================
  {
    id: 'm1-alg011-11',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'completación',
    questionLatex: '\\text{Al completar el cuadrado en } x^2 + 6x, \\text{ debemos sumar:}',
    options: ['3', '6', '9', '36'],
    correctAnswer: 2,
    explanation: '\\text{Se suma } \\left(\\frac{6}{2}\\right)^2 = 9 \\text{ para completar } (x + 3)^2',
    difficulty: 'medium',
    skills: ['ecuaciones-cuadraticas-completacion', 'algebra-cuadrado-binomio']
  },
  {
    id: 'm1-alg011-12',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'completación',
    questionLatex: '\\text{Escribe } x^2 - 4x + 3 \\text{ en forma } (x - h)^2 + k.',
    options: ['(x - 2)^2 - 1', '(x + 2)^2 - 1', '(x - 2)^2 + 1', '(x - 4)^2 - 13'],
    correctAnswer: 0,
    explanation: 'x^2 - 4x + 3 = (x^2 - 4x + 4) - 4 + 3 = (x - 2)^2 - 1',
    difficulty: 'hard',
    skills: ['ecuaciones-cuadraticas-completacion', 'algebra-cuadrado-binomio']
  },
  {
    id: 'm1-alg011-13',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'completación',
    questionLatex: '\\text{Resuelve } x^2 + 8x + 12 = 0 \\text{ completando el cuadrado.}',
    options: ['x = -2 \\text{ y } x = -6', 'x = 2 \\text{ y } x = 6', 'x = -4 \\text{ y } x = -3', 'x = 4 \\text{ y } x = 3'],
    correctAnswer: 0,
    explanation: '(x + 4)^2 - 16 + 12 = 0 \\Rightarrow (x + 4)^2 = 4 \\Rightarrow x + 4 = \\pm 2 \\\\ x = -2 \\text{ o } x = -6',
    difficulty: 'hard',
    skills: ['ecuaciones-cuadraticas-completacion', 'algebra-cuadrado-binomio']
  },
  {
    id: 'm1-alg011-14',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'completación',
    questionLatex: '\\text{Para completar el cuadrado en } x^2 - 10x, \\text{ ¿qué número se suma?}',
    options: ['5', '10', '25', '100'],
    correctAnswer: 2,
    explanation: '\\text{Se suma } \\left(\\frac{-10}{2}\\right)^2 = 25 \\text{ para obtener } (x - 5)^2',
    difficulty: 'medium',
    skills: ['ecuaciones-cuadraticas-completacion', 'algebra-cuadrado-binomio']
  },
  // ========================================
  // DISCRIMINANTE Y NATURALEZA DE LAS RAÍCES
  // ========================================
  {
    id: 'm1-alg011-15',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'discriminante',
    questionLatex: '\\text{El discriminante de } x^2 + 4x + 4 = 0 \\text{ es:}',
    options: ['0', '4', '8', '16'],
    correctAnswer: 0,
    explanation: '\\Delta = b^2 - 4ac = 16 - 16 = 0',
    difficulty: 'easy',
    skills: ['ecuaciones-cuadraticas-discriminante']
  },
  {
    id: 'm1-alg011-16',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'discriminante',
    questionLatex: '\\text{Si el discriminante es negativo, la ecuación cuadrática tiene:}',
    options: [
      '\\text{Dos soluciones reales distintas}',
      '\\text{Una solución real doble}',
      '\\text{Ninguna solución real}',
      '\\text{Infinitas soluciones}'
    ],
    correctAnswer: 2,
    explanation: '\\text{Si } \\Delta < 0, \\text{ no hay raíces reales (solo complejas).}',
    difficulty: 'easy',
    skills: ['ecuaciones-cuadraticas-discriminante']
  },
  {
    id: 'm1-alg011-17',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'discriminante',
    questionLatex: '\\text{¿Cuántas soluciones reales tiene } x^2 - 6x + 9 = 0?',
    options: ['0', '1', '2', 'Infinitas'],
    correctAnswer: 1,
    explanation: '\\Delta = 36 - 36 = 0 \\Rightarrow \\text{una solución real doble: } x = 3',
    difficulty: 'medium',
    skills: ['ecuaciones-cuadraticas-discriminante']
  },
  {
    id: 'm1-alg011-18',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'discriminante',
    questionLatex: '\\text{Para que } x^2 + kx + 9 = 0 \\text{ tenga una sola solución, k debe ser:}',
    options: ['k = 3', 'k = \\pm 6', 'k = 9', 'k = \\pm 3'],
    correctAnswer: 1,
    explanation: '\\Delta = k^2 - 36 = 0 \\Rightarrow k^2 = 36 \\Rightarrow k = \\pm 6',
    difficulty: 'hard',
    skills: ['ecuaciones-cuadraticas-discriminante', 'algebra-ecuaciones']
  },
  {
    id: 'm1-alg011-19',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'discriminante',
    questionLatex: '\\text{El discriminante de } 2x^2 - 5x + 1 = 0 \\text{ es:}',
    options: ['17', '15', '13', '11'],
    correctAnswer: 0,
    explanation: '\\Delta = (-5)^2 - 4(2)(1) = 25 - 8 = 17',
    difficulty: 'medium',
    skills: ['ecuaciones-cuadraticas-discriminante']
  },
  {
    id: 'm1-alg011-20',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'discriminante',
    questionLatex: '\\text{Si } \\Delta > 0 \\text{ para una ecuación cuadrática, entonces:}',
    options: [
      '\\text{No tiene soluciones reales}',
      '\\text{Tiene una solución doble}',
      '\\text{Tiene dos soluciones reales distintas}',
      '\\text{Tiene infinitas soluciones}'
    ],
    correctAnswer: 2,
    explanation: '\\text{Discriminante positivo indica dos raíces reales diferentes.}',
    difficulty: 'easy',
    skills: ['ecuaciones-cuadraticas-discriminante']
  }
];
