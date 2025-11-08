import { Question } from '../../../types';

export const m2GeometriaPlanoCartesianoQuestions: Question[] = [
  {
    id: 'm2-4',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'La distancia entre los puntos A(1, 2) y B(4, 6) es:',
    questionLatex: '\\text{La distancia entre los puntos } A(1, 2) \\text{ y } B(4, 6) \\text{ es:}',
    options: ['3', '4', '5', '7'],
    correctAnswer: 2,
    explanation: 'd = √[(4-1)² + (6-2)²] = √[3² + 4²] = √[9 + 16] = √25 = 5',
    explanationLatex: 'd = \\sqrt{(4-1)^2 + (6-2)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5',
    difficulty: 'medium',
    skills: ['geometria-plano-cartesiano', 'geometria-distancia', 'geometria-pitagoras', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-10',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Dos rectas son perpendiculares. Si una tiene pendiente m = 2, ¿cuál es la pendiente de la otra?',
    questionLatex: '\\text{Dos rectas son perpendiculares. Si una tiene pendiente } m = 2\\text{, ¿cuál es la pendiente de la otra?}',
    options: ['2', '-2', '1/2', '-1/2'],
    optionsLatex: ['2', '-2', '\\frac{1}{2}', '-\\frac{1}{2}'],
    correctAnswer: 3,
    explanation: 'Rectas perpendiculares tienen pendientes que son recíprocas negativas: m₁ × m₂ = -1. Si m₁ = 2, entonces m₂ = -1/2',
    explanationLatex: 'm_1 \\times m_2 = -1 \\quad \\Rightarrow \\quad 2 \\times m_2 = -1 \\quad \\Rightarrow \\quad m_2 = -\\frac{1}{2}',
    difficulty: 'medium',
    skills: ['geometria-rectas-perpendiculares', 'geometria-pendiente-perpendicular', 'algebra-funciones-lineales', 'algebra-pendiente', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-plano-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El punto medio entre A(-2, 5) y B(6, -1) es:',
    questionLatex: '\\text{El punto medio entre } A(-2, 5) \\text{ y } B(6, -1) \\text{ es:}',
    options: ['$(2, 2)$', '$(4, 4)$', '$(2, 3)$', '$(4, 2)$'],
    optionsLatex: ['(2, 2)', '(4, 4)', '(2, 3)', '(4, 2)'],
    correctAnswer: 0,
    explanation: 'El punto medio se calcula promediando las coordenadas:',
    explanationLatex: 'M = \\left(\\frac{-2+6}{2}, \\frac{5+(-1)}{2}\\right) = \\left(\\frac{4}{2}, \\frac{4}{2}\\right) = (2, 2)',
    difficulty: 'medium',
    skills: ['geometria-punto-medio', 'geometria-plano-cartesiano', 'numeros-fracciones', 'numeros-operaciones-basicas']
  }
];
