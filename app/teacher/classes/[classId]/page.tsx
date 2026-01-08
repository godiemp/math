'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import TeacherLayout from '@/components/layout/TeacherLayout';
import { Card, Heading, Text, Button, Badge, Spinner } from '@/components/ui';
import {
  useClass,
  useClasses,
  useClassStudents,
  useClassAnalytics,
  useStudentEnrollmentMutations,
  type ClassStudent,
} from '@/lib/hooks/useClasses';
import { createStudentInClass, moveStudentToClass } from '@/lib/classApi';
import { ArrowLeft, Users, TrendingUp, BookOpen, AlertTriangle, UserPlus, X, Search, Trash2, ArrowRightLeft, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'hace un momento';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `hace ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `hace ${days}d`;
  return `hace ${Math.floor(days / 7)} sem`;
}

function getAccuracyColor(accuracy: number): string {
  if (accuracy >= 0.8) return 'text-green-600 dark:text-green-400';
  if (accuracy >= 0.6) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-red-600 dark:text-red-400';
}

function getAccuracyBg(accuracy: number): string {
  if (accuracy >= 0.8) return 'bg-green-100 dark:bg-green-900/30';
  if (accuracy >= 0.6) return 'bg-yellow-100 dark:bg-yellow-900/30';
  return 'bg-red-100 dark:bg-red-900/30';
}

type SortField = 'name' | 'accuracy' | 'questions' | 'lastActive' | 'streak';
type SortOrder = 'asc' | 'desc';

// Add Student Modal Component with tabs for Search and Create New
function AddStudentModal({
  classId,
  onClose,
  onStudentsAdded,
}: {
  classId: string;
  onClose: () => void;
  onStudentsAdded: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'search' | 'create'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ id: string; displayName: string; email: string }[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { searchStudents, addStudents } = useStudentEnrollmentMutations(classId);

  // Create new student state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState<{ username: string; password: string } | null>(null);
  const [copiedField, setCopiedField] = useState<'username' | 'password' | null>(null);

  const handleSearch = async () => {
    if (searchQuery.length < 2) return;
    setIsSearching(true);
    const results = await searchStudents(searchQuery);
    setSearchResults(results);
    setIsSearching(false);
  };

  const toggleStudent = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]
    );
  };

  const handleAddStudents = async () => {
    if (selectedStudents.length === 0) return;
    setIsAdding(true);
    const result = await addStudents(selectedStudents);
    setIsAdding(false);

    if (result.success) {
      toast.success(`${result.added} estudiante(s) agregado(s)`);
      onStudentsAdded();
      onClose();
    } else {
      toast.error(result.errors[0] || 'Error al agregar estudiantes');
    }
  };

  const handleCreateStudent = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast.error('Por favor ingresa nombre y apellido');
      return;
    }

    setIsCreating(true);
    const result = await createStudentInClass(classId, firstName.trim(), lastName.trim());
    setIsCreating(false);

    if (result.success && result.credentials) {
      setCreatedCredentials(result.credentials);
      onStudentsAdded();
    } else {
      toast.error(result.error || 'Error al crear estudiante');
    }
  };

  const handleCopy = async (field: 'username' | 'password') => {
    if (!createdCredentials) return;
    await navigator.clipboard.writeText(createdCredentials[field]);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Show credentials modal if student was created
  if (createdCredentials) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card padding="lg" className="w-full max-w-md" data-testid="class-student-credentials-modal">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <Heading level={3} size="sm">
              Estudiante Creado
            </Heading>
            <Text variant="secondary" className="mt-2">
              Guarda estas credenciales para compartirlas con el estudiante
            </Text>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <Text size="sm" variant="secondary" className="mb-1">Usuario</Text>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-sm">
                  {createdCredentials.username}
                </div>
                <button
                  onClick={() => handleCopy('username')}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {copiedField === 'username' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <Text size="sm" variant="secondary" className="mb-1">Contraseña</Text>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-sm">
                  {createdCredentials.password}
                </div>
                <button
                  onClick={() => handleCopy('password')}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {copiedField === 'password' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <Button onClick={onClose} className="w-full bg-emerald-600 hover:bg-emerald-700">
            Entendido
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card padding="lg" className="w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col" data-testid="class-add-student-modal">
        <div className="flex items-center justify-between mb-4">
          <Heading level={3} size="sm">
            Agregar Estudiantes
          </Heading>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 -mb-px ${
              activeTab === 'search'
                ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Buscar Existente
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 -mb-px ${
              activeTab === 'create'
                ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Crear Nuevo
          </button>
        </div>

        {/* Search Tab Content */}
        {activeTab === 'search' && (
          <>
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Buscar por nombre o email..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  data-testid="class-student-search-input"
                />
              </div>
              <Button onClick={handleSearch} disabled={searchQuery.length < 2 || isSearching} data-testid="class-student-search-button">
                {isSearching ? '...' : 'Buscar'}
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto mb-4" data-testid="class-student-search-results">
              {searchResults.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400" data-testid="class-student-search-empty">
                  {searchQuery.length >= 2
                    ? 'No se encontraron estudiantes'
                    : 'Busca estudiantes por nombre o email'}
                </div>
              ) : (
                <div className="space-y-2">
                  {searchResults.map((student) => (
                    <div
                      key={student.id}
                      onClick={() => toggleStudent(student.id)}
                      data-testid={`class-student-result-${student.id}`}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedStudents.includes(student.id)
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className="font-medium">{student.displayName}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="ghost" onClick={onClose} className="flex-1">
                Cancelar
              </Button>
              <Button
                onClick={handleAddStudents}
                disabled={selectedStudents.length === 0 || isAdding}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                data-testid="class-student-add-button"
              >
                {isAdding ? 'Agregando...' : `Agregar (${selectedStudents.length})`}
              </Button>
            </div>
          </>
        )}

        {/* Create New Tab Content */}
        {activeTab === 'create' && (
          <>
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Ej: María"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  data-testid="class-create-student-firstname"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Apellido
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Ej: González"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  data-testid="class-create-student-lastname"
                />
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <Text size="sm" className="text-blue-800 dark:text-blue-200">
                  El nivel del estudiante se asignará automáticamente según el nivel de esta clase.
                  Se generará un usuario y contraseña que deberás compartir con el estudiante.
                </Text>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="ghost" onClick={onClose} className="flex-1">
                Cancelar
              </Button>
              <Button
                onClick={handleCreateStudent}
                disabled={!firstName.trim() || !lastName.trim() || isCreating}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                data-testid="class-create-student-button"
              >
                {isCreating ? 'Creando...' : 'Crear Estudiante'}
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

// Move Student Modal Component
function MoveStudentModal({
  student,
  currentClassId,
  onClose,
  onStudentMoved,
}: {
  student: { id: string; displayName: string };
  currentClassId: string;
  onClose: () => void;
  onStudentMoved: () => void;
}) {
  const [targetClassId, setTargetClassId] = useState('');
  const [isMoving, setIsMoving] = useState(false);
  const { classes, isLoading } = useClasses();

  // Filter out current class
  const availableClasses = classes.filter((c) => c.id !== currentClassId);

  const handleMove = async () => {
    if (!targetClassId) return;

    setIsMoving(true);
    const result = await moveStudentToClass(currentClassId, student.id, targetClassId);
    setIsMoving(false);

    if (result.success) {
      toast.success(result.message || 'Estudiante movido exitosamente');
      onStudentMoved();
      onClose();
    } else {
      toast.error(result.error || 'Error al mover estudiante');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card padding="lg" className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <Heading level={3} size="sm">
            Mover Estudiante
          </Heading>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <Text variant="secondary" className="mb-4">
          Mover a <span className="font-medium text-gray-900 dark:text-white">{student.displayName}</span> a otra clase
        </Text>

        {isLoading ? (
          <div className="flex justify-center py-4">
            <Spinner />
          </div>
        ) : availableClasses.length === 0 ? (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            No tienes otras clases disponibles
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Seleccionar clase destino
              </label>
              <select
                value={targetClassId}
                onChange={(e) => setTargetClassId(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              >
                <option value="">Selecciona una clase...</option>
                {availableClasses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.studentCount} estudiantes)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="ghost" onClick={onClose} className="flex-1">
                Cancelar
              </Button>
              <Button
                onClick={handleMove}
                disabled={!targetClassId || isMoving}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                {isMoving ? 'Moviendo...' : 'Mover'}
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

export default function ClassDetailPage() {
  const router = useRouter();
  const params = useParams();
  const classId = params.classId as string;

  const [sortField, setSortField] = useState<SortField>('accuracy');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [activeTab, setActiveTab] = useState<'roster' | 'analytics'>('roster');
  const [showAddModal, setShowAddModal] = useState(false);
  const [removingStudentId, setRemovingStudentId] = useState<string | null>(null);
  const [movingStudent, setMovingStudent] = useState<{ id: string; displayName: string } | null>(null);

  const { classData, isLoading: classLoading, error: classError, refresh: refreshClass } = useClass(classId);
  const { students, isLoading: studentsLoading, refresh: refreshStudents } = useClassStudents(classId);
  const { analytics, isLoading: analyticsLoading } = useClassAnalytics(classId);
  const { removeStudent } = useStudentEnrollmentMutations(classId);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleRemoveStudent = async (studentId: string, studentName: string) => {
    if (!confirm(`¿Estás seguro de remover a ${studentName} de la clase?`)) return;

    setRemovingStudentId(studentId);
    const result = await removeStudent(studentId);
    setRemovingStudentId(null);

    if (result.success) {
      toast.success('Estudiante removido');
      refreshStudents();
      refreshClass();
    } else {
      toast.error(result.error || 'Error al remover estudiante');
    }
  };

  const sortedStudents = [...students].sort((a, b) => {
    let comparison = 0;
    switch (sortField) {
      case 'name':
        comparison = a.displayName.localeCompare(b.displayName);
        break;
      case 'accuracy':
        comparison = a.accuracy - b.accuracy;
        break;
      case 'questions':
        comparison = a.questionsAnswered - b.questionsAnswered;
        break;
      case 'lastActive':
        comparison = (a.lastActive || 0) - (b.lastActive || 0);
        break;
      case 'streak':
        comparison = a.currentStreak - b.currentStreak;
        break;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const SortButton = ({ field, label }: { field: SortField; label: string }) => (
    <button
      onClick={() => handleSort(field)}
      className={`flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${
        sortField === field ? 'text-emerald-600 dark:text-emerald-400 font-medium' : ''
      }`}
    >
      {label}
      {sortField === field && <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>}
    </button>
  );

  // Loading state
  if (classLoading) {
    return (
      <TeacherLayout>
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      </TeacherLayout>
    );
  }

  // Error state
  if (classError || !classData) {
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
      <div className="space-y-6">
        {/* Back Button & Header */}
        <div className="flex items-center gap-4" data-testid="class-detail-header">
          <button
            onClick={() => router.push('/teacher/classes')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <Heading level={1} size="lg">
              {classData.name}
            </Heading>
            <Text variant="secondary">
              {classData.schoolName || 'Sin colegio asignado'} • {classData.studentCount} estudiantes
            </Text>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700"
            data-testid="class-add-students-button"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Agregar Estudiantes
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card padding="md" className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <Text size="xs" variant="secondary">Estudiantes</Text>
                <Text className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {analytics?.totalStudents || classData.studentCount}
                </Text>
              </div>
            </div>
          </Card>

          <Card padding="md" className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <Text size="xs" variant="secondary">Precisión Promedio</Text>
                <Text className="text-xl font-bold text-green-600 dark:text-green-400">
                  {analytics ? `${Math.round(analytics.avgAccuracy * 100)}%` : '-'}
                </Text>
              </div>
            </div>
          </Card>

          <Card padding="md" className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <Text size="xs" variant="secondary">Preg. Promedio</Text>
                <Text className="text-xl font-bold text-purple-600 dark:text-purple-400">
                  {analytics?.avgQuestionsPerStudent || '-'}
                </Text>
              </div>
            </div>
          </Card>

          <Card padding="md" className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <span className="text-orange-600 dark:text-orange-400">🔥</span>
              </div>
              <div>
                <Text size="xs" variant="secondary">Activos esta semana</Text>
                <Text className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  {analytics?.activeThisWeek || '-'}
                </Text>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('roster')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 -mb-px ${
              activeTab === 'roster'
                ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Estudiantes
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 -mb-px ${
              activeTab === 'analytics'
                ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Analíticas
          </button>
        </div>

        {/* Tab Content - Students Roster */}
        {activeTab === 'roster' && (
          <>
            {studentsLoading ? (
              <div className="flex justify-center py-8">
                <Spinner />
              </div>
            ) : students.length === 0 ? (
              <Card padding="lg" className="text-center py-12" data-testid="class-students-empty">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <Heading level={3} size="sm" className="mb-2">
                  Sin estudiantes
                </Heading>
                <Text variant="secondary" className="mb-4">
                  Agrega estudiantes a esta clase para ver su progreso
                </Text>
                <Button
                  onClick={() => setShowAddModal(true)}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Agregar Estudiantes
                </Button>
              </Card>
            ) : (
              <>
                {/* Mobile Sort Controls */}
                <div className="flex items-center gap-2 md:hidden mb-4 overflow-x-auto pb-2">
                  <Text size="xs" variant="secondary" className="flex-shrink-0">Ordenar:</Text>
                  {(['accuracy', 'questions', 'lastActive'] as const).map((field) => (
                    <button
                      key={field}
                      onClick={() => handleSort(field)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                        sortField === field
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                      }`}
                    >
                      {field === 'accuracy' && 'Precisión'}
                      {field === 'questions' && 'Preguntas'}
                      {field === 'lastActive' && 'Actividad'}
                      {sortField === field && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                    </button>
                  ))}
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-3">
                  {sortedStudents.map((student) => (
                    <Card
                      key={student.id}
                      padding="md"
                      className="hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-medium text-lg">
                          {student.displayName.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 dark:text-white truncate">
                            {student.displayName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {student.lastActive ? formatTimeAgo(student.lastActive) : 'Nunca activo'}
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1.5 rounded-full text-sm font-bold ${getAccuracyBg(
                            student.accuracy
                          )} ${getAccuracyColor(student.accuracy)}`}
                        >
                          {Math.round(student.accuracy * 100)}%
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                          <div className="font-bold text-gray-900 dark:text-white">{student.questionsAnswered}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">preguntas</div>
                        </div>
                        <div className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                          <div className="font-bold text-gray-900 dark:text-white">{student.lessonsCompleted}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">lecciones</div>
                        </div>
                        <div className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                          <div className="font-bold text-orange-600 dark:text-orange-400">
                            {student.currentStreak > 0 ? `🔥 ${student.currentStreak}` : '-'}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">racha</div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                        <button
                          onClick={() => setMovingStudent({ id: student.id, displayName: student.displayName })}
                          className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        >
                          <ArrowRightLeft className="w-4 h-4" />
                          Mover
                        </button>
                        <button
                          onClick={() => handleRemoveStudent(student.id, student.displayName)}
                          disabled={removingStudentId === student.id}
                          className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remover
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Desktop Table View */}
                <Card padding="sm" className="overflow-hidden hidden md:block" data-testid="class-students-table">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            <SortButton field="name" label="Estudiante" />
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            <SortButton field="accuracy" label="Precisión" />
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            <SortButton field="questions" label="Preguntas" />
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Lecciones
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            <SortButton field="streak" label="Racha" />
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            <SortButton field="lastActive" label="Última Actividad" />
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {sortedStudents.map((student) => (
                          <tr
                            key={student.id}
                            className="hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-colors"
                            data-testid={`class-student-row-${student.id}`}
                          >
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-medium">
                                  {student.displayName.charAt(0)}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900 dark:text-white">
                                    {student.displayName}
                                  </div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {student.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-center">
                              <span
                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium ${getAccuracyBg(
                                  student.accuracy
                                )} ${getAccuracyColor(student.accuracy)}`}
                              >
                                {Math.round(student.accuracy * 100)}%
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-center text-gray-900 dark:text-white">
                              {student.questionsAnswered}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-center text-gray-900 dark:text-white">
                              {student.lessonsCompleted}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-center">
                              {student.currentStreak > 0 ? (
                                <span className="inline-flex items-center gap-1 text-orange-600 dark:text-orange-400 font-medium">
                                  🔥 {student.currentStreak}
                                </span>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                              {student.lastActive ? formatTimeAgo(student.lastActive) : 'Nunca'}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-center">
                              <div className="flex items-center justify-center gap-1">
                                <button
                                  onClick={() => setMovingStudent({ id: student.id, displayName: student.displayName })}
                                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                  title="Mover a otra clase"
                                >
                                  <ArrowRightLeft className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleRemoveStudent(student.id, student.displayName)}
                                  disabled={removingStudentId === student.id}
                                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                                  title="Remover estudiante"
                                  data-testid={`class-remove-student-${student.id}`}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </>
            )}
          </>
        )}

        {/* Tab Content - Analytics */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {analyticsLoading ? (
              <div className="col-span-2 flex justify-center py-8">
                <Spinner />
              </div>
            ) : analytics ? (
              <>
                {/* Subject Breakdown */}
                <Card padding="lg">
                  <Heading level={3} size="sm" className="mb-4">
                    Precisión por Materia
                  </Heading>
                  {analytics.subjectBreakdown.length === 0 ? (
                    <Text variant="secondary">No hay datos de materias aún</Text>
                  ) : (
                    <div className="space-y-4">
                      {analytics.subjectBreakdown.map((subject) => (
                        <div key={subject.subject}>
                          <div className="flex items-center justify-between mb-1">
                            <Text size="sm" className="capitalize">
                              {subject.subject}
                            </Text>
                            <Text size="sm" className={getAccuracyColor(subject.avgAccuracy)}>
                              {Math.round(subject.avgAccuracy * 100)}%
                            </Text>
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                subject.avgAccuracy >= 0.8
                                  ? 'bg-green-500'
                                  : subject.avgAccuracy >= 0.6
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${subject.avgAccuracy * 100}%` }}
                            />
                          </div>
                          <Text size="xs" variant="secondary" className="mt-1">
                            {subject.questionsAnswered} preguntas respondidas
                          </Text>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>

                {/* Struggling Topics */}
                <Card padding="lg">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <Heading level={3} size="sm">
                      Temas con Dificultad
                    </Heading>
                  </div>
                  {analytics.strugglingTopics.length === 0 ? (
                    <Text variant="secondary">No hay temas con dificultad identificados</Text>
                  ) : (
                    <div className="space-y-3">
                      {analytics.strugglingTopics.map((topic, index) => (
                        <div
                          key={topic.topic}
                          className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800"
                        >
                          <div className="flex items-center justify-between">
                            <Text className="font-medium text-orange-900 dark:text-orange-100">
                              {topic.topic}
                            </Text>
                            <Badge variant="warning">
                              {Math.round(topic.avgAccuracy * 100)}% precisión
                            </Badge>
                          </div>
                          <Text size="xs" variant="secondary" className="mt-1">
                            {topic.studentsCount} estudiantes con dificultades
                          </Text>
                        </div>
                      ))}
                    </div>
                  )}
                  <Text size="sm" variant="secondary" className="mt-4">
                    Considera revisar estos temas en clase para reforzar el aprendizaje.
                  </Text>
                </Card>
              </>
            ) : (
              <Card padding="lg" className="col-span-2 text-center py-12">
                <Text variant="secondary">
                  No hay suficientes datos para mostrar analíticas.
                  Los estudiantes deben completar ejercicios primero.
                </Text>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <AddStudentModal
          classId={classId}
          onClose={() => setShowAddModal(false)}
          onStudentsAdded={() => {
            refreshStudents();
            refreshClass();
          }}
        />
      )}

      {/* Move Student Modal */}
      {movingStudent && (
        <MoveStudentModal
          student={movingStudent}
          currentClassId={classId}
          onClose={() => setMovingStudent(null)}
          onStudentMoved={() => {
            refreshStudents();
            refreshClass();
          }}
        />
      )}
    </TeacherLayout>
  );
}
