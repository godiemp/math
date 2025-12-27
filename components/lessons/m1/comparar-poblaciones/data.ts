/**
 * Population data for MA1M-OA-13: Comparar Poblaciones
 * Two schools with different correlation patterns
 */

export interface DataPoint {
  x: number;  // Study hours (1-10)
  y: number;  // Test score (0-100)
  population: 'A' | 'B';
  id: string;
}

// Escuela A: Strong positive correlation (more study = better scores)
// r ≈ 0.95 - clear upward trend
export const ESCUELA_A: DataPoint[] = [
  { x: 2, y: 42, population: 'A', id: 'a1' },
  { x: 3, y: 50, population: 'A', id: 'a2' },
  { x: 4, y: 55, population: 'A', id: 'a3' },
  { x: 4, y: 60, population: 'A', id: 'a4' },
  { x: 5, y: 65, population: 'A', id: 'a5' },
  { x: 6, y: 70, population: 'A', id: 'a6' },
  { x: 7, y: 75, population: 'A', id: 'a7' },
  { x: 7, y: 80, population: 'A', id: 'a8' },
  { x: 8, y: 85, population: 'A', id: 'a9' },
  { x: 9, y: 92, population: 'A', id: 'a10' },
];

// Escuela B: Weaker positive correlation (study matters less)
// r ≈ 0.5 - scattered points with slight upward trend
export const ESCUELA_B: DataPoint[] = [
  { x: 2, y: 55, population: 'B', id: 'b1' },
  { x: 3, y: 48, population: 'B', id: 'b2' },
  { x: 4, y: 70, population: 'B', id: 'b3' },
  { x: 4, y: 52, population: 'B', id: 'b4' },
  { x: 5, y: 65, population: 'B', id: 'b5' },
  { x: 6, y: 58, population: 'B', id: 'b6' },
  { x: 7, y: 75, population: 'B', id: 'b7' },
  { x: 7, y: 62, population: 'B', id: 'b8' },
  { x: 8, y: 68, population: 'B', id: 'b9' },
  { x: 9, y: 78, population: 'B', id: 'b10' },
];

// Calculate mean of an array
const mean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

// Summary statistics for hook scenario
export const ESCUELA_A_STATS = {
  meanHours: mean(ESCUELA_A.map(p => p.x)),
  meanScore: mean(ESCUELA_A.map(p => p.y)),
};

export const ESCUELA_B_STATS = {
  meanHours: mean(ESCUELA_B.map(p => p.x)),
  meanScore: mean(ESCUELA_B.map(p => p.y)),
};

// Color configuration
export const POPULATION_COLORS = {
  A: {
    fill: '#3b82f6',      // blue-500
    fillDark: '#60a5fa',  // blue-400
    bg: 'bg-blue-500',
    bgLight: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500',
  },
  B: {
    fill: '#f97316',      // orange-500
    fillDark: '#fb923c',  // orange-400
    bg: 'bg-orange-500',
    bgLight: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-500',
  },
};

