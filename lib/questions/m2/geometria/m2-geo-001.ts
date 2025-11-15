import { Question } from '../../../types';

/**
 * M2-GEO-001: Problemas con homotecia en diversos contextos
 *
 * Subsections:
 * A. Concepto de homotecia
 *    Habilidades: geometria-homotecia-concepto
 * B. Razón de homotecia
 *    Habilidades: geometria-homotecia-razon
 * C. Homotecia y semejanza
 *    Habilidades: geometria-homotecia-semejanza
 * D. Aplicaciones de homotecia
 *    Habilidades: geometria-homotecia-aplicaciones
 */

export const m2Geo001Questions: Question[] = [
  // Subsection A: Concepto de homotecia
  {
    id: 'm2-geo-hom-conc-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Una homotecia es una transformación que:}',
    options: ['Rota una figura alrededor de un punto', 'Cambia el tamaño de una figura manteniendo su forma', 'Refleja una figura respecto a una recta', 'Traslada una figura sin cambiar su tamaño'],
    optionsLatex: ['\\text{Rota figura}', '\\text{Cambia tamaño, mantiene forma}', '\\text{Refleja figura}', '\\text{Traslada sin cambiar tamaño}'],
    correctAnswer: 1,
    explanation: 'La homotecia amplía o reduce una figura manteniendo su forma (semejanza), con un centro y una razón de homotecia',
    explanationLatex: '\\text{Homotecia: cambio de tamaño con factor } k, \\text{ manteniendo forma}',
    difficulty: 'easy',
    skills: ['geometria-homotecia-concepto', 'geometria-transformaciones', 'geometria-semejanza']
  },
  {
    id: 'm2-geo-trans-5',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Homotecia de razón 2 en el origen a } D(3, 4)\\text{, ¿nuevas coordenadas?}',
    options: ['$(6, 8)$', '$(1.5, 2)$', '$(5, 6)$', '$(3, 4)$'],
    optionsLatex: ['(6, 8)', '(1.5, 2)', '(5, 6)', '(3, 4)'],
    correctAnswer: 0,
    explanation: 'Homotecia: multiplicamos cada coordenada por la razón',
    explanationLatex: 'D(3, 4) \\xrightarrow{k=2} D\'(2 \\times 3, 2 \\times 4) = (6, 8)',
    difficulty: 'hard',
    skills: ['geometria-transformaciones', 'geometria-homotecia', 'geometria-plano-cartesiano', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-hom-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Homotecia } k = \\frac{1}{3} \\text{ en origen a } A(9, 6):',
    options: ['$(3, 2)$', '$(6, 3)$', '$(12, 9)$', '$(27, 18)$'],
    optionsLatex: ['(3, 2)', '(6, 3)', '(12, 9)', '(27, 18)'],
    correctAnswer: 0,
    explanation: 'Multiplicamos cada coordenada por k = 1/3: A\'(9×1/3, 6×1/3) = (3, 2)',
    explanationLatex: 'A(9, 6) \\xrightarrow{k=1/3} A\'\\left(\\frac{9}{3}, \\frac{6}{3}\\right) = (3, 2)',
    difficulty: 'medium',
    skills: ['geometria-homotecia', 'geometria-homotecia-razon', 'geometria-plano-cartesiano', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-hom-2',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Área 12 cm}^2\\text{, homotecia } k=3\\text{. ¿Nueva área?}',
    options: ['$36$ cm²', '$108$ cm²', '$24$ cm²', '$72$ cm²'],
    optionsLatex: ['36\\text{ cm}^2', '108\\text{ cm}^2', '24\\text{ cm}^2', '72\\text{ cm}^2'],
    correctAnswer: 1,
    explanation: 'El área se multiplica por k². Nueva área = 12 × 3² = 12 × 9 = 108 cm²',
    explanationLatex: 'A\' = A \\times k^2 = 12 \\times 3^2 = 12 \\times 9 = 108\\text{ cm}^2',
    difficulty: 'hard',
    skills: ['geometria-homotecia', 'geometria-homotecia-semejanza', 'geometria-area', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-hom-3',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Perímetro 18 cm, homotecia } k=2\\text{. ¿Nuevo perímetro?}',
    options: ['$18$ cm', '$36$ cm', '$54$ cm', '$72$ cm'],
    optionsLatex: ['18\\text{ cm}', '36\\text{ cm}', '54\\text{ cm}', '72\\text{ cm}'],
    correctAnswer: 1,
    explanation: 'El perímetro se multiplica por k. Nuevo perímetro = 18 × 2 = 36 cm',
    explanationLatex: 'P\' = P \\times k = 18 \\times 2 = 36\\text{ cm}',
    difficulty: 'medium',
    skills: ['geometria-homotecia', 'geometria-homotecia-semejanza', 'geometria-perimetro', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-hom-4',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Homotecia } k = -2 \\text{ en origen a } P(1, 3):',
    options: ['$(2, 6)$', '$(-2, -6)$', '$(-1, -3)$', '$(2, -6)$'],
    optionsLatex: ['(2, 6)', '(-2, -6)', '(-1, -3)', '(2, -6)'],
    correctAnswer: 1,
    explanation: 'Con razón negativa, multiplicamos y cambiamos el signo: P\'(-2×1, -2×3) = (-2, -6)',
    explanationLatex: 'P(1, 3) \\xrightarrow{k=-2} P\'(-2 \\times 1, -2 \\times 3) = (-2, -6)',
    difficulty: 'hard',
    skills: ['geometria-homotecia', 'geometria-homotecia-razon', 'geometria-plano-cartesiano', 'numeros-enteros', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-hom-5',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Volumen 8 cm}^3\\text{, homotecia } k=3\\text{. ¿Nuevo volumen?}',
    options: ['$24$ cm³', '$72$ cm³', '$216$ cm³', '$512$ cm³'],
    optionsLatex: ['24\\text{ cm}^3', '72\\text{ cm}^3', '216\\text{ cm}^3', '512\\text{ cm}^3'],
    correctAnswer: 2,
    explanation: 'El volumen se multiplica por k³. Nuevo volumen = 8 × 3³ = 8 × 27 = 216 cm³',
    explanationLatex: 'V\' = V \\times k^3 = 8 \\times 3^3 = 8 \\times 27 = 216\\text{ cm}^3',
    difficulty: 'hard',
    skills: ['geometria-homotecia', 'geometria-homotecia-aplicaciones', 'geometria-volumen', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  // Additional homotecia questions
  {
    id: 'm2-geo-hom-6',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Si una figura se amplía con razón } k = 4, \\text{ ¿cuántas veces aumenta su área?}',
    options: ['$4$ veces', '$8$ veces', '$16$ veces', '$64$ veces'],
    optionsLatex: ['4', '8', '16', '64'],
    correctAnswer: 2,
    explanation: 'El área se multiplica por k². Con k = 4: área nueva = área original × 4² = 16 veces',
    explanationLatex: 'A\' = A \\times k^2 = A \\times 4^2 = 16A',
    difficulty: 'medium',
    skills: ['geometria-homotecia-semejanza', 'geometria-homotecia-razon', 'geometria-area', 'numeros-potencias']
  },
  {
    id: 'm2-geo-hom-7',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{¿Qué razón de homotecia reduce una figura a la mitad de su tamaño original?}',
    options: ['$k = 2$', '$k = \\frac{1}{2}$', '$k = -2$', '$k = -\\frac{1}{2}$'],
    optionsLatex: ['k = 2', 'k = \\frac{1}{2}', 'k = -2', 'k = -\\frac{1}{2}'],
    correctAnswer: 1,
    explanation: 'Para reducir a la mitad, cada dimensión debe multiplicarse por 1/2, por lo tanto k = 1/2',
    explanationLatex: 'k = \\frac{1}{2} \\Rightarrow \\text{figura reducida a la mitad}',
    difficulty: 'easy',
    skills: ['geometria-homotecia-razon', 'geometria-homotecia-concepto', 'numeros-fracciones']
  },
  {
    id: 'm2-geo-hom-8',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Dos triángulos semejantes tienen razón de semejanza 3:1. Si el área del menor es 5 cm², ¿cuál es el área del mayor?}',
    options: ['$15$ cm²', '$25$ cm²', '$45$ cm²', '$125$ cm²'],
    optionsLatex: ['15\\text{ cm}^2', '25\\text{ cm}^2', '45\\text{ cm}^2', '125\\text{ cm}^2'],
    correctAnswer: 2,
    explanation: 'Razón de áreas = k². Si k = 3, área mayor = 5 × 3² = 5 × 9 = 45 cm²',
    explanationLatex: 'A_{\\text{mayor}} = A_{\\text{menor}} \\times k^2 = 5 \\times 9 = 45\\text{ cm}^2',
    difficulty: 'hard',
    skills: ['geometria-homotecia-semejanza', 'geometria-semejanza', 'geometria-area', 'numeros-potencias']
  },
  {
    id: 'm2-geo-hom-9',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Centro de homotecia en } O(0,0), k = -1, \\text{ punto } P(3, -2)\\text{. ¿Imagen de P?}',
    options: ['$(3, -2)$', '$(-3, 2)$', '$(3, 2)$', '$(-3, -2)$'],
    optionsLatex: ['(3, -2)', '(-3, 2)', '(3, 2)', '(-3, -2)'],
    correctAnswer: 1,
    explanation: 'Con k = -1, las coordenadas cambian de signo: P\'(-1×3, -1×(-2)) = (-3, 2)',
    explanationLatex: 'P\'(-1 \\times 3, -1 \\times (-2)) = (-3, 2)',
    difficulty: 'medium',
    skills: ['geometria-homotecia-razon', 'geometria-homotecia', 'geometria-plano-cartesiano', 'numeros-enteros']
  },
  {
    id: 'm2-geo-hom-10',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{En arquitectura, un plano está a escala 1:100. Si un cuarto mide 5 cm × 4 cm en el plano, ¿cuál es su área real?}',
    options: ['$20$ cm²', '$2$ m²', '$20$ m²', '$200$ m²'],
    optionsLatex: ['20\\text{ cm}^2', '2\\text{ m}^2', '20\\text{ m}^2', '200\\text{ m}^2'],
    correctAnswer: 2,
    explanation: 'Escala 1:100 significa k = 100. Dimensiones reales: 500 cm × 400 cm = 5 m × 4 m = 20 m²',
    explanationLatex: '5 \\times 100 = 500\\text{ cm} = 5\\text{ m}, \\quad 4 \\times 100 = 400\\text{ cm} = 4\\text{ m}. \\quad A = 5 \\times 4 = 20\\text{ m}^2',
    difficulty: 'hard',
    skills: ['geometria-homotecia-aplicaciones', 'geometria-semejanza', 'geometria-area', 'numeros-conversion-unidades']
  }
];
