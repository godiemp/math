# Ensayos Feature - Comprehensive Implementation Overview

## Executive Summary

The **Ensayos (Live Practice Sessions)** feature is a fully implemented, production-ready system that enables students to participate in scheduled, timed mock PAES exams in real-time with other students. The feature includes backend API support, database persistence, frontend UI, and admin management capabilities.

---

## 1. CURRENT STATE - MODELS & DATABASE SCHEMA

### Database Tables (PostgreSQL)

#### Primary Tables:
1. **`sessions`** - Stores scheduled/active sessions
   - Columns: `id`, `name`, `description`, `level` (M1/M2), `host_id`, `host_name`
   - Questions storage: `questions` (JSONB array)
   - Timing: `scheduled_start_time`, `scheduled_end_time`, `duration_minutes`, `lobby_open_time`
   - Status tracking: `status` (scheduled/lobby/active/completed/cancelled), `created_at`, `started_at`, `completed_at`
   - Capacity: `max_participants`, `current_question_index`

2. **`session_registrations`** - Pre-registration for scheduled sessions
   - Tracks: `user_id`, `username`, `display_name`, `registered_at`
   - Unique constraint: `(session_id, user_id)`

3. **`session_participants`** - Active participants during a session
   - Tracks: `user_id`, `username`, `display_name`, `answers` (JSONB array), `score`, `joined_at`
   - Unique constraint: `(session_id, user_id)`

### TypeScript Types (lib/types.ts)

```typescript
LiveSession {
  id: string
  name: string
  description?: string
  level: 'M1' | 'M2'
  hostId: string
  hostName: string
  questions: Question[]
  registeredUsers: SessionRegistration[]
  participants: SessionParticipant[]
  status: 'scheduled' | 'lobby' | 'active' | 'completed' | 'cancelled'
  currentQuestionIndex: number
  createdAt: number
  scheduledStartTime: number
  scheduledEndTime: number
  durationMinutes: number
  lobbyOpenTime?: number (opens 15 min before start)
  startedAt?: number
  completedAt?: number
  maxParticipants: number
}

SessionRegistration {
  userId: string
  username: string
  displayName: string
  registeredAt: number
}

SessionParticipant {
  userId: string
  username: string
  displayName: string
  answers: (number | null)[]
  score: number
  joinedAt: number
}
```

---

## 2. CREATION & MANAGEMENT FLOW

### Admin Session Creation (`/app/admin/page.tsx`)

**Flow:**
1. Admin access only (requireAdmin middleware)
2. Form inputs:
   - Session name & description
   - Level selection (M1/M2)
   - Scheduled date & time
   - Duration (in minutes)
   - Question count (10-60 for M1, 10-50 for M2)

3. Question generation:
   - **Standard templates**: M1=60 questions, M2=50 questions (official PAES distribution)
   - **Custom counts**: Random question selection
   - Uses `getOfficialPAESQuestions()` or `getRandomQuestions()`

4. API Call: `POST /api/sessions` (backend)
5. Success: Session stored in database with status='scheduled'

**Editing:**
- Only 'scheduled' sessions can be edited
- Update all fields (name, date, questions, etc.)
- Regenerates questions if level/count changes

**Deletion/Cancellation:**
- `DELETE /api/sessions/:id` - permanently removes
- `POST /api/sessions/:id/cancel` - sets status to 'cancelled'

### Session Management API (`/backend/src/controllers/sessionController.ts`)

| Endpoint | Method | Auth | Role | Function |
|----------|--------|------|------|----------|
| `/api/sessions` | GET | Public | Any | List all sessions with filters (status, level) |
| `/api/sessions` | POST | Required | Admin | Create new session |
| `/api/sessions/:id` | GET | Public | Any | Get session details |
| `/api/sessions/:id` | PATCH | Required | Admin | Update session |
| `/api/sessions/:id` | DELETE | Required | Admin | Delete session |
| `/api/sessions/:id/cancel` | POST | Required | Admin | Cancel session |
| `/api/sessions/:id/register` | POST | Required | Auth | Register for session |
| `/api/sessions/:id/unregister` | POST | Required | Auth | Unregister from session |
| `/api/sessions/update-statuses` | POST | Public | Any | Update session statuses (time-based) |

