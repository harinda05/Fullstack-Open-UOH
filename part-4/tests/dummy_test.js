const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const sample_blogs_3 = [{
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

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})


describe('totalLikes', () => {
    test('no blogs are provided', () => {
        const blogs = [];
        const result = listHelper.totalLikes(blogs);
        assert.strictEqual(result, 0)
    });

    test('total likes for multiple blogs', () => {
        const blogs =  sample_blogs_3
        const result = listHelper.totalLikes(blogs);
        assert.strictEqual(result, 24)
    });


    test('sblogs with missing likes property', () => {
        const blogs = [
            {
                _id: "5a422b891b54a676234d17fa",
                title: "First class tests",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
                likes: 10,
                __v: 0
              },
              {
                _id: "5a422ba71b54a676234d17fb",
                title: "TDD harms architecture",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
                __v: 0
              },
        ];
        const result = listHelper.totalLikes(blogs);
        assert.strictEqual(result, 10)
    });
});


describe('favoriteBlog', () => {

    test('only one blog is provided', () => {
        const blogs = [sample_blogs_3[0]];
        const result = listHelper.favoriteBlog(blogs);
        console.log(result)
        assert.deepStrictEqual(result, { title: 'React patterns', author: 'Michael Chan', likes: 7 });
    });

    test('multiple blogs provided', () => {
        const blogs = sample_blogs_3
        const result = listHelper.favoriteBlog(blogs);
        assert.deepStrictEqual(result, { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', likes: 12 });
    });
});