# Live Session XState Machine

This document explains the XState implementation for the Live Practice session feature.

## Overview

The Live Session state machine manages the entire lifecycle of a live practice session, from loading to completion. It replaces the previous implementation that used 6 useState hooks and 3 useEffect hooks with a single, predictable state machine.

## Architecture

### State Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Live Session                            │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ├─► loading
                               │     │
                               │     └─► determineState
                               │           │
                               │           ├─► scheduled
                               │           │     │ (polls every 2s)
                               │           │     └─► [status changes] ─┐
                               │           │                            │
                               │           ├─► lobby                    │
                               │           │     │ (polls every 2s)     │
                               │           │     └─► [status changes] ─┤
                               │           │                            │
                               │           ├─► active ◄────────────────┘
                               │           │     │
                               │           │     ├─► idle
                               │           │     │     │
                               │           │     │     ├─► SELECT_ANSWER
                               │           │     │     │     └─► submittingAnswer
                               │           │     │     │           └─► idle
                               │           │     │     │
                               │           │     │     └─► NAVIGATE
                               │           │     │           └─► navigating
                               │           │     │                 └─► idle
                               │           │     │
                               │           │     └─► [polls every 2s]
                               │           │
                               │           ├─► completed
                               │           │     │ (polls every 2s)
                               │           │     └─► EXIT ─┐
                               │           │                │
                               │           └─► error        │
                               │                 │          │
                               │                 └─► RETRY  │
                               │                            │
                               └─► exited ◄─────────────────┘
```

## State Descriptions

### Core States

#### `loading`
- **Purpose**: Initial session data fetch
- **Entry**: Invokes `loadSession` actor
- **Transitions**:
  - `onDone` → `determineState` (with session data)
  - `onError` → `error`

#### `determineState`
- **Purpose**: Route to appropriate state based on session status
- **Transitions** (automatic):
  - `session.status === 'scheduled'` → `scheduled`
  - `session.status === 'lobby'` → `lobby`
  - `session.status === 'active'` → `active`
  - `session.status === 'completed'` → `completed`
  - Otherwise → `error`

#### `scheduled`
- **Purpose**: Waiting for lobby to open
- **Behavior**: Polls every 2 seconds for session updates
- **Transitions**:
  - `SESSION_UPDATED` → `determineState` (if status changed)
  - `EXIT` → `exited`

#### `lobby`
- **Purpose**: Waiting for session to start
- **Behavior**: Polls every 2 seconds for session updates
- **Transitions**:
  - `SESSION_UPDATED` → `determineState` (if status changed)
  - `EXIT` → `exited`

#### `active`
- **Purpose**: Quiz in progress
- **Behavior**:
  - Polls every 2 seconds for session updates
  - Manages navigation and answer submission
- **Substates**:
  - `idle`: Ready for user interaction
  - `navigating`: Persisting question index to server
  - `submittingAnswer`: Submitting answer to server
- **Transitions**:
  - `SESSION_UPDATED` → `determineState` (if status changed)
  - `EXIT` → `exited`

#### `completed`
- **Purpose**: Session finished, showing results
- **Behavior**: Polls every 2 seconds for leaderboard updates
- **Transitions**:
  - `EXIT` → `exited`

#### `error`
- **Purpose**: Error state with retry capability
- **Transitions**:
  - `RETRY` → `loading`
  - `EXIT` → `exited`

#### `exited`
- **Purpose**: Final state when user exits
- **Type**: Final state (machine stops)

## Events

### Session Lifecycle Events

```typescript
{ type: 'SESSION_LOADED', session, myAnswers, currentQuestionIndex }
```
Dispatched when initial session data is loaded.

```typescript
{ type: 'SESSION_UPDATED', session, myAnswers }
```
Dispatched when polling returns updated session data.

```typescript
{ type: 'POLL' }
```
Trigger for manual polling (automatic polling uses `after` delays).

```typescript
{ type: 'EXIT' }
```
User exits the session.

### Navigation Events

```typescript
{ type: 'NEXT_QUESTION' }
```
Navigate to next question (if available).

```typescript
{ type: 'PREVIOUS_QUESTION' }
```
Navigate to previous question (if available).

```typescript
{ type: 'NAVIGATE_TO_QUESTION', questionIndex: number }
```
Navigate to specific question by index.

### Answer Submission Events

```typescript
{ type: 'SELECT_ANSWER', answerIndex: number }
```
User selects an answer (triggers submission to server).

```typescript
{ type: 'ANSWER_SUBMITTED', success: boolean, updatedAnswers: (number | null)[] }
```
Answer submission completed.

### Error Events

```typescript
{ type: 'RETRY' }
```
Retry after error.

```typescript
{ type: 'ERROR', error: string }
```
Error occurred.

## Context

```typescript
interface LiveSessionContext {
  // Core data
  sessionId: string;
  session: LiveSession | null;

  // Navigation state
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  myAnswers: (number | null)[];

  // User state
  myParticipation: SessionParticipant | null;

  // Error handling
  error: string | null;

