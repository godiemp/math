import { Question } from '../../../types';

/**
 * M1-PROB-004: Probabilidad de eventos
 * Chilean PAES Curriculum - Probability and Statistics Subsection 004
 *
 * This subsection covers:
 * - A: Concepto de probabilidad
 * - B: Espacio muestral y eventos
 * - C: Probabilidad clásica
 * - D: Probabilidad experimental
 *
 * Total: 16 questions
 */

export const m1Prob004Questions: Question[] = [
  {
    id: 'm1-4',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Al lanzar un dado de 6 caras, ¿cuál es la probabilidad de obtener un número par?}',
    options: ['\\frac{1}{6}', '\\frac{1}{3}', '\\frac{1}{2}', '\\frac{2}{3}'],
    correctAnswer: 2,
    explanation: 'P = \\frac{3}{6} = \\frac{1}{2}',
    difficulty: 'easy',
    skills: ['probabilidad-basica', 'probabilidad-casos-favorables', 'numeros-fracciones']
  },
  {
    id: 'm1-24',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En una bolsa hay 5 bolas rojas y 3 azules. ¿Cuál es la probabilidad de sacar una bola azul?}',
    options: ['\\frac{3}{5}', '\\frac{5}{8}', '\\frac{3}{8}', '\\frac{1}{3}'],
    correctAnswer: 2,
    explanation: 'P(\\text{azul}) = \\frac{3}{5+3} = \\frac{3}{8}',
    difficulty: 'easy',
    skills: ['probabilidad-basica', 'probabilidad-casos-favorables', 'numeros-fracciones']
  },
  {
    id: 'm1-41',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Al lanzar un dado, ¿cuál es la probabilidad de obtener un número mayor que 4?}',
    options: ['\\frac{1}{6}', '\\frac{1}{3}', '\\frac{1}{2}', '\\frac{2}{3}'],
    correctAnswer: 1,
    explanation: 'P = \\frac{2}{6} = \\frac{1}{3}',
    difficulty: 'easy',
    skills: ['probabilidad-basica', 'probabilidad-casos-favorables', 'numeros-fracciones']
  },
  {
    id: 'm1-42',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{¿Cuántos elementos tiene el espacio muestral al lanzar dos monedas?}',
    options: ['2', '3', '4', '5'],
    correctAnswer: 2,
    explanation: 'S = \\{CC, CS, SC, SS\\} \\rightarrow |S| = 4',
    difficulty: 'easy',
    skills: ['probabilidad-espacio-muestral', 'probabilidad-basica']
  },
  {
    id: 'm1-43',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Al lanzar un dado, ¿cuántos elementos tiene el evento "obtener un número primo"?}',
    options: ['2', '3', '4', '5'],
    correctAnswer: 1,
    explanation: 'A = \\{2, 3, 5\\} \\rightarrow |A| = 3',
    difficulty: 'easy',
    skills: ['probabilidad-eventos', 'probabilidad-espacio-muestral', 'numeros-primos']
  },
  {
    id: 'm1-44',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En una baraja de 52 cartas, ¿cuántas cartas son rojas?}',
    options: ['13', '20', '26', '39'],
    correctAnswer: 2,
    explanation: '13 + 13 = 26 \\text{ cartas rojas}',
    difficulty: 'easy',
    skills: ['probabilidad-casos-favorables', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-45',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En una urna hay 4 bolas blancas, 3 negras y 5 rojas. ¿Cuál es la probabilidad de sacar una bola blanca?}',
    options: ['\\frac{1}{4}', '\\frac{1}{3}', '\\frac{1}{2}', '\\frac{4}{12}'],
    correctAnswer: 1,
    explanation: 'P(\\text{blanca}) = \\frac{4}{12} = \\frac{1}{3}',
    difficulty: 'easy',
    skills: ['probabilidad-basica', 'probabilidad-casos-favorables', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-46',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Al lanzar un dado, ¿cuál es la probabilidad de obtener un múltiplo de 3?}',
    options: ['\\frac{1}{6}', '\\frac{1}{3}', '\\frac{1}{2}', '\\frac{2}{3}'],
    correctAnswer: 1,
    explanation: 'P = \\frac{2}{6} = \\frac{1}{3}',
    difficulty: 'easy',
    skills: ['probabilidad-basica', 'probabilidad-casos-favorables', 'numeros-multiplos', 'numeros-fracciones']
  },
  {
    id: 'm1-47',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En una baraja española (40 cartas), ¿cuál es la probabilidad de sacar un oro?}',
    options: ['\\frac{1}{10}', '\\frac{1}{4}', '\\frac{1}{5}', '\\frac{3}{10}'],
    correctAnswer: 1,
    explanation: 'P(\\text{oro}) = \\frac{10}{40} = \\frac{1}{4}',
    difficulty: 'easy',
    skills: ['probabilidad-basica', 'probabilidad-casos-favorables', 'numeros-fracciones']
  },
  {
    id: 'm1-48',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Si la probabilidad de lluvia es } \\frac{3}{10}, \\text{ ¿cuál es la probabilidad de que NO llueva?}',
    options: ['\\frac{3}{10}', '\\frac{7}{10}', '\\frac{1}{2}', '\\frac{2}{3}'],
    correctAnswer: 1,
    explanation: 'P(\\text{no lluvia}) = 1 - \\frac{3}{10} = \\frac{7}{10}',
    difficulty: 'easy',
    skills: ['probabilidad-complemento', 'probabilidad-basica', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-49',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Al lanzar un dado, ¿cuál es la probabilidad de NO obtener un 6?}',
    options: ['\\frac{1}{6}', '\\frac{1}{5}', '\\frac{5}{6}', '\\frac{2}{3}'],
    correctAnswer: 2,
    explanation: 'P(\\text{no 6}) = 1 - P(6) = 1 - \\frac{1}{6} = \\frac{5}{6}',
    difficulty: 'easy',
    skills: ['probabilidad-complemento', 'probabilidad-basica', 'numeros-fracciones']
  },
  {
    id: 'm1-50',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Si } P(A) = 0.35, \\text{ ¿cuál es } P(\\text{no } A)?',
    options: ['0.35', '0.50', '0.65', '0.75'],
    correctAnswer: 2,
    explanation: 'P(\\text{no } A) = 1 - P(A) = 1 - 0.35 = 0.65',
    difficulty: 'easy',
    skills: ['probabilidad-complemento', 'probabilidad-basica', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-51',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Se elige al azar un número del 1 al 20. ¿Cuál es la probabilidad de que sea divisible por 4?}',
    options: ['\\frac{1}{4}', '\\frac{1}{5}', '\\frac{1}{3}', '\\frac{3}{10}'],
    correctAnswer: 0,
    explanation: 'P = \\frac{5}{20} = \\frac{1}{4}',
    difficulty: 'medium',
    skills: ['probabilidad-basica', 'probabilidad-casos-favorables', 'numeros-divisores', 'numeros-fracciones']
  },
  {
    id: 'm1-52',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En una rifa con 100 boletos, ¿cuál es la probabilidad de ganar con un boleto que termina en 5?}',
    options: ['\\frac{1}{100}', '\\frac{1}{50}', '\\frac{1}{20}', '\\frac{1}{10}'],
    correctAnswer: 3,
    explanation: 'P = \\frac{10}{100} = \\frac{1}{10}',
    difficulty: 'medium',
    skills: ['probabilidad-basica', 'probabilidad-casos-favorables', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-53',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Se extrae una letra al azar de la palabra "MATEMÁTICA". ¿Cuál es la probabilidad de obtener una A?}',
    options: ['\\frac{1}{10}', '\\frac{2}{10}', '\\frac{3}{10}', '\\frac{4}{10}'],
    correctAnswer: 2,
    explanation: 'P(A) = \\frac{3}{10}',
    difficulty: 'medium',
    skills: ['probabilidad-basica', 'probabilidad-casos-favorables', 'numeros-fracciones']
  },
  {
    id: 'm1-80',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{60% estudia inglés, 40% francés. Probabilidad de elegir uno de inglés?}',
    options: ['0.4', '0.5', '0.6', '0.75'],
    correctAnswer: 2,
    explanation: 'P(\\text{inglés}) = 0.60',
    difficulty: 'easy',
    skills: ['probabilidad-basica', 'numeros-porcentajes', 'numeros-decimales']
  }
];
