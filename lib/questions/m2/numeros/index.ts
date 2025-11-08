import { Question } from '../../../types';
import { m2NumerosEnterosRacionalesQuestions } from './enteros-racionales';
import { m2NumerosPorcentajeQuestions } from './porcentaje';
import { m2NumerosPotenciasRaicesQuestions } from './potencias-raices';
import { m2NumerosProporcionalidadQuestions } from './proporcionalidad';
import { m2NumerosMcdMcmQuestions } from './mcd-mcm';
import { m2NumerosRaicesRacionalizacionQuestions } from './raices-racionalizacion';

// Export individual modules
export { m2NumerosEnterosRacionalesQuestions } from './enteros-racionales';
export { m2NumerosPorcentajeQuestions } from './porcentaje';
export { m2NumerosPotenciasRaicesQuestions } from './potencias-raices';
export { m2NumerosProporcionalidadQuestions } from './proporcionalidad';
export { m2NumerosMcdMcmQuestions } from './mcd-mcm';
export { m2NumerosRaicesRacionalizacionQuestions } from './raices-racionalizacion';

// Export combined array for backward compatibility
export const m2NumerosQuestions: Question[] = [
  ...m2NumerosEnterosRacionalesQuestions,
  ...m2NumerosPorcentajeQuestions,
  ...m2NumerosPotenciasRaicesQuestions,
  ...m2NumerosProporcionalidadQuestions,
  ...m2NumerosMcdMcmQuestions,
  ...m2NumerosRaicesRacionalizacionQuestions,
];
