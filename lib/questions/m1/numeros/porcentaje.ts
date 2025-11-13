/**
 * @deprecated This file is kept for backward compatibility.
 * Use M1-NUM-004.ts and M1-NUM-005.ts instead for the curriculum-based organization.
 *
 * This file now re-exports questions from M1-NUM-004 and M1-NUM-005.
 */

import { m1Num004Questions } from './M1-NUM-004';
import { m1Num005Questions } from './M1-NUM-005';

export const m1NumerosPorcentajeQuestions = [
  ...m1Num004Questions,
  ...m1Num005Questions,
];
