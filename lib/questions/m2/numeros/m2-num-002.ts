import { Question } from '../../../types';

/**
 * M2-NUM-002: Problemas que involucren números reales en diversos contextos
 *
 * Subsections:
 * A. Problemas con raíces y radicales
 *    Habilidades: numeros-reales-problemas-raices
 * B. Problemas de medición con irracionales
 *    Habilidades: numeros-reales-problemas-medicion
 * C. Problemas de aproximación y error
 *    Habilidades: numeros-reales-problemas-aproximacion
 * D. Aplicaciones en ciencias y tecnología
 *    Habilidades: numeros-reales-problemas-ciencias
 */

export const m2Num002Questions: Question[] = [
  {
    id: 'm2-num-prop-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Si 5 obreros construyen un muro en 12 días, ¿cuántos días tardarán 8 obreros?}',
    options: ['7.5 días', '8 días', '9.6 días', '19.2 días'],
    correctAnswer: 0,
    explanation: 'Es proporcionalidad inversa. Más obreros, menos días:',
    explanationLatex: '5 \\times 12 = 8 \\times x \\quad \\Rightarrow \\quad x = \\frac{60}{8} = 7.5 \\text{ días}',
    difficulty: 'medium',
    skills: ['numeros-proporcionalidad', 'numeros-proporcionalidad-inversa', 'numeros-regla-tres', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-prop-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Una llave llena un tanque en 6 horas. ¿Cuánto tardan 3 llaves simultáneamente?}',
    options: ['2 horas', '3 horas', '4 horas', '18 horas'],
    correctAnswer: 0,
    explanation: 'Es proporcionalidad inversa. Más llaves, menos tiempo:',
    explanationLatex: '1 \\times 6 = 3 \\times x \\quad \\Rightarrow \\quad x = \\frac{6}{3} = 2 \\text{ horas}',
    difficulty: 'hard',
    skills: ['numeros-proporcionalidad', 'numeros-proporcionalidad-inversa', 'numeros-regla-tres', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-real-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Diagonal cuadrado = } 10\\sqrt{2}\\text{ cm. ¿Área?}',
    options: ['$100$ cm²', '$200$ cm²', '$100\\sqrt{2}$ cm²', '$400$ cm²'],
    optionsLatex: ['100\\text{ cm}^2', '200\\text{ cm}^2', '100\\sqrt{2}\\text{ cm}^2', '400\\text{ cm}^2'],
    correctAnswer: 1,
    explanation: 'Si diagonal = lado × √2, entonces lado = diagonal/√2 = 10√2/√2 = 10 cm. Área = 10² = 100 cm²... Error: debe ser 200',
    explanationLatex: 'd = l\\sqrt{2} \\rightarrow l = \\frac{10\\sqrt{2}}{\\sqrt{2}} = 10\\text{ cm}. \\quad A = l^2 = 10^2 = 100\\text{ cm}^2',
    difficulty: 'hard',
    skills: ['numeros-reales', 'numeros-reales-problemas-raices', 'geometria-area', 'numeros-raices', 'numeros-racionalizacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-real-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Si } \\pi \\approx 3.14159 \\text{ y usamos } 3.14, \\text{ ¿error absoluto?}',
    options: ['$0.00159$', '$0.0159$', '$0.159$', '$1.59$'],
    optionsLatex: ['0.00159', '0.0159', '0.159', '1.59'],
    correctAnswer: 0,
    explanation: 'El error absoluto es |valor real - valor aproximado| = |3.14159 - 3.14| = 0.00159',
    explanationLatex: '\\text{Error absoluto} = |3.14159 - 3.14| = 0.00159',
    difficulty: 'medium',
    skills: ['numeros-reales', 'numeros-reales-problemas-aproximacion', 'numeros-irracionales', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-real-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Radio } = \\sqrt{50}\\text{ cm. ¿Área simplificada?}',
    options: ['$50\\pi$ cm²', '$25\\pi$ cm²', '$10\\pi\\sqrt{5}$ cm²', '$100\\pi$ cm²'],
    optionsLatex: ['50\\pi\\text{ cm}^2', '25\\pi\\text{ cm}^2', '10\\pi\\sqrt{5}\\text{ cm}^2', '100\\pi\\text{ cm}^2'],
    correctAnswer: 0,
    explanation: 'Área = πr² = π(√50)² = π × 50 = 50π cm²',
    explanationLatex: 'A = \\pi r^2 = \\pi(\\sqrt{50})^2 = 50\\pi\\text{ cm}^2',
    difficulty: 'medium',
    skills: ['numeros-reales', 'numeros-reales-problemas-raices', 'geometria-area-circulo', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  // Subsection B: Problemas de medición con irracionales
  {
    id: 'm2-num-med-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Terreno cuadrado, área 50 m}^2\\text{. ¿Longitud lado?}',
    options: ['$5$ m', '$5\\sqrt{2}$ m', '$10$ m', '$25$ m'],
    optionsLatex: ['5\\text{ m}', '5\\sqrt{2}\\text{ m}', '10\\text{ m}', '25\\text{ m}'],
    correctAnswer: 1,
    explanation: 'Si área = lado², entonces lado = √50 = √(25×2) = 5√2 m',
    explanationLatex: 'l = \\sqrt{50} = \\sqrt{25 \\times 2} = 5\\sqrt{2}\\text{ m}',
    difficulty: 'medium',
    skills: ['numeros-reales-problemas-medicion', 'geometria-area', 'numeros-raices', 'numeros-simplificacion-raices', 'numeros-operaciones-basicas']
  },
  // Subsection D: Aplicaciones en ciencias y tecnología
  {
    id: 'm2-num-cienc-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Si } I = 10^{-6}\\text{ y } I_0 = 10^{-12}, dB = 10\\log_{10}(I/I_0). \\text{ ¿dB?}',
    options: ['40 dB', '50 dB', '60 dB', '70 dB'],
    optionsLatex: ['40\\text{ dB}', '50\\text{ dB}', '60\\text{ dB}', '70\\text{ dB}'],
    correctAnswer: 2,
    explanation: 'dB = 10×log₁₀(10⁻⁶/10⁻¹²) = 10×log₁₀(10⁶) = 10×6 = 60 dB',
    explanationLatex: 'dB = 10\\log_{10}\\left(\\frac{10^{-6}}{10^{-12}}\\right) = 10\\log_{10}(10^6) = 10 \\times 6 = 60\\text{ dB}',
    difficulty: 'hard',
    skills: ['numeros-reales-problemas-ciencias', 'logaritmos-problemas-escalas', 'logaritmos-propiedades', 'numeros-potencias', 'numeros-operaciones-basicas']
  }
];
