import { Question } from '../../../types';

export const m2NumerosMcdMcmQuestions: Question[] = [
  {
    id: 'm2-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'El mínimo común múltiplo (MCM) de 12, 18 y 24 es:',
    questionLatex: '\\text{El mínimo común múltiplo (MCM) de 12, 18 y 24 es:}',
    options: ['36', '48', '72', '144'],
    correctAnswer: 2,
    explanation: 'Factorizando: 12 = 2² × 3, 18 = 2 × 3², 24 = 2³ × 3. MCM = 2³ × 3² = 8 × 9 = 72',
    explanationLatex: '12 = 2^2 \\times 3, \\quad 18 = 2 \\times 3^2, \\quad 24 = 2^3 \\times 3 \\quad \\Rightarrow \\quad \\text{MCM} = 2^3 \\times 3^2 = 8 \\times 9 = 72',
    difficulty: 'medium',
    skills: ['numeros-mcd-mcm', 'numeros-factorizacion-prima', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-mcd-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'El máximo común divisor (MCD) de 48, 72 y 120 es:',
    questionLatex: '\\text{El máximo común divisor (MCD) de 48, 72 y 120 es:}',
    options: ['12', '24', '36', '8'],
    correctAnswer: 1,
    explanation: 'Factorizando: 48 = 2⁴ × 3, 72 = 2³ × 3², 120 = 2³ × 3 × 5. MCD = 2³ × 3 = 24',
    explanationLatex: '48 = 2^4 \\times 3, \\quad 72 = 2^3 \\times 3^2, \\quad 120 = 2^3 \\times 3 \\times 5 \\quad \\Rightarrow \\quad \\text{MCD} = 2^3 \\times 3 = 24',
    difficulty: 'hard',
    skills: ['numeros-mcd-mcm', 'numeros-factorizacion-prima', 'numeros-potencias', 'numeros-operaciones-basicas']
  }
];
