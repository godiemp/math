const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:QDjziVCSkqYuKRlFbsMrXStAzWVJhhvM@trolley.proxy.rlwy.net:17475/railway',
  ssl: { rejectUnauthorized: false } // Public Railway connection
});

async function queryProductionData() {
  try {
    console.log('='.repeat(80));
    console.log('PRODUCTION DATABASE SUMMARY');
    console.log('='.repeat(80));
    console.log();

    // Users
    console.log('📊 USERS');
    console.log('-'.repeat(80));
    const usersCount = await pool.query('SELECT COUNT(*) as count FROM users');
    console.log(`Total Users: ${usersCount.rows[0].count}`);

    const usersByRole = await pool.query(`
      SELECT role, COUNT(*) as count
      FROM users
      GROUP BY role
      ORDER BY count DESC
    `);
    console.log('\nUsers by Role:');
    usersByRole.rows.forEach(row => {
      console.log(`  ${row.role}: ${row.count}`);
    });

    const recentUsers = await pool.query(`
      SELECT id, email, role, created_at
      FROM users
      ORDER BY created_at DESC
      LIMIT 5
    `);
    console.log('\nMost Recent Users:');
    recentUsers.rows.forEach(row => {
      console.log(`  ${row.email} (${row.role}) - ${row.created_at.toISOString().split('T')[0]}`);
    });
    console.log();

    // Subscriptions
    console.log('💳 SUBSCRIPTIONS');
    console.log('-'.repeat(80));
    const subsCount = await pool.query('SELECT COUNT(*) as count FROM subscriptions');
    console.log(`Total Subscriptions: ${subsCount.rows[0].count}`);

    const subsByStatus = await pool.query(`
      SELECT status, COUNT(*) as count
      FROM subscriptions
      GROUP BY status
      ORDER BY count DESC
    `);
    console.log('\nSubscriptions by Status:');
    subsByStatus.rows.forEach(row => {
      console.log(`  ${row.status}: ${row.count}`);
    });

    const subsByPlan = await pool.query(`
      SELECT plan_name, COUNT(*) as count
      FROM subscriptions
      GROUP BY plan_name
      ORDER BY count DESC
    `);
    console.log('\nSubscriptions by Plan:');
    subsByPlan.rows.forEach(row => {
      console.log(`  ${row.plan_name}: ${row.count}`);
    });
    console.log();

    // Payments
    console.log('💰 PAYMENTS');
    console.log('-'.repeat(80));
    const paymentsCount = await pool.query('SELECT COUNT(*) as count FROM payments');
    console.log(`Total Payments: ${paymentsCount.rows[0].count}`);

    const paymentsByStatus = await pool.query(`
      SELECT status, COUNT(*) as count
      FROM payments
      GROUP BY status
      ORDER BY count DESC
    `);
    console.log('\nPayments by Status:');
    paymentsByStatus.rows.forEach(row => {
      console.log(`  ${row.status}: ${row.count}`);
    });

    const totalRevenue = await pool.query(`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM payments
      WHERE status = 'approved'
    `);
    console.log(`\nTotal Revenue (Approved): $${totalRevenue.rows[0].total}`);
    console.log();

    // Quiz Sessions
    console.log('📝 QUIZ SESSIONS');
    console.log('-'.repeat(80));
    const quizSessions = await pool.query('SELECT COUNT(*) as count FROM quiz_sessions');
    console.log(`Total Quiz Sessions: ${quizSessions.rows[0].count}`);

    const quizAttempts = await pool.query('SELECT COUNT(*) as count FROM quiz_attempts');
    console.log(`Total Quiz Attempts: ${quizAttempts.rows[0].count}`);

    const avgScore = await pool.query(`
      SELECT AVG(score) as avg_score
      FROM quiz_attempts
      WHERE score IS NOT NULL
    `);
    console.log(`Average Quiz Score: ${avgScore.rows[0].avg_score ? parseFloat(avgScore.rows[0].avg_score).toFixed(2) : 'N/A'}%`);
    console.log();

    // Questions
    console.log('❓ QUESTIONS');
    console.log('-'.repeat(80));
    const questionsCount = await pool.query('SELECT COUNT(*) as count FROM questions');
    console.log(`Total Questions: ${questionsCount.rows[0].count}`);

    const questionsByDifficulty = await pool.query(`
      SELECT difficulty, COUNT(*) as count
      FROM questions
      GROUP BY difficulty
      ORDER BY count DESC
    `);
    console.log('\nQuestions by Difficulty:');
    questionsByDifficulty.rows.forEach(row => {
      console.log(`  ${row.difficulty || 'Not specified'}: ${row.count}`);
    });

    const questionsByTheme = await pool.query(`
      SELECT thematic_unit, COUNT(*) as count
      FROM questions
      GROUP BY thematic_unit
      ORDER BY count DESC
      LIMIT 10
    `);
    console.log('\nTop 10 Thematic Units:');
    questionsByTheme.rows.forEach(row => {
      console.log(`  ${row.thematic_unit || 'Not specified'}: ${row.count}`);
    });
    console.log();

    // Abstract Problems
    console.log('🧩 ABSTRACT PROBLEMS');
    console.log('-'.repeat(80));
    const abstractProblems = await pool.query('SELECT COUNT(*) as count FROM abstract_problems');
    console.log(`Total Abstract Problems: ${abstractProblems.rows[0].count}`);

    const abstractByStatus = await pool.query(`
      SELECT status, COUNT(*) as count
      FROM abstract_problems
      GROUP BY status
      ORDER BY count DESC
    `);
    console.log('\nAbstract Problems by Status:');
    abstractByStatus.rows.forEach(row => {
      console.log(`  ${row.status}: ${row.count}`);
    });

    const abstractByDifficulty = await pool.query(`
      SELECT difficulty, COUNT(*) as count
      FROM abstract_problems
      GROUP BY difficulty
      ORDER BY
        CASE difficulty
          WHEN 'básico' THEN 1
          WHEN 'intermedio' THEN 2
          WHEN 'avanzado' THEN 3
          ELSE 4
        END
    `);
    console.log('\nAbstract Problems by Difficulty:');
    abstractByDifficulty.rows.forEach(row => {
      console.log(`  ${row.difficulty}: ${row.count}`);
    });
    console.log();

    // Context Problems
    console.log('📚 CONTEXT PROBLEMS');
    console.log('-'.repeat(80));
    const contextProblems = await pool.query('SELECT COUNT(*) as count FROM context_problems');
    console.log(`Total Context Problems: ${contextProblems.rows[0].count}`);
    console.log();

    // AI Interactions
    console.log('🤖 AI INTERACTIONS');
    console.log('-'.repeat(80));
    const aiInteractions = await pool.query('SELECT COUNT(*) as count FROM ai_interactions');
    console.log(`Total AI Interactions: ${aiInteractions.rows[0].count}`);

    const aiByType = await pool.query(`
      SELECT interaction_type, COUNT(*) as count
      FROM ai_interactions
      GROUP BY interaction_type
      ORDER BY count DESC
    `);
    console.log('\nAI Interactions by Type:');
    aiByType.rows.forEach(row => {
      console.log(`  ${row.interaction_type}: ${row.count}`);
    });
    console.log();

    // Sessions (Live Practice)
    console.log('🎯 LIVE PRACTICE SESSIONS (Ensayos)');
    console.log('-'.repeat(80));
    const sessions = await pool.query('SELECT COUNT(*) as count FROM sessions');
    console.log(`Total Sessions: ${sessions.rows[0].count}`);

    const sessionParticipants = await pool.query('SELECT COUNT(*) as count FROM session_participants');
    console.log(`Total Session Participants: ${sessionParticipants.rows[0].count}`);
    console.log();

    // Operations Practice
    console.log('➕ OPERATIONS PRACTICE');
    console.log('-'.repeat(80));
    const opsProgress = await pool.query('SELECT COUNT(*) as count FROM operations_practice_progress');
    console.log(`Users with Operations Practice Progress: ${opsProgress.rows[0].count}`);

    const opsAttempts = await pool.query('SELECT COUNT(*) as count FROM operations_practice_attempts');
    console.log(`Total Operations Practice Attempts: ${opsAttempts.rows[0].count}`);

    const opsAvgAccuracy = await pool.query(`
      SELECT AVG(CASE WHEN is_correct THEN 1.0 ELSE 0.0 END) * 100 as accuracy
      FROM operations_practice_attempts
    `);
    console.log(`Average Operations Accuracy: ${opsAvgAccuracy.rows[0].accuracy ? parseFloat(opsAvgAccuracy.rows[0].accuracy).toFixed(2) : 'N/A'}%`);
    console.log();

    // Thematic Units
    console.log('📖 THEMATIC UNITS');
    console.log('-'.repeat(80));
    const thematicUnits = await pool.query('SELECT COUNT(*) as count FROM thematic_units');
    console.log(`Total Thematic Units: ${thematicUnits.rows[0].count}`);

    const topUnits = await pool.query(`
      SELECT name, question_count
      FROM thematic_units
      ORDER BY question_count DESC
      LIMIT 5
    `);
    console.log('\nTop 5 Thematic Units by Question Count:');
    topUnits.rows.forEach(row => {
      console.log(`  ${row.name}: ${row.question_count} questions`);
    });
    console.log();

    // PAES Predictions
    console.log('📈 PAES PREDICTIONS');
    console.log('-'.repeat(80));
    const predictions = await pool.query('SELECT COUNT(*) as count FROM paes_predictions');
    console.log(`Total PAES Predictions: ${predictions.rows[0].count}`);

    const avgPrediction = await pool.query(`
      SELECT AVG(predicted_score) as avg_score
      FROM paes_predictions
    `);
    console.log(`Average Predicted Score: ${avgPrediction.rows[0].avg_score ? parseFloat(avgPrediction.rows[0].avg_score).toFixed(0) : 'N/A'}/1000`);
    console.log();

    // Recent Activity
    console.log('🕐 RECENT ACTIVITY');
    console.log('-'.repeat(80));
    const recentQuizzes = await pool.query(`
      SELECT created_at::date as date, COUNT(*) as count
      FROM quiz_attempts
      WHERE created_at > NOW() - INTERVAL '7 days'
      GROUP BY created_at::date
      ORDER BY date DESC
    `);
    console.log('Quiz Attempts (Last 7 Days):');
    recentQuizzes.rows.forEach(row => {
      console.log(`  ${row.date.toISOString().split('T')[0]}: ${row.count} attempts`);
    });
    console.log();

    console.log('='.repeat(80));
    console.log('END OF REPORT');
    console.log('='.repeat(80));

  } catch (error) {
    console.error('Error querying database:', error);
  } finally {
    await pool.end();
  }
}

queryProductionData();
