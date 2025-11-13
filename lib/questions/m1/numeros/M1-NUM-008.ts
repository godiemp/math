import { Question } from '../../../types';

/**
 * M1-NUM-008: Problemas con potencias y raíces enésimas en números reales
 *
 * Topics covered:
 * - Scientific notation (large and small numbers)
 * - Converting between scientific and standard notation
 * - Operations with scientific notation
 * - Combining irrational numbers (π, √2, etc.)
 * - Approximating irrational values
 * - Real-world applications of powers and roots
 */

export const m1Num008Questions: Question[] = [
  {
    id: 'm1-81',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\text{5000000 en notación científica}',
    question: 'Un astrónomo está registrando la distancia entre dos estrellas, que es de 5.000.000 de kilómetros. Para facilitar los cálculos y la comunicación en la comunidad científica, necesita expresar esta cantidad en notación científica, que consiste en un número entre 1 y 10 multiplicado por una potencia de 10. ¿Cómo se expresa 5.000.000 en notación científica?',
    questionLatex: '\\text{Un astrónomo está registrando la distancia entre dos estrellas, que es de 5.000.000 de kilómetros. Para facilitar los cálculos y la comunicación en la comunidad científica, necesita expresar esta cantidad en notación científica, que consiste en un número entre 1 y 10 multiplicado por una potencia de 10. ¿Cómo se expresa 5.000.000 en notación científica?}',
    options: ['$5 \\times 10^5$', '$5 \\times 10^6$', '$50 \\times 10^5$', '$0.5 \\times 10^7$'],
    optionsLatex: ['5 \\times 10^5', '5 \\times 10^6', '50 \\times 10^5', '0.5 \\times 10^7'],
    correctAnswer: 1,
    explanation: 'Para convertir a notación científica, movemos el punto decimal 6 posiciones hacia la izquierda hasta obtener un número entre 1 y 10. Esto nos da: 5.000.000 = 5 × 10⁶ kilómetros.',
    explanationLatex: '5,000,000 = 5 \\times 10^6',
    difficulty: 'easy',
    skills: ['numeros-decimales', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-82',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '3.5 \\times 10^4',
    question: 'Un científico recibe datos de un experimento expresados en notación científica: 3.5 multiplicado por 10 elevado a la cuarta. Para registrar este valor en un informe que requiere notación decimal estándar, necesita convertir esta expresión moviendo el punto decimal hacia la derecha tantas posiciones como indica el exponente. ¿Cuál es el valor en notación decimal?',
    questionLatex: '\\text{Un científico recibe datos de un experimento expresados en notación científica: 3.5 multiplicado por 10 elevado a la cuarta. Para registrar este valor en un informe que requiere notación decimal estándar, necesita convertir esta expresión moviendo el punto decimal hacia la derecha tantas posiciones como indica el exponente. ¿Cuál es el valor en notación decimal?}',
    options: ['350', '3,500', '35,000', '350,000'],
    correctAnswer: 2,
    explanation: 'Para convertir de notación científica a decimal, movemos el punto decimal 4 posiciones hacia la derecha: 3.5 × 10⁴ = 35.000.',
    explanationLatex: '3.5 \\times 10^4 = 35,000',
    difficulty: 'easy',
    skills: ['numeros-decimales', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-83',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '(2 \\times 10^3) \\times (4 \\times 10^5)',
    question: 'Un físico está multiplicando dos mediciones expresadas en notación científica. La primera medición es 2 por 10 elevado al cubo, y la segunda es 4 por 10 elevado a la quinta. Para multiplicar números en notación científica, debe multiplicar los coeficientes entre sí y sumar los exponentes de las potencias de 10. ¿Cuál es el resultado en notación científica?',
    questionLatex: '\\text{Un físico está multiplicando dos mediciones expresadas en notación científica. La primera medición es 2 por 10 elevado al cubo, y la segunda es 4 por 10 elevado a la quinta. Para multiplicar números en notación científica, debe multiplicar los coeficientes entre sí y sumar los exponentes de las potencias de 10. ¿Cuál es el resultado en notación científica?}',
    options: ['$6 \\times 10^8$', '$8 \\times 10^8$', '$8 \\times 10^{15}$', '$6 \\times 10^{15}$'],
    optionsLatex: ['6 \\times 10^8', '8 \\times 10^8', '8 \\times 10^{15}', '6 \\times 10^{15}'],
    correctAnswer: 1,
    explanation: 'Multiplicamos los coeficientes: 2 × 4 = 8. Sumamos los exponentes: 3 + 5 = 8. Resultado: (2 × 10³) × (4 × 10⁵) = 8 × 10⁸.',
    explanationLatex: '(2 \\times 10^3) \\times (4 \\times 10^5) = (2 \\times 4) \\times 10^{3+5} = 8 \\times 10^8',
    difficulty: 'hard',
    skills: ['numeros-decimales', 'numeros-potencias', 'numeros-potencias-propiedades', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-116',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\pi + \\sqrt{2}',
    question: 'Un estudiante de geometría está calculando el perímetro de una figura que combina elementos circulares y diagonales. Su cálculo final requiere sumar pi más la raíz cuadrada de 2. Para obtener una respuesta aproximada, debe usar valores decimales aproximados: pi es aproximadamente 3.14 y la raíz cuadrada de 2 es aproximadamente 1.41. ¿Cuál es el resultado aproximado de esta suma?',
    questionLatex: '\\text{Un estudiante de geometría está calculando el perímetro de una figura que combina elementos circulares y diagonales. Su cálculo final requiere sumar pi más la raíz cuadrada de 2. Para obtener una respuesta aproximada, debe usar valores decimales aproximados: pi es aproximadamente 3.14 y la raíz cuadrada de 2 es aproximadamente 1.41. ¿Cuál es el resultado aproximado de esta suma?}',
    options: ['4.14', '4.41', '4.55', '5.55'],
    correctAnswer: 2,
    explanation: 'Sumamos las aproximaciones decimales: π ≈ 3.14 y √2 ≈ 1.41. Resultado: 3.14 + 1.41 = 4.55.',
    explanationLatex: '\\pi + \\sqrt{2} \\approx 3.14 + 1.41 = 4.55',
    difficulty: 'hard',
    skills: ['numeros-raices', 'numeros-decimales', 'numeros-operaciones-basicas']
  }
];
