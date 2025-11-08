import { Question } from '../../../types';

export const m1GeometriaVolumenQuestions: Question[] = [
  {
    id: 'm1-19',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un cubo tiene arista de 3 cm. ¿Cuál es su volumen?',
    questionLatex: '\\text{Un cubo tiene arista de 3 cm. ¿Cuál es su volumen?}',
    options: ['9 cm³', '18 cm³', '27 cm³', '36 cm³'],
    correctAnswer: 2,
    explanation: 'El volumen de un cubo es:',
    explanationLatex: 'V = a^3 = 3^3 = 27 \\text{ cm}^3',
    difficulty: 'easy',
    skills: ['geometria-volumen', 'geometria-volumen-cubo', 'numeros-potencias', 'numeros-operaciones-basicas']
  }
];
