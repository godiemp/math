/**
 * @deprecated This file is kept for backward compatibility.
 * Use M1-NUM-006.ts, M1-NUM-007.ts, and M1-NUM-008.ts instead for the curriculum-based organization.
 *
 * This file now re-exports questions from M1-NUM-006, M1-NUM-007, and M1-NUM-008.
 */

import { m1Num006Questions } from './M1-NUM-006';
import { m1Num007Questions } from './M1-NUM-007';
import { m1Num008Questions } from './M1-NUM-008';

export const m1NumerosPotenciasRaicesQuestions = [
  ...m1Num006Questions,
  ...m1Num007Questions,
  ...m1Num008Questions,
];
