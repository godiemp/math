/**
 * Combines all thematic units from M1 and M2
 */

import { ThematicUnit } from '../types';

// M1 units
import { M1_NUMEROS_UNITS } from './m1/numeros';
import { M1_ALGEBRA_UNITS } from './m1/algebra';
import { M1_GEOMETRIA_UNITS } from './m1/geometria';
import { M1_PROBABILIDAD_UNITS } from './m1/probabilidad';

// M2 units
import { M2_NUMEROS_UNITS } from './m2/numeros';
import { M2_ALGEBRA_UNITS } from './m2/algebra';
import { M2_GEOMETRIA_UNITS } from './m2/geometria';
import { M2_PROBABILIDAD_UNITS } from './m2/probabilidad';

/**
 * All thematic units from PAES M1 and M2
 */
export const THEMATIC_UNITS: ThematicUnit[] = [
  // M1 units
  ...M1_NUMEROS_UNITS,
  ...M1_ALGEBRA_UNITS,
  ...M1_GEOMETRIA_UNITS,
  ...M1_PROBABILIDAD_UNITS,
  // M2 units
  ...M2_NUMEROS_UNITS,
  ...M2_ALGEBRA_UNITS,
  ...M2_GEOMETRIA_UNITS,
  ...M2_PROBABILIDAD_UNITS,
];

// Re-export individual level/subject units for direct access
export {
  M1_NUMEROS_UNITS,
  M1_ALGEBRA_UNITS,
  M1_GEOMETRIA_UNITS,
  M1_PROBABILIDAD_UNITS,
  M2_NUMEROS_UNITS,
  M2_ALGEBRA_UNITS,
  M2_GEOMETRIA_UNITS,
  M2_PROBABILIDAD_UNITS,
};
