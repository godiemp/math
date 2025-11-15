import { Question } from '../../../types';

export const m2GeometriaAreaCirculoQuestions: Question[] = [
  {
    id: 'm2-geo-visual-2',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{En la siguiente figura, un círculo está inscrito en un cuadrado de lado 10 cm. ¿Cuál es el área del círculo? (usar } \\pi \\approx 3.14)',
    options: ['31.4 cm²', '62.8 cm²', '78.5 cm²', '100 cm²'],
    correctAnswer: 2,
    explanation: 'El diámetro del círculo inscrito es igual al lado del cuadrado, entonces el radio es 5 cm:',
    explanationLatex: 'r = \\frac{10}{2} = 5 \\text{ cm} \\quad \\Rightarrow \\quad A = \\pi r^2 = 3.14 \\times 5^2 = 3.14 \\times 25 = 78.5 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-area-circulo', 'geometria-circulos', 'geometria-cuadrados', 'numeros-potencias', 'numeros-decimales', 'numeros-operaciones-basicas'],
    visualData: {
      type: 'geometry',
      data: [
        {
          type: 'rectangle',
          points: [
            { x: 100, y: 50 },
            { x: 300, y: 250 }
          ],
          labels: {
            sides: ['10 cm', '10 cm']
          },
          dimensions: {
            showSides: true
          }
        },
        {
          type: 'circle',
          center: { x: 200, y: 150 },
          radius: 100,
          labels: {
            sides: ['r = 5 cm']
          },
          dimensions: {
            showSides: true
          }
        }
      ]
    }
  },
  {
    id: 'm2-geo-circ-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un sector circular tiene ángulo central de } 60^\\circ \\text{ y radio 12 cm. Su área es (usar } \\pi \\approx 3.14):',
    options: ['37.68 cm²', '75.36 cm²', '113.04 cm²', '150.72 cm²'],
    correctAnswer: 1,
    explanation: 'Área del sector = (θ/360°) × πr² donde θ es el ángulo en grados:',
    explanationLatex: 'A = \\frac{60}{360} \\times \\pi r^2 = \\frac{1}{6} \\times 3.14 \\times 12^2 = \\frac{1}{6} \\times 3.14 \\times 144 \\approx 75.36 \\text{ cm}^2',
    difficulty: 'hard',
    skills: ['geometria-sector-circular', 'geometria-area-circulo', 'geometria-circulos', 'numeros-angulos', 'numeros-fracciones', 'numeros-potencias', 'numeros-operaciones-basicas']
  }
];
