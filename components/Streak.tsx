'use client';

import React, { useEffect, useState } from 'react';
import { Card } from './ui/Card';
import { Heading } from './ui/Typography';
import { Text } from './ui/Typography';
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
      const response = await api.get<StreakData>('/api/streak');
      if (response.error) {
        setError(response.error.error);
      } else if (response.data) {
        setStreak(response.data);
      }
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
        <Text size="sm" className="text-red-500">
          {error}
        </Text>
      </Card>
    );
  }

  if (!streak) {
    return null;
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <Text size="xs" variant="secondary" className="mb-1">
              Racha diaria
            </Text>
            <div className="flex items-baseline gap-2">
              <Heading level={3} size="sm" className="font-bold text-gray-900 dark:text-white">
                {streak.currentStreak}
              </Heading>
              <Text size="xs" variant="secondary">
                {streak.currentStreak === 1 ? 'día' : 'días'}
              </Text>
            </div>
          </div>
        </div>

        <div className="text-right">
          <Text size="xs" variant="secondary" className="mb-1">
            Mejor racha
          </Text>
          <div className="flex items-baseline gap-2 justify-end">
            <Heading level={3} size="sm" className="font-bold text-gray-900 dark:text-white">
              {streak.longestStreak}
            </Heading>
            <Text size="xs" variant="secondary">
              {streak.longestStreak === 1 ? 'día' : 'días'}
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );
};
