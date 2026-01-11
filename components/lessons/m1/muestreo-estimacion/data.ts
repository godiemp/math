/**
 * Data and utilities for the Muestreo y Estimación lesson
 * Population: 800 students with snack preferences
 */

export type Preference = 'galletas' | 'papas' | 'frutas';

export interface Student {
  id: number;
  preference: Preference;
}

// True population proportions (hidden from students initially)
export const TRUE_PROPORTIONS = {
  galletas: 0.58, // 58% prefer cookies
  papas: 0.30, // 30% prefer chips
  frutas: 0.12, // 12% prefer fruit
};

export const POPULATION_SIZE = 800;
export const DEFAULT_SAMPLE_SIZE = 40;

// Colors for each preference
export const PREFERENCE_COLORS = {
  galletas: {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    border: 'border-amber-300 dark:border-amber-700',
    fill: '#f59e0b', // amber-500
    text: 'text-amber-700 dark:text-amber-300',
    label: 'Galletas',
    emoji: '🍪',
  },
  papas: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    border: 'border-red-300 dark:border-red-700',
    fill: '#ef4444', // red-500
    text: 'text-red-700 dark:text-red-300',
    label: 'Papas Fritas',
    emoji: '🍟',
  },
  frutas: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    border: 'border-green-300 dark:border-green-700',
    fill: '#22c55e', // green-500
    text: 'text-green-700 dark:text-green-300',
    label: 'Frutas',
    emoji: '🍎',
  },
};

// Generate the full population (deterministic based on proportions)
function generatePopulation(): Student[] {
  const population: Student[] = [];

  // Calculate exact counts for each preference
  const galletasCount = Math.round(POPULATION_SIZE * TRUE_PROPORTIONS.galletas);
  const papasCount = Math.round(POPULATION_SIZE * TRUE_PROPORTIONS.papas);
  const frutasCount = POPULATION_SIZE - galletasCount - papasCount;

  let id = 0;

  // Add students with each preference
  for (let i = 0; i < galletasCount; i++) {
    population.push({ id: id++, preference: 'galletas' });
  }
  for (let i = 0; i < papasCount; i++) {
    population.push({ id: id++, preference: 'papas' });
  }
  for (let i = 0; i < frutasCount; i++) {
    population.push({ id: id++, preference: 'frutas' });
  }

  // Shuffle the population using a seeded random for consistency
  return shuffleArray(population, 42);
}

// Seeded shuffle for reproducibility
function shuffleArray<T>(array: T[], seed: number): T[] {
  const result = [...array];
  let currentIndex = result.length;
  let randomIndex;

  // Simple seeded random
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  while (currentIndex !== 0) {
    randomIndex = Math.floor(seededRandom() * currentIndex);
    currentIndex--;
    [result[currentIndex], result[randomIndex]] = [result[randomIndex], result[currentIndex]];
  }

  return result;
}

// The full population (generated once)
export const POPULATION = generatePopulation();

// Calculate actual counts in the population
export const ACTUAL_COUNTS = {
  galletas: POPULATION.filter((s) => s.preference === 'galletas').length,
  papas: POPULATION.filter((s) => s.preference === 'papas').length,
  frutas: POPULATION.filter((s) => s.preference === 'frutas').length,
};

// Take a random sample from the population
export function takeSample(size: number = DEFAULT_SAMPLE_SIZE): Student[] {
  const shuffled = [...POPULATION].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, size);
}

// Calculate sample proportions
export function calculateProportions(sample: Student[]): Record<Preference, number> {
  const counts = {
    galletas: sample.filter((s) => s.preference === 'galletas').length,
    papas: sample.filter((s) => s.preference === 'papas').length,
    frutas: sample.filter((s) => s.preference === 'frutas').length,
  };

  return {
    galletas: counts.galletas / sample.length,
    papas: counts.papas / sample.length,
    frutas: counts.frutas / sample.length,
  };
}

// Calculate counts from a sample
export function calculateCounts(sample: Student[]): Record<Preference, number> {
  return {
    galletas: sample.filter((s) => s.preference === 'galletas').length,
    papas: sample.filter((s) => s.preference === 'papas').length,
    frutas: sample.filter((s) => s.preference === 'frutas').length,
  };
}

// Pre-generated samples for consistent exploration experience
// Each sample shows slightly different results (natural variation)
export const PRE_GENERATED_SAMPLES = [
  { galletas: 24, papas: 12, frutas: 4, total: 40 }, // 60%, 30%, 10%
  { galletas: 22, papas: 13, frutas: 5, total: 40 }, // 55%, 32.5%, 12.5%
  { galletas: 25, papas: 11, frutas: 4, total: 40 }, // 62.5%, 27.5%, 10%
  { galletas: 23, papas: 12, frutas: 5, total: 40 }, // 57.5%, 30%, 12.5%
];

