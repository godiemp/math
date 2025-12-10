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
 * Total: 20 questions
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
    difficultyScore: 0.22,
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
    difficultyScore: 0.42,
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
    difficultyScore: 0.58,
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
    difficultyScore: 0.55,
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
    difficulty: 'hard',
    difficultyScore: 0.55,
    skills: ['geometria-volumen', 'geometria-volumen-cilindro', 'geometria-aplicaciones', 'numeros-fracciones', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  // ========================================
  // PRISMAS RECTOS - ÁREA SUPERFICIAL Y VOLUMEN
  // ========================================
  {
    id: 'm1-geo-003-001',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un prisma rectangular tiene dimensiones de 4 cm de largo, 3 cm de ancho y 5 cm de alto. ¿Cuál es su volumen?}',
    options: ['50 cm³', '60 cm³', '70 cm³', '80 cm³'],
    correctAnswer: 1,
    explanation: 'V = l \\times a \\times h = 4 \\times 3 \\times 5 = 60 \\text{ cm}^3',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['geometria-volumen', 'geometria-volumen-prisma', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-geo-003-002',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un prisma rectangular tiene dimensiones 6 cm × 4 cm × 3 cm. ¿Cuál es su área superficial total?}',
    options: ['72 cm²', '84 cm²', '108 cm²', '144 cm²'],
    correctAnswer: 2,
    explanation: 'A = 2(lw + lh + wh) = 2(6 \\times 4 + 6 \\times 3 + 4 \\times 3) = 2(24 + 18 + 12) = 2(54) = 108 \\text{ cm}^2',
    difficulty: 'medium',
    difficultyScore: 0.42,
    skills: ['geometria-area', 'geometria-area-prisma', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-geo-003-003',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Una caja tiene forma de prisma rectangular con volumen de 120 cm³. Si su base mide 5 cm × 4 cm, ¿cuál es su altura?}',
    options: ['4 cm', '5 cm', '6 cm', '8 cm'],
    correctAnswer: 2,
    explanation: 'V = A_{base} \\times h \\quad \\Rightarrow \\quad 120 = (5 \\times 4) \\times h \\quad \\Rightarrow \\quad h = \\frac{120}{20} = 6 \\text{ cm}',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['geometria-volumen', 'geometria-volumen-prisma', 'algebra-despeje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-geo-003-004',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un prisma triangular tiene una base triangular con base 6 cm y altura 4 cm. Si el prisma tiene 10 cm de largo, ¿cuál es su volumen?}',
    options: ['60 cm³', '100 cm³', '120 cm³', '240 cm³'],
    correctAnswer: 2,
    explanation: 'A_{triángulo} = \\frac{1}{2} \\times 6 \\times 4 = 12 \\text{ cm}^2, \\quad V = 12 \\times 10 = 120 \\text{ cm}^3',
    difficulty: 'medium',
    difficultyScore: 0.42,
    skills: ['geometria-volumen', 'geometria-volumen-prisma', 'geometria-area-triangulo', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-geo-003-005',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Una piscina rectangular tiene 8 m de largo, 4 m de ancho y 2 m de profundidad. ¿Cuántos litros de agua puede contener? (1 m³ = 1000 litros)}',
    options: ['32.000 litros', '48.000 litros', '64.000 litros', '80.000 litros'],
    correctAnswer: 2,
    explanation: 'V = 8 \\times 4 \\times 2 = 64 \\text{ m}^3 = 64.000 \\text{ litros}',
    difficulty: 'easy',
    difficultyScore: 0.32,
    skills: ['geometria-volumen', 'geometria-volumen-prisma', 'geometria-aplicaciones', 'numeros-operaciones-basicas']
  },
  // ========================================
  // CILINDROS - ÁREA SUPERFICIAL Y VOLUMEN
  // ========================================
  {
    id: 'm1-geo-003-006',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un cilindro tiene radio 4 cm y altura 10 cm. ¿Cuál es su volumen? (usar } \\pi \\approx 3.14)',
    options: ['401.92 cm³', '451.92 cm³', '502.4 cm³', '628 cm³'],
    correctAnswer: 2,
    explanation: 'V = \\pi r^2 h = 3.14 \\times 16 \\times 10 = 502.4 \\text{ cm}^3',
    difficulty: 'easy',
    difficultyScore: 0.35,
    skills: ['geometria-volumen', 'geometria-volumen-cilindro', 'numeros-potencias', 'numeros-decimales']
  },
  {
    id: 'm1-geo-003-007',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un cilindro tiene radio 5 cm y altura 8 cm. ¿Cuál es el área de su superficie lateral? (usar } \\pi \\approx 3.14)',
    options: ['200.96 cm²', '251.2 cm²', '314 cm²', '408.2 cm²'],
    correctAnswer: 1,
    explanation: 'A_{lateral} = 2\\pi rh = 2 \\times 3.14 \\times 5 \\times 8 = 251.2 \\text{ cm}^2',
    difficulty: 'medium',
    difficultyScore: 0.42,
    skills: ['geometria-area', 'geometria-area-cilindro', 'numeros-decimales']
  },
  {
    id: 'm1-geo-003-008',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un cilindro tiene radio 3 cm y altura 7 cm. ¿Cuál es su área superficial total? (usar } \\pi \\approx 3.14)',
    options: ['150.72 cm²', '175.84 cm²', '188.4 cm²', '207.24 cm²'],
    correctAnswer: 2,
    explanation: 'A_{total} = 2\\pi r^2 + 2\\pi rh = 2(3.14)(9) + 2(3.14)(3)(7) = 56.52 + 131.88 = 188.4 \\text{ cm}^2',
    difficulty: 'medium',
    difficultyScore: 0.52,
    skills: ['geometria-area', 'geometria-area-cilindro', 'numeros-potencias', 'numeros-decimales']
  },
  {
    id: 'm1-geo-003-009',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Una lata cilíndrica tiene volumen de 942 cm³ y radio 5 cm. ¿Cuál es su altura? (usar } \\pi \\approx 3.14)',
    options: ['10 cm', '12 cm', '15 cm', '18 cm'],
    correctAnswer: 1,
    explanation: 'V = \\pi r^2 h \\quad \\Rightarrow \\quad 942 = 3.14 \\times 25 \\times h \\quad \\Rightarrow \\quad h = \\frac{942}{78.5} = 12 \\text{ cm}',
    difficulty: 'medium',
    difficultyScore: 0.45,
    skills: ['geometria-volumen', 'geometria-volumen-cilindro', 'algebra-despeje', 'numeros-decimales']
  },
  {
    id: 'm1-geo-003-010',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Dos cilindros tienen el mismo volumen. El primero tiene radio 4 cm y altura 9 cm. Si el segundo tiene radio 6 cm, ¿cuál es su altura?}',
    options: ['3 cm', '4 cm', '5 cm', '6 cm'],
    correctAnswer: 1,
    explanation: 'V_1 = \\pi (4)^2 (9) = 144\\pi, \\quad V_2 = \\pi (6)^2 h = 36\\pi h \\quad \\Rightarrow \\quad h = \\frac{144\\pi}{36\\pi} = 4 \\text{ cm}',
    difficulty: 'hard',
    difficultyScore: 0.58,
    skills: ['geometria-volumen', 'geometria-volumen-cilindro', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  // ========================================
  // PROBLEMAS COMBINADOS Y APLICACIONES
  // ========================================
  {
    id: 'm1-geo-003-011',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un cubo tiene arista de 6 cm. ¿Cuál es la relación entre su área superficial y su volumen?}',
    options: ['1:1', '1:2', '1:3', '6:1'],
    correctAnswer: 0,
    explanation: 'A = 6(6)^2 = 216 \\text{ cm}^2, \\quad V = 6^3 = 216 \\text{ cm}^3, \\quad \\text{Relación} = 216:216 = 1:1',
    difficulty: 'medium',
    difficultyScore: 0.45,
    skills: ['geometria-area', 'geometria-volumen', 'geometria-volumen-cubo', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-geo-003-012',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si se duplica la arista de un cubo, ¿en qué factor aumenta su volumen?}',
    options: ['2 veces', '4 veces', '6 veces', '8 veces'],
    correctAnswer: 3,
    explanation: 'V_1 = a^3, \\quad V_2 = (2a)^3 = 8a^3 \\quad \\Rightarrow \\quad \\text{Aumenta 8 veces}',
    difficulty: 'medium',
    difficultyScore: 0.48,
    skills: ['geometria-volumen', 'geometria-volumen-cubo', 'numeros-potencias']
  },
  {
    id: 'm1-geo-003-013',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un acuario rectangular tiene capacidad para 60 litros. Si su base mide 50 cm × 30 cm, ¿cuál es su altura? (1 litro = 1000 cm³)}',
    options: ['30 cm', '35 cm', '40 cm', '45 cm'],
    correctAnswer: 2,
    explanation: 'V = 60{,}000 \\text{ cm}^3, \\quad h = \\frac{60{,}000}{50 \\times 30} = \\frac{60{,}000}{1{,}500} = 40 \\text{ cm}',
    difficulty: 'medium',
    difficultyScore: 0.42,
    skills: ['geometria-volumen', 'geometria-volumen-prisma', 'geometria-aplicaciones', 'algebra-despeje']
  },
  {
    id: 'm1-geo-003-014',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un tubo cilíndrico tiene radio exterior 5 cm, radio interior 4 cm y altura 10 cm. ¿Cuál es el volumen del material del tubo? (usar } \\pi \\approx 3.14)',
    options: ['251.2 cm³', '282.6 cm³', '314 cm³', '345.4 cm³'],
    correctAnswer: 1,
    explanation: 'V = \\pi h(R^2 - r^2) = 3.14 \\times 10 \\times (25 - 16) = 3.14 \\times 10 \\times 9 = 282.6 \\text{ cm}^3',
    difficulty: 'hard',
    difficultyScore: 0.58,
    skills: ['geometria-volumen', 'geometria-volumen-cilindro', 'numeros-potencias', 'numeros-decimales']
  },
  {
    id: 'm1-geo-003-015',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Una caja cúbica tiene volumen de 125 cm³. ¿Cuál es su área superficial total?}',
    options: ['100 cm²', '125 cm²', '150 cm²', '175 cm²'],
    correctAnswer: 2,
    explanation: 'a = \\sqrt[3]{125} = 5 \\text{ cm}, \\quad A = 6a^2 = 6(25) = 150 \\text{ cm}^2',
    difficulty: 'medium',
    difficultyScore: 0.45,
    skills: ['geometria-area', 'geometria-volumen', 'geometria-volumen-cubo', 'numeros-raices']
  }
];
