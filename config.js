require('dotenv').config(); // Load environment variables from .env file
const { Sequelize } = require('sequelize');

//init
const sequelize = new Sequelize('lms_db', 'postgres', 'Gding443464', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize; //to export sequelize instance

/*

Another Alternative
// config.js

const { Sequelize } = require('sequelize');

// Initialize a Sequelize instance
const sequelize = new Sequelize('lms_db', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres',
});

// Export the sequelize instance
module.exports = sequelize;


*/
