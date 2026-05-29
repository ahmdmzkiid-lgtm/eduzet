const { pool } = require('./src/config/db');

async function checkSubjects() {
  try {
    const res = await pool.query("SELECT id, title, name FROM subjects");
    console.log(JSON.stringify(res.rows, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}

checkSubjects();
