import { Question } from '../../../types';
import { m1NumerosEnterosRacionalesQuestions } from './enteros-racionales';
import { m1NumerosPorcentajeQuestions } from './porcentaje';
import { m1NumerosPotenciasRaicesQuestions } from './potencias-raices';
import { m1NumerosProporcionalidadQuestions } from './proporcionalidad';
import { m1Num001Questions } from './M1-NUM-001';
import { m1Num002Questions } from './M1-NUM-002';
import { m1Num003Questions } from './M1-NUM-003';
import { m1Num004Questions } from './M1-NUM-004';
import { m1Num005Questions } from './M1-NUM-005';

// Export individual curriculum subsections
export { m1Num001Questions } from './M1-NUM-001';
export { m1Num002Questions } from './M1-NUM-002';
export { m1Num003Questions } from './M1-NUM-003';
export { m1Num004Questions } from './M1-NUM-004';
export { m1Num005Questions } from './M1-NUM-005';

// Export individual modules (for backward compatibility)
export { m1NumerosEnterosRacionalesQuestions } from './enteros-racionales';
export { m1NumerosPorcentajeQuestions } from './porcentaje';
export { m1NumerosPotenciasRaicesQuestions } from './potencias-raices';
export { m1NumerosProporcionalidadQuestions } from './proporcionalidad';

// Export combined array for backward compatibility
export const m1NumerosQuestions: Question[] = [
  ...m1Num001Questions,
  ...m1Num002Questions,
  ...m1Num003Questions,
  ...m1Num004Questions,
  ...m1Num005Questions,
  ...m1NumerosPotenciasRaicesQuestions,
];
