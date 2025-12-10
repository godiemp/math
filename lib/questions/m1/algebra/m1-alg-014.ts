import { Question } from '../../../types';

/**
 * M1-ALG-014: Aplicaciones de función cuadrática en distintos contextos
 * Chilean PAES Curriculum - Algebra Subsection 014
 *
 * This subsection covers:
 * - A: Problemas de optimización
 * - B: Problemas de movimiento parabólico
 * - C: Problemas de áreas y perímetros
 * - D: Problemas de economía y negocios
 *
 * Total: 20 questions
 */
export const m1Alg014Questions: Question[] = [
  // ========================================
  // PROBLEMAS DE OPTIMIZACIÓN
  // ========================================
  {
    id: 'm1-alg014-1',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'optimización',
    questionLatex: '\\text{La ganancia de una empresa está dada por } G(x) = -2x^2 + 40x - 150, \\text{ donde x es el precio. ¿Qué precio maximiza la ganancia?}',
    options: ['\\$5', '\\$10', '\\$15', '\\$20'],
    correctAnswer: 1,
    explanation: 'x = -\\frac{40}{2(-2)} = 10. \\text{ El precio que maximiza es } \\$10',
    difficulty: 'medium',
    difficultyScore: 0.51,
    skills: ['funcion-cuadratica-problemas-optimizacion', 'funcion-cuadratica-vertice']
  },
  {
    id: 'm1-alg014-2',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'optimización',
    questionLatex: '\\text{Se tienen 100 metros de cerca para encerrar un área rectangular pegada a una pared. Si } A(x) = x(100 - 2x), \\text{ ¿qué valor de x maximiza el área?}',
    options: ['20 m', '25 m', '30 m', '50 m'],
    correctAnswer: 1,
    explanation: 'A(x) = -2x^2 + 100x \\\\ x = -\\frac{100}{2(-2)} = 25 \\text{ m}',
    difficulty: 'hard',
    difficultyScore: 0.71,
    skills: ['funcion-cuadratica-problemas-optimizacion', 'funcion-cuadratica-vertice']
  },
  {
    id: 'm1-alg014-3',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'optimización',
    questionLatex: '\\text{La función } f(x) = -x^2 + 8x \\text{ representa la altura de un arco. ¿Cuál es la altura máxima?}',
    options: ['8', '12', '16', '20'],
    correctAnswer: 2,
    explanation: 'x = -\\frac{8}{-2} = 4 \\\\ f(4) = -16 + 32 = 16',
    difficulty: 'medium',
    difficultyScore: 0.51,
    skills: ['funcion-cuadratica-problemas-optimizacion', 'funcion-cuadratica-vertice']
  },
  {
    id: 'm1-alg014-4',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'optimización',
    questionLatex: '\\text{El costo de producción es } C(x) = x^2 - 20x + 150. \\text{ ¿Cuántas unidades minimizan el costo?}',
    options: ['5', '10', '15', '20'],
    correctAnswer: 1,
    explanation: 'x = -\\frac{-20}{2(1)} = 10 \\text{ unidades}',
    difficulty: 'medium',
    difficultyScore: 0.51,
    skills: ['funcion-cuadratica-problemas-optimizacion', 'funcion-cuadratica-vertice']
  },
  {
    id: 'm1-alg014-5',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'optimización',
    questionLatex: '\\text{La suma de dos números es 20. ¿Cuál es el producto máximo que pueden tener?}',
    options: ['96', '100', '104', '108'],
    correctAnswer: 1,
    explanation: '\\text{Si } x + y = 20, \\text{ entonces } P = x(20 - x) = -x^2 + 20x \\\\ x = 10 \\Rightarrow P = 100',
    difficulty: 'hard',
    difficultyScore: 0.71,
    skills: ['funcion-cuadratica-problemas-optimizacion', 'algebra-problemas-numeros']
  },
  // ========================================
  // PROBLEMAS DE MOVIMIENTO PARABÓLICO
  // ========================================
  {
    id: 'm1-alg014-6',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'movimiento',
    questionLatex: '\\text{La altura de una pelota es } h(t) = -5t^2 + 20t + 1 \\text{ metros. ¿Cuál es la altura máxima?}',
    options: ['20 m', '21 m', '25 m', '26 m'],
    correctAnswer: 1,
    explanation: 't = -\\frac{20}{-10} = 2 \\\\ h(2) = -20 + 40 + 1 = 21 \\text{ m}',
    difficulty: 'medium',
    difficultyScore: 0.51,
    skills: ['funcion-cuadratica-problemas-movimiento', 'funcion-cuadratica-vertice']
  },
  {
    id: 'm1-alg014-7',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'movimiento',
    questionLatex: '\\text{Un proyectil tiene altura } h(t) = -4.9t^2 + 19.6t. \\text{ ¿En qué tiempo alcanza su altura máxima?}',
    options: ['1 s', '2 s', '3 s', '4 s'],
    correctAnswer: 1,
    explanation: 't = -\\frac{19.6}{2(-4.9)} = \\frac{19.6}{9.8} = 2 \\text{ s}',
    difficulty: 'medium',
    difficultyScore: 0.51,
    skills: ['funcion-cuadratica-problemas-movimiento', 'funcion-cuadratica-vertice']
  },
  {
    id: 'm1-alg014-8',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'movimiento',
    questionLatex: '\\text{Una piedra se lanza hacia arriba con } h(t) = -5t^2 + 30t. \\text{ ¿Cuándo vuelve al suelo?}',
    options: ['3 s', '5 s', '6 s', '10 s'],
    correctAnswer: 2,
    explanation: '-5t^2 + 30t = 0 \\Rightarrow -5t(t - 6) = 0 \\Rightarrow t = 0 \\text{ o } t = 6 \\text{ s}',
    difficulty: 'medium',
    difficultyScore: 0.51,
    skills: ['funcion-cuadratica-problemas-movimiento', 'funcion-cuadratica-ceros']
  },
  {
    id: 'm1-alg014-9',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'movimiento',
    questionLatex: '\\text{La trayectoria de un balón es } y = -0.1x^2 + x + 2, \\text{ donde x es la distancia horizontal. ¿A qué altura comenzó?}',
    options: ['0 m', '1 m', '2 m', '10 m'],
    correctAnswer: 2,
    explanation: 'y(0) = -0 + 0 + 2 = 2 \\text{ m (altura inicial)}',
    difficulty: 'easy',
    difficultyScore: 0.31,
    skills: ['funcion-cuadratica-problemas-movimiento', 'algebra-evaluacion-funciones']
  },
  {
    id: 'm1-alg014-10',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'movimiento',
    questionLatex: '\\text{Un cohete tiene altura } h(t) = -2t^2 + 16t + 10. \\text{ ¿Cuándo estará a 10 m de altura nuevamente?}',
    options: ['t = 4 s', 't = 6 s', 't = 8 s', 't = 10 s'],
    correctAnswer: 2,
    explanation: '-2t^2 + 16t + 10 = 10 \\Rightarrow -2t^2 + 16t = 0 \\Rightarrow t(t - 8) = 0 \\\\ t = 0 \\text{ (inicio) o } t = 8 \\text{ s}',
    difficulty: 'hard',
    difficultyScore: 0.71,
    skills: ['funcion-cuadratica-problemas-movimiento', 'ecuaciones-cuadraticas-factorizacion']
  },
  // ========================================
  // PROBLEMAS DE ÁREAS Y PERÍMETROS
  // ========================================
  {
    id: 'm1-alg014-11',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'áreas',
    questionLatex: '\\text{Un rectángulo tiene perímetro 40 cm. Si su área es } A(x) = x(20 - x), \\text{ ¿cuáles dimensiones dan área máxima?}',
    options: ['5 \\times 15', '8 \\times 12', '10 \\times 10', '6 \\times 14'],
    correctAnswer: 2,
    explanation: 'A(x) = -x^2 + 20x \\text{ se maximiza en } x = 10 \\\\ \\text{El rectángulo es un cuadrado } 10 \\times 10',
    difficulty: 'medium',
    difficultyScore: 0.51,
    skills: ['funcion-cuadratica-problemas-areas', 'funcion-cuadratica-vertice']
  },
  {
    id: 'm1-alg014-12',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'áreas',
    questionLatex: '\\text{El área de un cuadrado de lado x es } A = x^2. \\text{ Si el lado aumenta 3 cm, el área nueva es:}',
    options: ['x^2 + 3', 'x^2 + 9', 'x^2 + 6x + 9', '(x + 3)x'],
    correctAnswer: 2,
    explanation: 'A_{nueva} = (x + 3)^2 = x^2 + 6x + 9',
    difficulty: 'easy',
    difficultyScore: 0.31,
    skills: ['funcion-cuadratica-problemas-areas', 'algebra-cuadrado-binomio']
  },
  {
    id: 'm1-alg014-13',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'áreas',
    questionLatex: '\\text{Un jardín rectangular tiene largo } (x + 5) \\text{ y ancho } x. \\text{ Si el área es 84 m², ¿cuánto mide el ancho?}',
    options: ['6 m', '7 m', '8 m', '9 m'],
    correctAnswer: 1,
    explanation: 'x(x + 5) = 84 \\Rightarrow x^2 + 5x - 84 = 0 \\Rightarrow (x + 12)(x - 7) = 0 \\\\ x = 7 \\text{ m (positivo)}',
    difficulty: 'hard',
    difficultyScore: 0.71,
    skills: ['funcion-cuadratica-problemas-areas', 'ecuaciones-cuadraticas-factorizacion']
  },
  {
    id: 'm1-alg014-14',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'áreas',
    questionLatex: '\\text{El área de un triángulo con base } 2x \\text{ y altura } x \\text{ es:}',
    options: ['x^2', '2x^2', 'x', '\\frac{x^2}{2}'],
    correctAnswer: 0,
    explanation: 'A = \\frac{1}{2} \\cdot base \\cdot altura = \\frac{1}{2} \\cdot 2x \\cdot x = x^2',
    difficulty: 'easy',
    difficultyScore: 0.31,
    skills: ['funcion-cuadratica-problemas-areas', 'geometria-area-triangulo']
  },
  {
    id: 'm1-alg014-15',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'áreas',
    questionLatex: '\\text{Un marco tiene dimensiones externas } 20 \\times 16 \\text{ cm. Si el ancho del marco es } x, \\text{ el área de la foto es:}',
    options: ['(20 - 2x)(16 - 2x)', '(20 - x)(16 - x)', '20 \\cdot 16 - x^2', '320 - 4x'],
    correctAnswer: 0,
    explanation: '\\text{Dimensiones internas: } (20 - 2x) \\times (16 - 2x) \\\\ A = (20 - 2x)(16 - 2x)',
    difficulty: 'hard',
    difficultyScore: 0.71,
    skills: ['funcion-cuadratica-problemas-areas', 'algebra-expresiones']
  },
  // ========================================
  // PROBLEMAS DE ECONOMÍA Y NEGOCIOS
  // ========================================
  {
    id: 'm1-alg014-16',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'economía',
    questionLatex: '\\text{Los ingresos por venta son } I(x) = -x^2 + 50x \\text{ donde x es el precio. ¿Qué precio maximiza los ingresos?}',
    options: ['\\$20', '\\$25', '\\$30', '\\$50'],
    correctAnswer: 1,
    explanation: 'x = -\\frac{50}{2(-1)} = 25',
    difficulty: 'medium',
    difficultyScore: 0.51,
    skills: ['funcion-cuadratica-problemas-economia', 'funcion-cuadratica-vertice']
  },
  {
    id: 'm1-alg014-17',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'economía',
    questionLatex: '\\text{La demanda de un producto es } D(p) = 100 - 2p. \\text{ Los ingresos } I = p \\cdot D(p) \\text{ se maximizan cuando } p =',
    options: ['\\$20', '\\$25', '\\$30', '\\$50'],
    correctAnswer: 1,
    explanation: 'I(p) = p(100 - 2p) = -2p^2 + 100p \\\\ p = -\\frac{100}{-4} = 25',
    difficulty: 'hard',
    difficultyScore: 0.71,
    skills: ['funcion-cuadratica-problemas-economia', 'funcion-cuadratica-vertice']
  },
  {
    id: 'm1-alg014-18',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'economía',
    questionLatex: '\\text{El beneficio es } B(x) = -3x^2 + 24x - 36. \\text{ ¿Cuántas unidades dan beneficio cero?}',
    options: ['x = 2 \\text{ y } x = 6', 'x = 3 \\text{ y } x = 4', 'x = 1 \\text{ y } x = 12', 'x = 4 \\text{ solamente}'],
    correctAnswer: 0,
    explanation: '-3x^2 + 24x - 36 = 0 \\Rightarrow x^2 - 8x + 12 = 0 \\Rightarrow (x - 2)(x - 6) = 0',
    difficulty: 'medium',
    difficultyScore: 0.51,
    skills: ['funcion-cuadratica-problemas-economia', 'ecuaciones-cuadraticas-factorizacion']
  },
  {
    id: 'm1-alg014-19',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'economía',
    questionLatex: '\\text{Una tienda baja el precio en \\$x y vende } (50 + x) \\text{ unidades. Los ingresos son } I = (100 - x)(50 + x). \\text{ ¿Qué descuento maximiza I?}',
    options: ['\\$10', '\\$20', '\\$25', '\\$30'],
    correctAnswer: 2,
    explanation: 'I = (100 - x)(50 + x) = 5000 + 100x - 50x - x^2 = -x^2 + 50x + 5000 \\\\ x = -\\frac{50}{-2} = 25',
    difficulty: 'hard',
    difficultyScore: 0.71,
    skills: ['funcion-cuadratica-problemas-economia', 'funcion-cuadratica-vertice']
  },
  {
    id: 'm1-alg014-20',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'economía',
    questionLatex: '\\text{El costo total es } C(x) = x^2 + 400 \\text{ y el ingreso es } I(x) = 50x. \\text{ ¿Para qué valores de x hay ganancia?}',
    options: ['10 < x < 40', '0 < x < 10', '5 < x < 20', '\\text{Nunca hay ganancia}'],
    correctAnswer: 0,
    explanation: 'G = I - C = 50x - x^2 - 400 = -x^2 + 50x - 400 > 0 \\\\ x^2 - 50x + 400 < 0 \\Rightarrow (x - 10)(x - 40) < 0 \\\\ \\text{Entre las raíces: } 10 < x < 40',
    difficulty: 'hard',
    difficultyScore: 0.71,
    skills: ['funcion-cuadratica-problemas-economia', 'algebra-inecuaciones']
  }
];
