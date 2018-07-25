const {assert} = require('chai');
const request = require('supertest');
const app = require('../../app');

describe('Server path /api/items', () => {
  describe('GET', () => {
    it('returns json array of items', async () => {
      // setup
      const expectedResponse = [{
        itemName: "Scissors"
      }]
      const item = new Item({itemName: 'Scissors'});
      item.save();
      // exercise
      const response = await request(app)
        .get('/api/items')
      // verify
      assert.include(response.text, expectedResponse.itemName)
    });
  });
});
