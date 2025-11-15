# XState Live Practice - Quick Start

This guide will get you up and running with the XState implementation of Live Practice in 5 minutes.

## Installation

1. Install dependencies:

```bash
npm install xstate @xstate/react @statelyai/inspect
```

## Setup Inspector (Development)

2. Initialize the inspector in your root layout or providers:

```tsx
// app/providers.tsx or app/layout.tsx
import '@/lib/xstate-inspector'; // Auto-initializes in development

// Or manually:
import { initializeInspector } from '@/lib/xstate-inspector';

if (process.env.NODE_ENV === 'development') {
  initializeInspector();
}
```

## Usage

3. Use the new component:

```tsx
// app/live-practice/page.tsx
import LiveSessionXState from '@/components/LiveSessionXState';

export default function LivePracticePage() {
  return (
    <LiveSessionXState
      sessionId={sessionId}
      onExit={() => router.push('/live-practice')}
    />
  );
}
```

## Debugging

4. Open your app in the browser:

```bash
npm run dev
```

5. The XState Inspector will open automatically in development mode

6. As you interact with the app, you'll see:
   - Visual state diagram
   - Real-time state transitions
   - Event timeline
   - Context inspector

## Inspector Features

### Visual State Diagram
See the entire state machine visualized with your current state highlighted.

### Event Timeline
Every event sent to the machine is logged with:
- Event type
- Event payload
- Timestamp
- State before/after

### Context Inspector
See the current context (data) of the machine in real-time:
- session data
- currentQuestionIndex
- selectedAnswer
- myAnswers
- error state

### State History
Step backward/forward through the state history to understand how you got to the current state.

## Common Scenarios

### Scenario 1: User navigates to question 5

**In Inspector, you'll see:**
1. Event: `NEXT_QUESTION`
2. State: `active.idle` → `active.navigating`
3. Action: `goToNextQuestion`
4. Context: `currentQuestionIndex: 4 → 5`
5. Actor: `updateQuestionIndex` (persisting to server)
6. State: `active.navigating` → `active.idle`

### Scenario 2: User selects an answer

**In Inspector, you'll see:**
1. Event: `SELECT_ANSWER { answerIndex: 2 }`
2. State: `active.idle` → `active.submittingAnswer`
3. Action: `setSelectedAnswer`
4. Context: `selectedAnswer: null → 2`
5. Actor: `submitAnswer` (sending to server)
6. Context: `myAnswers: [..., 2]`
7. State: `active.submittingAnswer` → `active.idle`

### Scenario 3: Session transitions from lobby to active

**In Inspector, you'll see:**
1. Event: `SESSION_UPDATED { session: { status: 'active' } }`
2. State: `lobby` → `determineState`
3. Action: `updateSessionData`
4. Guard: `isActive` (evaluates to true)
5. State: `determineState` → `active.idle`

### Scenario 4: Debugging a race condition

**Before XState:**
- User navigates to question 5
- Polling overwrites it back to question 3
- No idea why this happened
- Can't reproduce

**After XState (in Inspector):**
1. See Event: `NEXT_QUESTION` at 12:34:56.123
2. See State: `active.navigating`
3. See Context: `currentQuestionIndex: 5`
4. See Event: `SESSION_UPDATED` at 12:34:57.456 (2 seconds later)
5. See Action: `updateSessionData`
6. See Context: `currentQuestionIndex: 5` (preserved!)
7. No race condition! ✅

## Testing

### Test the state machine directly:

```tsx
import { createActor } from 'xstate';
import { liveSessionMachine } from '@/lib/live-session-machine';

test('navigates to next question', () => {
  const actor = createActor(liveSessionMachine, {
    input: { sessionId: 'test' },
  });

  actor.start();

  // Set initial state
  actor.send({
    type: 'SESSION_LOADED',
    session: mockSession,
    myAnswers: [],
    currentQuestionIndex: 0,
  });

  // Navigate
  actor.send({ type: 'NEXT_QUESTION' });

  // Assert
  expect(actor.getSnapshot().context.currentQuestionIndex).toBe(1);
});
```

### Test the hook:

```tsx
import { renderHook, act } from '@testing-library/react';
import { useLiveSession } from '@/lib/hooks/useLiveSession';

test('hook provides navigation actions', async () => {
  const { result } = renderHook(() => useLiveSession('test-id'));

  await waitFor(() => {
    expect(result.current.isActive).toBe(true);
  });

  act(() => {
    result.current.nextQuestion();
  });

  expect(result.current.currentQuestionIndex).toBe(1);
});
```

## Troubleshooting

### Inspector not showing?

Check:
- [ ] `@statelyai/inspect` is installed
- [ ] Inspector is initialized before machines
- [ ] You're in development mode
- [ ] Browser allows pop-ups

### State not updating?

Check:
- [ ] Events are being sent correctly
- [ ] Guards evaluate to true
- [ ] Actions don't throw errors
- [ ] Network requests succeed

### Polling not working?

Check:
- [ ] `after` delays are configured (2000ms)
- [ ] Machine is not in final state
- [ ] Invoke actors return successfully
- [ ] Network is available

## Next Steps

- Read [live-session-xstate.md](./live-session-xstate.md) for detailed documentation
- Read [live-session-comparison.md](./live-session-comparison.md) for before/after comparison
- Explore the state machine file: `/lib/live-session-machine.ts`
- Try the inspector on your local dev environment

## Resources

- [XState Documentation](https://xstate.js.org/docs/)
- [XState Inspector](https://stately.ai/docs/inspector)
- [XState React](https://xstate.js.org/docs/packages/xstate-react/)
- [Stately.ai Visualizer](https://stately.ai/viz)

## Support

If you have questions:
1. Check the [XState docs](https://xstate.js.org/docs/)
2. Check the state machine file comments
3. Use the inspector to debug
4. Ask the team!
