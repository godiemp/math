// Curriculum-based imports
import { m2Alg001Questions } from './m2-alg-001';
import { m2Alg002Questions } from './m2-alg-002';
import { m2Alg003Questions } from './m2-alg-003';

// Export curriculum subsections
export { m2Alg001Questions } from './m2-alg-001';
export { m2Alg002Questions } from './m2-alg-002';
export { m2Alg003Questions } from './m2-alg-003';

// Export combined array
export const m2AlgebraQuestions = [
  ...m2Alg001Questions,
  ...m2Alg002Questions,
  ...m2Alg003Questions
];
