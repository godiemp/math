import { Question } from '../../../types';

/**
 * M1-ALG-008: Función potencia, raíz, valor absoluto
 * Chilean PAES Curriculum - Algebra Subsection 008
 *
 * This subsection covers:
 * - A: Funciones potencia f(x) = x^n
 * - B: Funciones raíz f(x) = ⁿ√x
 * - C: Funciones valor absoluto f(x) = |x|, f(x) = |ax + b|
 * - D: Dominio y rango de estas funciones
 * - E: Gráficas y propiedades
 *
 * Total: 20 questions
 */
export const m1Alg008Questions: Question[] = [
  // ========================================
  // FUNCIONES POTENCIA
  // ========================================
  {
    id: 'm1-alg008-1',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = x^3',
    questionLatex: '\\text{Un ingeniero modela el volumen de cubos de diferentes tamaños usando la función } f(x) = x^3, \\text{ donde x representa la medida del lado en centímetros. Si un cubo tiene un lado de 2 cm, ¿cuál es su volumen?}',
    options: ['4 cm³', '6 cm³', '8 cm³', '9 cm³'],
    correctAnswer: 2,
    explanation: 'f(2) = 2^3 = 8 \\text{ cm}^3',
    difficulty: 'easy',
    skills: ['algebra-funciones', 'algebra-funciones-potencia', 'algebra-evaluacion-funciones', 'numeros-potencias']
  },
  {
    id: 'm1-alg008-2',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = x^2',
    questionLatex: '\\text{La función } f(x) = x^2 \\text{ representa el área de un cuadrado de lado x. ¿Cuál es el dominio de esta función considerando que x representa una medida física?}',
    options: ['\\text{Todos los reales}', 'x \\geq 0', 'x > 0', 'x \\neq 0'],
    correctAnswer: 1,
    explanation: '\\text{Como x representa una longitud, debe ser } x \\geq 0',
    difficulty: 'medium',
    skills: ['algebra-funciones', 'algebra-funciones-potencia', 'algebra-dominio-rango']
  },
  {
    id: 'm1-alg008-3',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = x^4',
    questionLatex: '\\text{Sea } f(x) = x^4. \\text{ ¿Cuál de las siguientes afirmaciones es VERDADERA sobre esta función?}',
    options: ['f(-2) = -16', 'f(-2) = f(2)', 'f(-2) < f(2)', 'f(x) \\text{ puede ser negativo}'],
    correctAnswer: 1,
    explanation: 'f(-2) = (-2)^4 = 16 = 2^4 = f(2). \\text{ Las potencias pares son siempre positivas}',
    difficulty: 'medium',
    skills: ['algebra-funciones', 'algebra-funciones-potencia', 'algebra-evaluacion-funciones', 'numeros-potencias']
  },
  {
    id: 'm1-alg008-4',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = x^3',
    questionLatex: '\\text{Para la función } f(x) = x^3, \\text{ ¿cuál es el rango (conjunto de valores que puede tomar f)?}',
    options: ['y \\geq 0', 'y > 0', 'y \\leq 0', '\\text{Todos los reales}'],
    correctAnswer: 3,
    explanation: 'x^3 \\text{ puede tomar cualquier valor real: positivo, negativo o cero}',
    difficulty: 'medium',
    skills: ['algebra-funciones', 'algebra-funciones-potencia', 'algebra-dominio-rango']
  },
  {
    id: 'm1-alg008-5',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = x^2, g(x) = x^3',
    questionLatex: '\\text{Si } f(x) = x^2 \\text{ y } g(x) = x^3, \\text{ ¿para qué valores de x se cumple que } f(x) = g(x)?',
    options: ['x = 0 \\text{ solamente}', 'x = 1 \\text{ solamente}', 'x = 0 \\text{ y } x = 1', 'x = -1 \\text{ y } x = 1'],
    correctAnswer: 2,
    explanation: 'x^2 = x^3 \\Rightarrow x^2(1 - x) = 0 \\Rightarrow x = 0 \\text{ o } x = 1',
    difficulty: 'hard',
    skills: ['algebra-funciones', 'algebra-funciones-potencia', 'algebra-ecuaciones']
  },
  // ========================================
  // FUNCIONES RAÍZ
  // ========================================
  {
    id: 'm1-alg008-6',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = \\sqrt{x}',
    questionLatex: '\\text{La función } f(x) = \\sqrt{x} \\text{ modela la relación entre el área de un cuadrado y su lado. ¿Cuál es el dominio de esta función?}',
    options: ['\\text{Todos los reales}', 'x > 0', 'x \\geq 0', 'x \\neq 0'],
    correctAnswer: 2,
    explanation: '\\text{La raíz cuadrada está definida para } x \\geq 0',
    difficulty: 'easy',
    skills: ['algebra-funciones', 'algebra-funciones-raiz', 'algebra-dominio-rango', 'numeros-raices']
  },
  {
    id: 'm1-alg008-7',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = \\sqrt{x - 4}',
    questionLatex: '\\text{Una física modela la velocidad de un objeto con } f(x) = \\sqrt{x - 4}, \\text{ donde x es la energía en joules. ¿Cuál es el dominio de esta función?}',
    options: ['x \\geq 0', 'x \\geq 4', 'x > 4', 'x \\geq -4'],
    correctAnswer: 1,
    explanation: 'x - 4 \\geq 0 \\Rightarrow x \\geq 4',
    difficulty: 'medium',
    skills: ['algebra-funciones', 'algebra-funciones-raiz', 'algebra-dominio-rango', 'algebra-inecuaciones']
  },
  {
    id: 'm1-alg008-8',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = \\sqrt{x}',
    questionLatex: '\\text{¿Cuál es el rango de la función } f(x) = \\sqrt{x}?',
    options: ['y \\in \\mathbb{R}', 'y \\geq 0', 'y > 0', 'y \\leq 0'],
    correctAnswer: 1,
    explanation: '\\sqrt{x} \\geq 0 \\text{ para todo x en el dominio}',
    difficulty: 'easy',
    skills: ['algebra-funciones', 'algebra-funciones-raiz', 'algebra-dominio-rango']
  },
  {
    id: 'm1-alg008-9',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = \\sqrt[3]{x}',
    questionLatex: '\\text{La función } f(x) = \\sqrt[3]{x} \\text{ (raíz cúbica) tiene como dominio:}',
    options: ['x \\geq 0', 'x > 0', 'x \\neq 0', '\\text{Todos los reales}'],
    correctAnswer: 3,
    explanation: '\\text{La raíz cúbica está definida para todos los reales, incluso negativos}',
    difficulty: 'medium',
    skills: ['algebra-funciones', 'algebra-funciones-raiz', 'algebra-dominio-rango', 'numeros-raices']
  },
  {
    id: 'm1-alg008-10',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = \\sqrt{9 - x^2}',
    questionLatex: '\\text{¿Cuál es el dominio de la función } f(x) = \\sqrt{9 - x^2}?',
    options: ['x \\geq 3', 'x \\leq 3', '-3 \\leq x \\leq 3', 'x \\neq 3'],
    correctAnswer: 2,
    explanation: '9 - x^2 \\geq 0 \\Rightarrow x^2 \\leq 9 \\Rightarrow -3 \\leq x \\leq 3',
    difficulty: 'hard',
    skills: ['algebra-funciones', 'algebra-funciones-raiz', 'algebra-dominio-rango', 'algebra-inecuaciones']
  },
  // ========================================
  // FUNCIONES VALOR ABSOLUTO
  // ========================================
  {
    id: 'm1-alg008-11',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = |x|',
    questionLatex: '\\text{La función valor absoluto } f(x) = |x| \\text{ representa la distancia de x al origen. ¿Cuál es el valor de } f(-5)?',
    options: ['-5', '0', '5', '25'],
    correctAnswer: 2,
    explanation: 'f(-5) = |-5| = 5',
    difficulty: 'easy',
    skills: ['algebra-funciones', 'algebra-funciones-valor-absoluto', 'algebra-evaluacion-funciones', 'numeros-valor-absoluto']
  },
  {
    id: 'm1-alg008-12',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = |x|',
    questionLatex: '\\text{¿Cuál es el rango de la función } f(x) = |x|?',
    options: ['\\text{Todos los reales}', 'y > 0', 'y \\geq 0', 'y \\leq 0'],
    correctAnswer: 2,
    explanation: '|x| \\geq 0 \\text{ para todo x, y puede ser igual a 0 cuando } x = 0',
    difficulty: 'easy',
    skills: ['algebra-funciones', 'algebra-funciones-valor-absoluto', 'algebra-dominio-rango']
  },
  {
    id: 'm1-alg008-13',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = |x - 3|',
    questionLatex: '\\text{La función } f(x) = |x - 3| \\text{ mide la distancia entre x y el número 3. ¿Para qué valor de x la función vale 0?}',
    options: ['x = 0', 'x = -3', 'x = 3', '\\text{Ningún valor}'],
    correctAnswer: 2,
    explanation: '|x - 3| = 0 \\Rightarrow x - 3 = 0 \\Rightarrow x = 3',
    difficulty: 'easy',
    skills: ['algebra-funciones', 'algebra-funciones-valor-absoluto', 'algebra-ecuaciones']
  },
  {
    id: 'm1-alg008-14',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = |2x - 6|',
    questionLatex: '\\text{Un control de calidad mide la desviación de productos respecto al estándar usando } f(x) = |2x - 6|. \\text{ ¿Para qué valor de x la desviación es cero?}',
    options: ['x = 0', 'x = 2', 'x = 3', 'x = 6'],
    correctAnswer: 2,
    explanation: '|2x - 6| = 0 \\Rightarrow 2x - 6 = 0 \\Rightarrow x = 3',
    difficulty: 'medium',
    skills: ['algebra-funciones', 'algebra-funciones-valor-absoluto', 'algebra-ecuaciones-lineales']
  },
  {
    id: 'm1-alg008-15',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = |x| + 2',
    questionLatex: '\\text{¿Cuál es el valor mínimo que puede alcanzar la función } f(x) = |x| + 2?',
    options: ['0', '2', '-2', '\\text{No tiene mínimo}'],
    correctAnswer: 1,
    explanation: '|x| \\geq 0 \\Rightarrow |x| + 2 \\geq 2. \\text{ El mínimo es 2 cuando } x = 0',
    difficulty: 'medium',
    skills: ['algebra-funciones', 'algebra-funciones-valor-absoluto', 'algebra-dominio-rango']
  },
  {
    id: 'm1-alg008-16',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = -|x| + 4',
    questionLatex: '\\text{¿Cuál es el valor máximo que puede alcanzar la función } f(x) = -|x| + 4?',
    options: ['0', '4', '-4', '\\text{No tiene máximo}'],
    correctAnswer: 1,
    explanation: '-|x| \\leq 0 \\Rightarrow -|x| + 4 \\leq 4. \\text{ El máximo es 4 cuando } x = 0',
    difficulty: 'hard',
    skills: ['algebra-funciones', 'algebra-funciones-valor-absoluto', 'algebra-dominio-rango']
  },
  // ========================================
  // GRÁFICAS Y PROPIEDADES
  // ========================================
  {
    id: 'm1-alg008-17',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = |x|',
    questionLatex: '\\text{La gráfica de } f(x) = |x| \\text{ tiene forma de:}',
    options: ['U (parábola)', 'V', '\\text{Línea recta}', 'S'],
    correctAnswer: 1,
    explanation: '\\text{La función valor absoluto tiene forma de V con vértice en el origen}',
    difficulty: 'easy',
    skills: ['algebra-funciones', 'algebra-funciones-valor-absoluto', 'algebra-graficas']
  },
  {
    id: 'm1-alg008-18',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = |x - 2| + 1',
    questionLatex: '\\text{La gráfica de } f(x) = |x - 2| + 1 \\text{ es una V con vértice en:}',
    options: ['(0, 0)', '(2, 1)', '(-2, 1)', '(1, 2)'],
    correctAnswer: 1,
    explanation: '\\text{El vértice está en } (2, 1) \\text{ porque } |x-2| = 0 \\text{ cuando } x = 2, \\text{ y } f(2) = 1',
    difficulty: 'hard',
    skills: ['algebra-funciones', 'algebra-funciones-valor-absoluto', 'algebra-graficas', 'algebra-transformaciones']
  },
  {
    id: 'm1-alg008-19',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = x^2',
    questionLatex: '\\text{¿Cuál de estas funciones tiene su gráfica simétrica respecto al eje y?}',
    options: ['f(x) = x^3', 'f(x) = x^2', 'f(x) = \\sqrt{x}', 'f(x) = x + 1'],
    correctAnswer: 1,
    explanation: 'f(x) = x^2 \\text{ es par: } f(-x) = (-x)^2 = x^2 = f(x)',
    difficulty: 'medium',
    skills: ['algebra-funciones', 'algebra-funciones-potencia', 'algebra-simetria', 'algebra-graficas']
  },
  {
    id: 'm1-alg008-20',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = \\sqrt{x + 3}',
    questionLatex: '\\text{La gráfica de } f(x) = \\sqrt{x + 3} \\text{ comienza (tiene su punto más a la izquierda) en:}',
    options: ['(0, 0)', '(3, 0)', '(-3, 0)', '(0, 3)'],
    correctAnswer: 2,
    explanation: '\\text{El dominio comienza donde } x + 3 = 0, \\text{ es decir } x = -3. \\text{ Entonces } f(-3) = 0',
    difficulty: 'hard',
    skills: ['algebra-funciones', 'algebra-funciones-raiz', 'algebra-dominio-rango', 'algebra-graficas']
  }
];
