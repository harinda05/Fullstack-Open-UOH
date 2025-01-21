const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.delete('http://localhost:5173/api/users'); 
    await request.post('http://localhost:5173/api/users', {
      data: {
        username: 'testuser',
        password: 'testpassword',
        name:"Test User"
      }
    });
    
    await page.goto('http://localhost:5173');
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible();
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.fill('input[name="Username"]', 'testuser');
      await page.fill('input[name="Password"]', 'testpassword');
      await page.click('button[type="submit"]');
      
      await expect(page.getByText('Test User logged-in')).toBeVisible();
    })})

    test('fails with wrong credentials', async ({ page }) => {
      await page.fill('input[name="Username"]', 'wronguser');
      await page.fill('input[name="Password"]', 'wrongpassword');
      await page.click('button[type="submit"]');

      // Check for error message
      await expect(page.getByText('wrong user name and password')).toBeVisible();
    })

    test('a new blog can be created', async ({ page }) => {
        await page.fill('input[name="Username"]', 'testuser');
        await page.fill('input[name="Password"]', 'testpassword');
        await page.click('button[type="submit"]');
        
        await expect(page.getByText('Test User logged-in')).toBeVisible();

        await page.click('button#togglebutton');

        const test_title = 'Test Blog Title' + getRandomNumber()
    
        await page.fill('input#title', test_title);
        await page.fill('input#author', 'Test Author');
        await page.fill('input#url', 'http://testblog.com');
        await page.click('button[type="submit"]');

        await expect(page.getByText(`a new blog ${test_title} added`)).toBeVisible();
        await expect(page.locator(`.blog:has-text("${test_title}")`)).toBeVisible();      })

}) 

const getRandomNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
  }