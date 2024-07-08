const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('lms_db', 'postgres', 'Gding443464', {
  host: '127.0.0.1',
  dialect: 'postgres',
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  studentId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});

const updateStudentIds = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const studentsWithoutId = await User.findAll({
      where: {
        role: 'student',
        studentId: null,
      },
    });

    for (const student of studentsWithoutId) {
      student.studentId = `SID${student.id}`;
      await student.save();
      console.log(`Updated studentId for user ${student.name} to ${student.studentId}`);
    }

    await sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database or update student IDs:', error);
  }
};

updateStudentIds();
