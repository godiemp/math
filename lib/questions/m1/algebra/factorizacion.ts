/**
 * LEGACY FILE - Maintained for backward compatibility
 *
 * This file re-exports questions from the new curriculum-based structure.
 * All factorization questions have been moved to m1-alg-002.ts
 *
 * Please import from m1-alg-002.ts directly for new code:
 * import { m1Alg002Questions } from './m1-alg-002';
 */

import { m1Alg002Questions } from './m1-alg-002';

// Re-export only factorization questions (m1-14, m1-150 through m1-158)
const factorizacionIds = ['m1-14', 'm1-150', 'm1-151', 'm1-152', 'm1-153', 'm1-154', 'm1-155', 'm1-156', 'm1-157', 'm1-158'];
export const m1AlgebraFactorizacionQuestions = m1Alg002Questions.filter(q => factorizacionIds.includes(q.id));
