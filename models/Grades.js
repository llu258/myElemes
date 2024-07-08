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
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: User,
      key: 'studentId',
    },
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  grade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Grades;
