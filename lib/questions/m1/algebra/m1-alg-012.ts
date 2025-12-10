import { Question } from '../../../types';

/**
 * M1-ALG-012: Función cuadrática: tablas y gráficos según parámetros
 * Chilean PAES Curriculum - Algebra Subsection 012
 *
 * This subsection covers:
 * - A: Forma general y estándar de función cuadrática
 * - B: Efecto del parámetro a en la parábola
 * - C: Efecto de los parámetros b y c
 * - D: Construcción de gráficos
 *
 * Total: 20 questions
 */
export const m1Alg012Questions: Question[] = [
  // ========================================
  // FORMA GENERAL Y ESTÁNDAR
  // ========================================
  {
    id: 'm1-alg012-1',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'forma-cuadrática',
    questionLatex: '\\text{La forma general de una función cuadrática es:}',
    options: ['f(x) = ax + b', 'f(x) = ax^2 + bx + c', 'f(x) = a(x - h)^2 + k', 'f(x) = ax^3 + bx^2 + c'],
    correctAnswer: 1,
    explanation: '\\text{La forma general es } f(x) = ax^2 + bx + c, \\text{ con } a \\neq 0.',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['funcion-cuadratica-forma']
  },
  {
    id: 'm1-alg012-2',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'forma-cuadrática',
    questionLatex: '\\text{La forma canónica (o estándar) de una función cuadrática es:}',
    options: ['f(x) = ax^2 + bx + c', 'f(x) = a(x - h)^2 + k', 'f(x) = (x - r_1)(x - r_2)', 'f(x) = ax^2'],
    correctAnswer: 1,
    explanation: '\\text{La forma canónica es } f(x) = a(x - h)^2 + k, \\text{ donde } (h, k) \\text{ es el vértice.}',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['funcion-cuadratica-forma']
  },
  {
    id: 'm1-alg012-3',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'forma-cuadrática',
    questionLatex: '\\text{En } f(x) = 3x^2 - 6x + 2, \\text{ identifica a, b y c.}',
    options: ['a = 3, b = 6, c = 2', 'a = 3, b = -6, c = 2', 'a = -3, b = 6, c = 2', 'a = 3, b = -6, c = -2'],
    correctAnswer: 1,
    explanation: '\\text{Comparando con } ax^2 + bx + c: a = 3, b = -6, c = 2',
    difficulty: 'easy',
    difficultyScore: 0.20,
    skills: ['funcion-cuadratica-forma']
  },
  {
    id: 'm1-alg012-4',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'forma-cuadrática',
    questionLatex: '\\text{Escribe } f(x) = 2(x - 3)^2 + 1 \\text{ en forma general.}',
    options: ['f(x) = 2x^2 - 12x + 19', 'f(x) = 2x^2 - 6x + 10', 'f(x) = 2x^2 - 12x + 10', 'f(x) = 2x^2 + 12x + 19'],
    correctAnswer: 0,
    explanation: 'f(x) = 2(x^2 - 6x + 9) + 1 = 2x^2 - 12x + 18 + 1 = 2x^2 - 12x + 19',
    difficulty: 'medium',
    difficultyScore: 0.42,
    skills: ['funcion-cuadratica-forma', 'algebra-cuadrado-binomio']
  },
  // ========================================
  // EFECTO DEL PARÁMETRO a
  // ========================================
  {
    id: 'm1-alg012-5',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'parámetro-a',
    questionLatex: '\\text{Si } a > 0 \\text{ en } f(x) = ax^2 + bx + c, \\text{ la parábola:}',
    options: [
      '\\text{Abre hacia abajo}',
      '\\text{Abre hacia arriba}',
      '\\text{Es una línea recta}',
      '\\text{No tiene vértice}'
    ],
    correctAnswer: 1,
    explanation: '\\text{Cuando } a > 0, \\text{ la parábola abre hacia arriba (tiene un mínimo).}',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['funcion-cuadratica-parametro-a', 'funcion-cuadratica-grafica']
  },
  {
    id: 'm1-alg012-6',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'parámetro-a',
    questionLatex: '\\text{Compara las parábolas } f(x) = x^2 \\text{ y } g(x) = 3x^2. \\text{ La parábola g es:}',
    options: [
      '\\text{Más ancha que f}',
      '\\text{Más angosta que f}',
      '\\text{Igual a f}',
      '\\text{Invertida respecto a f}'
    ],
    correctAnswer: 1,
    explanation: '\\text{Mayor valor de } |a| \\text{ hace la parábola más angosta.}',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['funcion-cuadratica-parametro-a', 'funcion-cuadratica-grafica']
  },
  {
    id: 'm1-alg012-7',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'parámetro-a',
    questionLatex: '\\text{Si } a < 0 \\text{ en una función cuadrática, el vértice es:}',
    options: [
      '\\text{Un punto mínimo}',
      '\\text{Un punto máximo}',
      '\\text{El origen}',
      '\\text{No existe}'
    ],
    correctAnswer: 1,
    explanation: '\\text{Cuando } a < 0, \\text{ la parábola abre hacia abajo, el vértice es un máximo.}',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['funcion-cuadratica-parametro-a', 'funcion-cuadratica-vertice']
  },
  {
    id: 'm1-alg012-8',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'parámetro-a',
    questionLatex: '\\text{¿Cuál parábola es más ancha?}',
    options: ['f(x) = 2x^2', 'f(x) = x^2', 'f(x) = \\frac{1}{2}x^2', 'f(x) = 4x^2'],
    correctAnswer: 2,
    explanation: '\\text{Menor valor de } |a| \\text{ produce parábola más ancha. } |\\frac{1}{2}| = 0.5 \\text{ es el menor.}',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['funcion-cuadratica-parametro-a', 'funcion-cuadratica-grafica']
  },
  // ========================================
  // EFECTO DE LOS PARÁMETROS b Y c
  // ========================================
  {
    id: 'm1-alg012-9',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'parámetro-c',
    questionLatex: '\\text{En } f(x) = x^2 + 5, \\text{ el valor de c representa:}',
    options: [
      '\\text{La pendiente}',
      '\\text{El vértice}',
      '\\text{La intersección con el eje y}',
      '\\text{Las raíces}'
    ],
    correctAnswer: 2,
    explanation: '\\text{Cuando } x = 0, f(0) = c. \\text{ Aquí } f(0) = 5, \\text{ corta al eje y en } (0, 5).',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['funcion-cuadratica-parametros-bc', 'funcion-cuadratica-interseccion-y']
  },
  {
    id: 'm1-alg012-10',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'parámetro-c',
    questionLatex: '\\text{Comparando } f(x) = x^2 \\text{ y } g(x) = x^2 + 3, \\text{ la parábola g está:}',
    options: [
      '\\text{Desplazada 3 unidades a la derecha}',
      '\\text{Desplazada 3 unidades a la izquierda}',
      '\\text{Desplazada 3 unidades hacia arriba}',
      '\\text{Desplazada 3 unidades hacia abajo}'
    ],
    correctAnswer: 2,
    explanation: '\\text{Sumar una constante desplaza la parábola verticalmente. } +3 \\text{ = hacia arriba.}',
    difficulty: 'easy',
    difficultyScore: 0.20,
    skills: ['funcion-cuadratica-parametros-bc', 'algebra-transformaciones']
  },
  {
    id: 'm1-alg012-11',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'parámetro-b',
    questionLatex: '\\text{El parámetro b en } f(x) = ax^2 + bx + c \\text{ afecta principalmente:}',
    options: [
      '\\text{La apertura de la parábola}',
      '\\text{La posición horizontal del vértice}',
      '\\text{La intersección con el eje y}',
      '\\text{El ancho de la parábola}'
    ],
    correctAnswer: 1,
    explanation: '\\text{La coordenada x del vértice es } h = -\\frac{b}{2a}, \\text{ que depende de b.}',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['funcion-cuadratica-parametros-bc', 'funcion-cuadratica-vertice']
  },
  {
    id: 'm1-alg012-12',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'parámetro-bc',
    questionLatex: '\\text{Si } f(x) = x^2 - 4x + 3, \\text{ ¿cuál es la intersección con el eje y?}',
    options: ['(0, -4)', '(0, 3)', '(3, 0)', '(0, 1)'],
    correctAnswer: 1,
    explanation: 'f(0) = 0 - 0 + 3 = 3. \\text{ La intersección es } (0, 3).',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['funcion-cuadratica-parametros-bc', 'funcion-cuadratica-interseccion-y']
  },
  // ========================================
  // CONSTRUCCIÓN DE GRÁFICOS
  // ========================================
  {
    id: 'm1-alg012-13',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'gráfico',
    questionLatex: '\\text{Para graficar } f(x) = x^2 - 2x - 3, \\text{ el primer paso es encontrar:}',
    options: [
      '\\text{La pendiente}',
      '\\text{El vértice}',
      '\\text{La asíntota}',
      '\\text{El período}'
    ],
    correctAnswer: 1,
    explanation: '\\text{El vértice es el punto clave para graficar una parábola.}',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['funcion-cuadratica-grafica', 'funcion-cuadratica-vertice']
  },
  {
    id: 'm1-alg012-14',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'gráfico',
    questionLatex: '\\text{¿Cuál tabla corresponde a } f(x) = x^2 - 1?',
    options: [
      'x: -2, -1, 0, 1, 2 \\text{ y } f(x): 3, 0, -1, 0, 3',
      'x: -2, -1, 0, 1, 2 \\text{ y } f(x): 5, 2, 1, 2, 5',
      'x: -2, -1, 0, 1, 2 \\text{ y } f(x): 3, 0, 1, 0, 3',
      'x: -2, -1, 0, 1, 2 \\text{ y } f(x): -3, 0, -1, 0, -3'
    ],
    correctAnswer: 0,
    explanation: 'f(-2) = 4 - 1 = 3, f(-1) = 1 - 1 = 0, f(0) = -1, f(1) = 0, f(2) = 3',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['funcion-cuadratica-grafica', 'algebra-evaluacion-funciones']
  },
  {
    id: 'm1-alg012-15',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'gráfico',
    questionLatex: '\\text{La parábola } f(x) = (x - 2)^2 \\text{ tiene su vértice en:}',
    options: ['(0, 0)', '(2, 0)', '(-2, 0)', '(0, 2)'],
    correctAnswer: 1,
    explanation: '\\text{En forma canónica } (x - h)^2 + k, \\text{ el vértice es } (h, k) = (2, 0).',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['funcion-cuadratica-grafica', 'funcion-cuadratica-vertice']
  },
  {
    id: 'm1-alg012-16',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'gráfico',
    questionLatex: '\\text{¿Cuál función tiene su vértice en } (1, -4)?',
    options: ['f(x) = (x - 1)^2 - 4', 'f(x) = (x + 1)^2 - 4', 'f(x) = (x - 1)^2 + 4', 'f(x) = (x + 4)^2 - 1'],
    correctAnswer: 0,
    explanation: '\\text{En } f(x) = (x - h)^2 + k, \\text{ vértice } (h, k) = (1, -4) \\Rightarrow f(x) = (x - 1)^2 - 4',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['funcion-cuadratica-grafica', 'funcion-cuadratica-vertice']
  },
  {
    id: 'm1-alg012-17',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'gráfico',
    questionLatex: '\\text{La parábola } f(x) = -x^2 + 4 \\text{ corta al eje x en:}',
    options: ['x = \\pm 2', 'x = \\pm 4', 'x = 2 \\text{ solamente}', '\\text{No corta al eje x}'],
    correctAnswer: 0,
    explanation: '-x^2 + 4 = 0 \\Rightarrow x^2 = 4 \\Rightarrow x = \\pm 2',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['funcion-cuadratica-grafica', 'funcion-cuadratica-ceros']
  },
  {
    id: 'm1-alg012-18',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'gráfico',
    questionLatex: '\\text{Si una parábola tiene vértice } (3, 5) \\text{ y } a = 2, \\text{ la función es:}',
    options: ['f(x) = 2(x - 3)^2 + 5', 'f(x) = 2(x + 3)^2 + 5', 'f(x) = 2(x - 5)^2 + 3', 'f(x) = 2(x - 3)^2 - 5'],
    correctAnswer: 0,
    explanation: '\\text{Con vértice } (h, k) = (3, 5): f(x) = 2(x - 3)^2 + 5',
    difficulty: 'easy',
    difficultyScore: 0.30,
    skills: ['funcion-cuadratica-grafica', 'funcion-cuadratica-forma']
  },
  {
    id: 'm1-alg012-19',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'gráfico',
    questionLatex: '\\text{La parábola } f(x) = x^2 + 2x + 1 \\text{ tiene:}',
    options: [
      '\\text{Dos intersecciones con el eje x}',
      '\\text{Una intersección con el eje x}',
      '\\text{Ninguna intersección con el eje x}',
      '\\text{Tres intersecciones}'
    ],
    correctAnswer: 1,
    explanation: 'x^2 + 2x + 1 = (x + 1)^2 = 0 \\Rightarrow x = -1 \\text{ (raíz doble)}',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['funcion-cuadratica-grafica', 'funcion-cuadratica-ceros']
  },
  {
    id: 'm1-alg012-20',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'gráfico',
    questionLatex: '\\text{El eje de simetría de } f(x) = x^2 - 6x + 5 \\text{ es:}',
    options: ['x = -3', 'x = 3', 'x = 5', 'x = -6'],
    correctAnswer: 1,
    explanation: '\\text{Eje de simetría: } x = -\\frac{b}{2a} = -\\frac{-6}{2} = 3',
    difficulty: 'easy',
    difficultyScore: 0.25,
    skills: ['funcion-cuadratica-grafica', 'funcion-cuadratica-simetria']
  }
];
