'use client';

import { useTranslations } from 'next-intl';
import { Card, Heading, Text } from "@/components/ui";
import { StudentStatistics } from "@/lib/types";
import { Trophy, Target, TrendingUp } from "lucide-react";

interface LiveSessionStatsProps {
  stats: StudentStatistics | null;
}

export function LiveSessionStats({ stats }: LiveSessionStatsProps) {
  const t = useTranslations('dashboard.liveStats');

  if (!stats || stats.totalSessions === 0) {
    return (
      <Card className="p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <Heading level={3} size="sm" className="text-base sm:text-lg">
            {t('title')}
          </Heading>
        </div>
        <div className="text-center py-8">
          <div className="text-5xl mb-3">📊</div>
          <Text size="sm" variant="secondary">
            {t('noStats')}
          </Text>
        </div>
      </Card>
    );
  }

  const totalPodiums = stats.topRankings.first + stats.topRankings.second + stats.topRankings.third;

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-5">
        <Trophy className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <Heading level={3} size="sm" className="text-base sm:text-lg">
          {t('title')}
        </Heading>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {/* Total Sessions */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-800">
          <Text size="xs" variant="secondary" className="mb-1">
            {t('totalSessions')}
          </Text>
          <div className="flex items-baseline gap-1">
            <Text className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stats.totalSessions}
            </Text>
          </div>
        </div>

        {/* Average Score */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
          <Text size="xs" variant="secondary" className="mb-1">
            {t('averageScore')}
          </Text>
          <div className="flex items-baseline gap-1">
            <Text className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.averageScore.toFixed(1)}
            </Text>
          </div>
        </div>

        {/* Average Accuracy */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200 dark:border-purple-800">
          <Text size="xs" variant="secondary" className="mb-1">
            {t('averageAccuracy')}
          </Text>
          <div className="flex items-baseline gap-1">
            <Text className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {stats.averageAccuracy.toFixed(1)}
            </Text>
            <Text size="xs" variant="secondary">%</Text>
          </div>
        </div>

        {/* Best Score */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border border-amber-200 dark:border-amber-800">
          <Text size="xs" variant="secondary" className="mb-1">
            {t('bestScore')}
          </Text>
          <div className="flex items-baseline gap-1">
            <Text className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {stats.bestScore}
            </Text>
          </div>
        </div>
      </div>

      {/* Podium Rankings */}
      {totalPodiums > 0 && (
        <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <Text size="sm" className="font-semibold text-yellow-900 dark:text-yellow-100">
              {t('topRankings')}
            </Text>
          </div>
          <div className="flex justify-around">
            {stats.topRankings.first > 0 && (
              <div className="text-center">
                <div className="text-2xl mb-1">🥇</div>
                <Text className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                  {stats.topRankings.first}
                </Text>
                <Text size="xs" variant="secondary">
                  {t('firstPlace')}
                </Text>
              </div>
            )}
            {stats.topRankings.second > 0 && (
              <div className="text-center">
                <div className="text-2xl mb-1">🥈</div>
                <Text className="text-xl font-bold text-gray-600 dark:text-gray-400">
                  {stats.topRankings.second}
                </Text>
                <Text size="xs" variant="secondary">
                  {t('secondPlace')}
                </Text>
              </div>
            )}
            {stats.topRankings.third > 0 && (
              <div className="text-center">
                <div className="text-2xl mb-1">🥉</div>
                <Text className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  {stats.topRankings.third}
                </Text>
                <Text size="xs" variant="secondary">
                  {t('thirdPlace')}
                </Text>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
