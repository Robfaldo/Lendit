const User = require('../../models/user');
const {assert} = require('chai');
const mongoose = require('mongoose');


describe('User', () => {

  beforeEach(async () => {
    await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_Password}@ds247001.mlab.com:47101/lendit-test`);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  describe('#save', () => {
    it('creates a user with 10 points', async () => {
      const userToCreate = new User({
        'firstName': "Chris",
        'lastName': "Martin",
        'email': "Chris123@gmail.com",
        'username': "Christopher1",
        'password': "validpassword123"
      });

      userToCreate.save();

      assert.equal(userToCreate.karmaPoints, 10)
    });
  });
});
