'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import TeacherLayout from '@/components/layout/TeacherLayout';
import { Card, Heading, Text, Button, Badge } from '@/components/ui';
import { MOCK_CLASSES } from '@/lib/types/teacher';
import { ArrowLeft, RefreshCw, Trash2, Archive, Copy, Check, AlertTriangle } from 'lucide-react';

type ConfirmAction = 'regenerate' | 'archive' | 'delete' | null;

export default function EditClassPage() {
  const router = useRouter();
  const params = useParams();
  const classId = params.classId as string;

  // Find the class (mock)
  const classData = MOCK_CLASSES.find((c) => c.id === classId) || MOCK_CLASSES[0];

  const [formData, setFormData] = useState({
    name: classData.name,
    description: classData.description || '',
    level: classData.level,
    schoolName: classData.schoolName || '',
    maxStudents: classData.maxStudents,
    inviteCodeActive: classData.inviteCodeActive,
  });
  const [inviteCode, setInviteCode] = useState(classData.inviteCode);
  const [isSaving, setIsSaving] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
  const [copied, setCopied] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setHasChanges(false);
    // In real app, would save and redirect
    router.push(`/teacher/classes/${classId}`);
  };

  const handleRegenerateCode = async () => {
    // Generate new code
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let newCode = '';
    for (let i = 0; i < 8; i++) {
      newCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setInviteCode(newCode);
    setConfirmAction(null);
    setHasChanges(true);
  };

  const handleArchive = async () => {
    // In real app, would archive class
    setConfirmAction(null);
    router.push('/teacher/classes');
  };

  const handleDelete = async () => {
    // In real app, would delete class
    setConfirmAction(null);
    router.push('/teacher/classes');
  };

  const copyInviteCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TeacherLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push(`/teacher/classes/${classId}`)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <Heading level={1} size="lg">
              Editar Clase
            </Heading>
            <Text variant="secondary">{classData.name}</Text>
          </div>
          {hasChanges && (
            <Badge variant="warning">Cambios sin guardar</Badge>
          )}
        </div>

        {/* Main Form */}
        <Card padding="lg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="space-y-6"
          >
            {/* Class Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nombre de la clase *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nivel PAES
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'M1', label: 'M1', desc: 'Básico' },
                  { value: 'M2', label: 'M2', desc: 'Avanzado' },
                  { value: 'both', label: 'Ambos', desc: 'M1 + M2' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChange('level', option.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.level === option.value
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="font-bold text-lg text-gray-900 dark:text-white">
                      {option.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {option.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* School Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nombre del colegio
              </label>
              <input
                type="text"
                value={formData.schoolName}
                onChange={(e) => handleChange('schoolName', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Max Students */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Máximo de estudiantes
              </label>
              <input
                type="number"
                min={classData.studentCount}
                max={100}
                value={formData.maxStudents}
                onChange={(e) => handleChange('maxStudents', parseInt(e.target.value) || 45)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
              <Text size="xs" variant="secondary" className="mt-1">
                Actualmente hay {classData.studentCount} estudiantes. No puedes reducir por debajo de este número.
              </Text>
            </div>

            {/* Save Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.push(`/teacher/classes/${classId}`)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={!hasChanges || isSaving}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
              >
                {isSaving ? 'Guardando...' : 'Guardar cambios'}
              </Button>
            </div>
          </form>
        </Card>

        {/* Invite Code Management */}
        <Card padding="lg">
          <Heading level={3} size="sm" className="mb-4">
            Código de Invitación
          </Heading>

          <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800 mb-4">
            <div>
              <Text size="sm" variant="secondary" className="mb-1">
                Código actual
              </Text>
              <code className="text-2xl font-mono font-bold text-emerald-700 dark:text-emerald-400">
                {inviteCode}
              </code>
            </div>
            <button
              onClick={copyInviteCode}
              className="p-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
              title="Copiar código"
            >
              {copied ? (
                <Check className="w-5 h-5 text-emerald-600" />
              ) : (
                <Copy className="w-5 h-5 text-emerald-600" />
              )}
            </button>
          </div>

          {/* Toggle code active */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl mb-4">
            <div>
              <Text className="font-medium">Código activo</Text>
              <Text size="sm" variant="secondary">
                Si desactivas el código, nuevos estudiantes no podrán unirse
              </Text>
            </div>
            <button
              onClick={() => handleChange('inviteCodeActive', !formData.inviteCodeActive)}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                formData.inviteCodeActive
                  ? 'bg-emerald-500'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                  formData.inviteCodeActive ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Regenerate Code */}
          <Button
            variant="ghost"
            onClick={() => setConfirmAction('regenerate')}
            className="w-full flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Generar nuevo código
          </Button>

          <Text size="xs" variant="secondary" className="mt-2 text-center">
            Al generar un nuevo código, el código anterior dejará de funcionar
          </Text>
        </Card>

        {/* Danger Zone */}
        <Card padding="lg" className="border-red-200 dark:border-red-800">
          <Heading level={3} size="sm" className="text-red-600 dark:text-red-400 mb-4">
            Zona de Peligro
          </Heading>

          <div className="space-y-3">
            <button
              onClick={() => setConfirmAction('archive')}
              className="w-full flex items-center gap-3 p-4 rounded-xl border border-orange-200 dark:border-orange-800 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors text-left"
            >
              <Archive className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <div>
                <Text className="font-medium text-orange-900 dark:text-orange-100">
                  Archivar clase
                </Text>
                <Text size="xs" variant="secondary">
                  La clase se ocultará pero los datos se conservarán
                </Text>
              </div>
            </button>

            <button
              onClick={() => setConfirmAction('delete')}
              className="w-full flex items-center gap-3 p-4 rounded-xl border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
            >
              <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
              <div>
                <Text className="font-medium text-red-900 dark:text-red-100">
                  Eliminar clase
                </Text>
                <Text size="xs" variant="secondary">
                  Se eliminarán todos los datos de la clase permanentemente
                </Text>
              </div>
            </button>
          </div>
        </Card>
      </div>

      {/* Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0" onClick={() => setConfirmAction(null)} />
          <Card padding="lg" className="max-w-md w-full relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  confirmAction === 'delete'
                    ? 'bg-red-100 dark:bg-red-900/30'
                    : confirmAction === 'archive'
                    ? 'bg-orange-100 dark:bg-orange-900/30'
                    : 'bg-blue-100 dark:bg-blue-900/30'
                }`}
              >
                <AlertTriangle
                  className={`w-6 h-6 ${
                    confirmAction === 'delete'
                      ? 'text-red-600 dark:text-red-400'
                      : confirmAction === 'archive'
                      ? 'text-orange-600 dark:text-orange-400'
                      : 'text-blue-600 dark:text-blue-400'
                  }`}
                />
              </div>
              <div>
                <Heading level={3} size="sm">
                  {confirmAction === 'regenerate' && '¿Generar nuevo código?'}
                  {confirmAction === 'archive' && '¿Archivar esta clase?'}
                  {confirmAction === 'delete' && '¿Eliminar esta clase?'}
                </Heading>
              </div>
            </div>

            <Text variant="secondary" className="mb-6">
              {confirmAction === 'regenerate' &&
                'El código actual dejará de funcionar. Los estudiantes que ya están en la clase no serán afectados.'}
              {confirmAction === 'archive' &&
                'La clase se ocultará de tu lista pero podrás restaurarla más tarde. Los datos de los estudiantes se conservarán.'}
              {confirmAction === 'delete' &&
                'Esta acción no se puede deshacer. Se eliminarán todos los datos de la clase y los registros de estudiantes.'}
            </Text>

            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => setConfirmAction(null)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  if (confirmAction === 'regenerate') handleRegenerateCode();
                  if (confirmAction === 'archive') handleArchive();
                  if (confirmAction === 'delete') handleDelete();
                }}
                className={`flex-1 ${
                  confirmAction === 'delete'
                    ? 'bg-red-600 hover:bg-red-700'
                    : confirmAction === 'archive'
                    ? 'bg-orange-600 hover:bg-orange-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {confirmAction === 'regenerate' && 'Generar nuevo código'}
                {confirmAction === 'archive' && 'Archivar clase'}
                {confirmAction === 'delete' && 'Eliminar clase'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </TeacherLayout>
  );
}
