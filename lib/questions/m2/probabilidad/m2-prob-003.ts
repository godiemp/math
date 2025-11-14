import { Question } from '../../../types';

/**
 * M2-PROB-003: Conceptos y resolución de problemas de conteo (permutación y combinatoria)
 *
 * Subsections:
 * A. Principio multiplicativo
 *    Habilidades: conteo-principio-multiplicativo
 * B. Permutaciones
 *    Habilidades: conteo-permutaciones
 * C. Combinaciones
 *    Habilidades: conteo-combinaciones
 * D. Problemas de conteo en probabilidad
 *    Habilidades: conteo-problemas-probabilidad
 */

export const m2Prob003Questions: Question[] = [
  {
    id: 'm2-8',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: '¿De cuántas formas se pueden elegir 3 estudiantes de un grupo de 5?',
    questionLatex: '\\text{¿De cuántas formas se pueden elegir 3 estudiantes de un grupo de 5?}',
    options: ['10', '15', '20', '60'],
    correctAnswer: 0,
    explanation: 'Combinaciones: C(5,3) = 5!/(3!×2!) = (5×4)/(2×1) = 10',
    explanationLatex: 'C(5,3) = \\frac{5!}{3! \\times 2!} = \\frac{5 \\times 4}{2 \\times 1} = 10',
    difficulty: 'medium',
    skills: ['probabilidad-combinatoria', 'probabilidad-combinaciones', 'probabilidad-factorial', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-comb-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: '¿De cuántas formas se pueden ordenar 4 libros en un estante?',
    questionLatex: '\\text{¿De cuántas formas se pueden ordenar 4 libros en un estante?}',
    options: ['12', '16', '20', '24'],
    correctAnswer: 3,
    explanation: 'Es una permutación: P(4) = 4! = 4 × 3 × 2 × 1 = 24',
    explanationLatex: 'P(4) = 4! = 4 \\times 3 \\times 2 \\times 1 = 24',
    difficulty: 'hard',
    skills: ['probabilidad-combinatoria', 'probabilidad-permutaciones', 'probabilidad-factorial', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-comb-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'Se forman equipos de 5 personas de un grupo de 12. Si dos personas específicas NO pueden estar juntas en el equipo, ¿cuántos equipos diferentes se pueden formar?',
    questionLatex: '\\text{Equipos de 5 de 12 personas. Dos NO pueden estar juntas. ¿Cuántos equipos?}',
    options: ['672', '720', '792', '462'],
    correctAnswer: 0,
    explanation: 'Total: C(12,5)=792. Con ambos A y B: C(10,3)=120. Equipos válidos: 792-120=672',
    explanationLatex: 'C(12,5) - C(10,3) = 792 - 120 = 672',
    difficulty: 'extreme',
    skills: ['probabilidad-combinatoria', 'probabilidad-combinaciones', 'probabilidad-casos-excluyentes', 'probabilidad-factorial', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-comb-3',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: '¿De cuántas maneras diferentes se pueden elegir 2 representantes de un grupo de 8 personas?',
    questionLatex: '\\text{¿De cuántas maneras se pueden elegir 2 representantes de 8 personas?}',
    options: ['16', '28', '56', '64'],
    correctAnswer: 1,
    explanation: 'Combinaciones: C(8,2) = 8!/(2!×6!) = (8×7)/(2×1) = 28',
    explanationLatex: 'C(8,2) = \\frac{8!}{2! \\times 6!} = \\frac{8 \\times 7}{2} = 28',
    difficulty: 'medium',
    skills: ['probabilidad-combinatoria', 'probabilidad-combinaciones', 'probabilidad-factorial', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-comb-4',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: '¿Cuántos números de 3 dígitos diferentes se pueden formar con los dígitos 1, 2, 3, 4 y 5?',
    questionLatex: '\\text{¿Cuántos números de 3 dígitos diferentes con } \\{1,2,3,4,5\\}?',
    options: ['10', '20', '60', '125'],
    correctAnswer: 2,
    explanation: 'Permutaciones: P(5,3) = 5!/(5-3)! = 5!/2! = 5×4×3 = 60',
    explanationLatex: 'P(5,3) = \\frac{5!}{2!} = 5 \\times 4 \\times 3 = 60',
    difficulty: 'hard',
    skills: ['probabilidad-combinatoria', 'probabilidad-permutaciones', 'probabilidad-factorial', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-comb-5',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'Un comité de 3 personas debe incluir al menos 1 mujer. Si hay 5 hombres y 4 mujeres disponibles, ¿cuántos comités diferentes se pueden formar?',
    questionLatex: '\\text{Comité de 3 con al menos 1 mujer. 5 hombres, 4 mujeres. ¿Cuántos comités?}',
    options: ['74', '80', '84', '120'],
    correctAnswer: 0,
    explanation: 'Total: C(9,3)=84. Solo hombres: C(5,3)=10. Con al menos 1 mujer: 84-10=74',
    explanationLatex: 'C(9,3) - C(5,3) = 84 - 10 = 74',
    difficulty: 'extreme',
    skills: ['probabilidad-combinatoria', 'probabilidad-combinaciones', 'probabilidad-casos-excluyentes', 'probabilidad-factorial', 'numeros-operaciones-basicas']
  }
];
