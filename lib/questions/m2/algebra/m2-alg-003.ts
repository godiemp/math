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
    question: 'El área de un cuadrado es función de su lado según $A(l) = l^2$. Si el lado mide 5 cm, ¿cuál es el área?',
    questionLatex: '\\text{Área de cuadrado: } A(l) = l^2. \\text{ Si } l = 5\\text{ cm, ¿área?}',
    options: ['$10$ cm²', '$20$ cm²', '$25$ cm²', '$50$ cm²'],
    optionsLatex: ['10\\text{ cm}^2', '20\\text{ cm}^2', '25\\text{ cm}^2', '50\\text{ cm}^2'],
    correctAnswer: 2,
    explanation: 'Sustituimos l = 5 en la función: A(5) = 5² = 25 cm²',
    explanationLatex: 'A(5) = 5^2 = 25\\text{ cm}^2',
    difficulty: 'easy',
    skills: ['algebra-funcion-potencia', 'algebra-modelamiento', 'geometria-area', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-pot-prob-2',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'El volumen de un cubo es $V(a) = a^3$, donde $a$ es la arista. Si se duplica la arista, ¿cómo cambia el volumen?',
    questionLatex: '\\text{Si } V(a) = a^3 \\text{ y duplicamos } a, \\text{ ¿cómo cambia } V?',
    options: ['Se duplica', 'Se triplica', 'Se cuadruplica', 'Se multiplica por 8'],
    optionsLatex: ['\\text{Se duplica}', '\\text{Se triplica}', '\\text{Se cuadruplica}', '\\text{Se multiplica por 8}'],
    correctAnswer: 3,
    explanation: 'V(2a) = (2a)³ = 8a³ = 8·V(a). El volumen se multiplica por 8',
    explanationLatex: 'V(2a) = (2a)^3 = 8a^3 = 8 \\cdot V(a)',
    difficulty: 'medium',
    skills: ['algebra-funcion-potencia', 'algebra-modelamiento', 'geometria-volumen', 'numeros-potencias', 'algebra-variacion']
  },
  {
    id: 'm2-alg-pot-prob-3',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'La intensidad de luz varía inversamente con el cuadrado de la distancia: $I(d) = \\frac{k}{d^2}$. Si a 2 m la intensidad es 100, ¿cuál es $k$?',
    questionLatex: '\\text{Si } I(d) = \\frac{k}{d^2} \\text{ y } I(2) = 100, \\text{ ¿cuál es } k?',
    options: ['$50$', '$100$', '$200$', '$400$'],
    optionsLatex: ['50', '100', '200', '400'],
    correctAnswer: 3,
    explanation: '100 = k/2², entonces k = 100 × 4 = 400',
    explanationLatex: '100 = \\frac{k}{2^2} \\rightarrow k = 100 \\times 4 = 400',
    difficulty: 'hard',
    skills: ['algebra-funcion-potencia', 'algebra-modelamiento', 'algebra-despeje', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-pot-prob-4',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'El período de un péndulo es $T(L) = 2\\pi\\sqrt{\\frac{L}{g}}$. Si se cuadruplica la longitud $L$, ¿cómo cambia el período?',
    questionLatex: '\\text{Si se cuadruplica } L \\text{ en } T(L) = 2\\pi\\sqrt{\\frac{L}{g}}, \\text{ ¿cómo cambia } T?',
    options: ['Se cuadruplica', 'Se duplica', 'Se mantiene igual', 'Se divide por 2'],
    optionsLatex: ['\\text{Se cuadruplica}', '\\text{Se duplica}', '\\text{Se mantiene igual}', '\\text{Se divide por 2}'],
    correctAnswer: 1,
    explanation: 'T(4L) = 2π√(4L/g) = 2π·2√(L/g) = 2·T(L). El período se duplica',
    explanationLatex: 'T(4L) = 2\\pi\\sqrt{\\frac{4L}{g}} = 2\\pi \\cdot 2\\sqrt{\\frac{L}{g}} = 2 \\cdot T(L)',
    difficulty: 'extreme',
    skills: ['algebra-funcion-potencia', 'algebra-modelamiento', 'algebra-variacion', 'numeros-raices', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-pot-prob-5',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'La energía cinética es $E(v) = \\frac{1}{2}mv^2$. Si la velocidad se reduce a la mitad, ¿qué porcentaje de energía se pierde?',
    questionLatex: '\\text{Si } E(v) = \\frac{1}{2}mv^2 \\text{ y } v \\to \\frac{v}{2}, \\text{ ¿qué \\% de energía se pierde?}',
    options: ['25%', '50%', '75%', '90%'],
    optionsLatex: ['25\\%', '50\\%', '75\\%', '90\\%'],
    correctAnswer: 2,
    explanation: 'E(v/2) = ½m(v/2)² = ¼·(½mv²) = ¼E(v). Queda 25% de energía, se pierde 75%',
    explanationLatex: 'E\\left(\\frac{v}{2}\\right) = \\frac{1}{2}m\\left(\\frac{v}{2}\\right)^2 = \\frac{1}{4}E(v) \\rightarrow \\text{pierde } 75\\%',
    difficulty: 'hard',
    skills: ['algebra-funcion-potencia', 'algebra-modelamiento', 'algebra-variacion', 'numeros-porcentaje', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-pot-prob-6',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'La superficie de una esfera es $S(r) = 4\\pi r^2$. Si el radio aumenta de 3 a 6 cm, ¿en cuánto aumenta la superficie?',
    questionLatex: '\\text{Si } S(r) = 4\\pi r^2 \\text{ y } r: 3 \\to 6\\text{ cm, ¿factor de aumento?}',
    options: ['2 veces', '3 veces', '4 veces', '6 veces'],
    optionsLatex: ['2\\text{ veces}', '3\\text{ veces}', '4\\text{ veces}', '6\\text{ veces}'],
    correctAnswer: 2,
    explanation: 'S(6) = 4π(6²) = 4π·36 y S(3) = 4π(3²) = 4π·9. Razón: 36/9 = 4',
    explanationLatex: '\\frac{S(6)}{S(3)} = \\frac{4\\pi \\cdot 36}{4\\pi \\cdot 9} = \\frac{36}{9} = 4',
    difficulty: 'medium',
    skills: ['algebra-funcion-potencia', 'algebra-modelamiento', 'geometria-superficie-esfera', 'numeros-potencias', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-pot-prob-7',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'La fuerza gravitacional entre dos masas es $F(r) = \\frac{Gm_1m_2}{r^2}$. Si la distancia se triplica, ¿cómo cambia la fuerza?',
    questionLatex: '\\text{Si } r \\to 3r \\text{ en } F(r) = \\frac{Gm_1m_2}{r^2}, \\text{ ¿cómo cambia } F?',
    options: ['Se divide por 3', 'Se divide por 6', 'Se divide por 9', 'Se triplica'],
    optionsLatex: ['\\text{Se divide por 3}', '\\text{Se divide por 6}', '\\text{Se divide por 9}', '\\text{Se triplica}'],
    correctAnswer: 2,
    explanation: 'F(3r) = Gm₁m₂/(3r)² = Gm₁m₂/(9r²) = F(r)/9. La fuerza se divide por 9',
    explanationLatex: 'F(3r) = \\frac{Gm_1m_2}{(3r)^2} = \\frac{Gm_1m_2}{9r^2} = \\frac{F(r)}{9}',
    difficulty: 'hard',
    skills: ['algebra-funcion-potencia', 'algebra-modelamiento', 'algebra-variacion', 'numeros-potencias', 'numeros-fracciones', 'numeros-operaciones-basicas']
  }
];
