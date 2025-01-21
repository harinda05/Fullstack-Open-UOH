import Togglable from './Togglable';
import blogsService from '../services/blogs';
import { useState } from 'react';

const BlogDetails = ({ blog, user }) => {
    const [likes, setLikes] = useState(blog.likes);

    const handleLike = async () => {
        try {
            const updatedBlog = await blogsService.updateLikes(blog.id, likes + 1, user.token);
            setLikes(updatedBlog.likes);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Togglable buttonLabel="view">
            <div>
                <p><a href={blog.url}>{blog.url}</a></p>
                <p>{likes} <button onClick={handleLike}>like</button></p>
                <p>{blog.user.name}</p>
            </div>
        </Togglable>
    );
}

export default BlogDetails;