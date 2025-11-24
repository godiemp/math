import { pool } from '../config/database';

/**
 * Clean up old seed sessions to allow re-seeding with corrected data
 */
async function cleanSeedSessions() {
  try {
    console.log('🧹 Cleaning up old seed sessions...');

    // Delete seed session participants first (foreign key constraint)
    const participantsResult = await pool.query(
      `DELETE FROM session_participants WHERE session_id LIKE 'seed-session-%'`
    );
    console.log(`✅ Deleted ${participantsResult.rowCount} seed session participants`);

    // Delete seed sessions
    const sessionsResult = await pool.query(
      `DELETE FROM sessions WHERE id LIKE 'seed-session-%'`
    );
    console.log(`✅ Deleted ${sessionsResult.rowCount} seed sessions`);

    console.log('\n✅ Cleanup complete! You can now re-run the seed script.');
  } catch (error) {
    console.error('❌ Error cleaning seed sessions:', error);
    throw error;
  } finally {
    await pool.end();
    process.exit(0);
  }
}

cleanSeedSessions();
