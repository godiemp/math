import { Question } from '../../../types';

export const m2AlgebraFuncionesLinealesQuestions: Question[] = [
  {
    id: 'm2-alg-func-1',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'La ecuación de la recta que pasa por los puntos (1, 3) y (3, 7) es:',
    questionLatex: '\\text{La ecuación de la recta que pasa por los puntos } (1, 3) \\text{ y } (3, 7) \\text{ es:}',
    options: ['$y = 2x + 1$', '$y = x + 2$', '$y = 2x - 1$', '$y = 3x$'],
    optionsLatex: ['y = 2x + 1', 'y = x + 2', 'y = 2x - 1', 'y = 3x'],
    correctAnswer: 0,
    explanation: 'Calculamos la pendiente m = (7-3)/(3-1) = 2, luego usamos punto-pendiente:',
    explanationLatex: 'm = \\frac{7-3}{3-1} = 2 \\quad \\Rightarrow \\quad y - 3 = 2(x - 1) \\quad \\Rightarrow \\quad y = 2x + 1',
    difficulty: 'medium',
    skills: ['algebra-funciones-lineales', 'algebra-pendiente', 'algebra-ecuacion-recta', 'geometria-plano-cartesiano', 'numeros-operaciones-basicas']
  }
];
