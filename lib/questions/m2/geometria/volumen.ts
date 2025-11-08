import { Question } from '../../../types';

export const m2GeometriaVolumenQuestions: Question[] = [
  {
    id: 'm2-5',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El volumen de un cilindro con radio 3 cm y altura 4 cm es (usar π ≈ 3.14):',
    questionLatex: '\\text{El volumen de un cilindro con radio 3 cm y altura 4 cm es (usar } \\pi \\approx 3.14):',
    options: ['37.68 cm³', '75.36 cm³', '113.04 cm³', '150.72 cm³'],
    correctAnswer: 2,
    explanation: 'V = πr²h = 3.14 × 3² × 4 = 3.14 × 9 × 4 = 113.04 cm³',
    explanationLatex: 'V = \\pi r^2 h = 3.14 \\times 3^2 \\times 4 = 3.14 \\times 9 \\times 4 = 113.04 \\text{ cm}^3',
    difficulty: 'medium',
    skills: ['geometria-volumen', 'geometria-volumen-cilindro', 'numeros-potencias', 'numeros-decimales', 'numeros-operaciones-basicas']
  }
];
