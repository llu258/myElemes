// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('../auth/passport');

const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // UUID for unique student ID

// User registration
router.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        let studentId = null;
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists. Please login' });
        }

        if (role === 'student') {
            studentId = uuidv4(); // Generate a unique student ID
        }

        const user = await User.create({ name, email, password: hashedPassword, role, studentId });
        res.json(user);
    } catch (error) {
        console.error('Error during user signup:', error); // Log detailed error
        res.status(400).json({ error: error.message });
    }
});

  

// User login
router.post('/login', async (req, res) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) return res.status(400).json({ error: info.message });
      const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret');
      return res.json({ token, name: user.name });
    })(req, res);
  });
  

module.exports = router;