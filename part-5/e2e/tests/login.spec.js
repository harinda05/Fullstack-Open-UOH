const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.delete('http://localhost:5173/api/users');
        await request.post('http://localhost:5173/api/users', {
            data: {
                username: 'testuser',
                password: 'testpassword',
                name: "Test User"
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
        })
    })

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
        await expect(page.locator(`.blog:has-text("${test_title}")`)).toBeVisible();
    })

    test('a blog can be liked', async ({ page }) => {
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
        await expect(page.locator(`.blog:has-text("${test_title}")`)).toBeVisible();
        await page.click(`.blog:has-text("${test_title}") button:has-text("view")`);
        await page.click(`.blog:has-text("${test_title}") button:has-text("like")`);
        await expect(page.locator(`.blog:has-text("${test_title}")`).getByText('1 like')).toBeVisible();
    })

    test('a blog can be deleted by the user who created it', async ({ page }) => {
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
        await expect(page.locator(`.blog:has-text("${test_title}")`)).toBeVisible();
        await page.click(`.blog:has-text("${test_title}") button:has-text("view")`);
        page.on('dialog', async dialog => {
            await dialog.accept();
        });
        await page.click(`.blog:has-text("${test_title}") button:has-text("delete")`);
        await expect(page.locator(`.blog:has-text("${test_title}")`)).toBeHidden();
    })

    test('delete button is visible to the user who created the blog only', async ({ page }) => {
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
        await expect(page.locator(`.blog:has-text("${test_title}")`)).toBeVisible();
        await page.click(`.blog:has-text("${test_title}") button:has-text("view")`);
        const deleteButton = await page.locator(`.blog:has-text("${test_title}") button:has-text("delete")`);
        await expect(deleteButton).toBeVisible();

        await page.click('button:has-text("logout")');
        await page.fill('input[name="Username"]', 'sam');
        await page.fill('input[name="Password"]', '789');
        await page.click('button[type="submit"]');

        await page.click(`.blog:has-text("${test_title}") button:has-text("view")`);
        await expect(deleteButton).not.toBeVisible();


    })
})


const getRandomNumber = () => {
    return Math.floor(Math.random() * 99999999) + 1;
}