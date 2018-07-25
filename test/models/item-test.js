const Item = require('../../models/item');
const {assert} = require('chai');

describe('Item', () => {
  describe('when created', () => {
    it('gets stored in the database', async () => {
      const item = new Item({itemName: 'Scissors'});
      item.save()

      const databaseResponse = await Item.find();

      assert.deepEqual(databaseResponse[0].itemName, item.itemName);
    });
  });
});
