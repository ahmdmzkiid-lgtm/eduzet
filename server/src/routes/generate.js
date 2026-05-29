const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const { generateQuestions } = require('../services/geminiService');

router.post('/ai', verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const { subject_id, topic, difficulty, count } = req.body;
    
    if (!subject_id || !topic || !count) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }
    
    // Get subject name
    const subjectRes = await pool.query('SELECT name FROM subjects WHERE id = $1', [subject_id]);
    if (subjectRes.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Subject not found' });
    }
    const subjectName = subjectRes.rows[0].name;
    
    const questions = await generateQuestions(subjectName, topic, difficulty || 'medium', parseInt(count));
    
    res.json({ 
      success: true, 
      data: questions, 
      message: 'Questions generated successfully. Preview before saving.' 
    });
  } catch (error) {
    console.error('Generate AI error:', error.message);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Gagal generate soal. Coba lagi.' 
    });
  }
});

module.exports = router;
