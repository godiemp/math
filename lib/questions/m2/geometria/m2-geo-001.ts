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
  {
    id: 'm2-geo-trans-5',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si se aplica una homotecia de razón 2 centrada en el origen al punto D(3, 4), ¿cuáles son las nuevas coordenadas?',
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
    question: 'Una homotecia de razón $k = \\frac{1}{3}$ centrada en el origen transforma el punto $A(9, 6)$ en:',
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
    question: 'Si una figura tiene área 12 cm² y se aplica una homotecia de razón 3, ¿cuál es el área de la figura transformada?',
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
    question: 'Un triángulo con perímetro 18 cm se transforma mediante homotecia de razón $k = 2$. ¿Cuál es el perímetro del triángulo transformado?',
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
    question: 'Una homotecia de razón negativa $k = -2$ centrada en el origen transforma el punto $P(1, 3)$ en:',
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
    question: 'Si un cubo tiene volumen 8 cm³ y se aplica una homotecia de razón 3, ¿cuál es el volumen del cubo transformado?',
    questionLatex: '\\text{Volumen 8 cm}^3\\text{, homotecia } k=3\\text{. ¿Nuevo volumen?}',
    options: ['$24$ cm³', '$72$ cm³', '$216$ cm³', '$512$ cm³'],
    optionsLatex: ['24\\text{ cm}^3', '72\\text{ cm}^3', '216\\text{ cm}^3', '512\\text{ cm}^3'],
    correctAnswer: 2,
    explanation: 'El volumen se multiplica por k³. Nuevo volumen = 8 × 3³ = 8 × 27 = 216 cm³',
    explanationLatex: 'V\' = V \\times k^3 = 8 \\times 3^3 = 8 \\times 27 = 216\\text{ cm}^3',
    difficulty: 'hard',
    skills: ['geometria-homotecia', 'geometria-homotecia-aplicaciones', 'geometria-volumen', 'numeros-potencias', 'numeros-operaciones-basicas']
  }
];
