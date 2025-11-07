import { Question } from '../types';

export const m2GeometriaQuestions: Question[] = [
  {
    id: 'm2-4',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'La distancia entre los puntos A(1, 2) y B(4, 6) es:',
    questionLatex: '\\text{La distancia entre los puntos } A(1, 2) \\text{ y } B(4, 6) \\text{ es:}',
    options: ['3', '4', '5', '7'],
    correctAnswer: 2,
    explanation: 'd = √[(4-1)² + (6-2)²] = √[3² + 4²] = √[9 + 16] = √25 = 5',
    explanationLatex: 'd = \\sqrt{(4-1)^2 + (6-2)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5',
    difficulty: 'medium',
    skills: ['geometria-plano-cartesiano', 'geometria-distancia', 'geometria-pitagoras', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
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
    id: 'm2-10',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Dos rectas son perpendiculares. Si una tiene pendiente m = 2, ¿cuál es la pendiente de la otra?',
    questionLatex: '\\text{Dos rectas son perpendiculares. Si una tiene pendiente } m = 2\\text{, ¿cuál es la pendiente de la otra?}',
    options: ['2', '-2', '1/2', '-1/2'],
    optionsLatex: ['2', '-2', '\\frac{1}{2}', '-\\frac{1}{2}'],
    correctAnswer: 3,
    explanation: 'Rectas perpendiculares tienen pendientes que son recíprocas negativas: m₁ × m₂ = -1. Si m₁ = 2, entonces m₂ = -1/2',
    explanationLatex: 'm_1 \\times m_2 = -1 \\quad \\Rightarrow \\quad 2 \\times m_2 = -1 \\quad \\Rightarrow \\quad m_2 = -\\frac{1}{2}',
    difficulty: 'medium',
    skills: ['geometria-rectas-perpendiculares', 'geometria-pendiente-perpendicular', 'algebra-funciones-lineales', 'algebra-pendiente', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
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
  }
];
