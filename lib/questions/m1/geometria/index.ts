// Curriculum-based imports (Chilean PAES M1-GEO-###)
import { m1Geo001Questions } from './m1-geo-001';
import { m1Geo002Questions } from './m1-geo-002';
import { m1Geo003Questions } from './m1-geo-003';
import { m1Geo004Questions } from './m1-geo-004';
import { m1Geo005Questions } from './m1-geo-005';

// Export curriculum subsections
export { m1Geo001Questions } from './m1-geo-001';
export { m1Geo002Questions } from './m1-geo-002';
export { m1Geo003Questions } from './m1-geo-003';
export { m1Geo004Questions } from './m1-geo-004';
export { m1Geo005Questions } from './m1-geo-005';

// Export combined array
export const m1GeometriaQuestions = [
  ...m1Geo001Questions,
  ...m1Geo002Questions,
  ...m1Geo003Questions,
  ...m1Geo004Questions,
  ...m1Geo005Questions,
];
