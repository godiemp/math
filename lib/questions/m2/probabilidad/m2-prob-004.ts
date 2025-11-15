import { Question } from '../../../types';

/**
 * M2-PROB-004: Problemas que involucren el modelo binomial y otros modelos probabilísticos
 *
 * Subsections:
 * A. Distribución binomial
 *    Habilidades: probabilidad-distribucion-binomial
 * B. Cálculo de probabilidades binomiales
 *    Habilidades: probabilidad-calculo-binomial
 * C. Otros modelos probabilísticos
 *    Habilidades: probabilidad-otros-modelos
 * D. Aplicaciones de modelos probabilísticos
 *    Habilidades: probabilidad-modelos-aplicaciones
 */

export const m2Prob004Questions: Question[] = [
  {
    id: 'm2-prob-bin-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Moneda 3 lanzamientos. ¿P(exactamente 2 caras)?}',
    options: ['\\frac{1}{8}', '\\frac{3}{8}', '\\frac{1}{2}', '\\frac{5}{8}'],
    correctAnswer: 1,
    explanation: 'P = C(3,2) \\times \\left(\\frac{1}{2}\\right)^2 \\times \\left(\\frac{1}{2}\\right)^1 = 3 \\times \\frac{1}{8} = \\frac{3}{8}',
    difficulty: 'medium',
    skills: ['probabilidad-distribucion-binomial', 'probabilidad-calculo-binomial', 'probabilidad-combinaciones', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-bin-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Dado 4 lanzamientos. ¿P(exactamente 1 seis)?}',
    options: ['\\frac{125}{324}', '\\frac{200}{648}', '\\frac{500}{1296}', '\\frac{625}{1296}'],
    correctAnswer: 2,
    explanation: 'P = C(4,1) \\times \\left(\\frac{1}{6}\\right)^1 \\times \\left(\\frac{5}{6}\\right)^3 = 4 \\times \\frac{125}{1296} = \\frac{500}{1296}',
    difficulty: 'hard',
    skills: ['probabilidad-distribucion-binomial', 'probabilidad-calculo-binomial', 'probabilidad-combinaciones', 'numeros-fracciones', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-bin-3',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{5 preguntas, 4 opciones cada una. ¿P(3 correctas adivinando)?}',
    options: ['\\frac{45}{512}', '\\frac{90}{1024}', '\\frac{135}{1024}', '\\frac{270}{1024}'],
    correctAnswer: 1,
    explanation: 'P = C(5,3) \\times \\left(\\frac{1}{4}\\right)^3 \\times \\left(\\frac{3}{4}\\right)^2 = 10 \\times \\frac{9}{1024} = \\frac{90}{1024}',
    difficulty: 'extreme',
    skills: ['probabilidad-distribucion-binomial', 'probabilidad-calculo-binomial', 'probabilidad-combinaciones', 'numeros-fracciones', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-bin-4',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{5 pruebas con 80\\% precisión. ¿P(exactamente 4 correctas)?}',
    options: ['0.2048', '0.4096', '0.6', '0.8192'],
    correctAnswer: 1,
    explanation: 'P = C(5,4) \\times (0.8)^4 \\times (0.2)^1 = 5 \\times 0.4096 \\times 0.2 = 0.4096',
    difficulty: 'hard',
    skills: ['probabilidad-distribucion-binomial', 'probabilidad-calculo-binomial', 'probabilidad-modelos-aplicaciones', 'probabilidad-combinaciones', 'numeros-decimales', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-bin-5',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Moneda 10 lanzamientos. ¿P(al menos 8 caras)?}',
    options: ['\\frac{7}{128}', '\\frac{11}{256}', '\\frac{7}{512}', '\\frac{56}{1024}'],
    correctAnswer: 3,
    explanation: 'P = \\frac{C(10,8) + C(10,9) + C(10,10)}{2^{10}} = \\frac{45 + 10 + 1}{1024} = \\frac{56}{1024}',
    difficulty: 'extreme',
    skills: ['probabilidad-distribucion-binomial', 'probabilidad-calculo-binomial', 'probabilidad-combinaciones', 'numeros-fracciones', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-bin-6',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{3 artículos, 5\\% defectuosos. ¿P(ninguno defectuoso)?}',
    options: ['0.857', '0.902', '0.857', '0.950'],
    correctAnswer: 0,
    explanation: 'P(0 \\text{ defectuosos}) = (0.95)^3 \\approx 0.857',
    difficulty: 'medium',
    skills: ['probabilidad-distribucion-binomial', 'probabilidad-calculo-binomial', 'probabilidad-modelos-aplicaciones', 'numeros-decimales', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  // Subsection C: Otros modelos probabilísticos
  {
    id: 'm2-prob-unif-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Número del 1 al 100 al azar. ¿P(múltiplo de 5)?}',
    options: ['\\frac{1}{5}', '\\frac{1}{4}', '\\frac{1}{10}', '\\frac{3}{20}'],
    correctAnswer: 0,
    explanation: 'P = \\frac{20}{100} = \\frac{1}{5} \\text{ (distribución uniforme discreta)}',
    difficulty: 'medium',
    skills: ['probabilidad-otros-modelos', 'probabilidad-uniforme', 'numeros-multiplos', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-geom-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Lanzar dado hasta obtener 6. ¿P(primer 6 en intento 3)?}',
    options: ['\\frac{1}{6}', '\\frac{25}{216}', '\\frac{5}{36}', '\\frac{1}{36}'],
    correctAnswer: 1,
    explanation: 'P = \\left(\\frac{5}{6}\\right)^2 \\times \\frac{1}{6} = \\frac{25}{216}',
    difficulty: 'hard',
    skills: ['probabilidad-otros-modelos', 'probabilidad-geometrica', 'numeros-fracciones', 'numeros-potencias']
  },
  {
    id: 'm2-prob-poisson-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En promedio llegan 3 clientes/hora. Si } P(k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}, \\text{ ¿P(0 clientes)?}',
    options: ['e^{-3} \\approx 0.05', '\\frac{1}{3}', '0', '1'],
    correctAnswer: 0,
    explanation: 'P(0) = \\frac{3^0 e^{-3}}{0!} = e^{-3} \\approx 0.05',
    difficulty: 'extreme',
    skills: ['probabilidad-otros-modelos', 'probabilidad-poisson', 'numeros-potencias', 'numeros-factorial']
  },
  {
    id: 'm2-prob-modelo-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{¿Cuándo usar distribución binomial vs geométrica?}',
    options: ['\\text{Binomial: n fijo; Geométrica: hasta éxito}', '\\text{Son iguales}', '\\text{Binomial: sin rep.; Geométrica: con rep.}', '\\text{Depende de n}'],
    correctAnswer: 0,
    explanation: '\\text{Binomial: } P(X=k) \\text{ en } n \\text{ ensayos}; \\quad \\text{Geométrica: ensayos hasta éxito}',
    difficulty: 'medium',
    skills: ['probabilidad-otros-modelos', 'probabilidad-conceptos', 'probabilidad-distribucion-binomial']
  }
];
