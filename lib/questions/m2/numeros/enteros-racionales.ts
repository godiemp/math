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
  }
];
