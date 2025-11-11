'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getPaymentByGatewayId } from '@/lib/api/payments';
import { Payment } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function PaymentFailurePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [payment, setPayment] = useState<Payment | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get payment ID from query params
  const paymentId = searchParams.get('payment_id');
  const collectionId = searchParams.get('collection_id');
  const collectionStatus = searchParams.get('collection_status');

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      const gatewayPaymentId = paymentId || collectionId;

      if (gatewayPaymentId) {
        try {
          const result = await getPaymentByGatewayId(gatewayPaymentId);

          if (result.data?.payment) {
            setPayment(result.data.payment);
          }
        } catch (err) {
          console.error('Error fetching payment:', err);
        }
      }

      setIsLoading(false);
    };

    fetchPaymentDetails();
  }, [paymentId, collectionId]);

  const getFailureReason = () => {
    if (payment?.statusDetail) {
      const reasons: Record<string, string> = {
        'cc_rejected_bad_filled_card_number': 'Número de tarjeta inválido',
        'cc_rejected_bad_filled_date': 'Fecha de vencimiento inválida',
        'cc_rejected_bad_filled_other': 'Datos de tarjeta incompletos',
        'cc_rejected_bad_filled_security_code': 'Código de seguridad inválido',
        'cc_rejected_blacklist': 'Tarjeta no autorizada',
        'cc_rejected_call_for_authorize': 'Debes autorizar el pago con tu banco',
        'cc_rejected_card_disabled': 'Tarjeta deshabilitada',
        'cc_rejected_card_error': 'Error con la tarjeta',
        'cc_rejected_duplicated_payment': 'Pago duplicado',
        'cc_rejected_high_risk': 'Pago rechazado por riesgo',
        'cc_rejected_insufficient_amount': 'Fondos insuficientes',
        'cc_rejected_invalid_installments': 'Cuotas inválidas',
        'cc_rejected_max_attempts': 'Has superado el límite de intentos',
        'cc_rejected_other_reason': 'Pago rechazado',
      };
      return reasons[payment.statusDetail] || 'Pago rechazado';
    }

    if (collectionStatus === 'rejected') {
      return 'Tu pago fue rechazado';
    }

    return 'No se pudo procesar tu pago';
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <Card padding="lg">
          {/* Failure Icon */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-red-600 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-red-600 dark:text-red-400">
              Pago Rechazado
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {getFailureReason()}
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
                    <Badge variant="danger">Rechazado</Badge>
                  </div>
                </div>
              </div>

              {payment.gatewayPaymentId && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ID de Transacción
                    </span>
                    <span className="text-sm font-mono">{payment.gatewayPaymentId}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Help Information */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0"
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
                <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  ¿Qué puedes hacer?
                </p>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Verifica que los datos de tu tarjeta sean correctos</li>
                  <li>• Asegúrate de tener fondos suficientes</li>
                  <li>• Contacta a tu banco si el problema persiste</li>
                  <li>• Intenta con otro método de pago</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="primary"
              onClick={() => router.push('/pricing')}
              className="flex-1"
            >
              Intentar Nuevamente
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push('/dashboard')}
              className="flex-1"
            >
              Volver al Dashboard
            </Button>
          </div>

          {/* Contact Support */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ¿Necesitas ayuda?{' '}
              <a
                href="mailto:soporte@paes-math.cl"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Contáctanos
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
