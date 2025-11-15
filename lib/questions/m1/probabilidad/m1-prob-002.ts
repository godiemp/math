import { Question } from '../../../types';

/**
 * M1-PROB-002: Media, mediana, moda y rango de uno o más grupos de datos
 * Chilean PAES Curriculum - Probability and Statistics Subsection 002
 *
 * This subsection covers:
 * - A: Cálculo de la media aritmética
 * - B: Cálculo de la mediana
 * - C: Cálculo de la moda
 * - D: Cálculo del rango
 * - E: Comparación de grupos de datos
 *
 * Total: 24 questions
 */

export const m1Prob002Questions: Question[] = [
  {
    id: 'm1-8',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{La media aritmética de los números 4, 6, 8 y 10 es:}',
    options: ['6', '7', '8', '9'],
    correctAnswer: 1,
    explanation: '\\bar{x} = \\frac{4 + 6 + 8 + 10}{4} = \\frac{28}{4} = 7',
    difficulty: 'easy',
    skills: ['estadistica-media', 'numeros-operaciones-basicas', 'numeros-fracciones']
  },
  {
    id: 'm1-22',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{¿Cuál es la mediana del conjunto de datos: 3, 7, 5, 9, 11?}',
    options: ['5', '7', '9', '11'],
    correctAnswer: 1,
    explanation: '\\text{Mediana} = 7',
    difficulty: 'easy',
    skills: ['estadistica-mediana', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-23',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{¿Cuál es la moda del conjunto: 2, 3, 3, 5, 7, 3, 9?}',
    options: ['2', '3', '5', '7'],
    correctAnswer: 1,
    explanation: '\\text{Moda} = 3 \\text{ (aparece 3 veces)}',
    difficulty: 'easy',
    skills: ['estadistica-moda']
  },
  {
    id: 'm1-25',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{El rango del conjunto de datos 12, 8, 15, 20, 9 es:}',
    options: ['8', '9', '12', '12'],
    correctAnswer: 2,
    explanation: '\\text{Rango} = 20 - 8 = 12',
    difficulty: 'easy',
    skills: ['estadistica-rango', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-39',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{La media de 5, 8, 10 y 13 es:}',
    options: ['8', '9', '10', '11'],
    correctAnswer: 1,
    explanation: '\\bar{x} = \\frac{5 + 8 + 10 + 13}{4} = \\frac{36}{4} = 9',
    difficulty: 'easy',
    skills: ['estadistica-media', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-99',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Datos: 3, 7, 3, 9, 5, 3, 7, 5. ¿Dato más frecuente?}',
    options: ['3', '5', '7', '9'],
    correctAnswer: 0,
    explanation: '\\text{Dato más frecuente (moda)} = 3',
    difficulty: 'easy',
    skills: ['estadistica-moda', 'estadistica-frecuencia']
  },
  {
    id: 'm1-100',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Valor mínimo: 12, máximo: 48. ¿Rango?}',
    options: ['12', '24', '36', '48'],
    correctAnswer: 2,
    explanation: '\\text{Rango} = 48 - 12 = 36',
    difficulty: 'easy',
    skills: ['estadistica-rango', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-101',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Datos: 2, 4, 6, 8, 10, 12. ¿Mediana?}',
    options: ['6', '7', '8', '9'],
    correctAnswer: 1,
    explanation: '\\text{Mediana} = \\frac{6 + 8}{2} = 7',
    difficulty: 'easy',
    skills: ['estadistica-mediana', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-102',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Notas: 5.5, 6.0, 4.5, 6.5. ¿Promedio?}',
    options: ['5.0', '5.5', '5.625', '6.0'],
    correctAnswer: 2,
    explanation: '\\bar{x} = \\frac{5.5 + 6.0 + 4.5 + 6.5}{4} = \\frac{22.5}{4} = 5.625',
    difficulty: 'medium',
    skills: ['estadistica-media', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-103',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Promedio de 3 números es 12. Dos son 10 y 15. ¿Tercer número?}',
    options: ['9', '11', '13', '15'],
    correctAnswer: 1,
    explanation: '10 + 15 + x = 36 \\rightarrow x = 36 - 25 = 11',
    difficulty: 'medium',
    skills: ['estadistica-media', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-104',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{5 personas: 20, 22, 24, 26, 28. Entra una 6ta. Nuevo promedio: 25. ¿Edad de la nueva?}',
    options: ['28', '30', '32', '34'],
    correctAnswer: 1,
    explanation: 'x = 150 - 120 = 30',
    difficulty: 'hard',
    skills: ['estadistica-media', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-105',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Datos: 15, 8, 23, 12, 19. ¿Mediana?}',
    options: ['12', '15', '17', '19'],
    correctAnswer: 1,
    explanation: '\\text{Mediana} = 15',
    difficulty: 'easy',
    skills: ['estadistica-mediana', 'numeros-orden']
  },
  {
    id: 'm1-106',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Datos: 4, 7, 9, 11, 13, 15. ¿Mediana?}',
    options: ['9', '10', '11', '12'],
    correctAnswer: 1,
    explanation: '\\text{Mediana} = \\frac{9 + 11}{2} = 10',
    difficulty: 'easy',
    skills: ['estadistica-mediana', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-107',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Sueldos: 500, 520, 540, 560, 580, 600, 1200. ¿Medida más representativa?}',
    options: ['Media', 'Mediana', 'Moda', 'Rango'],
    correctAnswer: 1,
    explanation: '\\text{Mediana} = 560 \\text{ (más representativa que media} \\approx 643)',
    difficulty: 'hard',
    skills: ['estadistica-mediana', 'estadistica-media', 'estadistica-interpretacion']
  },
  {
    id: 'm1-108',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Datos: 1, 2, 2, 3, 3, 3, 4, 4, 5. ¿Moda?}',
    options: ['2', '3', '4', 'No hay moda'],
    correctAnswer: 1,
    explanation: '\\text{Moda} = 3',
    difficulty: 'easy',
    skills: ['estadistica-moda', 'estadistica-frecuencia']
  },
  {
    id: 'm1-109',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Datos: 5, 7, 5, 9, 7, 3, 5, 7. ¿Cuántas modas?}',
    options: ['0', '1', '2', '3'],
    correctAnswer: 2,
    explanation: '\\text{Dos modas: 5 y 7}',
    difficulty: 'medium',
    skills: ['estadistica-moda', 'estadistica-frecuencia']
  },
  {
    id: 'm1-110',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Si todos los valores aparecen una vez, ¿moda?}',
    options: ['El mayor', 'El menor', 'El promedio', 'No hay moda'],
    correctAnswer: 3,
    explanation: '\\text{No hay moda cuando todos tienen la misma frecuencia}',
    difficulty: 'easy',
    skills: ['estadistica-moda', 'estadistica-conceptos']
  },
  {
    id: 'm1-111',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Datos: 10, 10, 10, 10, 10. ¿Afirmación verdadera?}',
    options: ['Media = Mediana = Moda', 'Solo Media = Moda', 'Solo Media = Mediana', 'Todas son diferentes'],
    correctAnswer: 0,
    explanation: '\\text{Media} = \\text{Mediana} = \\text{Moda} = 10',
    difficulty: 'easy',
    skills: ['estadistica-media', 'estadistica-mediana', 'estadistica-moda', 'estadistica-conceptos']
  },
  {
    id: 'm1-112',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Datos: 2, 3, 4, 5, 6. ¿Correcto?}',
    options: ['Media = Mediana = 4', 'Media = 4, Mediana = 5', 'Media = 5, Mediana = 4', 'Media = Mediana = 5'],
    correctAnswer: 0,
    explanation: '\\text{Media} = \\frac{20}{5} = 4, \\quad \\text{Mediana} = 4',
    difficulty: 'easy',
    skills: ['estadistica-media', 'estadistica-mediana', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-113',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Si media >> mediana, ¿qué indica?}',
    options: ['Datos simétricos', 'Datos sesgados hacia la izquierda', 'Datos sesgados hacia la derecha', 'No se puede determinar'],
    correctAnswer: 2,
    explanation: '\\text{Hay valores extremos altos que elevan la media}',
    difficulty: 'hard',
    skills: ['estadistica-media', 'estadistica-mediana', 'estadistica-interpretacion']
  },
  {
    id: 'm1-114',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Notas: 50, 60, 70, 80, 90. Se agrega 100. ¿Qué pasa con la media?}',
    options: ['Disminuye', 'Se mantiene', 'Aumenta', 'Se duplica'],
    correctAnswer: 2,
    explanation: '\\text{Media original} = 70, \\quad \\text{Nueva media} = \\frac{450}{6} = 75',
    difficulty: 'medium',
    skills: ['estadistica-media', 'estadistica-interpretacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-115',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Promedios parciales: 5.0, 6.0, 7.0. Promedio final?}',
    options: ['5.5', '6.0', '6.5', '7.0'],
    correctAnswer: 1,
    explanation: '\\bar{x} = \\frac{5.0 + 6.0 + 7.0}{3} = 6.0',
    difficulty: 'easy',
    skills: ['estadistica-media', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-116',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Temperaturas: 20, 22, 21, 23, 22, 24, 22. ¿Más frecuente?}',
    options: ['20°C', '21°C', '22°C', '23°C'],
    correctAnswer: 2,
    explanation: '\\text{Moda} = 22°C',
    difficulty: 'easy',
    skills: ['estadistica-moda', 'estadistica-frecuencia']
  },
  {
    id: 'm1-117',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Datos: 15, 23, 18, 32, 27, 19. ¿Rango?}',
    options: ['15', '17', '19', '32'],
    correctAnswer: 1,
    explanation: '\\text{Rango} = 32 - 15 = 17',
    difficulty: 'easy',
    skills: ['estadistica-rango', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-118',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Si el rango es 0, ¿qué significa?}',
    options: ['Todos los datos son 0', 'Todos los datos son iguales', 'No hay datos', 'Hay un error'],
    correctAnswer: 1,
    explanation: '\\text{Todos los datos tienen el mismo valor}',
    difficulty: 'easy',
    skills: ['estadistica-rango', 'estadistica-conceptos']
  },
  {
    id: 'm1-119',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{A = \\{10, 15, 20\\}, B = \\{5, 15, 30\\}. ¿Mayor dispersión?}',
    options: ['A', 'B', 'Igual dispersión', 'No se puede determinar'],
    correctAnswer: 1,
    explanation: '\\text{Rango}_A = 10, \\quad \\text{Rango}_B = 25',
    difficulty: 'medium',
    skills: ['estadistica-rango', 'estadistica-dispersion', 'numeros-operaciones-basicas']
  }
];
