'use client';

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Link from 'next/link';
import {
  UserWithSubscription,
  Plan,
  CreateSubscriptionRequest,
  UpdateSubscriptionRequest,
} from '@/lib/types';

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

      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No access token found');
      }

      // Fetch users
      const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!usersResponse.ok) {
        throw new Error('Error al obtener usuarios');
      }

      const usersData = await usersResponse.json();

      // Fetch plans
      const plansResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/plans?active=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!plansResponse.ok) {
        throw new Error('Error al obtener planes');
      }

      const plansData = await plansResponse.json();

      setUsers(usersData.users || []);
      setPlans(plansData.plans || []);
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
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No access token found');
      }

      const request: CreateSubscriptionRequest = {
        userId: selectedUser.id,
        planId,
        startTrial,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/subscriptions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(request),
        }
      );

      if (!response.ok) {
        throw new Error('Error al asignar suscripción');
      }

      // Refresh data
      await fetchData();
      setShowAssignModal(false);
      setSelectedUser(null);
    } catch (err) {
      console.error('Error assigning subscription:', err);
      alert('Error al asignar suscripción');
    }
  };

  const handleCancelSubscription = async (subscriptionId: number) => {
    if (!confirm('¿Estás seguro de que quieres cancelar esta suscripción?')) return;

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No access token found');
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/subscriptions/${subscriptionId}/cancel`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error al cancelar suscripción');
      }

      // Refresh data
      await fetchData();
    } catch (err) {
      console.error('Error cancelling subscription:', err);
      alert('Error al cancelar suscripción');
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600 dark:text-gray-400">Cargando usuarios...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-600 dark:text-red-400">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Gestión de Usuarios
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Administra usuarios, planes y suscripciones
              </p>
            </div>
            <Link
              href="/admin"
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              ← Volver al Admin
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {users.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Usuarios</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-200">
                {users.filter((u) => u.role === 'admin').length}
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-400">Admins</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-900 dark:text-green-200">
                {users.filter((u) => getUserType(u) === 'Pagado').length}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">Pagados</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-200">
                {users.filter((u) => getUserType(u) === 'Trial').length}
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400">En Prueba</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/20 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-200">
                {users.filter((u) => getUserType(u) === 'Free').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Free</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-2">
          {(['all', 'admin', 'paid', 'trial', 'free'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg transition ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {f === 'all' && 'Todos'}
              {f === 'admin' && 'Admins'}
              {f === 'paid' && 'Pagados'}
              {f === 'trial' && 'En Prueba'}
              {f === 'free' && 'Free'}
            </button>
          ))}
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
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
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
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
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Asignar Plan
                          </button>
                          {user.subscription &&
                            (user.subscription.status === 'active' ||
                              user.subscription.status === 'trial') && (
                              <button
                                onClick={() => handleCancelSubscription(user.subscription!.id)}
                                className="text-red-600 dark:text-red-400 hover:underline"
                              >
                                Cancelar
                              </button>
                            )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No se encontraron usuarios con este filtro
          </div>
        )}
      </div>

      {/* Assign Plan Modal */}
      {showAssignModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Asignar Plan a {selectedUser.displayName}
            </h2>

            <div className="space-y-3 mb-6">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => handleAssignSubscription(plan.id, plan.trialDurationDays > 0)}
                  className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left"
                >
                  <div className="font-medium text-gray-900 dark:text-white">{plan.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {plan.price > 0
                      ? `${plan.price} ${plan.currency} / ${plan.durationDays} días`
                      : 'Gratis'}
                  </div>
                  {plan.trialDurationDays > 0 && (
                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      Incluye {plan.trialDurationDays} días de prueba
                    </div>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setShowAssignModal(false);
                setSelectedUser(null);
              }}
              className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
