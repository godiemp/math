import { Question } from '../../../types';

export const m2GeometriaTeoremaDepitagorasQuestions: Question[] = [
  {
    id: 'm2-geo-visual-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'En el siguiente triángulo rectángulo, si un cateto mide 5 cm y la hipotenusa mide 13 cm, ¿cuánto mide el otro cateto?',
    questionLatex: '\\text{En el siguiente triángulo rectángulo, si un cateto mide 5 cm y la hipotenusa mide 13 cm, ¿cuánto mide el otro cateto?}',
    options: ['8 cm', '10 cm', '12 cm', '15 cm'],
    correctAnswer: 2,
    explanation: 'Usando el teorema de Pitágoras:',
    explanationLatex: 'c^2 = a^2 + b^2 \\quad \\Rightarrow \\quad 13^2 = 5^2 + b^2 \\quad \\Rightarrow \\quad 169 = 25 + b^2 \\quad \\Rightarrow \\quad b^2 = 144 \\quad \\Rightarrow \\quad b = 12 \\text{ cm}',
    difficulty: 'medium',
    skills: ['geometria-pitagoras', 'geometria-triangulos', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas'],
    visualData: {
      type: 'geometry',
      data: [
        {
          type: 'triangle',
          points: [
            { x: 50, y: 220, label: 'A' },
            { x: 290, y: 220, label: 'B' },
            { x: 50, y: 70, label: 'C' }
          ],
          labels: {
            sides: ['12 cm', '13 cm', '5 cm']
          },
          dimensions: {
            showSides: true
          }
        }
      ]
    }
  },
  {
    id: 'm2-geo-visual-3',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'En el siguiente triángulo isósceles, dos lados miden 10 cm cada uno y el ángulo entre ellos es 60°. ¿Cuál es aproximadamente la longitud de la base? (usar cos(60°) = 0.5)',
    questionLatex: '\\text{En el siguiente triángulo isósceles, dos lados miden 10 cm cada uno y el ángulo entre ellos es } 60^\\circ\\text{. ¿Cuál es aproximadamente la longitud de la base? (usar } \\cos(60^\\circ) = 0.5)',
    options: ['5 cm', '8.66 cm', '10 cm', '12 cm'],
    correctAnswer: 2,
    explanation: 'Usando la ley de cosenos:',
    explanationLatex: 'c^2 = a^2 + b^2 - 2ab\\cos(C) = 10^2 + 10^2 - 2(10)(10)(0.5) = 100 + 100 - 100 = 100 \\quad \\Rightarrow \\quad c = 10 \\text{ cm}',
    difficulty: 'hard',
    skills: ['geometria-ley-cosenos', 'geometria-triangulos', 'numeros-potencias', 'numeros-operaciones-basicas'],
    visualData: {
      type: 'geometry',
      data: [
        {
          type: 'triangle',
          points: [
            { x: 100, y: 220, label: 'A' },
            { x: 300, y: 220, label: 'B' },
            { x: 200, y: 80, label: 'C' }
          ],
          labels: {
            sides: ['10 cm', '10 cm', '10 cm']
          },
          dimensions: {
            showSides: true
          }
        },
        {
          type: 'angle',
          points: [
            { x: 200, y: 80 },
            { x: 100, y: 220 },
            { x: 300, y: 220 }
          ],
          labels: {
            angles: ['60°']
          }
        }
      ]
    }
  },
  {
    id: 'm2-geo-pit-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Una escalera de 10 m se apoya contra una pared. Si la base está a 6 m de la pared, ¿a qué altura llega la escalera?',
    questionLatex: '\\text{Una escalera de 10 m se apoya contra una pared. Si la base está a 6 m de la pared, ¿a qué altura llega la escalera?}',
    options: ['6 m', '7 m', '8 m', '9 m'],
    correctAnswer: 2,
    explanation: 'Usando el teorema de Pitágoras: h² + 6² = 10²',
    explanationLatex: 'h^2 + 6^2 = 10^2 \\rightarrow h^2 + 36 = 100 \\rightarrow h^2 = 64 \\rightarrow h = 8 \\text{ m}',
    difficulty: 'medium',
    skills: ['geometria-pitagoras', 'geometria-triangulos', 'geometria-aplicaciones', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-pit-2',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un triángulo rectángulo tiene catetos de 9 cm y 12 cm. ¿Cuánto mide la hipotenusa?',
    questionLatex: '\\text{Un triángulo rectángulo tiene catetos de 9 cm y 12 cm. ¿Cuánto mide la hipotenusa?}',
    options: ['13 cm', '15 cm', '17 cm', '21 cm'],
    correctAnswer: 1,
    explanation: 'Usando el teorema de Pitágoras: c² = a² + b²',
    explanationLatex: 'c^2 = 9^2 + 12^2 = 81 + 144 = 225 \\rightarrow c = \\sqrt{225} = 15 \\text{ cm}',
    difficulty: 'medium',
    skills: ['geometria-pitagoras', 'geometria-triangulos', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-pit-3',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'La diagonal de un rectángulo mide 10 cm y uno de sus lados mide 8 cm. ¿Cuánto mide el otro lado?',
    questionLatex: '\\text{Diagonal de rectángulo = 10 cm, un lado = 8 cm. ¿Otro lado?}',
    options: ['4 cm', '5 cm', '6 cm', '7 cm'],
    correctAnswer: 2,
    explanation: 'La diagonal forma un triángulo rectángulo con los lados:',
    explanationLatex: '10^2 = 8^2 + b^2 \\rightarrow 100 = 64 + b^2 \\rightarrow b^2 = 36 \\rightarrow b = 6 \\text{ cm}',
    difficulty: 'hard',
    skills: ['geometria-pitagoras', 'geometria-rectangulo', 'geometria-aplicaciones', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas']
  }
];
