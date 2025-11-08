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
  },
  {
    id: 'm2-prob-mp-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'El percentil 90 (P90) de un conjunto de datos indica que:',
    questionLatex: '\\text{El percentil 90 (P90) de un conjunto de datos indica que:}',
    options: ['90% de los datos son menores o iguales a P90', '90% de los datos son mayores a P90', 'El promedio es 90', 'La moda es 90'],
    correctAnswer: 0,
    explanation: 'El percentil 90 indica que el 90% de los datos son menores o iguales a ese valor',
    explanationLatex: 'P_{90}: 90\\% \\text{ de los datos} \\leq P_{90}',
    difficulty: 'hard',
    skills: ['estadistica-percentiles', 'estadistica-medidas-posicion', 'estadistica-interpretacion']
  }
];
