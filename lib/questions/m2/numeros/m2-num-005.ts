import { Question } from '../../../types';

/**
 * M2-NUM-005: Propiedades de los logaritmos
 *
 * Subsections:
 * A. Propiedad del producto
 *    Habilidades: logaritmos-propiedad-producto
 * B. Propiedad del cociente
 *    Habilidades: logaritmos-propiedad-cociente
 * C. Propiedad de la potencia
 *    Habilidades: logaritmos-propiedad-potencia
 * D. Simplificación de expresiones logarítmicas
 *    Habilidades: logaritmos-simplificacion
 */

export const m2Num005Questions: Question[] = [
  {
    id: 'm2-num-log-prop-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Simplifica: } \\log_2 8 + \\log_2 4',
    options: ['\\log_2 12', '\\log_2 32', '5', '12'],
    correctAnswer: 2,
    explanation: '\\log_2 8 + \\log_2 4 = \\log_2(8 \\times 4) = \\log_2 32 = 5',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['numeros-logaritmos', 'logaritmos-propiedad-producto', 'logaritmos-simplificacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-log-prop-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Simplifica: } \\log_5 125 - \\log_5 25',
    options: ['1', '2', '5', '100'],
    correctAnswer: 0,
    explanation: '\\log_5 125 - \\log_5 25 = \\log_5\\left(\\frac{125}{25}\\right) = \\log_5 5 = 1',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['numeros-logaritmos', 'logaritmos-propiedad-cociente', 'logaritmos-simplificacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-log-prop-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Simplifica: } 3\\log_2 4',
    options: ['\\log_2 12', '\\log_2 64', '6', '12'],
    correctAnswer: 2,
    explanation: '3\\log_2 4 = \\log_2(4^3) = \\log_2 64 = 6',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['numeros-logaritmos', 'logaritmos-propiedad-potencia', 'logaritmos-simplificacion', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-log-prop-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Expresa como un solo logaritmo: } \\log x + \\log y - \\log z',
    options: ['\\log(x + y - z)', '\\log\\left(\\frac{xy}{z}\\right)', '\\log(xyz)', '\\log\\left(\\frac{x + y}{z}\\right)'],
    correctAnswer: 1,
    explanation: '\\log x + \\log y - \\log z = \\log(xy) - \\log z = \\log\\left(\\frac{xy}{z}\\right)',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['numeros-logaritmos', 'logaritmos-propiedad-producto', 'logaritmos-propiedad-cociente', 'logaritmos-simplificacion']
  },
  {
    id: 'm2-num-log-prop-5',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Si } \\log_3 a = 2 \\text{ y } \\log_3 b = 4, \\text{ ¿cuál es } \\log_3(ab)?',
    options: ['2', '6', '8', '16'],
    correctAnswer: 1,
    explanation: '\\log_3(ab) = \\log_3 a + \\log_3 b = 2 + 4 = 6',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['numeros-logaritmos', 'logaritmos-propiedad-producto', 'logaritmos-simplificacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-log-prop-6',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Simplifica: } \\log_4 16^5',
    options: ['5', '10', '20', '80'],
    correctAnswer: 1,
    explanation: '\\log_4 16^5 = 5\\log_4 16 = 5 \\times 2 = 10',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['numeros-logaritmos', 'logaritmos-propiedad-potencia', 'logaritmos-simplificacion', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-log-prop-7',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Expande: } \\log_2\\left(\\frac{x^3}{y^2}\\right)',
    options: ['3\\log_2 x - 2\\log_2 y', '\\frac{3\\log_2 x}{2\\log_2 y}', '\\log_2(x^3 - y^2)', '5\\log_2(x-y)'],
    correctAnswer: 0,
    explanation: '\\log_2\\left(\\frac{x^3}{y^2}\\right) = \\log_2 x^3 - \\log_2 y^2 = 3\\log_2 x - 2\\log_2 y',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['numeros-logaritmos', 'logaritmos-propiedad-cociente', 'logaritmos-propiedad-potencia', 'logaritmos-simplificacion']
  }
];
