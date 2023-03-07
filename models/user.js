const { DataTypes } = require('sequelize');
const db = require('../utils/db');

const User = db.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  number: DataTypes.INTEGER,
  password: DataTypes.STRING
});

module.exports = User;