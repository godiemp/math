'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Card, Button, Heading, Text, Badge } from '@/components/ui';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { api, getApiBaseUrl } from '@/lib/api-client';
import AdminLayout from '@/components/layout/AdminLayout';
import {
  MARKETING_SCENES,
  SCENE_CATEGORIES,
  type MarketingScene,
  type SceneCategory,
} from '@/lib/marketing';
import { CAPTURE_PRESETS, type PresetKey, type CaptureType } from '@/lib/marketing';

interface CapturedFile {
  filename: string;
  url: string;
  type: 'gif' | 'video' | 'screenshot';
}

interface CaptureResult {
  success: boolean;
  filename?: string;
  url?: string;
  size?: number;
  mimeType?: string;
  duration?: number;
  frameCount?: number;
  logs: string[];
  error?: string;
}

// Helper to get the full URL for marketing files (needs backend URL)
const getFileUrl = (filename: string, download = false) => {
  const baseUrl = getApiBaseUrl();
  const downloadParam = download ? '?download=true' : '';
  return `${baseUrl}/api/admin/marketing/files/${filename}${downloadParam}`;
};

export default function MarketingPage() {
  // Scene selection
  const [selectedScene, setSelectedScene] = useState<MarketingScene | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<SceneCategory | 'all'>('all');

  // Capture settings
  const [captureType, setCaptureType] = useState<CaptureType>('gif');
  const [preset, setPreset] = useState<PresetKey>('twitter');
  const [duration, setDuration] = useState(5000);
  const [customUrl, setCustomUrl] = useState('');

  // Capture state
  const [capturing, setCapturing] = useState(false);
  const [captureProgress, setCaptureProgress] = useState('');
  const [captureLogs, setCaptureLogs] = useState<string[]>([]);
  const [showLogs, setShowLogs] = useState(false);

  // Gallery
  const [capturedFiles, setCapturedFiles] = useState<{
    gifs: string[];
    videos: string[];
    screenshots: string[];
  }>({ gifs: [], videos: [], screenshots: [] });
  const [loadingFiles, setLoadingFiles] = useState(false);

  // Load captured files on mount
  useEffect(() => {
    loadCapturedFiles();
  }, []);

  const loadCapturedFiles = async () => {
    setLoadingFiles(true);
    try {
      const response = await api.get<any>('/api/admin/marketing/files');
      if (response.data) {
        setCapturedFiles(response.data.files);
      }
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setLoadingFiles(false);
    }
  };

  const handleCapture = async () => {
    const url = customUrl || selectedScene?.url;
    if (!url) {
      toast.error('Please select a scene or enter a custom URL');
      return;
    }

    setCapturing(true);
    setCaptureProgress('Starting capture...');
    setCaptureLogs([]);

    try {
      const response = await api.post<CaptureResult>('/api/admin/marketing/capture', {
        url,
        type: captureType,
        preset,
        duration,
        waitForSelector: selectedScene?.waitForSelector,
        captureDelay: selectedScene?.captureDelay,
      });

      if (response.error) {
        toast.error(response.error.error || 'Capture failed');
        setCaptureProgress('');
        return;
      }

      if (response.data?.success) {
        toast.success(
          `${captureType.toUpperCase()} captured successfully! (${formatBytes(response.data.size || 0)})`
        );
        setCaptureLogs(response.data.logs || []);
        loadCapturedFiles();
      } else {
        toast.error(response.data?.error || 'Capture failed');
        setCaptureLogs(response.data?.logs || []);
      }

      setCaptureProgress('');
    } catch (error: any) {
      toast.error(error.message || 'Capture failed');
      setCaptureProgress('');
    } finally {
      setCapturing(false);
    }
  };

  const handleDeleteFile = async (filename: string) => {
    if (!confirm(`Delete ${filename}?`)) return;

    try {
      const response = await api.delete(`/api/admin/marketing/files/${filename}`);
      if (response.error) {
        toast.error('Failed to delete file');
        return;
      }
      toast.success('File deleted');
      loadCapturedFiles();
    } catch (error) {
      toast.error('Failed to delete file');
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredScenes =
    categoryFilter === 'all'
      ? MARKETING_SCENES
      : MARKETING_SCENES.filter((s) => s.category === categoryFilter);

  const currentPreset = CAPTURE_PRESETS[preset];

  return (
    <ProtectedRoute requireAdmin>
      <AdminLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Heading level={1} size="lg" className="mb-2">
            Marketing Content Generator
          </Heading>
          <Text variant="secondary" className="mb-8">
            Capture GIFs, videos, and screenshots from any page in the app for social media
            marketing.
          </Text>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Scene Selection */}
            <div className="lg:col-span-2">
              <Card padding="lg" className="mb-6">
                <Heading level={2} size="md" className="mb-4">
                  1. Select a Scene
                </Heading>

                {/* Category filter */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => setCategoryFilter('all')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      categoryFilter === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  {Object.entries(SCENE_CATEGORIES).map(([key, { label }]) => (
                    <button
                      key={key}
                      onClick={() => setCategoryFilter(key as SceneCategory)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        categoryFilter === key
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Scene grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto">
                  {filteredScenes.map((scene) => (
                    <button
                      key={scene.id}
                      onClick={() => {
                        setSelectedScene(scene);
                        setCustomUrl('');
                        setDuration(scene.defaultDuration);
                      }}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        selectedScene?.id === scene.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span className="font-medium text-sm text-gray-900">{scene.name}</span>
                        {scene.requiresAuth && (
                          <Badge variant="warning" className="text-xs">
                            Auth
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2">{scene.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{scene.url}</p>
                    </button>
                  ))}
                </div>

                {/* Custom URL input */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Text size="sm" className="font-medium mb-2">
                    Or enter a custom URL:
                  </Text>
                  <input
                    type="text"
                    value={customUrl}
                    onChange={(e) => {
                      setCustomUrl(e.target.value);
                      if (e.target.value) setSelectedScene(null);
                    }}
                    placeholder="/practice/m1 or https://..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </Card>

              {/* Preview */}
              {(selectedScene || customUrl) && (
                <Card padding="lg" className="mb-6">
                  <Heading level={2} size="md" className="mb-4">
                    Preview
                  </Heading>
                  <div
                    className="relative bg-gray-100 rounded-lg overflow-hidden"
                    style={{
                      aspectRatio: `${currentPreset.width}/${currentPreset.height}`,
                      maxHeight: '400px',
                    }}
                  >
                    <iframe
                      src={customUrl || selectedScene?.url || ''}
                      className="absolute inset-0 w-full h-full border-0"
                      style={{
                        transform: 'scale(0.5)',
                        transformOrigin: 'top left',
                        width: '200%',
                        height: '200%',
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {currentPreset.width}x{currentPreset.height}
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Right Column: Capture Controls */}
            <div>
              <Card padding="lg" className="mb-6 sticky top-4">
                <Heading level={2} size="md" className="mb-4">
                  2. Capture Settings
                </Heading>

                {/* Capture type */}
                <div className="mb-4">
                  <Text size="sm" className="font-medium mb-2">
                    Capture Type
                  </Text>
                  <div className="grid grid-cols-3 gap-2">
                    {(['screenshot', 'gif', 'video'] as CaptureType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => setCaptureType(type)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                          captureType === type
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {type === 'screenshot' && '📷'}
                        {type === 'gif' && '🎞️'}
                        {type === 'video' && '🎬'}
                        <span className="ml-1 capitalize">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preset */}
                <div className="mb-4">
                  <Text size="sm" className="font-medium mb-2">
                    Platform Preset
                  </Text>
                  <select
                    value={preset}
                    onChange={(e) => setPreset(e.target.value as PresetKey)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {Object.entries(CAPTURE_PRESETS).map(([key, p]) => (
                      <option key={key} value={key}>
                        {p.name} ({p.width}x{p.height})
                      </option>
                    ))}
                  </select>
                  <Text size="sm" variant="secondary" className="mt-1">
                    {currentPreset.description}
                  </Text>
                </div>

                {/* Duration (for GIF/video) */}
                {captureType !== 'screenshot' && (
                  <div className="mb-4">
                    <Text size="sm" className="font-medium mb-2">
                      Duration: {(duration / 1000).toFixed(1)}s
                    </Text>
                    <input
                      type="range"
                      min={1000}
                      max={30000}
                      step={500}
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>1s</span>
                      <span>30s</span>
                    </div>
                  </div>
                )}

                {/* Capture button */}
                <Button
                  variant="primary"
                  onClick={handleCapture}
                  disabled={capturing || (!selectedScene && !customUrl)}
                  className="w-full"
                >
                  {capturing ? 'Capturing...' : `Capture ${captureType.toUpperCase()}`}
                </Button>

                {/* Progress */}
                {capturing && (
                  <div className="mt-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-800"></div>
                      <div>
                        <p className="font-medium">{captureProgress || 'Processing...'}</p>
                        <p className="text-sm text-blue-600 mt-1">
                          This may take up to {Math.ceil(duration / 1000) + 10} seconds...
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Logs */}
                {captureLogs.length > 0 && (
                  <div className="mt-4">
                    <button
                      onClick={() => setShowLogs(!showLogs)}
                      className="text-sm font-medium text-gray-700 hover:text-gray-900 underline"
                    >
                      {showLogs ? '▼ Hide logs' : '▶ Show logs'}
                    </button>
                    {showLogs && (
                      <div className="mt-2 bg-gray-900 text-gray-100 rounded p-3 text-xs font-mono overflow-x-auto max-h-48 overflow-y-auto">
                        {captureLogs.map((log, i) => (
                          <div key={i} className="py-0.5">
                            {log}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </div>
          </div>

          {/* Gallery */}
          <Card padding="lg" className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <Heading level={2} size="md">
                Captured Files
              </Heading>
              <Button variant="secondary" size="sm" onClick={loadCapturedFiles} disabled={loadingFiles}>
                {loadingFiles ? 'Loading...' : 'Refresh'}
              </Button>
            </div>

            {capturedFiles.gifs.length === 0 &&
            capturedFiles.videos.length === 0 &&
            capturedFiles.screenshots.length === 0 ? (
              <Text variant="secondary" className="text-center py-8">
                No captured files yet. Select a scene and capture your first content!
              </Text>
            ) : (
              <div className="space-y-6">
                {/* GIFs */}
                {capturedFiles.gifs.length > 0 && (
                  <div>
                    <Text className="font-medium mb-2">GIFs ({capturedFiles.gifs.length})</Text>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {capturedFiles.gifs.map((filename) => (
                        <div
                          key={filename}
                          className="relative group rounded-lg overflow-hidden border border-gray-200"
                        >
                          <img
                            src={getFileUrl(filename)}
                            alt={filename}
                            className="w-full h-24 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <a
                              href={getFileUrl(filename, true)}
                              className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100"
                              title="Download"
                            >
                              ⬇️
                            </a>
                            <button
                              onClick={() => handleDeleteFile(filename)}
                              className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50"
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 truncate">
                            {filename}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Videos */}
                {capturedFiles.videos.length > 0 && (
                  <div>
                    <Text className="font-medium mb-2">
                      Videos ({capturedFiles.videos.length})
                    </Text>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {capturedFiles.videos.map((filename) => (
                        <div
                          key={filename}
                          className="relative group rounded-lg overflow-hidden border border-gray-200"
                        >
                          <video
                            src={getFileUrl(filename)}
                            className="w-full h-24 object-cover"
                            muted
                            onMouseEnter={(e) => e.currentTarget.play()}
                            onMouseLeave={(e) => {
                              e.currentTarget.pause();
                              e.currentTarget.currentTime = 0;
                            }}
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <a
                              href={getFileUrl(filename, true)}
                              className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100"
                              title="Download"
                            >
                              ⬇️
                            </a>
                            <button
                              onClick={() => handleDeleteFile(filename)}
                              className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50"
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 truncate">
                            {filename}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Screenshots */}
                {capturedFiles.screenshots.length > 0 && (
                  <div>
                    <Text className="font-medium mb-2">
                      Screenshots ({capturedFiles.screenshots.length})
                    </Text>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {capturedFiles.screenshots.map((filename) => (
                        <div
                          key={filename}
                          className="relative group rounded-lg overflow-hidden border border-gray-200"
                        >
                          <img
                            src={getFileUrl(filename)}
                            alt={filename}
                            className="w-full h-24 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <a
                              href={getFileUrl(filename, true)}
                              className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100"
                              title="Download"
                            >
                              ⬇️
                            </a>
                            <button
                              onClick={() => handleDeleteFile(filename)}
                              className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50"
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 truncate">
                            {filename}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
