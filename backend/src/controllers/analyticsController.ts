import { Request, Response } from 'express';
import { pool } from '../config/database';
import { subDays, subHours } from 'date-fns';

/**
 * Analytics Controller
 * Handles all analytics and metrics calculations for the admin dashboard
 */

export const getAnalyticsDashboard = async (req: Request, res: Response) => {
  try {
    const now = Date.now();
    const oneDayAgo = subDays(now, 1).getTime();
    const sevenDaysAgo = subDays(now, 7).getTime();
    const thirtyDaysAgo = subDays(now, 30).getTime();

    // Pre-calculate retention window offsets
    const oneDayMs = 24 * 60 * 60 * 1000;
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    const fourteenDaysMs = 14 * 24 * 60 * 60 * 1000;
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
    const sixtyDaysMs = 60 * 24 * 60 * 60 * 1000;
    const twentyFourHoursMs = 24 * 60 * 60 * 1000;

    // Parallel queries for better performance
    const [
      usersResult,
      attemptsResult,
      sessionsResult,
      streaksResult,
      accuracyResult,
      subjectAccuracyResult,
      difficultyAccuracyResult,
      retentionResult,
      ensayoStatsResult,
      questionCoverageResult,
    ] = await Promise.all([
      // Total users and user growth
      pool.query(`
        SELECT
          COUNT(*) as total_users,
          COUNT(CASE WHEN created_at >= $1 THEN 1 END) as users_last_7d,
          COUNT(CASE WHEN created_at >= $2 THEN 1 END) as users_last_30d
        FROM users
      `, [sevenDaysAgo, thirtyDaysAgo]),

      // Total question attempts and completion stats
      pool.query(`
        SELECT
          COUNT(*) as total_attempts,
          COUNT(DISTINCT user_id) as unique_users_practicing,
          SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct_answers,
          COUNT(CASE WHEN attempted_at >= $1 THEN 1 END) as attempts_last_7d
        FROM question_attempts
      `, [sevenDaysAgo]),

      // Session/practice statistics
      pool.query(`
        SELECT
          COUNT(CASE WHEN attempted_at >= $1 THEN 1 END) as sessions_last_24h,
          COUNT(CASE WHEN attempted_at >= $2 THEN 1 END) as sessions_last_7d
        FROM (
          SELECT DISTINCT user_id, DATE(to_timestamp(attempted_at / 1000)) as practice_date, attempted_at
          FROM question_attempts
        ) as daily_sessions
      `, [oneDayAgo, sevenDaysAgo]),

      // Streak distribution
      pool.query(`
        SELECT
          COUNT(CASE WHEN current_streak >= 3 THEN 1 END) as streaks_3_plus,
          COUNT(CASE WHEN current_streak >= 7 THEN 1 END) as streaks_7_plus,
          COUNT(CASE WHEN current_streak >= 14 THEN 1 END) as streaks_14_plus,
          COUNT(CASE WHEN current_streak >= 30 THEN 1 END) as streaks_30_plus,
          AVG(current_streak) as avg_current_streak,
          MAX(longest_streak) as max_streak
        FROM users
      `),

      // Overall accuracy by level
      pool.query(`
        SELECT
          level,
          COUNT(*) as total_attempts,
          SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct,
          ROUND((SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)::decimal / COUNT(*)) * 100, 2) as accuracy_percentage
        FROM question_attempts
        GROUP BY level
      `),

      // Accuracy by subject
      pool.query(`
        SELECT
          subject,
          COUNT(*) as total_attempts,
          SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct,
          ROUND((SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)::decimal / COUNT(*)) * 100, 2) as accuracy_percentage
        FROM question_attempts
        GROUP BY subject
        ORDER BY subject
      `),

      // Accuracy by difficulty
      pool.query(`
        SELECT
          difficulty,
          COUNT(*) as total_attempts,
          SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct,
          ROUND((SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)::decimal / COUNT(*)) * 100, 2) as accuracy_percentage
        FROM question_attempts
        GROUP BY difficulty
        ORDER BY
          CASE difficulty
            WHEN 'easy' THEN 1
            WHEN 'medium' THEN 2
            WHEN 'hard' THEN 3
            WHEN 'extreme' THEN 4
          END
      `),

      // User retention (D1, D7, D30)
      pool.query(`
        WITH user_cohorts AS (
          SELECT
            u.id,
            u.created_at,
            MIN(qa.attempted_at) as first_attempt,
            MAX(CASE WHEN qa.attempted_at >= u.created_at + $2
                          AND qa.attempted_at < u.created_at + $3
                     THEN 1 END) as returned_d1,
            MAX(CASE WHEN qa.attempted_at >= u.created_at + $4
                          AND qa.attempted_at < u.created_at + $5
                     THEN 1 END) as returned_d7,
            MAX(CASE WHEN qa.attempted_at >= u.created_at + $6
                          AND qa.attempted_at < u.created_at + $7
                     THEN 1 END) as returned_d30
          FROM users u
          LEFT JOIN question_attempts qa ON u.id = qa.user_id
          WHERE u.created_at < $1
          GROUP BY u.id, u.created_at
        )
        SELECT
          COUNT(*) as total_users,
          SUM(CASE WHEN returned_d1 = 1 THEN 1 ELSE 0 END) as d1_retained,
          SUM(CASE WHEN returned_d7 = 1 THEN 1 ELSE 0 END) as d7_retained,
          SUM(CASE WHEN returned_d30 = 1 THEN 1 ELSE 0 END) as d30_retained,
          ROUND((SUM(CASE WHEN returned_d1 = 1 THEN 1 ELSE 0 END)::decimal / NULLIF(COUNT(*), 0)) * 100, 2) as d1_retention_rate,
          ROUND((SUM(CASE WHEN returned_d7 = 1 THEN 1 ELSE 0 END)::decimal / NULLIF(COUNT(*), 0)) * 100, 2) as d7_retention_rate,
          ROUND((SUM(CASE WHEN returned_d30 = 1 THEN 1 ELSE 0 END)::decimal / NULLIF(COUNT(*), 0)) * 100, 2) as d30_retention_rate
        FROM user_cohorts
      `, [thirtyDaysAgo, oneDayMs, oneDayMs * 2, sevenDaysMs, fourteenDaysMs, thirtyDaysMs, sixtyDaysMs]),

      // Ensayo (live session) statistics
      pool.query(`
        SELECT
          COUNT(*) as total_ensayos,
          COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_ensayos,
          COUNT(CASE WHEN status = 'scheduled' OR status = 'lobby' THEN 1 END) as upcoming_ensayos,
          AVG(ARRAY_LENGTH(COALESCE((
            SELECT ARRAY_AGG(sr.user_id)
            FROM session_registrations sr
            WHERE sr.session_id = sessions.id
          ), ARRAY[]::varchar[]), 1)) as avg_registrations_per_ensayo
        FROM sessions
      `),

      // Question bank coverage
      pool.query(`
        SELECT
          question_id,
          COUNT(*) as attempt_count
        FROM question_attempts
        GROUP BY question_id
        ORDER BY attempt_count DESC
      `),
    ]);

    // Calculate DAU and WAU
    const dauResult = await pool.query(`
      SELECT COUNT(DISTINCT user_id) as dau
      FROM question_attempts
      WHERE attempted_at >= $1
    `, [oneDayAgo]);

    const wauResult = await pool.query(`
      SELECT COUNT(DISTINCT user_id) as wau
      FROM question_attempts
      WHERE attempted_at >= $1
    `, [sevenDaysAgo]);

    // Calculate activation rate (users who practiced within 24h of signup)
    const activationResult = await pool.query(`
      WITH new_users AS (
        SELECT id, created_at
        FROM users
        WHERE created_at >= $1
      )
      SELECT
        COUNT(DISTINCT nu.id) as new_users,
        COUNT(DISTINCT CASE WHEN qa.attempted_at <= nu.created_at + $2
                            THEN nu.id END) as activated_users,
        ROUND((COUNT(DISTINCT CASE WHEN qa.attempted_at <= nu.created_at + $2
                                    THEN nu.id END)::decimal /
               NULLIF(COUNT(DISTINCT nu.id), 0)) * 100, 2) as activation_rate
      FROM new_users nu
      LEFT JOIN question_attempts qa ON nu.id = qa.user_id
    `, [sevenDaysAgo, twentyFourHoursMs]);

    // Practice mode distribution
    const modeDistributionResult = await pool.query(`
      SELECT
        quiz_mode,
        COUNT(*) as count,
        ROUND((COUNT(*)::decimal / (SELECT COUNT(*) FROM question_attempts WHERE quiz_mode IS NOT NULL)) * 100, 2) as percentage
      FROM question_attempts
      WHERE quiz_mode IS NOT NULL
      GROUP BY quiz_mode
    `);

    // Calculate average questions per session
    const avgQuestionsPerSession = await pool.query(`
      WITH session_counts AS (
        SELECT
          user_id,
          DATE(to_timestamp(attempted_at / 1000)) as practice_date,
          COUNT(*) as questions_answered
        FROM question_attempts
        GROUP BY user_id, DATE(to_timestamp(attempted_at / 1000))
      )
      SELECT
        AVG(questions_answered) as avg_questions_per_session,
        MAX(questions_answered) as max_questions_per_session
      FROM session_counts
    `);

    // Build the response
    const analytics = {
      // North Star Metrics
      northStar: {
        wau: parseInt(wauResult.rows[0]?.wau || '0'),
        dau: parseInt(dauResult.rows[0]?.dau || '0'),
        totalAttempts: parseInt(attemptsResult.rows[0]?.total_attempts || '0'),
        overallAccuracy: attemptsResult.rows[0]?.total_attempts > 0
          ? parseFloat(((attemptsResult.rows[0].correct_answers / attemptsResult.rows[0].total_attempts) * 100).toFixed(2))
          : 0,
      },

      // User metrics
      users: {
        total: parseInt(usersResult.rows[0]?.total_users || '0'),
        newLast7d: parseInt(usersResult.rows[0]?.users_last_7d || '0'),
        newLast30d: parseInt(usersResult.rows[0]?.users_last_30d || '0'),
        activePracticing: parseInt(attemptsResult.rows[0]?.unique_users_practicing || '0'),
      },

      // Engagement metrics
      engagement: {
        dau: parseInt(dauResult.rows[0]?.dau || '0'),
        wau: parseInt(wauResult.rows[0]?.wau || '0'),
        sessionsLast24h: parseInt(sessionsResult.rows[0]?.sessions_last_24h || '0'),
        sessionsLast7d: parseInt(sessionsResult.rows[0]?.sessions_last_7d || '0'),
        attemptsLast7d: parseInt(attemptsResult.rows[0]?.attempts_last_7d || '0'),
        avgQuestionsPerSession: parseFloat(avgQuestionsPerSession.rows[0]?.avg_questions_per_session || '0').toFixed(2),
        maxQuestionsPerSession: parseInt(avgQuestionsPerSession.rows[0]?.max_questions_per_session || '0'),
      },

      // Streak metrics
      streaks: {
        users3Plus: parseInt(streaksResult.rows[0]?.streaks_3_plus || '0'),
        users7Plus: parseInt(streaksResult.rows[0]?.streaks_7_plus || '0'),
        users14Plus: parseInt(streaksResult.rows[0]?.streaks_14_plus || '0'),
        users30Plus: parseInt(streaksResult.rows[0]?.streaks_30_plus || '0'),
        avgCurrentStreak: parseFloat(streaksResult.rows[0]?.avg_current_streak || '0').toFixed(2),
        maxStreak: parseInt(streaksResult.rows[0]?.max_streak || '0'),
      },

      // Accuracy metrics
      accuracy: {
        overall: attemptsResult.rows[0]?.total_attempts > 0
          ? parseFloat(((attemptsResult.rows[0].correct_answers / attemptsResult.rows[0].total_attempts) * 100).toFixed(2))
          : 0,
        byLevel: accuracyResult.rows.map(row => ({
          level: row.level,
          attempts: parseInt(row.total_attempts),
          correct: parseInt(row.correct),
          percentage: parseFloat(row.accuracy_percentage || '0'),
        })),
        bySubject: subjectAccuracyResult.rows.map(row => ({
          subject: row.subject,
          attempts: parseInt(row.total_attempts),
          correct: parseInt(row.correct),
          percentage: parseFloat(row.accuracy_percentage || '0'),
        })),
        byDifficulty: difficultyAccuracyResult.rows.map(row => ({
          difficulty: row.difficulty,
          attempts: parseInt(row.total_attempts),
          correct: parseInt(row.correct),
          percentage: parseFloat(row.accuracy_percentage || '0'),
        })),
      },

      // Retention metrics
      retention: {
        d1Rate: parseFloat(retentionResult.rows[0]?.d1_retention_rate || '0'),
        d7Rate: parseFloat(retentionResult.rows[0]?.d7_retention_rate || '0'),
        d30Rate: parseFloat(retentionResult.rows[0]?.d30_retention_rate || '0'),
        totalCohortUsers: parseInt(retentionResult.rows[0]?.total_users || '0'),
        activationRate: parseFloat(activationResult.rows[0]?.activation_rate || '0'),
        newUsersLast7d: parseInt(activationResult.rows[0]?.new_users || '0'),
        activatedUsers: parseInt(activationResult.rows[0]?.activated_users || '0'),
      },

      // Ensayo metrics
      ensayos: {
        total: parseInt(ensayoStatsResult.rows[0]?.total_ensayos || '0'),
        completed: parseInt(ensayoStatsResult.rows[0]?.completed_ensayos || '0'),
        upcoming: parseInt(ensayoStatsResult.rows[0]?.upcoming_ensayos || '0'),
        avgRegistrations: parseFloat(ensayoStatsResult.rows[0]?.avg_registrations_per_ensayo || '0').toFixed(2),
      },

      // Practice mode distribution
      practiceMode: modeDistributionResult.rows.map(row => ({
        mode: row.quiz_mode,
        count: parseInt(row.count),
        percentage: parseFloat(row.percentage || '0'),
      })),

      // Question coverage
      questionCoverage: {
        totalQuestions: questionCoverageResult.rows.length,
        mostAttempted: questionCoverageResult.rows[0]?.question_id || null,
        mostAttemptedCount: parseInt(questionCoverageResult.rows[0]?.attempt_count || '0'),
        leastAttemptedCount: parseInt(questionCoverageResult.rows[questionCoverageResult.rows.length - 1]?.attempt_count || '0'),
      },
    };

    res.json({
      success: true,
      data: analytics,
      timestamp: now,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics data',
    });
  }
};

