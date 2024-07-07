const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const User = require('./User');

const Grades = sequelize.define('Grades', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    grade: {
        type: DataTypes.INTEGER,
        allowNull: false,           //grade cannot be NULL
    },
});

module.exports = Grades;