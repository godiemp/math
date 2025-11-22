'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { Card, Button, Heading, Text, Badge } from '@/components/ui';
import AdminLayout from '@/components/layout/AdminLayout';
import LiveSessionXState from '@/components/interactive/LiveSessionXState';
import {
  createDebugSession,
  updateDebugSessionStatus,
  resetDebugParticipant,
  DEBUG_SESSION_ID,
  getSession,
} from '@/lib/sessionApi';

type SessionStatus = 'scheduled' | 'lobby' | 'active' | 'completed';

function LiveSessionDebugContent() {
  const [sessionReady, setSessionReady] = useState(false);
  const [sessionStatus, setSessionStatus] = useState<SessionStatus>('scheduled');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionLog, setActionLog] = useState<string[]>([]);
  const [showSession, setShowSession] = useState(false);
  const [key, setKey] = useState(0); // Force remount of LiveSessionXState

  const log = (message: string) => {
    setActionLog((prev) => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev.slice(0, 19)]);
  };

  const handleCreateSession = async () => {
    setIsLoading(true);
    setError(null);
    log('Creating debug session...');

    const result = await createDebugSession();

    if (!result.success) {
      setError(result.error || 'Failed to create session');
      log(`Error: ${result.error}`);
    } else {
      setSessionReady(true);
      setSessionStatus('scheduled');
      setShowSession(false);
      log('Debug session created successfully');
    }
    setIsLoading(false);
  };

  const handleStatusChange = async (status: SessionStatus) => {
    setIsLoading(true);
    setError(null);
    log(`Changing status to ${status}...`);

    const result = await updateDebugSessionStatus(status);

    if (!result.success) {
      setError(result.error || 'Failed to update status');
      log(`Error: ${result.error}`);
    } else {
      setSessionStatus(status);
      log(`Status changed to: ${status}`);

      // Force remount of LiveSessionXState to pick up new status
      if (showSession) {
        setKey((prev) => prev + 1);
      }
    }
    setIsLoading(false);
  };

  const handleResetParticipant = async () => {
    setIsLoading(true);
    setError(null);
    log('Resetting participant data...');

    const result = await resetDebugParticipant();

    if (!result.success) {
      setError(result.error || 'Failed to reset participant');
      log(`Error: ${result.error}`);
    } else {
      log('Participant data reset successfully');
      if (showSession) {
        setKey((prev) => prev + 1);
      }
    }
    setIsLoading(false);
  };

  const handleStartSession = () => {
    if (!sessionReady) {
      setError('Create a debug session first');
      return;
    }
    setShowSession(true);
    log('Started live session view');
  };

  const handleExitSession = () => {
    setShowSession(false);
    log('Exited live session view');
  };

  // Check if debug session exists on mount
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession(DEBUG_SESSION_ID);
      if (session) {
        setSessionReady(true);
        setSessionStatus(session.status as SessionStatus);
        log('Existing debug session found');
      }
    };
    checkSession();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Heading level={1} size="md" className="mb-2">
            Live Session Debug - Production Component Test
          </Heading>
          <Text variant="secondary">
            Test the real LiveSessionXState component with a controllable debug session.
          </Text>
        </div>

        {/* Error Display */}
        {error && (
          <Card padding="lg" className="bg-red-50 border-red-200">
            <Text className="text-red-700">{error}</Text>
          </Card>
        )}

        {/* Controls */}
        <Card padding="lg">
          <Heading level={3} size="xs" className="mb-4">
            Debug Session Controls
          </Heading>

          <div className="space-y-4">
            {/* Create/Reset Session */}
            <div>
              <Text size="sm" variant="secondary" className="mb-2">
                Step 1: Create or reset the debug session
              </Text>
              <Button variant="primary" size="sm" onClick={handleCreateSession} disabled={isLoading}>
                {isLoading ? 'Loading...' : sessionReady ? 'Reset Debug Session' : 'Create Debug Session'}
              </Button>
              {sessionReady && (
                <Badge variant="success" size="sm" className="ml-2">
                  Session Ready
                </Badge>
              )}
            </div>

            {/* Status Controls */}
            {sessionReady && (
              <div>
                <Text size="sm" variant="secondary" className="mb-2">
                  Step 2: Set session status (simulates time progression)
                </Text>
                <div className="flex flex-wrap gap-2">
                  {(['scheduled', 'lobby', 'active', 'completed'] as SessionStatus[]).map((status) => (
                    <Button
                      key={status}
                      variant={sessionStatus === status ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => handleStatusChange(status)}
                      disabled={isLoading}
                    >
                      {status === 'scheduled' && '📅 Scheduled'}
                      {status === 'lobby' && '🎯 Lobby'}
                      {status === 'active' && '🎮 Active'}
                      {status === 'completed' && '🏆 Completed'}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Actions */}
            {sessionReady && (
              <div>
                <Text size="sm" variant="secondary" className="mb-2">
                  Additional Actions
                </Text>
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" size="sm" onClick={handleResetParticipant} disabled={isLoading}>
                    Reset My Answers
                  </Button>
                  {!showSession ? (
                    <Button variant="primary" size="sm" onClick={handleStartSession} disabled={isLoading}>
                      Launch Session View
                    </Button>
                  ) : (
                    <Button variant="danger" size="sm" onClick={handleExitSession}>
                      Hide Session View
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Interactive Component */}
          <div className="lg:col-span-2">
            {showSession ? (
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-900 text-white px-4 py-2 text-sm font-mono flex justify-between items-center">
                  <span>Production LiveSessionXState - Status: {sessionStatus}</span>
                  <Badge variant="info" size="sm">
                    ID: {DEBUG_SESSION_ID}
                  </Badge>
                </div>
                <div className="min-h-[600px]">
                  <LiveSessionXState key={key} sessionId={DEBUG_SESSION_ID} onExit={handleExitSession} />
                </div>
              </div>
            ) : (
              <Card padding="lg" className="min-h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🔧</div>
                  <Heading level={3} size="sm" className="mb-2">
                    Debug Mode
                  </Heading>
                  <Text variant="secondary">
                    {sessionReady
                      ? 'Click "Launch Session View" to test the production component'
                      : 'Create a debug session first to begin testing'}
                  </Text>
                </div>
              </Card>
            )}
          </div>

          {/* Debug Panel */}
          <div className="space-y-4">
            {/* Current State */}
            <Card padding="lg">
              <Heading level={3} size="xs" className="mb-4">
                Session Info
              </Heading>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <Text variant="secondary">Session ID:</Text>
                  <Text className="font-mono text-xs">{DEBUG_SESSION_ID}</Text>
                </div>
                <div className="flex justify-between">
                  <Text variant="secondary">Status:</Text>
                  <Badge variant="info" size="sm">
                    {sessionStatus}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <Text variant="secondary">Session Ready:</Text>
                  <Text>{sessionReady ? 'Yes' : 'No'}</Text>
                </div>
                <div className="flex justify-between">
                  <Text variant="secondary">View Active:</Text>
                  <Text>{showSession ? 'Yes' : 'No'}</Text>
                </div>
              </div>
            </Card>

            {/* Instructions */}
            <Card padding="lg">
              <Heading level={3} size="xs" className="mb-4">
                How to Test
              </Heading>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>Create a debug session</li>
                <li>Launch the session view</li>
                <li>Change status to test different states</li>
                <li>In "Active" mode, answer questions</li>
                <li>Test navigation and answer submission</li>
                <li>Change to "Completed" to see results</li>
              </ol>
            </Card>

            {/* Action Log */}
            <Card padding="lg">
              <Heading level={3} size="xs" className="mb-4">
                Action Log
              </Heading>
              <div className="max-h-48 overflow-auto space-y-1">
                {actionLog.length === 0 ? (
                  <Text size="xs" variant="secondary">
                    No actions yet
                  </Text>
                ) : (
                  actionLog.map((entry, idx) => (
                    <div key={idx} className="text-xs font-mono text-gray-600 dark:text-gray-400">
                      {entry}
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default function LiveSessionDebugPage() {
  return (
    <ProtectedRoute requireAdmin>
      <LiveSessionDebugContent />
    </ProtectedRoute>
  );
}
