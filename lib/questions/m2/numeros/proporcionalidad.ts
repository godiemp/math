import { Question } from '../../../types';

export const m2NumerosProporcionalidadQuestions: Question[] = [
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
    id: 'm2-num-prop-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'En un mapa a escala 1:50.000, dos ciudades están separadas por 8 cm. ¿Cuál es la distancia real entre ellas?',
    questionLatex: '\\text{En un mapa a escala 1:50.000, dos ciudades están separadas por 8 cm. ¿Distancia real?}',
    options: ['4 km', '40 km', '400 km', '4000 km'],
    correctAnswer: 0,
    explanation: 'Distancia real = 8 cm × 50.000 = 400.000 cm = 4 km',
    explanationLatex: '8 \\text{ cm} \\times 50{,}000 = 400{,}000 \\text{ cm} = 4000 \\text{ m} = 4 \\text{ km}',
    difficulty: 'hard',
    skills: ['numeros-proporcionalidad', 'numeros-escala', 'numeros-conversion-unidades', 'numeros-operaciones-basicas']
  }
];
