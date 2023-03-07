const { DataTypes } = require('sequelize');
const db = require('../utils/db');

const Tag = db.define('tag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tag: DataTypes.STRING
});

module.exports = Tag;