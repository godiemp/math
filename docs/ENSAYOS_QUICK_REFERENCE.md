# Ensayos Feature - Quick Reference Guide

## Key Files

### Backend
- **Session Routes**: `/backend/src/routes/sessionRoutes.ts`
- **Session Controller**: `/backend/src/controllers/sessionController.ts` (706 lines, 9 API endpoints)
- **Database Schema**: `/backend/src/config/database.ts` (auto-initializes 3 tables)
- **Authentication**: `/backend/src/middleware/auth.ts`

### Frontend
- **Live Practice Page**: `/app/live-practice/page.tsx` (student view)
- **Admin Dashboard**: `/app/admin/page.tsx` (create/manage sessions)
- **Dashboard**: `/app/dashboard/page.tsx` (show registered sessions)
- **Live Session Component**: `/components/LiveSession.tsx` (main quiz UI)
- **Session API Client**: `/lib/sessionApi.ts` (API wrappers)
- **Session Hooks**: `/lib/hooks/useSessions.ts` (SWR caching with smart polling)
- **Session Utilities**: `/lib/liveSessions.ts` (client-side session management)
- **Types**: `/lib/types.ts` (LiveSession, SessionRegistration, SessionParticipant)

## Database Schema

### Tables
```sql
sessions (id PK, host_id FK→users)
session_registrations (session_id FK, user_id FK, unique constraint)
session_participants (session_id FK, user_id FK, unique constraint)
```

### Key Fields
- `session.status`: 'scheduled' | 'lobby' | 'active' | 'completed' | 'cancelled'
- `session.questions`: JSONB array of Question objects
- `session.scheduledStartTime`: Unix timestamp (milliseconds)
- `session_registrations`: Pre-registered students
- `session_participants`: Active participants with answers array

## API Endpoints

### Public (No Auth)
```
GET    /api/sessions                        # List all sessions
GET    /api/sessions/:id                    # Get session details
POST   /api/sessions/update-statuses        # Update session statuses by time
```

### Authenticated (Any User)
```
POST   /api/sessions/:id/register           # Register for session
POST   /api/sessions/:id/unregister         # Unregister from session
```

### Admin Only
```
POST   /api/sessions                        # Create session
PATCH  /api/sessions/:id                    # Update session
DELETE /api/sessions/:id                    # Delete session
POST   /api/sessions/:id/cancel             # Cancel session
```

## Session Lifecycle

```
Scheduled (status='scheduled')
  ↓ (at lobbyOpenTime, 15 min before start)
Lobby (status='lobby')
  ↓ (at scheduledStartTime)
Active (status='active')
  ↓ (at scheduledEndTime)
Completed (status='completed')
```

## Frontend Flows

### Admin Creates Session
1. Admin goes to `/admin`
2. Fills form: name, level, date/time, duration, question count
3. Optionally uses M1/M2 templates (pre-fills form)
4. Clicks "Create" → POST `/api/sessions`
5. Questions auto-generated based on level/count

### Student Registers
1. Student goes to `/live-practice`
2. Sees available sessions
3. For 'scheduled' sessions: clicks "Registrarse"
4. POST `/api/sessions/:id/register`
5. Shows up in session's `registeredUsers`

### Student Joins
1. When session reaches 'lobby' status
2. Student sees "Entrar al Lobby" button
3. Clicks → joins session (stored in `participants`)
4. Rendered with `<LiveSessionComponent>`

### During Active Session
1. User sees current question + options
2. Selects answer → auto-saved to `participants[i].answers`
3. Can navigate prev/next questions
4. Score calculated when time runs out

## Smart Polling Strategy

Used in `useAvailableSessions()` and `useSession()`:

| Session Status | Poll Interval | Reason |
|---|---|---|
| active | 5-10s | Real-time feedback |
| lobby | 10s | Monitor for start |
| scheduled (< 5 min to lobby) | 15s | Approaching action point |
| scheduled (far future) | 30s | No urgency |
| completed/cancelled | 30s | No changes |

## Authentication

### Flow
1. User logs in → receives JWT access + refresh tokens
2. Tokens stored in localStorage
3. Each API request includes: `Authorization: Bearer <token>`
4. Backend verifies JWT signature and expiration
5. Token includes: `userId`, `role` ('student' or 'admin')

### Protected Resources
- Session create/edit/delete: requires admin role
- Register/join/unregister: requires authenticated user
- View sessions: public (no auth needed)

## Key Implementation Details

### Status Updates (Auto)
- Client calls `updateSessionStatuses()` before fetching
- Backend has `/update-statuses` endpoint
- Checks `now >= lobbyOpenTime` → status='lobby'
- Checks `now >= scheduledStartTime` → status='active'
- Checks `now >= scheduledEndTime` → status='completed' (calculates scores)

### Question Generation
```typescript
// Official PAES distribution
getOfficialPAESQuestions('M1')  // 60 questions with official ratios
getOfficialPAESQuestions('M2')  // 50 questions

// Custom counts
getRandomQuestions('M1', 25)    // Random 25 questions from M1 pool
```

### Scoring
- Auto-calculated when session completes
- Each correct answer = 1 point
- Score = count of correct answers
- Results shown as: `score/totalQuestions` and percentage

### Lobby System
- Opens 15 minutes before scheduled start
- Users join and verify connection
- Can leave and rejoin until session starts
- Auto-starts at exact scheduled time
- Cannot join after it transitions to 'active'

## Error Handling

### Common Errors
```
401: Not authenticated (no token/invalid token)
403: Not authorized (not admin for admin-only routes)
400: Bad request (missing required fields)
404: Resource not found (session doesn't exist)
409: Conflict (already registered, session full)
```

### Validation
- Session must be in correct status for action
- Cannot register twice
- Cannot join scheduled session (must register first)
- Cannot unregister from active session
- Max participants capacity check

## Deployment

### Environment Variables Needed
```
DATABASE_URL=postgresql://...
JWT_SECRET=<random-32-char-base64>
JWT_REFRESH_SECRET=<random-32-char-base64>
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

### Database
- Auto-initializes on server startup
- Creates tables if they don't exist
- Migrations handled in `initializeDatabase()`

### CORS
- Allows all Vercel preview deployments (*.vercel.app)
- Allows specified FRONTEND_URL
- Allows localhost:3000 for development

## Testing Checklist

For production readiness, test:
- [ ] Create session with M1 and M2 levels
- [ ] Update session time (check status transitions)
- [ ] Register/unregister during scheduled period
- [ ] Join at lobby opening (15 min before)
- [ ] Session auto-starts at scheduled time
- [ ] Answer submission and scoring
- [ ] Session completion and leaderboard
- [ ] Late joins don't break anything
- [ ] Admin operations require auth
- [ ] Max participants limit enforced
- [ ] Status updates work across browser tabs
- [ ] Session cleanup after completion

## Common Issues & Solutions

### Issue: Session not transitioning from scheduled to lobby
**Solution**: Call `POST /api/sessions/update-statuses` or check that client polling is running

### Issue: User can't register for session
**Possible causes**:
- Session not in 'scheduled' status (already started)
- Already registered (check registeredUsers)
- Session full (registeredUsers.length >= max_participants)

### Issue: Polling not updating in real-time
**Check**: Browser console for SWR logs, verify polling interval matches session status

### Issue: Answers not persisting
**Check**: User is in participants array, answers array has correct length

---

## For Production Deployment

See `/docs/ENSAYOS_FEATURE_ANALYSIS.md` section 7 for:
- Testing coverage needs
- Performance considerations
- Data validation improvements
- Error handling enhancements
- Edge case handling
- Monitoring setup
- Scalability concerns

