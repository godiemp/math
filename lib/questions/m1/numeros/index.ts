import { Question } from '../../../types';

// Curriculum-based imports (Chilean PAES M1-NUM-###)
import { m1Num001Questions } from './M1-NUM-001';
import { m1Num002Questions } from './M1-NUM-002';
import { m1Num003Questions } from './M1-NUM-003';
import { m1Num004Questions } from './M1-NUM-004';
import { m1Num005Questions } from './M1-NUM-005';
import { m1Num006Questions } from './M1-NUM-006';
import { m1Num007Questions } from './M1-NUM-007';
import { m1Num008Questions } from './M1-NUM-008';
import { m1Num009Questions } from './M1-NUM-009';

// Export curriculum subsections
export { m1Num001Questions } from './M1-NUM-001';
export { m1Num002Questions } from './M1-NUM-002';
export { m1Num003Questions } from './M1-NUM-003';
export { m1Num004Questions } from './M1-NUM-004';
export { m1Num005Questions } from './M1-NUM-005';
export { m1Num006Questions } from './M1-NUM-006';
export { m1Num007Questions } from './M1-NUM-007';
export { m1Num008Questions } from './M1-NUM-008';
export { m1Num009Questions } from './M1-NUM-009';

// Export combined array
export const m1NumerosQuestions: Question[] = [
  ...m1Num001Questions,
  ...m1Num002Questions,
  ...m1Num003Questions,
  ...m1Num004Questions,
  ...m1Num005Questions,
  ...m1Num006Questions,
  ...m1Num007Questions,
  ...m1Num008Questions,
  ...m1Num009Questions,
];
