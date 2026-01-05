import { Question } from '../../../types';

/**
 * M1-PROB-002: Media, mediana, moda y rango de uno o más grupos de datos
 * Chilean PAES Curriculum - Probability and Statistics Subsection 002
 *
 * This subsection covers:
 * - A: Cálculo de la media aritmética
 * - B: Cálculo de la mediana
 * - C: Cálculo de la moda
 * - D: Cálculo del rango
 * - E: Comparación de grupos de datos
 *
 * Total: 24 questions
 */

export const m1Prob002Questions: Question[] = [
  {
    id: 'm1-8',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una profesora de educación física registra los tiempos en minutos que cuatro estudiantes tardaron en completar una carrera de resistencia. Los tiempos fueron 4, 6, 8 y 10 minutos respectivamente. Para reportar el rendimiento promedio del grupo a la dirección del colegio, la profesora necesita calcular la media aritmética de estos tiempos. ¿Cuál es la media aritmética de los tiempos de los estudiantes?}',
    options: ['6', '7', '8', '9'],
    correctAnswer: 1,
    explanation: '\\bar{x} = \\frac{4 + 6 + 8 + 10}{4} = \\frac{28}{4} = 7',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['estadistica-media', 'numeros-operaciones-basicas', 'numeros-fracciones']
  },
  {
    id: 'm1-22',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un entrenador de básquetbol registró los puntos anotados por un jugador en sus últimos cinco partidos: 3, 7, 5, 9 y 11 puntos. Para evaluar el rendimiento típico del jugador sin que valores extremos afecten el análisis, el entrenador decide calcular la mediana de estos puntajes. ¿Cuál es la mediana de los puntos anotados por el jugador?}',
    options: ['5', '7', '9', '11'],
    correctAnswer: 1,
    explanation: '\\text{Datos ordenados: 3, 5, 7, 9, 11. Mediana} = 7 \\text{ (valor central)}',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['estadistica-mediana', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-23',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una tienda de zapatos registra las tallas vendidas durante una semana: 2, 3, 3, 5, 7, 3 y 9. El gerente quiere identificar la talla más solicitada para asegurar suficiente stock de ese número. Para esto necesita determinar la moda de los datos de ventas. ¿Cuál es la talla que corresponde a la moda de las ventas?}',
    options: ['2', '3', '5', '7'],
    correctAnswer: 1,
    explanation: '\\text{La talla 3 aparece 3 veces, más que cualquier otra. Moda} = 3',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['estadistica-moda']
  },
  {
    id: 'm1-25',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un meteorólogo registra las temperaturas máximas en grados Celsius durante cinco días consecutivos: 12, 8, 15, 20 y 9 grados. Para su reporte climático semanal, necesita calcular el rango de temperaturas, que indica la diferencia entre la temperatura más alta y la más baja. ¿Cuál es el rango de temperaturas registradas durante estos cinco días?}',
    options: ['8', '9', '12', '15'],
    correctAnswer: 2,
    explanation: '\\text{Rango} = \\text{Máximo} - \\text{Mínimo} = 20 - 8 = 12°C',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['estadistica-rango', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-39',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un agricultor pesa las sandías cosechadas en su huerto durante cuatro días consecutivos, obteniendo pesos de 5, 8, 10 y 13 kilogramos respectivamente. Para determinar el peso promedio de las sandías y planificar el transporte al mercado, el agricultor necesita calcular la media de estos pesos. ¿Cuál es el peso promedio de las sandías cosechadas?}',
    options: ['8', '9', '10', '11'],
    correctAnswer: 1,
    explanation: '\\bar{x} = \\frac{5 + 8 + 10 + 13}{4} = \\frac{36}{4} = 9 \\text{ kg}',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['estadistica-media', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-99',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En una biblioteca escolar, se registraron los libros prestados por día durante una semana: 3, 7, 3, 9, 5, 3, 7 y 5 libros. La bibliotecaria necesita identificar cuántos libros se prestan con mayor frecuencia para optimizar el horario de atención. Para esto debe encontrar el dato que más se repite en estos registros. ¿Cuál es el número de libros que se presta con mayor frecuencia?}',
    options: ['3', '5', '7', '9'],
    correctAnswer: 0,
    explanation: '\\text{El 3 aparece 3 veces, más que cualquier otro valor. Moda} = 3',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['estadistica-moda', 'estadistica-frecuencia']
  },
  {
    id: 'm1-100',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un técnico de control de calidad revisa el peso de productos en una línea de producción. Después de analizar las muestras del día, determina que el producto más liviano pesa 12 gramos y el más pesado pesa 48 gramos. Para reportar la variabilidad de los pesos al supervisor, el técnico necesita calcular el rango de estos datos. ¿Cuál es el rango de los pesos de los productos?}',
    options: ['12', '24', '36', '48'],
    correctAnswer: 2,
    explanation: '\\text{Rango} = \\text{Máximo} - \\text{Mínimo} = 48 - 12 = 36 \\text{ gramos}',
    difficulty: 'easy',
    difficultyScore: 0.15,
    skills: ['estadistica-rango', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-101',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una nutricionista registra la cantidad de vasos de agua que beben seis pacientes al día: 2, 4, 6, 8, 10 y 12 vasos respectivamente. Para determinar el consumo típico de agua del grupo sin que valores extremos afecten el resultado, la nutricionista decide calcular la mediana. Como hay un número par de datos, debe promediar los dos valores centrales. ¿Cuál es la mediana del consumo de agua de estos pacientes?}',
    options: ['6', '7', '8', '9'],
    correctAnswer: 1,
    explanation: '\\text{Datos ordenados: 2, 4, 6, 8, 10, 12. Mediana} = \\frac{6 + 8}{2} = 7 \\text{ vasos}',
    difficulty: 'easy',
    difficultyScore: 0.25,
    skills: ['estadistica-mediana', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-102',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una estudiante universitaria revisa sus notas del semestre en cuatro asignaturas diferentes: obtuvo 5.5, 6.0, 4.5 y 6.5 respectivamente. Para saber si mantiene su beca académica, necesita calcular su promedio de notas. El requisito mínimo para conservar la beca es un promedio de 5.5. ¿Cuál es el promedio de notas de la estudiante?}',
    options: ['5.0', '5.5', '5.625', '6.0'],
    correctAnswer: 2,
    explanation: '\\bar{x} = \\frac{5.5 + 6.0 + 4.5 + 6.5}{4} = \\frac{22.5}{4} = 5.625',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['estadistica-media', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-103',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una pastelería registra las ventas de tres tipos de tortas durante un día especial. El gerente sabe que el promedio de ventas fue de 12 unidades por tipo. Revisando los registros, encuentra que vendió 10 tortas de chocolate y 15 tortas de vainilla, pero el registro del tercer sabor está borroso. Para completar el inventario, necesita determinar cuántas tortas del tercer sabor vendió. ¿Cuántas tortas del tercer sabor se vendieron?}',
    options: ['9', '11', '13', '15'],
    correctAnswer: 1,
    explanation: '10 + 15 + x = 36 \\rightarrow x = 36 - 25 = 11',
    difficulty: 'medium',
    difficultyScore: 0.35,
    skills: ['estadistica-media', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-104',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En una oficina trabajan cinco personas con edades de 20, 22, 24, 26 y 28 años. La empresa contrata a un nuevo empleado y el departamento de recursos humanos calcula que el nuevo promedio de edad del equipo es de 25 años. El jefe de personal necesita verificar la edad del nuevo empleado para los registros. ¿Cuál es la edad del nuevo empleado?}',
    options: ['28', '30', '32', '34'],
    correctAnswer: 1,
    explanation: 'x = 150 - 120 = 30',
    difficulty: 'medium',
    difficultyScore: 0.42,
    skills: ['estadistica-media', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-105',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un kiosco registra la cantidad de helados vendidos durante cinco días de la semana: lunes vendió 15, martes 8, miércoles 23, jueves 12 y viernes 19 helados. El dueño quiere conocer el valor central de sus ventas sin que los días extremos afecten el análisis. Para esto decide calcular la mediana de las ventas diarias. ¿Cuál es la mediana de helados vendidos?}',
    options: ['12', '15', '17', '19'],
    correctAnswer: 1,
    explanation: '\\text{Ordenados: 8, 12, 15, 19, 23. Mediana} = 15',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['estadistica-mediana', 'numeros-orden']
  },
  {
    id: 'm1-106',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una florería registra las ventas de ramos durante seis días: 4, 7, 9, 11, 13 y 15 ramos vendidos respectivamente. La dueña necesita determinar el valor típico de ventas sin que los extremos influyan demasiado. Como tiene un número par de datos, debe promediar los dos valores centrales para obtener la mediana. ¿Cuál es la mediana de ramos vendidos?}',
    options: ['9', '10', '11', '12'],
    correctAnswer: 1,
    explanation: '\\text{Mediana} = \\frac{9 + 11}{2} = 10',
    difficulty: 'easy',
    difficultyScore: 0.25,
    skills: ['estadistica-mediana', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-107',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una pequeña empresa tiene siete empleados con sueldos mensuales de 500, 520, 540, 560, 580, 600 y 1200 miles de pesos. El gerente general tiene el sueldo más alto y quiere reportar un indicador que represente el sueldo típico de la empresa de manera justa. El sindicato le pide usar una medida que no se vea distorsionada por valores extremos. ¿Qué medida de tendencia central sería más representativa?}',
    options: ['Media', 'Mediana', 'Moda', 'Rango'],
    correctAnswer: 1,
    explanation: '\\text{Mediana} = 560 \\text{ (más representativa que media} \\approx 643)',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['estadistica-mediana', 'estadistica-media', 'estadistica-interpretacion']
  },
  {
    id: 'm1-108',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un profesor de música pregunta a sus estudiantes cuántos instrumentos saben tocar. Las respuestas fueron: 1, 2, 2, 3, 3, 3, 4, 4 y 5 instrumentos. El profesor quiere identificar la cantidad de instrumentos que más frecuentemente dominan sus estudiantes para planificar las actividades del taller. Para esto necesita determinar la moda del conjunto. ¿Cuántos instrumentos corresponden a la moda?}',
    options: ['2', '3', '4', 'No hay moda'],
    correctAnswer: 1,
    explanation: '\\text{El 3 aparece 3 veces, más que cualquier otro. Moda} = 3',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['estadistica-moda', 'estadistica-frecuencia']
  },
  {
    id: 'm1-109',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un gimnasio registra la cantidad de repeticiones que ocho personas completaron en un ejercicio de resistencia: 5, 7, 5, 9, 7, 3, 5 y 7 repeticiones. El entrenador observa que hay más de un valor que se repite con mayor frecuencia y quiere clasificar correctamente la distribución. Para esto necesita contar cuántas modas tiene el conjunto de datos. ¿Cuántas modas tiene este conjunto?}',
    options: ['0', '1', '2', '3'],
    correctAnswer: 2,
    explanation: '\\text{El 5 aparece 3 veces y el 7 aparece 3 veces. Dos modas: 5 y 7}',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['estadistica-moda', 'estadistica-frecuencia']
  },
  {
    id: 'm1-110',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En una encuesta de opinión, un investigador registra las edades de cinco participantes: 23, 31, 45, 52 y 67 años. Cada edad aparece exactamente una vez en los datos recopilados. El investigador necesita reportar la moda del conjunto para su informe estadístico. Cuando todos los valores de un conjunto aparecen con la misma frecuencia, ¿qué se puede afirmar sobre la moda?}',
    options: ['La moda es el valor mayor', 'La moda es el valor menor', 'La moda es el promedio', 'No hay moda'],
    correctAnswer: 3,
    explanation: '\\text{No hay moda cuando todos los valores tienen la misma frecuencia}',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['estadistica-moda', 'estadistica-conceptos']
  },
  {
    id: 'm1-111',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una máquina expendedora dispensa café en vasos de 10 onzas. Un técnico mide cinco vasos consecutivos y obtiene exactamente 10 onzas en cada uno: 10, 10, 10, 10 y 10. El supervisor le pide calcular las medidas de tendencia central para verificar la calibración. Cuando todos los datos de un conjunto son idénticos, ¿qué afirmación es verdadera sobre las medidas de tendencia central?}',
    options: ['Media = Mediana = Moda', 'Solo Media = Moda', 'Solo Media = Mediana', 'Todas son diferentes'],
    correctAnswer: 0,
    explanation: '\\text{Cuando todos los datos son iguales: Media} = \\text{Mediana} = \\text{Moda} = 10',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['estadistica-media', 'estadistica-mediana', 'estadistica-moda', 'estadistica-conceptos']
  },
  {
    id: 'm1-112',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una profesora de matemáticas califica cinco tareas de un estudiante con puntajes de 2, 3, 4, 5 y 6 puntos respectivamente. El estudiante quiere verificar que su nota final se calculó correctamente y decide calcular tanto la media como la mediana de sus puntajes. Observa que los datos están distribuidos simétricamente. ¿Cuál afirmación es correcta sobre estas medidas?}',
    options: ['Media = Mediana = 4', 'Media = 4, Mediana = 5', 'Media = 5, Mediana = 4', 'Media = Mediana = 5'],
    correctAnswer: 0,
    explanation: '\\text{Media} = \\frac{2+3+4+5+6}{5} = \\frac{20}{5} = 4, \\quad \\text{Mediana} = 4 \\text{ (valor central)}',
    difficulty: 'easy',
    difficultyScore: 0.25,
    skills: ['estadistica-media', 'estadistica-mediana', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-113',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un economista analiza los ingresos mensuales de los habitantes de un barrio y encuentra que la media de ingresos es significativamente mayor que la mediana. Esto ocurre porque algunos residentes tienen ingresos muy altos que elevan el promedio, mientras que la mayoría gana montos más moderados. En términos estadísticos, cuando la media es mucho mayor que la mediana, ¿qué indica esto sobre la distribución de los datos?}',
    options: ['Datos simétricos', 'Datos sesgados hacia la izquierda', 'Datos sesgados hacia la derecha', 'No se puede determinar'],
    correctAnswer: 2,
    explanation: '\\text{Hay valores extremos altos (cola derecha) que elevan la media por encima de la mediana}',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['estadistica-media', 'estadistica-mediana', 'estadistica-interpretacion']
  },
  {
    id: 'm1-114',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un curso tiene cinco estudiantes con notas de 50, 60, 70, 80 y 90 puntos en un examen. Llega un nuevo estudiante que rindió el mismo examen en otra sección y obtuvo 100 puntos, la nota máxima posible. El profesor necesita recalcular el promedio del grupo incluyendo al nuevo integrante. ¿Qué ocurre con la media del curso al agregar este nuevo estudiante?}',
    options: ['Disminuye', 'Se mantiene igual', 'Aumenta', 'Se duplica'],
    correctAnswer: 2,
    explanation: '\\text{Media original} = 70, \\quad \\text{Nueva media} = \\frac{450}{6} = 75. \\text{ La media aumenta}',
    difficulty: 'easy',
    difficultyScore: 0.32,
    skills: ['estadistica-media', 'estadistica-interpretacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-115',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una estudiante de secundaria revisa sus promedios parciales del semestre en matemáticas: obtuvo 5.0 en el primer parcial, 6.0 en el segundo y 7.0 en el tercero. El colegio calcula la nota final como el promedio simple de los tres parciales sin ponderación especial. La estudiante quiere saber si aprobará con promedio 6.0 o más. ¿Cuál es su promedio final del semestre?}',
    options: ['5.5', '6.0', '6.5', '7.0'],
    correctAnswer: 1,
    explanation: '\\bar{x} = \\frac{5.0 + 6.0 + 7.0}{3} = \\frac{18.0}{3} = 6.0',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['estadistica-media', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-116',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una estación meteorológica registra las temperaturas máximas durante una semana: lunes 20°C, martes 22°C, miércoles 21°C, jueves 23°C, viernes 22°C, sábado 24°C y domingo 22°C. El meteorólogo quiere reportar la temperatura que se presentó con mayor frecuencia durante la semana para su boletín informativo. ¿Cuál fue la temperatura más frecuente registrada?}',
    options: ['20°C', '21°C', '22°C', '23°C'],
    correctAnswer: 2,
    explanation: '\\text{La temperatura de 22°C aparece 3 veces, más que cualquier otra. Moda} = 22°C',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['estadistica-moda', 'estadistica-frecuencia']
  },
  {
    id: 'm1-117',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un entrenador de atletismo registra los tiempos en segundos de seis corredores en una carrera de velocidad: 15, 23, 18, 32, 27 y 19 segundos. Para evaluar qué tan dispersos están los tiempos del grupo, el entrenador decide calcular el rango, que mide la diferencia entre el tiempo más lento y el más rápido. ¿Cuál es el rango de los tiempos de los corredores?}',
    options: ['15 segundos', '17 segundos', '19 segundos', '32 segundos'],
    correctAnswer: 1,
    explanation: '\\text{Rango} = 32 - 15 = 17 \\text{ segundos}',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['estadistica-rango', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-118',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un técnico de control de calidad mide el peso de varias piezas idénticas producidas por una máquina de precisión. Al calcular el rango de los pesos, obtiene un valor de cero. El supervisor le pide interpretar este resultado para el reporte de producción. Cuando el rango de un conjunto de datos es exactamente cero, ¿qué significa esto sobre los datos?}',
    options: ['Todos los datos son cero', 'Todos los datos son iguales', 'No hay datos en el conjunto', 'Hay un error en el cálculo'],
    correctAnswer: 1,
    explanation: '\\text{Rango} = 0 \\text{ significa que Máximo} = \\text{Mínimo, por lo tanto todos los datos son iguales}',
    difficulty: 'easy',
    difficultyScore: 0.15,
    skills: ['estadistica-rango', 'estadistica-conceptos']
  },
  {
    id: 'm1-119',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Dos grupos de estudiantes participan en un concurso de matemáticas. El grupo A obtuvo puntajes de 10, 15 y 20 puntos, mientras que el grupo B obtuvo 5, 15 y 30 puntos. Un juez quiere determinar cuál grupo tuvo resultados más dispersos, es decir, con mayor variabilidad entre el puntaje más bajo y el más alto. ¿Cuál grupo tiene mayor dispersión en sus puntajes?}',
    options: ['Grupo A', 'Grupo B', 'Tienen igual dispersión', 'No se puede determinar'],
    correctAnswer: 1,
    explanation: '\\text{Rango}_A = 20 - 10 = 10, \\quad \\text{Rango}_B = 30 - 5 = 25. \\text{ Grupo B tiene mayor dispersión}',
    difficulty: 'easy',
    difficultyScore: 0.32,
    skills: ['estadistica-rango', 'estadistica-dispersion', 'numeros-operaciones-basicas']
  },

  // ========================================
  // ADDITIONAL QUESTIONS - SUBSECTION A: MEDIA
  // ========================================
  {
    id: 'm1-prob-002-a-001',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un estudiante de enseñanza media revisa sus calificaciones del primer semestre en cinco asignaturas: Lenguaje 4.5, Matemáticas 5.0, Historia 6.0, Ciencias 5.5 e Inglés 4.0. Para postular a una beca de excelencia académica, necesita calcular su promedio general. El requisito mínimo es un promedio de 5.0 para ser considerado. ¿Cuál es el promedio de notas del estudiante?}',
    options: ['4.8', '5.0', '5.2', '5.5'],
    correctAnswer: 1,
    explanation: '\\bar{x} = \\frac{4.5+5.0+6.0+5.5+4.0}{5} = \\frac{25}{5} = 5.0',
    difficulty: 'easy',
    difficultyScore: 0.25,
    skills: ['estadistica-media', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-prob-002-a-002',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una cooperativa agrícola registra la producción de cinco parcelas de cultivo. El administrador sabe que la producción promedio fue de 20 toneladas por parcela. Revisando los registros, encuentra que cuatro parcelas produjeron 15, 18, 22 y 25 toneladas, pero el dato de la quinta parcela se extravió. Para completar el inventario anual, necesita determinar la producción de esa parcela. ¿Cuántas toneladas produjo la quinta parcela?}',
    options: ['15', '18', '20', '22'],
    correctAnswer: 2,
    explanation: '5 \\times 20 = 100. \\quad 15+18+22+25 = 80. \\quad x = 100 - 80 = 20 \\text{ toneladas}',
    difficulty: 'medium',
    difficultyScore: 0.40,
    skills: ['estadistica-media', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-prob-002-a-003',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un gerente de ventas decide otorgar un bono de 5 puntos adicionales a todos los vendedores en su evaluación de desempeño mensual. Antes del ajuste, el equipo tenía una calificación promedio determinada. Un analista de recursos humanos estudia cómo este ajuste afecta las estadísticas del grupo. Si a cada dato de un conjunto se le suma la misma cantidad, ¿qué ocurre con la media del conjunto?}',
    options: ['Disminuye en esa cantidad', 'Se mantiene igual', 'Aumenta en esa cantidad', 'Se duplica'],
    correctAnswer: 2,
    explanation: '\\text{Cuando se suma una constante a todos los datos, la media también aumenta en esa misma cantidad}',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['estadistica-media', 'estadistica-propiedades']
  },
  {
    id: 'm1-prob-002-a-004',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un grupo de cuatro amigos planea un viaje de egresados. El promedio de edad del grupo es de 15 años. Se une al grupo un quinto amigo que tiene 20 años y quiere participar del viaje. El organizador necesita recalcular la edad promedio del grupo para los requisitos del tour operador. ¿Cuál es el nuevo promedio de edad del grupo de cinco amigos?}',
    options: ['15 años', '16 años', '17 años', '18 años'],
    correctAnswer: 1,
    explanation: '\\text{Suma original} = 4 \\times 15 = 60. \\text{ Nueva suma} = 60 + 20 = 80. \\text{ Nuevo promedio} = \\frac{80}{5} = 16 \\text{ años}',
    difficulty: 'medium',
    difficultyScore: 0.42,
    skills: ['estadistica-media', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-prob-002-a-005',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una empresa de tecnología decide duplicar el salario de todos sus empleados como parte de un programa de retención de talento. Un analista financiero estudia cómo este cambio afecta las estadísticas salariales de la compañía. Antes del aumento, la empresa tenía un salario promedio determinado. Si cada dato de un conjunto se multiplica por un factor constante, ¿qué ocurre con la media?}',
    options: ['Se mantiene igual', 'Se multiplica por el mismo factor', 'Se reduce a la mitad', 'Se cuadruplica'],
    correctAnswer: 1,
    explanation: '\\text{Cuando cada dato se multiplica por una constante, la media también se multiplica por esa misma constante}',
    difficulty: 'medium',
    difficultyScore: 0.40,
    skills: ['estadistica-media', 'estadistica-propiedades']
  },

  // ========================================
  // ADDITIONAL QUESTIONS - SUBSECTION B: MEDIANA
  // ========================================
  {
    id: 'm1-prob-002-b-001',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una veterinaria registra el peso en kilogramos de siete mascotas que atendió durante un día: 12, 5, 8, 15, 9, 11 y 7 kilogramos. Para su reporte mensual, la veterinaria necesita calcular la mediana de los pesos atendidos. Primero debe ordenar los datos de menor a mayor y luego identificar el valor central. ¿Cuál es la mediana del peso de las mascotas?}',
    options: ['8 kg', '9 kg', '10 kg', '11 kg'],
    correctAnswer: 1,
    explanation: '\\text{Ordenados: 5, 7, 8, 9, 11, 12, 15. Mediana} = 9 \\text{ kg (valor central)}',
    difficulty: 'easy',
    difficultyScore: 0.25,
    skills: ['estadistica-mediana', 'numeros-orden']
  },
  {
    id: 'm1-prob-002-b-002',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una tienda de bicicletas registra los precios en miles de pesos de seis modelos en exhibición: 3, 8, 12, 15, 20 y 25 mil pesos. El gerente necesita determinar el precio mediano para una campaña publicitaria que destaque los precios accesibles. Como tiene un número par de datos, debe promediar los dos valores centrales. ¿Cuál es la mediana de los precios de las bicicletas?}',
    options: ['12 mil', '13.5 mil', '15 mil', '16.5 mil'],
    correctAnswer: 1,
    explanation: '\\text{Datos ya ordenados. Mediana} = \\frac{12+15}{2} = 13.5 \\text{ mil pesos}',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['estadistica-mediana', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-prob-002-b-003',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un investigador social recopila las edades de 21 participantes en un estudio sobre hábitos de consumo. Después de ordenar las edades de menor a mayor, necesita identificar la mediana del grupo para segmentar el análisis. Para un conjunto con cantidad impar de datos, la mediana es el valor que ocupa la posición central. ¿En qué posición se encuentra la mediana de este conjunto de 21 datos?}',
    options: ['Posición 10', 'Posición 11', 'Posición 12', 'Posición 21'],
    correctAnswer: 1,
    explanation: '\\text{Posición de la mediana} = \\frac{21+1}{2} = 11',
    difficulty: 'medium',
    difficultyScore: 0.35,
    skills: ['estadistica-mediana', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-prob-002-b-004',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una economista analiza los precios de viviendas en un barrio donde la mayoría de las casas cuesta entre 80 y 120 millones de pesos, pero hay una mansión de 800 millones que eleva significativamente el promedio. Para reportar un precio representativo del barrio, la economista debe elegir la medida estadística más apropiada. ¿En qué situación es preferible usar la mediana en lugar de la media?}',
    options: ['Cuando los datos son simétricos', 'Cuando hay valores extremos (outliers)', 'Cuando hay pocos datos', 'Cuando todos los datos son iguales'],
    correctAnswer: 1,
    explanation: '\\text{La mediana no se ve afectada por valores extremos, representando mejor el valor típico}',
    difficulty: 'medium',
    difficultyScore: 0.40,
    skills: ['estadistica-mediana', 'estadistica-conceptos', 'estadistica-interpretacion']
  },
  {
    id: 'm1-prob-002-b-005',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una ONG registra las donaciones recibidas de cinco empresas durante una campaña solidaria: 100, 200, 300, 400 y 10.000 mil pesos. Una empresa grande hizo una donación extraordinaria muy superior a las demás. Para reportar la donación típica recibida sin que el valor extremo distorsione la información, el coordinador debe elegir la medida más representativa. ¿Cuál medida de tendencia central representa mejor las donaciones típicas?}',
    options: ['Media (2.200 mil)', 'Mediana (300 mil)', 'Moda (ninguna)', 'Rango (9.900 mil)'],
    correctAnswer: 1,
    explanation: '\\text{La mediana (300) no se ve afectada por el valor extremo de 10.000}',
    difficulty: 'hard',
    difficultyScore: 0.55,
    skills: ['estadistica-mediana', 'estadistica-media', 'estadistica-interpretacion']
  },

  // ========================================
  // ADDITIONAL QUESTIONS - SUBSECTION C: MODA
  // ========================================
  {
    id: 'm1-prob-002-c-001',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una tienda de ropa deportiva registra las tallas de camisetas vendidas durante un fin de semana: S, M, M, L, M, S, M, XL y M. El encargado de inventario necesita identificar la talla más vendida para hacer un pedido de reposición y evitar quedarse sin stock. Para esto debe determinar la talla modal de las ventas. ¿Cuál es la talla modal de las camisetas vendidas?}',
    options: ['S', 'M', 'L', 'XL'],
    correctAnswer: 1,
    explanation: '\\text{La talla M aparece 5 veces, más que cualquier otra. Moda} = M',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['estadistica-moda', 'estadistica-frecuencia']
  },
  {
    id: 'm1-prob-002-c-002',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un profesor de educación física registra las vueltas completadas por seis estudiantes en una clase de resistencia: 2, 4, 4, 6, 6 y 8 vueltas. Al analizar los datos, el profesor nota que hay más de un valor que se repite con la máxima frecuencia. Para clasificar correctamente esta distribución según la cantidad de modas, ¿qué tipo de distribución representan estos datos?}',
    options: ['Unimodal', 'Bimodal', 'Trimodal', 'Amodal'],
    correctAnswer: 1,
    explanation: '\\text{Tiene dos modas (4 y 6, cada una aparece 2 veces), por lo que es bimodal}',
    difficulty: 'easy',
    difficultyScore: 0.25,
    skills: ['estadistica-moda', 'estadistica-conceptos']
  },
  {
    id: 'm1-prob-002-c-003',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una empresa de marketing realiza una encuesta sobre el color favorito de los consumidores para diseñar un nuevo empaque. Los colores son categorías (rojo, azul, verde, etc.) y no tienen un orden numérico natural. Para este tipo de datos, calcular la media o mediana no tiene sentido matemático. El analista debe elegir la medida de tendencia central más apropiada. ¿Para qué tipo de datos es especialmente útil la moda?}',
    options: ['Datos numéricos solamente', 'Datos con distribución simétrica', 'Datos cualitativos (categorías)', 'Datos con outliers'],
    correctAnswer: 2,
    explanation: '\\text{La moda puede usarse con datos cualitativos, donde media y mediana no tienen sentido}',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['estadistica-moda', 'estadistica-conceptos']
  },
  {
    id: 'm1-prob-002-c-004',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{El centro de estudiantes de un colegio realiza una votación para elegir el destino del paseo de fin de año. Se presentan tres opciones: opción A recibe 35 votos, opción B recibe 42 votos y opción C recibe 23 votos. Los organizadores necesitan identificar la opción ganadora, que corresponde a la opción modal de la votación. ¿Cuál es la opción modal en esta votación?}',
    options: ['Opción A', 'Opción B', 'Opción C', 'No hay moda'],
    correctAnswer: 1,
    explanation: '\\text{La opción B tiene la mayor frecuencia (42 votos), por lo que es la moda}',
    difficulty: 'easy',
    difficultyScore: 0.20,
    skills: ['estadistica-moda', 'estadistica-frecuencia']
  },
  {
    id: 'm1-prob-002-c-005',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un jardín infantil registra las edades de diez niños: hay dos niños de 1 año, dos de 2 años, dos de 3 años, dos de 4 años y dos de 5 años. La directora quiere identificar la edad más común para planificar las actividades. Al revisar los datos (1, 1, 2, 2, 3, 3, 4, 4, 5, 5), observa que cada edad aparece exactamente dos veces. ¿Qué se puede afirmar sobre la moda de este conjunto?}',
    options: ['La moda es 3', 'Hay 5 modas', 'No hay moda', 'La moda es 2.5'],
    correctAnswer: 2,
    explanation: '\\text{Todos los valores aparecen la misma cantidad de veces (2), por lo que no hay moda}',
    difficulty: 'medium',
    difficultyScore: 0.35,
    skills: ['estadistica-moda', 'estadistica-conceptos']
  },

  // ========================================
  // ADDITIONAL QUESTIONS - SUBSECTION D: RANGO
  // ========================================
  {
    id: 'm1-prob-002-d-001',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una empresa familiar tiene seis empleados con edades de 25, 30, 35, 28, 45 y 22 años. El departamento de recursos humanos necesita conocer la variabilidad de edades del equipo para planificar programas de capacitación apropiados. Para esto calculan el rango, que mide la diferencia entre la edad mayor y la menor. ¿Cuál es el rango de edades de los empleados?}',
    options: ['20 años', '23 años', '25 años', '45 años'],
    correctAnswer: 1,
    explanation: '\\text{Rango} = 45 - 22 = 23 \\text{ años}',
    difficulty: 'easy',
    difficultyScore: 0.20,
    skills: ['estadistica-rango', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-prob-002-d-002',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un laboratorio registra las temperaturas de almacenamiento de vacunas durante un mes. El supervisor reporta que la temperatura mínima registrada fue de 15 grados y que el rango de temperaturas fue de 40 grados. Un auditor de calidad necesita verificar cuál fue la temperatura máxima alcanzada para evaluar si las vacunas se mantuvieron en condiciones seguras. ¿Cuál fue la temperatura máxima registrada?}',
    options: ['40 grados', '45 grados', '50 grados', '55 grados'],
    correctAnswer: 3,
    explanation: '\\text{Máximo} = \\text{Mínimo} + \\text{Rango} = 15 + 40 = 55 \\text{ grados}',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['estadistica-rango', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-prob-002-d-003',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un profesor de estadística explica a sus estudiantes las diferentes medidas de dispersión. Al hablar del rango, menciona que aunque es fácil de calcular, tiene una limitación importante que los estudiantes deben conocer para interpretar correctamente los datos. Esta limitación hace que el rango pueda dar una idea incompleta de cómo están distribuidos los datos. ¿Cuál es la principal limitación del rango como medida de dispersión?}',
    options: ['Es difícil de calcular', 'Solo considera dos valores extremos', 'No se puede usar con decimales', 'Siempre da resultado cero'],
    correctAnswer: 1,
    explanation: '\\text{El rango solo usa el máximo y mínimo, ignorando cómo están distribuidos los demás datos}',
    difficulty: 'medium',
    difficultyScore: 0.42,
    skills: ['estadistica-rango', 'estadistica-conceptos']
  },
  {
    id: 'm1-prob-002-d-004',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una granja de cultivos orgánicos monitorea la temperatura ambiente durante una semana para asegurar condiciones óptimas de crecimiento. Las temperaturas registradas fueron: lunes 18°C, martes 20°C, miércoles 19°C, jueves 22°C, viernes 21°C, sábado 20°C y domingo 19°C. El agrónomo necesita calcular la variación de temperatura para su reporte de condiciones climáticas. ¿Cuál es el rango de temperatura de la semana?}',
    options: ['2°C', '3°C', '4°C', '5°C'],
    correctAnswer: 2,
    explanation: '\\text{Rango} = 22 - 18 = 4°C',
    difficulty: 'easy',
    difficultyScore: 0.20,
    skills: ['estadistica-rango', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-prob-002-d-005',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un test tiene máximo 100 y el rango de notas fue 60. Si la nota mínima fue 35, ¿se usó todo el rango del test?}',
    options: ['Sí, porque el rango es 60', 'No, porque la mínima no es 0', 'No, porque la máxima sería 95, no 100', 'No se puede determinar'],
    correctAnswer: 2,
    explanation: '\\text{Máximo} = 35 + 60 = 95, \\text{ no 100. No se usó todo el rango}',
    difficulty: 'hard',
    difficultyScore: 0.55,
    skills: ['estadistica-rango', 'numeros-operaciones-basicas', 'estadistica-interpretacion']
  },

  // ========================================
  // ADDITIONAL QUESTIONS - SUBSECTION E: COMPARACIÓN
  // ========================================
  {
    id: 'm1-prob-002-e-001',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un director académico compara el rendimiento de dos secciones del mismo curso. La Clase A tiene una media de notas de 6.5 con un rango de 3 puntos, mientras que la Clase B tiene la misma media de 6.5 pero con un rango de 5 puntos. El director quiere identificar cuál clase tiene un rendimiento más consistente entre sus estudiantes. ¿Qué clase tiene notas más homogéneas?}',
    options: ['Clase A', 'Clase B', 'Son iguales', 'No se puede determinar'],
    correctAnswer: 0,
    explanation: '\\text{La Clase A tiene menor rango (3 < 5), indicando notas más homogéneas y consistentes}',
    difficulty: 'easy',
    difficultyScore: 0.30,
    skills: ['estadistica-comparacion-grupos', 'estadistica-rango', 'estadistica-media']
  },
  {
    id: 'm1-prob-002-e-002',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un analista deportivo compara dos equipos de fútbol que tienen el mismo promedio de goles por partido: 2.5 goles. Sin embargo, la moda del Equipo A es 3 goles mientras que la moda del Equipo B es 1 gol. El analista necesita interpretar qué significa esta diferencia en las modas para su columna deportiva. ¿Qué indica la diferencia en las modas de estos equipos?}',
    options: ['Equipo A anota más frecuentemente 3 goles', 'Equipo B es más consistente', 'Tienen el mismo rendimiento', 'No se puede comparar'],
    correctAnswer: 0,
    explanation: '\\text{La moda indica el resultado más frecuente: Equipo A anota 3 goles más frecuentemente}',
    difficulty: 'medium',
    difficultyScore: 0.40,
    skills: ['estadistica-comparacion-grupos', 'estadistica-moda', 'estadistica-media']
  },
  {
    id: 'm1-prob-002-e-003',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Tienda A: ventas diarias con media 50 y mediana 48. Tienda B: media 50 y mediana 55. ¿Cuál tiene más días con ventas bajas?}',
    options: ['Tienda A', 'Tienda B', 'Son iguales', 'No se puede determinar'],
    correctAnswer: 0,
    explanation: '\\text{En Tienda A, media > mediana indica más días con ventas bajas y algunos días con ventas muy altas}',
    difficulty: 'hard',
    difficultyScore: 0.58,
    skills: ['estadistica-comparacion-grupos', 'estadistica-media', 'estadistica-mediana', 'estadistica-interpretacion']
  },
  {
    id: 'm1-prob-002-e-004',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una fábrica tiene dos turnos de producción. El Turno A produjo 10, 20 y 30 unidades en tres días, mientras que el Turno B produjo 18, 20 y 22 unidades en los mismos tres días. Ambos turnos tienen la misma producción promedio de 20 unidades diarias. El supervisor quiere determinar cuál turno tiene producción más variable para planificar mejor los recursos. ¿Cuál turno tiene producción más dispersa?}',
    options: ['Turno A (rango 20)', 'Turno B (rango 4)', 'Son iguales', 'No se puede comparar'],
    correctAnswer: 0,
    explanation: '\\text{Rango}_A = 30 - 10 = 20, \\quad \\text{Rango}_B = 22 - 18 = 4. \\text{ Turno A es más disperso}',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['estadistica-comparacion-grupos', 'estadistica-rango', 'estadistica-media']
  },
  {
    id: 'm1-prob-002-e-005',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un estudiante de estadística analiza dos conjuntos de datos de ventas de diferentes tiendas. Descubre que ambos conjuntos tienen exactamente la misma media, mediana y moda. El estudiante se pregunta si esto significa que los conjuntos de datos son idénticos o si podrían existir diferencias que estas medidas no capturan. ¿Se puede afirmar que dos conjuntos con la misma media, mediana y moda son idénticos?}',
    options: ['Sí, siempre son idénticos', 'No necesariamente', 'Solo si tienen el mismo rango', 'Solo si tienen el mismo tamaño'],
    correctAnswer: 1,
    explanation: '\\text{Pueden tener los mismos indicadores centrales pero diferente dispersión, rango o cantidad de datos}',
    difficulty: 'hard',
    difficultyScore: 0.60,
    skills: ['estadistica-comparacion-grupos', 'estadistica-conceptos']
  },
  {
    id: 'm1-prob-002-e-006',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una competencia de robótica tiene dos equipos participantes. El Equipo Alfa tiene 5 integrantes y el Equipo Beta tiene 8 integrantes. El juez quiere comparar el rendimiento de ambos equipos de manera justa, pero no puede simplemente sumar los puntajes porque los equipos tienen diferente cantidad de miembros. ¿Qué medida estadística permite comparar de manera equitativa el rendimiento de grupos con diferente número de integrantes?}',
    options: ['La suma de los puntajes', 'La media de los puntajes', 'El valor máximo', 'El rango de puntajes'],
    correctAnswer: 1,
    explanation: '\\text{La media permite comparar grupos de diferente tamaño de forma equitativa}',
    difficulty: 'medium',
    difficultyScore: 0.42,
    skills: ['estadistica-comparacion-grupos', 'estadistica-media', 'estadistica-conceptos']
  }
];
