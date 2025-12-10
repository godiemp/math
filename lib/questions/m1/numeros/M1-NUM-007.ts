import { Question } from '../../../types';

/**
 * M1-NUM-007: Descomposición y propiedades de raíces enésimas
 *
 * Topics covered:
 * - Square roots and cube roots
 * - nth roots
 * - Roots of negative numbers (cube roots)
 * - Simplifying radicals by factoring
 * - Extracting perfect squares/cubes from radicals
 * - Adding and subtracting like radicals
 * - Root operations and properties
 */

export const m1Num007Questions: Question[] = [
  {
    id: 'm1-10',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\sqrt{49}',
    questionLatex: '\\text{Un arquitecto está diseñando un jardín cuadrado para un parque municipal. El área total del jardín es de 49 metros cuadrados. Para calcular cuánto material de cerca necesita para rodear el perímetro, primero debe determinar la medida de cada lado del jardín cuadrado. Sabiendo que en un cuadrado el área es el lado multiplicado por sí mismo, ¿cuántos metros mide cada lado?}',
    options: ['6', '7', '8', '24.5'],
    correctAnswer: 1,
    explanation: '\\sqrt{49} = 7 \\text{ porque } 7 \\times 7 = 49',
    difficulty: 'easy',
    difficultyScore: 0.31,
    skills: ['numeros-raices', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-75',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\sqrt[3]{64}',
    questionLatex: '\\text{Un escultor está trabajando con bloques cúbicos de mármol. Tiene un bloque cuyo volumen es de 64 centímetros cúbicos y necesita calcular la medida de la arista para realizar cortes precisos. Para encontrar la arista, debe determinar qué número multiplicado por sí mismo tres veces resulta en 64. ¿Cuántos centímetros mide la arista?}',
    options: ['3', '4', '8', '21.3'],
    correctAnswer: 1,
    explanation: '\\sqrt[3]{64} = 4 \\text{ porque } 4^3 = 64',
    difficulty: 'easy',
    difficultyScore: 0.31,
    skills: ['numeros-raices', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-76',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\sqrt[3]{-27}',
    questionLatex: '\\text{Un físico está analizando un problema de temperatura que involucra cambios en dirección negativa. En sus cálculos necesita determinar } \\sqrt[3]{-27}. \\text{ ¿Cuál es el valor de esta raíz cúbica?}',
    options: ['-3', '3', '\\text{No existe}', '-9'],
    correctAnswer: 0,
    explanation: '\\sqrt[3]{-27} = -3 \\text{ porque } (-3)^3 = -27',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['numeros-raices', 'numeros-enteros', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-77',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\sqrt[3]{x} = 5',
    questionLatex: '\\text{Un ingeniero mecánico está calculando las dimensiones de un engranaje cúbico. Sabe que la medida de la arista del engranaje es de 5 centímetros, y necesita determinar el volumen total del engranaje. Si la raíz cúbica del volumen es igual a 5, entonces debe encontrar qué volumen, al extraerle la raíz cúbica, resulta en 5. ¿Cuál es el volumen en centímetros cúbicos?}',
    options: ['15', '25', '125', '625'],
    correctAnswer: 2,
    explanation: '\\sqrt[3]{x} = 5 \\quad \\Rightarrow \\quad x = 5^3 = 125',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['numeros-raices', 'numeros-potencias', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-78',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\sqrt{50}',
    questionLatex: '\\text{Un carpintero está cortando una pieza de madera y necesita calcular } \\sqrt{50} \\text{ para un diseño específico. Quiere expresarlo de forma exacta y simplificada. ¿Cuál es la forma simplificada de la raíz cuadrada de 50?}',
    options: ['5\\sqrt{2}', '2\\sqrt{5}', '10\\sqrt{5}', '25\\sqrt{2}'],
    correctAnswer: 0,
    explanation: '\\sqrt{50} = \\sqrt{25 \\times 2} = \\sqrt{25} \\times \\sqrt{2} = 5\\sqrt{2}',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['numeros-raices', 'numeros-factorizacion-prima', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-79',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\sqrt{72}',
    questionLatex: '\\text{Un topógrafo está midiendo distancias en un terreno irregular y obtiene una medida que involucra } \\sqrt{72} \\text{ metros. Para comunicar esta medida de forma simplificada a su equipo, necesita expresarla en su forma más simple. ¿Cuál es la expresión simplificada de la raíz cuadrada de 72?}',
    options: ['6\\sqrt{2}', '8\\sqrt{9}', '36\\sqrt{2}', '9\\sqrt{8}'],
    correctAnswer: 0,
    explanation: '\\sqrt{72} = \\sqrt{36 \\times 2} = 6\\sqrt{2}',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['numeros-raices', 'numeros-factorizacion-prima', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-80',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\sqrt{18} + \\sqrt{8}',
    questionLatex: '\\text{Un matemático está sumando dos expresiones radicales: } \\sqrt{18} + \\sqrt{8}. \\text{ Necesita simplificar y calcular el resultado. ¿Cuál es el resultado simplificado de esta suma?}',
    options: ['\\sqrt{26}', '5\\sqrt{2}', '\\sqrt{10}', '3\\sqrt{2} + 2\\sqrt{2}'],
    correctAnswer: 1,
    explanation: '\\sqrt{18} + \\sqrt{8} = 3\\sqrt{2} + 2\\sqrt{2} = 5\\sqrt{2}',
    difficulty: 'hard',
    difficultyScore: 0.74,
    skills: ['numeros-raices', 'numeros-factorizacion-prima', 'numeros-operaciones-basicas']
  }
];
