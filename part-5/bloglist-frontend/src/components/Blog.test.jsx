import { test, expect } from 'vitest';
import { render, fireEvent, screen  } from '@testing-library/react';
import Blog from './Blog';
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

test('renders blog title and author, but not URL or likes by default', () => {
    const { queryByText, container  } = render(<Blog blog={blog} user={user} />);

    console.log(container.innerHTML);
    expect(screen.getByText('How to Learn wdad John Doe Dum')).toBeInTheDocument();

    const hiddenDiv = screen.getByText('https://www.example.com/learn-sdsd').parentElement.parentElement.parentElement;
    console.log("===========", hiddenDiv.innerHTML);
    expect(hiddenDiv).toHaveStyle('display: none');

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')

});

test('shows URL and likes when the view button is clicked', () => {
    const {container} = render(<Blog blog={blog} user={user} />);
  
    const hiddenDiv = screen.getByText('https://www.example.com/learn-sdsd').parentElement.parentElement.parentElement;
    expect(hiddenDiv).toHaveStyle('display: none');

    const hiddenDivFromQuerySelector = container.querySelector('.togglableContent')
    expect(hiddenDivFromQuerySelector).toHaveStyle('display: none')
  
    const viewButton = screen.getByText('view');
    fireEvent.click(viewButton);
  
    const revealedDiv = screen.getByText('https://www.example.com/learn-sdsd').parentElement.parentElement.parentElement;
    console.log("===========", revealedDiv.innerHTML);
    expect(hiddenDiv).toHaveStyle('display: block');

    const revealedDivFromQuerySelector = container.querySelector('.togglableContent')
    expect(revealedDivFromQuerySelector).toHaveStyle('display: block')
  });