// Sample bias examples for Step4Classify
export interface SampleScenario {
  id: string;
  description: string;
  method: string;
  isBiased: boolean;
  explanation: string;
}

export const SAMPLE_SCENARIOS: SampleScenario[] = [
  {
    id: 'random-all',
    description: 'Seleccionar 50 estudiantes al azar usando una lista de todos los cursos',
    method: 'Aleatorio simple',
    isBiased: false,
    explanation:
      'Todos los estudiantes tienen la misma probabilidad de ser seleccionados. Es una muestra representativa.',
  },
  {
    id: 'only-friends',
    description: 'Preguntar solo a tus amigos cercanos (10 personas)',
    method: 'Conveniencia',
    isBiased: true,
    explanation:
      'Tus amigos probablemente tienen gustos similares a los tuyos. No representa a toda la población.',
  },
  {
    id: 'expensive-backpacks',
    description: 'Preguntar solo a estudiantes con mochilas de marca costosa',
    method: 'Sesgo de selección',
    isBiased: true,
    explanation:
      'Solo incluye estudiantes de cierto nivel económico, excluyendo a gran parte de la población.',
  },
  {
    id: 'one-per-class',
    description: 'Seleccionar 1 estudiante al azar de cada uno de los 20 cursos',
    method: 'Estratificado',
    isBiased: false,
    explanation:
      'Garantiza representación de todos los cursos. Es una muestra bien diseñada.',
  },
  {
    id: 'cafeteria-lunch',
    description: 'Preguntar a los primeros 30 estudiantes que entran a almorzar',
    method: 'Conveniencia',
    isBiased: true,
    explanation:
      'Los que llegan primero pueden tener características diferentes (más hambre, menos actividades extracurriculares).',
  },
  {
    id: 'systematic',
    description: 'De una lista ordenada alfabéticamente, seleccionar cada 16° estudiante',
    method: 'Sistemático',
    isBiased: false,
    explanation:
      'Si la lista no tiene un patrón oculto, este método da una muestra representativa.',
  },
];

// Practice problems for Step5
export interface PracticeProblem {
  id: string;
  context: string;
  question: string;
  data: {
    populationSize: number;
    sampleSize: number;
    favorable: number;
    characteristic: string;
  };
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

export const PRACTICE_PROBLEMS: PracticeProblem[] = [
  {
    id: 'p1',
    context:
      'En un colegio de 600 estudiantes, se preguntó a 50 estudiantes elegidos al azar si usan lentes.',
    question: 'Si 15 de los 50 estudiantes usan lentes, ¿cuál es la proporción muestral?',
    data: {
      populationSize: 600,
      sampleSize: 50,
      favorable: 15,
      characteristic: 'usar lentes',
    },
    options: ['15%', '25%', '30%', '50%'],
    correctAnswer: 2,
    hint: 'La proporción muestral es: favorable ÷ tamaño de muestra',
    explanation: 'Proporción = 15/50 = 0.30 = 30%',
  },
  {
    id: 'p2',
    context:
      'Una fábrica produce 10,000 tornillos diarios. Se revisan 200 tornillos al azar y 8 están defectuosos.',
    question: '¿Aproximadamente cuántos tornillos defectuosos habría en la producción diaria?',
    data: {
      populationSize: 10000,
      sampleSize: 200,
      favorable: 8,
      characteristic: 'defectuoso',
    },
    options: ['8 tornillos', '40 tornillos', '400 tornillos', '800 tornillos'],
    correctAnswer: 2,
    hint: 'Primero calcula el porcentaje en la muestra, luego aplícalo a la población',
    explanation: 'En la muestra: 8/200 = 4%. En la población: 4% de 10,000 = 400 tornillos',
  },
  {
    id: 'p3',
    context:
      'Para estimar qué porcentaje de familias tiene mascotas, un investigador pregunta solo en una tienda de mascotas.',
    question: '¿Qué problema tiene esta muestra?',
    data: {
      populationSize: 0,
      sampleSize: 0,
      favorable: 0,
      characteristic: 'tener mascotas',
    },
    options: [
      'La muestra es muy pequeña',
      'La muestra está sesgada hacia personas con mascotas',
      'No hay problema, es una buena muestra',
      'Debería preguntar en más tiendas de mascotas',
    ],
    correctAnswer: 1,
    hint: '¿Quiénes visitan una tienda de mascotas?',
    explanation:
      'Las personas en una tienda de mascotas probablemente ya tienen o quieren mascotas. Esto sobreestimará el porcentaje real.',
  },
];
