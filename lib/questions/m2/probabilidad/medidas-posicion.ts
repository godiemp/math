import { Question } from '../../../types';

export const m2ProbabilidadMedidasPosicionQuestions: Question[] = [
  {
    id: 'm2-prob-mp-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'En un conjunto de 100 datos ordenados, ¿en qué posición se encuentra el tercer cuartil (Q3)?',
    questionLatex: '\\text{En 100 datos ordenados, ¿en qué posición está el tercer cuartil (Q3)?}',
    options: ['Posición 25', 'Posición 50', 'Posición 75', 'Posición 100'],
    correctAnswer: 2,
    explanation: 'El tercer cuartil Q3 está en la posición 75% de los datos:',
    explanationLatex: 'Q_3 = \\text{posición } \\frac{3n}{4} = \\frac{3 \\times 100}{4} = 75',
    difficulty: 'medium',
    skills: ['estadistica-cuartiles', 'estadistica-medidas-posicion', 'estadistica-percentiles', 'numeros-operaciones-basicas']
  }
];
