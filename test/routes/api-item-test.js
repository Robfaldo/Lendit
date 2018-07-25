const {assert} = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const Item = require('../../models/item');
const app = require('../../app');


describe('Server path /api/items', () => {

  beforeEach(async () => {
    await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_Password}@ds247001.mlab.com:47101/lendit-test`);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  describe('GET', () => {
    it('returns single item as JSON array', async () => {
      const item = new Item({itemName: 'Scissors'});
      item.save();

      const response = await request(app)
        .get('/api/items')

      const responseFirstItemName = JSON.parse(response.text)[0].itemName;
      assert.equal(responseFirstItemName, item.itemName)
    });
    it('returns multiple items as JSON array', async () => {
      const item1 = new Item({itemName: 'Ostrich Egg', dateAdded: '2018-07-25T16:49:16.515Z'});
      const item2 = new Item({itemName: 'Tennis ball', dateAdded: '2018-07-24T16:49:16.515Z'});
      const item3 = new Item({itemName: 'Pet food', dateAdded: '2018-07-23T16:49:16.515Z'});
      item1.save();
      item2.save();
      item3.save();

      const response = await request(app)
        .get('/api/items')

      const responseJson = JSON.parse(response.text)

      assert.equal(responseJson[0].itemName, item1.itemName)
      assert.equal(responseJson[1].itemName, item2.itemName)
      assert.equal(responseJson[2].itemName, item3.itemName)
    });
  });
});
