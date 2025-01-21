import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ user, setBlogs, setNotificationMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
      likes: 0
    }

    try {
      const createdBlog = await blogService.create(newBlog, user.token)
      setBlogs(blogs => blogs.concat(createdBlog))
      setNotificationMessage(`a new blog ${createdBlog.title} added`, 'success')
    } catch (exception) {
      console.error('Error creating blog:', exception)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Blog</h2>
      <div>
      <label htmlFor="title">Title:</label>
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          id={'title'}
        />
      </div>
      <div>
      <label htmlFor="author">Author:</label>
        <input
          type="text"
          value={author}
          id={'author'}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
      <label htmlFor="url">URL:</label>
        <input
          type="text"
          value={url}
          id={'url'}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default BlogForm 