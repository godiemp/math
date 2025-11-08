import { Question } from '../../../types';

export const m2ProbabilidadTablasGraficosQuestions: Question[] = [
  {
    id: 'm2-prob-tg-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'Una tabla de frecuencias muestra: valor 5 (frecuencia 3), valor 6 (frecuencia 5), valor 7 (frecuencia 2). ¿Cuál es la frecuencia relativa del valor 6?',
    questionLatex: '\\text{Tabla: valor 5 (frec. 3), valor 6 (frec. 5), valor 7 (frec. 2). ¿Frecuencia relativa de 6?}',
    options: ['0.3', '0.5', '0.6', '0.2'],
    correctAnswer: 1,
    explanation: 'Frecuencia relativa = frecuencia absoluta / total:',
    explanationLatex: 'f_r = \\frac{5}{3 + 5 + 2} = \\frac{5}{10} = 0.5',
    difficulty: 'medium',
    skills: ['estadistica-frecuencia', 'estadistica-frecuencia-relativa', 'estadistica-tablas', 'numeros-fracciones', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-tg-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'En un histograma, el eje vertical generalmente representa:',
    questionLatex: '\\text{En un histograma, el eje vertical generalmente representa:}',
    options: ['La frecuencia de los datos', 'El tiempo', 'La variable categórica', 'El error estándar'],
    correctAnswer: 0,
    explanation: 'En un histograma, el eje vertical (Y) representa la frecuencia o cantidad de datos en cada intervalo',
    explanationLatex: '\\text{Eje vertical} = \\text{Frecuencia}',
    difficulty: 'medium',
    skills: ['estadistica-graficos', 'estadistica-histogramas', 'estadistica-interpretacion-graficos']
  }
];
