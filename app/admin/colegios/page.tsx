'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { Card, Heading, Text, Button, Badge } from '@/components/ui';
import AdminLayout from '@/components/layout/AdminLayout';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
import { schools, School } from '@/lib/schools';
import {
  CreateDemoAccountRequest,
  CreateDemoAccountResponse,
  DemoAccount,
  GetDemoAccountsResponse,
  GradeLevel,
  GRADE_LEVEL_LABELS,
  GRADE_LEVELS,
} from '@/lib/types';

function ColegiosDemoContent() {
  // Form state
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [schoolSearch, setSchoolSearch] = useState('');
  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>('1-medio');
  const [trialDays, setTrialDays] = useState(14);
  const [isCreating, setIsCreating] = useState(false);

  // Credentials modal state
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState<CreateDemoAccountResponse | null>(
    null
  );

  // Demo accounts list
  const [demoAccounts, setDemoAccounts] = useState<DemoAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Refs
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter schools based on search
  const filteredSchools = useMemo(() => {
    if (!schoolSearch.trim()) return [];

    const query = schoolSearch.toLowerCase();
    return schools
      .filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.rbd.toString().includes(query) ||
          s.communeName.toLowerCase().includes(query)
      )
      .slice(0, 10); // Limit to 10 results
  }, [schoolSearch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSchoolDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load demo accounts on mount
  useEffect(() => {
    loadDemoAccounts();
  }, []);

  const loadDemoAccounts = async () => {
    try {
      setIsLoading(true);
      const response = await api.get<GetDemoAccountsResponse>('/api/admin/demo-accounts');
      if (response.error) {
        throw new Error(response.error.error || 'Error al cargar cuentas demo');
      }
      setDemoAccounts(response.data?.demoAccounts || []);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al cargar cuentas demo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSchool = (school: School) => {
    setSelectedSchool(school);
    setSchoolSearch(school.name);
    setShowSchoolDropdown(false);
  };

  const handleCreateDemo = async () => {
    if (!selectedSchool) {
      toast.error('Selecciona un colegio');
      return;
    }

    try {
      setIsCreating(true);

      const request: CreateDemoAccountRequest = {
        schoolRbd: selectedSchool.rbd,
        schoolName: selectedSchool.name,
        gradeLevel,
        trialDurationDays: trialDays,
      };

      const response = await api.post<CreateDemoAccountResponse>(
        '/api/admin/demo-accounts',
        request
      );

      if (response.error) {
        throw new Error(response.error.error || 'Error al crear cuenta demo');
      }

      if (response.data) {
        setCreatedCredentials(response.data);
        setShowCredentialsModal(true);
        toast.success('Cuenta demo creada exitosamente');

        // Reset form
        setSelectedSchool(null);
        setSchoolSearch('');
        setGradeLevel('1-medio');
        setTrialDays(14);

        // Reload list
        loadDemoAccounts();
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al crear cuenta demo');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteDemo = async (id: string, schoolName: string) => {
    if (!confirm(`¿Eliminar cuenta demo de ${schoolName}?`)) return;

    try {
      const response = await api.delete(`/api/admin/demo-accounts/${id}`);
      if (response.error) {
        throw new Error(response.error.error || 'Error al eliminar cuenta demo');
      }
      toast.success('Cuenta demo eliminada');
      loadDemoAccounts();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al eliminar cuenta demo');
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copiado al portapapeles`);
    } catch {
      toast.error('Error al copiar');
    }
  };

  const getSubscriptionStatus = (account: DemoAccount) => {
    if (!account.subscription) return { label: 'Sin plan', variant: 'neutral' as const };

    const now = Date.now();
    const expiresAt = account.subscription.expiresAt;

    if (account.subscription.status === 'trial') {
      if (expiresAt > now) {
        const daysLeft = Math.ceil((expiresAt - now) / (1000 * 60 * 60 * 24));
        return { label: `Trial (${daysLeft}d)`, variant: 'info' as const };
      } else {
        return { label: 'Expirado', variant: 'danger' as const };
      }
    }

    if (account.subscription.status === 'active') {
      return { label: 'Activo', variant: 'success' as const };
    }

    return { label: account.subscription.status, variant: 'neutral' as const };
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Heading level={1} size="lg">
            Demos para Colegios
          </Heading>
          <Text variant="secondary" className="mt-1">
            Crea cuentas de prueba para colegios interesados
          </Text>
        </div>

        {/* Create Demo Form */}
        <Card padding="lg">
          <Heading level={2} size="sm" className="mb-4">
            Crear Nueva Cuenta Demo
          </Heading>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* School Search */}
            <div className="lg:col-span-2 relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Colegio *
              </label>
              <input
                ref={searchInputRef}
                type="text"
                value={schoolSearch}
                onChange={(e) => {
                  setSchoolSearch(e.target.value);
                  setSelectedSchool(null);
                  setShowSchoolDropdown(true);
                }}
                onFocus={() => setShowSchoolDropdown(true)}
                placeholder="Buscar por nombre o RBD..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />

              {/* School Dropdown */}
              {showSchoolDropdown && filteredSchools.length > 0 && (
                <div
                  ref={dropdownRef}
                  className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                >
                  {filteredSchools.map((school) => (
                    <button
                      key={school.rbd}
                      onClick={() => handleSelectSchool(school)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                    >
                      <div className="font-medium text-gray-900 dark:text-white">{school.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        RBD: {school.rbd} | {school.communeName}, {school.regionName}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {selectedSchool && (
                <div className="mt-1 text-sm text-green-600 dark:text-green-400">
                  Seleccionado: RBD {selectedSchool.rbd}
                </div>
              )}
            </div>

            {/* Grade Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nivel *
              </label>
              <select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value as GradeLevel)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {GRADE_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {GRADE_LEVEL_LABELS[level]}
                  </option>
                ))}
              </select>
            </div>

            {/* Trial Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Dias de prueba
              </label>
              <input
                type="number"
                value={trialDays}
                onChange={(e) => setTrialDays(Math.min(90, Math.max(1, parseInt(e.target.value) || 14)))}
                min={1}
                max={90}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button onClick={handleCreateDemo} disabled={!selectedSchool || isCreating}>
              {isCreating ? 'Creando...' : 'Crear Cuenta Demo'}
            </Button>
          </div>
        </Card>

        {/* Demo Accounts Table */}
        <Card padding="lg">
          <Heading level={2} size="sm" className="mb-4">
            Cuentas Demo Existentes ({demoAccounts.length})
          </Heading>

          {isLoading ? (
            <div className="text-center py-8">
              <Text variant="secondary">Cargando...</Text>
            </div>
          ) : demoAccounts.length === 0 ? (
            <div className="text-center py-8">
              <Text variant="secondary">No hay cuentas demo creadas</Text>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Colegio
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Nivel
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Expira
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Creado
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {demoAccounts.map((account) => {
                    const status = getSubscriptionStatus(account);
                    return (
                      <tr key={account.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {account.schoolName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            RBD: {account.schoolRbd}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                            {account.username}
                          </code>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="info" size="sm">
                            {GRADE_LEVEL_LABELS[account.gradeLevel]}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={status.variant} size="sm">
                            {status.label}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                          {account.subscription ? formatDate(account.subscription.expiresAt) : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(account.createdAt)}
                          <div className="text-xs">por {account.createdByName}</div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => handleDeleteDemo(account.id, account.schoolName)}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {/* Credentials Modal */}
      {showCredentialsModal && createdCredentials && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setShowCredentialsModal(false)} />
          <Card className="max-w-md w-full relative z-10 shadow-2xl" padding="lg">
            <Heading level={2} size="sm" className="mb-4 text-green-600 dark:text-green-400">
              Cuenta Demo Creada
            </Heading>

            <div className="space-y-4">
              <div>
                <Text variant="secondary" size="sm">
                  Colegio
                </Text>
                <Text className="font-medium">{createdCredentials.school.name}</Text>
              </div>

              <div>
                <Text variant="secondary" size="sm">
                  Nivel
                </Text>
                <Text className="font-medium">
                  {GRADE_LEVEL_LABELS[createdCredentials.user.gradeLevel]}
                </Text>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <Text variant="secondary" size="sm" className="mb-2">
                  Credenciales de acceso
                </Text>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Text variant="secondary" size="xs">
                        Usuario
                      </Text>
                      <code className="text-lg font-mono">
                        {createdCredentials.credentials.username}
                      </code>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(createdCredentials.credentials.username, 'Usuario')
                      }
                      className="px-2 py-1 text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
                    >
                      Copiar
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Text variant="secondary" size="xs">
                        Clave
                      </Text>
                      <code className="text-lg font-mono">
                        {createdCredentials.credentials.password}
                      </code>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(createdCredentials.credentials.password, 'Clave')
                      }
                      className="px-2 py-1 text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
                    >
                      Copiar
                    </button>
                  </div>
                </div>

                <button
                  onClick={() =>
                    copyToClipboard(
                      `Usuario: ${createdCredentials.credentials.username}\nClave: ${createdCredentials.credentials.password}`,
                      'Credenciales'
                    )
                  }
                  className="mt-3 w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium"
                >
                  Copiar ambos
                </button>
              </div>

              <div className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                La clave no se puede recuperar despues. Guardala ahora.
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                Trial de {createdCredentials.subscription.durationDays} dias hasta el{' '}
                {formatDate(createdCredentials.subscription.trialEndsAt)}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={() => setShowCredentialsModal(false)}>Cerrar</Button>
            </div>
          </Card>
        </div>
      )}
    </AdminLayout>
  );
}

export default function AdminColegiosPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <ColegiosDemoContent />
    </ProtectedRoute>
  );
}