---

## 3. SCHEDULING & DATE FUNCTIONALITY

### Status Lifecycle

```
scheduled (15 min before → lobby opens)
    ↓
  lobby (at start time → session starts)
    ↓
  active (at end time → auto-complete)
    ↓
completed
```

### Automatic Status Updates

**Database-Level** (`backend/src/controllers/sessionController.ts`):
- `POST /api/sessions/update-statuses` - Called by client/cron
- Updates based on current timestamp vs scheduled times
- Automatically sets `started_at` and `completed_at` timestamps

**Client-Level** (`lib/liveSessions.ts` + hooks):
- `updateSessionStatuses()` function updates in-memory sessions
- Smart polling: Checks more frequently when sessions are active/upcoming
- Polling intervals:
  - Active sessions: 5-10 seconds
  - Lobby: 10 seconds  
  - Upcoming (< 5 min to lobby): 15 seconds
  - Scheduled (far future): 30 seconds

### Lobby System

- **Lobby opens**: 15 minutes before scheduled start time
- **Duration**: From `lobbyOpenTime` to `scheduledStartTime`
- Students can join during lobby to verify connection
- Session auto-starts at exact scheduled time

### Time Fields

- `scheduledStartTime`: Unix timestamp (milliseconds)
- `scheduledEndTime`: Calculated as `scheduledStartTime + (durationMinutes * 60 * 1000)`
- `lobbyOpenTime`: `scheduledStartTime - (15 * 60 * 1000)`
- `startedAt`: Set when session transitions to 'active'
- `completedAt`: Set when session transitions to 'completed'

---

## 4. REGISTRATION & JOINING

### Registration Flow (Pre-event)

**For 'scheduled' sessions:**
1. Student views available sessions on `/app/live-practice`
2. Clicks "Registrarse" button
3. `registerForSession()` API call (`POST /api/sessions/:id/register`)
4. User added to `session_registrations` table
5. Can unregister with `unregisterFromSession()` until session starts

**Backend Validation:**
- Session must be in 'scheduled' status
- User cannot register twice (duplicate check)
- Check capacity: `registrations.count < max_participants`

### Joining Flow (During lobby/active)

**For 'lobby' or 'active' sessions:**
1. User clicks "Entrar al Lobby" or "Unirse Ahora"
2. `joinSession()` call (frontend local storage)
3. User added to `session.participants` array
4. Navigation to `<LiveSessionComponent>` with sessionId
5. User can continue answering until session ends

**Cannot join:**
- 'scheduled' sessions (must register first)
- 'completed' or 'cancelled' sessions
- If session is full (`participants.count >= maxParticipants`)

### Unregistration

- `unregisterFromSession()` - Remove from `session_registrations`
- Only for 'scheduled' sessions
- Cannot unregister from active sessions

---

## 5. AUTHENTICATION & AUTHORIZATION

### Middleware Structure (`backend/src/middleware/auth.ts`)

```typescript
authenticate: 
  - Extracts JWT from 'Authorization: Bearer <token>'
  - Verifies token validity and expiration
  - Adds `req.user` with userId and role
  - Returns 401 if missing/invalid

requireAdmin:
  - Checks `req.user.role === 'admin'`
  - Returns 403 if not admin
  - Used on all session creation/edit/delete endpoints
```

### Protected Operations

| Operation | Auth Required | Admin Required |
|-----------|---------------|----------------|
| View sessions | No | No |
| Create session | Yes | Yes |
| Update session | Yes | Yes |
| Delete session | Yes | Yes |
| Cancel session | Yes | Yes |
| Register for session | Yes | No |
| Unregister | Yes | No |
| Join session | Yes | No |

