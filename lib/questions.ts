import { Question } from './types';

export const questions: Question[] = [
  // M1 Questions
  {
    id: 'm1-1',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    question: 'Si 3 obreros construyen un muro en 12 días, ¿cuántos días tardarán 4 obreros en construir el mismo muro?',
    options: ['8 días', '9 días', '10 días', '16 días'],
    correctAnswer: 1,
    explanation: 'Es una proporción inversa. Si aumentan los obreros, disminuyen los días. 3 × 12 = 4 × x, entonces x = 36/4 = 9 días.',
    difficulty: 'easy'
  },
  {
    id: 'm1-2',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    question: 'Si f(x) = 2x + 3, ¿cuál es el valor de f(5)?',
    options: ['10', '11', '12', '13'],
    correctAnswer: 3,
    explanation: 'Sustituimos x = 5: f(5) = 2(5) + 3 = 10 + 3 = 13',
    difficulty: 'easy'
  },
  {
    id: 'm1-3',
    level: 'M1',
    topic: 'Geometría',
    question: 'Un triángulo rectángulo tiene catetos de 3 cm y 4 cm. ¿Cuál es la longitud de su hipotenusa?',
    options: ['5 cm', '6 cm', '7 cm', '8 cm'],
    correctAnswer: 0,
    explanation: 'Por el teorema de Pitágoras: h² = 3² + 4² = 9 + 16 = 25, entonces h = √25 = 5 cm',
    difficulty: 'easy'
  },
  {
    id: 'm1-4',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    question: 'Al lanzar un dado de 6 caras, ¿cuál es la probabilidad de obtener un número par?',
    options: ['1/6', '1/3', '1/2', '2/3'],
    correctAnswer: 2,
    explanation: 'Los números pares son 2, 4 y 6. Hay 3 casos favorables de 6 posibles: 3/6 = 1/2',
    difficulty: 'easy'
  },
  {
    id: 'm1-5',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    question: 'Resolver la ecuación: 2x - 5 = 11',
    options: ['x = 6', 'x = 7', 'x = 8', 'x = 9'],
    correctAnswer: 2,
    explanation: '2x - 5 = 11 → 2x = 16 → x = 8',
    difficulty: 'easy'
  },
  {
    id: 'm1-6',
    level: 'M1',
    topic: 'Geometría',
    question: 'El área de un círculo con radio 5 cm es aproximadamente (usar π ≈ 3.14):',
    options: ['31.4 cm²', '62.8 cm²', '78.5 cm²', '157 cm²'],
    correctAnswer: 2,
    explanation: 'A = πr² = 3.14 × 5² = 3.14 × 25 = 78.5 cm²',
    difficulty: 'medium'
  },
  {
    id: 'm1-7',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    question: 'El 25% de 80 es igual a:',
    options: ['15', '20', '25', '30'],
    correctAnswer: 1,
    explanation: '25% de 80 = 0.25 × 80 = 20',
    difficulty: 'easy'
  },
  {
    id: 'm1-8',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    question: 'La media aritmética de los números 4, 6, 8 y 10 es:',
    options: ['6', '7', '8', '9'],
    correctAnswer: 1,
    explanation: 'Media = (4 + 6 + 8 + 10) / 4 = 28 / 4 = 7',
    difficulty: 'easy'
  },

  // M2 Questions - Advanced PAES topics (NO calculus)
  {
    id: 'm2-1',
    level: 'M2',
    topic: 'Números',
    question: 'El mínimo común múltiplo (MCM) de 12, 18 y 24 es:',
    options: ['36', '48', '72', '144'],
    correctAnswer: 2,
    explanation: 'Factorizando: 12 = 2² × 3, 18 = 2 × 3², 24 = 2³ × 3. MCM = 2³ × 3² = 8 × 9 = 72',
    difficulty: 'medium'
  },
  {
    id: 'm2-2',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    question: 'Resuelve el sistema: 2x + y = 8 y x - y = 1',
    options: ['x = 2, y = 4', 'x = 3, y = 2', 'x = 4, y = 0', 'x = 1, y = 6'],
    correctAnswer: 1,
    explanation: 'Sumando las ecuaciones: 3x = 9, entonces x = 3. Sustituyendo: 3 - y = 1, entonces y = 2',
    difficulty: 'medium'
  },
  {
    id: 'm2-3',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    question: 'Las raíces de la ecuación x² - 5x + 6 = 0 son:',
    options: ['x = 1, x = 6', 'x = 2, x = 3', 'x = -2, x = -3', 'x = 1, x = 5'],
    correctAnswer: 1,
    explanation: 'Factorizando: (x - 2)(x - 3) = 0, por lo tanto x = 2 o x = 3',
    difficulty: 'medium'
  },
  {
    id: 'm2-4',
    level: 'M2',
    topic: 'Geometría',
    question: 'La distancia entre los puntos A(1, 2) y B(4, 6) es:',
    options: ['3', '4', '5', '7'],
    correctAnswer: 2,
    explanation: 'd = √[(4-1)² + (6-2)²] = √[3² + 4²] = √[9 + 16] = √25 = 5',
    difficulty: 'medium'
  },
  {
    id: 'm2-5',
    level: 'M2',
    topic: 'Geometría',
    question: 'El volumen de un cilindro con radio 3 cm y altura 4 cm es (usar π ≈ 3.14):',
    options: ['37.68 cm³', '75.36 cm³', '113.04 cm³', '150.72 cm³'],
    correctAnswer: 2,
    explanation: 'V = πr²h = 3.14 × 3² × 4 = 3.14 × 9 × 4 = 113.04 cm³',
    difficulty: 'medium'
  },
  {
    id: 'm2-6',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    question: 'El discriminante de x² + 4x + 1 = 0 es:',
    options: ['12', '16', '20', '8'],
    correctAnswer: 0,
    explanation: 'Discriminante = b² - 4ac = 4² - 4(1)(1) = 16 - 4 = 12. Como es > 0, hay dos soluciones reales.',
    difficulty: 'medium'
  },
  {
    id: 'm2-7',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    question: 'En el conjunto de datos {2, 4, 5, 7, 9, 10, 12}, el rango intercuartílico (IQR) es:',
    options: ['4', '5', '6', '7'],
    correctAnswer: 2,
    explanation: 'Q1 = 4, Q3 = 10. IQR = Q3 - Q1 = 10 - 4 = 6',
    difficulty: 'hard'
  },
  {
    id: 'm2-8',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    question: '¿De cuántas formas se pueden elegir 3 estudiantes de un grupo de 5?',
    options: ['10', '15', '20', '60'],
    correctAnswer: 0,
    explanation: 'Combinaciones: C(5,3) = 5!/(3!×2!) = (5×4)/(2×1) = 10',
    difficulty: 'medium'
  },
  {
    id: 'm2-9',
    level: 'M2',
    topic: 'Números',
    question: 'Racionaliza: 6/√3',
    options: ['2√3', '3√2', '6√3', '√18'],
    correctAnswer: 0,
    explanation: '6/√3 = (6/√3) × (√3/√3) = 6√3/3 = 2√3',
    difficulty: 'medium'
  },
  {
    id: 'm2-10',
    level: 'M2',
    topic: 'Geometría',
    question: 'Dos rectas son perpendiculares. Si una tiene pendiente m = 2, ¿cuál es la pendiente de la otra?',
    options: ['2', '-2', '1/2', '-1/2'],
    correctAnswer: 3,
    explanation: 'Rectas perpendiculares tienen pendientes que son recíprocas negativas: m₁ × m₂ = -1. Si m₁ = 2, entonces m₂ = -1/2',
    difficulty: 'medium'
  }
];

export function getQuestionsByLevel(level: 'M1' | 'M2'): Question[] {
  return questions.filter(q => q.level === level);
}

export function getQuestionsByTopic(topic: string): Question[] {
  return questions.filter(q => q.topic === topic);
}
