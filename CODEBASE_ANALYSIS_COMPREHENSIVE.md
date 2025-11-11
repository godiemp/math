# PAES Chile Math Platform - Comprehensive Codebase Analysis

## Executive Summary

**PAES Chile** is a comprehensive web-based mathematics learning platform designed to help Chilean students prepare for the PAES (Prueba de Acceso a la Educación Superior) exam. The application features an AI-powered tutor, interactive practice quizzes, live practice sessions, progress tracking, and a complete subscription management system.

### Technology Stack
- **Frontend**: Next.js 15.0.0, React 19, TypeScript 5.9, Tailwind CSS
- **Backend**: Express.js, Node.js, TypeScript  
- **Database**: PostgreSQL with connection pooling
- **AI**: Anthropic Claude Sonnet 4.5
- **Testing**: Playwright E2E with Docker Compose
- **Authentication**: JWT (bcryptjs for password hashing)

---

## Part 1: What the Application Does

### Core Purpose
The platform provides a complete learning ecosystem for PAES math preparation with:
- **Interactive practice quizzes** in 2 modes (Zen and Rapid Fire)
- **AI-powered tutor** using Socratic methodology
- **Live practice sessions** (ensayos) where students compete in real-time
- **Progress tracking** with skill taxonomy (500+ skills)
- **Comprehensive documentation** with LaTeX/KaTeX rendering
- **Subscription system** with multiple tiers
- **Admin dashboard** for content management and analytics

### User Segments
1. **Students**: Complete quizzes, track progress, use AI tutor, join live sessions
2. **Admins**: Manage content, view analytics, create sessions, manage users
3. **Free Trial Users**: Limited access, can upgrade to paid plans

### Key Features Implemented

#### 1. **Practice Modes**
- **Zen Mode**: Untimed practice with immediate feedback
  - Breathing animation at start
  - Instant explanations available
  - AI tutor accessible for each question
  - Can review as long as needed

- **Rapid Fire Mode**: Timed competitive practice
  - 4 difficulty levels: Easy (25 min), Medium (20 min), Hard (15 min), Extreme (10 min)
  - 10 questions per session
  - Timer display with color-coded warnings
  - Auto-advance after answer
  - Auto-submit when time expires

#### 2. **AI Tutor System**
- Socratic methodology: asks guiding questions before explaining
- Multi-turn conversations per question
- Context-aware (knows question, options, explanation)
- Empathetic tone focused on understanding
- Integrated into Zen mode with chat modal

#### 3. **Live Practice Sessions (Ensayos PAES)**
- Real-time competing with other students
- Session states: Scheduled → Lobby → Active → Completed
- Registration system with lobby preview
- Auto-updating status every 30 seconds
- Participant leaderboards
- Multiple concurrent sessions possible

#### 4. **Quiz Tracking & Analytics**
- **Database-backed quiz history**: All attempts stored in PostgreSQL
- **Quiz sessions**: Groups attempts with AI conversations
- **Detailed stats**: Score, accuracy, time spent, topic breakdown
- **Persistence**: Remember user's last configuration
- **History display**: Review past attempts with full explanations

#### 5. **Skill/Competency System**
- **500+ skills** organized by topic and subject
- **Mastery levels**: Not Started / Learning / Mastered
- **Progress visualization**: Bars showing skill coverage
- **Linked to documentation**: Skills mapped to curriculum
- **Analytics per skill**: Accuracy by skill type

#### 6. **Gamification**
- **Daily streaks**: Consecutive practice days counter
- **Streak badges**: 🎯 🔥 ⚡ 🏆 based on length
- **Longest streak tracking**: Persistent in database
- **Auto-update**: Updates when completing practice

#### 7. **Comprehensive Curriculum**
- **M1 Level**: 406 problems across 4 subjects
  - Números (Numbers): 91 problems
  - Álgebra y Funciones: 109 problems  
  - Geometría: 106 problems
  - Probabilidad y Estadística: 100 problems
- **M2 Level**: 26 advanced problems
- **Full documentation**: With LaTeX, examples, step-by-step solutions

#### 8. **Subscription System**
- **Plan types**: Free (trial), Basic, Premium with configurable features
- **User states**: Trial (limited days), Active, Expired, Cancelled
- **Feature gating**: Different features by plan
- **Admin management**: Full CRUD for plans and subscriptions

