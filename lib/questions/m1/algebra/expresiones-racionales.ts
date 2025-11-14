/**
 * LEGACY FILE - Maintained for backward compatibility
 *
 * This file re-exports questions from the new curriculum-based structure.
 * All rational expression questions have been moved to m1-alg-002.ts
 *
 * Please import from m1-alg-002.ts directly for new code:
 * import { m1Alg002Questions } from './m1-alg-002';
 */

import { m1Alg002Questions } from './m1-alg-002';

// Re-export only rational expression questions (m1-216 through m1-221)
const expresionesRacionalesIds = ['m1-216', 'm1-217', 'm1-218', 'm1-219', 'm1-220', 'm1-221'];
export const m1AlgebraExpresionesRacionalesQuestions = m1Alg002Questions.filter(q => expresionesRacionalesIds.includes(q.id));
