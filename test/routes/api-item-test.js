const {assert} = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Item = require('../../models/item');
const User = require('../../models/user');
const {createUser, createItem} = require('../helper');


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
      await item.save();

      const response = await request(app)
        .get('/api/items')

      const responseFirstItemName = JSON.parse(response.text)[0].itemName;
      assert.equal(responseFirstItemName, item.itemName)
    });
    it('returns multiple items as JSON array', async () => {
      const item1 = new Item({itemName: 'Ostrich Egg', dateAdded: '2018-07-25T16:49:16.515Z'});
      const item2 = new Item({itemName: 'Tennis ball', dateAdded: '2018-07-24T16:49:16.515Z'});
      await item1.save();
      await item2.save();

      const response = await request(app)
        .get('/api/items')

      const responseJson = JSON.parse(response.text);

      assert.equal(responseJson[0].itemName, item1.itemName)
      assert.equal(responseJson[1].itemName, item2.itemName)
    });
  });
  describe('POST', () => {
    it('adds an item to the database', async () => {
      const itemToCreate = { itemName: "Scissors" };

      const response = await request(app)
        .post('/api/items')
        .type('form')
        .send(itemToCreate)

      const databaseResponse = await Item.find();
      const itemInDatabase = databaseResponse[0].itemName

      assert.equal(itemInDatabase, itemToCreate.itemName);
    });
    it('can create an item with a description', async () => {
      const itemToCreate = { itemName: 'Scissors', itemDescription: 'This is the description of the item' };

      const response = await request(app)
        .post('/api/items')
        .type('form')
        .send(itemToCreate)

      const databaseResponse = await Item.find();

      assert.equal(databaseResponse[0].itemDescription, 'This is the description of the item');
    });
    it('assigns the item to a user', async () => {
      const userToSignUp = {
        "firstName": "Chris",
        "lastName": "Terry",
        "email": "chris@gmail.com",
        "username": "chris555",
        "password": "password"
      };
      const userResponse = await request(app)
        .post('/auth/signup')
        .type('form')
        .send(userToSignUp);
      const userLoginResponse = await request(app)
        .post('/auth/login')
        .send(userToSignUp);
      const newUser = JSON.parse(userResponse.text);
      const itemToCreate = {itemName: 'Peanut Butter', owner: newUser._id};
      const itemResponse = await request(app)
        .post('/api/items')
        .type('form')
        .send(itemToCreate);
      const item = await Item.findOne( {itemName: 'Peanut Butter'} )
        .populate('owner');
       assert.equal(item.owner._id, newUser._id);
    });
  });
  describe('DELETE', () => {
    it('removes the item from the database', async () => {
      const item = new Item({ itemName: 'Scissors' });
      await item.save();

      const response = await request(app)
        .delete('/api/items')
        .send({_id: item._id});

      const databaseResponse = await Item.find();

      assert.equal(databaseResponse[0], undefined);
    });
  });
  describe('/:item_id', () => {
    describe('PUT', () => {
      it('updates the current borrower of the item', async () => {
        const borrower = await createUser({ firstName: 'Borrower'});
        const owner = await createUser({ firstName: 'Owner'});

        const userLoginResponse = await request(app)
          .post('/auth/login')
          .send(borrower);

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

        const borrowerLogsIn = await request(app)
          .post('/auth/login')
          .send(borrower);

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
