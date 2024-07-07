// routes/grades.js

const express = require('express');
const passport = require('passport');
const Grade = require('../models/Grades');
const User = require('../models/User');
const router = express.Router();

// Middleware to protect routes
const authenticate = passport.authenticate('jwt', { session: false });

// Submit a grade (for teachers)
router.post('/', authenticate, async (req, res) => {
    if (req.user.role !== 'teacher') return res.status(403).json({ error: 'Forbidden' });
    const { studentId, grade } = req.body;
    try {
        const newGrade = await Grade.create({ studentId, grade });
        res.json(newGrade);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// View grades (for students and analysts)
router.get('/', authenticate, async (req, res) => {
    try {
        const query = req.user.role === 'admin' ? {} : { studentId: req.user.id };
        const grades = await Grade.findAll({ where: query });
        res.json(grades);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
