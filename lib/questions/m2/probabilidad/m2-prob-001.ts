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
    questionLatex: '\\text{En el conjunto de datos } \\{2, 4, 5, 7, 9, 10, 12\\}\\text{, el rango intercuartílico (IQR) es:}',
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
    questionLatex: '\\text{En el conjunto } \\{10, 10, 15, 20, 30\\}\\text{, ¿cuál es el rango?}',
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
    questionLatex: '\\text{En } \\{3, 5, 7, 9, 11\\}\\text{, ¿desviación media absoluta? (media=7)}',
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
    questionLatex: '\\text{Conjunto con varianza 5. Al sumar 3 a cada dato, ¿nueva varianza?}',
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
    questionLatex: '\\text{En } \\{4, 8, 10, 15, 18, 22, 25\\}\\text{, el primer cuartil } Q_1 \\text{ es:}',
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
    questionLatex: '\\text{Un conjunto de datos tiene varianza igual a 16. ¿Cuál es su desviación estándar?}',
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
    questionLatex: '\\text{Un grupo de datos tiene media 40 y desviación estándar 8. ¿Cuál es su coeficiente de variación expresado como porcentaje?}',
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
    questionLatex: '\\text{Dos grupos de estudiantes rindieron una prueba. Grupo A: media=70, desviación=10. Grupo B: media=70, desviación=15. ¿Qué grupo presenta mayor dispersión en sus notas?}',
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
    questionLatex: '\\text{Los salarios en empresa X tienen rango de \\$400.000. Los salarios en empresa Y tienen rango de \\$250.000. ¿Qué indica esto sobre la dispersión salarial?}',
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
    questionLatex: '\\text{Un conjunto de datos tiene desviación estándar cercana a cero. ¿Qué se puede concluir sobre los datos?}',
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
    questionLatex: '\\text{Dos empresas tienen la misma media salarial de \\$600.000. La empresa A tiene desviación estándar de \\$50.000 y la empresa B de \\$200.000. ¿Qué implica esto sobre la equidad salarial?}',
    options: ['A tiene salarios más equitativos', 'B tiene salarios más equitativos', 'Ambas son igualmente equitativas', 'No se puede determinar'],
    correctAnswer: 0,
    explanation: '\\sigma_A < \\sigma_B \\Rightarrow \\text{A más equitativa}',
    difficulty: 'hard',
    skills: ['estadistica-interpretacion-dispersion', 'estadistica-desviacion-estandar', 'estadistica-comparacion-dispersion', 'estadistica-aplicaciones-contexto']
  }
];
