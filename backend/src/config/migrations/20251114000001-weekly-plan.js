'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Migration: Add Weekly Plan for Payment MVP
 *
 * Adds a new weekly subscription plan with:
 * - Price: $2.900 CLP
 * - Duration: 7 days
 * - Trial: 7 days free
 * - Display order: 0 (first in list)
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    const sql = fs.readFileSync(
      path.join(__dirname, '006_weekly_plan.sql'),
      'utf8'
    );
    await queryInterface.sequelize.query(sql);
  },

  async down(queryInterface, Sequelize) {
    // Revert the changes
    await queryInterface.sequelize.query(`
      -- Remove weekly plan
      DELETE FROM plans WHERE id = 'weekly';

      -- Restore original display orders
      UPDATE plans SET display_order = 1, updated_at = EXTRACT(EPOCH FROM NOW()) * 1000
      WHERE id = 'student';

      UPDATE plans SET display_order = 2, updated_at = EXTRACT(EPOCH FROM NOW()) * 1000
      WHERE id = 'free';

      UPDATE plans SET display_order = 2, updated_at = EXTRACT(EPOCH FROM NOW()) * 1000
      WHERE id = 'trial';

      UPDATE plans SET display_order = 4, updated_at = EXTRACT(EPOCH FROM NOW()) * 1000
      WHERE id = 'basic';

      UPDATE plans SET display_order = 5, updated_at = EXTRACT(EPOCH FROM NOW()) * 1000
      WHERE id = 'premium';
    `);
  }
};
