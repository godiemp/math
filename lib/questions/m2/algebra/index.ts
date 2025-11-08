import { m2AlgebraExpresionesAlgebraicasQuestions } from './expresiones-algebraicas';
import { m2AlgebraEcuacionesInecuacionesQuestions } from './ecuaciones-inecuaciones';
import { m2AlgebraSistemasEcuacionesQuestions } from './sistemas-ecuaciones';
import { m2AlgebraFuncionesLinealesQuestions } from './funciones-lineales';
import { m2AlgebraEcuacionesCuadraticasQuestions } from './ecuaciones-cuadraticas';

// Export individual topic arrays
export { m2AlgebraExpresionesAlgebraicasQuestions } from './expresiones-algebraicas';
export { m2AlgebraEcuacionesInecuacionesQuestions } from './ecuaciones-inecuaciones';
export { m2AlgebraSistemasEcuacionesQuestions } from './sistemas-ecuaciones';
export { m2AlgebraFuncionesLinealesQuestions } from './funciones-lineales';
export { m2AlgebraEcuacionesCuadraticasQuestions } from './ecuaciones-cuadraticas';

// Export combined array for backward compatibility
export const m2AlgebraQuestions = [
  ...m2AlgebraExpresionesAlgebraicasQuestions,
  ...m2AlgebraEcuacionesInecuacionesQuestions,
  ...m2AlgebraSistemasEcuacionesQuestions,
  ...m2AlgebraFuncionesLinealesQuestions,
  ...m2AlgebraEcuacionesCuadraticasQuestions
];
