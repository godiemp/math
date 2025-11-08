import { Question } from '../../../types';
import { m2NumerosMcdMcmQuestions } from './mcd-mcm';
import { m2NumerosRaicesRacionalizacionQuestions } from './raices-racionalizacion';

// Export individual modules
export { m2NumerosMcdMcmQuestions } from './mcd-mcm';
export { m2NumerosRaicesRacionalizacionQuestions } from './raices-racionalizacion';

// Export combined array for backward compatibility
export const m2NumerosQuestions: Question[] = [
  ...m2NumerosMcdMcmQuestions,
  ...m2NumerosRaicesRacionalizacionQuestions,
];
