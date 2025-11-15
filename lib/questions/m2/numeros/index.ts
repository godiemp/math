import { Question } from '../../../types';

// Curriculum-based imports
import { m2Num001Questions } from './m2-num-001';
import { m2Num002Questions } from './m2-num-002';
import { m2Num003Questions } from './m2-num-003';
import { m2Num004Questions } from './m2-num-004';
import { m2Num005Questions } from './m2-num-005';
import { m2Num006Questions } from './m2-num-006';

// Legacy topic-based imports (backward compatibility)
import { m2NumerosEnterosRacionalesQuestions } from './enteros-racionales';
import { m2NumerosPorcentajeQuestions } from './porcentaje';
import { m2NumerosPotenciasRaicesQuestions } from './potencias-raices';
import { m2NumerosProporcionalidadQuestions } from './proporcionalidad';
import { m2NumerosMcdMcmQuestions } from './mcd-mcm';
import { m2NumerosRaicesRacionalizacionQuestions } from './raices-racionalizacion';

// Export curriculum subsections
export { m2Num001Questions } from './m2-num-001';
export { m2Num002Questions } from './m2-num-002';
export { m2Num003Questions } from './m2-num-003';
export { m2Num004Questions } from './m2-num-004';
export { m2Num005Questions } from './m2-num-005';
export { m2Num006Questions } from './m2-num-006';

// Export legacy topic-based modules (backward compatibility)
export { m2NumerosEnterosRacionalesQuestions } from './enteros-racionales';
export { m2NumerosPorcentajeQuestions } from './porcentaje';
export { m2NumerosPotenciasRaicesQuestions } from './potencias-raices';
export { m2NumerosProporcionalidadQuestions } from './proporcionalidad';
export { m2NumerosMcdMcmQuestions } from './mcd-mcm';
export { m2NumerosRaicesRacionalizacionQuestions } from './raices-racionalizacion';

// Export combined array for backward compatibility
export const m2NumerosQuestions: Question[] = [
  ...m2Num001Questions,
  ...m2Num002Questions,
  ...m2Num003Questions,
  ...m2Num004Questions,
  ...m2Num005Questions,
  ...m2Num006Questions,
  ...m2NumerosEnterosRacionalesQuestions,
  ...m2NumerosPorcentajeQuestions,
  ...m2NumerosPotenciasRaicesQuestions,
  ...m2NumerosProporcionalidadQuestions,
  ...m2NumerosMcdMcmQuestions,
  ...m2NumerosRaicesRacionalizacionQuestions,
];
