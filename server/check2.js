const { pool } = require('./src/config/db');

async function checkQuestions() {
  try {
    const res = await pool.query("SELECT content, COUNT(*) as count FROM questions WHERE subject_id = (SELECT id FROM subjects WHERE title = 'Penalaran Umum') AND source = 'battle' GROUP BY content HAVING COUNT(*) > 1");
    console.log(JSON.stringify(res.rows, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}

checkQuestions();
