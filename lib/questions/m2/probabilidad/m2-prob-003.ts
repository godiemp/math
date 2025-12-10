import { Question } from '../../../types';

/**
 * M2-PROB-003: Conceptos y resolución de problemas de conteo (permutación y combinatoria)
 *
 * Subsections:
 * A. Principio multiplicativo
 *    Habilidades: conteo-principio-multiplicativo
 * B. Permutaciones
 *    Habilidades: conteo-permutaciones
 * C. Combinaciones
 *    Habilidades: conteo-combinaciones
 * D. Problemas de conteo en probabilidad
 *    Habilidades: conteo-problemas-probabilidad
 */

export const m2Prob003Questions: Question[] = [
  // Subsection A: Principio multiplicativo
  {
    id: 'm2-prob-mult-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'n_1 \\times n_2 \\times n_3',
    questionLatex: '\\text{En un restaurant ofrecen un menú que incluye 3 tipos de entrada, 4 platos de fondo y 2 postres. Si un cliente debe elegir exactamente una opción de cada categoría, ¿de cuántas formas diferentes puede armar su menú completo?}',
    options: ['9', '12', '24', '32'],
    correctAnswer: 2,
    explanation: '3 \\times 4 \\times 2 = 24',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['combinatoria-principio-multiplicativo', 'numeros-multiplicacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-mult-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '26^2 \\times 10^3',
    questionLatex: '\\text{Para crear una contraseña se deben elegir 2 letras (de un alfabeto de 26 letras) seguidas de 3 dígitos (del 0 al 9). Si se pueden repetir letras y dígitos, ¿cuántas contraseñas diferentes se pueden crear?}',
    options: ['26.000', '260.000', '676.000', '1.000.000'],
    correctAnswer: 2,
    explanation: '26^2 \\times 10^3 = 676 \\times 1{,}000 = 676{,}000',
    difficulty: 'medium',
    difficultyScore: 0.32,
    skills: ['combinatoria-principio-multiplicativo', 'numeros-potencias', 'numeros-multiplicacion', 'numeros-operaciones-basicas']
  },
  // Subsection B: Permutaciones
  {
    id: 'm2-prob-perm-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(n,r) = \\frac{n!}{(n-r)!}',
    questionLatex: '\\text{En una carrera participan 6 atletas y se entregarán medallas de oro, plata y bronce a los tres primeros lugares. ¿De cuántas formas diferentes se pueden asignar estas tres medallas?}',
    options: ['18', '20', '120', '216'],
    correctAnswer: 2,
    explanation: 'P(6,3) = \\frac{6!}{3!} = 6 \\times 5 \\times 4 = 120',
    difficulty: 'medium',
    difficultyScore: 0.35,
    skills: ['combinatoria-permutaciones', 'probabilidad-factorial', 'numeros-multiplicacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-comb-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'C(n,r) = \\frac{n!}{r!(n-r)!}',
    questionLatex: '\\text{Una profesora de música necesita formar un grupo de cámara seleccionando 3 estudiantes de un grupo de 5 violinistas. Como todos tocan el mismo instrumento, solo importa quiénes son seleccionados, no el orden. ¿De cuántas formas diferentes puede la profesora elegir a los 3 estudiantes para el grupo?}',
    options: ['10', '15', '20', '60'],
    correctAnswer: 0,
    explanation: 'C(5,3) = \\frac{5!}{3! \\times 2!} = \\frac{5 \\times 4}{2 \\times 1} = 10',
    difficulty: 'medium',
    difficultyScore: 0.35,
    skills: ['combinatoria-combinaciones', 'probabilidad-factorial', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-perm-ord-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(n) = n!',
    questionLatex: '\\text{Una bibliotecaria debe organizar 4 libros diferentes de literatura en un estante. Los libros deben quedar en fila y el orden en que se coloquen es importante porque afecta la estética del estante. ¿De cuántas formas diferentes puede la bibliotecaria ordenar estos 4 libros?}',
    options: ['12', '16', '20', '24'],
    correctAnswer: 3,
    explanation: 'P(4) = 4! = 4 \\times 3 \\times 2 \\times 1 = 24',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['combinatoria-permutaciones', 'probabilidad-factorial', 'numeros-operaciones-basicas']
  },
  // Subsection C: Combinaciones
  {
    id: 'm2-prob-comb-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'C(12,5) - C(10,3)',
    questionLatex: '\\text{Se forman equipos de 5 personas de un grupo de 12. Si dos personas específicas NO pueden estar juntas en el equipo, ¿cuántos equipos diferentes se pueden formar?}',
    options: ['672', '720', '792', '462'],
    correctAnswer: 0,
    explanation: 'C(12,5) - C(10,3) = 792 - 120 = 672',
    difficulty: 'hard',
    difficultyScore: 0.58,
    skills: ['probabilidad-combinatoria', 'probabilidad-combinaciones', 'probabilidad-casos-excluyentes', 'probabilidad-factorial', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-comb-3',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'C(n,2) = \\frac{n(n-1)}{2}',
    questionLatex: '\\text{El consejo estudiantil de un colegio está compuesto por 8 estudiantes. Para asistir a un congreso nacional, deben elegir a 2 representantes del consejo. Como ambos representantes tendrán las mismas funciones, no importa el orden de selección. ¿De cuántas maneras diferentes se pueden elegir los 2 representantes?}',
    options: ['16', '28', '56', '64'],
    correctAnswer: 1,
    explanation: 'C(8,2) = \\frac{8!}{2! \\times 6!} = \\frac{8 \\times 7}{2} = 28',
    difficulty: 'medium',
    difficultyScore: 0.32,
    skills: ['probabilidad-combinatoria', 'probabilidad-combinaciones', 'probabilidad-factorial', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-comb-4',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(n,r) = n \\times (n-1) \\times \\cdots \\times (n-r+1)',
    questionLatex: '\\text{Un programador debe crear códigos de acceso de 3 dígitos usando los números 1, 2, 3, 4 y 5, sin repetir ningún dígito. Cada código es una secuencia ordenada donde importa la posición de cada dígito. ¿Cuántos códigos de acceso diferentes puede crear el programador?}',
    options: ['10', '20', '60', '125'],
    correctAnswer: 2,
    explanation: 'P(5,3) = \\frac{5!}{2!} = 5 \\times 4 \\times 3 = 60',
    difficulty: 'medium',
    difficultyScore: 0.35,
    skills: ['combinatoria-permutaciones', 'probabilidad-factorial', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-comb-5',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'C(9,3) - C(5,3)',
    questionLatex: '\\text{Un comité de 3 personas debe incluir al menos 1 mujer. Si hay 5 hombres y 4 mujeres disponibles, ¿cuántos comités diferentes se pueden formar?}',
    options: ['74', '80', '84', '120'],
    correctAnswer: 0,
    explanation: 'C(9,3) - C(5,3) = 84 - 10 = 74',
    difficulty: 'hard',
    difficultyScore: 0.55,
    skills: ['combinatoria-combinaciones', 'probabilidad-casos-excluyentes', 'probabilidad-factorial', 'numeros-operaciones-basicas']
  },
  // Subsection D: Problemas de conteo en probabilidad
  {
    id: 'm2-prob-cont-prob-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'C(n,r)',
    questionLatex: '\\text{En una urna hay 5 bolitas rojas y 3 bolitas azules. Si se extraen 2 bolitas sin reposición, ¿cuántos resultados diferentes son posibles?}',
    options: ['16', '24', '28', '64'],
    correctAnswer: 2,
    explanation: 'C(8,2) = \\frac{8 \\times 7}{2} = 28',
    difficulty: 'medium',
    difficultyScore: 0.32,
    skills: ['combinatoria-problemas-probabilidad', 'combinatoria-combinaciones', 'probabilidad-factorial', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-cont-prob-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'n^r \\text{ (con repetición)}',
    questionLatex: '\\text{Un dado se lanza 3 veces. ¿Cuántos resultados diferentes son posibles si importa el orden en que salen los números?}',
    options: ['18', '20', '120', '216'],
    correctAnswer: 3,
    explanation: '6^3 = 216',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['combinatoria-problemas-probabilidad', 'combinatoria-principio-multiplicativo', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  // Additional Subsection B: Permutaciones
  {
    id: 'm2-prob-perm-2',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(n) = n!',
    questionLatex: '\\text{En una ceremonia de premiación, 5 estudiantes destacados deben sentarse en una fila de 5 sillas en el escenario. El orden en que se sienten determinará el orden de entrega de sus diplomas. ¿De cuántas formas diferentes pueden sentarse los 5 estudiantes en las 5 sillas?}',
    options: ['25', '60', '100', '120'],
    correctAnswer: 3,
    explanation: 'P(5) = 5! = 120',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['conteo-permutaciones', 'probabilidad-factorial', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-perm-3',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(10,4) = 10 \\times 9 \\times 8 \\times 7',
    questionLatex: '\\text{Un sistema de seguridad requiere una contraseña de exactamente 4 dígitos diferentes, usando los dígitos del 0 al 9 sin repetir ninguno. El técnico de seguridad necesita saber cuántas contraseñas distintas pueden configurarse en el sistema. ¿Cuántas contraseñas de 4 dígitos sin repetición se pueden crear?}',
    options: ['5{,}040', '10{,}000', '24', '210'],
    correctAnswer: 0,
    explanation: 'P(10,4) = 10 \\times 9 \\times 8 \\times 7 = 5{,}040',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['conteo-permutaciones', 'probabilidad-factorial', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-perm-4',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\frac{n!}{n_1! \\times n_2! \\times \\cdots}',
    questionLatex: '\\text{Una estudiante de lingüística está estudiando anagramas, que son reordenamientos de las letras de una palabra. Quiere calcular cuántos anagramas diferentes se pueden formar con las letras de la palabra CASA, considerando que la letra A aparece dos veces. ¿Cuántos anagramas distintos tiene la palabra CASA?}',
    options: ['4', '6', '12', '24'],
    correctAnswer: 2,
    explanation: '\\frac{4!}{2!} = \\frac{24}{2} = 12',
    difficulty: 'medium',
    difficultyScore: 0.42,
    skills: ['conteo-permutaciones', 'probabilidad-factorial', 'probabilidad-permutaciones-repeticion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-perm-5',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'P(n,2) = n \\times (n-1)',
    questionLatex: '\\text{En un torneo de fútbol participan 8 equipos en formato de eliminación directa. Al finalizar el torneo, se entregarán trofeos al campeón (primer lugar) y al subcampeón (segundo lugar). Como el orden importa (no es lo mismo ser campeón que subcampeón), ¿de cuántas formas diferentes se pueden asignar estos dos primeros lugares?}',
    options: ['16', '28', '56', '64'],
    correctAnswer: 2,
    explanation: 'P(8,2) = 8 \\times 7 = 56',
    difficulty: 'easy',
    difficultyScore: 0.32,
    skills: ['conteo-permutaciones', 'probabilidad-factorial', 'numeros-operaciones-basicas']
  },
  // Additional Subsection C: Combinaciones
  {
    id: 'm2-prob-comb-6',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'C(n,r) = \\frac{n!}{r!(n-r)!}',
    questionLatex: '\\text{Un entrenador de voleibol tiene un plantel de 10 jugadores y debe seleccionar a 4 de ellos para que formen parte del equipo titular. Como todas las posiciones son intercambiables en el momento de la selección, solo importa quiénes son elegidos. ¿De cuántas formas diferentes puede el entrenador elegir a los 4 titulares?}',
    options: ['40', '210', '5{,}040', '151{,}200'],
    correctAnswer: 1,
    explanation: 'C(10,4) = \\frac{10!}{4! \\times 6!} = 210',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['conteo-combinaciones', 'probabilidad-factorial', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-comb-7',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'C(5,2) = \\frac{5 \\times 4}{2}',
    questionLatex: '\\text{Un profesor de teoría de conjuntos le pide a sus estudiantes que determinen cuántos subconjuntos de exactamente 2 elementos se pueden formar a partir del conjunto } \\{a, b, c, d, e\\}\\text{. Como un subconjunto no considera el orden de sus elementos, ¿cuántos subconjuntos de 2 elementos tiene este conjunto?}',
    options: ['5', '10', '20', '25'],
    correctAnswer: 1,
    explanation: 'C(5,2) = \\frac{5 \\times 4}{2} = 10',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['conteo-combinaciones', 'probabilidad-factorial', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-comb-8',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: 'C(7,3)',
    questionLatex: '\\text{Una pizzería ofrece a sus clientes la opción de personalizar su pizza eligiendo exactamente 3 ingredientes de un menú de 7 ingredientes disponibles. Un cliente quiere saber cuántas pizzas diferentes puede crear con estas opciones. Como el orden en que se agregan los ingredientes no importa, ¿cuántas combinaciones diferentes de ingredientes puede elegir el cliente?}',
    options: ['21', '35', '42', '210'],
    correctAnswer: 1,
    explanation: 'C(7,3) = \\frac{7 \\times 6 \\times 5}{6} = 35',
    difficulty: 'medium',
    difficultyScore: 0.35,
    skills: ['conteo-combinaciones', 'probabilidad-factorial', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-comb-9',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    operacionBase: '\\text{Permutación: orden importa; Combinación: orden no importa}',
    questionLatex: '\\text{Un profesor de estadística explica a sus estudiantes la diferencia entre permutaciones y combinaciones. Les presenta dos situaciones: formar una fila con 3 personas (donde importa quién va primero, segundo y tercero) versus elegir un comité de 3 personas (donde solo importa quiénes son elegidos). ¿Cuál es la diferencia fundamental entre permutación y combinación?}',
    options: ['\\text{Permutación: orden importa}', '\\text{Combinación: orden importa}', '\\text{Son lo mismo}', '\\text{Depende del contexto}'],
    correctAnswer: 0,
    explanation: '\\text{Permutación: } ABC \\neq BAC; \\quad \\text{Combinación: } \\{A,B,C\\} = \\{B,A,C\\}',
    difficulty: 'easy',
    difficultyScore: 0.15,
    skills: ['conteo-permutaciones', 'conteo-combinaciones', 'probabilidad-conceptos']
  }
];
