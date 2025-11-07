import { Question } from '../types';

export const m2AlgebraQuestions: Question[] = [
  {
    id: 'm2-2',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Resuelve el sistema: 2x + y = 8 y x - y = 1',
    questionLatex: '\\text{Resuelve el sistema: } 2x + y = 8 \\text{ y } x - y = 1',
    options: ['x = 2, y = 4', 'x = 3, y = 2', 'x = 4, y = 0', 'x = 1, y = 6'],
    correctAnswer: 1,
    explanation: 'Sumando las ecuaciones: 3x = 9, entonces x = 3. Sustituyendo: 3 - y = 1, entonces y = 2',
    explanationLatex: '3x = 9 \\rightarrow x = 3. \\quad \\text{Sustituyendo: } 3 - y = 1 \\rightarrow y = 2',
    difficulty: 'medium',
    skills: ['algebra-sistemas-ecuaciones', 'algebra-metodo-eliminacion', 'algebra-metodo-sustitucion', 'algebra-despeje', 'numeros-operaciones-basicas']
  },
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
  }
];
