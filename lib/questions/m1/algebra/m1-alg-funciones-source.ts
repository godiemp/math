import { Question } from '../../../types';

/**
 * INTERNAL SOURCE FILE
 * Contains all function-related questions (14 total)
 * Split between M1-ALG-005 (concept - 6q) and M1-ALG-006 (linear - 8q)
 */
export const allFuncionesQuestions: Question[] = [
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
    id: 'm1-168',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: '\\text{Función: cada entrada tiene exactamente una salida}',
    questionLatex: '\\text{Un sistema de registro escolar asigna estudiantes a aulas. El sistema almacena pares ordenados donde el primer número es el ID del estudiante y el segundo es el número de aula. Para que el sistema funcione correctamente como una función, cada estudiante debe estar asignado adecuadamente. El administrador revisa cuatro conjuntos de asignaciones. ¿Cuál de las siguientes relaciones representa una asignación válida (es una función)?}',
    options: ['\\{(1, 2), (1, 3), (2, 4)\\}', '\\{(1, 2), (2, 2), (3, 4)\\}', '\\{(1, 2), (2, 3), (1, 4)\\}', '\\{(1, 2), (1, 5), (3, 2)\\}'],
    correctAnswer: 1,
    explanation: '\\text{En una función, cada valor de } x \\text{ tiene exactamente un valor de } y. \\text{ Solo B cumple.}',
    difficulty: 'easy',
    skills: ['algebra-funciones', 'algebra-relaciones-funciones']
  },
  {
    id: 'm1-169',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = 3x - 4',
    questionLatex: '\\text{Una fábrica calcula el costo de producción usando la función } f(x) = 3x - 4, \\text{ donde x representa las unidades producidas y f(x) el costo en miles de pesos. El gerente necesita determinar para qué valores de producción x está definida esta función, es decir, el dominio. ¿Cuál es el dominio de la función?}',
    options: ['Todos los números reales', 'Solo números positivos', 'Solo números mayores que 4', 'Solo números enteros'],
    correctAnswer: 0,
    explanation: '\\text{Dom}(f) = \\mathbb{R} \\text{ porque no hay restricciones para } x',
    difficulty: 'easy',
    skills: ['algebra-funciones', 'algebra-dominio-rango', 'algebra-funciones-lineales']
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
    id: 'm1-172',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = 7',
    questionLatex: '\\text{Un termostato automático está programado para mantener la temperatura de una habitación constante en 7 grados Celsius, sin importar la hora del día. Esta situación se modela con la función constante } f(x) = 7, \\text{ donde x representa las horas transcurridas y f(x) la temperatura. El técnico necesita identificar todos los valores posibles que puede tomar la temperatura, es decir, el rango de la función. ¿Cuál es el rango de } f(x) = 7?',
    options: ['\\{7\\}', '\\text{Todos los números reales}', '\\{0, 7\\}', '\\{x : x \\geq 7\\}'],
    correctAnswer: 0,
    explanation: '\\text{Para todo } x, f(x) = 7 \\quad \\Rightarrow \\quad \\text{Rango} = \\{7\\}',
    difficulty: 'medium',
    skills: ['algebra-funciones', 'algebra-dominio-rango', 'algebra-funciones-lineales']
  },
  {
    id: 'm1-174',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = \\frac{1}{x - 3}',
    questionLatex: '\\text{Una empresa de logística calcula el tiempo promedio de entrega usando la función } f(x) = \\frac{1}{x - 3}, \\text{ donde x representa el número de camiones disponibles y f(x) el tiempo en horas. El gerente necesita determinar para qué valores de x está definida esta función, considerando las restricciones matemáticas de este tipo de función. ¿Cuál es el dominio de } f(x) = \\frac{1}{x - 3}?',
    options: ['Todos los reales excepto 3', 'Todos los reales excepto 0', 'Todos los reales mayores que 3', 'Todos los reales'],
    correctAnswer: 0,
    explanation: 'x - 3 \\neq 0 \\quad \\Rightarrow \\quad x \\neq 3 \\quad \\therefore \\quad \\text{Dom}(f) = \\mathbb{R} - \\{3\\}',
    difficulty: 'medium',
    skills: ['algebra-funciones', 'algebra-dominio-rango', 'algebra-funciones-racionales']
  },
  {
    id: 'm1-175',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'g(x) = \\sqrt{x - 2}',
    questionLatex: '\\text{Un ingeniero civil diseña un puente cuya resistencia estructural se modela con la función } g(x) = \\sqrt{x - 2}, \\text{ donde x representa la carga en toneladas y g(x) un índice de seguridad. Considerando las restricciones de este tipo de función, el ingeniero necesita determinar para qué valores de carga x es válido el modelo. ¿Cuál es el dominio de } g(x) = \\sqrt{x - 2}?',
    options: ['$x \\geq 2$', '$x > 2$', '$x \\geq -2$', 'Todos los reales'],
    correctAnswer: 0,
    explanation: 'x - 2 \\geq 0 \\quad \\Rightarrow \\quad x \\geq 2 \\quad \\therefore \\quad \\text{Dom}(g) = [2, \\infty)',
    difficulty: 'hard',
    skills: ['algebra-funciones', 'algebra-dominio-rango', 'algebra-desigualdades', 'numeros-raices']
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
    id: 'm1-180',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: '\\text{Punto } (3, 7) \\text{ en gráfica}',
    questionLatex: '\\text{Un cartógrafo diseña un mapa digital usando un sistema de coordenadas. Cada punto en el mapa representa una ubicación única. Si la función f(x) representa la altitud en metros de una ubicación x, y la gráfica de f(x) pasa por el punto } (3, 7), \\text{ el cartógrafo necesita determinar el valor de la función en } x = 3. \\text{ ¿Cuál es el valor de } f(3)?',
    options: ['3', '7', '10', '21'],
    correctAnswer: 1,
    explanation: '\\text{El punto } (3, 7) \\text{ significa que cuando } x = 3, y = 7 \\quad \\therefore \\quad f(3) = 7',
    difficulty: 'easy',
    skills: ['algebra-funciones', 'algebra-evaluacion-funciones', 'algebra-graficas']
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
