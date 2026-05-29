const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function checkUsers() {
  try {
    const result = await pool.query('SELECT id, email, name, role FROM users');
    console.log('Users in database:');
    console.table(result.rows);
  } catch (err) {
    console.error('Error querying users:', err.message);
  } finally {
    await pool.end();
  }
}

checkUsers();
