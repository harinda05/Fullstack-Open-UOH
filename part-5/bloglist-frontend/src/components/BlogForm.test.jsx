import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BlogForm from './BlogForm';
import { expect, vi } from 'vitest';
import blogsService from '../services/blogs';


test('calls event handler with the right details when a new blog is created', async() => {
  const setBlogs = vi.fn();
  const setNotificationMessage = vi.fn();
  const user = { token: 'test-token' };

  vi.spyOn(blogsService, 'create').mockResolvedValue({
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 0,
  });

  render(<BlogForm user={user} setBlogs={setBlogs} setNotificationMessage={setNotificationMessage} />);

  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test Blog' } });
  fireEvent.change(screen.getByLabelText(/author/i), { target: { value: 'Test Author' } });
  fireEvent.change(screen.getByLabelText(/url/i), { target: { value: 'http://testblog.com' } });

  fireEvent.click(screen.getByRole('button', { name: /create/i }));

  await waitFor(() => {
    console.log("Testttt======", setBlogs.mock.calls)
    const newBlogs = setBlogs.mock.calls[0][0]([]);
    console.log("Testttt======", newBlogs)

    expect(newBlogs).toEqual(expect.arrayContaining([expect.objectContaining({
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://testblog.com',
        likes: 0
      })]))
  });

});
