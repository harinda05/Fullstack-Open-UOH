const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogController')
const config = require('./utils/config')
const usersRouter = require('./controllers/users')
const errorHandler = require('./handlers/errorHandler');
const loginRouter = require('./controllers/login')


const app = express()

mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error.message))

app.use(cors())
app.use(express.json())


app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(errorHandler);
module.exports = app
