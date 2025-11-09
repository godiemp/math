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
  },
  {
    id: 'm2-num-prop-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'Si 3 kg de manzanas cuestan $4.500, ¿cuánto costarán 5 kg?',
    questionLatex: '\\text{Si 3 kg de manzanas cuestan \\$4.500, ¿cuánto costarán 5 kg?}',
    options: ['$7.500', '$6.750', '$8.000', '$6.000'],
    correctAnswer: 0,
    explanation: 'Es proporcionalidad directa. Más kilos, más costo:',
    explanationLatex: '\\frac{3}{4500} = \\frac{5}{x} \\quad \\Rightarrow \\quad x = \\frac{5 \\times 4500}{3} = 7500',
    difficulty: 'medium',
    skills: ['numeros-proporcionalidad', 'numeros-proporcionalidad-directa', 'numeros-regla-tres', 'numeros-operaciones-basicas']
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
  },
  {
    id: 'm2-num-prop-5',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'Una maqueta de un edificio tiene una altura de 40 cm y está a escala 1:250. ¿Cuál es la altura real del edificio?',
    questionLatex: '\\text{Maqueta: 40 cm a escala 1:250. ¿Altura real del edificio?}',
    options: ['100 m', '50 m', '200 m', '25 m'],
    correctAnswer: 0,
    explanation: 'Altura real = 40 cm × 250 = 10.000 cm = 100 m',
    explanationLatex: '40 \\text{ cm} \\times 250 = 10{,}000 \\text{ cm} = 100 \\text{ m}',
    difficulty: 'hard',
    skills: ['numeros-proporcionalidad', 'numeros-escala', 'numeros-conversion-unidades', 'numeros-operaciones-basicas']
  }
];
