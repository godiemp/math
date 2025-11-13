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
