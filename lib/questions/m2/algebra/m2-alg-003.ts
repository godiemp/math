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
    operacionBase: 'A(l) = l^2',
    questionLatex: '\\text{Un arquitecto está diseñando una plaza cuadrada para un parque municipal. La función que modela el área de la plaza en función de la longitud de su lado es } A(l) = l^2\\text{, donde } l \\text{ está en centímetros. Si el arquitecto decide que cada lado de la plaza mida 5 metros, ¿cuál será el área total de la plaza?}',
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
    operacionBase: 'V(2a) = (2a)^3 = 8a^3',
    questionLatex: '\\text{Una empresa de embalaje fabrica cajas cúbicas cuyo volumen está dado por la función } V(a) = a^3\\text{, donde } a \\text{ es la longitud de la arista del cubo. El gerente de producción quiere saber cómo cambiará el volumen de las cajas si duplican la longitud de la arista. ¿Cómo cambia el volumen } V \\text{ cuando se duplica } a\\text{?}',
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
    operacionBase: 'I(d) = \\frac{k}{d^2}',
    questionLatex: '\\text{Un físico estudia la intensidad de luz de una fuente puntual. La intensidad } I \\text{ a una distancia } d \\text{ de la fuente sigue la ley del inverso del cuadrado: } I(d) = \\frac{k}{d^2}\\text{, donde } k \\text{ es una constante que depende de la potencia de la fuente. Si a una distancia de 2 metros la intensidad medida es 100 lux, ¿cuál es el valor de la constante } k\\text{?}',
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
    operacionBase: 'T(L) = 2\\pi\\sqrt{\\frac{L}{g}}',
    questionLatex: '\\text{Un físico estudia el péndulo simple en un laboratorio. El período de oscilación del péndulo está dado por la función } T(L) = 2\\pi\\sqrt{\\frac{L}{g}}\\text{, donde } L \\text{ es la longitud del péndulo y } g \\text{ es la aceleración de gravedad. El físico quiere investigar qué sucede con el período si cuadruplica la longitud del péndulo. ¿Cómo cambia el período } T \\text{ cuando } L \\text{ se cuadruplica?}',
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
    operacionBase: 'E(v) = \\frac{1}{2}mv^2',
    questionLatex: '\\text{Un ingeniero automotriz analiza la energía cinética de un vehículo usando la fórmula } E(v) = \\frac{1}{2}mv^2\\text{, donde } m \\text{ es la masa y } v \\text{ es la velocidad. Durante una prueba de frenado, el vehículo reduce su velocidad a la mitad } \\left(v \\to \\frac{v}{2}\\right)\\text{. El ingeniero quiere determinar qué porcentaje de la energía cinética se ha disipado en el frenado. ¿Qué porcentaje de energía se pierde cuando la velocidad se reduce a la mitad?}',
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
    operacionBase: 'S(r) = 4\\pi r^2',
    questionLatex: '\\text{Un fabricante de globos terráqueos utiliza la fórmula } S(r) = 4\\pi r^2 \\text{ para calcular la superficie de pintura necesaria para cubrir cada globo, donde } r \\text{ es el radio en centímetros. Actualmente producen globos de radio 3 cm, pero quieren lanzar una edición especial con radio de 6 cm. El gerente de producción necesita saber cuántas veces más pintura necesitarán para el modelo grande. ¿Por qué factor aumenta la superficie cuando el radio pasa de 3 cm a 6 cm?}',
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
    operacionBase: 'F(r) = \\frac{Gm_1m_2}{r^2}',
    questionLatex: '\\text{Un astrónomo estudia la fuerza gravitacional entre dos planetas usando la ley de Newton } F(r) = \\frac{Gm_1m_2}{r^2}\\text{, donde } G \\text{ es la constante gravitacional, } m_1 \\text{ y } m_2 \\text{ son las masas de los planetas, y } r \\text{ es la distancia entre ellos. Si la distancia entre los planetas se triplica } (r \\to 3r)\\text{, el astrónomo necesita calcular cómo cambia la fuerza de atracción. ¿Cómo cambia la fuerza } F \\text{ cuando la distancia se triplica?}',
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
    operacionBase: 'f(x) = x^{-2}',
    questionLatex: '\\text{Un estudiante debe graficar la función } f(x) = x^{-2} \\text{ para valores positivos de } x \\text{ en su tarea de matemáticas. ¿Cuál es la característica principal de esta gráfica cuando } x > 0\\text{?}',
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
    operacionBase: 'y = kx^n',
    questionLatex: '\\text{Un científico de datos analiza un experimento y observa que cuando duplica el valor de la variable } x\\text{, el valor de } y \\text{ se multiplica por 4. ¿Qué tipo de función modela esta relación?}',
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
    operacionBase: 'f(x) = x^3',
    questionLatex: '\\text{Una profesora de matemáticas pide a sus estudiantes que analicen la función } f(x) = x^3 \\text{ y determinen en qué cuadrantes del plano cartesiano se encuentra su gráfico. ¿Por cuáles cuadrantes pasa la gráfica de esta función?}',
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
    operacionBase: 'y = x^n',
    questionLatex: '\\text{Un estudiante observa que el gráfico de una función potencia } y = x^n \\text{ es simétrico respecto al eje Y. ¿Qué característica debe tener el exponente } n \\text{ para que esto ocurra?}',
    options: ['\\text{Impar}', '\\text{Par}', '\\text{Cualquier entero}', '\\text{Solo positivo}'],
    correctAnswer: 1,
    explanation: 'n \\text{ par: } (-x)^n = x^n \\Rightarrow \\text{simetría con eje Y}',
    difficulty: 'hard',
    skills: ['funcion-potencia-problemas-interpretacion', 'funcion-potencia-grafica', 'algebra-funcion-potencia', 'algebra-simetria', 'algebra-interpretacion-graficos']
  }
];
