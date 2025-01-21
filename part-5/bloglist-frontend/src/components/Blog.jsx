
import BlogDetails from './BlogDetails';

const Blog = ({user, blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <BlogDetails blog={blog} user={user} />
    </div>
  )
}
export default Blog