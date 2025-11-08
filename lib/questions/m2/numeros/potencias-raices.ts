import { Question } from '../../../types';

export const m2NumerosPotenciasRaicesQuestions: Question[] = [
  {
    id: 'm2-num-pot-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'Simplifica: $(2^3)^2 \\cdot 2^{-4}$',
    questionLatex: '\\text{Simplifica: } (2^3)^2 \\cdot 2^{-4}',
    options: ['$2^2$', '$2^4$', '$2^{10}$', '$2^{-2}$'],
    optionsLatex: ['2^2', '2^4', '2^{10}', '2^{-2}'],
    correctAnswer: 0,
    explanation: 'Aplicamos propiedades de potencias:',
    explanationLatex: '(2^3)^2 \\cdot 2^{-4} = 2^6 \\cdot 2^{-4} = 2^{6-4} = 2^2',
    difficulty: 'medium',
    skills: ['numeros-potencias', 'numeros-propiedades-potencias', 'numeros-operaciones-basicas']
  }
];
