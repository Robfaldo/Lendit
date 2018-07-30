const {assert} = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');


describe('Server path /auth', () => {

  beforeEach(async () => {
    await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_Password}@ds247001.mlab.com:47101/lendit-test`);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  describe('/signup', () => {
    it('creates a user with 10 points', async () => {
      const userToSignUp = {
        "firstName": "Chris",
        "lastName": "Terry",
        "email": "chris@gmail.com",
        "username": "chris555",
        "password": "password"
      };
      const userResponse = await request(app)
        .post('/auth/signup')
        .type('form')
        .send(userToSignUp);
      const userSignedup = JSON.parse(userResponse.text);

      assert.equal(userSignedup.karmaPoints, 10)
    });
  });
});
