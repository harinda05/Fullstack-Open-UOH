import BlogDetails from './BlogDetails';

const Blog = ({user, blog, setBlogs }) => {

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
    
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <BlogDetails blog={blog} user={user} onDelete={handleDelete} />
    </div>
  )
}
export default Blog