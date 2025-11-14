/**
 * LEGACY FILE - Maintained for backward compatibility
 *
 * This file re-exports questions from the new curriculum-based structure.
 * All notable products questions have been moved to m1-alg-002.ts
 *
 * Please import from m1-alg-002.ts directly for new code:
 * import { m1Alg002Questions } from './m1-alg-002';
 */

import { m1Alg002Questions } from './m1-alg-002';

// Re-export only notable products questions (m1-31, m1-159 through m1-167)
const productosNotablesIds = ['m1-31', 'm1-159', 'm1-160', 'm1-161', 'm1-162', 'm1-163', 'm1-164', 'm1-165', 'm1-166', 'm1-167'];
export const m1AlgebraProductosNotablesQuestions = m1Alg002Questions.filter(q => productosNotablesIds.includes(q.id));
