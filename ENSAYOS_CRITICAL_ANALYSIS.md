# ENSAYOS FEATURE - CRITICAL ANALYSIS REPORT

## Status: NOT PRODUCTION-READY - COMPLETE FAILURE ANALYSIS

This document contains a comprehensive trace through the ensayos feature user journeys, identifying specific critical failures that will occur in real usage.

---

## EXECUTIVE SUMMARY

The ensayos (live practice sessions) feature has a **fundamental architectural flaw**: it maintains TWO separate, completely unsynchronized storage systems:

1. **Backend API + PostgreSQL** - Used by admin to create sessions
2. **Client-side localStorage** - Used by students to join and participate

These systems are never synced. This causes **TOTAL FAILURE** of the student journey.

**Result:** Students can see sessions created by admins but CANNOT join them. All answers are lost. The feature is fundamentally broken.

---

## CRITICAL FAILURES THAT WILL HAPPEN

### FAILURE #1: STUDENTS CANNOT JOIN SESSIONS (CRITICAL - GUARANTEED)

**The Problem:**
- Admin creates session → Stored in PostgreSQL ✓
- Student sees session in list → Fetched from API ✓
- Student clicks "Entrar al Lobby" → Tries to read from localStorage ✗
- Session not in localStorage → Returns error "Ensayo no encontrado"

**Code Path:**
```
/app/live-practice/page.tsx line 55:
  const result = joinSession(sessionId, currentUser);
                    ↓ (calls /lib/liveSessions.ts function, NOT API)
/lib/liveSessions.ts line 81-91:
  export function joinSession(sessionId, user) {
    const sessions = getAllSessions(); // ← reads from localStorage
    const sessionIndex = sessions.findIndex(s => s.id === sessionId);
    if (sessionIndex === -1) {
      return { success: false, error: 'Ensayo no encontrado' }; // ← FAILS HERE
    }
  }
```

**Impact:** NO STUDENT CAN EVER JOIN ANY SESSION

---

### FAILURE #2: ALL STUDENT ANSWERS ARE LOST (CRITICAL)

**The Problem:**
- Student answers question → Saved to localStorage ONLY
- No backend endpoint exists for submitting answers
- Page refresh or session ends → Answers deleted forever

**Evidence:**
- `/backend/src/routes/sessionRoutes.ts` - NO endpoint for `/api/sessions/:id/participants/:userId/answers`
- `/lib/sessionApi.ts` - NO submitAnswer() function exists
- `/lib/liveSessions.ts` line 157 - Only saves to localStorage

```typescript
export function submitAnswer(sessionId, userId, questionIndex, answer) {
  const sessions = getAllSessions();
  // ... find participant ...
  participant.answers[questionIndex] = answer;
  sessions[sessionIndex] = session;
  saveSessions(sessions); // ← localStorage.setItem() only!
  // NO API call, NO database update
}
```

**Impact:** 100% DATA LOSS of all student responses

---

### FAILURE #3: PAGE REFRESH DURING ACTIVE SESSION (CRITICAL)

