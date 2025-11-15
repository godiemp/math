'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Migration: Add cookie_consent field to users table
 *
 * Adds a column to track user's cookie consent preference:
 * - 'accepted': User accepted all cookies (analytics, tracking, etc.)
 * - 'declined': User declined optional cookies (essential only)
 * - NULL: User has not made a choice yet
 *
 * This allows preferences to persist across devices and browser clears.
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    const sql = fs.readFileSync(
      path.join(__dirname, '007_cookie_consent.sql'),
      'utf8'
    );
    await queryInterface.sequelize.query(sql);
  },

  async down(queryInterface, Sequelize) {
    // Revert the changes
    await queryInterface.sequelize.query(`
      ALTER TABLE users DROP COLUMN IF EXISTS cookie_consent;
    `);
  }
};
