import { Question } from '../../../types';

/**
 * M2-PROB-002: Aplicaciones y propiedades de la probabilidad condicional
 *
 * Subsections:
 * A. Concepto de probabilidad condicional
 *    Habilidades: probabilidad-condicional-concepto
 * B. Teorema de Bayes
 *    Habilidades: probabilidad-teorema-bayes
 * C. Eventos independientes y dependientes
 *    Habilidades: probabilidad-eventos-independientes
 * D. Aplicaciones de probabilidad condicional
 *    Habilidades: probabilidad-condicional-aplicaciones
 */

export const m2Prob002Questions: Question[] = [
  {
    id: 'm2-prob-rp-3',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'En una urna hay 5 bolas rojas y 3 azules. Si se extraen dos bolas sin reposición, ¿cuál es la probabilidad de que ambas sean rojas?',
    questionLatex: '\\text{Urna: 5 rojas, 3 azules. Extraer 2 sin reposición. ¿P(ambas rojas)?}',
    options: ['$\\frac{5}{14}$', '$\\frac{10}{28}$', '$\\frac{20}{56}$', '$\\frac{25}{64}$'],
    optionsLatex: ['\\frac{5}{14}', '\\frac{10}{28}', '\\frac{20}{56}', '\\frac{25}{64}'],
    correctAnswer: 0,
    explanation: 'P(primera roja) = 5/8, P(segunda roja|primera roja) = 4/7:',
    explanationLatex: 'P = \\frac{5}{8} \\times \\frac{4}{7} = \\frac{20}{56} = \\frac{5}{14}',
    difficulty: 'hard',
    skills: ['probabilidad-condicional', 'probabilidad-sin-reposicion', 'probabilidad-reglas-multiplicacion', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-rp-4',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'En una prueba médica, el 95% de los enfermos dan positivo y el 10% de los sanos dan positivo. Si el 2% de la población está enferma, ¿cuál es la probabilidad de que una persona que dio positivo esté realmente enferma?',
    questionLatex: '\\text{Prueba: 95\\% enfermos +, 10\\% sanos +, 2\\% población enferma. P(enfermo|positivo)?}',
    options: ['Aproximadamente 16%', 'Aproximadamente 32%', 'Aproximadamente 48%', 'Aproximadamente 95%'],
    correctAnswer: 0,
    explanation: 'Usando teorema de Bayes: P(E|+) = P(+|E)×P(E) / [P(+|E)×P(E) + P(+|S)×P(S)]',
    explanationLatex: 'P(E|+) = \\frac{0.95 \\times 0.02}{0.95 \\times 0.02 + 0.10 \\times 0.98} = \\frac{0.019}{0.117} \\approx 0.16',
    difficulty: 'extreme',
    skills: ['probabilidad-teorema-bayes', 'probabilidad-condicional', 'probabilidad-reglas-multiplicacion', 'numeros-decimales', 'numeros-porcentaje', 'numeros-operaciones-basicas']
  }
];
