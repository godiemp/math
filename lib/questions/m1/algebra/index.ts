// ============================================================================
// CURRICULUM-BASED EXPORTS (M1-ALG-###)
// ============================================================================
// Import from new curriculum subsection files
import { m1Alg001Questions } from './m1-alg-001';
import { m1Alg002Questions } from './m1-alg-002';
import { m1Alg003Questions } from './m1-alg-003';
import { m1Alg004Questions } from './m1-alg-004';
import { m1Alg005Questions } from './m1-alg-005';
import { m1Alg006Questions } from './m1-alg-006';
import { m1Alg007Questions } from './m1-alg-007';

// ============================================================================
// LEGACY TOPIC-BASED EXPORTS (for backward compatibility)
// ============================================================================
// Algebraic expressions (modularized)
import { m1AlgebraMonomiosQuestions } from './monomios';
import { m1AlgebraFactorizacionQuestions } from './factorizacion';
import { m1AlgebraProductosNotablesQuestions } from './productos-notables';
import { m1AlgebraPolinomiosQuestions } from './polinomios';
import { m1AlgebraExpresionesRacionalesQuestions } from './expresiones-racionales';

// Equations and functions
import { m1AlgebraEcuacionesInecuacionesQuestions } from './ecuaciones-inecuaciones';
import { m1AlgebraSistemasEcuacionesQuestions } from './sistemas-ecuaciones';
import { m1AlgebraFuncionesLinealesQuestions } from './funciones-lineales';
import { m1AlgebraFuncionesCuadraticasQuestions } from './funciones-cuadraticas';

// ============================================================================
// CURRICULUM-BASED EXPORTS (Chilean PAES M1-ALG-###)
// ============================================================================
// M1-ALG-001: Lenguaje algebraico y expresiones
export { m1Alg001Questions } from './m1-alg-001';

// M1-ALG-002: Reducción de expresiones algebraicas
export { m1Alg002Questions } from './m1-alg-002';

// M1-ALG-003: Ecuaciones e inecuaciones de primer grado
export { m1Alg003Questions } from './m1-alg-003';

// M1-ALG-004: Sistemas de ecuaciones lineales 2x2
export { m1Alg004Questions } from './m1-alg-004';

// M1-ALG-005: Concepto de función
export { m1Alg005Questions } from './m1-alg-005';

// M1-ALG-006: Función lineal y afín
export { m1Alg006Questions } from './m1-alg-006';

// M1-ALG-007: Función cuadrática
export { m1Alg007Questions } from './m1-alg-007';

// ============================================================================
// LEGACY TOPIC-BASED EXPORTS (for backward compatibility)
// ============================================================================
// Export individual topic arrays - algebraic expressions
export { m1AlgebraMonomiosQuestions } from './monomios';
export { m1AlgebraFactorizacionQuestions } from './factorizacion';
export { m1AlgebraProductosNotablesQuestions } from './productos-notables';
export { m1AlgebraPolinomiosQuestions } from './polinomios';
export { m1AlgebraExpresionesRacionalesQuestions } from './expresiones-racionales';

// Export individual topic arrays - equations and functions
export { m1AlgebraEcuacionesInecuacionesQuestions } from './ecuaciones-inecuaciones';
export { m1AlgebraSistemasEcuacionesQuestions } from './sistemas-ecuaciones';
export { m1AlgebraFuncionesLinealesQuestions } from './funciones-lineales';
export { m1AlgebraFuncionesCuadraticasQuestions } from './funciones-cuadraticas';

// Combined algebraic expressions array (for backward compatibility)
export const m1AlgebraExpresionesQuestions = [
  ...m1AlgebraMonomiosQuestions,
  ...m1AlgebraFactorizacionQuestions,
  ...m1AlgebraProductosNotablesQuestions,
  ...m1AlgebraPolinomiosQuestions,
  ...m1AlgebraExpresionesRacionalesQuestions
];

// Export combined array for backward compatibility
export const m1AlgebraQuestions = [
  ...m1AlgebraMonomiosQuestions,
  ...m1AlgebraFactorizacionQuestions,
  ...m1AlgebraProductosNotablesQuestions,
  ...m1AlgebraPolinomiosQuestions,
  ...m1AlgebraExpresionesRacionalesQuestions,
  ...m1AlgebraEcuacionesInecuacionesQuestions,
  ...m1AlgebraSistemasEcuacionesQuestions,
  ...m1AlgebraFuncionesLinealesQuestions,
  ...m1AlgebraFuncionesCuadraticasQuestions
];