/**
 * Get weekly trend data for charts
 */
export const getWeeklyTrends = async (req: Request, res: Response) => {
  try {
    const now = Date.now();
    const thirtyDaysAgo = subDays(now, 30).getTime();

    const trendsResult = await pool.query(`
      WITH daily_stats AS (
        SELECT
          DATE(to_timestamp(attempted_at / 1000)) as practice_date,
          COUNT(DISTINCT user_id) as active_users,
          COUNT(*) as total_attempts,
          SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct_attempts
        FROM question_attempts
        WHERE attempted_at >= $1
        GROUP BY DATE(to_timestamp(attempted_at / 1000))
        ORDER BY practice_date
      )
      SELECT
        practice_date,
        active_users,
        total_attempts,
        correct_attempts,
        ROUND((correct_attempts::decimal / NULLIF(total_attempts, 0)) * 100, 2) as accuracy_percentage
      FROM daily_stats
    `, [thirtyDaysAgo]);

    res.json({
      success: true,
      data: trendsResult.rows.map(row => ({
        date: row.practice_date,
        activeUsers: parseInt(row.active_users),
        totalAttempts: parseInt(row.total_attempts),
        correctAttempts: parseInt(row.correct_attempts),
        accuracyPercentage: parseFloat(row.accuracy_percentage || '0'),
      })),
    });
  } catch (error) {
    console.error('Error fetching weekly trends:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch weekly trends',
    });
  }
};
