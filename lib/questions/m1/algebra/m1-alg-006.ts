import { Question } from '../../../types';
import { allFuncionesQuestions } from './m1-alg-funciones-source';

/**
 * M1-ALG-006: Función lineal y afín
 * Chilean PAES Curriculum - Algebra Subsection 006
 *
 * This subsection covers:
 * - Linear functions: f(x) = mx + b (m ≠ 0)
 * - Affine/constant functions: f(x) = b (m = 0)
 * - Slope and y-intercept
 * - Graphing linear functions
 * - Finding x and y intercepts
 * - Calculating slope from two points
 * - Writing equations from given information
 * - Applications and word problems
 *
 * Total: 8 questions
 */

// Filter questions for linear and affine functions
const alg006Ids = ['m1-2', 'm1-15', 'm1-171', 'm1-177', 'm1-178', 'm1-179', 'm1-181', 'm1-182'];
export const m1Alg006Questions = allFuncionesQuestions.filter(q => alg006Ids.includes(q.id));
