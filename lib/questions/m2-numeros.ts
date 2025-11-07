import { Question } from '../types';

export const m2NumerosQuestions: Question[] = [
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
    id: 'm2-9',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'Racionaliza: 6/√3',
    questionLatex: '\\text{Racionaliza: } \\frac{6}{\\sqrt{3}}',
    options: ['2√3', '3√2', '6√3', '√18'],
    optionsLatex: ['2\\sqrt{3}', '3\\sqrt{2}', '6\\sqrt{3}', '\\sqrt{18}'],
    correctAnswer: 0,
    explanation: '6/√3 = (6/√3) × (√3/√3) = 6√3/3 = 2√3',
    explanationLatex: '\\frac{6}{\\sqrt{3}} = \\frac{6}{\\sqrt{3}} \\times \\frac{\\sqrt{3}}{\\sqrt{3}} = \\frac{6\\sqrt{3}}{3} = 2\\sqrt{3}',
    difficulty: 'medium',
    skills: ['numeros-racionalizacion', 'numeros-raices', 'numeros-fracciones', 'numeros-operaciones-basicas']
  }
];
