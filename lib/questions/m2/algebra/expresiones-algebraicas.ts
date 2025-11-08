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
  }
];
