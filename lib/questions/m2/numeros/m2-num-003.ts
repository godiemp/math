import { Question } from '../../../types';

/**
 * M2-NUM-003: Problemas aplicados a finanzas: AFP, jubilación, créditos
 *
 * Subsections:
 * A. Sistemas de AFP y ahorro previsional
 *    Habilidades: finanzas-afp
 * B. Cálculo de jubilación y pensiones
 *    Habilidades: finanzas-jubilacion
 * C. Créditos y sistemas de amortización
 *    Habilidades: finanzas-creditos
 * D. Interés compuesto
 *    Habilidades: finanzas-interes-compuesto
 */

export const m2Num003Questions: Question[] = [
  {
    id: 'm2-num-porc-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'Un producto cuesta $80.000 y tiene un descuento del 25%. Luego se aplica un 19% de IVA sobre el precio con descuento. ¿Cuál es el precio final?',
    questionLatex: '\\text{Un producto cuesta \\$80.000 con 25\\% descuento y luego 19\\% IVA. ¿Precio final?}',
    options: ['$71.400', '$68.000', '$60.000', '$64.260'],
    correctAnswer: 0,
    explanation: 'Precio con descuento: 80.000 × 0.75 = 60.000. Con IVA: 60.000 × 1.19 = 71.400',
    explanationLatex: '80{,}000 \\times 0.75 = 60{,}000 \\quad \\Rightarrow \\quad 60{,}000 \\times 1.19 = 71{,}400',
    difficulty: 'medium',
    skills: ['numeros-porcentaje', 'numeros-porcentaje-descuento', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-porc-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'Una población aumentó de 40.000 a 52.000 habitantes. ¿Cuál fue el porcentaje de aumento?',
    questionLatex: '\\text{Una población aumentó de 40.000 a 52.000 habitantes. ¿Porcentaje de aumento?}',
    options: ['20%', '25%', '30%', '35%'],
    correctAnswer: 2,
    explanation: 'Aumento: 52.000 - 40.000 = 12.000. Porcentaje: (12.000/40.000) × 100 = 30%',
    explanationLatex: '\\frac{52{,}000 - 40{,}000}{40{,}000} \\times 100 = \\frac{12{,}000}{40{,}000} \\times 100 = 30\\%',
    difficulty: 'hard',
    skills: ['numeros-porcentaje', 'numeros-porcentaje-variacion', 'numeros-fracciones', 'numeros-operaciones-basicas']
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
