// Curriculum-based imports
import { m2Prob001Questions } from './m2-prob-001';
import { m2Prob002Questions } from './m2-prob-002';
import { m2Prob003Questions } from './m2-prob-003';
import { m2Prob004Questions } from './m2-prob-004';

// Export curriculum subsections
export { m2Prob001Questions } from './m2-prob-001';
export { m2Prob002Questions } from './m2-prob-002';
export { m2Prob003Questions } from './m2-prob-003';
export { m2Prob004Questions } from './m2-prob-004';

// Export combined array
export const m2ProbabilidadQuestions = [
  ...m2Prob001Questions,
  ...m2Prob002Questions,
  ...m2Prob003Questions,
  ...m2Prob004Questions
];
