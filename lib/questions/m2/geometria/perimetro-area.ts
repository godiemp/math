import { Question } from '../../../types';

export const m2GeometriaPerimetroAreaQuestions: Question[] = [
  {
    id: 'm2-geo-per-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
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
    questionLatex: '\\text{El área de un rombo con diagonales de 12 cm y 16 cm es:}',
    options: ['48 cm²', '96 cm²', '192 cm²', '144 cm²'],
    correctAnswer: 1,
    explanation: 'El área de un rombo es (diagonal mayor × diagonal menor) / 2:',
    explanationLatex: 'A = \\frac{D \\times d}{2} = \\frac{16 \\times 12}{2} = \\frac{192}{2} = 96 \\text{ cm}^2',
    difficulty: 'hard',
    skills: ['geometria-area', 'geometria-area-rombo', 'geometria-rombo', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-per-3',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un triángulo tiene base de 10 cm y altura de 6 cm. ¿Cuál es su área?}',
    options: ['30 cm²', '60 cm²', '15 cm²', '20 cm²'],
    correctAnswer: 0,
    explanation: 'Área del triángulo = (base × altura) / 2:',
    explanationLatex: 'A = \\frac{b \\times h}{2} = \\frac{10 \\times 6}{2} = \\frac{60}{2} = 30 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-area', 'geometria-area-triangulo', 'geometria-triangulos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-per-4',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Perímetro rectángulo = 40 cm, largo = 2×ancho. ¿Área?}',
    options: ['66.67 cm²', '88.89 cm²', '100 cm²', '133.33 cm²'],
    correctAnswer: 1,
    explanation: 'Si ancho = x, largo = 2x. Perímetro: 2(x + 2x) = 40, entonces x = 40/6 = 6.67 cm',
    explanationLatex: '2(x + 2x) = 40 \\rightarrow 6x = 40 \\rightarrow x = 6.67 \\text{ cm, Área} = 6.67 \\times 13.33 = 88.89 \\text{ cm}^2',
    difficulty: 'hard',
    skills: ['geometria-perimetro', 'geometria-area', 'geometria-rectangulo', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-per-5',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un hexágono regular tiene perímetro de 36 cm. ¿Cuánto mide cada lado?}',
    options: ['4 cm', '5 cm', '6 cm', '9 cm'],
    correctAnswer: 2,
    explanation: 'Un hexágono regular tiene 6 lados iguales. Cada lado = 36/6 = 6 cm',
    explanationLatex: '\\text{Lado} = \\frac{\\text{Perímetro}}{6} = \\frac{36}{6} = 6 \\text{ cm}',
    difficulty: 'medium',
    skills: ['geometria-perimetro', 'geometria-poligonos-regulares', 'geometria-hexagono', 'numeros-operaciones-basicas']
  }
];
