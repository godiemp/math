'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import AdminLayout from '@/components/AdminLayout';
import { Card, Heading, Text, Badge } from '@/components/ui';

interface ServiceStatus {
  status: string;
  responseTime?: string;
  error?: string;
  heapUsed?: string;
  heapTotal?: string;
  heapPercentage?: string;
  rss?: string;
  message?: string;
  tokenPrefix?: string;
}

interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  services: {
    database?: ServiceStatus;
    anthropic?: ServiceStatus;
    mercadopago?: ServiceStatus;
    resend?: ServiceStatus;
    memory?: ServiceStatus;
  };
}

function SystemHealthContent() {
  const [healthData, setHealthData] = useState<HealthStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchHealthStatus = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch from health/ready endpoint
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/health/ready`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status}`);
      }

      const data = await response.json();
      setHealthData(data);
      setLastUpdate(new Date());
    } catch (err: any) {
      setError(err.message || 'Failed to fetch health status');
      console.error('Health check error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch immediately
    fetchHealthStatus();

    // Refresh every 30 seconds
    const interval = setInterval(fetchHealthStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number): string => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'connected':
      case 'configured':
      case 'ok':
        return <Badge variant="success">{status}</Badge>;
      case 'unhealthy':
      case 'disconnected':
      case 'error':
        return <Badge variant="danger">{status}</Badge>;
      case 'warning':
        return <Badge variant="warning">{status}</Badge>;
      case 'not_configured':
      case 'misconfigured':
        return <Badge variant="secondary">{status}</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getServiceIcon = (serviceName: string) => {
    switch (serviceName) {
      case 'database':
        return '🗄️';
      case 'anthropic':
        return '🤖';
      case 'mercadopago':
        return '💳';
      case 'resend':
        return '📧';
      case 'memory':
        return '💾';
      default:
        return '⚙️';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Heading level={1}>System Health Monitor</Heading>
            <Text className="text-gray-600 dark:text-gray-400 mt-2">
              Real-time monitoring of backend services and dependencies
            </Text>
          </div>
          <button
            onClick={fetchHealthStatus}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {isLoading ? 'Refreshing...' : 'Refresh Now'}
          </button>
        </div>

        {/* Error State */}
        {error && (
          <Card className="border-red-200 bg-red-50 dark:bg-red-900/10">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <Heading level={3} className="text-red-900 dark:text-red-400">
                  Health Check Failed
                </Heading>
                <Text className="text-red-700 dark:text-red-300 mt-1">{error}</Text>
              </div>
            </div>
          </Card>
        )}

        {/* Overall Status */}
        {healthData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <div className="flex items-center gap-3">
                <span className="text-3xl">
                  {healthData.status === 'healthy' ? '✅' : '❌'}
                </span>
                <div>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    Overall Status
                  </Text>
                  <Heading level={3} className="mt-1">
                    {getStatusBadge(healthData.status)}
                  </Heading>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-3">
                <span className="text-3xl">⏱️</span>
                <div>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    Uptime
                  </Text>
                  <Heading level={3} className="mt-1">
                    {formatUptime(healthData.uptime)}
                  </Heading>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-3">
                <span className="text-3xl">🔄</span>
                <div>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    Last Updated
                  </Text>
                  <Heading level={3} className="mt-1 text-sm">
                    {lastUpdate.toLocaleTimeString()}
                  </Heading>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Services Status */}
        {healthData && (
          <div>
            <Heading level={2} className="mb-4">
              Services
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(healthData.services).map(([serviceName, service]) => (
                <Card key={serviceName} className="hover:shadow-md transition">
                  <div className="space-y-3">
                    {/* Service Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {getServiceIcon(serviceName)}
                        </span>
                        <Heading level={3} className="capitalize">
                          {serviceName}
                        </Heading>
                      </div>
                      {getStatusBadge(service.status)}
                    </div>

                    {/* Service Details */}
                    <div className="space-y-2 text-sm">
                      {service.responseTime && (
                        <div className="flex justify-between">
                          <Text className="text-gray-500 dark:text-gray-400">
                            Response Time
                          </Text>
                          <Text className="font-medium">{service.responseTime}</Text>
                        </div>
                      )}

                      {service.heapUsed && (
                        <div className="flex justify-between">
                          <Text className="text-gray-500 dark:text-gray-400">
                            Memory Usage
                          </Text>
                          <Text className="font-medium">
                            {service.heapUsed} / {service.heapTotal}{' '}
                            <span className="text-xs text-gray-400">
                              ({service.heapPercentage})
                            </span>
                          </Text>
                        </div>
                      )}

                      {service.rss && (
                        <div className="flex justify-between">
                          <Text className="text-gray-500 dark:text-gray-400">
                            RSS Memory
                          </Text>
                          <Text className="font-medium">{service.rss}</Text>
                        </div>
                      )}

                      {service.tokenPrefix && (
                        <div className="flex justify-between">
                          <Text className="text-gray-500 dark:text-gray-400">
                            Token Prefix
                          </Text>
                          <Text className="font-mono font-medium">
                            {service.tokenPrefix}...
                          </Text>
                        </div>
                      )}

                      {service.error && (
                        <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded">
                          <Text className="text-red-700 dark:text-red-300 text-xs">
                            {service.error}
                          </Text>
                        </div>
                      )}

                      {service.message && (
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                          <Text className="text-yellow-700 dark:text-yellow-300 text-xs">
                            {service.message}
                          </Text>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Auto-refresh indicator */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Auto-refreshes every 30 seconds
        </div>
      </div>
    </AdminLayout>
  );
}

export default function SystemHealthPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <SystemHealthContent />
    </ProtectedRoute>
  );
}
