'use client';

import React, { useEffect, useState } from 'react';
import { Card } from './ui/Card';
import { Typography } from './ui/Typography';
import { Badge } from './ui/Badge';
import { StreakData } from '@/lib/types';
import { api } from '@/lib/api-client';

interface StreakProps {
  initialStreak?: StreakData;
}

export const Streak: React.FC<StreakProps> = ({ initialStreak }) => {
  const [streak, setStreak] = useState<StreakData | null>(initialStreak || null);
  const [loading, setLoading] = useState(!initialStreak);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialStreak) {
      fetchStreak();
    }
  }, [initialStreak]);

  const fetchStreak = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/api/streak');
      setStreak(response);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch streak data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Typography variant="body" className="text-red-500">
          {error}
        </Typography>
      </Card>
    );
  }

  if (!streak) {
    return null;
  }

  const getStreakMessage = (currentStreak: number) => {
    if (currentStreak === 0) {
      return 'Start your streak today!';
    } else if (currentStreak === 1) {
      return 'Great start! Keep it up!';
    } else if (currentStreak < 7) {
      return 'You\'re on fire!';
    } else if (currentStreak < 30) {
      return 'Amazing consistency!';
    } else {
      return 'Legendary streak!';
    }
  };

  const getStreakEmoji = (currentStreak: number) => {
    if (currentStreak === 0) return '🎯';
    if (currentStreak < 7) return '🔥';
    if (currentStreak < 30) return '⚡';
    return '🏆';
  };

  return (
    <Card className="relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-yellow-500/10 pointer-events-none" />

      <div className="relative space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Typography variant="h3" className="font-bold text-gray-900 dark:text-white">
            Daily Streak
          </Typography>
          <span className="text-3xl" role="img" aria-label="streak">
            {getStreakEmoji(streak.currentStreak)}
          </span>
        </div>

        {/* Current Streak */}
        <div className="flex items-end gap-2">
          <Typography
            variant="display"
            className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500"
          >
            {streak.currentStreak}
          </Typography>
          <Typography variant="body" className="text-gray-600 dark:text-gray-400 pb-3">
            {streak.currentStreak === 1 ? 'day' : 'days'}
          </Typography>
        </div>

        {/* Motivational Message */}
        <Typography variant="body" className="text-gray-700 dark:text-gray-300 font-medium">
          {getStreakMessage(streak.currentStreak)}
        </Typography>

        {/* Stats Row */}
        <div className="flex gap-4 pt-2">
          {/* Longest Streak */}
          <div className="flex-1 bg-white/40 dark:bg-black/20 rounded-xl p-3 backdrop-blur-sm">
            <Typography variant="caption" className="text-gray-600 dark:text-gray-400 mb-1">
              Best Streak
            </Typography>
            <div className="flex items-baseline gap-1">
              <Typography variant="h3" className="font-bold text-gray-900 dark:text-white">
                {streak.longestStreak}
              </Typography>
              <Typography variant="caption" className="text-gray-600 dark:text-gray-400">
                days
              </Typography>
            </div>
          </div>

          {/* Last Practice */}
          <div className="flex-1 bg-white/40 dark:bg-black/20 rounded-xl p-3 backdrop-blur-sm">
            <Typography variant="caption" className="text-gray-600 dark:text-gray-400 mb-1">
              Last Practice
            </Typography>
            <Typography variant="body" className="font-medium text-gray-900 dark:text-white">
              {streak.lastPracticeDate
                ? new Date(streak.lastPracticeDate).toLocaleDateString('es-CL', {
                    month: 'short',
                    day: 'numeric',
                  })
                : 'Never'}
            </Typography>
          </div>
        </div>

        {/* Action Hint */}
        {streak.currentStreak === 0 && (
          <div className="pt-2">
            <Badge variant="default" className="bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20">
              Complete a practice session to start your streak!
            </Badge>
          </div>
        )}
      </div>
    </Card>
  );
};