#### 9. **QGen - Dynamic Question Generator**
- **Contextual problems**: Real-life scenarios (sports, economics, tech, etc.)
- **Reasoning objectives**: Apply, Analyze, Synthesize, Evaluate
- **Parameterized templates**: Variations of problem types
- **Smart value generation**: Realistic and varied numbers
- **Infinite practice**: Generate unlimited unique questions

#### 10. **Admin Dashboard**
- **Live Sessions**: Create, edit, monitor, and manage practice sessions
- **User Management**: Full CRUD with subscription management
- **Content Management**: View/filter problems from question bank
- **PDF Upload**: Extract problems from PDFs with AI vision
- **Analytics**: Usage metrics, performance trends, user activity
- **AI Analytics**: Tutor interactions, token usage, response times
- **QGen Management**: Configure contexts, goals, and templates
- **Debug Tools**: Pages to test Zen and Rapid Fire modes

#### 11. **Progress & Reporting**
- **Dashboard**: Overview of registered sessions, next session, daily stats
- **Progress page**: Multi-tab view (Overview, My Quizzes, Skills M1, Skills M2)
- **Question history**: Recent questions with correct/incorrect indicators
- **Quiz sessions**: Detailed view with all attempts and scores
- **Visual feedback**: Progress bars, percentages, question indicators

#### 12. **Share & Social**
- **Share modal**: Share results with custom messages
- **Social integration**: Prepared for social media links
- **Session invites**: Share upcoming sessions with others

---

## Part 2: Existing E2E Tests Coverage

### Test Framework: Playwright
- **Configuration**: `playwright.config.ts`
- **Global setup**: `e2e/global-setup.ts` (database seeding)
- **Helper functions**: `e2e/helpers/auth.ts`, `e2e/helpers/db-setup.ts`
- **Base URL**: `http://localhost:3000`
- **Browsers**: Chromium (Firefox/Safari commented out)
- **On Failure**: Screenshots, videos, trace files
- **CI**: GitHub Actions with annotations

### Test Files & Coverage

#### **1. Authentication Tests** (`auth.spec.ts`)
**2 Tests - Basic Auth Flow**
```
✅ should display login page
✅ should login with test student credentials
```
**Coverage**: Landing page, login form interaction
**Gap**: Registration flow, password reset, logout

#### **2. Practice Mode Tests** (`practice.spec.ts`)
**11 Tests - Core Quiz Functionality**

*Zen Mode (5 tests)*:
```
✅ should display M1 practice page with subject selection
✅ should allow subject and mode selection flow
✅ should complete a Zen mode quiz
✅ should complete Zen mode quiz and display accurate results
✅ should allow reviewing answers after quiz completion
```

*Rapid Fire Mode (4 tests)*:
```
✅ should show difficulty selection for Rapid Fire mode
✅ should start Rapid Fire quiz with selected difficulty
✅ should complete Rapid Fire quiz and verify timer functionality
```

*Additional (2 tests)*:
```
✅ Difficulty/mode selection flows
✅ Quiz result display and validation
```

**Coverage**: Mode selection, subject selection, question answering, timer, results page
**Gaps**: 
- M2 practice not tested
- All subjects at quiz level not tested
- AI chat not tested during quiz
- Subject-specific filtering not tested
- Question type variations not tested

#### **3. Live Practice Tests** (`live-practice.spec.ts`)
**6 Tests - Session Management**
```
✅ should display live practice page and available sessions
✅ should register for a scheduled session
✅ should unregister from a scheduled session
✅ should display session details correctly
✅ should show user welcome message
✅ should navigate back to dashboard
```

**Coverage**: Session listing, registration/unregistration, details display, navigation
**Gaps**:
- Active session participation not tested
- Lobby state transition not tested
- Leaderboard/results not tested
- Multiple sessions overlap not tested
- Session creation (admin) not tested

#### **4. Progress & Analytics Tests** (`progress.spec.ts`)
**20 Tests - Progress Tracking & Analytics**

*Overview Tab (8 tests)*:
```
✅ should display progress page with heading and tabs
✅ should display M1 and M2 progress cards
✅ should allow changing recent questions count selector
✅ should display question history with pagination
✅ should show question review modal when clicking on question
✅ should show correct answer/incorrect visual indicators
✅ should display progress bars with correct percentages
✅ should navigate back to dashboard
```

*Quizzes Tab (6 tests)*:
```
✅ should switch to quizzes tab and display quiz sessions
✅ should display empty state with practice links
✅ should complete quiz and verify it appears in quizzes tab
✅ should open quiz details modal from quizzes tab
✅ should navigate between questions in quiz details modal
✅ should display quiz session with question visual indicators
```

