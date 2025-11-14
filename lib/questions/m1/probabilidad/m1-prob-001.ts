import { Question } from '../../../types';

/**
 * M1-PROB-001: Tablas de frecuencia y gráficos estadísticos
 * Chilean PAES Curriculum - Probability and Statistics Subsection 001
 *
 * This subsection covers:
 * - A: Tablas de frecuencia absoluta y relativa
 * - B: Gráficos de barras y pictogramas
 * - C: Gráficos circulares
 * - D: Histogramas
 * - E: Interpretación de gráficos estadísticos
 *
 * Total: 13 questions
 */

export const m1Prob001Questions: Question[] = [
  {
    id: 'm1-40',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'En una clase hay 12 niños y 18 niñas. ¿Qué porcentaje son niños?',
    questionLatex: '\\text{En una clase hay 12 niños y 18 niñas. ¿Qué porcentaje son niños?}',
    options: ['30%', '40%', '50%', '60%'],
    correctAnswer: 1,
    explanation: 'Calculamos el porcentaje:',
    explanationLatex: '\\frac{12}{12 + 18} = \\frac{12}{30} = 0.4 = 40\\%',
    difficulty: 'easy',
    skills: ['estadistica-porcentajes', 'numeros-porcentajes', 'numeros-fracciones', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-87',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'Las edades de 10 estudiantes son: 15, 16, 15, 17, 16, 15, 16, 17, 15, 16. ¿Cuál es la frecuencia absoluta de 16 años?',
    questionLatex: '\\text{Edades: 15, 16, 15, 17, 16, 15, 16, 17, 15, 16. Frecuencia absoluta de 16?}',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1,
    explanation: 'Contamos cuántas veces aparece 16:',
    explanationLatex: '\\text{Frecuencia de 16} = 4',
    difficulty: 'easy',
    skills: ['estadistica-frecuencia', 'estadistica-tablas']
  },
  {
    id: 'm1-88',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'En una encuesta a 20 personas sobre su color favorito: 8 dijeron azul, 7 rojo, 5 verde. ¿Cuál es la frecuencia relativa del color azul?',
    questionLatex: '\\text{20 personas: 8 azul, 7 rojo, 5 verde. Frecuencia relativa de azul?}',
    options: ['0.35', '0.40', '0.45', '0.50'],
    correctAnswer: 1,
    explanation: 'Frecuencia relativa es el cociente entre frecuencia absoluta y total:',
    explanationLatex: 'f_r = \\frac{8}{20} = 0.40',
    difficulty: 'easy',
    skills: ['estadistica-frecuencia', 'estadistica-tablas', 'numeros-fracciones', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-89',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'Las notas de un curso son: 4, 5, 6, 5, 7, 4, 5, 6, 5, 4. ¿Cuál es la frecuencia porcentual de la nota 5?',
    questionLatex: '\\text{Notas: 4, 5, 6, 5, 7, 4, 5, 6, 5, 4. Frecuencia porcentual de 5?}',
    options: ['30%', '40%', '50%', '60%'],
    correctAnswer: 1,
    explanation: 'La nota 5 aparece 4 veces de 10:',
    explanationLatex: 'f_\\% = \\frac{4}{10} \\times 100\\% = 40\\%',
    difficulty: 'easy',
    skills: ['estadistica-frecuencia', 'estadistica-tablas', 'numeros-porcentajes', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-90',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'Edades: 15 (3 personas), 16 (5 personas), 17 (2 personas). ¿Cuál es la frecuencia acumulada hasta los 16 años?',
    questionLatex: '\\text{Edades: 15 (3), 16 (5), 17 (2). Frecuencia acumulada hasta 16?}',
    options: ['3', '5', '8', '10'],
    correctAnswer: 2,
    explanation: 'Sumamos las frecuencias hasta 16 años:',
    explanationLatex: 'F_{16} = 3 + 5 = 8',
    difficulty: 'easy',
    skills: ['estadistica-frecuencia', 'estadistica-frecuencia-acumulada', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-91',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'En una tabla de frecuencias: Valor 1 (f=4), Valor 2 (f=6), Valor 3 (f=5). ¿Cuál es la frecuencia acumulada del valor 2?',
    questionLatex: '\\text{Valor 1 (f=4), Valor 2 (f=6), Valor 3 (f=5). Frecuencia acumulada de 2?}',
    options: ['4', '6', '10', '15'],
    correctAnswer: 2,
    explanation: 'Frecuencia acumulada suma hasta el valor indicado:',
    explanationLatex: 'F_2 = 4 + 6 = 10',
    difficulty: 'easy',
    skills: ['estadistica-frecuencia', 'estadistica-frecuencia-acumulada', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-92',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'Si la frecuencia acumulada de un valor es 20 y el total de datos es 50, ¿qué porcentaje de datos es menor o igual a ese valor?',
    questionLatex: '\\text{Si } F = 20 \\text{ y total} = 50, \\text{ ¿qué porcentaje es } \\leq \\text{ese valor?}',
    options: ['20%', '30%', '40%', '50%'],
    correctAnswer: 2,
    explanation: 'Porcentaje acumulado:',
    explanationLatex: '\\frac{20}{50} \\times 100\\% = 40\\%',
    difficulty: 'medium',
    skills: ['estadistica-frecuencia', 'estadistica-frecuencia-acumulada', 'numeros-porcentajes', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-93',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'Un gráfico de barras muestra ventas: Lunes (30), Martes (45), Miércoles (35). ¿Cuál es el total de ventas?',
    questionLatex: '\\text{Ventas: Lunes (30), Martes (45), Miércoles (35). Total?}',
    options: ['100', '105', '110', '115'],
    correctAnswer: 2,
    explanation: 'Sumamos todas las ventas:',
    explanationLatex: '30 + 45 + 35 = 110',
    difficulty: 'easy',
    skills: ['estadistica-graficos', 'estadistica-interpretacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-94',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'En un gráfico de barras sobre deportes favoritos: fútbol (40 votos), básquet (25), tenis (15). ¿Qué porcentaje prefiere fútbol?',
    questionLatex: '\\text{Deportes: fútbol (40), básquet (25), tenis (15). ¿Porcentaje fútbol?}',
    options: ['40%', '50%', '60%', '75%'],
    correctAnswer: 1,
    explanation: 'Total de votos: 40 + 25 + 15 = 80:',
    explanationLatex: '\\frac{40}{80} \\times 100\\% = 50\\%',
    difficulty: 'medium',
    skills: ['estadistica-graficos', 'estadistica-interpretacion', 'numeros-porcentajes', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-95',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'Un gráfico muestra temperatura promedio: Enero (25°C), Febrero (28°C), Marzo (23°C). ¿Cuál es la diferencia entre la máxima y mínima?',
    questionLatex: '\\text{Temperaturas: Enero (25°C), Febrero (28°C), Marzo (23°C). Diferencia máx-mín?}',
    options: ['3°C', '5°C', '8°C', '10°C'],
    correctAnswer: 1,
    explanation: 'Diferencia entre máxima y mínima:',
    explanationLatex: '28 - 23 = 5°C',
    difficulty: 'easy',
    skills: ['estadistica-graficos', 'estadistica-interpretacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-96',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'Un gráfico circular muestra: 50% azul, 30% rojo, 20% verde. Si hay 200 elementos, ¿cuántos son azules?',
    questionLatex: '\\text{Gráfico circular: 50% azul, 30% rojo, 20% verde. De 200, ¿cuántos azules?}',
    options: ['50', '75', '100', '120'],
    correctAnswer: 2,
    explanation: 'Calculamos el 50% de 200:',
    explanationLatex: '0.50 \\times 200 = 100',
    difficulty: 'easy',
    skills: ['estadistica-graficos', 'estadistica-interpretacion', 'numeros-porcentajes', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-97',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'En un gráfico circular de 360°, el sector de "deportes" ocupa 90°. ¿Qué porcentaje representa?',
    questionLatex: '\\text{Gráfico circular de 360°, deportes ocupa 90°. ¿Qué porcentaje?}',
    options: ['20%', '25%', '30%', '35%'],
    correctAnswer: 1,
    explanation: 'El porcentaje es proporcional al ángulo:',
    explanationLatex: '\\frac{90}{360} \\times 100\\% = 25\\%',
    difficulty: 'medium',
    skills: ['estadistica-graficos', 'estadistica-interpretacion', 'numeros-porcentajes', 'geometria-angulos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-98',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'Un gráfico circular representa gastos mensuales: 40% alimentos, 25% vivienda, 20% transporte, 15% otros. Si el gasto total es $1000, ¿cuánto se gasta en vivienda?',
    questionLatex: '\\text{Gastos: 40% alimentos, 25% vivienda, 20% transporte, 15% otros. De \\$1000, vivienda?}',
    options: ['$200', '$250', '$300', '$400'],
    correctAnswer: 1,
    explanation: 'Calculamos el 25% del total:',
    explanationLatex: '0.25 \\times 1000 = 250',
    difficulty: 'easy',
    skills: ['estadistica-graficos', 'estadistica-interpretacion', 'numeros-porcentajes', 'numeros-operaciones-basicas']
  }
];
