/**
 * LEGACY FILE - Maintained for backward compatibility
 *
 * This file re-exports questions from the new curriculum-based structure.
 * Questions have been split between m1-alg-005.ts and m1-alg-006.ts
 *
 * Please import from curriculum files directly for new code:
 * import { m1Alg005Questions } from './m1-alg-005'; // Concept of function (6q)
 * import { m1Alg006Questions } from './m1-alg-006'; // Linear and affine functions (8q)
 */

import { m1Alg005Questions } from './m1-alg-005';
import { m1Alg006Questions } from './m1-alg-006';

// Re-export combined questions from both subsections (14 total)
export const m1AlgebraFuncionesLinealesQuestions = [
  ...m1Alg005Questions,
  ...m1Alg006Questions
];
