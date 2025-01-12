const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')


usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  if (!password || password.length < 3) {
    return response.status(400).json({
      error: 'Password is required and must be at least 3 characters long',
    });
  }

  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    const userForToken = {
      username: savedUser.username,
      id: savedUser._id,
    };
    const token = jwt.sign(userForToken, process.env.SECRET);

    response.status(201).send({
      token,
      username: savedUser.username,
      name: savedUser.name,
    });
  
  } catch (error) {
    next(error);
  }
})

usersRouter.get('/', async (request, response) => {
    try {
      const users = await User.find({})
      response.status(200).json(users);
    } catch (error) {
      response.status(500).json({ error: 'Failed to fetch users' });
    }
  });

module.exports = usersRouter