'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import TeacherLayout from '@/components/layout/TeacherLayout';
import { Card, Heading, Text, Button, Badge, Spinner } from '@/components/ui';
import { useClass, useClassMutations, type ClassLevel } from '@/lib/hooks/useClasses';
import { CLASS_LEVEL_OPTIONS } from '@/lib/types/teacher';
import { ArrowLeft, Trash2, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

type ConfirmAction = 'delete' | null;

export default function EditClassPage() {
  const router = useRouter();
  const params = useParams();
  const classId = params.classId as string;

  const { classData, isLoading, error } = useClass(classId);
  const { updateClass, deleteClass } = useClassMutations();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    level: '2-medio' as ClassLevel,
    schoolName: '',
    maxStudents: 45,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Populate form when class data loads
  useEffect(() => {
    if (classData) {
      setFormData({
        name: classData.name,
        description: classData.description || '',
        level: classData.level as ClassLevel,
        schoolName: classData.schoolName || '',
        maxStudents: classData.maxStudents,
      });
    }
  }, [classData]);

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateClass(classId, {
      name: formData.name.trim(),
      description: formData.description.trim() || undefined,
      level: formData.level,
      schoolName: formData.schoolName.trim() || undefined,
      maxStudents: formData.maxStudents,
    });
    setIsSaving(false);

    if (result.success) {
      toast.success('Clase actualizada');
      setHasChanges(false);
      router.push(`/teacher/classes/${classId}`);
    } else {
      toast.error(result.error || 'Error al actualizar la clase');
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteClass(classId);
    setIsDeleting(false);

    if (result.success) {
      toast.success('Clase eliminada');
      router.push('/teacher/classes');
    } else {
      toast.error(result.error || 'Error al eliminar la clase');
    }
    setConfirmAction(null);
  };

  // Loading state
  if (isLoading) {
    return (
      <TeacherLayout>
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      </TeacherLayout>
    );
  }

  // Error state
  if (error || !classData) {
    return (
      <TeacherLayout>
        <Card padding="lg" className="text-center py-12">
          <Text className="text-red-600 dark:text-red-400">
            Clase no encontrada
          </Text>
          <Button
            onClick={() => router.push('/teacher/classes')}
            className="mt-4"
          >
            Volver a clases
          </Button>
        </Card>
      </TeacherLayout>
    );
  }

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
                Nivel
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {CLASS_LEVEL_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChange('level', option.value)}
                    className={`p-3 rounded-xl border-2 transition-all text-left ${
                      formData.level === option.value
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="font-bold text-sm text-gray-900 dark:text-white">
                      {option.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{option.desc}</div>
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

        {/* Danger Zone */}
        <Card padding="lg" className="border-red-200 dark:border-red-800">
          <Heading level={3} size="sm" className="text-red-600 dark:text-red-400 mb-4">
            Zona de Peligro
          </Heading>

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
        </Card>
      </div>

      {/* Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0" onClick={() => setConfirmAction(null)} />
          <Card padding="lg" className="max-w-md w-full relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-100 dark:bg-red-900/30">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <Heading level={3} size="sm">
                  ¿Eliminar esta clase?
                </Heading>
              </div>
            </div>

            <Text variant="secondary" className="mb-6">
              Esta acción no se puede deshacer. Se eliminarán todos los datos de la clase
              y los registros de estudiantes asociados.
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
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                {isDeleting ? 'Eliminando...' : 'Eliminar clase'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </TeacherLayout>
  );
}
