const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config'); 

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false        //name cannot be NULL
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,        //email cannot be NULL
        unique: true           //email must be unique
    },
    password: {
        type: DataTypes.STRING,  
        allowNull: false            //password cannot be NULL
    },
    role: {
        type: DataTypes.ENUM('student', 'teacher', 'admin'), 
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
});

(async () => {
    await sequelize.sync();
    console.log('User model synced with the database');
})();

module.exports = User; //export User.js
