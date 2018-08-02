const Item = require('../../models/item');
const {assert} = require('chai');
const mongoose = require('mongoose');
const User = require('../../models/user');
const sinon = require('sinon');
const {
  connectToAndDropDatabase,
  disconnectFromDatabase,
  createItem,
  createItemWithDate
} = require('../helper');

describe('Item', () => {
  describe('#save', () => {
    it('it persists', async () => {
      await connectToAndDropDatabase();
      const itemToCreate = await createItem('Scissors');

      const newItem = await Item.findOne({ itemName: 'Scissors'});

      assert.equal(newItem.itemName, itemToCreate.itemName);
      await disconnectFromDatabase();
    });
    it('can have a string description', async () => {
      const itemDescriptionPath = Item.schema.paths.itemDescription.instance

      assert.equal(typeof itemDescriptionPath, 'string')
      await disconnectFromDatabase();
    });
    it('starts with no current borrower ', async () => {
      const defaultValue = Item.schema.paths.currentBorrower.defaultValue

      assert.equal(defaultValue, undefined);
    });
  });
  describe('When returning items', async () => {
    it('returns them in reverse-chronological order', async () => {
      await connectToAndDropDatabase();
      const itemToCreate1 = await createItemWithDate('Scissors', '2018-07-25T16:49:16.515Z');
      const itemToCreate2 = await createItemWithDate('Scissors', '2017-07-24T16:49:16.515Z');
      const itemToCreate3 = await createItemWithDate('Scissors', '2016-07-23T16:49:16.515Z');

      const itemsInDatabase = await Item.findAllAndReverse();

      assert.equal(itemsInDatabase[0].itemName, itemToCreate1.itemName);
      assert.equal(itemsInDatabase[1].itemName, itemToCreate2.itemName);
      assert.equal(itemsInDatabase[2].itemName, itemToCreate3.itemName);
      await disconnectFromDatabase();
    });
  });
  describe('#updateBorrower', () => {
    it('changes the currentBorrower to the new borrower', async () => {
      const stub = sinon.stub(Item, 'findByIdAndUpdate');
      const itemMock = {
        itemName: 'Toaster',
        id: '1'
      };
      const userMock = {
        'firstName': "Rob",
        '_id': '001'
      };

      Item.updateBorrower(itemMock._id, userMock);
      const spyWithCorrectArgs = stub.withArgs(
        itemMock._id,
        { currentBorrower: userMock }
      );

      assert.equal(spyWithCorrectArgs.calledOnce, true);
      stub.restore();
    });
  });
});
