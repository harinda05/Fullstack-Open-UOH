import Togglable from './Togglable';
import blogsService from '../services/blogs';
import { useState } from 'react';

const BlogDetails = ({ blog, user, onDelete }) => {
    const [likes, setLikes] = useState(blog.likes);

    const handleLike = async () => {
        try {
            const updatedBlog = await blogsService.updateLikes(blog.id, likes + 1, user.token);
            setLikes(updatedBlog.likes);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
            try {
                await blogsService.deleteBlog(blog.id, user.token);
                onDelete(blog.id);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
       
            <div>
                <p><a href={blog.url}>{blog.url}</a></p>
                <p>{likes} <button id={blog.id} onClick={handleLike}>like</button></p>
                <p>{blog.user.name}</p>
                {console.log(`blog.user.id: ${blog.user.username}, userId: ${user.username}`)}
                {user.username === blog.user.username && (
                    <p><button onClick={handleDelete}>delete</button></p>
                )}
            </div>
    );
}

export default BlogDetails;