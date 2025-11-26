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

    // Determine error type and provide specific message
    let errorMessage = 'Failed to fetch analytics data';
    let statusCode = 500;

    if (error instanceof Error) {
      // Database connection errors
      if (error.message.includes('connect') || error.message.includes('ECONNREFUSED')) {
        errorMessage = 'Database connection failed. Please check database availability.';
        statusCode = 503;
      }
      // Query timeout errors
      else if (error.message.includes('timeout') || error.message.includes('deadlock')) {
        errorMessage = 'Analytics query timed out. Please try again later.';
        statusCode = 504;
      }
      // Permission errors
      else if (error.message.includes('permission') || error.message.includes('access')) {
        errorMessage = 'Database permission error. Please contact system administrator.';
        statusCode = 500;
      }
      // Generic error with message
      else if (error.message) {
        errorMessage = `Analytics error: ${error.message}`;
      }
    }

    res.status(statusCode).json({
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : String(error)) : undefined,
    });
  }
};

/**
 * Get Product-Market Fit metrics
 * Tracks who is using the product and how engaged they are
 */
export const getPMFMetrics = async (req: Request, res: Response) => {
  try {
    const includeAdmins = req.query.includeAdmins === 'true';
    const now = Date.now();
    const oneDayAgo = subDays(now, 1).getTime();
    const sevenDaysAgo = subDays(now, 7).getTime();
    const fourteenDaysAgo = subDays(now, 14).getTime();
    const thirtyDaysAgo = subDays(now, 30).getTime();

    // Build admin filter condition
    const adminFilter = includeAdmins ? '' : "AND u.role != 'admin'";

    // Get active users this week with detailed engagement
    const activeUsersResult = await pool.query(`
      WITH user_activity AS (
        SELECT
          u.id,
          u.username,
          u.email,
          u.display_name,
          u.role,
          u.created_at,
          u.current_streak,
          u.longest_streak,
          COUNT(DISTINCT DATE(to_timestamp(qa.attempted_at / 1000))) as days_active_last_7d,
          COUNT(DISTINCT DATE(to_timestamp(qa2.attempted_at / 1000))) as days_active_last_30d,
          COUNT(qa.id) as questions_last_7d,
          COUNT(qa2.id) as questions_last_30d,
          SUM(COALESCE(qa.time_spent_seconds, 0)) as time_spent_last_7d_seconds,
          SUM(COALESCE(qa2.time_spent_seconds, 0)) as time_spent_last_30d_seconds,
          MAX(qa2.attempted_at) as last_active_at,
          SUM(CASE WHEN qa.is_correct THEN 1 ELSE 0 END) as correct_last_7d,
          SUM(CASE WHEN qa2.is_correct THEN 1 ELSE 0 END) as correct_last_30d
        FROM users u
        LEFT JOIN question_attempts qa ON u.id = qa.user_id AND qa.attempted_at >= $1
        LEFT JOIN question_attempts qa2 ON u.id = qa2.user_id AND qa2.attempted_at >= $2
        WHERE 1=1 ${adminFilter}
        GROUP BY u.id, u.username, u.email, u.display_name, u.role, u.created_at, u.current_streak, u.longest_streak
      )
      SELECT
        id,
        username,
        email,
        display_name,
        role,
        created_at,
        current_streak,
        longest_streak,
        days_active_last_7d,
        days_active_last_30d,
        questions_last_7d,
        questions_last_30d,
        time_spent_last_7d_seconds,
        time_spent_last_30d_seconds,
        last_active_at,
        correct_last_7d,
        correct_last_30d,
        CASE
          WHEN days_active_last_7d >= 5 THEN 'power'
          WHEN days_active_last_7d >= 3 THEN 'regular'
          WHEN days_active_last_7d >= 1 THEN 'casual'
          WHEN last_active_at >= $3 THEN 'dormant'
          ELSE 'new'
        END as user_segment,
        (days_active_last_7d * 10 + questions_last_7d + current_streak * 5) as engagement_score
      FROM user_activity
      ORDER BY engagement_score DESC
    `, [sevenDaysAgo, thirtyDaysAgo, fourteenDaysAgo]);

    // Calculate PMF summary metrics
    const powerUsers = activeUsersResult.rows.filter(u => u.user_segment === 'power').length;
    const regularUsers = activeUsersResult.rows.filter(u => u.user_segment === 'regular').length;
    const casualUsers = activeUsersResult.rows.filter(u => u.user_segment === 'casual').length;
    const dormantUsers = activeUsersResult.rows.filter(u => u.user_segment === 'dormant').length;
    const newUsers = activeUsersResult.rows.filter(u => u.user_segment === 'new').length;

    const activeThisWeek = activeUsersResult.rows.filter(u => u.days_active_last_7d > 0).length;
    const totalUsers = activeUsersResult.rows.length;

    // Calculate total time spent
    const totalTimeSpent7d = activeUsersResult.rows.reduce((sum, u) => sum + parseInt(u.time_spent_last_7d_seconds || '0'), 0);
    const totalTimeSpent30d = activeUsersResult.rows.reduce((sum, u) => sum + parseInt(u.time_spent_last_30d_seconds || '0'), 0);

    // Get weekly activity trend
    const weeklyTrendResult = await pool.query(`
      WITH date_series AS (
        SELECT generate_series(
          DATE(to_timestamp($1 / 1000)),
          DATE(to_timestamp($2 / 1000)),
          '1 day'::interval
        ) as practice_date
      ),
      daily_activity AS (
        SELECT
          DATE(to_timestamp(qa.attempted_at / 1000)) as practice_date,
          COUNT(DISTINCT qa.user_id) as active_users,
          COUNT(*) as questions_answered
        FROM question_attempts qa
        JOIN users u ON qa.user_id = u.id
        WHERE qa.attempted_at >= $1
        ${adminFilter}
        GROUP BY DATE(to_timestamp(qa.attempted_at / 1000))
      )
      SELECT
        ds.practice_date,
        COALESCE(da.active_users, 0) as active_users,
        COALESCE(da.questions_answered, 0) as questions_answered
      FROM date_series ds
      LEFT JOIN daily_activity da ON ds.practice_date = da.practice_date
      ORDER BY ds.practice_date
    `, [thirtyDaysAgo, now]);

    // Get cohort retention data
    const cohortRetentionResult = await pool.query(`
      WITH weekly_cohorts AS (
        SELECT
          u.id,
          u.username,
          DATE_TRUNC('week', to_timestamp(u.created_at / 1000)) as cohort_week,
          u.created_at
        FROM users u
        WHERE u.created_at >= $1
        ${adminFilter}
      ),
      cohort_activity AS (
        SELECT
          wc.cohort_week,
          COUNT(DISTINCT wc.id) as cohort_size,
          COUNT(DISTINCT CASE WHEN qa.attempted_at >= wc.created_at + 604800000::bigint
                                   AND qa.attempted_at < wc.created_at + 1209600000::bigint
                              THEN wc.id END) as week_1_retained,
          COUNT(DISTINCT CASE WHEN qa.attempted_at >= wc.created_at + 1209600000::bigint
                                   AND qa.attempted_at < wc.created_at + 1814400000::bigint
                              THEN wc.id END) as week_2_retained,
          COUNT(DISTINCT CASE WHEN qa.attempted_at >= wc.created_at + 1814400000::bigint
                                   AND qa.attempted_at < wc.created_at + 2419200000::bigint
                              THEN wc.id END) as week_3_retained,
          COUNT(DISTINCT CASE WHEN qa.attempted_at >= wc.created_at + 2419200000::bigint
                              THEN wc.id END) as week_4_retained
        FROM weekly_cohorts wc
        LEFT JOIN question_attempts qa ON wc.id = qa.user_id
        GROUP BY wc.cohort_week
        ORDER BY wc.cohort_week DESC
      )
      SELECT
        cohort_week,
        cohort_size,
        week_1_retained,
        week_2_retained,
        week_3_retained,
        week_4_retained,
        ROUND((week_1_retained::decimal / NULLIF(cohort_size, 0)) * 100, 2) as week_1_retention_rate,
        ROUND((week_2_retained::decimal / NULLIF(cohort_size, 0)) * 100, 2) as week_2_retention_rate,
        ROUND((week_3_retained::decimal / NULLIF(cohort_size, 0)) * 100, 2) as week_3_retention_rate,
        ROUND((week_4_retained::decimal / NULLIF(cohort_size, 0)) * 100, 2) as week_4_retention_rate
      FROM cohort_activity
    `, [thirtyDaysAgo]);

    // Feature adoption metrics
    const featureAdoptionResult = await pool.query(`
      WITH user_features AS (
        SELECT
          u.id,
          MAX(CASE WHEN qa.quiz_mode = 'zen' THEN 1 ELSE 0 END) as used_zen,
          MAX(CASE WHEN qa.quiz_mode = 'rapidfire' THEN 1 ELSE 0 END) as used_rapidfire,
          MAX(CASE WHEN sp.id IS NOT NULL THEN 1 ELSE 0 END) as used_live_sessions
        FROM users u
        LEFT JOIN question_attempts qa ON u.id = qa.user_id AND qa.attempted_at >= $1
        LEFT JOIN session_participants sp ON u.id = sp.user_id
        LEFT JOIN sessions s ON sp.session_id = s.id AND s.started_at >= $1
        WHERE 1=1 ${adminFilter}
        GROUP BY u.id
      )
      SELECT
        COUNT(*) as total_users,
        SUM(used_zen) as zen_users,
        SUM(used_rapidfire) as rapidfire_users,
        SUM(used_live_sessions) as live_session_users,
        ROUND((SUM(used_zen)::decimal / NULLIF(COUNT(*), 0)) * 100, 2) as zen_adoption_rate,
        ROUND((SUM(used_rapidfire)::decimal / NULLIF(COUNT(*), 0)) * 100, 2) as rapidfire_adoption_rate,
        ROUND((SUM(used_live_sessions)::decimal / NULLIF(COUNT(*), 0)) * 100, 2) as live_session_adoption_rate
      FROM user_features
    `, [sevenDaysAgo]);

    // Calculate PMF score (0-100)
    // Based on: power users %, retention, engagement depth
    const powerUserPercentage = totalUsers > 0 ? (powerUsers / totalUsers) * 100 : 0;
    const activePercentage = totalUsers > 0 ? (activeThisWeek / totalUsers) * 100 : 0;
    const avgQuestionsPerActiveUser = activeThisWeek > 0
      ? activeUsersResult.rows.filter(u => u.days_active_last_7d > 0)
          .reduce((sum, u) => sum + parseInt(u.questions_last_7d || '0'), 0) / activeThisWeek
      : 0;

    const pmfScore = Math.min(100, Math.round(
      (powerUserPercentage * 0.4) +
      (activePercentage * 0.3) +
      (Math.min(avgQuestionsPerActiveUser / 50, 1) * 30)
    ));

    res.json({
      success: true,
      data: {
        includeAdmins,
        pmfScore,
        summary: {
          totalUsers,
          activeThisWeek,
          powerUsers,
          regularUsers,
          casualUsers,
          dormantUsers,
          newUsers,
          powerUserPercentage: parseFloat(powerUserPercentage.toFixed(2)),
          activePercentage: parseFloat(activePercentage.toFixed(2)),
          totalTimeSpent7d: totalTimeSpent7d,
          totalTimeSpent30d: totalTimeSpent30d,
          avgTimePerUser7d: activeThisWeek > 0 ? Math.round(totalTimeSpent7d / activeThisWeek) : 0,
          avgQuestionsPerActiveUser: parseFloat(avgQuestionsPerActiveUser.toFixed(2)),
        },
        users: activeUsersResult.rows.map(row => ({
          id: row.id,
          username: row.username,
          email: row.email,
          displayName: row.display_name,
          role: row.role,
          createdAt: Number(row.created_at),
          currentStreak: parseInt(row.current_streak || '0'),
          longestStreak: parseInt(row.longest_streak || '0'),
          daysActive7d: parseInt(row.days_active_last_7d || '0'),
          daysActive30d: parseInt(row.days_active_last_30d || '0'),
          questions7d: parseInt(row.questions_last_7d || '0'),
          questions30d: parseInt(row.questions_last_30d || '0'),
          timeSpent7d: parseInt(row.time_spent_last_7d_seconds || '0'),
          timeSpent30d: parseInt(row.time_spent_last_30d_seconds || '0'),
          lastActiveAt: row.last_active_at ? Number(row.last_active_at) : null,
          accuracy7d: row.questions_last_7d > 0
            ? parseFloat(((row.correct_last_7d / row.questions_last_7d) * 100).toFixed(2))
            : 0,
          accuracy30d: row.questions_last_30d > 0
            ? parseFloat(((row.correct_last_30d / row.questions_last_30d) * 100).toFixed(2))
            : 0,
          segment: row.user_segment,
          engagementScore: parseInt(row.engagement_score || '0'),
        })),
        weeklyTrend: weeklyTrendResult.rows.map(row => ({
          date: row.practice_date,
          activeUsers: parseInt(row.active_users || '0'),
          questionsAnswered: parseInt(row.questions_answered || '0'),
        })),
        cohortRetention: cohortRetentionResult.rows.map(row => ({
          cohortWeek: row.cohort_week,
          cohortSize: parseInt(row.cohort_size || '0'),
          week1Retained: parseInt(row.week_1_retained || '0'),
          week2Retained: parseInt(row.week_2_retained || '0'),
          week3Retained: parseInt(row.week_3_retained || '0'),
          week4Retained: parseInt(row.week_4_retained || '0'),
          week1Rate: parseFloat(row.week_1_retention_rate || '0'),
          week2Rate: parseFloat(row.week_2_retention_rate || '0'),
          week3Rate: parseFloat(row.week_3_retention_rate || '0'),
          week4Rate: parseFloat(row.week_4_retention_rate || '0'),
        })),
        featureAdoption: {
          totalUsers: parseInt(featureAdoptionResult.rows[0]?.total_users || '0'),
          zenUsers: parseInt(featureAdoptionResult.rows[0]?.zen_users || '0'),
          rapidfireUsers: parseInt(featureAdoptionResult.rows[0]?.rapidfire_users || '0'),
          liveSessionUsers: parseInt(featureAdoptionResult.rows[0]?.live_session_users || '0'),
          zenAdoptionRate: parseFloat(featureAdoptionResult.rows[0]?.zen_adoption_rate || '0'),
          rapidfireAdoptionRate: parseFloat(featureAdoptionResult.rows[0]?.rapidfire_adoption_rate || '0'),
          liveSessionAdoptionRate: parseFloat(featureAdoptionResult.rows[0]?.live_session_adoption_rate || '0'),
        },
      },
      timestamp: now,
    });
  } catch (error) {
    console.error('Error fetching PMF metrics:', error);

    let errorMessage = 'Failed to fetch PMF metrics';
    let statusCode = 500;

    if (error instanceof Error) {
      if (error.message.includes('connect') || error.message.includes('ECONNREFUSED')) {
        errorMessage = 'Database connection failed. Please check database availability.';
        statusCode = 503;
      } else if (error.message.includes('timeout') || error.message.includes('deadlock')) {
        errorMessage = 'PMF metrics query timed out. Please try again later.';
        statusCode = 504;
      } else if (error.message) {
        errorMessage = `PMF metrics error: ${error.message}`;
      }
    }

    res.status(statusCode).json({
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : String(error)) : undefined,
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

    // Determine error type and provide specific message
    let errorMessage = 'Failed to fetch weekly trends';
    let statusCode = 500;

    if (error instanceof Error) {
      if (error.message.includes('connect') || error.message.includes('ECONNREFUSED')) {
        errorMessage = 'Database connection failed. Please check database availability.';
        statusCode = 503;
      } else if (error.message.includes('timeout') || error.message.includes('deadlock')) {
        errorMessage = 'Weekly trends query timed out. Please try again later.';
        statusCode = 504;
      } else if (error.message) {
        errorMessage = `Weekly trends error: ${error.message}`;
      }
    }

    res.status(statusCode).json({
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : String(error)) : undefined,
    });
  }
};
