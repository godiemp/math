'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, isAdmin, ensureAdminExists } from '@/lib/auth';
import {
  getScheduledSessions,
  createScheduledSession,
  updateScheduledSession,
  deleteSession,
  cancelSession,
  updateSessionStatuses,
} from '@/lib/liveSessions';
import { LiveSession } from '@/lib/types';

export default function AdminBackoffice() {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
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
    ensureAdminExists();
    const user = getCurrentUser();
    setCurrentUser(user);

    if (!user || !isAdmin()) {
      router.push('/');
      return;
    }

    refreshSessions();
    const interval = setInterval(refreshSessions, 5000);
    return () => clearInterval(interval);
  }, [router]);

  const refreshSessions = () => {
    updateSessionStatuses(); // Auto-update session statuses based on time
    setSessions(getScheduledSessions());
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
      name: 'Práctica M1 - Matemática Básica',
      description: 'Sesión de práctica para nivel M1: números, álgebra básica, geometría y probabilidades. Duración oficial PAES: 2h 20min.',
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
      name: 'Práctica M2 - Matemática Avanzada',
      description: 'Sesión de práctica para nivel M2: cálculo, límites, derivadas e integrales. Duración oficial PAES: 2h 20min.',
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
        setSuccess('Sesión actualizada exitosamente');
        setShowCreateModal(false);
        resetForm();
        refreshSessions();
      } else {
        setError(result.error || 'Error al actualizar la sesión');
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

      setSuccess('Sesión programada exitosamente');
      setShowCreateModal(false);
      resetForm();
      refreshSessions();
    }
  };

  const handleDelete = (sessionId: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta sesión?')) {
      const result = deleteSession(sessionId);
      if (result.success) {
        setSuccess('Sesión eliminada exitosamente');
        refreshSessions();
      } else {
        setError(result.error || 'Error al eliminar la sesión');
      }
    }
  };

  const handleCancel = (sessionId: string) => {
    if (confirm('¿Estás seguro de que deseas cancelar esta sesión?')) {
      const result = cancelSession(sessionId);
      if (result.success) {
        setSuccess('Sesión cancelada exitosamente');
        refreshSessions();
      } else {
        setError(result.error || 'Error al cancelar la sesión');
      }
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('es-CL', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  if (!currentUser || !isAdmin()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Panel de Administración
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Gestiona sesiones de práctica en vivo
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Inicio
              </button>
              <button
                onClick={() => router.push('/live-practice')}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
              >
                Ver Lobby
              </button>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-green-600 dark:text-green-400">{success}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Create Session Button */}
        <div className="mb-6">
          <button
            onClick={() => {
              resetForm();
              setShowCreateModal(true);
              setError('');
              setSuccess('');
            }}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            + Programar Nueva Sesión
          </button>
        </div>

        {/* Sessions List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Sesiones Programadas ({sessions.length})
          </h2>

          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No hay sesiones programadas
              </p>
              <p className="text-sm text-gray-500">
                Crea una nueva sesión para comenzar
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row justify-between md:items-start space-y-4 md:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                          {session.name}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            session.status === 'scheduled'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                              : session.status === 'cancelled'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                          }`}
                        >
                          {session.status === 'scheduled'
                            ? 'Programada'
                            : session.status === 'cancelled'
                            ? 'Cancelada'
                            : session.status}
                        </span>
                      </div>

                      {session.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {session.description}
                        </p>
                      )}

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Nivel:</span>{' '}
                          <span className="font-medium text-gray-900 dark:text-white">
                            {session.level}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Preguntas:</span>{' '}
                          <span className="font-medium text-gray-900 dark:text-white">
                            {session.questions.length}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">
                            Participantes:
                          </span>{' '}
                          <span className="font-medium text-gray-900 dark:text-white">
                            {session.participants.length}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Fecha:</span>{' '}
                          <span className="font-medium text-gray-900 dark:text-white">
                            {session.scheduledStartTime
                              ? formatDate(session.scheduledStartTime)
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {session.status === 'scheduled' && (
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleEdit(session)}
                          className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleCancel(session.id)}
                          className="px-3 py-1.5 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 transition-colors"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => handleDelete(session.id)}
                          className="px-3 py-1.5 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-2xl w-full my-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {editingSession ? 'Editar Sesión' : 'Programar Nueva Sesión'}
            </h2>

            {!editingSession && (
              <div className="mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Plantillas rápidas:
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={applyM1Template}
                    className="flex-1 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    <div className="font-semibold text-blue-800 dark:text-blue-400 mb-1">
                      📐 M1 - Básico
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-500">
                      140 min (2h 20min) • 60 preguntas
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={applyM2Template}
                    className="flex-1 px-4 py-3 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-300 dark:border-purple-700 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                  >
                    <div className="font-semibold text-purple-800 dark:text-purple-400 mb-1">
                      🎓 M2 - Avanzado
                    </div>
                    <div className="text-xs text-purple-600 dark:text-purple-500">
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
                    Nombre de la Sesión *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej: Práctica de Álgebra - Semana 1"
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
                    placeholder="Descripción opcional de la sesión"
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

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                    setError('');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {editingSession ? 'Actualizar' : 'Programar Sesión'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