// Classification challenge data sets
export interface ClassifyChallenge {
  id: string;
  description: string;
  dataA: DataPoint[];
  dataB?: DataPoint[];
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Positive correlation (for classification)
const POSITIVE_CORR: DataPoint[] = [
  { x: 1, y: 20, population: 'A', id: 'pos1' },
  { x: 2, y: 30, population: 'A', id: 'pos2' },
  { x: 3, y: 35, population: 'A', id: 'pos3' },
  { x: 4, y: 45, population: 'A', id: 'pos4' },
  { x: 5, y: 50, population: 'A', id: 'pos5' },
  { x: 6, y: 60, population: 'A', id: 'pos6' },
  { x: 7, y: 65, population: 'A', id: 'pos7' },
  { x: 8, y: 75, population: 'A', id: 'pos8' },
];

// Negative correlation (for classification) - tight/strong
const NEGATIVE_CORR: DataPoint[] = [
  { x: 1, y: 80, population: 'A', id: 'neg1' },
  { x: 2, y: 72, population: 'A', id: 'neg2' },
  { x: 3, y: 65, population: 'A', id: 'neg3' },
  { x: 4, y: 55, population: 'A', id: 'neg4' },
  { x: 5, y: 50, population: 'A', id: 'neg5' },
  { x: 6, y: 40, population: 'A', id: 'neg6' },
  { x: 7, y: 35, population: 'A', id: 'neg7' },
  { x: 8, y: 25, population: 'A', id: 'neg8' },
];

// Negative correlation - scattered/weak (for comparison)
const NEGATIVE_CORR_SCATTERED: DataPoint[] = [
  { x: 1, y: 75, population: 'B', id: 'negs1' },
  { x: 2, y: 85, population: 'B', id: 'negs2' },
  { x: 3, y: 55, population: 'B', id: 'negs3' },
  { x: 4, y: 70, population: 'B', id: 'negs4' },
  { x: 5, y: 40, population: 'B', id: 'negs5' },
  { x: 6, y: 55, population: 'B', id: 'negs6' },
  { x: 7, y: 30, population: 'B', id: 'negs7' },
  { x: 8, y: 45, population: 'B', id: 'negs8' },
];

// No correlation (random scatter)
const NO_CORR: DataPoint[] = [
  { x: 1, y: 50, population: 'A', id: 'no1' },
  { x: 2, y: 30, population: 'A', id: 'no2' },
  { x: 3, y: 70, population: 'A', id: 'no3' },
  { x: 4, y: 45, population: 'A', id: 'no4' },
  { x: 5, y: 60, population: 'A', id: 'no5' },
  { x: 6, y: 35, population: 'A', id: 'no6' },
  { x: 7, y: 55, population: 'A', id: 'no7' },
  { x: 8, y: 40, population: 'A', id: 'no8' },
];

// Tight cloud (strong correlation)
const TIGHT_CLOUD: DataPoint[] = [
  { x: 2, y: 30, population: 'A', id: 't1' },
  { x: 3, y: 38, population: 'A', id: 't2' },
  { x: 4, y: 45, population: 'A', id: 't3' },
  { x: 5, y: 52, population: 'A', id: 't4' },
  { x: 6, y: 60, population: 'A', id: 't5' },
  { x: 7, y: 68, population: 'A', id: 't6' },
  { x: 8, y: 75, population: 'A', id: 't7' },
];

// Scattered cloud (weak correlation)
const SCATTERED_CLOUD: DataPoint[] = [
  { x: 2, y: 45, population: 'B', id: 's1' },
  { x: 3, y: 30, population: 'B', id: 's2' },
  { x: 4, y: 55, population: 'B', id: 's3' },
  { x: 5, y: 40, population: 'B', id: 's4' },
  { x: 6, y: 65, population: 'B', id: 's5' },
  { x: 7, y: 50, population: 'B', id: 's6' },
  { x: 8, y: 70, population: 'B', id: 's7' },
];

// High Y population
const HIGH_Y: DataPoint[] = [
  { x: 2, y: 70, population: 'A', id: 'h1' },
  { x: 3, y: 75, population: 'A', id: 'h2' },
  { x: 4, y: 80, population: 'A', id: 'h3' },
  { x: 5, y: 78, population: 'A', id: 'h4' },
  { x: 6, y: 85, population: 'A', id: 'h5' },
  { x: 7, y: 82, population: 'A', id: 'h6' },
];

// Low Y population
const LOW_Y: DataPoint[] = [
  { x: 2, y: 35, population: 'B', id: 'l1' },
  { x: 3, y: 40, population: 'B', id: 'l2' },
  { x: 4, y: 45, population: 'B', id: 'l3' },
  { x: 5, y: 42, population: 'B', id: 'l4' },
  { x: 6, y: 50, population: 'B', id: 'l5' },
  { x: 7, y: 48, population: 'B', id: 'l6' },
];

export const CLASSIFY_CHALLENGES: ClassifyChallenge[] = [
  {
    id: 'c1',
    description: 'Observa el siguiente grafico de dispersion:',
    dataA: POSITIVE_CORR,
    question: '¿Que tipo de correlacion muestra este grafico?',
    options: ['Positiva', 'Negativa', 'Sin correlacion', 'No se puede determinar'],
    correctAnswer: 0,
    explanation: 'Los puntos van de abajo-izquierda a arriba-derecha: cuando X aumenta, Y tambien aumenta. Esto es correlacion positiva.',
  },
  {
    id: 'c2',
    description: 'Compara las dos poblaciones:',
    dataA: TIGHT_CLOUD,
    dataB: SCATTERED_CLOUD,
    question: '¿Cual poblacion muestra una correlacion mas fuerte?',
    options: ['Poblacion A (azul)', 'Poblacion B (naranja)', 'Son iguales', 'Ninguna tiene correlacion'],
    correctAnswer: 0,
    explanation: 'La poblacion A (azul) tiene puntos mas alineados en una linea diagonal, indicando una correlacion mas fuerte y predecible.',
  },
  {
    id: 'c3',
    description: 'Observa las dos nubes de puntos:',
    dataA: HIGH_Y,
    dataB: LOW_Y,
    question: '¿Cual poblacion tiene valores de Y generalmente mas altos?',
    options: ['Poblacion A (azul)', 'Poblacion B (naranja)', 'Son similares', 'No se puede comparar'],
    correctAnswer: 0,
    explanation: 'Los puntos azules (Poblacion A) estan consistentemente mas arriba en el eje Y, con valores entre 70-85, mientras que los naranjas estan entre 35-50.',
  },
  {
    id: 'c4',
    description: 'Analiza el patron de este grafico:',
    dataA: NEGATIVE_CORR,
    question: 'En este grafico, cuando X aumenta, Y...',
    options: ['Aumenta', 'Disminuye', 'No cambia', 'Cambia aleatoriamente'],
    correctAnswer: 1,
    explanation: 'Los puntos van de arriba-izquierda a abajo-derecha: cuando X aumenta, Y disminuye. Esto es correlacion negativa.',
  },
  {
    id: 'c5',
    description: 'Datos de dos escuelas (horas de estudio vs notas):',
    dataA: ESCUELA_A,
    dataB: ESCUELA_B,
    question: 'Comparando las dos escuelas, ¿en cual el tiempo de estudio tiene MAS impacto en las notas?',
    options: ['Escuela A (azul)', 'Escuela B (naranja)', 'El mismo impacto', 'No hay relacion en ninguna'],
    correctAnswer: 0,
    explanation: 'La Escuela A muestra una tendencia diagonal mas clara y apretada: mas horas de estudio se traducen de forma mas consistente en mejores notas.',
  },
  {
    id: 'c6',
    description: 'Observa este grafico sin patron claro:',
    dataA: NO_CORR,
    question: '¿Que puedes concluir sobre la relacion entre X e Y?',
    options: ['Correlacion positiva fuerte', 'Correlacion negativa fuerte', 'No hay correlacion clara', 'Correlacion perfecta'],
    correctAnswer: 2,
    explanation: 'Los puntos estan dispersos sin seguir un patron diagonal claro. No hay correlacion: conocer X no ayuda a predecir Y.',
  },
];

// Practice problems
export interface PracticeProblem {
  id: string;
  context: string;
  question: string;
  dataA: DataPoint[];
  dataB?: DataPoint[];
  hint: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const PRACTICE_PROBLEMS: PracticeProblem[] = [
  {
    id: 'p1',
    context: 'Un biologo compara el peso (X) y la altura (Y) de dos especies de aves.',
    question: 'Si la Especie A muestra puntos muy alineados y la Especie B muestra puntos muy dispersos, ¿que puedes concluir?',
    dataA: TIGHT_CLOUD,
    dataB: SCATTERED_CLOUD,
    hint: 'Piensa en que significa "puntos alineados" vs "puntos dispersos" para hacer predicciones.',
    options: [
      'En Especie A, el peso predice mejor la altura',
      'En Especie B, el peso predice mejor la altura',
      'No hay relacion en ninguna especie',
      'Las especies tienen el mismo peso promedio',
    ],
    correctAnswer: 0,
    explanation: 'Puntos alineados = correlacion fuerte. En la Especie A, conocer el peso permite predecir la altura con mas precision que en la Especie B.',
  },
  {
    id: 'p2',
    context: 'Se grafica horas de ejercicio (X) vs nivel de estres (Y) para dos grupos de personas.',
    question: 'Ambos grupos muestran que los puntos bajan de izquierda a derecha, pero el Grupo A tiene puntos mas "apretados". ¿Que significa?',
    dataA: NEGATIVE_CORR,
    dataB: NEGATIVE_CORR_SCATTERED,
    hint: 'Cuando los puntos bajan de izquierda a derecha, ¿que tipo de correlacion es? "Apretado" significa puntos cercanos a una linea.',
    options: [
      'El ejercicio aumenta el estres en ambos grupos',
      'El ejercicio reduce el estres, pero de forma mas predecible en el Grupo A',
      'No hay relacion entre ejercicio y estres',
      'El Grupo B hace mas ejercicio',
    ],
    correctAnswer: 1,
    explanation: 'Puntos que bajan = correlacion negativa (mas ejercicio, menos estres). Puntos "apretados" = relacion mas consistente/predecible.',
  },
  {
    id: 'p3',
    context: 'Se comparan ventas (X) vs ganancias (Y) de tiendas en dos ciudades.',
    question: 'Ciudad A: puntos van de (100, 20) a (500, 100). Ciudad B: puntos van de (100, 50) a (500, 130). ¿Cual ciudad tiene mejor margen?',
    dataA: [
      { x: 1, y: 20, population: 'A', id: 'v1' },
      { x: 3, y: 40, population: 'A', id: 'v2' },
      { x: 5, y: 60, population: 'A', id: 'v3' },
      { x: 7, y: 80, population: 'A', id: 'v4' },
      { x: 9, y: 100, population: 'A', id: 'v5' },
    ],
    dataB: [
      { x: 1, y: 50, population: 'B', id: 'vb1' },
      { x: 3, y: 70, population: 'B', id: 'vb2' },
      { x: 5, y: 90, population: 'B', id: 'vb3' },
      { x: 7, y: 110, population: 'B', id: 'vb4' },
      { x: 9, y: 130, population: 'B', id: 'vb5' },
    ],
    hint: 'El margen es la ganancia relativa a las ventas. Compara donde estan los puntos en el eje Y para el mismo nivel de ventas.',
    options: [
      'Ciudad A (sus puntos estan mas abajo)',
      'Ciudad B (sus puntos estan mas arriba)',
      'Son iguales (misma pendiente)',
      'No se puede determinar',
    ],
    correctAnswer: 1,
    explanation: 'Ciudad B tiene ganancias mas altas para el mismo nivel de ventas (sus puntos estan siempre mas arriba). Eso significa mejor margen de ganancia.',
  },
  {
    id: 'p4',
    context: 'Un grafico muestra temperatura (X) vs consumo electrico (Y) para casas CON y SIN aire acondicionado.',
    question: 'Las casas CON aire muestran correlacion positiva fuerte. Las SIN aire muestran casi ningun patron. ¿Por que?',
    dataA: POSITIVE_CORR,
    dataB: NO_CORR,
    hint: 'Piensa en que aparato electrico se usa mas cuando hace calor.',
    options: [
      'El aire acondicionado consume mas electricidad cuando hace mas calor',
      'Las casas sin aire usan menos electricidad en total',
      'La temperatura no afecta el consumo electrico',
      'Es un error en los datos',
    ],
    correctAnswer: 0,
    explanation: 'En casas con A/C, mas calor = mas uso de aire acondicionado = mas consumo electrico (correlacion positiva). Sin A/C, el consumo no depende tanto de la temperatura.',
  },
  {
    id: 'p5',
    context: 'Se evaluan dos metodos de ensenanza graficando horas de practica (X) vs puntaje final (Y).',
    question: 'Metodo A: puntos muy alineados con pendiente positiva. Metodo B: puntos dispersos pero generalmente mas altos. ¿Cual es mejor?',
    dataA: TIGHT_CLOUD,
    dataB: HIGH_Y,
    hint: 'Correlacion fuerte significa que la relacion es predecible. Pero ¿que pasa si los puntajes de un metodo son simplemente mas altos?',
    options: [
      'Metodo A es mejor (correlacion mas fuerte)',
      'Metodo B es mejor (puntajes mas altos)',
      'Depende de si valoras prediccion o resultados',
      'Son exactamente iguales',
    ],
    correctAnswer: 2,
    explanation: 'Metodo A es mas predecible (correlacion fuerte), pero Metodo B tiene puntajes generalmente mas altos. La respuesta depende de lo que valores mas.',
  },
];

// Checkpoint quiz questions
export interface CheckpointQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const CHECKPOINT_QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'v1',
    question: 'En un grafico de dispersion, si los puntos van de abajo-izquierda a arriba-derecha, la correlacion es:',
    options: ['Positiva', 'Negativa', 'Nula', 'Imposible de determinar'],
    correctAnswer: 0,
    explanation: 'Cuando X aumenta y Y tambien aumenta, los puntos suben hacia la derecha. Esto indica correlacion positiva.',
  },
  {
    id: 'v2',
    question: 'Para comparar dos poblaciones en un mismo grafico XY, la mejor practica es usar:',
    options: [
      'Un solo color para todos los puntos',
      'Dos colores diferentes, uno por poblacion',
      'Solo calcular los promedios',
      'Graficos completamente separados',
    ],
    correctAnswer: 1,
    explanation: 'Usar dos colores distintos en el mismo grafico permite comparar directamente las distribuciones y tendencias de ambas poblaciones.',
  },
  {
    id: 'v3',
    question: 'Si la Poblacion A tiene puntos muy dispersos y la Poblacion B tiene puntos bien alineados en diagonal, entonces:',
    options: [
      'La Poblacion A tiene correlacion mas fuerte',
      'La Poblacion B tiene correlacion mas fuerte',
      'Ambas tienen la misma correlacion',
      'Ninguna tiene correlacion',
    ],
    correctAnswer: 1,
    explanation: 'Puntos bien alineados indican correlacion fuerte (facil de predecir). Puntos dispersos indican correlacion debil.',
  },
  {
    id: 'v4',
    question: 'Un grafico muestra horas de sueno (X) vs rendimiento (Y). Los puntos suben hasta X=7 y luego bajan. Esto indica:',
    options: [
      'Correlacion positiva simple',
      'Correlacion negativa simple',
      'Una relacion no lineal (ni positiva ni negativa simple)',
      'Sin correlacion',
    ],
    correctAnswer: 2,
    explanation: 'Si la relacion sube y luego baja, no es lineal. Hay un punto optimo (7 horas) donde el rendimiento es maximo.',
  },
];
