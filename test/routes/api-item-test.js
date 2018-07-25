const {assert} = require('chai');
const request = require('supertest');
const app = require('../../app');
const Item = require('../../models/item');

describe('Server path /api/items', () => {
  describe('GET', () => {
    it('returns single item as JSON array', async () => {
      const item = new Item({itemName: 'Scissors'});
      item.save();

      const response = await request(app)
        .get('/api/items')

      const responseFirstItemName = JSON.parse(response.text)[0].itemName;
      assert.equal(responseFirstItemName, item.itemName)
    });
  });
});
