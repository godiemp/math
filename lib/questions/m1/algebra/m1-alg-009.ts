import { Question } from '../../../types';

/**
 * M1-ALG-009: Función lineal y afín: concepto, tablas y gráficos
 * Chilean PAES Curriculum - Algebra Subsection 009
 *
 * This subsection covers:
 * - A: Concepto de función
 * - B: Función lineal y sus características
 * - C: Función afín y pendiente
 * - D: Gráficos de funciones lineales
 * - E: Tablas de valores
 *
 * Total: 20 questions
 */
export const m1Alg009Questions: Question[] = [
  // ========================================
  // CONCEPTO DE FUNCIÓN
  // ========================================
  {
    id: 'm1-alg009-1',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'función-concepto',
    questionLatex: '\\text{¿Cuál de las siguientes relaciones representa una función?}',
    options: [
      '\\{(1, 2), (1, 3), (2, 4)\\}',
      '\\{(1, 2), (2, 2), (3, 2)\\}',
      '\\{(1, 2), (1, 4), (1, 6)\\}',
      '\\{(2, 1), (2, 3), (2, 5)\\}'
    ],
    correctAnswer: 1,
    explanation: '\\text{Una función asigna a cada elemento del dominio un único valor. Solo la opción B cumple esto.}',
    difficulty: 'easy',
    skills: ['funcion-concepto', 'algebra-funciones']
  },
  {
    id: 'm1-alg009-2',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'función-concepto',
    questionLatex: '\\text{Si } f(x) = 2x + 3, \\text{ ¿cuál es el valor de } f(4)?',
    options: ['8', '9', '10', '11'],
    correctAnswer: 3,
    explanation: 'f(4) = 2(4) + 3 = 8 + 3 = 11',
    difficulty: 'easy',
    skills: ['funcion-concepto', 'algebra-evaluacion-funciones']
  },
  {
    id: 'm1-alg009-3',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'función-concepto',
    questionLatex: '\\text{El dominio de la función } f(x) = 3x - 1 \\text{ es:}',
    options: ['\\text{Solo positivos}', '\\text{Solo enteros}', '\\text{Todos los reales}', 'x \\geq 0'],
    correctAnswer: 2,
    explanation: '\\text{Una función lineal está definida para todos los números reales.}',
    difficulty: 'easy',
    skills: ['funcion-concepto', 'algebra-dominio-rango']
  },
  // ========================================
  // FUNCIÓN LINEAL Y SUS CARACTERÍSTICAS
  // ========================================
  {
    id: 'm1-alg009-4',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'función-lineal',
    questionLatex: '\\text{¿Cuál es la pendiente de la función } f(x) = 5x - 2?',
    options: ['-2', '2', '5', '-5'],
    correctAnswer: 2,
    explanation: '\\text{En } f(x) = mx + b, \\text{ la pendiente es } m. \\text{ Aquí } m = 5.',
    difficulty: 'easy',
    skills: ['funcion-lineal-concepto', 'funcion-afin-pendiente']
  },
  {
    id: 'm1-alg009-5',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'función-lineal',
    questionLatex: '\\text{Una función lineal que pasa por el origen tiene la forma:}',
    options: ['f(x) = mx + b, b \\neq 0', 'f(x) = mx', 'f(x) = b', 'f(x) = x + b'],
    correctAnswer: 1,
    explanation: '\\text{Si pasa por el origen, } f(0) = 0, \\text{ entonces } b = 0 \\text{ y } f(x) = mx.',
    difficulty: 'medium',
    skills: ['funcion-lineal-concepto', 'algebra-funciones']
  },
  {
    id: 'm1-alg009-6',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'función-lineal',
    questionLatex: '\\text{Si una función lineal tiene pendiente negativa, su gráfico:}',
    options: [
      '\\text{Es horizontal}',
      '\\text{Sube de izquierda a derecha}',
      '\\text{Baja de izquierda a derecha}',
      '\\text{Es vertical}'
    ],
    correctAnswer: 2,
    explanation: '\\text{Pendiente negativa significa que al aumentar x, f(x) disminuye.}',
    difficulty: 'easy',
    skills: ['funcion-lineal-concepto', 'funcion-lineal-grafica']
  },
  // ========================================
  // FUNCIÓN AFÍN Y PENDIENTE
  // ========================================
  {
    id: 'm1-alg009-7',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'función-afín',
    questionLatex: '\\text{¿Cuál es el coeficiente de posición (intersección con eje y) de } f(x) = -3x + 7?',
    options: ['-3', '3', '7', '-7'],
    correctAnswer: 2,
    explanation: '\\text{En } f(x) = mx + b, \\text{ el coeficiente de posición es } b. \\text{ Aquí } b = 7.',
    difficulty: 'easy',
    skills: ['funcion-afin-pendiente', 'funcion-lineal-concepto']
  },
  {
    id: 'm1-alg009-8',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'función-afín',
    questionLatex: '\\text{Calcula la pendiente de la recta que pasa por } (1, 3) \\text{ y } (4, 9).',
    options: ['1', '2', '3', '6'],
    correctAnswer: 1,
    explanation: 'm = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{9 - 3}{4 - 1} = \\frac{6}{3} = 2',
    difficulty: 'medium',
    skills: ['funcion-afin-pendiente', 'geometria-coordenadas']
  },
  {
    id: 'm1-alg009-9',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'función-afín',
    questionLatex: '\\text{¿Cuál es la ecuación de la recta con pendiente 3 que pasa por } (0, -2)?',
    options: ['y = 3x - 2', 'y = -2x + 3', 'y = 3x + 2', 'y = -3x - 2'],
    correctAnswer: 0,
    explanation: '\\text{Como pasa por } (0, -2), \\text{ el coeficiente de posición es } -2. \\\\ \\text{Con pendiente 3: } y = 3x - 2',
    difficulty: 'medium',
    skills: ['funcion-afin-pendiente', 'funcion-lineal-concepto']
  },
  {
    id: 'm1-alg009-10',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'función-afín',
    questionLatex: '\\text{Dos rectas son paralelas si:}',
    options: [
      '\\text{Tienen la misma pendiente}',
      '\\text{Tienen pendientes opuestas}',
      '\\text{Sus pendientes multiplican } -1',
      '\\text{Pasan por el mismo punto}'
    ],
    correctAnswer: 0,
    explanation: '\\text{Rectas paralelas tienen la misma pendiente pero diferente coeficiente de posición.}',
    difficulty: 'easy',
    skills: ['funcion-afin-pendiente', 'geometria-rectas']
  },
  // ========================================
  // GRÁFICOS DE FUNCIONES LINEALES
  // ========================================
  {
    id: 'm1-alg009-11',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'función-gráfico',
    questionLatex: '\\text{El gráfico de } f(x) = 2x + 1 \\text{ corta al eje y en:}',
    options: ['(0, 0)', '(0, 1)', '(0, 2)', '(1, 0)'],
    correctAnswer: 1,
    explanation: '\\text{El corte con el eje y ocurre cuando } x = 0: f(0) = 1. \\text{ Punto: } (0, 1)',
    difficulty: 'easy',
    skills: ['funcion-lineal-grafica', 'geometria-coordenadas']
  },
  {
    id: 'm1-alg009-12',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'función-gráfico',
    questionLatex: '\\text{El gráfico de } f(x) = 3x - 6 \\text{ corta al eje x en:}',
    options: ['(0, -6)', '(2, 0)', '(-2, 0)', '(6, 0)'],
    correctAnswer: 1,
    explanation: '\\text{El corte con el eje x ocurre cuando } f(x) = 0: \\\\ 3x - 6 = 0 \\Rightarrow x = 2. \\text{ Punto: } (2, 0)',
    difficulty: 'medium',
    skills: ['funcion-lineal-grafica', 'algebra-ecuaciones-lineales']
  },
  {
    id: 'm1-alg009-13',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'función-gráfico',
    questionLatex: '\\text{¿Cuál función tiene un gráfico que pasa por } (2, 7) \\text{ y } (0, 3)?',
    options: ['f(x) = 2x + 3', 'f(x) = 3x + 2', 'f(x) = 2x - 3', 'f(x) = x + 5'],
    correctAnswer: 0,
    explanation: '\\text{Como pasa por } (0, 3), b = 3. \\\\ m = \\frac{7 - 3}{2 - 0} = 2 \\\\ f(x) = 2x + 3',
    difficulty: 'medium',
    skills: ['funcion-lineal-grafica', 'funcion-afin-pendiente']
  },
  {
    id: 'm1-alg009-14',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'función-gráfico',
    questionLatex: '\\text{Si el gráfico de una función lineal pasa por } (-1, 4) \\text{ y } (1, 0), \\text{ ¿cuál es la pendiente?}',
    options: ['-4', '-2', '2', '4'],
    correctAnswer: 1,
    explanation: 'm = \\frac{0 - 4}{1 - (-1)} = \\frac{-4}{2} = -2',
    difficulty: 'medium',
    skills: ['funcion-lineal-grafica', 'funcion-afin-pendiente']
  },
  // ========================================
  // TABLAS DE VALORES
  // ========================================
  {
    id: 'm1-alg009-15',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'función-tabla',
    questionLatex: '\\text{Dada la tabla: } x: 0, 1, 2, 3 \\text{ y } f(x): 5, 7, 9, 11. \\text{ ¿Cuál es la fórmula?}',
    options: ['f(x) = x + 5', 'f(x) = 2x + 5', 'f(x) = 2x + 3', 'f(x) = x + 7'],
    correctAnswer: 1,
    explanation: '\\text{La diferencia constante es 2 (pendiente). Cuando } x = 0, f(0) = 5. \\\\ f(x) = 2x + 5',
    difficulty: 'medium',
    skills: ['funcion-lineal-tablas', 'algebra-patrones']
  },
  {
    id: 'm1-alg009-16',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'función-tabla',
    questionLatex: '\\text{Si } f(x) = 4x - 1, \\text{ completa la tabla para } x = 3: f(3) = ?',
    options: ['9', '10', '11', '12'],
    correctAnswer: 2,
    explanation: 'f(3) = 4(3) - 1 = 12 - 1 = 11',
    difficulty: 'easy',
    skills: ['funcion-lineal-tablas', 'algebra-evaluacion-funciones']
  },
  {
    id: 'm1-alg009-17',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'función-tabla',
    questionLatex: '\\text{Una tabla muestra que cuando } x \\text{ aumenta en 1, } f(x) \\text{ aumenta en 3. La pendiente es:}',
    options: ['1', '2', '3', '4'],
    correctAnswer: 2,
    explanation: '\\text{La pendiente es el cambio en f(x) dividido por el cambio en x: } m = \\frac{3}{1} = 3',
    difficulty: 'easy',
    skills: ['funcion-lineal-tablas', 'funcion-afin-pendiente']
  },
  {
    id: 'm1-alg009-18',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'función-tabla',
    questionLatex: '\\text{Dada la tabla: } x: -2, 0, 2, 4 \\text{ y } f(x): -7, -3, 1, 5. \\text{ ¿Cuál es } f(6)?',
    options: ['7', '8', '9', '10'],
    correctAnswer: 2,
    explanation: '\\text{Pendiente: } m = \\frac{-3 - (-7)}{0 - (-2)} = \\frac{4}{2} = 2 \\\\ f(x) = 2x - 3 \\Rightarrow f(6) = 12 - 3 = 9',
    difficulty: 'hard',
    skills: ['funcion-lineal-tablas', 'funcion-afin-pendiente']
  },
  {
    id: 'm1-alg009-19',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'función-tabla',
    questionLatex: '\\text{Si } f(2) = 10 \\text{ y } f(5) = 19 \\text{ para una función lineal, ¿cuánto vale } f(0)?',
    options: ['2', '4', '6', '8'],
    correctAnswer: 1,
    explanation: 'm = \\frac{19 - 10}{5 - 2} = 3 \\\\ 10 = 3(2) + b \\Rightarrow b = 4 \\\\ f(0) = 4',
    difficulty: 'hard',
    skills: ['funcion-lineal-tablas', 'funcion-afin-pendiente']
  },
  {
    id: 'm1-alg009-20',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'función-concepto',
    questionLatex: '\\text{¿Cuál de las siguientes NO es una función lineal?}',
    options: ['f(x) = 5x', 'f(x) = -2x + 1', 'f(x) = x^2 + 1', 'f(x) = \\frac{x}{3}'],
    correctAnswer: 2,
    explanation: 'f(x) = x^2 + 1 \\text{ es cuadrática, no lineal.}',
    difficulty: 'easy',
    skills: ['funcion-lineal-concepto', 'funcion-concepto']
  }
];
