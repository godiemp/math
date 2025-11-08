import { Question } from '../../../types';

export const m2ProbabilidadCombinatoriaQuestions: Question[] = [
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
  }
];
