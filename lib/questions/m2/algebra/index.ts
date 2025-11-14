// Curriculum-based imports
import { m2Alg001Questions } from './m2-alg-001';
import { m2Alg002Questions } from './m2-alg-002';
import { m2Alg003Questions } from './m2-alg-003';

// Legacy topic-based imports (backward compatibility)
import { m2AlgebraExpresionesAlgebraicasQuestions } from './expresiones-algebraicas';
import { m2AlgebraEcuacionesInecuacionesQuestions } from './ecuaciones-inecuaciones';
import { m2AlgebraSistemasEcuacionesQuestions } from './sistemas-ecuaciones';
import { m2AlgebraFuncionesLinealesQuestions } from './funciones-lineales';
import { m2AlgebraEcuacionesCuadraticasQuestions } from './ecuaciones-cuadraticas';

// Export curriculum subsections
export { m2Alg001Questions } from './m2-alg-001';
export { m2Alg002Questions } from './m2-alg-002';
export { m2Alg003Questions } from './m2-alg-003';

// Export legacy topic-based modules (backward compatibility)
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
