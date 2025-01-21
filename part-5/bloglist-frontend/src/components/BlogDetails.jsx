import Togglable from './Togglable';

const BlogDetails = ({ blog }) => (
    <Togglable buttonLabel="view">
        <div>
            <p>{blog.url}</p>
            <p>{blog.likes} <button>like</button></p>         

            <p>{blog.user.name}</p>
        </div>
    </Togglable>

)

export default BlogDetails