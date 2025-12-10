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
    questionLatex: '\\text{Una tienda de electrónica está realizando un inventario de sus productos disponibles. El gerente registra que hay 80 tablets en el almacén y necesita separar el 25\\% de ellas para una promoción especial del próximo fin de semana. El encargado de logística debe calcular exactamente cuántas tablets corresponden a ese porcentaje para prepararlas con anticipación. ¿Cuántas tablets debe separar?}',
    options: ['15', '20', '25', '30'],
    correctAnswer: 1,
    explanation: '25\\% \\text{ de } 80 = 0.25 \\times 80 = 20',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['numeros-porcentajes', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-94',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '60\\% \\text{ de } 50',
    questionLatex: '\\text{Un laboratorio químico está preparando una solución especial para experimentos. La mezcla total contiene 50 litros y está compuesta por 40\\% de agua y 60\\% de alcohol. El técnico necesita determinar con precisión la cantidad de alcohol presente en la mezcla para registrarla en el informe de seguridad del laboratorio. ¿Cuántos litros de alcohol hay en la mezcla?}',
    options: ['20 litros', '25 litros', '30 litros', '35 litros'],
    correctAnswer: 2,
    explanation: '0.60 \\times 50 = 30 \\text{ litros de alcohol}',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['numeros-porcentajes', 'numeros-proporcionalidad', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-96',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{25000-20000}{20000} \\times 100',
    questionLatex: '\\text{Un comerciante está analizando el incremento de precios en su tienda durante el último mes. Un producto específico tenía un precio inicial de \\$20.000 pesos, pero debido al aumento en los costos de importación, ahora tiene un precio de \\$25.000 pesos. El gerente necesita calcular el porcentaje de aumento para reportarlo en la junta administrativa mensual. ¿Cuál es el porcentaje de aumento del precio?}',
    options: ['20%', '25%', '30%', '35%'],
    correctAnswer: 1,
    explanation: '\\frac{25000 - 20000}{20000} \\times 100\\% = \\frac{5000}{20000} \\times 100\\% = 25\\%',
    difficulty: 'medium',
    difficultyScore: 0.35,
    skills: ['numeros-porcentajes', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-97',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{8000-6400}{8000} \\times 100',
    questionLatex: '\\text{Un demógrafo está estudiando los cambios poblacionales de una pequeña ciudad durante la última década. Los registros muestran que hace diez años la población era de 8.000 habitantes, pero el último censo registró solo 6.400 habitantes debido a la migración hacia las grandes ciudades. El investigador necesita calcular el porcentaje de disminución poblacional para su informe estadístico. ¿Cuál es el porcentaje de disminución?}',
    options: ['15%', '20%', '25%', '30%'],
    correctAnswer: 1,
    explanation: '\\frac{8000 - 6400}{8000} \\times 100\\% = \\frac{1600}{8000} \\times 100\\% = 20\\%',
    difficulty: 'medium',
    difficultyScore: 0.35,
    skills: ['numeros-porcentajes', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-100',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{3000}{50000} \\times 100',
    questionLatex: '\\text{Un inversionista deposita \\$50.000 pesos en una cuenta de ahorro a plazo fijo. Después de un año, el banco le paga exactamente \\$3.000 pesos como interés simple generado por su inversión. El inversionista quiere calcular cuál fue la tasa de interés anual que aplicó el banco para poder comparar con otras opciones de inversión. ¿Cuál es la tasa de interés anual?}',
    options: ['4%', '5%', '6%', '7%'],
    correctAnswer: 2,
    explanation: '\\frac{3000}{50000} \\times 100\\% = 6\\%',
    difficulty: 'easy',
    difficultyScore: 0.32,
    skills: ['numeros-porcentajes', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-107',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{70}{0.35}',
    questionLatex: '\\text{En una clase de matemática, el profesor plantea un problema a sus estudiantes. Les dice que el 35\\% de cierto número desconocido es igual a 70. Los estudiantes deben aplicar sus conocimientos de porcentajes y ecuaciones para determinar cuál es el número completo del que 70 representa solo el 35\\%. ¿Cuál es el número?}',
    options: ['150', '180', '200', '240'],
    correctAnswer: 2,
    explanation: '0.35x = 70 \\quad \\Rightarrow \\quad x = \\frac{70}{0.35} = 200',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['numeros-porcentajes', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-161',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{3}{4} = 0.75',
    questionLatex: '\\text{Una profesora de matemática está enseñando conversiones numéricas a sus estudiantes. Les muestra la fracción } \\frac{3}{4} \\text{ y les pide que la expresen como un número decimal. Un estudiante debe realizar la división correspondiente para encontrar la representación decimal exacta. ¿Cuál es la expresión decimal de } \\frac{3}{4}\\text{?}',
    options: ['0,5', '0,6', '0,75', '0,8'],
    correctAnswer: 2,
    explanation: '\\frac{3}{4} = 3 \\div 4 = 0{,}75',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['numeros-fracciones', 'numeros-decimales', 'numeros-conversiones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-162',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{3}{4} \\times 100\\% = 75\\%',
    questionLatex: '\\text{En una encuesta estudiantil, se registra que } \\frac{3}{4} \\text{ de los estudiantes del colegio prefieren deportes al aire libre. La directiva académica solicita que esta información se presente en el informe anual usando porcentajes en lugar de fracciones, ya que es más comprensible para las familias. ¿Qué porcentaje de estudiantes prefiere deportes al aire libre?}',
    options: ['60%', '70%', '75%', '80%'],
    correctAnswer: 2,
    explanation: '\\frac{3}{4} = 0{,}75 = 75\\%',
    difficulty: 'easy',
    difficultyScore: 0.20,
    skills: ['numeros-fracciones', 'numeros-porcentajes', 'numeros-conversiones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-163',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '0.6 = \\frac{6}{10} = \\frac{3}{5}',
    questionLatex: '\\text{Un químico está registrando datos experimentales en su laboratorio. Midió la concentración de una solución y obtuvo el valor decimal 0,6. Para su informe científico, necesita expresar este valor como una fracción simplificada en su forma más reducida. ¿Cuál es la fracción simplificada que representa 0,6?}',
    options: ['\\frac{1}{2}', '\\frac{3}{5}', '\\frac{2}{3}', '\\frac{6}{10}'],
    correctAnswer: 1,
    explanation: '0{,}6 = \\frac{6}{10} = \\frac{3}{5}',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['numeros-decimales', 'numeros-fracciones', 'numeros-conversiones', 'numeros-simplificacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-164',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '45\\% = \\frac{45}{100} = \\frac{9}{20}',
    questionLatex: '\\text{Un analista financiero está preparando un reporte sobre las inversiones de una empresa. Observa que el 45\\% del capital está invertido en bonos del estado. Para presentar esta información en la junta de accionistas de manera más formal, decide expresar este porcentaje como una fracción irreducible. ¿Qué fracción representa el 45\\%?}',
    options: ['\\frac{9}{20}', '\\frac{45}{100}', '\\frac{5}{11}', '\\frac{4}{9}'],
    correctAnswer: 0,
    explanation: '45\\% = \\frac{45}{100} = \\frac{9}{20}',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['numeros-porcentajes', 'numeros-fracciones', 'numeros-conversiones', 'numeros-simplificacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-165',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '0.35 = 35\\%',
    questionLatex: '\\text{Una tienda de ropa está ofreciendo un descuento especial. El cajero ingresa en el sistema el factor multiplicador de 0,35 que representa el descuento aplicado. La gerencia solicita que todos los descuentos se muestren en los letreros como porcentajes para que los clientes los entiendan mejor. ¿Qué porcentaje representa el decimal 0,35?}',
    options: ['3,5%', '30%', '35%', '350%'],
    correctAnswer: 2,
    explanation: '0{,}35 \\times 100 = 35\\%',
    difficulty: 'easy',
    difficultyScore: 0.15,
    skills: ['numeros-decimales', 'numeros-porcentajes', 'numeros-conversiones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-166',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '120\\% = \\frac{120}{100} = 1.2',
    questionLatex: '\\text{Un economista está analizando el crecimiento de una empresa durante el último año. Los datos muestran que las ventas alcanzaron el 120\\% de lo proyectado originalmente, superando las expectativas. Para realizar cálculos matemáticos adicionales en su modelo financiero, necesita expresar este porcentaje como un número decimal. ¿Cuál es la expresión decimal de 120\\%?}',
    options: ['0,12', '1,2', '12', '120'],
    correctAnswer: 1,
    explanation: '120\\% = \\frac{120}{100} = 1{,}2',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['numeros-porcentajes', 'numeros-decimales', 'numeros-conversiones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-167',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{2}{5} = 0.4 = 40\\%',
    questionLatex: '\\text{En una votación estudiantil para elegir el color del buzo de graduación, } \\frac{2}{5} \\text{ de los estudiantes votaron por el color azul. El centro de alumnos debe presentar los resultados de la votación en un gráfico circular donde cada sector se etiqueta con porcentajes. ¿Qué porcentaje de estudiantes votó por azul?}',
    options: ['25%', '30%', '40%', '50%'],
    correctAnswer: 2,
    explanation: '\\frac{2}{5} = 0{,}4 = 40\\%',
    difficulty: 'easy',
    difficultyScore: 0.20,
    skills: ['numeros-fracciones', 'numeros-decimales', 'numeros-porcentajes', 'numeros-conversiones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-168',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '0.125 = \\frac{125}{1000} = \\frac{1}{8}',
    questionLatex: '\\text{Un ingeniero civil está calculando las proporciones de cemento en una mezcla de concreto. El sistema digital muestra que se necesita 0,125 de la mezcla total en cemento Portland. Para comunicar esta especificación a los operarios de la construcción, que trabajan habitualmente con fracciones, necesita convertir este decimal a fracción simplificada. ¿Qué fracción representa 0,125?}',
    options: ['\\frac{1}{8}', '\\frac{1}{10}', '\\frac{1}{12}', '\\frac{1}{16}'],
    correctAnswer: 0,
    explanation: '0{,}125 = \\frac{125}{1000} = \\frac{1}{8}',
    difficulty: 'medium',
    difficultyScore: 0.35,
    skills: ['numeros-decimales', 'numeros-fracciones', 'numeros-conversiones', 'numeros-simplificacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-169',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '8\\% = 0.08 = \\frac{2}{25}',
    questionLatex: '\\text{Un banco ofrece una cuenta de ahorro con una tasa de interés anual del 8\\%. Un cliente quiere programar una hoja de cálculo para proyectar sus ganancias, pero el software requiere que ingrese la tasa como fracción simplificada para realizar los cálculos internos correctamente. ¿Qué fracción debe ingresar para representar el 8\\%?}',
    options: ['\\frac{1}{12}', '\\frac{2}{25}', '\\frac{4}{50}', '\\frac{8}{100}'],
    correctAnswer: 1,
    explanation: '8\\% = \\frac{8}{100} = \\frac{2}{25}',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['numeros-porcentajes', 'numeros-fracciones', 'numeros-conversiones', 'numeros-simplificacion', 'numeros-operaciones-basicas']
  }
];
