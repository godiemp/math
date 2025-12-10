import { Question } from '../../../types';

/**
 * M1-ALG-001: Lenguaje algebraico y expresiones
 * Chilean PAES Curriculum - Algebra Subsection 001
 *
 * This subsection covers:
 * - Algebraic language and expressions
 * - Variables and constants
 * - Operations with monomials (addition, subtraction, multiplication, division, powers)
 * - Evaluating algebraic expressions
 * - Distributive property
 * - Combining like terms
 */
export const m1Alg001Questions: Question[] = [
  {
    id: 'm1-13',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: '3x + 5x - 2x',
    questionLatex: '\\text{Andrés está organizando la biblioteca de su colegio y debe contar libros que vienen en cajas. Cada caja contiene la misma cantidad de libros, representada por x. En el primer estante encuentra 3 cajas de libros, en el segundo estante hay 5 cajas de libros, pero debe retirar 2 cajas porque los libros están dañados. El director le pide calcular una expresión que represente el total de cajas de libros útiles que quedan. ¿Cuál es la expresión simplificada?}',
    options: ['6x', '10x', '8x', '5x'],
    correctAnswer: 0,
    explanation: '3x + 5x - 2x = (3 + 5 - 2)x = 6x',
    difficulty: 'easy',
    difficultyScore: 0.34,
    skills: ['algebra-expresiones', 'algebra-terminos-semejantes', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-123',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: '(3x^2)(4x^3)',
    questionLatex: '\\text{Una empresa de diseño gráfico almacena archivos de imágenes en carpetas digitales. Cada proyecto tiene 3 carpetas principales, donde cada carpeta contiene archivos de tamaño } x^2 \\text{ megabytes. Además, cada proyecto se replica en 4 servidores diferentes, donde cada servidor multiplica el almacenamiento por } x^3. \\text{ El administrador necesita calcular una expresión que represente el espacio total de almacenamiento requerido por proyecto. ¿Cuál es el resultado de esta multiplicación?}',
    options: ['7x^5', '12x^5', '7x^6', '12x^6'],
    correctAnswer: 1,
    explanation: '(3x^2)(4x^3) = 3 \\times 4 \\times x^{2+3} = 12x^5',
    difficulty: 'easy',
    difficultyScore: 0.34,
    skills: ['algebra-expresiones', 'numeros-potencias-propiedades', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-124',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: '(2a^3b)(5ab^2)',
    questionLatex: '\\text{Un laboratorio químico mezcla dos compuestos en una reacción. El primer compuesto tiene una concentración representada por } 2a^3b \\text{ moléculas por mililitro, donde a y b son factores de concentración específicos. El segundo compuesto tiene concentración } 5ab^2 \\text{ moléculas por mililitro. Al combinar ambos compuestos, las concentraciones se multiplican según las leyes químicas. El químico necesita determinar la expresión que representa la concentración resultante del producto de la reacción. ¿Cuál es el resultado simplificado?}',
    options: ['10a^3b^2', '7a^4b^3', '10a^4b^3', '7a^3b^2'],
    correctAnswer: 2,
    explanation: '(2a^3b)(5ab^2) = 2 \\times 5 \\times a^{3+1} \\times b^{1+2} = 10a^4b^3',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['algebra-expresiones', 'numeros-potencias-propiedades', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-125',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: '(-3x^2y)(2xy^3)',
    questionLatex: '\\text{Un físico estudia campos electromagnéticos en un laboratorio. En una región del espacio, el campo eléctrico tiene una intensidad representada por } -3x^2y \\text{ unidades, donde x e y son coordenadas espaciales y el signo negativo indica la dirección del campo. En la misma región, el campo magnético tiene intensidad } 2xy^3 \\text{ unidades. Para calcular la interacción entre ambos campos, debe multiplicar estas expresiones. El físico necesita determinar la expresión resultante de esta multiplicación. ¿Cuál es el resultado?}',
    options: ['-6x^2y^3', '-6x^3y^4', '-5x^3y^4', '6x^3y^4'],
    correctAnswer: 1,
    explanation: '(-3x^2y)(2xy^3) = -3 \\times 2 \\times x^{2+1} \\times y^{1+3} = -6x^3y^4',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['algebra-expresiones', 'numeros-potencias-propiedades', 'numeros-enteros', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-126',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: '\\frac{12x^5}{4x^2}',
    questionLatex: '\\text{Una fábrica de cables produce alambre eléctrico en rollos. La producción total de la semana es de } 12x^5 \\text{ metros de cable, donde x representa un factor de producción diario. Esta producción debe distribuirse equitativamente entre } 4x^2 \\text{ departamentos de la empresa. El gerente necesita calcular cuántos metros de cable recibirá cada departamento. ¿Cuál es la expresión simplificada que representa el cable por departamento?}',
    options: ['3x^3', '8x^3', '3x^{10}', '8x^7'],
    correctAnswer: 0,
    explanation: '\\frac{12x^5}{4x^2} = \\frac{12}{4} \\times x^{5-2} = 3x^3',
    difficulty: 'easy',
    difficultyScore: 0.34,
    skills: ['algebra-expresiones', 'numeros-potencias-propiedades', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-127',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: '\\frac{18a^4b^3}{6a^2b}',
    questionLatex: '\\text{Un vivero organiza plantas en macetas para una exhibición. Tienen un total de } 18a^4b^3 \\text{ plantas ornamentales, donde a representa el tipo de planta y b el tamaño de la maceta. Deben distribuir todas las plantas en } 6a^2b \\text{ secciones de exhibición de manera equitativa. El encargado necesita calcular cuántas plantas irán en cada sección para planificar el espacio. ¿Cuál es la expresión simplificada?}',
    options: ['3a^2b^2', '12a^2b^2', '3a^6b^4', '12a^6b^4'],
    correctAnswer: 0,
    explanation: '\\frac{18a^4b^3}{6a^2b} = \\frac{18}{6} \\times a^{4-2} \\times b^{3-1} = 3a^2b^2',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['algebra-expresiones', 'numeros-potencias-propiedades', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-128',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: '\\frac{-24x^6y^4}{8x^2y}',
    questionLatex: '\\text{Un oceanógrafo mide corrientes marinas en diferentes profundidades. En una zona específica, registra un flujo neto de } -24x^6y^4 \\text{ metros cúbicos por segundo, donde el signo negativo indica que la corriente fluye hacia el oeste, x representa la latitud y y la profundidad. Para analizar el flujo por región, debe dividir este valor entre } 8x^2y \\text{ zonas de medición. El oceanógrafo necesita calcular el flujo promedio por zona. ¿Cuál es la expresión resultante?}',
    options: ['-3x^4y^3', '3x^4y^3', '-3x^8y^5', '-16x^4y^3'],
    correctAnswer: 0,
    explanation: '\\frac{-24x^6y^4}{8x^2y} = \\frac{-24}{8} \\times x^{6-2} \\times y^{4-1} = -3x^4y^3',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['algebra-expresiones', 'numeros-potencias-propiedades', 'numeros-enteros', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-129',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: '(2x^3)^2',
    questionLatex: '\\text{Un arquitecto diseña paneles solares cuadrados para un edificio sustentable. Cada panel tiene un lado que mide } 2x^3 \\text{ centímetros, donde x es un parámetro de diseño. Para calcular el área de cada panel, debe elevar esta medida al cuadrado. El arquitecto necesita determinar la expresión que representa el área de un panel. ¿Cuál es el resultado?}',
    options: ['2x^6', '4x^6', '2x^5', '4x^5'],
    correctAnswer: 1,
    explanation: '(2x^3)^2 = 2^2 \\times (x^3)^2 = 4 \\times x^{3 \\times 2} = 4x^6',
    difficulty: 'easy',
    difficultyScore: 0.34,
    skills: ['algebra-expresiones', 'numeros-potencias-propiedades', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-130',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: '(3a^2b)^3',
    questionLatex: '\\text{Un biólogo estudia el crecimiento de colonias bacterianas en un cultivo. La densidad inicial de bacterias por centímetro cúbico es } 3a^2b, \\text{ donde a y b son factores ambientales. Después de tres ciclos de reproducción, la densidad se eleva a la tercera potencia según el modelo exponencial. El biólogo necesita calcular la expresión que representa la densidad final después de los tres ciclos. ¿Cuál es el resultado?}',
    options: ['9a^5b^3', '27a^5b^3', '9a^6b^3', '27a^6b^3'],
    correctAnswer: 3,
    explanation: '(3a^2b)^3 = 3^3 \\times (a^2)^3 \\times b^3 = 27 \\times a^6 \\times b^3 = 27a^6b^3',
    difficulty: 'hard',
    difficultyScore: 0.74,
    skills: ['algebra-expresiones', 'numeros-potencias-propiedades', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-131',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: '(-2xy^2)^3',
    questionLatex: '\\text{Un meteorólogo analiza patrones de presión atmosférica en una región montañosa. La variación de presión por kilómetro está representada por } -2xy^2, \\text{ donde x es la altitud, y la temperatura, y el signo negativo indica disminución de presión. Para modelar el efecto acumulado en tres estaciones de medición conectadas, debe elevar esta expresión al cubo. El meteorólogo necesita determinar la expresión resultante. ¿Cuál es el resultado?}',
    options: ['-8x^3y^6', '8x^3y^6', '-6x^3y^5', '-8x^4y^6'],
    correctAnswer: 0,
    explanation: '(-2xy^2)^3 = (-2)^3 \\times x^3 \\times (y^2)^3 = -8 \\times x^3 \\times y^6 = -8x^3y^6',
    difficulty: 'hard',
    difficultyScore: 0.74,
    skills: ['algebra-expresiones', 'numeros-potencias-propiedades', 'numeros-enteros', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-132',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: '3a + 2b',
    questionLatex: '\\text{Una tienda de mascotas vende alimento para perros y gatos. Cada bolsa de alimento para perros pesa a kilogramos y cada bolsa de alimento para gatos pesa b kilogramos. El lunes vendieron 3 bolsas de alimento para perros y 2 bolsas de alimento para gatos. Si una bolsa de alimento para perros pesa 2 kilogramos y una de gatos pesa 3 kilogramos, el encargado necesita calcular el peso total vendido ese día. ¿Cuántos kilogramos se vendieron en total?}',
    options: ['8', '11', '12', '15'],
    correctAnswer: 2,
    explanation: '3a + 2b = 3(2) + 2(3) = 6 + 6 = 12',
    difficulty: 'easy',
    difficultyScore: 0.34,
    skills: ['algebra-expresiones', 'algebra-evaluacion-funciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-133',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'x^2 - 2xy + y^2',
    questionLatex: '\\text{Un jardín rectangular tiene dimensiones que se relacionan con la expresión } x^2 - 2xy + y^2. \\text{ Un paisajista necesita evaluar esta expresión para calcular un área específica del diseño cuando el largo es } x = 5 \\text{ metros y el ancho relacionado es } y = 3 \\text{ metros. El paisajista necesita determinar el valor numérico de esta expresión con las medidas dadas. ¿Cuál es el resultado?}',
    options: ['4', '9', '16', '25'],
    correctAnswer: 0,
    explanation: 'x^2 - 2xy + y^2 = 5^2 - 2(5)(3) + 3^2 = 25 - 30 + 9 = 4',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['algebra-expresiones', 'algebra-evaluacion-funciones', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-134',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: '\\frac{a^2 + b}{c}',
    questionLatex: '\\text{Un laboratorio farmacéutico calcula la concentración de un medicamento usando la fórmula } \\frac{a^2 + b}{c}, \\text{ donde a representa el pH de la solución, b la temperatura en grados Celsius, y c el volumen en mililitros. En un experimento específico, midieron } a = -2, b = 4 \\text{ grados y } c = 1 \\text{ mililitro. El farmacéutico necesita calcular la concentración resultante para este experimento. ¿Cuál es el valor de la concentración?}',
    options: ['0', '4', '6', '8'],
    correctAnswer: 3,
    explanation: '\\frac{a^2 + b}{c} = \\frac{(-2)^2 + 4}{1} = \\frac{4 + 4}{1} = 8',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['algebra-expresiones', 'algebra-evaluacion-funciones', 'numeros-potencias', 'numeros-enteros', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-135',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: '2(x + 3) - 3(x - 1)',
    questionLatex: '\\text{Un restaurante calcula sus ganancias diarias usando la expresión } 2(x + 3) - 3(x - 1), \\text{ donde x representa el número de menús especiales vendidos. El primer término } 2(x + 3) \\text{ representa los ingresos por menús regulares más propinas, y el segundo término } 3(x - 1) \\text{ representa los costos operativos. El gerente necesita simplificar esta expresión para facilitar los cálculos diarios. ¿Cuál es la expresión simplificada?}',
    options: ['-x + 9', '-x + 3', 'x + 9', '5x + 3'],
    correctAnswer: 0,
    explanation: '2(x + 3) - 3(x - 1) = 2x + 6 - 3x + 3 = -x + 9',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['algebra-expresiones', 'algebra-propiedad-distributiva', 'algebra-terminos-semejantes', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-136',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: '5x - [2x - (3x - 4)]',
    questionLatex: '\\text{Un contador analiza las finanzas de una empresa usando la expresión } 5x - [2x - (3x - 4)], \\text{ donde x representa miles de dólares en ventas mensuales. La expresión incluye ingresos brutos, menos deducciones, que a su vez tienen ajustes internos. El contador necesita simplificar completamente esta expresión para presentar un informe claro al directorio. ¿Cuál es la expresión simplificada?}',
    options: ['6x - 4', '6x + 4', '4x - 4', '4x + 4'],
    correctAnswer: 0,
    explanation: '5x - [2x - (3x - 4)] = 5x - [2x - 3x + 4] = 5x - [-x + 4] = 5x + x - 4 = 6x - 4',
    difficulty: 'hard',
    difficultyScore: 0.74,
    skills: ['algebra-expresiones', 'algebra-terminos-semejantes', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-137',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: '3(2a - b) - 2(a + 3b)',
    questionLatex: '\\text{Un ingeniero civil calcula los materiales para una construcción. Necesita 3 veces la cantidad de material representada por } (2a - b), \\text{ donde a son sacos de cemento y b son sacos de arena, menos 2 veces la cantidad representada por } (a + 3b) \\text{ que corresponde a materiales de refuerzo. El ingeniero necesita simplificar esta expresión para hacer el pedido final al proveedor. ¿Cuál es la expresión simplificada?}',
    options: ['4a - 9b', '4a + 9b', '8a - 9b', '8a + 3b'],
    correctAnswer: 0,
    explanation: '3(2a - b) - 2(a + 3b) = 6a - 3b - 2a - 6b = 4a - 9b',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['algebra-expresiones', 'algebra-propiedad-distributiva', 'algebra-terminos-semejantes', 'numeros-operaciones-basicas']
  }
];
