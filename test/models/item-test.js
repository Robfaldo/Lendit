const Item = require('../../models/item');
const {assert} = require('chai');
const mongoose = require('mongoose');
const User = require('../../models/user');


describe('Item', () => {

  beforeEach(async () => {
    await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_Password}@ds247001.mlab.com:47101/lendit-test`);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  describe('#save', () => {
    it('it persists', async () => {
      const exampleItem = {
        itemName: 'Scissors'
      };

      const item = new Item(exampleItem);
      await item.save();
      const databaseResponse = await Item.find();

      assert.equal(databaseResponse[0].itemName, exampleItem.itemName);
    });
    it('can have a description', async () => {
      const exampleItem = {
        itemName: 'Scissors',
        itemDescription: 'This is the description of the item'
      };

      const item = new Item(exampleItem);
      await item.save();
      const databaseResponse = await Item.find();

      assert.equal(databaseResponse[0].itemDescription, exampleItem.itemDescription);
    });
    it('starts with no current borrower ', async () => {
      const exampleItem = {
        itemName: 'Scissors',
        itemDescription: 'This is the description of the item'
      };

      let item = new Item(exampleItem);
      await item.save();
      item = await Item.find({ itemName: 'Scissors' });
      
      assert.equal(item.currentBorrower, null);
    });
  });
  describe('When returning items', async () => {
    it('returns them in reverse-chronological order', async () => {
      const item1 = new Item({itemName: 'Ostrich Egg', dateAdded: '2018-07-25T16:49:16.515Z'});
      const item2 = new Item({itemName: 'Tennis ball', dateAdded: '2017-07-24T16:49:16.515Z'});
      const item3 = new Item({itemName: 'Pet food', dateAdded: '2016-07-23T16:49:16.515Z'});
      await item1.save();
      await item2.save();
      await item3.save();

      const databaseResponse = await Item.findAllAndReverse();

      assert.equal(databaseResponse[0].itemName, item1.itemName);
      assert.equal(databaseResponse[1].itemName, item2.itemName);
      assert.equal(databaseResponse[2].itemName, item3.itemName);
    });
  });
  describe('#updateBorrower', () => {
    it('changes the currentBorrower to the new borrower', async () => {
      const item = new Item({ itemName: 'Toaster' });
      await item.save();

      const currentBorrower = new User({
        'firstName': "Rob",
        'lastName': "Faldo",
        'email': "robertfaldo@gmail.com",
        'username': "rfaldo",
        'password': "validpassword123"
      });

      Item.updateBorrower(item._id, currentBorrower);

      const updatedItem = await Item.findOne({ _id: item._id });

      assert.deepEqual(currentBorrower._id, updatedItem.currentBorrower)
    });
  });
});
