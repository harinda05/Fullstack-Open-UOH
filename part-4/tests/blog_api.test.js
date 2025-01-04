const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require("../models/blog")

const api = supertest(app)

const initial_blogs = [{
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
},
{
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
},
{
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
}]


describe('Blog API Tests', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
        console.log('cleared')

        for (let blog of initial_blogs) {
            let blogObj = new Blog(blog)
            await blogObj.save()
            console.log('saved')
        }

    })


    test('blogs are returned as json and the correct amount', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
        assert.strictEqual(response.body.length, initial_blogs.length)
    });

    test('blog posts replaced _id with id', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);

        response.body.forEach((blog) => {
            assert(blog.id, 'Err: Blog missing id property');
            assert(!blog._id, 'Err: Blog still has _id property');
        });
    });


    test('successfully creates a new blog', async () => {
        const newBlog = {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
        }

        const initialCount = await getBlogCount()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const finalCount = await getBlogCount()
        assert.strictEqual(finalCount, initialCount + 1);
    });

    test('test set likes to 0 if missing', async () => {
        const newBlog = {
          title: 'Test Blog',
          author: 'ABC Author',
          url: 'http://abc.com/test-blog'
        };
      
        const response = await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/);
      
        assert.strictEqual(response.body.likes, 0);
      });

      test('responds with 400 if title or url is missing', async () => {
        // title missing
        const newBlog = {
          author: 'Test Author',
          url: 'http://example.com/test-blog'
        };
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(400)
          .expect('Content-Type', /application\/json/);

          // url missing
          const newBlog2 = {
            title: 'Test Blog without url',
            author: 'Test Author'
          };
        
          await api
            .post('/api/blogs')
            .send(newBlog2)
            .expect(400)
            .expect('Content-Type', /application\/json/);
      });


      test.only('deletes a blog', async () => {
        const blogsAtStart = await Blog.find({});
        const blogToDelete = blogsAtStart[0];
      
        const response = await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .expect(204);
      
        const currentBlogs = await Blog.find({});
        const deletedBlog = currentBlogs.find(blog => blog.id === blogToDelete.id);
        assert.strictEqual(deletedBlog, undefined);
      });
      
      test('returns 404 if blog does not exist', async () => {
        const nonExistentId = "34235346";
        
        const response = await api
          .delete(`/api/blogs/${nonExistentId}`)
          .expect(404);
      
        assert.strictEqual(response.body.error, 'Invalid blog id');
      });

    after(async () => {
        await mongoose.connection.close()
    })


    test('updates the number of likes of a blog post', async () => {
        const blogToUpdate = await Blog.findOne();
      
        const updatedLikes = 100;
      
        const response = await api
          .put(`/api/blogs/${blogToUpdate.id}`)
          .send({ likes: updatedLikes })
          .expect(200)
          .expect('Content-Type', /application\/json/);
      
        assert.strictEqual(response.body.likes, updatedLikes);
      });

})

const getBlogCount = async () => {
    const blogs = await Blog.find({});
    return blogs.length;
};