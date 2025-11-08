import { Question } from '../../../types';

export const m2AlgebraEcuacionesInecuacionesQuestions: Question[] = [
  {
    id: 'm2-alg-ec-1',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Resolver la ecuación: $\\frac{2x + 1}{3} = \\frac{x - 2}{2}$',
    questionLatex: '\\text{Resolver la ecuación: } \\frac{2x + 1}{3} = \\frac{x - 2}{2}',
    options: ['$x = -7$', '$x = -8$', '$x = 7$', '$x = 8$'],
    optionsLatex: ['x = -7', 'x = -8', 'x = 7', 'x = 8'],
    correctAnswer: 0,
    explanation: 'Multiplicamos ambos lados por 6 (MCM de 3 y 2):',
    explanationLatex: '2(2x + 1) = 3(x - 2) \\rightarrow 4x + 2 = 3x - 6 \\rightarrow x = -8',
    difficulty: 'medium',
    skills: ['algebra-ecuaciones-lineales', 'algebra-fracciones-algebraicas', 'algebra-despeje', 'numeros-operaciones-basicas']
  }
];
