const mongoose = require('mongoose');
const User = require('../models/user');
const Item = require('../models/item');
const app = require('../app');
const request = require('supertest');

const connectToAndDropDatabase = async () => {
  await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_Password}@ds247001.mlab.com:47101/lendit-test`);
  await mongoose.connection.db.dropDatabase();
}

const disconnectFromDatabase = async () => {
  await mongoose.disconnect();
}

const createUser = async (userToCreate) => {
  const user = new User({
    'firstName': userToCreate.firstName,
    'lastName': 'testLastName',
    'email': "testemail@gmail.com",
    'username': "testUserName",
    'password': "validTestPassword"
  });
  return await user.save();
}

const createItem = async (itemName, owner) => {
  const newItem = new Item({
    itemName: itemName,
    owner: owner ? owner : undefined
  });
  await newItem.save()
  return newItem
}

const signUserUp = async (userToSignUp) => {
  const userResponse = await request(app)
    .post('/auth/signup')
    .type('form')
    .send(userToSignUp);
  return userResponse;
};

const logUserIn = async (userToLogIn) => {
  const userLoginResponse = await request(app)
    .post('/auth/login')
    .send(userToLogIn);
  return userLoginResponse
};

const createItemWithDate = async (itemName, date) => {
  const newItem = new Item({
    itemName: itemName,
    dateAdded: date
  });
  await newItem.save()
  return newItem
}

module.exports = {
  connectToAndDropDatabase: connectToAndDropDatabase,
  disconnectFromDatabase: disconnectFromDatabase,
  createUser: createUser,
  createItem: createItem,
  signUserUp: signUserUp,
  logUserIn: logUserIn,
  createItemWithDate: createItemWithDate
}
