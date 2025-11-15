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
  },
  // Additional: Aplicaciones en ciencias naturales
  {
    id: 'm2-num-log-cienc-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Crecimiento bacteriano: } N = N_0 \\cdot 2^t. \\text{ Si } N_0 = 100 \\text{ y } N = 3200, \\text{ ¿t en horas?}',
    options: ['$t = 3$', '$t = 4$', '$t = 5$', '$t = 6$'],
    optionsLatex: ['t = 3', 't = 4', 't = 5', 't = 6'],
    correctAnswer: 2,
    explanation: '3200 = 100·2ᵗ → 32 = 2ᵗ → 2⁵ = 2ᵗ → t = 5',
    explanationLatex: '3200 = 100 \\cdot 2^t \\rightarrow 32 = 2^t \\rightarrow t = 5',
    difficulty: 'medium',
    skills: ['logaritmos-problemas-ciencias', 'logaritmos-ecuaciones-exponenciales', 'numeros-potencias', 'algebra-despeje']
  },
  {
    id: 'm2-num-log-cienc-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Decaimiento radiactivo: } N = N_0 e^{-kt}. \\text{ Si queda } \\frac{1}{e} \\text{ del original, } kt = ?',
    options: ['$1$', '$e$', '$-1$', '$\\frac{1}{e}$'],
    optionsLatex: ['1', 'e', '-1', '\\frac{1}{e}'],
    correctAnswer: 0,
    explanation: 'N/N₀ = 1/e = e⁻¹ = e^(-kt), entonces -kt = -1, kt = 1',
    explanationLatex: '\\frac{N}{N_0} = \\frac{1}{e} = e^{-1} = e^{-kt} \\rightarrow kt = 1',
    difficulty: 'hard',
    skills: ['logaritmos-problemas-ciencias', 'logaritmos-tipos', 'numeros-potencias', 'algebra-despeje']
  },
  {
    id: 'm2-num-log-cienc-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Ley de enfriamiento de Newton: } T = T_0 e^{-0.1t}. \\text{ Si } T_0 = 100°C \\text{ y } T = 36.8°C, \\text{ ¿t?}',
    options: ['$t = 1$', '$t = 5$', '$t = 10$', '$t = 20$'],
    optionsLatex: ['t = 1', 't = 5', 't = 10', 't = 20'],
    correctAnswer: 2,
    explanation: '36.8/100 ≈ 1/e ≈ 0.368. Entonces e^(-0.1t) = e^(-1), -0.1t = -1, t = 10',
    explanationLatex: '\\frac{36.8}{100} \\approx e^{-1} \\rightarrow -0.1t = -1 \\rightarrow t = 10',
    difficulty: 'extreme',
    skills: ['logaritmos-problemas-ciencias', 'logaritmos-tipos', 'numeros-decimales', 'algebra-despeje']
  },
  {
    id: 'm2-num-log-cienc-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Vida media de C-14: 5730 años. Fórmula: } t = \\frac{\\ln(N_0/N)}{0.000121}. \\text{ Si queda 25\\%, ¿edad aproximada?}',
    options: ['$\\approx 5730$ años', '$\\approx 11460$ años', '$\\approx 17190$ años', '$\\approx 22920$ años'],
    optionsLatex: ['\\approx 5730\\text{ años}', '\\approx 11460\\text{ años}', '\\approx 17190\\text{ años}', '\\approx 22920\\text{ años}'],
    correctAnswer: 1,
    explanation: 'Si queda 25% = 1/4, han pasado 2 vidas medias. t ≈ 2 × 5730 = 11460 años',
    explanationLatex: '25\\% = \\frac{1}{4} = \\frac{1}{2^2} \\rightarrow 2 \\text{ vidas medias} \\rightarrow t \\approx 11460\\text{ años}',
    difficulty: 'hard',
    skills: ['logaritmos-problemas-ciencias', 'logaritmos-tipos', 'numeros-porcentaje', 'numeros-operaciones-basicas']
  }
];
