import { Question } from '../../../types';

/**
 * M1-ALG-005: Concepto de función
 * Chilean PAES Curriculum - Algebra Subsection 005
 *
 * This subsection covers:
 * - Definition of function (relation where each input has exactly one output)
 * - Domain and range concepts
 * - Function notation: f(x)
 * - Determining if a relation is a function
 * - Domain restrictions (denominators, square roots)
 * - Reading function values from graphs
 *
 * Total: 6 questions
 */

export const m1Alg005Questions: Question[] = [
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
  }
];
