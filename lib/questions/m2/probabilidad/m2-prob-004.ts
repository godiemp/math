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
    skills: ['probabilidad-otros-modelos', 'probabilidad-conceptos', 'probabilidad-distribucion-binomial']
  }
];
