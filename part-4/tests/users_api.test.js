const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require("../models/blog")
const User = require('../models/user');


const api = supertest(app)

describe.only('Users API Tests', () => {

  beforeEach(async () => {
    await User.deleteMany({});
  })


  test('valid user created', async () => {
    const newUser = {
      username: 'testUserValid',
      name: 'Test User Valid',
      password: 'password123',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    console.log("=========" + response.body)
    assert.strictEqual(response.body.username, newUser.username)
  });

  test('invalid username length', async () => {
    const newUser = {
      username: 'ab',
      name: 'Test User',
      password: 'password123',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400);

    assert.strictEqual(response.body.error, 'User validation failed: username: Username should be min 3 characters');

    const usersAtEnd = await User.find({});
    assert.strictEqual(usersAtEnd.length, 0);
  });

  test('invalid password length', async () => {
    const newUser = {
      username: 'abcd',
      name: 'Test User',
      password: 'pw',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400);

    assert.strictEqual(response.body.error, 'Password is required and must be at least 3 characters long');

    const usersAtEnd = await User.find({});
    assert.strictEqual(usersAtEnd.length, 0);
  });

})