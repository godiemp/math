import { Question } from '../../../types';

/**
 * M1-GEO-004: Puntos y vectores en el plano
 * Chilean PAES Curriculum - Geometry Subsection 004
 *
 * This subsection covers:
 * - A: Sistema de coordenadas cartesianas
 * - B: Distancia entre dos puntos
 * - C: Punto medio de un segmento
 * - D: Vectores en el plano
 * - E: Operaciones con vectores
 *
 * Total: 4 questions
 */

export const m1Geo004Questions: Question[] = [
  // Questions migrated from M2 legacy files (plano-cartesiano.ts)
  {
    id: 'm2-4',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{La distancia entre los puntos } A(1, 2) \\text{ y } B(4, 6) \\text{ es:}',
    options: ['3', '4', '5', '7'],
    correctAnswer: 2,
    explanation: 'd = \\sqrt{(4-1)^2 + (6-2)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5',
    difficulty: 'medium',
    skills: ['geometria-plano-cartesiano', 'geometria-distancia', 'geometria-pitagoras', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-10',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Dos rectas son perpendiculares. Si una tiene pendiente } m = 2\\text{, ¿cuál es la pendiente de la otra?}',
    options: ['2', '-2', '\\frac{1}{2}', '-\\frac{1}{2}'],
    correctAnswer: 3,
    explanation: 'm_1 \\times m_2 = -1 \\quad \\Rightarrow \\quad 2 \\times m_2 = -1 \\quad \\Rightarrow \\quad m_2 = -\\frac{1}{2}',
    difficulty: 'medium',
    skills: ['geometria-rectas-perpendiculares', 'geometria-pendiente-perpendicular', 'algebra-funciones-lineales', 'algebra-pendiente', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-plano-1',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{El punto medio entre } A(-2, 5) \\text{ y } B(6, -1) \\text{ es:}',
    options: ['(2, 2)', '(4, 4)', '(2, 3)', '(4, 2)'],
    correctAnswer: 0,
    explanation: 'M = \\left(\\frac{-2+6}{2}, \\frac{5+(-1)}{2}\\right) = \\left(\\frac{4}{2}, \\frac{4}{2}\\right) = (2, 2)',
    difficulty: 'medium',
    skills: ['geometria-punto-medio', 'geometria-plano-cartesiano', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-plano-2',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Área del triángulo con vértices en } A(0, 0), B(6, 0) \\text{ y } C(3, 4)',
    options: ['8', '10', '12', '16'],
    correctAnswer: 2,
    explanation: 'A = \\frac{1}{2}|x_1(y_2-y_3) + x_2(y_3-y_1) + x_3(y_1-y_2)| = \\frac{1}{2}|24| = 12',
    difficulty: 'extreme',
    skills: ['geometria-area-triangulo', 'geometria-plano-cartesiano', 'geometria-formula-determinante', 'numeros-valor-absoluto', 'numeros-operaciones-basicas']
  }
];
