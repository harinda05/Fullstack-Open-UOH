import { useRef } from 'react'

import BlogDetails from './BlogDetails';
import Togglable from './Togglable';

const Blog = ({user, blog, setBlogs }) => {
  const blogEntryRef = useRef()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDelete = (id) => {
    setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== id));
  };

  return (
    
    <div style={blogStyle} class={'blog'} id={blog.id}>
      {blog.title} {blog.author}
      <Togglable buttonLabel="view" ref={blogEntryRef}>
      <BlogDetails blog={blog} user={user} onDelete={handleDelete} /> </Togglable>
    </div>
  )
}
export default Blog