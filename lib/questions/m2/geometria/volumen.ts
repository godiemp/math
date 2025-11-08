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
  },
  {
    id: 'm2-geo-vol-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El volumen de una esfera con radio 6 cm es (usar π ≈ 3.14):',
    questionLatex: '\\text{El volumen de una esfera con radio 6 cm es (usar } \\pi \\approx 3.14):',
    options: ['452.16 cm³', '678.24 cm³', '904.32 cm³', '1130.4 cm³'],
    correctAnswer: 2,
    explanation: 'V = (4/3)πr³ = (4/3) × 3.14 × 6³ = (4/3) × 3.14 × 216 ≈ 904.32 cm³',
    explanationLatex: 'V = \\frac{4}{3}\\pi r^3 = \\frac{4}{3} \\times 3.14 \\times 6^3 = \\frac{4}{3} \\times 3.14 \\times 216 \\approx 904.32 \\text{ cm}^3',
    difficulty: 'hard',
    skills: ['geometria-volumen', 'geometria-volumen-esfera', 'numeros-potencias', 'numeros-fracciones', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-vol-2',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un cono tiene radio de base 4 cm y altura 9 cm. Su volumen es (usar π ≈ 3.14):',
    questionLatex: '\\text{Un cono tiene radio de base 4 cm y altura 9 cm. Su volumen es (usar } \\pi \\approx 3.14):',
    options: ['113.04 cm³', '150.72 cm³', '226.08 cm³', '301.44 cm³'],
    correctAnswer: 1,
    explanation: 'V = (1/3)πr²h = (1/3) × 3.14 × 4² × 9 = (1/3) × 3.14 × 16 × 9 ≈ 150.72 cm³',
    explanationLatex: 'V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3} \\times 3.14 \\times 4^2 \\times 9 \\approx 150.72 \\text{ cm}^3',
    difficulty: 'hard',
    skills: ['geometria-volumen', 'geometria-volumen-cono', 'numeros-potencias', 'numeros-fracciones', 'numeros-decimales', 'numeros-operaciones-basicas']
  }
];
