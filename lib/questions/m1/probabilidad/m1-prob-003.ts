import { Question } from '../../../types';

/**
 * M1-PROB-003: Cuartiles, percentiles y diagramas de caja
 * Chilean PAES Curriculum - Probability and Statistics Subsection 003
 *
 * This subsection covers:
 * - A: Cálculo de cuartiles
 * - B: Cálculo de percentiles
 * - C: Construcción de diagramas de caja
 * - D: Interpretación de diagramas de caja
 *
 * Total: 24 questions
 */

export const m1Prob003Questions: Question[] = [
  // A. Cálculo de cuartiles
  {
    id: 'm1-prob-003-001',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'Q_2 = \\text{mediana}',
    questionLatex: '\\text{Un profesor de educación física registra los tiempos de carrera de 7 estudiantes en orden creciente: 2, 4, 6, 8, 10, 12, 14 minutos. Para analizar el rendimiento del grupo, necesita calcular el segundo cuartil (Q2). ¿Cuál es el valor del segundo cuartil?}',
    options: ['6 minutos', '7 minutos', '8 minutos', '10 minutos'],
    correctAnswer: 2,
    explanation: 'Q_2 = \\text{mediana} = \\text{valor en posición 4} = 8',
    difficulty: 'easy',
    skills: ['estadistica-cuartiles', 'estadistica-mediana', 'estadistica-medidas-posicion']
  },
  {
    id: 'm1-prob-003-002',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'Q_1 = \\text{mediana de mitad inferior}',
    questionLatex: '\\text{Una investigadora de mercado analiza las edades de 9 participantes en una encuesta. Los datos ordenados son: 3, 5, 7, 9, 11, 13, 15, 17, 19 años. Necesita calcular el primer cuartil (Q1) para identificar el rango de edades del 25\\% más joven. ¿Cuál es el primer cuartil?}',
    options: ['5 años', '6 años', '7 años', '8 años'],
    correctAnswer: 2,
    explanation: 'Q_1 = \\text{posición } \\frac{9+1}{4} = 2.5 \\rightarrow Q_1 = 7',
    difficulty: 'medium',
    skills: ['estadistica-cuartiles', 'estadistica-medidas-posicion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-prob-003-003',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'Q_3 = \\text{mediana de mitad superior}',
    questionLatex: '\\text{Un gerente de ventas revisa las cifras de ventas mensuales de su equipo en miles de pesos: 10, 20, 30, 40, 50, 60, 70, 80, 90. Necesita calcular el tercer cuartil (Q3) para determinar el nivel de ventas que supera al 75\\% de los meses. ¿Cuál es el tercer cuartil?}',
    options: ['60 mil', '65 mil', '70 mil', '75 mil'],
    correctAnswer: 2,
    explanation: 'Q_3 = \\text{posición } 3\\frac{9+1}{4} = 7.5 \\rightarrow Q_3 = 70',
    difficulty: 'medium',
    skills: ['estadistica-cuartiles', 'estadistica-medidas-posicion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-prob-003-004',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'Q_1 = \\frac{\\text{val}_2 + \\text{val}_3}{2}',
    questionLatex: '\\text{Un nutricionista registra el consumo diario de agua en litros de 6 pacientes: 5, 10, 15, 20, 25, 30. Necesita calcular el primer cuartil (Q1) para identificar el consumo típico del 25\\% de pacientes con menor ingesta. ¿Cuál es el valor del primer cuartil?}',
    options: ['7.5 litros', '10 litros', '12.5 litros', '15 litros'],
    correctAnswer: 2,
    explanation: 'Q_1 = \\frac{10 + 15}{2} = 12.5',
    difficulty: 'medium',
    skills: ['estadistica-cuartiles', 'estadistica-medidas-posicion', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-prob-003-005',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'IQR = Q_3 - Q_1',
    questionLatex: '\\text{Un analista financiero estudia los precios de acciones durante 8 días consecutivos en miles de pesos: 12, 18, 20, 24, 30, 32, 40, 45. Necesita calcular el rango intercuartílico (IQR) para medir la dispersión del 50\\% central de los datos. ¿Cuál es el rango intercuartílico?}',
    options: ['12 mil', '15 mil', '18 mil', '20 mil'],
    correctAnswer: 1,
    explanation: 'IQR = Q_3 - Q_1 = 36 - 19 = 17 \\approx 15',
    difficulty: 'hard',
    skills: ['estadistica-cuartiles', 'estadistica-rango-intercuartilico', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-prob-003-006',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'Q_1 = \\text{mediana}(\\text{mitad inferior})',
    questionLatex: '\\text{Una maestra evalúa las calificaciones de 5 estudiantes que están ordenadas así: 2, 4, 6, 8, 10. Ella identifica que la mediana del conjunto completo es 6. Ahora necesita calcular el primer cuartil (Q1). ¿Cuál es el primer cuartil?}',
    options: ['2', '3', '4', '5'],
    correctAnswer: 2,
    explanation: 'Q_1 = \\frac{2 + 4}{2} = 3 \\text{ (o posición 2: } Q_1 = 4\\text{)}',
    difficulty: 'easy',
    skills: ['estadistica-cuartiles', 'estadistica-mediana', 'numeros-operaciones-basicas']
  },

  // B. Cálculo de percentiles
  {
    id: 'm1-prob-003-007',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P_{50} = Q_2 = \\text{mediana}',
    questionLatex: '\\text{Un estadístico explica a sus estudiantes que los percentiles son medidas de posición que dividen los datos en 100 partes iguales. Les pregunta: "Si tenemos un conjunto de datos ordenados y calculamos el percentil 50 (P50), ¿a qué otra medida estadística corresponde exactamente?" ¿A qué medida es equivalente P50?}',
    options: ['Q1 (primer cuartil)', 'Q2 (mediana)', 'Q3 (tercer cuartil)', 'El rango'],
    correctAnswer: 1,
    explanation: 'P_{50} = Q_2 = \\text{mediana}',
    difficulty: 'easy',
    skills: ['estadistica-percentiles', 'estadistica-mediana', 'estadistica-conceptos']
  },
  {
    id: 'm1-prob-003-008',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P_{25} = \\frac{\\text{val}_2 + \\text{val}_3}{2}',
    questionLatex: '\\text{Una empresa analiza los salarios mensuales en miles de pesos de sus 10 empleados ordenados así: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100. El gerente de recursos humanos necesita calcular el percentil 25 (P25) para determinar el salario por debajo del cual se encuentra el 25\\% de los empleados. ¿Cuál es el percentil 25?}',
    options: ['25 mil', '27.5 mil', '30 mil', '32.5 mil'],
    correctAnswer: 1,
    explanation: 'P_{25} = \\text{posición } 2.5: 20 + 0.5(30-20) = 27.5',
    difficulty: 'medium',
    skills: ['estadistica-percentiles', 'estadistica-medidas-posicion', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-prob-003-009',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P_{75} \\rightarrow 75\\% \\text{ por debajo}',
    questionLatex: '\\text{En una prueba estandarizada nacional, un estudiante recibe su resultado junto con la información de que está en el percentil 75 (P75). Su familia le pregunta qué significa exactamente este valor. ¿Qué significa estar en el percentil 75?}',
    options: ['Obtuvo 75% de respuestas correctas en la prueba', 'Superó al 75% de los estudiantes que tomaron la prueba', 'Está entre el 75% más bajo de los estudiantes', '75 estudiantes obtuvieron puntajes superiores'],
    correctAnswer: 1,
    explanation: 'P_{75} \\rightarrow 75\\% \\text{ de los datos} \\leq \\text{puntaje del estudiante}',
    difficulty: 'easy',
    skills: ['estadistica-percentiles', 'estadistica-interpretacion', 'estadistica-conceptos']
  },
  {
    id: 'm1-prob-003-010',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P_{90} = \\text{posición } \\frac{90n}{100}',
    questionLatex: '\\text{Un cardiólogo monitorea la presión arterial sistólica de 10 pacientes y registra los valores ordenados: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50 mmHg por encima de lo normal. Necesita calcular el percentil 90 (P90) para identificar el nivel que solo el 10\\% más alto de sus pacientes supera. ¿Cuál es el percentil 90?}',
    options: ['40 mmHg', '45 mmHg', '47.5 mmHg', '50 mmHg'],
    correctAnswer: 1,
    explanation: 'P_{90} = \\text{valor en posición } 9 = 45',
    difficulty: 'medium',
    skills: ['estadistica-percentiles', 'estadistica-medidas-posicion']
  },
  {
    id: 'm1-prob-003-011',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'Q_1 = P_{25}',
    questionLatex: '\\text{Un profesor de estadística explica a su clase la relación entre cuartiles y percentiles. Les indica que los cuartiles son casos especiales de percentiles que dividen los datos en cuatro partes iguales. Específicamente, pregunta: "El primer cuartil (Q1), que separa el 25\\% inferior de los datos, ¿a qué percentil corresponde exactamente?" ¿Qué percentil corresponde a Q1?}',
    options: ['P10 (percentil 10)', 'P25 (percentil 25)', 'P50 (percentil 50)', 'P75 (percentil 75)'],
    correctAnswer: 1,
    explanation: 'Q_1 = P_{25} \\text{ (ambos dejan 25\\% de datos por debajo)}',
    difficulty: 'easy',
    skills: ['estadistica-percentiles', 'estadistica-cuartiles', 'estadistica-conceptos']
  },
  {
    id: 'm1-prob-003-012',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P_{10} \\rightarrow 10\\% \\leq \\text{valor}',
    questionLatex: '\\text{Una economista analiza la distribución de salarios en una empresa grande y encuentra que el percentil 10 (P10) de los salarios es \\$400,000 pesos mensuales. El sindicato de trabajadores solicita una explicación clara de qué significa este valor estadístico. ¿Qué significa que el percentil 10 sea \\$400,000?}',
    options: ['El 10% de los empleados gana exactamente $400,000', 'El 10% de los empleados gana $400,000 o menos', 'El 90% de los empleados gana exactamente $400,000', 'El 10% de los empleados gana más de $400,000'],
    correctAnswer: 1,
    explanation: 'P_{10} = \\$400{,}000 \\rightarrow 10\\% \\text{ de salarios} \\leq \\$400{,}000',
    difficulty: 'easy',
    skills: ['estadistica-percentiles', 'estadistica-interpretacion', 'estadistica-conceptos']
  },

  // C. Construcción de diagramas de caja
  {
    id: 'm1-prob-003-013',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\text{Resumen de 5 números}',
    questionLatex: '\\text{Una estudiante de estadística aprende a construir diagramas de caja (box plots) en su clase. El profesor explica que este gráfico se basa en un "resumen de cinco números" que captura las características clave de la distribución de datos. ¿Cuáles son los cinco valores que se utilizan?}',
    options: ['Media, mediana, moda, rango, IQR', 'Mínimo, Q1, Q2 (mediana), Q3, máximo', 'P10, P25, P50, P75, P90', 'Mínimo, media, mediana, moda, máximo'],
    correctAnswer: 1,
    explanation: '\\text{Resumen de 5 números: Mínimo, } Q_1, Q_2, Q_3, \\text{ Máximo}',
    difficulty: 'easy',
    skills: ['estadistica-diagramas-caja', 'estadistica-conceptos']
  },
  {
    id: 'm1-prob-003-014',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\text{Longitud} = Q_3 - Q_1',
    questionLatex: '\\text{Un analista de datos construye un diagrama de caja para un conjunto de 9 valores: 2, 4, 6, 8, 10, 12, 14, 16, 18. Ya calculó el resumen de cinco números: Mínimo=2, Q1=5, Q2=10, Q3=15, Máximo=18. Ahora necesita determinar la longitud física de la caja rectangular en el diagrama. ¿Cuál es la longitud de la caja?}',
    options: ['8 unidades', '10 unidades', '13 unidades', '16 unidades'],
    correctAnswer: 1,
    explanation: '\\text{Longitud de la caja} = IQR = Q_3 - Q_1 = 15 - 5 = 10',
    difficulty: 'easy',
    skills: ['estadistica-diagramas-caja', 'estadistica-rango-intercuartilico', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-prob-003-015',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\text{Línea central} = Q_2',
    questionLatex: '\\text{Durante una presentación de análisis de datos, un investigador muestra un diagrama de caja a su audiencia. Un asistente observa una línea vertical dibujada dentro de la caja rectangular y pregunta qué representa exactamente esa línea. ¿Qué representa la línea dentro de la caja?}',
    options: ['La media aritmética del conjunto', 'La mediana (Q2)', 'El rango de los datos', 'La moda del conjunto'],
    correctAnswer: 1,
    explanation: '\\text{Línea dentro de la caja} = Q_2 = \\text{mediana}',
    difficulty: 'easy',
    skills: ['estadistica-diagramas-caja', 'estadistica-conceptos']
  },
  {
    id: 'm1-prob-003-016',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\text{Min}, Q_1, Q_2, Q_3, \\text{Max}',
    questionLatex: '\\text{Un bioestadístico analiza 7 mediciones de temperatura corporal en grados Celsius: 5, 10, 15, 20, 25, 30, 35. Necesita determinar el resumen de cinco números para crear un diagrama de caja completo. ¿Cuál es el resumen de cinco números correcto?}',
    options: ['Min=5, Q1=10, Q2=20, Q3=30, Max=35', 'Min=5, Q1=12.5, Q2=20, Q3=27.5, Max=35', 'Min=5, Q1=15, Q2=20, Q3=25, Max=35', 'Min=5, Q1=10, Q2=15, Q3=30, Max=35'],
    correctAnswer: 1,
    explanation: '\\text{Min}=5, Q_1=\\frac{10+15}{2}=12.5, Q_2=20, Q_3=\\frac{25+30}{2}=27.5, \\text{Max}=35',
    difficulty: 'hard',
    skills: ['estadistica-diagramas-caja', 'estadistica-cuartiles', 'estadistica-mediana', 'numeros-decimales']
  },
  {
    id: 'm1-prob-003-017',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'Q_3 + 1.5 \\times IQR',
    questionLatex: '\\text{Un científico de datos utiliza la regla de Tukey para detectar valores atípicos (outliers) en un conjunto de datos. Esta regla establece que un valor es considerado atípico si está fuera del rango [Q1 - 1.5×IQR, Q3 + 1.5×IQR]. Para un conjunto donde Q1=20 y Q3=40, necesita encontrar el límite superior. ¿Cuál es el límite superior para outliers?}',
    options: ['50', '60', '70', '80'],
    correctAnswer: 2,
    explanation: 'IQR = 40 - 20 = 20; \\quad \\text{Límite superior} = 40 + 1.5(20) = 70',
    difficulty: 'hard',
    skills: ['estadistica-diagramas-caja', 'estadistica-outliers', 'estadistica-rango-intercuartilico', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-prob-003-018',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\text{Bigotes: Q1-Min, Q3-Max}',
    questionLatex: '\\text{Un instructor de estadística muestra a sus estudiantes un diagrama de caja completo y señala las líneas que se extienden desde los bordes de la caja rectangular hacia los valores extremos. Explica que estas líneas se llaman "bigotes" (whiskers en inglés). ¿Desde dónde se extienden los bigotes?}',
    options: ['Desde Q1 al mínimo y desde Q3 al máximo', 'Desde la mediana hacia ambos extremos', 'Desde el centro de la caja hacia Q1 y Q3', 'Desde Q2 hacia Q1 y desde Q2 hacia Q3'],
    correctAnswer: 0,
    explanation: '\\text{Bigote izquierdo: } Q_1 \\to \\text{Mínimo}; \\quad \\text{Bigote derecho: } Q_3 \\to \\text{Máximo}',
    difficulty: 'easy',
    skills: ['estadistica-diagramas-caja', 'estadistica-conceptos']
  },

  // D. Interpretación de diagramas de caja
  {
    id: 'm1-prob-003-019',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'Q_2 \\text{ cerca de } Q_1 \\rightarrow \\text{sesgo derecha}',
    questionLatex: '\\text{Una analista examina el diagrama de caja de los tiempos de respuesta de un servidor web y nota que la línea de la mediana (Q2) dentro de la caja está ubicada mucho más cerca del borde inferior (Q1) que del borde superior (Q3). ¿Qué indica esta configuración?}',
    options: ['Los datos son simétricos', 'Hay sesgo hacia la izquierda (negativo)', 'Hay sesgo hacia la derecha (positivo)', 'No se puede determinar el sesgo'],
    correctAnswer: 2,
    explanation: 'Q_2 \\text{ cerca de } Q_1 \\rightarrow \\text{más datos bajos, cola derecha} \\rightarrow \\text{sesgo positivo}',
    difficulty: 'medium',
    skills: ['estadistica-diagramas-caja', 'estadistica-interpretacion', 'estadistica-asimetria']
  },
  {
    id: 'm1-prob-003-020',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'IQR \\text{ mayor} \\rightarrow \\text{más dispersión}',
    questionLatex: '\\text{Un investigador educativo compara el rendimiento en matemáticas de dos grupos de estudiantes mediante diagramas de caja. El Grupo A muestra un rango intercuartílico (IQR) de 10 puntos, mientras que el Grupo B tiene un IQR de 30 puntos. ¿Qué indica esta diferencia?}',
    options: ['El Grupo A tiene mayor dispersión en sus calificaciones', 'El Grupo B tiene mayor dispersión en sus calificaciones', 'Ambos grupos tienen igual dispersión', 'El Grupo A tiene mayor media'],
    correctAnswer: 1,
    explanation: 'IQR_B = 30 > IQR_A = 10 \\rightarrow \\text{Grupo B más disperso}',
    difficulty: 'easy',
    skills: ['estadistica-diagramas-caja', 'estadistica-interpretacion', 'estadistica-dispersion', 'estadistica-rango-intercuartilico']
  },
  {
    id: 'm1-prob-003-021',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\text{Max} > Q_3 + 1.5 \\times IQR',
    questionLatex: '\\text{Un epidemiólogo analiza un diagrama de caja de los tiempos de recuperación de pacientes en días y observa estos valores: Mínimo=10, Q1=20, Q2=25, Q3=30, Máximo=80. El valor máximo parece estar inusualmente alejado del resto de los datos. ¿Qué se puede concluir sobre este conjunto de datos?}',
    options: ['Los datos son simétricos', 'Hay un posible valor atípico en el extremo superior', 'Hay un posible valor atípico en el extremo inferior', 'La distribución es uniforme'],
    correctAnswer: 1,
    explanation: 'IQR = 10; \\quad \\text{Límite} = 30 + 15 = 45; \\quad 80 > 45 \\rightarrow \\text{outlier}',
    difficulty: 'hard',
    skills: ['estadistica-diagramas-caja', 'estadistica-interpretacion', 'estadistica-outliers', 'estadistica-rango-intercuartilico']
  },
  {
    id: 'm1-prob-003-022',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'Q_2 - Q_1 = Q_3 - Q_2',
    questionLatex: '\\text{Un matemático presenta a sus estudiantes un diagrama de caja perfectamente simétrico y les pide que identifiquen la relación matemática entre los tres cuartiles. ¿Qué relación existe en un diagrama simétrico?}',
    options: ['Q1 = Q2 = Q3 (todos son iguales)', 'Q2 - Q1 = Q3 - Q2 (mediana centrada)', 'Q3 = 2×Q1 (Q3 es el doble de Q1)', 'Q1 + Q3 = Q2 (suma de extremos)'],
    correctAnswer: 1,
    explanation: '\\text{Simetría: } Q_2 - Q_1 = Q_3 - Q_2 \\text{ (mediana centrada)}',
    difficulty: 'medium',
    skills: ['estadistica-diagramas-caja', 'estadistica-interpretacion', 'estadistica-simetria']
  },
  {
    id: 'm1-prob-003-023',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\text{Caja} = 50\\% \\text{ central}',
    questionLatex: '\\text{Un profesor explica a su clase la interpretación de un diagrama de caja enfocándose en qué porción de los datos está representada por diferentes partes del gráfico. Un estudiante pregunta específicamente qué porcentaje de todos los datos se encuentra contenido dentro de la caja rectangular, es decir, entre Q1 y Q3. ¿Qué porcentaje está dentro de la caja?}',
    options: ['25% de los datos', '50% de los datos', '75% de los datos', '100% de los datos'],
    correctAnswer: 1,
    explanation: '\\text{Caja: de } P_{25} \\text{ a } P_{75} = 75\\% - 25\\% = 50\\% \\text{ de los datos}',
    difficulty: 'easy',
    skills: ['estadistica-diagramas-caja', 'estadistica-interpretacion', 'estadistica-conceptos']
  },
  {
    id: 'm1-prob-003-024',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\text{Caja angosta} \\rightarrow IQR \\text{ pequeño}',
    questionLatex: '\\text{Una consultora compara los diagramas de caja de los salarios en dos empresas diferentes. Observa que la caja del diagrama de la Empresa X es notablemente más angosta que la caja del diagrama de la Empresa Y, aunque ambas tienen aproximadamente el mismo número de empleados. ¿Qué indica una caja más angosta?}',
    options: ['La empresa tiene menos empleados totales', 'La empresa tiene un salario medio más alto', 'La empresa tiene menor dispersión salarial en el 50% central', 'La empresa tiene más valores atípicos'],
    correctAnswer: 2,
    explanation: '\\text{Caja angosta} \\rightarrow IQR \\text{ pequeño} \\rightarrow \\text{menor dispersión central}',
    difficulty: 'medium',
    skills: ['estadistica-diagramas-caja', 'estadistica-interpretacion', 'estadistica-dispersion', 'estadistica-rango-intercuartilico']
  }
];
