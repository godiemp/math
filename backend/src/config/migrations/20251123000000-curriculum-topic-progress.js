/**
 * Migration: Create curriculum_topic_progress table
 * This table tracks user knowledge of curriculum topics (skill tree)
 */

const fs = require('fs');
const path = require('path');

exports.up = async function(db) {
  const filePath = path.join(__dirname, '008_curriculum_topic_progress.sql');
  const sql = fs.readFileSync(filePath, 'utf8');
  await db.runSql(sql);
};

exports.down = async function(db) {
  await db.runSql(`
    DROP INDEX IF EXISTS idx_curriculum_progress_level_subject;
    DROP INDEX IF EXISTS idx_curriculum_progress_user;
    DROP TABLE IF EXISTS curriculum_topic_progress;
  `);
};

exports._meta = {
  version: 1
};
