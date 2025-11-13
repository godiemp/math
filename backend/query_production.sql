-- Production Database Summary Report
\echo '================================================================================'
\echo 'PRODUCTION DATABASE SUMMARY'
\echo '================================================================================'
\echo ''

-- Users
\echo '📊 USERS'
\echo '--------------------------------------------------------------------------------'
\echo 'Total Users:'
SELECT COUNT(*) FROM users;

\echo ''
\echo 'Users by Role:'
SELECT role, COUNT(*) as count
FROM users
GROUP BY role
ORDER BY count DESC;

\echo ''
\echo 'Most Recent Users:'
SELECT email, role, created_at::date
FROM users
ORDER BY created_at DESC
LIMIT 5;

\echo ''

-- Subscriptions
\echo '💳 SUBSCRIPTIONS'
\echo '--------------------------------------------------------------------------------'
\echo 'Total Subscriptions:'
SELECT COUNT(*) FROM subscriptions;

\echo ''
\echo 'Subscriptions by Status:'
SELECT status, COUNT(*) as count
FROM subscriptions
GROUP BY status
ORDER BY count DESC;

\echo ''
\echo 'Subscriptions by Plan:'
SELECT plan_name, COUNT(*) as count
FROM subscriptions
GROUP BY plan_name
ORDER BY count DESC;

\echo ''

-- Payments
\echo '💰 PAYMENTS'
\echo '--------------------------------------------------------------------------------'
\echo 'Total Payments:'
SELECT COUNT(*) FROM payments;

\echo ''
\echo 'Payments by Status:'
SELECT status, COUNT(*) as count
FROM payments
GROUP BY status
ORDER BY count DESC;

\echo ''
\echo 'Total Revenue (Approved):'
SELECT COALESCE(SUM(amount), 0) as total_revenue
FROM payments
WHERE status = 'approved';

\echo ''

-- Quiz Sessions
\echo '📝 QUIZ SESSIONS'
\echo '--------------------------------------------------------------------------------'
\echo 'Total Quiz Sessions:'
SELECT COUNT(*) FROM quiz_sessions;

\echo ''
\echo 'Total Quiz Attempts:'
SELECT COUNT(*) FROM quiz_attempts;

\echo ''
\echo 'Average Quiz Score:'
SELECT ROUND(AVG(score)::numeric, 2) as avg_score
FROM quiz_attempts
WHERE score IS NOT NULL;

\echo ''

-- Questions
\echo '❓ QUESTIONS'
\echo '--------------------------------------------------------------------------------'
\echo 'Total Questions:'
SELECT COUNT(*) FROM questions;

\echo ''
\echo 'Questions by Difficulty:'
SELECT COALESCE(difficulty, 'Not specified') as difficulty, COUNT(*) as count
FROM questions
GROUP BY difficulty
ORDER BY count DESC;

\echo ''
\echo 'Top 10 Thematic Units:'
SELECT COALESCE(thematic_unit, 'Not specified') as thematic_unit, COUNT(*) as count
FROM questions
GROUP BY thematic_unit
ORDER BY count DESC
LIMIT 10;

\echo ''

-- Abstract Problems
\echo '🧩 ABSTRACT PROBLEMS'
\echo '--------------------------------------------------------------------------------'
\echo 'Total Abstract Problems:'
SELECT COUNT(*) FROM abstract_problems;

\echo ''
\echo 'Abstract Problems by Status:'
SELECT status, COUNT(*) as count
FROM abstract_problems
GROUP BY status
ORDER BY count DESC;

\echo ''
\echo 'Abstract Problems by Difficulty:'
SELECT difficulty, COUNT(*) as count
FROM abstract_problems
GROUP BY difficulty
ORDER BY
  CASE difficulty
    WHEN 'básico' THEN 1
    WHEN 'intermedio' THEN 2
    WHEN 'avanzado' THEN 3
    ELSE 4
  END;

\echo ''

-- Context Problems
\echo '📚 CONTEXT PROBLEMS'
\echo '--------------------------------------------------------------------------------'
\echo 'Total Context Problems:'
SELECT COUNT(*) FROM context_problems;

\echo ''

-- AI Interactions
\echo '🤖 AI INTERACTIONS'
\echo '--------------------------------------------------------------------------------'
\echo 'Total AI Interactions:'
SELECT COUNT(*) FROM ai_interactions;

\echo ''
\echo 'AI Interactions by Type:'
SELECT interaction_type, COUNT(*) as count
FROM ai_interactions
GROUP BY interaction_type
ORDER BY count DESC;

\echo ''

-- Sessions (Live Practice)
\echo '🎯 LIVE PRACTICE SESSIONS (Ensayos)'
\echo '--------------------------------------------------------------------------------'
\echo 'Total Sessions:'
SELECT COUNT(*) FROM sessions;

\echo ''
\echo 'Total Session Participants:'
SELECT COUNT(*) FROM session_participants;

\echo ''

-- Operations Practice
\echo '➕ OPERATIONS PRACTICE'
\echo '--------------------------------------------------------------------------------'
\echo 'Users with Operations Practice Progress:'
SELECT COUNT(*) FROM operations_practice_progress;

\echo ''
\echo 'Total Operations Practice Attempts:'
SELECT COUNT(*) FROM operations_practice_attempts;

\echo ''
\echo 'Average Operations Accuracy (%):'
SELECT ROUND(AVG(CASE WHEN is_correct THEN 1.0 ELSE 0.0 END) * 100, 2) as accuracy
FROM operations_practice_attempts;

\echo ''

-- Thematic Units
\echo '📖 THEMATIC UNITS'
\echo '--------------------------------------------------------------------------------'
\echo 'Total Thematic Units:'
SELECT COUNT(*) FROM thematic_units;

\echo ''
\echo 'Top 5 Thematic Units by Question Count:'
SELECT name, question_count
FROM thematic_units
ORDER BY question_count DESC
LIMIT 5;

\echo ''

-- PAES Predictions
\echo '📈 PAES PREDICTIONS'
\echo '--------------------------------------------------------------------------------'
\echo 'Total PAES Predictions:'
SELECT COUNT(*) FROM paes_predictions;

\echo ''
\echo 'Average Predicted Score:'
SELECT ROUND(AVG(predicted_score)::numeric, 0) || '/1000' as avg_score
FROM paes_predictions;

\echo ''

-- Recent Activity
\echo '🕐 RECENT ACTIVITY'
\echo '--------------------------------------------------------------------------------'
\echo 'Quiz Attempts (Last 7 Days):'
SELECT created_at::date as date, COUNT(*) as count
FROM quiz_attempts
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY created_at::date
ORDER BY date DESC;

\echo ''
\echo '================================================================================'
\echo 'END OF REPORT'
\echo '================================================================================'
