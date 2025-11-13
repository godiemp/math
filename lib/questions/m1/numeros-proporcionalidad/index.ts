import { m1NumerosPorcentajeQuestions } from './porcentaje';
import { m1NumerosProporcionalidadQuestions } from './proporcionalidad';

// Export individual question arrays
export { m1NumerosPorcentajeQuestions } from './porcentaje';
export { m1NumerosProporcionalidadQuestions } from './proporcionalidad';

// Export combined array for backward compatibility
export const m1NumerosProporcionalidadCombinedQuestions = [
  ...m1NumerosPorcentajeQuestions,
  ...m1NumerosProporcionalidadQuestions
];
