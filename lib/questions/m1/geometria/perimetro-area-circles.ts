import { Question } from '../../../types';

/**
 * M1 Geometría: Perímetro y Área - Círculos y Circunferencia
 * Questions covering circles, circumference, and circular sectors
 */
export const m1GeometriaPerimetroAreaCirclesQuestions: Question[] = [
  // BATCH 5: CIRCUNFERENCIA Y CÍRCULO (14 questions, excluding m1-202)

  // Perímetro y circunferencia (3)
  {
    id: 'm1-192',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'La circunferencia de un círculo con radio 3 cm es aproximadamente (usar π ≈ 3.14):',
    questionLatex: '\\text{Circunferencia con radio 3 cm (usar } \\pi \\approx 3.14):',
    options: ['9.42 cm', '18.84 cm', '28.26 cm', '37.68 cm'],
    correctAnswer: 1,
    explanation: 'La circunferencia es:',
    explanationLatex: 'C = 2\\pi r = 2 \\times 3.14 \\times 3 = 18.84 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-circunferencia', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-193',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si el diámetro de un círculo es 10 cm, ¿cuál es su circunferencia? (usar π ≈ 3.14)',
    questionLatex: '\\text{Diámetro 10 cm. Circunferencia? (usar } \\pi \\approx 3.14)',
    options: ['15.7 cm', '31.4 cm', '62.8 cm', '78.5 cm'],
    correctAnswer: 1,
    explanation: 'La circunferencia usando diámetro:',
    explanationLatex: 'C = \\pi d = 3.14 \\times 10 = 31.4 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-circunferencia', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-194',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'La circunferencia de un círculo es 62.8 cm. ¿Cuál es su radio? (usar π ≈ 3.14)',
    questionLatex: '\\text{Circunferencia 62.8 cm. Radio? (usar } \\pi \\approx 3.14)',
    options: ['5 cm', '10 cm', '15 cm', '20 cm'],
    correctAnswer: 1,
    explanation: 'Despejamos el radio:',
    explanationLatex: 'C = 2\\pi r \\rightarrow 62.8 = 2(3.14)r \\rightarrow r = \\frac{62.8}{6.28} = 10 \\text{ cm}',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-circunferencia', 'algebra-ecuaciones-lineales', 'numeros-decimales', 'numeros-operaciones-basicas']
  },

  // Área del círculo (3)
  {
    id: 'm1-195',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un círculo con radio 4 cm es aproximadamente (usar π ≈ 3.14):',
    questionLatex: '\\text{Área con radio 4 cm (usar } \\pi \\approx 3.14):',
    options: ['12.56 cm²', '25.12 cm²', '50.24 cm²', '100.48 cm²'],
    correctAnswer: 2,
    explanation: 'Área del círculo:',
    explanationLatex: 'A = \\pi r^2 = 3.14 \\times 4^2 = 3.14 \\times 16 = 50.24 \\text{ cm}^2',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-area-circulo', 'geometria-area', 'numeros-potencias', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-196',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si el diámetro de un círculo es 12 cm, ¿cuál es su área? (usar π ≈ 3.14)',
    questionLatex: '\\text{Diámetro 12 cm. Área? (usar } \\pi \\approx 3.14)',
    options: ['37.68 cm²', '75.36 cm²', '113.04 cm²', '150.72 cm²'],
    correctAnswer: 2,
    explanation: 'Radio = 6 cm. Área:',
    explanationLatex: 'A = \\pi r^2 = 3.14 \\times 6^2 = 3.14 \\times 36 = 113.04 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-area-circulo', 'geometria-area', 'numeros-potencias', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-197',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un círculo es 78.5 cm². ¿Cuál es su radio? (usar π ≈ 3.14)',
    questionLatex: '\\text{Área 78.5 cm}^2\\text{. Radio? (usar } \\pi \\approx 3.14)',
    options: ['3 cm', '4 cm', '5 cm', '6 cm'],
    correctAnswer: 2,
    explanation: 'Despejamos el radio:',
    explanationLatex: '78.5 = 3.14 \\times r^2 \\rightarrow r^2 = 25 \\rightarrow r = 5 \\text{ cm}',
    difficulty: 'hard',
    skills: ['geometria-circulos', 'geometria-area-circulo', 'algebra-ecuaciones-cuadraticas', 'numeros-raices', 'numeros-potencias', 'numeros-decimales', 'numeros-operaciones-basicas']
  },

  // Sectores y arcos (3)
  {
    id: 'm1-198',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un sector circular tiene ángulo central de 90° en un círculo de radio 6 cm. ¿Cuál es la longitud del arco? (usar π ≈ 3.14)',
    questionLatex: '\\text{Sector: 90°, radio 6 cm. Longitud de arco? (usar } \\pi \\approx 3.14)',
    options: ['4.71 cm', '9.42 cm', '14.13 cm', '18.84 cm'],
    correctAnswer: 1,
    explanation: '90° es 1/4 de la circunferencia total:',
    explanationLatex: 'L_{\\text{arco}} = \\frac{90}{360} \\times 2\\pi r = \\frac{1}{4} \\times 2(3.14)(6) = 9.42 \\text{ cm}',
    difficulty: 'hard',
    skills: ['geometria-circulos', 'geometria-sectores', 'geometria-arcos', 'numeros-fracciones', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-199',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un semicírculo con radio 8 cm es aproximadamente (usar π ≈ 3.14):',
    questionLatex: '\\text{Área de semicírculo, radio 8 cm (usar } \\pi \\approx 3.14):',
    options: ['50.24 cm²', '100.48 cm²', '150.72 cm²', '200.96 cm²'],
    correctAnswer: 1,
    explanation: 'Área del semicírculo es la mitad del círculo completo:',
    explanationLatex: 'A = \\frac{\\pi r^2}{2} = \\frac{3.14 \\times 64}{2} = 100.48 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-sectores', 'geometria-area', 'numeros-fracciones', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-200',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un cuarto de círculo (sector de 90°) tiene radio 10 cm. ¿Cuál es su área? (usar π ≈ 3.14)',
    questionLatex: '\\text{Cuarto de círculo, radio 10 cm. Área? (usar } \\pi \\approx 3.14)',
    options: ['39.25 cm²', '78.5 cm²', '117.75 cm²', '157 cm²'],
    correctAnswer: 1,
    explanation: 'Área es 1/4 del círculo completo:',
    explanationLatex: 'A = \\frac{\\pi r^2}{4} = \\frac{3.14 \\times 100}{4} = 78.5 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-sectores', 'geometria-area', 'numeros-fracciones', 'numeros-decimales', 'numeros-operaciones-basicas']
  },

  // Relaciones círculo-cuadrado (2, excluding m1-202)
  {
    id: 'm1-201',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un círculo está inscrito en un cuadrado de lado 10 cm. ¿Cuál es el radio del círculo?',
    questionLatex: '\\text{Círculo inscrito en cuadrado de lado 10 cm. Radio?}',
    options: ['5 cm', '7.07 cm', '10 cm', '15 cm'],
    correctAnswer: 0,
    explanation: 'El diámetro del círculo inscrito es igual al lado del cuadrado:',
    explanationLatex: 'r = \\frac{10}{2} = 5 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-cuadrados', 'geometria-figuras-inscritas']
  },
  {
    id: 'm1-203',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si el radio de un círculo se triplica, ¿qué sucede con su área?',
    questionLatex: '\\text{Si triplicamos el radio, ¿qué pasa con el área?}',
    options: ['Se triplica', 'Se multiplica por 6', 'Se multiplica por 9', 'Se multiplica por 27'],
    correctAnswer: 2,
    explanation: 'El área es proporcional al cuadrado del radio:',
    explanationLatex: 'A_{\\text{nuevo}} = \\pi(3r)^2 = 9\\pi r^2 = 9A_{\\text{original}}',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-area-circulo', 'geometria-proporciones', 'numeros-potencias']
  },

  // Aplicaciones prácticas (3)
  {
    id: 'm1-204',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Una pista circular tiene un diámetro de 100 m. ¿Cuánto mide una vuelta completa? (usar π ≈ 3.14)',
    questionLatex: '\\text{Pista circular, diámetro 100 m. ¿Cuánto mide una vuelta? (usar } \\pi \\approx 3.14)',
    options: ['157 m', '314 m', '628 m', '785 m'],
    correctAnswer: 1,
    explanation: 'Una vuelta completa es la circunferencia:',
    explanationLatex: 'C = \\pi d = 3.14 \\times 100 = 314 \\text{ m}',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-circunferencia', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-205',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Una rueda tiene radio de 30 cm. ¿Cuántas vueltas da para recorrer 188.4 m? (usar π ≈ 3.14)',
    questionLatex: '\\text{Rueda radio 30 cm. ¿Vueltas para recorrer 188.4 m? (usar } \\pi \\approx 3.14)',
    options: ['50', '75', '100', '150'],
    correctAnswer: 2,
    explanation: 'Circunferencia: 2πr = 188.4 cm = 1.884 m. Vueltas:',
    explanationLatex: '\\frac{188.4}{1.884} = 100 \\text{ vueltas}',
    difficulty: 'hard',
    skills: ['geometria-circulos', 'geometria-circunferencia', 'geometria-aplicaciones', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-206',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un jardín circular tiene área de 314 m². ¿Cuál es su radio aproximadamente? (usar π ≈ 3.14)',
    questionLatex: '\\text{Jardín circular, área 314 m}^2\\text{. Radio aprox.? (usar } \\pi \\approx 3.14)',
    options: ['5 m', '10 m', '15 m', '20 m'],
    correctAnswer: 1,
    explanation: 'Despejamos el radio:',
    explanationLatex: '314 = 3.14 \\times r^2 \\rightarrow r^2 = 100 \\rightarrow r = 10 \\text{ m}',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-area-circulo', 'algebra-ecuaciones-cuadraticas', 'numeros-raices', 'numeros-decimales', 'numeros-operaciones-basicas']
  }
];
