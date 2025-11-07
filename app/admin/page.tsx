'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAllAvailableSessions,
  createScheduledSession,
  updateScheduledSession,
  deleteSession,
  cancelSession,
  updateSessionStatuses,
} from '@/lib/liveSessions';
import { LiveSession } from '@/lib/types';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { Card, Button, Heading, Text, Badge } from '@/components/ui';

function AdminBackofficeContent() {
  const { user: currentUser } = useAuth();
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingSession, setEditingSession] = useState<LiveSession | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    level: 'M1' as 'M1' | 'M2',
    scheduledDate: '',
    scheduledTime: '',
    durationMinutes: 60,
    questionCount: 10,
  });

  useEffect(() => {
    refreshSessions();
    const interval = setInterval(refreshSessions, 5000);
    return () => clearInterval(interval);
  }, []);

  const refreshSessions = () => {
    updateSessionStatuses(); // Auto-update session statuses based on time
    // Show scheduled, lobby, and active sessions
    const allSessions = getAllAvailableSessions();
    setSessions(allSessions);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      level: 'M1',
      scheduledDate: '',
      scheduledTime: '',
      durationMinutes: 60,
      questionCount: 10,
    });
    setEditingSession(null);
  };

  const applyM1Template = () => {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];

    setFormData({
      name: 'Ensayo PAES M1 - Matemática Básica',
      description: 'Ensayo oficial para nivel M1: números, álgebra básica, geometría y probabilidades. Duración oficial PAES: 2h 20min.',
      level: 'M1',
      scheduledDate: dateStr,
      scheduledTime: '15:00',
      durationMinutes: 140,
      questionCount: 60,
    });
  };

  const applyM2Template = () => {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];

    setFormData({
      name: 'Ensayo PAES M2 - Matemática Avanzada',
      description: 'Ensayo oficial para nivel M2: cálculo, límites, derivadas e integrales. Duración oficial PAES: 2h 20min.',
      level: 'M2',
      scheduledDate: dateStr,
      scheduledTime: '16:30',
      durationMinutes: 140,
      questionCount: 50,
    });
  };

  const handleEdit = (session: LiveSession) => {
    setEditingSession(session);

    // Convert timestamp to date and time
    const scheduledDate = session.scheduledStartTime
      ? new Date(session.scheduledStartTime)
      : new Date();

    const dateStr = scheduledDate.toISOString().split('T')[0];
    const timeStr = scheduledDate.toTimeString().slice(0, 5);

    setFormData({
      name: session.name,
      description: session.description || '',
      level: session.level,
      scheduledDate: dateStr,
      scheduledTime: timeStr,
      durationMinutes: session.durationMinutes,
      questionCount: session.questions.length,
    });
    setShowCreateModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentUser) return;

    if (!formData.name.trim()) {
      setError('El nombre es requerido');
      return;
    }

    if (!formData.scheduledDate || !formData.scheduledTime) {
      setError('La fecha y hora son requeridas');
      return;
    }

    // Combine date and time into a timestamp
    const scheduledDateTime = new Date(`${formData.scheduledDate}T${formData.scheduledTime}`);
    const scheduledTimestamp = scheduledDateTime.getTime();

    // Check if the date is in the future
    if (scheduledTimestamp <= Date.now()) {
      setError('La fecha y hora deben ser en el futuro');
      return;
    }

    if (editingSession) {
      // Update existing session
      const result = updateScheduledSession(editingSession.id, {
        name: formData.name.trim(),
        description: formData.description.trim(),
        level: formData.level,
        scheduledStartTime: scheduledTimestamp,
        durationMinutes: formData.durationMinutes,
        questionCount: formData.questionCount,
      });

      if (result.success) {
        setSuccess('Ensayo actualizado exitosamente');
        setShowCreateModal(false);
        resetForm();
        refreshSessions();
      } else {
        setError(result.error || 'Error al actualizar el ensayo');
      }
    } else {
      // Create new session
      createScheduledSession(
        formData.name.trim(),
        formData.description.trim(),
        formData.level,
        currentUser,
        scheduledTimestamp,
        formData.durationMinutes,
        formData.questionCount
      );

      setSuccess('Ensayo programado exitosamente');
      setShowCreateModal(false);
      resetForm();
      refreshSessions();
    }
  };

  const handleDelete = (sessionId: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este ensayo?')) {
      const result = deleteSession(sessionId);
      if (result.success) {
        setSuccess('Ensayo eliminado exitosamente');
        refreshSessions();
      } else {
        setError(result.error || 'Error al eliminar el ensayo');
      }
    }
  };

  const handleCancel = (sessionId: string) => {
    if (confirm('¿Estás seguro de que deseas cancelar este ensayo?')) {
      const result = cancelSession(sessionId);
      if (result.success) {
        setSuccess('Ensayo cancelado exitosamente');
        refreshSessions();
      } else {
        setError(result.error || 'Error al cancelar el ensayo');
      }
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('es-CL', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="mb-6" padding="lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <Heading level={1} size="md" className="mb-2">
                Panel de Administración
              </Heading>
              <Text variant="secondary">
                Gestiona ensayos PAES en vivo
              </Text>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push('/')}>
                Inicio
              </Button>
              <Button variant="secondary" onClick={() => router.push('/admin/problems')}>
                Explorar Problemas
              </Button>
              <Button variant="primary" onClick={() => router.push('/live-practice')}>
                Ver Lobby
              </Button>
            </div>
          </div>
        </Card>

        {/* Success/Error Messages */}
        {success && (
          <Card className="mb-6 border-[#34C759] dark:border-[#5DE38D]" padding="md">
            <Text className="text-[#34C759] dark:text-[#5DE38D]">{success}</Text>
          </Card>
        )}

        {error && (
          <Card className="mb-6 border-[#FF453A] dark:border-[#FF7A72]" padding="md">
            <Text className="text-[#FF453A] dark:text-[#FF7A72]">{error}</Text>
          </Card>
        )}

        {/* Create Session Button */}
        <div className="mb-6">
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              resetForm();
              setShowCreateModal(true);
              setError('');
              setSuccess('');
            }}
          >
            + Programar Nuevo Ensayo
          </Button>
        </div>

        {/* Sessions List */}
        <Card padding="lg">
          <Heading level={2} size="xs" className="mb-4">
            Ensayos Activos ({sessions.length})
          </Heading>

          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <Text variant="secondary" className="mb-4">
                No hay ensayos programados
              </Text>
              <Text size="xs" variant="secondary">
                Crea un nuevo ensayo para comenzar
              </Text>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="border border-black/[0.12] dark:border-white/[0.16] rounded-xl p-4 hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all duration-[180ms]"
                >
                  <div className="flex flex-col md:flex-row justify-between md:items-start space-y-4 md:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Heading level={3} size="xs">
                          {session.name}
                        </Heading>
                        <Badge
                          variant={
                            session.status === 'scheduled' ? 'info' :
                            session.status === 'lobby' ? 'warning' :
                            session.status === 'active' ? 'success' :
                            session.status === 'cancelled' ? 'danger' : 'neutral'
                          }
                          size="sm"
                        >
                          {session.status === 'scheduled' ? 'Programado' :
                           session.status === 'lobby' ? 'Lobby Abierto' :
                           session.status === 'active' ? 'En Curso' :
                           session.status === 'cancelled' ? 'Cancelado' : session.status}
                        </Badge>
                      </div>

                      {session.description && (
                        <Text size="xs" variant="secondary" className="mb-3">
                          {session.description}
                        </Text>
                      )}

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div>
                          <Text size="xs" variant="secondary" className="inline">Nivel: </Text>
                          <Text size="xs" className="font-medium inline">
                            {session.level}
                          </Text>
                        </div>
                        <div>
                          <Text size="xs" variant="secondary" className="inline">Preguntas: </Text>
                          <Text size="xs" className="font-medium inline">
                            {session.questions.length}
                          </Text>
                        </div>
                        <div>
                          <Text size="xs" variant="secondary" className="inline">Fecha: </Text>
                          <Text size="xs" className="font-medium inline">
                            {session.scheduledStartTime
                              ? formatDate(session.scheduledStartTime)
                              : 'N/A'}
                          </Text>
                        </div>
                      </div>
                    </div>

                    {session.status === 'scheduled' && (
                      <div className="flex flex-wrap gap-2">
                        <Button variant="primary" size="sm" onClick={() => handleEdit(session)}>
                          Editar
                        </Button>
                        <Button variant="primary" size="sm" onClick={() => handleCancel(session.id)} className="bg-[#FF9F0A]">
                          Cancelar
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(session.id)}>
                          Eliminar
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <Card className="max-w-2xl w-full my-8 shadow-[0_14px_36px_-4px_rgba(0,0,0,0.22)]" padding="lg">
            <Heading level={2} size="sm" className="mb-4">
              {editingSession ? 'Editar Ensayo' : 'Programar Nuevo Ensayo'}
            </Heading>

            {!editingSession && (
              <div className="mb-6">
                <Text size="xs" variant="secondary" className="mb-3">
                  Plantillas rápidas:
                </Text>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={applyM1Template}
                    className="flex-1 px-4 py-3 bg-[#0A84FF]/[0.06] dark:bg-[#0A84FF]/[0.12] border-2 border-[#0A84FF]/30 dark:border-[#0A84FF]/50 rounded-xl hover:bg-[#0A84FF]/[0.12] dark:hover:bg-[#0A84FF]/[0.18] transition-all duration-[180ms] hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
                  >
                    <div className="font-semibold text-[#0A84FF] dark:text-[#66B2FF] mb-1">
                      📐 M1 - Básico
                    </div>
                    <div className="text-xs text-[#0A84FF]/80 dark:text-[#66B2FF]/80">
                      140 min (2h 20min) • 60 preguntas
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={applyM2Template}
                    className="flex-1 px-4 py-3 bg-[#5E5CE6]/[0.06] dark:bg-[#5E5CE6]/[0.12] border-2 border-[#5E5CE6]/30 dark:border-[#5E5CE6]/50 rounded-xl hover:bg-[#5E5CE6]/[0.12] dark:hover:bg-[#5E5CE6]/[0.18] transition-all duration-[180ms] hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
                  >
                    <div className="font-semibold text-[#5E5CE6] dark:text-[#9F9DFF] mb-1">
                      🎓 M2 - Avanzado
                    </div>
                    <div className="text-xs text-[#5E5CE6]/80 dark:text-[#9F9DFF]/80">
                      140 min (2h 20min) • 50 preguntas
                    </div>
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nombre del Ensayo *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej: Ensayo PAES M1 - Matemática Básica"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Descripción
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descripción opcional del ensayo"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nivel *
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) =>
                      setFormData({ ...formData, level: e.target.value as 'M1' | 'M2' })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="M1">M1</option>
                    <option value="M2">M2</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Cantidad de Preguntas *
                  </label>
                  <input
                    type="number"
                    value={formData.questionCount}
                    onChange={(e) =>
                      setFormData({ ...formData, questionCount: Number(e.target.value) })
                    }
                    min="5"
                    max="65"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    PAES oficial: M1=60, M2=50 preguntas
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Fecha *
                  </label>
                  <input
                    type="date"
                    value={formData.scheduledDate}
                    onChange={(e) =>
                      setFormData({ ...formData, scheduledDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Hora *
                  </label>
                  <input
                    type="time"
                    value={formData.scheduledTime}
                    onChange={(e) =>
                      setFormData({ ...formData, scheduledTime: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Duración (minutos) *
                  </label>
                  <input
                    type="number"
                    value={formData.durationMinutes}
                    onChange={(e) =>
                      setFormData({ ...formData, durationMinutes: Number(e.target.value) })
                    }
                    min="15"
                    max="240"
                    step="15"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Entre 15 y 240 minutos (4 horas)
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                    setError('');
                  }}
                  fullWidth
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                >
                  {editingSession ? 'Actualizar' : 'Programar Ensayo'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

export default function AdminBackoffice() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminBackofficeContent />
    </ProtectedRoute>
  );
}
