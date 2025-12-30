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
 * Total: 25 questions
 */

export const m1Prob001Questions: Question[] = [
  {
    id: 'm1-40',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En una clase hay 12 niños y 18 niñas. ¿Qué porcentaje son niños?}',
    options: ['30%', '40%', '50%', '60%'],
    correctAnswer: 1,
    explanation: '\\frac{12}{12 + 18} = \\frac{12}{30} = 0.4 = 40\\%',
    difficulty: 'easy',
    difficultyScore: 0.35,
    skills: ['estadistica-porcentajes', 'numeros-porcentajes', 'numeros-fracciones', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-87',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Edades: 15, 16, 15, 17, 16, 15, 16, 17, 15, 16. Frecuencia absoluta de 16?}',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1,
    explanation: '\\text{Frecuencia de 16} = 4',
    difficulty: 'easy',
    difficultyScore: 0.20,
    skills: ['estadistica-frecuencia', 'estadistica-tablas']
  },
  {
    id: 'm1-88',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{20 personas: 8 azul, 7 rojo, 5 verde. Frecuencia relativa de azul?}',
    options: ['0.35', '0.40', '0.45', '0.50'],
    correctAnswer: 1,
    explanation: 'f_r = \\frac{8}{20} = 0.40',
    difficulty: 'easy',
    difficultyScore: 0.25,
    skills: ['estadistica-frecuencia', 'estadistica-tablas', 'numeros-fracciones', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-89',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Notas: 4, 5, 6, 5, 7, 4, 5, 6, 5, 4. Frecuencia porcentual de 5?}',
    options: ['30%', '40%', '50%', '60%'],
    correctAnswer: 1,
    explanation: 'f_\\% = \\frac{4}{10} \\times 100\\% = 40\\%',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['estadistica-frecuencia', 'estadistica-tablas', 'numeros-porcentajes', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-90',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Edades: 15 (3), 16 (5), 17 (2). Frecuencia acumulada hasta 16?}',
    options: ['3', '5', '8', '10'],
    correctAnswer: 2,
    explanation: 'F_{16} = 3 + 5 = 8',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['estadistica-frecuencia', 'estadistica-frecuencia-acumulada', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-91',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Valor 1 (f=4), Valor 2 (f=6), Valor 3 (f=5). Frecuencia acumulada de 2?}',
    options: ['4', '6', '10', '15'],
    correctAnswer: 2,
    explanation: 'F_2 = 4 + 6 = 10',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['estadistica-frecuencia', 'estadistica-frecuencia-acumulada', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-92',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Si } F = 20 \\text{ y total} = 50, \\text{ ¿qué porcentaje es } \\leq \\text{ese valor?}',
    options: ['20%', '30%', '40%', '50%'],
    correctAnswer: 2,
    explanation: '\\frac{20}{50} \\times 100\\% = 40\\%',
    difficulty: 'easy',
    difficultyScore: 0.32,
    skills: ['estadistica-frecuencia', 'estadistica-frecuencia-acumulada', 'numeros-porcentajes', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-93',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{El gráfico de barras muestra las ventas diarias de una tienda durante tres días. ¿Cuál es el total de ventas en estos tres días?}',
    options: ['100', '105', '110', '115'],
    correctAnswer: 2,
    explanation: '30 + 45 + 35 = 110',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['estadistica-graficos', 'estadistica-interpretacion', 'numeros-operaciones-basicas'],
    visualData: {
      type: 'graph',
      data: {
        chartType: 'bar',
        items: [
          { category: 'Lunes', value: 30 },
          { category: 'Martes', value: 45 },
          { category: 'Miércoles', value: 35 }
        ],
        showValues: true,
        showLabels: true
      }
    }
  },
  {
    id: 'm1-94',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{El gráfico circular muestra la cantidad de estudiantes inscritos en cada deporte. ¿Qué porcentaje de estudiantes está inscrito en fútbol?}',
    options: ['40%', '50%', '60%', '75%'],
    correctAnswer: 1,
    explanation: '\\frac{40}{80} \\times 100\\% = 50\\%',
    difficulty: 'easy',
    difficultyScore: 0.32,
    skills: ['estadistica-graficos', 'estadistica-interpretacion', 'numeros-porcentajes', 'numeros-operaciones-basicas'],
    visualData: {
      type: 'graph',
      data: {
        chartType: 'pie',
        items: [
          { category: 'Fútbol', value: 40, color: '#10B981' },
          { category: 'Básquet', value: 25, color: '#F59E0B' },
          { category: 'Tenis', value: 15, color: '#3B82F6' }
        ],
        showLegend: true,
        showPercentages: false
      }
    }
  },
  {
    id: 'm1-95',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{El gráfico de barras muestra las temperaturas promedio de tres meses. ¿Cuál es la diferencia entre la temperatura máxima y mínima?}',
    options: ['3°C', '5°C', '8°C', '10°C'],
    correctAnswer: 1,
    explanation: '28 - 23 = 5°C',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['estadistica-graficos', 'estadistica-interpretacion', 'numeros-operaciones-basicas'],
    visualData: {
      type: 'graph',
      data: {
        chartType: 'bar',
        items: [
          { category: 'Enero', value: 25 },
          { category: 'Febrero', value: 28 },
          { category: 'Marzo', value: 23 }
        ],
        showValues: true,
        showLabels: true
      }
    }
  },
  {
    id: 'm1-96',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{El gráfico circular muestra la distribución de colores favoritos de 200 estudiantes. ¿Cuántos estudiantes eligieron azul?}',
    options: ['50', '75', '100', '120'],
    correctAnswer: 2,
    explanation: '0.50 \\times 200 = 100',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['estadistica-graficos', 'estadistica-interpretacion', 'numeros-porcentajes', 'numeros-operaciones-basicas'],
    visualData: {
      type: 'graph',
      data: {
        chartType: 'pie',
        items: [
          { category: 'Azul', value: 50, color: '#3B82F6' },
          { category: 'Rojo', value: 30, color: '#EF4444' },
          { category: 'Verde', value: 20, color: '#10B981' }
        ],
        showLegend: true,
        showPercentages: true
      }
    }
  },
  {
    id: 'm1-97',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{El gráfico circular muestra la distribución de actividades extracurriculares de estudiantes. El sector de deportes ocupa 90° del círculo completo. ¿Qué porcentaje de estudiantes practica deportes?}',
    options: ['20%', '25%', '30%', '35%'],
    correctAnswer: 1,
    explanation: '\\frac{90}{360} \\times 100\\% = 25\\%',
    difficulty: 'easy',
    difficultyScore: 0.32,
    skills: ['estadistica-graficos', 'estadistica-interpretacion', 'numeros-porcentajes', 'geometria-angulos', 'numeros-operaciones-basicas'],
    visualData: {
      type: 'graph',
      data: {
        chartType: 'pie',
        items: [
          { category: 'Deportes', value: 25, color: '#3B82F6' },
          { category: 'Música', value: 30, color: '#10B981' },
          { category: 'Arte', value: 25, color: '#F59E0B' },
          { category: 'Otros', value: 20, color: '#8B5CF6' }
        ],
        showLegend: true,
        showPercentages: true
      }
    }
  },
  {
    id: 'm1-98',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{El gráfico circular muestra la distribución del presupuesto mensual de una familia. Si el presupuesto total es de \\$1000, ¿cuánto se destina a vivienda?}',
    options: ['$200', '$250', '$300', '$400'],
    correctAnswer: 1,
    explanation: '0.25 \\times 1000 = 250',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['estadistica-graficos', 'estadistica-interpretacion', 'numeros-porcentajes', 'numeros-operaciones-basicas'],
    visualData: {
      type: 'graph',
      data: {
        chartType: 'pie',
        items: [
          { category: 'Alimentos', value: 40, color: '#EF4444' },
          { category: 'Vivienda', value: 25, color: '#3B82F6' },
          { category: 'Transporte', value: 20, color: '#10B981' },
          { category: 'Otros', value: 15, color: '#F59E0B' }
        ],
        showLegend: true,
        showPercentages: true
      }
    }
  },
  // ========================================
  // TABLAS DE FRECUENCIA ABSOLUTA Y RELATIVA
  // ========================================
  {
    id: 'm1-prob-001-001',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En una encuesta, 15 personas prefieren té, 25 prefieren café y 10 prefieren agua. ¿Cuál es la frecuencia relativa de quienes prefieren café?}',
    options: ['0.25', '0.30', '0.50', '0.75'],
    correctAnswer: 2,
    explanation: 'f_r = \\frac{25}{15+25+10} = \\frac{25}{50} = 0.50',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['estadistica-frecuencia', 'estadistica-tablas', 'numeros-fracciones', 'numeros-decimales']
  },
  {
    id: 'm1-prob-001-002',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Si la frecuencia relativa de un dato es 0.35 y el total de datos es 80, ¿cuál es la frecuencia absoluta de ese dato?}',
    options: ['20', '24', '28', '32'],
    correctAnswer: 2,
    explanation: 'f = f_r \\times n = 0.35 \\times 80 = 28',
    difficulty: 'easy',
    difficultyScore: 0.32,
    skills: ['estadistica-frecuencia', 'estadistica-tablas', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-prob-001-003',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{La suma de todas las frecuencias relativas en una tabla de frecuencias siempre es igual a:}',
    options: ['0', '0.5', '1', 'El total de datos'],
    correctAnswer: 2,
    explanation: '\\sum f_r = 1 \\text{ (siempre)}',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['estadistica-frecuencia', 'estadistica-conceptos']
  },
  // ========================================
  // GRÁFICOS DE BARRAS
  // ========================================
  {
    id: 'm1-prob-001-004',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{El gráfico muestra las ventas diarias de una tienda. ¿Cuál día tuvo menos ventas?}',
    options: ['Lunes', 'Martes', 'Miércoles', 'Jueves'],
    correctAnswer: 2,
    explanation: '\\text{Miércoles tiene 30 ventas, el menor valor del gráfico}',
    difficulty: 'easy',
    difficultyScore: 0.15,
    skills: ['estadistica-graficos', 'estadistica-interpretacion'],
    visualData: {
      type: 'graph',
      data: {
        chartType: 'bar',
        items: [
          { category: 'Lunes', value: 45 },
          { category: 'Martes', value: 60 },
          { category: 'Miércoles', value: 30 },
          { category: 'Jueves', value: 55 }
        ],
        showValues: true,
        showLabels: true
      }
    }
  },
  {
    id: 'm1-prob-001-005',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{El gráfico de barras muestra las cantidades vendidas de cuatro productos diferentes. ¿Qué porcentaje del total de ventas representa el producto C?}',
    options: ['35%', '39.13%', '45%', '50%'],
    correctAnswer: 1,
    explanation: '\\frac{45}{20+35+45+15} = \\frac{45}{115} \\approx 0.3913 = 39.13\\%',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['estadistica-graficos', 'estadistica-interpretacion', 'numeros-porcentajes', 'numeros-operaciones-basicas'],
    visualData: {
      type: 'graph',
      data: {
        chartType: 'bar',
        items: [
          { category: 'A', value: 20 },
          { category: 'B', value: 35 },
          { category: 'C', value: 45 },
          { category: 'D', value: 15 }
        ],
        showValues: true,
        showLabels: true
      }
    }
  },
  // ========================================
  // GRÁFICOS CIRCULARES
  // ========================================
  {
    id: 'm1-prob-001-006',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{El gráfico circular muestra la distribución de respuestas de una encuesta. Un sector representa el 15\\% del total. ¿Cuántos grados mide el ángulo central de ese sector?}',
    options: ['15°', '45°', '54°', '60°'],
    correctAnswer: 2,
    explanation: '0.15 \\times 360° = 54°',
    difficulty: 'easy',
    difficultyScore: 0.32,
    skills: ['estadistica-graficos', 'estadistica-graficos-circulares', 'numeros-porcentajes', 'geometria-angulos'],
    visualData: {
      type: 'graph',
      data: {
        chartType: 'pie',
        items: [
          { category: 'Opción A', value: 15, color: '#3B82F6' },
          { category: 'Opción B', value: 35, color: '#10B981' },
          { category: 'Opción C', value: 30, color: '#F59E0B' },
          { category: 'Opción D', value: 20, color: '#8B5CF6' }
        ],
        showLegend: true,
        showPercentages: true
      }
    }
  },
  {
    id: 'm1-prob-001-007',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{El gráfico circular muestra la distribución de gastos mensuales de una familia. ¿Qué fracción del presupuesto representa alimentación?}',
    options: ['\\frac{1}{4}', '\\frac{1}{3}', '\\frac{1}{2}', '\\frac{2}{3}'],
    correctAnswer: 1,
    explanation: '\\frac{120°}{360°} = \\frac{1}{3}',
    difficulty: 'easy',
    difficultyScore: 0.32,
    skills: ['estadistica-graficos', 'estadistica-graficos-circulares', 'numeros-fracciones', 'geometria-angulos'],
    visualData: {
      type: 'graph',
      data: {
        chartType: 'pie',
        items: [
          { category: 'Alimentación', value: 33.33, color: '#EF4444' },
          { category: 'Vivienda', value: 25, color: '#3B82F6' },
          { category: 'Transporte', value: 16.67, color: '#10B981' },
          { category: 'Otros', value: 25, color: '#F59E0B' }
        ],
        showLegend: true,
        showPercentages: false
      }
    }
  },
  {
    id: 'm1-prob-001-008',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{El gráfico circular muestra los resultados de una encuesta a 400 personas sobre si apoyan una nueva iniciativa. ¿Cuántas personas dijeron "Sí"?}',
    options: ['100', '150', '180', '200'],
    correctAnswer: 3,
    explanation: '\\frac{180°}{360°} \\times 400 = \\frac{1}{2} \\times 400 = 200',
    difficulty: 'medium',
    difficultyScore: 0.35,
    skills: ['estadistica-graficos', 'estadistica-graficos-circulares', 'numeros-fracciones', 'numeros-operaciones-basicas'],
    visualData: {
      type: 'graph',
      data: {
        chartType: 'pie',
        items: [
          { category: 'Sí', value: 50, color: '#10B981' },
          { category: 'No', value: 50, color: '#EF4444' }
        ],
        showLegend: true,
        showPercentages: true
      }
    }
  },
  // ========================================
  // HISTOGRAMAS
  // ========================================
  {
    id: 'm1-prob-001-009',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En un histograma de notas: [1-3) tiene 5 estudiantes, [3-5) tiene 12 estudiantes, [5-7) tiene 8 estudiantes. ¿Cuántos estudiantes hay en total?}',
    options: ['20', '25', '30', '35'],
    correctAnswer: 1,
    explanation: '5 + 12 + 8 = 25 \\text{ estudiantes}',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['estadistica-graficos', 'estadistica-histogramas', 'numeros-operaciones-basicas'],
    visualData: {
      type: 'graph',
      data: {
        chartType: 'histogram',
        items: [
          { interval: '[1-3)', frequency: 5 },
          { interval: '[3-5)', frequency: 12 },
          { interval: '[5-7)', frequency: 8 }
        ],
        showFrequencies: true,
        showIntervals: true
      }
    }
  },
  {
    id: 'm1-prob-001-010',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En un histograma de edades, el intervalo [20-30) tiene frecuencia 15 y ancho 10. ¿Cuál es la densidad de frecuencia?}',
    options: ['0.5', '1.5', '5', '15'],
    correctAnswer: 1,
    explanation: '\\text{Densidad} = \\frac{f}{\\text{ancho}} = \\frac{15}{10} = 1.5',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['estadistica-graficos', 'estadistica-histogramas', 'numeros-decimales', 'numeros-operaciones-basicas'],
    visualData: {
      type: 'graph',
      data: {
        chartType: 'histogram',
        items: [
          { interval: '[10-20)', frequency: 8 },
          { interval: '[20-30)', frequency: 15 },
          { interval: '[30-40)', frequency: 10 }
        ],
        showFrequencies: true,
        showIntervals: true
      }
    }
  },
  {
    id: 'm1-prob-001-011',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{¿Cuál es la diferencia principal entre un gráfico de barras y un histograma?}',
    options: ['El histograma no tiene barras', 'En el histograma las barras están separadas', 'El histograma se usa para datos agrupados en intervalos', 'No hay diferencia'],
    correctAnswer: 2,
    explanation: '\\text{El histograma representa datos continuos agrupados en intervalos (clases)}',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['estadistica-graficos', 'estadistica-histogramas', 'estadistica-conceptos']
  },
  // ========================================
  // INTERPRETACIÓN DE GRÁFICOS
  // ========================================
  {
    id: 'm1-prob-001-012',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un gráfico de líneas muestra ventas mensuales que suben de enero a junio y bajan de julio a diciembre. ¿Qué mes tuvo las mayores ventas?}',
    options: ['Enero', 'Marzo', 'Junio', 'Diciembre'],
    correctAnswer: 2,
    explanation: '\\text{Junio es el punto más alto antes de que empiecen a bajar}',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['estadistica-graficos', 'estadistica-interpretacion'],
    visualData: {
      type: 'graph',
      data: {
        chartType: 'line',
        items: [
          { label: 'Ene', value: 50 },
          { label: 'Feb', value: 65 },
          { label: 'Mar', value: 80 },
          { label: 'Abr', value: 95 },
          { label: 'May', value: 110 },
          { label: 'Jun', value: 120 },
          { label: 'Jul', value: 105 },
          { label: 'Ago', value: 90 },
          { label: 'Sep', value: 75 },
          { label: 'Oct', value: 60 },
          { label: 'Nov', value: 45 },
          { label: 'Dic', value: 35 }
        ],
        showValues: false,
        showLabels: true
      }
    }
  }
];