*Skills Tabs (2 tests)*:
```
✅ should switch to Skills M1 tab and display skills
✅ should switch to Skills M2 tab and display skills
```

*State Management (1 test)*:
```
✅ should maintain tab state when navigating within page
```

**Coverage**: Multi-tab navigation, quiz history, skill display, modal interactions
**Gaps**:
- Skill mastery progression not tested
- Detailed skill filtering not tested
- Quiz replay functionality not fully tested
- Performance metrics not tested

### Overall E2E Test Statistics
- **Total Tests**: 39 tests
- **Test Files**: 4 files
- **Helper Functions**: 3 utility functions
- **Setup**: Global database seeding before tests
- **Test Credentials**: 
  - Student: `student@test.com` / `student123`
  - Admin: `admin@test.com` / `admin123`

**Coverage Percentage**: ~40% of critical user flows

---

## Part 3: Application Routes & Features Identified

### Public Routes
```
/                    → Landing page (Auth: Login/Register)
/legal/privacidad    → Privacy policy
/legal/terminos      → Terms of service
/legal/cookies       → Cookie policy
/legal/reembolsos    → Refund policy
/contacto            → Contact form (⚠️ NO E2E TEST)
```

### Protected Routes (Require Authentication)

#### **Student Routes**
```
/dashboard                    → Main dashboard with streak, next session
                             → StudyBuddy (AI companion)
                             → Session registration cards (TESTED: Partial)
                             
/practice/m1                 → M1 practice quiz interface (TESTED: ✅)
/practice/m2                 → M2 practice quiz interface (TESTED: ❌ No E2E test)

/live-practice               → Live session registration (TESTED: ✅)

/progress                    → Analytics & progress tracking (TESTED: ✅)
  - Overview tab            → M1/M2 progress, recent questions
  - My Quizzes tab          → Quiz history with replay
  - Skills M1 tab           → Skill mastery display
  - Skills M2 tab           → Advanced skill tracking

/curriculum/m1               → M1 curriculum overview (TESTED: ❌)
/curriculum/m1/docs/...      → M1 documentation pages (TESTED: ❌)
/curriculum/m1/docs-export-all → Export all docs (TESTED: ❌)
/curriculum/m2               → M2 curriculum overview (TESTED: ❌)
```

#### **Admin Routes** (Require Admin Role)
```
/admin                       → Redirects to /admin/live-sessions

/admin/live-sessions         → Create, edit, manage sessions (TESTED: ❌)
/admin/users                 → User management & subscriptions (TESTED: ❌)
/admin/analytics             → Dashboard analytics & metrics (TESTED: ❌)
/admin/ai-analytics          → AI tutor interaction analysis (TESTED: ❌)
/admin/problems              → View/filter question bank (TESTED: ❌)
/admin/upload                → PDF upload & AI extraction (TESTED: ❌)
/admin/qgen                  → Dynamic question generation mgmt (TESTED: ❌)
/admin/abstract-problems     → Abstract problem generation (TESTED: ❌)
/admin/zen-debug             → Debug Zen mode (TESTED: ❌)
/admin/rapidfire-debug       → Debug Rapid Fire mode (TESTED: ❌)
/admin/study-buddy-debug     → Debug Study Buddy (TESTED: ❌)
```

### API Endpoints (Backend Routes)

