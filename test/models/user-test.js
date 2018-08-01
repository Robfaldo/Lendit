const User = require('../../models/user');
const {assert} = require('chai');
const mongoose = require('mongoose');
const sinon = require('sinon');


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
      const spy = sinon.spy(User, 'findByIdAndUpdate');
      const ownerMock = {
        'firstName': "Owner",
        'lastName': "Faldo",
        'email': "robertfaldo@gmail.com",
        'username': "rfaldo",
        'password': "validpassword123",
        'karmaPoints': '10',
        '_id': '1'
      };

      User.updateKarmaPoints(ownerMock, 1);

      assert.equal(spy.withArgs(ownerMock._id, { karmaPoints: ownerMock.karmaPoints + 1 }).calledOnce, true)
    });
  });
});
