import { Question } from '../../../types';

/**
 * M2-ALG-003: Problemas que involucren la función potencia en distintos contextos
 *
 * Subsections:
 * A. Modelamiento con funciones potencia
 *    Habilidades: funcion-potencia-modelamiento
 * B. Problemas de variación
 *    Habilidades: funcion-potencia-problemas-variacion
 * C. Aplicaciones en física y geometría
 *    Habilidades: funcion-potencia-problemas-fisica
 * D. Interpretación de gráficos
 *    Habilidades: funcion-potencia-problemas-interpretacion
 */

export const m2Alg003Questions: Question[] = [
  {
    id: 'm2-alg-pot-prob-1',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Área de cuadrado: } A(l) = l^2. \\text{ Si } l = 5\\text{ cm, ¿área?}',
    options: ['10\\text{ cm}^2', '20\\text{ cm}^2', '25\\text{ cm}^2', '50\\text{ cm}^2'],
    correctAnswer: 2,
    explanation: 'A(5) = 5^2 = 25\\text{ cm}^2',
    difficulty: 'easy',
    skills: ['funcion-potencia-modelamiento', 'algebra-funcion-potencia', 'algebra-modelamiento', 'geometria-area', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-pot-prob-2',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Si } V(a) = a^3 \\text{ y duplicamos } a, \\text{ ¿cómo cambia } V?',
    options: ['\\text{Se duplica}', '\\text{Se triplica}', '\\text{Se cuadruplica}', '\\text{Se multiplica por 8}'],
    correctAnswer: 3,
    explanation: 'V(2a) = (2a)^3 = 8a^3 = 8 \\cdot V(a)',
    difficulty: 'medium',
    skills: ['funcion-potencia-modelamiento', 'funcion-potencia-problemas-variacion', 'algebra-funcion-potencia', 'algebra-modelamiento', 'geometria-volumen', 'numeros-potencias', 'algebra-variacion']
  },
  {
    id: 'm2-alg-pot-prob-3',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Si } I(d) = \\frac{k}{d^2} \\text{ y } I(2) = 100, \\text{ ¿cuál es } k?',
    options: ['50', '100', '200', '400'],
    correctAnswer: 3,
    explanation: '100 = \\frac{k}{2^2} \\rightarrow k = 100 \\times 4 = 400',
    difficulty: 'hard',
    skills: ['funcion-potencia-modelamiento', 'funcion-potencia-problemas-fisica', 'algebra-funcion-potencia', 'algebra-modelamiento', 'algebra-despeje', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-pot-prob-4',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Si se cuadruplica } L \\text{ en } T(L) = 2\\pi\\sqrt{\\frac{L}{g}}, \\text{ ¿cómo cambia } T?',
    options: ['\\text{Se cuadruplica}', '\\text{Se duplica}', '\\text{Se mantiene igual}', '\\text{Se divide por 2}'],
    correctAnswer: 1,
    explanation: 'T(4L) = 2\\pi\\sqrt{\\frac{4L}{g}} = 2\\pi \\cdot 2\\sqrt{\\frac{L}{g}} = 2 \\cdot T(L)',
    difficulty: 'extreme',
    skills: ['funcion-potencia-problemas-fisica', 'funcion-potencia-problemas-variacion', 'algebra-funcion-potencia', 'algebra-modelamiento', 'algebra-variacion', 'numeros-raices', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-pot-prob-5',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Si } E(v) = \\frac{1}{2}mv^2 \\text{ y } v \\to \\frac{v}{2}, \\text{ ¿qué \\% de energía se pierde?}',
    options: ['25\\%', '50\\%', '75\\%', '90\\%'],
    correctAnswer: 2,
    explanation: 'E\\left(\\frac{v}{2}\\right) = \\frac{1}{2}m\\left(\\frac{v}{2}\\right)^2 = \\frac{1}{4}E(v) \\rightarrow \\text{pierde } 75\\%',
    difficulty: 'hard',
    skills: ['funcion-potencia-problemas-fisica', 'funcion-potencia-problemas-variacion', 'algebra-funcion-potencia', 'algebra-modelamiento', 'algebra-variacion', 'numeros-porcentaje', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-pot-prob-6',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Si } S(r) = 4\\pi r^2 \\text{ y } r: 3 \\to 6\\text{ cm, ¿factor de aumento?}',
    options: ['2\\text{ veces}', '3\\text{ veces}', '4\\text{ veces}', '6\\text{ veces}'],
    correctAnswer: 2,
    explanation: '\\frac{S(6)}{S(3)} = \\frac{4\\pi \\cdot 36}{4\\pi \\cdot 9} = \\frac{36}{9} = 4',
    difficulty: 'medium',
    skills: ['funcion-potencia-modelamiento', 'funcion-potencia-problemas-variacion', 'algebra-funcion-potencia', 'algebra-modelamiento', 'geometria-superficie-esfera', 'numeros-potencias', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-pot-prob-7',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Si } r \\to 3r \\text{ en } F(r) = \\frac{Gm_1m_2}{r^2}, \\text{ ¿cómo cambia } F?',
    options: ['\\text{Se divide por 3}', '\\text{Se divide por 6}', '\\text{Se divide por 9}', '\\text{Se triplica}'],
    correctAnswer: 2,
    explanation: 'F(3r) = \\frac{Gm_1m_2}{(3r)^2} = \\frac{Gm_1m_2}{9r^2} = \\frac{F(r)}{9}',
    difficulty: 'hard',
    skills: ['funcion-potencia-problemas-fisica', 'funcion-potencia-problemas-variacion', 'algebra-funcion-potencia', 'algebra-modelamiento', 'algebra-variacion', 'numeros-potencias', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  // Subsection D: Interpretación de gráficos
  {
    id: 'm2-alg-graf-1',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{La gráfica de } f(x) = x^{-2} \\text{ (x > 0) se caracteriza por:}',
    options: ['\\text{Crece continuamente}', '\\text{Decrece hacia eje x}', '\\text{Línea recta}', '\\text{Punto máximo}'],
    correctAnswer: 1,
    explanation: 'x^{-2} = \\frac{1}{x^2} \\text{ decrece, } \\lim_{x \\to \\infty} \\frac{1}{x^2} = 0',
    difficulty: 'medium',
    skills: ['funcion-potencia-problemas-interpretacion', 'funcion-potencia-graficos', 'algebra-funcion-potencia', 'algebra-interpretacion-graficos', 'algebra-limites']
  },
  {
    id: 'm2-alg-graf-2',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Un gráfico muestra que al duplicar } x, \\text{ } y \\text{ se multiplica por 4. ¿Qué función representa?}',
    options: ['y = kx', 'y = kx^2', 'y = k\\sqrt{x}', 'y = kx^3'],
    correctAnswer: 1,
    explanation: 'y = kx^2: \\quad k(2x)^2 = 4kx^2 = 4y',
    difficulty: 'hard',
    skills: ['funcion-potencia-problemas-interpretacion', 'funcion-potencia-problemas-variacion', 'algebra-funcion-potencia', 'algebra-interpretacion-graficos']
  },
  {
    id: 'm2-alg-graf-3',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{El gráfico de } f(x) = x^3 \\text{ pasa por:}',
    options: ['\\text{Solo cuadrante I}', '\\text{Cuadrantes I y III}', '\\text{Cuadrantes I y II}', '\\text{Todos los cuadrantes}'],
    correctAnswer: 1,
    explanation: 'x > 0 \\Rightarrow x^3 > 0 \\text{ (I)}; \\quad x < 0 \\Rightarrow x^3 < 0 \\text{ (III)}',
    difficulty: 'medium',
    skills: ['funcion-potencia-problemas-interpretacion', 'funcion-potencia-grafica', 'algebra-funcion-potencia', 'algebra-interpretacion-graficos', 'geometria-plano-cartesiano']
  },
  {
    id: 'm2-alg-graf-4',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Si el gráfico de } y = x^n \\text{ es simétrico respecto al eje Y, } n \\text{ es:}',
    options: ['\\text{Impar}', '\\text{Par}', '\\text{Cualquier entero}', '\\text{Solo positivo}'],
    correctAnswer: 1,
    explanation: 'n \\text{ par: } (-x)^n = x^n \\Rightarrow \\text{simetría con eje Y}',
    difficulty: 'hard',
    skills: ['funcion-potencia-problemas-interpretacion', 'funcion-potencia-grafica', 'algebra-funcion-potencia', 'algebra-simetria', 'algebra-interpretacion-graficos']
  }
];
