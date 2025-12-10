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
    questionLatex: '\\text{Un astrónomo está registrando la distancia entre dos estrellas, que es de 5.000.000 de kilómetros. Para facilitar los cálculos y la comunicación en la comunidad científica, necesita expresar esta cantidad en notación científica, que consiste en un número entre 1 y 10 multiplicado por una potencia de 10. ¿Cómo se expresa 5.000.000 en notación científica?}',
    options: ['5 \\times 10^5', '5 \\times 10^6', '50 \\times 10^5', '0.5 \\times 10^7'],
    correctAnswer: 1,
    explanation: '5,000,000 = 5 \\times 10^6',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['numeros-decimales', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-82',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '3.5 \\times 10^4',
    questionLatex: '\\text{Un científico recibe datos de un experimento expresados en notación científica: } 3.5 \\times 10^4. \\text{ Para registrar este valor en un informe que requiere notación decimal estándar, necesita convertir esta expresión. ¿Cuál es el valor en notación decimal?}',
    options: ['350', '3,500', '35,000', '350,000'],
    correctAnswer: 2,
    explanation: '3.5 \\times 10^4 = 35,000',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['numeros-decimales', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-83',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '(2 \\times 10^3) \\times (4 \\times 10^5)',
    questionLatex: '\\text{Un físico está multiplicando dos mediciones expresadas en notación científica: } (2 \\times 10^3) \\times (4 \\times 10^5). \\text{ ¿Cuál es el resultado en notación científica?}',
    options: ['6 \\times 10^8', '8 \\times 10^8', '8 \\times 10^{15}', '6 \\times 10^{15}'],
    correctAnswer: 1,
    explanation: '(2 \\times 10^3) \\times (4 \\times 10^5) = (2 \\times 4) \\times 10^{3+5} = 8 \\times 10^8',
    difficulty: 'medium',
    difficultyScore: 0.40,
    skills: ['numeros-decimales', 'numeros-potencias', 'numeros-potencias-propiedades', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-116',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\pi + \\sqrt{2}',
    questionLatex: '\\text{Un estudiante de geometría está calculando el perímetro de una figura que combina elementos circulares y diagonales. Su cálculo final requiere sumar } \\pi + \\sqrt{2}. \\text{ Para obtener una respuesta aproximada, debe usar valores decimales. ¿Cuál es el resultado aproximado de esta suma?}',
    options: ['4.14', '4.41', '4.55', '5.55'],
    correctAnswer: 2,
    explanation: '\\pi + \\sqrt{2} \\approx 3.14 + 1.41 = 4.55',
    difficulty: 'easy',
    difficultyScore: 0.30,
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
    questionLatex: '\\text{Un microbiólogo mide el tamaño de una bacteria que es de 0,00045 milímetros. Para reportar este valor en una revista científica, debe expresarlo en notación científica. ¿Cómo se expresa 0,00045 en notación científica?}',
    options: ['4.5 \\times 10^{-4}', '4.5 \\times 10^{-3}', '45 \\times 10^{-5}', '0.45 \\times 10^{-3}'],
    correctAnswer: 0,
    explanation: '0.00045 = 4.5 \\times 10^{-4}',
    difficulty: 'easy',
    difficultyScore: 0.25,
    skills: ['numeros-decimales', 'numeros-potencias', 'numeros-notacion-cientifica', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-148',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '6.02 \\times 10^{23}',
    questionLatex: '\\text{El número de Avogadro, fundamental en química, es } 6.02 \\times 10^{23}\\text{. Un estudiante necesita entender la magnitud de este número. ¿Cuántos ceros tendría este número si se escribiera en notación decimal estándar?}',
    options: ['20 ceros', '21 ceros', '22 ceros', '23 ceros'],
    correctAnswer: 2,
    explanation: '6.02 \\times 10^{23} = 602{,}000{,}000{,}000{,}000{,}000{,}000{,}000 \\text{ tiene 22 ceros (1 en 602 y 21 ceros adicionales)}',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['numeros-decimales', 'numeros-potencias', 'numeros-notacion-cientifica', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-149',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\frac{8 \\times 10^6}{2 \\times 10^2}',
    questionLatex: '\\text{Un ingeniero divide dos mediciones expresadas en notación científica: } (8 \\times 10^6) \\div (2 \\times 10^2). \\text{ ¿Cuál es el resultado?}',
    options: ['4 \\times 10^3', '4 \\times 10^4', '6 \\times 10^4', '16 \\times 10^3'],
    correctAnswer: 1,
    explanation: '\\frac{8 \\times 10^6}{2 \\times 10^2} = \\frac{8}{2} \\times 10^{6-2} = 4 \\times 10^4',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['numeros-decimales', 'numeros-potencias', 'numeros-notacion-cientifica', 'numeros-potencias-propiedades', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-150',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '(3 \\times 10^5) + (7 \\times 10^5)',
    questionLatex: '\\text{Un astrónomo suma dos distancias expresadas en notación científica: } (3 \\times 10^5) + (7 \\times 10^5) \\text{ km. ¿Cuál es la suma total?}',
    options: ['10 \\times 10^5', '1 \\times 10^6', '10 \\times 10^{10}', '21 \\times 10^5'],
    correctAnswer: 1,
    explanation: '(3 \\times 10^5) + (7 \\times 10^5) = 10 \\times 10^5 = 1 \\times 10^6',
    difficulty: 'medium',
    difficultyScore: 0.35,
    skills: ['numeros-decimales', 'numeros-potencias', 'numeros-notacion-cientifica', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-151',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '9.3 \\times 10^7 \\text{ en decimal}',
    questionLatex: '\\text{La distancia promedio de la Tierra al Sol es aproximadamente } 9.3 \\times 10^7 \\text{ kilómetros. ¿Cuál es este valor en notación decimal?}',
    options: ['9.300.000 km', '93.000.000 km', '930.000.000 km', '9.300.000.000 km'],
    correctAnswer: 1,
    explanation: '9.3 \\times 10^7 = 93,000,000',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['numeros-decimales', 'numeros-potencias', 'numeros-notacion-cientifica', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-152',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '(5 \\times 10^{-3}) \\times (2 \\times 10^4)',
    questionLatex: '\\text{Un químico multiplica dos concentraciones expresadas en notación científica: } 5 \\times 10^{-3} \\text{ y } 2 \\times 10^4\\text{. ¿Cuál es el producto?}',
    options: ['10 \\times 10^1', '1 \\times 10^2', '10 \\times 10^{-12}', '7 \\times 10^1'],
    correctAnswer: 1,
    explanation: '(5 \\times 10^{-3}) \\times (2 \\times 10^4) = 10 \\times 10^{-3+4} = 10 \\times 10^1 = 1 \\times 10^2',
    difficulty: 'medium',
    difficultyScore: 0.42,
    skills: ['numeros-decimales', 'numeros-potencias', 'numeros-notacion-cientifica', 'numeros-potencias-propiedades', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-153',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '(3.6 \\times 10^8) \\div (1.2 \\times 10^5)',
    questionLatex: '\\text{La velocidad de la luz es aproximadamente } 3.6 \\times 10^8 \\text{ metros por segundo. Si se divide esta cantidad entre } 1.2 \\times 10^5\\text{, ¿cuál es el resultado?}',
    options: ['3 \\times 10^2', '3 \\times 10^3', '2.4 \\times 10^3', '3.6 \\times 10^3'],
    correctAnswer: 1,
    explanation: '\\frac{3.6 \\times 10^8}{1.2 \\times 10^5} = \\frac{3.6}{1.2} \\times 10^{8-5} = 3 \\times 10^3',
    difficulty: 'medium',
    difficultyScore: 0.42,
    skills: ['numeros-decimales', 'numeros-potencias', 'numeros-notacion-cientifica', 'numeros-potencias-propiedades', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-154',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '1.5 \\times 10^{-6} \\text{ en decimal}',
    questionLatex: '\\text{El diámetro de un virus es aproximadamente } 1.5 \\times 10^{-6} \\text{ metros. ¿Cuál es este valor en notación decimal?}',
    options: ['0,0000015 m', '0,000015 m', '0,00015 m', '0,0015 m'],
    correctAnswer: 0,
    explanation: '1.5 \\times 10^{-6} = 0.0000015',
    difficulty: 'easy',
    difficultyScore: 0.32,
    skills: ['numeros-decimales', 'numeros-potencias', 'numeros-notacion-cientifica', 'numeros-operaciones-basicas']
  }
];
