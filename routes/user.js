const { Op } = require('sequelize');
const User = require('../models/user');
const db = require('../utils/db');

const router = require('express').Router();

router.post('/create', async (req, res, next) => {
  const { email, password } = req.body;
  const [user, created] = await User.upsert({
    email, password, number: 1
  });

  if (created) {
    res.status(201).json({ id: user.id })
  } else {
    res.json({ message: 'updated' });
  }
});

router.get('/', async (req, res, next) => {
  const users = await User.findAll();
  res.json(users);
});

module.exports = router;