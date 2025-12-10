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
 * Total: 20 questions
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
    difficulty: 'easy',
    difficultyScore: 0.28,
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
    difficulty: 'medium',
    difficultyScore: 0.45,
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
    difficulty: 'easy',
    difficultyScore: 0.28,
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
    difficulty: 'easy',
    difficultyScore: 0.28,
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
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['geometria-transformaciones', 'geometria-homotecia', 'geometria-plano-cartesiano', 'numeros-operaciones-basicas']
  },
  // ========================================
  // TRASLACIÓN DE FIGURAS
  // ========================================
  {
    id: 'm1-geo-005-001',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si el punto } P(2, -3) \\text{ se traslada según el vector } \\vec{v} = (4, 5)\\text{, ¿cuáles son las nuevas coordenadas?}',
    options: ['(6, 2)', '(-2, -8)', '(8, 15)', '(6, -2)'],
    correctAnswer: 0,
    explanation: 'P\' = P + \\vec{v} = (2+4, -3+5) = (6, 2)',
    difficulty: 'easy',
    difficultyScore: 0.25,
    skills: ['geometria-transformaciones', 'geometria-traslacion', 'geometria-plano-cartesiano', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-geo-005-002',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un triángulo tiene vértices en } A(1, 1), B(4, 1), C(2, 4)\\text{. Después de trasladarlo 2 unidades a la izquierda y 3 unidades arriba, ¿cuáles son las nuevas coordenadas de } A\\text{?}',
    options: ['(3, 4)', '(-1, 4)', '(-1, -2)', '(3, -2)'],
    correctAnswer: 1,
    explanation: 'A\' = (1-2, 1+3) = (-1, 4)',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['geometria-transformaciones', 'geometria-traslacion', 'geometria-plano-cartesiano', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-geo-005-003',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si } Q(-5, 2) \\text{ se traslada a } Q\'(1, -4)\\text{, ¿cuál es el vector de traslación?}',
    options: ['(6, -6)', '(-6, 6)', '(4, 2)', '(-4, -2)'],
    correctAnswer: 0,
    explanation: '\\vec{v} = Q\' - Q = (1-(-5), -4-2) = (6, -6)',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['geometria-transformaciones', 'geometria-traslacion', 'geometria-vectores', 'numeros-operaciones-basicas']
  },
  // ========================================
  // ROTACIÓN DE FIGURAS
  // ========================================
  {
    id: 'm1-geo-005-004',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si el punto } A(4, 0) \\text{ se rota } 90^\\circ \\text{ en sentido antihorario respecto al origen, ¿cuáles son las nuevas coordenadas?}',
    options: ['(0, 4)', '(0, -4)', '(-4, 0)', '(4, 4)'],
    correctAnswer: 0,
    explanation: '(x, y) \\xrightarrow{90^\\circ} (-y, x): (4, 0) \\to (0, 4)',
    difficulty: 'medium',
    difficultyScore: 0.42,
    skills: ['geometria-transformaciones', 'geometria-rotacion', 'geometria-plano-cartesiano']
  },
  {
    id: 'm1-geo-005-005',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si el punto } B(2, 3) \\text{ se rota } 180^\\circ \\text{ respecto al origen, ¿cuáles son las nuevas coordenadas?}',
    options: ['(3, 2)', '(-2, -3)', '(-3, -2)', '(2, -3)'],
    correctAnswer: 1,
    explanation: '(x, y) \\xrightarrow{180^\\circ} (-x, -y): (2, 3) \\to (-2, -3)',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['geometria-transformaciones', 'geometria-rotacion', 'geometria-plano-cartesiano']
  },
  {
    id: 'm1-geo-005-006',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si el punto } C(0, 5) \\text{ se rota } 270^\\circ \\text{ en sentido antihorario respecto al origen, ¿cuáles son las nuevas coordenadas?}',
    options: ['(5, 0)', '(-5, 0)', '(0, -5)', '(-5, 5)'],
    correctAnswer: 0,
    explanation: '(x, y) \\xrightarrow{270^\\circ} (y, -x): (0, 5) \\to (5, 0)',
    difficulty: 'medium',
    difficultyScore: 0.52,
    skills: ['geometria-transformaciones', 'geometria-rotacion', 'geometria-plano-cartesiano']
  },
  {
    id: 'm1-geo-005-007',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si un punto } (1, 0) \\text{ se rota } 90^\\circ \\text{ en sentido horario respecto al origen, ¿cuáles son las nuevas coordenadas?}',
    options: ['(0, 1)', '(0, -1)', '(-1, 0)', '(1, 1)'],
    correctAnswer: 1,
    explanation: '(x, y) \\xrightarrow{-90^\\circ} (y, -x): (1, 0) \\to (0, -1)',
    difficulty: 'medium',
    difficultyScore: 0.42,
    skills: ['geometria-transformaciones', 'geometria-rotacion', 'geometria-plano-cartesiano']
  },
  // ========================================
  // REFLEXIÓN DE FIGURAS
  // ========================================
  {
    id: 'm1-geo-005-008',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si el punto } E(-2, 7) \\text{ se refleja respecto al eje } x\\text{, ¿cuáles son las nuevas coordenadas?}',
    options: ['(-2, -7)', '(2, 7)', '(2, -7)', '(7, -2)'],
    correctAnswer: 0,
    explanation: '(x, y) \\xrightarrow{\\text{eje } x} (x, -y): (-2, 7) \\to (-2, -7)',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['geometria-transformaciones', 'geometria-reflexion', 'geometria-plano-cartesiano']
  },
  {
    id: 'm1-geo-005-009',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si el punto } F(6, -4) \\text{ se refleja respecto al eje } y\\text{, ¿cuáles son las nuevas coordenadas?}',
    options: ['(6, 4)', '(-6, -4)', '(-6, 4)', '(4, -6)'],
    correctAnswer: 1,
    explanation: '(x, y) \\xrightarrow{\\text{eje } y} (-x, y): (6, -4) \\to (-6, -4)',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['geometria-transformaciones', 'geometria-reflexion', 'geometria-plano-cartesiano']
  },
  {
    id: 'm1-geo-005-010',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si el punto } G(3, 5) \\text{ se refleja respecto al origen, ¿cuáles son las nuevas coordenadas?}',
    options: ['(-3, 5)', '(3, -5)', '(-3, -5)', '(5, 3)'],
    correctAnswer: 2,
    explanation: '(x, y) \\xrightarrow{\\text{origen}} (-x, -y): (3, 5) \\to (-3, -5)',
    difficulty: 'easy',
    difficultyScore: 0.30,
    skills: ['geometria-transformaciones', 'geometria-reflexion', 'geometria-plano-cartesiano']
  },
  {
    id: 'm1-geo-005-011',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si el punto } H(4, 1) \\text{ se refleja respecto a la recta } y = x\\text{, ¿cuáles son las nuevas coordenadas?}',
    options: ['(1, 4)', '(-4, -1)', '(-1, -4)', '(4, -1)'],
    correctAnswer: 0,
    explanation: '(x, y) \\xrightarrow{y=x} (y, x): (4, 1) \\to (1, 4)',
    difficulty: 'medium',
    difficultyScore: 0.45,
    skills: ['geometria-transformaciones', 'geometria-reflexion', 'geometria-plano-cartesiano']
  },
  // ========================================
  // COMPOSICIÓN DE TRANSFORMACIONES
  // ========================================
  {
    id: 'm1-geo-005-012',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si el punto } J(2, 3) \\text{ se refleja respecto al eje } x \\text{ y luego se traslada } (1, 2)\\text{, ¿cuáles son las coordenadas finales?}',
    options: ['(3, -1)', '(3, 5)', '(1, -1)', '(1, 5)'],
    correctAnswer: 0,
    explanation: 'J(2, 3) \\xrightarrow{\\text{eje } x} (2, -3) \\xrightarrow{+(1,2)} (3, -1)',
    difficulty: 'medium',
    difficultyScore: 0.52,
    skills: ['geometria-transformaciones', 'geometria-reflexion', 'geometria-traslacion', 'geometria-plano-cartesiano']
  },
  {
    id: 'm1-geo-005-013',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si el punto } K(1, 0) \\text{ se rota } 90^\\circ \\text{ antihorario y luego se rota otros } 90^\\circ \\text{ antihorario, ¿cuáles son las coordenadas finales?}',
    options: ['(0, 1)', '(0, -1)', '(-1, 0)', '(1, 0)'],
    correctAnswer: 2,
    explanation: 'K(1, 0) \\xrightarrow{90^\\circ} (0, 1) \\xrightarrow{90^\\circ} (-1, 0)',
    difficulty: 'medium',
    difficultyScore: 0.45,
    skills: ['geometria-transformaciones', 'geometria-rotacion', 'geometria-plano-cartesiano']
  },
  {
    id: 'm1-geo-005-014',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{¿Qué transformación lleva el punto } (x, y) \\text{ a } (x, -y)\\text{?}',
    options: ['Reflexión respecto al eje x', 'Reflexión respecto al eje y', 'Rotación de 90°', 'Traslación'],
    correctAnswer: 0,
    explanation: '(x, y) \\to (x, -y) \\text{ es reflexión respecto al eje } x',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['geometria-transformaciones', 'geometria-reflexion', 'geometria-conceptos']
  },
  {
    id: 'm1-geo-005-015',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si una homotecia de razón } k = \\frac{1}{2} \\text{ se aplica al punto } L(8, -6) \\text{ con centro en el origen, ¿cuáles son las nuevas coordenadas?}',
    options: ['(16, -12)', '(4, -3)', '(4, 3)', '(8, 3)'],
    correctAnswer: 1,
    explanation: 'L\' = \\frac{1}{2} \\cdot L = \\left(\\frac{1}{2}(8), \\frac{1}{2}(-6)\\right) = (4, -3)',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['geometria-transformaciones', 'geometria-homotecia', 'geometria-plano-cartesiano', 'numeros-fracciones']
  }
];
