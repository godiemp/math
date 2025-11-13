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
    question: 'Un buzo profesional está explorando las profundidades marinas y registra sus movimientos verticales. En su primer descenso baja 3 metros, lo que se representa como -3. Luego, debido a las condiciones climáticas adversas, debe realizar esta misma maniobra descendente 5 veces consecutivas, lo que implica multiplicar su descenso por -5 veces. El equipo de superficie necesita calcular el cambio neto en su posición respecto al nivel inicial. ¿Cuál es el resultado de esta operación?',
    questionLatex: '\\text{Un buzo profesional está explorando las profundidades marinas y registra sus movimientos verticales. En su primer descenso baja 3 metros, lo que se representa como -3. Luego, debido a las condiciones climáticas adversas, debe realizar esta misma maniobra descendente 5 veces consecutivas, lo que implica multiplicar su descenso por -5 veces. El equipo de superficie necesita calcular el cambio neto en su posición respecto al nivel inicial. ¿Cuál es el resultado de esta operación?}',
    options: ['-15', '-8', '8', '15'],
    correctAnswer: 3,
    explanation: 'Al multiplicar dos números negativos, el resultado es positivo. Esto se debe a que estamos revirtiendo una operación negativa. Calculamos: (-3) × (-5) = 15.',
    explanationLatex: '(-3) \\times (-5) = 15',
    difficulty: 'easy',
    skills: ['numeros-enteros-multiplicar-dividir', 'numeros-patrones-signos', 'numeros-enteros-comprender-significado']
  },
  {
    id: 'm1-108',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '8 + 2 \\times 5',
    question: 'Un estudiante está resolviendo un problema de cálculo que involucra operaciones combinadas. Se le presenta la expresión donde debe sumar 8 más el resultado de multiplicar 2 por 5. El profesor enfatiza la importancia de aplicar correctamente el orden de las operaciones para obtener el resultado correcto. Recordando que las multiplicaciones se realizan antes que las sumas, ¿cuál es el resultado de esta operación?',
    questionLatex: '\\text{Un estudiante está resolviendo un problema de cálculo que involucra operaciones combinadas. Se le presenta la expresión donde debe sumar 8 más el resultado de multiplicar 2 por 5. El profesor enfatiza la importancia de aplicar correctamente el orden de las operaciones para obtener el resultado correcto. Recordando que las multiplicaciones se realizan antes que las sumas, ¿cuál es el resultado de esta operación?}',
    options: ['18', '50', '26', '15'],
    correctAnswer: 0,
    explanation: 'Aplicamos la jerarquía de operaciones: primero realizamos la multiplicación y luego la suma. Calculamos: 2 × 5 = 10, después sumamos: 8 + 10 = 18.',
    explanationLatex: '8 + 2 \\times 5 = 8 + 10 = 18',
    difficulty: 'easy',
    skills: ['numeros-jerarquia-operaciones']
  },
  {
    id: 'm1-109',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '20 - 3 \\times 4 + 6',
    question: 'En un ejercicio de práctica, un estudiante debe calcular una expresión con múltiples operaciones: comenzando con 20, debe restar el producto de 3 por 4, y finalmente sumar 6. El profesor recuerda a la clase que deben seguir estrictamente el orden de operaciones, realizando primero las multiplicaciones y luego las operaciones de suma y resta de izquierda a derecha. ¿Cuál es el resultado final?',
    questionLatex: '\\text{En un ejercicio de práctica, un estudiante debe calcular una expresión con múltiples operaciones: comenzando con 20, debe restar el producto de 3 por 4, y finalmente sumar 6. El profesor recuerda a la clase que deben seguir estrictamente el orden de operaciones, realizando primero las multiplicaciones y luego las operaciones de suma y resta de izquierda a derecha. ¿Cuál es el resultado final?}',
    options: ['14', '26', '74', '2'],
    correctAnswer: 0,
    explanation: 'Seguimos la jerarquía de operaciones. Primero la multiplicación: 3 × 4 = 12. Luego las operaciones de izquierda a derecha: 20 - 12 = 8, después 8 + 6 = 14.',
    explanationLatex: '20 - 3 \\times 4 + 6 = 20 - 12 + 6 = 14',
    difficulty: 'medium',
    skills: ['numeros-jerarquia-operaciones', 'numeros-enteros-sumar-restar']
  },
  {
    id: 'm1-110',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '2^3 + 4 \\times 3 - 5',
    question: 'Un profesor presenta a sus estudiantes un problema que combina potencias, multiplicación, suma y resta. La expresión requiere calcular dos elevado al cubo, sumarle el producto de 4 por 3, y finalmente restar 5. Los estudiantes deben recordar que las potencias se calculan primero, seguidas de las multiplicaciones, y por último las sumas y restas. ¿Cuál es el resultado de esta expresión?',
    questionLatex: '\\text{Un profesor presenta a sus estudiantes un problema que combina potencias, multiplicación, suma y resta. La expresión requiere calcular dos elevado al cubo, sumarle el producto de 4 por 3, y finalmente restar 5. Los estudiantes deben recordar que las potencias se calculan primero, seguidas de las multiplicaciones, y por último las sumas y restas. ¿Cuál es el resultado de esta expresión?}',
    options: ['15', '19', '21', '27'],
    correctAnswer: 0,
    explanation: 'Aplicamos la jerarquía: primero exponentes (2³ = 8), luego multiplicación (4 × 3 = 12), finalmente suma y resta de izquierda a derecha: 8 + 12 - 5 = 15.',
    explanationLatex: '2^3 + 4 \\times 3 - 5 = 8 + 12 - 5 = 15',
    difficulty: 'medium',
    skills: ['numeros-jerarquia-operaciones', 'numeros-potencias']
  },
  {
    id: 'm1-111',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '(8 + 2) \\times 5',
    question: 'En una prueba de matemática, se presenta una expresión con paréntesis donde primero se debe sumar 8 más 2, y luego multiplicar ese resultado por 5. El uso de paréntesis indica que esa operación debe realizarse primero, independientemente de las reglas habituales de jerarquía. Los estudiantes deben calcular el contenido del paréntesis antes de realizar la multiplicación. ¿Cuál es el resultado?',
    questionLatex: '\\text{En una prueba de matemática, se presenta una expresión con paréntesis donde primero se debe sumar 8 más 2, y luego multiplicar ese resultado por 5. El uso de paréntesis indica que esa operación debe realizarse primero, independientemente de las reglas habituales de jerarquía. Los estudiantes deben calcular el contenido del paréntesis antes de realizar la multiplicación. ¿Cuál es el resultado?}',
    options: ['18', '40', '50', '26'],
    correctAnswer: 2,
    explanation: 'Los paréntesis tienen prioridad máxima. Primero resolvemos 8 + 2 = 10, luego multiplicamos por 5: 10 × 5 = 50.',
    explanationLatex: '(8 + 2) \\times 5 = 10 \\times 5 = 50',
    difficulty: 'easy',
    skills: ['numeros-jerarquia-operaciones']
  },
  {
    id: 'm1-112',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '3 \\times (12 - 4) + 8',
    question: 'Un estudiante enfrenta un problema con paréntesis y múltiples operaciones. Debe multiplicar 3 por la diferencia entre 12 y 4, y luego sumar 8 al resultado. El profesor recuerda que primero se resuelve lo que está dentro del paréntesis, después la multiplicación, y finalmente la suma. Esta secuencia es crucial para obtener la respuesta correcta. ¿Cuál es el resultado de esta operación?',
    questionLatex: '\\text{Un estudiante enfrenta un problema con paréntesis y múltiples operaciones. Debe multiplicar 3 por la diferencia entre 12 y 4, y luego sumar 8 al resultado. El profesor recuerda que primero se resuelve lo que está dentro del paréntesis, después la multiplicación, y finalmente la suma. Esta secuencia es crucial para obtener la respuesta correcta. ¿Cuál es el resultado de esta operación?}',
    options: ['24', '28', '32', '36'],
    correctAnswer: 2,
    explanation: 'Seguimos la jerarquía: primero el paréntesis (12 - 4 = 8), luego la multiplicación (3 × 8 = 24), finalmente la suma (24 + 8 = 32).',
    explanationLatex: '3 \\times (12 - 4) + 8 = 3 \\times 8 + 8 = 24 + 8 = 32',
    difficulty: 'medium',
    skills: ['numeros-jerarquia-operaciones']
  },
  {
    id: 'm1-113',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '[(15 - 3) \\div 4 + 2] \\times 3',
    question: 'En un examen avanzado, se presenta una expresión compleja con corchetes y paréntesis anidados. Los estudiantes deben resolver primero lo que está dentro del paréntesis interior, luego las operaciones dentro de los corchetes de izquierda a derecha, y finalmente la multiplicación externa. La expresión requiere restar 3 de 15, dividir entre 4, sumar 2, y multiplicar todo por 3. ¿Cuál es el resultado final?',
    questionLatex: '\\text{En un examen avanzado, se presenta una expresión compleja con corchetes y paréntesis anidados. Los estudiantes deben resolver primero lo que está dentro del paréntesis interior, luego las operaciones dentro de los corchetes de izquierda a derecha, y finalmente la multiplicación externa. La expresión requiere restar 3 de 15, dividir entre 4, sumar 2, y multiplicar todo por 3. ¿Cuál es el resultado final?}',
    options: ['12', '15', '18', '21'],
    correctAnswer: 1,
    explanation: 'Resolvemos de adentro hacia afuera. Primero el paréntesis: 15 - 3 = 12. Luego dentro del corchete: 12 ÷ 4 = 3, después 3 + 2 = 5. Finalmente: 5 × 3 = 15.',
    explanationLatex: '[(15 - 3) \\div 4 + 2] \\times 3 = [12 \\div 4 + 2] \\times 3 = [3 + 2] \\times 3 = 5 \\times 3 = 15',
    difficulty: 'hard',
    skills: ['numeros-jerarquia-operaciones']
  },
  {
    id: 'm1-117',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\text{Punto medio entre } -3 \\text{ y } 5',
    question: 'Un cartógrafo está trazando un mapa y necesita ubicar un punto de referencia en la recta numérica. Debe encontrar la ubicación exacta que está a la misma distancia de dos marcadores: uno ubicado en la posición -3 y otro en la posición 5. Para determinar este punto medio, debe calcular el promedio de ambas posiciones. ¿Qué número está exactamente a mitad de camino entre -3 y 5?',
    questionLatex: '\\text{Un cartógrafo está trazando un mapa y necesita ubicar un punto de referencia en la recta numérica. Debe encontrar la ubicación exacta que está a la misma distancia de dos marcadores: uno ubicado en la posición -3 y otro en la posición 5. Para determinar este punto medio, debe calcular el promedio de ambas posiciones. ¿Qué número está exactamente a mitad de camino entre -3 y 5?}',
    options: ['0', '1', '2', '4'],
    correctAnswer: 1,
    explanation: 'El punto medio entre dos números se calcula promediando ambos valores. Sumamos -3 y 5, obteniendo 2, luego dividimos entre 2: 2 ÷ 2 = 1.',
    explanationLatex: '\\frac{-3 + 5}{2} = \\frac{2}{2} = 1',
    difficulty: 'easy',
    skills: ['numeros-representar-recta-numerica', 'numeros-enteros-ordenar-recta', 'numeros-calcular-promedios-racionales']
  },
  {
    id: 'm1-118',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\text{Número más cercano a } 0',
    question: 'Un físico está midiendo pequeñas desviaciones de temperatura respecto al punto de equilibrio (0 grados). Registra cuatro mediciones diferentes: -0.5, 0.6, -0.8 y 1.2 grados. Para su análisis, necesita identificar cuál medición está más próxima al punto de equilibrio, es decir, cuál tiene la menor magnitud absoluta. ¿Cuál número está más cerca de 0 en la recta numérica?',
    questionLatex: '\\text{Un físico está midiendo pequeñas desviaciones de temperatura respecto al punto de equilibrio (0 grados). Registra cuatro mediciones diferentes: -0.5, 0.6, -0.8 y 1.2 grados. Para su análisis, necesita identificar cuál medición está más próxima al punto de equilibrio, es decir, cuál tiene la menor magnitud absoluta. ¿Cuál número está más cerca de 0 en la recta numérica?}',
    options: ['-0.5', '0.6', '-0.8', '1.2'],
    correctAnswer: 0,
    explanation: 'El número más cercano a cero es el que tiene menor valor absoluto. Comparamos: |-0.5| = 0.5, |0.6| = 0.6, |-0.8| = 0.8, |1.2| = 1.2. El menor es 0.5, por lo tanto -0.5 está más cerca de cero.',
    explanationLatex: '|-0.5| = 0.5 \\text{ es el menor}',
    difficulty: 'medium',
    skills: ['numeros-valor-absoluto', 'numeros-comparar-distancia-cero', 'numeros-decimales-comparar']
  },
  {
    id: 'm1-119',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\text{Distancia entre } -4 \\text{ y } 7',
    question: 'Un ingeniero está diseñando un puente y necesita calcular la distancia total entre dos puntos de anclaje en un eje de coordenadas. El punto A está ubicado en la posición -4 metros (bajo tierra), y el punto B está en la posición 7 metros (sobre el nivel del suelo). Para determinar la longitud total del cable de soporte, necesita calcular la distancia absoluta entre ambos puntos. ¿Qué distancia hay entre -4 y 7?',
    questionLatex: '\\text{Un ingeniero está diseñando un puente y necesita calcular la distancia total entre dos puntos de anclaje en un eje de coordenadas. El punto A está ubicado en la posición -4 metros (bajo tierra), y el punto B está en la posición 7 metros (sobre el nivel del suelo). Para determinar la longitud total del cable de soporte, necesita calcular la distancia absoluta entre ambos puntos. ¿Qué distancia hay entre -4 y 7?}',
    options: ['3', '7', '11', '28'],
    correctAnswer: 2,
    explanation: 'La distancia entre dos puntos en la recta numérica es el valor absoluto de su diferencia. Calculamos: |7 - (-4)| = |7 + 4| = |11| = 11 metros.',
    explanationLatex: '|7 - (-4)| = |7 + 4| = 11',
    difficulty: 'medium',
    skills: ['numeros-representar-recta-numerica', 'numeros-valor-absoluto']
  },
  {
    id: 'm1-120',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '|-8|',
    question: 'Un contador está analizando las transacciones de una empresa y encuentra un registro de -8 millones de pesos, que representa una pérdida. Para calcular el impacto total sin considerar si es ganancia o pérdida, necesita trabajar con el valor absoluto de esta cantidad, que representa la magnitud sin considerar el signo. ¿Cuál es el valor absoluto de -8?',
    questionLatex: '\\text{Un contador está analizando las transacciones de una empresa y encuentra un registro de -8 millones de pesos, que representa una pérdida. Para calcular el impacto total sin considerar si es ganancia o pérdida, necesita trabajar con el valor absoluto de esta cantidad, que representa la magnitud sin considerar el signo. ¿Cuál es el valor absoluto de -8?}',
    options: ['-8', '0', '8', '16'],
    correctAnswer: 2,
    explanation: 'El valor absoluto de un número es su distancia al cero, siempre positivo. El valor absoluto de -8 es 8, ya que -8 está a 8 unidades de distancia del cero.',
    explanationLatex: '|-8| = 8',
    difficulty: 'easy',
    skills: ['numeros-valor-absoluto', 'numeros-enteros-comprender-significado']
  },
  {
    id: 'm1-121',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '|5 - 9|',
    question: 'Un deportista está analizando sus tiempos de carrera. Su tiempo actual es de 5 minutos, pero su meta es de 9 minutos para una carrera más larga. Necesita calcular la diferencia absoluta entre ambos tiempos para determinar cuánto debe ajustar su ritmo, sin importar si debe aumentar o disminuir su velocidad. ¿Cuál es el resultado del valor absoluto de la diferencia entre 5 y 9?',
    questionLatex: '\\text{Un deportista está analizando sus tiempos de carrera. Su tiempo actual es de 5 minutos, pero su meta es de 9 minutos para una carrera más larga. Necesita calcular la diferencia absoluta entre ambos tiempos para determinar cuánto debe ajustar su ritmo, sin importar si debe aumentar o disminuir su velocidad. ¿Cuál es el resultado del valor absoluto de la diferencia entre 5 y 9?}',
    options: ['-4', '4', '14', '-14'],
    correctAnswer: 1,
    explanation: 'Primero calculamos la diferencia: 5 - 9 = -4. Luego tomamos el valor absoluto de -4, que es 4 minutos.',
    explanationLatex: '|5 - 9| = |-4| = 4',
    difficulty: 'easy',
    skills: ['numeros-valor-absoluto', 'numeros-enteros-sumar-restar']
  },
  {
    id: 'm1-122',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '|-3| + |2| - |-5|',
    question: 'Un científico está calculando cambios netos en una serie de mediciones. Registra tres variaciones: -3, 2 y -5 unidades. Para su análisis, debe sumar el valor absoluto de la primera medición, sumarle el valor absoluto de la segunda, y restarle el valor absoluto de la tercera. Este cálculo le permitirá determinar el cambio neto considerando las magnitudes. ¿Cuál es el resultado de esta operación?',
    questionLatex: '\\text{Un científico está calculando cambios netos en una serie de mediciones. Registra tres variaciones: -3, 2 y -5 unidades. Para su análisis, debe sumar el valor absoluto de la primera medición, sumarle el valor absoluto de la segunda, y restarle el valor absoluto de la tercera. Este cálculo le permitirá determinar el cambio neto considerando las magnitudes. ¿Cuál es el resultado de esta operación?}',
    options: ['0', '4', '6', '10'],
    correctAnswer: 0,
    explanation: 'Calculamos cada valor absoluto: |-3| = 3, |2| = 2, |-5| = 5. Luego operamos: 3 + 2 - 5 = 0.',
    explanationLatex: '|-3| + |2| - |-5| = 3 + 2 - 5 = 0',
    difficulty: 'medium',
    skills: ['numeros-valor-absoluto', 'numeros-jerarquia-operaciones']
  }
];
