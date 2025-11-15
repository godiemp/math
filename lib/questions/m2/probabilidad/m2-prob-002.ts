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
    skills: ['probabilidad-bayes', 'probabilidad-teorema-bayes', 'probabilidad-condicional', 'probabilidad-reglas-multiplicacion', 'numeros-decimales', 'numeros-porcentaje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-cond-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'En una caja hay 4 bolas blancas y 6 negras. Se extrae una bola y es blanca. Sin reponerla, ¿cuál es la probabilidad de que la segunda también sea blanca?',
    questionLatex: '\\text{4 blancas, 6 negras. Primera blanca. ¿P(segunda blanca)?}',
    options: ['$\\frac{1}{3}$', '$\\frac{3}{10}$', '$\\frac{4}{10}$', '$\\frac{3}{9}$'],
    optionsLatex: ['\\frac{1}{3}', '\\frac{3}{10}', '\\frac{4}{10}', '\\frac{3}{9}'],
    correctAnswer: 3,
    explanation: 'Después de sacar una blanca, quedan 3 blancas y 6 negras (9 total). P = 3/9 = 1/3',
    explanationLatex: 'P(\\text{segunda blanca}|\\text{primera blanca}) = \\frac{3}{9} = \\frac{1}{3}',
    difficulty: 'medium',
    skills: ['probabilidad-condicional', 'probabilidad-condicional-concepto', 'probabilidad-sin-reposicion', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-cond-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'Se lanzan dos dados. Si el primero muestra un 6, ¿cuál es la probabilidad de que la suma sea mayor que 10?',
    questionLatex: '\\text{Dos dados. Primero = 6. ¿P(suma > 10)?}',
    options: ['$\\frac{1}{6}$', '$\\frac{1}{3}$', '$\\frac{1}{2}$', '$\\frac{2}{3}$'],
    optionsLatex: ['\\frac{1}{6}', '\\frac{1}{3}', '\\frac{1}{2}', '\\frac{2}{3}'],
    correctAnswer: 1,
    explanation: 'Si el primero es 6, necesitamos que el segundo sea 5 o 6 para suma > 10. P = 2/6 = 1/3',
    explanationLatex: 'P(\\text{suma} > 10|\\text{primero} = 6) = P(\\text{segundo} \\geq 5) = \\frac{2}{6} = \\frac{1}{3}',
    difficulty: 'hard',
    skills: ['probabilidad-condicional', 'probabilidad-condicional-aplicaciones', 'probabilidad-eventos-independientes', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-cond-3',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'En un grupo, 60% son mujeres. Entre las mujeres, 30% practican deporte. Entre los hombres, 50% practican deporte. Si se elige una persona al azar y practica deporte, ¿cuál es la probabilidad de que sea mujer?',
    questionLatex: '\\text{60\\% mujeres. 30\\% mujeres deportistas, 50\\% hombres deportistas. P(mujer|deportista)?}',
    options: ['$\\frac{9}{19}$', '$\\frac{9}{20}$', '$\\frac{3}{5}$', '$\\frac{1}{2}$'],
    optionsLatex: ['\\frac{9}{19}', '\\frac{9}{20}', '\\frac{3}{5}', '\\frac{1}{2}'],
    correctAnswer: 0,
    explanation: 'P(M∩D) = 0.6×0.3 = 0.18. P(H∩D) = 0.4×0.5 = 0.20. P(D) = 0.38. P(M|D) = 0.18/0.38 = 9/19',
    explanationLatex: 'P(M|D) = \\frac{P(M \\cap D)}{P(D)} = \\frac{0.6 \\times 0.3}{0.6 \\times 0.3 + 0.4 \\times 0.5} = \\frac{0.18}{0.38} = \\frac{9}{19}',
    difficulty: 'extreme',
    skills: ['probabilidad-bayes', 'probabilidad-teorema-bayes', 'probabilidad-condicional', 'probabilidad-condicional-aplicaciones', 'numeros-decimales', 'numeros-fracciones', 'numeros-porcentaje', 'numeros-operaciones-basicas']
  },
  // Subsection C: Eventos independientes y dependientes
  {
    id: 'm2-prob-dep-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'Se lanzan dos monedas. ¿Los eventos "la primera moneda sale cara" y "la segunda moneda sale sello" son independientes?',
    questionLatex: '\\text{Dos monedas. ¿Son independientes "primera cara" y "segunda sello"?}',
    options: ['Sí, porque el resultado de una no afecta a la otra', 'No, porque ambas son del mismo experimento', 'Depende del tipo de moneda', 'No se puede determinar'],
    optionsLatex: ['\\text{Sí, resultado independiente}', '\\text{No, mismo experimento}', '\\text{Depende del tipo de moneda}', '\\text{No se puede determinar}'],
    correctAnswer: 0,
    explanation: 'Dos eventos son independientes si P(A∩B) = P(A)×P(B). Aquí, el resultado de cada moneda no afecta al otro',
    explanationLatex: 'P(\\text{cara}_1 \\cap \\text{sello}_2) = \\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4} \\Rightarrow \\text{independientes}',
    difficulty: 'medium',
    skills: ['probabilidad-eventos-dependientes', 'probabilidad-eventos-independientes', 'probabilidad-condicional', 'numeros-fracciones']
  },
  {
    id: 'm2-prob-dep-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'En una baraja de 52 cartas, se extraen dos cartas sin reposición. ¿Los eventos "la primera es un as" y "la segunda es un as" son independientes?',
    questionLatex: '\\text{Baraja, 2 cartas sin reposición. ¿Son independientes "primera as" y "segunda as"?}',
    options: ['Sí, porque hay 4 ases en cada extracción', 'No, porque la primera extracción afecta la probabilidad de la segunda', 'Sí, porque cada carta tiene la misma probabilidad', 'No se puede determinar sin más información'],
    optionsLatex: ['\\text{Sí, 4 ases siempre}', '\\text{No, primera afecta segunda}', '\\text{Sí, misma probabilidad}', '\\text{No se puede determinar}'],
    correctAnswer: 1,
    explanation: 'Sin reposición, si la primera es as, quedan 3 ases de 51 cartas. La probabilidad cambia, por lo tanto son eventos dependientes',
    explanationLatex: 'P(\\text{2°as}|\\text{1°as}) = \\frac{3}{51} \\neq P(\\text{2°as}) = \\frac{4}{52} \\Rightarrow \\text{dependientes}',
    difficulty: 'hard',
    skills: ['probabilidad-eventos-dependientes', 'probabilidad-sin-reposicion', 'probabilidad-condicional', 'numeros-fracciones']
  }
];
