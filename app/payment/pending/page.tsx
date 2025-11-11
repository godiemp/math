'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getPaymentByGatewayId } from '@/lib/api/payments';
import { Payment } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function PaymentPendingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [payment, setPayment] = useState<Payment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(false);

  // Get payment ID from query params
  const paymentId = searchParams.get('payment_id');
  const collectionId = searchParams.get('collection_id');

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      const gatewayPaymentId = paymentId || collectionId;

      if (gatewayPaymentId) {
        try {
          const result = await getPaymentByGatewayId(gatewayPaymentId);

          if (result.data?.payment) {
            setPayment(result.data.payment);

            // If payment is no longer pending, redirect to appropriate page
            if (result.data.payment.status === 'approved') {
              router.push(`/payment/success?payment_id=${gatewayPaymentId}`);
              return;
            } else if (result.data.payment.status === 'rejected' || result.data.payment.status === 'cancelled') {
              router.push(`/payment/failure?payment_id=${gatewayPaymentId}`);
              return;
            }
          }
        } catch (err) {
          console.error('Error fetching payment:', err);
        }
      }

      setIsLoading(false);
    };

    fetchPaymentDetails();
  }, [paymentId, collectionId, router]);

  const handleCheckStatus = async () => {
    const gatewayPaymentId = paymentId || collectionId;

    if (!gatewayPaymentId) return;

    setIsChecking(true);

    try {
      const result = await getPaymentByGatewayId(gatewayPaymentId);

      if (result.data?.payment) {
        setPayment(result.data.payment);

        // Redirect if status changed
        if (result.data.payment.status === 'approved') {
          router.push(`/payment/success?payment_id=${gatewayPaymentId}`);
        } else if (result.data.payment.status === 'rejected' || result.data.payment.status === 'cancelled') {
          router.push(`/payment/failure?payment_id=${gatewayPaymentId}`);
        }
      }
    } catch (err) {
      console.error('Error checking payment status:', err);
    } finally {
      setIsChecking(false);
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

  const getStatusBadge = () => {
    if (!payment) return null;

    if (payment.status === 'pending') {
      return <Badge variant="default">Pendiente</Badge>;
    } else if (payment.status === 'in_process') {
      return <Badge variant="default">En Proceso</Badge>;
    }

    return <Badge variant="default">{payment.status}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <Card padding="lg">
          {/* Pending Icon */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-yellow-600 dark:text-yellow-400 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-yellow-600 dark:text-yellow-400">
              Pago Pendiente
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Tu pago está siendo procesado
            </p>
          </div>

          {/* Payment Details (if available) */}
          {payment && (
            <div className="space-y-4 mb-8">
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Monto</p>
                    <p className="text-xl font-bold">
                      {formatPrice(payment.amount, payment.currency)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Estado</p>
                    {getStatusBadge()}
                  </div>
                </div>
              </div>

              {payment.gatewayPaymentId && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        ID de Transacción
                      </span>
                      <span className="text-sm font-mono">{payment.gatewayPaymentId}</span>
                    </div>
                    {payment.paymentMethod && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Método de Pago
                        </span>
                        <span className="text-sm capitalize">{payment.paymentMethod}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Information Box */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                  ¿Qué significa esto?
                </p>
                <div className="text-sm text-yellow-700 dark:text-yellow-300 space-y-2">
                  <p>
                    Tu pago está siendo procesado por MercadoPago. Esto puede tomar unos minutos o hasta 48 horas dependiendo del método de pago utilizado.
                  </p>
                  <p className="font-semibold mt-3">
                    Te notificaremos por correo cuando se complete el proceso.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="primary"
              onClick={handleCheckStatus}
              disabled={isChecking}
              className="flex-1"
            >
              {isChecking ? (
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
                  Verificando...
                </span>
              ) : (
                'Verificar Estado'
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push('/dashboard')}
              className="flex-1"
            >
              Volver al Dashboard
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Si tienes dudas, puedes{' '}
              <a
                href="mailto:soporte@paes-math.cl"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                contactarnos
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
