import { Question } from '../../../types';

/**
 * M2-PROB-002: Aplicaciones y propiedades de la probabilidad condicional
 *
 * Subsections:
 * A. Concepto de probabilidad condicional
 *    Habilidades: probabilidad-condicional-concepto
 * B. Teorema de Bayes
 *    Habilidades: probabilidad-bayes
 * C. Eventos independientes y dependientes
 *    Habilidades: probabilidad-eventos-dependientes
 * D. Aplicaciones de probabilidad condicional
 *    Habilidades: probabilidad-condicional-aplicaciones
 */

export const m2Prob002Questions: Question[] = [
  {
    id: 'm2-prob-rp-3',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Urna: 5 rojas, 3 azules. Extraer 2 sin reposición. ¿P(ambas rojas)?}',
    options: ['\\frac{5}{14}', '\\frac{10}{28}', '\\frac{20}{56}', '\\frac{25}{64}'],
    correctAnswer: 0,
    explanation: 'P = \\frac{5}{8} \\times \\frac{4}{7} = \\frac{20}{56} = \\frac{5}{14}',
    difficulty: 'hard',
    skills: ['probabilidad-condicional', 'probabilidad-sin-reposicion', 'probabilidad-reglas-multiplicacion', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-rp-4',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Prueba: 95\\% enfermos +, 10\\% sanos +, 2\\% población enferma. P(enfermo|positivo)?}',
    options: ['Aproximadamente 16%', 'Aproximadamente 32%', 'Aproximadamente 48%', 'Aproximadamente 95%'],
    correctAnswer: 0,
    explanation: 'P(E|+) = \\frac{0.95 \\times 0.02}{0.95 \\times 0.02 + 0.10 \\times 0.98} = \\frac{0.019}{0.117} \\approx 0.16',
    difficulty: 'extreme',
    skills: ['probabilidad-bayes', 'probabilidad-teorema-bayes', 'probabilidad-condicional', 'probabilidad-reglas-multiplicacion', 'numeros-decimales', 'numeros-porcentaje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-cond-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{4 blancas, 6 negras. Primera blanca. ¿P(segunda blanca)?}',
    options: ['\\frac{1}{3}', '\\frac{3}{10}', '\\frac{4}{10}', '\\frac{3}{9}'],
    correctAnswer: 3,
    explanation: 'P(\\text{segunda blanca}|\\text{primera blanca}) = \\frac{3}{9} = \\frac{1}{3}',
    difficulty: 'medium',
    skills: ['probabilidad-condicional', 'probabilidad-condicional-concepto', 'probabilidad-sin-reposicion', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-cond-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Dos dados. Primero = 6. ¿P(suma > 10)?}',
    options: ['\\frac{1}{6}', '\\frac{1}{3}', '\\frac{1}{2}', '\\frac{2}{3}'],
    correctAnswer: 1,
    explanation: 'P(\\text{suma} > 10|\\text{primero} = 6) = P(\\text{segundo} \\geq 5) = \\frac{2}{6} = \\frac{1}{3}',
    difficulty: 'hard',
    skills: ['probabilidad-condicional', 'probabilidad-condicional-aplicaciones', 'probabilidad-eventos-independientes', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-cond-3',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{60\\% mujeres. 30\\% mujeres deportistas, 50\\% hombres deportistas. P(mujer|deportista)?}',
    options: ['\\frac{9}{19}', '\\frac{9}{20}', '\\frac{3}{5}', '\\frac{1}{2}'],
    correctAnswer: 0,
    explanation: 'P(M|D) = \\frac{P(M \\cap D)}{P(D)} = \\frac{0.6 \\times 0.3}{0.6 \\times 0.3 + 0.4 \\times 0.5} = \\frac{0.18}{0.38} = \\frac{9}{19}',
    difficulty: 'extreme',
    skills: ['probabilidad-bayes', 'probabilidad-teorema-bayes', 'probabilidad-condicional', 'probabilidad-condicional-aplicaciones', 'numeros-decimales', 'numeros-fracciones', 'numeros-porcentaje', 'numeros-operaciones-basicas']
  },
  // Subsection C: Eventos independientes y dependientes
  {
    id: 'm2-prob-dep-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Dos monedas. ¿Son independientes "primera cara" y "segunda sello"?}',
    options: ['\\text{Sí, resultado independiente}', '\\text{No, mismo experimento}', '\\text{Depende del tipo de moneda}', '\\text{No se puede determinar}'],
    correctAnswer: 0,
    explanation: 'P(\\text{cara}_1 \\cap \\text{sello}_2) = \\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4} \\Rightarrow \\text{independientes}',
    difficulty: 'medium',
    skills: ['probabilidad-eventos-dependientes', 'probabilidad-eventos-independientes', 'probabilidad-condicional', 'numeros-fracciones']
  },
  {
    id: 'm2-prob-dep-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Baraja, 2 cartas sin reposición. ¿Son independientes "primera as" y "segunda as"?}',
    options: ['\\text{Sí, 4 ases siempre}', '\\text{No, primera afecta segunda}', '\\text{Sí, misma probabilidad}', '\\text{No se puede determinar}'],
    correctAnswer: 1,
    explanation: 'P(\\text{2°as}|\\text{1°as}) = \\frac{3}{51} \\neq P(\\text{2°as}) = \\frac{4}{52} \\Rightarrow \\text{dependientes}',
    difficulty: 'hard',
    skills: ['probabilidad-eventos-dependientes', 'probabilidad-sin-reposicion', 'probabilidad-condicional', 'numeros-fracciones']
  },
  // Additional Subsection A: Probabilidad condicional concepto
  {
    id: 'm2-prob-cond-4',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{La fórmula de probabilidad condicional } P(A|B) \\text{ es:}',
    options: ['P(A) \\times P(B)', '\\frac{P(A \\cap B)}{P(B)}', 'P(A) + P(B)', '\\frac{P(A)}{P(B)}'],
    correctAnswer: 1,
    explanation: 'P(A|B) = \\frac{P(A \\cap B)}{P(B)}',
    difficulty: 'easy',
    skills: ['probabilidad-condicional-concepto', 'probabilidad-formulas', 'numeros-fracciones']
  },
  {
    id: 'm2-prob-cond-5',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{P(A) = 0.4, P(B) = 0.5, P(A} \\cap \\text{B) = 0.2. Calcular P(A|B):}',
    options: ['0.2', '0.4', '0.5', '0.8'],
    correctAnswer: 1,
    explanation: 'P(A|B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{0.2}{0.5} = 0.4',
    difficulty: 'medium',
    skills: ['probabilidad-condicional-concepto', 'probabilidad-condicional', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-cond-6',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En una clase, 60\\% son mujeres. De las mujeres, 40\\% usan lentes. ¿P(mujer y usa lentes)?}',
    options: ['0.20', '0.24', '0.40', '0.60'],
    correctAnswer: 1,
    explanation: 'P(M \\cap L) = P(M) \\times P(L|M) = 0.6 \\times 0.4 = 0.24',
    difficulty: 'medium',
    skills: ['probabilidad-condicional-aplicaciones', 'probabilidad-condicional', 'numeros-decimales', 'numeros-porcentaje']
  },
  {
    id: 'm2-prob-cond-7',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{De 100 estudiantes: 30 estudian matemáticas, 25 física, 10 ambas. P(física|matemáticas)?}',
    options: ['\\frac{1}{3}', '\\frac{2}{5}', '\\frac{1}{10}', '\\frac{1}{4}'],
    correctAnswer: 0,
    explanation: 'P(F|M) = \\frac{P(F \\cap M)}{P(M)} = \\frac{10/100}{30/100} = \\frac{10}{30} = \\frac{1}{3}',
    difficulty: 'hard',
    skills: ['probabilidad-condicional-aplicaciones', 'probabilidad-condicional-concepto', 'numeros-fracciones', 'numeros-operaciones-basicas']
  }
];
