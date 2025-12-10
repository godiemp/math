import { Question } from '../../../types';

/**
 * M2-PROB-002: Aplicaciones y propiedades de la probabilidad condicional
 *
 * Subsections:
 * A. Concepto de probabilidad condicional
 *    Habilidades: probabilidad-condicional-concepto
 * B. Teorema de Bayes
 *    Habilidades: probabilidad-bayes
 * C. Eventos independientes y dependientes
 *    Habilidades: probabilidad-eventos-dependientes
 * D. Aplicaciones de probabilidad condicional
 *    Habilidades: probabilidad-condicional-aplicaciones
 */

export const m2Prob002Questions: Question[] = [
  {
    id: 'm2-prob-rp-3',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(A \\cap B) = P(A) \\times P(B|A)',
    questionLatex: '\\text{En un laboratorio de química, una profesora tiene una urna con 8 reactivos: 5 de color rojo y 3 de color azul. Para un experimento, necesita extraer 2 reactivos al azar sin reposición. La profesora quiere calcular la probabilidad de que ambos reactivos seleccionados sean rojos. ¿Cuál es la probabilidad de extraer dos reactivos rojos consecutivamente sin reposición?}',
    options: ['\\frac{5}{14}', '\\frac{5}{16}', '\\frac{4}{14}', '\\frac{25}{64}'],
    correctAnswer: 0,
    explanation: 'P = \\frac{5}{8} \\times \\frac{4}{7} = \\frac{20}{56} = \\frac{5}{14}',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['probabilidad-condicional', 'probabilidad-sin-reposicion', 'probabilidad-reglas-multiplicacion', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-rp-4',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(E|+) = \\frac{P(+|E) \\times P(E)}{P(+|E) \\times P(E) + P(+|S) \\times P(S)}',
    questionLatex: '\\text{Un hospital implementa una nueva prueba diagnóstica para detectar una enfermedad. La prueba tiene las siguientes características: detecta correctamente al 95\\% de los enfermos (sensibilidad), pero también da positivo en el 10\\% de las personas sanas (falsos positivos). Se sabe que el 2\\% de la población tiene la enfermedad. Un paciente recibe un resultado positivo en la prueba. Usando el teorema de Bayes, ¿cuál es la probabilidad de que el paciente realmente esté enfermo dado que su prueba dio positiva?}',
    options: ['Aproximadamente 16%', 'Aproximadamente 32%', 'Aproximadamente 48%', 'Aproximadamente 95%'],
    correctAnswer: 0,
    explanation: 'P(E|+) = \\frac{0.95 \\times 0.02}{0.95 \\times 0.02 + 0.10 \\times 0.98} = \\frac{0.019}{0.117} \\approx 0.16',
    difficulty: 'extreme',
    difficultyScore: 0.95,
    skills: ['probabilidad-bayes', 'probabilidad-teorema-bayes', 'probabilidad-condicional', 'probabilidad-reglas-multiplicacion', 'numeros-decimales', 'numeros-porcentaje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-cond-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(B_2|B_1) = \\frac{\\text{bolas blancas restantes}}{\\text{total restante}}',
    questionLatex: '\\text{Una caja contiene 10 bolas: 4 blancas y 6 negras. Un estudiante extrae una bola al azar y observa que es blanca. Sin devolver la bola a la caja, el estudiante va a extraer una segunda bola. El profesor le pide calcular la probabilidad condicional de que la segunda bola también sea blanca, dado que la primera fue blanca. ¿Cuál es esta probabilidad?}',
    options: ['\\frac{1}{3}', '\\frac{3}{10}', '\\frac{4}{10}', '\\frac{2}{9}'],
    correctAnswer: 0,
    explanation: 'P(\\text{segunda blanca}|\\text{primera blanca}) = \\frac{3}{9} = \\frac{1}{3}',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['probabilidad-condicional', 'probabilidad-condicional-concepto', 'probabilidad-sin-reposicion', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-cond-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(\\text{suma} > 10 | \\text{primero} = 6)',
    questionLatex: '\\text{En un juego de mesa, un jugador lanza dos dados equilibrados consecutivamente. Después de lanzar el primer dado, obtiene un 6. Ahora necesita calcular la probabilidad de que la suma de ambos dados sea mayor que 10, sabiendo que el primer dado ya mostró un 6. ¿Cuál es la probabilidad de que la suma sea mayor que 10, dado que el primer dado es 6?}',
    options: ['\\frac{1}{6}', '\\frac{1}{3}', '\\frac{1}{2}', '\\frac{2}{3}'],
    correctAnswer: 1,
    explanation: 'P(\\text{suma} > 10|\\text{primero} = 6) = P(\\text{segundo} \\geq 5) = \\frac{2}{6} = \\frac{1}{3}',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['probabilidad-condicional', 'probabilidad-condicional-aplicaciones', 'probabilidad-eventos-independientes', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-cond-3',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(M|D) = \\frac{P(M) \\times P(D|M)}{P(M) \\times P(D|M) + P(H) \\times P(D|H)}',
    questionLatex: '\\text{En una universidad, el 60\\% de los estudiantes son mujeres y el 40\\% son hombres. Se sabe que el 30\\% de las mujeres practican deportes, mientras que el 50\\% de los hombres practican deportes. Un periodista del diario universitario selecciona al azar a un estudiante que practica deportes para entrevistarlo. Usando el teorema de Bayes, ¿cuál es la probabilidad de que el estudiante seleccionado sea mujer?}',
    options: ['\\frac{9}{19}', '\\frac{9}{20}', '\\frac{3}{5}', '\\frac{1}{2}'],
    correctAnswer: 0,
    explanation: 'P(M|D) = \\frac{P(M \\cap D)}{P(D)} = \\frac{0.6 \\times 0.3}{0.6 \\times 0.3 + 0.4 \\times 0.5} = \\frac{0.18}{0.38} = \\frac{9}{19}',
    difficulty: 'extreme',
    difficultyScore: 0.95,
    skills: ['probabilidad-bayes', 'probabilidad-teorema-bayes', 'probabilidad-condicional', 'probabilidad-condicional-aplicaciones', 'numeros-decimales', 'numeros-fracciones', 'numeros-porcentaje', 'numeros-operaciones-basicas']
  },
  // Subsection C: Eventos independientes y dependientes
  {
    id: 'm2-prob-dep-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(A \\cap B) = P(A) \\times P(B) \\text{ (eventos independientes)}',
    questionLatex: '\\text{Un profesor de probabilidad presenta el siguiente experimento a sus estudiantes: se lanzan dos monedas equilibradas de manera consecutiva. Define el evento A como "obtener cara en la primera moneda" y el evento B como "obtener sello en la segunda moneda". El profesor pregunta a la clase si estos dos eventos son independientes entre sí. ¿Son independientes los eventos "primera moneda cara" y "segunda moneda sello"?}',
    options: ['\\text{Sí, resultado independiente}', '\\text{No, mismo experimento}', '\\text{Depende del tipo de moneda}', '\\text{No se puede determinar}'],
    correctAnswer: 0,
    explanation: 'P(\\text{cara}_1 \\cap \\text{sello}_2) = \\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4} \\Rightarrow \\text{independientes}',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['probabilidad-eventos-dependientes', 'probabilidad-eventos-independientes', 'probabilidad-condicional', 'numeros-fracciones']
  },
  {
    id: 'm2-prob-dep-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(A_2|A_1) \\neq P(A_2) \\Rightarrow \\text{dependientes}',
    questionLatex: '\\text{Un mago tiene una baraja estándar de 52 cartas que contiene 4 ases. Para un truco, extrae 2 cartas consecutivas sin devolver la primera carta a la baraja. El mago quiere explicar a su audiencia si los eventos "la primera carta es un as" y "la segunda carta es un as" son independientes o dependientes. ¿Son independientes estos dos eventos cuando se extraen cartas sin reposición?}',
    options: ['\\text{Sí, 4 ases siempre}', '\\text{No, primera afecta segunda}', '\\text{Sí, misma probabilidad}', '\\text{No se puede determinar}'],
    correctAnswer: 1,
    explanation: 'P(\\text{2°as}|\\text{1°as}) = \\frac{3}{51} \\neq P(\\text{2°as}) = \\frac{4}{52} \\Rightarrow \\text{dependientes}',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['probabilidad-eventos-dependientes', 'probabilidad-sin-reposicion', 'probabilidad-condicional', 'numeros-fracciones']
  },
  // Additional Subsection A: Probabilidad condicional concepto
  {
    id: 'm2-prob-cond-4',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(A|B) = \\frac{P(A \\cap B)}{P(B)}',
    questionLatex: '\\text{Un estudiante de estadística está repasando las fórmulas fundamentales de probabilidad para su examen. El profesor le pide que identifique la fórmula correcta para calcular la probabilidad condicional } P(A|B)\\text{, que representa la probabilidad de que ocurra el evento A dado que ya ocurrió el evento B. ¿Cuál es la fórmula correcta de la probabilidad condicional?}',
    options: ['P(A) \\times P(B)', '\\frac{P(A \\cap B)}{P(B)}', 'P(A) + P(B)', '\\frac{P(A)}{P(B)}'],
    correctAnswer: 1,
    explanation: 'P(A|B) = \\frac{P(A \\cap B)}{P(B)}',
    difficulty: 'easy',
    difficultyScore: 0.34,
    skills: ['probabilidad-condicional-concepto', 'probabilidad-formulas', 'numeros-fracciones']
  },
  {
    id: 'm2-prob-cond-5',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(A|B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{0.2}{0.5}',
    questionLatex: '\\text{En un ejercicio de probabilidad, se dan los siguientes datos sobre dos eventos A y B: la probabilidad de A es } P(A) = 0.4\\text{, la probabilidad de B es } P(B) = 0.5\\text{, y la probabilidad de que ocurran ambos eventos es } P(A \\cap B) = 0.2\\text{. El profesor pide a los estudiantes que calculen la probabilidad condicional } P(A|B)\\text{. ¿Cuál es el valor de } P(A|B)\\text{?}',
    options: ['0.2', '0.4', '0.5', '0.8'],
    correctAnswer: 1,
    explanation: 'P(A|B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{0.2}{0.5} = 0.4',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['probabilidad-condicional-concepto', 'probabilidad-condicional', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-cond-6',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(M \\cap L) = P(M) \\times P(L|M)',
    questionLatex: '\\text{En una clase universitaria, el 60\\% de los estudiantes son mujeres. Se sabe además que el 40\\% de las mujeres de la clase usan lentes. Un investigador quiere calcular la probabilidad de seleccionar al azar un estudiante que sea mujer y que además use lentes. ¿Cuál es la probabilidad de que un estudiante seleccionado al azar sea mujer y use lentes?}',
    options: ['0.20', '0.24', '0.40', '0.60'],
    correctAnswer: 1,
    explanation: 'P(M \\cap L) = P(M) \\times P(L|M) = 0.6 \\times 0.4 = 0.24',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['probabilidad-condicional-aplicaciones', 'probabilidad-condicional', 'numeros-decimales', 'numeros-porcentaje']
  },
  {
    id: 'm2-prob-cond-7',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(F|M) = \\frac{P(F \\cap M)}{P(M)}',
    questionLatex: '\\text{En una escuela de 100 estudiantes, 30 estudian matemáticas, 25 estudian física, y 10 estudian ambas materias. Un profesor quiere saber qué tan probable es que un estudiante de matemáticas también estudie física. Si se selecciona al azar un estudiante que estudia matemáticas, ¿cuál es la probabilidad de que también estudie física?}',
    options: ['\\frac{1}{3}', '\\frac{2}{5}', '\\frac{1}{10}', '\\frac{1}{4}'],
    correctAnswer: 0,
    explanation: 'P(F|M) = \\frac{P(F \\cap M)}{P(M)} = \\frac{10/100}{30/100} = \\frac{10}{30} = \\frac{1}{3}',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['probabilidad-condicional-aplicaciones', 'probabilidad-condicional-concepto', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  // Additional Subsection B: Teorema de Bayes - Classic scenarios
  {
    id: 'm2-prob-bayes-manuf-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(A|D) = \\frac{P(D|A) \\times P(A)}{P(D)}',
    questionLatex: '\\text{Una fábrica tiene dos máquinas que producen tornillos. La máquina A produce el 60\\% de los tornillos y la máquina B el 40\\%. El 3\\% de los tornillos de A son defectuosos y el 5\\% de los de B son defectuosos. Si se encuentra un tornillo defectuoso, ¿cuál es la probabilidad de que provenga de la máquina A?}',
    options: ['\\frac{9}{19}', '\\frac{10}{19}', '\\frac{3}{5}', '\\frac{2}{5}'],
    correctAnswer: 0,
    explanation: 'P(A|D) = \\frac{0.03 \\times 0.60}{0.03 \\times 0.60 + 0.05 \\times 0.40} = \\frac{0.018}{0.038} = \\frac{9}{19}',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['probabilidad-bayes', 'probabilidad-teorema-bayes', 'probabilidad-condicional', 'numeros-decimales', 'numeros-fracciones', 'numeros-porcentaje']
  },
  {
    id: 'm2-prob-bayes-manuf-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(B|D) = \\frac{P(D|B) \\times P(B)}{P(D)}',
    questionLatex: '\\text{En una planta de ensamblaje, tres turnos producen circuitos: el turno matutino (50\\%), el vespertino (30\\%) y el nocturno (20\\%). Las tasas de defecto son 2\\%, 3\\% y 6\\% respectivamente. Si un circuito defectuoso es detectado en control de calidad, ¿cuál es la probabilidad de que haya sido producido en el turno nocturno?}',
    options: ['\\frac{12}{29}', '\\frac{9}{29}', '\\frac{10}{29}', '\\frac{6}{29}'],
    correctAnswer: 0,
    explanation: 'P(N|D) = \\frac{0.06 \\times 0.20}{0.02 \\times 0.50 + 0.03 \\times 0.30 + 0.06 \\times 0.20} = \\frac{0.012}{0.029} = \\frac{12}{29}',
    difficulty: 'extreme',
    difficultyScore: 0.95,
    skills: ['probabilidad-bayes', 'probabilidad-teorema-bayes', 'probabilidad-condicional', 'numeros-decimales', 'numeros-fracciones', 'numeros-porcentaje']
  },
  {
    id: 'm2-prob-bayes-med-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(S|{-}) = \\frac{P({-}|S) \\times P(S)}{P({-})}',
    questionLatex: '\\text{Una prueba de COVID tiene sensibilidad del 90\\% (detecta al 90\\% de los enfermos) y especificidad del 95\\% (da negativo al 95\\% de los sanos). Si el 5\\% de la población está infectada, ¿cuál es la probabilidad de que una persona con resultado negativo esté realmente sana?}',
    options: ['Aproximadamente 99\\%', 'Aproximadamente 95\\%', 'Aproximadamente 90\\%', 'Aproximadamente 85\\%'],
    correctAnswer: 0,
    explanation: 'P(S|{-}) = \\frac{0.95 \\times 0.95}{0.95 \\times 0.95 + 0.10 \\times 0.05} = \\frac{0.9025}{0.9075} \\approx 0.9945 \\approx 99\\%',
    difficulty: 'extreme',
    difficultyScore: 0.95,
    skills: ['probabilidad-bayes', 'probabilidad-teorema-bayes', 'probabilidad-condicional', 'numeros-decimales', 'numeros-porcentaje']
  },
  {
    id: 'm2-prob-bayes-med-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(E|+) = \\frac{P(+|E) \\times P(E)}{P(+)}',
    questionLatex: '\\text{Un examen de laboratorio detecta una enfermedad rara que afecta al 1\\% de la población. La prueba acierta en el 99\\% de los casos (tanto para enfermos como para sanos). Si el resultado es positivo, ¿cuál es la probabilidad de estar enfermo?}',
    options: ['\\frac{1}{2}', '\\frac{99}{100}', '\\frac{1}{100}', '\\frac{99}{198}'],
    correctAnswer: 0,
    explanation: 'P(E|+) = \\frac{0.99 \\times 0.01}{0.99 \\times 0.01 + 0.01 \\times 0.99} = \\frac{0.0099}{0.0198} = \\frac{1}{2}',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['probabilidad-bayes', 'probabilidad-teorema-bayes', 'probabilidad-condicional', 'numeros-decimales', 'numeros-fracciones', 'numeros-porcentaje']
  },
  {
    id: 'm2-prob-bayes-spam-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(S|P) = \\frac{P(P|S) \\times P(S)}{P(P)}',
    questionLatex: '\\text{Un filtro de correo clasifica emails. El 40\\% de los correos recibidos son spam. La palabra "gratis" aparece en el 80\\% de los spam y solo en el 10\\% de los correos legítimos. Si un correo contiene la palabra "gratis", ¿cuál es la probabilidad de que sea spam?}',
    options: ['\\frac{16}{19}', '\\frac{3}{19}', '\\frac{8}{10}', '\\frac{4}{10}'],
    correctAnswer: 0,
    explanation: 'P(S|P) = \\frac{0.80 \\times 0.40}{0.80 \\times 0.40 + 0.10 \\times 0.60} = \\frac{0.32}{0.38} = \\frac{16}{19}',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['probabilidad-bayes', 'probabilidad-teorema-bayes', 'probabilidad-condicional', 'numeros-decimales', 'numeros-fracciones', 'numeros-porcentaje']
  },
  {
    id: 'm2-prob-bayes-taxi-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(A|I) = \\frac{P(I|A) \\times P(A)}{P(I)}',
    questionLatex: '\\text{En una ciudad, el 85\\% de los taxis son verdes y el 15\\% son azules. Un testigo de un accidente nocturno dice que el taxi involucrado era azul. En pruebas de iluminación similar, los testigos identifican correctamente el color el 80\\% de las veces. ¿Cuál es la probabilidad de que el taxi realmente fuera azul?}',
    options: ['\\frac{12}{29}', '\\frac{17}{29}', '\\frac{4}{5}', '\\frac{3}{20}'],
    correctAnswer: 0,
    explanation: 'P(A|I) = \\frac{0.80 \\times 0.15}{0.80 \\times 0.15 + 0.20 \\times 0.85} = \\frac{0.12}{0.29} = \\frac{12}{29}',
    difficulty: 'extreme',
    difficultyScore: 0.95,
    skills: ['probabilidad-bayes', 'probabilidad-teorema-bayes', 'probabilidad-condicional', 'numeros-decimales', 'numeros-fracciones', 'numeros-porcentaje']
  },
  {
    id: 'm2-prob-bayes-simple-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(C_1|R) = \\frac{P(R|C_1) \\times P(C_1)}{P(R)}',
    questionLatex: '\\text{Hay dos cajas idénticas. La caja 1 tiene 3 bolas rojas y 7 azules. La caja 2 tiene 6 rojas y 4 azules. Se elige una caja al azar y se extrae una bola que resulta ser roja. ¿Cuál es la probabilidad de que la bola provenga de la caja 1?}',
    options: ['\\frac{1}{3}', '\\frac{2}{3}', '\\frac{3}{10}', '\\frac{6}{10}'],
    correctAnswer: 0,
    explanation: 'P(C_1|R) = \\frac{\\frac{3}{10} \\times \\frac{1}{2}}{\\frac{3}{10} \\times \\frac{1}{2} + \\frac{6}{10} \\times \\frac{1}{2}} = \\frac{0.15}{0.45} = \\frac{1}{3}',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['probabilidad-bayes', 'probabilidad-teorema-bayes', 'probabilidad-condicional', 'numeros-fracciones']
  },
  {
    id: 'm2-prob-bayes-control-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(D|R) = \\frac{P(R|D) \\times P(D)}{P(R)}',
    questionLatex: '\\text{En una línea de producción, el 4\\% de los productos son defectuosos. Un sistema de inspección detecta el 90\\% de los productos defectuosos pero también rechaza el 5\\% de los productos buenos. Si un producto es rechazado, ¿cuál es la probabilidad de que realmente sea defectuoso?}',
    options: ['\\frac{36}{84}', '\\frac{48}{84}', '\\frac{90}{100}', '\\frac{4}{100}'],
    correctAnswer: 0,
    explanation: 'P(D|R) = \\frac{0.90 \\times 0.04}{0.90 \\times 0.04 + 0.05 \\times 0.96} = \\frac{0.036}{0.084} = \\frac{36}{84} = \\frac{3}{7}',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['probabilidad-bayes', 'probabilidad-teorema-bayes', 'probabilidad-condicional', 'numeros-decimales', 'numeros-fracciones', 'numeros-porcentaje']
  }
];
