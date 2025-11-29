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
    operacionBase: 'IQR = Q_3 - Q_1',
    questionLatex: '\\text{Un investigador de mercado analiza los tiempos de espera en minutos de 7 clientes en una tienda, ordenados de menor a mayor: 2, 4, 5, 7, 9, 10, 12. Para medir la dispersión del 50\\% central de los datos, necesita calcular el rango intercuartílico (IQR). ¿Cuál es el valor del rango intercuartílico de estos tiempos de espera?}',
    options: ['4', '5', '6', '7'],
    correctAnswer: 2,
    explanation: 'Q_1 = 4, \\quad Q_3 = 10 \\quad \\Rightarrow \\quad \\text{IQR} = Q_3 - Q_1 = 10 - 4 = 6',
    difficulty: 'hard',
    skills: ['estadistica-cuartiles', 'estadistica-rango-intercuartilico', 'estadistica-mediana', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-md-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\text{Rango} = \\text{Máx} - \\text{Mín}',
    questionLatex: '\\text{Una nutricionista registra el consumo diario de calorías de 5 pacientes durante una semana. Los valores registrados en miles de calorías son: 10, 10, 15, 20, 30. Para tener una primera medida de la variabilidad en los consumos, la nutricionista necesita calcular el rango de estos datos. ¿Cuál es el rango del consumo calórico de los pacientes?}',
    options: ['10', '15', '20', '25'],
    correctAnswer: 2,
    explanation: '\\text{Rango} = \\text{Máx} - \\text{Mín} = 30 - 10 = 20',
    difficulty: 'medium',
    skills: ['estadistica-rango', 'estadistica-medidas-dispersion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-md-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'DMA = \\frac{\\sum |x_i - \\bar{x}|}{n}',
    questionLatex: '\\text{Un entrenador deportivo registra las edades de 5 atletas de su equipo: 3, 5, 7, 9 y 11 años. La media de las edades es 7 años. El entrenador quiere calcular la desviación media absoluta para entender qué tan dispersas están las edades respecto a la media. ¿Cuál es la desviación media absoluta de las edades de los atletas?}',
    options: ['2', '2.4', '3', '3.2'],
    correctAnswer: 1,
    explanation: '\\text{DMA} = \\frac{|3-7|+|5-7|+|7-7|+|9-7|+|11-7|}{5} = \\frac{12}{5} = 2.4',
    difficulty: 'hard',
    skills: ['estadistica-desviacion-media', 'estadistica-medidas-dispersion', 'estadistica-media', 'numeros-valor-absoluto', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-md-3',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\text{Var}(X + c) = \\text{Var}(X)',
    questionLatex: '\\text{Un profesor de estadística explica a sus estudiantes las propiedades de la varianza. Les presenta un conjunto de datos que tiene varianza igual a 5. Luego les pregunta: "Si a cada dato del conjunto le sumamos 3 unidades, ¿cuál será la nueva varianza?" El profesor quiere que los estudiantes apliquen la propiedad de que sumar una constante no afecta la dispersión. ¿Cuál es la nueva varianza después de sumar 3 a cada dato?}',
    options: ['5', '8', '10', '15'],
    correctAnswer: 0,
    explanation: '\\text{Var}(X + c) = \\text{Var}(X) = 5',
    difficulty: 'hard',
    skills: ['estadistica-varianza', 'estadistica-medidas-dispersion', 'estadistica-propiedades-varianza']
  },
  {
    id: 'm2-prob-md-4',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'Q_1 = \\text{mediana de la mitad inferior}',
    questionLatex: '\\text{Un economista analiza los ingresos mensuales en miles de pesos de 7 familias de un barrio, ordenados de menor a mayor: 4, 8, 10, 15, 18, 22, 25. Para identificar el ingreso que separa al 25\\% más bajo de las familias, necesita calcular el primer cuartil (Q1). ¿Cuál es el valor del primer cuartil de estos ingresos?}',
    options: ['6', '8', '9', '10'],
    correctAnswer: 1,
    explanation: 'Q_1 = \\text{mediana}(\\{4, 8, 10\\}) = 8',
    difficulty: 'medium',
    skills: ['estadistica-cuartiles', 'estadistica-mediana', 'estadistica-medidas-posicion', 'numeros-operaciones-basicas']
  },
  // Subsection A: Varianza y desviación estándar
  {
    id: 'm2-prob-var-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\text{Var} = \\frac{\\sum (x_i - \\bar{x})^2}{n}',
    questionLatex: '\\text{Un profesor calcula las notas de un curso pequeño: } \\{4, 5, 6, 7, 8\\}\\text{. La media es 6. ¿Cuál es la varianza de estas notas? (Usa la fórmula: Varianza = promedio de los cuadrados de las desviaciones)}',
    options: ['1', '2', '4', '5'],
    correctAnswer: 1,
    explanation: '\\text{Var} = \\frac{(4-6)^2+(5-6)^2+(6-6)^2+(7-6)^2+(8-6)^2}{5} = \\frac{10}{5} = 2',
    difficulty: 'medium',
    skills: ['estadistica-varianza-desviacion', 'estadistica-varianza', 'estadistica-media', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-var-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\sigma = \\sqrt{\\text{Var}}',
    questionLatex: '\\text{Un analista de datos está procesando información sobre tiempos de entrega de una empresa de mensajería. Ha calculado que la varianza de los tiempos es igual a 16 minutos cuadrados. Para reportar la dispersión en las mismas unidades que los datos originales, necesita calcular la desviación estándar. ¿Cuál es la desviación estándar de los tiempos de entrega?}',
    options: ['2', '4', '8', '256'],
    correctAnswer: 1,
    explanation: '\\sigma = \\sqrt{\\text{Var}} = \\sqrt{16} = 4',
    difficulty: 'easy',
    skills: ['estadistica-varianza-desviacion', 'estadistica-desviacion-estandar', 'numeros-raices', 'numeros-operaciones-basicas']
  },
  // Subsection B: Coeficiente de variación
  {
    id: 'm2-prob-cv-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'CV = \\frac{\\sigma}{\\bar{x}}',
    questionLatex: '\\text{Las notas de matemáticas de Ana tienen media 60 y desviación estándar 12. Sus notas de historia tienen media 50 y desviación estándar 8. ¿En qué asignatura es mayor la variabilidad relativa? (Usa coeficiente de variación: CV = desviación estándar / media)}',
    options: ['Matemáticas', 'Historia', 'Iguales', 'No se puede determinar'],
    correctAnswer: 0,
    explanation: 'CV_{\\text{mates}} = \\frac{12}{60} = 0.20 > CV_{\\text{hist}} = \\frac{8}{50} = 0.16',
    difficulty: 'hard',
    skills: ['estadistica-coeficiente-variacion', 'estadistica-comparacion-dispersion', 'numeros-division', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-cv-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'CV = \\frac{\\sigma}{\\bar{x}} \\times 100\\%',
    questionLatex: '\\text{Un investigador de mercado analiza los precios de un producto en diferentes tiendas. Los datos muestran una media de 40 pesos y una desviación estándar de 8 pesos. Para comparar la variabilidad de estos precios con la de otros productos, necesita calcular el coeficiente de variación. ¿Cuál es el coeficiente de variación expresado como porcentaje?}',
    options: ['5%', '10%', '20%', '32%'],
    correctAnswer: 2,
    explanation: 'CV = \\frac{8}{40} \\times 100\\% = 20\\%',
    difficulty: 'medium',
    skills: ['estadistica-coeficiente-variacion', 'numeros-porcentaje', 'numeros-division', 'numeros-operaciones-basicas']
  },
  // Subsection C: Comparación de dispersión entre grupos
  {
    id: 'm2-prob-comp-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\sigma_B > \\sigma_A \\Rightarrow \\text{B más disperso}',
    questionLatex: '\\text{Un coordinador académico compara los resultados de dos secciones en una prueba estandarizada. El Grupo A obtuvo una media de 70 puntos con desviación estándar de 10 puntos. El Grupo B también obtuvo una media de 70 puntos, pero con desviación estándar de 15 puntos. El coordinador quiere determinar en cuál grupo las notas están más dispersas. ¿Qué grupo presenta mayor dispersión en sus notas?}',
    options: ['Grupo A', 'Grupo B', 'Igual dispersión', 'No se puede determinar'],
    correctAnswer: 1,
    explanation: '\\sigma_B = 15 > \\sigma_A = 10 \\Rightarrow \\text{Grupo B más disperso}',
    difficulty: 'easy',
    skills: ['estadistica-comparacion-dispersion', 'estadistica-desviacion-estandar', 'estadistica-interpretacion-dispersion', 'numeros-comparacion']
  },
  {
    id: 'm2-prob-comp-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\text{Rango mayor} \\Rightarrow \\text{más dispersión}',
    questionLatex: '\\text{Un consultor de recursos humanos está comparando la estructura salarial de dos empresas. En la empresa X, el rango de salarios (diferencia entre el mayor y menor salario) es de \\$400.000. En la empresa Y, el rango de salarios es de \\$250.000. El consultor quiere determinar qué empresa tiene mayor dispersión en sus salarios. ¿Qué indica la comparación de rangos sobre la dispersión salarial?}',
    options: ['X más dispersa que Y', 'Y más dispersa que X', 'Igual dispersión', 'El rango no mide dispersión'],
    correctAnswer: 0,
    explanation: '\\text{Rango}_X > \\text{Rango}_Y \\Rightarrow \\text{X más dispersa}',
    difficulty: 'medium',
    skills: ['estadistica-comparacion-dispersion', 'estadistica-rango', 'estadistica-interpretacion-dispersion', 'numeros-comparacion']
  },
  // Subsection D: Interpretación de medidas de dispersión
  {
    id: 'm2-prob-int-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\sigma \\approx 0 \\Rightarrow \\text{datos homogéneos}',
    questionLatex: '\\text{Un profesor de estadística presenta a sus estudiantes un conjunto de datos cuya desviación estándar es cercana a cero. Les pide que interpreten qué significa este valor tan pequeño de desviación estándar en términos de la distribución de los datos. ¿Qué se puede concluir sobre los datos?}',
    options: ['Los datos están muy dispersos', 'Los datos son todos iguales o muy similares', 'La media es cero', 'Los datos son negativos'],
    correctAnswer: 1,
    explanation: '\\sigma \\approx 0 \\Rightarrow \\text{datos muy homogéneos}',
    difficulty: 'medium',
    skills: ['estadistica-interpretacion-dispersion', 'estadistica-desviacion-estandar', 'estadistica-analisis-datos']
  },
  {
    id: 'm2-prob-int-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\sigma_A < \\sigma_B \\Rightarrow \\text{A más equitativa}',
    questionLatex: '\\text{Un sindicato de trabajadores analiza la equidad salarial en dos empresas del mismo sector. Ambas empresas tienen la misma media salarial de \\$600.000. Sin embargo, la empresa A tiene una desviación estándar de \\$50.000 mientras que la empresa B tiene una desviación estándar de \\$200.000. El sindicato quiere determinar en cuál empresa hay mayor equidad salarial. ¿Qué implica la diferencia de desviaciones estándar sobre la equidad salarial?}',
    options: ['A tiene salarios más equitativos', 'B tiene salarios más equitativos', 'Ambas son igualmente equitativas', 'No se puede determinar'],
    correctAnswer: 0,
    explanation: '\\sigma_A < \\sigma_B \\Rightarrow \\text{A más equitativa}',
    difficulty: 'hard',
    skills: ['estadistica-interpretacion-dispersion', 'estadistica-desviacion-estandar', 'estadistica-comparacion-dispersion', 'estadistica-aplicaciones-contexto']
  }
];
