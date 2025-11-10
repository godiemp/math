'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, Button, Heading, Text, Badge } from '@/components/ui';
import AdminLayout from '@/components/AdminLayout';

function RapidFireDebugContent() {
  const router = useRouter();

  const difficulties = [
    {
      id: 'easy',
      name: 'Easy Mode',
      description: '10 preguntas • 5 min • 3 vidas',
      emoji: '🟢',
      color: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      id: 'medium',
      name: 'Medium Mode',
      description: '15 preguntas • 7 min • 2 vidas',
      emoji: '🟡',
      color: 'from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800',
      textColor: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      id: 'hard',
      name: 'Hard Mode',
      description: '20 preguntas • 10 min • 1 vida',
      emoji: '🔴',
      color: 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800',
      textColor: 'text-red-600 dark:text-red-400',
    },
    {
      id: 'extreme',
      name: 'Extreme Mode',
      description: '30 preguntas • 12 min • Sin vidas • Tiempo de vuelta',
      emoji: '💀',
      color: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
  ];

  const launchQuiz = (difficulty: string, level: 'M1' | 'M2') => {
    // Add debug flag to skip countdown
    router.push(`/practice/${level.toLowerCase()}/rapidfire?difficulty=${difficulty}&debug=true`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Heading level={1} size="md" className="mb-2">
            🚀 Rapid Fire Quiz Debugger
          </Heading>
          <Text variant="secondary">
            Herramienta de debug para testear rapidfire sin countdown ni esperas
          </Text>
        </div>

        {/* Info Card */}
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" padding="lg">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <Heading level={3} size="xs" className="mb-1 text-blue-900 dark:text-blue-100">
                Modo Debug Activado
              </Heading>
              <Text size="sm" className="text-blue-800 dark:text-blue-200">
                En este modo, el countdown de 3-2-1 se salta automáticamente. Las rachas aparecen en los milestones (3, 5, 10, 15, 20...).
                Las explicaciones solo se muestran en el review final, no durante el quiz.
              </Text>
            </div>
          </div>
        </Card>

        {/* M1 Rapid Fire */}
        <div>
          <Heading level={2} size="sm" className="mb-4">
            📐 Matemática Básica (M1)
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {difficulties.map((diff) => (
              <Card
                key={`m1-${diff.id}`}
                className={`bg-gradient-to-br ${diff.color} cursor-pointer hover:shadow-lg transition-all`}
                padding="lg"
              >
                <div className="text-center mb-4">
                  <div className="text-5xl mb-3">{diff.emoji}</div>
                  <Heading level={3} size="xs" className={diff.textColor}>
                    {diff.name}
                  </Heading>
                  <Text size="xs" variant="secondary" className="mt-2">
                    {diff.description}
                  </Text>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={() => launchQuiz(diff.id, 'M1')}
                >
                  Lanzar M1 {diff.name}
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* M2 Rapid Fire */}
        <div>
          <Heading level={2} size="sm" className="mb-4">
            🎓 Matemática Avanzada (M2)
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {difficulties.map((diff) => (
              <Card
                key={`m2-${diff.id}`}
                className={`bg-gradient-to-br ${diff.color} cursor-pointer hover:shadow-lg transition-all`}
                padding="lg"
              >
                <div className="text-center mb-4">
                  <div className="text-5xl mb-3">{diff.emoji}</div>
                  <Heading level={3} size="xs" className={diff.textColor}>
                    {diff.name}
                  </Heading>
                  <Text size="xs" variant="secondary" className="mt-2">
                    {diff.description}
                  </Text>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={() => launchQuiz(diff.id, 'M2')}
                >
                  Lanzar M2 {diff.name}
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
              <Text size="sm" className="font-semibold mb-2">Cambios Implementados:</Text>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                <li>❌ Pistas removidas completamente</li>
                <li>✅ Explicaciones solo al final (review)</li>
                <li>🔥 Racha solo en milestones (3, 5, 10, 15...)</li>
                <li>⏸️ Pausa ilimitada (sin restricciones)</li>
              </ul>
            </div>
            <div>
              <Text size="sm" className="font-semibold mb-2">Comportamiento:</Text>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                <li>Auto-avance después de responder (1.5s)</li>
                <li>Notificación de racha: 2 segundos</li>
                <li>Timer se detiene en pausa</li>
                <li>Explicaciones en modo review únicamente</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}

export default function RapidFireDebugPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <RapidFireDebugContent />
    </ProtectedRoute>
  );
}
