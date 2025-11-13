import { Question } from '../../types';

// Import from Números y Operaciones
import { m1NumerosEnterosRacionalesQuestions } from './numeros-operaciones/enteros-racionales';
import { m1NumerosPotenciasRaicesQuestions } from './numeros-operaciones/potencias-raices';

// Import from Números y Proporcionalidad
import { m1NumerosPorcentajeQuestions } from './numeros-proporcionalidad/porcentaje';
import { m1NumerosProporcionalidadQuestions } from './numeros-proporcionalidad/proporcionalidad';

// Import from Álgebra y Funciones
import { m1AlgebraQuestions } from './algebra-funciones';

// Import from Geometría
import { m1GeometriaQuestions } from './geometria';

// Import from Probabilidad y Estadística
import { m1ProbabilidadQuestions } from './probabilidad-estadistica';

// Export all individual topic arrays
export { m1NumerosEnterosRacionalesQuestions } from './numeros-operaciones/enteros-racionales';
export { m1NumerosPotenciasRaicesQuestions } from './numeros-operaciones/potencias-raices';
export { m1NumerosPorcentajeQuestions } from './numeros-proporcionalidad/porcentaje';
export { m1NumerosProporcionalidadQuestions } from './numeros-proporcionalidad/proporcionalidad';

// Re-export from thematic units
export * from './algebra-funciones';
export * from './geometria';
export * from './probabilidad-estadistica';

// Combined arrays by thematic unit (new exports)
export { m1NumerosOperacionesQuestions } from './numeros-operaciones';
export { m1NumerosProporcionalidadCombinedQuestions } from './numeros-proporcionalidad';

// Export combined arrays for backward compatibility (by subject)
export { m1AlgebraQuestions } from './algebra-funciones';
export { m1GeometriaQuestions } from './geometria';
export { m1ProbabilidadQuestions } from './probabilidad-estadistica';

// Combined números questions (for backward compatibility)
export const m1NumerosQuestions: Question[] = [
  ...m1NumerosEnterosRacionalesQuestions,
  ...m1NumerosPotenciasRaicesQuestions,
  ...m1NumerosPorcentajeQuestions,
  ...m1NumerosProporcionalidadQuestions
];