**Authentication** (Implemented, Tested in E2E indirectly)
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout
GET    /api/auth/me
```

**Quiz Tracking** (Implemented, Tested in E2E indirectly)
```
POST   /api/quiz/attempt
POST   /api/quiz/attempts
GET    /api/quiz/history
GET    /api/quiz/stats
GET    /api/quiz/sessions
POST   /api/quiz/sessions
PUT    /api/quiz/sessions/:id
```

**Live Sessions** (Partially tested)
```
GET    /api/sessions
POST   /api/sessions (Admin)
GET    /api/sessions/:id
POST   /api/sessions/:id/register
POST   /api/sessions/:id/join
POST   /api/sessions/:id/answers
```

**Streaks** (Not tested in E2E)
```
GET    /api/streak
POST   /api/streak/update
```

**Admin Features** (Not tested in E2E)
```
GET    /api/admin/users
POST   /api/admin/users
PUT    /api/admin/users/:id
DELETE /api/admin/users/:id
GET    /api/admin/plans
POST   /api/admin/plans
PUT    /api/admin/plans/:id
DELETE /api/admin/plans/:id
GET    /api/admin/subscriptions
POST   /api/admin/subscriptions
PUT    /api/admin/subscriptions/:id
DELETE /api/admin/subscriptions/:id
GET    /api/admin/questions
GET    /api/admin/uploads
POST   /api/admin/upload-pdf
POST   /api/admin/save-questions
```

**Analytics** (Not tested in E2E)
```
GET    /api/analytics/dashboard
GET    /api/analytics/trends
GET    /api/analytics/user-activity
GET    /api/analytics/performance
GET    /api/ai-analytics/overview
GET    /api/ai-analytics/interactions
GET    /api/ai-analytics/costs
GET    /api/ai-analytics/performance
```

**QGen** (Not tested in E2E)
```
GET    /api/qgen/contexts
GET    /api/qgen/goals
GET    /api/qgen/templates
POST   /api/qgen/generate
POST   /api/qgen/validate
```

**AI Services** (Not tested in E2E)
```
POST   /api/ai-chat
POST   /api/ai-help
POST   /api/ai/summarize
POST   /api/ai/practice
```

**Abstract Problems** (Not tested in E2E)
```
GET    /api/abstract-problems/overview
POST   /api/abstract-problems/generate
GET    /api/abstract-problems/context-problems
```

**Study Buddy** (Not tested in E2E)
```
POST   /api/study-buddy/chat
GET    /api/study-buddy/summary
```

**Utilities**
```
GET    /health
GET    /api/images/:filename
```

---

## Part 4: Critical User Flows - What's Missing from E2E Tests

### Priority 1: Critical Business Flows (Should Have E2E Coverage)

#### 1. **Complete Student Lifecycle** ⚠️ PARTIALLY TESTED
- ✅ Login (tested)
- ✅ Practice quiz completion (tested)
- ❌ **Registration flow** - Only login tested, not signup
- ❌ **M2 practice** - M1 extensively tested, M2 not tested at all
- ❌ **Subscription upgrade** - Feature exists but not tested
- ❌ **Trial expiration** - Soft paywall exists but not tested

#### 2. **AI Tutor Interaction** ❌ NOT TESTED
- **Feature exists**: AIChatModal component, ai-chat API endpoint
- **Use case**: During Zen mode, click "?" button to chat with AI
- **Missing tests**: 
  - Open chat modal
  - Submit question to tutor
  - Receive Socratic response
  - Multi-turn conversation
  - Chat persistence in quiz history
- **Risk**: No validation that AI responses are being shown correctly

#### 3. **Streak System** ❌ NOT TESTED
- **Feature exists**: Streak.tsx component, /api/streak endpoints
- **Use case**: Daily practice counter with badges
- **Missing tests**:
  - Streak increments after quiz completion
  - Longest streak calculation
  - Streak badge display (🎯 🔥 ⚡ 🏆)
  - Streak reset on missed day
- **Risk**: Gamification feature may not be working, no validation

#### 4. **Curriculum/Documentation** ❌ NOT TESTED
- **Feature exists**: /curriculum/m1, /curriculum/m2, docs pages
- **Components**: Curriculum.tsx, AdaptiveMarkdownViewer.tsx
- **Missing tests**:
  - Navigate to curriculum pages
  - Load documentation content
  - LaTeX rendering in docs
  - Reading mode toggle
  - Doc sidebar navigation
  - Topic filtering
- **Risk**: Large feature (full curriculum + docs) completely untested

#### 5. **Skills/Competency Tracking** ⚠️ PARTIALLY TESTED
- ✅ Tab navigation tested
- ❌ **Skills data display** - No validation of actual skills shown
- ❌ **Skill mastery levels** - Not tested (Not Started/Learning/Mastered)
- ❌ **Skill filtering** - Dropdown filter not tested
- ❌ **Weak skills prioritization** - No test for recommended skills to practice
- **Risk**: Skills analytics may show wrong data

#### 6. **Admin Dashboard** ❌ COMPLETELY NOT TESTED
- **Live Sessions Management** (10+ interactions)
  - ❌ Create new session
  - ❌ Edit session details (date, time, title)
  - ❌ View registered participants
  - ❌ Start/End session
  - ❌ Cancel session
  - ❌ View session results
  
- **User Management**
  - ❌ List all users
  - ❌ Create new user
  - ❌ Edit user details
  - ❌ Assign subscription plan
  - ❌ Delete user
  - ❌ View user analytics
  
- **Content Management**
  - ❌ Upload PDF with problems
  - ❌ AI extraction validation
  - ❌ Save problems to database
  - ❌ Edit/delete problems
  - ❌ View question bank
  
- **Analytics Dashboard**
  - ❌ View usage metrics
  - ❌ See user activity trends
  - ❌ Performance by topic
  - ❌ Revenue/subscription metrics
  
- **AI Analytics**
  - ❌ Tutor interaction logs
  - ❌ Average response time
  - ❌ Token usage tracking
  - ❌ Cost analysis
  
- **QGen Management**
  - ❌ Create/edit contexts
  - ❌ Create/edit goals
  - ❌ Create/edit templates
  - ❌ Generate and validate questions
  
- **Debug Tools**
  - ❌ Zen debug page (manual QA only)
  - ❌ Rapid Fire debug page
  - ❌ Study Buddy debug page

#### 7. **Multi-Subject Practice** ⚠️ PARTIALLY TESTED
- ✅ "All Subjects" option tested
- ❌ **Individual subject selection**:
  - Números (Numbers)
  - Álgebra y Funciones (Algebra)
  - Geometría (Geometry)
  - Probabilidad (Probability)
- ❌ **Subject filtering at quiz level** - Only "All" tested
- ❌ **Subject-specific results breakdown** - No test
- **Risk**: Subject filtering may not work correctly, no validation per subject

#### 8. **Study Buddy (New Feature)** ❌ NOT TESTED
- **Component**: StudyBuddy.tsx (in dashboard)
- **Use case**: AI companion on dashboard
- **Missing tests**:
  - Open Study Buddy chat
  - Send message to buddy
  - Receive responses
  - Session summary requests
  - Integration with quiz history
- **Risk**: New feature completely untested

#### 9. **Share Feature** ❌ NOT TESTED
- **Component**: ShareModal.tsx, ShareButton.tsx
- **Use case**: Share quiz results with friends
- **Missing tests**:
  - Click share button
  - Open share modal
  - Copy share link
  - Share to social platforms
- **Risk**: Social features not validated

#### 10. **Subscription & Paywall** ❌ NOT TESTED
- **Components**: SoftPaywallMessage.tsx, ModuleAccessGuard.tsx
- **Use case**: Restrict features by subscription tier
- **Missing tests**:
  - Free user sees paywall
  - Paid user accesses premium features
  - Trial conversion
  - Plan downgrade handling
  - Feature gating logic
- **Risk**: Core monetization feature untested

### Priority 2: Edge Cases & Error Flows (Should Be Tested)

#### 1. **Quiz Edge Cases**
- ❌ **All answers incorrect** - Results display when scoring 0%
- ❌ **Rapid Fire auto-submit** - When timer runs out mid-question
- ❌ **Network error during quiz** - Graceful failure handling
- ❌ **Very long quiz sessions** - Stability with 50+ questions
- ❌ **Rapid navigation** - Clicking next/previous rapidly

#### 2. **Authentication Edge Cases**
- ❌ **Wrong credentials** - Error message display
- ❌ **Account lockout** - After multiple failed attempts
- ❌ **Session expiration** - JWT token refresh flow
- ❌ **Logout during quiz** - State cleanup
- ❌ **Concurrent login** - Multiple devices

#### 3. **Live Session Edge Cases**
- ❌ **Register after session starts** - Lobby vs active state
- ❌ **Network disconnect during session** - Rejoin capability
- ❌ **Admin ends session early** - Participant notification
- ❌ **Concurrent session overlap** - Multiple sessions at once
- ❌ **Participant dropout** - Leaderboard updates

#### 4. **Data Persistence**
- ❌ **Page refresh during quiz** - State recovery
- ❌ **Clear localStorage** - Session restoration
- ❌ **Database connectivity loss** - Error handling
- ❌ **Partial quiz sync** - Incomplete data handling
- ❌ **Offline mode** - Graceful degradation

### Priority 3: Accessibility & UX (Could Have Tests)

#### 1. **Keyboard Navigation**
- ❌ Tab through answers
- ❌ Enter to submit
- ❌ Arrow keys for navigation
- ❌ Escape to close modals

#### 2. **Screen Reader Support**
- ❌ ARIA labels present
- ❌ Headings properly structured
- ❌ Form labels associated
- ❌ Focus management

#### 3. **Responsive Design**
- ❌ Mobile layout (only desktop tested)
- ❌ Tablet layout
- ❌ Touch interactions
- ❌ Portrait/landscape switching

#### 4. **Performance**
- ❌ Page load times
- ❌ Quiz render performance
- ❌ Large dataset handling
- ❌ Memory leaks

---

## Summary Table: Feature Coverage

| Feature | Component | Route | API | E2E Test | Status |
|---------|-----------|-------|-----|----------|--------|
| **Core Practice** | Quiz.tsx | /practice/m1 | /api/quiz/* | ✅ Full | 🟢 Ready |
| **Live Sessions** | LiveSession.tsx | /live-practice | /api/sessions | ⚠️ Partial | 🟡 Needs Admin Tests |
| **Progress Tracking** | SkillsDisplay.tsx | /progress | /api/quiz/stats | ⚠️ Partial | 🟡 Needs Skill Detail Tests |
| **AI Tutor** | AIChatModal.tsx | /practice/* | /api/ai-chat | ❌ None | 🔴 Untested |
| **M2 Practice** | Quiz.tsx | /practice/m2 | /api/quiz/* | ❌ None | 🔴 Untested |
| **Curriculum** | Curriculum.tsx | /curriculum/* | N/A | ❌ None | 🔴 Untested |
| **Admin - Sessions** | - | /admin/live-sessions | /api/sessions | ❌ None | 🔴 Untested |
| **Admin - Users** | - | /admin/users | /api/admin/users | ❌ None | 🔴 Untested |
| **Admin - Analytics** | - | /admin/analytics | /api/analytics/* | ❌ None | 🔴 Untested |
| **Admin - QGen** | - | /admin/qgen | /api/qgen/* | ❌ None | 🔴 Untested |
| **Streak System** | Streak.tsx | /dashboard | /api/streak | ❌ None | 🔴 Untested |
| **Study Buddy** | StudyBuddy.tsx | /dashboard | /api/study-buddy/* | ❌ None | 🔴 Untested |
| **Share Feature** | ShareModal.tsx | /progress, etc | N/A | ❌ None | 🔴 Untested |
| **Subscriptions** | SoftPaywallMessage.tsx | Various | /api/admin/subscriptions | ❌ None | 🔴 Untested |
| **Registration** | Auth.tsx | / | /api/auth/register | ❌ None | 🔴 Untested |

---

## Recommendations

### High Priority (Start Here)
1. **Add Admin Session Tests** (5-7 tests)
   - Create, edit, view, delete sessions
   - Monitor participant participation
   
2. **Add M2 Practice Tests** (5-6 tests)
   - Parallel M1 tests but for M2 level
   - Verify difficulty distinction

3. **Add AI Tutor Tests** (3-4 tests)
   - Open chat modal
   - Ask tutor question
   - Verify response format
   - Check persistence in quiz history

4. **Add Curriculum Tests** (3-4 tests)
   - Navigate to curriculum pages
   - Verify LaTeX rendering
   - Test sidebar navigation
   - Test reading mode toggle

### Medium Priority (Important Business Functions)
5. **Add Streak Tests** (2-3 tests)
   - Verify streak increments
   - Check badge display
   - Test longest streak

6. **Add Subscription Tests** (3-4 tests)
   - Free user paywall
   - Paid user access
   - Feature gating

7. **Add Admin User Management Tests** (4-5 tests)
   - CRUD operations
   - Subscription assignment

### Lower Priority (Nice to Have)
8. **Add Accessibility Tests**
   - Keyboard navigation
   - Screen reader compatibility
   - Focus management

9. **Add Edge Case Tests**
   - Network errors
   - Session timeouts
   - Offline mode

10. **Add Performance Tests**
    - Page load times
    - Quiz rendering speed

---

## How to Run Existing Tests

```bash
# Install dependencies
npm install

# Start test database
docker-compose -f docker-compose.test.yml up -d

# Start backend server (port 3002)
cd backend
npm run dev

# Start frontend (port 3000 - in new terminal)
npm run dev

# Run tests
npm run test:e2e              # Headless
npm run test:e2e:headed       # With browser
npm run test:e2e:ui           # Interactive Playwright UI
npm run test:e2e:report       # View HTML report
```

---

## Conclusion

The PAES Chile platform is a well-structured, feature-rich learning application with solid core functionality. E2E tests currently cover approximately **40% of critical user flows**, focusing on basic student interactions. However, significant gaps exist in:

- **Admin features** (session creation, user management, analytics) - 0% covered
- **AI integration** (tutor chat) - 0% covered
- **Curriculum/documentation** - 0% covered  
- **M2 advanced level** - 0% covered
- **Subscription/paywall** - 0% covered
- **Gamification** (streaks) - 0% covered

**Estimated effort to full coverage**: 15-20 additional E2E test files with 50+ tests focusing on the untested areas above.
