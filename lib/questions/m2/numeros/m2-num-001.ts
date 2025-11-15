import { Question } from '../../../types';

/**
 * M2-NUM-001: Operaciones en el conjunto de los números reales
 *
 * Subsections:
 * A. Números irracionales y su representación
 *    Habilidades: numeros-reales-irracionales
 * B. Operaciones con números reales
 *    Habilidades: numeros-reales-operaciones
 * C. Aproximaciones y redondeo
 *    Habilidades: numeros-reales-aproximaciones
 * D. Intervalos y conjuntos en la recta real
 *    Habilidades: numeros-reales-intervalos
 */

export const m2Num001Questions: Question[] = [
  {
    id: 'm2-num-ent-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Calcula: } \\frac{2}{3} - \\frac{3}{4} + \\frac{1}{6}',
    options: ['\\frac{1}{12}', '\\frac{1}{6}', '\\frac{5}{12}', '\\frac{7}{12}'],
    correctAnswer: 0,
    explanation: '\\frac{8}{12} - \\frac{9}{12} + \\frac{2}{12} = \\frac{8 - 9 + 2}{12} = \\frac{1}{12}',
    difficulty: 'medium',
    skills: ['numeros-reales-operaciones', 'numeros-fracciones', 'numeros-fracciones-comun-denominador', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-ent-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{El resultado de } (-3) \\times (-2) \\times 5 \\times (-1) \\text{ es:}',
    options: ['-30', '30', '-15', '15'],
    correctAnswer: 0,
    explanation: '(-3) \\times (-2) \\times 5 \\times (-1) = 6 \\times 5 \\times (-1) = 30 \\times (-1) = -30',
    difficulty: 'medium',
    skills: ['numeros-reales-operaciones', 'numeros-enteros', 'numeros-multiplicacion-enteros', 'numeros-signos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-ent-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Simplifica: } \\frac{\\frac{2}{3} + \\frac{1}{4}}{\\frac{5}{6} - \\frac{1}{3}}',
    options: ['\\frac{11}{6}', '\\frac{6}{11}', '\\frac{22}{12}', '2'],
    correctAnswer: 0,
    explanation: '\\frac{\\frac{11}{12}}{\\frac{1}{2}} = \\frac{11}{12} \\times \\frac{2}{1} = \\frac{11}{6}',
    difficulty: 'extreme',
    skills: ['numeros-reales-operaciones', 'numeros-fracciones', 'numeros-fracciones-complejas', 'numeros-division-fracciones', 'numeros-comun-denominador', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-pot-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Simplifica: } (2^3)^2 \\cdot 2^{-4}',
    options: ['2^2', '2^4', '2^{10}', '2^{-2}'],
    correctAnswer: 0,
    explanation: '(2^3)^2 \\cdot 2^{-4} = 2^6 \\cdot 2^{-4} = 2^{6-4} = 2^2',
    difficulty: 'medium',
    skills: ['numeros-reales-operaciones', 'numeros-potencias', 'numeros-propiedades-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-pot-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Simplifica: } \\sqrt{72}',
    options: ['6\\sqrt{2}', '8\\sqrt{3}', '4\\sqrt{3}', '9\\sqrt{2}'],
    correctAnswer: 0,
    explanation: '\\sqrt{72} = \\sqrt{36 \\times 2} = \\sqrt{36} \\times \\sqrt{2} = 6\\sqrt{2}',
    difficulty: 'hard',
    skills: ['numeros-reales-irracionales', 'numeros-raices', 'numeros-simplificacion-raices', 'numeros-factorizacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-pot-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{El valor de } \\left(\\frac{1}{2}\\right)^{-3} \\text{ es:}',
    options: ['8', '-8', '\\frac{1}{8}', '-\\frac{1}{8}'],
    correctAnswer: 0,
    explanation: '\\left(\\frac{1}{2}\\right)^{-3} = \\left(\\frac{2}{1}\\right)^{3} = 2^3 = 8',
    difficulty: 'hard',
    skills: ['numeros-reales-operaciones', 'numeros-potencias', 'numeros-exponentes-negativos', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-pot-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Simplifica: } \\sqrt{50} + \\sqrt{32} - \\sqrt{18}',
    options: ['7\\sqrt{2}', '5\\sqrt{2}', '8\\sqrt{2}', '6\\sqrt{2}'],
    correctAnswer: 3,
    explanation: '5\\sqrt{2} + 4\\sqrt{2} - 3\\sqrt{2} = (5+4-3)\\sqrt{2} = 6\\sqrt{2}',
    difficulty: 'extreme',
    skills: ['numeros-reales-irracionales', 'numeros-raices', 'numeros-simplificacion-raices', 'numeros-suma-radicales', 'numeros-factorizacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{El mínimo común múltiplo (MCM) de 12, 18 y 24 es:}',
    options: ['36', '48', '72', '144'],
    correctAnswer: 2,
    explanation: '12 = 2^2 \\times 3, \\quad 18 = 2 \\times 3^2, \\quad 24 = 2^3 \\times 3 \\quad \\Rightarrow \\quad \\text{MCM} = 2^3 \\times 3^2 = 8 \\times 9 = 72',
    difficulty: 'medium',
    skills: ['numeros-reales-operaciones', 'numeros-mcd-mcm', 'numeros-factorizacion-prima', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-mcd-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{El máximo común divisor (MCD) de 48, 72 y 120 es:}',
    options: ['12', '24', '36', '8'],
    correctAnswer: 1,
    explanation: '48 = 2^4 \\times 3, \\quad 72 = 2^3 \\times 3^2, \\quad 120 = 2^3 \\times 3 \\times 5 \\quad \\Rightarrow \\quad \\text{MCD} = 2^3 \\times 3 = 24',
    difficulty: 'hard',
    skills: ['numeros-reales-operaciones', 'numeros-mcd-mcm', 'numeros-factorizacion-prima', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-mcd-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{El MCM de 15, 20 y 25 es:}',
    options: ['100', '150', '300', '75'],
    correctAnswer: 2,
    explanation: '15 = 3 \\times 5, \\quad 20 = 2^2 \\times 5, \\quad 25 = 5^2 \\quad \\Rightarrow \\quad \\text{MCM} = 2^2 \\times 3 \\times 5^2 = 300',
    difficulty: 'hard',
    skills: ['numeros-reales-operaciones', 'numeros-mcd-mcm', 'numeros-factorizacion-prima', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-mcd-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{El MCD de 36 y 48 es:}',
    options: ['6', '12', '18', '24'],
    correctAnswer: 1,
    explanation: '36 = 2^2 \\times 3^2, \\quad 48 = 2^4 \\times 3 \\quad \\Rightarrow \\quad \\text{MCD} = 2^2 \\times 3 = 12',
    difficulty: 'medium',
    skills: ['numeros-reales-operaciones', 'numeros-mcd-mcm', 'numeros-factorizacion-prima', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-mcd-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Si MCD}(a,b) = 6, \\text{ MCM}(a,b) = 72 \\text{ y } a = 18, \\text{ ¿cuál es } b?',
    options: ['12', '24', '36', '48'],
    correctAnswer: 1,
    explanation: '6 \\times 72 = 18 \\times b \\quad \\Rightarrow \\quad b = \\frac{432}{18} = 24',
    difficulty: 'extreme',
    skills: ['numeros-reales-operaciones', 'numeros-mcd-mcm', 'numeros-relacion-mcd-mcm', 'numeros-operaciones-basicas', 'algebra-despeje']
  },
  {
    id: 'm2-9',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Racionaliza: } \\frac{6}{\\sqrt{3}}',
    options: ['2\\sqrt{3}', '3\\sqrt{2}', '6\\sqrt{3}', '\\sqrt{18}'],
    correctAnswer: 0,
    explanation: '\\frac{6}{\\sqrt{3}} = \\frac{6}{\\sqrt{3}} \\times \\frac{\\sqrt{3}}{\\sqrt{3}} = \\frac{6\\sqrt{3}}{3} = 2\\sqrt{3}',
    difficulty: 'medium',
    skills: ['numeros-reales-irracionales', 'numeros-racionalizacion', 'numeros-raices', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-rac-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Racionaliza: } \\frac{10}{\\sqrt{5} + \\sqrt{3}}',
    options: ['5(\\sqrt{5} - \\sqrt{3})', '5(\\sqrt{5} + \\sqrt{3})', '\\frac{10}{2}', '10\\sqrt{2}'],
    correctAnswer: 0,
    explanation: '\\frac{10}{\\sqrt{5} + \\sqrt{3}} \\times \\frac{\\sqrt{5} - \\sqrt{3}}{\\sqrt{5} - \\sqrt{3}} = \\frac{10(\\sqrt{5} - \\sqrt{3})}{5 - 3} = \\frac{10(\\sqrt{5} - \\sqrt{3})}{2} = 5(\\sqrt{5} - \\sqrt{3})',
    difficulty: 'extreme',
    skills: ['numeros-reales-irracionales', 'numeros-racionalizacion', 'numeros-racionalizacion-conjugado', 'numeros-raices', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-rac-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Racionaliza: } \\frac{12}{2\\sqrt{3}}',
    options: ['2\\sqrt{3}', '4\\sqrt{3}', '6\\sqrt{3}', '\\sqrt{3}'],
    correctAnswer: 0,
    explanation: '\\frac{12}{2\\sqrt{3}} = \\frac{6}{\\sqrt{3}} \\times \\frac{\\sqrt{3}}{\\sqrt{3}} = \\frac{6\\sqrt{3}}{3} = 2\\sqrt{3}',
    difficulty: 'medium',
    skills: ['numeros-reales-irracionales', 'numeros-racionalizacion', 'numeros-raices', 'numeros-fracciones', 'numeros-simplificacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-rac-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Racionaliza y simplifica: } \\frac{\\sqrt{8}}{\\sqrt{2}}',
    options: ['2', '\\sqrt{4}', '4', '\\sqrt{2}'],
    correctAnswer: 0,
    explanation: '\\frac{\\sqrt{8}}{\\sqrt{2}} = \\sqrt{\\frac{8}{2}} = \\sqrt{4} = 2',
    difficulty: 'medium',
    skills: ['numeros-reales-irracionales', 'numeros-racionalizacion', 'numeros-raices', 'numeros-simplificacion-raices', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-rac-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Racionaliza: } \\frac{6}{\\sqrt{2} - 1}',
    options: ['6(\\sqrt{2} + 1)', '6(\\sqrt{2} - 1)', '3(\\sqrt{2} + 1)', '12\\sqrt{2}'],
    correctAnswer: 0,
    explanation: '\\frac{6}{\\sqrt{2} - 1} \\times \\frac{\\sqrt{2} + 1}{\\sqrt{2} + 1} = \\frac{6(\\sqrt{2} + 1)}{2 - 1} = 6(\\sqrt{2} + 1)',
    difficulty: 'hard',
    skills: ['numeros-reales-irracionales', 'numeros-racionalizacion', 'numeros-racionalizacion-conjugado', 'numeros-raices', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  // Subsection C: Aproximaciones y redondeo
  {
    id: 'm2-num-aprox-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Si } \\pi \\approx 3.14159265 \\text{ se redondea a 2 decimales:}',
    options: ['3.14', '3.15', '3.1', '3.2'],
    correctAnswer: 0,
    explanation: '3.14159... \\rightarrow 3.14 \\text{ (el tercer decimal es 1 < 5)}',
    difficulty: 'easy',
    skills: ['numeros-reales-aproximaciones', 'numeros-redondeo', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-aprox-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Masa: 45.678 g. Con 3 cifras significativas:}',
    options: ['45.6\\text{ g}', '45.7\\text{ g}', '46.0\\text{ g}', '45.0\\text{ g}'],
    correctAnswer: 1,
    explanation: '45.678 \\rightarrow 45.7 \\text{ g (3 cifras significativas)}',
    difficulty: 'medium',
    skills: ['numeros-reales-aproximaciones', 'numeros-cifras-significativas', 'numeros-redondeo', 'numeros-decimales']
  },
  {
    id: 'm2-num-aprox-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Si } \\sqrt{2} \\approx 1.414 \\text{ se aproxima por 1.4, ¿error absoluto?}',
    options: ['0.014', '0.014213', '0.01', '0.1'],
    correctAnswer: 0,
    explanation: '\\text{Error} = |1.414 - 1.4| \\approx 0.014',
    difficulty: 'medium',
    skills: ['numeros-reales-aproximaciones', 'numeros-error-absoluto', 'numeros-raices', 'numeros-operaciones-basicas']
  },
  // Subsection D: Intervalos y conjuntos en la recta real
  {
    id: 'm2-num-int-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{El intervalo } [2, 5) \\text{ representa:}',
    options: ['2 < x < 5', '2 \\leq x < 5', '2 < x \\leq 5', '2 \\leq x \\leq 5'],
    correctAnswer: 1,
    explanation: '[2, 5) = \\{x \\in \\mathbb{R} : 2 \\leq x < 5\\}',
    difficulty: 'easy',
    skills: ['numeros-reales-intervalos', 'numeros-notacion-intervalos', 'numeros-desigualdades']
  },
  {
    id: 'm2-num-int-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{La desigualdad } x > -3 \\text{ en notación de intervalos:}',
    options: ['[-3, \\infty)', '(-3, \\infty)', '(-\\infty, -3)', '(-\\infty, -3]'],
    correctAnswer: 1,
    explanation: 'x > -3 \\Leftrightarrow x \\in (-3, \\infty)',
    difficulty: 'medium',
    skills: ['numeros-reales-intervalos', 'numeros-notacion-intervalos', 'numeros-desigualdades', 'numeros-recta-numerica']
  },
  {
    id: 'm2-num-int-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{La intersección } [1, 6] \\cap [4, 9] \\text{ es:}',
    options: ['[1, 9]', '[4, 6]', '[1, 4]', '[6, 9]'],
    correctAnswer: 1,
    explanation: '[1, 6] \\cap [4, 9] = [4, 6]',
    difficulty: 'medium',
    skills: ['numeros-reales-intervalos', 'numeros-operaciones-intervalos', 'numeros-interseccion-intervalos', 'numeros-conjuntos']
  },
  {
    id: 'm2-num-int-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{La unión } (-\\infty, 2] \\cup (5, \\infty) \\text{ es:}',
    options: ['(-\\infty, \\infty)', '(-\\infty, 2] \\cup (5, \\infty)', '[2, 5]', '(2, 5)'],
    correctAnswer: 1,
    explanation: '(-\\infty, 2] \\cup (5, \\infty) \\text{ (intervalos disjuntos)}',
    difficulty: 'hard',
    skills: ['numeros-reales-intervalos', 'numeros-operaciones-intervalos', 'numeros-union-intervalos', 'numeros-conjuntos']
  }
];