**The Problem:**
- Student in session, page refreshes (network hiccup, F5 key)
- Component tries to load session from localStorage
- Session never synced to localStorage (see Failure #1)
- Component shows "Cargando sesión..." forever
- User cannot recover

**Code:**
```typescript
// LiveSessionComponent.tsx line 16-24
const [currentUser] = useState(getCurrentUser()); // ✓ Works
const refreshSession = () => {
  updateSessionStatuses(); // ← Updates localStorage
  const updatedSession = getSession(sessionId); // ← Reads from localStorage, NOT API
  if (updatedSession) {
    setSession(updatedSession);
  } // If null, component stuck loading forever
};
```

**No API fallback to fetch session from backend!**

**Impact:** Any accidental page refresh = permanent loss of session

---

### FAILURE #4: RACE CONDITION - SESSION OVERBOOKING (HIGH)

**The Problem:**
- Create session with maxParticipants=1
- Two students click "Registrarse" simultaneously
- Both registrations succeed
- Database has 2 registrations for capacity 1

**Code Problem:**
```typescript
// sessionController.ts lines 597-613
const countResult = await pool.query(
  'SELECT COUNT(*) as count FROM session_registrations WHERE session_id = $1',
  [id]
);
if (parseInt(countResult.rows[0].count) >= max_participants) {
  res.status(400).json({ error: 'Session is full' });
  return; // ← Time window here!
}
// Another user could register between COUNT and INSERT
await pool.query(
  'INSERT INTO session_registrations (...) VALUES (...)'
);
```

**No transaction lock, no atomic check-and-insert**

**Impact:** Overbooking of sessions

---

### FAILURE #5: SESSION CANCELLATION - USER NEVER NOTIFIED (HIGH)

**The Problem:**
- Admin clicks "Cancelar"
- Session status → 'cancelled' in database
- User waiting in lobby: sees nothing
- 10-30 seconds later (on next poll): session disappears
- User confused, wasted time waiting

**Why No Notification:**
- No WebSocket or real-time push
- Frontend polling every 10-30 seconds (useSessions.ts)
- No explicit "Session Cancelled" message
- Silent disappearance from UI

**Impact:** Poor user experience, confusion

---

### FAILURE #6: SESSION AUTO-START UNRELIABLE (HIGH)

**The Problem:**
- Backend has no server-side timer
- Only updates when client calls POST `/api/sessions/update-statuses`
- Frontend polls every 2-30 seconds
- If no one polling: session never auto-starts
- If polling: 2-30 second delay from scheduled time

**Code:**
```typescript
// sessionController.ts line 666
export const updateSessionStatuses = async (req: Request, res: Response) => {
  // Only runs when someone POSTs to this endpoint
  // No server-side timer calls this!
};
```

**Impact:** Unreliable session transitions

---

### FAILURE #7: DATA LOST ON BROWSER CLOSE (CRITICAL)

**The Problem:**
- User answers 30 questions
- Browser crashes, tab closed, or user closes window
- localStorage deleted
- All answers lost forever
- Cannot rejoin (Failure #1)
- No backend record

**Impact:** Complete data loss

---

### FAILURE #8: TIMEZONE CONFUSION (MEDIUM)

**The Problem:**
```
Admin in Chile (UTC-3): Creates session for "15:00"
Student in USA (UTC-5): Sees "13:00" in their browser
```

**Code:**
```typescript
// live-practice/page.tsx line 181
new Date(session.scheduledStartTime).toLocaleString('es-CL')
// Uses browser's timezone, hardcoded es-CL locale
```

The timestamp is stored correctly (epoch), but displayed with wrong context.

**Impact:** Students join at wrong times or miss sessions

---

### FAILURE #9: DISCONNECT/RECONNECT LOSES SYNC (CRITICAL)

**The Problem:**
- User goes offline during session
- Answers saved to localStorage
- User comes back online
- No sync mechanism
- Backend thinks user never participated

**Impact:** Lost session data

---

### FAILURE #10: LATE ANSWER SUBMISSION (MEDIUM)

**The Problem:**
```
T=3599: User submits last answer (slow network, 2 sec latency)
T=3600: Session ends, updateSessionStatuses() fires
T=3601: Answer finally arrives, but status='completed'
```

**Code:**
```typescript
// LiveSessionComponent.tsx line 35
if (!currentUser || !session || session.status !== 'active') return;
// Status is 'completed', so answer is not saved!
```

**Impact:** Silent data loss, no error message

---

### FAILURE #11: SESSION DELETED - USER NOT NOTIFIED (HIGH)

**The Problem:**
- Admin deletes session from DB
- User in session: sees nothing
- Keeps answering questions pointlessly
- No participant record created
- Data lost

**No real-time notification system**

---

### FAILURE #12: EMPTY SESSIONS RUN (LOW)

**The Problem:**
- Admin creates session
- No one registers
- Session auto-starts anyway
- Runs for full duration
- No validation check

---

## DATABASE INCONSISTENCY EVIDENCE

After student "completes" session:

```
sessions table:
  ✓ Has session record
  ✓ Status='completed'
  ✓ Scheduled times correct

session_registrations table:
  ✓ Has user registration

session_participants table:
  ✗ EMPTY - no record
  ✗ No answers
  ✗ Score = 0
```

**What happened in reality:** Student answered 50 questions, saw results
**What database shows:** Student never participated
**Why:** All data only in localStorage, never persisted to DB

---

## WHAT ACTUALLY WORKS

- ✓ Admin can create sessions (uses API)
- ✓ Students can see session list (uses API)
- ✓ Students can register (uses API, creates session_registrations)
- ✓ Admin can delete/cancel (uses API)

**What DOESN'T work:** The entire student participation flow

---

## KEY CODE FILES AND ISSUES

### File: `/app/live-practice/page.tsx` (Student UI)

**Line 55:** Uses wrong function
```typescript
const result = joinSession(sessionId, currentUser); // ← localStorage version!
```

Should be:
```typescript
const result = await joinSessionAPI(sessionId); // ← API version
```

### File: `/lib/liveSessions.ts` (All client-side state)

**Lines 81-107:** joinSession() reads from localStorage
```typescript
const sessions = getAllSessions(); // localStorage.getItem()
```

Should read from API:
```typescript
const session = await getSessionFromAPI(sessionId);
```

**Line 157:** submitAnswer() only saves to localStorage
```typescript
saveSessions(sessions); // localStorage.setItem() only!
```

Should also call API:
```typescript
await submitAnswerToAPI(sessionId, userId, questionIndex, answer);
```

### File: `/lib/sessionApi.ts` (API Client)

**MISSING:** No submitAnswer() function
**MISSING:** No joinSession() function that calls API
**MISSING:** No leaveSession() function that calls API

### File: `/backend/src/routes/sessionRoutes.ts`

**EXISTING ENDPOINTS:**
- ✓ GET /api/sessions
- ✓ POST /api/sessions/:id/register
- ✓ POST /api/sessions/:id/unregister

**MISSING CRITICAL ENDPOINTS:**
- ✗ POST /api/sessions/:id/participants (add participant to session)
- ✗ POST /api/sessions/:id/participants/:userId/answers (submit answer)
- ✗ DELETE /api/sessions/:id/participants/:userId (leave session)
- ✗ GET /api/sessions/:id/results (fetch results)

---

## CONCRETE TEST CASE - REPRODUCES THE FAILURE

### Setup

1. Admin account: create user "admin"
2. Student account: create user "student"
3. Verify PostgreSQL is running

### Test Steps

1. **Login as admin**
   - Go to /admin
   - Create session "Test M1" starting in 5 minutes

2. **Verify in DB**
   ```sql
   SELECT id, name, status FROM sessions WHERE name = 'Test M1';
   ```
   Result: Row exists, status='scheduled' ✓

3. **Login as student**
   - Go to /live-practice
   - See "Test M1" in list ✓
   - Click "Registrarse"
   - Receive success message ✓

4. **Verify registration in DB**
   ```sql
   SELECT * FROM session_registrations WHERE session_id='xyz';
   ```
   Result: Row exists ✓

5. **Wait for lobby to open** (5 minutes)

6. **Click "Entrar al Lobby"**
   ```
   ERROR: "Ensayo no encontrado" ✗
   ```

7. **Verify participant NOT in DB**
   ```sql
   SELECT * FROM session_participants WHERE session_id='xyz';
   ```
   Result: Empty, no records ✗

### Why It Failed

- Session created in DB (step 2) ✓
- Frontend shows session from API (step 3) ✓
- Frontend tries to join from localStorage (step 6)
- Session never synced to localStorage
- joinSession() in liveSessions.ts can't find it
- Returns error "Ensayo no encontrado" ✗

---

## SUMMARY OF FAILURES

| # | Failure | Severity | User Impact | Root Cause |
|---|---------|----------|-------------|-----------|
| 1 | Cannot join | CRITICAL | Blocked completely | localStorage/API mismatch |
| 2 | Answers lost | CRITICAL | 100% data loss | No API endpoint |
| 3 | Refresh fails | CRITICAL | Kicked from session | No API fallback |
| 4 | Race condition | HIGH | Overbooking | No transaction |
| 5 | Cancellation silent | HIGH | No notification | No real-time push |
| 6 | Auto-start unreliable | HIGH | Late transitions | No server timer |
| 7 | Browser close | CRITICAL | Complete loss | localStorage only |
| 8 | Timezone wrong | MEDIUM | Wrong join time | Hardcoded locale |
| 9 | Disconnect/reconnect | CRITICAL | Lost sync | No reconnect logic |
| 10 | Late answers | MEDIUM | Silent drop | Status check |
| 11 | Delete unannounced | HIGH | Silent failure | No notification |
| 12 | Empty sessions | LOW | Wasted resources | No validation |

---

## RECOMMENDATIONS

### DO NOT

- Enable this feature for production users
- Deploy to live environment without fixes
- Use for real PAES practice sessions
- Expect any data persistence

### IMMEDIATE ACTIONS

1. Disable ensayos feature via feature flag
2. Document that feature is in development
3. Create "FEATURE_ENSAYOS_BETA = false" environment variable
4. Prevent student access until fixed

### SHORT TERM FIX (1-2 weeks)

1. Add backend endpoints for:
   - POST /api/sessions/:id/participants/:userId (join)
   - POST /api/sessions/:id/participants/:userId/answers (submit)
   - DELETE /api/sessions/:id/participants/:userId (leave)

2. Update frontend to call API instead of localStorage for:
   - joinSession()
   - submitAnswer()
   - leaveSession()

3. Add server-side session timer (Node.js job or cron)

4. Add integration tests for complete user journey

### MEDIUM TERM (2-3 weeks additional)

1. Add WebSocket/SSE for real-time notifications
2. Add transaction/constraint for race condition fix
3. Add timezone handling
4. Test with 10+ simultaneous users

---

## CONCLUSION

The ensayos feature is fundamentally broken due to architectural decisions that create two separate, unsynchronized data stores. This results in a complete failure of the student journey - they cannot join sessions, their answers are not saved, and page refreshes cause data loss.

**Current status:** Not suitable for any real usage.

**Recommendation:** Either revert the feature entirely or completely rewrite it using the backend API as the authoritative source of truth.

The feature appears to "work" from the admin perspective (creating sessions) but is completely non-functional from the student perspective (joining, participating, viewing results).

---

## FILES REFERENCED IN THIS ANALYSIS

Core files analyzed:
- `/app/live-practice/page.tsx` - Student UI
- `/components/LiveSession.tsx` - Active session component
- `/backend/src/controllers/sessionController.ts` - Backend endpoints
- `/lib/sessionApi.ts` - API client
- `/lib/liveSessions.ts` - localStorage operations
- `/lib/hooks/useSessions.ts` - SWR hooks
- `/backend/src/routes/sessionRoutes.ts` - Route definitions

---

**Analysis Date:** 2025-11-08
**Analyzer:** Code Review System
**Status:** Complete - 12 critical/high failures identified
