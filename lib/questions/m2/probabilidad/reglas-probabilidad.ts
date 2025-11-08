import { Question } from '../../../types';

export const m2ProbabilidadReglasProbabilidadQuestions: Question[] = [
  {
    id: 'm2-prob-rp-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'Al lanzar dos dados, ¿cuál es la probabilidad de que la suma sea 7?',
    questionLatex: '\\text{Al lanzar dos dados, ¿cuál es la probabilidad de que la suma sea 7?}',
    options: ['$\\frac{1}{6}$', '$\\frac{1}{12}$', '$\\frac{5}{36}$', '$\\frac{7}{36}$'],
    optionsLatex: ['\\frac{1}{6}', '\\frac{1}{12}', '\\frac{5}{36}', '\\frac{7}{36}'],
    correctAnswer: 0,
    explanation: 'Hay 6 formas de obtener suma 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) de 36 posibles:',
    explanationLatex: 'P(\\text{suma} = 7) = \\frac{6}{36} = \\frac{1}{6}',
    difficulty: 'medium',
    skills: ['probabilidad-eventos', 'probabilidad-reglas-basicas', 'probabilidad-eventos-equiprobables', 'numeros-fracciones', 'numeros-operaciones-basicas']
  }
];