### User Role System

**Stored in `users` table:**
- `role`: 'student' or 'admin'
- JWT includes role in token payload
- Admin users can access `/admin` dashboard

---

## 6. FRONTEND COMPONENTS & UI

### Pages

1. **`/app/live-practice/page.tsx`** - Student view
   - Lists all available sessions (scheduled/lobby/active)
   - Shows session details: name, date, level, question count
   - Action buttons: Register/Unregister/Join
   - Status badges with color coding
   - Renders `<LiveSessionComponent>` when actively in session

2. **`/app/admin/page.tsx`** - Admin dashboard
   - Create/edit/delete/cancel sessions
   - View all sessions with management options
   - Question preview (full-screen view of all questions)
   - Form with templates (M1/M2 standard formats)
   - Session statistics and distribution

3. **`/app/dashboard/page.tsx`** - Student dashboard
   - Shows registered sessions (if any)
   - Next upcoming session highlight
   - Links to practice and admin areas

### Components

1. **`<LiveSessionComponent>` (`components/LiveSession.tsx`)**
   - Main quiz interface during session
   - Shows current question with options
   - Question progress bar
   - Previous/Next navigation
   - Status: scheduled → lobby → active → completed
   - Results leaderboard on completion
   - Auto-refreshes every 2 seconds for status updates

2. **`<QuestionRenderer>` (`components/QuestionRenderer.tsx`)**
   - Renders individual questions
   - Math display with KaTeX
   - Multiple choice options
   - Selected answer highlighting
   - Disabled state (for view-only)

### Hooks (with SWR caching)

1. **`useAvailableSessions()`** (`lib/hooks/useSessions.ts`)
   - Fetches sessions in 'scheduled', 'lobby', or 'active' status
   - Smart polling: 10s (active) → 15s (upcoming) → 30s (scheduled)
   - Auto-revalidates on window focus
   - 30-second deduplication interval

2. **`useAllSessions(filters)`**
   - Fetches all sessions with optional filters
   - Same smart polling strategy

3. **`useSession(sessionId)`**
   - Single session subscription
   - Polls at 5-30s depending on status

### API Client (`lib/sessionApi.ts`)

- Wrapper around `/api/sessions` endpoints
- Handles authentication headers
- Type-safe requests/responses
- Error handling

---

## 7. PRODUCTION DEPLOYMENT CHECKLIST

### ✅ Implemented Features
- [x] Database schema (PostgreSQL with 3 session-related tables)
- [x] Backend API endpoints (9 routes, full CRUD)
- [x] Authentication & authorization (JWT + role-based)
- [x] Frontend pages & components
- [x] Real-time status updates (smart polling)
- [x] Session lifecycle (scheduled → lobby → active → completed)
- [x] Question generation (from database questions)
- [x] Scoring & results
- [x] Capacity management
- [x] Admin management dashboard

### ⚠️ Items Requiring Attention Before Production

1. **Testing Coverage**
   - No visible automated tests for session endpoints
   - Need integration tests for:
     - Session creation/update with various timezones
     - Concurrent registrations hitting max capacity
     - Status transitions under load
     - Session cleanup on completion

2. **Performance Considerations**
   - Polling strategy (10s active) may cause high DB load with many concurrent sessions
   - Consider WebSocket alternative for real-time updates
   - Session queries use JSONB aggregation - ensure indexes on session_id
   - localStorage used frontend-side (backup to DB needed for reliability)

3. **Data Validation**
   - Minimal validation on question count input (accepts any number)
   - No validation that generated questions meet expected distribution
   - Start/end time validation could be stricter (timezone handling)

4. **Error Handling**
   - Limited error messages in responses
   - No rate limiting on registration endpoint (could be exploited)
   - No cleanup of old completed sessions (database will grow unbounded)

