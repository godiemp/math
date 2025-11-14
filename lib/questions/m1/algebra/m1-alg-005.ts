import { Question } from '../../../types';
import { allFuncionesQuestions } from './m1-alg-funciones-source';

/**
 * M1-ALG-005: Concepto de función
 * Chilean PAES Curriculum - Algebra Subsection 005
 *
 * This subsection covers:
 * - Definition of function (relation where each input has exactly one output)
 * - Domain and range concepts
 * - Function notation: f(x)
 * - Determining if a relation is a function
 * - Domain restrictions (denominators, square roots)
 * - Reading function values from graphs
 *
 * Total: 6 questions
 */

// Filter questions for concept of function
const alg005Ids = ['m1-168', 'm1-169', 'm1-172', 'm1-174', 'm1-175', 'm1-180'];
export const m1Alg005Questions = allFuncionesQuestions.filter(q => alg005Ids.includes(q.id));
