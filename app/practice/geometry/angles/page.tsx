'use client';

import { createGamePage } from '@/lib/factories/createGamePage';
import AnglesGameMenu from '@/components/AnglesGameMenu';
import AnglesGame from '@/components/AnglesGame';
import type { AnglesGameDifficulty } from '@/lib/types/angles-game';

export default createGamePage<AnglesGameDifficulty>({
  storageKey: 'anglesGameProgress',
  levels: ['basic', 'intermediate', 'advanced'],
  MenuComponent: AnglesGameMenu,
  GameComponent: AnglesGame,
  theme: {
    gradientFrom: 'orange-50',
    gradientVia: 'white',
    gradientTo: 'amber-50',
    spinnerColor: 'orange-600',
  },
});
