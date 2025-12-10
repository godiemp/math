import { Question } from '../../../types';

/**
 * M1-NUM-001: Operaciones y orden en el conjunto de los números enteros
 *
 * Subsections:
 * A. Orden y valor absoluto
 * B. Suma y resta
 * C. Multiplicación y división
 * D. Propiedades y jerarquía de operaciones
 * E. Problemas combinados y de razonamiento
 * F. Comparaciones encadenadas y desigualdades
 */

export const m1Num001Questions: Question[] = [
  {
    id: 'm1-26',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '(-3) \\times (-5)',
    questionLatex: '\\text{Un operador de grúa registra los movimientos verticales de la carga. Cada vez que baja la carga 3 metros, anota -3 en su registro. Cada vez que sube la carga 5 metros, anota +5. Al final del día, el supervisor le pide calcular qué pasaría si en lugar de bajar la carga 3 metros, la hubiera subido 3 metros, y esto lo hubiera repetido 5 veces. Es decir, debe calcular el opuesto de -3, multiplicado por 5. ¿Cuál es el resultado de } (-3) \\times (-5) \\text{?}',
    options: ['-15', '-8', '8', '15'],
    correctAnswer: 3,
    explanation: '(-3) \\times (-5) = 15 \\text{. El producto de dos números negativos es positivo.}',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['numeros-enteros-multiplicar-dividir', 'numeros-patrones-signos', 'numeros-enteros-comprender-significado']
  },
  {
    id: 'm1-108',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '8 + 2 \\times 5',
    questionLatex: '\\text{Un estudiante está resolviendo un problema de cálculo que involucra operaciones combinadas. Se le presenta la expresión } 8 + 2 \\times 5. \\text{ El profesor enfatiza la importancia de aplicar correctamente el orden de las operaciones para obtener el resultado correcto. ¿Cuál es el resultado de esta operación?}',
    options: ['18', '50', '26', '15'],
    correctAnswer: 0,
    explanation: '8 + 2 \\times 5 = 8 + 10 = 18',
    difficulty: 'easy',
    difficultyScore: 0.25,
    skills: ['numeros-jerarquia-operaciones']
  },
  {
    id: 'm1-109',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '20 - 3 \\times 4 + 6',
    questionLatex: '\\text{En un ejercicio de práctica, un estudiante debe calcular la expresión } 20 - 3 \\times 4 + 6. \\text{ El profesor recuerda a la clase que deben seguir estrictamente el orden de operaciones. ¿Cuál es el resultado final?}',
    options: ['14', '26', '74', '2'],
    correctAnswer: 0,
    explanation: '20 - 3 \\times 4 + 6 = 20 - 12 + 6 = 14',
    difficulty: 'easy',
    difficultyScore: 0.32,
    skills: ['numeros-jerarquia-operaciones', 'numeros-enteros-sumar-restar']
  },
  {
    id: 'm1-110',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '2^3 + 4 \\times 3 - 5',
    questionLatex: '\\text{Un profesor presenta a sus estudiantes un problema que combina potencias, multiplicación, suma y resta. La expresión a resolver es } 2^3 + 4 \\times 3 - 5. \\text{ Los estudiantes deben aplicar correctamente la jerarquía de operaciones. ¿Cuál es el resultado de esta expresión?}',
    options: ['15', '19', '21', '27'],
    correctAnswer: 0,
    explanation: '2^3 + 4 \\times 3 - 5 = 8 + 12 - 5 = 15',
    difficulty: 'medium',
    difficultyScore: 0.35,
    skills: ['numeros-jerarquia-operaciones', 'numeros-potencias']
  },
  {
    id: 'm1-111',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '(8 + 2) \\times 5',
    questionLatex: '\\text{En una prueba de matemática, se presenta la expresión } (8 + 2) \\times 5. \\text{ Los estudiantes deben aplicar correctamente el orden de las operaciones. ¿Cuál es el resultado?}',
    options: ['18', '40', '50', '26'],
    correctAnswer: 2,
    explanation: '(8 + 2) \\times 5 = 10 \\times 5 = 50',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['numeros-jerarquia-operaciones']
  },
  {
    id: 'm1-112',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '3 \\times (12 - 4) + 8',
    questionLatex: '\\text{Un estudiante enfrenta un problema con paréntesis y múltiples operaciones. La expresión es } 3 \\times (12 - 4) + 8. \\text{ El profesor recuerda que deben aplicar correctamente el orden de operaciones. ¿Cuál es el resultado de esta operación?}',
    options: ['24', '28', '32', '36'],
    correctAnswer: 2,
    explanation: '3 \\times (12 - 4) + 8 = 3 \\times 8 + 8 = 24 + 8 = 32',
    difficulty: 'easy',
    difficultyScore: 0.30,
    skills: ['numeros-jerarquia-operaciones']
  },
  {
    id: 'm1-113',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '[(15 - 3) \\div 4 + 2] \\times 3',
    questionLatex: '\\text{En un examen avanzado, se presenta la expresión } [(15 - 3) \\div 4 + 2] \\times 3. \\text{ Los estudiantes deben aplicar correctamente el orden de operaciones con corchetes y paréntesis anidados. ¿Cuál es el resultado final?}',
    options: ['12', '15', '18', '21'],
    correctAnswer: 1,
    explanation: '[(15 - 3) \\div 4 + 2] \\times 3 = [12 \\div 4 + 2] \\times 3 = [3 + 2] \\times 3 = 5 \\times 3 = 15',
    difficulty: 'medium',
    difficultyScore: 0.48,
    skills: ['numeros-jerarquia-operaciones']
  },
  {
    id: 'm1-117',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\text{Punto medio entre } -3 \\text{ y } 5',
    questionLatex: '\\text{Un cartógrafo está trazando un mapa y necesita ubicar un punto de referencia en la recta numérica. Debe encontrar la ubicación exacta que está a la misma distancia de dos marcadores: uno ubicado en la posición -3 y otro en la posición 5. ¿Qué número está exactamente a mitad de camino entre -3 y 5?}',
    options: ['0', '1', '2', '4'],
    correctAnswer: 1,
    explanation: '\\frac{-3 + 5}{2} = \\frac{2}{2} = 1',
    difficulty: 'easy',
    difficultyScore: 0.25,
    skills: ['numeros-representar-recta-numerica', 'numeros-enteros-ordenar-recta', 'numeros-calcular-promedios-racionales']
  },
  {
    id: 'm1-118',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\text{Número más cercano a } 0',
    questionLatex: '\\text{Un físico está midiendo pequeñas desviaciones de temperatura respecto al punto de equilibrio (0 grados). Registra cuatro mediciones diferentes: -0.5, 0.6, -0.8 y 1.2 grados. Para su análisis, necesita identificar cuál medición está más próxima al punto de equilibrio. ¿Cuál número está más cerca de 0 en la recta numérica?}',
    options: ['-0.5', '0.6', '-0.8', '1.2'],
    correctAnswer: 0,
    explanation: '|-0.5| = 0.5 \\text{ es el menor}',
    difficulty: 'easy',
    difficultyScore: 0.30,
    skills: ['numeros-valor-absoluto', 'numeros-comparar-distancia-cero', 'numeros-decimales-comparar']
  },
  {
    id: 'm1-119',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\text{Distancia entre } -4 \\text{ y } 7',
    questionLatex: '\\text{Un ingeniero está diseñando un puente y necesita calcular la distancia total entre dos puntos de anclaje en un eje de coordenadas. El punto A está ubicado en la posición -4 metros (bajo tierra), y el punto B está en la posición 7 metros (sobre el nivel del suelo). Para determinar la longitud total del cable de soporte, necesita calcular la distancia absoluta entre ambos puntos. ¿Qué distancia hay entre -4 y 7?}',
    options: ['3', '7', '11', '28'],
    correctAnswer: 2,
    explanation: '|7 - (-4)| = |7 + 4| = 11',
    difficulty: 'easy',
    difficultyScore: 0.30,
    skills: ['numeros-representar-recta-numerica', 'numeros-valor-absoluto']
  },
  {
    id: 'm1-120',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '|-8|',
    questionLatex: '\\text{Un contador está analizando las transacciones de una empresa y encuentra un registro de -8 millones de pesos, que representa una pérdida. Para calcular el impacto total sin considerar si es ganancia o pérdida, necesita calcular } |-8|. \\text{ ¿Cuál es el valor absoluto de -8?}',
    options: ['-8', '0', '8', '16'],
    correctAnswer: 2,
    explanation: '|-8| = 8',
    difficulty: 'easy',
    difficultyScore: 0.15,
    skills: ['numeros-valor-absoluto', 'numeros-enteros-comprender-significado']
  },
  {
    id: 'm1-121',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '|5 - 9|',
    questionLatex: '\\text{Un deportista está analizando sus tiempos de carrera. Su tiempo actual es de 5 minutos, pero su meta es de 9 minutos para una carrera más larga. Necesita calcular la diferencia absoluta entre ambos tiempos para determinar cuánto debe ajustar su ritmo, sin importar si debe aumentar o disminuir su velocidad. ¿Cuál es el resultado del valor absoluto de la diferencia entre 5 y 9?}',
    options: ['-4', '4', '14', '-14'],
    correctAnswer: 1,
    explanation: '|5 - 9| = |-4| = 4',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['numeros-valor-absoluto', 'numeros-enteros-sumar-restar']
  },
  {
    id: 'm1-122',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '|-3| + |2| - |-5|',
    questionLatex: '\\text{Un científico está calculando cambios netos en una serie de mediciones. Registra tres variaciones: -3, 2 y -5 unidades. Para su análisis, debe calcular } |-3| + |2| - |-5|. \\text{ ¿Cuál es el resultado de esta operación?}',
    options: ['0', '4', '6', '10'],
    correctAnswer: 0,
    explanation: '|-3| + |2| - |-5| = 3 + 2 - 5 = 0',
    difficulty: 'medium',
    difficultyScore: 0.35,
    skills: ['numeros-valor-absoluto', 'numeros-jerarquia-operaciones']
  }
];
