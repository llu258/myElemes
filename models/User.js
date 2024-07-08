const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false        //name cannot be NULL
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,        
    },
    password: {
        type: DataTypes.STRING,  
        allowNull: false            
    },
    role: {
        type: DataTypes.ENUM('student', 'teacher', 'admin'), 
        allowNull: false
    },
    studentId: {
        type: DataTypes.STRING,
        allowNull: true, // Nullable for non-student roles
        unique: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
        }
    }, {
        tableName: 'Users'
});

(async () => {
    await sequelize.sync();
    console.log('User model synced with the database');
})();

module.exports = User; //export User.js
