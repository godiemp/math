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

  // M2 Questions
  {
    id: 'm2-1',
    level: 'M2',
    topic: 'Límites y Derivadas',
    question: '¿Cuál es el límite de f(x) = (x² - 4)/(x - 2) cuando x → 2?',
    options: ['0', '2', '4', 'No existe'],
    correctAnswer: 2,
    explanation: 'Factorizando: (x² - 4)/(x - 2) = (x + 2)(x - 2)/(x - 2) = x + 2. Cuando x → 2, el límite es 4.',
    difficulty: 'medium'
  },
  {
    id: 'm2-2',
    level: 'M2',
    topic: 'Límites y Derivadas',
    question: 'La derivada de f(x) = x³ es:',
    options: ['x²', '2x²', '3x²', '3x³'],
    correctAnswer: 2,
    explanation: 'Usando la regla de potencias: d/dx(x³) = 3x²',
    difficulty: 'easy'
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
    question: 'En un triángulo, si dos lados miden 5 cm y 12 cm, y el ángulo entre ellos es 90°, ¿cuál es el área?',
    options: ['30 cm²', '60 cm²', '17 cm²', '85 cm²'],
    correctAnswer: 0,
    explanation: 'Área del triángulo rectángulo = (base × altura) / 2 = (5 × 12) / 2 = 30 cm²',
    difficulty: 'medium'
  },
  {
    id: 'm2-5',
    level: 'M2',
    topic: 'Cálculo Integral',
    question: '¿Cuál es la integral de f(x) = 2x?',
    options: ['x² + C', '2x² + C', 'x²/2 + C', '2'],
    correctAnswer: 0,
    explanation: '∫2x dx = 2 × (x²/2) + C = x² + C',
    difficulty: 'medium'
  },
  {
    id: 'm2-6',
    level: 'M2',
    topic: 'Límites y Derivadas',
    question: 'La derivada de f(x) = sin(x) es:',
    options: ['-cos(x)', 'cos(x)', '-sin(x)', 'tan(x)'],
    correctAnswer: 1,
    explanation: 'd/dx(sin(x)) = cos(x)',
    difficulty: 'easy'
  },
  {
    id: 'm2-7',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    question: 'En una distribución normal, ¿qué porcentaje de los datos está dentro de una desviación estándar de la media?',
    options: ['50%', '68%', '95%', '99%'],
    correctAnswer: 1,
    explanation: 'En una distribución normal, aproximadamente el 68% de los datos está dentro de ±1 desviación estándar.',
    difficulty: 'medium'
  },
  {
    id: 'm2-8',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    question: 'Si log₂(8) = x, entonces x es igual a:',
    options: ['2', '3', '4', '8'],
    correctAnswer: 1,
    explanation: 'log₂(8) = x significa 2ˣ = 8. Como 2³ = 8, entonces x = 3',
    difficulty: 'medium'
  },
  {
    id: 'm2-9',
    level: 'M2',
    topic: 'Cálculo Integral',
    question: '¿Cuál es el valor de ∫₀² x dx?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation: '∫₀² x dx = [x²/2]₀² = (4/2) - (0/2) = 2 - 0 = 2',
    difficulty: 'hard'
  },
  {
    id: 'm2-10',
    level: 'M2',
    topic: 'Límites y Derivadas',
    question: 'La pendiente de la recta tangente a f(x) = x² en el punto x = 3 es:',
    options: ['3', '6', '9', '12'],
    correctAnswer: 1,
    explanation: 'f\'(x) = 2x, entonces f\'(3) = 2(3) = 6',
    difficulty: 'medium'
  }
];

export function getQuestionsByLevel(level: 'M1' | 'M2'): Question[] {
  return questions.filter(q => q.level === level);
}

export function getQuestionsByTopic(topic: string): Question[] {
  return questions.filter(q => q.topic === topic);
}
