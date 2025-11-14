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
  }
];
