import { Question } from '../../../types';
import { m1NumerosEnterosRacionalesQuestions } from './enteros-racionales';
import { m1NumerosPorcentajeQuestions } from './porcentaje';
import { m1NumerosPotenciasRaicesQuestions } from './potencias-raices';
import { m1NumerosProporcionalidadQuestions } from './proporcionalidad';
import { m1Num001Questions } from './M1-NUM-001';
import { m1Num002Questions } from './M1-NUM-002';

// Export individual curriculum subsections
export { m1Num001Questions } from './M1-NUM-001';
export { m1Num002Questions } from './M1-NUM-002';

// Export individual modules (for backward compatibility)
export { m1NumerosEnterosRacionalesQuestions } from './enteros-racionales';
export { m1NumerosPorcentajeQuestions } from './porcentaje';
export { m1NumerosPotenciasRaicesQuestions } from './potencias-raices';
export { m1NumerosProporcionalidadQuestions } from './proporcionalidad';

// Export combined array for backward compatibility
export const m1NumerosQuestions: Question[] = [
  ...m1Num001Questions,
  ...m1Num002Questions,
  ...m1NumerosPorcentajeQuestions,
  ...m1NumerosPotenciasRaicesQuestions,
  ...m1NumerosProporcionalidadQuestions,
];
