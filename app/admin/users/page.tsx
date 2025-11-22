'use client';

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import {
  UserWithSubscription,
  Plan,
  CreateSubscriptionRequest,
  UpdateSubscriptionRequest,
  GetUsersResponse,
  GetPlansResponse,
} from '@/lib/types';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, Button, Heading, Text, Badge } from '@/components/ui';

/**
 * Admin User Management Page
 *
 * Displays all users with their subscription status and allows admins to:
 * - View user details
 * - See subscription status (Free, Trial, Active, Expired, Cancelled)
 * - Assign/update subscriptions
 * - Filter by user type
 */
export default function AdminUsersPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <UserManagementContent />
    </ProtectedRoute>
  );
}

function UserManagementContent() {
  const [users, setUsers] = useState<UserWithSubscription[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'admin' | 'free' | 'trial' | 'paid'>('all');
  const [selectedUser, setSelectedUser] = useState<UserWithSubscription | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Fetch users and plans on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch users using api client
      const usersResponse = await api.get<GetUsersResponse>('/api/admin/users');

      if (usersResponse.error) {
        throw new Error(usersResponse.error.error || 'Error al obtener usuarios');
      }

      // Fetch plans using api client
      const plansResponse = await api.get<GetPlansResponse>('/api/admin/plans?active=true');

      if (plansResponse.error) {
        throw new Error(plansResponse.error.error || 'Error al obtener planes');
      }

      setUsers(usersResponse.data?.users || []);
      setPlans(plansResponse.data?.plans || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getUserType = (user: UserWithSubscription): string => {
    if (user.role === 'admin') return 'Admin';
    if (!user.subscription) return 'Free';

    switch (user.subscription.status) {
      case 'trial':
        return 'Trial';
      case 'active':
        return 'Pagado';
      case 'expired':
        return 'Expirado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Free';
    }
  };

  const getUserTypeColor = (type: string): string => {
    switch (type) {
      case 'Admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Pagado':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Trial':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Free':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'Expirado':
      case 'Cancelado':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const filteredUsers = users.filter((user) => {
    if (filter === 'all') return true;
    const userType = getUserType(user);

    switch (filter) {
      case 'admin':
        return user.role === 'admin';
      case 'free':
        return userType === 'Free';
      case 'trial':
        return userType === 'Trial';
      case 'paid':
        return userType === 'Pagado';
      default:
        return true;
    }
  });

  const handleAssignSubscription = async (planId: string, startTrial: boolean = false) => {
    if (!selectedUser) return;

    try {
      const request: CreateSubscriptionRequest = {
        userId: selectedUser.id,
        planId,
        startTrial,
      };

      const response = await api.post('/api/admin/subscriptions', request);

      if (response.error) {
        throw new Error(response.error.error || 'Error al asignar suscripción');
      }

      // Refresh data
      await fetchData();
      setShowAssignModal(false);
      setSelectedUser(null);
    } catch (err) {
      console.error('Error assigning subscription:', err);
      alert(err instanceof Error ? err.message : 'Error al asignar suscripción');
    }
  };

  const handleCancelSubscription = async (subscriptionId: number) => {
    if (!confirm('¿Estás seguro de que quieres cancelar esta suscripción?')) return;

    try {
      const response = await api.post(`/api/admin/subscriptions/${subscriptionId}/cancel`);

      if (response.error) {
        throw new Error(response.error.error || 'Error al cancelar suscripción');
      }

      // Refresh data
      await fetchData();
    } catch (err) {
      console.error('Error cancelling subscription:', err);
      alert(err instanceof Error ? err.message : 'Error al cancelar suscripción');
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar al usuario "${userName}"? Esta acción no se puede deshacer y eliminará todos sus datos.`)) return;

    try {
      const response = await api.delete(`/api/admin/users/${userId}`);

      if (response.error) {
        throw new Error(response.error.error || 'Error al eliminar usuario');
      }

      // Refresh data
      await fetchData();
    } catch (err) {
      console.error('Error deleting user:', err);
      alert(err instanceof Error ? err.message : 'Error al eliminar usuario');
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Text variant="secondary">Loading users...</Text>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <Card padding="lg" className="border-red-200 dark:border-red-800">
          <Text className="text-red-600 dark:text-red-400">Error: {error}</Text>
        </Card>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50" padding="lg">
            <div className="flex items-center justify-between">
              <div>
                <Text size="xs" variant="secondary" className="mb-1">Total Users</Text>
                <Heading level={2} size="lg">{users.length}</Heading>
              </div>
              <div className="w-10 h-10 bg-gray-500/10 rounded-lg flex items-center justify-center">
                <span className="text-xl">👥</span>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800" padding="lg">
            <div className="flex items-center justify-between">
              <div>
                <Text size="xs" variant="secondary" className="mb-1">Admins</Text>
                <Heading level={2} size="lg" className="text-purple-600 dark:text-purple-400">
                  {users.filter((u) => u.role === 'admin').length}
                </Heading>
              </div>
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <span className="text-xl">👑</span>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800" padding="lg">
            <div className="flex items-center justify-between">
              <div>
                <Text size="xs" variant="secondary" className="mb-1">Paid</Text>
                <Heading level={2} size="lg" className="text-green-600 dark:text-green-400">
                  {users.filter((u) => getUserType(u) === 'Pagado').length}
                </Heading>
              </div>
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <span className="text-xl">💳</span>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800" padding="lg">
            <div className="flex items-center justify-between">
              <div>
                <Text size="xs" variant="secondary" className="mb-1">Trial</Text>
                <Heading level={2} size="lg" className="text-blue-600 dark:text-blue-400">
                  {users.filter((u) => getUserType(u) === 'Trial').length}
                </Heading>
              </div>
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <span className="text-xl">⏱️</span>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/20 dark:to-gray-600/20 border-gray-200 dark:border-gray-700" padding="lg">
            <div className="flex items-center justify-between">
              <div>
                <Text size="xs" variant="secondary" className="mb-1">Free</Text>
                <Heading level={2} size="lg" className="text-gray-600 dark:text-gray-400">
                  {users.filter((u) => getUserType(u) === 'Free').length}
                </Heading>
              </div>
              <div className="w-10 h-10 bg-gray-500/10 rounded-lg flex items-center justify-center">
                <span className="text-xl">🆓</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <Text size="sm" className="font-medium">Filter:</Text>
          <div className="flex gap-2">
            {(['all', 'admin', 'paid', 'trial', 'free'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                  filter === f
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {f === 'all' && 'All'}
                {f === 'admin' && 'Admins'}
                {f === 'paid' && 'Paid'}
                {f === 'trial' && 'Trial'}
                {f === 'free' && 'Free'}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <Card className="overflow-hidden" padding="sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Verified
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Expira
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.map((user) => {
                  const userType = getUserType(user);
                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {user.displayName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            @{user.username}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.emailVerified
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}
                        >
                          {user.emailVerified ? '✓ Verified' : '✗ Not Verified'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getUserTypeColor(
                            userType
                          )}`}
                        >
                          {userType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {user.plan ? user.plan.name : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {user.subscription?.expiresAt
                          ? formatDate(user.subscription.expiresAt)
                          : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowAssignModal(true);
                            }}
                            className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors font-medium"
                          >
                            Assign Plan
                          </button>
                          {user.subscription &&
                            (user.subscription.status === 'active' ||
                              user.subscription.status === 'trial') && (
                              <button
                                onClick={() => handleCancelSubscription(user.subscription!.id)}
                                className="px-3 py-1.5 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-md hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors font-medium"
                              >
                                Cancel
                              </button>
                            )}
                          <button
                            onClick={() => handleDeleteUser(user.id, user.displayName)}
                            className="px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">🔍</span>
              </div>
              <Text variant="secondary">No users found with this filter</Text>
            </div>
          )}
        </Card>
      </div>

      {/* Assign Plan Modal */}
      {showAssignModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0" onClick={() => setShowAssignModal(false)} />
          <div onClick={(e) => e.stopPropagation()}>
            <Card className="max-w-md w-full shadow-2xl relative z-10" padding="lg">
              <Heading level={2} size="sm" className="mb-1">
                Assign Plan
              </Heading>
              <Text size="sm" variant="secondary" className="mb-6">
                Assign a plan to {selectedUser.displayName}
              </Text>

              <div className="space-y-3 mb-6">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => handleAssignSubscription(plan.id, plan.trialDurationDays > 0)}
                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all text-left group"
                  >
                    <div className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {plan.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {plan.price > 0
                        ? `${plan.price} ${plan.currency} / ${plan.durationDays} days`
                        : 'Free'}
                    </div>
                    {plan.trialDurationDays > 0 && (
                      <Badge variant="info" size="sm" className="mt-2">
                        {plan.trialDurationDays} days trial included
                      </Badge>
                    )}
                  </button>
                ))}
              </div>

              <Button
                variant="ghost"
                fullWidth
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedUser(null);
                }}
              >
                Cancel
              </Button>
            </Card>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
