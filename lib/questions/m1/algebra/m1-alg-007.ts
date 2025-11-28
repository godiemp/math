import { Question } from '../../../types';

/**
 * M1-ALG-007: Función cuadrática
 * Chilean PAES Curriculum - Algebra Subsection 007
 *
 * This subsection covers:
 * - Quadratic functions: f(x) = ax² + bx + c (a ≠ 0)
 * - Evaluating quadratic functions
 * - Vertex form and standard form
 * - Parabola characteristics (vertex, axis of symmetry, opening)
 * - Zeros/roots of quadratic functions
 * - Domain and range of quadratic functions
 * - Applications and word problems
 *
 * Total: 13 questions
 */
export const m1Alg007Questions: Question[] = [
  {
    id: 'm1-32',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = x^2 - 1',
    questionLatex: '\\text{Un parque de diversiones diseña una montaña rusa cuya altura en metros se modela con la función } f(x) = x^2 - 1, \\text{ donde x representa la distancia horizontal en decenas de metros desde el punto de partida. Un ingeniero necesita calcular la altura exacta cuando el carrito está a 3 decenas de metros (30 metros) del inicio. ¿Cuál es el valor de } f(3)?',
    options: ['6', '7', '8', '9'],
    correctAnswer: 2,
    explanation: 'f(3) = 3^2 - 1 = 9 - 1 = 8',
    difficulty: 'easy',
    skills: ['algebra-funciones', 'algebra-evaluacion-funciones', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-170',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'g(x) = x^2',
    questionLatex: '\\text{Un físico estudia la energía cinética de partículas usando la función } g(x) = x^2, \\text{ donde x representa la velocidad de la partícula. El experimento solo mide velocidades específicas: -2, -1, 0, 1, y 2 metros por segundo, que conforman el dominio. El físico necesita identificar todos los valores posibles de energía (el rango) que puede obtener con estas velocidades. ¿Cuál es el rango de la función?}',
    options: ['\\{0, 1, 2, 4\\}', '\\{-2, -1, 0, 1, 2\\}', '\\{0, 1, 4\\}', '\\{1, 2, 4\\}'],
    correctAnswer: 2,
    explanation: 'g(-2) = 4, g(-1) = 1, g(0) = 0, g(1) = 1, g(2) = 4 \\quad \\Rightarrow \\quad \\text{Rango} = \\{0, 1, 4\\}',
    difficulty: 'medium',
    skills: ['algebra-funciones', 'algebra-dominio-rango', 'algebra-evaluacion-funciones', 'numeros-potencias']
  },
  {
    id: 'm1-173',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'h(x) = ax^2 + bx + c \\text{ con } a \\neq 0',
    questionLatex: '\\text{Carlos es estudiante de matemáticas y analiza una función con la forma } h(x) = ax^2 + bx + c, \\text{ donde a, b y c son constantes y específicamente a es diferente de cero. Su profesor le pregunta qué tipo de función está estudiando, basándose en su estructura algebraica. Carlos necesita clasificar correctamente esta función. ¿Qué tipo de función es?}',
    options: ['Función lineal', 'Función cuadrática', 'Función constante', 'Función exponencial'],
    correctAnswer: 1,
    explanation: 'h(x) = ax^2 + bx + c \\text{ es cuadrática porque el término de mayor grado es } x^2',
    difficulty: 'medium',
    skills: ['algebra-funciones', 'algebra-funciones-cuadraticas']
  },
  {
    id: 'm1-176',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'f(x) = -x^2 + 4',
    questionLatex: '\\text{Un arqueólogo estudia la trayectoria de una flecha antigua disparada verticalmente. La altura de la flecha en metros se modela con } f(x) = -x^2 + 4, \\text{ donde x representa el tiempo en segundos. La flecha sigue una trayectoria parabólica y el arqueólogo necesita determinar cuál es la altura máxima que alcanza. ¿Cuál es el valor máximo de la función?}',
    options: ['0', '2', '4', 'No tiene máximo'],
    correctAnswer: 2,
    explanation: 'f(0) = -(0)^2 + 4 = 4 \\text{ es el valor máximo porque } -x^2 \\leq 0 \\text{ para todo } x',
    difficulty: 'hard',
    skills: ['algebra-funciones', 'algebra-dominio-rango', 'algebra-funciones-cuadraticas', 'numeros-potencias']
  },
  {
    id: 'm1-192',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'x^2 - 5x + 6 = 0',
    questionLatex: '\\text{Una empresa de publicidad diseña un cartel rectangular. El área del cartel está determinada por la ecuación } x^2 - 5x + 6 = 0, \\text{ donde x representa una dimensión característica en metros. Para que el diseño sea válido, necesitan encontrar los valores de x que hacen que esta expresión sea igual a cero. El diseñador gráfico debe resolver la ecuación. ¿Cuáles son los valores de x?}',
    options: ['x = 2 \\text{ o } x = 3', 'x = 1 \\text{ o } x = 6', 'x = -2 \\text{ o } x = -3', 'x = 5 \\text{ o } x = 6'],
    correctAnswer: 0,
    explanation: 'x^2 - 5x + 6 = (x - 2)(x - 3) = 0 \\quad \\Rightarrow \\quad x = 2 \\text{ o } x = 3',
    difficulty: 'easy',
    skills: ['algebra-ecuaciones-cuadraticas', 'algebra-factorizacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-193',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'x^2 + 7x + 10 = 0',
    questionLatex: '\\text{Un biólogo modela el crecimiento bacteriano en un cultivo. La ecuación que relaciona ciertas variables del experimento es } x^2 + 7x + 10 = 0, \\text{ donde x representa un parámetro de concentración. Para calibrar correctamente el experimento, el biólogo necesita encontrar los valores de x que satisfacen esta ecuación. ¿Cuáles son las soluciones?}',
    options: ['x = -2 \\text{ o } x = -5', 'x = 2 \\text{ o } x = 5', 'x = -1 \\text{ o } x = -10', 'x = 1 \\text{ o } x = 10'],
    correctAnswer: 0,
    explanation: 'x^2 + 7x + 10 = (x + 2)(x + 5) = 0 \\quad \\Rightarrow \\quad x = -2 \\text{ o } x = -5',
    difficulty: 'medium',
    skills: ['algebra-ecuaciones-cuadraticas', 'algebra-factorizacion', 'numeros-enteros', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-194',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'x^2 - 9 = 0',
    questionLatex: '\\text{Un ingeniero eléctrico calibra un sensor que detecta variaciones de voltaje. El sensor se activa cuando la ecuación } x^2 - 9 = 0 \\text{ se cumple, donde x representa la diferencia de voltaje en voltios. El técnico necesita identificar exactamente en qué valores de voltaje el sensor se activará. ¿Cuáles son los valores de x que resuelven la ecuación?}',
    options: ['x = 3 \\text{ o } x = -3', 'x = 9 \\text{ o } x = -9', 'x = 3 \\text{ solamente}', 'x = 9 \\text{ solamente}'],
    correctAnswer: 0,
    explanation: 'x^2 - 9 = (x - 3)(x + 3) = 0 \\quad \\Rightarrow \\quad x = 3 \\text{ o } x = -3',
    difficulty: 'easy',
    skills: ['algebra-ecuaciones-cuadraticas', 'algebra-factorizacion', 'algebra-diferencia-cuadrados', 'numeros-raices']
  },
  {
    id: 'm1-195',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'x^2 + 2x - 3 = 0',
    questionLatex: '\\text{Un economista analiza fluctuaciones del mercado de valores. El modelo matemático que describe ciertos puntos críticos del mercado es } x^2 + 2x - 3 = 0, \\text{ donde x representa días desde el inicio del trimestre. El economista necesita usar la fórmula cuadrática para encontrar exactamente en qué días ocurren estos puntos críticos. ¿Cuáles son los valores de x?}',
    options: ['x = 1 \\text{ o } x = -3', 'x = -1 \\text{ o } x = 3', 'x = 2 \\text{ o } x = -3', 'x = -2 \\text{ o } x = 3'],
    correctAnswer: 0,
    explanation: 'x = \\frac{-2 \\pm \\sqrt{4 + 12}}{2} = \\frac{-2 \\pm 4}{2} \\quad \\Rightarrow \\quad x = 1 \\text{ o } x = -3',
    difficulty: 'medium',
    skills: ['algebra-ecuaciones-cuadraticas', 'algebra-formula-cuadratica', 'numeros-raices', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-196',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: '\\Delta = b^2 - 4ac',
    questionLatex: '\\text{Un matemático estudia la ecuación cuadrática } x^2 - 4x + 4 = 0 \\text{ para determinar la naturaleza de sus soluciones. Para ello, necesita calcular el discriminante } \\Delta = b^2 - 4ac, \\text{ que indica cuántas soluciones reales tiene la ecuación. Identificando } a = 1, b = -4 \\text{ y } c = 4, \\text{ el matemático procede a calcular. ¿Cuál es el valor del discriminante?}',
    options: ['0', '4', '8', '16'],
    correctAnswer: 0,
    explanation: '\\Delta = (-4)^2 - 4(1)(4) = 16 - 16 = 0 \\text{ (una raíz doble)}',
    difficulty: 'medium',
    skills: ['algebra-ecuaciones-cuadraticas', 'algebra-discriminante', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-197',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: '\\Delta < 0',
    questionLatex: '\\text{Una profesora de álgebra explica a sus estudiantes cómo interpretar el discriminante de una ecuación cuadrática. Les presenta un caso especial donde calcularon el discriminante y obtuvieron un valor negativo. Los estudiantes deben comprender qué significa esto para las soluciones de la ecuación. Si el discriminante de una ecuación cuadrática es negativo, ¿qué podemos concluir sobre sus soluciones?}',
    options: ['No tiene soluciones reales', 'Tiene dos soluciones reales distintas', 'Tiene una solución real', 'Tiene infinitas soluciones'],
    correctAnswer: 0,
    explanation: '\\Delta < 0 \\quad \\Rightarrow \\quad \\text{No existen soluciones reales (las soluciones son complejas)}',
    difficulty: 'hard',
    skills: ['algebra-ecuaciones-cuadraticas', 'algebra-discriminante']
  },
  {
    id: 'm1-198',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'h(t) = -5t^2 + 20t',
    questionLatex: '\\text{Un jugador de baloncesto lanza el balón hacia el aro. La altura del balón en metros se modela con la función } h(t) = -5t^2 + 20t, \\text{ donde t representa el tiempo en segundos desde el lanzamiento. El entrenador quiere saber en qué instantes el balón está exactamente al nivel del suelo, es decir, cuando h = 0. ¿En qué tiempos t el balón toca el suelo?}',
    options: ['t = 0 \\text{ o } t = 4', 't = 0 \\text{ o } t = 5', 't = 2 \\text{ o } t = 4', 't = 1 \\text{ o } t = 4'],
    correctAnswer: 0,
    explanation: '-5t(t - 4) = 0 \\quad \\Rightarrow \\quad t = 0 \\text{ (lanzamiento) o } t = 4 \\text{ (aterrizaje)}',
    difficulty: 'medium',
    skills: ['algebra-ecuaciones-cuadraticas', 'algebra-factorizacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-199',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'x(x + 2) = 24',
    questionLatex: '\\text{Un carpintero construye una mesa rectangular. El área de la superficie de la mesa es 24 metros cuadrados. El largo de la mesa mide 2 metros más que el ancho. Si llamamos x al ancho en metros, entonces el largo es } x + 2 \\text{ metros. El carpintero necesita calcular las dimensiones exactas de la mesa. ¿Cuál es el valor de x (el ancho)?}',
    options: ['4 m', '5 m', '6 m', '8 m'],
    correctAnswer: 0,
    explanation: 'x^2 + 2x = 24 \\rightarrow x^2 + 2x - 24 = 0 \\rightarrow (x + 6)(x - 4) = 0 \\quad \\Rightarrow \\quad x = 4 \\text{ (positivo)}',
    difficulty: 'hard',
    skills: ['algebra-ecuaciones-cuadraticas', 'algebra-factorizacion', 'geometria-area', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-200',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'y = x^2 - 6x + 8',
    questionLatex: '\\text{Un arquitecto diseña un arco parabólico para la entrada de un edificio. La forma del arco se describe con la parábola } y = x^2 - 6x + 8, \\text{ donde x representa la distancia horizontal en metros e y la altura. El arco toca el suelo en dos puntos donde y = 0 (los interceptos con el eje x). El arquitecto necesita calcular las coordenadas exactas de estos puntos de apoyo. ¿Cuáles son las coordenadas de los puntos donde la parábola cruza el eje x?}',
    options: ['(2, 0) \\text{ y } (4, 0)', '(1, 0) \\text{ y } (8, 0)', '(-2, 0) \\text{ y } (-4, 0)', '(3, 0) \\text{ y } (6, 0)'],
    correctAnswer: 0,
    explanation: 'x^2 - 6x + 8 = (x - 2)(x - 4) = 0 \\quad \\Rightarrow \\quad x = 2 \\text{ o } x = 4',
    difficulty: 'hard',
    skills: ['algebra-ecuaciones-cuadraticas', 'algebra-factorizacion', 'algebra-funciones-cuadraticas', 'algebra-interceptos', 'numeros-operaciones-basicas']
  }
];
