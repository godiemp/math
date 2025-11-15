import { Question } from '../../../types';

export const m2ProbabilidadReglasProbabilidadQuestions: Question[] = [
  {
    id: 'm2-prob-rp-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Al lanzar dos dados, ¿cuál es la probabilidad de que la suma sea 7?}',
    options: ['$\\frac{1}{6}$', '$\\frac{1}{12}$', '$\\frac{5}{36}$', '$\\frac{7}{36}$'],
    optionsLatex: ['\\frac{1}{6}', '\\frac{1}{12}', '\\frac{5}{36}', '\\frac{7}{36}'],
    correctAnswer: 0,
    explanation: 'Hay 6 formas de obtener suma 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) de 36 posibles:',
    explanationLatex: 'P(\\text{suma} = 7) = \\frac{6}{36} = \\frac{1}{6}',
    difficulty: 'medium',
    skills: ['probabilidad-eventos', 'probabilidad-reglas-basicas', 'probabilidad-eventos-equiprobables', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-rp-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Si } P(A) = 0.6 \\text{ y } P(B) = 0.4\\text{, y A y B son independientes, ¿cuál es } P(A \\cap B)?',
    options: ['0.24', '0.3', '0.5', '1.0'],
    correctAnswer: 0,
    explanation: 'Para eventos independientes, P(A ∩ B) = P(A) × P(B):',
    explanationLatex: 'P(A \\cap B) = P(A) \\times P(B) = 0.6 \\times 0.4 = 0.24',
    difficulty: 'hard',
    skills: ['probabilidad-eventos-independientes', 'probabilidad-interseccion', 'probabilidad-reglas-multiplicacion', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-rp-3',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
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
    questionLatex: '\\text{Prueba: 95\\% enfermos +, 10\\% sanos +, 2\\% población enferma. P(enfermo|positivo)?}',
    options: ['Aproximadamente 16%', 'Aproximadamente 32%', 'Aproximadamente 48%', 'Aproximadamente 95%'],
    correctAnswer: 0,
    explanation: 'Usando teorema de Bayes: P(E|+) = P(+|E)×P(E) / [P(+|E)×P(E) + P(+|S)×P(S)]',
    explanationLatex: 'P(E|+) = \\frac{0.95 \\times 0.02}{0.95 \\times 0.02 + 0.10 \\times 0.98} = \\frac{0.019}{0.117} \\approx 0.16',
    difficulty: 'extreme',
    skills: ['probabilidad-teorema-bayes', 'probabilidad-condicional', 'probabilidad-reglas-multiplicacion', 'numeros-decimales', 'numeros-porcentaje', 'numeros-operaciones-basicas']
  }
];
