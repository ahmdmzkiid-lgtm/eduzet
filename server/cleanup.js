const { pool } = require('./src/config/db');

async function cleanup() {
  try {
    const res = await pool.query("UPDATE battle_matches SET status = 'completed', completed_at = NOW() WHERE status IN ('waiting', 'active')");
    console.log('Cleaned up', res.rowCount, 'stale matches');
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}

cleanup();
