const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:5173/api/testing/reset');
        await request.post('http://localhost:5173/api/users', {
            data: {
                username: 'testuser',
                password: 'testpassword',
                name: "Test User"
            }
        });

        await request.post('http://localhost:5173/api/users', {
            data: {
                username: 'sam',
                password: '789',
                name: "Sam"
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

    test('assert sorting based on likes', async ({ page }) => {
        await page.fill('input[name="Username"]', 'testuser');
        await page.fill('input[name="Password"]', 'testpassword');
        await page.click('button[type="submit"]');

        await expect(page.getByText('Test User logged-in')).toBeVisible();

        await page.click('button#togglebutton');

        await page.fill('input#title', 'Unique Blog One'); 
        await page.fill('input#author', 'Author One'); 
        await page.fill('input#url', 'http://unique-blogone.com'); 
        await page.click('button[type="submit"]'); 

        await page.fill('input#title', 'Unique Blog Two'); 
        await page.fill('input#author', 'Author Two'); 
        await page.fill('input#url', 'http://unique-blogtwo.com'); 
        await page.click('button[type="submit"]'); 

        await page.fill('input#title', 'Unique Blog Three'); 
        await page.fill('input#author', 'Author Three'); 
        await page.fill('input#url', 'http://unique-blogthree.com'); 
        await page.click('button[type="submit"]'); 


        await page.click(`.blog:has-text("Unique Blog Two") button:has-text("view")`);
        await page.click(`.blog:has-text("Unique Blog Two") button:has-text("like")`);
        await page.waitForTimeout(500);
        await page.click(`.blog:has-text("Unique Blog Two") button:has-text("like")`);
        await page.waitForTimeout(500);
        // two likes

        await page.click(`.blog:has-text("Unique Blog One") button:has-text("view")`);
        await page.click(`.blog:has-text("Unique Blog One") button:has-text("like")`);
        await page.waitForTimeout(500);
        // one like

        await page.reload();

        await page.click(`.blog:has-text("Unique Blog One") button:has-text("view")`);
        await page.click(`.blog:has-text("Unique Blog Two") button:has-text("view")`);
        await page.click(`.blog:has-text("Unique Blog Three") button:has-text("view")`);
        await page.waitForTimeout(500);

        const blogTitles = await page.$$eval('.blog', blogs => 
            blogs.map(blog => {
                const text = blog.textContent.trim();
                return text.split(' ').slice(0, 3).join(' ');
            })
        );

        const expectedOrder = ['Unique Blog Two', 'Unique Blog One', 'Unique Blog Three'];

        expect(blogTitles).toEqual(expectedOrder);
    })
})


const getRandomNumber = () => {
    return Math.floor(Math.random() * 99999999) + 1;
}