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
  }
];
