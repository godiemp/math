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
  },
  {
    id: 'm2-num-pot-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'Simplifica: $\\sqrt{72}$',
    questionLatex: '\\text{Simplifica: } \\sqrt{72}',
    options: ['$6\\sqrt{2}$', '$8\\sqrt{3}$', '$4\\sqrt{3}$', '$9\\sqrt{2}$'],
    optionsLatex: ['6\\sqrt{2}', '8\\sqrt{3}', '4\\sqrt{3}', '9\\sqrt{2}'],
    correctAnswer: 0,
    explanation: 'Factorizamos 72 = 36 × 2, entonces √72 = √(36×2) = √36 × √2 = 6√2',
    explanationLatex: '\\sqrt{72} = \\sqrt{36 \\times 2} = \\sqrt{36} \\times \\sqrt{2} = 6\\sqrt{2}',
    difficulty: 'hard',
    skills: ['numeros-raices', 'numeros-simplificacion-raices', 'numeros-factorizacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-pot-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'El valor de $\\left(\\frac{1}{2}\\right)^{-3}$ es:',
    questionLatex: '\\text{El valor de } \\left(\\frac{1}{2}\\right)^{-3} \\text{ es:}',
    options: ['$8$', '$-8$', '$\\frac{1}{8}$', '$-\\frac{1}{8}$'],
    optionsLatex: ['8', '-8', '\\frac{1}{8}', '-\\frac{1}{8}'],
    correctAnswer: 0,
    explanation: 'Un exponente negativo invierte la base: (1/2)⁻³ = 2³ = 8',
    explanationLatex: '\\left(\\frac{1}{2}\\right)^{-3} = \\left(\\frac{2}{1}\\right)^{3} = 2^3 = 8',
    difficulty: 'hard',
    skills: ['numeros-potencias', 'numeros-exponentes-negativos', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-pot-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'Simplifica: $\\sqrt{50} + \\sqrt{32} - \\sqrt{18}$',
    questionLatex: '\\text{Simplifica: } \\sqrt{50} + \\sqrt{32} - \\sqrt{18}',
    options: ['$7\\sqrt{2}$', '$5\\sqrt{2}$', '$8\\sqrt{2}$', '$6\\sqrt{2}$'],
    optionsLatex: ['7\\sqrt{2}', '5\\sqrt{2}', '8\\sqrt{2}', '6\\sqrt{2}'],
    correctAnswer: 3,
    explanation: '√50 = 5√2, √32 = 4√2, √18 = 3√2. Entonces: 5√2 + 4√2 - 3√2 = 6√2',
    explanationLatex: '5\\sqrt{2} + 4\\sqrt{2} - 3\\sqrt{2} = (5+4-3)\\sqrt{2} = 6\\sqrt{2}',
    difficulty: 'extreme',
    skills: ['numeros-raices', 'numeros-simplificacion-raices', 'numeros-suma-radicales', 'numeros-factorizacion', 'numeros-operaciones-basicas']
  }
];
