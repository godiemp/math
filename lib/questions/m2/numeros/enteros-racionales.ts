import { Question } from '../../../types';

export const m2NumerosEnterosRacionalesQuestions: Question[] = [
  {
    id: 'm2-num-ent-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'Calcula: $\\frac{2}{3} - \\frac{3}{4} + \\frac{1}{6}$',
    questionLatex: '\\text{Calcula: } \\frac{2}{3} - \\frac{3}{4} + \\frac{1}{6}',
    options: ['$\\frac{1}{12}$', '$\\frac{1}{6}$', '$\\frac{5}{12}$', '$\\frac{7}{12}$'],
    optionsLatex: ['\\frac{1}{12}', '\\frac{1}{6}', '\\frac{5}{12}', '\\frac{7}{12}'],
    correctAnswer: 0,
    explanation: 'Encontramos común denominador (12) y operamos:',
    explanationLatex: '\\frac{8}{12} - \\frac{9}{12} + \\frac{2}{12} = \\frac{8 - 9 + 2}{12} = \\frac{1}{12}',
    difficulty: 'medium',
    skills: ['numeros-fracciones', 'numeros-fracciones-comun-denominador', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-ent-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'El resultado de $(-3) \\times (-2) \\times 5 \\times (-1)$ es:',
    questionLatex: '\\text{El resultado de } (-3) \\times (-2) \\times 5 \\times (-1) \\text{ es:}',
    options: ['$-30$', '$30$', '$-15$', '$15$'],
    optionsLatex: ['-30', '30', '-15', '15'],
    correctAnswer: 0,
    explanation: 'Multiplicamos: (-3) × (-2) = 6, luego 6 × 5 = 30, finalmente 30 × (-1) = -30',
    explanationLatex: '(-3) \\times (-2) \\times 5 \\times (-1) = 6 \\times 5 \\times (-1) = 30 \\times (-1) = -30',
    difficulty: 'medium',
    skills: ['numeros-enteros', 'numeros-multiplicacion-enteros', 'numeros-signos', 'numeros-operaciones-basicas']
  }
];
