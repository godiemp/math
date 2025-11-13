'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, Button, Heading, Text } from '@/components/ui';
import AdminLayout from '@/components/AdminLayout';
import { api } from '@/lib/api-client';

interface UnitSubsection {
  code: string;
  name: string;
  description?: string;
  primary_skills: string[];
}

interface ThematicUnit {
  code: string;
  name: string;
  level: 'M1' | 'M2';
  subject: string;
  description?: string;
  subsections?: UnitSubsection[];
}

interface CurriculumSummary {
  totalUnits: number;
  totalSubsections: number;
  totalSkills: number;
  byLevel: {
    M1: number;
    M2: number;
  };
  bySubject: {
    números: number;
    álgebra: number;
    geometría: number;
    probabilidad: number;
  };
}

export default function CurriculumAdminPage() {
  const [summary, setSummary] = useState<CurriculumSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [copyStatus, setCopyStatus] = useState<string>('');

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      setLoading(true);
      // First, let's get all units and calculate summary
      const response = await api.get<{ units: ThematicUnit[] }>('/api/thematic-units');

      if (response.data?.units) {
        const units = response.data.units;
        const totalSubsections = units.reduce((sum, unit) =>
          sum + (unit.subsections?.length || 0), 0
        );
        const totalSkills = units.reduce((sum, unit) =>
          sum + (unit.subsections?.reduce((subSum, subsection) =>
            subSum + subsection.primary_skills.length, 0) || 0), 0
        );

        setSummary({
          totalUnits: units.length,
          totalSubsections,
          totalSkills,
          byLevel: {
            M1: units.filter(u => u.level === 'M1').length,
            M2: units.filter(u => u.level === 'M2').length,
          },
          bySubject: {
            números: units.filter(u => u.subject === 'números').length,
            álgebra: units.filter(u => u.subject === 'álgebra').length,
            geometría: units.filter(u => u.subject === 'geometría').length,
            probabilidad: units.filter(u => u.subject === 'probabilidad').length,
          },
        });
      }
    } catch (error) {
      console.error('Error loading curriculum summary:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyCurriculum = async (level?: 'M1' | 'M2') => {
    try {
      setCopyStatus('Copying...');

      // Fetch the curriculum data
      const url = level
        ? `/api/thematic-units?level=${level}`
        : '/api/thematic-units';

      const response = await api.get<{ units: ThematicUnit[] }>(url);

      if (response.data?.units) {
        const jsonString = JSON.stringify(response.data.units, null, 2);

        // Copy to clipboard
        await navigator.clipboard.writeText(jsonString);

        const levelText = level ? `${level} ` : '';
        setCopyStatus(`✓ ${levelText}Curriculum copied to clipboard!`);

        setTimeout(() => setCopyStatus(''), 3000);
      }
    } catch (error) {
      console.error('Error copying curriculum:', error);
      setCopyStatus('✗ Failed to copy curriculum');
      setTimeout(() => setCopyStatus(''), 3000);
    }
  };

  const downloadCurriculum = async (level?: 'M1' | 'M2') => {
    try {
      const url = level
        ? `/api/thematic-units?level=${level}`
        : '/api/thematic-units';

      const response = await api.get<{ units: ThematicUnit[] }>(url);

      if (response.data?.units) {
        const jsonString = JSON.stringify(response.data.units, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = level ? `curriculum-${level}.json` : 'curriculum-all.json';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(a);

        const levelText = level ? `${level} ` : '';
        setCopyStatus(`✓ ${levelText}Curriculum downloaded!`);
        setTimeout(() => setCopyStatus(''), 3000);
      }
    } catch (error) {
      console.error('Error downloading curriculum:', error);
      setCopyStatus('✗ Failed to download curriculum');
      setTimeout(() => setCopyStatus(''), 3000);
    }
  };

  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminLayout>
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <Heading size="2xl">Curriculum Management</Heading>
          </div>

          {/* Summary Statistics */}
          {loading ? (
            <Card>
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            </Card>
          ) : summary ? (
            <Card>
              <Heading size="lg" className="mb-4">Curriculum Statistics</Heading>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <Text className="text-sm text-gray-600 dark:text-gray-400">Total Units</Text>
                  <Text className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {summary.totalUnits}
                  </Text>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <Text className="text-sm text-gray-600 dark:text-gray-400">Total Subsections</Text>
                  <Text className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {summary.totalSubsections}
                  </Text>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <Text className="text-sm text-gray-600 dark:text-gray-400">Total Skills</Text>
                  <Text className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {summary.totalSkills}
                  </Text>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Heading size="sm" className="mb-2">By Level</Heading>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded">
                      <Text>M1 (Competencia Matemática 1)</Text>
                      <Text className="font-semibold">{summary.byLevel.M1} units</Text>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded">
                      <Text>M2 (Competencia Matemática 2)</Text>
                      <Text className="font-semibold">{summary.byLevel.M2} units</Text>
                    </div>
                  </div>
                </div>

                <div>
                  <Heading size="sm" className="mb-2">By Subject</Heading>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded">
                      <Text>🔢 Números</Text>
                      <Text className="font-semibold">{summary.bySubject.números} units</Text>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded">
                      <Text>📐 Álgebra</Text>
                      <Text className="font-semibold">{summary.bySubject.álgebra} units</Text>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded">
                      <Text>📏 Geometría</Text>
                      <Text className="font-semibold">{summary.bySubject.geometría} units</Text>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded">
                      <Text>📊 Probabilidad</Text>
                      <Text className="font-semibold">{summary.bySubject.probabilidad} units</Text>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ) : null}

          {/* Copy Actions */}
          <Card>
            <Heading size="lg" className="mb-4">Copy Curriculum</Heading>
            <Text className="text-gray-600 dark:text-gray-400 mb-6">
              Copy curriculum data as JSON to clipboard or download as a file.
            </Text>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Copy All */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <Heading size="sm" className="mb-2">All Curriculum (M1 + M2)</Heading>
                <Text className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {summary ? `${summary.totalUnits} units` : 'Loading...'}
                </Text>
                <div className="space-y-2">
                  <Button
                    onClick={() => copyCurriculum()}
                    className="w-full"
                    size="sm"
                  >
                    📋 Copy to Clipboard
                  </Button>
                  <Button
                    onClick={() => downloadCurriculum()}
                    variant="outline"
                    className="w-full"
                    size="sm"
                  >
                    💾 Download JSON
                  </Button>
                </div>
              </div>

              {/* Copy M1 */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <Heading size="sm" className="mb-2">M1 Only</Heading>
                <Text className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {summary ? `${summary.byLevel.M1} units` : 'Loading...'}
                </Text>
                <div className="space-y-2">
                  <Button
                    onClick={() => copyCurriculum('M1')}
                    className="w-full"
                    size="sm"
                  >
                    📋 Copy M1
                  </Button>
                  <Button
                    onClick={() => downloadCurriculum('M1')}
                    variant="outline"
                    className="w-full"
                    size="sm"
                  >
                    💾 Download M1
                  </Button>
                </div>
              </div>

              {/* Copy M2 */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <Heading size="sm" className="mb-2">M2 Only</Heading>
                <Text className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {summary ? `${summary.byLevel.M2} units` : 'Loading...'}
                </Text>
                <div className="space-y-2">
                  <Button
                    onClick={() => copyCurriculum('M2')}
                    className="w-full"
                    size="sm"
                  >
                    📋 Copy M2
                  </Button>
                  <Button
                    onClick={() => downloadCurriculum('M2')}
                    variant="outline"
                    className="w-full"
                    size="sm"
                  >
                    💾 Download M2
                  </Button>
                </div>
              </div>
            </div>

            {/* Status Message */}
            {copyStatus && (
              <div className={`mt-4 p-3 rounded-lg text-center ${
                copyStatus.startsWith('✓')
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                  : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
              }`}>
                <Text>{copyStatus}</Text>
              </div>
            )}
          </Card>

          {/* Usage Example */}
          <Card>
            <Heading size="lg" className="mb-4">API Usage</Heading>
            <Text className="text-gray-600 dark:text-gray-400 mb-4">
              You can also access curriculum data programmatically via the API:
            </Text>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm space-y-2">
              <div>
                <Text className="text-gray-400">// Get all curriculum units</Text>
                <Text className="text-green-400">GET /api/thematic-units</Text>
              </div>
              <div className="mt-3">
                <Text className="text-gray-400">// Get M1 units only</Text>
                <Text className="text-green-400">GET /api/thematic-units?level=M1</Text>
              </div>
              <div className="mt-3">
                <Text className="text-gray-400">// Get M2 units only</Text>
                <Text className="text-green-400">GET /api/thematic-units?level=M2</Text>
              </div>
              <div className="mt-3">
                <Text className="text-gray-400">// Get units by subject</Text>
                <Text className="text-green-400">GET /api/thematic-units?subject=álgebra</Text>
              </div>
            </div>
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
