const {assert} = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Item = require('../../models/item');
const User = require('../../models/user');
const {
  createUser,
  createItem,
  logUserIn,
  signUserUp
} = require('../helper');

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
      const itemToCreate = await createItem('Scissors');

      const response = await request(app)
        .get('/api/items')
      const itemReceivedBack = JSON.parse(response.text)[0].itemName;

      assert.equal(itemReceivedBack, itemToCreate.itemName)
    });
    it('returns multiple items as JSON array', async () => {
      const itemToCreate1 = await createItem('Tennis Balls');
      const itemToCreate2 = await createItem('Ostrich Egg');

      const response = await request(app)
        .get('/api/items')
      const itemsReceivedBack = JSON.parse(response.text);

      assert.equal(itemsReceivedBack[0].itemName, itemToCreate2.itemName)
      assert.equal(itemsReceivedBack[1].itemName, itemToCreate1.itemName)
    });
  });
  describe('POST', () => {
    it('adds an item to the database', async () => {
      const itemToCreate = { itemName: "Scissors" };

      const response = await request(app)
        .post('/api/items')
        .type('form')
        .send(itemToCreate)
      const newItem = await Item.findOne(itemToCreate);

      assert.equal(newItem.itemName, itemToCreate.itemName);
    });
    it('can create an item with a description', async () => {
      const itemToCreate = { itemName: 'Scissors', itemDescription: 'This is the description of the item' };

      const response = await request(app)
        .post('/api/items')
        .type('form')
        .send(itemToCreate)
      const newItem = await Item.findOne({ itemName: 'Scissors' });

      assert.equal(newItem.itemDescription, 'This is the description of the item');
    });
    it('assigns the item to a user', async () => {
      const signedUpUser = await signUserUp({ "firstName": "Chris" });
      const loggedInUser = await logUserIn({ "firstName": "Chris" });
      const loggedInUserId = JSON.parse(signedUpUser.text)._id;
      const itemToCreate = {itemName: 'Peanut Butter', owner: loggedInUserId};

      const createItemHttpResponse = await request(app)
        .post('/api/items')
        .type('form')
        .send(itemToCreate);

      const item = await Item.findOne({itemName: 'Peanut Butter'})
      assert.equal(item.owner._id, loggedInUserId);
    });
  });
  describe('DELETE', () => {
    it('removes the item from the database', async () => {
      const itemToCreate = await createItem('Scissors')

      const response = await request(app)
        .delete('/api/items')
        .send({_id: itemToCreate._id});
      const newItem = await Item.findOne({ itemName: 'Sicssors' });

      assert.equal(newItem, undefined);
    });
  });
  describe('/:item_id', () => {
    describe('PUT', () => {
      it('updates the current borrower of the item', async () => {
        const borrower = await createUser({ firstName: 'Borrower'});
        const owner = await createUser({ firstName: 'Owner'});
        const loggedInUser = await logUserIn(borrower);
        const newItem = await createItem('Kettle', owner)

        const borrowResponse = await request(app)
          .put(`/api/items/${newItem._id}`)
          .send({ borrowerId: borrower._id });
        const updatedItem = await Item.findOne( {itemName: 'Kettle'} )

        assert.deepEqual(updatedItem.currentBorrower, borrower._id);
        assert.equal(borrowResponse.status, 200);
      });
      it('gives the owner of the item a karma point', async () => {
        const borrower = await createUser({ firstName: 'Borrower'})
        const owner = await createUser({ firstName: 'Owner'})
        const newItem = await createItem('Kettle', owner)
        const borrowerLogsIn = await logUserIn(borrower);

        const ownerPostsItemResponse = await request(app)
          .put(`/api/items/${newItem._id}`)
          .send({ borrowerId: borrower._id });
        const itemOwner = await User.findOne({ _id: newItem.owner._id })

        assert.equal(itemOwner.karmaPoints, 11);
        assert.equal(ownerPostsItemResponse.status, 200);
      });
    });
  });
});
