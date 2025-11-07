import { Question } from './types';

export const questions: Question[] = [
  // M1 Questions
  {
    id: 'm1-1',
    level: 'M1',
    topic: 'Números',
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
    topic: 'Números',
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

  // M2 Questions - Advanced topics for science/engineering careers
  {
    id: 'm2-1',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    question: 'Si log₂(8) = x, entonces x es igual a:',
    options: ['2', '3', '4', '8'],
    correctAnswer: 1,
    explanation: 'log₂(8) = x significa 2ˣ = 8. Como 2³ = 8, entonces x = 3',
    difficulty: 'medium'
  },
  {
    id: 'm2-2',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    question: 'Las raíces de la ecuación x² - 5x + 6 = 0 son:',
    options: ['x = 1, x = 6', 'x = 2, x = 3', 'x = -2, x = -3', 'x = 1, x = 5'],
    correctAnswer: 1,
    explanation: 'Factorizando: (x - 2)(x - 3) = 0, por lo tanto x = 2 o x = 3',
    difficulty: 'medium'
  },
  {
    id: 'm2-3',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    question: 'Si 2ˣ = 16, entonces x es igual a:',
    options: ['2', '3', '4', '8'],
    correctAnswer: 2,
    explanation: '2ˣ = 16 = 2⁴, por lo tanto x = 4. Es una función exponencial.',
    difficulty: 'easy'
  },
  {
    id: 'm2-4',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    question: 'El valor de log₁₀(100) es:',
    options: ['1', '2', '10', '100'],
    correctAnswer: 1,
    explanation: 'log₁₀(100) = log₁₀(10²) = 2',
    difficulty: 'easy'
  },
  {
    id: 'm2-5',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    question: 'Si f(x) = 3ˣ, ¿cuál es el valor de f(2)?',
    options: ['6', '8', '9', '12'],
    correctAnswer: 2,
    explanation: 'f(2) = 3² = 9. Es una función exponencial con base 3.',
    difficulty: 'easy'
  },
  {
    id: 'm2-6',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    question: 'En un triángulo rectángulo con hipotenusa 10 y un cateto 6, el valor de sen(θ) donde θ es el ángulo opuesto al cateto es:',
    options: ['0.6', '0.8', '6/10', 'Tanto A como C'],
    correctAnswer: 3,
    explanation: 'sen(θ) = cateto opuesto / hipotenusa = 6/10 = 0.6. Ambas formas son correctas.',
    difficulty: 'medium'
  },
  {
    id: 'm2-7',
    level: 'M2',
    topic: 'Geometría',
    question: 'El volumen de un cubo con arista de 4 cm es:',
    options: ['16 cm³', '24 cm³', '48 cm³', '64 cm³'],
    correctAnswer: 3,
    explanation: 'Volumen del cubo = arista³ = 4³ = 64 cm³',
    difficulty: 'easy'
  },
  {
    id: 'm2-8',
    level: 'M2',
    topic: 'Geometría',
    question: 'Un paralelepípedo tiene dimensiones 2 cm × 3 cm × 4 cm. Su volumen es:',
    options: ['9 cm³', '24 cm³', '26 cm³', '32 cm³'],
    correctAnswer: 1,
    explanation: 'Volumen = largo × ancho × alto = 2 × 3 × 4 = 24 cm³',
    difficulty: 'easy'
  },
  {
    id: 'm2-9',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    question: 'El promedio de los números 10, 15, 20, 25 y 30 es:',
    options: ['15', '20', '25', '30'],
    correctAnswer: 1,
    explanation: 'Promedio = (10 + 15 + 20 + 25 + 30) / 5 = 100 / 5 = 20',
    difficulty: 'easy'
  },
  {
    id: 'm2-10',
    level: 'M2',
    topic: 'Números',
    question: 'Inviertes $100,000 a una tasa de interés simple del 5% anual. ¿Cuánto dinero tendrás después de 2 años?',
    options: ['$105,000', '$110,000', '$115,000', '$120,000'],
    correctAnswer: 1,
    explanation: 'Interés simple = Capital × tasa × tiempo = 100,000 × 0.05 × 2 = 10,000. Total = 100,000 + 10,000 = $110,000',
    difficulty: 'medium'
  }
];

export function getQuestionsByLevel(level: 'M1' | 'M2'): Question[] {
  return questions.filter(q => q.level === level);
}

export function getQuestionsByTopic(topic: string): Question[] {
  return questions.filter(q => q.topic === topic);
}
