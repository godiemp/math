import { Question } from '../types';

export const m1GeometriaQuestions: Question[] = [
  {
    id: 'm1-3',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un triángulo rectángulo tiene catetos de 3 cm y 4 cm. ¿Cuál es la longitud de su hipotenusa?',
    questionLatex: '\\text{Un triángulo rectángulo tiene catetos de 3 cm y 4 cm. ¿Cuál es la longitud de su hipotenusa?}',
    options: ['5 cm', '6 cm', '7 cm', '8 cm'],
    correctAnswer: 0,
    explanation: 'Por el teorema de Pitágoras:',
    explanationLatex: 'h^2 = 3^2 + 4^2 = 9 + 16 = 25 \\text{, entonces } h = \\sqrt{25} = 5 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-pitagoras', 'numeros-raices', 'numeros-potencias']
  },
  {
    id: 'm1-6',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un círculo con radio 5 cm es aproximadamente (usar $\\pi \\approx 3.14$):',
    questionLatex: '\\text{El área de un círculo con radio 5 cm es aproximadamente (usar } \\pi \\approx 3.14):',
    options: ['31.4 cm²', '62.8 cm²', '78.5 cm²', '157 cm²'],
    correctAnswer: 2,
    explanation: 'Usamos la fórmula del área del círculo:',
    explanationLatex: 'A = \\pi r^2 = 3.14 \\times 5^2 = 3.14 \\times 25 = 78.5 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-area-circulo', 'geometria-area', 'numeros-potencias', 'numeros-decimales']
  },
  {
    id: 'm1-17',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si dos ángulos son complementarios y uno mide 35°, ¿cuánto mide el otro?',
    questionLatex: '\\text{Si dos ángulos son complementarios y uno mide } 35^\\circ\\text{, ¿cuánto mide el otro?}',
    options: ['55°', '65°', '145°', '325°'],
    correctAnswer: 0,
    explanation: 'Ángulos complementarios suman 90°:',
    explanationLatex: '90^\\circ - 35^\\circ = 55^\\circ',
    difficulty: 'easy',
    skills: ['geometria-angulos', 'geometria-angulos-complementarios', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-18',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: '¿Cuál es el perímetro de un rectángulo de 8 cm de largo y 5 cm de ancho?',
    questionLatex: '\\text{¿Cuál es el perímetro de un rectángulo de 8 cm de largo y 5 cm de ancho?}',
    options: ['13 cm', '26 cm', '40 cm', '65 cm'],
    correctAnswer: 1,
    explanation: 'El perímetro de un rectángulo es:',
    explanationLatex: 'P = 2(\\text{largo} + \\text{ancho}) = 2(8 + 5) = 2(13) = 26 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-rectangulos', 'geometria-perimetro', 'numeros-operaciones-basicas']
  },
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
  },
  {
    id: 'm1-20',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'La distancia entre los puntos $A(1, 2)$ y $B(4, 6)$ es:',
    questionLatex: '\\text{La distancia entre los puntos } A(1, 2) \\text{ y } B(4, 6) \\text{ es:}',
    options: ['3', '4', '5', '7'],
    correctAnswer: 2,
    explanation: 'Usamos la fórmula de distancia:',
    explanationLatex: 'd = \\sqrt{(4-1)^2 + (6-2)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5',
    difficulty: 'medium',
    skills: ['geometria-plano-cartesiano', 'geometria-distancia', 'geometria-pitagoras', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-21',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un trapecio con bases de 6 cm y 10 cm, y altura de 4 cm es:',
    questionLatex: '\\text{El área de un trapecio con bases de 6 cm y 10 cm, y altura de 4 cm es:}',
    options: ['24 cm²', '32 cm²', '40 cm²', '64 cm²'],
    correctAnswer: 1,
    explanation: 'El área de un trapecio es:',
    explanationLatex: 'A = \\frac{(b_1 + b_2) \\times h}{2} = \\frac{(6 + 10) \\times 4}{2} = \\frac{64}{2} = 32 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-trapecio', 'geometria-area', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-geo-visual-1',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'En el siguiente triángulo rectángulo, si los catetos miden 6 cm y 8 cm, ¿cuánto mide la hipotenusa?',
    questionLatex: '\\text{En el siguiente triángulo rectángulo, si los catetos miden 6 cm y 8 cm, ¿cuánto mide la hipotenusa?}',
    options: ['9 cm', '10 cm', '12 cm', '14 cm'],
    correctAnswer: 1,
    explanation: 'Usando el teorema de Pitágoras:',
    explanationLatex: 'c^2 = a^2 + b^2 = 6^2 + 8^2 = 36 + 64 = 100 \\quad \\Rightarrow \\quad c = \\sqrt{100} = 10 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-pitagoras', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas'],
    visualData: {
      type: 'geometry',
      data: [
        {
          type: 'triangle',
          points: [
            { x: 50, y: 200, label: 'A' },
            { x: 200, y: 200, label: 'B' },
            { x: 50, y: 80, label: 'C' }
          ],
          labels: {
            sides: ['8 cm', '10 cm', '6 cm']
          },
          dimensions: {
            showSides: true
          }
        }
      ]
    }
  },
  {
    id: 'm1-geo-visual-2',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un círculo tiene un radio de 7 cm. ¿Cuál es el área del círculo? (usar π ≈ 3.14)',
    questionLatex: '\\text{Un círculo tiene un radio de 7 cm. ¿Cuál es el área del círculo? (usar } \\pi \\approx 3.14)',
    options: ['43.96 cm²', '98.91 cm²', '153.86 cm²', '153.94 cm²'],
    correctAnswer: 3,
    explanation: 'El área de un círculo es:',
    explanationLatex: 'A = \\pi r^2 = 3.14 \\times 7^2 = 3.14 \\times 49 = 153.86 \\text{ cm}^2 \\approx 153.94 \\text{ cm}^2',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-area-circulo', 'geometria-area', 'numeros-potencias', 'numeros-decimales', 'numeros-operaciones-basicas'],
    visualData: {
      type: 'geometry',
      data: [
        {
          type: 'circle',
          center: { x: 200, y: 150, label: 'O' },
          radius: 100,
          labels: {
            sides: ['r = 7 cm']
          },
          dimensions: {
            showSides: true
          }
        }
      ]
    }
  },
  {
    id: 'm1-geo-visual-3',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'En la siguiente figura, el ángulo AOB mide 60°. Si añadimos un ángulo BOC de 50°, ¿cuánto mide el ángulo AOC?',
    questionLatex: '\\text{En la siguiente figura, el ángulo AOB mide } 60^\\circ\\text{. Si añadimos un ángulo BOC de } 50^\\circ\\text{, ¿cuánto mide el ángulo AOC?}',
    options: ['90°', '100°', '110°', '120°'],
    correctAnswer: 2,
    explanation: 'Los ángulos adyacentes se suman:',
    explanationLatex: '\\angle AOC = \\angle AOB + \\angle BOC = 60^\\circ + 50^\\circ = 110^\\circ',
    difficulty: 'easy',
    skills: ['geometria-angulos', 'geometria-angulos-adyacentes', 'numeros-operaciones-basicas'],
    visualData: {
      type: 'geometry',
      data: [
        {
          type: 'angle',
          points: [
            { x: 200, y: 150, label: 'O' },
            { x: 320, y: 150, label: 'A' },
            { x: 260, y: 46, label: 'C' }
          ],
          labels: {
            angles: ['110°']
          }
        }
      ]
    }
  },
  {
    id: 'm1-geo-visual-4',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El siguiente rectángulo tiene un largo de 12 cm y un ancho de 5 cm. ¿Cuál es su perímetro?',
    questionLatex: '\\text{El siguiente rectángulo tiene un largo de 12 cm y un ancho de 5 cm. ¿Cuál es su perímetro?}',
    options: ['17 cm', '24 cm', '34 cm', '60 cm'],
    correctAnswer: 2,
    explanation: 'El perímetro de un rectángulo es:',
    explanationLatex: 'P = 2(l + w) = 2(12 + 5) = 2 \\times 17 = 34 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-rectangulos', 'geometria-perimetro', 'numeros-operaciones-basicas'],
    visualData: {
      type: 'geometry',
      data: [
        {
          type: 'rectangle',
          points: [
            { x: 50, y: 80, label: 'A' },
            { x: 350, y: 220, label: 'C' }
          ],
          labels: {
            sides: ['12 cm', '5 cm']
          },
          dimensions: {
            showSides: true
          }
        }
      ]
    }
  },
  {
    id: 'm1-geo-visual-5',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'En el siguiente triángulo equilátero, cada lado mide 8 cm. ¿Cuál es su perímetro?',
    questionLatex: '\\text{En el siguiente triángulo equilátero, cada lado mide 8 cm. ¿Cuál es su perímetro?}',
    options: ['16 cm', '20 cm', '24 cm', '32 cm'],
    correctAnswer: 2,
    explanation: 'En un triángulo equilátero, todos los lados son iguales:',
    explanationLatex: 'P = 3 \\times l = 3 \\times 8 = 24 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-perimetro', 'numeros-operaciones-basicas'],
    visualData: {
      type: 'geometry',
      data: [
        {
          type: 'triangle',
          points: [
            { x: 200, y: 220, label: 'A' },
            { x: 340, y: 220, label: 'B' },
            { x: 270, y: 79, label: 'C' }
          ],
          labels: {
            sides: ['8 cm', '8 cm', '8 cm']
          },
          dimensions: {
            showSides: true
          }
        }
      ]
    }
  },
  {
    id: 'm1-34',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un cuadrado con lado de 6 cm es:',
    questionLatex: '\\text{El área de un cuadrado con lado de 6 cm es:}',
    options: ['12 cm²', '24 cm²', '36 cm²', '48 cm²'],
    correctAnswer: 2,
    explanation: 'El área de un cuadrado es lado al cuadrado:',
    explanationLatex: 'A = l^2 = 6^2 = 36 \\text{ cm}^2',
    difficulty: 'easy',
    skills: ['geometria-cuadrados', 'geometria-area', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-35',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si dos ángulos son suplementarios y uno mide 110°, ¿cuánto mide el otro?',
    questionLatex: '\\text{Si dos ángulos son suplementarios y uno mide } 110^\\circ\\text{, ¿cuánto mide el otro?}',
    options: ['70°', '80°', '90°', '180°'],
    correctAnswer: 0,
    explanation: 'Ángulos suplementarios suman 180°:',
    explanationLatex: '180^\\circ - 110^\\circ = 70^\\circ',
    difficulty: 'easy',
    skills: ['geometria-angulos', 'geometria-angulos-suplementarios', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-36',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El perímetro de un triángulo equilátero con lado de 5 cm es:',
    questionLatex: '\\text{El perímetro de un triángulo equilátero con lado de 5 cm es:}',
    options: ['10 cm', '15 cm', '20 cm', '25 cm'],
    correctAnswer: 1,
    explanation: 'Un triángulo equilátero tiene tres lados iguales:',
    explanationLatex: 'P = 3 \\times 5 = 15 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-perimetro', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-37',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un triángulo con base 8 cm y altura 6 cm es:',
    questionLatex: '\\text{El área de un triángulo con base 8 cm y altura 6 cm es:}',
    options: ['14 cm²', '24 cm²', '28 cm²', '48 cm²'],
    correctAnswer: 1,
    explanation: 'El área de un triángulo es base por altura dividido entre 2:',
    explanationLatex: 'A = \\frac{b \\times h}{2} = \\frac{8 \\times 6}{2} = \\frac{48}{2} = 24 \\text{ cm}^2',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-area-triangulo', 'geometria-area', 'numeros-fracciones', 'numeros-operaciones-basicas']
  }
];
