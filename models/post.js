const { DataTypes } = require('sequelize');
const db = require('../utils/db');

const Post = db.define('post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

module.exports = Post;