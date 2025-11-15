import { Question } from '../../../types';

/**
 * M1-GEO-003: Área y volumen de prismas rectos y cilindros
 * Chilean PAES Curriculum - Geometry Subsection 003
 *
 * This subsection covers:
 * - A: Área superficial de prismas rectos
 * - B: Volumen de prismas rectos
 * - C: Área superficial de cilindros
 * - D: Volumen de cilindros
 *
 * Total: 5 questions
 */

export const m1Geo003Questions: Question[] = [
  {
    id: 'm1-19',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{María trabaja en una empresa de embalaje y debe calcular cuánto espacio ocupará una caja cúbica en el almacén. La caja es perfectamente cuadrada en todas sus dimensiones, y cada arista mide 3 cm. El supervisor le pide que calcule el espacio total que ocupa la caja para optimizar el almacenamiento. Para completar el registro de inventario, necesita determinar el volumen de esta caja cúbica. ¿Cuál es el volumen en centímetros cúbicos?}',
    options: ['9 cm³', '18 cm³', '27 cm³', '36 cm³'],
    correctAnswer: 2,
    explanation: 'V = a^3 = 3^3 = 3 \\times 3 \\times 3 = 27 \\text{ cm}^3',
    difficulty: 'easy',
    skills: ['geometria-volumen', 'geometria-volumen-cubo', 'numeros-potencias', 'numeros-operaciones-basicas'],
    operacionBase: 'a^3'
  },
  // Questions migrated from M2 legacy files (volumen.ts)
  {
    id: 'm2-5',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{El volumen de un cilindro con radio 3 cm y altura 4 cm es (usar } \\pi \\approx 3.14):',
    options: ['37.68 cm³', '75.36 cm³', '113.04 cm³', '150.72 cm³'],
    correctAnswer: 2,
    explanation: 'V = \\pi r^2 h = 3.14 \\times 3^2 \\times 4 = 3.14 \\times 9 \\times 4 = 113.04 \\text{ cm}^3',
    difficulty: 'medium',
    skills: ['geometria-volumen', 'geometria-volumen-cilindro', 'numeros-potencias', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-vol-1',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{El volumen de una esfera con radio 6 cm es (usar } \\pi \\approx 3.14):',
    options: ['452.16 cm³', '678.24 cm³', '904.32 cm³', '1130.4 cm³'],
    correctAnswer: 2,
    explanation: 'V = \\frac{4}{3}\\pi r^3 = \\frac{4}{3} \\times 3.14 \\times 6^3 = \\frac{4}{3} \\times 3.14 \\times 216 \\approx 904.32 \\text{ cm}^3',
    difficulty: 'hard',
    skills: ['geometria-volumen', 'geometria-volumen-esfera', 'numeros-potencias', 'numeros-fracciones', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-vol-2',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un cono tiene radio de base 4 cm y altura 9 cm. Su volumen es (usar } \\pi \\approx 3.14):',
    options: ['113.04 cm³', '150.72 cm³', '226.08 cm³', '301.44 cm³'],
    correctAnswer: 1,
    explanation: 'V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3} \\times 3.14 \\times 4^2 \\times 9 \\approx 150.72 \\text{ cm}^3',
    difficulty: 'hard',
    skills: ['geometria-volumen', 'geometria-volumen-cono', 'numeros-potencias', 'numeros-fracciones', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-vol-3',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Tanque cilíndrico r=5m, h=12m, lleno 3/4. ¿Volumen de agua? (usar } \\pi \\approx 3.14)',
    options: ['235.5 m³', '471 m³', '706.5 m³', '942 m³'],
    correctAnswer: 2,
    explanation: 'V_{total} = 3.14 \\times 25 \\times 12 = 942 \\text{ m}^3, \\quad V_{agua} = \\frac{3}{4} \\times 942 = 706.5 \\text{ m}^3',
    difficulty: 'extreme',
    skills: ['geometria-volumen', 'geometria-volumen-cilindro', 'geometria-aplicaciones', 'numeros-fracciones', 'numeros-decimales', 'numeros-operaciones-basicas']
  }
];
