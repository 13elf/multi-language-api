const { DataTypes } = require('sequelize');
const db = require('../utils/db');

const postTr = db.define('postTr', {
  languageId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  postId: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  text: DataTypes.STRING
});

module.exports = postTr;