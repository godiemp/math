import { Question } from '../../../types';

export const m2NumerosPorcentajeQuestions: Question[] = [
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
  }
];
