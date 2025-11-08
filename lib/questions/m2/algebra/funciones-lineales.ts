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
  },
  {
    id: 'm2-alg-func-2',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Una recta con pendiente $-\\frac{3}{4}$ que pasa por el punto $(4, -2)$ tiene ecuación:',
    questionLatex: '\\text{Una recta con pendiente } -\\frac{3}{4} \\text{ que pasa por el punto } (4, -2) \\text{ tiene ecuación:}',
    options: ['$y = -\\frac{3}{4}x + 1$', '$y = -\\frac{3}{4}x - 5$', '$y = \\frac{3}{4}x - 5$', '$y = -\\frac{3}{4}x + 2$'],
    optionsLatex: ['y = -\\frac{3}{4}x + 1', 'y = -\\frac{3}{4}x - 5', 'y = \\frac{3}{4}x - 5', 'y = -\\frac{3}{4}x + 2'],
    correctAnswer: 0,
    explanation: 'Usamos forma punto-pendiente: y - y₁ = m(x - x₁)',
    explanationLatex: 'y - (-2) = -\\frac{3}{4}(x - 4) \\rightarrow y + 2 = -\\frac{3}{4}x + 3 \\rightarrow y = -\\frac{3}{4}x + 1',
    difficulty: 'hard',
    skills: ['algebra-funciones-lineales', 'algebra-ecuacion-recta', 'algebra-punto-pendiente', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-func-3',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Dos rectas son perpendiculares si el producto de sus pendientes es:',
    questionLatex: '\\text{Dos rectas son perpendiculares si el producto de sus pendientes es:}',
    options: ['$-1$', '$0$', '$1$', 'Indefinido'],
    optionsLatex: ['-1', '0', '1', '\\text{Indefinido}'],
    correctAnswer: 0,
    explanation: 'Dos rectas son perpendiculares cuando m₁ · m₂ = -1',
    explanationLatex: '\\text{Si } m_1 \\cdot m_2 = -1 \\text{, las rectas son perpendiculares}',
    difficulty: 'medium',
    skills: ['algebra-funciones-lineales', 'geometria-rectas-perpendiculares', 'algebra-pendiente', 'geometria-plano-cartesiano']
  }
];
