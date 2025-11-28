import { Question } from '../../../types';

/**
 * M1-ALG-008: Resolución y aplicación de sistemas de ecuaciones lineales (2x2)
 * Chilean PAES Curriculum - Algebra Subsection 008
 *
 * This subsection covers:
 * - A: Método de sustitución
 * - B: Método de igualación
 * - C: Método de reducción
 * - D: Aplicaciones de sistemas de ecuaciones
 *
 * Total: 20 questions
 */
export const m1Alg008Questions: Question[] = [
  // ========================================
  // MÉTODO DE SUSTITUCIÓN
  // ========================================
  {
    id: 'm1-alg008-1',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'sustitución',
    questionLatex: '\\text{Resuelve el sistema por sustitución:} \\\\ x + y = 5 \\\\ x = 2y - 1 \\\\ \\text{¿Cuál es el valor de y?}',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation: '\\text{Sustituyendo } x = 2y - 1 \\text{ en la primera ecuación:} \\\\ (2y - 1) + y = 5 \\\\ 3y = 6 \\Rightarrow y = 2',
    difficulty: 'easy',
    skills: ['sistemas-ecuaciones-sustitucion', 'algebra-ecuaciones-lineales']
  },
  {
    id: 'm1-alg008-2',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'sustitución',
    questionLatex: '\\text{Resuelve el sistema:} \\\\ y = 3x + 1 \\\\ 2x + y = 11 \\\\ \\text{¿Cuál es el valor de x?}',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation: '\\text{Sustituyendo } y = 3x + 1 \\text{ en } 2x + y = 11: \\\\ 2x + (3x + 1) = 11 \\\\ 5x = 10 \\Rightarrow x = 2',
    difficulty: 'easy',
    skills: ['sistemas-ecuaciones-sustitucion', 'algebra-ecuaciones-lineales']
  },
  {
    id: 'm1-alg008-3',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'sustitución',
    questionLatex: '\\text{Dado el sistema:} \\\\ 3x - y = 7 \\\\ x + 2y = 0 \\\\ \\text{Despejando x de la segunda ecuación y sustituyendo, el valor de y es:}',
    options: ['-2', '-1', '1', '2'],
    correctAnswer: 1,
    explanation: '\\text{De } x + 2y = 0 \\Rightarrow x = -2y. \\\\ \\text{Sustituyendo en } 3(-2y) - y = 7 \\\\ -7y = 7 \\Rightarrow y = -1',
    difficulty: 'medium',
    skills: ['sistemas-ecuaciones-sustitucion', 'algebra-ecuaciones-lineales']
  },
  {
    id: 'm1-alg008-4',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'sustitución',
    questionLatex: '\\text{Resuelve:} \\\\ \\frac{x}{2} + y = 4 \\\\ x - y = 2 \\\\ \\text{¿Cuál es el valor de x + y?}',
    options: ['4', '5', '6', '7'],
    correctAnswer: 2,
    explanation: '\\text{De } x - y = 2 \\Rightarrow x = y + 2. \\\\ \\text{Sustituyendo: } \\frac{y + 2}{2} + y = 4 \\\\ \\frac{3y + 2}{2} = 4 \\Rightarrow y = 2, x = 4 \\\\ x + y = 6',
    difficulty: 'medium',
    skills: ['sistemas-ecuaciones-sustitucion', 'algebra-ecuaciones-lineales', 'numeros-racionales-operaciones']
  },
  {
    id: 'm1-alg008-5',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'sustitución',
    questionLatex: '\\text{Para el sistema:} \\\\ 2x + 3y = 12 \\\\ x = y + 1 \\\\ \\text{La suma de las soluciones } x + y \\text{ es:}',
    options: ['4', '5', '6', '7'],
    correctAnswer: 1,
    explanation: '\\text{Sustituyendo } x = y + 1: \\\\ 2(y + 1) + 3y = 12 \\\\ 5y = 10 \\Rightarrow y = 2, x = 3 \\\\ x + y = 5',
    difficulty: 'easy',
    skills: ['sistemas-ecuaciones-sustitucion', 'algebra-ecuaciones-lineales']
  },
  // ========================================
  // MÉTODO DE IGUALACIÓN
  // ========================================
  {
    id: 'm1-alg008-6',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'igualación',
    questionLatex: '\\text{Resuelve por igualación:} \\\\ y = 2x + 1 \\\\ y = -x + 7 \\\\ \\text{¿Cuál es el valor de x?}',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation: '\\text{Igualando: } 2x + 1 = -x + 7 \\\\ 3x = 6 \\Rightarrow x = 2',
    difficulty: 'easy',
    skills: ['sistemas-ecuaciones-igualacion', 'algebra-ecuaciones-lineales']
  },
  {
    id: 'm1-alg008-7',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'igualación',
    questionLatex: '\\text{Dado el sistema:} \\\\ x = 3y - 2 \\\\ x = y + 4 \\\\ \\text{El valor de y es:}',
    options: ['2', '3', '4', '5'],
    correctAnswer: 1,
    explanation: '\\text{Igualando: } 3y - 2 = y + 4 \\\\ 2y = 6 \\Rightarrow y = 3',
    difficulty: 'easy',
    skills: ['sistemas-ecuaciones-igualacion', 'algebra-ecuaciones-lineales']
  },
  {
    id: 'm1-alg008-8',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'igualación',
    questionLatex: '\\text{Resuelve:} \\\\ 2x + y = 8 \\\\ x - y = 1 \\\\ \\text{Usando igualación (despejando y), el valor de x es:}',
    options: ['2', '3', '4', '5'],
    correctAnswer: 1,
    explanation: '\\text{De la 1ra: } y = 8 - 2x. \\text{ De la 2da: } y = x - 1 \\\\ 8 - 2x = x - 1 \\\\ 9 = 3x \\Rightarrow x = 3',
    difficulty: 'medium',
    skills: ['sistemas-ecuaciones-igualacion', 'algebra-ecuaciones-lineales']
  },
  {
    id: 'm1-alg008-9',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'igualación',
    questionLatex: '\\text{Para el sistema:} \\\\ 3x - 2y = 1 \\\\ x + 2y = 7 \\\\ \\text{Despejando x de ambas ecuaciones e igualando, } x \\text{ vale:}',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation: 'x = \\frac{1 + 2y}{3} \\text{ y } x = 7 - 2y \\\\ \\frac{1 + 2y}{3} = 7 - 2y \\\\ 1 + 2y = 21 - 6y \\\\ 8y = 20 \\Rightarrow y = 2.5 \\\\ x = 7 - 5 = 2',
    difficulty: 'hard',
    skills: ['sistemas-ecuaciones-igualacion', 'algebra-ecuaciones-lineales', 'numeros-racionales-operaciones']
  },
  {
    id: 'm1-alg008-10',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'igualación',
    questionLatex: '\\text{Dos rectas se representan por } y = 4x - 3 \\text{ e } y = 2x + 1. \\text{ ¿En qué punto se intersectan?}',
    options: ['(1, 1)', '(2, 5)', '(3, 7)', '(0, -3)'],
    correctAnswer: 1,
    explanation: '\\text{Igualando: } 4x - 3 = 2x + 1 \\\\ 2x = 4 \\Rightarrow x = 2 \\\\ y = 2(2) + 1 = 5 \\\\ \\text{Punto: } (2, 5)',
    difficulty: 'medium',
    skills: ['sistemas-ecuaciones-igualacion', 'algebra-funciones-lineales', 'geometria-coordenadas']
  },
  // ========================================
  // MÉTODO DE REDUCCIÓN
  // ========================================
  {
    id: 'm1-alg008-11',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'reducción',
    questionLatex: '\\text{Resuelve por reducción:} \\\\ x + y = 7 \\\\ x - y = 3 \\\\ \\text{¿Cuál es el valor de x?}',
    options: ['3', '4', '5', '6'],
    correctAnswer: 2,
    explanation: '\\text{Sumando las ecuaciones: } 2x = 10 \\Rightarrow x = 5',
    difficulty: 'easy',
    skills: ['sistemas-ecuaciones-reduccion', 'algebra-ecuaciones-lineales']
  },
  {
    id: 'm1-alg008-12',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'reducción',
    questionLatex: '\\text{Dado:} \\\\ 2x + 3y = 13 \\\\ 2x - y = 1 \\\\ \\text{Restando la segunda de la primera, y vale:}',
    options: ['2', '3', '4', '5'],
    correctAnswer: 1,
    explanation: '\\text{Restando: } (2x + 3y) - (2x - y) = 13 - 1 \\\\ 4y = 12 \\Rightarrow y = 3',
    difficulty: 'easy',
    skills: ['sistemas-ecuaciones-reduccion', 'algebra-ecuaciones-lineales']
  },
  {
    id: 'm1-alg008-13',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'reducción',
    questionLatex: '\\text{Resuelve:} \\\\ 3x + 2y = 15 \\\\ x + 2y = 9 \\\\ \\text{El valor de } x \\cdot y \\text{ es:}',
    options: ['6', '9', '12', '15'],
    correctAnswer: 1,
    explanation: '\\text{Restando: } 2x = 6 \\Rightarrow x = 3 \\\\ 3 + 2y = 9 \\Rightarrow y = 3 \\\\ x \\cdot y = 3 \\cdot 3 = 9',
    difficulty: 'medium',
    skills: ['sistemas-ecuaciones-reduccion', 'algebra-ecuaciones-lineales']
  },
  {
    id: 'm1-alg008-14',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'reducción',
    questionLatex: '\\text{Para el sistema:} \\\\ 4x + 3y = 11 \\\\ 2x - 3y = 1 \\\\ \\text{Sumando las ecuaciones, x es:}',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation: '\\text{Sumando: } 6x = 12 \\Rightarrow x = 2',
    difficulty: 'easy',
    skills: ['sistemas-ecuaciones-reduccion', 'algebra-ecuaciones-lineales']
  },
  {
    id: 'm1-alg008-15',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'reducción',
    questionLatex: '\\text{Resuelve:} \\\\ 5x + 2y = 19 \\\\ 3x + 4y = 17 \\\\ \\text{Multiplicando la primera por 2 y restando, x vale:}',
    options: ['1', '2', '3', '4'],
    correctAnswer: 2,
    explanation: '\\text{Multiplicando 1ra por 2: } 10x + 4y = 38 \\\\ \\text{Restando la 2da: } 7x = 21 \\Rightarrow x = 3',
    difficulty: 'hard',
    skills: ['sistemas-ecuaciones-reduccion', 'algebra-ecuaciones-lineales']
  },
  // ========================================
  // APLICACIONES DE SISTEMAS DE ECUACIONES
  // ========================================
  {
    id: 'm1-alg008-16',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'sistemas-aplicaciones',
    questionLatex: '\\text{En una tienda, 2 camisetas y 3 pantalones cuestan \\$25.000. Una camiseta y 2 pantalones cuestan \\$15.000. ¿Cuánto cuesta una camiseta?}',
    options: ['\\$3.000', '\\$4.000', '\\$5.000', '\\$6.000'],
    correctAnswer: 2,
    explanation: '\\text{Sea } c = \\text{camiseta, } p = \\text{pantalón} \\\\ 2c + 3p = 25000 \\\\ c + 2p = 15000 \\Rightarrow c = 15000 - 2p \\\\ 2(15000 - 2p) + 3p = 25000 \\\\ 30000 - p = 25000 \\Rightarrow p = 5000 \\\\ c = 5000',
    difficulty: 'medium',
    skills: ['sistemas-ecuaciones-problemas', 'algebra-problemas-contexto']
  },
  {
    id: 'm1-alg008-17',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'sistemas-aplicaciones',
    questionLatex: '\\text{La suma de dos números es 20 y su diferencia es 4. ¿Cuál es el número mayor?}',
    options: ['8', '10', '12', '14'],
    correctAnswer: 2,
    explanation: '\\text{Sea } x \\text{ el mayor, } y \\text{ el menor} \\\\ x + y = 20 \\\\ x - y = 4 \\\\ \\text{Sumando: } 2x = 24 \\Rightarrow x = 12',
    difficulty: 'easy',
    skills: ['sistemas-ecuaciones-problemas', 'algebra-problemas-numeros']
  },
  {
    id: 'm1-alg008-18',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'sistemas-aplicaciones',
    questionLatex: '\\text{María tiene el doble de edad que Juan. Hace 5 años, la suma de sus edades era 20 años. ¿Cuántos años tiene María ahora?}',
    options: ['18', '20', '22', '24'],
    correctAnswer: 1,
    explanation: '\\text{Sea } m = \\text{edad de María, } j = \\text{edad de Juan} \\\\ m = 2j \\\\ (m - 5) + (j - 5) = 20 \\Rightarrow m + j = 30 \\\\ 2j + j = 30 \\Rightarrow j = 10 \\Rightarrow m = 20',
    difficulty: 'medium',
    skills: ['sistemas-ecuaciones-problemas', 'algebra-problemas-edades']
  },
  {
    id: 'm1-alg008-19',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'sistemas-aplicaciones',
    questionLatex: '\\text{Un rectángulo tiene perímetro 28 cm. Si el largo es 4 cm más que el ancho, ¿cuánto mide el largo?}',
    options: ['7 cm', '8 cm', '9 cm', '10 cm'],
    correctAnswer: 2,
    explanation: '\\text{Sea } l = \\text{largo, } a = \\text{ancho} \\\\ 2l + 2a = 28 \\Rightarrow l + a = 14 \\\\ l = a + 4 \\\\ (a + 4) + a = 14 \\Rightarrow a = 5 \\\\ l = 9 \\text{ cm}',
    difficulty: 'easy',
    skills: ['sistemas-ecuaciones-problemas', 'geometria-perimetros']
  },
  {
    id: 'm1-alg008-20',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'sistemas-aplicaciones',
    questionLatex: '\\text{Un cine vendió 200 entradas. Las entradas de adulto cuestan \\$5.000 y las de niño \\$3.000. Si recaudó \\$800.000, ¿cuántas entradas de adulto vendió?}',
    options: ['80', '100', '120', '150'],
    correctAnswer: 1,
    explanation: '\\text{Sea } a = \\text{adultos, } n = \\text{niños} \\\\ a + n = 200 \\\\ 5000a + 3000n = 800000 \\\\ \\text{De la 1ra: } n = 200 - a \\\\ 5000a + 3000(200 - a) = 800000 \\\\ 2000a = 200000 \\Rightarrow a = 100',
    difficulty: 'medium',
    skills: ['sistemas-ecuaciones-problemas', 'algebra-problemas-contexto']
  }
];
