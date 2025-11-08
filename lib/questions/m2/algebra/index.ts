import { m2AlgebraSistemasEcuacionesQuestions } from './sistemas-ecuaciones';
import { m2AlgebraEcuacionesCuadraticasQuestions } from './ecuaciones-cuadraticas';

// Export individual topic arrays
export { m2AlgebraSistemasEcuacionesQuestions } from './sistemas-ecuaciones';
export { m2AlgebraEcuacionesCuadraticasQuestions } from './ecuaciones-cuadraticas';

// Export combined array for backward compatibility
export const m2AlgebraQuestions = [
  ...m2AlgebraSistemasEcuacionesQuestions,
  ...m2AlgebraEcuacionesCuadraticasQuestions
];
