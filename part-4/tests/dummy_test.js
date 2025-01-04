const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

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
        const blogs = [
            { id: 1, title: 'Blog 1', likes: 5 },
            { id: 2, title: 'Blog 2', likes: 10 },
            { id: 3, title: 'Blog 3', likes: 15 },
        ];
        const result = listHelper.totalLikes(blogs);
        assert.strictEqual(result, 30)
    });


    test('sblogs with missing likes property', () => {
        const blogs = [
            { id: 1, title: 'Blog 1' },
            { id: 2, title: 'Blog 2', likes: 20 },
        ];
        const result = listHelper.totalLikes(blogs);
        assert.strictEqual(result, 20)
    });
});
