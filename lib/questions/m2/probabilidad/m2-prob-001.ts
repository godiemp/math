import { Question } from '../../../types';

/**
 * M2-PROB-001: Cálculo y comparación de medidas de dispersión
 *
 * Subsections:
 * A. Varianza y desviación estándar
 *    Habilidades: estadistica-varianza-desviacion
 * B. Coeficiente de variación
 *    Habilidades: estadistica-coeficiente-variacion
 * C. Comparación de dispersión entre grupos
 *    Habilidades: estadistica-comparacion-dispersion
 * D. Interpretación de medidas de dispersión
 *    Habilidades: estadistica-interpretacion-dispersion
 */

export const m2Prob001Questions: Question[] = [
  {
    id: 'm2-7',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'En el conjunto de datos {2, 4, 5, 7, 9, 10, 12}, el rango intercuartílico (IQR) es:',
    questionLatex: '\\text{En el conjunto de datos } \\{2, 4, 5, 7, 9, 10, 12\\}\\text{, el rango intercuartílico (IQR) es:}',
    options: ['4', '5', '6', '7'],
    correctAnswer: 2,
    explanation: 'Q1 = 4, Q3 = 10. IQR = Q3 - Q1 = 10 - 4 = 6',
    explanationLatex: 'Q_1 = 4, \\quad Q_3 = 10 \\quad \\Rightarrow \\quad \\text{IQR} = Q_3 - Q_1 = 10 - 4 = 6',
    difficulty: 'hard',
    skills: ['estadistica-cuartiles', 'estadistica-rango-intercuartilico', 'estadistica-mediana', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-md-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'En el conjunto {10, 10, 15, 20, 30}, ¿cuál es el rango?',
    questionLatex: '\\text{En el conjunto } \\{10, 10, 15, 20, 30\\}\\text{, ¿cuál es el rango?}',
    options: ['10', '15', '20', '25'],
    correctAnswer: 2,
    explanation: 'El rango es la diferencia entre el valor máximo y el mínimo:',
    explanationLatex: '\\text{Rango} = \\text{Máx} - \\text{Mín} = 30 - 10 = 20',
    difficulty: 'medium',
    skills: ['estadistica-rango', 'estadistica-medidas-dispersion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-md-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'En el conjunto {3, 5, 7, 9, 11}, ¿cuál es la desviación media absoluta respecto a la media (5+7=7)?',
    questionLatex: '\\text{En } \\{3, 5, 7, 9, 11\\}\\text{, ¿desviación media absoluta? (media=7)}',
    options: ['2', '2.4', '3', '3.2'],
    correctAnswer: 1,
    explanation: 'Desviaciones: |3-7|=4, |5-7|=2, |7-7|=0, |9-7|=2, |11-7|=4. Media: (4+2+0+2+4)/5 = 2.4',
    explanationLatex: '\\text{DMA} = \\frac{|3-7|+|5-7|+|7-7|+|9-7|+|11-7|}{5} = \\frac{12}{5} = 2.4',
    difficulty: 'hard',
    skills: ['estadistica-desviacion-media', 'estadistica-medidas-dispersion', 'estadistica-media', 'numeros-valor-absoluto', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-md-3',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'El conjunto {8, 10, 12, 14} tiene una varianza de 5. Si se suma 3 a cada dato, ¿cuál es la nueva varianza?',
    questionLatex: '\\text{Conjunto con varianza 5. Al sumar 3 a cada dato, ¿nueva varianza?}',
    options: ['5', '8', '10', '15'],
    correctAnswer: 0,
    explanation: 'La varianza es invariante ante traslaciones (sumar una constante):',
    explanationLatex: '\\text{Var}(X + c) = \\text{Var}(X) = 5',
    difficulty: 'hard',
    skills: ['estadistica-varianza', 'estadistica-medidas-dispersion', 'estadistica-propiedades-varianza']
  },
  {
    id: 'm2-prob-md-4',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'En el conjunto ordenado {4, 8, 10, 15, 18, 22, 25}, el primer cuartil Q₁ es:',
    questionLatex: '\\text{En } \\{4, 8, 10, 15, 18, 22, 25\\}\\text{, el primer cuartil } Q_1 \\text{ es:}',
    options: ['6', '8', '9', '10'],
    correctAnswer: 1,
    explanation: 'Q₁ es la mediana de la primera mitad: {4, 8, 10}. Q₁ = 8',
    explanationLatex: 'Q_1 = \\text{mediana}(\\{4, 8, 10\\}) = 8',
    difficulty: 'medium',
    skills: ['estadistica-cuartiles', 'estadistica-mediana', 'estadistica-medidas-posicion', 'numeros-operaciones-basicas']
  }
];
