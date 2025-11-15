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
  }
];
