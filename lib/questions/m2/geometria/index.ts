// Curriculum-based imports
import { m2Geo001Questions } from './m2-geo-001';
import { m2Geo002Questions } from './m2-geo-002';
import { m2Geo003Questions } from './m2-geo-003';

// Export curriculum subsections
export { m2Geo001Questions } from './m2-geo-001';
export { m2Geo002Questions } from './m2-geo-002';
export { m2Geo003Questions } from './m2-geo-003';

// Export combined array
export const m2GeometriaQuestions = [
  ...m2Geo001Questions,
  ...m2Geo002Questions,
  ...m2Geo003Questions
];
