import { Question } from '../../../types';

export const m2GeometriaAreaCirculoQuestions: Question[] = [
  {
    id: 'm2-geo-visual-2',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'En la siguiente figura, un círculo está inscrito en un cuadrado de lado 10 cm. ¿Cuál es el área del círculo? (usar π ≈ 3.14)',
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
  }
];
