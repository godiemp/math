import { Question } from '../../../types';

// Curriculum-based imports
import { m2Num001Questions } from './m2-num-001';
import { m2Num002Questions } from './m2-num-002';
import { m2Num003Questions } from './m2-num-003';
import { m2Num004Questions } from './m2-num-004';
import { m2Num005Questions } from './m2-num-005';
import { m2Num006Questions } from './m2-num-006';

// Export curriculum subsections
export { m2Num001Questions } from './m2-num-001';
export { m2Num002Questions } from './m2-num-002';
export { m2Num003Questions } from './m2-num-003';
export { m2Num004Questions } from './m2-num-004';
export { m2Num005Questions } from './m2-num-005';
export { m2Num006Questions } from './m2-num-006';

// Export combined array
export const m2NumerosQuestions: Question[] = [
  ...m2Num001Questions,
  ...m2Num002Questions,
  ...m2Num003Questions,
  ...m2Num004Questions,
  ...m2Num005Questions,
  ...m2Num006Questions,
];
