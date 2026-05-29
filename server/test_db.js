const { pool } = require('./src/config/db');
async function run() {
  try {
    const res = await pool.query(
      `SELECT bl.user_id, u.name as username, u.name as full_name, bl.subject_name,
              bl.total_matches, bl.wins, bl.losses, bl.total_points,
              CASE WHEN bl.total_matches > 0 THEN ROUND((bl.wins::numeric / bl.total_matches) * 100, 1) ELSE 0 END as win_rate
       FROM battle_leaderboard bl JOIN users u ON u.id = bl.user_id
       WHERE bl.subject_id = $1 ORDER BY bl.total_points DESC, bl.wins DESC LIMIT 50`,
      ['122b85ce-2a05-467e-bbbb-821319e4ac8f']
    );
    console.log('✅ Leaderboard query works! (' + res.rows.length + ' rows)');
    console.log(JSON.stringify(res.rows, null, 2));
  } catch (e) {
    console.error('❌ Error:', e.message);
  } finally {
    process.exit(0);
  }
}
run();
