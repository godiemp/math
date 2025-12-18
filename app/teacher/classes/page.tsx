'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TeacherLayout from '@/components/layout/TeacherLayout';
import { Card, Heading, Text, Button } from '@/components/ui';
import { MOCK_CLASSES, TeacherClass, CLASS_LEVEL_LABELS } from '@/lib/types/teacher';
import { Copy, Check } from 'lucide-react';

function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'hace un momento';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `hace ${hours}h`;
  const days = Math.floor(hours / 24);
  return `hace ${days}d`;
}

function ClassCard({ cls }: { cls: TeacherClass }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const copyInviteCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(cls.inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card
      className="hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-lg transition-all cursor-pointer"
      padding="lg"
      onClick={() => router.push(`/teacher/classes/${cls.id}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <Heading level={3} size="sm" className="mb-1">
            {cls.name}
          </Heading>
          <Text size="sm" variant="secondary">
            {cls.schoolName}
          </Text>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            cls.level === 'M1' || cls.level === 'M2' || cls.level === 'both'
              ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
              : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
          }`}
        >
          {CLASS_LEVEL_LABELS[cls.level]}
        </span>
      </div>

      {cls.description && (
        <Text size="sm" variant="secondary" className="mb-4 line-clamp-2">
          {cls.description}
        </Text>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            {cls.studentCount}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Estudiantes</div>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            {Math.round((cls.avgAccuracy || 0) * 100)}%
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Precisión</div>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            {cls.lastActivity ? formatTimeAgo(cls.lastActivity) : 'N/A'}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Actividad</div>
        </div>
      </div>

      {/* Invite Code */}
      <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
        <div>
          <Text size="xs" variant="secondary" className="mb-0.5">
            Código de invitación
          </Text>
          <code className="text-lg font-mono font-bold text-emerald-700 dark:text-emerald-400">
            {cls.inviteCode}
          </code>
        </div>
        <button
          onClick={copyInviteCode}
          className="p-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
          title="Copiar código"
        >
          {copied ? (
            <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <Copy className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          )}
        </button>
      </div>
    </Card>
  );
}

export default function TeacherClassesPage() {
  const router = useRouter();

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Heading level={1} size="lg">
              Mis Clases
            </Heading>
            <Text variant="secondary" className="mt-1">
              Gestiona tus clases y ve el progreso de tus estudiantes
            </Text>
          </div>
          <Button
            onClick={() => router.push('/teacher/classes/new')}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            + Nueva Clase
          </Button>
        </div>

        {/* Classes Grid */}
        {MOCK_CLASSES.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {MOCK_CLASSES.map((cls) => (
              <ClassCard key={cls.id} cls={cls} />
            ))}
          </div>
        ) : (
          <Card padding="lg" className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📚</span>
            </div>
            <Heading level={3} size="sm" className="mb-2">
              No tienes clases aún
            </Heading>
            <Text variant="secondary" className="mb-4">
              Crea tu primera clase para comenzar a seguir el progreso de tus estudiantes
            </Text>
            <Button
              onClick={() => router.push('/teacher/classes/new')}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Crear mi primera clase
            </Button>
          </Card>
        )}
      </div>
    </TeacherLayout>
  );
}
