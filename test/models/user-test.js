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
      const defaultValue = User.schema.paths.karmaPoints.defaultValue

      assert.equal(defaultValue, 10);
    });
  });

  describe('#updateKarmaPoints', () => {
    it('updates the owners karma points', async () => {
      const owner = new User({
        'firstName': "Owner",
        'lastName': "Faldo",
        'email': "robertfaldo@gmail.com",
        'username': "rfaldo",
        'password': "validpassword123"
      });
      owner.save();

      User.updateKarmaPoints(owner, 1);

      const ownerAfter = await User.findOne({ _id: owner._id })

      assert.equal(ownerAfter.karmaPoints, 11)
    });
  });
});
