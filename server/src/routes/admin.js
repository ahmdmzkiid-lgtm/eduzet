const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// GET /api/admin/stats - Dashboard statistics
router.get('/stats', verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    // Run all queries in parallel for performance
    const [
      usersResult,
      questionsResult,
      sessionsResult,
      subjectStatsResult,
      difficultyResult,
      recentUsersResult,
      recentQuestionsResult,
    ] = await Promise.all([
      // Total users
      pool.query("SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE role = 'student') as students, COUNT(*) FILTER (WHERE role = 'student' AND current_plan = 'premium') as premium_students, COUNT(*) FILTER (WHERE role = 'student' AND current_plan = 'sultan') as sultan_students, COUNT(*) FILTER (WHERE role = 'admin') as admins FROM users"),
      // Total questions
      pool.query("SELECT COUNT(*) as total FROM questions"),
      // Tryout sessions
      pool.query("SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE submitted_at IS NOT NULL) as completed FROM tryout_sessions"),
      // Questions per subject
      pool.query(`
        SELECT s.name, s.category, COUNT(q.id) as question_count 
        FROM subjects s 
        LEFT JOIN questions q ON q.subject_id = s.id 
        GROUP BY s.id, s.name, s.category 
        ORDER BY question_count DESC
      `),
      // Difficulty distribution
      pool.query("SELECT difficulty, COUNT(*) as count FROM questions GROUP BY difficulty"),
      // Recent users (last 10)
      pool.query("SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC LIMIT 10"),
      // Recent questions (last 5)
      pool.query(`
        SELECT q.id, q.content, q.difficulty, q.source, q.created_at, s.name as subject_name 
        FROM questions q 
        LEFT JOIN subjects s ON s.id = q.subject_id 
        ORDER BY q.created_at DESC LIMIT 5
      `),
    ]);

    res.json({
      success: true,
      data: {
        users: {
          total: parseInt(usersResult.rows[0].total),
          students: parseInt(usersResult.rows[0].students),
          premiumStudents: parseInt(usersResult.rows[0].premium_students),
          sultanStudents: parseInt(usersResult.rows[0].sultan_students),
          admins: parseInt(usersResult.rows[0].admins),
        },
        questions: {
          total: parseInt(questionsResult.rows[0].total),
        },
        sessions: {
          total: parseInt(sessionsResult.rows[0].total),
          completed: parseInt(sessionsResult.rows[0].completed),
        },
        subjectStats: subjectStatsResult.rows,
        difficultyDistribution: difficultyResult.rows,
        recentUsers: recentUsersResult.rows,
        recentQuestions: recentQuestionsResult.rows,
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/users - Paginated user list
router.get('/users', verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const role = req.query.role; // 'student', 'admin', or undefined for all
    const search = req.query.search || '';

    let whereClause = '';
    const params = [];
    const conditions = [];

    if (role) {
      params.push(role);
      conditions.push(`role = $${params.length}`);
    }
    if (search) {
      params.push(`%${search}%`);
      conditions.push(`(name ILIKE $${params.length} OR email ILIKE $${params.length})`);
    }
    if (conditions.length > 0) {
      whereClause = 'WHERE ' + conditions.join(' AND ');
    }

    const countResult = await pool.query(
      `SELECT COUNT(*) as total FROM users ${whereClause}`,
      params
    );

    const usersResult = await pool.query(
      `SELECT id, name, email, role, current_plan, created_at FROM users ${whereClause} ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
      [...params, limit, offset]
    );

    const total = parseInt(countResult.rows[0].total);

    res.json({
      success: true,
      data: {
        users: usersResult.rows,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/admin/users/:id/role - Update user role
router.patch('/users/:id/role', verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (!['student', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, error: 'Invalid role' });
    }
    const result = await pool.query(
      'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, name, email, role',
      [role, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, data: result.rows[0], message: 'Role updated successfully' });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/tryout-registrations - Paginated registrations
router.get('/tryout-registrations', verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const statusFilter = req.query.status;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    let whereClause = '';
    const params = [];

    if (statusFilter) {
      params.push(statusFilter);
      whereClause = `WHERE tr.status = $${params.length}`;
    }

    const countRes = await pool.query(
      `SELECT COUNT(*) as total FROM tryout_registrations tr ${whereClause}`,
      params
    );
    const total = parseInt(countRes.rows[0].total);

    const limitParam = params.length + 1;
    const offsetParam = params.length + 2;
    params.push(limit, offset);

    const query = `
      SELECT tr.*, 
             u.name as user_name, u.email as user_email, u.current_plan as user_plan,
             COALESCE(tp.title, utp.title) as package_title
      FROM tryout_registrations tr
      JOIN users u ON u.id = tr.user_id
      LEFT JOIN tryout_packages tp ON tp.id = tr.utbk_package_id
      LEFT JOIN um_tryout_packages utp ON utp.id = tr.um_package_id
      ${whereClause}
      ORDER BY tr.created_at DESC
      LIMIT $${limitParam} OFFSET $${offsetParam}
    `;

    const result = await pool.query(query, params);

    res.json({
      success: true,
      data: {
        registrations: result.rows,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/admin/tryout-registrations/:id - Approve or reject registration
router.patch('/tryout-registrations/:id', verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, rejection_reason } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Status tidak valid.' });
    }

    const check = await pool.query('SELECT * FROM tryout_registrations WHERE id = $1', [id]);
    if (check.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Pendaftaran tidak ditemukan.' });
    }

    const result = await pool.query(
      `UPDATE tryout_registrations 
       SET status = $1, rejection_reason = $2, updated_at = NOW() 
       WHERE id = $3 RETURNING *`,
      [status, status === 'rejected' ? rejection_reason : null, id]
    );

    res.json({
      success: true,
      data: result.rows[0],
      message: `Pendaftaran berhasil ${status === 'approved' ? 'disetujui' : 'ditolak'}.`
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
