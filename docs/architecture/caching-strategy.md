# Data Caching Strategy

## Overview

This document describes our approach to data fetching and caching for the live sessions (ensayos) feature.

## Problem Statement

Initially, the application used a simple polling approach:
- **Old Approach**: Fetch data from API every 3-5 seconds using `setInterval`
- **Issues**:
  - High number of network requests (12-20 per minute)
  - No caching - data reloaded from scratch on every page refresh
  - Same polling frequency regardless of whether data changes were expected
  - Poor user experience on page reload (blank screen while loading)

## Solution: SWR with localStorage Persistence

We implemented SWR (stale-while-revalidate) with localStorage persistence for optimal performance and user experience.

### Key Components

#### 1. SWR Library (`swr`)
- Industry-standard React hooks library for data fetching
- Provides automatic caching, deduplication, and revalidation
- Used by major companies (Vercel, Netflix, etc.)

#### 2. Custom Hooks (`lib/hooks/useSessions.ts`)

Three custom hooks wrapping SWR:

```typescript
// Fetch all available sessions (scheduled, lobby, active)
const { sessions, isLoading, error, refresh } = useAvailableSessions();

// Fetch all sessions with optional filters
const { sessions, isLoading, error, refresh } = useAllSessions({ status: 'active' });

// Fetch single session by ID
const { session, isLoading, error, refresh } = useSession(sessionId);
```

#### 3. localStorage Cache Provider (`lib/swr-config.tsx`)

Custom SWR provider that persists cache to localStorage:
- Saves cache to localStorage before page unload
- Restores cache on page load
- Provides instant data display on page refresh

#### 4. Root Layout Integration (`app/layout.tsx`)

SWRProvider wraps the entire application:

```tsx
<SWRProvider>
  <AuthProvider>
    {children}
  </AuthProvider>
</SWRProvider>
```

## Benefits

### 1. Instant Page Loads
- **Before**: Blank screen while fetching data (~500ms-2s)
- **After**: Cached data shows instantly, fresh data loads in background

### 2. Reduced Network Traffic
- **Before**: 12-20 requests per minute (every 3-5 seconds)
- **After**: Adaptive polling based on session state:
  - Active/lobby sessions: 10 seconds (6 requests/min)
  - Sessions starting soon: 15 seconds (4 requests/min)
  - Scheduled sessions far in future: 30 seconds (2 requests/min)
  - No sessions: 30 seconds (2 requests/min)

**Network reduction: ~50-70%**

### 3. Request Deduplication
If multiple components request the same data simultaneously, SWR makes only 1 network request and shares the result.

### 4. Smart Revalidation
- Automatically revalidates when user refocuses the browser tab
- Revalidates on mount to ensure data is fresh
- Background revalidation keeps data up-to-date without blocking UI

### 5. Better Error Handling
- Built-in retry logic (3 retries with 5s intervals)
- Previous data remains visible during errors
- Error states properly exposed to components

## Implementation Details

### Adaptive Polling Strategy

The polling interval adjusts based on when session status changes are expected:

```typescript
refreshInterval: (latestData) => {
  const now = Date.now();
  const hasActiveSessions = latestData.some(s => s.status === 'active' || s.status === 'lobby');
  const hasUpcomingSessions = latestData.some(
    s => s.status === 'scheduled' && s.lobbyOpenTime - now < 5 * 60 * 1000
  );

  if (hasActiveSessions) {
    return 10000; // 10 seconds - active sessions need frequent updates
  } else if (hasUpcomingSessions) {
    return 15000; // 15 seconds - session starting soon
  } else {
    return 30000; // 30 seconds - scheduled sessions far in future
  }
}
```

### Cache Configuration

```typescript
{
  // Don't make duplicate requests within 30 seconds
  dedupingInterval: 30000,

  // Revalidate when user comes back to tab
  revalidateOnFocus: true,

  // Show cached data while fetching fresh data
  keepPreviousData: true,

  // Always revalidate on component mount
  revalidateOnMount: true,

  // Retry failed requests
  errorRetryCount: 3,
  errorRetryInterval: 5000,
}
```

### localStorage Persistence

The cache persists across page reloads:

1. **On page load**: Restore cache from localStorage
2. **During session**: Keep cache in memory (Map)
3. **Before unload**: Save cache to localStorage

This ensures users see cached data immediately on page refresh.

## Usage Examples

### Admin Page
```typescript
function AdminBackofficeContent() {
  const { sessions, isLoading, refresh } = useAvailableSessions();

  // Sessions load instantly from cache
  // Fresh data loads in background
  // Manual refresh after mutations
  const handleDelete = async (sessionId) => {
    await deleteSession(sessionId);
    await refresh(); // Trigger immediate revalidation
  };
}
```

### Live Practice Page
```typescript
function LivePracticePageContent() {
  const { sessions, isLoading, error, refresh } = useAvailableSessions();

  // Cached data shows immediately
  // Auto-refreshes based on session states
  const handleRegister = async (sessionId) => {
    await registerForSession(sessionId, currentUser);
    await refresh(); // Update cache with new registration
  };
}
```

## Performance Metrics

### Network Requests (1 hour)

| Scenario | Old Approach | New Approach | Reduction |
|----------|-------------|--------------|-----------|
| Active sessions | 720 requests | 360 requests | 50% |
| Scheduled sessions (far) | 720 requests | 120 requests | 83% |
| No sessions | 720 requests | 120 requests | 83% |

### User Experience

| Metric | Old | New | Improvement |
|--------|-----|-----|-------------|
| Time to first data | 500-2000ms | 0ms (cached) | Instant |
| Page refresh UX | Loading spinner | Instant data | Much better |
| Tab refocus | Stale data | Fresh data | Auto-sync |

## Monitoring & Debugging

Console logs help track SWR behavior:

```
🔄 SWR: Fetching available sessions...
✅ SWR: Fetched sessions: 3
✅ SWR Success: 3 sessions
```

Errors are logged:
```
❌ SWR Error fetching sessions: [error details]
❌ useAvailableSessions error: [error details]
```

## Future Optimizations

1. **Optimistic Updates**: Update UI immediately before API confirms
2. **Pagination**: For large session lists
3. **WebSocket Integration**: Real-time updates instead of polling
4. **Service Worker Cache**: Offline support
5. **Cache Invalidation**: Smart cache busting based on mutations

## Related Files

- `lib/hooks/useSessions.ts` - Custom SWR hooks
- `lib/swr-config.tsx` - SWR provider with localStorage
- `lib/sessionApi.ts` - API client functions
- `app/admin/page.tsx` - Admin page using hooks
- `app/live-practice/page.tsx` - Student page using hooks

## References

- [SWR Documentation](https://swr.vercel.app/)
- [Stale-While-Revalidate Pattern](https://web.dev/stale-while-revalidate/)
- [React Query vs SWR Comparison](https://react-query.tanstack.com/comparison)
