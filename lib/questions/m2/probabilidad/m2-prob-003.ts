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
  // Subsection A: Principio multiplicativo
  {
    id: 'm2-prob-mult-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'En un restaurant ofrecen un menú que incluye 3 tipos de entrada, 4 platos de fondo y 2 postres. Si un cliente debe elegir exactamente una opción de cada categoría, ¿de cuántas formas diferentes puede armar su menú completo?',
    questionLatex: '\\text{En un restaurant ofrecen un menú que incluye 3 tipos de entrada, 4 platos de fondo y 2 postres. Si un cliente debe elegir exactamente una opción de cada categoría, ¿de cuántas formas diferentes puede armar su menú completo?}',
    options: ['9', '12', '24', '32'],
    correctAnswer: 2,
    explanation: 'Aplicamos el principio multiplicativo: 3 × 4 × 2 = 24 formas diferentes de armar el menú',
    explanationLatex: '3 \\times 4 \\times 2 = 24',
    difficulty: 'easy',
    skills: ['combinatoria-principio-multiplicativo', 'numeros-multiplicacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-mult-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'Para crear una contraseña se deben elegir 2 letras (de un alfabeto de 26 letras) seguidas de 3 dígitos (del 0 al 9). Si se pueden repetir letras y dígitos, ¿cuántas contraseñas diferentes se pueden crear?',
    questionLatex: '\\text{Para crear una contraseña se deben elegir 2 letras (de un alfabeto de 26 letras) seguidas de 3 dígitos (del 0 al 9). Si se pueden repetir letras y dígitos, ¿cuántas contraseñas diferentes se pueden crear?}',
    options: ['26.000', '$260.000$', '$676.000$', '$1.000.000$'],
    correctAnswer: 2,
    explanation: 'Principio multiplicativo: 26 × 26 × 10 × 10 × 10 = 676 × 1.000 = 676.000',
    explanationLatex: '26^2 \\times 10^3 = 676 \\times 1{,}000 = 676{,}000',
    difficulty: 'medium',
    skills: ['combinatoria-principio-multiplicativo', 'numeros-potencias', 'numeros-multiplicacion', 'numeros-operaciones-basicas']
  },
  // Subsection B: Permutaciones
  {
    id: 'm2-prob-perm-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'En una carrera participan 6 atletas y se entregarán medallas de oro, plata y bronce a los tres primeros lugares. ¿De cuántas formas diferentes se pueden asignar estas tres medallas?',
    questionLatex: '\\text{En una carrera participan 6 atletas y se entregarán medallas de oro, plata y bronce a los tres primeros lugares. ¿De cuántas formas diferentes se pueden asignar estas tres medallas?}',
    options: ['18', '20', '$120$', '$216$'],
    correctAnswer: 2,
    explanation: 'Permutaciones de 6 tomados de 3 en 3: P(6,3) = 6!/(6-3)! = 6!/3! = 6 × 5 × 4 = 120',
    explanationLatex: 'P(6,3) = \\frac{6!}{3!} = 6 \\times 5 \\times 4 = 120',
    difficulty: 'medium',
    skills: ['combinatoria-permutaciones', 'probabilidad-factorial', 'numeros-multiplicacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-comb-1',
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
    skills: ['combinatoria-combinaciones', 'probabilidad-factorial', 'numeros-fracciones', 'numeros-operaciones-basicas']
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
    skills: ['combinatoria-permutaciones', 'probabilidad-factorial', 'numeros-operaciones-basicas']
  },
  // Subsection C: Combinaciones
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
    skills: ['combinatoria-combinaciones', 'probabilidad-factorial', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-comb-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'Se forman equipos de 5 personas de un grupo de 12. Si dos personas específicas NO pueden estar juntas en el equipo, ¿cuántos equipos diferentes se pueden formar?',
    questionLatex: '\\text{Se forman equipos de 5 personas de un grupo de 12. Si dos personas específicas NO pueden estar juntas en el equipo, ¿cuántos equipos diferentes se pueden formar?}',
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
    questionLatex: '\\text{¿De cuántas maneras diferentes se pueden elegir 2 representantes de un grupo de 8 personas?}',
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
    questionLatex: '\\text{¿Cuántos números de 3 dígitos diferentes se pueden formar con los dígitos 1, 2, 3, 4 y 5?}',
    options: ['10', '20', '60', '125'],
    correctAnswer: 2,
    explanation: 'Permutaciones: P(5,3) = 5!/(5-3)! = 5!/2! = 5×4×3 = 60',
    explanationLatex: 'P(5,3) = \\frac{5!}{2!} = 5 \\times 4 \\times 3 = 60',
    difficulty: 'hard',
    skills: ['combinatoria-permutaciones', 'probabilidad-factorial', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-comb-5',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'Un comité de 3 personas debe incluir al menos 1 mujer. Si hay 5 hombres y 4 mujeres disponibles, ¿cuántos comités diferentes se pueden formar?',
    questionLatex: '\\text{Un comité de 3 personas debe incluir al menos 1 mujer. Si hay 5 hombres y 4 mujeres disponibles, ¿cuántos comités diferentes se pueden formar?}',
    options: ['74', '80', '84', '120'],
    correctAnswer: 0,
    explanation: 'Total: C(9,3)=84. Solo hombres: C(5,3)=10. Con al menos 1 mujer: 84-10=74',
    explanationLatex: 'C(9,3) - C(5,3) = 84 - 10 = 74',
    difficulty: 'extreme',
    skills: ['combinatoria-combinaciones', 'probabilidad-casos-excluyentes', 'probabilidad-factorial', 'numeros-operaciones-basicas']
  },
  // Subsection D: Problemas de conteo en probabilidad
  {
    id: 'm2-prob-cont-prob-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'En una urna hay 5 bolitas rojas y 3 bolitas azules. Si se extraen 2 bolitas sin reposición, ¿cuántos resultados diferentes son posibles?',
    questionLatex: '\\text{En una urna hay 5 bolitas rojas y 3 bolitas azules. Si se extraen 2 bolitas sin reposición, ¿cuántos resultados diferentes son posibles?}',
    options: ['16', '24', '28', '64'],
    correctAnswer: 2,
    explanation: 'Combinaciones de 8 tomadas de 2 en 2: C(8,2) = 8!/(2!×6!) = (8×7)/2 = 28',
    explanationLatex: 'C(8,2) = \\frac{8 \\times 7}{2} = 28',
    difficulty: 'medium',
    skills: ['combinatoria-problemas-probabilidad', 'combinatoria-combinaciones', 'probabilidad-factorial', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-cont-prob-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'Un dado se lanza 3 veces. ¿Cuántos resultados diferentes son posibles si importa el orden en que salen los números?',
    questionLatex: '\\text{Un dado se lanza 3 veces. ¿Cuántos resultados diferentes son posibles si importa el orden en que salen los números?}',
    options: ['18', '20', '120', '216'],
    correctAnswer: 3,
    explanation: 'Cada lanzamiento tiene 6 opciones. Por principio multiplicativo: 6 × 6 × 6 = 216',
    explanationLatex: '6^3 = 216',
    difficulty: 'medium',
    skills: ['combinatoria-problemas-probabilidad', 'combinatoria-principio-multiplicativo', 'numeros-potencias', 'numeros-operaciones-basicas']
  }
];

