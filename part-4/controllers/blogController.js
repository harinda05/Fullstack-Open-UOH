const express = require('express')
const Blog = require('../models/blog')
const User = require('../models/user');
const jwt = require('jsonwebtoken')


const blogsRouter = express.Router()

blogsRouter.get('/', async (req, res) => {
  try {
    const blogs = (await Blog.find({}).populate('user', '-blogs'));
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

blogsRouter.post('/', async (req, res, next) => {
  const { title, author, url, likes } = req.body;

  if (!title || !url) {
    return res.status(400).json({ error: 'missing required values' });
  }

  const token = getTokenFrom(req);
  console.log(token)

  if (!token) {
    return response.status(401).json({ error: 'Token missing or invalid' });
  }

  try {
    console.log("decoding token")

    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    console.log(decodedToken)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes !== undefined ? likes : 0,
      user: user._id
    })
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    
    res.status(201).json(savedBlog)
  } catch (error) {
    next(error);
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ error: 'Invalid blog id' });
  }
});

// PUT /api/blogs/:id
blogsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { likes } = req.body;

  if (likes === undefined || typeof likes !== 'number' || likes < 0) {
    return res.status(400).json({ error: 'Invalid or missing likes value' });
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { likes },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).json({ error: 'Invalid blog id' });
  }
});

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

module.exports = blogsRouter
