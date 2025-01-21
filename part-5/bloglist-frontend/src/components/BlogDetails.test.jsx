import { test, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import BlogDetails from './BlogDetails';
import { vi } from 'vitest';
import blogsService from '../services/blogs';

const blog = {
    title: "How to Learn wdad",
    author: "John Doe Dum",
    url: "https://www.example.com/learn-sdsd",
    likes: 10,
    user: {
        username: "testUserValid",
        name: "Test User Valid",
        id: "678448d8bee496eaaa1a57d0"
    },
    id: "678f5b167ea035bceef9f98b"
};

const user = {
    token: "test.test",
    username: "testUserValid",
    name: "Harinda"
}

test('calls event handler twice when like button is clicked twice', () => {
    vi.mock('../services/blogs', () => ({
        default: {
          updateLikes: vi.fn(),
          deleteBlog: vi.fn(),
        },
      }));
    
    blogsService.updateLikes.mockResolvedValueOnce({ likes: 10 });

    const { getByText } = render(<BlogDetails blog={blog} user={user}/>);

    const likeButton = getByText('like');
    console.log("===========", likeButton.innerHTML);

    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(blogsService.updateLikes).toHaveBeenCalledTimes(2);
}); 