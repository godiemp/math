import { Question } from '../../../types';

export const m2ProbabilidadTendenciaCentralQuestions: Question[] = [
  {
    id: 'm2-prob-tc-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En el conjunto } \\{15, 18, 20, 20, 22, 25, 30\\}\\text{, ¿cuál es la media aritmética?}',
    options: ['20', '21', '22', '23'],
    correctAnswer: 1,
    explanation: 'Sumamos todos los valores y dividimos por la cantidad:',
    explanationLatex: '\\bar{x} = \\frac{15 + 18 + 20 + 20 + 22 + 25 + 30}{7} = \\frac{150}{7} \\approx 21.4 \\approx 21',
    difficulty: 'medium',
    skills: ['estadistica-media', 'estadistica-tendencia-central', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-tc-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En el conjunto } \\{3, 5, 5, 8, 9, 10, 12\\}\\text{, ¿cuál es la mediana?}',
    options: ['5', '7', '8', '9'],
    correctAnswer: 2,
    explanation: 'La mediana es el valor central cuando los datos están ordenados. Como hay 7 datos, es el 4° valor:',
    explanationLatex: '\\text{Mediana} = 8 \\text{ (posición central)}',
    difficulty: 'medium',
    skills: ['estadistica-mediana', 'estadistica-tendencia-central', 'estadistica-medidas-posicion']
  }
];
