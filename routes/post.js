const { Op } = require('sequelize');
const Post = require('../models/post');
const PostTr = require('../models/post-tr');
const Tag = require('../models/tag');
const db = require('../utils/db');

const router = require('express').Router();

router.get('/', async (req, res, next) => {
  const posts = await Post.findAll({
    include: [
      {
        model: PostTr
      },
      {
        model: Tag
      }
    ]
  });
  res.json(posts);
});

/*
{
  translations: [
    {
      language: 'en',
      text: 'abc',
      tags: ['a', 'b', 'c']
    }
  ]
}
*/
router.post('/create', async (req, res, next) => {
  const { translations } = req.body;
  const t = await db.transaction();

  try {
    const post = await Post.create({}, { transaction: t });

    const tagArr = [];
    const data = translations.map(e => {
      for (let tag of e.tags) {
        tagArr.push({
          languageId: e.language,
          tag: tag,
          postId: post.id
        });
      }
      return {
        languageId: e.language,
        postId: post.id,
        text: e.text
      }
    });
    const translationData = await PostTr.bulkCreate(data, { transaction: t });
    const tags = await Tag.bulkCreate(tagArr, { transaction: t });
    await t.commit();
    res.json({ id: post.id });
  } catch (error) {
    if (t) {
      await t.rollback();
    }
    res.status(500).send("an error occured")
  }

});

router.put('/update', async (req, res, next) => {
  const { id, translations } = req.body;
  console.log("\n\n========\n")

  const post = await Post.findByPk(id);
  if (!post) {
    return res.status(404).send("Not found")
  }

  const tagArr = [];
  const tagLanguages = [];
  const data = translations.map(e => {
    tagLanguages.push(e.language);
    for (let tag of e.tags) {
      tagArr.push({
        languageId: e.language,
        tag: tag,
        postId: post.id
      });
    }
    return {
      languageId: e.language,
      postId: post.id,
      text: e.text
    }
  });

  await PostTr.bulkCreate(data, { updateOnDuplicate: ["text"] });
  console.log("\n\n***********\n\n")
  await Tag.destroy({
    where: {
      languageId: {
        [Op.in]: tagLanguages
      }
    }
  });
  await Tag.bulkCreate(tagArr);
  res.json({ message: 'success' })
});

module.exports = router;