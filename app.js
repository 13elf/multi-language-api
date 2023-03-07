const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./utils/db');
require('dotenv').config()

app.use(bodyParser.json());

const Language = require('./models/language');
const Post = require('./models/post');
const PostTr = require('./models/post-tr');
const Tag = require('./models/tag');

Language.hasMany(PostTr, { onDelete: 'CASCADE' });
PostTr.belongsTo(Language, { onDelete: 'CASCADE' });

Post.hasMany(PostTr, { onDelete: 'CASCADE' });
PostTr.belongsTo(Post, { onDelete: 'CASCADE' });

Language.hasMany(Tag, { onDelete: 'CASCADE' });
Tag.belongsTo(Language, { onDelete: 'CASCADE' });

Post.hasMany(Tag, { onDelete: 'CASCADE' });
Tag.belongsTo(Post, { onDelete: 'CASCADE' });



async function insertLang() {
  await Language.findOrCreate({ where: { id: 'en', language: 'english' } });
  await Language.findOrCreate({ where: { id: 'tr', language: 'turkish' } });
}

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

app.use(postRoutes);
app.use('/user', userRoutes);

db.sync({ alter: true })
  .then(() => {
    return insertLang();
  })
  .then(() => {
    app.listen(8080);
  })
  .catch(error => {
    console.log(error);
  });