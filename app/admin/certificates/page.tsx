'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { Card, Button, Heading, Text, Badge } from '@/components/ui';
import { api } from '@/lib/api-client';
import AdminLayout from '@/components/layout/AdminLayout';

// Get backend URL for direct download/preview links
const getBackendUrl = async () => {
  try {
    const response = await fetch('/api/config');
    const data = await response.json();
    return data.backendUrl;
  } catch (error) {
    console.error('Failed to get backend URL:', error);
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  }
};

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: number;
}

interface Certificate {
  id: string;
  userId: string;
  certificateType: 'quiz_session' | 'live_session';
  sessionId?: string;
  studentName: string;
  certificateCode: string;
  testName: string;
  testDate: number;
  testDurationMinutes: number;
  totalQuestions: number;
  totalScore: number;
  maxScore: number;
  percentage: number;
  percentile?: number;
  correctCount: number;
  incorrectCount: number;
  omittedCount: number;
  badges: Badge[];
  personalizedMessage?: string;
  issuedAt: number;
  verificationUrl?: string;
  viewCount: number;
  createdAt: number;
  updatedAt: number;
}

export default function CertificatesAdminPage() {
  const router = useRouter();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generatingTest, setGeneratingTest] = useState(false);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('📋 Loading certificates...');

      const response = await api.get<{ success?: boolean; certificates?: Certificate[]; count?: number }>('/api/certificates/admin/all?limit=50');

      console.log('📋 Response:', response);

      if (response.error) {
        console.error('❌ API Error:', response.error);
        const errorMsg = `${response.error.error} (Status: ${response.error.statusCode})`;
        setError(errorMsg);
        setCertificates([]);
        return;
      }

      if (!response.data) {
        console.error('❌ No data in response');
        setError('No data received from server');
        setCertificates([]);
        return;
      }

      console.log('✅ Certificates loaded:', response.data.certificates?.length || 0);
      setCertificates(response.data.certificates || []);
    } catch (err: any) {
      console.error('❌ Exception loading certificates:', err);
      setError('Failed to load certificates: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const generateTestCertificate = async () => {
    try {
      setGeneratingTest(true);
      setError(null);
      const response = await api.post<{ certificate?: { id: string }, message?: string, isMock?: boolean }>('/api/certificates/admin/test', {
        type: 'live_session',
      });

      if (response.error) {
        const errorMsg = response.error.error || 'Failed to generate test certificate';
        setError(errorMsg);
        alert('❌ Error: ' + errorMsg);
        return;
      }

      const data = response.data;
      alert(`✅ ${data?.message || 'Certificado generado exitosamente'}\n\nID: ${data?.certificate?.id || 'unknown'}`);
      await loadCertificates();
    } catch (err: any) {
      console.error('Error generating test certificate:', err);
      const errorMsg = 'Failed to generate test certificate';
      setError(errorMsg);
      alert('❌ Error: ' + errorMsg);
    } finally {
      setGeneratingTest(false);
    }
  };

  const downloadCertificate = async (certificateId: string) => {
    try {
      const backendUrl = await getBackendUrl();
      const response = await fetch(`${backendUrl}/api/certificates/${certificateId}/download`, {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to download');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificate_${certificateId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading certificate:', error);
      alert('Failed to download certificate');
    }
  };

  const previewCertificate = async (certificateId: string) => {
    const backendUrl = await getBackendUrl();
    window.open(`${backendUrl}/api/certificates/${certificateId}/preview`, '_blank');
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ProtectedRoute requireAdmin>
      <AdminLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Heading level={1} className="text-3xl font-bold mb-2">
              Gestión de Certificados
            </Heading>
            <Text className="text-gray-600">
              Visualiza y gestiona certificados premium generados para ensayos completados
            </Text>
          </div>

          {error && (
            <Card className="mb-6 bg-red-50 border border-red-200 p-4">
              <Text className="text-red-800">{error}</Text>
            </Card>
          )}

          {/* Test Certificate Generation Section */}
          <Card className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🎓</div>
              <div className="flex-1">
                <Heading level={2} className="text-xl font-semibold mb-2">
                  Generar Certificado Premium
                </Heading>
                <Text className="mb-4 text-gray-700">
                  Genera un certificado premium de <strong>prueba con datos simulados</strong>.
                  Perfecto para visualizar el diseño, formato y todas las características del certificado sin necesitar sesiones reales.
                </Text>
                <div className="flex gap-3 items-center">
                  <Button
                    onClick={generateTestCertificate}
                    disabled={generatingTest}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 shadow-lg"
                  >
                    {generatingTest ? '⏳ Generando...' : '🎯 Generar Certificado de Ensayo'}
                  </Button>
                  {generatingTest && (
                    <Text className="text-sm text-gray-600 animate-pulse">
                      Analizando resultados y generando certificado...
                    </Text>
                  )}
                </div>
                <Text className="mt-3 text-sm text-gray-600">
                  💡 <strong>Nota:</strong> Los datos del certificado son simulados - no requiere sesiones reales.
                </Text>
              </div>
            </div>
          </Card>

          {/* Certificates List */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <Heading level={2} className="text-xl font-semibold">
                Certificados Emitidos ({certificates.length})
              </Heading>
              <Button
                onClick={loadCertificates}
                disabled={loading}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
              >
                {loading ? 'Cargando...' : 'Actualizar'}
              </Button>
            </div>

            {loading && certificates.length === 0 ? (
              <div className="text-center py-12">
                <Text className="text-gray-500">Cargando certificados...</Text>
              </div>
            ) : certificates.length === 0 ? (
              <div className="text-center py-12">
                <Text className="text-gray-500">No hay certificados emitidos aún.</Text>
                <Text className="text-gray-400 text-sm mt-2">
                  Genera un certificado de prueba para comenzar.
                </Text>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Código
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Estudiante
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Ensayo
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Tipo
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Resultado
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Percentil
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Medallas
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Vistas
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Emitido
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {certificates.map((cert) => (
                      <tr key={cert.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-mono text-gray-900">
                            {cert.certificateCode}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{cert.studentName}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {cert.testName}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <Badge
                            variant={cert.certificateType === 'quiz_session' ? 'info' : 'success'}
                          >
                            {cert.certificateType === 'quiz_session' ? 'Quiz' : 'En Vivo'}
                          </Badge>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">
                              {cert.totalScore}/{cert.maxScore}
                            </div>
                            <div className="text-gray-500">{cert.percentage.toFixed(1)}%</div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {cert.percentile !== undefined ? (
                            <div className="text-sm font-medium text-gray-900">
                              {cert.percentile}°
                            </div>
                          ) : (
                            <div className="text-sm text-gray-400">-</div>
                          )}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex gap-1">
                            {cert.badges.slice(0, 3).map((badge) => (
                              <span key={badge.id} title={badge.name}>
                                {badge.icon}
                              </span>
                            ))}
                            {cert.badges.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{cert.badges.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{cert.viewCount}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {formatDate(cert.issuedAt)}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex gap-2">
                            <button
                              onClick={() => previewCertificate(cert.id)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Vista Previa"
                            >
                              👁️
                            </button>
                            <button
                              onClick={() => downloadCertificate(cert.id)}
                              className="text-green-600 hover:text-green-900"
                              title="Descargar PDF"
                            >
                              📥
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          {/* Certificate Info */}
          <Card className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🏆</div>
              <div>
                <Heading level={3} className="text-lg font-semibold mb-2">
                  Certificados para Ensayos en Vivo
                </Heading>
                <Text className="text-sm text-gray-700 mb-3">
                  Los certificados premium se generan automáticamente para <strong>ensayos en vivo completados</strong>.
                  Cada certificado incluye:
                </Text>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>✅ Percentil comparativo con otros participantes del mismo ensayo</li>
                  <li>✅ Análisis de desempeño por sección temática</li>
                  <li>✅ Mensaje personalizado generado por IA</li>
                  <li>✅ Medallas y logros automáticos</li>
                  <li>✅ Código QR para verificación de autenticidad</li>
                  <li>✅ Diseño profesional listo para compartir</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Features Info */}
          <Card className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50">
            <Heading level={3} className="text-lg font-semibold mb-4">
              Características del Certificado Premium
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-2xl mb-2">🎓</div>
                <Text className="font-semibold mb-1">Información Completa</Text>
                <Text className="text-sm text-gray-600">
                  Nombre del estudiante, fecha, duración, y detalles del ensayo
                </Text>
              </div>
              <div>
                <div className="text-2xl mb-2">📊</div>
                <Text className="font-semibold mb-1">Resultados Detallados</Text>
                <Text className="text-sm text-gray-600">
                  Puntaje total, porcentaje de logro, y desempeño por sección
                </Text>
              </div>
              <div>
                <div className="text-2xl mb-2">🏆</div>
                <Text className="font-semibold mb-1">Medallas y Logros</Text>
                <Text className="text-sm text-gray-600">
                  Badges automáticos según desempeño y persistencia
                </Text>
              </div>
              <div>
                <div className="text-2xl mb-2">🤖</div>
                <Text className="font-semibold mb-1">Mensaje IA</Text>
                <Text className="text-sm text-gray-600">
                  Análisis personalizado con fortalezas y áreas de mejora
                </Text>
              </div>
              <div>
                <div className="text-2xl mb-2">📈</div>
                <Text className="font-semibold mb-1">Percentil Nacional</Text>
                <Text className="text-sm text-gray-600">
                  Comparación simulada con otros estudiantes
                </Text>
              </div>
              <div>
                <div className="text-2xl mb-2">🔐</div>
                <Text className="font-semibold mb-1">Verificación QR</Text>
                <Text className="text-sm text-gray-600">
                  Código QR para verificar autenticidad del certificado
                </Text>
              </div>
            </div>
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