  // Flags
  hasPersistedInitialIndex: boolean;
}
```

## Actions

### `setSessionData`
Sets session data from initial load (with currentQuestionIndex).

### `updateSessionData`
Updates session data from polling (preserves currentQuestionIndex to avoid disrupting navigation).

### `goToNextQuestion`
Advances to next question and syncs selected answer.

### `goToPreviousQuestion`
Goes back to previous question and syncs selected answer.

### `goToQuestion`
Navigates to specific question and syncs selected answer.

### `setSelectedAnswer`
Optimistically sets selected answer (before server confirms).

### `updateAnswers`
Updates answers array after successful server submission.

### `setError` / `clearError`
Error state management.

## Guards

### `isScheduled` / `isLobby` / `isActive` / `isCompleted`
Check session status.

### `canGoNext` / `canGoPrevious`
Check if navigation is allowed.

### `hasSession`
Check if session is loaded.

## Actors (Async Operations)

### `loadSessionActor`
Fetches session data and participation data from API.

**Input**: `{ sessionId: string }`

**Output**: `{ session: LiveSession, myAnswers: (number | null)[], currentQuestionIndex: number }`

### `submitAnswerActor`
Submits answer to server and returns updated answers array.

**Input**: `{ sessionId: string, questionIndex: number, answerIndex: number, currentAnswers: (number | null)[] }`

**Output**: `{ updatedAnswers: (number | null)[] }`

### `updateQuestionIndexActor`
Persists current question index to server (for session resumption).

**Input**: `{ sessionId: string, questionIndex: number }`

**Output**: `{ questionIndex: number }`

## Usage

### Basic Usage

```tsx
import { useLiveSession } from '@/lib/hooks/useLiveSession';

function LiveSessionPage({ sessionId }: { sessionId: string }) {
  const {
    // State flags
    isLoading,
    isActive,
    isCompleted,

    // Data
    session,
    currentQuestion,
    selectedAnswer,

    // Actions
    selectAnswer,
    nextQuestion,
    exit,
  } = useLiveSession(sessionId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isActive && currentQuestion) {
    return (
      <QuizView
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        onAnswer={selectAnswer}
        onNext={nextQuestion}
      />
    );
  }

  // ... other states
}
```

### Advanced Usage (Direct State Machine)

```tsx
import { useMachine } from '@xstate/react';
import { liveSessionMachine } from '@/lib/live-session-machine';

function LiveSessionPage({ sessionId }: { sessionId: string }) {
  const [state, send] = useMachine(liveSessionMachine, {
    input: { sessionId },
  });

  // Check specific substates
  const isSubmitting = state.matches({ active: 'submittingAnswer' });
  const isNavigating = state.matches({ active: 'navigating' });

  // Access full context
  const { session, currentQuestionIndex, myAnswers } = state.context;

  // Send events
  const handleAnswer = (answerIndex: number) => {
    send({ type: 'SELECT_ANSWER', answerIndex });
  };

  return (
    <div>
      {/* Render based on state */}
    </div>
  );
}
```

## Debugging with XState Inspector

### Setup

1. Install XState Inspector:
```bash
npm install @statelyai/inspect
```

2. Add to your app (in development):

```tsx
// app/layout.tsx or app/providers.tsx
'use client';

import { createBrowserInspector } from '@statelyai/inspect';

if (process.env.NODE_ENV === 'development') {
  const inspector = createBrowserInspector();
  // Machines will automatically connect to inspector
}
```

3. Use inspector in the machine:

```tsx
import { useMachine } from '@xstate/react';
import { liveSessionMachine } from '@/lib/live-session-machine';

const [state, send] = useMachine(liveSessionMachine, {
  input: { sessionId },
  inspect: process.env.NODE_ENV === 'development',
});
```

### Using the Inspector

1. Open your app in the browser
2. The XState Inspector will open in a new window
3. You'll see a visual diagram of your state machine
4. As you interact with the app, you'll see:
   - Current state highlighted
   - State transitions animated
   - Events logged in timeline
   - Context changes tracked

### Inspector Features

- **State Diagram**: Visual representation of all states and transitions
- **Timeline**: Chronological log of all events and state changes
- **Context Inspector**: Real-time view of context values
- **Event Inspector**: Details of each event that was sent
- **Playback**: Step backward/forward through state history
- **Export**: Export state history for bug reports

## Benefits Over Previous Implementation

### Before (useState + useEffect)

**Problems:**
- 6 useState hooks with complex interdependencies
- 3 useEffect hooks with shared dependencies
- `isInitialLoad` flag hack to prevent premature persistence
- Polling race conditions (user changes vs. server updates)
- Scattered state logic across multiple effects
- Difficult to debug state transitions
- No guarantees about valid states

### After (XState)

**Improvements:**
- ✅ Single source of truth for state
- ✅ No useEffect hooks needed
- ✅ No race conditions (state transitions are atomic)
- ✅ Impossible states are impossible (TypeScript + XState)
- ✅ Visual debugging with XState Inspector
- ✅ Clear state diagram in code
- ✅ Testable state machine
- ✅ ~40% reduction in component code
- ✅ Centralized logic (easier to maintain)

### Code Comparison

**Before:**
```tsx
// 6 useState hooks
const [session, setSession] = useState<LiveSession | null>(null);
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
const [myAnswers, setMyAnswers] = useState<(number | null)[]>([]);
const [isInitialLoad, setIsInitialLoad] = useState(true);
const [currentUser, setCurrentUser] = useState(getCurrentUser());

