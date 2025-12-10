import { Question } from '../../../types';

/**
 * M2-ALG-002: Función potencia: representación gráfica
 *
 * Subsections:
 * A. Funciones potencia con exponente entero
 *    Habilidades: funcion-potencia-entero
 * B. Funciones potencia con exponente fraccionario
 *    Habilidades: funcion-potencia-fraccionario
 * C. Gráficos de funciones potencia
 *    Habilidades: funcion-potencia-grafica
 * D. Análisis de dominio y recorrido
 *    Habilidades: funcion-potencia-dominio-recorrido
 */

export const m2Alg002Questions: Question[] = [
  {
    id: 'm2-alg-pot-1',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = x^3',
    questionLatex: '\\text{Un físico está estudiando la relación entre el radio de una esfera y su volumen. La función } f(x) = x^3 \\text{ modela cómo crece el volumen (en unidades cúbicas) en función del radio } x\\text{. Si el físico necesita calcular el volumen cuando el radio es 4 unidades, debe evaluar } f(4)\\text{. ¿Cuál es el valor de } f(4)\\text{?}',
    options: ['12', '16', '64', '81'],
    correctAnswer: 2,
    explanation: 'f(4) = 4^3 = 64',
    difficulty: 'easy',
    difficultyScore: 0.35,
    skills: ['funcion-potencia-entero', 'algebra-funcion-potencia', 'algebra-evaluacion-funciones', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-pot-2',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = x^{-2} = \\frac{1}{x^2}',
    questionLatex: '\\text{Un ingeniero eléctrico estudia cómo la intensidad de una señal disminuye con la distancia. La función } f(x) = x^{-2} \\text{ modela esta relación, donde } x \\text{ es la distancia en metros. Para calcular la intensidad relativa cuando la distancia es 2 metros, el ingeniero debe evaluar } f(2)\\text{. ¿Cuál es el valor de } f(2)\\text{?}',
    options: ['-4', '\\frac{1}{4}', '4', '-\\frac{1}{4}'],
    correctAnswer: 1,
    explanation: 'f(2) = 2^{-2} = \\frac{1}{2^2} = \\frac{1}{4}',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['funcion-potencia-entero', 'algebra-funcion-potencia', 'algebra-evaluacion-funciones', 'numeros-exponentes-negativos', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-pot-3',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{¿Cuál es el dominio de la función } f(x) = x^{1/2}?',
    options: ['\\text{Todos los números reales}', '\\text{Solo números positivos}', 'x \\geq 0', '\\text{Números negativos}'],
    correctAnswer: 2,
    explanation: 'f(x) = x^{1/2} = \\sqrt{x} \\text{ requiere } x \\geq 0',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['funcion-potencia-dominio-recorrido', 'funcion-potencia-fraccionario', 'algebra-funcion-potencia', 'algebra-dominio-funciones', 'numeros-raices', 'numeros-reales']
  },
  {
    id: 'm2-alg-pot-4',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = x^{2/3} = (\\sqrt[3]{x})^2',
    questionLatex: '\\text{Un biólogo estudia el crecimiento de colonias de bacterias donde la superficie ocupada sigue la función } f(x) = x^{2/3}\\text{, siendo } x \\text{ el número de días desde el inicio del experimento. Para predecir la superficie ocupada al octavo día, el biólogo debe calcular } f(8)\\text{. ¿Cuál es el valor de } f(8)\\text{?}',
    options: ['2', '4', '8', '16'],
    correctAnswer: 1,
    explanation: 'f(8) = 8^{2/3} = (\\sqrt[3]{8})^2 = 2^2 = 4',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['funcion-potencia-fraccionario', 'algebra-funcion-potencia', 'algebra-evaluacion-funciones', 'numeros-exponentes-fraccionarios', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-pot-5',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{¿Cuál función tiene gráfica que decrece en todo su dominio?}',
    options: ['f(x) = x^2', 'f(x) = x^{-1} \\text{ para } x > 0', 'f(x) = x^3', 'f(x) = x^{1/2}'],
    correctAnswer: 1,
    explanation: 'f(x) = x^{-1} = \\frac{1}{x} \\text{ decrece para } x > 0',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['funcion-potencia-grafica', 'algebra-funcion-potencia', 'algebra-grafica-funciones', 'algebra-crecimiento-decrecimiento', 'algebra-analisis-funciones']
  },
  {
    id: 'm2-alg-pot-6',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{El recorrido de } f(x) = x^4 \\text{ para } x \\in \\mathbb{R} \\text{ es:}',
    options: ['\\mathbb{R}', 'x > 0', 'x \\geq 0', 'x < 0'],
    correctAnswer: 2,
    explanation: 'x^4 \\geq 0 \\text{ para todo } x \\in \\mathbb{R}',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['funcion-potencia-dominio-recorrido', 'funcion-potencia-entero', 'algebra-funcion-potencia', 'algebra-recorrido-funciones', 'numeros-potencias', 'algebra-analisis-funciones']
  },
  {
    id: 'm2-alg-pot-7',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = x^{-3} = \\frac{1}{x^3}',
    questionLatex: '\\text{Un químico analiza la concentración de un reactivo que disminuye según la función } f(x) = x^{-3}\\text{, donde } x \\text{ representa el tiempo en horas. En sus registros, el químico anotó que en cierto momento } a \\text{ la concentración fue } f(a) = \\frac{1}{27}\\text{. Para determinar en qué momento ocurrió esta medición, debe encontrar el valor de } a\\text{. ¿Cuál es el valor de } a\\text{?}',
    options: ['3', '-3', '9', '\\frac{1}{3}'],
    correctAnswer: 0,
    explanation: 'a^{-3} = \\frac{1}{27} \\rightarrow a^3 = 27 \\rightarrow a = 3',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['funcion-potencia-entero', 'algebra-funcion-potencia', 'algebra-ecuaciones', 'algebra-despeje', 'numeros-exponentes-negativos', 'numeros-raices', 'numeros-operaciones-basicas']
  }
];
