const express = require('express')
const Blog = require('../models/blog')
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const tokenExtractor = require('../handlers/tokenExtractor')

const blogsRouter = express.Router()

blogsRouter.use(tokenExtractor)


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

  try {
    console.log("decoding token")

    const user = req.user;

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
    const user = req.user;
    const blog = await Blog.findById(id)
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    if (blog.user.toString() !== user.id.toString()) {
      return res.status(403).json({ error: 'only the creator can delete this blog' })
    }

    await Blog.findByIdAndDelete(id)
    res.status(204).end()
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'invalid token' })
    }
    res.status(400).json({ error: 'Invalid blog id' });
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

module.exports = blogsRouter
