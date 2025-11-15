import { Question } from '../../../types';

/**
 * M2-NUM-006: Problemas con logaritmos en distintos contextos
 *
 * Subsections:
 * A. Ecuaciones logarítmicas
 *    Habilidades: logaritmos-ecuaciones
 * B. Ecuaciones exponenciales
 *    Habilidades: logaritmos-ecuaciones-exponenciales
 * C. Aplicaciones en ciencias naturales
 *    Habilidades: logaritmos-problemas-ciencias
 * D. Escalas logarítmicas (pH, Richter, decibeles)
 *    Habilidades: logaritmos-problemas-escalas
 */

export const m2Num006Questions: Question[] = [
  {
    id: 'm2-num-log-prob-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Resuelve: } \\log_2 x = 5',
    options: ['$x = 10$', '$x = 25$', '$x = 32$', '$x = 64$'],
    optionsLatex: ['x = 10', 'x = 25', 'x = 32', 'x = 64'],
    correctAnswer: 2,
    explanation: 'log₂x = 5 significa que 2⁵ = x, por lo tanto x = 32',
    explanationLatex: '\\log_2 x = 5 \\rightarrow 2^5 = x \\rightarrow x = 32',
    difficulty: 'medium',
    skills: ['numeros-logaritmos', 'logaritmos-ecuaciones', 'logaritmos-relacion-potencias', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-log-prob-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Resuelve usando logaritmos: } 2^x = 100',
    options: ['$x \\approx 6.64$', '$x \\approx 7.32$', '$x \\approx 8.14$', '$x \\approx 10$'],
    optionsLatex: ['x \\approx 6.64', 'x \\approx 7.32', 'x \\approx 8.14', 'x \\approx 10'],
    correctAnswer: 0,
    explanation: 'Aplicamos logaritmo: x·log2 = log100, entonces x = log100/log2 ≈ 2/0.301 ≈ 6.64',
    explanationLatex: '2^x = 100 \\rightarrow x = \\frac{\\log 100}{\\log 2} \\approx \\frac{2}{0.301} \\approx 6.64',
    difficulty: 'hard',
    skills: ['numeros-logaritmos', 'logaritmos-ecuaciones-exponenciales', 'logaritmos-cambio-base', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-log-prob-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Si } pH = -\\log[H^+] \\text{ y } [H^+] = 10^{-4}, \\text{ ¿cuál es el pH?}',
    options: ['$-4$', '$4$', '$0.0001$', '$10$'],
    optionsLatex: ['-4', '4', '0.0001', '10'],
    correctAnswer: 1,
    explanation: 'pH = -log(10⁻⁴) = -(-4) = 4',
    explanationLatex: 'pH = -\\log(10^{-4}) = -(-4) = 4',
    difficulty: 'medium',
    skills: ['numeros-logaritmos', 'logaritmos-problemas-escalas', 'logaritmos-problemas-ciencias', 'numeros-exponentes-negativos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-log-prob-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Terremoto magnitud 7 vs 5. ¿Factor de intensidad?}',
    options: ['2 veces', '10 veces', '100 veces', '1000 veces'],
    optionsLatex: ['2\\text{ veces}', '10\\text{ veces}', '100\\text{ veces}', '1000\\text{ veces}'],
    correctAnswer: 2,
    explanation: '7 = log(I₇/I₀) y 5 = log(I₅/I₀). Restando: 2 = log(I₇/I₅), entonces I₇/I₅ = 10² = 100',
    explanationLatex: '7 - 5 = \\log\\left(\\frac{I_7}{I_5}\\right) \\rightarrow 2 = \\log\\left(\\frac{I_7}{I_5}\\right) \\rightarrow \\frac{I_7}{I_5} = 10^2 = 100',
    difficulty: 'extreme',
    skills: ['numeros-logaritmos', 'logaritmos-problemas-escalas', 'logaritmos-propiedad-cociente', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-log-prob-5',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Resuelve: } \\log_3(x + 2) = 2',
    options: ['$x = 5$', '$x = 7$', '$x = 9$', '$x = 11$'],
    optionsLatex: ['x = 5', 'x = 7', 'x = 9', 'x = 11'],
    correctAnswer: 1,
    explanation: 'log₃(x+2) = 2 significa 3² = x+2, entonces 9 = x+2, por lo tanto x = 7',
    explanationLatex: '\\log_3(x + 2) = 2 \\rightarrow 3^2 = x + 2 \\rightarrow 9 = x + 2 \\rightarrow x = 7',
    difficulty: 'hard',
    skills: ['numeros-logaritmos', 'logaritmos-ecuaciones', 'algebra-despeje', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-log-prob-6',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Si } dB = 10\\log\\left(\\frac{I}{I_0}\\right) \\text{ y } dB = 80, \\text{ ¿cuál es } \\frac{I}{I_0}?',
    options: ['$10^6$', '$10^7$', '$10^8$', '$10^9$'],
    optionsLatex: ['10^6', '10^7', '10^8', '10^9'],
    correctAnswer: 2,
    explanation: '80 = 10·log(I/I₀), entonces 8 = log(I/I₀), por lo tanto I/I₀ = 10⁸',
    explanationLatex: '80 = 10\\log\\left(\\frac{I}{I_0}\\right) \\rightarrow 8 = \\log\\left(\\frac{I}{I_0}\\right) \\rightarrow \\frac{I}{I_0} = 10^8',
    difficulty: 'hard',
    skills: ['numeros-logaritmos', 'logaritmos-problemas-escalas', 'logaritmos-relacion-potencias', 'algebra-despeje', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-log-prob-7',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Resuelve: } 2^{x+1} = 128',
    options: ['$x = 5$', '$x = 6$', '$x = 7$', '$x = 8$'],
    optionsLatex: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
    correctAnswer: 1,
    explanation: '128 = 2⁷, entonces 2ˣ⁺¹ = 2⁷, por lo tanto x+1 = 7 y x = 6',
    explanationLatex: '2^{x+1} = 128 = 2^7 \\rightarrow x+1 = 7 \\rightarrow x = 6',
    difficulty: 'medium',
    skills: ['numeros-logaritmos', 'logaritmos-ecuaciones-exponenciales', 'algebra-despeje', 'numeros-potencias', 'numeros-operaciones-basicas']
  }
];
