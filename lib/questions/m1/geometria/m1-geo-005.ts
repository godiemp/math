import { Question } from '../../../types';

/**
 * M1-GEO-005: Rotación, traslación y reflexión de figuras geométricas
 * Chilean PAES Curriculum - Geometry Subsection 005
 *
 * This subsection covers:
 * - A: Traslación de figuras
 * - B: Rotación de figuras
 * - C: Reflexión de figuras
 * - D: Composición de transformaciones
 *
 * Total: 5 questions
 */

export const m1Geo005Questions: Question[] = [
  // Questions migrated from M2 legacy files (transformaciones.ts)
  {
    id: 'm2-geo-trans-1',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si el punto } A(3, 4) \\text{ se refleja respecto al eje } x\\text{, ¿coordenadas del punto reflejado?}',
    options: ['(3, -4)', '(-3, 4)', '(-3, -4)', '(4, 3)'],
    correctAnswer: 0,
    explanation: 'A(3, 4) \\xrightarrow{\\text{reflejo eje } x} A\'(3, -4)',
    difficulty: 'medium',
    skills: ['geometria-transformaciones', 'geometria-reflexion', 'geometria-plano-cartesiano']
  },
  {
    id: 'm2-geo-trans-2',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si un punto } (x, y) \\text{ se rota } 90^\\circ \\text{ en sentido antihorario respecto al origen, las nuevas coordenadas son:}',
    options: ['(-y, x)', '(y, -x)', '(-x, -y)', '(x, -y)'],
    correctAnswer: 0,
    explanation: '(x, y) \\xrightarrow{90^\\circ} (-y, x)',
    difficulty: 'hard',
    skills: ['geometria-transformaciones', 'geometria-rotacion', 'geometria-plano-cartesiano']
  },
  {
    id: 'm2-geo-trans-3',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si } B(-2, 5) \\text{ se traslada 3 unidades derecha y 2 abajo, ¿nuevas coordenadas?}',
    options: ['(1, 3)', '(-5, 7)', '(1, 7)', '(-5, 3)'],
    correctAnswer: 0,
    explanation: 'B(-2, 5) + (3, -2) = (-2+3, 5-2) = (1, 3)',
    difficulty: 'medium',
    skills: ['geometria-transformaciones', 'geometria-traslacion', 'geometria-plano-cartesiano', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-trans-4',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si } C(4, -3) \\text{ se refleja respecto al eje } y\\text{, ¿coordenadas del reflejo?}',
    options: ['(-4, -3)', '(4, 3)', '(-4, 3)', '(3, -4)'],
    correctAnswer: 0,
    explanation: 'C(4, -3) \\xrightarrow{\\text{reflejo eje } y} C\'(-4, -3)',
    difficulty: 'medium',
    skills: ['geometria-transformaciones', 'geometria-reflexion', 'geometria-plano-cartesiano']
  },
  {
    id: 'm2-geo-trans-5',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Homotecia de razón 2 en el origen a } D(3, 4)\\text{, ¿nuevas coordenadas?}',
    options: ['(6, 8)', '(1.5, 2)', '(5, 6)', '(3, 4)'],
    correctAnswer: 0,
    explanation: 'D(3, 4) \\xrightarrow{k=2} D\'(2 \\times 3, 2 \\times 4) = (6, 8)',
    difficulty: 'hard',
    skills: ['geometria-transformaciones', 'geometria-homotecia', 'geometria-plano-cartesiano', 'numeros-operaciones-basicas']
  }
];
