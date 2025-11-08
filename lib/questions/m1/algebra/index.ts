import { m1AlgebraExpresionesQuestions } from './expresiones-algebraicas';
import { m1AlgebraEcuacionesInecuacionesQuestions } from './ecuaciones-inecuaciones';
import { m1AlgebraSistemasEcuacionesQuestions } from './sistemas-ecuaciones';
import { m1AlgebraFuncionesLinealesQuestions } from './funciones-lineales';
import { m1AlgebraFuncionesCuadraticasQuestions } from './funciones-cuadraticas';

// Export individual topic arrays
export { m1AlgebraExpresionesQuestions } from './expresiones-algebraicas';
export { m1AlgebraEcuacionesInecuacionesQuestions } from './ecuaciones-inecuaciones';
export { m1AlgebraSistemasEcuacionesQuestions } from './sistemas-ecuaciones';
export { m1AlgebraFuncionesLinealesQuestions } from './funciones-lineales';
export { m1AlgebraFuncionesCuadraticasQuestions } from './funciones-cuadraticas';

// Export combined array for backward compatibility
export const m1AlgebraQuestions = [
  ...m1AlgebraExpresionesQuestions,
  ...m1AlgebraEcuacionesInecuacionesQuestions,
  ...m1AlgebraSistemasEcuacionesQuestions,
  ...m1AlgebraFuncionesLinealesQuestions,
  ...m1AlgebraFuncionesCuadraticasQuestions
];
