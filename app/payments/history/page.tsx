'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { Payment, PaymentStatus } from '@/lib/types';
import { getMyPayments } from '@/lib/api/payments';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

function PaymentHistoryContent() {
  const router = useRouter();

  // Fetch user payments
  const { data: paymentsResponse, error, isLoading } = useSWR(
    '/api/payments/my-payments',
    async () => {
      const result = await getMyPayments();
      if (result.error) {
        throw new Error(result.error.error);
      }
      return result.data;
    }
  );

  const payments = paymentsResponse?.payments || [];

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
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: PaymentStatus) => {
    const statusConfig: Record<PaymentStatus, { variant: 'success' | 'danger' | 'default'; label: string }> = {
      approved: { variant: 'success', label: 'Aprobado' },
      rejected: { variant: 'danger', label: 'Rechazado' },
      cancelled: { variant: 'danger', label: 'Cancelado' },
      refunded: { variant: 'default', label: 'Reembolsado' },
      pending: { variant: 'default', label: 'Pendiente' },
      in_process: { variant: 'default', label: 'En Proceso' },
    };

    const config = statusConfig[status] || { variant: 'default' as const, label: status };

    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPaymentMethodDisplay = (method: string) => {
    const methods: Record<string, string> = {
      credit_card: 'Tarjeta de Crédito',
      debit_card: 'Tarjeta de Débito',
      bank_transfer: 'Transferencia Bancaria',
      prepaid_card: 'Tarjeta Prepago',
      account_money: 'Saldo en Cuenta',
    };

    return methods[method] || method.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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
            <p className="text-lg font-semibold mb-2">Error al cargar el historial</p>
            <p className="text-sm">{error.message}</p>
            <Button
              variant="primary"
              onClick={() => router.push('/dashboard')}
              className="mt-4"
            >
              Volver al Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Historial de Pagos</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Revisa todas tus transacciones y estados de pago
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={() => router.push('/dashboard')}
          >
            ← Volver
          </Button>
        </div>
      </div>

      {/* Payments List */}
      {payments.length === 0 ? (
        <Card padding="lg">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No tienes pagos registrados</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Cuando realices un pago, aparecerá aquí
            </p>
            <Button
              variant="primary"
              onClick={() => router.push('/pricing')}
            >
              Ver Planes de Suscripción
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {payments.map((payment: Payment) => (
            <Card key={payment.id} padding="md">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Payment Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">
                      {formatPrice(payment.transactionAmount || payment.amount, payment.currency)}
                    </h3>
                    {getStatusBadge(payment.status)}
                  </div>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p>
                      <span className="font-medium">Método:</span>{' '}
                      {getPaymentMethodDisplay(payment.paymentMethod)}
                    </p>
                    <p>
                      <span className="font-medium">Fecha:</span>{' '}
                      {formatDate(payment.paymentDate || payment.createdAt)}
                    </p>
                    {payment.gatewayPaymentId && (
                      <p className="font-mono text-xs">
                        ID: {payment.gatewayPaymentId}
                      </p>
                    )}
                    {payment.statusDetail && payment.status !== 'approved' && (
                      <p className="text-red-600 dark:text-red-400">
                        {payment.statusDetail}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {payment.status === 'approved' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/payment/success?payment_id=${payment.gatewayPaymentId}`)}
                    >
                      Ver Detalles
                    </Button>
                  )}
                  {payment.status === 'pending' || payment.status === 'in_process' && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => router.push(`/payment/pending?payment_id=${payment.gatewayPaymentId}`)}
                    >
                      Verificar Estado
                    </Button>
                  )}
                </div>
              </div>

              {/* Additional Details (Expandable) */}
              {payment.netAmount && payment.feeAmount && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Monto Total</p>
                      <p className="font-semibold">
                        {formatPrice(payment.transactionAmount || payment.amount, payment.currency)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Comisión</p>
                      <p className="font-semibold">
                        {formatPrice(payment.feeAmount, payment.currency)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Monto Neto</p>
                      <p className="font-semibold">
                        {formatPrice(payment.netAmount, payment.currency)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      {payments.length > 0 && (
        <Card padding="lg" className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Resumen</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total de Pagos</p>
              <p className="text-2xl font-bold">{payments.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pagos Aprobados</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {payments.filter((p: Payment) => p.status === 'approved').length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Gastado</p>
              <p className="text-2xl font-bold">
                {formatPrice(
                  payments
                    .filter((p: Payment) => p.status === 'approved')
                    .reduce((sum: number, p: Payment) => sum + (p.transactionAmount || p.amount), 0),
                  'CLP'
                )}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default function PaymentHistoryPage() {
  return (
    <ProtectedRoute>
      <PaymentHistoryContent />
    </ProtectedRoute>
  );
}
