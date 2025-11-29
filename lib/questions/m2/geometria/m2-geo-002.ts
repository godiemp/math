import { Question } from '../../../types';

/**
 * M2-GEO-002: Seno, coseno y tangente en triángulos rectángulos
 *
 * Subsections:
 * A. Razones trigonométricas básicas
 *    Habilidades: trigonometria-razones-basicas
 * B. Cálculo de seno, coseno y tangente
 *    Habilidades: trigonometria-calculo
 * C. Ángulos notables (30°, 45°, 60°)
 *    Habilidades: trigonometria-angulos-notables
 * D. Resolución de triángulos rectángulos
 *    Habilidades: trigonometria-resolucion-triangulos
 */

export const m2Geo002Questions: Question[] = [
  {
    id: 'm2-geo-visual-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{En el siguiente triángulo rectángulo, si un cateto mide 5 cm y la hipotenusa mide 13 cm, ¿cuánto mide el otro cateto?}',
    options: ['8 cm', '10 cm', '12 cm', '15 cm'],
    correctAnswer: 2,
    explanation: 'c^2 = a^2 + b^2 \\quad \\Rightarrow \\quad 13^2 = 5^2 + b^2 \\quad \\Rightarrow \\quad 169 = 25 + b^2 \\quad \\Rightarrow \\quad b^2 = 144 \\quad \\Rightarrow \\quad b = 12 \\text{ cm}',
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
    questionLatex: '\\text{En el siguiente triángulo isósceles, dos lados miden 10 cm cada uno y el ángulo entre ellos es } 60^\\circ\\text{. ¿Cuál es aproximadamente la longitud de la base? (usar } \\cos(60^\\circ) = 0.5)',
    options: ['5 cm', '8.66 cm', '10 cm', '12 cm'],
    correctAnswer: 2,
    explanation: 'c^2 = a^2 + b^2 - 2ab\\cos(C) = 10^2 + 10^2 - 2(10)(10)(0.5) = 100 + 100 - 100 = 100 \\quad \\Rightarrow \\quad c = 10 \\text{ cm}',
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
    id: 'm2-geo-trig-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\sin(\\theta) = \\frac{\\text{opuesto}}{\\text{hipotenusa}}',
    questionLatex: '\\text{Un carpintero está construyendo una rampa triangular. El triángulo rectángulo tiene un cateto de 3 cm y una hipotenusa de 5 cm. Para calcular el ángulo de inclinación, necesita determinar el seno del ángulo opuesto al cateto de 3 cm. ¿Cuál es el valor del seno de ese ángulo?}',
    options: ['\\frac{3}{5}', '\\frac{4}{5}', '\\frac{3}{4}', '\\frac{5}{3}'],
    correctAnswer: 0,
    explanation: '\\sin(\\theta) = \\frac{\\text{cateto opuesto}}{\\text{hipotenusa}} = \\frac{3}{5}',
    difficulty: 'medium',
    skills: ['geometria-trigonometria', 'trigonometria-razones-basicas', 'trigonometria-calculo', 'numeros-fracciones']
  },
  {
    id: 'm2-geo-trig-2',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si } \\sin(30^\\circ) = \\frac{1}{2}, \\text{ ¿cuál es } \\cos(60^\\circ)?',
    options: ['\\frac{1}{2}', '\\frac{\\sqrt{3}}{2}', '1', '\\frac{\\sqrt{2}}{2}'],
    correctAnswer: 0,
    explanation: '\\sin(30^\\circ) = \\cos(60^\\circ) = \\frac{1}{2}',
    difficulty: 'medium',
    skills: ['geometria-trigonometria', 'trigonometria-angulos-notables', 'trigonometria-razones-basicas', 'numeros-fracciones']
  },
  {
    id: 'm2-geo-trig-3',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\tan(\\alpha) = \\frac{\\text{opuesto}}{\\text{adyacente}}',
    questionLatex: '\\text{Un topógrafo mide un terreno triangular y determina que } \\tan(\\alpha) = \\frac{4}{3} \\text{ para uno de los ángulos. Si el cateto opuesto a ese ángulo mide 8 cm, ¿cuánto mide la hipotenusa del triángulo?}',
    options: ['6\\text{ cm}', '10\\text{ cm}', '12\\text{ cm}', '14\\text{ cm}'],
    correctAnswer: 1,
    explanation: '\\tan(\\alpha) = \\frac{8}{b} = \\frac{4}{3} \\rightarrow b = 6. \\quad h = \\sqrt{8^2 + 6^2} = \\sqrt{100} = 10\\text{ cm}',
    difficulty: 'hard',
    skills: ['geometria-trigonometria', 'trigonometria-resolucion-triangulos', 'trigonometria-razones-basicas', 'geometria-pitagoras', 'numeros-raices', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-trig-4',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\tan(45^\\circ)',
    questionLatex: '\\text{Un estudiante de trigonometría está completando una tabla de valores de funciones para ángulos notables. Necesita determinar el valor de } \\tan(45^\\circ)\\text{. ¿Cuál es este valor?}',
    options: ['0', '\\frac{1}{2}', '1', '\\sqrt{2}'],
    correctAnswer: 2,
    explanation: '\\tan(45^\\circ) = \\frac{\\text{cateto opuesto}}{\\text{cateto adyacente}} = \\frac{a}{a} = 1',
    difficulty: 'easy',
    skills: ['geometria-trigonometria', 'trigonometria-angulos-notables', 'trigonometria-razones-basicas']
  },
  {
    id: 'm2-geo-trig-5',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\cos(\\beta) = \\frac{\\text{adyacente}}{\\text{hipotenusa}}',
    questionLatex: '\\text{Un ingeniero está calculando las dimensiones de una viga triangular. Sabe que } \\cos(\\beta) = \\frac{5}{13} \\text{ y que la hipotenusa mide 13 cm. ¿Cuánto mide el cateto adyacente al ángulo } \\beta\\text{?}',
    options: ['5\\text{ cm}', '8\\text{ cm}', '10\\text{ cm}', '12\\text{ cm}'],
    correctAnswer: 0,
    explanation: '\\cos(\\beta) = \\frac{\\text{cateto adyacente}}{13} = \\frac{5}{13} \\rightarrow \\text{cateto adyacente} = 5\\text{ cm}',
    difficulty: 'medium',
    skills: ['geometria-trigonometria', 'trigonometria-resolucion-triangulos', 'trigonometria-razones-basicas', 'algebra-despeje', 'numeros-fracciones']
  },
  // Additional questions
  {
    id: 'm2-geo-trig-6',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\sin(60^\\circ)',
    questionLatex: '\\text{Un estudiante está resolviendo un problema de física que requiere conocer el valor exacto de } \\sin(60^\\circ)\\text{. ¿Cuál es este valor?}',
    options: ['\\frac{1}{2}', '\\frac{\\sqrt{2}}{2}', '\\frac{\\sqrt{3}}{2}', '1'],
    correctAnswer: 2,
    explanation: '\\sin(60^\\circ) = \\frac{\\sqrt{3}}{2}',
    difficulty: 'easy',
    skills: ['trigonometria-angulos-notables', 'trigonometria-razones-basicas', 'numeros-raices']
  },
  {
    id: 'm2-geo-trig-7',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{En un triángulo rectángulo, si } \\sin(\\alpha) = 0.6 \\text{ y el cateto opuesto mide 12 cm, ¿cuánto mide la hipotenusa?}',
    options: ['7.2\\text{ cm}', '10\\text{ cm}', '20\\text{ cm}', '72\\text{ cm}'],
    correctAnswer: 2,
    explanation: '\\sin(\\alpha) = \\frac{12}{h} = 0.6 \\rightarrow h = \\frac{12}{0.6} = 20\\text{ cm}',
    difficulty: 'medium',
    skills: ['trigonometria-calculo', 'trigonometria-resolucion-triangulos', 'algebra-despeje', 'numeros-decimales']
  },
  {
    id: 'm2-geo-trig-8',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\sin(\\theta)',
    questionLatex: '\\text{En una clase de trigonometría, el profesor pregunta a los estudiantes cómo se define la función seno en un triángulo rectángulo. ¿Cuál es la definición correcta?}',
    options: ['\\frac{\\text{adyacente}}{\\text{hipotenusa}}', '\\frac{\\text{opuesto}}{\\text{hipotenusa}}', '\\frac{\\text{opuesto}}{\\text{adyacente}}', '\\frac{\\text{hipotenusa}}{\\text{opuesto}}'],
    correctAnswer: 1,
    explanation: '\\sin(\\theta) = \\frac{\\text{cateto opuesto}}{\\text{hipotenusa}}',
    difficulty: 'easy',
    skills: ['trigonometria-razones-basicas', 'geometria-trigonometria', 'trigonometria-definiciones']
  },
  {
    id: 'm2-geo-trig-9',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si } \\cos(30^\\circ) = \\frac{\\sqrt{3}}{2}, \\text{ ¿cuál es } \\sin(60^\\circ)?',
    options: ['\\frac{1}{2}', '\\frac{\\sqrt{2}}{2}', '\\frac{\\sqrt{3}}{2}', '1'],
    correctAnswer: 2,
    explanation: '\\cos(30^\\circ) = \\sin(60^\\circ) = \\frac{\\sqrt{3}}{2}',
    difficulty: 'medium',
    skills: ['trigonometria-angulos-notables', 'trigonometria-razones-basicas', 'numeros-raices']
  },
  {
    id: 'm2-geo-trig-10',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{En un triángulo rectángulo con catetos 6 cm y 8 cm, ¿cuál es el coseno del ángulo menor?}',
    options: ['\\frac{3}{5}', '\\frac{4}{5}', '\\frac{3}{4}', '\\frac{4}{3}'],
    correctAnswer: 1,
    explanation: 'h = \\sqrt{6^2 + 8^2} = 10. \\quad \\cos(\\alpha) = \\frac{8}{10} = \\frac{4}{5}',
    difficulty: 'hard',
    skills: ['trigonometria-calculo', 'trigonometria-razones-basicas', 'geometria-pitagoras', 'numeros-fracciones']
  }
];
