'use client';

import { createGamePage } from '@/lib/factories/createGamePage';
import ShapeGameMenu from '@/components/games/geometry/ShapeGameMenu';
import ShapeIdentificationGame from '@/components/games/geometry/ShapeIdentificationGame';
import type { ShapeGameDifficulty } from '@/lib/types/shape-game';

export default createGamePage<ShapeGameDifficulty>({
  storageKey: 'shapeGameProgress',
  levels: ['basic', 'intermediate', 'advanced'],
  MenuComponent: ShapeGameMenu,
  GameComponent: ShapeIdentificationGame,
  theme: {
    gradientFrom: 'purple-50',
    gradientVia: 'white',
    gradientTo: 'pink-50',
    spinnerColor: 'purple-600',
  },
});
