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
    options: ['x = 10', 'x = 25', 'x = 32', 'x = 64'],
    correctAnswer: 2,
    explanation: '\\log_2 x = 5 \\rightarrow 2^5 = x \\rightarrow x = 32',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['numeros-logaritmos', 'logaritmos-ecuaciones', 'logaritmos-relacion-potencias', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-log-prob-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Resuelve usando logaritmos: } 2^x = 100',
    options: ['x \\approx 6.64', 'x \\approx 7.32', 'x \\approx 8.14', 'x \\approx 10'],
    correctAnswer: 0,
    explanation: '2^x = 100 \\rightarrow x = \\frac{\\log 100}{\\log 2} \\approx \\frac{2}{0.301} \\approx 6.64',
    difficulty: 'medium',
    difficultyScore: 0.45,
    skills: ['numeros-logaritmos', 'logaritmos-ecuaciones-exponenciales', 'logaritmos-cambio-base', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-log-prob-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Si } pH = -\\log[H^+] \\text{ y } [H^+] = 10^{-4}, \\text{ ¿cuál es el pH?}',
    options: ['-4', '4', '0.0001', '10'],
    correctAnswer: 1,
    explanation: 'pH = -\\log(10^{-4}) = -(-4) = 4',
    difficulty: 'medium',
    difficultyScore: 0.32,
    skills: ['numeros-logaritmos', 'logaritmos-problemas-escalas', 'logaritmos-problemas-ciencias', 'numeros-exponentes-negativos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-log-prob-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Terremoto magnitud 7 vs 5. ¿Factor de intensidad?}',
    options: ['2\\text{ veces}', '10\\text{ veces}', '100\\text{ veces}', '1000\\text{ veces}'],
    correctAnswer: 2,
    explanation: '7 - 5 = \\log\\left(\\frac{I_7}{I_5}\\right) \\rightarrow 2 = \\log\\left(\\frac{I_7}{I_5}\\right) \\rightarrow \\frac{I_7}{I_5} = 10^2 = 100',
    difficulty: 'hard',
    difficultyScore: 0.52,
    skills: ['numeros-logaritmos', 'logaritmos-problemas-escalas', 'logaritmos-propiedad-cociente', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-log-prob-5',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Resuelve: } \\log_3(x + 2) = 2',
    options: ['x = 5', 'x = 7', 'x = 9', 'x = 11'],
    correctAnswer: 1,
    explanation: '\\log_3(x + 2) = 2 \\rightarrow 3^2 = x + 2 \\rightarrow 9 = x + 2 \\rightarrow x = 7',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['numeros-logaritmos', 'logaritmos-ecuaciones', 'algebra-despeje', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-log-prob-6',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Si } dB = 10\\log\\left(\\frac{I}{I_0}\\right) \\text{ y } dB = 80, \\text{ ¿cuál es } \\frac{I}{I_0}?',
    options: ['10^6', '10^7', '10^8', '10^9'],
    correctAnswer: 2,
    explanation: '80 = 10\\log\\left(\\frac{I}{I_0}\\right) \\rightarrow 8 = \\log\\left(\\frac{I}{I_0}\\right) \\rightarrow \\frac{I}{I_0} = 10^8',
    difficulty: 'medium',
    difficultyScore: 0.42,
    skills: ['numeros-logaritmos', 'logaritmos-problemas-escalas', 'logaritmos-relacion-potencias', 'algebra-despeje', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-log-prob-7',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Resuelve: } 2^{x+1} = 128',
    options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
    correctAnswer: 1,
    explanation: '2^{x+1} = 128 = 2^7 \\rightarrow x+1 = 7 \\rightarrow x = 6',
    difficulty: 'medium',
    difficultyScore: 0.32,
    skills: ['numeros-logaritmos', 'logaritmos-ecuaciones-exponenciales', 'algebra-despeje', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  // Additional: Aplicaciones en ciencias naturales
  {
    id: 'm2-num-log-cienc-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Crecimiento bacteriano: } N = N_0 \\cdot 2^t. \\text{ Si } N_0 = 100 \\text{ y } N = 3200, \\text{ ¿t en horas?}',
    options: ['t = 3', 't = 4', 't = 5', 't = 6'],
    correctAnswer: 2,
    explanation: '3200 = 100 \\cdot 2^t \\rightarrow 32 = 2^t \\rightarrow t = 5',
    difficulty: 'medium',
    difficultyScore: 0.35,
    skills: ['logaritmos-problemas-ciencias', 'logaritmos-ecuaciones-exponenciales', 'numeros-potencias', 'algebra-despeje']
  },
  {
    id: 'm2-num-log-cienc-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Decaimiento radiactivo: } N = N_0 e^{-kt}. \\text{ Si queda } \\frac{1}{e} \\text{ del original, } kt = ?',
    options: ['1', 'e', '-1', '\\frac{1}{e}'],
    correctAnswer: 0,
    explanation: '\\frac{N}{N_0} = \\frac{1}{e} = e^{-1} = e^{-kt} \\rightarrow kt = 1',
    difficulty: 'medium',
    difficultyScore: 0.45,
    skills: ['logaritmos-problemas-ciencias', 'logaritmos-tipos', 'numeros-potencias', 'algebra-despeje']
  },
  {
    id: 'm2-num-log-cienc-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Ley de enfriamiento de Newton: } T = T_0 e^{-0.1t}. \\text{ Si } T_0 = 100°C \\text{ y } T = 36.8°C, \\text{ ¿t?}',
    options: ['t = 1', 't = 5', 't = 10', 't = 20'],
    correctAnswer: 2,
    explanation: '\\frac{36.8}{100} \\approx e^{-1} \\rightarrow -0.1t = -1 \\rightarrow t = 10',
    difficulty: 'hard',
    difficultyScore: 0.52,
    skills: ['logaritmos-problemas-ciencias', 'logaritmos-tipos', 'numeros-decimales', 'algebra-despeje']
  },
  {
    id: 'm2-num-log-cienc-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Vida media de C-14: 5730 años. Fórmula: } t = \\frac{\\ln(N_0/N)}{0.000121}. \\text{ Si queda 25\\%, ¿edad aproximada?}',
    options: ['\\approx 5730\\text{ años}', '\\approx 11460\\text{ años}', '\\approx 17190\\text{ años}', '\\approx 22920\\text{ años}'],
    correctAnswer: 1,
    explanation: '25\\% = \\frac{1}{4} = \\frac{1}{2^2} \\rightarrow 2 \\text{ vidas medias} \\rightarrow t \\approx 11460\\text{ años}',
    difficulty: 'medium',
    difficultyScore: 0.45,
    skills: ['logaritmos-problemas-ciencias', 'logaritmos-tipos', 'numeros-porcentaje', 'numeros-operaciones-basicas']
  },
  // Ecuaciones logarítmicas más complejas
  {
    id: 'm2-num-log-ec-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: '\\log(a) + \\log(b) = \\log(ab)',
    questionLatex: '\\text{Resuelve: } \\log(x) + \\log(x-3) = \\log(10)',
    options: ['x = 2', 'x = 5', 'x = -2', 'x = 10'],
    correctAnswer: 1,
    explanation: '\\log(x(x-3)) = \\log(10) \\rightarrow x^2 - 3x = 10 \\rightarrow x^2 - 3x - 10 = 0 \\rightarrow (x-5)(x+2) = 0. \\quad x = 5 \\text{ (válido)}',
    difficulty: 'hard',
    difficultyScore: 0.52,
    skills: ['logaritmos-ecuaciones', 'logaritmos-propiedad-producto', 'algebra-ecuaciones-cuadraticas', 'algebra-factorizacion']
  },
  {
    id: 'm2-num-log-ec-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: '\\log_2(a) + \\log_2(b) = \\log_2(ab)',
    questionLatex: '\\text{Resuelve: } \\log_2(x) + \\log_2(x-2) = 3',
    options: ['x = 2', 'x = 4', 'x = 6', 'x = 8'],
    correctAnswer: 1,
    explanation: '\\log_2(x(x-2)) = 3 \\rightarrow x^2 - 2x = 8 \\rightarrow x^2 - 2x - 8 = 0 \\rightarrow (x-4)(x+2) = 0. \\quad x = 4 \\text{ (válido)}',
    difficulty: 'hard',
    difficultyScore: 0.52,
    skills: ['logaritmos-ecuaciones', 'logaritmos-propiedad-producto', 'algebra-ecuaciones-cuadraticas', 'algebra-factorizacion']
  },
  {
    id: 'm2-num-log-ec-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: '\\log(a) - \\log(b) = \\log(a/b)',
    questionLatex: '\\text{Resuelve: } \\log(x+6) - \\log(x) = 1',
    options: ['x = \\frac{2}{3}', 'x = 1', 'x = \\frac{3}{2}', 'x = 2'],
    correctAnswer: 0,
    explanation: '\\log\\left(\\frac{x+6}{x}\\right) = 1 \\rightarrow \\frac{x+6}{x} = 10 \\rightarrow x + 6 = 10x \\rightarrow 6 = 9x \\rightarrow x = \\frac{2}{3}',
    difficulty: 'medium',
    difficultyScore: 0.45,
    skills: ['logaritmos-ecuaciones', 'logaritmos-propiedad-cociente', 'algebra-despeje', 'numeros-fracciones']
  },
  // Crecimiento y decrecimiento exponencial (sin logaritmos explícitos)
  {
    id: 'm2-num-exp-crec-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: 'N = N_0 \\cdot 2^{t/T}',
    questionLatex: '\\text{Una población de bacterias se duplica cada 3 horas. Si inicialmente hay 500 bacterias, ¿cuántas habrá después de 9 horas?}',
    options: ['1.500', '2.000', '4.000', '8.000'],
    correctAnswer: 2,
    explanation: '\\text{En 9 horas hay } \\frac{9}{3} = 3 \\text{ duplicaciones}. \\quad N = 500 \\times 2^3 = 500 \\times 8 = 4.000',
    difficulty: 'medium',
    difficultyScore: 0.32,
    skills: ['logaritmos-problemas-ciencias', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-exp-crec-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: 'N = N_0 \\cdot (1 + r)^t',
    questionLatex: '\\text{Una ciudad crece 5\\% anual. Si hoy tiene 100.000 habitantes, ¿cuántos tendrá en 2 años? (Usa } (1{,}05)^2 = 1{,}1025)',
    options: ['105.000', '110.000', '110.250', '115.000'],
    correctAnswer: 2,
    explanation: 'N = 100.000 \\times (1{,}05)^2 = 100.000 \\times 1{,}1025 = 110.250',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['logaritmos-problemas-ciencias', 'numeros-porcentaje', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-exp-decay-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: 'N = N_0 \\cdot \\left(\\frac{1}{2}\\right)^{t/T}',
    questionLatex: '\\text{Un medicamento se reduce a la mitad en el cuerpo cada 4 horas. Si tomas 400 mg, ¿cuánto queda después de 12 horas?}',
    options: ['25 mg', '50 mg', '100 mg', '200 mg'],
    correctAnswer: 1,
    explanation: '\\text{En 12 horas hay } \\frac{12}{4} = 3 \\text{ vidas medias}. \\quad N = 400 \\times \\left(\\frac{1}{2}\\right)^3 = 400 \\times \\frac{1}{8} = 50 \\text{ mg}',
    difficulty: 'medium',
    difficultyScore: 0.35,
    skills: ['logaritmos-problemas-ciencias', 'numeros-potencias', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-exp-decay-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: 'N = N_0 \\cdot (1 - r)^t',
    questionLatex: '\\text{Un auto pierde 20\\% de su valor cada año (depreciación). Si costó \\$10.000.000, ¿cuánto valdrá en 3 años? (Usa } (0{,}8)^3 = 0{,}512)',
    options: ['$4.000.000', '$5.120.000', '$6.000.000', '$8.000.000'],
    correctAnswer: 1,
    explanation: 'V = 10.000.000 \\times (0{,}8)^3 = 10.000.000 \\times 0{,}512 = 5.120.000',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['logaritmos-problemas-ciencias', 'numeros-porcentaje', 'numeros-potencias', 'numeros-decimales']
  },
  {
    id: 'm2-num-exp-tiempo-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Una inversión se triplica cada 10 años. Si hoy inviertes \\$1.000.000, ¿cuánto tendrás en 20 años?}',
    options: ['$3.000.000', '$6.000.000', '$9.000.000', '$27.000.000'],
    correctAnswer: 2,
    explanation: '\\text{En 20 años hay } \\frac{20}{10} = 2 \\text{ triplicaciones}. \\quad V = 1.000.000 \\times 3^2 = 9.000.000',
    difficulty: 'medium',
    difficultyScore: 0.35,
    skills: ['logaritmos-problemas-ciencias', 'numeros-potencias', 'numeros-operaciones-basicas']
  }
];
