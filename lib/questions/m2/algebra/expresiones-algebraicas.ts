import { Question } from '../../../types';

export const m2AlgebraExpresionesAlgebraicasQuestions: Question[] = [
  {
    id: 'm2-alg-expr-1',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Simplifica la expresión: $(2x^2 - 3x + 1) - (x^2 + 2x - 4)$',
    questionLatex: '\\text{Simplifica la expresión: } (2x^2 - 3x + 1) - (x^2 + 2x - 4)',
    options: ['$x^2 - 5x + 5$', '$x^2 - x - 3$', '$3x^2 - x - 3$', '$x^2 + x + 5$'],
    optionsLatex: ['x^2 - 5x + 5', 'x^2 - x - 3', '3x^2 - x - 3', 'x^2 + x + 5'],
    correctAnswer: 0,
    explanation: 'Distribuimos el negativo y combinamos términos semejantes:',
    explanationLatex: '2x^2 - 3x + 1 - x^2 - 2x + 4 = x^2 - 5x + 5',
    difficulty: 'medium',
    skills: ['algebra-expresiones-algebraicas', 'algebra-terminos-semejantes', 'algebra-distributiva', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-expr-2',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Factoriza completamente: $4x^2 - 9y^2$',
    questionLatex: '\\text{Factoriza completamente: } 4x^2 - 9y^2',
    options: ['$(2x - 3y)(2x + 3y)$', '$(4x - 9y)(x + y)$', '$(2x - 3y)^2$', '$(x - y)(4x + 9y)$'],
    optionsLatex: ['(2x - 3y)(2x + 3y)', '(4x - 9y)(x + y)', '(2x - 3y)^2', '(x - y)(4x + 9y)'],
    correctAnswer: 0,
    explanation: 'Es una diferencia de cuadrados perfectos: a² - b² = (a-b)(a+b)',
    explanationLatex: '4x^2 - 9y^2 = (2x)^2 - (3y)^2 = (2x - 3y)(2x + 3y)',
    difficulty: 'hard',
    skills: ['algebra-factorizacion', 'algebra-diferencia-cuadrados', 'algebra-productos-notables', 'algebra-expresiones-algebraicas']
  },
  {
    id: 'm2-alg-expr-3',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Simplifica: $\\frac{x^2 - 4}{x^2 + 4x + 4}$',
    questionLatex: '\\text{Simplifica: } \\frac{x^2 - 4}{x^2 + 4x + 4}',
    options: ['$\\frac{x - 2}{x + 2}$', '$\\frac{x + 2}{x - 2}$', '$\\frac{x - 2}{x}$', '$\\frac{1}{x + 2}$'],
    optionsLatex: ['\\frac{x - 2}{x + 2}', '\\frac{x + 2}{x - 2}', '\\frac{x - 2}{x}', '\\frac{1}{x + 2}'],
    correctAnswer: 0,
    explanation: 'Factorizamos numerador y denominador:',
    explanationLatex: '\\frac{(x-2)(x+2)}{(x+2)^2} = \\frac{x-2}{x+2}',
    difficulty: 'hard',
    skills: ['algebra-fracciones-algebraicas', 'algebra-factorizacion', 'algebra-simplificacion', 'algebra-productos-notables']
  }
];
