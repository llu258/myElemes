// server.js
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('./auth/passport');
const jwt = require('jsonwebtoken');
const sequelize = require('./config/database');
const cors = require('cors');
const User = require('./models/User');
const adminRoutes = require('./routes/admin')
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Passport
app.use(passport.initialize());

// Use CORS
app.use(cors());

// Use the auth routes
app.use('/auth', require('./routes/auth'));
// Use the grades routes
app.use('/grades', require('./routes/grades'));
//Use the admin routes
app.use('/admin', adminRoutes);

// Profile route
app.get('/profile', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      User.findByPk(decoded.id).then(user => {
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
      }).catch(error => res.status(500).json({ error: error.message }));
    });
  });

// Sync database
sequelize.sync();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});