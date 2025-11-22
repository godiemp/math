'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { Card, Button, Heading, Text, Badge } from '@/components/ui';
import AdminLayout from '@/components/layout/AdminLayout';

function ZenDebugContent() {
  const router = useRouter();

  const subjects = [
    {
      id: null,
      name: 'Todas las Materias',
      description: 'Mezcla de todas las materias',
      emoji: '📚',
      color: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      id: 'números',
      name: 'Números',
      description: 'Números y Proporcionalidad',
      emoji: '🔢',
      color: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      id: 'álgebra',
      name: 'Álgebra',
      description: 'Álgebra y Funciones',
      emoji: '📐',
      color: 'from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800',
      textColor: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      id: 'geometría',
      name: 'Geometría',
      description: 'Geometría',
      emoji: '📏',
      color: 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800',
      textColor: 'text-red-600 dark:text-red-400',
    },
    {
      id: 'probabilidad',
      name: 'Probabilidad',
      description: 'Probabilidad y Estadística',
      emoji: '🎲',
      color: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
  ];

  const launchQuiz = (subjectId: string | null, level: 'M1' | 'M2') => {
    // Navigate to practice page with zen mode and debug parameters
    const subjectParam = subjectId ? `&subject=${subjectId}` : '';
    router.push(`/practice/${level.toLowerCase()}?mode=zen${subjectParam}&debug=true&autostart=true`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Heading level={1} size="md" className="mb-2">
            🧘 Zen Mode Debugger
          </Heading>
          <Text variant="secondary">
            Herramienta de debug para testear zen mode sin intro ni animaciones
          </Text>
        </div>

        {/* Info Card */}
        <Card className="bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800" padding="lg">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <Heading level={3} size="xs" className="mb-1 text-teal-900 dark:text-teal-100">
                Modo Debug Activado
              </Heading>
              <Text size="sm" className="text-teal-800 dark:text-teal-200">
                En este modo, la intro zen de 3-2-1 se salta automáticamente.
                Puedes navegar libremente entre preguntas y practicar sin presión.
              </Text>
            </div>
          </div>
        </Card>

        {/* M1 Zen */}
        <div>
          <Heading level={2} size="sm" className="mb-4">
            📐 Matemática Básica (M1)
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subject) => (
              <Card
                key={`m1-${subject.id || 'all'}`}
                className={`bg-gradient-to-br ${subject.color} cursor-pointer hover:shadow-lg transition-all`}
                padding="lg"
              >
                <div className="text-center mb-4">
                  <div className="text-5xl mb-3">{subject.emoji}</div>
                  <Heading level={3} size="xs" className={subject.textColor}>
                    {subject.name}
                  </Heading>
                  <Text size="xs" variant="secondary" className="mt-2">
                    {subject.description}
                  </Text>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={() => launchQuiz(subject.id, 'M1')}
                >
                  Lanzar M1 {subject.name}
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* M2 Zen */}
        <div>
          <Heading level={2} size="sm" className="mb-4">
            🎓 Matemática Avanzada (M2)
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subject) => (
              <Card
                key={`m2-${subject.id || 'all'}`}
                className={`bg-gradient-to-br ${subject.color} cursor-pointer hover:shadow-lg transition-all`}
                padding="lg"
              >
                <div className="text-center mb-4">
                  <div className="text-5xl mb-3">{subject.emoji}</div>
                  <Heading level={3} size="xs" className={subject.textColor}>
                    {subject.name}
                  </Heading>
                  <Text size="xs" variant="secondary" className="mt-2">
                    {subject.description}
                  </Text>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={() => launchQuiz(subject.id, 'M2')}
                >
                  Lanzar M2 {subject.name}
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Reference */}
        <Card padding="lg">
          <Heading level={3} size="xs" className="mb-3">
            📋 Referencia Rápida
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <Text size="sm" className="font-semibold mb-2">Características de Zen Mode:</Text>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                <li>⏱️ Sin límite de tiempo</li>
                <li>🧘 A tu propio ritmo</li>
                <li>📊 Navegación rápida entre preguntas</li>
                <li>✅ Puede cambiar respuestas antes de enviar</li>
                <li>💡 Feedback detallado al final</li>
              </ul>
            </div>
            <div>
              <Text size="sm" className="font-semibold mb-2">En Modo Debug:</Text>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                <li>❌ Sin intro zen (breathing animation)</li>
                <li>🚀 Inicio automático del quiz</li>
                <li>🔄 Navegación libre entre preguntas</li>
                <li>📝 10 preguntas por quiz</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}

export default function ZenDebugPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <ZenDebugContent />
    </ProtectedRoute>
  );
}
