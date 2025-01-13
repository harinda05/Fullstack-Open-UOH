const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogController')
const config = require('./utils/config')
const usersRouter = require('./controllers/users')
const errorHandler = require('./handlers/errorHandler');
const userExtractor = require('./handlers/userExtractor')


const app = express()

mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error.message))

app.use(cors())
app.use(express.json())


app.use('/api/blogs', userExtractor, blogsRouter)
app.use('/api/users', usersRouter)

app.use(errorHandler);
module.exports = app
