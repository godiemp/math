'use client';

import { createGamePage } from '@/lib/factories/createGamePage';
import SolidsGameMenu from '@/components/3dSolidsGameMenu';
import SolidsGame from '@/components/3dSolidsGame';
import type { SolidsGameDifficulty } from '@/lib/types/3d-solids-game';

export default createGamePage<SolidsGameDifficulty>({
  storageKey: 'solidsGameProgress',
  levels: ['basic', 'intermediate', 'advanced'],
  MenuComponent: SolidsGameMenu,
  GameComponent: SolidsGame,
  theme: {
    gradientFrom: 'emerald-50',
    gradientVia: 'white',
    gradientTo: 'green-50',
    spinnerColor: 'emerald-600',
  },
});
