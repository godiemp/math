import { Question } from '../../../types';

export const m2GeometriaPlanoCartesianoQuestions: Question[] = [
  {
    id: 'm2-4',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
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
    questionLatex: '\\text{El punto medio entre } A(-2, 5) \\text{ y } B(6, -1) \\text{ es:}',
    options: ['$(2, 2)$', '$(4, 4)$', '$(2, 3)$', '$(4, 2)$'],
    optionsLatex: ['(2, 2)', '(4, 4)', '(2, 3)', '(4, 2)'],
    correctAnswer: 0,
    explanation: 'El punto medio se calcula promediando las coordenadas:',
    explanationLatex: 'M = \\left(\\frac{-2+6}{2}, \\frac{5+(-1)}{2}\\right) = \\left(\\frac{4}{2}, \\frac{4}{2}\\right) = (2, 2)',
    difficulty: 'medium',
    skills: ['geometria-punto-medio', 'geometria-plano-cartesiano', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-plano-2',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Área del triángulo con vértices en } A(0, 0), B(6, 0) \\text{ y } C(3, 4)',
    options: ['8', '10', '12', '16'],
    correctAnswer: 2,
    explanation: 'Área = ½|x₁(y₂-y₃) + x₂(y₃-y₁) + x₃(y₁-y₂)| = ½|0(0-4) + 6(4-0) + 3(0-0)| = ½|24| = 12',
    explanationLatex: 'A = \\frac{1}{2}|x_1(y_2-y_3) + x_2(y_3-y_1) + x_3(y_1-y_2)| = \\frac{1}{2}|24| = 12',
    difficulty: 'extreme',
    skills: ['geometria-area-triangulo', 'geometria-plano-cartesiano', 'geometria-formula-determinante', 'numeros-valor-absoluto', 'numeros-operaciones-basicas']
  }
];
