import { Question } from '../../../types';

/**
 * M2-NUM-004: Relación entre potencias, raíces y logaritmos
 *
 * Subsections:
 * A. Definición de logaritmo
 *    Habilidades: logaritmos-definicion
 * B. Relación entre exponenciación y logaritmo
 *    Habilidades: logaritmos-relacion-potencias
 * C. Logaritmos decimales y naturales
 *    Habilidades: logaritmos-tipos
 * D. Cambio de base
 *    Habilidades: logaritmos-cambio-base
 */

export const m2Num004Questions: Question[] = [
  {
    id: 'm2-num-log-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{¿Cuál es el valor de } \\log_2 8?',
    options: ['$2$', '$3$', '$4$', '$8$'],
    optionsLatex: ['2', '3', '4', '8'],
    correctAnswer: 1,
    explanation: 'log₂8 pregunta: ¿2 elevado a qué potencia da 8? 2³ = 8, por lo tanto log₂8 = 3',
    explanationLatex: '\\log_2 8 = 3 \\text{ porque } 2^3 = 8',
    difficulty: 'easy',
    skills: ['numeros-logaritmos', 'logaritmos-definicion', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-log-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Si } \\log_5 x = 3, \\text{ ¿cuál es } x?',
    options: ['$8$', '$15$', '$25$', '$125$'],
    optionsLatex: ['8', '15', '25', '125'],
    correctAnswer: 3,
    explanation: 'log₅x = 3 significa que 5³ = x, por lo tanto x = 125',
    explanationLatex: '\\log_5 x = 3 \\rightarrow 5^3 = x \\rightarrow x = 125',
    difficulty: 'medium',
    skills: ['numeros-logaritmos', 'logaritmos-definicion', 'logaritmos-relacion-potencias', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-log-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{¿Cuál es el valor de } \\log_{10} 1000?',
    options: ['$2$', '$3$', '$4$', '$10$'],
    optionsLatex: ['2', '3', '4', '10'],
    correctAnswer: 1,
    explanation: 'log₁₀1000 = 3 porque 10³ = 1000',
    explanationLatex: '\\log_{10} 1000 = 3 \\text{ porque } 10^3 = 1000',
    difficulty: 'easy',
    skills: ['numeros-logaritmos', 'logaritmos-definicion', 'logaritmos-decimales', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-log-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Si } 2^x = 32, \\text{ ¿cuál es } x \\text{ como logaritmo?}',
    options: ['$x = \\log_2 32$', '$x = \\log_{32} 2$', '$x = \\log 2$', '$x = 32 \\log 2$'],
    optionsLatex: ['x = \\log_2 32', 'x = \\log_{32} 2', 'x = \\log 2', 'x = 32 \\log 2'],
    correctAnswer: 0,
    explanation: '2ˣ = 32 es equivalente a x = log₂32. También: 2⁵ = 32, entonces x = 5',
    explanationLatex: '2^x = 32 \\rightarrow x = \\log_2 32 = 5',
    difficulty: 'medium',
    skills: ['numeros-logaritmos', 'logaritmos-relacion-potencias', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-log-5',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{¿Cuál es el valor de } \\log_3 \\frac{1}{9}?',
    options: ['$-2$', '$-3$', '$\\frac{1}{2}$', '$2$'],
    optionsLatex: ['-2', '-3', '\\frac{1}{2}', '2'],
    correctAnswer: 0,
    explanation: 'log₃(1/9) pregunta: ¿3 elevado a qué da 1/9? 3⁻² = 1/9, entonces log₃(1/9) = -2',
    explanationLatex: '\\log_3 \\frac{1}{9} = -2 \\text{ porque } 3^{-2} = \\frac{1}{9}',
    difficulty: 'hard',
    skills: ['numeros-logaritmos', 'logaritmos-definicion', 'numeros-exponentes-negativos', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-log-6',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Usando cambio de base, } \\log_4 16 \\text{ es igual a:}',
    options: ['$\\frac{\\log 16}{\\log 4}$', '$\\frac{\\log 4}{\\log 16}$', '$\\log 16 - \\log 4$', '$\\log 16 + \\log 4$'],
    optionsLatex: ['\\frac{\\log 16}{\\log 4}', '\\frac{\\log 4}{\\log 16}', '\\log 16 - \\log 4', '\\log 16 + \\log 4'],
    correctAnswer: 0,
    explanation: 'La fórmula de cambio de base es: logₐb = (log b)/(log a)',
    explanationLatex: '\\log_4 16 = \\frac{\\log 16}{\\log 4} = \\frac{\\log 2^4}{\\log 2^2} = \\frac{4\\log 2}{2\\log 2} = 2',
    difficulty: 'hard',
    skills: ['numeros-logaritmos', 'logaritmos-cambio-base', 'logaritmos-definicion', 'numeros-fracciones']
  },
  {
    id: 'm2-num-log-7',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{¿Cuál es el valor de } \\log_7 1?',
    options: ['$0$', '$1$', '$7$', '$\\frac{1}{7}$'],
    optionsLatex: ['0', '1', '7', '\\frac{1}{7}'],
    correctAnswer: 0,
    explanation: 'logₐ1 = 0 para cualquier base a, porque a⁰ = 1',
    explanationLatex: '\\log_7 1 = 0 \\text{ porque } 7^0 = 1',
    difficulty: 'medium',
    skills: ['numeros-logaritmos', 'logaritmos-definicion', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-log-8',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Si } \\log_b 64 = 6, \\text{ ¿cuál es } b?',
    options: ['$2$', '$4$', '$8$', '$10$'],
    optionsLatex: ['2', '4', '8', '10'],
    correctAnswer: 0,
    explanation: 'logᵦ64 = 6 significa b⁶ = 64. Como 2⁶ = 64, entonces b = 2',
    explanationLatex: '\\log_b 64 = 6 \\rightarrow b^6 = 64 \\rightarrow b = 2 \\text{ (porque } 2^6 = 64)',
    difficulty: 'hard',
    skills: ['numeros-logaritmos', 'logaritmos-definicion', 'logaritmos-relacion-potencias', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  // Additional: Logaritmos decimales y naturales
  {
    id: 'm2-num-log-tipos-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{¿Cuál es la diferencia entre } \\log \\text{ y } \\ln?',
    options: ['log usa base 10, ln usa base e', 'log usa base e, ln usa base 10', 'Son lo mismo', 'log usa base 2, ln usa base e'],
    optionsLatex: ['\\log \\text{ base } 10, \\ln \\text{ base } e', '\\log \\text{ base } e, \\ln \\text{ base } 10', '\\text{Son iguales}', '\\log \\text{ base } 2, \\ln \\text{ base } e'],
    correctAnswer: 0,
    explanation: 'log (logaritmo común) usa base 10, ln (logaritmo natural) usa base e ≈ 2.718',
    explanationLatex: '\\log = \\log_{10}, \\quad \\ln = \\log_e \\text{ donde } e \\approx 2.718',
    difficulty: 'easy',
    skills: ['logaritmos-tipos', 'logaritmos-definicion', 'numeros-irracionales']
  },
  {
    id: 'm2-num-log-tipos-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{¿Cuál es el valor de } \\ln e^3?',
    options: ['$e$', '$3$', '$e^3$', '$3e$'],
    optionsLatex: ['e', '3', 'e^3', '3e'],
    correctAnswer: 1,
    explanation: 'ln(eˣ) = x, por lo tanto ln(e³) = 3',
    explanationLatex: '\\ln e^3 = 3 \\text{ porque } \\ln e^x = x',
    difficulty: 'medium',
    skills: ['logaritmos-tipos', 'logaritmos-definicion', 'logaritmos-relacion-potencias', 'numeros-potencias']
  },
  {
    id: 'm2-num-log-tipos-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{¿Cuál es el valor de } \\log 0.001?',
    options: ['$-3$', '$-2$', '$3$', '$0.001$'],
    optionsLatex: ['-3', '-2', '3', '0.001'],
    correctAnswer: 0,
    explanation: '0.001 = 10⁻³, entonces log(0.001) = log(10⁻³) = -3',
    explanationLatex: '\\log 0.001 = \\log 10^{-3} = -3',
    difficulty: 'medium',
    skills: ['logaritmos-tipos', 'logaritmos-definicion', 'numeros-exponentes-negativos', 'numeros-decimales']
  },
  {
    id: 'm2-num-log-tipos-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Si } e \\approx 2.718, \\text{ ¿cuál es el valor aproximado de } \\ln 10?',
    options: ['$\\approx 1.5$', '$\\approx 2.3$', '$\\approx 3.0$', '$\\approx 10$'],
    optionsLatex: ['\\approx 1.5', '\\approx 2.3', '\\approx 3.0', '\\approx 10'],
    correctAnswer: 1,
    explanation: 'ln(10) significa: ¿e elevado a qué da 10? e^2.3 ≈ 10, entonces ln(10) ≈ 2.3',
    explanationLatex: '\\ln 10 \\approx 2.303 \\text{ porque } e^{2.303} \\approx 10',
    difficulty: 'hard',
    skills: ['logaritmos-tipos', 'logaritmos-definicion', 'numeros-irracionales', 'numeros-decimales']
  },
  // Additional: Cambio de base
  {
    id: 'm2-num-log-cambio-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{La fórmula de cambio de base para } \\log_a b \\text{ es:}',
    options: ['$\\frac{\\log b}{\\log a}$', '$\\frac{\\log a}{\\log b}$', '$\\log b - \\log a$', '$\\log(b-a)$'],
    optionsLatex: ['\\frac{\\log b}{\\log a}', '\\frac{\\log a}{\\log b}', '\\log b - \\log a', '\\log(b-a)'],
    correctAnswer: 0,
    explanation: 'La fórmula de cambio de base es: logₐb = (log b)/(log a) usando cualquier base común',
    explanationLatex: '\\log_a b = \\frac{\\log b}{\\log a} = \\frac{\\ln b}{\\ln a}',
    difficulty: 'medium',
    skills: ['logaritmos-cambio-base', 'logaritmos-definicion', 'numeros-fracciones']
  },
  {
    id: 'm2-num-log-cambio-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Calcular } \\log_8 32 \\text{ usando cambio de base:}',
    options: ['$\\frac{3}{5}$', '$\\frac{4}{3}$', '$\\frac{5}{3}$', '$4$'],
    optionsLatex: ['\\frac{3}{5}', '\\frac{4}{3}', '\\frac{5}{3}', '4'],
    correctAnswer: 2,
    explanation: 'log₈32 = log32/log8 = log2⁵/log2³ = (5·log2)/(3·log2) = 5/3',
    explanationLatex: '\\log_8 32 = \\frac{\\log 32}{\\log 8} = \\frac{\\log 2^5}{\\log 2^3} = \\frac{5}{3}',
    difficulty: 'hard',
    skills: ['logaritmos-cambio-base', 'logaritmos-propiedad-potencia', 'numeros-fracciones', 'numeros-potencias']
  },
  {
    id: 'm2-num-log-cambio-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Si } \\log 2 \\approx 0.301, \\text{ calcular } \\log_2 10:',
    options: ['$\\approx 3.32$', '$\\approx 2.5$', '$\\approx 1.5$', '$\\approx 0.5$'],
    optionsLatex: ['\\approx 3.32', '\\approx 2.5', '\\approx 1.5', '\\approx 0.5'],
    correctAnswer: 0,
    explanation: 'log₂10 = log10/log2 = 1/0.301 ≈ 3.32',
    explanationLatex: '\\log_2 10 = \\frac{\\log 10}{\\log 2} = \\frac{1}{0.301} \\approx 3.32',
    difficulty: 'hard',
    skills: ['logaritmos-cambio-base', 'logaritmos-tipos', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-log-cambio-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Expresar } \\log_5 7 \\text{ en términos de logaritmo natural:}',
    options: ['$\\frac{\\ln 7}{\\ln 5}$', '$\\frac{\\ln 5}{\\ln 7}$', '$\\ln 7 - \\ln 5$', '$\\ln 35$'],
    optionsLatex: ['\\frac{\\ln 7}{\\ln 5}', '\\frac{\\ln 5}{\\ln 7}', '\\ln 7 - \\ln 5', '\\ln 35'],
    correctAnswer: 0,
    explanation: 'Por cambio de base: log₅7 = ln7/ln5',
    explanationLatex: '\\log_5 7 = \\frac{\\ln 7}{\\ln 5}',
    difficulty: 'medium',
    skills: ['logaritmos-cambio-base', 'logaritmos-tipos', 'numeros-fracciones']
  }
];
