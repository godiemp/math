import { Question } from '../../../types';

export const m2AlgebraSistemasEcuacionesQuestions: Question[] = [
  {
    id: 'm2-2',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Resuelve el sistema: 2x + y = 8 y x - y = 1',
    questionLatex: '\\text{Resuelve el sistema: } 2x + y = 8 \\text{ y } x - y = 1',
    options: ['x = 2, y = 4', 'x = 3, y = 2', 'x = 4, y = 0', 'x = 1, y = 6'],
    correctAnswer: 1,
    explanation: 'Sumando las ecuaciones: 3x = 9, entonces x = 3. Sustituyendo: 3 - y = 1, entonces y = 2',
    explanationLatex: '3x = 9 \\rightarrow x = 3. \\quad \\text{Sustituyendo: } 3 - y = 1 \\rightarrow y = 2',
    difficulty: 'medium',
    skills: ['algebra-sistemas-ecuaciones', 'algebra-metodo-eliminacion', 'algebra-metodo-sustitucion', 'algebra-despeje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-sist-1',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Resuelve el sistema: $3x + 2y = 12$ y $5x - y = 11$',
    questionLatex: '\\text{Resuelve el sistema: } 3x + 2y = 12 \\text{ y } 5x - y = 11',
    options: ['$x = 2, y = 3$', '$x = 3, y = 2$', '$x = 1, y = 6$', '$x = 4, y = 0$'],
    correctAnswer: 0,
    explanation: 'Multiplicamos la segunda ecuación por 2 y sumamos:',
    explanationLatex: '3x + 2y = 12 \\text{ y } 10x - 2y = 22 \\rightarrow 13x = 34 \\rightarrow x = 2, y = 3',
    difficulty: 'hard',
    skills: ['algebra-sistemas-ecuaciones', 'algebra-metodo-eliminacion', 'algebra-despeje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-sist-2',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Un sistema de ecuaciones tiene solución única cuando sus rectas:',
    questionLatex: '\\text{Un sistema de ecuaciones tiene solución única cuando sus rectas:}',
    options: ['Son paralelas', 'Se intersectan en un punto', 'Son coincidentes', 'Son perpendiculares'],
    correctAnswer: 1,
    explanation: 'Un sistema tiene solución única cuando las rectas se intersectan en exactamente un punto',
    explanationLatex: '\\text{Las rectas se intersectan en un punto único} \\rightarrow \\text{una solución}',
    difficulty: 'medium',
    skills: ['algebra-sistemas-ecuaciones', 'algebra-interpretacion-geometrica', 'geometria-rectas', 'algebra-solucion-sistemas']
  },
  {
    id: 'm2-alg-sist-3',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Resuelve el sistema: $x + 2y + z = 6$, $2x - y + 3z = 14$, $x + y - z = -2$',
    questionLatex: '\\text{Resuelve: } x + 2y + z = 6, \\; 2x - y + 3z = 14, \\; x + y - z = -2',
    options: ['$x = 1, y = 2, z = 1$', '$x = 2, y = 1, z = 1$', '$x = 3, y = 0, z = 3$', '$x = 1, y = -1, z = 4$'],
    optionsLatex: ['x = 1, y = 2, z = 1', 'x = 2, y = 1, z = 1', 'x = 3, y = 0, z = 3', 'x = 1, y = -1, z = 4'],
    correctAnswer: 1,
    explanation: 'Resolviendo por eliminación gaussiana: de las ecuaciones 1 y 3: z = 1, luego x = 2, y = 1',
    explanationLatex: '\\text{Sistema 3×3: eliminación gaussiana} \\rightarrow x = 2, y = 1, z = 1',
    difficulty: 'extreme',
    skills: ['algebra-sistemas-ecuaciones', 'algebra-sistemas-3x3', 'algebra-eliminacion-gaussiana', 'algebra-despeje', 'numeros-operaciones-basicas']
  }
];
