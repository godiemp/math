'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { getPaymentByGatewayId } from '@/lib/api/payments';
import { Payment } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser, isPaidUser } = useAuth();

  const [payment, setPayment] = useState<Payment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get payment ID from query params
  const paymentId = searchParams.get('payment_id');
  const collectionId = searchParams.get('collection_id');
  const preferenceId = searchParams.get('preference_id');

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (!paymentId && !collectionId) {
        setError('No se encontró información del pago');
        setIsLoading(false);
        return;
      }

      try {
        const gatewayPaymentId = paymentId || collectionId;
        if (!gatewayPaymentId) {
          throw new Error('ID de pago no válido');
        }

        const result = await getPaymentByGatewayId(gatewayPaymentId);

        if (result.error) {
          setError(result.error.error || 'Error al obtener información del pago');
        } else if (result.data?.payment) {
          setPayment(result.data.payment);
          // Refresh user data to update subscription status
          await refreshUser();
        }
      } catch (err) {
        console.error('Error fetching payment:', err);
        setError('Error al cargar la información del pago');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [paymentId, collectionId, refreshUser]);

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

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        {error ? (
          <Card padding="lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-yellow-600 dark:text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold mb-4">Información no disponible</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">{error}</p>
              <div className="flex gap-4 justify-center">
                <Button variant="primary" onClick={() => router.push('/dashboard')}>
                  Ir al Dashboard
                </Button>
                <Button variant="ghost" onClick={() => router.push('/pricing')}>
                  Ver Planes
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card padding="lg">
            {/* Success Icon */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-green-600 dark:text-green-400"
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
              </div>
              <h1 className="text-3xl font-bold mb-2 text-green-600 dark:text-green-400">
                ¡Pago Exitoso!
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Tu suscripción ha sido activada correctamente
              </p>
            </div>

            {/* Payment Details */}
            {payment && (
              <div className="space-y-4 mb-8">
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Monto Pagado</p>
                      <p className="text-xl font-bold">
                        {formatPrice(payment.transactionAmount || payment.amount, payment.currency)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Estado</p>
                      <Badge variant="success">Aprobado</Badge>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        ID de Transacción
                      </span>
                      <span className="text-sm font-mono">{payment.gatewayPaymentId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Método de Pago
                      </span>
                      <span className="text-sm capitalize">{payment.paymentMethod}</span>
                    </div>
                    {payment.paymentDate && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Fecha de Pago
                        </span>
                        <span className="text-sm">{formatDate(payment.paymentDate)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subscription Status */}
                {isPaidUser && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <p className="font-semibold text-green-900 dark:text-green-100">
                          Suscripción Activa
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                          Ya tienes acceso completo a todas las funciones premium. ¡Comienza a practicar ahora!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                onClick={() => router.push('/dashboard')}
                className="flex-1"
              >
                Ir al Dashboard
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push('/practice')}
                className="flex-1"
              >
                Comenzar a Practicar
              </Button>
            </div>

            {/* Additional Links */}
            <div className="mt-8 text-center">
              <Link
                href="/payments/history"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Ver historial de pagos
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
