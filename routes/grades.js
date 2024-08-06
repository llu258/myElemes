const express = require('express');
const jwt = require('jsonwebtoken');
const Grades = require('../models/Grades');
const User = require('../models/User');
const passport = require('../auth/passport');
const router = express.Router();

// Middleware to check for token and role
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = decoded;
    next();
  });
};

// Submit a grade for a student
router.post('/', authenticateJWT, async (req, res) => {
  if (req.user.role !== 'teacher') return res.status(403).json({ error: 'Access denied' });

  const { studentId, subject, grade } = req.body;

  try {
    const student = await User.findOne({ where: { studentId } });
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const newGrade = await Grades.create({ studentId, subject, grade });
    res.json(newGrade);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all grades for a student based on studentId
router.get('/', authenticateJWT, async (req, res) => {
  const { studentId } = req.query;

  try {
    const grades = await Grades.findAll({ where: { studentId } });
    res.json(grades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;