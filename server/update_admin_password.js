/**
 * Script to update admin password
 * Usage: node update_admin_password.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const bcrypt = require('bcrypt');
const { pool } = require('./src/config/db');

const NEW_PASSWORD = 'Eduzetahmdmzki12@!';

async function updateAdminPassword() {
  try {
    // Find all admin users
    const admins = await pool.query(
      "SELECT id, name, email FROM users WHERE role = 'admin'"
    );

    if (admins.rows.length === 0) {
      console.log('❌ No admin users found in the database.');
      process.exit(1);
    }

    console.log(`Found ${admins.rows.length} admin user(s):`);
    admins.rows.forEach(a => console.log(`  - ${a.email} (ID: ${a.id}, Name: ${a.name})`));

    // Hash the new password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(NEW_PASSWORD, saltRounds);

    // Update all admin passwords
    const result = await pool.query(
      "UPDATE users SET password_hash = $1 WHERE role = 'admin' RETURNING id, email",
      [passwordHash]
    );

    console.log(`\n✅ Password updated for ${result.rows.length} admin(s):`);
    result.rows.forEach(r => console.log(`  - ${r.email}`));
    console.log(`\n🔑 New password: ${NEW_PASSWORD}`);
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

updateAdminPassword();
