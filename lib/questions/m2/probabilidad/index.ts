import { m2ProbabilidadMedidasDispersionQuestions } from './medidas-dispersion';
import { m2ProbabilidadCombinatoriaQuestions } from './combinatoria';

// Export individual topic arrays
export { m2ProbabilidadMedidasDispersionQuestions } from './medidas-dispersion';
export { m2ProbabilidadCombinatoriaQuestions } from './combinatoria';

// Export combined array for backward compatibility
export const m2ProbabilidadQuestions = [
  ...m2ProbabilidadMedidasDispersionQuestions,
  ...m2ProbabilidadCombinatoriaQuestions
];
