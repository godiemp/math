'use client';

import { useState } from 'react';
import TeacherLayout from '@/components/layout/TeacherLayout';
import { Card, Heading, Text, Button } from '@/components/ui';
import { User, Bell, Shield, CreditCard, LogOut, Check } from 'lucide-react';

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export default function TeacherSettingsPage() {
  const [activeSection, setActiveSection] = useState<'profile' | 'notifications' | 'security' | 'billing'>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Mock profile data
  const [profile, setProfile] = useState({
    name: 'Profesor Demo',
    email: 'profesor@simplepaes.cl',
    school: 'Liceo de Aplicación',
    phone: '+56 9 1234 5678',
  });

  // Mock notification settings
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: 'student-join',
      label: 'Nuevo estudiante',
      description: 'Cuando un estudiante se une a tu clase',
      enabled: true,
    },
    {
      id: 'weekly-report',
      label: 'Reporte semanal',
      description: 'Resumen semanal del progreso de tus clases',
      enabled: true,
    },
    {
      id: 'student-inactive',
      label: 'Estudiante inactivo',
      description: 'Cuando un estudiante no practica por más de 5 días',
      enabled: false,
    },
    {
      id: 'low-accuracy',
      label: 'Alerta de bajo rendimiento',
      description: 'Cuando un estudiante tiene precisión menor a 50%',
      enabled: true,
    },
  ]);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    );
  };

  const sections = [
    { id: 'profile' as const, label: 'Perfil', icon: User },
    { id: 'notifications' as const, label: 'Notificaciones', icon: Bell },
    { id: 'security' as const, label: 'Seguridad', icon: Shield },
    { id: 'billing' as const, label: 'Facturación', icon: CreditCard },
  ];

  return (
    <TeacherLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Heading level={1} size="lg">
            Configuración
          </Heading>
          <Text variant="secondary">
            Administra tu cuenta y preferencias
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <Card padding="sm">
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                        activeSection === section.id
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Content Area */}
          <div className="md:col-span-3">
            {/* Profile Section */}
            {activeSection === 'profile' && (
              <Card padding="lg">
                <Heading level={2} size="sm" className="mb-6">
                  Información del Perfil
                </Heading>

                <div className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold">
                      {profile.name.charAt(0)}
                    </div>
                    <div>
                      <Button variant="ghost" size="sm">
                        Cambiar foto
                      </Button>
                      <Text size="xs" variant="secondary" className="mt-1">
                        JPG, PNG. Máximo 2MB.
                      </Text>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Colegio / Institución
                      </label>
                      <input
                        type="text"
                        value={profile.school}
                        onChange={(e) => setProfile({ ...profile, school: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button variant="ghost">Cancelar</Button>
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      {saved ? (
                        <span className="flex items-center gap-2">
                          <Check className="w-4 h-4" /> Guardado
                        </span>
                      ) : isSaving ? (
                        'Guardando...'
                      ) : (
                        'Guardar cambios'
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Notifications Section */}
            {activeSection === 'notifications' && (
              <Card padding="lg">
                <Heading level={2} size="sm" className="mb-2">
                  Preferencias de Notificaciones
                </Heading>
                <Text variant="secondary" className="mb-6">
                  Elige qué notificaciones quieres recibir por correo
                </Text>

                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
                    >
                      <div>
                        <Text className="font-medium">{notification.label}</Text>
                        <Text size="sm" variant="secondary">
                          {notification.description}
                        </Text>
                      </div>
                      <button
                        onClick={() => toggleNotification(notification.id)}
                        className={`relative w-12 h-7 rounded-full transition-colors ${
                          notification.enabled
                            ? 'bg-emerald-500'
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                            notification.enabled ? 'left-5' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    {saved ? (
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4" /> Guardado
                      </span>
                    ) : isSaving ? (
                      'Guardando...'
                    ) : (
                      'Guardar preferencias'
                    )}
                  </Button>
                </div>
              </Card>
            )}

            {/* Security Section */}
            {activeSection === 'security' && (
              <Card padding="lg">
                <Heading level={2} size="sm" className="mb-6">
                  Seguridad de la Cuenta
                </Heading>

                <div className="space-y-6">
                  {/* Change Password */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <Text className="font-medium">Contraseña</Text>
                        <Text size="sm" variant="secondary">
                          Última actualización hace 3 meses
                        </Text>
                      </div>
                      <Button variant="ghost" size="sm">
                        Cambiar contraseña
                      </Button>
                    </div>
                  </div>

                  {/* Two Factor Auth */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <Text className="font-medium">Autenticación de dos factores</Text>
                        <Text size="sm" variant="secondary">
                          Añade una capa extra de seguridad
                        </Text>
                      </div>
                      <Button variant="ghost" size="sm">
                        Configurar
                      </Button>
                    </div>
                  </div>

                  {/* Active Sessions */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <Text className="font-medium">Sesiones activas</Text>
                        <Text size="sm" variant="secondary">
                          2 dispositivos conectados
                        </Text>
                      </div>
                      <Button variant="ghost" size="sm">
                        Ver sesiones
                      </Button>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                    <Text className="font-medium text-red-600 dark:text-red-400 mb-4">
                      Zona de peligro
                    </Text>
                    <div className="p-4 border border-red-200 dark:border-red-800 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <Text className="font-medium text-red-900 dark:text-red-100">
                            Eliminar cuenta
                          </Text>
                          <Text size="sm" variant="secondary">
                            Esta acción es permanente y no se puede deshacer
                          </Text>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          Eliminar cuenta
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Billing Section */}
            {activeSection === 'billing' && (
              <Card padding="lg">
                <Heading level={2} size="sm" className="mb-6">
                  Facturación y Suscripción
                </Heading>

                {/* Current Plan */}
                <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Text size="sm" variant="secondary">
                        Plan actual
                      </Text>
                      <Text className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                        Plan Profesor
                      </Text>
                    </div>
                    <div className="text-right">
                      <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                        $25.000
                      </Text>
                      <Text size="sm" variant="secondary">
                        CLP/mes
                      </Text>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Text size="sm" variant="secondary">
                      Próximo cobro: 15 de enero, 2025
                    </Text>
                    <Button variant="ghost" size="sm">
                      Cambiar plan
                    </Button>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <Text className="font-medium mb-3">Método de pago</Text>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                          VISA
                        </div>
                        <div>
                          <Text className="font-medium">•••• •••• •••• 4242</Text>
                          <Text size="xs" variant="secondary">
                            Expira 12/26
                          </Text>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Actualizar
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Billing History */}
                <div>
                  <Text className="font-medium mb-3">Historial de pagos</Text>
                  <div className="space-y-2">
                    {[
                      { date: '15 dic 2024', amount: '$25.000', status: 'Pagado' },
                      { date: '15 nov 2024', amount: '$25.000', status: 'Pagado' },
                      { date: '15 oct 2024', amount: '$25.000', status: 'Pagado' },
                    ].map((invoice, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                      >
                        <div>
                          <Text size="sm" className="font-medium">
                            {invoice.date}
                          </Text>
                          <Text size="xs" variant="secondary">
                            Plan Profesor
                          </Text>
                        </div>
                        <div className="flex items-center gap-4">
                          <Text size="sm" className="font-medium">
                            {invoice.amount}
                          </Text>
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
                            {invoice.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Logout Section */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </TeacherLayout>
  );
}
