import { Question } from '../../../types';

export const m2ProbabilidadTendenciaCentralQuestions: Question[] = [
  {
    id: 'm2-prob-tc-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'En el conjunto de datos {15, 18, 20, 20, 22, 25, 30}, ¿cuál es la media aritmética?',
    questionLatex: '\\text{En el conjunto } \\{15, 18, 20, 20, 22, 25, 30\\}\\text{, ¿cuál es la media aritmética?}',
    options: ['20', '21', '22', '23'],
    correctAnswer: 1,
    explanation: 'Sumamos todos los valores y dividimos por la cantidad:',
    explanationLatex: '\\bar{x} = \\frac{15 + 18 + 20 + 20 + 22 + 25 + 30}{7} = \\frac{150}{7} \\approx 21.4 \\approx 21',
    difficulty: 'medium',
    skills: ['estadistica-media', 'estadistica-tendencia-central', 'numeros-operaciones-basicas']
  }
];
