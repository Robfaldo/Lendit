const User = require('../../models/user');
const {assert} = require('chai');
const mongoose = require('mongoose');
const sinon = require('sinon');


describe('User', () => {
  describe('#save', () => {
    it('creates a user with 10 points', async () => {
      const defaultValue = User.schema.paths.karmaPoints.defaultValue

      assert.equal(defaultValue, 10);
    });
  });

  describe('#updateKarmaPoints', () => {
    it('updates the owners karma points', async () => {
      const stub = sinon.stub(User, 'findByIdAndUpdate');
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

      assert.equal(stub.withArgs(ownerMock._id, { karmaPoints: ownerMock.karmaPoints + 1 }).calledOnce, true)
      stub.restore();
    });
  });
});
