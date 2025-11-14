import { Question } from '../../../types';

/**
 * M2-NUM-002: Problemas que involucren números reales en diversos contextos
 *
 * Subsections:
 * A. Problemas con raíces y radicales
 *    Habilidades: numeros-reales-problemas-raices
 * B. Problemas de medición con irracionales
 *    Habilidades: numeros-reales-problemas-medicion
 * C. Problemas de aproximación y error
 *    Habilidades: numeros-reales-problemas-aproximacion
 * D. Aplicaciones en ciencias y tecnología
 *    Habilidades: numeros-reales-problemas-ciencias
 */

export const m2Num002Questions: Question[] = [
  {
    id: 'm2-num-prop-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'Si 5 obreros construyen un muro en 12 días, ¿cuántos días tardarán 8 obreros en construir el mismo muro?',
    questionLatex: '\\text{Si 5 obreros construyen un muro en 12 días, ¿cuántos días tardarán 8 obreros?}',
    options: ['7.5 días', '8 días', '9.6 días', '19.2 días'],
    correctAnswer: 0,
    explanation: 'Es proporcionalidad inversa. Más obreros, menos días:',
    explanationLatex: '5 \\times 12 = 8 \\times x \\quad \\Rightarrow \\quad x = \\frac{60}{8} = 7.5 \\text{ días}',
    difficulty: 'medium',
    skills: ['numeros-proporcionalidad', 'numeros-proporcionalidad-inversa', 'numeros-regla-tres', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-prop-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'Una llave llena un tanque en 6 horas. ¿En cuánto tiempo llenarán el tanque 3 llaves iguales trabajando simultáneamente?',
    questionLatex: '\\text{Una llave llena un tanque en 6 horas. ¿Cuánto tardan 3 llaves simultáneamente?}',
    options: ['2 horas', '3 horas', '4 horas', '18 horas'],
    correctAnswer: 0,
    explanation: 'Es proporcionalidad inversa. Más llaves, menos tiempo:',
    explanationLatex: '1 \\times 6 = 3 \\times x \\quad \\Rightarrow \\quad x = \\frac{6}{3} = 2 \\text{ horas}',
    difficulty: 'hard',
    skills: ['numeros-proporcionalidad', 'numeros-proporcionalidad-inversa', 'numeros-regla-tres', 'numeros-operaciones-basicas']
  }
];
