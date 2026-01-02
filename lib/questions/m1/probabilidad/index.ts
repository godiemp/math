// Curriculum-based imports (Chilean PAES M1-PROB-###)
import { m1Prob001Questions } from './m1-prob-001';
import { m1Prob002Questions } from './m1-prob-002';
import { m1Prob003Questions } from './m1-prob-003';
import { m1Prob004Questions } from './m1-prob-004';
import { m1Prob005Questions } from './m1-prob-005';
import { m1Prob006Questions } from './m1-prob-006';

// Export curriculum subsections
export { m1Prob001Questions } from './m1-prob-001';
export { m1Prob002Questions } from './m1-prob-002';
export { m1Prob003Questions } from './m1-prob-003';
export { m1Prob004Questions } from './m1-prob-004';
export { m1Prob005Questions } from './m1-prob-005';
export { m1Prob006Questions } from './m1-prob-006';

// Export combined array
export const m1ProbabilidadQuestions = [
  ...m1Prob001Questions,
  ...m1Prob002Questions,
  ...m1Prob003Questions,
  ...m1Prob004Questions,
  ...m1Prob005Questions,
  ...m1Prob006Questions,
];
