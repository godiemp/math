'use client';

import { useTranslations } from 'next-intl';
import { Card, Heading, Text, Badge } from "@/components/ui";
import { LiveSession, StudentStatistics } from "@/lib/types";
import { Calendar, Trophy, Target } from "lucide-react";

interface LiveSessionsCardProps {
  upcomingSessions: LiveSession[];
  stats: StudentStatistics | null;
}

export function LiveSessionsCard({ upcomingSessions, stats }: LiveSessionsCardProps) {
  const tHistory = useTranslations('dashboard.sessionHistory');
  const tStats = useTranslations('dashboard.liveStats');

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-CL', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const hasUpcoming = upcomingSessions.length > 0;
  const hasStats = stats && stats.totalSessions > 0;

  // Don't show if no data
  if (!hasUpcoming && !hasStats) {
    return null;
  }

  return (
    <Card className="p-4 sm:p-5">
      <div className="space-y-4">
        {/* Upcoming Sessions - Compact */}
        {hasUpcoming && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-[#0A84FF]" />
              <Heading level={3} size="xs" className="text-sm">
                {tHistory('upcoming')}
              </Heading>
            </div>
            <div className="space-y-1.5">
              {upcomingSessions.slice(0, 2).map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800"
                >
                  <div className="flex-1 min-w-0">
                    <Text size="sm" className="font-medium truncate text-xs">
                      {session.name}
                    </Text>
                    <Text size="xs" variant="secondary" className="text-[10px]">
                      {formatDate(session.scheduledStartTime)}
                    </Text>
                  </div>
                  <Badge variant="info" className="text-[10px] ml-2 shrink-0">{session.level}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats - Compact Grid */}
        {hasStats && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <Heading level={3} size="xs" className="text-sm">
                {tStats('title')}
              </Heading>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-center">
                <Text className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {stats.totalSessions}
                </Text>
                <Text size="xs" variant="secondary" className="text-[9px]">
                  ensayos
                </Text>
              </div>
              <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/30 text-center">
                <Text className="text-lg font-bold text-green-600 dark:text-green-400">
                  {stats.averageScore.toFixed(0)}
                </Text>
                <Text size="xs" variant="secondary" className="text-[9px]">
                  promedio
                </Text>
              </div>
              <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/30 text-center">
                <Text className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {stats.averageAccuracy.toFixed(0)}%
                </Text>
                <Text size="xs" variant="secondary" className="text-[9px]">
                  precisión
                </Text>
              </div>
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-center">
                <Text className="text-lg font-bold text-amber-600 dark:text-amber-400">
                  {stats.topRankings.first + stats.topRankings.second + stats.topRankings.third}
                </Text>
                <Text size="xs" variant="secondary" className="text-[9px]">
                  podios
                </Text>
              </div>
            </div>

            {/* Recent sessions - very compact */}
            {stats.recentSessions && stats.recentSessions.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <Text size="xs" variant="secondary" className="mb-1.5 text-[10px]">
                  Últimos ensayos
                </Text>
                <div className="space-y-1">
                  {stats.recentSessions.slice(0, 3).map((session) => (
                    <div
                      key={session.sessionId}
                      className="flex items-center justify-between text-xs px-2 py-1 rounded bg-gray-50 dark:bg-gray-900/30"
                    >
                      <Text size="xs" className="truncate flex-1 text-[10px]">
                        {session.sessionName}
                      </Text>
                      <div className="flex items-center gap-2 ml-2 shrink-0">
                        <Text size="xs" variant="secondary" className="text-[10px]">
                          {session.score}/{session.totalQuestions}
                        </Text>
                        {session.rank <= 3 && (
                          <span className="text-xs">
                            {session.rank === 1 ? '🥇' : session.rank === 2 ? '🥈' : '🥉'}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
