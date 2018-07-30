const {assert} = require('chai');
const request = require('supertest');

const mongoose = require('mongoose');
const app = require('../../app');
const Item = require('../../models/item');
const User = require('../../models/user');


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
      const item3 = new Item({itemName: 'Pet food', dateAdded: '2018-07-23T16:49:16.515Z'});
      await item1.save();
      await item2.save();
      await item3.save();

      const response = await request(app)
        .get('/api/items')

      const responseJson = JSON.parse(response.text);

      assert.equal(responseJson[0].itemName, item1.itemName)
      assert.equal(responseJson[1].itemName, item2.itemName)
      assert.equal(responseJson[2].itemName, item3.itemName)
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
});
