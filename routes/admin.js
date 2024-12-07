const express = require('express');
const User = require('../models/User');
const Log = require('../models/Log');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

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

const checkAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
};

router.get('/', authenticateJWT, checkAdmin, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/logs', async (req, res) => {
  try {
    const logs = await Log.findAll();
    res.json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error); // Log the error details
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});



router.post('/', authenticateJWT, checkAdmin, async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    let studentId = null;
    if (role === 'student') {
      studentId = uuidv4();
    }
    const newUser = await User.create({ name, email, password: hashedPassword, role, studentId });
    await Log.create({ message: `User ${newUser.name} added`, timestamp: new Date() });
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', authenticateJWT, checkAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    user.role = role || user.role;
    await user.save();
    await Log.create({ message: `User ${user.name} updated`, timestamp: new Date() });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', authenticateJWT, checkAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.destroy();
    await Log.create({ message: `User ${user.name} deleted`, timestamp: new Date() });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
