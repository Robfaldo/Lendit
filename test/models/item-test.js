const Item = require('../../models/item');
const {assert} = require('chai');
const mongoose = require('mongoose');

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
      }

      const item = new Item(exampleItem);
      item.save();
      const databaseResponse = await Item.find();

      assert.equal(databaseResponse[0].itemName, exampleItem.itemName);
    });
  });
  describe('When returning items', () => {
    it('returns them in reverse-chronological order', async () => {
      const item1 = new Item({itemName: 'Ostrich Egg', dateAdded: '2018-07-25T16:49:16.515Z'});
      const item2 = new Item({itemName: 'Tennis ball', dateAdded: '2018-07-24T16:49:16.515Z'});
      const item3 = new Item({itemName: 'Pet food', dateAdded: '2018-07-23T16:49:16.515Z'});
      item1.save();
      item2.save();
      item3.save();

      const databaseResponse = await Item.find();

      assert.equal(databaseResponse[0].itemName, item1.itemName);
      assert.equal(databaseResponse[1].itemName, item2.itemName);
      assert.equal(databaseResponse[2].itemName, item3.itemName);
    });
  });
});
