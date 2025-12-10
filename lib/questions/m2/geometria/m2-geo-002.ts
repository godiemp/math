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
    difficultyScore: 0.38,
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
    difficultyScore: 0.52,
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
    difficulty: 'easy',
    difficultyScore: 0.28,
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
    difficulty: 'easy',
    difficultyScore: 0.22,
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
    difficulty: 'medium',
    difficultyScore: 0.48,
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
    difficultyScore: 0.18,
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
    difficultyScore: 0.32,
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
    difficultyScore: 0.18,
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
    difficultyScore: 0.35,
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
    difficultyScore: 0.15,
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
    difficulty: 'easy',
    difficultyScore: 0.22,
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
    difficulty: 'medium',
    difficultyScore: 0.42,
    skills: ['trigonometria-calculo', 'trigonometria-razones-basicas', 'geometria-pitagoras', 'numeros-fracciones']
  },
  // Ley de Senos / Law of Sines
  {
    id: 'm2-geo-leysenos-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\frac{a}{\\sin(A)} = \\frac{b}{\\sin(B)} = \\frac{c}{\\sin(C)}',
    questionLatex: '\\text{En un triángulo, } a = 8\\text{ cm, } A = 30°\\text{ y } B = 45°\\text{. Usando la ley de senos, ¿cuánto mide el lado } b\\text{? (Usa } \\sin(30°) = 0{,}5, \\sin(45°) \\approx 0{,}707)',
    options: ['8\\text{ cm}', '11{,}3\\text{ cm}', '16\\text{ cm}', '5{,}7\\text{ cm}'],
    correctAnswer: 1,
    explanation: '\\frac{8}{0{,}5} = \\frac{b}{0{,}707} \\rightarrow b = \\frac{8 \\times 0{,}707}{0{,}5} = 11{,}3\\text{ cm}',
    difficulty: 'medium',
    difficultyScore: 0.48,
    skills: ['trigonometria-ley-senos', 'geometria-triangulos', 'algebra-despeje', 'numeros-decimales']
  },
  {
    id: 'm2-geo-leysenos-2',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\frac{a}{\\sin(A)} = \\frac{b}{\\sin(B)}',
    questionLatex: '\\text{En un triángulo, el lado } a = 10\\text{ cm está opuesto al ángulo } A = 90°\\text{, y el lado } b \\text{ está opuesto al ángulo } B = 30°\\text{. ¿Cuánto mide } b\\text{?}',
    options: ['5\\text{ cm}', '10\\text{ cm}', '8{,}66\\text{ cm}', '20\\text{ cm}'],
    correctAnswer: 0,
    explanation: '\\frac{10}{\\sin(90°)} = \\frac{b}{\\sin(30°)} \\rightarrow \\frac{10}{1} = \\frac{b}{0{,}5} \\rightarrow b = 5\\text{ cm}',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['trigonometria-ley-senos', 'geometria-triangulos', 'trigonometria-angulos-notables', 'algebra-despeje']
  },
  // Ley de Cosenos / Law of Cosines
  {
    id: 'm2-geo-leycosenos-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'c^2 = a^2 + b^2 - 2ab\\cos(C)',
    questionLatex: '\\text{En un triángulo con lados } a = 5\\text{ cm, } b = 7\\text{ cm y ángulo } C = 60°\\text{ entre ellos, ¿cuánto mide el lado } c\\text{? (Usa } \\cos(60°) = 0{,}5)',
    options: ['\\sqrt{39}\\text{ cm}', '6\\text{ cm}', '8\\text{ cm}', '\\sqrt{74}\\text{ cm}'],
    correctAnswer: 0,
    explanation: 'c^2 = 5^2 + 7^2 - 2(5)(7)(0{,}5) = 25 + 49 - 35 = 39 \\rightarrow c = \\sqrt{39}\\text{ cm}',
    difficulty: 'medium',
    difficultyScore: 0.48,
    skills: ['trigonometria-ley-cosenos', 'geometria-triangulos', 'numeros-potencias', 'numeros-raices']
  },
  {
    id: 'm2-geo-leycosenos-2',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\cos(C) = \\frac{a^2 + b^2 - c^2}{2ab}',
    questionLatex: '\\text{En un triángulo con lados 5, 7 y 8 cm, ¿cuál es el coseno del ángulo mayor (opuesto al lado de 8 cm)?}',
    options: ['\\frac{1}{7}', '\\frac{2}{7}', '\\frac{1}{2}', '\\frac{5}{7}'],
    correctAnswer: 0,
    explanation: '\\cos(C) = \\frac{5^2 + 7^2 - 8^2}{2 \\times 5 \\times 7} = \\frac{25 + 49 - 64}{70} = \\frac{10}{70} = \\frac{1}{7}',
    difficulty: 'hard',
    difficultyScore: 0.52,
    skills: ['trigonometria-ley-cosenos', 'geometria-triangulos', 'numeros-fracciones', 'numeros-potencias']
  },
  {
    id: 'm2-geo-leycosenos-3',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'R^2 = a^2 + b^2 + 2ab\\cos(\\theta)',
    questionLatex: '\\text{Dos fuerzas de 6 N y 8 N actúan con un ángulo de 60° entre ellas. ¿Cuál es la magnitud de la fuerza resultante? (Usa } \\cos(60°) = 0{,}5)',
    options: ['10\\text{ N}', '2\\sqrt{37}\\text{ N}', '14\\text{ N}', '\\sqrt{76}\\text{ N}'],
    correctAnswer: 1,
    explanation: 'R^2 = a^2 + b^2 + 2ab\\cos(\\theta) = 6^2 + 8^2 + 2(6)(8)(0{,}5) = 36 + 64 + 48 = 148 \\rightarrow R = \\sqrt{148} = 2\\sqrt{37}\\text{ N}',
    difficulty: 'hard',
    difficultyScore: 0.58,
    skills: ['trigonometria-ley-cosenos', 'geometria-vectores', 'numeros-potencias', 'numeros-raices']
  }
];
