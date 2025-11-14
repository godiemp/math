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
    question: 'Un científico recibe datos de un experimento expresados en notación científica: 3.5 × 10⁴. Para registrar este valor en un informe que requiere notación decimal estándar, necesita convertir esta expresión. ¿Cuál es el valor en notación decimal?',
    questionLatex: '\\text{Un científico recibe datos de un experimento expresados en notación científica: } 3.5 \\times 10^4. \\text{ Para registrar este valor en un informe que requiere notación decimal estándar, necesita convertir esta expresión. ¿Cuál es el valor en notación decimal?}',
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
    question: 'Un físico está multiplicando dos mediciones expresadas en notación científica: (2 × 10³) × (4 × 10⁵). ¿Cuál es el resultado en notación científica?',
    questionLatex: '\\text{Un físico está multiplicando dos mediciones expresadas en notación científica: } (2 \\times 10^3) \\times (4 \\times 10^5). \\text{ ¿Cuál es el resultado en notación científica?}',
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
    question: 'Un estudiante de geometría está calculando el perímetro de una figura que combina elementos circulares y diagonales. Su cálculo final requiere sumar π + √2. Para obtener una respuesta aproximada, debe usar valores decimales. ¿Cuál es el resultado aproximado de esta suma?',
    questionLatex: '\\text{Un estudiante de geometría está calculando el perímetro de una figura que combina elementos circulares y diagonales. Su cálculo final requiere sumar } \\pi + \\sqrt{2}. \\text{ Para obtener una respuesta aproximada, debe usar valores decimales. ¿Cuál es el resultado aproximado de esta suma?}',
    options: ['4.14', '4.41', '4.55', '5.55'],
    correctAnswer: 2,
    explanation: 'Sumamos las aproximaciones decimales: π ≈ 3.14 y √2 ≈ 1.41. Resultado: 3.14 + 1.41 = 4.55.',
    explanationLatex: '\\pi + \\sqrt{2} \\approx 3.14 + 1.41 = 4.55',
    difficulty: 'hard',
    skills: ['numeros-raices', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  // ========================================
  // NOTACIÓN CIENTÍFICA - ADICIONALES
  // ========================================
  {
    id: 'm1-147',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '0.00045 \\text{ en notación científica}',
    question: 'Un microbiólogo mide el tamaño de una bacteria que es de 0,00045 milímetros. Para reportar este valor en una revista científica, debe expresarlo en notación científica. ¿Cómo se expresa 0,00045 en notación científica?',
    questionLatex: '\\text{Un microbiólogo mide el tamaño de una bacteria que es de 0,00045 milímetros. Para reportar este valor en una revista científica, debe expresarlo en notación científica. ¿Cómo se expresa 0,00045 en notación científica?}',
    options: ['$4.5 \\times 10^{-4}$', '$4.5 \\times 10^{-3}$', '$45 \\times 10^{-5}$', '$0.45 \\times 10^{-3}$'],
    optionsLatex: ['4.5 \\times 10^{-4}', '4.5 \\times 10^{-3}', '45 \\times 10^{-5}', '0.45 \\times 10^{-3}'],
    correctAnswer: 0,
    explanation: 'Para convertir a notación científica, movemos el punto decimal 4 posiciones hacia la derecha hasta obtener un número entre 1 y 10. Como el número original es menor que 1, el exponente es negativo: 0,00045 = 4.5 × 10⁻⁴.',
    explanationLatex: '0.00045 = 4.5 \\times 10^{-4}',
    difficulty: 'easy',
    skills: ['numeros-decimales', 'numeros-potencias', 'numeros-notacion-cientifica', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-148',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '6.02 \\times 10^{23}',
    question: 'El número de Avogadro, fundamental en química, es 6.02 × 10²³. Un estudiante necesita entender la magnitud de este número. ¿Cuántos ceros tendría este número si se escribiera en notación decimal estándar?',
    questionLatex: '\\text{El número de Avogadro, fundamental en química, es } 6.02 \\times 10^{23}\\text{. Un estudiante necesita entender la magnitud de este número. ¿Cuántos ceros tendría este número si se escribiera en notación decimal estándar?}',
    options: ['20 ceros', '21 ceros', '22 ceros', '23 ceros'],
    correctAnswer: 1,
    explanation: 'El exponente 23 indica que debemos mover el punto decimal 23 posiciones a la derecha. Como 6.02 ya tiene 2 cifras decimales, necesitamos agregar 21 ceros: 602,000,000,000,000,000,000,000 (21 ceros después de 602).',
    explanationLatex: '6.02 \\times 10^{23} \\text{ tiene 21 ceros}',
    difficulty: 'medium',
    skills: ['numeros-decimales', 'numeros-potencias', 'numeros-notacion-cientifica', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-149',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\frac{8 \\times 10^6}{2 \\times 10^2}',
    question: 'Un ingeniero divide dos mediciones expresadas en notación científica: (8 × 10⁶) ÷ (2 × 10²). ¿Cuál es el resultado?',
    questionLatex: '\\text{Un ingeniero divide dos mediciones expresadas en notación científica: } (8 \\times 10^6) \\div (2 \\times 10^2). \\text{ ¿Cuál es el resultado?}',
    options: ['$4 \\times 10^3$', '$4 \\times 10^4$', '$6 \\times 10^4$', '$16 \\times 10^3$'],
    optionsLatex: ['4 \\times 10^3', '4 \\times 10^4', '6 \\times 10^4', '16 \\times 10^3'],
    correctAnswer: 1,
    explanation: 'Dividimos los coeficientes: 8 ÷ 2 = 4. Restamos los exponentes: 6 - 2 = 4. Resultado: (8 × 10⁶) ÷ (2 × 10²) = 4 × 10⁴ = 40.000.',
    explanationLatex: '\\frac{8 \\times 10^6}{2 \\times 10^2} = \\frac{8}{2} \\times 10^{6-2} = 4 \\times 10^4',
    difficulty: 'medium',
    skills: ['numeros-decimales', 'numeros-potencias', 'numeros-notacion-cientifica', 'numeros-potencias-propiedades', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-150',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '(3 \\times 10^5) + (7 \\times 10^5)',
    question: 'Un astrónomo suma dos distancias expresadas en notación científica: (3 × 10⁵) + (7 × 10⁵) km. ¿Cuál es la suma total?',
    questionLatex: '\\text{Un astrónomo suma dos distancias expresadas en notación científica: } (3 \\times 10^5) + (7 \\times 10^5) \\text{ km. ¿Cuál es la suma total?}',
    options: ['$10 \\times 10^5$', '$1 \\times 10^6$', '$10 \\times 10^{10}$', '$21 \\times 10^5$'],
    optionsLatex: ['10 \\times 10^5', '1 \\times 10^6', '10 \\times 10^{10}', '21 \\times 10^5'],
    correctAnswer: 1,
    explanation: 'Como los exponentes son iguales, sumamos los coeficientes: 3 + 7 = 10. Resultado: 10 × 10⁵ = 1 × 10⁶ (ajustando a notación científica estándar).',
    explanationLatex: '(3 \\times 10^5) + (7 \\times 10^5) = 10 \\times 10^5 = 1 \\times 10^6',
    difficulty: 'medium',
    skills: ['numeros-decimales', 'numeros-potencias', 'numeros-notacion-cientifica', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-151',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '9.3 \\times 10^7 \\text{ en decimal}',
    question: 'La distancia promedio de la Tierra al Sol es aproximadamente 9.3 × 10⁷ kilómetros. ¿Cuál es este valor en notación decimal?',
    questionLatex: '\\text{La distancia promedio de la Tierra al Sol es aproximadamente } 9.3 \\times 10^7 \\text{ kilómetros. ¿Cuál es este valor en notación decimal?}',
    options: ['9.300.000 km', '93.000.000 km', '930.000.000 km', '9.300.000.000 km'],
    correctAnswer: 1,
    explanation: 'Movemos el punto decimal 7 posiciones hacia la derecha: 9.3 × 10⁷ = 93.000.000 km (93 millones de kilómetros).',
    explanationLatex: '9.3 \\times 10^7 = 93,000,000',
    difficulty: 'easy',
    skills: ['numeros-decimales', 'numeros-potencias', 'numeros-notacion-cientifica', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-152',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '(5 \\times 10^{-3}) \\times (2 \\times 10^4)',
    question: 'Un químico multiplica dos concentraciones expresadas en notación científica: 5 × 10⁻³ y 2 × 10⁴. ¿Cuál es el producto?',
    questionLatex: '\\text{Un químico multiplica dos concentraciones expresadas en notación científica: } 5 \\times 10^{-3} \\text{ y } 2 \\times 10^4\\text{. ¿Cuál es el producto?}',
    options: ['$10 \\times 10^1$', '$1 \\times 10^2$', '$10 \\times 10^{-12}$', '$7 \\times 10^1$'],
    optionsLatex: ['10 \\times 10^1', '1 \\times 10^2', '10 \\times 10^{-12}', '7 \\times 10^1'],
    correctAnswer: 1,
    explanation: 'Multiplicamos coeficientes: 5 × 2 = 10. Sumamos exponentes: (-3) + 4 = 1. Resultado: 10 × 10¹ = 1 × 10² = 100.',
    explanationLatex: '(5 \\times 10^{-3}) \\times (2 \\times 10^4) = 10 \\times 10^{-3+4} = 10 \\times 10^1 = 1 \\times 10^2',
    difficulty: 'hard',
    skills: ['numeros-decimales', 'numeros-potencias', 'numeros-notacion-cientifica', 'numeros-potencias-propiedades', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-153',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '(3.6 \\times 10^8) \\div (1.2 \\times 10^5)',
    question: 'La velocidad de la luz es aproximadamente 3.6 × 10⁸ metros por segundo. Si se recorre esta distancia en 1.2 × 10⁵ segundos, ¿cuántos metros se recorren por segundo en promedio?',
    questionLatex: '\\text{La velocidad de la luz es aproximadamente } 3.6 \\times 10^8 \\text{ metros por segundo. Si se divide esta cantidad entre } 1.2 \\times 10^5\\text{, ¿cuál es el resultado?}',
    options: ['$3 \\times 10^2$', '$3 \\times 10^3$', '$2.4 \\times 10^3$', '$3.6 \\times 10^3$'],
    optionsLatex: ['3 \\times 10^2', '3 \\times 10^3', '2.4 \\times 10^3', '3.6 \\times 10^3'],
    correctAnswer: 1,
    explanation: 'Dividimos coeficientes: 3.6 ÷ 1.2 = 3. Restamos exponentes: 8 - 5 = 3. Resultado: 3 × 10³ = 3.000.',
    explanationLatex: '\\frac{3.6 \\times 10^8}{1.2 \\times 10^5} = \\frac{3.6}{1.2} \\times 10^{8-5} = 3 \\times 10^3',
    difficulty: 'hard',
    skills: ['numeros-decimales', 'numeros-potencias', 'numeros-notacion-cientifica', 'numeros-potencias-propiedades', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-154',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '1.5 \\times 10^{-6} \\text{ en decimal}',
    question: 'El diámetro de un virus es aproximadamente 1.5 × 10⁻⁶ metros. ¿Cuál es este valor en notación decimal?',
    questionLatex: '\\text{El diámetro de un virus es aproximadamente } 1.5 \\times 10^{-6} \\text{ metros. ¿Cuál es este valor en notación decimal?}',
    options: ['0,0000015 m', '0,000015 m', '0,00015 m', '0,0015 m'],
    correctAnswer: 0,
    explanation: 'El exponente negativo -6 indica que debemos mover el punto decimal 6 posiciones hacia la izquierda: 1.5 × 10⁻⁶ = 0,0000015 metros.',
    explanationLatex: '1.5 \\times 10^{-6} = 0.0000015',
    difficulty: 'medium',
    skills: ['numeros-decimales', 'numeros-potencias', 'numeros-notacion-cientifica', 'numeros-operaciones-basicas']
  }
];
