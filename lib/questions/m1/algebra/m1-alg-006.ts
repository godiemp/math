import { Question } from '../../../types';

/**
 * M1-ALG-006: Función lineal y afín
 * Chilean PAES Curriculum - Algebra Subsection 006
 *
 * This subsection covers:
 * - Linear functions: f(x) = mx + b (m ≠ 0)
 * - Affine/constant functions: f(x) = b (m = 0)
 * - Slope and y-intercept
 * - Graphing linear functions
 * - Finding x and y intercepts
 * - Calculating slope from two points
 * - Writing equations from given information
 * - Applications and word problems
 *
 * Total: 8 questions
 */

export const m1Alg006Questions: Question[] = [
  {
    id: 'm1-2',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = 2x + 3',
    questionLatex: '\\text{Una empresa de transporte cobra una tarifa por viaje que se calcula mediante la función } f(x) = 2x + 3, \\text{ donde x representa los kilómetros recorridos y f(x) el costo total en dólares. Un cliente viajó exactamente 5 kilómetros en su último trayecto. El contador necesita calcular cuánto debe cobrar al cliente por este viaje. ¿Cuál es el valor de } f(5)?',
    options: ['10', '11', '12', '13'],
    correctAnswer: 3,
    explanation: 'f(5) = 2(5) + 3 = 10 + 3 = 13',
    difficulty: 'easy',
    skills: ['algebra-funciones', 'algebra-evaluacion-funciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-15',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'y = 3x - 2',
    questionLatex: '\\text{Un biólogo estudia el crecimiento de una planta que sigue un patrón lineal. La altura de la planta en centímetros se modela con la ecuación } y = 3x - 2, \\text{ donde x representa el número de semanas desde la siembra e y la altura. ¿Cuál es el valor de la pendiente de esta ecuación?}',
    options: ['-2', '2', '3', '-3'],
    correctAnswer: 2,
    explanation: 'y = 3x - 2 \\quad \\Rightarrow \\quad m = 3',
    difficulty: 'easy',
    skills: ['algebra-funciones', 'algebra-funciones-lineales', 'algebra-pendiente']
  },
  {
    id: 'm1-171',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = mx + b \\text{ con } m \\neq 0',
    questionLatex: '\\text{Un profesor de matemáticas explica diferentes tipos de funciones a sus estudiantes. Les presenta cuatro funciones y les pide identificar cuál es una función lineal, es decir, aquella que representa un crecimiento o decrecimiento constante. Los estudiantes deben analizar las expresiones y seleccionar la correcta. ¿Cuál de las siguientes funciones es una función lineal?}',
    options: ['f(x) = x^2 + 1', 'f(x) = 2x - 5', 'f(x) = \\frac{1}{x}', 'f(x) = 3'],
    correctAnswer: 1,
    explanation: 'f(x) = 2x - 5 \\text{ tiene la forma } mx + b \\text{ con } m = 2 \\text{ y } b = -5',
    difficulty: 'easy',
    skills: ['algebra-funciones', 'algebra-funciones-lineales']
  },
  {
    id: 'm1-177',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = 2x - 6',
    questionLatex: '\\text{Una tienda de bicicletas tiene una promoción donde el precio de venta se calcula con } f(x) = 2x - 6, \\text{ donde x representa el precio base en miles de pesos y f(x) el precio final. El gerente necesita saber cuál sería el precio final si el precio base fuera cero. ¿Cuál es el intercepto con el eje y de la función } f(x) = 2x - 6?',
    options: ['-6', '-3', '2', '6'],
    correctAnswer: 0,
    explanation: 'f(0) = 2(0) - 6 = -6 \\quad \\Rightarrow \\quad \\text{Intercepto en } (0, -6)',
    difficulty: 'easy',
    skills: ['algebra-funciones', 'algebra-interceptos', 'algebra-funciones-lineales']
  },
  {
    id: 'm1-178',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'g(x) = 3x + 9',
    questionLatex: '\\text{Un agricultor modela el balance de agua en un estanque con la función } g(x) = 3x + 9, \\text{ donde x representa los días transcurridos y g(x) el nivel de agua en metros. El agricultor necesita saber en qué día el estanque estará completamente vacío. ¿Cuál es el intercepto con el eje x de la función } g(x) = 3x + 9?',
    options: ['-3', '3', '9', '-9'],
    correctAnswer: 0,
    explanation: '3x + 9 = 0 \\rightarrow 3x = -9 \\rightarrow x = -3 \\quad \\Rightarrow \\quad \\text{Intercepto en } (-3, 0)',
    difficulty: 'easy',
    skills: ['algebra-funciones', 'algebra-interceptos', 'algebra-funciones-lineales', 'algebra-ecuaciones-lineales']
  },
  {
    id: 'm1-179',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'y = -2x + 8',
    questionLatex: '\\text{Una empresa de eventos organiza festivales al aire libre. El presupuesto restante después de x días de preparación se modela con la recta } y = -2x + 8, \\text{ donde y representa miles de dólares. El organizador necesita saber en qué día exacto el presupuesto se agotará completamente. ¿En qué punto la recta cruza el eje x?}',
    options: ['(4, 0)', '(0, 8)', '(-4, 0)', '(8, 0)'],
    correctAnswer: 0,
    explanation: '0 = -2x + 8 \\rightarrow 2x = 8 \\rightarrow x = 4 \\quad \\Rightarrow \\quad (4, 0)',
    difficulty: 'medium',
    skills: ['algebra-funciones', 'algebra-interceptos', 'algebra-funciones-lineales', 'algebra-ecuaciones-lineales']
  },
  {
    id: 'm1-181',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'y = mx + b \\text{ con } m = -1, b = 5',
    questionLatex: '\\text{Un economista modela el precio de un producto en el mercado. Observa que el precio disminuye linealmente con el tiempo. El precio inicial es 5 mil pesos. La disminución es de 1 mil pesos por mes. El economista necesita escribir la ecuación completa del modelo. ¿Cuál es su ecuación?}',
    options: ['y = -x + 5', 'y = x + 5', 'y = -x - 5', 'y = 5x - 1'],
    correctAnswer: 0,
    explanation: 'y = mx + b = -1 \\cdot x + 5 = -x + 5',
    difficulty: 'medium',
    skills: ['algebra-funciones', 'algebra-funciones-lineales', 'algebra-pendiente', 'algebra-interceptos']
  },
  {
    id: 'm1-182',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'm = \\frac{y_2 - y_1}{x_2 - x_1}',
    questionLatex: '\\text{Un ciclista registra su posición en una ruta. A los 2 minutos estaba en el kilómetro 5, representado por el punto } (2, 5). \\text{ A los 4 minutos estaba en el kilómetro 9, representado por el punto } (4, 9). \\text{ ¿Cuál es el valor de la pendiente m de la recta que pasa por estos dos puntos?}',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation: 'm = \\frac{9 - 5}{4 - 2} = \\frac{4}{2} = 2',
    difficulty: 'hard',
    skills: ['algebra-funciones', 'algebra-funciones-lineales', 'algebra-pendiente', 'numeros-fracciones', 'numeros-operaciones-basicas']
  }
];
