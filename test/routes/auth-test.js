const {assert} = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const {signUserUp} = require('../helper');


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
      const signedUpUser = await signUserUp({ "firstName": "Chris" });
      const newUser = JSON.parse(signedUpUser.text);

      assert.equal(newUser.karmaPoints, 10)
    });
  });
});
