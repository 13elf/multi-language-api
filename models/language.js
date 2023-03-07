const { DataTypes } = require('sequelize');
const db = require('../utils/db');

const Language = db.define('language', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  language: DataTypes.STRING
});

module.exports = Language;