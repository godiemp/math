import { Question } from '../../../types';

/**
 * M1-ALG-013: Función cuadrática: vértice, ceros e intersecciones
 * Chilean PAES Curriculum - Algebra Subsection 013
 *
 * This subsection covers:
 * - A: Cálculo del vértice
 * - B: Determinación de ceros o raíces
 * - C: Intersección con el eje y
 * - D: Eje de simetría
 * - E: Análisis completo de la parábola
 *
 * Total: 20 questions
 */
export const m1Alg013Questions: Question[] = [
  // ========================================
  // CÁLCULO DEL VÉRTICE
  // ========================================
  {
    id: 'm1-alg013-1',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'vértice',
    questionLatex: '\\text{El vértice de } f(x) = x^2 - 4x + 3 \\text{ es:}',
    options: ['(2, -1)', '(-2, -1)', '(2, 1)', '(4, 3)'],
    correctAnswer: 0,
    explanation: 'h = -\\frac{b}{2a} = -\\frac{-4}{2} = 2 \\\\ k = f(2) = 4 - 8 + 3 = -1 \\\\ \\text{Vértice: } (2, -1)',
    difficulty: 'medium',
    difficultyScore: 0.48,
    skills: ['funcion-cuadratica-vertice']
  },
  {
    id: 'm1-alg013-2',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'vértice',
    questionLatex: '\\text{La fórmula para la coordenada x del vértice de } f(x) = ax^2 + bx + c \\text{ es:}',
    options: ['x = \\frac{b}{2a}', 'x = -\\frac{b}{2a}', 'x = \\frac{-b}{a}', 'x = \\frac{c}{a}'],
    correctAnswer: 1,
    explanation: '\\text{La coordenada x del vértice es } x = -\\frac{b}{2a}',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['funcion-cuadratica-vertice']
  },
  {
    id: 'm1-alg013-3',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'vértice',
    questionLatex: '\\text{El vértice de } f(x) = -2x^2 + 8x - 5 \\text{ es:}',
    options: ['(2, 3)', '(-2, 3)', '(2, -3)', '(4, -5)'],
    correctAnswer: 0,
    explanation: 'h = -\\frac{8}{2(-2)} = 2 \\\\ k = f(2) = -8 + 16 - 5 = 3 \\\\ \\text{Vértice: } (2, 3)',
    difficulty: 'medium',
    difficultyScore: 0.48,
    skills: ['funcion-cuadratica-vertice']
  },
  {
    id: 'm1-alg013-4',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'vértice',
    questionLatex: '\\text{Si el vértice de } f(x) = x^2 + bx + 1 \\text{ está en } x = 3, \\text{ entonces } b \\text{ vale:}',
    options: ['3', '-3', '6', '-6'],
    correctAnswer: 3,
    explanation: '-\\frac{b}{2(1)} = 3 \\Rightarrow b = -6',
    difficulty: 'hard',
    difficultyScore: 0.71,
    skills: ['funcion-cuadratica-vertice', 'algebra-ecuaciones']
  },
  // ========================================
  // DETERMINACIÓN DE CEROS O RAÍCES
  // ========================================
  {
    id: 'm1-alg013-5',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'ceros',
    questionLatex: '\\text{Los ceros de } f(x) = x^2 - 5x + 6 \\text{ son:}',
    options: ['x = 1 \\text{ y } x = 6', 'x = 2 \\text{ y } x = 3', 'x = -2 \\text{ y } x = -3', 'x = 5 \\text{ y } x = 6'],
    correctAnswer: 1,
    explanation: 'x^2 - 5x + 6 = (x - 2)(x - 3) = 0 \\Rightarrow x = 2 \\text{ o } x = 3',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['funcion-cuadratica-ceros', 'ecuaciones-cuadraticas-factorizacion']
  },
  {
    id: 'm1-alg013-6',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'ceros',
    questionLatex: '\\text{¿Cuántos ceros tiene } f(x) = x^2 + 4?',
    options: ['0', '1', '2', 'Infinitos'],
    correctAnswer: 0,
    explanation: 'x^2 + 4 = 0 \\Rightarrow x^2 = -4 \\text{ (no tiene solución real)}',
    difficulty: 'medium',
    difficultyScore: 0.48,
    skills: ['funcion-cuadratica-ceros', 'ecuaciones-cuadraticas-discriminante']
  },
  {
    id: 'm1-alg013-7',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'ceros',
    questionLatex: '\\text{Los ceros de } f(x) = x^2 - 16 \\text{ son:}',
    options: ['x = 16', 'x = \\pm 4', 'x = \\pm 8', 'x = 4'],
    correctAnswer: 1,
    explanation: 'x^2 = 16 \\Rightarrow x = \\pm 4',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['funcion-cuadratica-ceros', 'algebra-suma-por-diferencia']
  },
  {
    id: 'm1-alg013-8',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'ceros',
    questionLatex: '\\text{Si } f(x) = (x - 1)(x + 5), \\text{ los ceros son:}',
    options: ['x = 1 \\text{ y } x = 5', 'x = -1 \\text{ y } x = -5', 'x = 1 \\text{ y } x = -5', 'x = -1 \\text{ y } x = 5'],
    correctAnswer: 2,
    explanation: '(x - 1)(x + 5) = 0 \\Rightarrow x = 1 \\text{ o } x = -5',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['funcion-cuadratica-ceros']
  },
  // ========================================
  // INTERSECCIÓN CON EL EJE Y
  // ========================================
  {
    id: 'm1-alg013-9',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'intersección-y',
    questionLatex: '\\text{La intersección con el eje y de } f(x) = 2x^2 - 3x + 7 \\text{ es:}',
    options: ['(0, 2)', '(0, -3)', '(0, 7)', '(7, 0)'],
    correctAnswer: 2,
    explanation: 'f(0) = 0 - 0 + 7 = 7. \\text{ Punto: } (0, 7)',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['funcion-cuadratica-interseccion-y']
  },
  {
    id: 'm1-alg013-10',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'intersección-y',
    questionLatex: '\\text{En } f(x) = ax^2 + bx + c, \\text{ la intersección con el eje y siempre es:}',
    options: ['(a, 0)', '(0, b)', '(0, c)', '(c, 0)'],
    correctAnswer: 2,
    explanation: 'f(0) = a(0)^2 + b(0) + c = c. \\text{ La intersección es } (0, c).',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['funcion-cuadratica-interseccion-y']
  },
  {
    id: 'm1-alg013-11',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'intersección-y',
    questionLatex: '\\text{Si } f(x) = (x - 2)^2 - 9, \\text{ ¿cuál es la intersección con el eje y?}',
    options: ['(0, -9)', '(0, -5)', '(0, 4)', '(0, 13)'],
    correctAnswer: 1,
    explanation: 'f(0) = (0 - 2)^2 - 9 = 4 - 9 = -5. \\text{ Punto: } (0, -5)',
    difficulty: 'medium',
    difficultyScore: 0.48,
    skills: ['funcion-cuadratica-interseccion-y', 'algebra-evaluacion-funciones']
  },
  // ========================================
  // EJE DE SIMETRÍA
  // ========================================
  {
    id: 'm1-alg013-12',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'simetría',
    questionLatex: '\\text{El eje de simetría de } f(x) = x^2 - 8x + 12 \\text{ es:}',
    options: ['x = 8', 'x = 4', 'x = -4', 'x = 12'],
    correctAnswer: 1,
    explanation: '\\text{Eje de simetría: } x = -\\frac{b}{2a} = -\\frac{-8}{2} = 4',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['funcion-cuadratica-simetria']
  },
  {
    id: 'm1-alg013-13',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'simetría',
    questionLatex: '\\text{Si una parábola tiene ceros en } x = 1 \\text{ y } x = 5, \\text{ el eje de simetría es:}',
    options: ['x = 1', 'x = 3', 'x = 5', 'x = 6'],
    correctAnswer: 1,
    explanation: '\\text{El eje de simetría pasa por el punto medio de los ceros: } x = \\frac{1 + 5}{2} = 3',
    difficulty: 'medium',
    difficultyScore: 0.48,
    skills: ['funcion-cuadratica-simetria', 'funcion-cuadratica-ceros']
  },
  {
    id: 'm1-alg013-14',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'simetría',
    questionLatex: '\\text{El eje de simetría de } f(x) = -3x^2 + 12x - 7 \\text{ es:}',
    options: ['x = -2', 'x = 2', 'x = 4', 'x = -4'],
    correctAnswer: 1,
    explanation: 'x = -\\frac{12}{2(-3)} = -\\frac{12}{-6} = 2',
    difficulty: 'medium',
    difficultyScore: 0.48,
    skills: ['funcion-cuadratica-simetria']
  },
  // ========================================
  // ANÁLISIS COMPLETO DE LA PARÁBOLA
  // ========================================
  {
    id: 'm1-alg013-15',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'análisis',
    questionLatex: '\\text{Para } f(x) = x^2 - 2x - 3, \\text{ determina: vértice, ceros e intersección con eje y.}',
    options: [
      '\\text{V}(1, -4), x = -1, 3, (0, -3)',
      '\\text{V}(-1, -4), x = 1, -3, (0, -3)',
      '\\text{V}(1, 4), x = -1, 3, (0, 3)',
      '\\text{V}(2, -3), x = -1, 3, (0, -3)'
    ],
    correctAnswer: 0,
    explanation: 'h = 1, k = 1 - 2 - 3 = -4. \\text{ Ceros: } (x-3)(x+1) = 0. \\text{ f(0) = -3}',
    difficulty: 'hard',
    difficultyScore: 0.71,
    skills: ['funcion-cuadratica-analisis', 'funcion-cuadratica-vertice', 'funcion-cuadratica-ceros']
  },
  {
    id: 'm1-alg013-16',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'análisis',
    questionLatex: '\\text{Una parábola abre hacia arriba, tiene vértice en } (2, -1). \\text{ ¿Cuál es su valor mínimo?}',
    options: ['2', '-2', '-1', '1'],
    correctAnswer: 2,
    explanation: '\\text{El valor mínimo es la coordenada y del vértice: } -1',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['funcion-cuadratica-analisis', 'funcion-cuadratica-vertice']
  },
  {
    id: 'm1-alg013-17',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'análisis',
    questionLatex: '\\text{Si } f(x) = -x^2 + 6x - 5, \\text{ ¿cuál es el valor máximo de f?}',
    options: ['4', '5', '6', '9'],
    correctAnswer: 0,
    explanation: 'h = -\\frac{6}{-2} = 3 \\\\ k = f(3) = -9 + 18 - 5 = 4 \\text{ (máximo porque } a < 0)',
    difficulty: 'medium',
    difficultyScore: 0.48,
    skills: ['funcion-cuadratica-analisis', 'funcion-cuadratica-vertice']
  },
  {
    id: 'm1-alg013-18',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'análisis',
    questionLatex: '\\text{¿Cuál es el rango de } f(x) = x^2 - 4x + 5?',
    options: ['y \\geq 1', 'y \\geq 5', 'y \\leq 1', '\\text{Todos los reales}'],
    correctAnswer: 0,
    explanation: '\\text{Vértice: } h = 2, k = 4 - 8 + 5 = 1. \\text{ Como } a > 0, \\text{ rango: } y \\geq 1',
    difficulty: 'hard',
    difficultyScore: 0.71,
    skills: ['funcion-cuadratica-analisis', 'algebra-dominio-rango']
  },
  {
    id: 'm1-alg013-19',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'análisis',
    questionLatex: '\\text{Si } f(3) = f(7) \\text{ para una función cuadrática, el eje de simetría es:}',
    options: ['x = 3', 'x = 5', 'x = 7', 'x = 10'],
    correctAnswer: 1,
    explanation: '\\text{Puntos simétricos respecto al eje. Eje: } x = \\frac{3 + 7}{2} = 5',
    difficulty: 'medium',
    difficultyScore: 0.48,
    skills: ['funcion-cuadratica-analisis', 'funcion-cuadratica-simetria']
  },
  {
    id: 'm1-alg013-20',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'análisis',
    questionLatex: '\\text{Una parábola tiene vértice } (0, 4) \\text{ y pasa por } (2, 0). \\text{ ¿Cuál es su ecuación?}',
    options: ['f(x) = -x^2 + 4', 'f(x) = x^2 + 4', 'f(x) = -x^2 - 4', 'f(x) = x^2 - 4'],
    correctAnswer: 0,
    explanation: 'f(x) = a(x - 0)^2 + 4 = ax^2 + 4 \\\\ f(2) = 4a + 4 = 0 \\Rightarrow a = -1 \\\\ f(x) = -x^2 + 4',
    difficulty: 'hard',
    difficultyScore: 0.71,
    skills: ['funcion-cuadratica-analisis', 'funcion-cuadratica-forma']
  }
];
