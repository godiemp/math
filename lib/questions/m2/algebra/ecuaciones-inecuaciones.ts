import { Question } from '../../../types';

export const m2AlgebraEcuacionesInecuacionesQuestions: Question[] = [
  {
    id: 'm2-alg-ec-1',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Resolver la ecuación: } \\frac{2x + 1}{3} = \\frac{x - 2}{2}',
    options: ['$x = -7$', '$x = -8$', '$x = 7$', '$x = 8$'],
    optionsLatex: ['x = -7', 'x = -8', 'x = 7', 'x = 8'],
    correctAnswer: 0,
    explanation: 'Multiplicamos ambos lados por 6 (MCM de 3 y 2):',
    explanationLatex: '2(2x + 1) = 3(x - 2) \\rightarrow 4x + 2 = 3x - 6 \\rightarrow x = -8',
    difficulty: 'medium',
    skills: ['algebra-ecuaciones-lineales', 'algebra-fracciones-algebraicas', 'algebra-despeje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-ec-2',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Resolver la inecuación: } 3x - 5 > 2x + 7',
    options: ['$x > 12$', '$x < 12$', '$x > 2$', '$x < 2$'],
    optionsLatex: ['x > 12', 'x < 12', 'x > 2', 'x < 2'],
    correctAnswer: 0,
    explanation: 'Despejamos x agrupando términos:',
    explanationLatex: '3x - 2x > 7 + 5 \\rightarrow x > 12',
    difficulty: 'medium',
    skills: ['algebra-inecuaciones', 'algebra-desigualdades', 'algebra-despeje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-ec-3',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Resolver: } |2x - 3| = 7',
    options: ['$x = 5$ o $x = -2$', '$x = 2$ o $x = -5$', '$x = 10$ o $x = -4$', '$x = -5$ o $x = 2$'],
    optionsLatex: ['x = 5 \\text{ o } x = -2', 'x = 2 \\text{ o } x = -5', 'x = 10 \\text{ o } x = -4', 'x = -5 \\text{ o } x = 2'],
    correctAnswer: 0,
    explanation: 'Para |a| = b, tenemos a = b o a = -b:',
    explanationLatex: '2x - 3 = 7 \\rightarrow x = 5 \\quad \\text{o} \\quad 2x - 3 = -7 \\rightarrow x = -2',
    difficulty: 'hard',
    skills: ['algebra-valor-absoluto', 'algebra-ecuaciones-lineales', 'algebra-despeje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-ec-4',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Resolver la inecuación: } -2x + 6 \\leq 10',
    options: ['$x \\geq -2$', '$x \\leq -2$', '$x \\geq 2$', '$x \\leq 2$'],
    optionsLatex: ['x \\geq -2', 'x \\leq -2', 'x \\geq 2', 'x \\leq 2'],
    correctAnswer: 0,
    explanation: 'Despejamos x. Al dividir por -2, invertimos el sentido de la desigualdad:',
    explanationLatex: '-2x \\leq 4 \\rightarrow x \\geq -2',
    difficulty: 'hard',
    skills: ['algebra-inecuaciones', 'algebra-desigualdades', 'algebra-despeje', 'algebra-cambio-signo', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-ec-5',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Resolver: } |x - 4| < 3',
    options: ['$1 < x < 7$', '$-7 < x < -1$', '$x < 1$ o $x > 7$', '$x < -1$ o $x > 1$'],
    optionsLatex: ['1 < x < 7', '-7 < x < -1', 'x < 1 \\text{ o } x > 7', 'x < -1 \\text{ o } x > 1'],
    correctAnswer: 0,
    explanation: 'Para |a| < b, tenemos -b < a < b:',
    explanationLatex: '-3 < x - 4 < 3 \\rightarrow 1 < x < 7',
    difficulty: 'extreme',
    skills: ['algebra-valor-absoluto', 'algebra-inecuaciones', 'algebra-desigualdades', 'algebra-despeje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-ec-6',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Resolver: } \\frac{x + 3}{x - 2} = 4, \\text{ para } x \\neq 2',
    options: ['$x = \\frac{11}{3}$', '$x = 11$', '$x = 3$', '$x = \\frac{3}{11}$'],
    optionsLatex: ['x = \\frac{11}{3}', 'x = 11', 'x = 3', 'x = \\frac{3}{11}'],
    correctAnswer: 0,
    explanation: 'Multiplicamos por (x - 2):',
    explanationLatex: 'x + 3 = 4(x - 2) \\rightarrow x + 3 = 4x - 8 \\rightarrow 11 = 3x \\rightarrow x = \\frac{11}{3}',
    difficulty: 'hard',
    skills: ['algebra-ecuaciones-racionales', 'algebra-fracciones-algebraicas', 'algebra-despeje', 'numeros-fracciones', 'numeros-operaciones-basicas']
  }
];
