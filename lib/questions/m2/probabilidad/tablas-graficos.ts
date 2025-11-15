import { Question } from '../../../types';

export const m2ProbabilidadTablasGraficosQuestions: Question[] = [
  {
    id: 'm2-prob-tg-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
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
    questionLatex: '\\text{En un histograma, el eje vertical generalmente representa:}',
    options: ['La frecuencia de los datos', 'El tiempo', 'La variable categórica', 'El error estándar'],
    correctAnswer: 0,
    explanation: 'En un histograma, el eje vertical (Y) representa la frecuencia o cantidad de datos en cada intervalo',
    explanationLatex: '\\text{Eje vertical} = \\text{Frecuencia}',
    difficulty: 'medium',
    skills: ['estadistica-graficos', 'estadistica-histogramas', 'estadistica-interpretacion-graficos']
  },
  {
    id: 'm2-prob-tg-3',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En una tabla de datos agrupados, la marca de clase del intervalo } [10, 20) \\text{ es:}',
    options: ['10', '15', '20', '30'],
    correctAnswer: 1,
    explanation: 'La marca de clase es el punto medio del intervalo:',
    explanationLatex: '\\text{Marca de clase} = \\frac{10 + 20}{2} = 15',
    difficulty: 'medium',
    skills: ['estadistica-tablas', 'estadistica-marca-clase', 'estadistica-datos-agrupados', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-tg-4',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Edad 15-20 (8), 20-25 (12), 25-30 (6). ¿Frecuencia acumulada hasta 25?}',
    options: ['8', '12', '20', '26'],
    correctAnswer: 2,
    explanation: 'Frecuencia acumulada = suma de frecuencias hasta ese intervalo:',
    explanationLatex: 'F_{acum}(25) = 8 + 12 = 20',
    difficulty: 'medium',
    skills: ['estadistica-frecuencia', 'estadistica-frecuencia-acumulada', 'estadistica-tablas', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-tg-5',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En un gráfico de barras, ¿qué tipo de datos se representa mejor?}',
    options: ['Datos categóricos', 'Datos continuos únicamente', 'Datos negativos únicamente', 'Relaciones entre dos variables continuas'],
    correctAnswer: 0,
    explanation: 'Los gráficos de barras son ideales para representar datos categóricos (categorías discretas)',
    explanationLatex: '\\text{Gráfico de barras} \\rightarrow \\text{Datos categóricos}',
    difficulty: 'medium',
    skills: ['estadistica-graficos', 'estadistica-graficos-barras', 'estadistica-interpretacion-graficos', 'estadistica-tipos-datos']
  }
];
