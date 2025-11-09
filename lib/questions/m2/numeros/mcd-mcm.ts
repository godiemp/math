import { Question } from '../../../types';

export const m2NumerosMcdMcmQuestions: Question[] = [
  {
    id: 'm2-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'El mínimo común múltiplo (MCM) de 12, 18 y 24 es:',
    questionLatex: '\\text{El mínimo común múltiplo (MCM) de 12, 18 y 24 es:}',
    options: ['36', '48', '72', '144'],
    correctAnswer: 2,
    explanation: 'Factorizando: 12 = 2² × 3, 18 = 2 × 3², 24 = 2³ × 3. MCM = 2³ × 3² = 8 × 9 = 72',
    explanationLatex: '12 = 2^2 \\times 3, \\quad 18 = 2 \\times 3^2, \\quad 24 = 2^3 \\times 3 \\quad \\Rightarrow \\quad \\text{MCM} = 2^3 \\times 3^2 = 8 \\times 9 = 72',
    difficulty: 'medium',
    skills: ['numeros-mcd-mcm', 'numeros-factorizacion-prima', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-mcd-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'El máximo común divisor (MCD) de 48, 72 y 120 es:',
    questionLatex: '\\text{El máximo común divisor (MCD) de 48, 72 y 120 es:}',
    options: ['12', '24', '36', '8'],
    correctAnswer: 1,
    explanation: 'Factorizando: 48 = 2⁴ × 3, 72 = 2³ × 3², 120 = 2³ × 3 × 5. MCD = 2³ × 3 = 24',
    explanationLatex: '48 = 2^4 \\times 3, \\quad 72 = 2^3 \\times 3^2, \\quad 120 = 2^3 \\times 3 \\times 5 \\quad \\Rightarrow \\quad \\text{MCD} = 2^3 \\times 3 = 24',
    difficulty: 'hard',
    skills: ['numeros-mcd-mcm', 'numeros-factorizacion-prima', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-mcd-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'El MCM de 15, 20 y 25 es:',
    questionLatex: '\\text{El MCM de 15, 20 y 25 es:}',
    options: ['100', '150', '300', '75'],
    correctAnswer: 2,
    explanation: 'Factorizando: 15 = 3 × 5, 20 = 2² × 5, 25 = 5². MCM = 2² × 3 × 5² = 4 × 3 × 25 = 300',
    explanationLatex: '15 = 3 \\times 5, \\quad 20 = 2^2 \\times 5, \\quad 25 = 5^2 \\quad \\Rightarrow \\quad \\text{MCM} = 2^2 \\times 3 \\times 5^2 = 300',
    difficulty: 'hard',
    skills: ['numeros-mcd-mcm', 'numeros-factorizacion-prima', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-mcd-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'El MCD de 36 y 48 es:',
    questionLatex: '\\text{El MCD de 36 y 48 es:}',
    options: ['6', '12', '18', '24'],
    correctAnswer: 1,
    explanation: 'Factorizando: 36 = 2² × 3², 48 = 2⁴ × 3. MCD = 2² × 3 = 12',
    explanationLatex: '36 = 2^2 \\times 3^2, \\quad 48 = 2^4 \\times 3 \\quad \\Rightarrow \\quad \\text{MCD} = 2^2 \\times 3 = 12',
    difficulty: 'medium',
    skills: ['numeros-mcd-mcm', 'numeros-factorizacion-prima', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-mcd-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'Si el MCD de dos números es 6 y su MCM es 72, y uno de los números es 18, ¿cuál es el otro número?',
    questionLatex: '\\text{Si MCD}(a,b) = 6, \\text{ MCM}(a,b) = 72 \\text{ y } a = 18, \\text{ ¿cuál es } b?',
    options: ['12', '24', '36', '48'],
    correctAnswer: 1,
    explanation: 'Usamos la fórmula: MCD × MCM = producto de los números',
    explanationLatex: '6 \\times 72 = 18 \\times b \\quad \\Rightarrow \\quad b = \\frac{432}{18} = 24',
    difficulty: 'extreme',
    skills: ['numeros-mcd-mcm', 'numeros-relacion-mcd-mcm', 'numeros-operaciones-basicas', 'algebra-despeje']
  }
];