// Complex polling logic
useEffect(() => {
  refreshSession();
  const interval = setInterval(refreshSession, 2000);
  return () => clearInterval(interval);
}, [sessionId]);

// Sync selected answer
useEffect(() => {
  if (myAnswers.length > 0) {
    setSelectedAnswer(myAnswers[currentQuestionIndex]);
  }
}, [currentQuestionIndex, myAnswers]);

// Persist question index (with hack)
useEffect(() => {
  if (!isInitialLoad && session?.status === 'active') {
    updateCurrentQuestionAPI(sessionId, currentQuestionIndex);
  }
}, [currentQuestionIndex, isInitialLoad, session?.status, sessionId]);
```

**After:**
```tsx
const {
  session,
  currentQuestion,
  selectedAnswer,
  selectAnswer,
  nextQuestion,
} = useLiveSession(sessionId);

// That's it! All logic is in the state machine.
```

## Testing

### Testing the State Machine

```typescript
import { createActor } from 'xstate';
import { liveSessionMachine } from './live-session-machine';

describe('LiveSessionMachine', () => {
  it('should start in loading state', () => {
    const actor = createActor(liveSessionMachine, {
      input: { sessionId: 'test-id' },
    });

    expect(actor.getSnapshot().value).toBe('loading');
  });

  it('should transition to scheduled state for scheduled sessions', async () => {
    // Mock API response
    const mockSession = {
      id: 'test-id',
      status: 'scheduled',
      // ... other fields
    };

    const actor = createActor(liveSessionMachine, {
      input: { sessionId: 'test-id' },
    });

    actor.start();

    // Wait for loading to complete
    await waitFor(() => {
      expect(actor.getSnapshot().value).toBe('scheduled');
    });
  });

  it('should navigate between questions in active state', () => {
    const actor = createActor(liveSessionMachine, {
      input: { sessionId: 'test-id' },
    });

    actor.start();

    // Set to active state
    actor.send({ type: 'NEXT_QUESTION' });

    expect(actor.getSnapshot().context.currentQuestionIndex).toBe(1);
  });
});
```

### Testing the Hook

```typescript
import { renderHook, act } from '@testing-library/react';
import { useLiveSession } from './useLiveSession';

describe('useLiveSession', () => {
  it('should start in loading state', () => {
    const { result } = renderHook(() => useLiveSession('test-id'));

    expect(result.current.isLoading).toBe(true);
  });

  it('should navigate to next question', async () => {
    const { result } = renderHook(() => useLiveSession('test-id'));

    // Wait for loading
    await waitFor(() => {
      expect(result.current.isActive).toBe(true);
    });

    act(() => {
      result.current.nextQuestion();
    });

    expect(result.current.currentQuestionIndex).toBe(1);
  });
});
```

## Migration Guide

### Step 1: Install Dependencies

```bash
npm install xstate @xstate/react
```

### Step 2: Replace Component

```tsx
// Before
import LiveSession from '@/components/LiveSession';

// After
import LiveSessionXState from '@/components/LiveSessionXState';

// Usage is identical
<LiveSessionXState sessionId={sessionId} onExit={handleExit} />
```

### Step 3: Enable Inspector (Development)

```tsx
// app/providers.tsx
'use client';

import { createBrowserInspector } from '@statelyai/inspect';

if (process.env.NODE_ENV === 'development') {
  createBrowserInspector();
}
```

### Step 4: Test Thoroughly

1. Test all session states (scheduled, lobby, active, completed)
2. Test navigation (next, previous, direct)
3. Test answer submission
4. Test polling behavior
5. Test error handling
6. Test exit flow

### Step 5: Deploy

Once tested, replace the old component in production:

```tsx
// app/live-practice/page.tsx
import LiveSessionXState as LiveSession from '@/components/LiveSessionXState';
```

## Troubleshooting

### Inspector Not Showing

Make sure:
1. `@statelyai/inspect` is installed
2. Inspector is initialized before machines are created
3. `inspect: true` is passed to `useMachine`
4. You're in development mode

### State Not Updating

Check:
1. Events are being sent correctly
2. Guards are evaluating correctly
3. Actions are not throwing errors
4. Context is being updated in assign actions

### Polling Not Working

Verify:
1. `after` delays are configured correctly
2. State machine is reachable (not in final state)
3. Invoke actors are not blocking transitions
4. Network requests are succeeding

## Future Enhancements

- [ ] Add optimistic UI updates with rollback
- [ ] Add reconnection logic for network failures
- [ ] Add session expiry detection
- [ ] Add real-time updates (WebSocket) instead of polling
- [ ] Add progress persistence to localStorage
- [ ] Add analytics events on state transitions
- [ ] Add state machine visualization in admin panel