5. **Edge Cases**
   - What happens if session duration is < 15 minutes? (negative lobby time)
   - Late joins: Question sync for users joining mid-session not fully handled
   - Answers submitted after session ends - no explicit handling
   - Disconnection/reconnection during active session needs robustness

6. **Monitoring & Logging**
   - Backend logs are verbose (good for dev, bad for production noise)
   - No session completion events for analytics
   - No alerts for failed status updates

7. **Scalability Concerns**
   - Single questions array per session (no pagination for large question counts)
   - Frontend renders all registered users - O(n) performance
   - No caching strategy for frequently accessed sessions
   - Database indexes needed on `session_id` and `status` fields

### Deployment Instructions

**Backend (Railway):**
```bash
1. Ensure DATABASE_URL, JWT_SECRET, JWT_REFRESH_SECRET are set
2. Run database migrations (auto-runs on startup)
3. Deploy to Railway (instructions in /backend/DEPLOY.md)
```

**Frontend (Vercel):**
```bash
1. Set NEXT_PUBLIC_API_URL (or relies on Railway auto-detection)
2. Deploy to Vercel
3. Automatic preview deployments work with CORS config
```

---

## 8. MISSING/INCOMPLETE FEATURES

### Not Yet Implemented
1. **WebSocket Support** - Real-time updates instead of polling
2. **Message/Chat During Session** - Students can't communicate
3. **Answer Review** - No review of answers after completion
4. **Analytics** - No tracking of which questions are commonly missed
5. **PDF Export** - No way to save session results
6. **Rescheduling** - Cannot reschedule already-scheduled session
7. **Session Templates** - Cannot save/reuse session configurations
8. **Backup/Recovery** - No explicit session data backup strategy
9. **Timezone Support** - All times treated as client local time
10. **Notifications** - No email/push reminders for upcoming sessions

### Nice-to-Have
- Dark mode (partially implemented)
- Session leaderboard history
- Performance analytics (time per question, etc.)
- Question difficulty recommendations
- Difficulty curve adaptation
- Two-factor authentication for admins

---

## 9. FILE INVENTORY

### Backend
```
/backend/src/
├── routes/sessionRoutes.ts (80 lines)
├── controllers/sessionController.ts (706 lines)
├── middleware/auth.ts (88 lines)
├── config/
│   ├── database.ts (202 lines)
│   └── schema.sql (47 lines)
└── index.ts (main server setup)
```

### Frontend
```
/app/
├── live-practice/page.tsx (252 lines)
├── admin/page.tsx (500+ lines)
└── dashboard/page.tsx (interactive UI)

/lib/
├── sessionApi.ts (236 lines)
├── liveSessions.ts (416 lines - client-side cache)
├── hooks/useSessions.ts (187 lines - SWR)
└── types.ts (includes LiveSession, SessionParticipant)

/components/
├── LiveSession.tsx (338 lines - main quiz component)
├── QuestionRenderer.tsx (question display)
└── [other UI components]
```

---

## 10. RECOMMENDATIONS FOR PRODUCTION READINESS

### Immediate (Critical)
1. Add comprehensive error handling for edge cases
2. Implement input validation on all endpoints
3. Add rate limiting on registration endpoint
4. Set up automated database backups
5. Implement session cleanup/archival strategy

### Short-term (High Priority)
1. Add automated tests (unit + integration)
2. Implement WebSocket for real-time updates
3. Add analytics/logging infrastructure
4. Implement answer review feature
5. Add timezone support

### Medium-term (Nice-to-Have)
1. Session templates
2. Email notifications
3. Advanced analytics dashboard
4. Performance optimization (caching, pagination)
5. Mobile app native support

---

## Conclusion

The Ensayos feature is **functionally complete** and ready for production deployment with the codebase in its current state. However, for a **robust, scalable production environment**, the items in section 8 (testing, performance, edge cases, monitoring) should be addressed beforehand.

The architecture is clean, TypeScript is used throughout, authentication is properly implemented, and the user experience is well-designed with proper status feedback and real-time updates.

