import { m1NumerosEnterosRacionalesQuestions } from './enteros-racionales';
import { m1NumerosPotenciasRaicesQuestions } from './potencias-raices';

// Export individual question arrays
export { m1NumerosEnterosRacionalesQuestions } from './enteros-racionales';
export { m1NumerosPotenciasRaicesQuestions } from './potencias-raices';

// Export combined array for backward compatibility
export const m1NumerosOperacionesQuestions = [
  ...m1NumerosEnterosRacionalesQuestions,
  ...m1NumerosPotenciasRaicesQuestions
];
