'use client';

import Link from 'next/link';
import { Clock, CheckCircle, Radio } from 'lucide-react';
import { type Lesson } from '@/lib/lessons/types';
import { getUnitShortName } from '@/lib/lessons/thematicUnits';
import { LessonThumbnail } from './LessonThumbnail';
import { cn } from '@/lib/utils';

interface CompactLessonCardProps {
  lesson: Lesson;
  index: number;
  isCompleted?: boolean;
  isTeacher?: boolean;
  onStartLive?: (lesson: Lesson) => void;
  className?: string;
}

export function CompactLessonCard({
  lesson,
  index,
  isCompleted = false,
  isTeacher = false,
  onStartLive,
  className,
}: CompactLessonCardProps) {
  return (
    <div className={cn('bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-0.5 rounded-2xl', className)}>
      <Link
        href={`/lessons/${lesson.level.toLowerCase()}/${lesson.slug}`}
        className="block group h-full"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors h-full flex flex-col">
          {/* Thumbnail area */}
          <div className="aspect-square w-full bg-gray-50 dark:bg-gray-700/50 rounded-xl flex items-center justify-center mb-3 overflow-hidden relative">
            {lesson.thumbnail ? (
              <LessonThumbnail thumbnail={lesson.thumbnail} size="lg" />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                {index + 1}
              </div>
            )}
            {/* Completed badge */}
            {isCompleted && (
              <div className="absolute top-2 right-2">
                <CheckCircle className="text-green-500 bg-white dark:bg-gray-800 rounded-full" size={20} />
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 mb-2 flex-grow">
            {lesson.title}
          </h3>

          {/* Meta info */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {lesson.estimatedMinutes}m
            </span>
            <span className="text-purple-600 dark:text-purple-400 font-medium truncate max-w-[60px]">
              {getUnitShortName(lesson.thematicUnit)}
            </span>
          </div>

          {/* Live button for teachers */}
          {isTeacher && onStartLive && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onStartLive(lesson);
              }}
              className="mt-2 w-full flex items-center justify-center gap-1 px-2 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-lg transition-colors"
            >
              <Radio size={12} className="animate-pulse" />
              En Vivo
            </button>
          )}
        </div>
      </Link>
    </div>
  );
}

export default CompactLessonCard;
