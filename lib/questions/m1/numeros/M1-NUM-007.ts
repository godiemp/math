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
    question: 'Un arquitecto está diseñando un jardín cuadrado para un parque municipal. El área total del jardín es de 49 metros cuadrados. Para calcular cuánto material de cerca necesita para rodear el perímetro, primero debe determinar la medida de cada lado del jardín cuadrado. Sabiendo que en un cuadrado el área es el lado multiplicado por sí mismo, ¿cuántos metros mide cada lado?',
    questionLatex: '\\text{Un arquitecto está diseñando un jardín cuadrado para un parque municipal. El área total del jardín es de 49 metros cuadrados. Para calcular cuánto material de cerca necesita para rodear el perímetro, primero debe determinar la medida de cada lado del jardín cuadrado. Sabiendo que en un cuadrado el área es el lado multiplicado por sí mismo, ¿cuántos metros mide cada lado?}',
    options: ['6', '7', '8', '24.5'],
    correctAnswer: 1,
    explanation: 'Para encontrar el lado del cuadrado, calculamos la raíz cuadrada del área. La raíz cuadrada de 49 es el número que multiplicado por sí mismo da 49: √49 = 7, porque 7 × 7 = 49 metros por lado.',
    explanationLatex: '\\sqrt{49} = 7 \\text{ porque } 7 \\times 7 = 49',
    difficulty: 'easy',
    skills: ['numeros-raices', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-75',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\sqrt[3]{64}',
    question: 'Un escultor está trabajando con bloques cúbicos de mármol. Tiene un bloque cuyo volumen es de 64 centímetros cúbicos y necesita calcular la medida de la arista para realizar cortes precisos. Para encontrar la arista, debe determinar qué número multiplicado por sí mismo tres veces resulta en 64. ¿Cuántos centímetros mide la arista?',
    questionLatex: '\\text{Un escultor está trabajando con bloques cúbicos de mármol. Tiene un bloque cuyo volumen es de 64 centímetros cúbicos y necesita calcular la medida de la arista para realizar cortes precisos. Para encontrar la arista, debe determinar qué número multiplicado por sí mismo tres veces resulta en 64. ¿Cuántos centímetros mide la arista?}',
    options: ['3', '4', '8', '21.3'],
    correctAnswer: 1,
    explanation: 'La raíz cúbica de 64 es el número que elevado al cubo da 64. Verificamos: 4³ = 4 × 4 × 4 = 64, por lo tanto ∛64 = 4 centímetros.',
    explanationLatex: '\\sqrt[3]{64} = 4 \\text{ porque } 4^3 = 64',
    difficulty: 'easy',
    skills: ['numeros-raices', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-76',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\sqrt[3]{-27}',
    question: 'Un físico está analizando un problema de temperatura que involucra cambios en dirección negativa. En sus cálculos necesita determinar la raíz cúbica de menos 27. A diferencia de las raíces cuadradas, las raíces cúbicas de números negativos sí existen en los números reales. ¿Cuál es el valor de esta raíz cúbica?',
    questionLatex: '\\text{Un físico está analizando un problema de temperatura que involucra cambios en dirección negativa. En sus cálculos necesita determinar la raíz cúbica de menos 27. A diferencia de las raíces cuadradas, las raíces cúbicas de números negativos sí existen en los números reales. ¿Cuál es el valor de esta raíz cúbica?}',
    options: ['$-3$', '$3$', 'No existe', '$-9$'],
    optionsLatex: ['-3', '3', '\\text{No existe}', '-9'],
    correctAnswer: 0,
    explanation: 'Las raíces cúbicas de números negativos existen y son negativas. Buscamos el número que elevado al cubo da -27. Verificamos: (-3)³ = (-3) × (-3) × (-3) = -27, por lo tanto ∛(-27) = -3.',
    explanationLatex: '\\sqrt[3]{-27} = -3 \\text{ porque } (-3)^3 = -27',
    difficulty: 'medium',
    skills: ['numeros-raices', 'numeros-enteros', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-77',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\sqrt[3]{x} = 5',
    question: 'Un ingeniero mecánico está calculando las dimensiones de un engranaje cúbico. Sabe que la medida de la arista del engranaje es de 5 centímetros, y necesita determinar el volumen total del engranaje. Si la raíz cúbica del volumen es igual a 5, entonces debe encontrar qué volumen, al extraerle la raíz cúbica, resulta en 5. ¿Cuál es el volumen en centímetros cúbicos?',
    questionLatex: '\\text{Un ingeniero mecánico está calculando las dimensiones de un engranaje cúbico. Sabe que la medida de la arista del engranaje es de 5 centímetros, y necesita determinar el volumen total del engranaje. Si la raíz cúbica del volumen es igual a 5, entonces debe encontrar qué volumen, al extraerle la raíz cúbica, resulta en 5. ¿Cuál es el volumen en centímetros cúbicos?}',
    options: ['15', '25', '125', '625'],
    correctAnswer: 2,
    explanation: 'Si la raíz cúbica de un número es 5, entonces ese número se obtiene elevando 5 al cubo. Calculamos: 5³ = 5 × 5 × 5 = 125 centímetros cúbicos.',
    explanationLatex: '\\sqrt[3]{x} = 5 \\quad \\Rightarrow \\quad x = 5^3 = 125',
    difficulty: 'medium',
    skills: ['numeros-raices', 'numeros-potencias', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-78',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\sqrt{50}',
    question: 'Un carpintero está cortando una pieza de madera y necesita calcular la raíz cuadrada de 50 para un diseño específico. Para simplificar el cálculo y expresarlo de forma exacta sin decimales, debe factorizar el número 50 y extraer los cuadrados perfectos que contenga. ¿Cuál es la forma simplificada de la raíz cuadrada de 50?',
    questionLatex: '\\text{Un carpintero está cortando una pieza de madera y necesita calcular la raíz cuadrada de 50 para un diseño específico. Para simplificar el cálculo y expresarlo de forma exacta sin decimales, debe factorizar el número 50 y extraer los cuadrados perfectos que contenga. ¿Cuál es la forma simplificada de la raíz cuadrada de 50?}',
    options: ['$5\\sqrt{2}$', '$2\\sqrt{5}$', '$10\\sqrt{5}$', '$25\\sqrt{2}$'],
    optionsLatex: ['5\\sqrt{2}', '2\\sqrt{5}', '10\\sqrt{5}', '25\\sqrt{2}'],
    correctAnswer: 0,
    explanation: 'Factorizamos 50 = 25 × 2. Como 25 es un cuadrado perfecto, podemos extraerlo: √50 = √(25 × 2) = √25 × √2 = 5√2.',
    explanationLatex: '\\sqrt{50} = \\sqrt{25 \\times 2} = \\sqrt{25} \\times \\sqrt{2} = 5\\sqrt{2}',
    difficulty: 'medium',
    skills: ['numeros-raices', 'numeros-factorizacion-prima', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-79',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\sqrt{72}',
    question: 'Un topógrafo está midiendo distancias en un terreno irregular y obtiene una medida que involucra la raíz cuadrada de 72 metros. Para comunicar esta medida de forma simplificada a su equipo, necesita expresarla extrayendo los factores cuadrados perfectos. ¿Cuál es la expresión simplificada de la raíz cuadrada de 72?',
    questionLatex: '\\text{Un topógrafo está midiendo distancias en un terreno irregular y obtiene una medida que involucra la raíz cuadrada de 72 metros. Para comunicar esta medida de forma simplificada a su equipo, necesita expresarla extrayendo los factores cuadrados perfectos. ¿Cuál es la expresión simplificada de la raíz cuadrada de 72?}',
    options: ['$6\\sqrt{2}$', '$8\\sqrt{9}$', '$36\\sqrt{2}$', '$9\\sqrt{8}$'],
    optionsLatex: ['6\\sqrt{2}', '8\\sqrt{9}', '36\\sqrt{2}', '9\\sqrt{8}'],
    correctAnswer: 0,
    explanation: 'Factorizamos 72 = 36 × 2. El número 36 es un cuadrado perfecto (6²), por lo tanto: √72 = √(36 × 2) = √36 × √2 = 6√2 metros.',
    explanationLatex: '\\sqrt{72} = \\sqrt{36 \\times 2} = 6\\sqrt{2}',
    difficulty: 'medium',
    skills: ['numeros-raices', 'numeros-factorizacion-prima', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-80',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\sqrt{18} + \\sqrt{8}',
    question: 'Un matemático está sumando dos expresiones radicales: la raíz cuadrada de 18 más la raíz cuadrada de 8. Para poder sumar estos radicales correctamente, primero debe simplificar cada uno extrayendo los cuadrados perfectos, luego identificar si tienen la misma parte radical, y finalmente combinar los coeficientes. ¿Cuál es el resultado simplificado de esta suma?',
    questionLatex: '\\text{Un matemático está sumando dos expresiones radicales: la raíz cuadrada de 18 más la raíz cuadrada de 8. Para poder sumar estos radicales correctamente, primero debe simplificar cada uno extrayendo los cuadrados perfectos, luego identificar si tienen la misma parte radical, y finalmente combinar los coeficientes. ¿Cuál es el resultado simplificado de esta suma?}',
    options: ['$\\sqrt{26}$', '$5\\sqrt{2}$', '$\\sqrt{10}$', '$3\\sqrt{2} + 2\\sqrt{2}$'],
    optionsLatex: ['\\sqrt{26}', '5\\sqrt{2}', '\\sqrt{10}', '3\\sqrt{2} + 2\\sqrt{2}'],
    correctAnswer: 1,
    explanation: 'Simplificamos cada radical: √18 = √(9 × 2) = 3√2 y √8 = √(4 × 2) = 2√2. Ahora sumamos los coeficientes: 3√2 + 2√2 = (3 + 2)√2 = 5√2.',
    explanationLatex: '\\sqrt{18} + \\sqrt{8} = 3\\sqrt{2} + 2\\sqrt{2} = 5\\sqrt{2}',
    difficulty: 'hard',
    skills: ['numeros-raices', 'numeros-factorizacion-prima', 'numeros-operaciones-basicas']
  }
];
