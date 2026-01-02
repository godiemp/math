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
 * Total: 40 questions
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
    difficultyScore: 0.22,
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
    difficultyScore: 0.22,
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
    difficultyScore: 0.22,
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
    difficultyScore: 0.22,
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
    difficultyScore: 0.22,
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
    difficultyScore: 0.15,
    skills: ['probabilidad-casos-favorables', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-45',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En una urna hay 4 bolas blancas, 3 negras y 5 rojas. ¿Cuál es la probabilidad de sacar una bola blanca?}',
    options: ['\\frac{1}{4}', '\\frac{1}{3}', '\\frac{1}{2}', '\\frac{1}{12}'],
    correctAnswer: 1,
    explanation: 'P(\\text{blanca}) = \\frac{4}{12} = \\frac{1}{3}',
    difficulty: 'easy',
    difficultyScore: 0.22,
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
    difficultyScore: 0.22,
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
    difficultyScore: 0.22,
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
    difficultyScore: 0.22,
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
    difficultyScore: 0.22,
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
    difficultyScore: 0.18,
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
    difficulty: 'easy',
    difficultyScore: 0.28,
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
    difficulty: 'easy',
    difficultyScore: 0.28,
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
    difficulty: 'easy',
    difficultyScore: 0.25,
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
    difficultyScore: 0.15,
    skills: ['probabilidad-basica', 'numeros-porcentajes', 'numeros-decimales']
  },
  // ========================================
  // CONCEPTO DE PROBABILIDAD
  // ========================================
  {
    id: 'm1-prob-004-001',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{¿Cuál es el rango de valores posibles para una probabilidad?}',
    options: ['De -1 a 1', 'De 0 a 1', 'De 0 a 100', 'Cualquier número positivo'],
    correctAnswer: 1,
    explanation: '0 \\leq P(A) \\leq 1 \\text{ para cualquier evento } A',
    difficulty: 'easy',
    difficultyScore: 0.15,
    skills: ['probabilidad-basica', 'probabilidad-conceptos']
  },
  {
    id: 'm1-prob-004-002',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Si un evento es imposible, ¿cuál es su probabilidad?}',
    options: ['-1', '0', '0.5', '1'],
    correctAnswer: 1,
    explanation: 'P(\\text{evento imposible}) = 0',
    difficulty: 'easy',
    difficultyScore: 0.15,
    skills: ['probabilidad-basica', 'probabilidad-conceptos']
  },
  {
    id: 'm1-prob-004-003',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Si un evento es seguro (siempre ocurre), ¿cuál es su probabilidad?}',
    options: ['0', '0.5', '1', '100'],
    correctAnswer: 2,
    explanation: 'P(\\text{evento seguro}) = 1',
    difficulty: 'easy',
    difficultyScore: 0.15,
    skills: ['probabilidad-basica', 'probabilidad-conceptos']
  },
  {
    id: 'm1-prob-004-013',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un estudiante dice que la probabilidad de aprobar un examen es 1.2 porque estudió mucho. ¿Por qué esta afirmación es incorrecta?}',
    options: ['Porque 1.2 es muy alto', 'Porque la probabilidad máxima es 1', 'Porque debería expresarse como porcentaje', 'La afirmación es correcta'],
    correctAnswer: 1,
    explanation: '\\text{La probabilidad siempre está entre 0 y 1, nunca puede ser mayor que 1}',
    difficulty: 'easy',
    difficultyScore: 0.20,
    skills: ['probabilidad-basica', 'probabilidad-conceptos']
  },
  {
    id: 'm1-prob-004-014',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Si la probabilidad de que llueva mañana es 0.7, ¿qué tipo de evento es "que llueva mañana"?}',
    options: ['Evento imposible', 'Evento poco probable', 'Evento probable', 'Evento seguro'],
    correctAnswer: 2,
    explanation: 'P = 0.7 > 0.5 \\Rightarrow \\text{es un evento probable (más chance de ocurrir que no)}',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['probabilidad-basica', 'probabilidad-conceptos']
  },
  {
    id: 'm1-prob-004-015',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{¿Cuál de las siguientes NO puede ser una probabilidad válida?}',
    options: ['0.001', '\\frac{99}{100}', '-0.1', '0'],
    correctAnswer: 2,
    explanation: '-0.1 < 0 \\text{, pero las probabilidades deben ser } \\geq 0',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['probabilidad-basica', 'probabilidad-conceptos']
  },
  // ========================================
  // ESPACIO MUESTRAL Y EVENTOS
  // ========================================
  {
    id: 'm1-prob-004-004',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Al lanzar un dado y una moneda simultáneamente, ¿cuántos elementos tiene el espacio muestral?}',
    options: ['6', '8', '10', '12'],
    correctAnswer: 3,
    explanation: '|S| = 6 \\times 2 = 12 \\text{ resultados posibles}',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['probabilidad-espacio-muestral', 'probabilidad-conteo', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-prob-004-005',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Al lanzar un dado, el evento "obtener un número menor que 7" es un evento:}',
    options: ['Imposible', 'Poco probable', 'Muy probable', 'Seguro'],
    correctAnswer: 3,
    explanation: '\\text{Todos los resultados (1,2,3,4,5,6) son menores que 7} \\Rightarrow P = 1',
    difficulty: 'easy',
    difficultyScore: 0.15,
    skills: ['probabilidad-eventos', 'probabilidad-conceptos']
  },
  {
    id: 'm1-prob-004-016',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Al lanzar tres monedas simultáneamente, ¿cuántos elementos tiene el espacio muestral?}',
    options: ['3', '6', '8', '9'],
    correctAnswer: 2,
    explanation: '|S| = 2^3 = 8 \\text{ resultados posibles (CCC, CCS, CSC, CSS, SCC, SCS, SSC, SSS)}',
    difficulty: 'medium',
    difficultyScore: 0.35,
    skills: ['probabilidad-espacio-muestral', 'probabilidad-conteo']
  },
  {
    id: 'm1-prob-004-017',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Al lanzar dos dados, ¿cuántos elementos tiene el espacio muestral?}',
    options: ['12', '24', '36', '42'],
    correctAnswer: 2,
    explanation: '|S| = 6 \\times 6 = 36 \\text{ resultados posibles}',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['probabilidad-espacio-muestral', 'probabilidad-conteo', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-prob-004-018',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Al lanzar un dado, el evento "obtener un número mayor que 6" es un evento:}',
    options: ['Imposible', 'Poco probable', 'Muy probable', 'Seguro'],
    correctAnswer: 0,
    explanation: '\\text{Ningún resultado del dado es mayor que 6} \\Rightarrow P = 0 \\text{ (evento imposible)}',
    difficulty: 'easy',
    difficultyScore: 0.15,
    skills: ['probabilidad-eventos', 'probabilidad-conceptos']
  },
  // ========================================
  // PROBABILIDAD CLÁSICA
  // ========================================
  {
    id: 'm1-prob-004-006',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Al lanzar un dado, ¿cuál es la probabilidad de obtener un número impar?}',
    options: ['\\frac{1}{6}', '\\frac{1}{3}', '\\frac{1}{2}', '\\frac{2}{3}'],
    correctAnswer: 2,
    explanation: 'P(\\text{impar}) = \\frac{3}{6} = \\frac{1}{2} \\quad (\\text{impares: 1, 3, 5})',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['probabilidad-basica', 'probabilidad-casos-favorables', 'numeros-fracciones']
  },
  {
    id: 'm1-prob-004-007',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En una baraja de 52 cartas, ¿cuál es la probabilidad de sacar un as?}',
    options: ['\\frac{1}{52}', '\\frac{1}{13}', '\\frac{1}{4}', '\\frac{4}{13}'],
    correctAnswer: 1,
    explanation: 'P(\\text{as}) = \\frac{4}{52} = \\frac{1}{13}',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['probabilidad-basica', 'probabilidad-casos-favorables', 'numeros-fracciones']
  },
  {
    id: 'm1-prob-004-008',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En una baraja de 52 cartas, ¿cuál es la probabilidad de sacar una carta de corazones?}',
    options: ['\\frac{1}{52}', '\\frac{1}{13}', '\\frac{1}{4}', '\\frac{1}{2}'],
    correctAnswer: 2,
    explanation: 'P(\\text{corazón}) = \\frac{13}{52} = \\frac{1}{4}',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['probabilidad-basica', 'probabilidad-casos-favorables', 'numeros-fracciones']
  },
  {
    id: 'm1-prob-004-009',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Se elige un número al azar del 1 al 50. ¿Cuál es la probabilidad de que sea múltiplo de 10?}',
    options: ['\\frac{1}{50}', '\\frac{1}{10}', '\\frac{1}{5}', '\\frac{2}{5}'],
    correctAnswer: 1,
    explanation: 'P = \\frac{5}{50} = \\frac{1}{10} \\quad (\\text{múltiplos de 10: 10, 20, 30, 40, 50})',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['probabilidad-basica', 'probabilidad-casos-favorables', 'numeros-multiplos', 'numeros-fracciones']
  },
  {
    id: 'm1-prob-004-010',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una caja contiene 6 lápices rojos, 4 azules y 5 verdes. ¿Cuál es la probabilidad de sacar un lápiz verde?}',
    options: ['\\frac{1}{5}', '\\frac{1}{3}', '\\frac{2}{5}', '\\frac{5}{10}'],
    correctAnswer: 1,
    explanation: 'P(\\text{verde}) = \\frac{5}{6+4+5} = \\frac{5}{15} = \\frac{1}{3}',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['probabilidad-basica', 'probabilidad-casos-favorables', 'numeros-fracciones']
  },
  {
    id: 'm1-prob-004-019',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Al lanzar dos dados, ¿cuál es la probabilidad de que la suma sea 7?}',
    options: ['\\frac{1}{12}', '\\frac{1}{6}', '\\frac{5}{36}', '\\frac{7}{36}'],
    correctAnswer: 1,
    explanation: 'P(\\text{suma 7}) = \\frac{6}{36} = \\frac{1}{6} \\quad (\\text{combinaciones: 1-6, 2-5, 3-4, 4-3, 5-2, 6-1})',
    difficulty: 'medium',
    difficultyScore: 0.42,
    skills: ['probabilidad-basica', 'probabilidad-casos-favorables', 'numeros-fracciones', 'probabilidad-conteo']
  },
  {
    id: 'm1-prob-004-020',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En un grupo de 30 estudiantes, 18 son mujeres. Si se elige un estudiante al azar, ¿cuál es la probabilidad de que sea hombre?}',
    options: ['\\frac{2}{5}', '\\frac{3}{5}', '\\frac{1}{2}', '\\frac{12}{18}'],
    correctAnswer: 0,
    explanation: 'P(\\text{hombre}) = \\frac{30-18}{30} = \\frac{12}{30} = \\frac{2}{5}',
    difficulty: 'easy',
    difficultyScore: 0.25,
    skills: ['probabilidad-basica', 'probabilidad-casos-favorables', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-prob-004-021',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Se extrae una carta de una baraja de 52 cartas. ¿Cuál es la probabilidad de que sea una figura (J, Q, K)?}',
    options: ['\\frac{3}{52}', '\\frac{4}{13}', '\\frac{3}{13}', '\\frac{1}{4}'],
    correctAnswer: 2,
    explanation: 'P(\\text{figura}) = \\frac{12}{52} = \\frac{3}{13} \\quad (\\text{hay 4 de cada: J, Q, K})',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['probabilidad-basica', 'probabilidad-casos-favorables', 'numeros-fracciones']
  },
  // ========================================
  // PROBABILIDAD EXPERIMENTAL
  // ========================================
  {
    id: 'm1-prob-004-011',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Se lanzó una moneda 200 veces y salió cara 112 veces. ¿Cuál es la frecuencia relativa de obtener cara?}',
    options: ['0.44', '0.50', '0.56', '0.62'],
    correctAnswer: 2,
    explanation: 'f_r = \\frac{112}{200} = 0.56',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['probabilidad-experimental', 'estadistica-frecuencia', 'numeros-decimales']
  },
  {
    id: 'm1-prob-004-012',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En un experimento, un dado se lanzó 60 veces y el número 3 apareció 8 veces. ¿Cuál es la probabilidad experimental de obtener un 3?}',
    options: ['\\frac{1}{6}', '\\frac{2}{15}', '\\frac{1}{7}', '\\frac{1}{8}'],
    correctAnswer: 1,
    explanation: 'P_{exp} = \\frac{8}{60} = \\frac{2}{15}',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['probabilidad-experimental', 'numeros-fracciones']
  },
  {
    id: 'm1-prob-004-022',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En 500 lanzamientos de una moneda, salió cara 235 veces. ¿Cuál es la frecuencia relativa de obtener cara?}',
    options: ['0.43', '0.47', '0.50', '0.53'],
    correctAnswer: 1,
    explanation: 'f_r = \\frac{235}{500} = 0.47',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['probabilidad-experimental', 'estadistica-frecuencia', 'numeros-decimales']
  },
  {
    id: 'm1-prob-004-023',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Al lanzar un dado 120 veces, ¿cuántas veces esperarías obtener un 6 según la probabilidad teórica?}',
    options: ['6 veces', '12 veces', '20 veces', '24 veces'],
    correctAnswer: 2,
    explanation: 'E = n \\times P = 120 \\times \\frac{1}{6} = 20',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['probabilidad-experimental', 'probabilidad-basica', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-prob-004-024',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un jugador de basketball encesta 72 de 90 tiros libres. ¿Cuál es su probabilidad experimental de encestar un tiro libre?}',
    options: ['0.72', '0.75', '0.80', '0.85'],
    correctAnswer: 2,
    explanation: 'P_{exp} = \\frac{72}{90} = 0.80',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['probabilidad-experimental', 'numeros-decimales', 'numeros-fracciones']
  }
];
