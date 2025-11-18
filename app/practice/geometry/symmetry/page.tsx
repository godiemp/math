'use client';

import { createGamePage } from '@/lib/factories/createGamePage';
import SymmetryGameMenu from '@/components/SymmetryGameMenu';
import SymmetryGame from '@/components/SymmetryGame';
import type { SymmetryGameDifficulty } from '@/lib/types/symmetry-game';

export default createGamePage<SymmetryGameDifficulty>({
  storageKey: 'symmetryGameProgress',
  levels: ['basic', 'intermediate', 'advanced'],
  MenuComponent: SymmetryGameMenu,
  GameComponent: SymmetryGame,
  theme: {
    gradientFrom: 'cyan-50',
    gradientVia: 'white',
    gradientTo: 'blue-50',
    spinnerColor: 'cyan-600',
  },
});
