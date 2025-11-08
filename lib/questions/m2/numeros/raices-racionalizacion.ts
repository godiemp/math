import { Question } from '../../../types';

export const m2NumerosRaicesRacionalizacionQuestions: Question[] = [
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
  },
  {
    id: 'm2-num-rac-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'Racionaliza: $\\frac{10}{\\sqrt{5} + \\sqrt{3}}$',
    questionLatex: '\\text{Racionaliza: } \\frac{10}{\\sqrt{5} + \\sqrt{3}}',
    options: ['$5(\\sqrt{5} - \\sqrt{3})$', '$5(\\sqrt{5} + \\sqrt{3})$', '$\\frac{10}{2}$', '$10\\sqrt{2}$'],
    optionsLatex: ['5(\\sqrt{5} - \\sqrt{3})', '5(\\sqrt{5} + \\sqrt{3})', '\\frac{10}{2}', '10\\sqrt{2}'],
    correctAnswer: 0,
    explanation: 'Multiplicamos por el conjugado (√5 - √3)/(√5 - √3):',
    explanationLatex: '\\frac{10}{\\sqrt{5} + \\sqrt{3}} \\times \\frac{\\sqrt{5} - \\sqrt{3}}{\\sqrt{5} - \\sqrt{3}} = \\frac{10(\\sqrt{5} - \\sqrt{3})}{5 - 3} = \\frac{10(\\sqrt{5} - \\sqrt{3})}{2} = 5(\\sqrt{5} - \\sqrt{3})',
    difficulty: 'extreme',
    skills: ['numeros-racionalizacion', 'numeros-racionalizacion-conjugado', 'numeros-raices', 'numeros-fracciones', 'numeros-operaciones-basicas']
  }
];
