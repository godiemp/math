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
  },
  {
    id: 'm2-num-rac-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'Racionaliza: $\\frac{12}{2\\sqrt{3}}$',
    questionLatex: '\\text{Racionaliza: } \\frac{12}{2\\sqrt{3}}',
    options: ['$2\\sqrt{3}$', '$4\\sqrt{3}$', '$6\\sqrt{3}$', '$\\sqrt{3}$'],
    optionsLatex: ['2\\sqrt{3}', '4\\sqrt{3}', '6\\sqrt{3}', '\\sqrt{3}'],
    correctAnswer: 0,
    explanation: 'Simplificamos y racionalizamos:',
    explanationLatex: '\\frac{12}{2\\sqrt{3}} = \\frac{6}{\\sqrt{3}} \\times \\frac{\\sqrt{3}}{\\sqrt{3}} = \\frac{6\\sqrt{3}}{3} = 2\\sqrt{3}',
    difficulty: 'medium',
    skills: ['numeros-racionalizacion', 'numeros-raices', 'numeros-fracciones', 'numeros-simplificacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-rac-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'Racionaliza y simplifica: $\\frac{\\sqrt{8}}{\\sqrt{2}}$',
    questionLatex: '\\text{Racionaliza y simplifica: } \\frac{\\sqrt{8}}{\\sqrt{2}}',
    options: ['$2$', '$\\sqrt{4}$', '$4$', '$\\sqrt{2}$'],
    optionsLatex: ['2', '\\sqrt{4}', '4', '\\sqrt{2}'],
    correctAnswer: 0,
    explanation: 'Podemos simplificar directamente:',
    explanationLatex: '\\frac{\\sqrt{8}}{\\sqrt{2}} = \\sqrt{\\frac{8}{2}} = \\sqrt{4} = 2',
    difficulty: 'medium',
    skills: ['numeros-racionalizacion', 'numeros-raices', 'numeros-simplificacion-raices', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-rac-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'Racionaliza: $\\frac{6}{\\sqrt{2} - 1}$',
    questionLatex: '\\text{Racionaliza: } \\frac{6}{\\sqrt{2} - 1}',
    options: ['$6(\\sqrt{2} + 1)$', '$6(\\sqrt{2} - 1)$', '$3(\\sqrt{2} + 1)$', '$12\\sqrt{2}$'],
    optionsLatex: ['6(\\sqrt{2} + 1)', '6(\\sqrt{2} - 1)', '3(\\sqrt{2} + 1)', '12\\sqrt{2}'],
    correctAnswer: 0,
    explanation: 'Multiplicamos por el conjugado (√2 + 1)/(√2 + 1):',
    explanationLatex: '\\frac{6}{\\sqrt{2} - 1} \\times \\frac{\\sqrt{2} + 1}{\\sqrt{2} + 1} = \\frac{6(\\sqrt{2} + 1)}{2 - 1} = 6(\\sqrt{2} + 1)',
    difficulty: 'hard',
    skills: ['numeros-racionalizacion', 'numeros-racionalizacion-conjugado', 'numeros-raices', 'numeros-fracciones', 'numeros-operaciones-basicas']
  }
];
