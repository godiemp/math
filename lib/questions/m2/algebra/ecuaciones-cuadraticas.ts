import { Question } from '../../../types';

export const m2AlgebraEcuacionesCuadraticasQuestions: Question[] = [
  {
    id: 'm2-3',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Las raíces de la ecuación x² - 5x + 6 = 0 son:',
    questionLatex: '\\text{Las raíces de la ecuación } x^2 - 5x + 6 = 0 \\text{ son:}',
    options: ['x = 1, x = 6', 'x = 2, x = 3', 'x = -2, x = -3', 'x = 1, x = 5'],
    correctAnswer: 1,
    explanation: 'Factorizando: (x - 2)(x - 3) = 0, por lo tanto x = 2 o x = 3',
    explanationLatex: '(x - 2)(x - 3) = 0 \\quad \\Rightarrow \\quad x = 2 \\text{ o } x = 3',
    difficulty: 'medium',
    skills: ['algebra-ecuaciones-cuadraticas', 'algebra-factorizacion-cuadratica', 'algebra-factorizacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-6',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'El discriminante de x² + 4x + 1 = 0 es:',
    questionLatex: '\\text{El discriminante de } x^2 + 4x + 1 = 0 \\text{ es:}',
    options: ['12', '16', '20', '8'],
    correctAnswer: 0,
    explanation: 'Discriminante = b² - 4ac = 4² - 4(1)(1) = 16 - 4 = 12. Como es > 0, hay dos soluciones reales.',
    explanationLatex: '\\Delta = b^2 - 4ac = 4^2 - 4(1)(1) = 16 - 4 = 12',
    difficulty: 'medium',
    skills: ['algebra-ecuaciones-cuadraticas', 'algebra-discriminante', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-cuad-1',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Resolver usando la fórmula general: $2x^2 - 7x + 3 = 0$',
    questionLatex: '\\text{Resolver usando la fórmula general: } 2x^2 - 7x + 3 = 0',
    options: ['$x = 3$ o $x = \\frac{1}{2}$', '$x = 1$ o $x = \\frac{3}{2}$', '$x = 2$ o $x = \\frac{3}{4}$', '$x = 4$ o $x = \\frac{1}{3}$'],
    optionsLatex: ['x = 3 \\text{ o } x = \\frac{1}{2}', 'x = 1 \\text{ o } x = \\frac{3}{2}', 'x = 2 \\text{ o } x = \\frac{3}{4}', 'x = 4 \\text{ o } x = \\frac{1}{3}'],
    correctAnswer: 0,
    explanation: 'Aplicamos la fórmula cuadrática: x = [-b ± √(b²-4ac)] / 2a',
    explanationLatex: 'x = \\frac{7 \\pm \\sqrt{49-24}}{4} = \\frac{7 \\pm 5}{4} \\rightarrow x = 3 \\text{ o } x = \\frac{1}{2}',
    difficulty: 'hard',
    skills: ['algebra-ecuaciones-cuadraticas', 'algebra-formula-general', 'algebra-discriminante', 'numeros-raices', 'numeros-fracciones']
  },
  {
    id: 'm2-alg-cuad-2',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'El vértice de la parábola $y = x^2 - 4x + 3$ está en:',
    questionLatex: '\\text{El vértice de la parábola } y = x^2 - 4x + 3 \\text{ está en:}',
    options: ['$(2, -1)$', '$(-2, 15)$', '$(4, 3)$', '$(1, 0)$'],
    optionsLatex: ['(2, -1)', '(-2, 15)', '(4, 3)', '(1, 0)'],
    correctAnswer: 0,
    explanation: 'El vértice está en x = -b/2a = 4/2 = 2. Sustituyendo: y = 4 - 8 + 3 = -1',
    explanationLatex: 'x_v = -\\frac{b}{2a} = 2, \\quad y_v = (2)^2 - 4(2) + 3 = -1',
    difficulty: 'hard',
    skills: ['algebra-funciones-cuadraticas', 'algebra-vertice-parabola', 'algebra-forma-canonica', 'geometria-parabolas']
  }
];
