import { Question } from '../../../types';

export const m2GeometriaPerimetroAreaQuestions: Question[] = [
  {
    id: 'm2-geo-per-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un trapecio tiene bases de 8 cm y 12 cm, y altura de 5 cm. ¿Cuál es su área?',
    questionLatex: '\\text{Un trapecio tiene bases de 8 cm y 12 cm, y altura de 5 cm. ¿Cuál es su área?}',
    options: ['40 cm²', '50 cm²', '60 cm²', '100 cm²'],
    correctAnswer: 1,
    explanation: 'Área del trapecio = (base mayor + base menor) × altura / 2:',
    explanationLatex: 'A = \\frac{(12 + 8) \\times 5}{2} = \\frac{20 \\times 5}{2} = \\frac{100}{2} = 50 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-area', 'geometria-area-trapecio', 'geometria-trapecio', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-per-2',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un rombo con diagonales de 12 cm y 16 cm es:',
    questionLatex: '\\text{El área de un rombo con diagonales de 12 cm y 16 cm es:}',
    options: ['48 cm²', '96 cm²', '192 cm²', '144 cm²'],
    correctAnswer: 1,
    explanation: 'El área de un rombo es (diagonal mayor × diagonal menor) / 2:',
    explanationLatex: 'A = \\frac{D \\times d}{2} = \\frac{16 \\times 12}{2} = \\frac{192}{2} = 96 \\text{ cm}^2',
    difficulty: 'hard',
    skills: ['geometria-area', 'geometria-area-rombo', 'geometria-rombo', 'numeros-operaciones-basicas']
  }
];
