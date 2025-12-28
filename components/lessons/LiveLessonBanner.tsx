'use client';

import { useRouter } from 'next/navigation';
import { Radio, X } from 'lucide-react';
import { useStudentLessonSync } from '@/hooks/useStudentLessonSync';
import { useState } from 'react';

/**
 * Banner that shows when a student's teacher has an active live lesson.
 * Displays at the top of pages to notify students they can join.
 */
export function LiveLessonBanner() {
  const router = useRouter();
  const { activeLesson, isFollowing, joinLesson, isConnected } = useStudentLessonSync();
  const [dismissed, setDismissed] = useState(false);

  // Don't show if:
  // - Not connected to socket
  // - No active lesson from teacher
  // - Already following the lesson
  // - User dismissed the banner
  if (!isConnected || !activeLesson || isFollowing || dismissed) {
    return null;
  }

  const handleJoin = () => {
    joinLesson();
    // Navigate to the lesson page (it will detect follow mode from the hook)
    router.push(`/lessons/m1/${activeLesson.lessonId}`);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-emerald-500 text-white shadow-lg animate-slide-down">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Radio size={18} className="animate-pulse" />
            <span className="font-medium">Clase en vivo</span>
          </div>
          <span className="text-emerald-100">
            {activeLesson.teacherUsername} inició &quot;{activeLesson.lessonTitle}&quot;
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleJoin}
            className="px-4 py-1.5 bg-white text-emerald-600 font-medium rounded-lg hover:bg-emerald-50 transition-colors"
          >
            Unirse
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 hover:bg-emerald-600 rounded-full transition-colors"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Compact version of the banner for inline use in pages
 */
export function LiveLessonNotification() {
  const router = useRouter();
  const { activeLesson, isFollowing, joinLesson, isConnected } = useStudentLessonSync();

  if (!isConnected || !activeLesson || isFollowing) {
    return null;
  }

  const handleJoin = () => {
    joinLesson();
    router.push(`/lessons/m1/${activeLesson.lessonId}`);
  };

  return (
    <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
            <Radio size={20} className="text-white animate-pulse" />
          </div>
          <div>
            <p className="font-medium text-emerald-900 dark:text-emerald-100">
              Clase en vivo disponible
            </p>
            <p className="text-sm text-emerald-700 dark:text-emerald-300">
              {activeLesson.teacherUsername} inició &quot;{activeLesson.lessonTitle}&quot;
            </p>
          </div>
        </div>
        <button
          onClick={handleJoin}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
        >
          Unirse
        </button>
      </div>
    </div>
  );
}
