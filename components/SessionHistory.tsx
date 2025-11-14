'use client';

import { useTranslations } from 'next-intl';
import { Card, Heading, Text, Badge } from "@/components/ui";
import { LiveSession, RecentSessionStats } from "@/lib/types";
import { Calendar, Trophy, Target } from "lucide-react";

interface SessionHistoryProps {
  upcomingSessions: LiveSession[];
  recentSessions: RecentSessionStats[];
}

export function SessionHistory({ upcomingSessions, recentSessions }: SessionHistoryProps) {
  const t = useTranslations('dashboard.sessionHistory');

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

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return <Badge variant="success" className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-300">🥇 {rank}°</Badge>;
    } else if (rank === 2) {
      return <Badge variant="info" className="bg-gray-400/20 text-gray-700 dark:text-gray-300">🥈 {rank}°</Badge>;
    } else if (rank === 3) {
      return <Badge variant="warning" className="bg-orange-500/20 text-orange-700 dark:text-orange-300">🥉 {rank}°</Badge>;
    }
    return <Badge variant="secondary">{rank}°</Badge>;
  };

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-5">
        <Calendar className="w-5 h-5 text-[#0A84FF]" />
        <Heading level={3} size="sm" className="text-base sm:text-lg">
          {t('title')}
        </Heading>
      </div>

      {/* Upcoming Sessions */}
      <div className="mb-6">
        <Text size="sm" className="font-semibold mb-3 text-[#0A84FF]">
          {t('upcoming')}
        </Text>
        {upcomingSessions.length > 0 ? (
          <div className="space-y-2">
            {upcomingSessions.slice(0, 3).map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800"
              >
                <div className="flex-1">
                  <Text size="sm" className="font-medium mb-1">
                    {session.name}
                  </Text>
                  <Text size="xs" variant="secondary">
                    {formatDate(session.scheduledStartTime)}
                  </Text>
                </div>
                <Badge variant="info">{session.level}</Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 bg-gray-50 dark:bg-gray-900/30 rounded-xl">
            <Text size="sm" variant="secondary">
              {t('noUpcoming')}
            </Text>
          </div>
        )}
      </div>

      {/* Recent Sessions */}
      <div>
        <Text size="sm" className="font-semibold mb-3 text-purple-600 dark:text-purple-400">
          {t('recent')}
        </Text>
        {recentSessions.length > 0 ? (
          <div className="space-y-2">
            {recentSessions.slice(0, 5).map((session) => (
              <div
                key={session.sessionId}
                className="flex items-center justify-between p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Text size="sm" className="font-medium truncate">
                      {session.sessionName}
                    </Text>
                    <Badge variant="secondary" className="text-[10px] shrink-0">
                      {session.level}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {session.score}/{session.totalQuestions}
                    </span>
                    <span>
                      {session.accuracy.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="shrink-0 ml-2">
                  {getRankBadge(session.rank)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 bg-gray-50 dark:bg-gray-900/30 rounded-xl">
            <Text size="sm" variant="secondary">
              {t('noRecent')}
            </Text>
          </div>
        )}
      </div>
    </Card>
  );
}
