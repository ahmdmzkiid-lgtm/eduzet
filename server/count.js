const { pool } = require('./src/config/db');

async function checkQuestions() {
  try {
    const res = await pool.query("SELECT count(*) FROM questions WHERE subject_id = (SELECT id FROM subjects WHERE title = 'Penalaran Umum') AND source = 'battle'");
    console.log(res.rows);
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}

checkQuestions();
