'use client';

import React from 'react';
import { Card } from './ui/Card';
import { Streak } from './Streak';
import { StudyBuddy } from './StudyBuddy';
import { StreakData } from '@/lib/types';

interface StreakAndBuddyProps {
  initialStreak?: StreakData;
}

export const StreakAndBuddy: React.FC<StreakAndBuddyProps> = ({ initialStreak }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
      {/* Streak Section */}
      <Streak initialStreak={initialStreak} />

      {/* Study Buddy Section */}
      <StudyBuddy />
    </div>
  );
};
