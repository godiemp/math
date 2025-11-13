/**
 * LEGACY FILE - Maintained for backward compatibility
 *
 * This file re-exports questions from the new curriculum-based structure.
 * All polynomial questions have been moved to m1-alg-002.ts
 *
 * Please import from m1-alg-002.ts directly for new code:
 * import { m1Alg002Questions } from './m1-alg-002';
 */

import { m1Alg002Questions } from './m1-alg-002';

// Re-export only polynomial operation questions (m1-207 through m1-215)
const polinomiosIds = ['m1-207', 'm1-208', 'm1-209', 'm1-210', 'm1-211', 'm1-212', 'm1-213', 'm1-214', 'm1-215'];
export const m1AlgebraPolinomiosQuestions = m1Alg002Questions.filter(q => polinomiosIds.includes(q.id));
