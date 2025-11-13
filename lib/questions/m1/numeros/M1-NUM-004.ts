import { Question } from '../../../types';

/**
 * M1-NUM-004: Concepto y cálculo de porcentaje
 *
 * Topics covered:
 * - Basic percentage calculations (% of a number)
 * - Percentage as a fraction and decimal
 * - Percentage increase and decrease formulas
 * - Finding the percentage rate
 * - Finding the whole from a part and percentage
 * - Converting between percentage, fraction, and decimal representations
 */

export const m1Num004Questions: Question[] = [
  {
    id: 'm1-7',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '25\\% \\text{ de } 80',
    question: 'Una tienda de electrónica está realizando un inventario de sus productos disponibles. El gerente registra que hay 80 tablets en el almacén y necesita separar el 25% de ellas para una promoción especial del próximo fin de semana. El encargado de logística debe calcular exactamente cuántas tablets corresponden a ese porcentaje para prepararlas con anticipación. ¿Cuántas tablets debe separar?',
    questionLatex: '\\text{Una tienda de electrónica está realizando un inventario de sus productos disponibles. El gerente registra que hay 80 tablets en el almacén y necesita separar el 25\\% de ellas para una promoción especial del próximo fin de semana. El encargado de logística debe calcular exactamente cuántas tablets corresponden a ese porcentaje para prepararlas con anticipación. ¿Cuántas tablets debe separar?}',
    options: ['15', '20', '25', '30'],
    correctAnswer: 1,
    explanation: 'Para calcular el 25% de 80, convertimos el porcentaje a decimal (0.25) y multiplicamos: 0.25 × 80 = 20 tablets.',
    explanationLatex: '25\\% \\text{ de } 80 = 0.25 \\times 80 = 20',
    difficulty: 'easy',
    skills: ['numeros-porcentajes', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-94',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '60\\% \\text{ de } 50',
    question: 'Un laboratorio químico está preparando una solución especial para experimentos. La mezcla total contiene 50 litros y está compuesta por 40% de agua y 60% de alcohol. El técnico necesita determinar con precisión la cantidad de alcohol presente en la mezcla para registrarla en el informe de seguridad del laboratorio. ¿Cuántos litros de alcohol hay en la mezcla?',
    questionLatex: '\\text{Un laboratorio químico está preparando una solución especial para experimentos. La mezcla total contiene 50 litros y está compuesta por 40\\% de agua y 60\\% de alcohol. El técnico necesita determinar con precisión la cantidad de alcohol presente en la mezcla para registrarla en el informe de seguridad del laboratorio. ¿Cuántos litros de alcohol hay en la mezcla?}',
    options: ['20 litros', '25 litros', '30 litros', '35 litros'],
    correctAnswer: 2,
    explanation: 'Para encontrar la cantidad de alcohol, calculamos el 60% de 50 litros: 0.60 × 50 = 30 litros de alcohol en la mezcla.',
    explanationLatex: '0.60 \\times 50 = 30 \\text{ litros de alcohol}',
    difficulty: 'easy',
    skills: ['numeros-porcentajes', 'numeros-proporcionalidad', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-96',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{25000-20000}{20000} \\times 100',
    question: 'Un comerciante está analizando el incremento de precios en su tienda durante el último mes. Un producto específico tenía un precio inicial de $20.000 pesos, pero debido al aumento en los costos de importación, ahora tiene un precio de $25.000 pesos. El gerente necesita calcular el porcentaje de aumento para reportarlo en la junta administrativa mensual. ¿Cuál es el porcentaje de aumento del precio?',
    questionLatex: '\\text{Un comerciante está analizando el incremento de precios en su tienda durante el último mes. Un producto específico tenía un precio inicial de \\$20.000 pesos, pero debido al aumento en los costos de importación, ahora tiene un precio de \\$25.000 pesos. El gerente necesita calcular el porcentaje de aumento para reportarlo en la junta administrativa mensual. ¿Cuál es el porcentaje de aumento del precio?}',
    options: ['20%', '25%', '30%', '35%'],
    correctAnswer: 1,
    explanation: 'Calculamos la diferencia: 25.000 - 20.000 = 5.000. Dividimos por el valor original y multiplicamos por 100: (5.000 / 20.000) × 100 = 25% de aumento.',
    explanationLatex: '\\frac{25000 - 20000}{20000} \\times 100\\% = \\frac{5000}{20000} \\times 100\\% = 25\\%',
    difficulty: 'medium',
    skills: ['numeros-porcentajes', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-97',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{8000-6400}{8000} \\times 100',
    question: 'Un demógrafo está estudiando los cambios poblacionales de una pequeña ciudad durante la última década. Los registros muestran que hace diez años la población era de 8.000 habitantes, pero el último censo registró solo 6.400 habitantes debido a la migración hacia las grandes ciudades. El investigador necesita calcular el porcentaje de disminución poblacional para su informe estadístico. ¿Cuál es el porcentaje de disminución?',
    questionLatex: '\\text{Un demógrafo está estudiando los cambios poblacionales de una pequeña ciudad durante la última década. Los registros muestran que hace diez años la población era de 8.000 habitantes, pero el último censo registró solo 6.400 habitantes debido a la migración hacia las grandes ciudades. El investigador necesita calcular el porcentaje de disminución poblacional para su informe estadístico. ¿Cuál es el porcentaje de disminución?}',
    options: ['15%', '20%', '25%', '30%'],
    correctAnswer: 1,
    explanation: 'Calculamos la disminución: 8.000 - 6.400 = 1.600 habitantes. Dividimos por el valor original y multiplicamos por 100: (1.600 / 8.000) × 100 = 20% de disminución.',
    explanationLatex: '\\frac{8000 - 6400}{8000} \\times 100\\% = \\frac{1600}{8000} \\times 100\\% = 20\\%',
    difficulty: 'medium',
    skills: ['numeros-porcentajes', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-100',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{3000}{50000} \\times 100',
    question: 'Un inversionista deposita $50.000 pesos en una cuenta de ahorro a plazo fijo. Después de un año, el banco le paga exactamente $3.000 pesos como interés simple generado por su inversión. El inversionista quiere calcular cuál fue la tasa de interés anual que aplicó el banco para poder comparar con otras opciones de inversión. ¿Cuál es la tasa de interés anual?',
    questionLatex: '\\text{Un inversionista deposita \\$50.000 pesos en una cuenta de ahorro a plazo fijo. Después de un año, el banco le paga exactamente \\$3.000 pesos como interés simple generado por su inversión. El inversionista quiere calcular cuál fue la tasa de interés anual que aplicó el banco para poder comparar con otras opciones de inversión. ¿Cuál es la tasa de interés anual?}',
    options: ['4%', '5%', '6%', '7%'],
    correctAnswer: 2,
    explanation: 'La tasa de interés se calcula dividiendo el interés entre el capital y multiplicando por 100: (3.000 / 50.000) × 100 = 6% anual.',
    explanationLatex: '\\frac{3000}{50000} \\times 100\\% = 6\\%',
    difficulty: 'medium',
    skills: ['numeros-porcentajes', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-107',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{70}{0.35}',
    question: 'En una clase de matemática, el profesor plantea un problema a sus estudiantes. Les dice que el 35% de cierto número desconocido es igual a 70. Los estudiantes deben aplicar sus conocimientos de porcentajes y ecuaciones para determinar cuál es el número completo del que 70 representa solo el 35%. ¿Cuál es el número?',
    questionLatex: '\\text{En una clase de matemática, el profesor plantea un problema a sus estudiantes. Les dice que el 35\\% de cierto número desconocido es igual a 70. Los estudiantes deben aplicar sus conocimientos de porcentajes y ecuaciones para determinar cuál es el número completo del que 70 representa solo el 35\\%. ¿Cuál es el número?}',
    options: ['150', '180', '200', '240'],
    correctAnswer: 2,
    explanation: 'Planteamos la ecuación: 0.35x = 70. Para despejar x, dividimos ambos lados por 0.35: x = 70 / 0.35 = 200.',
    explanationLatex: '0.35x = 70 \\quad \\Rightarrow \\quad x = \\frac{70}{0.35} = 200',
    difficulty: 'hard',
    skills: ['numeros-porcentajes', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  }
];
