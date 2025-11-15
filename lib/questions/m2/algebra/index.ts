// Curriculum-based imports
import { m2Alg001Questions } from './m2-alg-001';
import { m2Alg002Questions } from './m2-alg-002';
import { m2Alg003Questions } from './m2-alg-003';

// Legacy topic-based imports (unique questions not yet in curriculum)
import { m2AlgebraExpresionesAlgebraicasQuestions } from './expresiones-algebraicas';
import { m2AlgebraEcuacionesInecuacionesQuestions } from './ecuaciones-inecuaciones';
import { m2AlgebraFuncionesLinealesQuestions } from './funciones-lineales';
import { m2AlgebraEcuacionesCuadraticasQuestions } from './ecuaciones-cuadraticas';

// Export curriculum subsections
export { m2Alg001Questions } from './m2-alg-001';
export { m2Alg002Questions } from './m2-alg-002';
export { m2Alg003Questions } from './m2-alg-003';

// Export legacy topic-based modules (unique questions not yet in curriculum)
export { m2AlgebraExpresionesAlgebraicasQuestions } from './expresiones-algebraicas';
export { m2AlgebraEcuacionesInecuacionesQuestions } from './ecuaciones-inecuaciones';
export { m2AlgebraFuncionesLinealesQuestions } from './funciones-lineales';
export { m2AlgebraEcuacionesCuadraticasQuestions } from './ecuaciones-cuadraticas';

// Export combined array
export const m2AlgebraQuestions = [
  ...m2Alg001Questions,
  ...m2Alg002Questions,
  ...m2Alg003Questions,
  ...m2AlgebraExpresionesAlgebraicasQuestions,
  ...m2AlgebraEcuacionesInecuacionesQuestions,
  ...m2AlgebraFuncionesLinealesQuestions,
  ...m2AlgebraEcuacionesCuadraticasQuestions
];
