// server.js

const express = require('express');
const sequelize = require('./config');
const passport = require('./auth/passport');
const authRoutes = require('./routes/auth');
const gradeRoutes = require('./routes/grades');

const app = express();

app.use(express.json());
app.use(passport.initialize());

// Define routes
app.use('/auth', authRoutes);
app.use('/grades', gradeRoutes);

// Sync database and start server
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});
