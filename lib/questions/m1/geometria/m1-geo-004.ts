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
 * Total: 19 questions
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
  },
  // ========================================
  // SISTEMA DE COORDENADAS CARTESIANAS
  // ========================================
  {
    id: 'm1-geo-004-001',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{¿En qué cuadrante se encuentra el punto } P(-3, 5)\\text{?}',
    options: ['Cuadrante I', 'Cuadrante II', 'Cuadrante III', 'Cuadrante IV'],
    correctAnswer: 1,
    explanation: 'x < 0 \\text{ e } y > 0 \\Rightarrow \\text{Cuadrante II}',
    difficulty: 'easy',
    skills: ['geometria-plano-cartesiano', 'geometria-cuadrantes']
  },
  {
    id: 'm1-geo-004-002',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si un punto } Q \\text{ tiene coordenadas } (4, -2)\\text{, ¿cuál es su distancia al origen?}',
    options: ['2', '\\sqrt{12}', '\\sqrt{20}', '6'],
    correctAnswer: 2,
    explanation: 'd = \\sqrt{4^2 + (-2)^2} = \\sqrt{16 + 4} = \\sqrt{20}',
    difficulty: 'medium',
    skills: ['geometria-plano-cartesiano', 'geometria-distancia', 'numeros-raices', 'numeros-potencias']
  },
  {
    id: 'm1-geo-004-003',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un punto } R \\text{ está sobre el eje } x \\text{ a 5 unidades del origen. ¿Cuáles son sus posibles coordenadas?}',
    options: ['(5, 0) \\text{ o } (-5, 0)', '(0, 5) \\text{ o } (0, -5)', '(5, 5) \\text{ o } (-5, -5)', '(5, 0) \\text{ únicamente}'],
    correctAnswer: 0,
    explanation: '\\text{Sobre el eje } x: y = 0. \\text{ A distancia 5: } x = \\pm 5',
    difficulty: 'easy',
    skills: ['geometria-plano-cartesiano', 'geometria-distancia']
  },
  // ========================================
  // DISTANCIA ENTRE DOS PUNTOS
  // ========================================
  {
    id: 'm1-geo-004-004',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{¿Cuál es la distancia entre } A(2, 3) \\text{ y } B(5, 7)\\text{?}',
    options: ['3', '4', '5', '7'],
    correctAnswer: 2,
    explanation: 'd = \\sqrt{(5-2)^2 + (7-3)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5',
    difficulty: 'easy',
    skills: ['geometria-plano-cartesiano', 'geometria-distancia', 'numeros-raices', 'numeros-potencias']
  },
  {
    id: 'm1-geo-004-005',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{La distancia entre } P(-1, 4) \\text{ y } Q(5, -4) \\text{ es:}',
    options: ['8', '10', '12', '14'],
    correctAnswer: 1,
    explanation: 'd = \\sqrt{(5-(-1))^2 + (-4-4)^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10',
    difficulty: 'medium',
    skills: ['geometria-plano-cartesiano', 'geometria-distancia', 'numeros-raices', 'numeros-potencias']
  },
  {
    id: 'm1-geo-004-006',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un triángulo tiene vértices en } A(0, 0), B(3, 0) \\text{ y } C(0, 4)\\text{. ¿Cuál es la longitud de la hipotenusa?}',
    options: ['3', '4', '5', '7'],
    correctAnswer: 2,
    explanation: 'd_{BC} = \\sqrt{(3-0)^2 + (0-4)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5',
    difficulty: 'medium',
    skills: ['geometria-plano-cartesiano', 'geometria-distancia', 'geometria-pitagoras', 'numeros-raices']
  },
  // ========================================
  // PUNTO MEDIO DE UN SEGMENTO
  // ========================================
  {
    id: 'm1-geo-004-007',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{¿Cuál es el punto medio del segmento con extremos } A(2, 6) \\text{ y } B(8, 2)\\text{?}',
    options: ['(4, 3)', '(5, 4)', '(6, 4)', '(3, 4)'],
    correctAnswer: 1,
    explanation: 'M = \\left(\\frac{2+8}{2}, \\frac{6+2}{2}\\right) = \\left(\\frac{10}{2}, \\frac{8}{2}\\right) = (5, 4)',
    difficulty: 'easy',
    skills: ['geometria-punto-medio', 'geometria-plano-cartesiano', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-geo-004-008',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si } M(3, 5) \\text{ es el punto medio de } \\overline{AB} \\text{ y } A(1, 2)\\text{, ¿cuáles son las coordenadas de } B\\text{?}',
    options: ['(2, 3.5)', '(4, 7)', '(5, 8)', '(5, 7)'],
    correctAnswer: 2,
    explanation: 'B_x = 2(3) - 1 = 5, \\quad B_y = 2(5) - 2 = 8 \\quad \\Rightarrow \\quad B(5, 8)',
    difficulty: 'medium',
    skills: ['geometria-punto-medio', 'geometria-plano-cartesiano', 'algebra-despeje']
  },
  {
    id: 'm1-geo-004-009',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{El punto medio de } \\overline{PQ} \\text{ es } (0, 0)\\text{. Si } P(-4, 3)\\text{, ¿cuáles son las coordenadas de } Q\\text{?}',
    options: ['(-4, -3)', '(4, 3)', '(4, -3)', '(-4, 3)'],
    correctAnswer: 2,
    explanation: 'Q_x = 2(0) - (-4) = 4, \\quad Q_y = 2(0) - 3 = -3 \\quad \\Rightarrow \\quad Q(4, -3)',
    difficulty: 'medium',
    skills: ['geometria-punto-medio', 'geometria-plano-cartesiano', 'algebra-despeje']
  },
  // ========================================
  // VECTORES EN EL PLANO
  // ========================================
  {
    id: 'm1-geo-004-010',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si } \\vec{u} = (3, 4)\\text{, ¿cuál es la magnitud de } \\vec{u}\\text{?}',
    options: ['5', '7', '12', '25'],
    correctAnswer: 0,
    explanation: '|\\vec{u}| = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5',
    difficulty: 'easy',
    skills: ['geometria-vectores', 'geometria-magnitud-vector', 'numeros-raices', 'numeros-potencias']
  },
  {
    id: 'm1-geo-004-011',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{El vector que va de } A(1, 2) \\text{ a } B(4, 6) \\text{ es:}',
    options: ['(5, 8)', '(3, 4)', '(-3, -4)', '(2.5, 4)'],
    correctAnswer: 1,
    explanation: '\\vec{AB} = B - A = (4-1, 6-2) = (3, 4)',
    difficulty: 'easy',
    skills: ['geometria-vectores', 'geometria-plano-cartesiano', 'numeros-operaciones-basicas']
  },
  // ========================================
  // OPERACIONES CON VECTORES
  // ========================================
  {
    id: 'm1-geo-004-012',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si } \\vec{u} = (2, 5) \\text{ y } \\vec{v} = (3, -1)\\text{, ¿cuál es } \\vec{u} + \\vec{v}\\text{?}',
    options: ['(5, 4)', '(-1, 6)', '(6, 4)', '(5, 6)'],
    correctAnswer: 0,
    explanation: '\\vec{u} + \\vec{v} = (2+3, 5+(-1)) = (5, 4)',
    difficulty: 'easy',
    skills: ['geometria-vectores', 'geometria-operaciones-vectores', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-geo-004-013',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si } \\vec{a} = (4, -2) \\text{ y } \\vec{b} = (1, 3)\\text{, ¿cuál es } \\vec{a} - \\vec{b}\\text{?}',
    options: ['(5, 1)', '(3, -5)', '(3, 1)', '(5, -5)'],
    correctAnswer: 1,
    explanation: '\\vec{a} - \\vec{b} = (4-1, -2-3) = (3, -5)',
    difficulty: 'easy',
    skills: ['geometria-vectores', 'geometria-operaciones-vectores', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-geo-004-014',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si } \\vec{v} = (2, -3)\\text{, ¿cuál es } 3\\vec{v}\\text{?}',
    options: ['(5, -6)', '(6, -9)', '(6, 9)', '(2, -9)'],
    correctAnswer: 1,
    explanation: '3\\vec{v} = 3(2, -3) = (6, -9)',
    difficulty: 'easy',
    skills: ['geometria-vectores', 'geometria-escalar-vector', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-geo-004-015',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{¿Cuál es la magnitud del vector } \\vec{w} = (-5, 12)\\text{?}',
    options: ['7', '13', '17', '\\sqrt{119}'],
    correctAnswer: 1,
    explanation: '|\\vec{w}| = \\sqrt{(-5)^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13',
    difficulty: 'medium',
    skills: ['geometria-vectores', 'geometria-magnitud-vector', 'numeros-raices', 'numeros-potencias']
  }
];
