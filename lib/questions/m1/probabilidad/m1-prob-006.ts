import { Question } from '../../../types';

/**
 * M1-PROB-006: Desviación estándar, varianza y dispersión de datos
 * Chilean PAES Curriculum - Probability and Statistics Subsection 006
 *
 * This subsection covers:
 * - A: Concepto de varianza
 * - B: Cálculo de desviación estándar
 * - C: Interpretación de dispersión
 * - D: Comparación de conjuntos de datos
 * - E: Coeficiente de variación
 *
 * Total: 20 questions
 */

export const m1Prob006Questions: Question[] = [
  // ========================================
  // CONCEPTO DE VARIANZA
  // ========================================
  {
    id: 'm1-prob006-1',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{La varianza de un conjunto de datos mide:}',
    options: ['El valor más frecuente', 'El valor central', 'Qué tan dispersos están los datos respecto a la media', 'La diferencia entre máximo y mínimo'],
    correctAnswer: 2,
    explanation: '\\text{La varianza mide la dispersión promedio de los datos respecto a la media}',
    difficulty: 'easy',
    skills: ['estadistica-varianza', 'estadistica-conceptos', 'estadistica-dispersion']
  },
  {
    id: 'm1-prob006-2',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\sigma^2 = \\frac{\\sum(x_i - \\bar{x})^2}{n}',
    questionLatex: '\\text{Para calcular la varianza, primero se calcula la media, luego se:}',
    options: ['Resta la media a cada dato', 'Resta la media, se eleva al cuadrado cada diferencia, y se promedia', 'Suma todos los datos', 'Resta el máximo del mínimo'],
    correctAnswer: 1,
    explanation: '\\text{Varianza} = \\frac{\\sum(x_i - \\bar{x})^2}{n}',
    difficulty: 'medium',
    skills: ['estadistica-varianza', 'estadistica-formula']
  },
  {
    id: 'm1-prob006-3',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\sigma^2 \\geq 0',
    questionLatex: '\\text{¿Puede la varianza ser negativa?}',
    options: ['Sí, siempre', 'Sí, solo si los datos son negativos', 'No, nunca', 'Depende del número de datos'],
    correctAnswer: 2,
    explanation: '\\text{La varianza nunca es negativa porque es la suma de cuadrados (siempre positivos)}',
    difficulty: 'easy',
    skills: ['estadistica-varianza', 'estadistica-conceptos']
  },
  {
    id: 'm1-prob006-4',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Si todos los datos de un conjunto son iguales, la varianza es:}',
    options: ['Igual a la media', 'Igual al rango', 'Cero', 'Uno'],
    correctAnswer: 2,
    explanation: '\\text{Si todos los datos son iguales, no hay dispersión, por lo que la varianza es 0}',
    difficulty: 'easy',
    skills: ['estadistica-varianza', 'estadistica-conceptos']
  },
  // ========================================
  // CÁLCULO DE DESVIACIÓN ESTÁNDAR
  // ========================================
  {
    id: 'm1-prob006-5',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\sigma = \\sqrt{\\sigma^2}',
    questionLatex: '\\text{La desviación estándar es:}',
    options: ['El cuadrado de la varianza', 'La raíz cuadrada de la varianza', 'La mitad de la varianza', 'El doble de la varianza'],
    correctAnswer: 1,
    explanation: '\\sigma = \\sqrt{\\sigma^2}',
    difficulty: 'easy',
    skills: ['estadistica-desviacion-estandar', 'estadistica-varianza']
  },
  {
    id: 'm1-prob006-6',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\bar{x} = 10, \\sigma^2 = 4',
    questionLatex: '\\text{Si la varianza de un conjunto de datos es 4, ¿cuál es la desviación estándar?}',
    options: ['2', '4', '8', '16'],
    correctAnswer: 0,
    explanation: '\\sigma = \\sqrt{4} = 2',
    difficulty: 'easy',
    skills: ['estadistica-desviacion-estandar', 'estadistica-varianza', 'numeros-raices']
  },
  {
    id: 'm1-prob006-7',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\text{Datos: } 2, 4, 4, 4, 6',
    questionLatex: '\\text{Dados los valores: 2, 4, 4, 4, 6. La media es 4. ¿Cuál es la varianza?}',
    options: ['1.2', '1.6', '2.0', '2.4'],
    correctAnswer: 1,
    explanation: '\\sigma^2 = \\frac{(2-4)^2 + (4-4)^2 + (4-4)^2 + (4-4)^2 + (6-4)^2}{5} = \\frac{4+0+0+0+4}{5} = 1.6',
    difficulty: 'medium',
    skills: ['estadistica-varianza', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-prob006-8',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\text{Datos: } 10, 10, 10, 10, 10',
    questionLatex: '\\text{Para los datos: 10, 10, 10, 10, 10, la desviación estándar es:}',
    options: ['0', '1', '10', '50'],
    correctAnswer: 0,
    explanation: '\\text{Todos los datos son iguales, por lo que la desviación estándar es 0}',
    difficulty: 'easy',
    skills: ['estadistica-desviacion-estandar', 'estadistica-conceptos']
  },
  {
    id: 'm1-prob006-9',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\text{Datos: } 1, 2, 3, 4, 5',
    questionLatex: '\\text{Para los datos: 1, 2, 3, 4, 5 (media = 3), ¿cuál es la varianza?}',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation: '\\sigma^2 = \\frac{4+1+0+1+4}{5} = \\frac{10}{5} = 2',
    difficulty: 'medium',
    skills: ['estadistica-varianza', 'numeros-operaciones-basicas']
  },
  // ========================================
  // INTERPRETACIÓN DE DISPERSIÓN
  // ========================================
  {
    id: 'm1-prob006-10',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una desviación estándar alta indica que los datos:}',
    options: ['Están muy cerca de la media', 'Están muy dispersos respecto a la media', 'Todos son iguales', 'La media es muy alta'],
    correctAnswer: 1,
    explanation: '\\text{Una desviación estándar alta significa mayor dispersión de los datos}',
    difficulty: 'easy',
    skills: ['estadistica-desviacion-estandar', 'estadistica-interpretacion', 'estadistica-dispersion']
  },
  {
    id: 'm1-prob006-11',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Si la desviación estándar de las notas de un curso es muy pequeña, significa que:}',
    options: ['Las notas son muy bajas', 'Las notas son muy altas', 'Las notas son muy similares entre sí', 'Hay muchos estudiantes'],
    correctAnswer: 2,
    explanation: '\\text{Desviación pequeña indica que las notas están concentradas cerca de la media}',
    difficulty: 'easy',
    skills: ['estadistica-desviacion-estandar', 'estadistica-interpretacion']
  },
  {
    id: 'm1-prob006-12',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En una distribución normal, aproximadamente el 68\\% de los datos están dentro de:}',
    options: ['La media', '1 desviación estándar de la media', '2 desviaciones estándar de la media', '3 desviaciones estándar de la media'],
    correctAnswer: 1,
    explanation: '\\text{Regla empírica: ~68\\% de datos están entre } \\bar{x} - \\sigma \\text{ y } \\bar{x} + \\sigma',
    difficulty: 'medium',
    skills: ['estadistica-desviacion-estandar', 'estadistica-distribucion-normal']
  },
  // ========================================
  // COMPARACIÓN DE CONJUNTOS DE DATOS
  // ========================================
  {
    id: 'm1-prob006-13',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Grupo A tiene } \\sigma = 5 \\text{ y Grupo B tiene } \\sigma = 12. \\text{ ¿Qué grupo tiene datos más dispersos?}',
    options: ['Grupo A', 'Grupo B', 'Son iguales', 'No se puede determinar'],
    correctAnswer: 1,
    explanation: '\\text{Mayor desviación estándar (12 > 5) indica mayor dispersión}',
    difficulty: 'easy',
    skills: ['estadistica-desviacion-estandar', 'estadistica-comparacion', 'estadistica-dispersion']
  },
  {
    id: 'm1-prob006-14',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Dos conjuntos tienen la misma media de 50. El conjunto A tiene } \\sigma = 3 \\text{ y el B tiene } \\sigma = 8. \\text{ ¿Cuál es más homogéneo?}',
    options: ['Conjunto A', 'Conjunto B', 'Son igual de homogéneos', 'No se puede comparar'],
    correctAnswer: 0,
    explanation: '\\text{Menor desviación estándar indica mayor homogeneidad (datos más similares)}',
    difficulty: 'medium',
    skills: ['estadistica-desviacion-estandar', 'estadistica-comparacion']
  },
  {
    id: 'm1-prob006-15',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Si se agregan 10 unidades a cada dato de un conjunto, la desviación estándar:}',
    options: ['Aumenta en 10', 'Disminuye en 10', 'Se mantiene igual', 'Se duplica'],
    correctAnswer: 2,
    explanation: '\\text{Sumar una constante a todos los datos no cambia la dispersión}',
    difficulty: 'hard',
    skills: ['estadistica-desviacion-estandar', 'estadistica-transformaciones']
  },
  {
    id: 'm1-prob006-16',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Si se multiplican todos los datos por 2, la desviación estándar:}',
    options: ['Se mantiene igual', 'Se multiplica por 2', 'Se multiplica por 4', 'Se divide por 2'],
    correctAnswer: 1,
    explanation: '\\text{Multiplicar por una constante k multiplica la desviación estándar por |k|}',
    difficulty: 'hard',
    skills: ['estadistica-desviacion-estandar', 'estadistica-transformaciones']
  },
  // ========================================
  // COEFICIENTE DE VARIACIÓN
  // ========================================
  {
    id: 'm1-prob006-17',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'CV = \\frac{\\sigma}{\\bar{x}} \\times 100\\%',
    questionLatex: '\\text{El coeficiente de variación (CV) permite comparar:}',
    options: ['Solo medias', 'Solo desviaciones estándar', 'Dispersión relativa de conjuntos con diferentes medias', 'Solo rangos'],
    correctAnswer: 2,
    explanation: 'CV = \\frac{\\sigma}{\\bar{x}} \\times 100\\% \\text{ permite comparar dispersión en diferentes escalas}',
    difficulty: 'medium',
    skills: ['estadistica-coeficiente-variacion', 'estadistica-comparacion']
  },
  {
    id: 'm1-prob006-18',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'CV = \\frac{\\sigma}{\\bar{x}} \\times 100\\%',
    questionLatex: '\\text{Si } \\bar{x} = 50 \\text{ y } \\sigma = 10, \\text{ ¿cuál es el coeficiente de variación?}',
    options: ['5%', '10%', '20%', '50%'],
    correctAnswer: 2,
    explanation: 'CV = \\frac{10}{50} \\times 100\\% = 20\\%',
    difficulty: 'medium',
    skills: ['estadistica-coeficiente-variacion', 'numeros-porcentajes', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-prob006-19',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Grupo A: } \\bar{x} = 100, \\sigma = 15. \\text{ Grupo B: } \\bar{x} = 50, \\sigma = 10. \\text{ ¿Cuál tiene mayor dispersión relativa?}',
    options: ['Grupo A (CV = 15%)', 'Grupo B (CV = 20%)', 'Son iguales', 'Grupo A (CV = 20%)'],
    correctAnswer: 1,
    explanation: 'CV_A = \\frac{15}{100} = 15\\%, \\quad CV_B = \\frac{10}{50} = 20\\%. \\text{ B tiene mayor dispersión relativa}',
    difficulty: 'hard',
    skills: ['estadistica-coeficiente-variacion', 'estadistica-comparacion', 'numeros-porcentajes']
  },
  {
    id: 'm1-prob006-20',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un CV bajo indica que los datos son:}',
    options: ['Muy dispersos', 'Muy homogéneos respecto a la media', 'Todos negativos', 'Muy grandes'],
    correctAnswer: 1,
    explanation: '\\text{Un CV bajo indica poca variabilidad relativa respecto a la media}',
    difficulty: 'easy',
    skills: ['estadistica-coeficiente-variacion', 'estadistica-interpretacion']
  }
];
