'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { toast } from 'sonner';
import { Plan } from '@/lib/types';
import { getActivePlans, createPaymentPreference } from '@/lib/api/payments';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function PricingPage() {
  const router = useRouter();
  const { isAuthenticated, isPaidUser } = useAuth();
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);

  // Fetch active plans
  const { data: plansResponse, error, isLoading } = useSWR(
    '/api/payments/plans',
    async () => {
      const result = await getActivePlans();
      if (result.error) {
        throw new Error(result.error.error);
      }
      return result.data;
    }
  );

  const plans = plansResponse?.plans || [];

  const handleSubscribe = async (planId: string) => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para suscribirte');
      router.push('/login?redirect=/pricing');
      return;
    }

    if (isPaidUser) {
      toast.info('Ya tienes una suscripción activa');
      return;
    }

    setLoadingPlanId(planId);

    try {
      const result = await createPaymentPreference(planId);

      if (result.error) {
        toast.error(result.error.error || 'Error al crear la preferencia de pago');
        return;
      }

      if (result.data?.data) {
        // Redirect to MercadoPago checkout
        const checkoutUrl = process.env.NODE_ENV === 'production'
          ? result.data.data.initPoint
          : result.data.data.sandboxInitPoint;

        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error('Error creating payment preference:', error);
      toast.error('Error al iniciar el proceso de pago');
    } finally {
      setLoadingPlanId(null);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'CLP') {
      return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
      }).format(price);
    }
    return `${currency} ${price}`;
  };

  const formatDuration = (days: number) => {
    if (days === 30) return '1 mes';
    if (days === 90) return '3 meses';
    if (days === 180) return '6 meses';
    if (days === 365) return '1 año';
    return `${days} días`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card padding="lg">
          <div className="text-center text-red-500">
            <p className="text-lg font-semibold mb-2">Error al cargar los planes</p>
            <p className="text-sm">{error.message}</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Planes de Suscripción</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Elige el plan que mejor se adapte a tus necesidades y mejora tu preparación para la PAES
        </p>
      </div>

      {/* Current Status */}
      {isAuthenticated && (
        <div className="max-w-2xl mx-auto mb-8">
          <Card padding="md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Estado actual:</p>
                <p className="font-semibold">
                  {isPaidUser ? (
                    <span className="text-green-500">Suscripción Activa ✓</span>
                  ) : (
                    <span className="text-gray-500">Usuario Gratuito</span>
                  )}
                </p>
              </div>
              {isPaidUser && (
                <Badge variant="success">Premium</Badge>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan: Plan) => {
          const isLoading = loadingPlanId === plan.id;
          const hasFreeTrial = plan.trialDurationDays > 0;

          return (
            <Card
              key={plan.id}
              padding="lg"
              className="flex flex-col relative overflow-hidden"
            >
              {/* Recommended Badge */}
              {plan.displayOrder === 1 && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                  Recomendado
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                {plan.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {plan.description}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">
                    {formatPrice(plan.price, plan.currency)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  por {formatDuration(plan.durationDays)}
                </p>
                {hasFreeTrial && (
                  <Badge variant="success" className="mt-2">
                    {plan.trialDurationDays} días de prueba gratis
                  </Badge>
                )}
              </div>

              {/* Features */}
              <div className="flex-1 mb-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subscribe Button */}
              <Button
                variant="primary"
                onClick={() => handleSubscribe(plan.id)}
                disabled={isLoading || (isAuthenticated && isPaidUser)}
                className="w-full"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Procesando...
                  </span>
                ) : isPaidUser ? (
                  'Ya tienes una suscripción'
                ) : (
                  'Suscribirse'
                )}
              </Button>
            </Card>
          );
        })}
      </div>

      {/* No Plans Message */}
      {plans.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Card padding="lg">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No hay planes disponibles en este momento
            </p>
          </Card>
        </div>
      )}

      {/* Additional Info */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <Card padding="lg">
          <h3 className="text-xl font-bold mb-4">Preguntas Frecuentes</h3>
          <div className="text-left space-y-4">
            <div>
              <p className="font-semibold mb-1">¿Cómo funciona el período de prueba?</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tendrás acceso completo a todas las funciones premium durante el período de prueba.
                Si cancelas antes de que termine, no se te cobrará nada.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">¿Puedo cancelar en cualquier momento?</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sí, puedes cancelar tu suscripción en cualquier momento desde tu perfil.
                Mantendrás el acceso hasta el final del período pagado.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">¿Qué métodos de pago aceptan?</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Aceptamos todos los métodos de pago disponibles en MercadoPago, incluyendo
                tarjetas de crédito, débito, y transferencias bancarias.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
