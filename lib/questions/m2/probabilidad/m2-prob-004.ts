import { Question } from '../../../types';

/**
 * M2-PROB-004: Problemas que involucren el modelo binomial y otros modelos probabilísticos
 *
 * Subsections:
 * A. Distribución binomial
 *    Habilidades: probabilidad-distribucion-binomial
 * B. Cálculo de probabilidades binomiales
 *    Habilidades: probabilidad-calculo-binomial
 * C. Otros modelos probabilísticos
 *    Habilidades: probabilidad-otros-modelos
 * D. Aplicaciones de modelos probabilísticos
 *    Habilidades: probabilidad-modelos-aplicaciones
 */

export const m2Prob004Questions: Question[] = [
  {
    id: 'm2-prob-bin-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(X=k) = C(n,k) \\times p^k \\times (1-p)^{n-k}',
    questionLatex: '\\text{En un experimento de probabilidad, una estudiante de estadística lanza una moneda equilibrada 3 veces consecutivas para estudiar la distribución binomial. Cada lanzamiento es independiente y la probabilidad de obtener cara en cada lanzamiento es } \\frac{1}{2}\\text{. La estudiante quiere calcular la probabilidad de obtener exactamente 2 caras en los 3 lanzamientos. ¿Cuál es esta probabilidad?}',
    options: ['\\frac{1}{8}', '\\frac{3}{8}', '\\frac{1}{2}', '\\frac{5}{8}'],
    correctAnswer: 1,
    explanation: 'P = C(3,2) \\times \\left(\\frac{1}{2}\\right)^2 \\times \\left(\\frac{1}{2}\\right)^1 = 3 \\times \\frac{1}{8} = \\frac{3}{8}',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['probabilidad-distribucion-binomial', 'probabilidad-calculo-binomial', 'probabilidad-combinaciones', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-bin-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(X=1) = C(4,1) \\times \\left(\\frac{1}{6}\\right)^1 \\times \\left(\\frac{5}{6}\\right)^3',
    questionLatex: '\\text{Un profesor de matemáticas realiza un experimento en clase lanzando un dado equilibrado 4 veces consecutivas. Quiere demostrar a sus estudiantes cómo calcular la probabilidad de obtener exactamente un resultado específico usando la distribución binomial. Si el "éxito" se define como obtener un 6, y la probabilidad de éxito en cada lanzamiento es } \\frac{1}{6}\\text{, ¿cuál es la probabilidad de obtener exactamente un 6 en los 4 lanzamientos?}',
    options: ['\\frac{125}{324}', '\\frac{200}{648}', '\\frac{500}{1296}', '\\frac{625}{1296}'],
    correctAnswer: 2,
    explanation: 'P = C(4,1) \\times \\left(\\frac{1}{6}\\right)^1 \\times \\left(\\frac{5}{6}\\right)^3 = 4 \\times \\frac{125}{1296} = \\frac{500}{1296}',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['probabilidad-distribucion-binomial', 'probabilidad-calculo-binomial', 'probabilidad-combinaciones', 'numeros-fracciones', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-bin-3',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(X=3) = C(5,3) \\times \\left(\\frac{1}{4}\\right)^3 \\times \\left(\\frac{3}{4}\\right)^2',
    questionLatex: '\\text{Un estudiante rinde una prueba de selección múltiple que consta de 5 preguntas, donde cada pregunta tiene 4 alternativas y solo una es correcta. El estudiante no estudió y decide responder todas las preguntas al azar. Usando la distribución binomial, donde la probabilidad de acertar cada pregunta adivinando es } \\frac{1}{4}\\text{, ¿cuál es la probabilidad de que el estudiante acierte exactamente 3 de las 5 preguntas?}',
    options: ['\\frac{45}{512}', '\\frac{90}{1024}', '\\frac{135}{1024}', '\\frac{270}{1024}'],
    correctAnswer: 1,
    explanation: 'P = C(5,3) \\times \\left(\\frac{1}{4}\\right)^3 \\times \\left(\\frac{3}{4}\\right)^2 = 10 \\times \\frac{9}{1024} = \\frac{90}{1024}',
    difficulty: 'extreme',
    difficultyScore: 0.95,
    skills: ['probabilidad-distribucion-binomial', 'probabilidad-calculo-binomial', 'probabilidad-combinaciones', 'numeros-fracciones', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-bin-4',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(X=4) = C(5,4) \\times (0.8)^4 \\times (0.2)^1',
    questionLatex: '\\text{Una máquina de control de calidad en una fábrica tiene una precisión del 80\\% para detectar productos defectuosos. El supervisor de calidad selecciona aleatoriamente 5 productos defectuosos conocidos para evaluar el rendimiento de la máquina. Usando la distribución binomial con probabilidad de éxito } p = 0.8\\text{, ¿cuál es la probabilidad de que la máquina detecte correctamente exactamente 4 de los 5 productos defectuosos?}',
    options: ['0.2048', '0.4096', '0.6', '0.8192'],
    correctAnswer: 1,
    explanation: 'P = C(5,4) \\times (0.8)^4 \\times (0.2)^1 = 5 \\times 0.4096 \\times 0.2 = 0.4096',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['probabilidad-distribucion-binomial', 'probabilidad-calculo-binomial', 'probabilidad-modelos-aplicaciones', 'probabilidad-combinaciones', 'numeros-decimales', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-bin-5',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(X \\geq 8) = P(X=8) + P(X=9) + P(X=10)',
    questionLatex: '\\text{Un jugador de básquetbol tiene un 50\\% de efectividad en tiros libres. Durante una práctica, realiza 10 lanzamientos consecutivos. El entrenador quiere saber la probabilidad de que el jugador enceste al menos 8 de los 10 tiros. Usando la distribución binomial con } p = \\frac{1}{2}\\text{, ¿cuál es la probabilidad de obtener al menos 8 aciertos en los 10 lanzamientos?}',
    options: ['\\frac{7}{128}', '\\frac{11}{256}', '\\frac{7}{512}', '\\frac{56}{1024}'],
    correctAnswer: 3,
    explanation: 'P = \\frac{C(10,8) + C(10,9) + C(10,10)}{2^{10}} = \\frac{45 + 10 + 1}{1024} = \\frac{56}{1024}',
    difficulty: 'extreme',
    difficultyScore: 0.95,
    skills: ['probabilidad-distribucion-binomial', 'probabilidad-calculo-binomial', 'probabilidad-combinaciones', 'numeros-fracciones', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-bin-6',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(X=0) = (1-p)^n = (0.95)^3',
    questionLatex: '\\text{Una tienda de electrónica recibe un lote de 100 artículos de un proveedor. Históricamente, se sabe que el 5\\% de los artículos de este proveedor vienen defectuosos. Un cliente compra 3 artículos seleccionados al azar del lote. Usando la distribución binomial (asumiendo que la probabilidad se mantiene aproximadamente constante), ¿cuál es la probabilidad de que ninguno de los 3 artículos esté defectuoso?}',
    options: ['0.857', '0.902', '0.815', '0.950'],
    correctAnswer: 0,
    explanation: 'P(0 \\text{ defectuosos}) = (0.95)^3 \\approx 0.857',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['probabilidad-distribucion-binomial', 'probabilidad-calculo-binomial', 'probabilidad-modelos-aplicaciones', 'numeros-decimales', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  // Subsection C: Otros modelos probabilísticos
  {
    id: 'm2-prob-unif-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(\\text{múltiplo de 5}) = \\frac{\\text{casos favorables}}{\\text{casos totales}}',
    questionLatex: '\\text{En un sorteo de una rifa escolar, se colocan 100 boletas numeradas del 1 al 100 en una urna. Cada boleta tiene la misma probabilidad de ser seleccionada (distribución uniforme discreta). Un estudiante compró todas las boletas que son múltiplos de 5. Si se extrae una boleta al azar, ¿cuál es la probabilidad de que el estudiante gane el sorteo?}',
    options: ['\\frac{1}{5}', '\\frac{1}{4}', '\\frac{1}{10}', '\\frac{3}{20}'],
    correctAnswer: 0,
    explanation: 'P = \\frac{20}{100} = \\frac{1}{5} \\text{ (distribución uniforme discreta)}',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['probabilidad-otros-modelos', 'probabilidad-uniforme', 'numeros-multiplos', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-geom-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(X=k) = (1-p)^{k-1} \\times p',
    questionLatex: '\\text{Un jugador de un juego de mesa necesita obtener un 6 en un dado para comenzar a jugar. El jugador lanza el dado repetidamente hasta obtener el primer 6. Usando la distribución geométrica, donde cada lanzamiento es independiente y la probabilidad de éxito es } \\frac{1}{6}\\text{, ¿cuál es la probabilidad de que el jugador obtenga su primer 6 exactamente en el tercer intento?}',
    options: ['\\frac{1}{6}', '\\frac{25}{216}', '\\frac{5}{36}', '\\frac{1}{36}'],
    correctAnswer: 1,
    explanation: 'P = \\left(\\frac{5}{6}\\right)^2 \\times \\frac{1}{6} = \\frac{25}{216}',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['probabilidad-otros-modelos', 'probabilidad-geometrica', 'numeros-fracciones', 'numeros-potencias']
  },
  {
    id: 'm2-prob-poisson-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(X=k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}',
    questionLatex: '\\text{Una cafetería registra que en promedio llegan 3 clientes por hora durante las mañanas. El gerente quiere usar la distribución de Poisson para modelar las llegadas de clientes. Si } \\lambda = 3 \\text{ representa el promedio de clientes por hora y la fórmula de Poisson es } P(k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}\\text{, ¿cuál es la probabilidad de que no llegue ningún cliente durante una hora específica?}',
    options: ['e^{-3} \\approx 0.05', '\\frac{1}{3}', '0', '1'],
    correctAnswer: 0,
    explanation: 'P(0) = \\frac{3^0 e^{-3}}{0!} = e^{-3} \\approx 0.05',
    difficulty: 'extreme',
    difficultyScore: 0.95,
    skills: ['probabilidad-otros-modelos', 'probabilidad-poisson', 'numeros-potencias', 'numeros-factorial']
  },
  {
    id: 'm2-prob-modelo-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\text{Binomial: n fijo; Geométrica: hasta primer éxito}',
    questionLatex: '\\text{Un profesor de estadística explica a sus estudiantes las diferencias entre los modelos probabilísticos. Presenta dos situaciones: (1) contar cuántos éxitos hay en exactamente 10 intentos, y (2) contar cuántos intentos se necesitan hasta obtener el primer éxito. Los estudiantes deben identificar qué distribución usar en cada caso. ¿Cuál es la diferencia fundamental entre usar la distribución binomial y la distribución geométrica?}',
    options: ['\\text{Binomial: n fijo; Geométrica: hasta éxito}', '\\text{Son iguales}', '\\text{Binomial: sin rep.; Geométrica: con rep.}', '\\text{Depende de n}'],
    correctAnswer: 0,
    explanation: '\\text{Binomial: } P(X=k) \\text{ en } n \\text{ ensayos}; \\quad \\text{Geométrica: ensayos hasta éxito}',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['probabilidad-otros-modelos', 'probabilidad-conceptos', 'probabilidad-distribucion-binomial']
  },
  // Esperanza (Expected Value) E[X] = n·p
  {
    id: 'm2-prob-bin-esp-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'E[X] = n \\cdot p',
    questionLatex: '\\text{Si lanzas una moneda equilibrada 100 veces, ¿cuántas caras esperas obtener en promedio?}',
    options: ['25', '50', '75', '100'],
    correctAnswer: 1,
    explanation: 'E[X] = n \\cdot p = 100 \\times 0{,}5 = 50',
    difficulty: 'easy',
    difficultyScore: 0.34,
    skills: ['probabilidad-distribucion-binomial', 'probabilidad-esperanza', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-bin-esp-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'E[X] = n \\cdot p',
    questionLatex: '\\text{En una prueba de 20 preguntas de verdadero/falso, un estudiante responde al azar. ¿Cuántas preguntas se espera que acierte en promedio?}',
    options: ['5', '8', '10', '15'],
    correctAnswer: 2,
    explanation: 'E[X] = n \\cdot p = 20 \\times 0{,}5 = 10',
    difficulty: 'easy',
    difficultyScore: 0.34,
    skills: ['probabilidad-distribucion-binomial', 'probabilidad-esperanza', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-bin-esp-3',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'E[X] = n \\cdot p',
    questionLatex: '\\text{Un arquero tiene 70\\% de efectividad. Si realiza 50 lanzamientos, ¿cuántos goles se esperan en promedio?}',
    options: ['25', '30', '35', '40'],
    correctAnswer: 2,
    explanation: 'E[X] = n \\cdot p = 50 \\times 0{,}7 = 35',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['probabilidad-distribucion-binomial', 'probabilidad-esperanza', 'numeros-porcentaje', 'numeros-operaciones-basicas']
  },
  // Varianza y Desviación Estándar Var(X) = n·p·(1-p)
  {
    id: 'm2-prob-bin-var-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'Var(X) = n \\cdot p \\cdot (1-p)',
    questionLatex: '\\text{En un experimento binomial con } n = 100 \\text{ ensayos y } p = 0{,}5\\text{, ¿cuál es la varianza del número de éxitos?}',
    options: ['25', '50', '100', '12{,}5'],
    correctAnswer: 0,
    explanation: 'Var(X) = n \\cdot p \\cdot (1-p) = 100 \\times 0{,}5 \\times 0{,}5 = 25',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['probabilidad-distribucion-binomial', 'probabilidad-varianza', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-bin-var-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\sigma = \\sqrt{n \\cdot p \\cdot (1-p)}',
    questionLatex: '\\text{Si la varianza del número de éxitos en un experimento binomial es 25, ¿cuál es la desviación estándar?}',
    options: ['5', '12{,}5', '25', '625'],
    correctAnswer: 0,
    explanation: '\\sigma = \\sqrt{Var(X)} = \\sqrt{25} = 5',
    difficulty: 'easy',
    difficultyScore: 0.34,
    skills: ['probabilidad-distribucion-binomial', 'probabilidad-desviacion-estandar', 'numeros-raices']
  },
  {
    id: 'm2-prob-bin-var-3',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\sigma = \\sqrt{n \\cdot p \\cdot (1-p)}',
    questionLatex: '\\text{En 400 lanzamientos de una moneda, ¿cuál es la desviación estándar del número de caras?}',
    options: ['5', '10', '20', '100'],
    correctAnswer: 1,
    explanation: '\\sigma = \\sqrt{400 \\times 0{,}5 \\times 0{,}5} = \\sqrt{100} = 10',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['probabilidad-distribucion-binomial', 'probabilidad-desviacion-estandar', 'numeros-raices', 'numeros-operaciones-basicas']
  },
  // Probabilidades "al menos" / "a lo más" (at-least / at-most)
  {
    id: 'm2-prob-bin-atleast-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(X \\geq 1) = 1 - P(X = 0)',
    questionLatex: '\\text{Un dado se lanza 3 veces. ¿Cuál es la probabilidad de obtener al menos un 6?}',
    options: ['\\frac{1}{6}', '\\frac{91}{216}', '\\frac{125}{216}', '\\frac{1}{2}'],
    correctAnswer: 1,
    explanation: 'P(X \\geq 1) = 1 - P(X=0) = 1 - \\left(\\frac{5}{6}\\right)^3 = 1 - \\frac{125}{216} = \\frac{91}{216}',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['probabilidad-distribucion-binomial', 'probabilidad-complemento', 'numeros-fracciones', 'numeros-potencias']
  },
  {
    id: 'm2-prob-bin-atleast-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(X \\geq 2) = 1 - P(X=0) - P(X=1)',
    questionLatex: '\\text{Una moneda se lanza 4 veces. ¿Cuál es la probabilidad de obtener al menos 2 caras?}',
    options: ['\\frac{5}{16}', '\\frac{6}{16}', '\\frac{11}{16}', '\\frac{15}{16}'],
    correctAnswer: 2,
    explanation: 'P(X \\geq 2) = 1 - P(X=0) - P(X=1) = 1 - \\frac{1}{16} - \\frac{4}{16} = \\frac{11}{16}',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['probabilidad-distribucion-binomial', 'probabilidad-complemento', 'probabilidad-combinaciones', 'numeros-fracciones']
  },
  {
    id: 'm2-prob-bin-atmost-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(X \\leq 1) = P(X=0) + P(X=1)',
    questionLatex: '\\text{Se lanza un dado 3 veces. ¿Cuál es la probabilidad de obtener a lo más un 6?}',
    options: ['\\frac{25}{216}', '\\frac{75}{216}', '\\frac{125}{216}', '\\frac{200}{216}'],
    correctAnswer: 3,
    explanation: 'P(X \\leq 1) = P(X=0) + P(X=1) = \\frac{125}{216} + 3 \\times \\frac{1}{6} \\times \\frac{25}{36} = \\frac{125 + 75}{216} = \\frac{200}{216}',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['probabilidad-distribucion-binomial', 'probabilidad-calculo-binomial', 'numeros-fracciones', 'numeros-potencias']
  },
  // Control de calidad / Quality control
  {
    id: 'm2-prob-bin-qc-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(X=0) = (1-p)^n',
    questionLatex: '\\text{Una fábrica produce artículos con 5\\% de defectos. Si se inspeccionan 10 artículos al azar, ¿cuál es la probabilidad de no encontrar ningún defectuoso? (Usa } (0{,}95)^{10} \\approx 0{,}599)',
    options: ['0{,}349', '0{,}500', '0{,}599', '0{,}950'],
    correctAnswer: 2,
    explanation: 'P(X=0) = (0{,}95)^{10} \\approx 0{,}599',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['probabilidad-distribucion-binomial', 'probabilidad-modelos-aplicaciones', 'numeros-potencias', 'numeros-decimales']
  },
  {
    id: 'm2-prob-bin-qc-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(X \\geq 1) = 1 - P(X=0)',
    questionLatex: '\\text{Un lote tiene 10\\% de productos defectuosos. Si se revisan 5 productos, ¿cuál es la probabilidad de encontrar al menos uno defectuoso? (Usa } (0{,}9)^5 \\approx 0{,}59)',
    options: ['0{,}10', '0{,}41', '0{,}50', '0{,}59'],
    correctAnswer: 1,
    explanation: 'P(X \\geq 1) = 1 - P(X=0) = 1 - (0{,}9)^5 \\approx 1 - 0{,}59 = 0{,}41',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['probabilidad-distribucion-binomial', 'probabilidad-complemento', 'probabilidad-modelos-aplicaciones', 'numeros-potencias']
  },
  {
    id: 'm2-prob-bin-qc-3',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En un proceso de manufactura, el 2\\% de los productos son defectuosos. Si se toma una muestra de 100 productos, ¿cuántos defectuosos se esperan encontrar?}',
    options: ['1', '2', '5', '10'],
    correctAnswer: 1,
    explanation: 'E[X] = n \\cdot p = 100 \\times 0{,}02 = 2',
    difficulty: 'easy',
    difficultyScore: 0.34,
    skills: ['probabilidad-distribucion-binomial', 'probabilidad-esperanza', 'probabilidad-modelos-aplicaciones', 'numeros-porcentaje']
  }
];
