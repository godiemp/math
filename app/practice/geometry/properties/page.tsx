'use client';

import { createGamePage } from '@/lib/factories/createGamePage';
import ShapePropertiesMenu from '@/components/games/geometry/ShapePropertiesMenu';
import ShapePropertiesGame from '@/components/games/geometry/ShapePropertiesGame';
import type { PropertiesGameDifficulty } from '@/lib/types/shape-properties-game';

export default createGamePage<PropertiesGameDifficulty>({
  storageKey: 'shapePropertiesGameProgress',
  levels: ['counting', 'identifying', 'comparing'],
  MenuComponent: ShapePropertiesMenu,
  GameComponent: ShapePropertiesGame,
  theme: {
    gradientFrom: 'indigo-50',
    gradientVia: 'white',
    gradientTo: 'blue-50',
    spinnerColor: 'indigo-600',
  },
});
